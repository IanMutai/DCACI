"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Zap,
  Car,
  Trees,
  Wheat,
  Trash2,
  Factory,
  Target,
  Lightbulb,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Types & Data
   ────────────────────────────────────────────────────────── */
type Status = "on-track" | "at-risk" | "off-track" | "not-started";

interface SectorProgress {
  sector: string;
  icon: React.ElementType;
  progress: number;
  status: Status;
  currentEmissions: string;
  targetEmissions: string;
  targets: number;
  onTrack: number;
}

interface YearProgress {
  year: number;
  totalEmissions: number;
  targetEmissions: number;
  assessment: Status;
  notes: string;
}

interface HeatmapCell {
  targetName: string;
  years: Record<number, Status | "no-data">;
}

const overallProgress = 47;

const summaryCards = [
  { label: "On Track", count: 3, icon: CheckCircle2, color: "text-emerald-600", bgColor: "bg-emerald-50", barColor: "bg-emerald-500" },
  { label: "At Risk", count: 3, icon: AlertTriangle, color: "text-amber-600", bgColor: "bg-amber-50", barColor: "bg-amber-500" },
  { label: "Off Track", count: 2, icon: XCircle, color: "text-red-600", bgColor: "bg-red-50", barColor: "bg-red-500" },
  { label: "Not Started", count: 0, icon: Clock, color: "text-gray-500", bgColor: "bg-gray-50", barColor: "bg-gray-400" },
];

const sectorData: SectorProgress[] = [
  { sector: "Energy", icon: Zap, progress: 52, status: "on-track", currentEmissions: "18.4 MtCO2e", targetEmissions: "12.8 MtCO2e", targets: 3, onTrack: 2 },
  { sector: "Transport", icon: Car, progress: 35, status: "at-risk", currentEmissions: "8.2 MtCO2e", targetEmissions: "5.7 MtCO2e", targets: 1, onTrack: 0 },
  { sector: "Forestry", icon: Trees, progress: 68, status: "on-track", currentEmissions: "-12.5 MtCO2e", targetEmissions: "-18.0 MtCO2e", targets: 1, onTrack: 1 },
  { sector: "Agriculture", icon: Wheat, progress: 28, status: "off-track", currentEmissions: "15.1 MtCO2e", targetEmissions: "10.6 MtCO2e", targets: 1, onTrack: 0 },
  { sector: "Waste", icon: Trash2, progress: 44, status: "at-risk", currentEmissions: "4.8 MtCO2e", targetEmissions: "3.4 MtCO2e", targets: 0, onTrack: 0 },
  { sector: "Industry", icon: Factory, progress: 31, status: "at-risk", currentEmissions: "12.3 MtCO2e", targetEmissions: "8.7 MtCO2e", targets: 0, onTrack: 0 },
];

const yearlyProgress: YearProgress[] = [
  { year: 2020, totalEmissions: 128, targetEmissions: 125, assessment: "at-risk", notes: "COVID-19 impacts on transport offset by energy recovery" },
  { year: 2021, totalEmissions: 130, targetEmissions: 122, assessment: "off-track", notes: "Post-COVID rebound increased industrial emissions" },
  { year: 2022, totalEmissions: 123.5, targetEmissions: 119, assessment: "at-risk", notes: "Geothermal expansion partially compensated for transport growth" },
  { year: 2023, totalEmissions: 121, targetEmissions: 116, assessment: "at-risk", notes: "Forest restoration gains; slow progress on clean cooking" },
  { year: 2024, totalEmissions: 118.3, targetEmissions: 113, assessment: "at-risk", notes: "Renewable energy gains; agriculture emissions remain high" },
  { year: 2025, totalEmissions: 116, targetEmissions: 110, assessment: "at-risk", notes: "Projected based on Q1-Q2 trends and policy pipeline" },
];

const heatmapTargets: HeatmapCell[] = [
  { targetName: "GHG Reduction (Uncond.)", years: { 2020: "at-risk", 2021: "off-track", 2022: "at-risk", 2023: "at-risk", 2024: "on-track", 2025: "on-track" } },
  { targetName: "GHG Reduction (Cond.)", years: { 2020: "off-track", 2021: "off-track", 2022: "off-track", 2023: "off-track", 2024: "at-risk", 2025: "at-risk" } },
  { targetName: "Renewable Energy", years: { 2020: "at-risk", 2021: "on-track", 2022: "on-track", 2023: "on-track", 2024: "on-track", 2025: "on-track" } },
  { targetName: "Forest Cover", years: { 2020: "on-track", 2021: "on-track", 2022: "on-track", 2023: "on-track", 2024: "on-track", 2025: "on-track" } },
  { targetName: "Geothermal Capacity", years: { 2020: "off-track", 2021: "off-track", 2022: "off-track", 2023: "off-track", 2024: "off-track", 2025: "off-track" } },
  { targetName: "Clean Cooking", years: { 2020: "off-track", 2021: "off-track", 2022: "off-track", 2023: "at-risk", 2024: "at-risk", 2025: "off-track" } },
  { targetName: "Electric Mobility", years: { 2020: "no-data", 2021: "no-data", 2022: "at-risk", 2023: "at-risk", 2024: "at-risk", 2025: "at-risk" } },
  { targetName: "Climate-Smart Agri.", years: { 2020: "off-track", 2021: "off-track", 2022: "at-risk", 2023: "at-risk", 2024: "at-risk", 2025: "at-risk" } },
];

const recommendedActions = [
  { target: "Geothermal Capacity", action: "Accelerate geothermal exploration drilling at Menengai and Suswa sites; fast-track PPA agreements for 800 MW pipeline", priority: "High", status: "off-track" as const },
  { target: "Clean Cooking", action: "Scale LPG distribution network in rural areas; increase subsidy for clean cookstoves by 30%", priority: "High", status: "off-track" as const },
  { target: "Electric Mobility", action: "Implement EV import duty exemptions; establish 50 public charging stations in Nairobi-Mombasa corridor", priority: "Medium", status: "at-risk" as const },
  { target: "Climate-Smart Agriculture", action: "Expand County Extension Worker program; link climate-smart practices to NHIF and crop insurance", priority: "Medium", status: "at-risk" as const },
];

/* ──────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────── */
function statusBadge(s: Status) {
  if (s === "on-track") return "badge-on-track";
  if (s === "at-risk") return "badge-at-risk";
  if (s === "off-track") return "badge-off-track";
  return "badge";
}

function statusLabel(s: Status) {
  return s.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function progressBarVariant(s: Status) {
  if (s === "on-track") return "progress-bar-success";
  if (s === "at-risk") return "progress-bar-warning";
  return "progress-bar-danger";
}

function heatmapColor(s: Status | "no-data") {
  if (s === "on-track") return "bg-emerald-500";
  if (s === "at-risk") return "bg-amber-400";
  if (s === "off-track") return "bg-red-500";
  return "bg-gray-200";
}

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
export default function ProgressDashboardPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Progress Dashboard</h1>
            <p className="text-sm text-[hsl(var(--color-text-muted))]">
              Comprehensive NDC implementation tracking for Kenya
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/progress/tracking" className="btn-secondary">
            <TrendingUp className="h-4 w-4" />
            Detailed Tracking
          </Link>
          <Link href="/progress/projections" className="btn-primary">
            <BarChart3 className="h-4 w-4" />
            View Projections
          </Link>
        </div>
      </div>

      {/* Overall Progress Ring + Summary Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Progress Ring */}
        <div className="card-elevated flex flex-col items-center justify-center py-8">
          <div className="relative h-32 w-32">
            {/* Background circle */}
            <svg className="h-32 w-32 -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--color-border-light))" strokeWidth="12" />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="hsl(var(--color-primary))"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallProgress / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[hsl(var(--color-text))]">{overallProgress}%</span>
              <span className="text-[10px] font-medium text-[hsl(var(--color-text-muted))]">Overall</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-[hsl(var(--color-text-muted))] text-center">
            NDC Implementation Progress
          </p>
          <span className="badge-at-risk mt-2">Needs Acceleration</span>
        </div>

        {/* Summary Cards */}
        <div className="lg:col-span-4 stagger-children grid grid-cols-2 gap-4 sm:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="card-elevated">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.bgColor}`}>
                    <Icon className={`h-4 w-4 ${card.color}`} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
                    {card.label}
                  </span>
                </div>
                <p className={`text-3xl font-bold ${card.color}`}>{card.count}</p>
                <div className="mt-2 h-1 w-full rounded-full bg-[hsl(var(--color-border-light))]">
                  <div
                    className={`h-full rounded-full ${card.barColor}`}
                    style={{ width: `${(card.count / 8) * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-[hsl(var(--color-text-muted))]">of 8 total targets</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sector Breakdown — 2 cols */}
        <div className="lg:col-span-2">
          <div className="card-elevated">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Sector Breakdown</h2>
                <p className="text-xs text-[hsl(var(--color-text-muted))]">Progress by economic sector</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[hsl(var(--color-border))]">
                    <th className="px-3 py-3 text-left font-medium text-[hsl(var(--color-text-muted))]">Sector</th>
                    <th className="px-3 py-3 text-left font-medium text-[hsl(var(--color-text-muted))]">Progress</th>
                    <th className="px-3 py-3 text-center font-medium text-[hsl(var(--color-text-muted))]">Status</th>
                    <th className="px-3 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">Current</th>
                    <th className="px-3 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">Target</th>
                    <th className="px-3 py-3 text-center font-medium text-[hsl(var(--color-text-muted))]">Targets</th>
                  </tr>
                </thead>
                <tbody>
                  {sectorData.map((s) => {
                    const Icon = s.icon;
                    return (
                      <tr key={s.sector} className="border-b border-[hsl(var(--color-border-light))]">
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[hsl(var(--color-primary-50))]">
                              <Icon className="h-3.5 w-3.5 text-[hsl(var(--color-primary-light))]" />
                            </div>
                            <span className="font-semibold text-[hsl(var(--color-text))]">{s.sector}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 min-w-[140px]">
                          <div className="flex items-center gap-2">
                            <div className={`progress-bar flex-1 ${progressBarVariant(s.status)}`}>
                              <div
                                className="progress-bar-fill animate-progress-fill"
                                style={{ width: `${s.progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-[hsl(var(--color-text))]">{s.progress}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className={statusBadge(s.status)}>{statusLabel(s.status)}</span>
                        </td>
                        <td className="px-3 py-3 text-right text-[hsl(var(--color-text-secondary))]">{s.currentEmissions}</td>
                        <td className="px-3 py-3 text-right text-[hsl(var(--color-text-secondary))]">{s.targetEmissions}</td>
                        <td className="px-3 py-3 text-center">
                          <span className="text-xs font-medium text-[hsl(var(--color-text))]">
                            {s.onTrack}/{s.targets}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="card-elevated">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Recommended Actions</h2>
          </div>
          <p className="text-xs text-[hsl(var(--color-text-muted))] mb-4">
            Priority interventions for off-track and at-risk targets
          </p>
          <div className="space-y-3">
            {recommendedActions.map((a, i) => (
              <div key={i} className="rounded-lg border border-[hsl(var(--color-border-light))] p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[hsl(var(--color-text))]">{a.target}</span>
                  <span className={statusBadge(a.status)}>{statusLabel(a.status)}</span>
                </div>
                <p className="text-[11px] text-[hsl(var(--color-text-secondary))] leading-relaxed">{a.action}</p>
                <div className="mt-1.5 flex items-center gap-1">
                  <span className={`text-[10px] font-semibold ${a.priority === "High" ? "text-red-600" : "text-amber-600"}`}>
                    {a.priority} Priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Year-by-Year Progress */}
      <div className="card-elevated">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Year-by-Year Progress</h2>
            <p className="text-xs text-[hsl(var(--color-text-muted))]">Annual emissions vs targets (2020-2025)</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--color-border))]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--color-text-muted))]">Year</th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">
                  Total Emissions (MtCO2e)
                </th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">
                  Target (MtCO2e)
                </th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">Gap</th>
                <th className="px-4 py-3 text-center font-medium text-[hsl(var(--color-text-muted))]">Assessment</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--color-text-muted))]">Notes</th>
              </tr>
            </thead>
            <tbody>
              {yearlyProgress.map((y) => {
                const gap = y.totalEmissions - y.targetEmissions;
                return (
                  <tr key={y.year} className="border-b border-[hsl(var(--color-border-light))]">
                    <td className="px-4 py-3 font-semibold text-[hsl(var(--color-text))]">{y.year}</td>
                    <td className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text))]">
                      {y.totalEmissions}
                    </td>
                    <td className="px-4 py-3 text-right text-[hsl(var(--color-text-secondary))]">
                      {y.targetEmissions}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={gap > 0 ? "text-red-600 font-medium" : "text-emerald-600 font-medium"}>
                        {gap > 0 ? "+" : ""}{gap.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={statusBadge(y.assessment)}>{statusLabel(y.assessment)}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[hsl(var(--color-text-muted))] max-w-xs">{y.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Progress Heatmap */}
      <div className="card-elevated">
        <div className="mb-5">
          <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Progress Heatmap</h2>
          <p className="text-xs text-[hsl(var(--color-text-muted))]">
            Target status across years — green (on-track), amber (at-risk), red (off-track), gray (no data)
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--color-border))]">
                <th className="px-3 py-2 text-left font-medium text-[hsl(var(--color-text-muted))]">Target</th>
                {[2020, 2021, 2022, 2023, 2024, 2025].map((y) => (
                  <th key={y} className="px-3 py-2 text-center font-medium text-[hsl(var(--color-text-muted))]">
                    {y}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapTargets.map((t) => (
                <tr key={t.targetName} className="border-b border-[hsl(var(--color-border-light))]">
                  <td className="px-3 py-2 text-xs font-semibold text-[hsl(var(--color-text))]">
                    {t.targetName}
                  </td>
                  {[2020, 2021, 2022, 2023, 2024, 2025].map((y) => {
                    const cellStatus = t.years[y] ?? "no-data";
                    return (
                      <td key={y} className="px-3 py-2 text-center">
                        <div
                          className={`mx-auto h-5 w-5 rounded ${heatmapColor(cellStatus)}`}
                          title={`${t.targetName} - ${y}: ${cellStatus}`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Legend */}
        <div className="mt-3 flex items-center gap-4 text-[10px] text-[hsl(var(--color-text-muted))]">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-emerald-500" />
            <span>On Track</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-amber-400" />
            <span>At Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-red-500" />
            <span>Off Track</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-gray-200" />
            <span>No Data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
