import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function ub(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { ub };
