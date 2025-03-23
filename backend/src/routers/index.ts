import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import sendRoutes from "./send.routes";
import validationRoutes from "./validation.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/validation", validationRoutes);
router.use("/send", sendRoutes);

export default router;
