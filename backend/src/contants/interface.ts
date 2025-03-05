import { Document } from "mongoose";

export interface UserInterface extends Document {
  email: string;
  password: string;
  isVerified: boolean;
  comparePassword: (password: string) => Promise<boolean>;
}
