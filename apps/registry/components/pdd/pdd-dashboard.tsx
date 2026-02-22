"use client"

import { useState } from "react"
import Link from "next/link"
import ProjectStatsBar from "@/components/project-stats-bar"
import ProjectLifecycleIndicator from "@/components/project-lifecycle-indicator"
import NotificationsPanel from "@/components/notifications-panel"
import PDDSubmission from "./pdd-submission"
import PDDDocumentsView from "./pdd-documents-view"
import LetterTemplate from "@/components/letters/letter-template"
import LetterIssuedModal from "@/components/letters/letter-issued-modal"
import AdminFeeSelection from "./admin-fee-selection"
import AdminFeePayment from "./admin-fee-payment"
import { CheckCircle2, FileText, ArrowRight, Clock, CreditCard } from "lucide-react"

type PDDView =
  | "pdd-submission"
  | "committee-review"
  | "admin-fee-selection"
  | "admin-fee-payment"
  | "pdd-approved"
  | "pdd-view"
  | "correction-requested"

export default function PDDDashboard() {
  const [currentView, setCurrentView] = useState<PDDView>("pdd-submission")
  const [activeTab, setActiveTab] = useState<"submit" | "view" | "status">("submit")
  const [selectedCredits, setSelectedCredits] = useState<"15k-or-less" | "more-than-15k" | null>(null)
  const [citizenship, setCitizenship] = useState<"citizen" | "non-citizen">("citizen")
  const [showLetterModal, setShowLetterModal] = useState(false)
  const [annualCredits, setAnnualCredits] = useState<number>(25000)

  const serialNumber = "LOA-2025-005678"

  const notifications = [
    {
      id: "1",
      title: "Kilifi Solar Project",
      message: "You have 9 months remaining to submit your Project Design Documents.",
      progress: 75,
    },
  ]

  const handlePDDSubmit = (credits: number) => {
    setActiveTab("status")
    setCurrentView("committee-review")
    setAnnualCredits(credits)
  }

  const handleDNAApproval = () => {
    setCurrentView("admin-fee-selection")
  }

  const handleAdminFeeProceed = () => {
    const tier = annualCredits <= 15000 ? "15k-or-less" : "more-than-15k"
    setSelectedCredits(tier)
    setCurrentView("admin-fee-payment")
  }

  const handleAdminFeePayment = () => {
    setCurrentView("pdd-approved")
    setShowLetterModal(true)
  }

  const getPDDFee = (): string => {
    return citizenship === "citizen" ? "100,000" : "200,000"
  }

  const getAdminFee = (): string => {
    return selectedCredits === "15k-or-less" ? "150,000" : "300,000"
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="text-xs text-muted-foreground">Project Name</div>
        <h1 className="text-2xl font-semibold text-foreground">Kilifi Solar Project</h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-card rounded-2xl border border-border p-6">
        {/* Stats Bar */}
        <ProjectStatsBar
          emissionReduction="25,123"
          annualGeneration="40 GWh"
          creditingPeriod="15 Years"
          projectedRevenue="$15,000"
        />

        {/* Lifecycle Indicator */}
        <div className="mt-8 mb-8">
          <ProjectLifecycleIndicator currentStage="pdd" />
        </div>

        {/* Content Area with Tabs and Notifications */}
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            {(currentView === "pdd-submission" ||
              currentView === "pdd-view" ||
              currentView === "pdd-approved" ||
              currentView === "committee-review") && (
              <div className="border-b border-border mb-6">
                <div className="flex gap-8">
                  <button
                    onClick={() => {
                      setActiveTab("submit")
                      if (currentView !== "pdd-approved") setCurrentView("pdd-submission")
                    }}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "submit"
                        ? "text-primary border-primary"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    SUBMIT PROJECT DESIGN DOCUMENT
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("view")
                      if (currentView !== "pdd-approved") setCurrentView("pdd-view")
                    }}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "view"
                        ? "text-primary border-primary"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    VIEW PROJECT DESIGN DOCUMENT
                  </button>
                  <button
                    onClick={() => setActiveTab("status")}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "status"
                        ? "text-primary border-primary"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    VIEW PDD STATUS
                  </button>
                </div>
              </div>
            )}

            {/* PDD Submission View */}
            {currentView === "pdd-submission" && <PDDSubmission onSubmit={(credits) => handlePDDSubmit(credits)} />}

            {/* Committee Review Status */}
            {activeTab === "status" && currentView === "committee-review" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-serif font-semibold text-foreground">PDD Review Status</h2>

                <div className="space-y-6">
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="w-0.5 h-14 bg-primary mt-2"></div>
                    </div>
                    <div className="pt-1">
                      <div className="font-semibold text-foreground">PDD Submitted & Fee Paid</div>
                      <div className="text-sm text-muted-foreground mt-1">February 10, 2025 • KES 100,000 paid</div>
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
                      <div className="font-semibold text-foreground">Ad Hoc Committee Review</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        In progress - Expected completion: March 12, 2025 (30 business days per Regulation 22)
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full w-1/2 transition-all"></div>
                        </div>
                        <span className="text-xs font-medium text-amber-600">50%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center border border-border">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="w-0.5 h-14 bg-border mt-2"></div>
                    </div>
                    <div className="pt-1">
                      <div className="font-semibold text-muted-foreground">DNA Approval</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Pending committee recommendation (14 days after committee report)
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center border border-border">
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="font-semibold text-muted-foreground">Administrative Fee & Letter of Approval</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Payable upon DNA approval per Regulation 22(9)(a)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Demo Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleDNAApproval}
                    className="px-6 py-3 bg-primary/10 text-primary rounded-xl text-sm font-semibold hover:bg-primary/20 transition-colors"
                  >
                    [Demo] Simulate DNA Approval
                  </button>
                </div>
              </div>
            )}

            {currentView === "admin-fee-selection" && (
              <div className="space-y-8">
                <div className="bg-primary/5 rounded-2xl p-5 flex gap-4 border border-primary/20">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-primary">PDD Approved by DNA!</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your PDD has been approved. Please pay the administrative fee to receive your Letter of Approval
                      (per Regulation 22(9)(a)).
                    </p>
                  </div>
                </div>
                <AdminFeeSelection annualCredits={annualCredits} onProceed={handleAdminFeeProceed} />
              </div>
            )}

            {/* Admin Fee Payment */}
            {currentView === "admin-fee-payment" && (
              <AdminFeePayment
                projectName="Kilifi Solar Project"
                projectType="Solar"
                feeAmount={getAdminFee()}
                citizenship={citizenship}
                creditSelection={selectedCredits}
                onProceed={handleAdminFeePayment}
                onBack={() => setCurrentView("admin-fee-selection")}
              />
            )}

            {/* PDD View */}
            {currentView === "pdd-view" && (
              <div className="space-y-6">
                <PDDDocumentsView />
              </div>
            )}

            {/* PDD Approved */}
            {currentView === "pdd-approved" && (
              <div className="space-y-6">
                <div className="bg-primary/5 rounded-xl p-4 flex gap-3 border border-primary/10">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Administrative Fee Paid & Letter Issued!</p>
                    <p className="text-sm text-muted-foreground">
                      Your Letter of Approval has been issued. Serial Number:{" "}
                      <span className="font-mono font-bold">{serialNumber}</span>
                    </p>
                  </div>
                </div>

                <LetterTemplate
                  type="approval"
                  serialNumber={serialNumber}
                  projectName="Kilifi Solar Project"
                  proponentName="Naima Salim"
                  issuedDate="February 20, 2025"
                  registrationNumber="723ueiw823jkdw"
                  country="Kenya"
                />

                {/* Choose Your Project Pathway */}
                <div className="space-y-6">
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Choose Your Project Pathway</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Select whether your project will participate in Article 6.2 international transfers or proceed
                      with VCM implementation
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Article 6.2 - Authorization Path */}
                      <Link
                        href="/authorization"
                        className="group relative overflow-hidden rounded-2xl border-2 border-border hover:border-primary transition-all duration-300 bg-gradient-to-br from-card to-card/50"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <CheckCircle2 className="w-6 h-6 text-primary" />
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              Article 6.2
                            </span>
                          </div>

                          <h4 className="text-base font-semibold text-foreground mb-2">Proceed to Authorization</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            Apply for authorization to participate in international ITMO transfers through bilateral
                            agreements with acquiring countries
                          </p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-start gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                              <span>Government-to-government agreements</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                              <span>Higher credit value potential</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                              <span>Cabinet Secretary approval required</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                            Apply for Authorization
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Link>

                      {/* VCM - Implementation Path */}
                      <Link
                        href="/implementation"
                        className="group relative overflow-hidden rounded-2xl border-2 border-border hover:border-primary transition-all duration-300 bg-gradient-to-br from-card to-card/50"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                              <ArrowRight className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              VCM
                            </span>
                          </div>

                          <h4 className="text-base font-semibold text-foreground mb-2">Proceed to Implementation</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            Begin project implementation for the Voluntary Carbon Market without international ITMO
                            transfers
                          </p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-start gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                              <span>Faster implementation process</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                              <span>Access to VCM buyers</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                              <span>No authorization needed</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm font-medium text-green-600 group-hover:gap-3 transition-all">
                            Start Implementation
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
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
        type="approval"
        serialNumber={serialNumber}
        projectName="Kilifi Solar Project"
        onContinue={() => setShowLetterModal(false)}
      />
    </div>
  )
}
