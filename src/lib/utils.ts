import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate=(date:Date)=>{
  const currDate = new Date(date);
  const options:Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const formattedDate = currDate.toLocaleDateString("en-US", options);
  return formattedDate
}