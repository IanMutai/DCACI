"use client"

import { useState } from "react"
import { Download, CheckCircle, FileText } from "lucide-react"

type ViewTab = "project-details" | "eligibility" | "buyer" | "uploaded" | "letter"

export default function AuthorizationView() {
  const [activeTab, setActiveTab] = useState<ViewTab>("uploaded")

  const tabs = [
    { id: "project-details" as ViewTab, label: "PROJECT DETAILS" },
    { id: "eligibility" as ViewTab, label: "ELIGIBILITY CRITERIA" },
    { id: "buyer" as ViewTab, label: "BUYER DETAILS" },
    { id: "uploaded" as ViewTab, label: "UPLOADED DETAILS" },
    { id: "letter" as ViewTab, label: "LETTER OF AUTHORIZATION" },
  ]

  const uploadedDocuments = [
    { name: "Letter of Approval.pdf", size: "100kb", status: "Complete" },
    {
      name: "Letter/s of Authorisation (only applicable if requesting the renewal of an authorisation period).pdf",
      size: "100kb",
      status: "Complete",
    },
    {
      name: "Agreement document entered into with buyer for the authorized carbon Credit.pdf",
      size: "100kb",
      status: "Complete",
    },
    { name: "Project Design Document.pdf", size: "100kb", status: "Complete" },
  ]

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-border/50">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "uploaded" && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif font-semibold text-foreground">Uploaded Documents</h3>
          <div className="space-y-3">
            {uploadedDocuments.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-card border border-border/50 rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                    <FileText size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.size} • {doc.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-secondary rounded-xl transition-colors">
                    <Download size={18} className="text-muted-foreground" />
                  </button>
                  <CheckCircle size={20} className="text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "project-details" && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif font-semibold text-foreground">Project Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Project Name</p>
              <p className="text-sm text-foreground mt-1">Kilifi Solar Panel</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Project Proponent</p>
              <p className="text-sm text-foreground mt-1">Naima Salim</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Submission Type</p>
              <p className="text-sm text-foreground mt-1">Request for renewal of authorisation period</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Volume of Carbon Credits</p>
              <p className="text-sm text-foreground mt-1">50,000 tCO2eq</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "eligibility" && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif font-semibold text-foreground">Eligibility Criteria</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Carbon Mechanism</p>
              <p className="text-sm text-foreground mt-1">Article 6.2</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Authorization Period</p>
              <p className="text-sm text-foreground mt-1">01/01/2024 - 31/12/2029</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "buyer" && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif font-semibold text-foreground">Buyer Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Buyer Type</p>
              <p className="text-sm text-foreground mt-1">National Government (or authorised representative)</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Buyer Name</p>
              <p className="text-sm text-foreground mt-1">International Climate Partner</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Use of Carbon Credits</p>
              <p className="text-sm text-foreground mt-1">Use towards the achievement of an NDC</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "letter" && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif font-semibold text-foreground">Letter of Authorization</h3>
          <div className="flex items-center justify-between p-4 bg-card border border-border/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <FileText size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground font-medium">Letter_of_Authorization_Kilifi_Solar.pdf</p>
                <p className="text-xs text-muted-foreground">Issued: 15/01/2024</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
