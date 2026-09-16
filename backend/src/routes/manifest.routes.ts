import { Router } from "express";
import express from "express";
import { parse } from "csv-parse/sync";
import { prisma } from "../lib/prisma.js";
import { requireApiKey } from "../middleware/apiKeyAuth.js";
import { AppError } from "../middleware/errorHandler.js";
import { manifestRowSchema, type ManifestRow } from "../schemas/manifest.schema.js";

export const manifestRouter = Router();

manifestRouter.get("/", requireApiKey, async (req, res) => {
  const manifests = await prisma.manifest.findMany({
    where: { organizationId: req.organization!.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  });
  res.json(manifests);
});

manifestRouter.post(
  "/upload",
  requireApiKey,
  express.text({ type: ["text/csv", "text/plain"], limit: "2mb" }),
  async (req, res) => {
    if (typeof req.body !== "string" || !req.body.trim()) {
      throw new AppError(400, "Request body must be CSV text (Content-Type: text/csv)");
    }

    let rows: Record<string, string>[];
    try {
      rows = parse(req.body, { columns: true, skip_empty_lines: true, trim: true });
    } catch (err) {
      throw new AppError(400, `Could not parse CSV: ${err instanceof Error ? err.message : "unknown error"}`);
    }

    if (rows.length === 0) {
      throw new AppError(400, "CSV has no data rows");
    }

    const validOrders: ManifestRow[] = [];
    const rowErrors: { row: number; error: string }[] = [];

    rows.forEach((row, i) => {
      const result = manifestRowSchema.safeParse(row);
      if (!result.success) {
        rowErrors.push({ row: i + 2, error: result.error.issues.map((iss) => iss.message).join(", ") });
      } else {
        validOrders.push(result.data);
      }
    });

    if (validOrders.length === 0) {
      throw new AppError(400, `No valid rows found. Errors: ${JSON.stringify(rowErrors)}`);
    }

    const manifest = await prisma.manifest.create({
      data: { organizationId: req.organization!.id },
    });

    await prisma.order.createMany({
      data: validOrders.map(({ codAmount, ...order }) => ({
        ...order,
        ...(codAmount !== undefined ? { codAmount } : {}),
        manifestId: manifest.id,
      })),
    });

    const createdOrders = await prisma.order.findMany({ where: { manifestId: manifest.id } });
    await prisma.orderStatusEvent.createMany({
      data: createdOrders.map((order) => ({ orderId: order.id, status: order.status })),
    });

    res.status(201).json({
      manifestId: manifest.id,
      ordersCreated: validOrders.length,
      rowErrors,
    });
  }
);
