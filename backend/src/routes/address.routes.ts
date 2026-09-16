import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { AppError } from "../middleware/errorHandler.js";
import { createAddressSchema } from "../schemas/address.schema.js";
import { requireParam } from "../utils/params.js";

export const addressRouter = Router();

addressRouter.get("/", requireAuth, async (req, res) => {
  const addresses = await prisma.savedAddress.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "desc" },
  });
  res.json(addresses);
});

addressRouter.post("/", requireAuth, validateBody(createAddressSchema), async (req, res) => {
  const address = await prisma.savedAddress.create({
    data: { ...req.body, userId: req.user!.id },
  });
  res.status(201).json(address);
});

addressRouter.delete("/:id", requireAuth, async (req, res) => {
  const id = requireParam(req, "id");
  const address = await prisma.savedAddress.findUnique({ where: { id } });
  if (!address || address.userId !== req.user!.id) {
    throw new AppError(404, "Address not found");
  }
  await prisma.savedAddress.delete({ where: { id } });
  res.status(204).send();
});
