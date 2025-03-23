import { useState } from "react";
import { Eye, EyeOff, XCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ForgotPassword from "./ForgotPassword";

const Login = ({
  onClose,
  openRegister,
}: {
  onClose: () => void;
  openRegister: () => void;
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const flag = await login(email, password);
    if (flag) {
      onClose();
    } else {
      setPassword("");
    }
  };

  if (forgotPassword) {
    return <ForgotPassword onClose={() => setForgotPassword(false)} />;
  }

  return (
    <div className='bg-cyan-400 p-6 rounded-xl w-[500px] relative'>
      <button
        className='absolute top-2 right-2 hover:text-white'
        onClick={onClose}
      >
        <XCircle />
      </button>
      <h2 className='text-center text-white text-2xl font-bold'>Đăng nhập</h2>
      <form onSubmit={handleLogin} method='dialog'>
        <div className='mt-4'>
          <input
            autoFocus
            type='email'
            placeholder='Email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-3 rounded-full border-none focus:ring-2 focus:ring-cyan-600'
          />
        </div>
        <div className='mt-4 relative'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Mật khẩu'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-3 rounded-full border-none focus:ring-2 focus:ring-cyan-600'
          />
          <button
            type='button'
            className='absolute top-1/2 right-4 transform -translate-y-1/2'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <div
          className='mt-2 text-right'
          onClick={() => setForgotPassword(true)}
        >
          <span className='text-white font-semibold cursor-pointer text-sm hover:opacity-70'>
            Quên mật khẩu?
          </span>
        </div>
        <div className='mt-4 relative flex justify-center items-center'>
          <button
            type='submit'
            className='w-36 bg-gray-300 p-3 rounded-full text-gray-800 font-bold hover:bg-white'
          >
            Đăng nhập
          </button>
        </div>
      </form>
      <div className='mt-4 text-center text-white text-sm'>
        <span>
          Chưa có tài khoản?{" "}
          <span
            className='font-semibold cursor-pointer hover:opacity-70'
            onClick={openRegister}
          >
            Đăng ký
          </span>
        </span>
      </div>
    </div>
  );
};

export default Login;
