import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isWithinPercentage(
  number: number,
  target: number,
  percentage: number
): boolean {
  // calculate acceptable range
  const range = target * (percentage / 100);

  // check if the number falls within the acceptable range
  return number <= range;
}
