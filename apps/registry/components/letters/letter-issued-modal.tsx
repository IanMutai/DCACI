"use client"

import { CheckCircle2, Download, ExternalLink, X } from "lucide-react"
import Link from "next/link"

interface LetterIssuedModalProps {
  isOpen: boolean
  onClose: () => void
  type: "no-objection" | "approval" | "authorization"
  serialNumber: string
  projectName: string
  onDownload?: () => void
  onContinue?: () => void
}

export default function LetterIssuedModal({
  isOpen,
  onClose,
  type,
  serialNumber,
  projectName,
  onDownload,
  onContinue,
}: LetterIssuedModalProps) {
  if (!isOpen) return null

  const getLetterTitle = () => {
    switch (type) {
      case "no-objection":
        return "Letter of No Objection"
      case "approval":
        return "Letter of Approval"
      case "authorization":
        return "Letter of Authorization"
    }
  }

  const getNextStep = () => {
    switch (type) {
      case "no-objection":
        return "You can now proceed to the PDD Submission stage."
      case "approval":
        return "You can now proceed to the Authorization stage."
      case "authorization":
        return "Your project is now authorized for ITMO transfers."
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-card rounded-2xl max-w-md w-full mx-4 overflow-hidden shadow-xl border border-border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-xl font-bold text-foreground mb-2">{getLetterTitle()} Issued!</h2>
          <p className="text-muted-foreground mb-6">
            Your {getLetterTitle().toLowerCase()} has been successfully issued for{" "}
            <span className="font-medium text-foreground">{projectName}</span>.
          </p>

          {/* Serial Number */}
          <div className="bg-secondary rounded-xl p-4 mb-6">
            <div className="text-xs text-muted-foreground mb-1">Serial Number</div>
            <div className="text-lg font-mono font-bold text-primary">{serialNumber}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Use this serial number to verify the document authenticity
            </p>
          </div>

          {/* Next Step */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 mb-6 text-sm text-muted-foreground border border-amber-200 dark:border-amber-800/30">
            {getNextStep()}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              <Download size={18} />
              Download {getLetterTitle()}
            </button>

            <Link
              href="/public/verify"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border text-muted-foreground rounded-xl font-medium hover:bg-secondary transition-colors"
            >
              <ExternalLink size={18} />
              Verify on Public Portal
            </Link>

            {onContinue && (
              <button onClick={onContinue} className="w-full px-4 py-3 text-primary font-medium hover:underline">
                Continue to Next Stage
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
