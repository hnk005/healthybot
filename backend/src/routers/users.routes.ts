import usersController from "@/controllers/users.controller";
import { Router } from "express";

const userRoutes = Router();

const { updateEmailVerify, changePassword } = usersController;

userRoutes.put("/update/email-verify", updateEmailVerify);
userRoutes.put("/update/password", changePassword);

export default userRoutes;
