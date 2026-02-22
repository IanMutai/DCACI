"use client"

import { useEffect, useState, useRef, useCallback } from "react"

interface StreamingTextProps {
  text: string
  speed?: number
  onComplete?: () => void
  className?: string
}

export default function StreamingText({ text, speed = 20, onComplete, className = "" }: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const hasCalledComplete = useRef(false)

  const handleComplete = useCallback(() => {
    if (!hasCalledComplete.current && onComplete) {
      hasCalledComplete.current = true
      onComplete()
    }
  }, [onComplete])

  useEffect(() => {
    setDisplayedText("")
    setIsComplete(false)
    indexRef.current = 0
    hasCalledComplete.current = false

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        // Add characters in small batches for more natural feel
        const charsToAdd = Math.min(3, text.length - indexRef.current)
        setDisplayedText(text.slice(0, indexRef.current + charsToAdd))
        indexRef.current += charsToAdd
      } else {
        setIsComplete(true)
        clearInterval(interval)
        handleComplete()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, handleComplete])

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />}
    </span>
  )
}
