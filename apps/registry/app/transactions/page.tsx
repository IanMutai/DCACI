"use client"

import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ArrowUpRight, ArrowDownLeft, Filter, Download, Search, ChevronRight } from "lucide-react"
import Link from "next/link"

const transactions = [
  {
    id: "TXN-2024-001234",
    type: "transfer",
    direction: "outgoing",
    credits: 5000,
    project: "Mau Forest Conservation",
    counterparty: "Global Carbon Partners Ltd",
    date: "2024-01-15",
    status: "completed",
    value: "$125,000",
  },
  {
    id: "TXN-2024-001233",
    type: "issuance",
    direction: "incoming",
    credits: 12500,
    project: "Lake Victoria Clean Cookstoves",
    counterparty: "ARC Registry",
    date: "2024-01-14",
    status: "completed",
    value: "$312,500",
  },
  {
    id: "TXN-2024-001232",
    type: "retirement",
    direction: "outgoing",
    credits: 2000,
    project: "Nairobi Solar Initiative",
    counterparty: "EcoTech Industries",
    date: "2024-01-12",
    status: "completed",
    value: "$50,000",
  },
  {
    id: "TXN-2024-001231",
    type: "transfer",
    direction: "incoming",
    credits: 8000,
    project: "Turkana Wind Power",
    counterparty: "Nordic Green Fund",
    date: "2024-01-10",
    status: "pending",
    value: "$200,000",
  },
  {
    id: "TXN-2024-001230",
    type: "transfer",
    direction: "outgoing",
    credits: 3500,
    project: "Mau Forest Conservation",
    counterparty: "Carbon Trust International",
    date: "2024-01-08",
    status: "completed",
    value: "$87,500",
  },
]

export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-foreground">Transactions</h1>
              <p className="text-muted-foreground mt-1">Track credit transfers, issuances, and retirements</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              <Download size={16} />
              Export Report
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Total Transferred</div>
              <div className="font-serif text-2xl font-semibold text-foreground">31,000</div>
              <div className="text-xs text-muted-foreground mt-1">credits this month</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Total Value</div>
              <div className="font-serif text-2xl font-semibold text-foreground">$775,000</div>
              <div className="text-xs text-green-600 mt-1">+12.5% from last month</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Pending</div>
              <div className="font-serif text-2xl font-semibold text-accent">3</div>
              <div className="text-xs text-muted-foreground mt-1">transactions awaiting</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">This Week</div>
              <div className="font-serif text-2xl font-semibold text-foreground">8</div>
              <div className="text-xs text-muted-foreground mt-1">transactions completed</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl border border-border p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[240px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <select className="px-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none">
                <option>All Types</option>
                <option>Transfers</option>
                <option>Issuances</option>
                <option>Retirements</option>
              </select>
              <select className="px-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none">
                <option>All Status</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl text-sm hover:bg-secondary/80 transition-colors">
                <Filter size={16} />
                More Filters
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Transaction</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Project</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Counterparty</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Credits</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Value</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr
                      key={txn.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer"
                      onClick={() => (window.location.href = `/transactions/${txn.id}`)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              txn.direction === "incoming" ? "bg-green-100" : "bg-primary/10"
                            }`}
                          >
                            {txn.direction === "incoming" ? (
                              <ArrowDownLeft size={18} className="text-green-600" />
                            ) : (
                              <ArrowUpRight size={18} className="text-primary" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{txn.id}</div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {txn.type} - {txn.date}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-foreground">{txn.project}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-muted-foreground">{txn.counterparty}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span
                          className={`text-sm font-medium ${
                            txn.direction === "incoming" ? "text-green-600" : "text-foreground"
                          }`}
                        >
                          {txn.direction === "incoming" ? "+" : "-"}
                          {txn.credits.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="text-sm text-foreground">{txn.value}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            txn.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : txn.status === "pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link href={`/transactions/${txn.id}`}>
                          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                            <ChevronRight size={16} className="text-muted-foreground" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
