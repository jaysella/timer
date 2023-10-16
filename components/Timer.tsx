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
    <div className="max-w-md p-8 mx-auto text-center text-white rounded-lg shadow-xl bg-slate-800">
      {isFinished && (
        <div className="text-xl font-bold mb-6 bg-sky-600 p-0.5 rounded-md uppercase">
          Time&apos;s up!
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
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-green-600 hover:bg-green-700"
            )}
          >
            {isActive ? <PauseIcon /> : <PlayIcon />}
          </button>
        ) : null}
        <button
          onClick={handleCancel}
          className="inline-flex justify-center w-full px-6 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
        >
          <RotateCcwIcon />
        </button>
      </div>
    </div>
  );
}
