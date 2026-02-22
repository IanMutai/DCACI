"use client"

import { Download, CheckCircle2, FileText, Info } from "lucide-react"

interface Document {
  name: string
  size: string
  status: "complete" | "pending"
}

const uploadedDocuments: Document[] = [
  {
    name: "Requisite national and county government approval document.pdf",
    size: "2.4 MB",
    status: "complete",
  },
  {
    name: "Stakeholder consultation report.pdf",
    size: "1.8 MB",
    status: "complete",
  },
  {
    name: "Project validation report.pdf",
    size: "3.2 MB",
    status: "complete",
  },
]

export default function PDDDocumentsView() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Uploaded Project Design Documents</h2>
        <p className="text-muted-foreground">Review all submitted documentation for your project</p>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {uploadedDocuments.map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 border border-border/50 rounded-2xl bg-card hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{doc.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-muted-foreground">{doc.size}</p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-primary font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Complete
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-secondary rounded-xl transition-colors">
                <Download className="w-5 h-5 text-primary" />
              </button>
              <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PDD Details */}
      <div className="space-y-6 bg-gradient-to-br from-secondary/30 to-transparent rounded-2xl p-6 border border-border/50">
        <h3 className="text-lg font-serif font-semibold text-foreground">Project Design Document Details</h3>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-5 border border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Expected Credits Per Annum</p>
            <p className="text-2xl font-bold text-primary">40,030 tCO2eq</p>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Total Carbon Credit</p>
            <p className="text-2xl font-bold text-primary">54,500,390 tCO2eq</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-5 border border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Monitoring Methodology</p>
            <p className="text-sm text-foreground leading-relaxed">
              Continuous monitoring system with real-time data collection, quarterly verification, and annual
              third-party audits to ensure accurate carbon credit quantification and compliance with international
              standards.
            </p>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Carbon Crediting Period</p>
            <p className="text-2xl font-bold text-foreground">7 years</p>
            <p className="text-xs text-muted-foreground mt-1">Renewable upon review</p>
          </div>
        </div>
      </div>

      {/* Status Info */}
      <div className="bg-primary/5 rounded-2xl p-5 flex gap-4 border border-primary/20">
        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground leading-relaxed">
          All documents have been successfully uploaded and verified. Your PDD submission is complete and ready for
          committee review.
        </div>
      </div>
    </div>
  )
}
