"use client";

import { PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn, isWithinPercentage } from "@/lib/utils";

export default function Timer({ initialSeconds }: { initialSeconds: number }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isFinished, setIsFinished] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsFinished(true);
      setIsActive(false);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isActive, seconds]);

  const handleCancel = () => {
    setIsFinished(false);
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  const formattedSeconds = String(Math.floor(seconds / 60)).padStart(2, "0");
  const formattedMinutes = String(seconds % 60).padStart(2, "0");
  const formattedTime = `${formattedSeconds}:${formattedMinutes}`;

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white rounded-lg shadow-xl text-center p-8">
      {isFinished && (
        <div className="text-xl font-bold mb-6 bg-sky-600 p-0.5 rounded-md uppercase">
          Time's up!
        </div>
      )}

      <div
        className={cn(
          "text-8xl font-bold mb-6",
          isWithinPercentage(seconds, initialSeconds, 15) && "text-yellow-500"
        )}
      >
        {isFinished ? "00:00" : formattedTime}
      </div>

      <div className="flex justify-center space-x-4">
        {!isFinished ? (
          <button
            onClick={() => setIsActive(!isActive)}
            className={cn(
              "px-6 py-2 text-white rounded-lg focus:outline-none transition-colors w-full inline-flex justify-center",
              isActive
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            )}
          >
            {isActive ? <PauseIcon /> : <PlayIcon />}
          </button>
        ) : null}
        <button
          onClick={handleCancel}
          className="w-full inline-flex justify-center px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition-colors"
        >
          <RotateCcwIcon />
        </button>
      </div>
    </div>
  );
}
