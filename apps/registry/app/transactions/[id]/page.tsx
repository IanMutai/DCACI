"use client"

import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ArrowLeft, Calendar, CheckCircle2, FileText, Download, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import Link from "next/link"

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  const transaction = {
    id: params.id,
    type: "transfer",
    direction: "outgoing",
    credits: 5000,
    project: "Mau Forest Conservation",
    projectId: "ACR-2024-001",
    counterparty: "Global Carbon Partners Ltd",
    date: "2024-01-15",
    completedDate: "2024-01-15 14:32:15 EAT",
    status: "completed",
    value: "$125,000",
    unitPrice: "$25.00",
    fees: "$250",
    netAmount: "$124,750",
    transactionHash: "0x7f3d...a9c2",
    verificationStatus: "Verified",
    notes: "Quarterly credit transfer as per bilateral agreement terms",
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <Link
            href="/transactions"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Transactions
          </Link>

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.direction === "incoming" ? "bg-green-100" : "bg-primary/10"
                  }`}
                >
                  {transaction.direction === "incoming" ? (
                    <ArrowDownLeft size={24} className="text-green-600" />
                  ) : (
                    <ArrowUpRight size={24} className="text-primary" />
                  )}
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-semibold text-foreground">{transaction.id}</h1>
                  <p className="text-sm text-muted-foreground capitalize">{transaction.type} Transaction</p>
                </div>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700">
              <CheckCircle2 size={16} />
              {transaction.status}
            </span>
          </div>

          {/* Transaction Summary Card */}
          <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-2xl p-8 border border-primary/20 mb-8">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Credits Transferred</p>
                <p className="font-serif text-4xl font-bold text-foreground">{transaction.credits.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">tCO2eq</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Value</p>
                <p className="font-serif text-4xl font-bold text-primary">{transaction.value}</p>
                <p className="text-xs text-muted-foreground mt-1">at {transaction.unitPrice}/credit</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Net Amount</p>
                <p className="font-serif text-4xl font-bold text-foreground">{transaction.netAmount}</p>
                <p className="text-xs text-muted-foreground mt-1">after fees</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Transaction Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Transaction ID</span>
                    <span className="text-foreground font-mono">{transaction.id}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Project</span>
                    <Link href={`/projects/${transaction.projectId}`} className="text-primary hover:underline">
                      {transaction.project}
                    </Link>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Counterparty</span>
                    <span className="text-foreground font-medium">{transaction.counterparty}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Transaction Date</span>
                    <span className="text-foreground">{transaction.date}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Completed At</span>
                    <span className="text-foreground font-mono text-sm">{transaction.completedDate}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Transaction Hash</span>
                    <span className="text-foreground font-mono text-sm">{transaction.transactionHash}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Verification Status</span>
                    <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                      <CheckCircle2 size={14} />
                      {transaction.verificationStatus}
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-muted-foreground">Transaction Fees</span>
                    <span className="text-foreground">{transaction.fees}</span>
                  </div>
                </div>
              </div>

              {transaction.notes && (
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-3">Notes</h3>
                  <p className="text-sm text-muted-foreground">{transaction.notes}</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
                    <span className="text-sm font-medium">Download Receipt</span>
                    <Download size={16} />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors">
                    <span className="text-sm font-medium">View Certificate</span>
                    <FileText size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={18} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Timeline</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Transaction Completed</p>
                      <p className="text-xs text-muted-foreground">{transaction.completedDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Verification Complete</p>
                      <p className="text-xs text-muted-foreground">2024-01-15 14:15:30 EAT</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-border rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Transaction Initiated</p>
                      <p className="text-xs text-muted-foreground">2024-01-15 14:00:00 EAT</p>
                    </div>
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
