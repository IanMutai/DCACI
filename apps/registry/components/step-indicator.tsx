import { Users, FileText, Building, DollarSign, Leaf, CreditCard } from "lucide-react"

interface Step {
  number: number
  label: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const numberWords = ["One", "Two", "Three", "Four", "Five", "Six"]

  const getStepIcon = (stepNumber: number) => {
    const icons = [
      <FileText size={14} key="1" />,
      <Users size={14} key="2" />,
      <Building size={14} key="3" />,
      <DollarSign size={14} key="4" />,
      <Leaf size={14} key="5" />,
      <CreditCard size={14} key="6" />,
    ]
    return icons[stepNumber - 1] || <FileText size={14} />
  }

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-between bg-card rounded-2xl p-5 border border-border/50 shadow-sm min-w-max">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep
          const isActive = step.number === currentStep

          return (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  isCompleted || isActive ? "bg-primary" : "bg-card border border-border/50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isCompleted || isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {getStepIcon(step.number)}
                </div>
                <div className="text-xs">
                  <div
                    className={
                      isCompleted || isActive
                        ? "text-primary-foreground/70 text-[10px] font-medium"
                        : "text-muted-foreground text-[10px] font-medium"
                    }
                  >
                    Step {numberWords[step.number - 1]}
                  </div>
                  <div
                    className={`font-semibold text-xs whitespace-nowrap ${
                      isCompleted || isActive ? "text-primary-foreground" : "text-primary"
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && <div className="w-6 mx-2 border-t-2 border-dashed border-border" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
