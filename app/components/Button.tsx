
"use client"

import { type ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "destructive" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
  icon?: ReactNode
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  icon,
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
  
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
    destructive: "btn-destructive",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-gray-100 px-3 py-2 rounded-md",
  }

  const sizeClasses = {
    sm: "text-sm px-3 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${variant !== "ghost" ? sizeClasses[size] : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}
