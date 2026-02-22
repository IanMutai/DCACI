"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"

interface PDDSubmissionProps {
  onSubmit: () => void
}

export default function PDDSubmission({ onSubmit }: PDDSubmissionProps) {
  const [formData, setFormData] = useState({
    annualCreditProjections: "",
    expectedCredits: "",
    totalCarbonCredit: "",
    monitoringMethodology: "",
    carbonCreditPeriod: "",
  })

  const getAdminFeeTier = () => {
    const annualCredits = Number.parseFloat(formData.annualCreditProjections) || 0
    if (annualCredits === 0) return null
    if (annualCredits <= 15000) return "15k-or-less"
    return "more-than-15k"
  }

  const tier = getAdminFeeTier()

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-[#008037]">Project Design Document</h2>

      {/* Document Uploads */}
      <div className="space-y-6">
        <p className="text-sm text-[#373737] font-medium">Please upload the following documents</p>

        {/* Government Approvals */}
        <div className="space-y-2">
          <label className="text-sm text-[#595959]">Requisite national and county government approvals</label>
          <div className="border-2 border-dashed border-[#e8e8e8] rounded-lg p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <svg className="w-6 h-6 text-[#828282]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="text-sm">
                <span className="text-[#008037] cursor-pointer">Click to upload</span>
                <span className="text-[#828282]"> or drag and drop</span>
              </div>
              <div className="text-xs text-[#828282]">PDF, DOCX (max. 3MB)</div>
            </div>
          </div>
        </div>

        {/* Stakeholder Report */}
        <div className="space-y-2">
          <label className="text-sm text-[#595959]">Stakeholder report</label>
          <div className="border-2 border-dashed border-[#e8e8e8] rounded-lg p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <svg className="w-6 h-6 text-[#828282]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="text-sm">
                <span className="text-[#008037] cursor-pointer">Click to upload</span>
                <span className="text-[#828282]"> or drag and drop</span>
              </div>
              <div className="text-xs text-[#828282]">PDF, DOCX (max. 3MB)</div>
            </div>
          </div>
        </div>

        {/* Project Validation Report */}
        <div className="space-y-2">
          <label className="text-sm text-[#595959]">Project validation report</label>
          <div className="border-2 border-dashed border-[#e8e8e8] rounded-lg p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <svg className="w-6 h-6 text-[#828282]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="text-sm">
                <span className="text-[#008037] cursor-pointer">Click to upload</span>
                <span className="text-[#828282]"> or drag and drop</span>
              </div>
              <div className="text-xs text-[#828282]">PDF, DOCX (max. 3MB)</div>
            </div>
          </div>
        </div>
      </div>

      {/* PDD Details Form */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[#008037]">Project Design Document Details</h3>

        {/* Annual Carbon Credit Projections */}
        <div className="space-y-2">
          <label className="text-sm text-[#595959]">
            Annual Carbon Credit Projections (tCO2eq) *
            <span className="text-xs text-muted-foreground ml-2">
              This determines your administrative fee tier per Schedule 2
            </span>
          </label>
          <input
            type="number"
            value={formData.annualCreditProjections}
            onChange={(e) => setFormData({ ...formData, annualCreditProjections: e.target.value })}
            placeholder="e.g., 25000"
            className="w-full border border-[#e8e8e8] rounded-lg p-3 text-sm focus:outline-none focus:border-[#008037]"
          />
          {tier && (
            <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-foreground">
                <strong>Auto-selected tier:</strong>{" "}
                {tier === "15k-or-less"
                  ? "≤15,000 credits/year (KES 150,000 fee)"
                  : ">15,000 credits/year (KES 300,000 fee)"}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-[#595959]">What is the expected Credits per annum?</label>
            <input
              type="text"
              value={formData.expectedCredits}
              onChange={(e) => setFormData({ ...formData, expectedCredits: e.target.value })}
              className="w-full border border-[#e8e8e8] rounded-lg p-3 text-sm focus:outline-none focus:border-[#008037]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#595959]">What is the total of Carbon Credit?</label>
            <input
              type="text"
              value={formData.totalCarbonCredit}
              onChange={(e) => setFormData({ ...formData, totalCarbonCredit: e.target.value })}
              className="w-full border border-[#e8e8e8] rounded-lg p-3 text-sm focus:outline-none focus:border-[#008037]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-[#595959]">A detailed description of the monitoring methodology</label>
            <input
              type="text"
              value={formData.monitoringMethodology}
              onChange={(e) => setFormData({ ...formData, monitoringMethodology: e.target.value })}
              className="w-full border border-[#e8e8e8] rounded-lg p-3 text-sm focus:outline-none focus:border-[#008037]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#595959]">The carbon credit period</label>
            <div className="relative">
              <input
                type="text"
                value={formData.carbonCreditPeriod}
                onChange={(e) => setFormData({ ...formData, carbonCreditPeriod: e.target.value })}
                className="w-full border border-[#e8e8e8] rounded-lg p-3 text-sm focus:outline-none focus:border-[#008037] pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#828282]" />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button onClick={onSubmit} className="px-8 py-2.5 bg-[#008037] text-white rounded-lg text-sm font-medium">
          CONTINUE PAYMENTS
        </button>
      </div>
    </div>
  )
}
