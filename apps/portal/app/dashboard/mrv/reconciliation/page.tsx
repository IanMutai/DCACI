"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Database,
  Layers,
  RefreshCw,
  Download,
  Filter,
  Info,
  Target,
  Building2,
  MapPin,
} from "lucide-react";

interface ReconciliationItem {
  id: string;
  sector: string;
  sectorCode: string;
  topDownValue: number;
  topDownSource: string;
  bottomUpValue: number;
  bottomUpSource: string;
  difference: number;
  differencePercent: number;
  status: "RECONCILED" | "MINOR_DISCREPANCY" | "MAJOR_DISCREPANCY" | "PENDING";
  explanation?: string;
  adjustmentApplied?: number;
  reconciliationMethod?: string;
}

interface DataSourceComparison {
  sourceType: "TOP_DOWN" | "BOTTOM_UP";
  name: string;
  description: string;
  coverage: number;
  uncertainty: number;
  lastUpdated: string;
  dataPoints: number;
}

const reconciliationData: ReconciliationItem[] = [
  {
    id: "REC-001",
    sector: "Energy",
    sectorCode: "1",
    topDownValue: 15500000,
    topDownSource: "National Energy Balance 2023",
    bottomUpValue: 15200000,
    bottomUpSource: "County facility aggregation",
    difference: -300000,
    differencePercent: -1.9,
    status: "RECONCILED",
    explanation: "Difference within acceptable uncertainty range. Minor variations due to timing of facility reports.",
    reconciliationMethod: "Average of both estimates",
  },
  {
    id: "REC-002",
    sector: "Transport",
    sectorCode: "1A3",
    topDownValue: 9200000,
    topDownSource: "Fuel sales statistics (KRA)",
    bottomUpValue: 8500000,
    bottomUpSource: "Vehicle registration + fleet surveys",
    difference: -700000,
    differencePercent: -7.6,
    status: "MAJOR_DISCREPANCY",
    explanation: "Significant gap likely due to incomplete coverage of informal transport sector in bottom-up approach.",
  },
  {
    id: "REC-003",
    sector: "Agriculture",
    sectorCode: "3A",
    topDownValue: 13000000,
    topDownSource: "National livestock census + FAO estimates",
    bottomUpValue: 12800000,
    bottomUpSource: "County extension officer reports",
    difference: -200000,
    differencePercent: -1.5,
    status: "RECONCILED",
    explanation: "Good agreement between approaches. Bottom-up validated against census data.",
    adjustmentApplied: 100000,
    reconciliationMethod: "Weighted average based on data quality",
  },
  {
    id: "REC-004",
    sector: "LULUCF",
    sectorCode: "3B",
    topDownValue: -2300000,
    topDownSource: "Remote sensing (Kenya Forest Service)",
    bottomUpValue: -2500000,
    bottomUpSource: "Forest plot measurements + county reports",
    difference: -200000,
    differencePercent: 8.7,
    status: "MINOR_DISCREPANCY",
    explanation: "Difference due to different measurement methodologies. Remote sensing may underestimate regeneration areas.",
  },
  {
    id: "REC-005",
    sector: "Waste",
    sectorCode: "4",
    topDownValue: 4500000,
    topDownSource: "Waste generation estimates (NEMA)",
    bottomUpValue: 4200000,
    bottomUpSource: "Landfill measurements + county reports",
    difference: -300000,
    differencePercent: -6.7,
    status: "MINOR_DISCREPANCY",
    explanation: "Open dumping and informal waste handling not fully captured in bottom-up data.",
  },
  {
    id: "REC-006",
    sector: "IPPU",
    sectorCode: "2",
    topDownValue: 6200000,
    topDownSource: "Industrial production statistics",
    bottomUpValue: 5800000,
    bottomUpSource: "Facility emissions reporting",
    difference: -400000,
    differencePercent: -6.5,
    status: "PENDING",
    explanation: "Pending review of cement sector data. Some facilities have not submitted 2023 data.",
  },
];

const topDownSources: DataSourceComparison[] = [
  { sourceType: "TOP_DOWN", name: "National Energy Balance", description: "Annual energy production, imports, exports, and consumption data", coverage: 98, uncertainty: 5, lastUpdated: "2024-01-15", dataPoints: 450 },
  { sourceType: "TOP_DOWN", name: "Fuel Sales Statistics", description: "Tax records from Kenya Revenue Authority", coverage: 95, uncertainty: 8, lastUpdated: "2024-01-18", dataPoints: 1200 },
  { sourceType: "TOP_DOWN", name: "National Livestock Census", description: "Periodic census with satellite-based herd monitoring", coverage: 85, uncertainty: 15, lastUpdated: "2023-12-01", dataPoints: 2500 },
  { sourceType: "TOP_DOWN", name: "Industrial Production Index", description: "Manufacturing and industrial output statistics", coverage: 75, uncertainty: 12, lastUpdated: "2024-01-10", dataPoints: 380 },
];

const bottomUpSources: DataSourceComparison[] = [
  { sourceType: "BOTTOM_UP", name: "County Facility Reports", description: "Direct emissions reporting from industrial facilities", coverage: 72, uncertainty: 10, lastUpdated: "2024-01-20", dataPoints: 8500 },
  { sourceType: "BOTTOM_UP", name: "Vehicle Registration Data", description: "County-level vehicle fleet and mileage surveys", coverage: 65, uncertainty: 18, lastUpdated: "2024-01-12", dataPoints: 3200 },
  { sourceType: "BOTTOM_UP", name: "Agricultural Extension", description: "County extension officer farm-level data collection", coverage: 58, uncertainty: 22, lastUpdated: "2024-01-08", dataPoints: 12500 },
  { sourceType: "BOTTOM_UP", name: "Landfill Measurements", description: "Direct methane measurements at major disposal sites", coverage: 45, uncertainty: 25, lastUpdated: "2024-01-05", dataPoints: 850 },
];

const statusConfig = {
  RECONCILED: { label: "Reconciled", icon: CheckCircle, color: "emerald", bg: "bg-emerald-100", text: "text-emerald-700" },
  MINOR_DISCREPANCY: { label: "Minor Discrepancy", icon: AlertTriangle, color: "amber", bg: "bg-amber-100", text: "text-amber-700" },
  MAJOR_DISCREPANCY: { label: "Major Discrepancy", icon: AlertTriangle, color: "red", bg: "bg-red-100", text: "text-red-700" },
  PENDING: { label: "Pending Review", icon: Clock, color: "slate", bg: "bg-slate-100", text: "text-slate-700" },
};

function formatEmissions(value: number): string {
  const absValue = Math.abs(value);
  if (absValue >= 1000000) {
    return `${value < 0 ? "-" : ""}${(absValue / 1000000).toFixed(2)}M`;
  }
  if (absValue >= 1000) {
    return `${value < 0 ? "-" : ""}${(absValue / 1000).toFixed(0)}K`;
  }
  return value.toLocaleString();
}

export default function ReconciliationPage() {
  const [activeTab, setActiveTab] = useState<"comparison" | "sources" | "methodology">("comparison");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredData = reconciliationData.filter((item) => {
    return statusFilter === "ALL" || item.status === statusFilter;
  });

  const totalTopDown = reconciliationData.reduce((sum, r) => sum + r.topDownValue, 0);
  const totalBottomUp = reconciliationData.reduce((sum, r) => sum + r.bottomUpValue, 0);
  const totalDifference = totalTopDown - totalBottomUp;
  const totalDifferencePercent = ((totalDifference / totalTopDown) * 100).toFixed(1);
  const reconciledCount = reconciliationData.filter((r) => r.status === "RECONCILED").length;

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/mrv" className="hover:text-[hsl(var(--primary))]">
              MRV System
            </Link>
            <span>/</span>
            <span>Reconciliation</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Top-Down vs Bottom-Up Reconciliation
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Compare and reconcile national statistics with aggregated facility-level data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <RefreshCw className="h-4 w-4" />
            Re-calculate
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500">
              <ArrowDown className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-700">Top-Down Estimate</p>
              <p className="text-xs text-blue-600">National statistics approach</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-700">{formatEmissions(totalTopDown)}</p>
          <p className="text-sm text-blue-600">tCO2e total emissions</p>
        </div>

        <div className="card bg-gradient-to-br from-violet-50 to-violet-100/50 border-violet-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500">
              <ArrowUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-violet-700">Bottom-Up Estimate</p>
              <p className="text-xs text-violet-600">Aggregated facility data</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-violet-700">{formatEmissions(totalBottomUp)}</p>
          <p className="text-sm text-violet-600">tCO2e total emissions</p>
        </div>

        <div className={`card ${
          Math.abs(parseFloat(totalDifferencePercent)) <= 5
            ? "bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200"
            : "bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200"
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              Math.abs(parseFloat(totalDifferencePercent)) <= 5 ? "bg-emerald-500" : "bg-amber-500"
            }`}>
              <ArrowLeftRight className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className={`text-sm font-medium ${
                Math.abs(parseFloat(totalDifferencePercent)) <= 5 ? "text-emerald-700" : "text-amber-700"
              }`}>Overall Difference</p>
              <p className={`text-xs ${
                Math.abs(parseFloat(totalDifferencePercent)) <= 5 ? "text-emerald-600" : "text-amber-600"
              }`}>{reconciledCount}/{reconciliationData.length} sectors reconciled</p>
            </div>
          </div>
          <p className={`text-3xl font-bold ${
            Math.abs(parseFloat(totalDifferencePercent)) <= 5 ? "text-emerald-700" : "text-amber-700"
          }`}>
            {totalDifferencePercent}%
          </p>
          <p className={`text-sm ${
            Math.abs(parseFloat(totalDifferencePercent)) <= 5 ? "text-emerald-600" : "text-amber-600"
          }`}>
            {formatEmissions(totalDifference)} tCO2e difference
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800">About Reconciliation</p>
            <p className="text-sm text-blue-700 mt-1">
              IPCC guidelines recommend comparing top-down (national statistics) with bottom-up (activity data) estimates.
              Differences within ±10% are generally acceptable given inherent uncertainties. Larger discrepancies require investigation and documentation.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-2xl bg-[hsl(var(--secondary))] p-1.5">
        {[
          { id: "comparison" as const, label: "Sector Comparison", icon: BarChart3 },
          { id: "sources" as const, label: "Data Sources", icon: Database },
          { id: "methodology" as const, label: "Methodology", icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-[hsl(var(--foreground))] shadow-sm"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-[hsl(var(--primary))]" : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Sector Comparison Tab */}
      {activeTab === "comparison" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="RECONCILED">Reconciled</option>
              <option value="MINOR_DISCREPANCY">Minor Discrepancy</option>
              <option value="MAJOR_DISCREPANCY">Major Discrepancy</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>

          {/* Comparison Cards */}
          <div className="space-y-4">
            {filteredData.map((item) => {
              const status = statusConfig[item.status];
              const StatusIcon = status.icon;

              return (
                <div key={item.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-center">
                        <span className="text-xs bg-[hsl(var(--secondary))] px-2 py-0.5 rounded font-mono">
                          {item.sectorCode}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))]">{item.sector}</h3>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${status.bg} ${status.text} mt-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${
                        Math.abs(item.differencePercent) <= 5 ? "text-emerald-600" :
                        Math.abs(item.differencePercent) <= 10 ? "text-amber-600" : "text-red-600"
                      }`}>
                        {item.differencePercent > 0 ? "+" : ""}{item.differencePercent.toFixed(1)}%
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        {formatEmissions(item.difference)} tCO2e
                      </p>
                    </div>
                  </div>

                  {/* Comparison Grid */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowDown className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-700">Top-Down</span>
                      </div>
                      <p className="text-xl font-bold text-blue-700">{formatEmissions(item.topDownValue)}</p>
                      <p className="text-xs text-blue-600 mt-1">{item.topDownSource}</p>
                    </div>

                    <div className="flex items-center justify-center">
                      <ArrowLeftRight className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
                    </div>

                    <div className="p-4 rounded-xl bg-violet-50 border border-violet-200">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowUp className="h-4 w-4 text-violet-600" />
                        <span className="text-xs font-medium text-violet-700">Bottom-Up</span>
                      </div>
                      <p className="text-xl font-bold text-violet-700">{formatEmissions(item.bottomUpValue)}</p>
                      <p className="text-xs text-violet-600 mt-1">{item.bottomUpSource}</p>
                    </div>
                  </div>

                  {/* Explanation */}
                  {item.explanation && (
                    <div className="mt-4 p-3 rounded-xl bg-[hsl(var(--secondary)/0.5)]">
                      <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">Analysis</p>
                      <p className="text-sm text-[hsl(var(--foreground))]">{item.explanation}</p>
                      {item.reconciliationMethod && (
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                          Reconciliation method: <span className="font-medium">{item.reconciliationMethod}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Actions for non-reconciled items */}
                  {item.status !== "RECONCILED" && (
                    <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] flex items-center gap-3">
                      <button className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors">
                        <CheckCircle className="h-4 w-4" />
                        Mark as Reconciled
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
                        Add Explanation
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Data Sources Tab */}
      {activeTab === "sources" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top-Down Sources */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <ArrowDown className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Top-Down Data Sources</h2>
            </div>
            <div className="space-y-3">
              {topDownSources.map((source, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-blue-200 bg-blue-50/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-[hsl(var(--foreground))]">{source.name}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{source.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    <div>
                      <p className="text-[hsl(var(--muted-foreground))]">Coverage</p>
                      <p className="font-medium text-[hsl(var(--foreground))]">{source.coverage}%</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--muted-foreground))]">Uncertainty</p>
                      <p className="font-medium text-[hsl(var(--foreground))]">±{source.uncertainty}%</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--muted-foreground))]">Data Points</p>
                      <p className="font-medium text-[hsl(var(--foreground))]">{source.dataPoints.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom-Up Sources */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <ArrowUp className="h-5 w-5 text-violet-600" />
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Bottom-Up Data Sources</h2>
            </div>
            <div className="space-y-3">
              {bottomUpSources.map((source, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-violet-200 bg-violet-50/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-[hsl(var(--foreground))]">{source.name}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{source.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    <div>
                      <p className="text-[hsl(var(--muted-foreground))]">Coverage</p>
                      <p className="font-medium text-[hsl(var(--foreground))]">{source.coverage}%</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--muted-foreground))]">Uncertainty</p>
                      <p className="font-medium text-[hsl(var(--foreground))]">±{source.uncertainty}%</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--muted-foreground))]">Data Points</p>
                      <p className="font-medium text-[hsl(var(--foreground))]">{source.dataPoints.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Methodology Tab */}
      {activeTab === "methodology" && (
        <div className="card">
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
            Reconciliation Methodology
          </h2>
          <div className="prose prose-sm max-w-none">
            <h3 className="text-base font-medium text-[hsl(var(--foreground))]">1. Data Collection</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
              Top-down data is collected from national statistical agencies, energy balances, and administrative records.
              Bottom-up data is aggregated from county-level facility reports, activity surveys, and direct measurements.
            </p>

            <h3 className="text-base font-medium text-[hsl(var(--foreground))]">2. Comparison Thresholds</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <p className="text-sm font-medium text-emerald-700">Reconciled</p>
                <p className="text-xs text-emerald-600">Difference ≤ 5%</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-sm font-medium text-amber-700">Minor Discrepancy</p>
                <p className="text-xs text-amber-600">5% &lt; Difference ≤ 10%</p>
              </div>
              <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                <p className="text-sm font-medium text-red-700">Major Discrepancy</p>
                <p className="text-xs text-red-600">Difference &gt; 10%</p>
              </div>
            </div>

            <h3 className="text-base font-medium text-[hsl(var(--foreground))]">3. Resolution Process</h3>
            <ul className="text-sm text-[hsl(var(--muted-foreground))] space-y-2 mb-4 list-disc pl-5">
              <li>Identify root causes of discrepancies (coverage gaps, methodological differences, timing issues)</li>
              <li>Document explanations for all significant differences</li>
              <li>Apply adjustments based on data quality assessment</li>
              <li>Select reconciled value using weighted average or best estimate approach</li>
              <li>Document methodology used for each sector</li>
            </ul>

            <h3 className="text-base font-medium text-[hsl(var(--foreground))]">4. IPCC Compliance</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              This reconciliation process follows IPCC 2006 Guidelines for National Greenhouse Gas Inventories,
              Volume 1, Chapter 6 (QA/QC and Verification). All reconciliation decisions are documented
              and reported in the National Inventory Report (NIR).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
