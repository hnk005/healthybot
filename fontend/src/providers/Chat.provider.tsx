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
  listChat: ChatMessage[];
  loadingResAt: boolean;
  isPending: boolean;
  isPaused: boolean;
  isError: boolean;
  error: any;
  sendMessage: (message: string) => void;
  stopChat: () => void;
  setPrompt: (value: string) => void;
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

  const { mutate, isError, isPaused, error, isPending } = useMutation({
    mutationFn: async (userInput: string) => {
      setLoadingResAt(true);
      cancelTokenRef.current = axios.CancelToken.source();
      let assistant = "";

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
      setLoadingResAt(false);
      handleChatComplete();
    },
  });

  const handleChatComplete = async () => {
    try {
      const { user, assistant } = listChat[listChat.length - 1];
      await createSectionChat(currentChatId, user, assistant);
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    if (isError) {
      setLoadingResAt(false);
    }
  }, [isError, error]);

  return (
    <ChatContext.Provider
      value={{
        prompt,
        isError,
        error,
        listChat,
        loadingResAt,
        isPending,
        isPaused,
        sendMessage,
        setPrompt,
        stopChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
