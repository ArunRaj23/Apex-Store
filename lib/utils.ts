import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchAPI(url: string) {
  const response = await fetch(url)
  const data = await response.json()
  return data
}
