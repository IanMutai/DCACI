"use client";

import dynamic from "next/dynamic";
import IntelligenceInsights from "@/components/intelligence/intelligence-insights";

const SectorStackedBarChart = dynamic(
  () => import("@/components/charts/sector-breakdown-chart").then((m) => ({ default: m.SectorStackedBarChart })),
  { ssr: false, loading: () => <div className="h-[280px] animate-pulse bg-slate-50 rounded-lg" /> }
);
const InlineIntelligence = dynamic(
  () => import("@/components/intelligence/inline-intelligence"),
  { ssr: false, loading: () => <div className="h-[200px] animate-pulse bg-teal-50 rounded-2xl" /> }
);

export default function MrvPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">MRV System</h1>
          <p className="mt-1 text-sm text-slate-500">
            Measurement, Reporting, and Verification of greenhouse gas emissions
          </p>
        </div>
      </div>

      {/* Intelligence Insights */}
      <IntelligenceInsights page="mrv" />

      {/* MRV Navigation Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6">
          {["GHG Inventory", "Activity Data", "Emission Factors", "QA/QC", "Reports"].map(
            (tab, i) => (
              <button
                key={tab}
                className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                  i === 0
                    ? "border-teal-700 text-teal-700"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Summary Stats - corrected with PRIMAP-hist v2.6 HISTCR data */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-slate-500">Total Emissions (2022)</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">94.9 MtCO2e</p>
          <p className="mt-1 text-xs text-red-600">+15.3% vs 2021</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Sectors Covered</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">5 / 5</p>
          <p className="mt-1 text-xs text-slate-400">All IPCC sectors</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Data Source</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">PRIMAP v2.6</p>
          <p className="mt-1 text-xs text-emerald-600">HISTCR scenario</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Reporting Status</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">BTR-1 Filed</p>
          <p className="mt-1 text-xs text-blue-600">December 2024</p>
        </div>
      </div>

      {/* Sector Breakdown - corrected with PRIMAP-hist v2.6 data */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Emissions by Sector (2022, PRIMAP-hist v2.6 HISTCR)
        </h2>
        <div className="space-y-4">
          {[
            { sector: "Agriculture", emissions: "44.92 MtCO2e", pct: 47.4, color: "bg-green-500" },
            { sector: "Energy", emissions: "40.27 MtCO2e", pct: 42.5, color: "bg-red-500" },
            { sector: "Industrial Processes", emissions: "5.96 MtCO2e", pct: 6.3, color: "bg-blue-500" },
            { sector: "Waste", emissions: "3.10 MtCO2e", pct: 3.3, color: "bg-purple-500" },
          ].map((item) => (
            <div key={item.sector}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">
                  {item.sector}
                </span>
                <span className="text-sm text-slate-500">
                  {item.emissions} ({item.pct}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className={`h-2 rounded-full ${item.color}`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 mt-3">
          Total excl. LULUCF: 94.25 MtCO2e | Source: PRIMAP-hist v2.6 HISTCR (AR4 GWP)
        </p>
      </div>

      {/* Sector Growth Chart */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          Sector Emissions Growth (2010–2022)
        </h2>
        <p className="text-sm text-slate-500 mb-3">
          Stacked bar chart showing sector contributions over time
        </p>
        <SectorStackedBarChart />
      </div>

      {/* Recent Submissions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Recent Data Submissions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 text-left font-medium text-slate-500">Sector</th>
                <th className="pb-3 text-left font-medium text-slate-500">Category</th>
                <th className="pb-3 text-left font-medium text-slate-500">Year</th>
                <th className="pb-3 text-left font-medium text-slate-500">Status</th>
                <th className="pb-3 text-left font-medium text-slate-500">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { sector: "Energy", category: "Fuel Combustion", year: "2022", status: "Approved", source: "PRIMAP-hist v2.6" },
                { sector: "Agriculture", category: "Enteric Fermentation + Manure", year: "2022", status: "Approved", source: "PRIMAP-hist v2.6" },
                { sector: "IPPU", category: "Cement & Soda Ash", year: "2022", status: "Approved", source: "PRIMAP-hist v2.6" },
                { sector: "Waste", category: "Solid Waste Disposal", year: "2022", status: "Approved", source: "PRIMAP-hist v2.6" },
                { sector: "LULUCF", category: "Forest Land + Cropland", year: "2021", status: "Under Review", source: "EDGAR v8 / FAOSTAT" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3 text-slate-900">{row.sector}</td>
                  <td className="py-3 text-slate-600">{row.category}</td>
                  <td className="py-3 text-slate-600">{row.year}</td>
                  <td className="py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        row.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500 text-xs">{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MRV Intelligence Assistant */}
      <InlineIntelligence page="mrv" />
    </div>
  );
}
