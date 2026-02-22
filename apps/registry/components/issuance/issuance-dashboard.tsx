"use client"

import { useState } from "react"
import { FileText, Download, Check, Upload, Info, CheckCircle, DollarSign, ArrowRightLeft } from "lucide-react"
import ProjectStatsBar from "@/components/project-stats-bar"
import ProjectLifecycleIndicator from "@/components/project-lifecycle-indicator"
import NotificationsPanel from "@/components/notifications-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

type IssuanceView = "report" | "overview"

interface IssuedCredit {
  id: string
  name: string
  size: string
  status: "complete" | "pending"
}

const issuedCredits: IssuedCredit[] = [
  { id: "1", name: "Credit Certificate - Year 1.pdf", size: "150kb", status: "complete" },
  { id: "2", name: "Credit Certificate - Year 2.pdf", size: "145kb", status: "complete" },
  { id: "3", name: "Verification Report.pdf", size: "200kb", status: "complete" },
]

export default function IssuanceDashboard() {
  const [currentView, setCurrentView] = useState<IssuanceView>("report")
  const [activeTab, setActiveTab] = useState("report")
  const [creditsIssued, setCreditsIssued] = useState("25123")

  const notifications = [
    {
      id: "1",
      title: "Credit Issuance Status",
      message: "Your credit issuance request is being processed",
      dismissible: true,
    },
  ]

  const handleSubmitReport = () => {
    setCurrentView("overview")
    setActiveTab("issued")
  }

  const calculateIssuanceFee = (credits: number) => {
    const first15k = Math.min(credits, 15000) * 0.1 // USD 0.10 per credit
    const excess = Math.max(credits - 15000, 0) * 0.2 // USD 0.20 per credit
    return {
      first15k,
      excess,
      total: first15k + excess,
      ksh: (first15k + excess) * 150, // Approximate KES conversion
    }
  }

  const issuanceFees = calculateIssuanceFee(Number.parseFloat(creditsIssued) || 0)

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <div className="text-xs font-medium text-primary/60 uppercase tracking-wider">Project Name</div>
        <h1 className="text-3xl font-serif font-semibold text-foreground mt-1">Kilifi Solar Project</h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-card rounded-3xl border border-border/50 p-8 shadow-sm">
        {/* Stats Bar */}
        <ProjectStatsBar
          emissionReduction="25,123"
          annualGeneration="40 GWh"
          creditingPeriod="15 Years"
          projectedRevenue="$15,000"
          revenueLabel="Finance raised"
        />

        {/* Lifecycle Indicator */}
        <div className="mt-10 mb-10">
          <ProjectLifecycleIndicator currentStage="issuance" />
        </div>

        {/* Content Area with Notifications */}
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50 p-1 rounded-xl">
                <TabsTrigger
                  value="report"
                  className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
                >
                  Report Issuance
                </TabsTrigger>
                <TabsTrigger
                  value="verification"
                  className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
                >
                  Verification Status
                </TabsTrigger>
                <TabsTrigger
                  value="issued"
                  className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
                >
                  Issued Credits
                </TabsTrigger>
              </TabsList>

              <TabsContent value="report" className="space-y-8">
                <h2 className="text-2xl font-serif font-semibold text-foreground">
                  Notify DNA of Issued Credits (Regulation 25)
                </h2>

                {/* Info Banner */}
                <div className="flex items-start gap-3 p-5 bg-blue-50 border border-blue-200/50 rounded-2xl">
                  <Info size={20} className="text-blue-600 mt-0.5" />
                  <span className="text-sm text-blue-800">
                    Per Regulation 25, notify the DNA within 14 days of credit issuance by the recognized carbon
                    standard (e.g., Verra, Gold Standard). Attach evidence of issuance and payment of applicable fees.
                  </span>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Reporting Period</Label>
                      <Input
                        defaultValue="Year 1 (2024)"
                        className="bg-secondary/50 border-border/50 rounded-xl h-12"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Carbon Credits Issued (tCO2eq)</Label>
                      <Input
                        value={creditsIssued}
                        onChange={(e) => setCreditsIssued(e.target.value)}
                        placeholder="Enter amount"
                        className="bg-secondary/50 border-border/50 rounded-xl h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Registry Serial Numbers</Label>
                      <Input
                        placeholder="e.g., ARC-001-0001 to ARC-001-25123"
                        className="bg-secondary/50 border-border/50 rounded-xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Issuance Date on Registry</Label>
                      <Input
                        type="date"
                        defaultValue="2024-12-15"
                        className="bg-secondary/50 border-border/50 rounded-xl h-12"
                      />
                    </div>
                  </div>

                  {/* Issuance Fees */}
                  <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                    <div className="flex items-center gap-3 mb-4">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Issuance Fees (Schedule 2)</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">First 15,000 tCO2eq @ USD 0.10/credit:</span>
                        <span className="font-medium text-foreground">USD {issuanceFees.first15k.toFixed(2)}</span>
                      </div>
                      {issuanceFees.excess > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Excess {(Number.parseFloat(creditsIssued) - 15000).toLocaleString()} tCO2eq @ USD
                            0.20/credit:
                          </span>
                          <span className="font-medium text-foreground">USD {issuanceFees.excess.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-3 border-t border-border">
                        <span className="font-semibold text-foreground">Total Issuance Fee:</span>
                        <span className="font-bold text-primary">
                          USD {issuanceFees.total.toFixed(2)} (~KES{" "}
                          {issuanceFees.ksh.toLocaleString(undefined, { maximumFractionDigits: 0 })})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Upload Issuance Certificate</Label>
                    <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <FileText size={24} className="text-primary" />
                        </div>
                        <div>
                          <span className="text-primary font-semibold cursor-pointer">Click to upload</span>
                          <span className="text-muted-foreground"> or drag and drop</span>
                        </div>
                        <span className="text-xs text-muted-foreground">PDF, DOCX (max. 10MB)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Evidence of Fee Payment</Label>
                    <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center gap-3">
                        <Upload size={20} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Drop payment receipt here or click to upload
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={handleSubmitReport}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-3 h-auto rounded-xl font-semibold"
                  >
                    Submit Notification to DNA
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="verification" className="space-y-8">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Verification Status</h2>

                {/* Status Timeline */}
                <div className="space-y-4">
                  <div className="flex items-center gap-5 p-5 bg-primary/5 border border-primary/20 rounded-2xl">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                      <Check size={24} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Monitoring Report Submitted</p>
                      <p className="text-sm text-muted-foreground mt-1">Completed on Dec 1, 2024</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 p-5 bg-primary/5 border border-primary/20 rounded-2xl">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                      <Check size={24} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Third-Party Verification</p>
                      <p className="text-sm text-muted-foreground mt-1">Completed on Dec 10, 2024</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 p-5 bg-amber-50 border border-amber-200/50 rounded-2xl">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-sm">
                      <Info size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">NDA Review</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        In Progress - Expected completion: Dec 20, 2024
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 p-5 bg-card border border-border/50 rounded-2xl opacity-60">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center border border-border">
                      <CheckCircle size={24} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Credit Issuance</p>
                      <p className="text-sm text-muted-foreground mt-1">Pending verification completion</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="issued" className="space-y-8">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Issued Credits</h2>

                {/* Success Banner */}
                <div className="flex items-center gap-4 p-5 bg-primary/5 border border-primary/20 rounded-2xl">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                    <Check size={24} className="text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Credits Successfully Issued</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      25,123 tCO2eq carbon credits have been issued for Year 1
                    </p>
                  </div>
                </div>

                {/* Credits List */}
                <div className="space-y-4">
                  {issuedCredits.map((credit) => (
                    <div
                      key={credit.id}
                      className="flex items-center justify-between p-5 bg-card border border-border/50 rounded-2xl hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                          <FileText size={24} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{credit.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{credit.size} • Complete</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="p-2.5 hover:bg-secondary rounded-xl transition-colors">
                          <Download size={20} className="text-primary" />
                        </button>
                        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                          <Check size={16} className="text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Card */}
                <div className="bg-secondary/50 rounded-2xl p-8 space-y-4 border border-border/50">
                  <h3 className="font-serif font-semibold text-foreground text-lg">Issuance Summary</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Credits Issued</p>
                      <p className="text-xl font-bold text-primary mt-1">25,123 tCO2eq</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Issuance Date</p>
                      <p className="text-xl font-bold text-foreground mt-1">Dec 15, 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Serial Number Range</p>
                      <p className="text-lg font-bold text-foreground mt-1 font-mono">ARC-001-0001 to ARC-001-25123</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Registry Status</p>
                      <p className="text-xl font-bold text-primary mt-1">Registered</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-semibold text-foreground text-lg mb-2">
                        Ready for Article 6.2 Transfer?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        If your project is authorized under Article 6.2, you can now transfer ITMOs to acquiring
                        countries
                      </p>
                    </div>
                    <Link
                      href="/transfers"
                      className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold flex items-center gap-2 shadow-md transition-all"
                    >
                      <ArrowRightLeft size={18} />
                      Go to Transfers
                    </Link>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Notifications Panel */}
          <NotificationsPanel notifications={notifications} />
        </div>
      </div>
    </div>
  )
}
