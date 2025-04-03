import { transformStream } from "@/handler/chatStream";
import axios from "axios";

const CHAT = axios.create({
  baseURL: "https://server2.loca.lt",
});

export const chatWithAIStream = async (
  prompt: string,
  onChunk: (chunk: string) => void,
  cancelToken: any,
) => {
  let lastLength = 0;
  await CHAT.post(
    "/v1/chat/completions",
    {
      model: "Vistral-7B-Chat",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      stream: true,
    },
    {
      responseType: "text", // Dùng "text" thay vì "stream"
      cancelToken: cancelToken,
      onDownloadProgress: (progressEvent) => {
        const xhr = progressEvent.event.target as XMLHttpRequest;
        const fullResponse = xhr.responseText;
        const newText = fullResponse.substring(lastLength);
        lastLength = fullResponse.length;

        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(newText));
            controller.close();
          },
        });

        const transformedStream = transformStream(stream);
        const reader = transformedStream.getReader();
        const decoder = new TextDecoder();

        reader.read().then(({ value, done }) => {
          if (done) return;
          const text = decoder.decode(value, { stream: true });
          if (text) {
            onChunk(text);
          }
        });
      },
    },
  );
};
