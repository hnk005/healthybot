import { Document, ObjectId } from "mongoose";

export interface UserInterface extends Document {
  email: string;
  password: string;
  isVerified: boolean;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface ChatInterface extends Document {
  title: string;
  userId: ObjectId;
  messages: { userMessage: string; assistantResponse: string }[];
}
