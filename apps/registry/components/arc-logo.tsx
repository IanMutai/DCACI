"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface ARCLogoProps {
  variant?: "full" | "icon" | "wordmark"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  theme?: "light" | "dark" | "color"
}

export default function ARCLogo({ variant = "full", size = "md", className, theme = "color" }: ARCLogoProps) {
  const sizes = {
    sm: { width: 100, height: 50 },
    md: { width: 140, height: 70 },
    lg: { width: 180, height: 90 },
    xl: { width: 220, height: 110 },
  }

  const s = sizes[size]

  // Use white logo for light theme (dark backgrounds), dark logo for dark/color theme (light backgrounds)
  const logoSrc = theme === "light" ? "/images/arc-logo-white.png" : "/images/arc-logo-dark.png"

  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src={logoSrc || "/placeholder.svg"}
        alt="ARC - African Registry for Carbon"
        width={s.width}
        height={s.height}
        className="object-contain"
        priority
      />
    </div>
  )
}
