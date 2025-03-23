import { useState } from "react";
import { Eye, EyeOff, XCircle, CheckCircle } from "lucide-react";
import { Transition } from "@headlessui/react";
import { useAuth } from "@/hooks/useAuth";

const Register = ({
  onClose,
  onOpenLogin,
}: {
  onClose: () => void;
  onOpenLogin: () => void;
}) => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const conditions = [
    { text: "Tối thiểu 8 ký tự", isValid: password.length >= 8 },
    { text: "Ít nhất 1 chữ in hoa (A-Z)", isValid: /[A-Z]/.test(password) },
    {
      text: "Ít nhất 1 ký tự đặc biệt (@, #, $...)",
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const isPasswordValid = conditions.every((condition) => condition.isValid);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setPasswordError("Mật khẩu chưa đạt đủ tiêu chí.");
      return;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
      return;
    } else {
      setConfirmPasswordError("");
    }

    const flag = await register(email, password);
    if (flag) {
      onClose();
    } else {
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className='bg-cyan-400 p-6 rounded-xl w-[500px] relative'>
      <button
        className='absolute top-2 right-2 hover:text-white'
        onClick={onClose}
      >
        <XCircle />
      </button>
      <h2 className='text-center text-white text-2xl font-bold'>Đăng ký</h2>

      <form onSubmit={handleRegister}>
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

        {/* Mật khẩu */}
        <div className='mt-4 relative'>
          <div className='relative'>
            <input
              className={`w-full p-3 rounded-full border-none focus:ring-2 ${
                passwordError ? "ring-red-500" : "focus:ring-primary"
              }`}
              type={showPassword ? "text" : "password"}
              placeholder='Mật khẩu'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowCriteria(true)}
              onBlur={() => setTimeout(() => setShowCriteria(false), 200)}
            />
            <button
              type='button'
              className='absolute top-1/2 right-4 transform -translate-y-1/2'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className='w-5 h-5 text-gray-700' />
              ) : (
                <EyeOff className='w-5 h-5 text-gray-700' />
              )}
            </button>
          </div>

          {/* Tiêu chí mật khẩu */}
          <Transition
            show={showCriteria}
            enter='transition-opacity duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='transition-opacity duration-150 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='absolute left-0 mt-2 flex flex-col gap-2 w-full p-3 bg-white border rounded-lg shadow-md text-sm z-[9999]'>
              {conditions.map((condition, index) => (
                <div
                  key={index}
                  className='flex items-center gap-2 text-gray-700'
                >
                  {condition.isValid ? (
                    <CheckCircle className='w-5 h-5 text-green-500' />
                  ) : (
                    <XCircle className='w-5 h-5 text-red-500' />
                  )}
                  <span>{condition.text}</span>
                </div>
              ))}
            </div>
          </Transition>

          {passwordError && (
            <p className='text-red-500 text-sm mt-1'>{passwordError}</p>
          )}
        </div>

        {/* Nhập lại mật khẩu */}
        <div className='mt-4 relative'>
          <div className='relative'>
            <input
              className={`w-full p-3 rounded-full border-none focus:ring-2 ${
                confirmPasswordError ? "ring-red-500" : "focus:ring-cyan-600"
              }`}
              type={showConfirmPassword ? "text" : "password"}
              placeholder='Nhập lại mật khẩu'
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type='button'
              className='absolute top-1/2 right-4 transform -translate-y-1/2'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <Eye className='w-5 h-5 text-gray-700' />
              ) : (
                <EyeOff className='w-5 h-5 text-gray-700' />
              )}
            </button>
          </div>

          {confirmPasswordError && (
            <p className='text-red-500 text-sm mt-1'>{confirmPasswordError}</p>
          )}
        </div>

        <div className='mt-4 relative flex justify-center items-center'>
          <button
            type='submit'
            className='w-36 bg-gray-300 p-3 rounded-full text-gray-800 font-bold hover:bg-white'
          >
            Đăng ký
          </button>
        </div>
      </form>

      <div
        className='mt-4 text-center text-white text-sm'
        onClick={onOpenLogin}
      >
        <span>
          Đã có tài khoản?{" "}
          <span className='font-semibold cursor-pointer hover:opacity-70'>
            Đăng nhập
          </span>
        </span>
      </div>
    </div>
  );
};

export default Register;
