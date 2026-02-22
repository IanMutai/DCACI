"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Download,
  Upload,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  Building2,
  Factory,
  Zap,
  Truck,
  Leaf,
  Trash2,
  BarChart3,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";

interface CountyMRVData {
  code: string;
  name: string;
  region: string;
  totalEmissions: number;
  previousYear: number;
  change: number;
  trend: "UP" | "DOWN" | "STABLE";
  dataCompleteness: number;
  lastReported: string;
  reportingStatus: "COMPLETE" | "PARTIAL" | "OVERDUE" | "NOT_STARTED";
  facilities: number;
  dataPoints: number;
  sectorBreakdown: {
    energy: number;
    transport: number;
    agriculture: number;
    waste: number;
    ippu: number;
  };
  topContributor: string;
}

const countyData: CountyMRVData[] = [
  {
    code: "KE-030",
    name: "Nairobi",
    region: "Central",
    totalEmissions: 8500000,
    previousYear: 8800000,
    change: -3.4,
    trend: "DOWN",
    dataCompleteness: 94,
    lastReported: "2024-01-20",
    reportingStatus: "COMPLETE",
    facilities: 245,
    dataPoints: 1850,
    sectorBreakdown: { energy: 3200000, transport: 4100000, agriculture: 200000, waste: 1000000, ippu: 0 },
    topContributor: "Transport",
  },
  {
    code: "KE-001",
    name: "Mombasa",
    region: "Coast",
    totalEmissions: 4200000,
    previousYear: 4000000,
    change: 5.0,
    trend: "UP",
    dataCompleteness: 88,
    lastReported: "2024-01-18",
    reportingStatus: "COMPLETE",
    facilities: 128,
    dataPoints: 920,
    sectorBreakdown: { energy: 1800000, transport: 1500000, agriculture: 100000, waste: 600000, ippu: 200000 },
    topContributor: "Energy",
  },
  {
    code: "KE-032",
    name: "Nakuru",
    region: "Rift Valley",
    totalEmissions: 2800000,
    previousYear: 2900000,
    change: -3.4,
    trend: "DOWN",
    dataCompleteness: 82,
    lastReported: "2024-01-16",
    reportingStatus: "COMPLETE",
    facilities: 85,
    dataPoints: 680,
    sectorBreakdown: { energy: 800000, transport: 650000, agriculture: 1100000, waste: 250000, ippu: 0 },
    topContributor: "Agriculture",
  },
  {
    code: "KE-022",
    name: "Kisumu",
    region: "Nyanza",
    totalEmissions: 1950000,
    previousYear: 1850000,
    change: 5.4,
    trend: "UP",
    dataCompleteness: 78,
    lastReported: "2024-01-15",
    reportingStatus: "PARTIAL",
    facilities: 62,
    dataPoints: 480,
    sectorBreakdown: { energy: 650000, transport: 580000, agriculture: 520000, waste: 200000, ippu: 0 },
    topContributor: "Energy",
  },
  {
    code: "KE-047",
    name: "Narok",
    region: "Rift Valley",
    totalEmissions: 1650000,
    previousYear: 1700000,
    change: -2.9,
    trend: "DOWN",
    dataCompleteness: 65,
    lastReported: "2024-01-10",
    reportingStatus: "PARTIAL",
    facilities: 28,
    dataPoints: 320,
    sectorBreakdown: { energy: 180000, transport: 220000, agriculture: 1150000, waste: 100000, ippu: 0 },
    topContributor: "Agriculture",
  },
  {
    code: "KE-042",
    name: "Uasin Gishu",
    region: "Rift Valley",
    totalEmissions: 1480000,
    previousYear: 1420000,
    change: 4.2,
    trend: "UP",
    dataCompleteness: 72,
    lastReported: "2024-01-12",
    reportingStatus: "PARTIAL",
    facilities: 45,
    dataPoints: 380,
    sectorBreakdown: { energy: 420000, transport: 380000, agriculture: 580000, waste: 100000, ippu: 0 },
    topContributor: "Agriculture",
  },
  {
    code: "KE-012",
    name: "Meru",
    region: "Eastern",
    totalEmissions: 1320000,
    previousYear: 1380000,
    change: -4.3,
    trend: "DOWN",
    dataCompleteness: 68,
    lastReported: "2024-01-08",
    reportingStatus: "PARTIAL",
    facilities: 35,
    dataPoints: 290,
    sectorBreakdown: { energy: 280000, transport: 240000, agriculture: 720000, waste: 80000, ippu: 0 },
    topContributor: "Agriculture",
  },
  {
    code: "KE-010",
    name: "Marsabit",
    region: "North Eastern",
    totalEmissions: 850000,
    previousYear: 920000,
    change: -7.6,
    trend: "DOWN",
    dataCompleteness: 55,
    lastReported: "2023-12-20",
    reportingStatus: "OVERDUE",
    facilities: 12,
    dataPoints: 150,
    sectorBreakdown: { energy: 50000, transport: 150000, agriculture: 600000, waste: 50000, ippu: 0 },
    topContributor: "Agriculture",
  },
  {
    code: "KE-009",
    name: "Mandera",
    region: "North Eastern",
    totalEmissions: 680000,
    previousYear: 720000,
    change: -5.6,
    trend: "DOWN",
    dataCompleteness: 42,
    lastReported: "2023-11-15",
    reportingStatus: "OVERDUE",
    facilities: 8,
    dataPoints: 95,
    sectorBreakdown: { energy: 40000, transport: 120000, agriculture: 480000, waste: 40000, ippu: 0 },
    topContributor: "Agriculture",
  },
  {
    code: "KE-023",
    name: "Migori",
    region: "Nyanza",
    totalEmissions: 920000,
    previousYear: 880000,
    change: 4.5,
    trend: "UP",
    dataCompleteness: 0,
    lastReported: "",
    reportingStatus: "NOT_STARTED",
    facilities: 22,
    dataPoints: 0,
    sectorBreakdown: { energy: 0, transport: 0, agriculture: 0, waste: 0, ippu: 0 },
    topContributor: "N/A",
  },
];

const statusConfig = {
  COMPLETE: { label: "Complete", icon: CheckCircle, color: "emerald", bg: "bg-emerald-100", text: "text-emerald-700" },
  PARTIAL: { label: "Partial", icon: AlertTriangle, color: "amber", bg: "bg-amber-100", text: "text-amber-700" },
  OVERDUE: { label: "Overdue", icon: Clock, color: "red", bg: "bg-red-100", text: "text-red-700" },
  NOT_STARTED: { label: "Not Started", icon: Clock, color: "slate", bg: "bg-slate-100", text: "text-slate-700" },
};

function formatEmissions(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toLocaleString();
}

export default function MRVCountiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [regionFilter, setRegionFilter] = useState<string>("ALL");

  const filteredCounties = countyData.filter((county) => {
    const matchesSearch = county.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || county.reportingStatus === statusFilter;
    const matchesRegion = regionFilter === "ALL" || county.region === regionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const regions = [...new Set(countyData.map((c) => c.region))];

  const stats = {
    total: countyData.length,
    complete: countyData.filter((c) => c.reportingStatus === "COMPLETE").length,
    partial: countyData.filter((c) => c.reportingStatus === "PARTIAL").length,
    overdue: countyData.filter((c) => c.reportingStatus === "OVERDUE").length,
    notStarted: countyData.filter((c) => c.reportingStatus === "NOT_STARTED").length,
    avgCompleteness: Math.round(countyData.reduce((sum, c) => sum + c.dataCompleteness, 0) / countyData.length),
    totalEmissions: countyData.reduce((sum, c) => sum + c.totalEmissions, 0),
  };

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
            <span>County Data</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            County-Level Data Collection
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Bottom-up emissions data from Kenya&apos;s 47 counties
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Upload className="h-4 w-4" />
            Bulk Upload
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Download className="h-4 w-4" />
            Export All
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Counties</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))] mt-1">{stats.total}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">of 47</p>
        </div>
        <div className="card border-l-4 border-l-emerald-500">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Complete</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.complete}</p>
          <p className="text-xs text-emerald-600">All data submitted</p>
        </div>
        <div className="card border-l-4 border-l-amber-500">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Partial</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{stats.partial}</p>
          <p className="text-xs text-amber-600">Incomplete data</p>
        </div>
        <div className="card border-l-4 border-l-red-500">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Overdue</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.overdue}</p>
          <p className="text-xs text-red-600">Past deadline</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Avg Completeness</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))] mt-1">{stats.avgCompleteness}%</p>
          <div className="h-1.5 rounded-full bg-[hsl(var(--secondary))] mt-2">
            <div
              className="h-1.5 rounded-full bg-[hsl(var(--primary))]"
              style={{ width: `${stats.avgCompleteness}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom-Up Aggregation Overview */}
      <div className="card bg-gradient-to-br from-violet-50 to-blue-50 border-violet-200">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Bottom-Up Emissions Aggregation
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
              Aggregated from county-level facility reports and activity data
            </p>
          </div>
          <Link
            href="/dashboard/mrv/reconciliation"
            className="text-sm font-medium text-[hsl(var(--primary))] hover:underline"
          >
            Compare with Top-Down →
          </Link>
        </div>
        <div className="grid grid-cols-5 gap-4 mt-4">
          <div className="p-4 rounded-xl bg-white/70 text-center">
            <Zap className="h-6 w-6 text-amber-600 mx-auto" />
            <p className="text-lg font-bold text-[hsl(var(--foreground))] mt-2">
              {formatEmissions(countyData.reduce((sum, c) => sum + c.sectorBreakdown.energy, 0))}
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Energy</p>
          </div>
          <div className="p-4 rounded-xl bg-white/70 text-center">
            <Truck className="h-6 w-6 text-blue-600 mx-auto" />
            <p className="text-lg font-bold text-[hsl(var(--foreground))] mt-2">
              {formatEmissions(countyData.reduce((sum, c) => sum + c.sectorBreakdown.transport, 0))}
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Transport</p>
          </div>
          <div className="p-4 rounded-xl bg-white/70 text-center">
            <Leaf className="h-6 w-6 text-emerald-600 mx-auto" />
            <p className="text-lg font-bold text-[hsl(var(--foreground))] mt-2">
              {formatEmissions(countyData.reduce((sum, c) => sum + c.sectorBreakdown.agriculture, 0))}
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Agriculture</p>
          </div>
          <div className="p-4 rounded-xl bg-white/70 text-center">
            <Trash2 className="h-6 w-6 text-violet-600 mx-auto" />
            <p className="text-lg font-bold text-[hsl(var(--foreground))] mt-2">
              {formatEmissions(countyData.reduce((sum, c) => sum + c.sectorBreakdown.waste, 0))}
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Waste</p>
          </div>
          <div className="p-4 rounded-xl bg-white/70 text-center">
            <Factory className="h-6 w-6 text-slate-600 mx-auto" />
            <p className="text-lg font-bold text-[hsl(var(--foreground))] mt-2">
              {formatEmissions(countyData.reduce((sum, c) => sum + c.sectorBreakdown.ippu, 0))}
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">IPPU</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-violet-200 flex items-center justify-between">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Total Bottom-Up Estimate: <span className="font-bold text-[hsl(var(--foreground))]">{formatEmissions(stats.totalEmissions)} tCO2e</span>
          </p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Based on {countyData.reduce((sum, c) => sum + c.dataPoints, 0).toLocaleString()} data points from {countyData.reduce((sum, c) => sum + c.facilities, 0)} facilities
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search counties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-white pl-10 pr-4 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
        >
          <option value="ALL">All Statuses</option>
          <option value="COMPLETE">Complete</option>
          <option value="PARTIAL">Partial</option>
          <option value="OVERDUE">Overdue</option>
          <option value="NOT_STARTED">Not Started</option>
        </select>
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
        >
          <option value="ALL">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* County List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  County
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Emissions
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Change
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Top Sector
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Completeness
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {filteredCounties.map((county) => {
                const status = statusConfig[county.reportingStatus];
                const StatusIcon = status.icon;
                return (
                  <tr key={county.code} className="hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                    <td className="px-4 py-4">
                      <Link
                        href={`/dashboard/mrv/counties/${county.code}`}
                        className="flex items-center gap-3 hover:text-[hsl(var(--primary))]"
                      >
                        <MapPin className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                        <div>
                          <p className="font-medium text-[hsl(var(--foreground))]">{county.name}</p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">{county.region} · {county.code}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <p className="font-medium text-[hsl(var(--foreground))]">
                        {formatEmissions(county.totalEmissions)}
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">tCO2e</p>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <p className={`flex items-center justify-end gap-1 text-sm font-medium ${
                        county.trend === "DOWN" ? "text-emerald-600" : county.trend === "UP" ? "text-red-600" : "text-slate-600"
                      }`}>
                        {county.trend === "DOWN" ? (
                          <TrendingDown className="h-4 w-4" />
                        ) : county.trend === "UP" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : null}
                        {county.change !== 0 ? `${county.change > 0 ? "+" : ""}${county.change}%` : "—"}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm text-[hsl(var(--foreground))]">
                      {county.topContributor}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-[hsl(var(--secondary))]">
                          <div
                            className={`h-1.5 rounded-full ${
                              county.dataCompleteness >= 80 ? "bg-emerald-500" :
                              county.dataCompleteness >= 60 ? "bg-amber-500" :
                              county.dataCompleteness >= 1 ? "bg-red-500" : "bg-slate-300"
                            }`}
                            style={{ width: `${county.dataCompleteness}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${
                          county.dataCompleteness >= 80 ? "text-emerald-600" :
                          county.dataCompleteness >= 60 ? "text-amber-600" :
                          county.dataCompleteness >= 1 ? "text-red-600" : "text-slate-400"
                        }`}>
                          {county.dataCompleteness}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${status.bg} ${status.text}`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/dashboard/mrv/counties/${county.code}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--primary))] hover:underline"
                      >
                        View
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
