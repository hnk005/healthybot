import { HistoryChatContext } from "@/providers/HistoryChat.provider";
import { useContext } from "react";

export const useHistoryChat = () => {
  const context = useContext(HistoryChatContext);
  if (!context)
    throw new Error("useHistoryChat must be used within HistoryChatProvider");
  return context;
};
