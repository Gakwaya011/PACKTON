import { Router } from "express";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { AppError } from "../middleware/errorHandler.js";
import { requireParam } from "../utils/params.js";
import { availabilitySchema } from "../schemas/rider.schema.js";
import { isStorageConfigured, uploadFile } from "../services/storage.service.js";

export const riderRouter = Router();

riderRouter.use(requireAuth, requireRole("RIDER"));

async function getRiderOrThrow(userId: string) {
  const rider = await prisma.rider.findUnique({ where: { userId } });
  if (!rider) {
    throw new AppError(404, "Rider profile not found for this account");
  }
  return rider;
}

riderRouter.get("/me", async (req, res) => {
  const rider = await getRiderOrThrow(req.user!.id);
  res.json(rider);
});

riderRouter.get("/orders", async (req, res) => {
  const rider = await getRiderOrThrow(req.user!.id);
  const orders = await prisma.order.findMany({
    where: { riderId: rider.id },
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
});

riderRouter.patch("/availability", validateBody(availabilitySchema), async (req, res) => {
  const rider = await getRiderOrThrow(req.user!.id);
  const updated = await prisma.rider.update({
    where: { id: rider.id },
    data: { isAvailable: req.body.isAvailable },
  });
  res.json(updated);
});

riderRouter.get("/earnings", async (req, res) => {
  const rider = await getRiderOrThrow(req.user!.id);

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const [todayAgg, weekAgg] = await Promise.all([
    prisma.order.aggregate({
      _sum: { price: true },
      where: { riderId: rider.id, status: "DELIVERED", updatedAt: { gte: startOfDay } },
    }),
    prisma.order.aggregate({
      _sum: { price: true },
      where: { riderId: rider.id, status: "DELIVERED", updatedAt: { gte: startOfWeek } },
    }),
  ]);

  res.json({
    today: todayAgg._sum.price ?? 0,
    thisWeek: weekAgg._sum.price ?? 0,
  });
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

riderRouter.post("/orders/:id/proof-of-delivery", upload.single("photo"), async (req, res) => {
  if (!isStorageConfigured) {
    throw new AppError(
      501,
      "File storage is not configured yet — add R2 credentials to enable proof-of-delivery uploads"
    );
  }

  const rider = await getRiderOrThrow(req.user!.id);
  const orderId = requireParam(req, "id");

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    throw new AppError(404, "Order not found");
  }
  if (order.riderId !== rider.id) {
    throw new AppError(403, "This order is not assigned to you");
  }

  let podPhotoUrl: string | undefined;
  if (req.file) {
    podPhotoUrl = await uploadFile(
      req.file.buffer,
      `pod/${orderId}-photo-${randomUUID()}.jpg`,
      req.file.mimetype
    );
  }

  let podSignatureUrl: string | undefined;
  const signature = typeof req.body?.signature === "string" ? req.body.signature : undefined;
  if (signature?.startsWith("data:image/png;base64,")) {
    const buffer = Buffer.from(signature.split(",")[1] ?? "", "base64");
    podSignatureUrl = await uploadFile(buffer, `pod/${orderId}-signature-${randomUUID()}.png`, "image/png");
  }

  if (!podPhotoUrl && !podSignatureUrl) {
    throw new AppError(400, "Provide a photo, signature, or both");
  }

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: {
      ...(podPhotoUrl ? { podPhotoUrl } : {}),
      ...(podSignatureUrl ? { podSignatureUrl } : {}),
      podCapturedAt: new Date(),
    },
  });

  res.json(updated);
});
