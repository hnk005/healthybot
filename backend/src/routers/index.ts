import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./users.routes";
import sendRoutes from "./send.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/send", sendRoutes);

export default router;
