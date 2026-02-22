"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import IntelligenceInsights from "@/components/intelligence/intelligence-insights";

const EmissionsTrendChart = dynamic(
  () => import("@/components/charts/emissions-trend-chart"),
  { ssr: false, loading: () => <div className="h-[320px] animate-pulse bg-slate-50 rounded-lg" /> }
);
const SectorPieChart = dynamic(
  () => import("@/components/charts/sector-breakdown-chart").then((m) => ({ default: m.SectorPieChart })),
  { ssr: false, loading: () => <div className="h-[280px] animate-pulse bg-slate-50 rounded-lg" /> }
);
const BudgetNdcChart = dynamic(
  () => import("@/components/charts/budget-ndc-chart"),
  { ssr: false, loading: () => <div className="h-[320px] animate-pulse bg-slate-50 rounded-lg" /> }
);
const InlineIntelligence = dynamic(
  () => import("@/components/intelligence/inline-intelligence"),
  { ssr: false, loading: () => <div className="h-[200px] animate-pulse bg-teal-50 rounded-2xl" /> }
);

/* ─── Verified Kenya climate stats ─── */
const HERO_STATS = [
  {
    label: "GHG Emissions (2022)",
    value: "94.9",
    unit: "MtCO2e",
    change: "+15.3% vs 2021",
    changeColor: "text-red-400",
    detail: "excl. LULUCF · PRIMAP-hist v2.6",
    gradient: "from-red-500/10 to-red-600/5",
    icon: (
      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    label: "NDC Target (2030)",
    value: "-32%",
    unit: "below BAU",
    change: "97.3 MtCO2e cap",
    changeColor: "text-blue-400",
    detail: "7% unconditional + 25% conditional",
    gradient: "from-blue-500/10 to-blue-600/5",
    icon: (
      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    label: "Carbon Credits",
    value: "59M",
    unit: "tCO2e",
    change: "296 projects",
    changeColor: "text-emerald-400",
    detail: "VCM + CDM since 2011 · $136M revenue",
    gradient: "from-emerald-500/10 to-emerald-600/5",
    icon: (
      <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
      </svg>
    ),
  },
  {
    label: "Climate Finance Gap",
    value: "53%",
    unit: "shortfall",
    change: "$2.73B/yr gap",
    changeColor: "text-amber-400",
    detail: "$2.4B flows vs $5.13B needed",
    gradient: "from-amber-500/10 to-amber-600/5",
    icon: (
      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const SECTOR_STATUS = [
  { sector: "Energy", emissions: "40.27 MtCO2e", ndcTarget: "48.1 MtCO2e reduction", status: "Off-Track", progress: 35, color: "bg-red-500", statusColor: "text-red-600 bg-red-50" },
  { sector: "LULUCF", emissions: "Net sink", ndcTarget: "20.8 MtCO2e reduction", status: "Behind", progress: 33, color: "bg-green-500", statusColor: "text-amber-600 bg-amber-50" },
  { sector: "Agriculture", emissions: "44.92 MtCO2e", ndcTarget: "9.7 MtCO2e reduction", status: "Behind", progress: 40, color: "bg-emerald-500", statusColor: "text-amber-600 bg-amber-50" },
  { sector: "Transport", emissions: "~5.7 MtCO2e", ndcTarget: "4.7 MtCO2e reduction", status: "On-Track", progress: 68, color: "bg-blue-500", statusColor: "text-emerald-600 bg-emerald-50" },
  { sector: "IPPU", emissions: "5.96 MtCO2e", ndcTarget: "2.4 MtCO2e reduction", status: "Behind", progress: 25, color: "bg-purple-500", statusColor: "text-amber-600 bg-amber-50" },
  { sector: "Waste", emissions: "3.10 MtCO2e", ndcTarget: "0.8 MtCO2e reduction", status: "On-Track", progress: 55, color: "bg-amber-500", statusColor: "text-emerald-600 bg-emerald-50" },
];

const RECENT_EVENTS = [
  { event: "Second NDC (2031-2035) submitted to UNFCCC", date: "30 Apr 2025", module: "NDC", color: "border-blue-400" },
  { event: "Kenya National Carbon Registry launched", date: "17 Feb 2026", module: "Registry", color: "border-emerald-400" },
  { event: "BTR-1 Biennial Transparency Report filed", date: "Dec 2024", module: "MRV", color: "border-teal-400" },
  { event: "Article 6 bilateral signed with Sweden", date: "Nov 2024", module: "Registry", color: "border-amber-400" },
  { event: "Kasigau REDD+ issuance: 1.8M tCO2e", date: "Feb 2025", module: "Registry", color: "border-green-400" },
  { event: "NCCAP III (2023-2027) implementation begun", date: "2023", module: "NDC", color: "border-violet-400" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-6 lg:p-8">
        <div className="absolute inset-0 opacity-10">
          <div className="pattern-dots absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        </div>
        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                Kenya Climate Intelligence
              </h1>
              <p className="mt-1 text-sm text-teal-200/80">
                Digital Center for Applied Carbon Intelligence (DCACI)
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-teal-100">Live Data · Last updated Feb 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl bg-gradient-to-br ${stat.gradient} border border-white/10 backdrop-blur-sm p-4 transition-all hover:border-white/20 hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-300">
                    {stat.label}
                  </span>
                  {stat.icon}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                  <span className="text-sm font-medium text-slate-300">{stat.unit}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className={`text-xs font-semibold ${stat.changeColor}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intelligence Insights */}
      <IntelligenceInsights page="dashboard" />

      {/* Intelligence Assistant */}
      <InlineIntelligence page="dashboard" />

      {/* Charts Row 1: Emissions + Budget Alignment */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">GHG Emissions Trajectory</h2>
            <p className="text-sm text-slate-500">Historical (1990-2022) and NDC projections to 2035</p>
          </div>
          <EmissionsTrendChart />
        </div>
        <div className="card">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Budget vs NDC Needs</h2>
            <p className="text-sm text-slate-500">National budget allocation against NDC implementation cost by sector</p>
          </div>
          <BudgetNdcChart />
        </div>
      </div>

      {/* NDC Sector Progress Tracker */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">NDC Sector Progress</h2>
            <p className="text-sm text-slate-500">Tracking 86.5 MtCO2e mitigation target across 6 sectors by 2030</p>
          </div>
          <Link href="/dashboard/ndc" className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1">
            Full NDC Tracker
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
        <div className="space-y-4">
          {SECTOR_STATUS.map((s) => (
            <div key={s.sector} className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${s.color}`} />
                  <div>
                    <span className="text-sm font-semibold text-slate-900">{s.sector}</span>
                    <span className="text-xs text-slate-400 ml-2">{s.emissions}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">{s.ndcTarget}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.statusColor}`}>
                    {s.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-slate-100">
                  <div
                    className={`h-2 rounded-full ${s.color} transition-all`}
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-600 w-8 text-right">{s.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sector Breakdown Chart */}
      <div className="card">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Sector Emissions Breakdown (2022)</h2>
          <p className="text-sm text-slate-500">GHG emissions by IPCC sector, excl. LULUCF · Total: 94.25 MtCO2e</p>
        </div>
        <SectorPieChart />
      </div>

      {/* Bottom Row: Timeline + Quick Access */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Timeline */}
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Key Climate Events</h2>
          <div className="space-y-3">
            {RECENT_EVENTS.map((evt, i) => (
              <div key={i} className={`flex items-start gap-3 rounded-lg border-l-4 ${evt.color} bg-slate-50/50 p-3`}>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{evt.event}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">{evt.date}</span>
                    <span className="text-[10px] font-medium text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">{evt.module}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Modules</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "MRV System", href: "/dashboard/mrv", desc: "GHG inventory & BTR", color: "border-emerald-200 hover:border-emerald-400", icon: "bg-emerald-100 text-emerald-700" },
              { name: "NDC Tracker", href: "/dashboard/ndc", desc: "Targets & mitigation", color: "border-blue-200 hover:border-blue-400", icon: "bg-blue-100 text-blue-700" },
              { name: "Carbon Registry", href: "/dashboard/registry", desc: "Credits & Article 6", color: "border-amber-200 hover:border-amber-400", icon: "bg-amber-100 text-amber-700" },
              { name: "Climate Finance", href: "/dashboard/finance", desc: "Budget & finance flows", color: "border-violet-200 hover:border-violet-400", icon: "bg-violet-100 text-violet-700" },
            ].map((mod) => (
              <Link
                key={mod.name}
                href={mod.href}
                className={`flex items-center gap-3 rounded-xl border-2 ${mod.color} bg-white p-4 transition-all hover:shadow-md group`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${mod.icon} flex-shrink-0`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{mod.name}</p>
                  <p className="text-[11px] text-slate-500">{mod.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
