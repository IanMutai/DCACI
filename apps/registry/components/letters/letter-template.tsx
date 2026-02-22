"use client"

import { Download, ExternalLink, CheckCircle2 } from "lucide-react"
import ARCLogo from "@/components/arc-logo"

interface LetterTemplateProps {
  type: "no-objection" | "approval" | "authorization"
  serialNumber: string
  projectName: string
  proponentName: string
  issuedDate: string
  expiryDate?: string
  registrationNumber: string
  country?: string
  onDownload?: () => void
}

export default function LetterTemplate({
  type,
  serialNumber,
  projectName,
  proponentName,
  issuedDate,
  expiryDate,
  registrationNumber,
  country = "Kenya",
  onDownload,
}: LetterTemplateProps) {
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

  const getLetterContent = () => {
    switch (type) {
      case "no-objection":
        return `This is to certify that the National Designated Authority (NDA) for ${country}, operating through the ARC platform, has reviewed the Project Concept Note (PCN) submitted for the above-referenced project and has no objection to its continued development.

The project proponent is hereby authorized to proceed with the preparation of the Project Design Document (PDD) in accordance with the applicable guidelines and regulations.`
      case "approval":
        return `This is to certify that the National Designated Authority (NDA) for ${country}, operating through the ARC platform, has reviewed and approved the Project Design Document (PDD) submitted for the above-referenced project.

The project has met all regulatory requirements and is hereby granted approval to proceed with implementation.`
      case "authorization":
        return `This is to certify that the National Designated Authority (NDA) for ${country}, operating through the ARC platform, has authorized the transfer and use of Internationally Transferred Mitigation Outcomes (ITMOs) from the above-referenced project.

This authorization is granted in accordance with Article 6 of the Paris Agreement and applicable national regulations.`
    }
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Letter Preview */}
      <div className="p-8 bg-card">
        <div className="max-w-2xl mx-auto border border-border rounded-xl p-8 bg-secondary/30">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border pb-6 mb-6">
            <div className="flex items-center gap-4">
              {/* ARC Logo */}
              <ARCLogo theme="dark" size="md" showTagline={false} />
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Serial Number</div>
              <div className="text-sm font-mono font-bold text-primary">{serialNumber}</div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-foreground uppercase tracking-wide">{getLetterTitle()}</h1>
            <div className="w-16 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
          </div>

          {/* Project Details */}
          <div className="bg-card rounded-xl p-4 mb-6 border border-border">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Project Name:</span>
                <div className="font-medium text-foreground">{projectName}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Registration Number:</span>
                <div className="font-medium text-foreground">{registrationNumber}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Project Proponent:</span>
                <div className="font-medium text-foreground">{proponentName}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Issue Date:</span>
                <div className="font-medium text-foreground">{issuedDate}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Country:</span>
                <div className="font-medium text-foreground">{country}</div>
              </div>
              {expiryDate && (
                <div>
                  <span className="text-muted-foreground">Valid Until:</span>
                  <div className="font-medium text-foreground">{expiryDate}</div>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="text-sm text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
            {getLetterContent()}
          </div>

          {/* Signature Section */}
          <div className="border-t border-border pt-6 mt-6">
            <div className="flex justify-between items-end">
              <div>
                <div className="w-32 border-b border-foreground mb-2"></div>
                <div className="text-sm font-medium text-foreground">National Designated Authority</div>
                <div className="text-xs text-muted-foreground">{country}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">Official Seal</div>
                <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Verification Note */}
          <div className="mt-6 p-4 bg-primary/5 rounded-xl text-xs text-muted-foreground border border-primary/10">
            <p className="font-medium text-primary mb-1">Document Verification</p>
            <p>
              This document can be verified at <span className="text-primary font-medium">arc-registry.org/verify</span>{" "}
              using the serial number above.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 bg-secondary/50 border-t border-border flex justify-between items-center">
        <a
          href="/public/verify"
          target="_blank"
          className="flex items-center gap-2 text-sm text-primary hover:underline font-medium"
          rel="noreferrer"
        >
          <ExternalLink size={16} />
          Verify Document
        </a>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>
    </div>
  )
}
