"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Target,
  Plus,
  Filter,
  Search,
  ArrowRight,
  Zap,
  Car,
  Trees,
  Wheat,
  Flame,
  Sun,
  Truck,
  Calendar,
  TrendingUp,
  ChevronDown,
  X,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────── */
type TargetStatus = "on-track" | "at-risk" | "off-track";
type TargetType = "Absolute" | "Intensity";
type Conditionality = "Unconditional" | "Conditional";

interface NDCTarget {
  id: string;
  name: string;
  sector: string;
  sectorIcon: React.ElementType;
  type: TargetType;
  conditionality: Conditionality;
  baseYear: number;
  baseValue: string;
  targetYear: number;
  targetValue: string;
  currentValue: string;
  progress: number;
  status: TargetStatus;
  unit: string;
  lastUpdated: string;
}

/* ──────────────────────────────────────────────────────────
   Data — Kenya NDC Targets
   ────────────────────────────────────────────────────────── */
const targets: NDCTarget[] = [
  /* ── Updated NDC (2020) — Economy-wide targets ── */
  {
    id: "ghg-unconditional",
    name: "Economy-wide GHG Reduction (Unconditional)",
    sector: "Economy-wide",
    sectorIcon: TrendingUp,
    type: "Absolute",
    conditionality: "Unconditional",
    baseYear: 2015,
    baseValue: "73 MtCO2e",
    targetYear: 2030,
    targetValue: "7% below BAU (133 MtCO2e)",
    currentValue: "~4.2% below BAU",
    progress: 60,
    status: "on-track",
    unit: "% below BAU",
    lastUpdated: "2025-11-15",
  },
  {
    id: "ghg-conditional",
    name: "Economy-wide GHG Reduction (Conditional)",
    sector: "Economy-wide",
    sectorIcon: TrendingUp,
    type: "Absolute",
    conditionality: "Conditional",
    baseYear: 2015,
    baseValue: "73 MtCO2e",
    targetYear: 2030,
    targetValue: "32% below BAU (97.2 MtCO2e)",
    currentValue: "~12% below BAU",
    progress: 38,
    status: "at-risk",
    unit: "% below BAU",
    lastUpdated: "2025-11-15",
  },
  /* ── Second NDC (2025) — 2035 target ── */
  {
    id: "ghg-2035",
    name: "Second NDC GHG Reduction (2031-2035)",
    sector: "Economy-wide",
    sectorIcon: TrendingUp,
    type: "Absolute",
    conditionality: "Conditional",
    baseYear: 2020,
    baseValue: "BAU 215 MtCO2e (2035)",
    targetYear: 2035,
    targetValue: "35% below BAU (139.8 MtCO2e)",
    currentValue: "Baseline established",
    progress: 5,
    status: "on-track",
    unit: "% below BAU 2035",
    lastUpdated: "2025-04-30",
  },
  /* ── Sector: Energy (48.1 MtCO2e mitigation potential) ── */
  {
    id: "energy-mitigation",
    name: "Energy Sector Mitigation",
    sector: "Energy",
    sectorIcon: Zap,
    type: "Absolute",
    conditionality: "Conditional",
    baseYear: 2015,
    baseValue: "20.6 MtCO2e",
    targetYear: 2030,
    targetValue: "48.1 MtCO2e reduction",
    currentValue: "~18 MtCO2e reduced",
    progress: 37,
    status: "at-risk",
    unit: "MtCO2e reduction",
    lastUpdated: "2025-10-20",
  },
  /* ── Sector: LULUCF (20.8 MtCO2e mitigation potential) ── */
  {
    id: "lulucf-mitigation",
    name: "LULUCF Sector Mitigation",
    sector: "Forestry",
    sectorIcon: Trees,
    type: "Absolute",
    conditionality: "Conditional",
    baseYear: 2015,
    baseValue: "6.9% forest cover",
    targetYear: 2030,
    targetValue: "10% forest cover (20.8 MtCO2e reduction)",
    currentValue: "~8.8% forest cover",
    progress: 61,
    status: "at-risk",
    unit: "MtCO2e reduction",
    lastUpdated: "2025-09-10",
  },
  /* ── Sector: Agriculture (9.7 MtCO2e mitigation potential) ── */
  {
    id: "agriculture-mitigation",
    name: "Agriculture Sector Mitigation",
    sector: "Agriculture",
    sectorIcon: Wheat,
    type: "Intensity",
    conditionality: "Conditional",
    baseYear: 2015,
    baseValue: "32 MtCO2e",
    targetYear: 2030,
    targetValue: "9.7 MtCO2e reduction",
    currentValue: "~3.2 MtCO2e reduced",
    progress: 33,
    status: "at-risk",
    unit: "MtCO2e reduction",
    lastUpdated: "2025-07-22",
  },
  /* ── Sector: Transport (4.7 MtCO2e mitigation potential) ── */
  {
    id: "transport-mitigation",
    name: "Transport Sector Mitigation",
    sector: "Transport",
    sectorIcon: Car,
    type: "Intensity",
    conditionality: "Conditional",
    baseYear: 2015,
    baseValue: "11 MtCO2e",
    targetYear: 2030,
    targetValue: "4.7 MtCO2e reduction",
    currentValue: "~1.1 MtCO2e reduced",
    progress: 23,
    status: "off-track",
    unit: "MtCO2e reduction",
    lastUpdated: "2025-09-30",
  },
  /* ── Sector: IPPU (2.4 MtCO2e mitigation potential) ── */
  {
    id: "ippu-mitigation",
    name: "Industrial Processes & Product Use",
    sector: "Industry",
    sectorIcon: Flame,
    type: "Absolute",
    conditionality: "Conditional",
    baseYear: 2015,
    baseValue: "4.5 MtCO2e",
    targetYear: 2030,
    targetValue: "2.4 MtCO2e reduction",
    currentValue: "~0.6 MtCO2e reduced",
    progress: 25,
    status: "off-track",
    unit: "MtCO2e reduction",
    lastUpdated: "2025-08-28",
  },
  /* ── Sector: Waste (0.8 MtCO2e mitigation potential) ── */
  {
    id: "waste-mitigation",
    name: "Waste Sector Mitigation",
    sector: "Waste",
    sectorIcon: Truck,
    type: "Absolute",
    conditionality: "Conditional",
    baseYear: 2015,
    baseValue: "4.3 MtCO2e",
    targetYear: 2030,
    targetValue: "0.8 MtCO2e reduction",
    currentValue: "~0.3 MtCO2e reduced",
    progress: 38,
    status: "on-track",
    unit: "MtCO2e reduction",
    lastUpdated: "2025-10-05",
  },
  /* ── Net-Zero (LT-LEDS 2022) ── */
  {
    id: "net-zero-2050",
    name: "Net-Zero Emissions by 2050",
    sector: "Economy-wide",
    sectorIcon: Sun,
    type: "Absolute",
    conditionality: "Unconditional",
    baseYear: 2020,
    baseValue: "128 MtCO2e",
    targetYear: 2050,
    targetValue: "Net-zero (LT-LEDS 2022)",
    currentValue: "~118 MtCO2e",
    progress: 8,
    status: "on-track",
    unit: "MtCO2e",
    lastUpdated: "2025-11-15",
  },
];

const allSectors = Array.from(new Set(targets.map((t) => t.sector)));
const allTypes: TargetType[] = ["Absolute", "Intensity"];
const allConditionalities: Conditionality[] = ["Unconditional", "Conditional"];
const allStatuses: TargetStatus[] = ["on-track", "at-risk", "off-track"];

/* ──────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────── */
function statusBadgeClass(s: TargetStatus) {
  return s === "on-track"
    ? "badge-on-track"
    : s === "at-risk"
      ? "badge-at-risk"
      : "badge-off-track";
}

function progressBarVariant(s: TargetStatus) {
  return s === "on-track"
    ? "progress-bar-success"
    : s === "at-risk"
      ? "progress-bar-warning"
      : "progress-bar-danger";
}

function conditionalityBadge(c: Conditionality) {
  return c === "Unconditional" ? "badge-primary" : "badge-warning";
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
export default function TargetsListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [conditionalityFilter, setConditionalityFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return targets.filter((t) => {
      if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (sectorFilter !== "All" && t.sector !== sectorFilter) return false;
      if (typeFilter !== "All" && t.type !== typeFilter) return false;
      if (conditionalityFilter !== "All" && t.conditionality !== conditionalityFilter) return false;
      if (statusFilter !== "All" && t.status !== statusFilter) return false;
      return true;
    });
  }, [searchQuery, sectorFilter, typeFilter, conditionalityFilter, statusFilter]);

  const counts = useMemo(() => {
    const onTrack = targets.filter((t) => t.status === "on-track").length;
    const atRisk = targets.filter((t) => t.status === "at-risk").length;
    const offTrack = targets.filter((t) => t.status === "off-track").length;
    return { total: targets.length, onTrack, atRisk, offTrack };
  }, []);

  const activeFilterCount = [sectorFilter, typeFilter, conditionalityFilter, statusFilter].filter(
    (f) => f !== "All"
  ).length;

  const clearFilters = () => {
    setSectorFilter("All");
    setTypeFilter("All");
    setConditionalityFilter("All");
    setStatusFilter("All");
    setSearchQuery("");
  };

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">NDC Targets</h1>
            <p className="text-sm text-[hsl(var(--color-text-muted))]">
              Kenya&apos;s Nationally Determined Contribution targets and progress
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary relative ${showFilters ? "border-[hsl(var(--color-border-focus))]" : ""}`}
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--color-primary))] text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
          <Link href="/targets/configure" className="btn-primary">
            <Plus className="h-4 w-4" />
            Add Target
          </Link>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="stagger-children grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card-elevated">
          <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
            Total Targets
          </p>
          <p className="mt-1 text-3xl font-bold text-[hsl(var(--color-text))]">{counts.total}</p>
          <p className="mt-0.5 text-[11px] text-[hsl(var(--color-text-muted))]">Across all sectors</p>
        </div>
        <div className="card-elevated">
          <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
            On Track
          </p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">{counts.onTrack}</p>
          <div className="mt-1 h-1 w-full rounded-full bg-emerald-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${(counts.onTrack / counts.total) * 100}%` }}
            />
          </div>
        </div>
        <div className="card-elevated">
          <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
            At Risk
          </p>
          <p className="mt-1 text-3xl font-bold text-amber-600">{counts.atRisk}</p>
          <div className="mt-1 h-1 w-full rounded-full bg-amber-100">
            <div
              className="h-full rounded-full bg-amber-500"
              style={{ width: `${(counts.atRisk / counts.total) * 100}%` }}
            />
          </div>
        </div>
        <div className="card-elevated">
          <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
            Off Track
          </p>
          <p className="mt-1 text-3xl font-bold text-red-600">{counts.offTrack}</p>
          <div className="mt-1 h-1 w-full rounded-full bg-red-100">
            <div
              className="h-full rounded-full bg-red-500"
              style={{ width: `${(counts.offTrack / counts.total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Search + Filter Bar ── */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-text-muted))]" />
          <input
            type="text"
            placeholder="Search targets by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {showFilters && (
          <div className="card-elevated animate-fade-up !p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-[hsl(var(--color-text))]">Filter Targets</p>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs font-medium text-[hsl(var(--color-primary-light))] hover:underline flex items-center gap-1">
                  <X className="h-3 w-3" /> Clear all
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[hsl(var(--color-text-secondary))]">
                  Sector
                </label>
                <div className="relative">
                  <select
                    value={sectorFilter}
                    onChange={(e) => setSectorFilter(e.target.value)}
                    className="input-field appearance-none pr-8"
                  >
                    <option value="All">All Sectors</option>
                    {allSectors.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-text-muted))]" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[hsl(var(--color-text-secondary))]">
                  Type
                </label>
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="input-field appearance-none pr-8"
                  >
                    <option value="All">All Types</option>
                    {allTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-text-muted))]" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[hsl(var(--color-text-secondary))]">
                  Conditionality
                </label>
                <div className="relative">
                  <select
                    value={conditionalityFilter}
                    onChange={(e) => setConditionalityFilter(e.target.value)}
                    className="input-field appearance-none pr-8"
                  >
                    <option value="All">All</option>
                    {allConditionalities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-text-muted))]" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[hsl(var(--color-text-secondary))]">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="input-field appearance-none pr-8"
                  >
                    <option value="All">All Statuses</option>
                    {allStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-text-muted))]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Results count ── */}
      <p className="text-sm text-[hsl(var(--color-text-muted))]">
        Showing <span className="font-semibold text-[hsl(var(--color-text))]">{filtered.length}</span> of{" "}
        {targets.length} targets
      </p>

      {/* ── Target Cards ── */}
      <div className="stagger-children grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((t) => {
          const Icon = t.sectorIcon;
          return (
            <div key={t.id} className="card-interactive group">
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--color-primary-50))]">
                    <Icon className="h-5 w-5 text-[hsl(var(--color-primary-light))]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[hsl(var(--color-text))] leading-tight">
                      {t.name}
                    </h3>
                    <p className="text-xs text-[hsl(var(--color-text-muted))] mt-0.5">{t.sector}</p>
                  </div>
                </div>
                <span className={statusBadgeClass(t.status)}>
                  {t.status.replace("-", " ")}
                </span>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="badge-info">{t.type}</span>
                <span className={conditionalityBadge(t.conditionality)}>{t.conditionality}</span>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-[hsl(var(--color-text-secondary))]">
                    Progress
                  </span>
                  <span className="text-sm font-bold text-[hsl(var(--color-text))]">{t.progress}%</span>
                </div>
                <div className={`progress-bar ${progressBarVariant(t.status)}`}>
                  <div
                    className="progress-bar-fill animate-progress-fill"
                    style={{ width: `${t.progress}%` }}
                  />
                </div>
              </div>

              {/* Base → Target */}
              <div className="mb-4 flex items-center gap-2 text-xs">
                <div className="flex-1 rounded-lg bg-[hsl(var(--color-background))] p-2.5 text-center">
                  <p className="text-[10px] font-medium text-[hsl(var(--color-text-muted))] uppercase tracking-wider">
                    Base ({t.baseYear})
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-[hsl(var(--color-text))]">{t.baseValue}</p>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-[hsl(var(--color-text-muted))]" />
                <div className="flex-1 rounded-lg bg-[hsl(var(--color-primary-50))] p-2.5 text-center">
                  <p className="text-[10px] font-medium text-[hsl(var(--color-text-muted))] uppercase tracking-wider">
                    Target ({t.targetYear})
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-[hsl(var(--color-primary))]">{t.targetValue}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-[hsl(var(--color-border-light))] pt-3">
                <div className="flex items-center gap-1 text-[11px] text-[hsl(var(--color-text-muted))]">
                  <Calendar className="h-3 w-3" />
                  <span>Updated {formatDate(t.lastUpdated)}</span>
                </div>
                <Link
                  href={`/targets/${t.id}`}
                  className="text-xs font-semibold text-[hsl(var(--color-primary-light))] hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  View Details
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="card-elevated text-center py-12">
          <Target className="mx-auto h-12 w-12 text-[hsl(var(--color-text-muted))]" />
          <h3 className="mt-4 text-lg font-bold text-[hsl(var(--color-text))]">No targets found</h3>
          <p className="mt-1 text-sm text-[hsl(var(--color-text-muted))]">
            Try adjusting your filters or search query.
          </p>
          <button onClick={clearFilters} className="btn-secondary mt-4">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
