"use client"

import { useState } from "react"
import { Upload, Info } from "lucide-react"

interface CitizenshipSelectionProps {
  onSelect: (selection: "citizen" | "non-citizen") => void
}

export default function CitizenshipSelection({ onSelect }: CitizenshipSelectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleSelect = (value: "citizen" | "non-citizen") => {
    setSelected(value)
    setIsOpen(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Carbon Project Application Fee</h2>
        <p className="text-muted-foreground">Confirm citizenship to continue with payments</p>
      </div>

      {/* Citizenship Dropdown */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Choose Citizenship</label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full border border-border rounded-xl p-4 text-left flex items-center justify-between bg-card hover:border-primary/50 transition-colors"
          >
            <span className={selected ? "text-foreground" : "text-muted-foreground"}>
              {selected === "citizen"
                ? "Citizen"
                : selected === "non-citizen"
                  ? "Non-Citizen"
                  : "Select citizenship status"}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-xl mt-2 z-20 overflow-hidden shadow-xl">
              <button
                onClick={() => handleSelect("citizen")}
                className="w-full px-4 py-3 text-left hover:bg-primary/10 text-sm transition-colors"
              >
                Citizen
              </button>
              <button
                onClick={() => handleSelect("non-citizen")}
                className="w-full px-4 py-3 text-left hover:bg-primary/10 text-sm transition-colors border-t border-border"
              >
                Non-Citizen
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Section */}
      {selected && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Please upload your {selected === "citizen" ? "National ID" : "Passport"}
          </label>
          <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
            <input
              type="file"
              onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
              className="hidden"
              id="citizenship-upload"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <label htmlFor="citizenship-upload" className="cursor-pointer">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm">
                <span className="text-primary font-semibold">Click to upload</span>
                <span className="text-muted-foreground"> or drag and drop</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">PDF, JPG, PNG (max. 5MB)</div>
            </label>
          </div>

          {uploadedFile && (
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground flex-1">{uploadedFile.name}</span>
            </div>
          )}
        </div>
      )}

      {/* Citizen Note */}
      {selected === "citizen" && (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-5 flex gap-3 border border-amber-200 dark:border-amber-800/30">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
            <p>
              <strong className="text-foreground">Please note:</strong> A body corporate shall be regarded as a citizen
              only if the body corporate is wholly owned by one or more citizens.
            </p>
            <p>
              A body corporate held in trust shall be regarded as being held by a citizen only if all of the beneficial
              interest of the trust is held by persons who are citizens.
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button className="px-8 py-3 bg-secondary text-muted-foreground rounded-xl text-sm font-semibold hover:bg-secondary/80 transition-colors">
          GO BACK
        </button>
        <button
          onClick={() => selected && uploadedFile && onSelect(selected as "citizen" | "non-citizen")}
          disabled={!selected || !uploadedFile}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold disabled:opacity-50 hover:bg-primary/90 transition-colors"
        >
          {selected === "citizen" ? "CONFIRM PAYMENTS" : "PROCEED TO PAYMENTS"}
        </button>
      </div>
    </div>
  )
}
