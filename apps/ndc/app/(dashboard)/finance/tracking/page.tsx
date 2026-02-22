"use client";

import { useState } from "react";
import {
  Search,
  DollarSign,
  Globe2,
  Building2,
  Briefcase,
  Filter,
  Download,
  Calendar,
  Clock,
} from "lucide-react";

const bySource = [
  { source: "Bilateral", amount: 1.4, icon: Building2, color: "bg-indigo-500", iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
  { source: "Multilateral", amount: 1.1, icon: Globe2, color: "bg-emerald-500", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { source: "Domestic", amount: 0.5, icon: Building2, color: "bg-amber-500", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
  { source: "Private Sector", amount: 0.2, icon: Briefcase, color: "bg-purple-500", iconBg: "bg-purple-50", iconColor: "text-purple-600" },
];

const byInstrument = [
  { instrument: "Grants", amount: 1.2, percentage: 37.5, color: "bg-emerald-500" },
  { instrument: "Concessional Loans", amount: 1.1, percentage: 34.4, color: "bg-blue-500" },
  { instrument: "Equity", amount: 0.5, percentage: 15.6, color: "bg-amber-500" },
  { instrument: "Guarantees", amount: 0.4, percentage: 12.5, color: "bg-purple-500" },
];

const majorProjects = [
  { name: "Kenya Electricity Expansion Project", funder: "World Bank / IDA", amount: 450, sector: "Energy", status: "active" as const, period: "2019-2025", disbursed: 320 },
  { name: "Menengai Geothermal Development", funder: "AfDB / GCF", amount: 380, sector: "Energy", status: "active" as const, period: "2018-2026", disbursed: 210 },
  { name: "Kenya Climate Ventures Fund", funder: "GCF / DANIDA", amount: 200, sector: "Cross-cutting", status: "active" as const, period: "2020-2025", disbursed: 145 },
  { name: "Last Mile Connectivity Project", funder: "AfDB", amount: 180, sector: "Energy", status: "completed" as const, period: "2017-2023", disbursed: 180 },
  { name: "National Water Harvesting Programme", funder: "EU / GIZ", amount: 150, sector: "Water", status: "active" as const, period: "2021-2027", disbursed: 65 },
  { name: "Green Mini-Grid Facility", funder: "DFID / AfDB", amount: 120, sector: "Energy", status: "active" as const, period: "2020-2025", disbursed: 85 },
  { name: "Lake Turkana Wind Power", funder: "EIB / AfDB / Google", amount: 680, sector: "Energy", status: "completed" as const, period: "2014-2019", disbursed: 680 },
  { name: "Climate Smart Agriculture Programme", funder: "World Bank", amount: 250, sector: "Agriculture", status: "active" as const, period: "2022-2028", disbursed: 80 },
  { name: "Nairobi BRT Phase 1", funder: "World Bank / GoK", amount: 320, sector: "Transport", status: "pipeline" as const, period: "2025-2030", disbursed: 0 },
  { name: "National Forest Restoration", funder: "GCF / UNEP", amount: 85, sector: "Forestry", status: "active" as const, period: "2023-2028", disbursed: 25 },
];

const yearlyDisbursement = [
  { year: 2018, bilateral: 120, multilateral: 95, domestic: 40, priv: 10 },
  { year: 2019, bilateral: 180, multilateral: 130, domestic: 45, priv: 15 },
  { year: 2020, bilateral: 150, multilateral: 140, domestic: 50, priv: 18 },
  { year: 2021, bilateral: 200, multilateral: 160, domestic: 55, priv: 22 },
  { year: 2022, bilateral: 250, multilateral: 180, domestic: 65, priv: 35 },
  { year: 2023, bilateral: 280, multilateral: 200, domestic: 80, priv: 45 },
  { year: 2024, bilateral: 220, multilateral: 195, domestic: 165, priv: 55 },
];

const pipelineFunds = [
  { project: "GCF Readiness Phase III", amount: 1.2, status: "Approved", expectedDate: "Q2 2025" },
  { project: "Green Climate Fund - Geothermal", amount: 82.0, status: "Board Approved", expectedDate: "Q3 2025" },
  { project: "World Bank DPO Climate", amount: 150.0, status: "Under Preparation", expectedDate: "Q4 2025" },
  { project: "EU-Kenya Climate Partnership", amount: 45.0, status: "Negotiation", expectedDate: "Q1 2026" },
  { project: "AfDB Green Transport Facility", amount: 200.0, status: "Concept Note", expectedDate: "2026" },
];

const totalReceived = 3.2;
const totalNeeded = 62.0;

export default function FinanceTrackingPage() {
  const [filterSector, setFilterSector] = useState<string>("all");
  const sectors = Array.from(new Set(majorProjects.map((p) => p.sector)));
  const filteredProjects = filterSector === "all" ? majorProjects : majorProjects.filter((p) => p.sector === filterSector);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20"><Search className="h-5 w-5 text-white" /></div>
            <div><h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Finance Tracking</h1><p className="text-sm text-[hsl(var(--color-text-muted))]">Climate finance received and disbursed for NDC implementation</p></div>
          </div>
        </div>
        <button className="btn-secondary"><Download className="h-4 w-4" />Export Data</button>
      </div>

      <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="card-elevated">
          <div className="flex items-center gap-3"><div className="icon-container-md bg-emerald-50"><DollarSign className="h-5 w-5 text-emerald-600" /></div><div><p className="text-2xl font-bold text-emerald-600">${totalReceived}B</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Total Received</p></div></div>
          <div className="mt-3 progress-bar progress-bar-success"><div className="progress-bar-fill animate-progress-fill" style={{ width: `${(totalReceived / totalNeeded) * 100}%` }} /></div>
          <p className="mt-1 text-[11px] text-[hsl(var(--color-text-muted))]">{((totalReceived / totalNeeded) * 100).toFixed(1)}% of $62B needed</p>
        </div>
        {bySource.map((s) => { const Icon = s.icon; return (
          <div key={s.source} className="card-elevated"><div className="flex items-center gap-3"><div className={`icon-container-md ${s.iconBg}`}><Icon className={`h-5 w-5 ${s.iconColor}`} /></div><div><p className="text-2xl font-bold text-[hsl(var(--color-text))]">${s.amount}B</p><p className="text-xs text-[hsl(var(--color-text-muted))]">{s.source}</p></div></div></div>
        ); })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card-elevated">
          <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">By Source</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Climate finance distribution by funding source</p></div>
          <div className="space-y-4">
            {bySource.map((s) => { const pct = (s.amount / totalReceived) * 100; const Icon = s.icon; return (
              <div key={s.source}><div className="flex items-center justify-between mb-1.5"><div className="flex items-center gap-2"><div className={`flex h-6 w-6 items-center justify-center rounded ${s.color}`}><Icon className="h-3 w-3 text-white" /></div><span className="text-sm font-semibold text-[hsl(var(--color-text))]">{s.source}</span></div><span className="text-sm font-bold text-[hsl(var(--color-text))]">${s.amount}B ({pct.toFixed(0)}%)</span></div><div className="progress-bar"><div className={`absolute inset-y-0 left-0 rounded-full ${s.color}`} style={{ width: `${pct}%` }} /></div></div>
            ); })}
          </div>
        </div>
        <div className="card-elevated">
          <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">By Instrument</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Climate finance by financial instrument type</p></div>
          <div className="space-y-4">
            {byInstrument.map((i) => (
              <div key={i.instrument}><div className="flex items-center justify-between mb-1.5"><span className="text-sm font-semibold text-[hsl(var(--color-text))]">{i.instrument}</span><span className="text-sm font-bold text-[hsl(var(--color-text))]">${i.amount}B ({i.percentage}%)</span></div><div className="progress-bar"><div className={`absolute inset-y-0 left-0 rounded-full ${i.color}`} style={{ width: `${i.percentage}%` }} /></div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-elevated">
        <div className="flex items-center justify-between mb-4">
          <div><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Major Projects &amp; Programmes</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Funded climate projects with disbursement status</p></div>
          <div className="flex items-center gap-2"><Filter className="h-4 w-4 text-[hsl(var(--color-text-muted))]" /><select className="input-field w-auto" value={filterSector} onChange={(e) => setFilterSector(e.target.value)}><option value="all">All Sectors</option>{sectors.map((s) => (<option key={s} value={s}>{s}</option>))}</select></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-[hsl(var(--color-border))]"><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Project</th><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Funder</th><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Sector</th><th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Amount ($M)</th><th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Disbursed ($M)</th><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Period</th><th className="pb-3 text-center text-xs font-semibold text-[hsl(var(--color-text-muted))]">Status</th></tr></thead>
            <tbody>
              {filteredProjects.map((p) => { const disbursedPct = p.amount > 0 ? (p.disbursed / p.amount) * 100 : 0; return (
                <tr key={p.name} className="border-b border-[hsl(var(--color-border-light))] hover:bg-[hsl(var(--color-surface-hover))]">
                  <td className="py-3 text-xs font-semibold text-[hsl(var(--color-text))]">{p.name}</td>
                  <td className="py-3 text-xs text-[hsl(var(--color-text-secondary))]">{p.funder}</td>
                  <td className="py-3"><span className="badge-primary">{p.sector}</span></td>
                  <td className="py-3 text-right text-xs font-semibold text-[hsl(var(--color-text))]">${p.amount}</td>
                  <td className="py-3 text-right"><div className="flex items-center justify-end gap-2"><div className="w-16 progress-bar"><div className="absolute inset-y-0 left-0 rounded-full bg-emerald-500" style={{ width: `${disbursedPct}%` }} /></div><span className="text-xs font-semibold text-emerald-600">${p.disbursed}</span></div></td>
                  <td className="py-3 text-xs text-[hsl(var(--color-text-muted))]">{p.period}</td>
                  <td className="py-3 text-center"><span className={p.status === "completed" ? "badge-on-track" : p.status === "active" ? "badge-at-risk" : "badge-info"}>{p.status === "completed" ? "Completed" : p.status === "active" ? "Active" : "Pipeline"}</span></td>
                </tr>
              ); })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-elevated">
        <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Year-by-Year Disbursement ($M)</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Annual climate finance flows by source</p></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-[hsl(var(--color-border))]"><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Year</th><th className="pb-3 text-right text-xs font-semibold text-indigo-600">Bilateral</th><th className="pb-3 text-right text-xs font-semibold text-emerald-600">Multilateral</th><th className="pb-3 text-right text-xs font-semibold text-amber-600">Domestic</th><th className="pb-3 text-right text-xs font-semibold text-purple-600">Private</th><th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text))]">Total</th></tr></thead>
            <tbody>
              {yearlyDisbursement.map((y) => { const total = y.bilateral + y.multilateral + y.domestic + y.priv; return (
                <tr key={y.year} className="border-b border-[hsl(var(--color-border-light))]"><td className="py-2.5 text-xs font-semibold text-[hsl(var(--color-text))]">{y.year}</td><td className="py-2.5 text-right text-xs text-indigo-600">${y.bilateral}</td><td className="py-2.5 text-right text-xs text-emerald-600">${y.multilateral}</td><td className="py-2.5 text-right text-xs text-amber-600">${y.domestic}</td><td className="py-2.5 text-right text-xs text-purple-600">${y.priv}</td><td className="py-2.5 text-right text-xs font-bold text-[hsl(var(--color-text))]">${total}</td></tr>
              ); })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-elevated">
        <div className="flex items-center gap-2 mb-4"><Clock className="h-5 w-5 text-[hsl(var(--color-primary-light))]" /><div><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Pipeline - Approved but Undisbursed</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Funds in various stages of approval and preparation</p></div></div>
        <div className="space-y-3">
          {pipelineFunds.map((f) => (
            <div key={f.project} className="flex items-center gap-4 rounded-lg border border-[hsl(var(--color-border-light))] p-3">
              <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-[hsl(var(--color-text))] truncate">{f.project}</p><div className="flex items-center gap-2 mt-1 text-[11px] text-[hsl(var(--color-text-muted))]"><span className="badge-info">{f.status}</span><span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Expected: {f.expectedDate}</span></div></div>
              <p className="text-sm font-bold text-[hsl(var(--color-text))]">${f.amount}M</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-[hsl(var(--color-border-light))]"><div className="flex items-center justify-between"><span className="text-sm font-bold text-[hsl(var(--color-text))]">Total Pipeline</span><span className="text-sm font-bold text-[hsl(var(--color-primary))]">${pipelineFunds.reduce((s, f) => s + f.amount, 0).toFixed(1)}M</span></div></div>
      </div>
    </div>
  );
}
