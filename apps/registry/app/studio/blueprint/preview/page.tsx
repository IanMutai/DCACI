"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  Users,
  Globe,
  DollarSign,
  Heart,
  ShieldCheck,
  Check,
  Printer,
} from "lucide-react"
import ARCLogo from "@/components/arc-logo"

const sidebarSections = [
  { id: "legal", title: "Legal Snapshot", icon: FileText },
  { id: "lifecycle", title: "Project Lifecycle", icon: GitBranch },
  { id: "roles", title: "Roles & Permissions", icon: Users },
  { id: "article6", title: "Article 6 Setup", icon: Globe },
  { id: "fees", title: "Fees & Payments", icon: DollarSign },
  { id: "community", title: "Community Agreements", icon: Heart },
  { id: "verification", title: "Verification & Certificates", icon: ShieldCheck },
]

export default function BlueprintPreviewPage() {
  const [activeSection, setActiveSection] = useState("legal")

  const handleDownload = () => {
    const blueprint = {
      version: "1.0",
      generatedAt: new Date().toISOString(),
      country: "Kenya",
      legal: {
        framework: "Climate Change Act 2016",
        authority: "National Environment Management Authority (NEMA)",
        regulations: ["Carbon Trading Regulations 2023", "Environmental Impact Assessment Guidelines"],
      },
      lifecycle: {
        stages: ["PCN", "PDD", "Validation", "Registration", "Issuance", "Monitoring"],
        configuration: {
          pcn: { requiredDocs: ["Concept Note", "Land Ownership", "Community Consent"] },
          pdd: { requiredDocs: ["Project Design Document", "Baseline Study", "Monitoring Plan"] },
        },
      },
      roles: {
        proponent: ["Submit PCN", "Submit PDD", "Upload Documents"],
        reviewer: ["Review Submissions", "Request Clarifications", "Provide Technical Opinion"],
        approver: ["Final Approval", "Issue Letters", "Manage Registrations"],
      },
      article6: {
        mechanisms: ["Article 6.2", "Article 6.4", "Voluntary Markets"],
        correspondingAdjustments: true,
        itmoTracking: true,
      },
      fees: {
        pcnReview: 50000,
        pddReview: 150000,
        registration: 200000,
        annualMonitoring: 100000,
        currency: "KES",
      },
      community: {
        benefitSharingRequired: true,
        minimumPercentage: 10,
        verificationRequired: true,
      },
      verification: {
        letterTypes: ["Letter of No Objection", "Letter of Approval", "Letter of Authorization"],
        serialFormat: "ARC-{COUNTRY}-{YEAR}-{SEQ}",
        publicVerification: true,
      },
    }

    const blob = new Blob([JSON.stringify(blueprint, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "arc-registry-blueprint.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-72 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link
            href="/studio/workspace"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Workspace</span>
          </Link>
          <div className="flex items-center gap-3">
            <ARCLogo size="sm" theme="color" />
            <div>
              <h1 className="font-semibold text-foreground">Blueprint Summary</h1>
              <p className="text-xs text-muted-foreground">Kenya Registry</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {sidebarSections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <section.icon size={18} />
                  {section.title}
                  <Check size={14} className="ml-auto text-emerald-500" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">All 7 sections configured</p>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-full bg-emerald-500 rounded-full" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Registry Configuration Summary</h2>
            <p className="text-sm text-muted-foreground">Review your complete blueprint before deployment</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.print()} className="btn-ghost text-sm">
              <Printer size={16} />
              Print
            </button>
            <button onClick={handleDownload} className="btn-secondary text-sm">
              <Download size={16} />
              Download JSON
            </button>
            <Link href="/dashboard" className="btn-primary text-sm">
              <ExternalLink size={16} />
              Preview Registry UI
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Legal Snapshot */}
            {activeSection === "legal" && (
              <div className="space-y-6">
                <div className="card-elevated p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText size={20} className="text-primary" />
                    Legal Snapshot
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Primary Legal Framework</label>
                      <p className="text-foreground mt-1">Climate Change Act 2016</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Designated National Authority</label>
                      <p className="text-foreground mt-1">National Environment Management Authority (NEMA)</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Supporting Regulations</label>
                      <ul className="mt-1 space-y-1">
                        <li className="flex items-center gap-2 text-foreground">
                          <Check size={14} className="text-emerald-500" />
                          Carbon Trading Regulations 2023
                        </li>
                        <li className="flex items-center gap-2 text-foreground">
                          <Check size={14} className="text-emerald-500" />
                          Environmental Impact Assessment Guidelines
                        </li>
                        <li className="flex items-center gap-2 text-foreground">
                          <Check size={14} className="text-emerald-500" />
                          Community Land Act 2016
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Project Lifecycle */}
            {activeSection === "lifecycle" && (
              <div className="space-y-6">
                <div className="card-elevated p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <GitBranch size={20} className="text-primary" />
                    Project Lifecycle Stages
                  </h3>
                  <div className="flex items-center justify-between mb-8">
                    {["PCN", "PDD", "Validation", "Registration", "Issuance", "Monitoring"].map((stage, index) => (
                      <div key={stage} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                            {index + 1}
                          </div>
                          <span className="text-sm font-medium text-foreground mt-2">{stage}</span>
                        </div>
                        {index < 5 && <div className="w-8 h-px bg-border mx-1 mt-[-20px]" />}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <h4 className="font-medium text-foreground mb-2">PCN Requirements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Project Concept Note</li>
                        <li>• Land Ownership Documentation</li>
                        <li>• Community Consent Letter</li>
                        <li>• Preliminary Feasibility Study</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <h4 className="font-medium text-foreground mb-2">PDD Requirements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Complete Project Design Document</li>
                        <li>• Baseline Emissions Study</li>
                        <li>• Monitoring Plan</li>
                        <li>• Stakeholder Consultation Report</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Roles & Permissions */}
            {activeSection === "roles" && (
              <div className="space-y-6">
                <div className="card-elevated p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users size={20} className="text-primary" />
                    Roles & Permissions Matrix
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 pr-4 font-semibold text-foreground">Stage</th>
                          <th className="text-left py-3 pr-4 font-semibold text-foreground">Submitter</th>
                          <th className="text-left py-3 pr-4 font-semibold text-foreground">Reviewer</th>
                          <th className="text-left py-3 font-semibold text-foreground">Approver</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="py-3 pr-4 font-medium text-foreground">PCN</td>
                          <td className="py-3 pr-4 text-muted-foreground">Project Proponent</td>
                          <td className="py-3 pr-4 text-muted-foreground">Technical Expert</td>
                          <td className="py-3 text-muted-foreground">DNA Official</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 pr-4 font-medium text-foreground">PDD</td>
                          <td className="py-3 pr-4 text-muted-foreground">Project Proponent</td>
                          <td className="py-3 pr-4 text-muted-foreground">Third-Party Validator</td>
                          <td className="py-3 text-muted-foreground">DNA Official</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 pr-4 font-medium text-foreground">Validation</td>
                          <td className="py-3 pr-4 text-muted-foreground">VVB Entity</td>
                          <td className="py-3 pr-4 text-muted-foreground">Technical Expert</td>
                          <td className="py-3 text-muted-foreground">DNA Official</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 pr-4 font-medium text-foreground">Registration</td>
                          <td className="py-3 pr-4 text-muted-foreground">DNA Staff</td>
                          <td className="py-3 pr-4 text-muted-foreground">Registry Admin</td>
                          <td className="py-3 text-muted-foreground">DNA Director</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3 pr-4 font-medium text-foreground">Issuance</td>
                          <td className="py-3 pr-4 text-muted-foreground">Project Proponent</td>
                          <td className="py-3 pr-4 text-muted-foreground">Verification Body</td>
                          <td className="py-3 text-muted-foreground">DNA Director</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-foreground">Monitoring</td>
                          <td className="py-3 pr-4 text-muted-foreground">Project Proponent</td>
                          <td className="py-3 pr-4 text-muted-foreground">Verification Body</td>
                          <td className="py-3 text-muted-foreground">DNA Official</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Article 6 Setup */}
            {activeSection === "article6" && (
              <div className="space-y-6">
                <div className="card-elevated p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Globe size={20} className="text-primary" />
                    Article 6 Configuration
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                      <Check size={24} className="text-emerald-600 mx-auto mb-2" />
                      <span className="font-medium text-emerald-800">Article 6.2</span>
                      <p className="text-xs text-emerald-600 mt-1">Bilateral Agreements</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                      <Check size={24} className="text-emerald-600 mx-auto mb-2" />
                      <span className="font-medium text-emerald-800">Article 6.4</span>
                      <p className="text-xs text-emerald-600 mt-1">Centralized Mechanism</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                      <Check size={24} className="text-emerald-600 mx-auto mb-2" />
                      <span className="font-medium text-emerald-800">Voluntary Markets</span>
                      <p className="text-xs text-emerald-600 mt-1">VCM Compatible</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Corresponding Adjustments</span>
                      <span className="badge-success">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">ITMO Tracking</span>
                      <span className="badge-success">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">International Registry Link</span>
                      <span className="badge-primary">Pending Setup</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fees & Payments */}
            {activeSection === "fees" && (
              <div className="space-y-6">
                <div className="card-elevated p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign size={20} className="text-primary" />
                    Fee Structure
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-foreground">PCN Review Fee</span>
                      <span className="font-semibold text-foreground">KES 50,000</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-foreground">PDD Review Fee</span>
                      <span className="font-semibold text-foreground">KES 150,000</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-foreground">Project Registration</span>
                      <span className="font-semibold text-foreground">KES 200,000</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-foreground">Annual Monitoring Fee</span>
                      <span className="font-semibold text-foreground">KES 100,000</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-foreground">Credit Issuance (per credit)</span>
                      <span className="font-semibold text-foreground">KES 10</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Community Agreements */}
            {activeSection === "community" && (
              <div className="space-y-6">
                <div className="card-elevated p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Heart size={20} className="text-primary" />
                    Community Benefit Sharing
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-foreground">Benefit Sharing Required</span>
                      <span className="badge-success">Yes</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-foreground">Minimum Community Share</span>
                      <span className="font-semibold text-foreground">10% of carbon revenue</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-foreground">Agreement Verification</span>
                      <span className="badge-success">Required</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-foreground">Community Consent Documentation</span>
                      <span className="badge-success">Required at PCN stage</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Verification & Certificates */}
            {activeSection === "verification" && (
              <div className="space-y-6">
                <div className="card-elevated p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-primary" />
                    Verification & Certificates
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Letter Types</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="badge-primary">Letter of No Objection</span>
                        <span className="badge-primary">Letter of Approval</span>
                        <span className="badge-primary">Letter of Authorization</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <label className="text-sm font-medium text-muted-foreground">Serial Number Format</label>
                      <p className="text-foreground mt-1 font-mono bg-muted px-3 py-2 rounded-lg text-sm">
                        ARC-KE-2025-000001
                      </p>
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-border">
                      <span className="text-foreground">Public Verification Portal</span>
                      <span className="badge-success">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-border">
                      <span className="text-foreground">QR Code on Letters</span>
                      <span className="badge-success">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
