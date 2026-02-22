"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ArrowRightLeft, Check, CheckCircle2, Clock, DollarSign, FileText, Info, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function TransfersPage() {
  const [transferAmount, setTransferAmount] = useState("25123")
  const [selectedFramework, setSelectedFramework] = useState("Kenya-Switzerland FA 2024")
  const [showConfirmation, setShowConfirmation] = useState(false)

  const correspondingAdjustmentFee = Number.parseFloat(transferAmount) * 4
  const caFeeKsh = correspondingAdjustmentFee * 150 // Approximate KES conversion

  const handleSubmit = () => {
    setShowConfirmation(true)
  }

  if (showConfirmation) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl border border-border p-12 text-center space-y-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-3xl font-semibold text-foreground mb-3">
                    Transfer Request Submitted!
                  </h2>
                  <p className="text-muted-foreground">
                    Your ITMO transfer request has been submitted to the DNA for approval. You'll receive a notification
                    once it's processed.
                  </p>
                </div>
                <div className="flex flex-col gap-3 max-w-md mx-auto pt-4">
                  <Link
                    href="/article6-projects/itmo-dashboard"
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all"
                  >
                    View ITMO Dashboard
                  </Link>
                  <Link
                    href="/credit-listings"
                    className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl font-semibold transition-all"
                  >
                    View Credit Listings
                  </Link>
                  <Link
                    href="/projects"
                    className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl font-semibold transition-all"
                  >
                    Back to Projects
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-foreground">ITMO Transfers (Article 6.2)</h1>
              <p className="text-muted-foreground mt-2">
                Transfer Internationally Transferred Mitigation Outcomes to acquiring countries with DNA approval
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 flex gap-4 border border-blue-200">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Article 6.2 Transfers:</strong> ITMOs can only be transferred to
                countries with bilateral framework agreements. The DNA must approve each transfer and apply
                corresponding adjustments. A fee of USD 4 per ITMO is charged for corresponding adjustments (Schedule
                2).
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
              <h2 className="text-2xl font-serif font-semibold text-foreground">Request Transfer</h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input value="Kilifi Solar Project" readOnly className="bg-secondary/50 rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label>Authorization Number</Label>
                  <Input value="AUTH-2025-009012" readOnly className="bg-secondary/50 rounded-xl h-12" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Acquiring Country</Label>
                  <select className="w-full px-4 py-3 bg-secondary/50 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Switzerland</option>
                    <option>Norway</option>
                    <option>Germany</option>
                    <option>Japan</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Framework Agreement</Label>
                  <select
                    value={selectedFramework}
                    onChange={(e) => setSelectedFramework(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary/50 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Kenya-Switzerland FA 2024">Kenya-Switzerland FA 2024</option>
                    <option value="Kenya-Norway FA 2023">Kenya-Norway FA 2023</option>
                    <option value="Kenya-Germany FA 2024">Kenya-Germany FA 2024</option>
                    <option value="Kenya-Japan FA 2023">Kenya-Japan FA 2023</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>ITMOs to Transfer (tCO2eq)</Label>
                  <Input
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="bg-secondary/50 rounded-xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Transfer Date</Label>
                  <Input type="date" defaultValue="2025-03-15" className="bg-secondary/50 rounded-xl h-12" />
                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Corresponding Adjustment Fee (Schedule 2)</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{transferAmount} ITMOs @ USD 4.00/ITMO:</span>
                    <span className="font-medium text-foreground">
                      USD {correspondingAdjustmentFee.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-semibold text-foreground">Total Transfer Fee:</span>
                    <span className="font-bold text-primary">
                      USD {correspondingAdjustmentFee.toLocaleString(undefined, { maximumFractionDigits: 2 })} (~KES{" "}
                      {caFeeKsh.toLocaleString(undefined, { maximumFractionDigits: 0 })})
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Buyer Details</Label>
                <Textarea
                  placeholder="Enter buyer organization name and contact details..."
                  className="min-h-[100px] rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Supporting Documents</Label>
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center gap-3">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Drop purchase agreement and payment proof here or click to upload
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" className="rounded-xl bg-transparent">
                  Save Draft
                </Button>
                <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 rounded-xl">
                  <Shield className="w-4 h-4 mr-2" />
                  Submit for DNA Approval
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
              <h2 className="text-2xl font-serif font-semibold text-foreground">Transfer History</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 bg-secondary/30 rounded-xl border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <ArrowRightLeft className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Transfer to Switzerland</div>
                      <div className="text-sm text-muted-foreground mt-1">25,123 ITMOs • March 15, 2025</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <Check className="w-3 h-3 mr-1" />
                      Completed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 bg-secondary/30 rounded-xl border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Transfer to Germany</div>
                      <div className="text-sm text-muted-foreground mt-1">15,000 ITMOs • Pending DNA approval</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
