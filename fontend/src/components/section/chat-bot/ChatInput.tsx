import { useChat } from "@/hooks/useChat";
import { CirclePlus, CircleArrowUp, Pause } from "lucide-react";

const ChatInput = () => {
  const { prompt, setPrompt, sendMessage, stopChat, isPending, isPaused } =
    useChat();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isPending) return;
    sendMessage(prompt);
    setPrompt("");
  };

  return (
    <div className='flex w-full justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='flex items-center justify-between min-w-[768px] bg-gradient-to-r from-primary to-blue-600 rounded-full px-4 py-2 shadow-md'
      >
        <button type='button' className='p-2 text-white hover:opacity-70'>
          <CirclePlus className='w-8 h-8' />
        </button>
        <input
          type='text'
          className='flex-1 bg-white px-4 py-1 rounded-full outline-none text-gray-700 mx-4'
          placeholder='Hỏi bất cứ điều gì về sức khỏe của bạn'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {isPending && !isPaused ? (
          <button
            type='button'
            className='p-2 text-white hover:opacity-70'
            onClick={stopChat}
          >
            <Pause />
          </button>
        ) : (
          <button type='submit' className='p-2 text-white hover:opacity-70'>
            <CircleArrowUp className='w-8 h-8' />
          </button>
        )}
      </form>
    </div>
  );
};

export default ChatInput;
