import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { orderRouter } from "./order.routes.js";
import { contactRouter } from "./contact.routes.js";
import { addressRouter } from "./address.routes.js";
import { manifestRouter } from "./manifest.routes.js";
import { adminRouter } from "./admin.routes.js";
import { riderRouter } from "./rider.routes.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/orders", orderRouter);
router.use("/contact", contactRouter);
router.use("/addresses", addressRouter);
router.use("/manifests", manifestRouter);
router.use("/admin", adminRouter);
router.use("/rider", riderRouter);
