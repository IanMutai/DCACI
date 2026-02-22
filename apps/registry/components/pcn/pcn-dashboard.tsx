"use client"

import { useState } from "react"
import Link from "next/link"
import ProjectStatsBar from "@/components/project-stats-bar"
import ProjectLifecycleIndicator from "@/components/project-lifecycle-indicator"
import NotificationsPanel from "@/components/notifications-panel"
import LetterTemplate from "@/components/letters/letter-template"
import LetterIssuedModal from "@/components/letters/letter-issued-modal"
import { FileText, CheckCircle2, Clock, AlertCircle, Upload, Download, ArrowRight, CreditCard } from "lucide-react"

type PCNView = "submission" | "committee-review" | "approved" | "correction-requested" | "rejected"

export default function PCNDashboard() {
  const [currentView, setCurrentView] = useState<PCNView>("approved")
  const [activeTab, setActiveTab] = useState<"submit" | "view" | "status">("status")
  const [showLetterModal, setShowLetterModal] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [citizenship, setCitizenship] = useState<"citizen" | "non-citizen" | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"ecitizen" | "ussd">("ussd")

  const serialNumber = "LONO-2025-001234"

  const notifications = [
    {
      id: "1",
      title: "Kilifi Solar Project",
      message: "Your PCN is under review. Expected completion in 10-14 business days.",
    },
  ]

  const handleSubmit = () => {
    // Simulate payment processing
    console.log("[v0] Processing PCN submission with payment")
    setTimeout(() => {
      setCurrentView("committee-review")
      setActiveTab("status")
    }, 2000)
  }

  const handleApproval = () => {
    setCurrentView("approved")
    setShowLetterModal(true)
  }

  const handleContinueToPDD = () => {
    setShowLetterModal(false)
  }

  const handlePaymentComplete = () => {
    setCurrentView("committee-review")
    setActiveTab("status")
  }

  const getApplicationFee = () => {
    return citizenship === "citizen" ? "10,000" : "100,000"
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
          <ProjectLifecycleIndicator currentStage="pcn" />
        </div>

        {/* Content Area */}
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="border-b border-border/50 mb-8">
              <div className="flex gap-10">
                {[
                  { key: "submit", label: "Submit PCN" },
                  { key: "view", label: "View PCN" },
                  { key: "status", label: "PCN Status" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`pb-4 text-sm font-medium border-b-2 transition-all ${
                      activeTab === tab.key
                        ? "text-primary border-primary"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Tab */}
            {activeTab === "submit" && (
              <>
                {currentView === "submission" ? (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground">Submit Project Concept Note</h2>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 flex gap-4 border border-blue-200 dark:border-blue-800/30">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        <p className="text-foreground font-semibold mb-2">
                          Regulation 21 - Application for Carbon Project
                        </p>
                        <p>
                          Submit your Project Concept Note (PCN) along with the application fee. The DNA will review
                          your submission within <strong>14 days</strong> and issue a Letter of No Objection if
                          approved.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">Citizenship Status *</label>
                      <select
                        value={citizenship || ""}
                        onChange={(e) => setCitizenship(e.target.value as "citizen" | "non-citizen")}
                        className="w-full border border-border rounded-xl p-4 bg-card text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select citizenship status</option>
                        <option value="citizen">Citizen</option>
                        <option value="non-citizen">Non-Citizen</option>
                      </select>
                      <p className="text-xs text-muted-foreground">
                        Application fee: Citizens - KES 10,000 | Non-Citizens - KES 100,000
                      </p>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">Upload PCN Document *</label>
                      <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                        <input
                          type="file"
                          onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                          className="hidden"
                          id="pcn-upload"
                          accept=".pdf,.docx"
                        />
                        <label htmlFor="pcn-upload" className="cursor-pointer">
                          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                            <Upload className="w-6 h-6 text-primary" />
                          </div>
                          <div className="text-sm">
                            <span className="text-primary font-semibold">Click to upload</span>
                            <span className="text-muted-foreground"> or drag and drop</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">PDF, DOCX (max. 10MB)</div>
                        </label>
                      </div>
                      {uploadedFile && (
                        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-foreground flex-1">{uploadedFile.name}</span>
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                      )}
                    </div>

                    {citizenship && uploadedFile && (
                      <div className="border border-border/50 rounded-2xl p-6 bg-secondary/20 space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">Payment Required</h3>
                            <p className="text-sm text-muted-foreground">Application fee per Second Schedule</p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-4 border border-primary/20">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-primary">KES {getApplicationFee()}</span>
                            <span className="text-sm text-muted-foreground">application fee</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm font-medium text-foreground">Payment Method</label>
                          <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center ${
                                  paymentMethod === "ecitizen" ? "bg-primary" : "border border-border"
                                }`}
                                onClick={() => setPaymentMethod("ecitizen")}
                              >
                                {paymentMethod === "ecitizen" && <CheckCircle2 className="w-3 h-3 text-white" />}
                              </div>
                              <span className="text-sm text-foreground">eCitizen Portal</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center ${
                                  paymentMethod === "ussd" ? "bg-primary" : "border border-border"
                                }`}
                                onClick={() => setPaymentMethod("ussd")}
                              >
                                {paymentMethod === "ussd" && <CheckCircle2 className="w-3 h-3 text-white" />}
                              </div>
                              <span className="text-sm text-foreground">USSD (M-Pesa)</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-6">
                      <button className="px-8 py-3 bg-secondary text-muted-foreground rounded-xl text-sm font-semibold hover:bg-secondary/80 transition-colors">
                        Save Draft
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!uploadedFile || !citizenship}
                        className="px-8 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold disabled:opacity-50 hover:bg-primary/90 transition-colors flex items-center gap-2"
                      >
                        Submit PCN & Pay
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-foreground">PCN Already Submitted</h3>
                      <p className="text-muted-foreground">
                        Your PCN has been submitted. Check the Status tab for updates.
                      </p>
                      <button
                        onClick={() => setActiveTab("status")}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                      >
                        View Status
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* View Tab */}
            {activeTab === "view" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Project Concept Note</h2>

                <div className="border border-border/50 rounded-2xl p-6 bg-card space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">Kilifi Solar Farm PCN</h3>
                      <p className="text-sm text-muted-foreground mt-1">Submitted: January 10, 2025</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>

                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                      <p>
                        <strong>Project Type:</strong> Solar Energy
                      </p>
                      <p>
                        <strong>Location:</strong> Kilifi County, Kenya
                      </p>
                      <p>
                        <strong>Estimated Emission Reduction:</strong> 25,123 tCO2e annually
                      </p>
                      <p>
                        <strong>Crediting Period:</strong> 15 years
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Status Tab - Committee Review */}
            {activeTab === "status" && currentView === "committee-review" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Committee Review Status</h2>

                <div className="space-y-6">
                  <div className="border border-border/50 rounded-2xl p-8 bg-secondary/30">
                    <div className="space-y-8">
                      <div className="flex gap-5">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                            <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div className="w-0.5 h-14 bg-primary mt-2"></div>
                        </div>
                        <div className="pt-1">
                          <div className="font-semibold text-foreground">PCN Submitted & Payment Processed</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            January 10, 2025 • KES {citizenship === "citizen" ? "10,000" : "100,000"} paid
                          </div>
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
                          <div className="font-semibold text-foreground">DNA Review</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            In progress - Expected completion: January 24, 2025 (14 business days per Regulation 21)
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full w-2/3 transition-all"></div>
                            </div>
                            <span className="text-xs font-medium text-amber-600">67%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center border border-border">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="pt-1">
                          <div className="font-semibold text-muted-foreground">Letter of No Objection</div>
                          <div className="text-sm text-muted-foreground mt-1">Pending DNA approval</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Demo: Simulate Approval */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleApproval}
                      className="px-6 py-3 bg-primary/10 text-primary rounded-xl text-sm font-semibold hover:bg-primary/20 transition-colors"
                    >
                      [Demo] Simulate DNA Approval
                    </button>
                    <button
                      onClick={() => setCurrentView("correction-requested")}
                      className="px-6 py-3 bg-amber-50 text-amber-600 rounded-xl text-sm font-semibold hover:bg-amber-100 transition-colors border border-amber-200"
                    >
                      [Demo] Simulate Correction Request
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "status" && currentView === "correction-requested" && (
              <div className="space-y-8">
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 flex gap-4 border border-amber-200 dark:border-amber-800/30">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-900 dark:text-amber-100">Corrections Requested</p>
                    <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                      The review committee has requested additional information for your PCN submission.
                    </p>
                  </div>
                </div>

                <div className="border border-border/50 rounded-2xl p-6 bg-card">
                  <h3 className="font-semibold text-foreground mb-4">Committee Feedback</h3>
                  <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Please provide additional details on the following:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
                      <li>Detailed stakeholder engagement plan</li>
                      <li>Environmental impact assessment documentation</li>
                      <li>Updated project timeline with milestones</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentView("submission")}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Update Submission
                  </button>
                </div>
              </div>
            )}

            {/* Status Tab - Approved with Letter */}
            {activeTab === "status" && currentView === "approved" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-semibold text-foreground">PCN Approved</h2>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Letter of No Objection Issued</span>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 flex gap-4 border border-green-200 dark:border-green-800/30">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100">Congratulations!</p>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Your Project Concept Note has been approved. Your Letter of No Objection is ready for download.
                    </p>
                  </div>
                </div>

                {/* Letter Preview */}
                <div className="border border-border/50 rounded-2xl overflow-hidden bg-white">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Letter of No Objection</h3>
                          <p className="text-sm text-muted-foreground">Serial No: {serialNumber}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>

                  <div className="p-8">
                    <LetterTemplate
                      serialNumber={serialNumber}
                      projectName="Kilifi Solar Project"
                      proponentName="Kilifi Solar Ltd."
                      letterType="no-objection"
                      issueDate="January 24, 2025"
                    />
                  </div>
                </div>

                {/* Next Steps */}
                <div className="border border-border/50 rounded-2xl p-6 bg-secondary/20">
                  <h3 className="font-semibold text-foreground mb-4">Next Steps</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Regulation 22:</strong> You have{" "}
                      <strong className="text-accent">12 months</strong> from the date of this Letter of No Objection to
                      submit your Project Design Document (PDD) for validation.
                    </p>
                    <p>Failure to submit the PDD within this timeframe will require resubmission of the PCN.</p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/pdd"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Proceed to PDD Submission
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "status" && currentView === "rejected" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-serif font-semibold text-foreground">PCN Rejected</h2>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 flex gap-4 border border-red-200 dark:border-red-800/30">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-900 dark:text-red-100">Your PCN has been rejected</p>
                    <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                      Please review the feedback below and make necessary corrections before resubmitting.
                    </p>
                  </div>
                </div>

                <div className="border border-border/50 rounded-2xl p-6 bg-card">
                  <h3 className="font-semibold text-foreground mb-4">Feedback</h3>
                  <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The following issues were identified in your submission:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
                      <li>Incomplete stakeholder engagement plan</li>
                      <li>Missing environmental impact assessment documentation</li>
                      <li>Incorrect project timeline</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentView("submission")}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Resubmit PCN
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Panel */}
          <div className="w-80">
            <NotificationsPanel notifications={notifications} />
          </div>
        </div>
      </div>

      {/* Letter Issued Modal */}
      {showLetterModal && currentView === "approved" && (
        <LetterIssuedModal
          letterType="no-objection"
          serialNumber={serialNumber}
          onContinue={handleContinueToPDD}
          onClose={() => setShowLetterModal(false)}
        />
      )}
    </div>
  )
}
