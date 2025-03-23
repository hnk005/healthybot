import useCountdown from "@/hooks/useCountdown";
import { Dayjs } from "dayjs";

interface ExpiryTimerProps {
  expiryDate: Dayjs;
}

const ExpiryTimer: React.FC<ExpiryTimerProps> = ({ expiryDate }) => {
  const timeLeft = useCountdown(expiryDate);

  if (!timeLeft) {
    return (
      <span className='flex gap-4 justify-center items-center'>
        <span className='text-red-500 text-xl font-bold'>Mã đã hết hạn</span>
      </span>
    );
  }

  return (
    <span className='flex gap-4 justify-center items-center'>
      <span className='text-white text-md'>Mã sẽ hết hạn sau</span>
      <span className='text-red-500 text-xl font-bold'>
        {timeLeft.minutes}:{timeLeft.seconds}
      </span>
    </span>
  );
};

export default ExpiryTimer;
