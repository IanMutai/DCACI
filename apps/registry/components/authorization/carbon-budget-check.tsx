"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, TrendingDown, FileText, Shield } from "lucide-react"

interface CarbonBudgetCheckProps {
  projectCredits: number
  projectActivity: string
  onValidationComplete: (passed: boolean) => void
}

// Mock data for carbon budget and whitelisted activities
const CARBON_BUDGET = {
  total: 5000000, // Total carbon budget in tCO2eq
  allocated: 3200000, // Already allocated
  available: 1800000, // Available for new projects
  reservedForArticle6: 500000, // Reserved specifically for Article 6 projects
}

const WHITELISTED_ACTIVITIES = [
  "Renewable Energy",
  "Energy Efficiency",
  "Forestry and Land Use",
  "Waste Management",
  "Transport",
  "Industrial Processes",
  "Agriculture",
]

export default function CarbonBudgetCheck({
  projectCredits,
  projectActivity,
  onValidationComplete,
}: CarbonBudgetCheckProps) {
  const [isChecking, setIsChecking] = useState(false)
  const [checkComplete, setCheckComplete] = useState(false)
  const [results, setResults] = useState<{
    budgetCheck: boolean
    activityCheck: boolean
    message: string
  } | null>(null)

  const handleCheck = () => {
    setIsChecking(true)

    // Simulate API call to check budget and activity
    setTimeout(() => {
      const budgetAvailable = projectCredits <= CARBON_BUDGET.available
      const activityWhitelisted = WHITELISTED_ACTIVITIES.includes(projectActivity)

      const passed = budgetAvailable && activityWhitelisted

      let message = ""
      if (!budgetAvailable) {
        message = `Insufficient carbon budget. Project requires ${projectCredits.toLocaleString()} tCO2eq, but only ${CARBON_BUDGET.available.toLocaleString()} tCO2eq available.`
      } else if (!activityWhitelisted) {
        message = `Activity "${projectActivity}" is not in the whitelisted activities for Article 6.2.`
      } else {
        message = `Project meets all requirements. ${projectCredits.toLocaleString()} tCO2eq can be allocated from the available budget.`
      }

      setResults({
        budgetCheck: budgetAvailable,
        activityCheck: activityWhitelisted,
        message,
      })
      setIsChecking(false)
      setCheckComplete(true)
      onValidationComplete(passed)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif font-semibold text-foreground mb-2">Article 6.2 Eligibility Check</h3>
        <p className="text-sm text-muted-foreground">
          Verify that your project meets the carbon budget allocation and whitelisted activity requirements
        </p>
      </div>

      {/* Budget Overview */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/20 rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">National Carbon Budget</h4>
            <p className="text-xs text-muted-foreground">Current allocation status</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border/50">
            <div className="text-xs text-muted-foreground mb-1">Total Budget</div>
            <div className="text-lg font-bold text-foreground">{(CARBON_BUDGET.total / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">tCO2eq</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border/50">
            <div className="text-xs text-muted-foreground mb-1">Allocated</div>
            <div className="text-lg font-bold text-amber-600">{(CARBON_BUDGET.allocated / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">tCO2eq</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border/50">
            <div className="text-xs text-muted-foreground mb-1">Available</div>
            <div className="text-lg font-bold text-primary">{(CARBON_BUDGET.available / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">tCO2eq</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
            <span>Budget Utilization</span>
            <span>{((CARBON_BUDGET.allocated / CARBON_BUDGET.total) * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full transition-all"
              style={{ width: `${(CARBON_BUDGET.allocated / CARBON_BUDGET.total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-xl p-5 border border-border/50">
          <div className="text-xs text-muted-foreground mb-2">Project Credits</div>
          <div className="text-2xl font-bold text-foreground">{projectCredits.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">tCO2eq requested</div>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border/50">
          <div className="text-xs text-muted-foreground mb-2">Project Activity</div>
          <div className="text-lg font-semibold text-foreground">{projectActivity}</div>
        </div>
      </div>

      {/* Whitelisted Activities */}
      <div className="bg-card rounded-xl p-5 border border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-primary" />
          <h4 className="font-semibold text-foreground text-sm">Whitelisted Activities for Article 6.2</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {WHITELISTED_ACTIVITIES.map((activity) => (
            <div
              key={activity}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                activity === projectActivity
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-secondary/50 text-muted-foreground border-border/50"
              }`}
            >
              {activity}
            </div>
          ))}
        </div>
      </div>

      {/* Check Button */}
      {!checkComplete && (
        <button
          onClick={handleCheck}
          disabled={isChecking}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isChecking ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Checking Eligibility...
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              Check Eligibility
            </>
          )}
        </button>
      )}

      {/* Results */}
      {checkComplete && results && (
        <div
          className={`rounded-2xl p-6 border ${
            results.budgetCheck && results.activityCheck
              ? "bg-primary/5 border-primary/20"
              : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30"
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                results.budgetCheck && results.activityCheck ? "bg-primary" : "bg-red-500"
              }`}
            >
              {results.budgetCheck && results.activityCheck ? (
                <CheckCircle2 className="w-6 h-6 text-white" />
              ) : (
                <XCircle className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h4
                className={`font-semibold mb-2 ${
                  results.budgetCheck && results.activityCheck ? "text-primary" : "text-red-600 dark:text-red-400"
                }`}
              >
                {results.budgetCheck && results.activityCheck
                  ? "Eligibility Confirmed"
                  : "Eligibility Requirements Not Met"}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{results.message}</p>

              {/* Detailed Checks */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  {results.budgetCheck ? (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className={results.budgetCheck ? "text-foreground" : "text-red-600"}>Carbon Budget Check</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {results.activityCheck ? (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className={results.activityCheck ? "text-foreground" : "text-red-600"}>
                    Whitelisted Activity Check
                  </span>
                </div>
              </div>

              {results.budgetCheck && results.activityCheck && (
                <div className="mt-4 bg-card rounded-xl p-4 border border-border/50">
                  <div className="text-xs text-muted-foreground mb-1">Budget Allocation</div>
                  <div className="text-lg font-bold text-primary">{projectCredits.toLocaleString()} tCO2eq</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Remaining after allocation: {(CARBON_BUDGET.available - projectCredits).toLocaleString()} tCO2eq
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
