import { z } from "zod";

export const assignRiderSchema = z.object({
  riderId: z.string().min(1),
});

export const createRiderSchema = z.object({
  userId: z.string().min(1),
  vehicleType: z.string().optional(),
});

// Deliberately excludes ADMIN — promoting someone to admin stays a manual,
// out-of-band action (the make-admin script), never something reachable via the API.
export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.enum(["CUSTOMER", "RIDER"]),
  vehicleType: z.string().optional(),
});
