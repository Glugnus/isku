import { useEffect, useState } from "react";

export const useCountdown = (initialSeconds: number = 0) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  const isRunning = secondsLeft > 0;

  const start = (seconds = initialSeconds) => {
    setSecondsLeft(seconds);
  };

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  return { secondsLeft, isRunning, start };
};
