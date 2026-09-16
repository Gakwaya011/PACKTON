import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { validateBody } from "../middleware/validate.js";
import { contactSchema } from "../schemas/contact.schema.js";

export const contactRouter = Router();

contactRouter.post("/", validateBody(contactSchema), async (req, res) => {
  const submission = await prisma.contactSubmission.create({ data: req.body });
  res.status(201).json({ id: submission.id });
});
