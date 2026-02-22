"use client"

import { useEffect, useState } from "react"
import { Brain, Sparkles, Search, FileCode, CheckCircle } from "lucide-react"

interface ThinkingIndicatorProps {
  stage?: "analyzing" | "reasoning" | "generating" | "finalizing"
}

const stages = {
  analyzing: {
    icon: Search,
    text: "Analyzing your input...",
    subtext: "Understanding regulatory context",
  },
  reasoning: {
    icon: Brain,
    text: "Reasoning through requirements...",
    subtext: "Mapping to registry framework",
  },
  generating: {
    icon: FileCode,
    text: "Generating configuration...",
    subtext: "Building blueprint sections",
  },
  finalizing: {
    icon: CheckCircle,
    text: "Finalizing response...",
    subtext: "Validating output",
  },
}

export default function ThinkingIndicator({ stage = "analyzing" }: ThinkingIndicatorProps) {
  const [currentStage, setCurrentStage] = useState(stage)
  const [dots, setDots] = useState("")

  useEffect(() => {
    const stageOrder: Array<"analyzing" | "reasoning" | "generating" | "finalizing"> = [
      "analyzing",
      "reasoning",
      "generating",
      "finalizing",
    ]
    let index = stageOrder.indexOf(stage)

    const interval = setInterval(() => {
      index = (index + 1) % stageOrder.length
      setCurrentStage(stageOrder[index])
    }, 2000)

    return () => clearInterval(interval)
  }, [stage])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 400)

    return () => clearInterval(interval)
  }, [])

  const StageIcon = stages[currentStage].icon

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border shadow-sm animate-fade-up">
      {/* Animated icon container */}
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center animate-glow-pulse">
          <StageIcon size={20} className="text-primary" />
        </div>
        {/* Orbiting sparkle */}
        <div className="absolute -top-1 -right-1">
          <Sparkles size={12} className="text-primary animate-thinking-pulse" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        {/* Main thinking text with cursor */}
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-foreground">{stages[currentStage].text}</span>
          <span className="w-0.5 h-4 bg-primary animate-typing-cursor" />
        </div>

        {/* Subtext */}
        <p className="text-xs text-muted-foreground mt-1">
          {stages[currentStage].subtext}
          {dots}
        </p>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-primary/80 to-accent rounded-full animate-shimmer"
            style={{ width: "60%" }}
          />
        </div>
      </div>
    </div>
  )
}
