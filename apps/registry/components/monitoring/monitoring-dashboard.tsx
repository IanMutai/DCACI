"use client"

import { useState } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import Link from "next/link"
import ProjectStatsBar from "@/components/project-stats-bar"
import ProjectLifecycleIndicator from "@/components/project-lifecycle-indicator"
import NotificationsPanel from "@/components/notifications-panel"
import MonitoringStepIndicator from "./monitoring-step-indicator"
import Step1ProjectDetails from "./step-1-project-details"
import Step2ProjectPerformance from "./step-2-project-performance"
import Step3Declaration from "./step-3-declaration"
import AnnualReportsView from "./annual-reports-view"
import SubmissionSuccess from "./submission-success"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type MonitoringView = "form" | "success" | "reports"

export default function MonitoringDashboard() {
  const [currentView, setCurrentView] = useState<MonitoringView>("form")
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedYear, setSelectedYear] = useState(1)

  const notifications = [
    {
      id: "1",
      title: "Kilifi Solar Project",
      message: "Please submit your annual progress reports",
      dismissible: true,
    },
    {
      id: "2",
      title: "Annual Reports",
      message: "You are yet to submit 6 annual reports",
      dismissible: true,
    },
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setCurrentView("success")
  }

  const handleViewReports = () => {
    setCurrentView("reports")
  }

  const handleUploadNew = () => {
    setCurrentStep(1)
    setCurrentView("form")
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
          revenueLabel="Finance raised"
        />

        {/* Lifecycle Indicator */}
        <div className="mt-10 mb-10">
          <ProjectLifecycleIndicator currentStage="monitoring" />
        </div>

        {/* Content Area with Notifications */}
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {currentView === "form" && (
              <div className="space-y-8">
                {/* Header with Year Selector */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-semibold text-foreground">Monitoring Period</h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-5">
                        Year {selectedYear} <ChevronDown size={16} className="ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-xl">
                      {[1, 2, 3, 4, 5, 6, 7].map((year) => (
                        <DropdownMenuItem
                          key={year}
                          onClick={() => setSelectedYear(year)}
                          className="rounded-lg cursor-pointer"
                        >
                          Year {year}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Step Indicator */}
                <MonitoringStepIndicator currentStep={currentStep} />

                {/* Step Content */}
                {currentStep === 1 && <Step1ProjectDetails onNext={handleNext} onBack={handleBack} />}
                {currentStep === 2 && <Step2ProjectPerformance onNext={handleNext} onBack={handleBack} />}
                {currentStep === 3 && <Step3Declaration onSubmit={handleSubmit} onBack={handleBack} />}
              </div>
            )}

            {currentView === "success" && <SubmissionSuccess onViewReports={handleViewReports} />}

            {currentView === "reports" && (
              <div className="space-y-8">
                <AnnualReportsView onUploadNew={handleUploadNew} />
                <div className="flex justify-end pt-4">
                  <Link
                    href="/issuance"
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    Proceed to Issuance
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
