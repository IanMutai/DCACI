"use client"

import { useState } from "react"
import StepIndicator from "./step-indicator"
import Step1ProjectDetails from "./form-sections/step-1-project-details"
import Step2ProponentDetails from "./form-sections/step-2-proponent-details"
import Step3ProprietorDetails from "./form-sections/step-3-proprietor-details"
import Step4SponsorDetails from "./form-sections/step-4-sponsor-details"
import Step5CarbonEmissions from "./form-sections/step-5-carbon-emissions"
import Step6Payments from "./form-sections/step-6-payments"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Save, CheckCircle2, Sparkles } from "lucide-react"

export default function ProjectOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const steps = [
    { number: 1, label: "Project Details" },
    { number: 2, label: "Proponent Details" },
    { number: 3, label: "Proprietor Details" },
    { number: 4, label: "Sponsor/Upfront Buyer" },
    { number: 5, label: "Carbon Emissions" },
    { number: 6, label: "Payments" },
  ]

  const handleNext = async () => {
    setIsSaving(true)
    setShowSuccess(false)

    await new Promise((resolve) => setTimeout(resolve, 800))

    setShowSuccess(true)
    await new Promise((resolve) => setTimeout(resolve, 400))

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }

    setIsSaving(false)
    setShowSuccess(false)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1ProjectDetails />
      case 2:
        return <Step2ProponentDetails />
      case 3:
        return <Step3ProprietorDetails />
      case 4:
        return <Step4SponsorDetails />
      case 5:
        return <Step5CarbonEmissions />
      case 6:
        return <Step6Payments onBack={handleBack} />
      default:
        return <Step1ProjectDetails />
    }
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-up">
      <div className="mb-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground leading-tight">Project Onboarding</h1>
                <p className="text-primary text-sm font-semibold mt-0.5">Project Concept Note (PCN)</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
              Complete your project submission with confidence. Aligned with Kenya's Climate Change (Carbon Markets)
              Regulations, 2024 for seamless approval.
            </p>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/60 rounded-xl shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-emerald-900">Kenya Compliant</div>
              <div className="text-[10px] text-emerald-700">Climate Standards 2024</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      <div className="mb-12">
        <div key={currentStep} className="animate-fade-up">
          {renderStepContent()}
        </div>
      </div>

      {currentStep < 6 && (
        <div className="flex justify-between items-center gap-4 pt-8 pb-12 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </div>
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={isSaving}
                className="px-6 py-6 h-auto rounded-xl border-border text-foreground hover:bg-secondary bg-card flex items-center gap-2.5 transition-all shadow-sm hover:shadow font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={isSaving}
              className="relative overflow-hidden bg-gradient-to-br from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-white px-8 py-6 h-auto rounded-xl font-semibold flex items-center gap-2.5 transition-all min-w-[200px] shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              {showSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 animate-scale-in" />
                  <span className="animate-scale-in">Saved!</span>
                </>
              ) : isSaving ? (
                <>
                  <Save className="w-5 h-5 animate-pulse" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>Save and Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
              {isSaving && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
