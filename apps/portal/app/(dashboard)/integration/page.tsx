"use client";

import CrossSystemChart from "@/components/integration/cross-system-chart";

export default function IntegrationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Cross-System Integration
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View integrated data flows between MRV, NDC, and Registry modules
        </p>
      </div>

      {/* Integration Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-slate-900">
              MRV Service
            </span>
          </div>
          <p className="text-xs text-slate-500">Connected &middot; Last sync: 5 min ago</p>
          <p className="mt-2 text-xs text-slate-400">
            Provides emissions data to NDC tracker and registry baseline calculations
          </p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-slate-900">
              NDC Service
            </span>
          </div>
          <p className="text-xs text-slate-500">Connected &middot; Last sync: 12 min ago</p>
          <p className="mt-2 text-xs text-slate-400">
            Receives MRV data for progress tracking, informs registry credit demand
          </p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-slate-900">
              Registry Service
            </span>
          </div>
          <p className="text-xs text-slate-500">Connected &middot; Last sync: 8 min ago</p>
          <p className="mt-2 text-xs text-slate-400">
            Credit data feeds into NDC corresponding adjustments and MRV offsets
          </p>
        </div>
      </div>

      {/* Cross-System Chart */}
      <CrossSystemChart />

      {/* Data Flow Log */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Recent Data Flows
        </h2>
        <div className="space-y-3">
          {[
            { from: "MRV", to: "NDC", data: "2023 GHG Inventory totals", time: "5 min ago", status: "success" },
            { from: "Registry", to: "NDC", data: "Credit retirement summary (Q4 2024)", time: "12 min ago", status: "success" },
            { from: "MRV", to: "Registry", data: "Baseline emissions for project KEN-005", time: "1 hour ago", status: "success" },
            { from: "NDC", to: "Registry", data: "Corresponding adjustment request", time: "3 hours ago", status: "pending" },
            { from: "Registry", to: "MRV", data: "Offset credits applied", time: "1 day ago", status: "success" },
          ].map((flow, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="rounded bg-slate-100 px-2 py-1 font-mono font-medium text-slate-700">
                    {flow.from}
                  </span>
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="rounded bg-slate-100 px-2 py-1 font-mono font-medium text-slate-700">
                    {flow.to}
                  </span>
                </div>
                <span className="text-sm text-slate-600">{flow.data}</span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    flow.status === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {flow.status}
                </span>
                <span className="text-xs text-slate-400">{flow.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
