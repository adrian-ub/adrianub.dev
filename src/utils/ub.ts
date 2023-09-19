import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function ub(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
