import { ReactElement, useState } from "react";
import { CirclePlus, CircleArrowUp } from "lucide-react";
import ChatBot from "./ChatBot";

const InputChat = (): ReactElement => {
  const [message, setMessage] = useState("");

  return (
    <div className='flex flex-col h-full items-center justify-between w-full mx-auto p-4'>
      {/* <ChatBot></ChatBot> */}
      <div className='flex h-full w-full flex-col items-center justify-center mb-10'>
        <h2 className='text-4xl font-medium mb-6'>
          Tôi có thể giúp gì cho sức khỏe của bạn?
        </h2>
        <div className='flex items-center justify-between w-full bg-gradient-to-r from-primary to-blue-600 rounded-full px-4 py-2 shadow-md'>
          <button className='p-2 text-white hover:opacity-70'>
            <CirclePlus className='w-8 h-8' />
          </button>
          <input
            type='text'
            className='flex-1 bg-white px-4 py-1 rounded-full outline-none text-gray-700 mx-4'
            placeholder='Hỏi bất cứ điều gì về sức khỏe của bạn'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className='p-2 text-white hover:opacity-70'>
            <CircleArrowUp className='w-8 h-8' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputChat;
