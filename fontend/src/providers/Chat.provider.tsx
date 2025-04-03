import { createContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { CancelTokenSource } from "axios";
import { chatWithAIStream } from "@/api/chat";
import { toast } from "react-toastify";
import { useHistoryChat } from "@/hooks/useChatHistory";
import { useAuth } from "@/hooks/useAuth";
import { createSectionChat, getMessage } from "@/api/chat/history";

interface ChatMessage {
  user: string;
  assistant: string;
}

export interface ChatContextInterface {
  prompt: string;
  setPrompt: (value: string) => void;
  listChat: ChatMessage[];
  loadingResAt: boolean;
  isPending: boolean;
  isPaused: boolean;
  sendMessage: (message: string) => void;
  stopChat: () => void;
}

export const ChatContext = createContext<ChatContextInterface>(
  {} as ChatContextInterface,
);

export const ChatBotProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isUser } = useAuth();
  const { currentChatId } = useHistoryChat();
  const [prompt, setPrompt] = useState<string>("");
  const [listChat, setListChat] = useState<ChatMessage[]>([]);
  const [loadingResAt, setLoadingResAt] = useState<boolean>(false);
  const cancelTokenRef = useRef<CancelTokenSource | null>(null);

  const { refetch } = useQuery({
    queryKey: ["listChat"],
    queryFn: async () => {
      const { data } = await getMessage(currentChatId);
      setListChat(data);
      return data;
    },
    enabled: false,
    retry: false,
  });

  const {
    mutate,
    isPaused,
    isPending,
  } = useMutation({
    mutationFn: async (userInput: string) => {
      setLoadingResAt(true);
      cancelTokenRef.current = axios.CancelToken.source();
      let assistant = "";

      try {
        await chatWithAIStream(
          userInput,
          (chunk) => {
            setLoadingResAt(false);
            assistant += chunk;
            setListChat((prev) => {
              const updatedHistory = [...prev];
              updatedHistory[updatedHistory.length - 1].assistant = assistant;
              return [...updatedHistory];
            });
          },
          cancelTokenRef.current.token,
        );
      } catch (err) {
        console.error("Request bị hủy:", err);
      } finally {
        setLoadingResAt(false);
        handleChatComplete();
      }
    },
  });

  const handleChatComplete = async () => {
    try {
      const { user, assistant } = listChat[listChat.length - 1];
      await createSectionChat(currentChatId, user, assistant);
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  const sendMessage = (message: string) => {
    if (listChat.length > 5 && !isUser) {
      toast.warn("Vui lòng đăng nhập để có thể tiếp tục chat");
      return;
    }
    if (!isUser) {
      toast.warn("Đoạn chat của bạn sẽ không được lưu, Vui lòng đăng nhập");
    }
    setListChat((prev) => [...prev, { user: message, assistant: "" }]);
    mutate(message);
  };

  const stopChat = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("Người dùng đã hủy request!");
    }
    setLoadingResAt(false);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      stopChat();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (currentChatId) {
      refetch();
    }
    return () => {
      stopChat();
    };
  }, [currentChatId, refetch]);

  return (
    <ChatContext.Provider
      value={{
        prompt,
        setPrompt,
        listChat,
        loadingResAt,
        isPending,
        isPaused,
        sendMessage,
        stopChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
