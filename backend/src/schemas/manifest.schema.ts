import { z } from "zod";

export type ManifestRow = z.infer<typeof manifestRowSchema>;

export const manifestRowSchema = z.object({
  recipientName: z.string().min(1, "recipientName is required"),
  recipientPhone: z.string().min(1, "recipientPhone is required"),
  pickupAddress: z.string().min(1, "pickupAddress is required"),
  dropoffAddress: z.string().min(1, "dropoffAddress is required"),
  codAmount: z
    .string()
    .optional()
    .transform((v) => (v && v.trim() ? Number(v) : undefined))
    .refine((v) => v === undefined || !Number.isNaN(v), "codAmount must be a number"),
  price: z
    .string()
    .min(1, "price is required")
    .transform((v) => Number(v))
    .refine((v) => !Number.isNaN(v) && v > 0, "price must be a positive number"),
});
