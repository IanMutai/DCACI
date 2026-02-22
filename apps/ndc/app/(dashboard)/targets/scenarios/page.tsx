"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  GitBranch,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Settings2,
  ChevronDown,
  Info,
  Zap,
  Car,
  Trees,
  Wheat,
  Trash2,
  Factory,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Types & Data
   ────────────────────────────────────────────────────────── */
interface Scenario {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  emissions2030: number;
  trajectory: { year: number; value: number }[];
  assumptions: string[];
  keyDrivers: string[];
}

const scenarios: Scenario[] = [
  {
    id: "bau",
    name: "Business as Usual",
    abbreviation: "BAU",
    description:
      "Projected emissions without any new climate policies beyond those in place before 2015. Assumes continuation of historical economic and demographic trends.",
    color: "bg-red-500",
    borderColor: "border-red-300",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    emissions2030: 143,
    trajectory: [
      { year: 2015, value: 73 },
      { year: 2018, value: 88 },
      { year: 2020, value: 98 },
      { year: 2022, value: 110 },
      { year: 2024, value: 122 },
      { year: 2026, value: 130 },
      { year: 2028, value: 137 },
      { year: 2030, value: 143 },
    ],
    assumptions: [
      "GDP growth rate of 4.5-5.5% annually",
      "No new climate policies implemented",
      "Population growth of 2.3% per year",
      "Current energy mix maintained",
      "Urbanization rate follows historical trend (4.3%)",
      "No additional international climate finance",
    ],
    keyDrivers: [
      "Rapid urbanization and population growth",
      "Increased energy demand from industrialization",
      "Growing transport sector emissions",
      "Agricultural expansion for food security",
    ],
  },
  {
    id: "wem",
    name: "With Existing Measures",
    abbreviation: "WEM",
    description:
      "Projected emissions accounting for all currently implemented and adopted climate policies, including the NCCAP II, existing renewable energy targets, and forest conservation programs.",
    color: "bg-amber-500",
    borderColor: "border-amber-300",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    emissions2030: 118,
    trajectory: [
      { year: 2015, value: 73 },
      { year: 2018, value: 85 },
      { year: 2020, value: 92 },
      { year: 2022, value: 100 },
      { year: 2024, value: 106 },
      { year: 2026, value: 111 },
      { year: 2028, value: 115 },
      { year: 2030, value: 118 },
    ],
    assumptions: [
      "Current policies fully implemented on schedule",
      "Renewable energy targets under NCCAP met",
      "Existing efficiency standards enforced",
      "Forest conservation measures maintained",
      "Current feed-in tariff policies continue",
      "Public transport modernization proceeds as planned",
    ],
    keyDrivers: [
      "Geothermal and wind energy expansion",
      "Feed-in tariff driving solar adoption",
      "Nairobi bus rapid transit system",
      "Forest Conservation Act enforcement",
    ],
  },
  {
    id: "wam",
    name: "With Additional Measures",
    abbreviation: "WAM",
    description:
      "Projected emissions including all planned additional mitigation measures beyond current policies, such as carbon pricing, enhanced LULUCF measures, and scaled-up international support.",
    color: "bg-emerald-500",
    borderColor: "border-emerald-300",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    emissions2030: 97,
    trajectory: [
      { year: 2015, value: 73 },
      { year: 2018, value: 82 },
      { year: 2020, value: 87 },
      { year: 2022, value: 92 },
      { year: 2024, value: 95 },
      { year: 2026, value: 96 },
      { year: 2028, value: 97 },
      { year: 2030, value: 97 },
    ],
    assumptions: [
      "All planned policies fully implemented",
      "Enhanced renewable energy targets achieved",
      "Carbon pricing mechanism implemented by 2027",
      "Enhanced LULUCF measures operational",
      "International climate finance fully secured",
      "Technology transfer agreements in place",
      "100% clean cooking access by 2028",
    ],
    keyDrivers: [
      "Carbon pricing at $15-25/tCO2e",
      "5 GW geothermal capacity achieved",
      "Forest cover restored to 10% of land area",
      "50% climate-smart agriculture adoption",
      "Electric vehicle penetration to 5%",
    ],
  },
];

const comparisonYears = [2015, 2020, 2022, 2024, 2026, 2028, 2030];

const sectorBreakdown = [
  { sector: "Energy", icon: Zap, bau: 52, wem: 38, wam: 28 },
  { sector: "Transport", icon: Car, bau: 28, wem: 22, wam: 16 },
  { sector: "Industry", icon: Factory, bau: 22, wem: 18, wam: 14 },
  { sector: "Agriculture", icon: Wheat, bau: 25, wem: 20, wam: 16 },
  { sector: "Forestry/LULUCF", icon: Trees, bau: -4, wem: -8, wam: -14 },
  { sector: "Waste", icon: Trash2, bau: 20, wem: 16, wam: 11 },
];

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
export default function ScenarioComparisonPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "comparison" | "sectors">("overview");

  const ndcTarget = 97.2; // Unconditional: 32% below 143 BAU
  const ndcConditionalTarget = 82.9; // Conditional: 42% below 143 BAU
  const ambitionGap = scenarios[2]!.emissions2030 - ndcConditionalTarget;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      {/* Breadcrumb */}
      <Link
        href="/targets"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--color-primary-light))] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Targets
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20">
            <GitBranch className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Scenario Comparison</h1>
            <p className="text-sm text-[hsl(var(--color-text-muted))]">
              BAU vs WEM vs WAM emission projections for Kenya&apos;s NDC
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/baselines/scenarios" className="btn-secondary">
            <Settings2 className="h-4 w-4" />
            Manage Baselines
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-[hsl(var(--color-background))] p-1">
        {(["overview", "comparison", "sectors"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-[hsl(var(--color-surface))] text-[hsl(var(--color-text))] shadow-sm"
                : "text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))]"
            }`}
          >
            {tab === "overview" ? "Scenario Overview" : tab === "comparison" ? "Year-by-Year" : "Sector Breakdown"}
          </button>
        ))}
      </div>

      {/* ── Overview Tab ── */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-fade-up">
          {/* Three Scenario Cards */}
          <div className="stagger-children grid grid-cols-1 gap-4 md:grid-cols-3">
            {scenarios.map((s) => (
              <div key={s.id} className={`card-elevated border-t-4 ${s.borderColor}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${s.color}`} />
                    <span className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
                      {s.abbreviation}
                    </span>
                  </div>
                  <span className={`badge ${s.bgColor} ${s.textColor} border ${s.borderColor}`}>
                    {s.emissions2030} MtCO2e
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[hsl(var(--color-text))]">{s.name}</h3>
                <p className="mt-1.5 text-xs text-[hsl(var(--color-text-muted))] leading-relaxed">
                  {s.description}
                </p>

                {/* Emissions Trajectory */}
                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-2">
                    Emissions Trajectory (MtCO2e)
                  </p>
                  <div className="flex items-end gap-1 h-20">
                    {s.trajectory.map((point) => {
                      const maxVal = Math.max(...s.trajectory.map((p) => p.value));
                      const height = (point.value / maxVal) * 100;
                      return (
                        <div key={point.year} className="flex-1 flex flex-col items-center gap-0.5">
                          <div
                            className={`w-full rounded-t ${s.color} opacity-70`}
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-[8px] text-[hsl(var(--color-text-muted))]">
                            {point.year.toString().slice(-2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Assumptions */}
                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-1.5">
                    Key Assumptions
                  </p>
                  <ul className="space-y-1">
                    {s.assumptions.slice(0, 4).map((a, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-[hsl(var(--color-text-secondary))]">
                        <span className={`mt-1 h-1 w-1 flex-shrink-0 rounded-full ${s.color}`} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Drivers */}
                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-1.5">
                    Key Drivers
                  </p>
                  <ul className="space-y-1">
                    {s.keyDrivers.slice(0, 3).map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-[hsl(var(--color-text-secondary))]">
                        <span className={`mt-1 h-1 w-1 flex-shrink-0 rounded-full ${s.color}`} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Ambition Gap */}
          <div className="card-elevated">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Ambition Gap Analysis</h2>
                <p className="text-xs text-[hsl(var(--color-text-muted))]">
                  Gap between projected outcomes and NDC targets
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
              <div className="rounded-lg bg-[hsl(var(--color-background))] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
                  WAM Projected (2030)
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">{scenarios[2]!.emissions2030} MtCO2e</p>
              </div>
              <div className="rounded-lg bg-[hsl(var(--color-background))] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
                  NDC Unconditional Target
                </p>
                <p className="mt-1 text-2xl font-bold text-[hsl(var(--color-primary))]">{ndcTarget} MtCO2e</p>
              </div>
              <div className="rounded-lg bg-[hsl(var(--color-background))] p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
                  NDC Conditional Target
                </p>
                <p className="mt-1 text-2xl font-bold text-amber-600">{ndcConditionalTarget} MtCO2e</p>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <p className="text-sm font-bold text-amber-800">
                  Conditional Target Gap: {ambitionGap.toFixed(1)} MtCO2e
                </p>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                Even under the most ambitious scenario (WAM), there remains a {ambitionGap.toFixed(1)} MtCO2e gap
                to reach the conditional NDC target of {ndcConditionalTarget} MtCO2e by 2030. This gap requires
                additional measures or accelerated implementation of planned interventions with full international support.
              </p>
              {/* Visual gap bar */}
              <div className="mt-3 relative">
                <div className="flex items-center justify-between text-[10px] text-amber-700 mb-1">
                  <span>WAM: {scenarios[2]!.emissions2030}</span>
                  <span>Conditional: {ndcConditionalTarget}</span>
                </div>
                <div className="h-3 rounded-full bg-emerald-200 relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-emerald-500"
                    style={{ width: `${(ndcConditionalTarget / scenarios[2]!.emissions2030) * 100}%` }}
                  />
                  <div
                    className="absolute inset-y-0 right-0 rounded-r-full bg-amber-400 animate-pulse"
                    style={{ width: `${((scenarios[2]!.emissions2030 - ndcConditionalTarget) / scenarios[2]!.emissions2030) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Parameters */}
          <div className="card-elevated">
            <div className="mb-4">
              <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Scenario Parameters</h2>
              <p className="text-xs text-[hsl(var(--color-text-muted))]">Adjustable assumptions for scenario modeling</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "GDP Growth Rate", value: "5.2%", range: "3.0-7.0%" },
                { label: "Population Growth", value: "2.3%", range: "1.5-3.0%" },
                { label: "Urbanization Rate", value: "4.3%", range: "3.0-5.5%" },
                { label: "Carbon Price (WAM)", value: "$20/tCO2e", range: "$10-$50" },
                { label: "Renewable Share Target", value: "100%", range: "80-100%" },
                { label: "Forest Cover Target", value: "10%", range: "8-15%" },
              ].map((param) => (
                <div key={param.label} className="rounded-lg border border-[hsl(var(--color-border))] p-3">
                  <p className="text-xs font-medium text-[hsl(var(--color-text-muted))]">{param.label}</p>
                  <p className="mt-0.5 text-lg font-bold text-[hsl(var(--color-text))]">{param.value}</p>
                  <p className="text-[10px] text-[hsl(var(--color-text-muted))]">Range: {param.range}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Comparison Tab ── */}
      {activeTab === "comparison" && (
        <div className="space-y-6 animate-fade-up">
          <div className="card-elevated">
            <div className="mb-4">
              <h2 className="text-base font-bold text-[hsl(var(--color-text))]">
                Year-by-Year Scenario Comparison (MtCO2e)
              </h2>
              <p className="text-xs text-[hsl(var(--color-text-muted))]">
                Total GHG emissions under each scenario
              </p>
            </div>

            {/* Chart placeholder */}
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] mb-6">
              <div className="text-center">
                <BarChart3 className="mx-auto h-10 w-10 text-[hsl(var(--color-text-muted))]" />
                <p className="mt-2 text-sm font-medium text-[hsl(var(--color-text-muted))]">
                  Scenario trajectory chart
                </p>
                <p className="text-xs text-[hsl(var(--color-text-muted))]">
                  Three overlaid lines: BAU (red), WEM (amber), WAM (green)
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[hsl(var(--color-border))]">
                    <th className="px-4 py-3 text-left font-medium text-[hsl(var(--color-text-muted))]">Year</th>
                    <th className="px-4 py-3 text-right font-medium text-red-600">BAU</th>
                    <th className="px-4 py-3 text-right font-medium text-amber-600">WEM</th>
                    <th className="px-4 py-3 text-right font-medium text-emerald-600">WAM</th>
                    <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">
                      WEM Reduction
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">
                      WAM Reduction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonYears.map((year) => {
                    const bau = scenarios[0]!.trajectory.find((t) => t.year === year)?.value ?? 0;
                    const wem = scenarios[1]!.trajectory.find((t) => t.year === year)?.value ?? 0;
                    const wam = scenarios[2]!.trajectory.find((t) => t.year === year)?.value ?? 0;
                    const wemReduction = bau > 0 ? (((bau - wem) / bau) * 100).toFixed(1) : "0";
                    const wamReduction = bau > 0 ? (((bau - wam) / bau) * 100).toFixed(1) : "0";
                    return (
                      <tr key={year} className="border-b border-[hsl(var(--color-border-light))]">
                        <td className="px-4 py-3 font-semibold text-[hsl(var(--color-text))]">{year}</td>
                        <td className="px-4 py-3 text-right text-red-600 font-medium">{bau}</td>
                        <td className="px-4 py-3 text-right text-amber-600 font-medium">{wem}</td>
                        <td className="px-4 py-3 text-right text-emerald-600 font-medium">{wam}</td>
                        <td className="px-4 py-3 text-right">
                          {year === 2015 ? (
                            <span className="text-[hsl(var(--color-text-muted))]">--</span>
                          ) : (
                            <span className="text-amber-600">-{wemReduction}%</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {year === 2015 ? (
                            <span className="text-[hsl(var(--color-text-muted))]">--</span>
                          ) : (
                            <span className="text-emerald-600">-{wamReduction}%</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Sectors Tab ── */}
      {activeTab === "sectors" && (
        <div className="space-y-6 animate-fade-up">
          <div className="card-elevated">
            <div className="mb-4">
              <h2 className="text-base font-bold text-[hsl(var(--color-text))]">
                Sectoral Emissions by Scenario (2030, MtCO2e)
              </h2>
              <p className="text-xs text-[hsl(var(--color-text-muted))]">
                Breakdown of projected 2030 emissions by sector under each scenario
              </p>
            </div>

            <div className="space-y-4">
              {sectorBreakdown.map((s) => {
                const Icon = s.icon;
                const maxVal = Math.max(s.bau, s.wem, s.wam, 1);
                return (
                  <div key={s.sector} className="rounded-lg border border-[hsl(var(--color-border-light))] p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--color-primary-50))]">
                        <Icon className="h-4 w-4 text-[hsl(var(--color-primary-light))]" />
                      </div>
                      <h3 className="text-sm font-bold text-[hsl(var(--color-text))]">{s.sector}</h3>
                    </div>

                    <div className="space-y-2">
                      {[
                        { label: "BAU", value: s.bau, color: "bg-red-500", textColor: "text-red-600" },
                        { label: "WEM", value: s.wem, color: "bg-amber-500", textColor: "text-amber-600" },
                        { label: "WAM", value: s.wam, color: "bg-emerald-500", textColor: "text-emerald-600" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3">
                          <span className="w-10 text-xs font-semibold text-[hsl(var(--color-text-muted))]">
                            {item.label}
                          </span>
                          <div className="flex-1 h-2.5 rounded-full bg-[hsl(var(--color-border-light))] overflow-hidden">
                            <div
                              className={`h-full rounded-full ${item.color}`}
                              style={{
                                width: `${item.value > 0 ? (item.value / maxVal) * 100 : 0}%`,
                              }}
                            />
                          </div>
                          <span className={`w-16 text-right text-xs font-bold ${item.textColor}`}>
                            {item.value} Mt
                          </span>
                        </div>
                      ))}
                    </div>

                    {s.bau > 0 && (
                      <div className="mt-2 flex items-center gap-2 text-[10px] text-[hsl(var(--color-text-muted))]">
                        <TrendingDown className="h-3 w-3 text-emerald-500" />
                        WAM reduces {s.sector} emissions by{" "}
                        {(((s.bau - s.wam) / s.bau) * 100).toFixed(0)}% vs BAU
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
