"use client"

import { Info } from "lucide-react"

interface AdminFeeSelectionProps {
  annualCredits?: number
  onProceed: () => void
}

export default function AdminFeeSelection({ annualCredits = 0, onProceed }: AdminFeeSelectionProps) {
  const credits = annualCredits || 0
  const tier = credits <= 15000 ? "standard" : "large-scale"
  const fee = tier === "standard" ? "150,000" : "300,000"

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Administrative Fee Calculation</h2>
        <p className="text-muted-foreground">
          Based on your PDD submission with {credits.toLocaleString()} annual carbon credits
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 flex gap-4 border border-blue-200 dark:border-blue-800/30">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Administrative fees (Regulation 22(9)(a))</strong> are automatically
          calculated based on your project's projected annual carbon credit issuance as specified in your Project Design
          Document. This fee covers the cost of technical review, validation, and registration services per Schedule 2
          of the regulations.
        </div>
      </div>

      {/* Auto-Selected Tier Display */}
      <div className="p-8 border-2 border-primary rounded-2xl bg-primary/5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-semibold text-foreground text-xl mb-1">
              {tier === "standard" ? "Standard Tier" : "Large Scale Tier"}
            </div>
            <div className="text-sm text-muted-foreground">
              {tier === "standard" ? "≤ 15,000" : "> 15,000"} credits/year
            </div>
          </div>
          <div className="px-4 py-2 bg-primary/20 rounded-full">
            <span className="text-sm font-semibold text-primary">Auto-Selected</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-6 border border-primary/20">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary">KES {fee}</span>
            <span className="text-sm text-muted-foreground">administrative fee</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          Your project has {credits.toLocaleString()} projected annual carbon credits, which automatically qualifies for
          the {tier === "standard" ? "Standard Tier (≤15,000 credits/year)" : "Large Scale Tier (>15,000 credits/year)"}
          .
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onProceed}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  )
}
