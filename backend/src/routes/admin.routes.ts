import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { AppError } from "../middleware/errorHandler.js";
import { requireParam } from "../utils/params.js";
import { assignRiderSchema, createRiderSchema, createUserSchema } from "../schemas/admin.schema.js";
import type { OrderStatus } from "../generated/prisma/enums.js";
import { generateTempPassword, hashPassword } from "../utils/password.js";
import { sendCredentialsEmail } from "../services/email.service.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("ADMIN"));

const ORDER_STATUSES: OrderStatus[] = ["PENDING", "PICKED_UP", "IN_TRANSIT", "DELIVERED", "CANCELLED"];

adminRouter.get("/orders", async (req, res) => {
  const statusParam = req.query["status"];
  const status =
    typeof statusParam === "string" && ORDER_STATUSES.includes(statusParam as OrderStatus)
      ? (statusParam as OrderStatus)
      : undefined;

  const orders = await prisma.order.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: "desc" },
    include: {
      sender: { select: { id: true, name: true, email: true } },
      rider: { select: { id: true, user: { select: { name: true } } } },
    },
  });
  res.json(orders);
});

adminRouter.patch("/orders/:id/assign", validateBody(assignRiderSchema), async (req, res) => {
  const { riderId } = req.body;

  const order = await prisma.order.findUnique({ where: { id: requireParam(req, "id") } });
  if (!order) {
    throw new AppError(404, "Order not found");
  }

  const rider = await prisma.rider.findUnique({ where: { id: riderId } });
  if (!rider) {
    throw new AppError(404, "Rider not found");
  }

  const updated = await prisma.order.update({ where: { id: order.id }, data: { riderId } });
  res.json(updated);
});

adminRouter.get("/riders", async (_req, res) => {
  const riders = await prisma.rider.findMany({
    include: { user: { select: { id: true, name: true, email: true, phone: true } } },
    orderBy: { createdAt: "desc" },
  });

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const withStats = await Promise.all(
    riders.map(async (rider) => {
      const deliveredToday = await prisma.order.count({
        where: { riderId: rider.id, status: "DELIVERED", updatedAt: { gte: startOfDay } },
      });
      return { ...rider, deliveredToday };
    })
  );

  res.json(withStats);
});

adminRouter.post("/riders", validateBody(createRiderSchema), async (req, res) => {
  const { userId, vehicleType } = req.body;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const existingRider = await prisma.rider.findUnique({ where: { userId } });
  if (existingRider) {
    throw new AppError(409, "This user is already a rider");
  }

  const [, rider] = await prisma.$transaction([
    prisma.user.update({ where: { id: userId }, data: { role: "RIDER" } }),
    prisma.rider.create({ data: { userId, vehicleType } }),
  ]);

  res.status(201).json(rider);
});

adminRouter.post("/users", validateBody(createUserSchema), async (req, res) => {
  const { name, email, phone, role, vehicleType } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError(409, "An account with this email already exists");
  }

  const tempPassword = generateTempPassword();
  const passwordHash = await hashPassword(tempPassword);

  const user = await prisma.user.create({
    data: { name, email, phone, role, passwordHash },
  });

  if (role === "RIDER") {
    await prisma.rider.create({ data: { userId: user.id, vehicleType } });
  }

  const credentialsEmailed = await sendCredentialsEmail(email, name, tempPassword);

  res.status(201).json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    credentialsEmailed,
    ...(credentialsEmailed ? {} : { temporaryPassword: tempPassword }),
  });
});

adminRouter.get("/payments", async (_req, res) => {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: { order: { select: { id: true, recipientName: true, codAmount: true } } },
  });
  res.json(payments);
});

adminRouter.get("/manifests", async (_req, res) => {
  const manifests = await prisma.manifest.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      organization: { select: { name: true } },
      orders: { select: { id: true, recipientName: true, status: true, price: true } },
    },
  });
  res.json(manifests);
});

adminRouter.get("/analytics", async (_req, res) => {
  const [totalOrders, deliveredOrders, cancelledOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.order.count({ where: { status: "CANCELLED" } }),
  ]);

  const deliverySuccessRate = totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0;

  const deliveredWithEvents = await prisma.order.findMany({
    where: { status: "DELIVERED" },
    select: {
      statusEvents: {
        where: { status: { in: ["PICKED_UP", "DELIVERED"] } },
        select: { status: true, createdAt: true },
      },
    },
  });

  const durationsMs: number[] = [];
  for (const order of deliveredWithEvents) {
    const pickedUp = order.statusEvents.find((e) => e.status === "PICKED_UP");
    const delivered = order.statusEvents.find((e) => e.status === "DELIVERED");
    if (pickedUp && delivered) {
      durationsMs.push(delivered.createdAt.getTime() - pickedUp.createdAt.getTime());
    }
  }
  const avgDeliveryMinutes =
    durationsMs.length > 0
      ? durationsMs.reduce((a, b) => a + b, 0) / durationsMs.length / 60000
      : null;

  const [collectedAgg, remittedAgg] = await Promise.all([
    prisma.payment.aggregate({ _sum: { amount: true } }),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { remittedAt: { not: null } } }),
  ]);

  const riders = await prisma.rider.findMany({
    select: {
      id: true,
      user: { select: { name: true } },
      orders: { select: { status: true } },
    },
  });

  const riderPerformance = riders.map((r) => {
    const assigned = r.orders.length;
    const delivered = r.orders.filter((o) => o.status === "DELIVERED").length;
    return {
      riderId: r.id,
      name: r.user.name,
      assigned,
      delivered,
      completionRate: assigned > 0 ? (delivered / assigned) * 100 : 0,
    };
  });

  res.json({
    totalOrders,
    deliveredOrders,
    cancelledOrders,
    deliverySuccessRate,
    avgDeliveryMinutes,
    codCollected: collectedAgg._sum.amount ?? 0,
    codRemitted: remittedAgg._sum.amount ?? 0,
    riderPerformance,
  });
});
