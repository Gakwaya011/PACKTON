import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { AppError } from "./errorHandler.js";

declare global {
  namespace Express {
    interface Request {
      organization?: { id: string; name: string };
    }
  }
}

export async function requireApiKey(req: Request, _res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"];
  if (typeof apiKey !== "string" || !apiKey) {
    throw new AppError(401, "Missing X-API-Key header");
  }

  const organization = await prisma.organization.findUnique({ where: { apiKey } });
  if (!organization) {
    throw new AppError(401, "Invalid API key");
  }

  req.organization = { id: organization.id, name: organization.name };
  next();
}
