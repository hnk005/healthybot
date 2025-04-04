import { createContext, useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  changeTitle,
  createChat,
  deleteChat,
  getHistoryChat,
} from "@/api/chat/history";
import { useAuth } from "@/hooks/useAuth";

interface ChatHistoryItem {
  _id: string;
  title: string;
  createdAt: string;
}

export interface HistoryChatContextInterface {
  history: ChatHistoryItem[];
  currentChatId: string;
  chooseChat: (chatId: string) => void;
  handleNewChat: () => Promise<void>;
  hadnleChangeTitle: (chatId: string, newTitle: string) => Promise<void>;
  hadnleDeleteChat: (chatId: string) => Promise<void>;
}

export const HistoryChatContext = createContext<HistoryChatContextInterface>(
  {} as HistoryChatContextInterface,
);

export const HistoryChatProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isUser, isLoading } = useAuth();
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>("");
  const [isReset, setIsReset] = useState(true);

  const { data, refetch } = useQuery({
    queryKey: ["chatHistory"],
    queryFn: async () => await getHistoryChat(100),
    enabled: isUser && !isLoading,
    retry: false,
  });

  const chooseChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const fetchHistory = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const handleNewChat = useCallback(async () => {
    try {
      await createChat();
      await fetchHistory();
      setCurrentChatId("");
      setIsReset(true);
    } catch (err) {
      console.log(err);
    }
  }, [fetchHistory]);

  const hadnleChangeTitle = async (chatId: string, newTitle: string) => {
    try {
      await changeTitle(chatId, newTitle);
      await fetchHistory();
      setIsReset(false);
    } catch (error) {
      console.error(error);
    }
  };

  const hadnleDeleteChat = async (chatId: string) => {
    try {
      await deleteChat(chatId);
      await fetchHistory();
      setIsReset(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data?.status === 204) {
      handleNewChat();
    } else {
      if (data) {
        setHistory(data.data);
      }
    }
  }, [data, handleNewChat]);

  useEffect(() => {
    if (history.length > 0 && isReset) {
      setCurrentChatId(history[0]._id);
    }
  }, [history, isReset]);

  return (
    <HistoryChatContext.Provider
      value={{
        history,
        currentChatId,
        chooseChat,
        handleNewChat,
        hadnleChangeTitle,
        hadnleDeleteChat,
      }}
    >
      {children}
    </HistoryChatContext.Provider>
  );
};
