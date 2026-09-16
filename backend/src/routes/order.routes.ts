import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { AppError } from "../middleware/errorHandler.js";
import { createOrderSchema, updateOrderStatusSchema } from "../schemas/order.schema.js";
import { createPaymentSchema } from "../schemas/payment.schema.js";
import { requireParam } from "../utils/params.js";
import { notifyOrderStatus } from "../services/notify.js";
import { disburseRemittance } from "../services/momo.service.js";

export const orderRouter = Router();

orderRouter.post("/", requireAuth, validateBody(createOrderSchema), async (req, res) => {
  const data = req.body;

  const order = await prisma.order.create({
    data: {
      ...data,
      senderId: req.user!.id,
    },
  });

  await prisma.orderStatusEvent.create({
    data: { orderId: order.id, status: order.status },
  });

  notifyOrderStatus(order, order.status);

  res.status(201).json(order);
});

orderRouter.get("/", requireAuth, async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { senderId: req.user!.id },
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
});

orderRouter.get("/:id", requireAuth, async (req, res) => {
  const order = await prisma.order.findUnique({ where: { id: requireParam(req, "id") } });
  if (!order) {
    throw new AppError(404, "Order not found");
  }
  if (order.senderId !== req.user!.id && req.user!.role === "CUSTOMER") {
    throw new AppError(403, "You do not have access to this order");
  }
  res.json(order);
});

orderRouter.get("/:id/track", async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: requireParam(req, "id") },
    select: {
      id: true,
      status: true,
      recipientName: true,
      dropoffAddress: true,
      dropoffLat: true,
      dropoffLng: true,
      hasInsurance: true,
      createdAt: true,
      updatedAt: true,
      statusEvents: {
        select: { status: true, note: true, createdAt: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });
  if (!order) {
    throw new AppError(404, "Order not found");
  }
  res.json(order);
});

orderRouter.patch(
  "/:id/status",
  requireAuth,
  requireRole("ADMIN", "RIDER"),
  validateBody(updateOrderStatusSchema),
  async (req, res) => {
    const { status, note } = req.body;

    const order = await prisma.order.findUnique({ where: { id: requireParam(req, "id") } });
    if (!order) {
      throw new AppError(404, "Order not found");
    }

    const [updated] = await prisma.$transaction([
      prisma.order.update({ where: { id: order.id }, data: { status } }),
      prisma.orderStatusEvent.create({
        data: { orderId: order.id, status, note },
      }),
    ]);

    notifyOrderStatus(updated, status);

    res.json(updated);
  }
);

orderRouter.post(
  "/:id/payments",
  requireAuth,
  requireRole("ADMIN", "RIDER"),
  validateBody(createPaymentSchema),
  async (req, res) => {
    const { method } = req.body;

    const order = await prisma.order.findUnique({
      where: { id: requireParam(req, "id") },
      include: { sender: true },
    });
    if (!order) {
      throw new AppError(404, "Order not found");
    }
    if (!order.codAmount) {
      throw new AppError(400, "This order has no COD amount to remit");
    }

    const payment = await prisma.payment.create({
      data: { orderId: order.id, amount: order.codAmount, method },
    });

    if (method === "CASH") {
      const updated = await prisma.payment.update({
        where: { id: payment.id },
        data: { remittedAt: new Date() },
      });
      res.status(201).json({ ...updated, remittanceStatus: "SENT" });
      return;
    }

    const payeePhone = order.sender?.phone;
    if (!payeePhone) {
      res.status(201).json({
        ...payment,
        remittanceStatus: "FAILED",
        remittanceError: "No payout phone number on file for this order's merchant",
      });
      return;
    }

    const result = await disburseRemittance(method, payeePhone, Number(order.codAmount));
    const updated =
      result.status === "SENT"
        ? await prisma.payment.update({ where: { id: payment.id }, data: { remittedAt: new Date() } })
        : payment;

    res.status(201).json({
      ...updated,
      remittanceStatus: result.status,
      remittanceReference: result.reference,
      remittanceError: result.error,
    });
  }
);
