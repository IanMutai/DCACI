"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LineChart,
  ArrowLeft,
  BarChart3,
  Download,
  Settings2,
  AlertTriangle,
  ChevronDown,
  TrendingDown,
  ArrowRight,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Data
   ────────────────────────────────────────────────────────── */
interface ProjectionRow {
  year: number;
  energy: number;
  transport: number;
  agriculture: number;
  lulucf: number;
  waste: number;
  industry: number;
  total: number;
}

const bauProjections: ProjectionRow[] = [
  { year: 2020, energy: 32, transport: 15, agriculture: 18, lulucf: -5, waste: 8, industry: 12, total: 80 },
  { year: 2022, energy: 36, transport: 17, agriculture: 19, lulucf: -5, waste: 9, industry: 14, total: 90 },
  { year: 2024, energy: 40, transport: 20, agriculture: 20, lulucf: -4, waste: 10, industry: 16, total: 102 },
  { year: 2026, energy: 44, transport: 23, agriculture: 21, lulucf: -4, waste: 11, industry: 18, total: 113 },
  { year: 2028, energy: 48, transport: 26, agriculture: 22, lulucf: -4, waste: 12, industry: 20, total: 124 },
  { year: 2030, energy: 52, transport: 28, agriculture: 25, lulucf: -4, waste: 20, industry: 22, total: 143 },
];

const wemProjections: ProjectionRow[] = [
  { year: 2020, energy: 30, transport: 14, agriculture: 17, lulucf: -6, waste: 7, industry: 11, total: 73 },
  { year: 2022, energy: 32, transport: 15, agriculture: 17, lulucf: -7, waste: 8, industry: 12, total: 77 },
  { year: 2024, energy: 34, transport: 17, agriculture: 18, lulucf: -7, waste: 8, industry: 13, total: 83 },
  { year: 2026, energy: 36, transport: 19, agriculture: 18, lulucf: -8, waste: 9, industry: 14, total: 88 },
  { year: 2028, energy: 37, transport: 21, agriculture: 19, lulucf: -8, waste: 10, industry: 15, total: 94 },
  { year: 2030, energy: 38, transport: 22, agriculture: 20, lulucf: -8, waste: 16, industry: 18, total: 106 },
];

const wamProjections: ProjectionRow[] = [
  { year: 2020, energy: 28, transport: 13, agriculture: 16, lulucf: -8, waste: 6, industry: 10, total: 65 },
  { year: 2022, energy: 29, transport: 14, agriculture: 16, lulucf: -9, waste: 7, industry: 11, total: 68 },
  { year: 2024, energy: 30, transport: 14, agriculture: 16, lulucf: -10, waste: 7, industry: 11, total: 68 },
  { year: 2026, energy: 30, transport: 15, agriculture: 15, lulucf: -11, waste: 7, industry: 11, total: 67 },
  { year: 2028, energy: 29, transport: 15, agriculture: 15, lulucf: -12, waste: 8, industry: 12, total: 67 },
  { year: 2030, energy: 28, transport: 16, agriculture: 16, lulucf: -14, waste: 11, industry: 14, total: 71 },
];

const scenarioMap = {
  bau: { label: "Business as Usual (BAU)", data: bauProjections, color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-300" },
  wem: { label: "With Existing Measures (WEM)", data: wemProjections, color: "text-amber-600", bgColor: "bg-amber-50", borderColor: "border-amber-300" },
  wam: { label: "With Additional Measures (WAM)", data: wamProjections, color: "text-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-300" },
};

type ScenarioKey = keyof typeof scenarioMap;

const sensitivityParams = [
  { name: "GDP Growth Rate", baseline: "5.2%", low: "3.5%", high: "7.0%", impactLow: "-8 MtCO2e", impactHigh: "+12 MtCO2e" },
  { name: "Population Growth", baseline: "2.3%", low: "1.8%", high: "2.8%", impactLow: "-5 MtCO2e", impactHigh: "+6 MtCO2e" },
  { name: "Carbon Price", baseline: "$20/tCO2e", low: "$10/tCO2e", high: "$50/tCO2e", impactLow: "+4 MtCO2e", impactHigh: "-15 MtCO2e" },
  { name: "RE Deployment Rate", baseline: "Moderate", low: "Slow", high: "Accelerated", impactLow: "+7 MtCO2e", impactHigh: "-10 MtCO2e" },
  { name: "Deforestation Rate", baseline: "Current", low: "Halved", high: "Doubled", impactLow: "-6 MtCO2e", impactHigh: "+8 MtCO2e" },
];

const ndcUnconditionalTarget = 97.2;

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
export default function ProjectionsPage() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>("wem");
  const scenario = scenarioMap[selectedScenario];
  const projections = scenario.data;

  const target2030 = projections[projections.length - 1]!.total;
  const gap = target2030 - ndcUnconditionalTarget;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      {/* Breadcrumb */}
      <Link
        href="/progress/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--color-primary-light))] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Progress Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20">
            <LineChart className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Emission Projections</h1>
            <p className="text-sm text-[hsl(var(--color-text-muted))]">
              Sectoral emission projections under different scenarios
            </p>
          </div>
        </div>
        <button className="btn-secondary">
          <Download className="h-4 w-4" />
          Export Projections
        </button>
      </div>

      {/* Projection Parameters */}
      <div className="card-elevated !p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
              Scenario
            </label>
            <div className="relative">
              <select
                value={selectedScenario}
                onChange={(e) => setSelectedScenario(e.target.value as ScenarioKey)}
                className="input-field appearance-none pr-8 font-semibold"
              >
                {(Object.keys(scenarioMap) as ScenarioKey[]).map((key) => (
                  <option key={key} value={key}>
                    {scenarioMap[key].label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-text-muted))]" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-[hsl(var(--color-text-muted))]">Base Year</label>
              <input type="text" value="2015" readOnly className="input-field text-center" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[hsl(var(--color-text-muted))]">Target Year</label>
              <input type="text" value="2030" readOnly className="input-field text-center" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[hsl(var(--color-text-muted))]">NDC Target</label>
              <input type="text" value="97.2 MtCO2e" readOnly className="input-field text-center" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="card-elevated">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-[hsl(var(--color-text))]">
            Projected Emissions by Sector ({scenario.label})
          </h2>
          <div className="flex items-center gap-2">
            {["Energy", "Transport", "Agriculture", "LULUCF", "Waste", "Industry"].map((s) => (
              <span key={s} className="text-[9px] font-medium text-[hsl(var(--color-text-muted))] px-1.5 py-0.5 rounded bg-[hsl(var(--color-background))]">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))]">
          <div className="text-center">
            <BarChart3 className="mx-auto h-10 w-10 text-[hsl(var(--color-text-muted))]" />
            <p className="mt-2 text-sm font-medium text-[hsl(var(--color-text-muted))]">
              Stacked area chart: Emission projections by sector
            </p>
            <p className="text-xs text-[hsl(var(--color-text-muted))]">
              With NDC target line overlay at {ndcUnconditionalTarget} MtCO2e
            </p>
          </div>
        </div>
      </div>

      {/* Projection Table */}
      <div className="card-elevated">
        <div className="mb-4">
          <h2 className="text-base font-bold text-[hsl(var(--color-text))]">
            Sectoral Projections (MtCO2e) - {scenario.label}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--color-border))]">
                <th className="px-3 py-3 text-left font-medium text-[hsl(var(--color-text-muted))]">Year</th>
                <th className="px-3 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">Energy</th>
                <th className="px-3 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">Transport</th>
                <th className="px-3 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">Agriculture</th>
                <th className="px-3 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">LULUCF</th>
                <th className="px-3 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">Waste</th>
                <th className="px-3 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">Industry</th>
                <th className="px-3 py-3 text-right font-bold text-[hsl(var(--color-text))]">Total</th>
              </tr>
            </thead>
            <tbody>
              {projections.map((row) => (
                <tr key={row.year} className="border-b border-[hsl(var(--color-border-light))]">
                  <td className="px-3 py-3 font-semibold text-[hsl(var(--color-text))]">{row.year}</td>
                  <td className="px-3 py-3 text-right text-[hsl(var(--color-text-secondary))]">{row.energy}</td>
                  <td className="px-3 py-3 text-right text-[hsl(var(--color-text-secondary))]">{row.transport}</td>
                  <td className="px-3 py-3 text-right text-[hsl(var(--color-text-secondary))]">{row.agriculture}</td>
                  <td className="px-3 py-3 text-right text-emerald-600">{row.lulucf}</td>
                  <td className="px-3 py-3 text-right text-[hsl(var(--color-text-secondary))]">{row.waste}</td>
                  <td className="px-3 py-3 text-right text-[hsl(var(--color-text-secondary))]">{row.industry}</td>
                  <td className={`px-3 py-3 text-right font-bold ${scenario.color}`}>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gap Analysis */}
      <div className="card-elevated">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Gap Between Projected and Target</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
          <div className={`rounded-lg ${scenario.bgColor} border ${scenario.borderColor} p-4 text-center`}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
              Projected 2030 ({selectedScenario.toUpperCase()})
            </p>
            <p className={`mt-1 text-2xl font-bold ${scenario.color}`}>{target2030} MtCO2e</p>
          </div>
          <div className="rounded-lg bg-[hsl(var(--color-primary-50))] border border-[hsl(var(--color-primary)/0.2)] p-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
              NDC Target (Unconditional)
            </p>
            <p className="mt-1 text-2xl font-bold text-[hsl(var(--color-primary))]">{ndcUnconditionalTarget} MtCO2e</p>
          </div>
          <div className="rounded-lg bg-[hsl(var(--color-background))] border border-[hsl(var(--color-border))] p-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
              Gap
            </p>
            <p className={`mt-1 text-2xl font-bold ${gap > 0 ? "text-red-600" : "text-emerald-600"}`}>
              {gap > 0 ? "+" : ""}{gap.toFixed(1)} MtCO2e
            </p>
            <p className="text-[10px] text-[hsl(var(--color-text-muted))]">
              {gap > 0 ? "Above target - additional measures needed" : "Below target - on track"}
            </p>
          </div>
        </div>
      </div>

      {/* Sensitivity Analysis */}
      <div className="card-elevated">
        <div className="mb-4">
          <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Sensitivity Analysis</h2>
          <p className="text-xs text-[hsl(var(--color-text-muted))]">
            Impact of varying key assumptions on 2030 emissions
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--color-border))]">
                <th className="px-3 py-3 text-left font-medium text-[hsl(var(--color-text-muted))]">Parameter</th>
                <th className="px-3 py-3 text-center font-medium text-[hsl(var(--color-text-muted))]">Low</th>
                <th className="px-3 py-3 text-center font-medium text-[hsl(var(--color-text-muted))]">Baseline</th>
                <th className="px-3 py-3 text-center font-medium text-[hsl(var(--color-text-muted))]">High</th>
                <th className="px-3 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">Impact (Low)</th>
                <th className="px-3 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">Impact (High)</th>
              </tr>
            </thead>
            <tbody>
              {sensitivityParams.map((p) => (
                <tr key={p.name} className="border-b border-[hsl(var(--color-border-light))]">
                  <td className="px-3 py-3 font-semibold text-[hsl(var(--color-text))]">{p.name}</td>
                  <td className="px-3 py-3 text-center text-[hsl(var(--color-text-secondary))]">{p.low}</td>
                  <td className="px-3 py-3 text-center font-medium text-[hsl(var(--color-text))]">{p.baseline}</td>
                  <td className="px-3 py-3 text-center text-[hsl(var(--color-text-secondary))]">{p.high}</td>
                  <td className="px-3 py-3 text-right">
                    <span className={p.impactLow.startsWith("-") ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                      {p.impactLow}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className={p.impactHigh.startsWith("-") ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                      {p.impactHigh}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
