import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: string; // формат: "2025-12-31T00:00:00"
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="mt-![40px] p-8 w-[40%] ">
      <motion.div
        className="flex justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {timeItems.map((item) => {
          const isSeconds = item.label === "Seconds";
          return (
            <div
              key={item.label}
              className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/50 rounded-xl p-4 flex flex-col items-center w-20"
            >
              <span className="text-2xl font-bold text-white">
                {item.value.toString().padStart(2, "0")}
              </span>
              <span className="text-xs text-purple-400 mt-1">{item.label}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// bg-purple-900/20 backdrop-blur-sm border-t border-purple-500/50 flex justify-center rounded-xl
