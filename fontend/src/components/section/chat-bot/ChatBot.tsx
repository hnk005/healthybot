import logo from "@/assets/image/logo/logo.png";

interface ChatBotProps {
  user: string;
  assistant: string;
}
const ChatBot: React.FC<ChatBotProps> = ({ user, assistant }) => {
  return (
    <div className='w-full mx-auto p-4 bg-white'>
      {user && (
        <div className='flex justify-end'>
          <div className='p-2 rounded-lg text-base bg-primary text-white'>
            <span className='break-words'>{user}</span>
          </div>
        </div>
      )}
      {assistant && (
        <div className='flex items-start space-x-2 w-full mt-10'>
          <img className='w-9 h-9 rounded-full' src={logo} alt='logo' />
          <div className='flex max-w-xl text-gray-500 text-base bg-gray-100 p-2 rounded-lg'>
            <span className='break-words'>
              {assistant.split("<br />").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
