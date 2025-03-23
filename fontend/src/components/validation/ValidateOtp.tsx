import { useState, useRef, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import ExpiryTimer from "./ExpiryTimer";
import ResendTimer from "./ResendTimer";
import { useAuth } from "@/hooks/useAuth";
import { AxiosResponse } from "axios";

const ValidateOtp = ({
  title,
  email,
  verify,
  resend,
  onClose,
}: {
  title: string;
  email: string;
  verify?: (email: string, otp: string) => Promise<AxiosResponse>;
  resend?: (emai: string) => Promise<void>;
  onClose: () => void;
}) => {
  const { verifyOtp, resendOtp } = useAuth();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [expiryTimer, setExpiryTimer] = useState<Dayjs>(
    dayjs().add(5, "minute"),
  );
  const [resendTimer, setResendTimer] = useState<Dayjs>(
    dayjs().add(60, "second"),
  );

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const disabledVerify = useMemo(
    () => otp.some((value) => value === ""),
    [otp],
  );

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleResend = () => {
    if (resend) {
      resendOtp(() => resend(email));
      setOtp(["", "", "", "", "", ""]);
      const newExpiryTimer = dayjs().add(5, "minute");
      setExpiryTimer(newExpiryTimer);
      setResendTimer(dayjs().add(60, "second"));
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className='bg-primary p-6 rounded-xl text-center'>
      <h2 className='text-white text-2xl font-bold mb-2'>{title}</h2>
      <p className='text-white'>Vui lòng nhập mã OTP vừa gửi tới email</p>
      <p className='text-white font-semibold'>{email}</p>
      <div className='flex justify-center gap-4 mt-4'>
        {otp.map((digit, index) => (
          <input
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            key={index}
            type='text'
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            maxLength={1}
            autoFocus={index === 0}
            className='w-14 h-24 text-center text-xl bg-white rounded-xl border border-gray-300'
          />
        ))}
      </div>
      <div className='mt-4 flex justify-between items-center text-white'>
        <ResendTimer expiryDate={resendTimer} resendOtp={handleResend} />
        <ExpiryTimer expiryDate={expiryTimer} />
      </div>
      <div className='mt-4 mx-10 flex gap-2 justify-between'>
        <button
          onClick={onClose}
          className='bg-gray-300 px-8 py-3 rounded-3xl text-black hover:opacity-70'
        >
          Hủy bỏ
        </button>
        <button
          disabled={disabledVerify}
          onClick={
            verify && (() => verifyOtp(() => verify(email, otp.join(""))))
          }
          className={`${
            disabledVerify ? "bg-gray-400" : "bg-gray-300 hover:opacity-70"
          } px-8 py-3 rounded-3xl text-black`}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default ValidateOtp;
