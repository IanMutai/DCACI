"use client"

import { useState } from "react"
import ProjectStatsBar from "@/components/project-stats-bar"
import ProjectLifecycleIndicator from "@/components/project-lifecycle-indicator"
import NotificationsPanel from "@/components/notifications-panel"
import { CheckCircle2, Calendar, AlertCircle, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ImplementationDashboard() {
  const [hasCommenced, setHasCommenced] = useState(false)
  const [commencementDate, setCommencementDate] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const notifications = [
    {
      id: "1",
      title: "Kilifi Solar Project",
      message: "You have 9 months remaining to commence project activities per Regulation 24.",
      progress: 75,
    },
  ]

  const handleCommencementDeclaration = () => {
    if (!commencementDate) {
      alert("Please select the commencement date")
      return
    }
    setHasCommenced(true)
    setShowSuccess(true)
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
          <ProjectLifecycleIndicator currentStage="implementation" />
        </div>

        {/* Content Area */}
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">Project Implementation</h2>

            {!hasCommenced ? (
              <div className="space-y-6">
                {/* Regulation Notice */}
                <div className="bg-primary/5 rounded-2xl p-5 flex gap-4 border border-primary/20">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="text-foreground font-semibold mb-2">Regulation 24 - Commencement of Project</p>
                    <p>
                      A project proponent shall commence the implementation of an approved carbon project within{" "}
                      <strong>twelve (12) months</strong> from the date of issuance of the Letter of Approval by the
                      Designated National Authority.
                    </p>
                  </div>
                </div>

                {/* Timeline Status */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Implementation Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Letter of Approval Issued</p>
                        <p className="text-xs text-muted-foreground">February 20, 2025</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Commencement Deadline</p>
                        <p className="text-xs text-muted-foreground">February 20, 2026 (12 months)</p>
                      </div>
                      <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                        9 months remaining
                      </div>
                    </div>
                  </div>
                </div>

                {/* Commencement Declaration Form */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Declare Project Commencement</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Once you have commenced project activities, please declare the commencement date below. This
                    declaration is required per Regulation 24 and must be submitted to the DNA within 14 days of project
                    commencement.
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Project Commencement Date *</label>
                      <input
                        type="date"
                        value={commencementDate}
                        onChange={(e) => setCommencementDate(e.target.value)}
                        className="w-full border border-border rounded-xl p-3 bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        max={new Date().toISOString().split("T")[0]}
                      />
                      <p className="text-xs text-muted-foreground">
                        Select the date when project activities officially commenced
                      </p>
                    </div>

                    <div className="bg-secondary/30 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Commencement Criteria</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                          <span>Physical construction or installation has begun</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                          <span>Project equipment has been delivered to site</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                          <span>Community engagement activities have started</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                          <span>Baseline monitoring has commenced</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCommencementDeclaration}
                      disabled={!commencementDate}
                      className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold disabled:opacity-50 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                      Submit Commencement Declaration
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Success Message */}
                {showSuccess && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-5 flex gap-4 border border-green-200 dark:border-green-800/30">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-700 dark:text-green-500">
                        Commencement Declaration Submitted Successfully!
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        Your project commencement has been recorded and the DNA has been notified per Regulation 24.
                      </p>
                    </div>
                  </div>
                )}

                {/* Commencement Details */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">Project Commenced</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Declared on {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      Active
                    </div>
                  </div>

                  <div className="space-y-3 mt-6">
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Commencement Date</span>
                      <span className="text-sm font-medium text-foreground">{commencementDate}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Letter of Approval Date</span>
                      <span className="text-sm font-medium text-foreground">February 20, 2025</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-sm text-muted-foreground">Time to Commencement</span>
                      <span className="text-sm font-medium text-green-600">Within regulatory period</span>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Next Steps
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-xl">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Begin Monitoring Activities</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Set up monitoring equipment and begin data collection per your PDD monitoring plan
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-xl">
                      <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Annual Progress Reports</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Submit annual progress reports to the DNA per Regulation 26
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/monitoring"
                    className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Go to Monitoring Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Panel */}
          <NotificationsPanel notifications={notifications} />
        </div>
      </div>
    </div>
  )
}
