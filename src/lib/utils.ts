import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function generateQRCode(data: string) {
  // In a real app, this would generate an actual QR code
  return `QR-${data.toUpperCase()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + "..."
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function getEventStatusColor(status: string) {
  switch (status.toUpperCase()) {
    case "UPCOMING":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "ONGOING":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "COMPLETED":
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    case "CANCELLED":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}
