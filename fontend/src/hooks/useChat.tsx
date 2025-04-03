import { ChatContext, ChatContextInterface } from "@/providers/Chat.provider";
import { useContext } from "react";

export const useChat = (): ChatContextInterface => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatBotProvider");
  return context;
};
