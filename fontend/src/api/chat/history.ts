import { API_CHAT, API_URL } from "@/core/enum";
import axios from "axios";

const CHAT_HISTORY = axios.create({
  baseURL: `${API_URL}/chat`,
  withCredentials: true,
});

export const getHistoryChat = (limit: number) => {
  return CHAT_HISTORY.get(`${API_CHAT.GET_HISTORY}?limit=${limit}`);
};

export const getMessage = (chatId: string) => {
  return CHAT_HISTORY.get(`${API_CHAT.GET_MESSAGE}?id=${chatId}`);
};

export const createChat = () => {
  return CHAT_HISTORY.post(API_CHAT.CREATED);
};

export const createSectionChat = (
  chatId: string,
  userMessage: string,
  assistantResponse: string,
) => {
  return CHAT_HISTORY.post(API_CHAT.CREATED_SECTION, {
    chatId,
    userMessage,
    assistantResponse,
  });
};

export const changeTitle = (chatId: string, newTitle: string) => {
  return CHAT_HISTORY.put(API_CHAT.UPDATE_TITLE, { chatId, newTitle });
};

export const deleteChat = (chatId: string) => {
  return CHAT_HISTORY.delete(`${API_CHAT.DELETE_CHAT}?id=${chatId}`);
};
