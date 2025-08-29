
"use client"

import { type ReactNode } from "react"

interface CardProps {
  children: ReactNode
  variant?: "default" | "outline"
  className?: string
}

export function Card({ children, variant = "default", className = "" }: CardProps) {
  const variantClasses = {
    default: "card",
    outline: "card-outline",
  }

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}
