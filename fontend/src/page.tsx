import Chat from "./components/section/chat-bot/Chat";
import ChatInput from "./components/section/chat-bot/ChatInput";
import { ChatBotProvider } from "./providers/Chat.provider";

const Page = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <ChatBotProvider>
        <Chat />
        <ChatInput />
      </ChatBotProvider>
    </div>
  );
};

export default Page;
