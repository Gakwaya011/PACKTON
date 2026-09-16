import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { prisma } from "./lib/prisma.js";
import { openApiSpec } from "./openapi.js";

export const app = express();

app.use(cors({ origin: process.env["CORS_ORIGIN"] ?? "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/health/db", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok" });
  } catch {
    res.status(503).json({ status: "down" });
  }
});

app.get("/api-docs.json", (_req, res) => {
  res.json(openApiSpec);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use(router);

app.use(errorHandler);
