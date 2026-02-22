"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Upload } from "lucide-react"

interface Step1Props {
  onNext: () => void
  onBack: () => void
}

export default function Step1ProjectDetails({ onNext, onBack }: Step1Props) {
  const [submissionType, setSubmissionType] = useState<string | null>(null)
  const [showSubmissionDropdown, setShowSubmissionDropdown] = useState(false)
  const [previouslyRejected, setPreviouslyRejected] = useState<string | null>(null)
  const [showRejectedDropdown, setShowRejectedDropdown] = useState(false)

  const isRenewal = submissionType === "renewal"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Name of Project Proponent</span>
        <span className="text-sm text-muted-foreground">Date</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary rounded-xl p-3">
          <span className="text-sm text-foreground">Naima Salim</span>
        </div>
        <div className="bg-secondary rounded-xl p-3">
          <span className="text-sm text-foreground">12/12/2024</span>
        </div>
      </div>

      {/* Project Details Section */}
      <h3 className="text-lg font-serif font-semibold text-primary">Project details</h3>

      {/* Project Name */}
      <div>
        <label className="block text-sm text-foreground mb-2">Project Name</label>
        <div className="bg-secondary rounded-xl p-3">
          <span className="text-sm text-foreground">Kilifi Solar Panel</span>
        </div>
      </div>

      {/* Submission Request */}
      <div>
        <label className="block text-sm text-foreground mb-2">Submission Request (Please choose the relevant)</label>
        <div className="relative">
          <button
            onClick={() => setShowSubmissionDropdown(!showSubmissionDropdown)}
            className="w-full border border-primary rounded-xl p-3 text-left flex items-center justify-between bg-card"
          >
            <span className="text-xs text-primary absolute -top-2 left-3 bg-card px-1">Please choose the relevant</span>
            <span className={submissionType ? "text-foreground text-sm" : "text-muted-foreground text-sm"}>
              {submissionType === "first"
                ? "Request for authorisation"
                : submissionType === "renewal"
                  ? "Request for renewal of authorisation period."
                  : ""}
            </span>
            <ChevronDown size={16} className={`transition-transform ${showSubmissionDropdown ? "rotate-180" : ""}`} />
          </button>
          {showSubmissionDropdown && (
            <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-xl mt-1 z-20 overflow-hidden shadow-lg">
              <button
                onClick={() => {
                  setSubmissionType("first")
                  setShowSubmissionDropdown(false)
                }}
                className="w-full px-4 py-3 text-left hover:bg-primary/10 text-sm"
              >
                Request for authorisation
              </button>
              <button
                onClick={() => {
                  setSubmissionType("renewal")
                  setShowSubmissionDropdown(false)
                }}
                className="w-full px-4 py-3 text-left hover:bg-primary/10 text-sm bg-primary/5"
              >
                Request for renewal of authorisation period.
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Original Letter - Only for Renewal */}
      {isRenewal && (
        <div>
          <label className="block text-sm text-foreground mb-2">
            Please upload the original Letter of Authorization
          </label>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <Upload size={24} className="text-muted-foreground" />
              <div className="text-sm">
                <span className="text-primary cursor-pointer font-medium">Click to upload</span>
                <span className="text-muted-foreground"> or drag and drop</span>
              </div>
              <div className="text-xs text-muted-foreground">PDF, DOCX (max. 3MB)</div>
            </div>
          </div>
        </div>
      )}

      {/* Previously Rejected */}
      <div>
        <label className="block text-sm text-foreground mb-2">
          Has the Designated National Authority previously rejected a request for authorisation related to the same
          carbon project?
        </label>
        <div className="relative">
          <button
            onClick={() => setShowRejectedDropdown(!showRejectedDropdown)}
            className="w-full border border-primary rounded-xl p-3 text-left flex items-center justify-between bg-card"
          >
            <span className="text-xs text-primary absolute -top-2 left-3 bg-card px-1">Please choose the relevant</span>
            <span className={previouslyRejected ? "text-foreground text-sm" : "text-muted-foreground text-sm"}>
              {previouslyRejected === "yes" ? "Yes" : previouslyRejected === "no" ? "No" : ""}
            </span>
            <ChevronDown size={16} className={`transition-transform ${showRejectedDropdown ? "rotate-180" : ""}`} />
          </button>
          {showRejectedDropdown && (
            <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-xl mt-1 z-20 overflow-hidden shadow-lg">
              <button
                onClick={() => {
                  setPreviouslyRejected("no")
                  setShowRejectedDropdown(false)
                }}
                className="w-full px-4 py-3 text-left hover:bg-primary/10 text-sm"
              >
                No
              </button>
              <button
                onClick={() => {
                  setPreviouslyRejected("yes")
                  setShowRejectedDropdown(false)
                }}
                className="w-full px-4 py-3 text-left hover:bg-primary/10 text-sm bg-primary/5"
              >
                Yes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* If Yes - Additional Details */}
      {previouslyRejected === "yes" && (
        <div>
          <label className="block text-sm text-foreground mb-2">If yes, please provide the following details</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="date of first submission"
                className="w-full border border-border rounded-xl p-3 text-sm pr-10 bg-card"
              />
              <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="reason for rejection (1-2 lines only)"
              className="w-full border border-border rounded-xl p-3 text-sm bg-card"
            />
          </div>
        </div>
      )}

      {/* Volume of Carbon Credits */}
      <div>
        <label className="block text-sm text-foreground mb-2">
          Specify the volume of carbon Credit/Internationally Transferred Mitigation Outcomes (ITMOs) (in tCO2eq) for
          which authorisation is being sought
        </label>
        <input type="text" className="w-full border border-border rounded-xl p-3 text-sm bg-card" />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-secondary text-muted-foreground rounded-xl text-sm font-semibold hover:bg-secondary/80 transition-colors"
        >
          Go Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Save and Continue
        </button>
      </div>
    </div>
  )
}
