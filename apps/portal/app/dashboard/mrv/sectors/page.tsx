"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Truck,
  Factory,
  Leaf,
  Trash2,
  Building2,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  BarChart3,
  PieChart,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronRight,
  Download,
  RefreshCw,
  Layers,
} from "lucide-react";

interface SectorSummary {
  id: string;
  code: string;
  name: string;
  fullName: string;
  icon: typeof Zap;
  color: string;
  totalEmissions: number;
  previousYearEmissions: number;
  changePercent: number;
  trend: "UP" | "DOWN" | "STABLE";
  shareOfTotal: number;
  dataCompleteness: number;
  lastUpdated: string;
  subcategories: number;
  activityTypes: number;
  dataSourcesCount: number;
  topDownEstimate: number;
  bottomUpEstimate: number;
  reconciliationStatus: "RECONCILED" | "PENDING" | "DISCREPANCY";
}

const sectorData: SectorSummary[] = [
  {
    id: "energy",
    code: "1",
    name: "Energy",
    fullName: "1. Energy",
    icon: Zap,
    color: "amber",
    totalEmissions: 15200000,
    previousYearEmissions: 15800000,
    changePercent: -3.8,
    trend: "DOWN",
    shareOfTotal: 34.5,
    dataCompleteness: 92,
    lastUpdated: "2024-01-20",
    subcategories: 4,
    activityTypes: 18,
    dataSourcesCount: 12,
    topDownEstimate: 15500000,
    bottomUpEstimate: 15200000,
    reconciliationStatus: "RECONCILED",
  },
  {
    id: "transport",
    code: "1A3",
    name: "Transport",
    fullName: "1A3. Transport",
    icon: Truck,
    color: "blue",
    totalEmissions: 8500000,
    previousYearEmissions: 8200000,
    changePercent: 3.7,
    trend: "UP",
    shareOfTotal: 19.3,
    dataCompleteness: 78,
    lastUpdated: "2024-01-18",
    subcategories: 5,
    activityTypes: 14,
    dataSourcesCount: 8,
    topDownEstimate: 9200000,
    bottomUpEstimate: 8500000,
    reconciliationStatus: "DISCREPANCY",
  },
  {
    id: "ippu",
    code: "2",
    name: "IPPU",
    fullName: "2. Industrial Processes & Product Use",
    icon: Factory,
    color: "slate",
    totalEmissions: 5800000,
    previousYearEmissions: 5600000,
    changePercent: 3.6,
    trend: "UP",
    shareOfTotal: 13.2,
    dataCompleteness: 65,
    lastUpdated: "2024-01-15",
    subcategories: 4,
    activityTypes: 12,
    dataSourcesCount: 6,
    topDownEstimate: 6200000,
    bottomUpEstimate: 5800000,
    reconciliationStatus: "PENDING",
  },
  {
    id: "agriculture",
    code: "3",
    name: "Agriculture",
    fullName: "3. Agriculture, Forestry & Other Land Use (AFOLU)",
    icon: Leaf,
    color: "emerald",
    totalEmissions: 12800000,
    previousYearEmissions: 13200000,
    changePercent: -3.0,
    trend: "DOWN",
    shareOfTotal: 29.1,
    dataCompleteness: 85,
    lastUpdated: "2024-01-19",
    subcategories: 6,
    activityTypes: 22,
    dataSourcesCount: 15,
    topDownEstimate: 13000000,
    bottomUpEstimate: 12800000,
    reconciliationStatus: "RECONCILED",
  },
  {
    id: "lulucf",
    code: "3B",
    name: "LULUCF",
    fullName: "3B. Land Use, Land-Use Change & Forestry",
    icon: Leaf,
    color: "green",
    totalEmissions: -2500000,
    previousYearEmissions: -2200000,
    changePercent: 13.6,
    trend: "DOWN",
    shareOfTotal: -5.7,
    dataCompleteness: 72,
    lastUpdated: "2024-01-17",
    subcategories: 5,
    activityTypes: 16,
    dataSourcesCount: 10,
    topDownEstimate: -2300000,
    bottomUpEstimate: -2500000,
    reconciliationStatus: "RECONCILED",
  },
  {
    id: "waste",
    code: "4",
    name: "Waste",
    fullName: "4. Waste",
    icon: Trash2,
    color: "violet",
    totalEmissions: 4200000,
    previousYearEmissions: 4100000,
    changePercent: 2.4,
    trend: "UP",
    shareOfTotal: 9.5,
    dataCompleteness: 68,
    lastUpdated: "2024-01-16",
    subcategories: 4,
    activityTypes: 10,
    dataSourcesCount: 7,
    topDownEstimate: 4500000,
    bottomUpEstimate: 4200000,
    reconciliationStatus: "PENDING",
  },
];

const reconciliationConfig = {
  RECONCILED: { label: "Reconciled", icon: CheckCircle, color: "emerald" },
  PENDING: { label: "Pending Review", icon: Clock, color: "amber" },
  DISCREPANCY: { label: "Discrepancy", icon: AlertTriangle, color: "red" },
};

function formatEmissions(value: number): string {
  const absValue = Math.abs(value);
  if (absValue >= 1000000) {
    return `${value < 0 ? "-" : ""}${(absValue / 1000000).toFixed(1)}M`;
  }
  if (absValue >= 1000) {
    return `${value < 0 ? "-" : ""}${(absValue / 1000).toFixed(0)}K`;
  }
  return value.toLocaleString();
}

export default function MRVSectorsPage() {
  const [inventoryYear, setInventoryYear] = useState(2023);

  const totalEmissions = sectorData.reduce((sum, s) => sum + s.totalEmissions, 0);
  const avgCompleteness = Math.round(
    sectorData.reduce((sum, s) => sum + s.dataCompleteness, 0) / sectorData.length
  );
  const reconciledCount = sectorData.filter((s) => s.reconciliationStatus === "RECONCILED").length;

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
            <span>Sector Dashboards</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Sector GHG Inventories
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            IPCC sector-level emissions data with top-down and bottom-up reconciliation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={inventoryYear}
            onChange={(e) => setInventoryYear(parseInt(e.target.value))}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value={2023}>2023 Inventory</option>
            <option value={2022}>2022 Inventory</option>
            <option value={2021}>2021 Inventory</option>
            <option value={2020}>2020 Inventory</option>
          </select>
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Download className="h-4 w-4" />
            Export CRF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Net Emissions</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))] mt-1">
            {formatEmissions(totalEmissions)} tCO2e
          </p>
          <p className="text-xs text-emerald-600 mt-1">-2.8% from previous year</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Data Completeness</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))] mt-1">{avgCompleteness}%</p>
          <div className="h-1.5 rounded-full bg-[hsl(var(--secondary))] mt-2">
            <div
              className="h-1.5 rounded-full bg-[hsl(var(--primary))]"
              style={{ width: `${avgCompleteness}%` }}
            />
          </div>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Sectors Reconciled</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {reconciledCount}/{sectorData.length}
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Top-down vs Bottom-up</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Data Sources</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))] mt-1">
            {sectorData.reduce((sum, s) => sum + s.dataSourcesCount, 0)}
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Active data providers</p>
        </div>
      </div>

      {/* Top-Down vs Bottom-Up Overview */}
      <div className="card bg-gradient-to-br from-blue-50 to-violet-50 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Data Approach Comparison
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Top-down (national statistics) vs Bottom-up (activity data aggregation)
            </p>
          </div>
          <Link
            href="/dashboard/mrv/reconciliation"
            className="text-sm font-medium text-[hsl(var(--primary))] hover:underline"
          >
            View Reconciliation →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-white/70">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-[hsl(var(--foreground))]">Top-Down Estimate</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {formatEmissions(sectorData.reduce((sum, s) => sum + s.topDownEstimate, 0))} tCO2e
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              Based on national energy balance, trade statistics, and macro indicators
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/70">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-violet-600" />
              <span className="font-medium text-[hsl(var(--foreground))]">Bottom-Up Estimate</span>
            </div>
            <p className="text-2xl font-bold text-violet-600">
              {formatEmissions(sectorData.reduce((sum, s) => sum + s.bottomUpEstimate, 0))} tCO2e
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              Aggregated from county-level activity data and facility reports
            </p>
          </div>
        </div>
      </div>

      {/* Sector Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {sectorData.map((sector) => {
          const Icon = sector.icon;
          const reconciliation = reconciliationConfig[sector.reconciliationStatus];
          const ReconciliationIcon = reconciliation.icon;
          const discrepancy = Math.abs(sector.topDownEstimate - sector.bottomUpEstimate);
          const discrepancyPercent = ((discrepancy / sector.topDownEstimate) * 100).toFixed(1);

          return (
            <Link
              key={sector.id}
              href={`/dashboard/mrv/sectors/${sector.id}`}
              className="card hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-${sector.color}-100`}>
                    <Icon className={`h-6 w-6 text-${sector.color}-600`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{sector.code}</span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-${reconciliation.color}-100 text-${reconciliation.color}-700`}>
                        <ReconciliationIcon className="h-3 w-3" />
                        {reconciliation.label}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[hsl(var(--foreground))] mt-0.5 group-hover:text-[hsl(var(--primary))] transition-colors">
                      {sector.name}
                    </h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{sector.fullName}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors" />
              </div>

              {/* Emissions */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Total Emissions</p>
                  <p className={`text-lg font-bold ${sector.totalEmissions < 0 ? "text-emerald-600" : "text-[hsl(var(--foreground))]"}`}>
                    {formatEmissions(sector.totalEmissions)}
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">tCO2e</p>
                </div>
                <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Share of Total</p>
                  <p className="text-lg font-bold text-[hsl(var(--foreground))]">
                    {sector.shareOfTotal.toFixed(1)}%
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">YoY Change</p>
                  <p className={`text-lg font-bold flex items-center gap-1 ${
                    sector.trend === "DOWN" ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {sector.trend === "DOWN" ? (
                      <TrendingDown className="h-4 w-4" />
                    ) : (
                      <TrendingUp className="h-4 w-4" />
                    )}
                    {Math.abs(sector.changePercent)}%
                  </p>
                </div>
              </div>

              {/* Data Quality */}
              <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[hsl(var(--muted-foreground))]">Data Completeness</span>
                  <span className={`font-medium ${
                    sector.dataCompleteness >= 80 ? "text-emerald-600" :
                    sector.dataCompleteness >= 60 ? "text-amber-600" : "text-red-600"
                  }`}>
                    {sector.dataCompleteness}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-[hsl(var(--secondary))]">
                  <div
                    className={`h-1.5 rounded-full ${
                      sector.dataCompleteness >= 80 ? "bg-emerald-500" :
                      sector.dataCompleteness >= 60 ? "bg-amber-500" : "bg-red-500"
                    }`}
                    style={{ width: `${sector.dataCompleteness}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <span>{sector.subcategories} subcategories · {sector.activityTypes} activity types</span>
                  <span>Updated: {new Date(sector.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Reconciliation Status */}
              {sector.reconciliationStatus === "DISCREPANCY" && (
                <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-xs font-medium text-red-700">
                      Discrepancy: {formatEmissions(discrepancy)} tCO2e ({discrepancyPercent}%)
                    </span>
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
