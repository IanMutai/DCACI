"use client"

import type React from "react"
import Link from "next/link"
import {
  Plus,
  CheckSquare,
  FileText,
  Shield,
  Settings,
  Activity,
  CreditCard,
  ChevronDown,
  ArrowRightLeft,
} from "lucide-react"

interface LifecycleStep {
  id: string
  label: string
  icon: React.ReactNode
  href?: string
}

interface ProjectLifecycleIndicatorProps {
  currentStage: string
}

const lifecycleSteps: LifecycleStep[] = [
  { id: "creation", label: "Creation", icon: <Plus size={18} />, href: "/" },
  { id: "pcn", label: "PCN", icon: <CheckSquare size={18} />, href: "/pcn" },
  { id: "pdd", label: "PDD Submission", icon: <FileText size={18} />, href: "/pdd" },
  { id: "authorization", label: "Authorization (Optional)", icon: <Shield size={18} />, href: "/authorization" },
  { id: "implementation", label: "Implementation", icon: <Settings size={18} />, href: "/implementation" },
  { id: "monitoring", label: "Monitoring", icon: <Activity size={18} />, href: "/monitoring" },
  { id: "issuance", label: "Issuance", icon: <CreditCard size={18} />, href: "/issuance" },
  { id: "transfers", label: "Transfers (A6.2)", icon: <ArrowRightLeft size={18} />, href: "/transfers" },
]

export default function ProjectLifecycleIndicator({ currentStage }: ProjectLifecycleIndicatorProps) {
  const currentIndex = lifecycleSteps.findIndex((step) => step.id === currentStage)

  return (
    <div className="relative py-4">
      <div
        className="absolute -translate-x-1/2 flex flex-col items-center z-20 transition-all duration-300"
        style={{
          left: `calc(${(currentIndex / (lifecycleSteps.length - 1)) * 100}%)`,
          top: "8px",
        }}
      >
        <div className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg whitespace-nowrap">
          You're Here
        </div>
        <ChevronDown size={18} className="text-primary -mt-0.5" />
      </div>

      {/* Progress Line */}
      <div className="absolute top-[72px] left-6 right-6 h-0.5 bg-border">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${(currentIndex / (lifecycleSteps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="flex items-start justify-between pt-8 relative">
        {lifecycleSteps.map((step, index) => {
          const isCompleted = index < currentIndex
          const isActive = index === currentIndex

          const StepContent = (
            <div className="flex flex-col items-center group">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all z-10 ${
                  isCompleted
                    ? "bg-primary text-primary-foreground shadow-md"
                    : isActive
                      ? "bg-card border-2 border-primary text-primary shadow-md"
                      : "bg-card border border-border text-muted-foreground"
                } ${step.href ? "cursor-pointer group-hover:shadow-lg group-hover:scale-105" : ""}`}
              >
                {step.icon}
              </div>
              <span
                className={`text-[11px] mt-3 text-center max-w-[80px] leading-tight ${
                  isCompleted || isActive ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          )

          return (
            <div key={step.id} className="flex-1 flex justify-center">
              {step.href ? <Link href={step.href}>{StepContent}</Link> : StepContent}
            </div>
          )
        })}
      </div>
    </div>
  )
}
