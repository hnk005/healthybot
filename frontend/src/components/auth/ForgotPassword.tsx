import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const ForgotPassword = ({ onClose }: { onClose: () => void }) => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const flag = await forgotPassword(email);
    if (flag) {
      onClose();
    } else {
      setEmail("");
    }
  };

  return (
    <div className='bg-cyan-400 p-6 rounded-xl w-[500px] relative'>
      <h2 className='text-center text-white text-2xl font-bold'>
        Khôi phục mật khẩu
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='mt-4'>
          <input
            autoFocus
            type='email'
            placeholder='Nhập email của bạn'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-3 rounded-full border-none focus:ring-2 focus:ring-cyan-600'
          />
        </div>

        <div className='mt-4 mx-10 flex gap-2 justify-between'>
          <button
            type='button'
            onClick={onClose}
            className='bg-gray-300 px-8 py-3 rounded-3xl text-black hover:opacity-70'
          >
            Hủy bỏ
          </button>
          <button
            type='submit'
            className='w-36 bg-gray-300 p-3 rounded-full text-gray-800 font-bold hover:bg-white'
          >
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
