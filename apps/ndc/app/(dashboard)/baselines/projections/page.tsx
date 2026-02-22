"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpDown,
  ArrowLeft,
  BarChart3,
  Download,
  ChevronDown,
  Info,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Car,
  Trees,
  Wheat,
  Trash2,
  Factory,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Data
   ────────────────────────────────────────────────────────── */
interface SectorProjection {
  sector: string;
  icon: React.ElementType;
  bau2025: number;
  bau2030: number;
  wem2025: number;
  wem2030: number;
  wam2025: number;
  wam2030: number;
  shareOfTotal: number;
}

const sectorProjections: SectorProjection[] = [
  { sector: "Energy", icon: Zap, bau2025: 44, bau2030: 52, wem2025: 36, wem2030: 38, wam2025: 30, wam2030: 28, shareOfTotal: 29 },
  { sector: "Transport", icon: Car, bau2025: 23, bau2030: 28, wem2025: 19, wem2030: 22, wam2025: 15, wam2030: 16, shareOfTotal: 17 },
  { sector: "Industry", icon: Factory, bau2025: 18, bau2030: 22, wem2025: 14, wem2030: 18, wam2025: 11, wam2030: 14, shareOfTotal: 14 },
  { sector: "Agriculture", icon: Wheat, bau2025: 21, bau2030: 25, wem2025: 18, wem2030: 20, wam2025: 15, wam2030: 16, shareOfTotal: 16 },
  { sector: "LULUCF", icon: Trees, bau2025: -4, bau2030: -4, wem2025: -7, wem2030: -8, wam2025: -11, wam2030: -14, shareOfTotal: -9 },
  { sector: "Waste", icon: Trash2, bau2025: 11, bau2030: 20, wem2025: 9, wem2030: 16, wam2025: 7, wam2030: 11, shareOfTotal: 11 },
];

interface YearlyProjection {
  year: number;
  bau: number;
  wem: number;
  wam: number;
  actual: number | null;
}

const yearlyProjections: YearlyProjection[] = [
  { year: 2015, bau: 73, wem: 73, wam: 73, actual: 73 },
  { year: 2018, bau: 88, wem: 85, wam: 82, actual: 85 },
  { year: 2020, bau: 98, wem: 92, wam: 87, actual: 128 },
  { year: 2022, bau: 110, wem: 100, wam: 92, actual: 123.5 },
  { year: 2024, bau: 122, wem: 106, wam: 95, actual: 118.3 },
  { year: 2025, bau: 130, wem: 111, wam: 96, actual: null },
  { year: 2028, bau: 137, wem: 115, wam: 97, actual: null },
  { year: 2030, bau: 143, wem: 118, wam: 97, actual: null },
];

const methodologyDetails = [
  {
    title: "Modeling Framework",
    description: "Low Emissions Analysis Platform (LEAP) version 2023, calibrated with Kenya-specific parameters from the National GHG Inventory (2015-2024).",
  },
  {
    title: "Emission Factors",
    description: "Country-specific emission factors where available (Tier 2), with IPCC 2006 default factors (Tier 1) for minor sources. Updated to 2019 Refinement for energy sector.",
  },
  {
    title: "Activity Data Sources",
    description: "Kenya National Bureau of Statistics, Energy Regulatory Commission, Kenya Forest Service, Ministry of Agriculture. Satellite-derived data for LULUCF.",
  },
  {
    title: "Quality Assurance",
    description: "Multi-stage QA/QC following IPCC 2019 guidelines. Independent peer review by regional technical experts. Gap-filling methods applied where data are incomplete.",
  },
];

const assumptions = [
  { category: "Economic", items: ["GDP growth: 4.5-5.5% (Vision 2030)", "Industrialization targets maintained", "Per capita income growth: 3.2%"] },
  { category: "Demographic", items: ["Population growth: 2.3% (KNBS)", "Urbanization: 4.3% annually", "Household size: declining trend"] },
  { category: "Energy", items: ["Electricity demand growth: 6-8%", "Transport fuel demand: 5% growth", "Biomass use: gradual decline"] },
  { category: "Land Use", items: ["Deforestation: declining with policy", "Reforestation: 200,000 ha/year target", "Agricultural land: stable"] },
];

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
export default function BaselineProjectionsPage() {
  const [activeTab, setActiveTab] = useState<"sectors" | "timeline" | "methodology" | "assumptions">("sectors");

  const bauTotal2030 = sectorProjections.reduce((sum, s) => sum + s.bau2030, 0);
  const wemTotal2030 = sectorProjections.reduce((sum, s) => sum + s.wem2030, 0);
  const wamTotal2030 = sectorProjections.reduce((sum, s) => sum + s.wam2030, 0);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      {/* Breadcrumb */}
      <Link
        href="/baselines/scenarios"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--color-primary-light))] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Scenarios
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20">
            <ArrowUpDown className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Baseline Projections</h1>
            <p className="text-sm text-[hsl(var(--color-text-muted))]">
              Detailed sectoral emission projections, methodology, and assumptions
            </p>
          </div>
        </div>
        <button className="btn-secondary">
          <Download className="h-4 w-4" />
          Export Data
        </button>
      </div>

      {/* Summary Row */}
      <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card-elevated border-t-4 border-red-300">
          <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
            BAU Total (2030)
          </p>
          <p className="mt-1 text-3xl font-bold text-red-600">{bauTotal2030} MtCO2e</p>
          <p className="text-[11px] text-[hsl(var(--color-text-muted))]">No additional measures</p>
        </div>
        <div className="card-elevated border-t-4 border-amber-300">
          <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
            WEM Total (2030)
          </p>
          <p className="mt-1 text-3xl font-bold text-amber-600">{wemTotal2030} MtCO2e</p>
          <p className="text-[11px] text-[hsl(var(--color-text-muted))]">
            -{(((bauTotal2030 - wemTotal2030) / bauTotal2030) * 100).toFixed(0)}% vs BAU
          </p>
        </div>
        <div className="card-elevated border-t-4 border-emerald-300">
          <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
            WAM Total (2030)
          </p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">{wamTotal2030} MtCO2e</p>
          <p className="text-[11px] text-[hsl(var(--color-text-muted))]">
            -{(((bauTotal2030 - wamTotal2030) / bauTotal2030) * 100).toFixed(0)}% vs BAU
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-[hsl(var(--color-background))] p-1">
        {(["sectors", "timeline", "methodology", "assumptions"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all capitalize ${
              activeTab === tab
                ? "bg-[hsl(var(--color-surface))] text-[hsl(var(--color-text))] shadow-sm"
                : "text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))]"
            }`}
          >
            {tab === "sectors"
              ? "Sector Projections"
              : tab === "timeline"
                ? "Timeline Comparison"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Sectors Tab ── */}
      {activeTab === "sectors" && (
        <div className="space-y-6 animate-fade-up">
          {/* Chart Placeholder */}
          <div className="card-elevated">
            <div className="mb-4">
              <h2 className="text-base font-bold text-[hsl(var(--color-text))]">
                Sectoral Emission Projections (2030)
              </h2>
            </div>
            <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))]">
              <div className="text-center">
                <BarChart3 className="mx-auto h-10 w-10 text-[hsl(var(--color-text-muted))]" />
                <p className="mt-2 text-sm font-medium text-[hsl(var(--color-text-muted))]">
                  Grouped bar chart: BAU, WEM, WAM by sector
                </p>
              </div>
            </div>
          </div>

          {/* Sector Table */}
          <div className="card-elevated">
            <h2 className="text-base font-bold text-[hsl(var(--color-text))] mb-4">
              Sectoral Projections by Scenario (MtCO2e)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[hsl(var(--color-border))]">
                    <th className="px-3 py-3 text-left font-medium text-[hsl(var(--color-text-muted))]">Sector</th>
                    <th className="px-3 py-3 text-right font-medium text-red-600" colSpan={1}>BAU 2025</th>
                    <th className="px-3 py-3 text-right font-medium text-red-600">BAU 2030</th>
                    <th className="px-3 py-3 text-right font-medium text-amber-600">WEM 2025</th>
                    <th className="px-3 py-3 text-right font-medium text-amber-600">WEM 2030</th>
                    <th className="px-3 py-3 text-right font-medium text-emerald-600">WAM 2025</th>
                    <th className="px-3 py-3 text-right font-medium text-emerald-600">WAM 2030</th>
                    <th className="px-3 py-3 text-right font-medium text-[hsl(var(--color-text-muted))]">
                      WAM Reduction vs BAU
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sectorProjections.map((s) => {
                    const Icon = s.icon;
                    const reduction =
                      s.bau2030 > 0
                        ? (((s.bau2030 - s.wam2030) / s.bau2030) * 100).toFixed(0)
                        : "N/A";
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
                        <td className="px-3 py-3 text-right text-red-500">{s.bau2025}</td>
                        <td className="px-3 py-3 text-right text-red-600 font-medium">{s.bau2030}</td>
                        <td className="px-3 py-3 text-right text-amber-500">{s.wem2025}</td>
                        <td className="px-3 py-3 text-right text-amber-600 font-medium">{s.wem2030}</td>
                        <td className="px-3 py-3 text-right text-emerald-500">{s.wam2025}</td>
                        <td className="px-3 py-3 text-right text-emerald-600 font-medium">{s.wam2030}</td>
                        <td className="px-3 py-3 text-right">
                          {typeof reduction === "string" && reduction !== "N/A" ? (
                            <span className="text-emerald-600 font-medium">-{reduction}%</span>
                          ) : reduction === "N/A" ? (
                            <span className="text-[hsl(var(--color-text-muted))]">Net sink</span>
                          ) : (
                            <span className="text-emerald-600 font-medium">-{reduction}%</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Totals Row */}
                  <tr className="bg-[hsl(var(--color-background))] font-bold">
                    <td className="px-3 py-3 text-[hsl(var(--color-text))]">TOTAL</td>
                    <td className="px-3 py-3 text-right text-red-500">
                      {sectorProjections.reduce((s, p) => s + p.bau2025, 0)}
                    </td>
                    <td className="px-3 py-3 text-right text-red-600">{bauTotal2030}</td>
                    <td className="px-3 py-3 text-right text-amber-500">
                      {sectorProjections.reduce((s, p) => s + p.wem2025, 0)}
                    </td>
                    <td className="px-3 py-3 text-right text-amber-600">{wemTotal2030}</td>
                    <td className="px-3 py-3 text-right text-emerald-500">
                      {sectorProjections.reduce((s, p) => s + p.wam2025, 0)}
                    </td>
                    <td className="px-3 py-3 text-right text-emerald-600">{wamTotal2030}</td>
                    <td className="px-3 py-3 text-right text-emerald-600">
                      -{(((bauTotal2030 - wamTotal2030) / bauTotal2030) * 100).toFixed(0)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Timeline Tab ── */}
      {activeTab === "timeline" && (
        <div className="space-y-6 animate-fade-up">
          <div className="card-elevated">
            <div className="mb-4">
              <h2 className="text-base font-bold text-[hsl(var(--color-text))]">
                Projection vs Actual Comparison (MtCO2e)
              </h2>
              <p className="text-xs text-[hsl(var(--color-text-muted))]">
                Comparing scenario projections with observed actual data where available
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[hsl(var(--color-border))]">
                    <th className="px-4 py-3 text-left font-medium text-[hsl(var(--color-text-muted))]">Year</th>
                    <th className="px-4 py-3 text-right font-medium text-red-600">BAU</th>
                    <th className="px-4 py-3 text-right font-medium text-amber-600">WEM</th>
                    <th className="px-4 py-3 text-right font-medium text-emerald-600">WAM</th>
                    <th className="px-4 py-3 text-right font-medium text-[hsl(var(--color-primary))]">Actual</th>
                    <th className="px-4 py-3 text-center font-medium text-[hsl(var(--color-text-muted))]">
                      Closest Scenario
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyProjections.map((y) => {
                    let closestScenario = "--";
                    if (y.actual !== null) {
                      const diffs = {
                        BAU: Math.abs(y.bau - y.actual),
                        WEM: Math.abs(y.wem - y.actual),
                        WAM: Math.abs(y.wam - y.actual),
                      };
                      closestScenario = Object.entries(diffs).sort((a, b) => a[1] - b[1])[0]![0];
                    }
                    return (
                      <tr key={y.year} className="border-b border-[hsl(var(--color-border-light))]">
                        <td className="px-4 py-3 font-semibold text-[hsl(var(--color-text))]">{y.year}</td>
                        <td className="px-4 py-3 text-right text-red-600">{y.bau}</td>
                        <td className="px-4 py-3 text-right text-amber-600">{y.wem}</td>
                        <td className="px-4 py-3 text-right text-emerald-600">{y.wam}</td>
                        <td className="px-4 py-3 text-right font-bold text-[hsl(var(--color-primary))]">
                          {y.actual !== null ? y.actual : "--"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {y.actual !== null ? (
                            <span
                              className={
                                closestScenario === "WAM"
                                  ? "badge-success"
                                  : closestScenario === "WEM"
                                    ? "badge-warning"
                                    : "badge-danger"
                              }
                            >
                              {closestScenario}
                            </span>
                          ) : (
                            <span className="text-xs text-[hsl(var(--color-text-muted))]">Projected</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
              <div>
                <p className="text-sm font-bold text-amber-800">Note on Actuals</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Actual emissions for 2020-2022 exceeded all scenario projections, partly due to methodology
                  differences between inventory approaches (production vs consumption) and scope changes in the
                  national GHG inventory. The 2024 data uses an updated methodology that is more aligned with
                  projection boundaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Methodology Tab ── */}
      {activeTab === "methodology" && (
        <div className="space-y-6 animate-fade-up">
          <div className="card-elevated">
            <h2 className="text-base font-bold text-[hsl(var(--color-text))] mb-4">Projection Methodology</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {methodologyDetails.map((m) => (
                <div key={m.title} className="rounded-lg border border-[hsl(var(--color-border))] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-[hsl(var(--color-primary-light))]" />
                    <h3 className="text-sm font-bold text-[hsl(var(--color-text))]">{m.title}</h3>
                  </div>
                  <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-elevated">
            <h2 className="text-base font-bold text-[hsl(var(--color-text))] mb-3">Quality Assurance Checklist</h2>
            <div className="space-y-2">
              {[
                "Emission factors cross-checked with IPCC 2006 defaults",
                "Activity data validated against multiple source datasets",
                "Historical calibration period (2010-2015) accuracy within 5%",
                "Peer review completed by 3 regional experts",
                "Sensitivity analysis conducted on all key parameters",
                "Uncertainty ranges documented for each sector",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[hsl(var(--color-text-secondary))]">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Assumptions Tab ── */}
      {activeTab === "assumptions" && (
        <div className="space-y-6 animate-fade-up">
          <div className="card-elevated">
            <h2 className="text-base font-bold text-[hsl(var(--color-text))] mb-4">
              Projection Assumptions
            </h2>
            <p className="text-sm text-[hsl(var(--color-text-muted))] mb-6">
              Key assumptions underlying all three emission scenarios. These are common baseline parameters that
              influence the starting conditions and growth trajectories.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {assumptions.map((group) => (
                <div key={group.category} className="rounded-lg border border-[hsl(var(--color-border))] p-4">
                  <h3 className="text-sm font-bold text-[hsl(var(--color-text))] mb-2">{group.category}</h3>
                  <ul className="space-y-1.5">
                    {group.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[hsl(var(--color-text-secondary))]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(var(--color-primary-light))]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[hsl(var(--color-primary)/0.2)] bg-[hsl(var(--color-primary-50))] p-4">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--color-primary-light))]" />
              <div>
                <p className="text-sm font-bold text-[hsl(var(--color-primary))]">
                  Assumption Documentation for BTR
                </p>
                <p className="mt-0.5 text-xs text-[hsl(var(--color-primary-light))] leading-relaxed">
                  All assumptions are documented per the Enhanced Transparency Framework (ETF) requirements
                  under Article 13 of the Paris Agreement. These form part of the structured summary for
                  Biennial Transparency Report Chapter 3 on GHG inventory and progress tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
