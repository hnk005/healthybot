import { ChatInterface, UserInterface } from "@/contants/shema";
import UserSchema from "./schema/User";
import { mongodb } from "@/config/connectDB";
import ChatSchema from "./schema/Chat";

export const User = mongodb.model<UserInterface>("User", UserSchema);
export const Chat = mongodb.model<ChatInterface>("Chat", ChatSchema);
