"use client";

import dynamic from "next/dynamic";
import IntelligenceInsights from "@/components/intelligence/intelligence-insights";

const NdcGapChart = dynamic(
  () => import("@/components/charts/ndc-gap-chart"),
  { ssr: false, loading: () => <div className="h-[300px] animate-pulse bg-slate-50 rounded-lg" /> }
);
const BudgetNdcChart = dynamic(
  () => import("@/components/charts/budget-ndc-chart"),
  { ssr: false, loading: () => <div className="h-[320px] animate-pulse bg-slate-50 rounded-lg" /> }
);
const InlineIntelligence = dynamic(
  () => import("@/components/intelligence/inline-intelligence"),
  { ssr: false, loading: () => <div className="h-[200px] animate-pulse bg-teal-50 rounded-2xl" /> }
);

export default function NdcPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">NDC Tracker</h1>
          <p className="mt-1 text-sm text-slate-500">
            Track Nationally Determined Contributions progress and mitigation actions
          </p>
        </div>
      </div>

      {/* Intelligence Insights */}
      <IntelligenceInsights page="ndc" />

      {/* NDC Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card border-l-4 border-l-blue-500">
          <p className="text-sm text-slate-500">Updated NDC (2020)</p>
          <p className="mt-1 text-xl font-bold text-slate-900">-32% by 2030</p>
          <p className="mt-1 text-xs text-slate-400">7% unconditional + 25% conditional, below 143 MtCO2e BAU</p>
        </div>
        <div className="card border-l-4 border-l-emerald-500">
          <p className="text-sm text-slate-500">Second NDC (2025)</p>
          <p className="mt-1 text-xl font-bold text-slate-900">-35% by 2035</p>
          <p className="mt-1 text-xs text-emerald-600">Submitted 30 Apr 2025, vs 215 MtCO2e BAU</p>
        </div>
        <div className="card border-l-4 border-l-amber-500">
          <p className="text-sm text-slate-500">Mitigation Potential</p>
          <p className="mt-1 text-xl font-bold text-slate-900">86.5 MtCO2e</p>
          <p className="mt-1 text-xs text-amber-600">By 2030 across 6 sectors (NCCAP)</p>
        </div>
        <div className="card border-l-4 border-l-violet-500">
          <p className="text-sm text-slate-500">Implementation Cost</p>
          <p className="mt-1 text-xl font-bold text-slate-900">$62B</p>
          <p className="mt-1 text-xs text-violet-600">2020-2030 (87% intl support needed)</p>
        </div>
      </div>

      {/* Charts: Gap Analysis + Budget Alignment */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">
            NDC Gap Analysis: Actual vs BAU vs Targets
          </h2>
          <p className="text-sm text-slate-500 mb-3">
            Kenya&apos;s emissions trajectory against NDC reduction commitments (MtCO2e excl. LULUCF)
          </p>
          <NdcGapChart />
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">
            Budget vs NDC Implementation Needs
          </h2>
          <p className="text-sm text-slate-500 mb-3">
            Current budget allocation against sector NDC costs (USD billions)
          </p>
          <BudgetNdcChart />
        </div>
      </div>

      {/* Sector Mitigation Targets */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Sector Mitigation Targets (Updated NDC, by 2030)
        </h2>
        <div className="space-y-4">
          {[
            { sector: "Energy", target: 48.1, share: 55.6, color: "bg-red-500", budget: "$0.92B", need: "$15.2B", gap: "94%" },
            { sector: "LULUCF", target: 20.8, share: 24.0, color: "bg-green-500", budget: "$0.20B", need: "$8.5B", gap: "98%" },
            { sector: "Agriculture", target: 9.7, share: 11.2, color: "bg-emerald-500", budget: "$0.49B", need: "$5.8B", gap: "92%" },
            { sector: "Transport", target: 4.7, share: 5.4, color: "bg-blue-500", budget: "$1.68B", need: "$4.2B", gap: "60%" },
            { sector: "Industrial Processes", target: 2.4, share: 2.8, color: "bg-purple-500", budget: "$0.12B", need: "$1.8B", gap: "93%" },
            { sector: "Waste", target: 0.8, share: 0.9, color: "bg-amber-500", budget: "$0.08B", need: "$0.7B", gap: "89%" },
          ].map((item) => (
            <div key={item.sector}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">
                  {item.sector}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-600">{item.target} MtCO2e ({item.share}%)</span>
                  <span className="text-[10px] font-mono text-slate-400">{item.budget} / {item.need}</span>
                  <span className="text-[10px] font-semibold text-red-500">{item.gap} gap</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.share}%` }} />
              </div>
            </div>
          ))}
          <p className="text-xs text-slate-400 mt-2">Total mitigation potential: 86.5 MtCO2e by 2030 | Source: Updated NDC (2020), NCCAP 2018-2022, National Budget FY 2024/25</p>
        </div>
      </div>

      {/* Mitigation Actions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Key Mitigation Actions
          </h2>
          <button className="btn-primary text-sm px-4 py-2">
            Add Action
          </button>
        </div>
        <div className="space-y-3">
          {[
            { name: "Geothermal Expansion (Olkaria + Menengai)", sector: "Energy", reduction: "48.1 MtCO2e", status: "In Progress", progress: 65 },
            { name: "Forest Landscape Restoration (10% cover by 2030)", sector: "LULUCF", reduction: "20.8 MtCO2e", status: "In Progress", progress: 33 },
            { name: "Climate-Smart Agriculture (KCSAP + Dairy NAMA)", sector: "Agriculture", reduction: "9.7 MtCO2e", status: "In Progress", progress: 40 },
            { name: "Lake Turkana Wind + Solar Mini-Grids", sector: "Energy", reduction: "4.7 MtCO2e", status: "Operational", progress: 85 },
            { name: "Clean Cooking (BURN Manufacturing + LPG transition)", sector: "Energy", reduction: "2.4 MtCO2e", status: "In Progress", progress: 55 },
            { name: "E-Mobility & BRT (Nairobi, Mombasa)", sector: "Transport", reduction: "4.7 MtCO2e", status: "Planned", progress: 12 },
          ].map((action, i) => (
            <div key={i} className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{action.name}</h4>
                  <p className="mt-0.5 text-xs text-slate-500">{action.sector} &middot; {action.reduction} expected reduction</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  action.status === "In Progress" ? "bg-blue-100 text-blue-700"
                    : action.status === "Operational" ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                }`}>
                  {action.status}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">Progress</span>
                  <span className="text-xs font-medium text-slate-600">{action.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100">
                  <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${action.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NDC Intelligence Assistant */}
      <InlineIntelligence page="ndc" />
    </div>
  );
}
