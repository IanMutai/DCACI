"use client"

import { Check } from "lucide-react"

interface Step {
  id: number
  label: string
}

const steps: Step[] = [
  { id: 1, label: "Project Details" },
  { id: 2, label: "Project performance" },
  { id: 3, label: "Declaration" },
]

interface MonitoringStepIndicatorProps {
  currentStep: number
}

export default function MonitoringStepIndicator({ currentStep }: MonitoringStepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep
        const isActive = step.id === currentStep

        return (
          <div key={step.id} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check size={14} /> : step.id}
              </div>
              <span
                className={`text-xs ${
                  isCompleted ? "text-primary" : isActive ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && <span className="text-border mx-1">----</span>}
          </div>
        )
      })}
    </div>
  )
}
