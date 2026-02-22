"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Target,
  Plus,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";

type TargetStatus = "ON_TRACK" | "AT_RISK" | "OFF_TRACK" | "ACHIEVED" | "NOT_STARTED";
type TargetType = "UNCONDITIONAL" | "CONDITIONAL";

interface NDCTarget {
  id: string;
  name: string;
  description: string;
  sector: string;
  type: TargetType;
  baselineYear: number;
  baselineEmissions: number;
  targetYear: number;
  targetReduction: number;
  targetEmissions: number;
  currentEmissions: number;
  currentProgress: number;
  linkedProjects: number;
  totalLinkedReductions: number;
  status: TargetStatus;
  lastUpdated: string;
}

const mockTargets: NDCTarget[] = [
  {
    id: "NDC-TGT-001",
    name: "Energy Sector Emissions Reduction",
    description: "Reduce GHG emissions from energy generation and consumption through renewable energy deployment and efficiency improvements",
    sector: "Energy",
    type: "UNCONDITIONAL",
    baselineYear: 2015,
    baselineEmissions: 15200000,
    targetYear: 2030,
    targetReduction: 32,
    targetEmissions: 10336000,
    currentEmissions: 12500000,
    currentProgress: 55.6,
    linkedProjects: 12,
    totalLinkedReductions: 850000,
    status: "ON_TRACK",
    lastUpdated: "2024-01-15",
  },
  {
    id: "NDC-TGT-002",
    name: "Transport Sector Decarbonization",
    description: "Reduce emissions from road, rail, and aviation through electrification and fuel efficiency standards",
    sector: "Transport",
    type: "UNCONDITIONAL",
    baselineYear: 2015,
    baselineEmissions: 8500000,
    targetYear: 2030,
    targetReduction: 25,
    targetEmissions: 6375000,
    currentEmissions: 7800000,
    currentProgress: 32.9,
    linkedProjects: 5,
    totalLinkedReductions: 280000,
    status: "AT_RISK",
    lastUpdated: "2024-01-12",
  },
  {
    id: "NDC-TGT-003",
    name: "Agriculture Sector Mitigation",
    description: "Reduce emissions from livestock, crop production, and rice cultivation through climate-smart practices",
    sector: "Agriculture",
    type: "CONDITIONAL",
    baselineYear: 2015,
    baselineEmissions: 12800000,
    targetYear: 2030,
    targetReduction: 20,
    targetEmissions: 10240000,
    currentEmissions: 11500000,
    currentProgress: 50.8,
    linkedProjects: 8,
    totalLinkedReductions: 520000,
    status: "ON_TRACK",
    lastUpdated: "2024-01-14",
  },
  {
    id: "NDC-TGT-004",
    name: "Forestry & Land Use",
    description: "Increase carbon sequestration through reforestation, afforestation, and reduced deforestation",
    sector: "LULUCF",
    type: "UNCONDITIONAL",
    baselineYear: 2015,
    baselineEmissions: -2500000,
    targetYear: 2030,
    targetReduction: -40,
    targetEmissions: -3500000,
    currentEmissions: -3200000,
    currentProgress: 70.0,
    linkedProjects: 15,
    totalLinkedReductions: 680000,
    status: "ON_TRACK",
    lastUpdated: "2024-01-16",
  },
  {
    id: "NDC-TGT-005",
    name: "Waste Sector Emissions",
    description: "Reduce methane emissions from landfills and wastewater through capture and treatment technologies",
    sector: "Waste",
    type: "CONDITIONAL",
    baselineYear: 2015,
    baselineEmissions: 4200000,
    targetYear: 2030,
    targetReduction: 30,
    targetEmissions: 2940000,
    currentEmissions: 3900000,
    currentProgress: 23.8,
    linkedProjects: 3,
    totalLinkedReductions: 180000,
    status: "OFF_TRACK",
    lastUpdated: "2024-01-10",
  },
  {
    id: "NDC-TGT-006",
    name: "Industrial Process Emissions",
    description: "Reduce process emissions from cement, steel, and chemical industries through technology upgrades",
    sector: "IPPU",
    type: "CONDITIONAL",
    baselineYear: 2015,
    baselineEmissions: 5800000,
    targetYear: 2030,
    targetReduction: 15,
    targetEmissions: 4930000,
    currentEmissions: 5500000,
    currentProgress: 34.5,
    linkedProjects: 4,
    totalLinkedReductions: 220000,
    status: "AT_RISK",
    lastUpdated: "2024-01-11",
  },
];

const statusConfig: Record<TargetStatus, { icon: typeof CheckCircle; bg: string; text: string; label: string }> = {
  ON_TRACK: { icon: TrendingUp, bg: "bg-emerald-100", text: "text-emerald-700", label: "On Track" },
  AT_RISK: { icon: AlertTriangle, bg: "bg-amber-100", text: "text-amber-700", label: "At Risk" },
  OFF_TRACK: { icon: TrendingDown, bg: "bg-red-100", text: "text-red-700", label: "Off Track" },
  ACHIEVED: { icon: CheckCircle, bg: "bg-green-100", text: "text-green-700", label: "Achieved" },
  NOT_STARTED: { icon: Clock, bg: "bg-slate-100", text: "text-slate-700", label: "Not Started" },
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

export default function NDCTargetsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TargetStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<TargetType | "ALL">("ALL");

  const filteredTargets = mockTargets.filter((target) => {
    const matchesSearch =
      target.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      target.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || target.status === statusFilter;
    const matchesType = typeFilter === "ALL" || target.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    onTrack: mockTargets.filter((t) => t.status === "ON_TRACK").length,
    atRisk: mockTargets.filter((t) => t.status === "AT_RISK").length,
    offTrack: mockTargets.filter((t) => t.status === "OFF_TRACK").length,
    avgProgress: mockTargets.reduce((sum, t) => sum + t.currentProgress, 0) / mockTargets.length,
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/ndc" className="hover:text-[hsl(var(--primary))]">
              NDC Tracker
            </Link>
            <span>/</span>
            <span>Targets</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            NDC Targets
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Track progress towards Kenya&apos;s Nationally Determined Contribution targets
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors">
          <Plus className="h-4 w-4" />
          Add Target
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">On Track</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.onTrack}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">At Risk</p>
          <p className="text-2xl font-bold text-amber-600">{stats.atRisk}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Off Track</p>
          <p className="text-2xl font-bold text-red-600">{stats.offTrack}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Avg. Progress</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{stats.avgProgress.toFixed(1)}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search targets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TargetStatus | "ALL")}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            {Object.entries(statusConfig).map(([status, config]) => (
              <option key={status} value={status}>
                {config.label}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TargetType | "ALL")}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="ALL">All Types</option>
            <option value="UNCONDITIONAL">Unconditional</option>
            <option value="CONDITIONAL">Conditional</option>
          </select>
        </div>
      </div>

      {/* Targets List */}
      <div className="space-y-4">
        {filteredTargets.map((target) => {
          const statusConf = statusConfig[target.status];
          const StatusIcon = statusConf.icon;

          return (
            <div key={target.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
                      {target.id}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      target.type === "UNCONDITIONAL" ? "bg-blue-100 text-blue-700" : "bg-violet-100 text-violet-700"
                    }`}>
                      {target.type === "UNCONDITIONAL" ? "Unconditional" : "Conditional"}
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusConf.bg} ${statusConf.text}`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusConf.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mt-1">
                    {target.name}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">
                    {target.description}
                  </p>
                </div>
                <button className="rounded-lg p-2 hover:bg-[hsl(var(--secondary))] transition-colors">
                  <MoreHorizontal className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-[hsl(var(--muted-foreground))]">Progress to {target.targetYear} Target</span>
                  <span className="font-medium text-[hsl(var(--foreground))]">{target.currentProgress.toFixed(1)}%</span>
                </div>
                <div className="h-3 rounded-full bg-[hsl(var(--secondary))]">
                  <div
                    className={`h-3 rounded-full ${
                      target.status === "ON_TRACK" ? "bg-emerald-500" :
                      target.status === "AT_RISK" ? "bg-amber-500" :
                      target.status === "OFF_TRACK" ? "bg-red-500" :
                      "bg-blue-500"
                    }`}
                    style={{ width: `${Math.min(target.currentProgress, 100)}%` }}
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4 p-4 rounded-xl bg-[hsl(var(--secondary)/0.5)]">
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Baseline ({target.baselineYear})</p>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                    {formatEmissions(target.baselineEmissions)} tCO2e
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Current</p>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                    {formatEmissions(target.currentEmissions)} tCO2e
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Target ({target.targetYear})</p>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                    {formatEmissions(target.targetEmissions)} tCO2e
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Linked Projects</p>
                  <p className="text-sm font-medium text-[hsl(var(--primary))]">
                    {target.linkedProjects} projects
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Linked Reductions</p>
                  <p className="text-sm font-medium text-emerald-600">
                    {formatEmissions(target.totalLinkedReductions)} tCO2e
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                  <Calendar className="h-3 w-3" />
                  Last updated: {new Date(target.lastUpdated).toLocaleDateString("en-GB")}
                </div>
                <Link
                  href={`/dashboard/ndc/targets/${target.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--primary))] hover:underline"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
