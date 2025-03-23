import { useState } from "react";
import logo from "@/assets/image/logo/logo.png";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Tôi bị đau đầu", sender: "user" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text) => {
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Vui lòng chờ trong giây lát...", sender: "assistant" },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className='w-full max-w-3xl mx-auto mt-10 p-4 bg-white'>
      <div className='overflow-y-auto p-3'>
        <div className='flex justify-end'>
          <div className='p-2 max-w-xl rounded-lg text-base bg-primary text-white'>
            <span className='break-words'>
              Tôi bị đau
              đầuaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </span>
          </div>
        </div>

        <div className='flex items-start space-x-2 w-full mt-10'>
          {/* Ảnh đại diện */}
          <div className='shrink-0'>
            <img className='w-9 h-9 rounded-full' src={logo} alt='logo' />
          </div>

          {/* Nội dung tin nhắn */}
          <div className='flex-1 max-w-2xl text-gray-500 text-base bg-gray-100 p-2 rounded-lg'>
            <span className='break-words'>
              hhee Bạn muốn component này bằng React hay Angular? Và có cần tích
              hợp thêm logic chat bot không hay chỉ cần UI giống
              vậy1231231231231231231212312312312312312312312312312312312312111111111111111111111
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
