import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

declare global {
  var __prisma: PrismaClient | undefined;
}

const databaseUrl = process.env["DATABASE_URL"];
if (!databaseUrl) {
  throw new Error("DATABASE_URL must be set");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });

export const prisma = global.__prisma ?? new PrismaClient({ adapter });

if (process.env["NODE_ENV"] !== "production") {
  global.__prisma = prisma;
}
