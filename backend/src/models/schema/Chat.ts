import { ChatInterface } from "@/contants/shema";
import { Schema } from "mongoose";

const ChatSchema: Schema<ChatInterface> = new Schema(
  {
    title: { type: String, default: "Cuộc trò chuyện mới" },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    messages: [
      {
        userMessage: { type: String, required: true },
        assistantResponse: { type: String, default: "" },
        createAt: { type: Date, default: new Date() },
      },
    ],
  },
  { timestamps: true },
);

export default ChatSchema;
