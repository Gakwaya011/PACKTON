import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
  email: z.string().email(),
  message: z.string().optional(),
  estimatedVolume: z.string().optional(),
});
