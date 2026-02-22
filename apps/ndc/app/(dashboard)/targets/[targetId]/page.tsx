"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Target,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Calendar,
  FileText,
  Link2,
  Edit3,
  Plus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BarChart3,
  Zap,
  Car,
  Trees,
  Wheat,
  Flame,
  Sun,
  Clock,
  Database,
  BookOpen,
  ExternalLink,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Types & Data
   ────────────────────────────────────────────────────────── */
type TargetStatus = "on-track" | "at-risk" | "off-track";

interface Milestone {
  year: number;
  expected: string;
  actual: string | null;
  status: TargetStatus | "pending";
}

interface LinkedPolicy {
  id: string;
  name: string;
  contribution: number;
  status: "Active" | "Planned" | "Under Review";
}

interface HistoricalRecord {
  year: number;
  value: string;
  source: string;
  verified: boolean;
}

interface TargetDetail {
  id: string;
  name: string;
  sector: string;
  sectorIcon: React.ElementType;
  type: "Absolute" | "Intensity";
  conditionality: "Unconditional" | "Conditional";
  description: string;
  baseYear: number;
  baseValue: string;
  targetYear: number;
  targetValue: string;
  currentValue: string;
  progress: number;
  gap: string;
  status: TargetStatus;
  unit: string;
  methodology: string;
  dataSources: string[];
  milestones: Milestone[];
  linkedPolicies: LinkedPolicy[];
  historicalRecords: HistoricalRecord[];
}

const targetData: Record<string, TargetDetail> = {
  "ghg-unconditional": {
    id: "ghg-unconditional",
    name: "Economy-wide GHG Reduction (Unconditional)",
    sector: "Economy-wide",
    sectorIcon: TrendingUp,
    type: "Absolute",
    conditionality: "Unconditional",
    description:
      "Reduce greenhouse gas emissions by 32% below the business-as-usual scenario by 2030. This is Kenya's unconditional contribution under the Paris Agreement, achievable through domestic resources and existing policy commitments.",
    baseYear: 2015,
    baseValue: "73 MtCO2e",
    targetYear: 2030,
    targetValue: "97.2 MtCO2e (32% below BAU of 143 MtCO2e)",
    currentValue: "118.3 MtCO2e",
    progress: 54,
    gap: "21.1 MtCO2e remaining",
    status: "on-track",
    unit: "MtCO2e",
    methodology:
      "GHG inventory using 2006 IPCC Guidelines with country-specific emission factors. BAU baseline established from 2015 national inventory with projected growth rates across all sectors.",
    dataSources: [
      "Kenya National GHG Inventory (2015-2024)",
      "Kenya Meteorological Department",
      "Energy Regulatory Commission",
      "Kenya Forest Service",
      "UNFCCC National Communication reports",
    ],
    milestones: [
      { year: 2020, expected: "125 MtCO2e", actual: "128 MtCO2e", status: "at-risk" },
      { year: 2022, expected: "122 MtCO2e", actual: "123.5 MtCO2e", status: "at-risk" },
      { year: 2024, expected: "115 MtCO2e", actual: "118.3 MtCO2e", status: "at-risk" },
      { year: 2026, expected: "110 MtCO2e", actual: null, status: "pending" },
      { year: 2028, expected: "103 MtCO2e", actual: null, status: "pending" },
      { year: 2030, expected: "97.2 MtCO2e", actual: null, status: "pending" },
    ],
    linkedPolicies: [
      { id: "p1", name: "National Climate Change Action Plan (NCCAP)", contribution: 35, status: "Active" },
      { id: "p2", name: "Kenya National Energy Policy 2018", contribution: 20, status: "Active" },
      { id: "p3", name: "Forest Conservation & Management Act", contribution: 15, status: "Active" },
      { id: "p4", name: "Feed-in Tariff Policy (Solar/Wind)", contribution: 18, status: "Active" },
      { id: "p5", name: "National Transport Policy", contribution: 12, status: "Under Review" },
    ],
    historicalRecords: [
      { year: 2015, value: "73 MtCO2e", source: "National GHG Inventory", verified: true },
      { year: 2017, value: "80 MtCO2e", source: "National GHG Inventory", verified: true },
      { year: 2019, value: "95 MtCO2e", source: "National Communication", verified: true },
      { year: 2020, value: "128 MtCO2e", source: "BUR-3", verified: true },
      { year: 2022, value: "123.5 MtCO2e", source: "National GHG Inventory", verified: true },
      { year: 2024, value: "118.3 MtCO2e", source: "BTR-1 (Draft)", verified: false },
    ],
  },
  "ghg-conditional": {
    id: "ghg-conditional",
    name: "Economy-wide GHG Reduction (Conditional)",
    sector: "Economy-wide",
    sectorIcon: TrendingUp,
    type: "Absolute",
    conditionality: "Conditional",
    description:
      "Achieve an additional 10% reduction beyond the unconditional target (total 42% below BAU) by 2030. Conditional on international support including finance, technology transfer, and capacity building.",
    baseYear: 2015,
    baseValue: "73 MtCO2e",
    targetYear: 2030,
    targetValue: "82.9 MtCO2e (42% below BAU of 143 MtCO2e)",
    currentValue: "118.3 MtCO2e",
    progress: 31,
    gap: "35.4 MtCO2e remaining",
    status: "at-risk",
    unit: "MtCO2e",
    methodology: "Same as unconditional target. Additional reductions dependent on secured international climate finance and technology transfer.",
    dataSources: [
      "Kenya National GHG Inventory (2015-2024)",
      "Green Climate Fund (GCF) Project Pipeline",
      "UNFCCC Financial Mechanism reports",
    ],
    milestones: [
      { year: 2020, expected: "120 MtCO2e", actual: "128 MtCO2e", status: "off-track" },
      { year: 2022, expected: "113 MtCO2e", actual: "123.5 MtCO2e", status: "off-track" },
      { year: 2024, expected: "105 MtCO2e", actual: "118.3 MtCO2e", status: "off-track" },
      { year: 2026, expected: "97 MtCO2e", actual: null, status: "pending" },
      { year: 2028, expected: "90 MtCO2e", actual: null, status: "pending" },
      { year: 2030, expected: "82.9 MtCO2e", actual: null, status: "pending" },
    ],
    linkedPolicies: [
      { id: "p1", name: "National Climate Change Action Plan (NCCAP)", contribution: 25, status: "Active" },
      { id: "p6", name: "GCF Readiness Program", contribution: 20, status: "Active" },
      { id: "p7", name: "Carbon Pricing Initiative", contribution: 30, status: "Planned" },
      { id: "p8", name: "Enhanced Forest Restoration Program", contribution: 25, status: "Planned" },
    ],
    historicalRecords: [
      { year: 2015, value: "73 MtCO2e", source: "National GHG Inventory", verified: true },
      { year: 2020, value: "128 MtCO2e", source: "BUR-3", verified: true },
      { year: 2022, value: "123.5 MtCO2e", source: "National GHG Inventory", verified: true },
      { year: 2024, value: "118.3 MtCO2e", source: "BTR-1 (Draft)", verified: false },
    ],
  },
  "renewable-energy": {
    id: "renewable-energy",
    name: "Renewable Energy Share",
    sector: "Energy",
    sectorIcon: Zap,
    type: "Absolute",
    conditionality: "Unconditional",
    description: "Achieve 100% renewable electricity generation by 2030, building on Kenya's strong geothermal and hydro resources.",
    baseYear: 2015,
    baseValue: "70%",
    targetYear: 2030,
    targetValue: "100%",
    currentValue: "92%",
    progress: 73,
    gap: "8 percentage points remaining",
    status: "on-track",
    unit: "% of electricity generation",
    methodology: "Annual electricity generation data from all grid-connected power plants, classified by fuel source.",
    dataSources: ["Energy Regulatory Commission Annual Reports", "Kenya Power Annual Reports", "IRENA RE Statistics"],
    milestones: [
      { year: 2020, expected: "82%", actual: "80%", status: "at-risk" },
      { year: 2022, expected: "86%", actual: "87%", status: "on-track" },
      { year: 2024, expected: "90%", actual: "92%", status: "on-track" },
      { year: 2026, expected: "94%", actual: null, status: "pending" },
      { year: 2028, expected: "97%", actual: null, status: "pending" },
      { year: 2030, expected: "100%", actual: null, status: "pending" },
    ],
    linkedPolicies: [
      { id: "p4", name: "Feed-in Tariff Policy (Solar/Wind)", contribution: 40, status: "Active" },
      { id: "p9", name: "Geothermal Development Company Programme", contribution: 35, status: "Active" },
      { id: "p10", name: "Last Mile Connectivity Project", contribution: 25, status: "Active" },
    ],
    historicalRecords: [
      { year: 2015, value: "70%", source: "ERC Annual Report", verified: true },
      { year: 2018, value: "76%", source: "ERC Annual Report", verified: true },
      { year: 2020, value: "80%", source: "ERC Annual Report", verified: true },
      { year: 2022, value: "87%", source: "Kenya Power Report", verified: true },
      { year: 2024, value: "92%", source: "ERC Annual Report", verified: true },
    ],
  },
};

/* Fallback for unknown target IDs */
function getDefaultTarget(id: string): TargetDetail {
  return {
    id,
    name: `Target: ${id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`,
    sector: "General",
    sectorIcon: Target,
    type: "Absolute",
    conditionality: "Unconditional",
    description: "Target details are being compiled. Please check back for updated information.",
    baseYear: 2015,
    baseValue: "N/A",
    targetYear: 2030,
    targetValue: "N/A",
    currentValue: "N/A",
    progress: 0,
    gap: "Assessment pending",
    status: "at-risk",
    unit: "",
    methodology: "Methodology under development.",
    dataSources: ["Data sources pending"],
    milestones: [
      { year: 2025, expected: "TBD", actual: null, status: "pending" },
      { year: 2030, expected: "TBD", actual: null, status: "pending" },
    ],
    linkedPolicies: [],
    historicalRecords: [],
  };
}

/* ──────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────── */
function statusBadge(s: TargetStatus | "pending") {
  if (s === "pending") return "badge-primary";
  if (s === "on-track") return "badge-on-track";
  if (s === "at-risk") return "badge-at-risk";
  return "badge-off-track";
}

function statusLabel(s: TargetStatus | "pending") {
  if (s === "pending") return "Pending";
  return s.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function progressBarVariant(s: TargetStatus) {
  return s === "on-track" ? "progress-bar-success" : s === "at-risk" ? "progress-bar-warning" : "progress-bar-danger";
}

function policyStatusBadge(status: string) {
  if (status === "Active") return "badge-success";
  if (status === "Planned") return "badge-info";
  return "badge-warning";
}

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
export default function TargetDetailPage() {
  const params = useParams();
  const targetId = typeof params.targetId === "string" ? params.targetId : "";

  const target = useMemo(() => {
    return targetData[targetId] ?? getDefaultTarget(targetId);
  }, [targetId]);

  const SectorIcon = target.sectorIcon;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      {/* ── Breadcrumb ── */}
      <Link
        href="/targets"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--color-primary-light))] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Targets
      </Link>

      {/* ── Target Header ── */}
      <div className="card-elevated">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20">
              <SectorIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[hsl(var(--color-text))]">{target.name}</h1>
              <p className="mt-1 text-sm text-[hsl(var(--color-text-muted))] max-w-2xl">{target.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className={statusBadge(target.status)}>{statusLabel(target.status)}</span>
                <span className="badge-info">{target.type}</span>
                <span className={target.conditionality === "Unconditional" ? "badge-primary" : "badge-warning"}>
                  {target.conditionality}
                </span>
                <span className="badge">{target.sector}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/progress/tracking" className="btn-primary">
              <TrendingUp className="h-4 w-4" />
              Update Progress
            </Link>
            <button className="btn-secondary">
              <Link2 className="h-4 w-4" />
              Link Policy
            </button>
            <Link href="/targets/configure" className="btn-secondary">
              <Edit3 className="h-4 w-4" />
              Edit Target
            </Link>
          </div>
        </div>
      </div>

      {/* ── Key Metrics ── */}
      <div className="stagger-children grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="card-elevated text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
            Base Value ({target.baseYear})
          </p>
          <p className="mt-1 text-xl font-bold text-[hsl(var(--color-text))]">{target.baseValue}</p>
        </div>
        <div className="card-elevated text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
            Current Value
          </p>
          <p className="mt-1 text-xl font-bold text-[hsl(var(--color-primary))]">{target.currentValue}</p>
        </div>
        <div className="card-elevated text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
            Target Value ({target.targetYear})
          </p>
          <p className="mt-1 text-xl font-bold text-emerald-600">{target.targetValue.split("(")[0]?.trim()}</p>
        </div>
        <div className="card-elevated text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
            Progress
          </p>
          <p className="mt-1 text-xl font-bold text-[hsl(var(--color-text))]">{target.progress}%</p>
          <div className={`progress-bar mt-2 ${progressBarVariant(target.status)}`}>
            <div className="progress-bar-fill animate-progress-fill" style={{ width: `${target.progress}%` }} />
          </div>
        </div>
        <div className="card-elevated text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">Gap</p>
          <p className="mt-1 text-xl font-bold text-amber-600">{target.gap.split(" ")[0]}</p>
          <p className="text-[10px] text-[hsl(var(--color-text-muted))]">{target.gap}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ── Left: 2 cols ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Chart Placeholder */}
          <div className="card-elevated">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Progress Trajectory</h2>
                <p className="text-xs text-[hsl(var(--color-text-muted))]">
                  Tracking {target.baseYear}-{target.targetYear}
                </p>
              </div>
              <span className="badge-primary">Time Series</span>
            </div>
            <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))]">
              <div className="text-center">
                <BarChart3 className="mx-auto h-10 w-10 text-[hsl(var(--color-text-muted))]" />
                <p className="mt-2 text-sm font-medium text-[hsl(var(--color-text-muted))]">
                  Progress trajectory chart
                </p>
                <p className="text-xs text-[hsl(var(--color-text-muted))]">
                  Actual values vs. expected milestone path to {target.targetYear}
                </p>
              </div>
            </div>
          </div>

          {/* Milestones Table */}
          <div className="card-elevated">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Milestones</h2>
              <span className="text-xs text-[hsl(var(--color-text-muted))]">
                {target.milestones.filter((m) => m.actual !== null).length} of {target.milestones.length} reached
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[hsl(var(--color-border))]">
                    <th className="px-4 py-3 text-left font-medium text-[hsl(var(--color-text-muted))]">Year</th>
                    <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">Expected</th>
                    <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">Actual</th>
                    <th className="px-4 py-3 text-center font-medium text-[hsl(var(--color-text-muted))]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {target.milestones.map((m) => (
                    <tr key={m.year} className="border-b border-[hsl(var(--color-border-light))]">
                      <td className="px-4 py-3 font-semibold text-[hsl(var(--color-text))]">{m.year}</td>
                      <td className="px-4 py-3 text-right text-[hsl(var(--color-text-secondary))]">{m.expected}</td>
                      <td className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text))]">
                        {m.actual ?? "--"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={statusBadge(m.status)}>{statusLabel(m.status)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Historical Progress Records */}
          <div className="card-elevated">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Historical Progress Records</h2>
              <button className="btn-secondary text-xs !px-3 !py-1.5">
                <Plus className="h-3 w-3" />
                Add Record
              </button>
            </div>
            <div className="space-y-3">
              {target.historicalRecords.map((r) => (
                <div
                  key={r.year}
                  className="flex items-center justify-between rounded-lg border border-[hsl(var(--color-border-light))] p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--color-primary-50))]">
                      <Calendar className="h-4 w-4 text-[hsl(var(--color-primary-light))]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[hsl(var(--color-text))]">{r.year}</p>
                      <p className="text-xs text-[hsl(var(--color-text-muted))]">{r.source}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-[hsl(var(--color-text))]">{r.value}</p>
                    {r.verified ? (
                      <span className="badge-success">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="badge-warning">
                        <Clock className="h-3 w-3" />
                        Unverified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">
          {/* Contributing Policies */}
          <div className="card-elevated">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Contributing Policies</h2>
              <button className="text-xs font-medium text-[hsl(var(--color-primary-light))] hover:underline">
                + Link Policy
              </button>
            </div>
            <div className="space-y-3">
              {target.linkedPolicies.map((p) => (
                <div
                  key={p.id}
                  className="rounded-lg border border-[hsl(var(--color-border-light))] p-3"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-semibold text-[hsl(var(--color-text))] leading-tight pr-2">
                      {p.name}
                    </p>
                    <span className={policyStatusBadge(p.status)}>{p.status}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[hsl(var(--color-text-muted))]">Contribution</span>
                    <span className="text-xs font-bold text-[hsl(var(--color-text))]">{p.contribution}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${p.contribution}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Sources & Methodology */}
          <div className="card-elevated">
            <h2 className="mb-4 text-base font-bold text-[hsl(var(--color-text))]">
              Methodology & Data Sources
            </h2>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-[hsl(var(--color-primary-light))]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
                  Methodology
                </p>
              </div>
              <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                {target.methodology}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-[hsl(var(--color-primary-light))]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
                  Data Sources
                </p>
              </div>
              <ul className="space-y-1.5">
                {target.dataSources.map((ds, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--color-text-secondary))]">
                    <ExternalLink className="mt-0.5 h-3 w-3 flex-shrink-0 text-[hsl(var(--color-text-muted))]" />
                    {ds}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="overflow-hidden rounded-xl gradient-hero p-5 text-white">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Target className="h-4 w-4 text-indigo-300" />
              Target Summary
            </h3>
            <div className="mt-3 space-y-2 text-[12px] leading-relaxed text-indigo-100/80">
              <div className="flex items-center justify-between">
                <span>Base Year</span>
                <span className="font-semibold text-white">{target.baseYear}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Target Year</span>
                <span className="font-semibold text-white">{target.targetYear}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Type</span>
                <span className="font-semibold text-white">{target.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Conditionality</span>
                <span className="font-semibold text-white">{target.conditionality}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sector</span>
                <span className="font-semibold text-white">{target.sector}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Unit</span>
                <span className="font-semibold text-white">{target.unit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
