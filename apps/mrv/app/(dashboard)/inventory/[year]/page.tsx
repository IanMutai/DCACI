"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Download,
  Edit3,
  Send,
  Flame,
  Factory,
  Wheat,
  TreePine,
  Trash2,
  Minus,
  BarChart3,
  ShieldCheck,
  History,
  Database,
  Calculator,
  Layers,
  Info,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

/* ───────────────────────────────────────────
   Per-year inventory data (Kenya)
   ─────────────────────────────────────────── */

interface YearData {
  status: string;
  statusBadge: string;
  lastModified: string;
  totalEmissions: number;
  totalRemovals: number;
  netEmissions: number;
  completeness: number;
  methodology: string;
  baseYear: string;
  gwpValues: string;
  sectors: {
    code: string;
    name: string;
    icon: React.ReactNode;
    emissions: number;
    pctOfTotal: number;
    prevYearChange: number;
    status: string;
  }[];
  timeline: { step: string; date: string; done: boolean; active: boolean }[];
}

const yearDataMap: Record<string, YearData> = {
  "2023": {
    status: "Data Entry",
    statusBadge: "badge-warning badge-dot",
    lastModified: "2025-12-18",
    totalEmissions: 97.5,
    totalRemovals: -7.8,
    netEmissions: 89.7,
    completeness: 42,
    methodology: "2006 IPCC Guidelines (Revised 2019)",
    baseYear: "1990",
    gwpValues: "AR5 (IPCC Fifth Assessment Report)",
    sectors: [
      { code: "1", name: "Energy", icon: <Flame size={16} className="text-orange-600" />, emissions: 41.8, pctOfTotal: 42.9, prevYearChange: 3.7, status: "in_progress" },
      { code: "2", name: "IPPU", icon: <Factory size={16} className="text-blue-600" />, emissions: 6.2, pctOfTotal: 6.4, prevYearChange: 4.0, status: "pending" },
      { code: "3", name: "Agriculture", icon: <Wheat size={16} className="text-green-600" />, emissions: 46.2, pctOfTotal: 47.4, prevYearChange: 2.9, status: "in_progress" },
      { code: "3B", name: "LULUCF", icon: <TreePine size={16} className="text-emerald-600" />, emissions: -7.8, pctOfTotal: 8.0, prevYearChange: 3.0, status: "pending" },
      { code: "4", name: "Waste", icon: <Trash2 size={16} className="text-purple-600" />, emissions: 3.3, pctOfTotal: 3.4, prevYearChange: 6.5, status: "complete" },
    ],
    timeline: [
      { step: "Draft", date: "2025-06-01", done: true, active: false },
      { step: "Data Entry", date: "2025-08-15", done: false, active: true },
      { step: "Calculations", date: "", done: false, active: false },
      { step: "QA/QC", date: "", done: false, active: false },
      { step: "Review", date: "", done: false, active: false },
      { step: "Approved", date: "", done: false, active: false },
    ],
  },
  "2022": {
    status: "Under Review",
    statusBadge: "badge-accent badge-dot",
    lastModified: "2025-09-10",
    totalEmissions: 94.9,
    totalRemovals: -7.57,
    netEmissions: 87.3,
    completeness: 100,
    methodology: "2006 IPCC Guidelines (Revised 2019)",
    baseYear: "1990",
    gwpValues: "AR5 (IPCC Fifth Assessment Report)",
    sectors: [
      { code: "1", name: "Energy", icon: <Flame size={16} className="text-orange-600" />, emissions: 40.3, pctOfTotal: 42.4, prevYearChange: 10.4, status: "complete" },
      { code: "2", name: "IPPU", icon: <Factory size={16} className="text-blue-600" />, emissions: 5.96, pctOfTotal: 6.3, prevYearChange: 8.4, status: "complete" },
      { code: "3", name: "Agriculture", icon: <Wheat size={16} className="text-green-600" />, emissions: 44.9, pctOfTotal: 47.3, prevYearChange: 5.6, status: "complete" },
      { code: "3B", name: "LULUCF", icon: <TreePine size={16} className="text-emerald-600" />, emissions: -7.57, pctOfTotal: 8.0, prevYearChange: 5.1, status: "complete" },
      { code: "4", name: "Waste", icon: <Trash2 size={16} className="text-purple-600" />, emissions: 3.1, pctOfTotal: 3.3, prevYearChange: 6.9, status: "complete" },
    ],
    timeline: [
      { step: "Draft", date: "2024-11-01", done: true, active: false },
      { step: "Data Entry", date: "2025-02-15", done: true, active: false },
      { step: "Calculations", date: "2025-05-20", done: true, active: false },
      { step: "QA/QC", date: "2025-07-12", done: true, active: false },
      { step: "Review", date: "2025-09-10", done: false, active: true },
      { step: "Approved", date: "", done: false, active: false },
    ],
  },
  "2021": {
    status: "Approved",
    statusBadge: "badge-success badge-dot",
    lastModified: "2024-07-22",
    totalEmissions: 89.6,
    totalRemovals: -12.0,
    netEmissions: 77.6,
    completeness: 100,
    methodology: "2006 IPCC Guidelines",
    baseYear: "1990",
    gwpValues: "AR5 (IPCC Fifth Assessment Report)",
    sectors: [
      { code: "1", name: "Energy", icon: <Flame size={16} className="text-orange-600" />, emissions: 41.9, pctOfTotal: 46.8, prevYearChange: 3.5, status: "complete" },
      { code: "2", name: "IPPU", icon: <Factory size={16} className="text-blue-600" />, emissions: 3.2, pctOfTotal: 3.6, prevYearChange: 1.6, status: "complete" },
      { code: "3", name: "Agriculture", icon: <Wheat size={16} className="text-green-600" />, emissions: 25.4, pctOfTotal: 28.3, prevYearChange: 1.2, status: "complete" },
      { code: "3B", name: "LULUCF", icon: <TreePine size={16} className="text-emerald-600" />, emissions: -12.0, pctOfTotal: 13.4, prevYearChange: -2.6, status: "complete" },
      { code: "4", name: "Waste", icon: <Trash2 size={16} className="text-purple-600" />, emissions: 8.1, pctOfTotal: 9.0, prevYearChange: 3.8, status: "complete" },
    ],
    timeline: [
      { step: "Draft", date: "2023-08-01", done: true, active: false },
      { step: "Data Entry", date: "2023-11-15", done: true, active: false },
      { step: "Calculations", date: "2024-02-10", done: true, active: false },
      { step: "QA/QC", date: "2024-04-18", done: true, active: false },
      { step: "Review", date: "2024-06-20", done: true, active: false },
      { step: "Approved", date: "2024-07-22", done: true, active: false },
    ],
  },
};

const tabs = [
  { id: "overview", label: "Overview", icon: <Layers size={14} /> },
  { id: "sectors", label: "Sectors", icon: <BarChart3 size={14} /> },
  { id: "activity", label: "Activity Data", icon: <Database size={14} /> },
  { id: "calculations", label: "Calculations", icon: <Calculator size={14} /> },
  { id: "qaqc", label: "QA/QC", icon: <ShieldCheck size={14} /> },
  { id: "history", label: "History", icon: <History size={14} /> },
];

export default function InventoryYearPage() {
  const params = useParams();
  const year = params.year as string;
  const [activeTab, setActiveTab] = useState("overview");

  /* Fallback data for years not explicitly mapped */
  const data: YearData = yearDataMap[year] ?? {
    status: "Approved",
    statusBadge: "badge-success badge-dot",
    lastModified: "2023-03-15",
    totalEmissions: 82.8,
    totalRemovals: -11.4,
    netEmissions: 71.4,
    completeness: 100,
    methodology: "2006 IPCC Guidelines",
    baseYear: "1990",
    gwpValues: "AR4",
    sectors: [
      { code: "1", name: "Energy", icon: <Flame size={16} className="text-orange-600" />, emissions: 38.2, pctOfTotal: 46.1, prevYearChange: 2.8, status: "complete" },
      { code: "2", name: "IPPU", icon: <Factory size={16} className="text-blue-600" />, emissions: 2.9, pctOfTotal: 3.5, prevYearChange: 1.4, status: "complete" },
      { code: "3", name: "Agriculture", icon: <Wheat size={16} className="text-green-600" />, emissions: 24.8, pctOfTotal: 30.0, prevYearChange: 0.6, status: "complete" },
      { code: "3B", name: "LULUCF", icon: <TreePine size={16} className="text-emerald-600" />, emissions: -11.4, pctOfTotal: 13.8, prevYearChange: -1.8, status: "complete" },
      { code: "4", name: "Waste", icon: <Trash2 size={16} className="text-purple-600" />, emissions: 7.5, pctOfTotal: 9.1, prevYearChange: 3.2, status: "complete" },
    ],
    timeline: [
      { step: "Draft", date: "2022-06-01", done: true, active: false },
      { step: "Data Entry", date: "2022-09-15", done: true, active: false },
      { step: "Calculations", date: "2022-12-10", done: true, active: false },
      { step: "QA/QC", date: "2023-01-18", done: true, active: false },
      { step: "Review", date: "2023-02-20", done: true, active: false },
      { step: "Approved", date: "2023-03-15", done: true, active: false },
    ],
  };

  const sectorSlugMap: Record<string, string> = {
    Energy: "energy",
    IPPU: "ippu",
    Agriculture: "agriculture",
    LULUCF: "lulucf",
    Waste: "waste",
  };

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/inventory"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft size={14} />
        All Inventories
      </Link>

      {/* Page Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              GHG Inventory &mdash; {year}
            </h1>
            <span className={data.statusBadge}>{data.status}</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            National greenhouse gas inventory for Kenya &middot; Last modified{" "}
            {data.lastModified}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/inventory/data-entry" className="btn-secondary btn-sm">
            <Edit3 size={14} />
            <span>Edit</span>
          </Link>
          <Link href="/inventory/review" className="btn-secondary btn-sm">
            <Send size={14} />
            <span>Submit for Review</span>
          </Link>
          <button className="btn-primary btn-sm">
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Workflow Status Bar */}
      <div className="card-elevated animate-fade-up">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Inventory Workflow
        </p>
        <div className="flex items-center gap-1">
          {data.timeline.map((step, idx) => (
            <div key={step.step} className="flex items-center gap-1 flex-1">
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold shrink-0 ${
                  step.done
                    ? "bg-emerald-100 text-emerald-700"
                    : step.active
                    ? "bg-blue-100 text-blue-700 ring-2 ring-blue-300"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.done ? (
                  <CheckCircle2 size={14} />
                ) : (
                  idx + 1
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-medium truncate ${
                    step.done
                      ? "text-emerald-700"
                      : step.active
                      ? "text-blue-700"
                      : "text-gray-400"
                  }`}
                >
                  {step.step}
                </p>
                {step.date && (
                  <p className="text-[10px] text-gray-400">{step.date}</p>
                )}
              </div>
              {idx < data.timeline.length - 1 && (
                <div
                  className={`w-6 h-0.5 shrink-0 ${
                    step.done ? "bg-emerald-300" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-1 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-emerald-500 text-emerald-700"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-fade-up">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            <div className="card-stat">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Total Emissions
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {data.totalEmissions.toFixed(1)}
              </p>
              <p className="text-xs text-gray-400">MtCO2eq</p>
            </div>
            <div className="card-stat">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Total Removals
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-700">
                {data.totalRemovals.toFixed(1)}
              </p>
              <p className="text-xs text-gray-400">MtCO2eq (LULUCF sink)</p>
            </div>
            <div className="card-stat">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Net Emissions
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {data.netEmissions.toFixed(1)}
              </p>
              <p className="text-xs text-gray-400">MtCO2eq</p>
            </div>
            <div className="card-stat">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Completeness
              </p>
              <div className="mt-1 flex items-end gap-2">
                <p className="text-2xl font-bold text-gray-900">
                  {data.completeness}%
                </p>
              </div>
              <div className="mt-1 progress-bar">
                <div
                  className={`progress-bar-fill ${data.completeness === 100 ? "primary" : "warning"}`}
                  style={{ "--progress-width": `${data.completeness}%` } as React.CSSProperties}
                />
              </div>
            </div>
          </div>

          {/* Sector Breakdown Table */}
          <div className="card-elevated">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Sector Breakdown
              </h2>
              <span className="badge-primary badge-lg">
                {data.sectors.length} sectors
              </span>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Sector</th>
                    <th>Emissions (MtCO2eq)</th>
                    <th>% of Total</th>
                    <th>Change vs Prev Year</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.sectors.map((s) => (
                    <tr key={s.code}>
                      <td className="font-mono text-sm font-semibold text-gray-600">
                        {s.code}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          {s.icon}
                          <span className="font-medium text-gray-900">{s.name}</span>
                        </div>
                      </td>
                      <td className="font-mono text-sm">
                        {s.emissions > 0 ? "+" : ""}
                        {s.emissions.toFixed(1)}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="progress-bar w-16">
                            <div
                              className="progress-bar-fill primary"
                              style={{ "--progress-width": `${s.pctOfTotal}%` } as React.CSSProperties}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {s.pctOfTotal.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          {s.prevYearChange > 0 ? (
                            <ArrowUpRight size={14} className="text-red-500" />
                          ) : s.prevYearChange < 0 ? (
                            <ArrowDownRight size={14} className="text-emerald-500" />
                          ) : (
                            <Minus size={14} className="text-gray-400" />
                          )}
                          <span
                            className={`text-xs font-medium ${
                              s.name === "LULUCF"
                                ? s.prevYearChange < 0
                                  ? "text-emerald-600"
                                  : "text-red-600"
                                : s.prevYearChange > 0
                                ? "text-red-600"
                                : "text-emerald-600"
                            }`}
                          >
                            {s.prevYearChange > 0 ? "+" : ""}
                            {s.prevYearChange.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={
                            s.status === "complete"
                              ? "badge-success"
                              : s.status === "in_progress"
                              ? "badge-warning"
                              : "badge-neutral"
                          }
                        >
                          {s.status === "complete"
                            ? "Complete"
                            : s.status === "in_progress"
                            ? "In Progress"
                            : "Pending"}
                        </span>
                      </td>
                      <td>
                        <Link
                          href={`/sectors/${sectorSlugMap[s.name] ?? s.name.toLowerCase()}`}
                          className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
                        >
                          Details <ChevronRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory Metadata */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-elevated">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Info size={14} className="text-gray-400" />
                Inventory Metadata
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <dt className="text-sm text-gray-500">Methodology</dt>
                  <dd className="text-sm font-medium text-gray-900">{data.methodology}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <dt className="text-sm text-gray-500">Base Year</dt>
                  <dd className="text-sm font-medium text-gray-900">{data.baseYear}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <dt className="text-sm text-gray-500">GWP Values</dt>
                  <dd className="text-sm font-medium text-gray-900">{data.gwpValues}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <dt className="text-sm text-gray-500">Reporting Year</dt>
                  <dd className="text-sm font-medium text-gray-900">{year}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-sm text-gray-500">Country</dt>
                  <dd className="text-sm font-medium text-gray-900">Kenya</dd>
                </div>
              </dl>
            </div>

            <div className="card-elevated">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar size={14} className="text-gray-400" />
                Submission Timeline
              </h3>
              <div className="space-y-3">
                {data.timeline
                  .filter((t) => t.date)
                  .map((t, idx) => (
                    <div key={t.step} className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          t.done ? "bg-emerald-500" : t.active ? "bg-blue-500 animate-pulse-gentle" : "bg-gray-300"
                        }`}
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm text-gray-700">{t.step}</span>
                        <span className="text-xs text-gray-400">{t.date}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "sectors" && (
        <div className="space-y-4 animate-fade-up">
          <p className="text-sm text-gray-500">
            Click on a sector to see detailed IPCC category breakdowns.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {data.sectors.map((s) => (
              <Link
                key={s.code}
                href={`/sectors/${sectorSlugMap[s.name] ?? s.name.toLowerCase()}`}
                className="card-interactive"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                    <p className="text-xs text-gray-400">Sector {s.code}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {s.emissions > 0 ? "" : ""}
                      {s.emissions.toFixed(1)} Mt
                    </p>
                    <p className="text-xs text-gray-400">CO2 equivalent</p>
                  </div>
                  <span
                    className={
                      s.status === "complete"
                        ? "badge-success"
                        : s.status === "in_progress"
                        ? "badge-warning"
                        : "badge-neutral"
                    }
                  >
                    {s.status === "complete"
                      ? "Complete"
                      : s.status === "in_progress"
                      ? "In Progress"
                      : "Pending"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="space-y-4 animate-fade-up">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Activity data sources and values used in emission calculations.
            </p>
            <Link href="/inventory/data-entry" className="btn-primary btn-sm">
              <Edit3 size={14} />
              <span>Enter Data</span>
            </Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Activity Data</th>
                  <th>Value</th>
                  <th>Unit</th>
                  <th>Source</th>
                  <th>Tier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono text-xs">1.A.1.a</td>
                  <td className="text-sm">Electricity generation - coal</td>
                  <td className="font-mono">2,340</td>
                  <td className="text-xs text-gray-500">TJ</td>
                  <td className="text-xs text-gray-500">Energy Regulatory Commission</td>
                  <td><span className="badge-accent">Tier 2</span></td>
                </tr>
                <tr>
                  <td className="font-mono text-xs">1.A.1.a</td>
                  <td className="text-sm">Electricity generation - gas</td>
                  <td className="font-mono">8,120</td>
                  <td className="text-xs text-gray-500">TJ</td>
                  <td className="text-xs text-gray-500">KenGen Annual Report</td>
                  <td><span className="badge-accent">Tier 2</span></td>
                </tr>
                <tr>
                  <td className="font-mono text-xs">1.A.3.b</td>
                  <td className="text-sm">Road transport - gasoline</td>
                  <td className="font-mono">18,450</td>
                  <td className="text-xs text-gray-500">TJ</td>
                  <td className="text-xs text-gray-500">KNBS Transport Statistics</td>
                  <td><span className="badge-neutral">Tier 1</span></td>
                </tr>
                <tr>
                  <td className="font-mono text-xs">1.A.3.b</td>
                  <td className="text-sm">Road transport - diesel</td>
                  <td className="font-mono">24,670</td>
                  <td className="text-xs text-gray-500">TJ</td>
                  <td className="text-xs text-gray-500">KNBS Transport Statistics</td>
                  <td><span className="badge-neutral">Tier 1</span></td>
                </tr>
                <tr>
                  <td className="font-mono text-xs">3.A.1</td>
                  <td className="text-sm">Enteric fermentation - cattle</td>
                  <td className="font-mono">18,200,000</td>
                  <td className="text-xs text-gray-500">head</td>
                  <td className="text-xs text-gray-500">KNBS Agricultural Census</td>
                  <td><span className="badge-accent">Tier 2</span></td>
                </tr>
                <tr>
                  <td className="font-mono text-xs">4.A</td>
                  <td className="text-sm">Solid waste disposed</td>
                  <td className="font-mono">12,560</td>
                  <td className="text-xs text-gray-500">Gg</td>
                  <td className="text-xs text-gray-500">NEMA Waste Report</td>
                  <td><span className="badge-neutral">Tier 1</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "calculations" && (
        <div className="space-y-4 animate-fade-up">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Emission calculations using IPCC methodology: E = AD x EF x GWP
            </p>
            <Link href="/inventory/calculations" className="btn-primary btn-sm">
              <Calculator size={14} />
              <span>Full Calculations</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card-stat">
              <p className="text-xs text-gray-500">CO2</p>
              <p className="text-lg font-bold text-gray-900">62.4 Mt</p>
            </div>
            <div className="card-stat">
              <p className="text-xs text-gray-500">CH4</p>
              <p className="text-lg font-bold text-gray-900">18.8 Mt CO2eq</p>
            </div>
            <div className="card-stat">
              <p className="text-xs text-gray-500">N2O</p>
              <p className="text-lg font-bold text-gray-900">10.2 Mt CO2eq</p>
            </div>
            <div className="card-stat">
              <p className="text-xs text-gray-500">F-gases</p>
              <p className="text-lg font-bold text-gray-900">1.0 Mt CO2eq</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "qaqc" && (
        <div className="space-y-4 animate-fade-up">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Quality Assurance / Quality Control checks for this inventory.
            </p>
            <Link href="/inventory/review" className="btn-primary btn-sm">
              <ShieldCheck size={14} />
              <span>Full QA/QC</span>
            </Link>
          </div>
          <div className="card-elevated">
            {[
              { name: "Completeness Check", status: "pass" },
              { name: "Time Series Consistency", status: "pass" },
              { name: "Methodology Comparability", status: "pass" },
              { name: "Uncertainty Assessment", status: "warning" },
              { name: "Documentation Transparency", status: "pending" },
            ].map((check) => (
              <div
                key={check.name}
                className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
              >
                <span className="text-sm text-gray-700">{check.name}</span>
                <span
                  className={
                    check.status === "pass"
                      ? "badge-success"
                      : check.status === "warning"
                      ? "badge-warning"
                      : "badge-neutral"
                  }
                >
                  {check.status === "pass" ? "Passed" : check.status === "warning" ? "Warning" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-4 animate-fade-up">
          <p className="text-sm text-gray-500">
            Change history and audit trail for this inventory.
          </p>
          <div className="card-elevated">
            {[
              { action: "Status changed to Under Review", user: "P. Ochieng", date: "2025-09-10 14:32", type: "status" },
              { action: "QA/QC Tier 1 checks completed", user: "System", date: "2025-09-08 09:15", type: "system" },
              { action: "Waste sector data finalized", user: "M. Wanjiku", date: "2025-08-28 16:45", type: "data" },
              { action: "Agriculture emission factors updated", user: "J. Kamau", date: "2025-08-20 11:22", type: "data" },
              { action: "Energy sector calculations run", user: "System", date: "2025-07-15 08:00", type: "system" },
              { action: "Inventory created", user: "P. Ochieng", date: "2024-11-01 09:00", type: "status" },
            ].map((entry, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0"
              >
                <div
                  className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                    entry.type === "status"
                      ? "bg-blue-500"
                      : entry.type === "system"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{entry.action}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {entry.user} &middot; {entry.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
