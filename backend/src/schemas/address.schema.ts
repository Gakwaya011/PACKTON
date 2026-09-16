import { z } from "zod";

export const createAddressSchema = z.object({
  label: z.string().min(1),
  address: z.string().min(1),
  lat: z.number().optional(),
  lng: z.number().optional(),
});
