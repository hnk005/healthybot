import ChatBot from "./ChatBot";
import { useChat } from "@/hooks/useChat";

const Chat = () => {
  const { listChat, loadingResAt } = useChat();

  if (!listChat.length) {
    return (
      <div className='w-full text-center text-4xl p-4'>
        <h1>Tôi có thể giúp gì cho sức khỏe của bạn</h1>
      </div>
    );
  }

  return (
    <div className='w-full h-[768px] overflow-y-auto'>
      <div className='min-w-[768px] max-md:min-w-full flex justify-center'>
        <div className='flex flex-col w-full max-w-2xl space-y-3 mb-4 '>
          {listChat.map((chat, index) => (
            <ChatBot key={index} user={chat.user} assistant={chat.assistant} />
          ))}
          {loadingResAt && <span>Vui lòng chờ....</span>}
        </div>
      </div>
    </div>
  );
};

export default Chat;
