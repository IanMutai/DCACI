"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  BarChart3,
  Settings2,
  CheckCircle2,
  Info,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Data
   ────────────────────────────────────────────────────────── */
interface BaselineScenario {
  id: string;
  name: string;
  type: "BAU" | "WEM" | "WAM";
  description: string;
  baseYear: number;
  projectionYears: number[];
  emissions: Record<number, number>;
  assumptions: string[];
  methodology: string;
  lastUpdated: string;
  confidence: "High" | "Medium" | "Low";
}

const mockScenarios: BaselineScenario[] = [
  {
    id: "1",
    name: "Business As Usual (BAU)",
    type: "BAU",
    description:
      "Projected emissions trajectory without any new climate policies beyond those already in place before the base year. Assumes continuation of historical economic and demographic trends with no additional mitigation interventions.",
    baseYear: 2015,
    projectionYears: [2020, 2025, 2030],
    emissions: { 2015: 73, 2020: 98, 2025: 120, 2030: 143 },
    assumptions: [
      "GDP growth 4.5-5.5% annually",
      "No new climate policies implemented",
      "Population growth 2.3% per year",
      "Current energy mix maintained",
      "Urbanization rate of 4.3%",
      "No international climate finance",
    ],
    methodology:
      "Bottom-up sectoral modeling using LEAP (Low Emissions Analysis Platform). Historical data from 2010-2015 used as calibration baseline. Growth projections based on Vision 2030 economic parameters.",
    lastUpdated: "2025-06-15",
    confidence: "High",
  },
  {
    id: "2",
    name: "With Existing Measures (WEM)",
    type: "WEM",
    description:
      "Projected emissions accounting for all currently implemented and adopted climate policies and measures, including NCCAP II, existing renewable energy targets, and forest conservation programs.",
    baseYear: 2015,
    projectionYears: [2020, 2025, 2030],
    emissions: { 2015: 73, 2020: 92, 2025: 105, 2030: 118 },
    assumptions: [
      "Current policies fully implemented on schedule",
      "Renewable energy targets under NCCAP met",
      "Existing efficiency standards enforced",
      "Forest conservation measures maintained",
      "Feed-in tariff continues",
      "Public transport modernization proceeds",
    ],
    methodology:
      "LEAP model with policy scenario overlays. Each existing measure modeled as abatement wedge with implementation timeline based on government action plans. Verified against latest BUR data.",
    lastUpdated: "2025-08-20",
    confidence: "Medium",
  },
  {
    id: "3",
    name: "With Additional Measures (WAM)",
    type: "WAM",
    description:
      "Projected emissions including all planned additional mitigation and adaptation measures beyond current policies, requiring international support including finance, technology transfer, and capacity building.",
    baseYear: 2015,
    projectionYears: [2020, 2025, 2030],
    emissions: { 2015: 73, 2020: 87, 2025: 92, 2030: 97 },
    assumptions: [
      "All planned policies fully implemented",
      "Enhanced renewable energy targets achieved",
      "Carbon pricing implemented by 2027",
      "Enhanced LULUCF measures operational",
      "International climate finance fully secured",
      "Technology transfer agreements in place",
    ],
    methodology:
      "Extended LEAP model with additional abatement wedges for planned measures. Conditional measures modeled with probability-weighted outcomes based on support mobilization scenarios.",
    lastUpdated: "2025-10-01",
    confidence: "Low",
  },
];

const typeConfig: Record<string, { bgColor: string; borderColor: string; textColor: string; badgeClass: string; dotColor: string }> = {
  BAU: { bgColor: "bg-red-50", borderColor: "border-red-200", textColor: "text-red-700", badgeClass: "badge-danger", dotColor: "bg-red-500" },
  WEM: { bgColor: "bg-amber-50", borderColor: "border-amber-200", textColor: "text-amber-700", badgeClass: "badge-warning", dotColor: "bg-amber-500" },
  WAM: { bgColor: "bg-emerald-50", borderColor: "border-emerald-200", textColor: "text-emerald-700", badgeClass: "badge-success", dotColor: "bg-emerald-500" },
};

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
export default function BaselineScenariosPage() {
  const [activeScenario, setActiveScenario] = useState<string>("1");

  const selected = mockScenarios.find((s) => s.id === activeScenario) ?? mockScenarios[0]!;
  const config = typeConfig[selected.type] ?? typeConfig["BAU"]!;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Baseline Scenarios</h1>
            <p className="text-sm text-[hsl(var(--color-text-muted))]">
              Define and compare BAU, WEM, and WAM emission scenarios for NDC planning
            </p>
          </div>
        </div>
        <Link href="/baselines/projections" className="btn-primary">
          <BarChart3 className="h-4 w-4" />
          View Projections
        </Link>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex gap-2">
        {mockScenarios.map((s) => {
          const c = typeConfig[s.type]!;
          const isActive = activeScenario === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveScenario(s.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                isActive
                  ? `${c.bgColor} ${c.textColor} border ${c.borderColor}`
                  : "border border-[hsl(var(--color-border))] text-[hsl(var(--color-text-secondary))] hover:bg-[hsl(var(--color-surface-hover))]"
              }`}
            >
              <div className={`h-2.5 w-2.5 rounded-full ${c.dotColor}`} />
              {s.type}
            </button>
          );
        })}
      </div>

      {/* Selected Scenario Detail */}
      <div className={`card-elevated border-t-4 ${config.borderColor}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-[hsl(var(--color-text))]">{selected.name}</h2>
              <span className={config.badgeClass}>{selected.type}</span>
            </div>
            <p className="text-sm text-[hsl(var(--color-text-muted))] max-w-2xl leading-relaxed">
              {selected.description}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[hsl(var(--color-text-muted))]">
            <Calendar className="h-3.5 w-3.5" />
            Updated {selected.lastUpdated}
          </div>
        </div>

        {/* Emissions by Year */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
          {Object.entries(selected.emissions).map(([year, value]) => (
            <div key={year} className="rounded-lg bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border-light))] p-4 text-center">
              <p className="text-xs font-medium text-[hsl(var(--color-text-muted))]">{year}</p>
              <p className="mt-1 text-2xl font-bold text-[hsl(var(--color-text))]">{value}</p>
              <p className="text-[10px] text-[hsl(var(--color-text-muted))]">MtCO2e</p>
            </div>
          ))}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Assumptions */}
          <div>
            <h3 className="text-sm font-bold text-[hsl(var(--color-text))] mb-2 flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-[hsl(var(--color-primary-light))]" />
              Key Assumptions
            </h3>
            <ul className="space-y-1.5">
              {selected.assumptions.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--color-text-secondary))]">
                  <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${config.dotColor}`} />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Methodology & Confidence */}
          <div>
            <h3 className="text-sm font-bold text-[hsl(var(--color-text))] mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-[hsl(var(--color-primary-light))]" />
              Methodology
            </h3>
            <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed mb-3">
              {selected.methodology}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[hsl(var(--color-text-muted))]">Confidence Level:</span>
              <span
                className={
                  selected.confidence === "High"
                    ? "badge-success"
                    : selected.confidence === "Medium"
                      ? "badge-warning"
                      : "badge-danger"
                }
              >
                {selected.confidence}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card-elevated">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-[hsl(var(--color-text))]">
            Scenario Comparison (MtCO2e)
          </h2>
          <Link
            href="/targets/scenarios"
            className="text-xs font-medium text-[hsl(var(--color-primary-light))] hover:underline flex items-center gap-1"
          >
            Detailed Analysis <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--color-border))]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--color-text-muted))]">Scenario</th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">2015</th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">2020</th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">2025</th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">2030</th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">
                  Change vs BAU (2030)
                </th>
              </tr>
            </thead>
            <tbody>
              {mockScenarios.map((s) => {
                const c = typeConfig[s.type]!;
                const bauVal = mockScenarios[0]!.emissions[2030] ?? 143;
                const reduction = s.type === "BAU" ? null : (((bauVal - (s.emissions[2030] ?? 0)) / bauVal) * 100).toFixed(1);
                return (
                  <tr
                    key={s.id}
                    className={`border-b border-[hsl(var(--color-border-light))] ${
                      s.id === activeScenario ? c.bgColor : "hover:bg-[hsl(var(--color-surface-hover))]"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${c.dotColor}`} />
                        <span className="font-semibold text-[hsl(var(--color-text))]">{s.type}</span>
                        <span className="text-xs text-[hsl(var(--color-text-muted))]">- {s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-[hsl(var(--color-text-secondary))]">{s.emissions[2015] ?? "—"}</td>
                    <td className="px-4 py-3 text-right text-[hsl(var(--color-text-secondary))]">{s.emissions[2020]}</td>
                    <td className="px-4 py-3 text-right text-[hsl(var(--color-text-secondary))]">{s.emissions[2025]}</td>
                    <td className={`px-4 py-3 text-right font-bold ${c.textColor}`}>{s.emissions[2030]}</td>
                    <td className="px-4 py-3 text-right">
                      {reduction === null ? (
                        <span className="text-[hsl(var(--color-text-muted))]">--</span>
                      ) : (
                        <span className="text-emerald-600 font-medium">-{reduction}%</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* NDC Gap Info */}
      <div className="rounded-lg border border-[hsl(var(--color-primary)/0.2)] bg-[hsl(var(--color-primary-50))] p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--color-primary-light))]" />
          <div>
            <p className="text-sm font-bold text-[hsl(var(--color-primary))]">
              NDC Alignment Assessment
            </p>
            <p className="mt-0.5 text-xs text-[hsl(var(--color-primary-light))] leading-relaxed">
              The conditional NDC target is 97.2 MtCO2e (32% below BAU of 143 MtCO2e) by 2030. The unconditional target (7% below BAU) is 133 MtCO2e. Under the WEM scenario, projected
              2030 emissions of 118 MtCO2e are below the unconditional target but exceed the conditional target by 20.8 MtCO2e, indicating that additional measures and international support
              are needed to achieve the full 32% reduction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
