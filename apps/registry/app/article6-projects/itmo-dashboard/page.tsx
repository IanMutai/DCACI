"use client"

import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ArrowRightLeft, CheckCircle2, Clock, DollarSign, Globe } from "lucide-react"

export default function ITMODashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-foreground">ITMO Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Monitor Internationally Transferred Mitigation Outcomes under Article 6.2
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-primary" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-1">Authorized ITMOs</div>
                <div className="font-serif text-2xl font-semibold text-foreground">1.2M</div>
                <div className="text-xs text-muted-foreground">tCO2eq authorized</div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <ArrowRightLeft size={20} className="text-accent" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-1">Transferred ITMOs</div>
                <div className="font-serif text-2xl font-semibold text-foreground">850K</div>
                <div className="text-xs text-green-600">+125K this quarter</div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Globe size={20} className="text-green-600" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-1">Partner Countries</div>
                <div className="font-serif text-2xl font-semibold text-foreground">4</div>
                <div className="text-xs text-muted-foreground">2 signed, 2 negotiating</div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <DollarSign size={20} className="text-amber-600" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-1">CA Fees Collected</div>
                <div className="font-serif text-2xl font-semibold text-foreground">$3.4M</div>
                <div className="text-xs text-muted-foreground">USD from transfers</div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-semibold text-foreground">ITMO Registry Data</h2>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-700">Synced with CAD</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Registry Entries</p>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Last CAD Sync</p>
                  <p className="text-lg font-medium text-foreground">2 mins ago</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Data Integrity</p>
                  <p className="text-lg font-medium text-green-600">100% Verified</p>
                </div>
              </div>
            </div>

            {/* Transfers by Country */}
            <div className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-xl font-serif font-semibold text-foreground mb-6">ITMO Transfers by Country</h2>
              <div className="space-y-4">
                {[
                  { country: "Switzerland", transferred: 250000, pending: 50000, color: "bg-primary" },
                  { country: "Sweden", transferred: 180000, pending: 30000, color: "bg-blue-500" },
                  { country: "Singapore", transferred: 0, pending: 120000, color: "bg-green-500" },
                  { country: "South Korea", transferred: 0, pending: 90000, color: "bg-red-500" },
                ].map((item) => (
                  <div key={item.country} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{item.country}</span>
                      <span className="text-sm text-muted-foreground">
                        {(item.transferred + item.pending).toLocaleString()} tCO2eq
                      </span>
                    </div>
                    <div className="flex gap-2 h-3">
                      <div
                        className={`${item.color} rounded-full`}
                        style={{ width: `${(item.transferred / 350000) * 100}%` }}
                      ></div>
                      <div
                        className={`${item.color} opacity-40 rounded-full`}
                        style={{ width: `${(item.pending / 350000) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{item.transferred.toLocaleString()} transferred</span>
                      <span>{item.pending.toLocaleString()} pending</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transfers */}
            <div className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-xl font-serif font-semibold text-foreground mb-6">Recent Transfers</h2>
              <div className="space-y-4">
                {[
                  {
                    project: "Kilifi Solar Project",
                    country: "Switzerland",
                    amount: 25123,
                    date: "Mar 15, 2025",
                    status: "completed",
                  },
                  {
                    project: "Mombasa Wind Farm",
                    country: "Sweden",
                    amount: 15000,
                    date: "Mar 12, 2025",
                    status: "pending",
                  },
                ].map((transfer, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-5 bg-secondary/30 rounded-xl border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          transfer.status === "completed" ? "bg-primary/10" : "bg-amber-100"
                        }`}
                      >
                        {transfer.status === "completed" ? (
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        ) : (
                          <Clock className="w-6 h-6 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{transfer.project}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {transfer.amount.toLocaleString()} ITMOs to {transfer.country} • {transfer.date}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        transfer.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {transfer.status === "completed" ? "Completed" : "Pending DNA Approval"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
