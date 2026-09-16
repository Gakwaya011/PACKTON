import { z } from "zod";

export const createOrderSchema = z.object({
  recipientName: z.string().min(1),
  recipientPhone: z.string().min(1),
  pickupAddress: z.string().min(1),
  pickupLat: z.number().optional(),
  pickupLng: z.number().optional(),
  dropoffAddress: z.string().min(1),
  dropoffLat: z.number().optional(),
  dropoffLng: z.number().optional(),
  codAmount: z.number().nonnegative().optional(),
  price: z.number().positive(),
  hasInsurance: z.boolean().optional(),
  insuranceFee: z.number().nonnegative().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PICKED_UP", "IN_TRANSIT", "DELIVERED", "CANCELLED"]),
  note: z.string().optional(),
});
