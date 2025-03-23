import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const getTimeLeft = (target: Dayjs) => {
  const now = dayjs();
  const end = dayjs(target);
  const diff = end.diff(now);

  if (diff <= 0) return;

  const time = dayjs.duration(diff);
  return {
    hours: String(time.hours).padStart(2, "0"),
    minutes: String(time.minutes()).padStart(2, "0"),
    seconds: String(time.seconds()).padStart(2, "0"),
  };
};

const useCountdown = (targetTime: Dayjs) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return timeLeft;
};

export default useCountdown;
