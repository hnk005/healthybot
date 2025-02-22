import { Document } from "mongoose";
import { UserRole } from "./enum";
import { Request} from "express";

export interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    comparePassword: (password: string) => Promise<boolean>;
}

export interface AuthRequest extends Request {
    user?: { userId: string; role: string };
}