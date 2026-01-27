import { useEffect, useState } from "react";

// Countdown structure
export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// Pad number to 2 digits
export function padNumber(num: number) {
  return num.toString().padStart(2, "0");
}

// Hook to calculate countdown to a target date
export function useCountdown(targetDate: Date | null): Countdown | null {
  const [timeLeft, setTimeLeft] = useState<Countdown | null>(calculateTimeRemaining(targetDate));

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null);
      return;
    }

    const update = () => setTimeLeft(calculateTimeRemaining(targetDate));
    update(); // initial call

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

// Calculate remaining time to a date
function calculateTimeRemaining(targetDate: Date | null): Countdown | null {
  if (!targetDate) return null;

  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
