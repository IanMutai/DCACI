"use client"

import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ArrowUpRight, ArrowDownLeft, Filter, Download, Search, ChevronRight } from "lucide-react"
import Link from "next/link"

const transactions = [
  {
    id: "TXN-2021-DAL-001",
    type: "retirement",
    direction: "outgoing",
    credits: 1160000,
    project: "Kasigau Corridor REDD+ (VCS #612)",
    counterparty: "Delta Air Lines",
    date: "2021-06-15",
    status: "completed",
    value: "$13,920,000",
  },
  {
    id: "TXN-2021-NFX-001",
    type: "retirement",
    direction: "outgoing",
    credits: 699000,
    project: "Kasigau Corridor REDD+ / Chyulu Hills",
    counterparty: "Netflix",
    date: "2021-09-22",
    status: "completed",
    value: "$8,388,000",
  },
  {
    id: "TXN-2023-BHP-001",
    type: "transfer",
    direction: "outgoing",
    credits: 200000,
    project: "TIST Reforestation",
    counterparty: "BHP Group",
    date: "2023-03-10",
    status: "completed",
    value: "$6,000,000",
  },
  {
    id: "TXN-2025-CHE-001",
    type: "transfer",
    direction: "outgoing",
    credits: 500000,
    project: "Kenya-Switzerland Art. 6.2 ITMO",
    counterparty: "Swiss Confederation (FOEN)",
    date: "2025-07-01",
    status: "pending",
    value: "$7,500,000",
  },
  {
    id: "TXN-2024-GS-001",
    type: "issuance",
    direction: "incoming",
    credits: 144000,
    project: "BURN Cookstoves (GS #5642)",
    counterparty: "KNCR Issuance",
    date: "2024-12-01",
    status: "completed",
    value: "$1,440,000",
  },
  {
    id: "TXN-2024-CDM-001",
    type: "issuance",
    direction: "incoming",
    credits: 460000,
    project: "KenGen Olkaria Geothermal",
    counterparty: "CDM Executive Board",
    date: "2024-08-15",
    status: "completed",
    value: "$3,220,000",
  },
  {
    id: "TXN-2025-SWE-001",
    type: "transfer",
    direction: "outgoing",
    credits: 300000,
    project: "Kenya-Sweden Art. 6.2 ITMO",
    counterparty: "Swedish Energy Agency",
    date: "2025-09-01",
    status: "pending",
    value: "$4,500,000",
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
              <div className="text-sm text-muted-foreground mb-1">Total Credits Traded</div>
              <div className="font-serif text-2xl font-semibold text-foreground">3.46M</div>
              <div className="text-xs text-muted-foreground mt-1">across all transactions</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Total Value</div>
              <div className="font-serif text-2xl font-semibold text-foreground">$44.9M</div>
              <div className="text-xs text-green-600 mt-1">Major buyers: Delta, Netflix, BHP</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Pending ITMOs</div>
              <div className="font-serif text-2xl font-semibold text-accent">2</div>
              <div className="text-xs text-muted-foreground mt-1">Art. 6 transfers in progress</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Avg. Price/tCO2e</div>
              <div className="font-serif text-2xl font-semibold text-foreground">$12.97</div>
              <div className="text-xs text-muted-foreground mt-1">weighted average</div>
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
