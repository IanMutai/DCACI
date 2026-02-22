"use client"

import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { CheckCircle2, AlertTriangle, XCircle, FileText, Users, TrendingUp, Award } from "lucide-react"

export default function CompliancePage() {
  const complianceScore = 92

  const complianceItems = [
    {
      category: "Annual Reporting",
      status: "compliant",
      lastUpdate: "Mar 15, 2025",
      nextDue: "Mar 15, 2026",
      details: "Annual progress report submitted on time per Regulation 26",
    },
    {
      category: "Benefit Sharing",
      status: "compliant",
      lastUpdate: "Feb 20, 2025",
      nextDue: "Ongoing",
      details: "Community benefit-sharing agreements in place and payments current",
    },
    {
      category: "Monitoring Reports",
      status: "warning",
      lastUpdate: "Jan 10, 2025",
      nextDue: "Apr 10, 2025",
      details: "Next quarterly monitoring report due in 25 days",
    },
    {
      category: "Complaints Resolution",
      status: "compliant",
      lastUpdate: "Mar 1, 2025",
      nextDue: "N/A",
      details: "No outstanding complaints. Response time: Avg 7 days",
    },
  ]

  const certificates = [
    {
      name: "Compliance Certificate 2024",
      issuedDate: "Jan 15, 2025",
      validUntil: "Dec 31, 2025",
      serialNumber: "CC-2024-001234",
      status: "active",
    },
    {
      name: "Compliance Certificate 2023",
      issuedDate: "Jan 20, 2024",
      validUntil: "Dec 31, 2024",
      serialNumber: "CC-2023-000987",
      status: "expired",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="font-serif text-3xl font-semibold text-foreground">Compliance Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Track compliance with Kenya Climate Change (Carbon Markets) Regulations, 2024
              </p>
            </div>

            {/* Compliance Score Card */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl p-8 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Overall Compliance Score</h2>
                  <p className="text-muted-foreground">Based on regulatory requirements and reporting</p>
                </div>
                <div className="text-center">
                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-border"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={`${(complianceScore / 100) * 339} 339`}
                        strokeLinecap="round"
                        className="text-primary transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div>
                        <div className="text-3xl font-bold text-primary">{complianceScore}%</div>
                        <div className="text-xs text-muted-foreground">Excellent</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceItems.map((item, idx) => (
                <div key={idx} className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          item.status === "compliant"
                            ? "bg-green-100 text-green-600"
                            : item.status === "warning"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status === "compliant" ? (
                          <CheckCircle2 size={20} />
                        ) : item.status === "warning" ? (
                          <AlertTriangle size={20} />
                        ) : (
                          <XCircle size={20} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.category}</h3>
                        <p className="text-xs text-muted-foreground mt-1">Last updated: {item.lastUpdate}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "compliant"
                          ? "bg-green-100 text-green-700"
                          : item.status === "warning"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status === "compliant" ? "Compliant" : item.status === "warning" ? "Due Soon" : "Overdue"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.details}</p>
                  <div className="text-xs text-muted-foreground">
                    <strong>Next Due:</strong> {item.nextDue}
                  </div>
                </div>
              ))}
            </div>

            {/* Compliance Certificates */}
            <div className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-serif font-semibold text-foreground">Compliance Certificates</h2>
              </div>
              <div className="space-y-4">
                {certificates.map((cert, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-xl border-2 ${
                      cert.status === "active" ? "border-primary bg-primary/5" : "border-border bg-secondary/30"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{cert.name}</h3>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              cert.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {cert.status === "active" ? "Active" : "Expired"}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Serial Number:</span>
                            <p className="font-mono font-medium text-foreground">{cert.serialNumber}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Issued:</span>
                            <p className="text-foreground">{cert.issuedDate}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Valid Until:</span>
                            <p className="text-foreground">{cert.validUntil}</p>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="p-6 bg-card border border-border rounded-2xl hover:border-primary hover:shadow-lg transition-all text-left group">
                <FileText className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Submit Annual Report
                </h3>
                <p className="text-sm text-muted-foreground">Upload your annual progress report per Regulation 26</p>
              </button>

              <button className="p-6 bg-card border border-border rounded-2xl hover:border-primary hover:shadow-lg transition-all text-left group">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Update Benefit Sharing
                </h3>
                <p className="text-sm text-muted-foreground">Update community benefit-sharing documentation</p>
              </button>

              <button className="p-6 bg-card border border-border rounded-2xl hover:border-primary hover:shadow-lg transition-all text-left group">
                <TrendingUp className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  View Monitoring Data
                </h3>
                <p className="text-sm text-muted-foreground">Access project monitoring reports and data</p>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
