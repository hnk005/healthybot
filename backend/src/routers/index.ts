import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./users.routes";
import sendRoutes from "./send.routes";
import validateRoutes from "./validate.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/validate", validateRoutes);
router.use("/send", sendRoutes);

export default router;
