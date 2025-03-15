import { UserInterface } from "@/contants/interface";
import UserSchema from "./schema/User";
import { mongodb } from "@/config/connectDB";

export const User = mongodb.model<UserInterface>("User", UserSchema);
