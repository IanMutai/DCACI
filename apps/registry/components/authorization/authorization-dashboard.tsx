"use client"

import { useState } from "react"
import Link from "next/link"
import ProjectStatsBar from "@/components/project-stats-bar"
import ProjectLifecycleIndicator from "@/components/project-lifecycle-indicator"
import NotificationsPanel from "@/components/notifications-panel"
import AuthorizationStepIndicator from "./authorization-step-indicator"
import Step1ProjectDetails from "./step-1-project-details"
import Step2EligibilityCriteria from "./step-2-eligibility-criteria"
import Step3BuyerDetails from "./step-3-buyer-details"
import Step4UploadDocuments from "./step-4-upload-documents"
import Step5Declaration from "./step-5-declaration"
import AuthorizationView from "./authorization-view"
import LetterTemplate from "@/components/letters/letter-template"
import LetterIssuedModal from "@/components/letters/letter-issued-modal"
import { ArrowRight, CheckCircle2, Clock, FileCheck, FileText } from "lucide-react"

type AuthView = "form" | "committee-review" | "view" | "approved"

export default function AuthorizationDashboard() {
  const [currentView, setCurrentView] = useState<AuthView>("form")
  const [currentStep, setCurrentStep] = useState(1)
  const [isRenewal, setIsRenewal] = useState(false)
  const [showLetterModal, setShowLetterModal] = useState(false)

  const serialNumber = "AUTH-2025-009012"

  const notifications = [
    {
      id: "1",
      title: "No Notifications",
      message: "There are no new notifications that need your attention at the moment!",
    },
  ]

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setCurrentView("committee-review")
  }

  const handleSimulateApproval = () => {
    setCurrentView("approved")
    setShowLetterModal(true)
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <div className="text-xs font-medium text-primary/60 uppercase tracking-wider">Project Name</div>
        <h1 className="text-3xl font-serif font-semibold text-foreground mt-1">Kilifi Solar Project</h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-card rounded-3xl border border-border/50 p-8 shadow-sm">
        {/* Stats Bar */}
        <ProjectStatsBar
          emissionReduction="25,123"
          annualGeneration="40 GWh"
          creditingPeriod="15 Years"
          projectedRevenue="$15,000"
        />

        {/* Lifecycle Indicator */}
        <div className="mt-10 mb-10">
          <ProjectLifecycleIndicator currentStage="authorization" />
        </div>

        {/* Content Area with Notifications */}
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Form View */}
            {currentView === "form" && (
              <div className="space-y-8">
                <div className="space-y-3">
                  <h2 className="text-2xl font-serif font-semibold text-foreground">Authorization Application</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Complete the authorization application for Article 6.2 international transfer of mitigation outcomes
                    per Regulation 23.
                  </p>
                </div>

                {/* Step Indicator */}
                <AuthorizationStepIndicator currentStep={currentStep} />

                {/* Step Content */}
                {currentStep === 1 && <Step1ProjectDetails onNext={handleNext} onBack={handleBack} />}
                {currentStep === 2 && <Step2EligibilityCriteria onNext={handleNext} onBack={handleBack} />}
                {currentStep === 3 && <Step3BuyerDetails onNext={handleNext} onBack={handleBack} />}
                {currentStep === 4 && (
                  <Step4UploadDocuments onNext={handleNext} onBack={handleBack} isRenewal={isRenewal} />
                )}
                {currentStep === 5 && <Step5Declaration onSubmit={handleSubmit} onBack={handleBack} />}
              </div>
            )}

            {/* Committee Review View */}
            {currentView === "committee-review" && (
              <div className="space-y-8">
                <div className="space-y-3">
                  <h2 className="text-2xl font-serif font-semibold text-foreground">Cabinet Secretary Review Status</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your authorization request is being reviewed by the Cabinet Secretary for Environment and Climate
                    Change per Regulation 23(4).
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="border border-border/50 rounded-2xl p-8 bg-gradient-to-br from-secondary/50 to-secondary/20">
                    <div className="space-y-8">
                      <div className="flex gap-5">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                            <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div className="w-0.5 h-14 bg-primary mt-2"></div>
                        </div>
                        <div className="pt-1">
                          <div className="font-semibold text-foreground">Eligibility Confirmed</div>
                          <div className="text-sm text-muted-foreground mt-1">Carbon budget and activity validated</div>
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                            <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div className="w-0.5 h-14 bg-primary mt-2"></div>
                        </div>
                        <div className="pt-1">
                          <div className="font-semibold text-foreground">Application Submitted</div>
                          <div className="text-sm text-muted-foreground mt-1">March 10, 2025</div>
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-sm">
                            <Clock className="w-5 h-5 text-white" />
                          </div>
                          <div className="w-0.5 h-14 bg-border mt-2"></div>
                        </div>
                        <div className="pt-1">
                          <div className="font-semibold text-foreground">Cabinet Secretary Review</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Regulation 23(4) - In progress - Expected completion: March 24, 2025
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full w-3/4 transition-all"></div>
                            </div>
                            <span className="text-xs font-medium text-amber-600">75%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center border border-border">
                            <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="pt-1">
                          <div className="font-semibold text-muted-foreground">Authorization Letter</div>
                          <div className="text-sm text-muted-foreground mt-1">Pending review completion</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSimulateApproval}
                    className="px-6 py-3 bg-primary/10 text-primary rounded-xl text-sm font-semibold hover:bg-primary/20 transition-colors"
                  >
                    [Demo] Simulate Authorization Approval
                  </button>
                </div>
              </div>
            )}

            {/* View View */}
            {currentView === "view" && (
              <div className="space-y-8">
                <AuthorizationView />
                <div className="flex justify-end pt-6">
                  <Link
                    href="/implementation"
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    Proceed to Implementation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Approved View */}
            {currentView === "approved" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 flex gap-4 border border-primary/20 shadow-lg shadow-primary/5">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-primary text-lg">Authorization Granted!</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your project has been authorized for Article 6.2 international transfer of mitigation outcomes.
                      Serial Number: <span className="font-mono font-bold">{serialNumber}</span>
                    </p>
                  </div>
                </div>

                <LetterTemplate
                  type="authorization"
                  serialNumber={serialNumber}
                  projectName="Kilifi Solar Project"
                  proponentName="Naima Salim"
                  issuedDate={new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  registrationNumber="723ueiw823jkdw"
                  country="Kenya"
                />

                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl hover:bg-secondary transition-colors">
                    <FileCheck className="w-4 h-4" />
                    Verify Document
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
                    <FileText className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>

                <div className="pt-6 border-t border-border">
                  <Link
                    href="/implementation"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                  >
                    Proceed to Implementation
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <p className="text-sm text-muted-foreground mt-3">
                    You have completed the authorization process. Continue to project implementation per Regulation 24.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Panel */}
          <NotificationsPanel notifications={notifications} />
        </div>
      </div>

      {/* Letter Issued Modal */}
      <LetterIssuedModal
        isOpen={showLetterModal}
        onClose={() => setShowLetterModal(false)}
        type="authorization"
        serialNumber={serialNumber}
        projectName="Kilifi Solar Project"
        onContinue={() => setShowLetterModal(false)}
      />
    </div>
  )
}
