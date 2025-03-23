import useCountdown from "@/hooks/useCountdown";
import { Dayjs } from "dayjs";
import { RefreshCcw } from "lucide-react";

interface ResendTimerProps {
  expiryDate: Dayjs;
  resendOtp: () => void;
}

const ResendTimer: React.FC<ResendTimerProps> = ({ expiryDate, resendOtp }) => {
  const timeLeft = useCountdown(expiryDate);

  if (!timeLeft) {
    return (
      <span className='flex gap-2 text-black text-lg font-semibold hover:opacity-70'>
        <RefreshCcw />
        <button onClick={resendOtp}>
          <span>Gửi lại mã</span>
        </button>
      </span>
    );
  }
  return <span>Gửi lại mã sau {timeLeft.seconds} s</span>;
};

export default ResendTimer;
