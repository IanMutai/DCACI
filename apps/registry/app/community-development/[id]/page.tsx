"use client"

import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ArrowLeft, Users, CheckCircle2, Calendar, FileText, Download, DollarSign } from "lucide-react"
import Link from "next/link"

export default function CommunityAgreementDetailPage({ params }: { params: { id: string } }) {
  const agreement = {
    id: params.id,
    projectName: "Mau Forest Conservation",
    projectId: "ACR-2024-001",
    community: "Mau Community Forest Association",
    status: "approved",
    beneficiaries: 12500,
    sharePercentage: 60,
    signedDate: "2024-01-10",
    expiryDate: "2029-01-10",
    totalDistributed: "$245,000",
    lastDistribution: "2024-12-01",
    nextDistribution: "2025-03-01",
    benefits: [
      {
        type: "Direct Cash Payments",
        description: "Quarterly cash distributions to registered community members",
        amount: "$150,000",
        status: "Active",
      },
      {
        type: "Infrastructure Development",
        description: "Construction of community water wells and solar installations",
        amount: "$60,000",
        status: "In Progress",
      },
      {
        type: "Education Programs",
        description: "Scholarships for local students and adult literacy programs",
        amount: "$35,000",
        status: "Active",
      },
    ],
    terms: [
      "60% of project revenues allocated to community development",
      "Quarterly benefit distributions through community committee",
      "Free, Prior, and Informed Consent (FPIC) obtained from all affected households",
      "Grievance mechanism established with independent mediator",
      "Annual community meetings to review benefit distribution",
    ],
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <Link
            href="/community-development"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Community Agreements
          </Link>

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono text-muted-foreground">{agreement.id}</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <CheckCircle2 size={14} />
                  {agreement.status}
                </span>
              </div>
              <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">{agreement.projectName}</h1>
              <p className="text-muted-foreground">{agreement.community}</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-secondary rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors">
              <Download size={16} />
              Download Agreement
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Users size={20} className="text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Beneficiaries</p>
              <p className="font-serif text-2xl font-semibold text-foreground">
                {agreement.beneficiaries.toLocaleString()}
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign size={20} className="text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Benefit Share</p>
              <p className="font-serif text-2xl font-semibold text-foreground">{agreement.sharePercentage}%</p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Distributed</p>
              <p className="font-serif text-2xl font-semibold text-primary">{agreement.totalDistributed}</p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-1">Agreement Period</p>
              <p className="font-serif text-2xl font-semibold text-foreground">5 years</p>
              <p className="text-xs text-muted-foreground mt-1">Until {agreement.expiryDate}</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Benefit Categories */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Benefit Categories</h2>
                <div className="space-y-4">
                  {agreement.benefits.map((benefit, idx) => (
                    <div key={idx} className="p-5 bg-secondary/30 rounded-xl border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{benefit.type}</h3>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                          {benefit.status}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl font-bold text-primary">{benefit.amount}</span>
                        <span className="text-xs text-muted-foreground">allocated</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agreement Terms */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Key Terms & Conditions</h2>
                <div className="space-y-3">
                  {agreement.terms.map((term, idx) => (
                    <div key={idx} className="flex gap-3">
                      <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">{term}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={18} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Distribution Schedule</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Last Distribution</p>
                    <p className="text-foreground font-medium">{agreement.lastDistribution}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Next Distribution</p>
                    <p className="text-primary font-medium">{agreement.nextDistribution}</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-1">Frequency</p>
                    <p className="text-foreground font-medium">Quarterly</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Project Reference</h3>
                <Link
                  href={`/projects/${agreement.projectId}`}
                  className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{agreement.projectName}</p>
                    <p className="text-xs text-muted-foreground mt-1">{agreement.projectId}</p>
                  </div>
                  <FileText size={16} className="text-primary" />
                </Link>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Documents</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
                    <span className="text-sm text-foreground">Signed Agreement</span>
                    <Download size={14} className="text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
                    <span className="text-sm text-foreground">FPIC Documentation</span>
                    <Download size={14} className="text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
                    <span className="text-sm text-foreground">Distribution Records</span>
                    <Download size={14} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
