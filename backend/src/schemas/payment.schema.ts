import { z } from "zod";

export const createPaymentSchema = z.object({
  method: z.enum(["CASH", "MTN_MOMO", "AIRTEL_MONEY"]),
});
