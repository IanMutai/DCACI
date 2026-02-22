"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { FileText, Users, GitBranch, DollarSign, Globe, Shield, Heart, Loader2 } from "lucide-react"

interface Detection {
  id: string
  category: string
  items: string[]
  source: string
  confidence: "high" | "medium" | "low"
  status: "detecting" | "detected"
}

interface RegulationMapProps {
  isAnalyzing: boolean
  onComplete: () => void
}

const categoryIcons: Record<string, React.ElementType> = {
  lifecycle: GitBranch,
  roles: Users,
  article6: Globe,
  fees: DollarSign,
  community: Heart,
  verification: Shield,
}

export default function RegulationMap({ isAnalyzing, onComplete }: RegulationMapProps) {
  const [detections, setDetections] = useState<Detection[]>([])
  const [streamingText, setStreamingText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  const handleComplete = useCallback(() => {
    if (!isComplete) {
      setIsComplete(true)
      onComplete()
    }
  }, [isComplete, onComplete])

  useEffect(() => {
    if (!isAnalyzing) return

    const detectionsData: Detection[] = [
      {
        id: "lifecycle",
        category: "Project Lifecycle Stages",
        items: [
          "Project Concept Note (PCN)",
          "Project Design Document (PDD)",
          "Validation",
          "Registration",
          "Issuance",
          "Monitoring",
        ],
        source: "Regulations, Sec. 4.2",
        confidence: "high",
        status: "detecting",
      },
      {
        id: "roles",
        category: "Roles & Institutions",
        items: [
          "Designated National Authority (DNA)",
          "National Environment Authority",
          "Project Proponent",
          "Accredited Verifier",
        ],
        source: "Guidelines, Ch. 3",
        confidence: "high",
        status: "detecting",
      },
      {
        id: "article6",
        category: "Article 6 Terms",
        items: ["ITMO provisions", "Authorization requirements", "Corresponding Adjustments", "Bilateral agreements"],
        source: "Policy Note, Annex II",
        confidence: "medium",
        status: "detecting",
      },
      {
        id: "fees",
        category: "Fee Structure",
        items: ["Registration fees", "Issuance fees (per credit)", "Annual monitoring fees", "Climate fund allocation"],
        source: "Regulations, Sec. 7.1",
        confidence: "high",
        status: "detecting",
      },
      {
        id: "community",
        category: "Community Provisions",
        items: ["Benefit-sharing requirements", "FPIC obligations", "Grievance mechanisms"],
        source: "Guidelines, Annex IV",
        confidence: "medium",
        status: "detecting",
      },
    ]

    // Stream thinking text
    const thinkingPhrases = [
      "Scanning for key concepts...",
      "Extracting project lifecycle stages...",
      "Identifying institutional roles...",
      "Detecting Article 6 provisions...",
      "Mapping fee structures...",
      "Analyzing community requirements...",
      "Cross-referencing policy documents...",
      "Building regulation map...",
    ]

    let phraseIndex = 0
    const textInterval = setInterval(() => {
      if (phraseIndex < thinkingPhrases.length) {
        setStreamingText(thinkingPhrases[phraseIndex])
        phraseIndex++
      }
    }, 800)

    // Add detections one by one
    detectionsData.forEach((detection, index) => {
      setTimeout(
        () => {
          setDetections((prev) => [...prev, { ...detection, status: "detecting" }])
        },
        1000 + index * 800,
      )

      setTimeout(
        () => {
          setDetections((prev) => prev.map((d) => (d.id === detection.id ? { ...d, status: "detected" } : d)))
        },
        1500 + index * 800,
      )
    })

    // Complete
    const completeTimeout = setTimeout(() => {
      clearInterval(textInterval)
      setStreamingText("Analysis complete!")
      handleComplete()
    }, 6000)

    return () => {
      clearInterval(textInterval)
      clearTimeout(completeTimeout)
    }
  }, [isAnalyzing, handleComplete])

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "bg-green-100 text-green-700 border-green-200"
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "low":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      {/* Thinking ribbon */}
      {isAnalyzing && !isComplete && (
        <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <Loader2 size={16} className="text-primary animate-spin" />
          <span className="text-sm text-primary font-medium">{streamingText}</span>
          <span className="w-0.5 h-4 bg-primary animate-pulse" />
        </div>
      )}

      {/* Detection cards */}
      <div className="space-y-3">
        {detections.map((detection) => {
          const Icon = categoryIcons[detection.id] || FileText
          return (
            <div
              key={detection.id}
              className={`p-4 rounded-xl border transition-all duration-500 ${
                detection.status === "detected" ? "border-primary/30 bg-white shadow-sm" : "border-border bg-muted/30"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      detection.status === "detected" ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    {detection.status === "detected" ? (
                      <Icon size={18} className="text-white" />
                    ) : (
                      <Loader2 size={18} className="text-muted-foreground animate-spin" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{detection.category}</h4>
                    <p className="text-xs text-muted-foreground">{detection.source}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${getConfidenceColor(detection.confidence)}`}>
                  {detection.confidence} confidence
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {detection.items.map((item, i) => (
                  <span
                    key={i}
                    className={`text-sm px-3 py-1.5 rounded-lg transition-all ${
                      detection.status === "detected" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                    style={{
                      animationDelay: `${i * 100}ms`,
                      opacity: detection.status === "detected" ? 1 : 0.5,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
