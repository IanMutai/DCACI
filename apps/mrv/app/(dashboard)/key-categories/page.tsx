"use client";

import { useState } from "react";
import {
  BarChart3,
  Target,
  TrendingUp,
  ArrowUpRight,
  Info,
  ChevronRight,
  Layers,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface KeyCategory {
  rank: number;
  code: string;
  name: string;
  sector: string;
  gas: string;
  emissionsGg: number;
  pctTotal: number;
  cumulativePct: number;
  isKey: boolean;
  baseYear: number;
  baseYearEmissions: number;
  currentYear: number;
  currentYearEmissions: number;
  trendPct: number;
  trendContribution: number;
  isKeyTrend: boolean;
  recommendedTier: string;
}

// Real Kenya key categories based on 2022 inventory (94.9 MtCO2e excl. LULUCF)
// PRIMAP-hist v2.6 HISTCR: Agriculture 44.9 Mt (47.3%), Energy 40.3 Mt (42.4%), IPPU 5.96 Mt (6.3%), Waste 3.1 Mt (3.3%)
const keyCategories: KeyCategory[] = [
  { rank: 1, code: "3.A.1", name: "Enteric Fermentation", sector: "Agriculture", gas: "CH4", emissionsGg: 29500, pctTotal: 31.2, cumulativePct: 31.2, isKey: true, baseYear: 1990, baseYearEmissions: 18200, currentYear: 2022, currentYearEmissions: 29500, trendPct: 62.1, trendContribution: 34.8, isKeyTrend: true, recommendedTier: "Tier 2" },
  { rank: 2, code: "3.A.2", name: "Manure Left on Pasture", sector: "Agriculture", gas: "CH4/N2O", emissionsGg: 12600, pctTotal: 13.3, cumulativePct: 44.6, isKey: true, baseYear: 1990, baseYearEmissions: 7800, currentYear: 2022, currentYearEmissions: 12600, trendPct: 61.5, trendContribution: 14.8, isKeyTrend: true, recommendedTier: "Tier 2" },
  { rank: 3, code: "1.A.3", name: "Transport", sector: "Energy", gas: "CO2", emissionsGg: 11100, pctTotal: 11.7, cumulativePct: 56.3, isKey: true, baseYear: 1990, baseYearEmissions: 4200, currentYear: 2022, currentYearEmissions: 11100, trendPct: 164.3, trendContribution: 21.2, isKeyTrend: true, recommendedTier: "Tier 2" },
  { rank: 4, code: "3.H", name: "Food Waste", sector: "Agriculture", gas: "CH4", emissionsGg: 5800, pctTotal: 6.1, cumulativePct: 62.5, isKey: true, baseYear: 1990, baseYearEmissions: 3500, currentYear: 2022, currentYearEmissions: 5800, trendPct: 65.7, trendContribution: 7.1, isKeyTrend: true, recommendedTier: "Tier 1" },
  { rank: 5, code: "2.A.1", name: "Cement & Industrial Processes", sector: "IPPU", gas: "CO2", emissionsGg: 5955, pctTotal: 6.3, cumulativePct: 68.8, isKey: true, baseYear: 1990, baseYearEmissions: 1200, currentYear: 2022, currentYearEmissions: 5955, trendPct: 396.3, trendContribution: 14.6, isKeyTrend: true, recommendedTier: "Tier 2" },
  { rank: 6, code: "1.A.4", name: "Buildings (Residential & Commercial)", sector: "Energy", gas: "CO2", emissionsGg: 5360, pctTotal: 5.7, cumulativePct: 74.4, isKey: true, baseYear: 1990, baseYearEmissions: 3100, currentYear: 2022, currentYearEmissions: 5360, trendPct: 72.9, trendContribution: 6.9, isKeyTrend: false, recommendedTier: "Tier 2" },
  { rank: 7, code: "1.A.2", name: "Manufacturing & Construction", sector: "Energy", gas: "CO2", emissionsGg: 3260, pctTotal: 3.5, cumulativePct: 77.9, isKey: true, baseYear: 1990, baseYearEmissions: 1800, currentYear: 2022, currentYearEmissions: 3260, trendPct: 81.1, trendContribution: 4.5, isKeyTrend: false, recommendedTier: "Tier 2" },
  { rank: 8, code: "5.A", name: "Solid Waste Disposal", sector: "Waste", gas: "CH4", emissionsGg: 3100, pctTotal: 3.3, cumulativePct: 81.2, isKey: true, baseYear: 1990, baseYearEmissions: 1100, currentYear: 2022, currentYearEmissions: 3100, trendPct: 181.8, trendContribution: 6.2, isKeyTrend: true, recommendedTier: "Tier 1" },
  { rank: 9, code: "3.D", name: "Agricultural Soils (N2O)", sector: "Agriculture", gas: "N2O", emissionsGg: 2800, pctTotal: 3.0, cumulativePct: 84.1, isKey: true, baseYear: 1990, baseYearEmissions: 1900, currentYear: 2022, currentYearEmissions: 2800, trendPct: 47.4, trendContribution: 2.8, isKeyTrend: false, recommendedTier: "Tier 1" },
  { rank: 10, code: "1.A.1", name: "Electricity Generation", sector: "Energy", gas: "CO2", emissionsGg: 680, pctTotal: 0.7, cumulativePct: 84.8, isKey: false, baseYear: 1990, baseYearEmissions: 950, currentYear: 2022, currentYearEmissions: 680, trendPct: -28.4, trendContribution: -0.8, isKeyTrend: false, recommendedTier: "Tier 2" },
  { rank: 11, code: "4.A", name: "Forest Land (Net Sink)", sector: "LULUCF", gas: "CO2", emissionsGg: -7570, pctTotal: -8.0, cumulativePct: 76.8, isKey: true, baseYear: 1990, baseYearEmissions: -4200, currentYear: 2022, currentYearEmissions: -7570, trendPct: 80.2, trendContribution: -10.4, isKeyTrend: true, recommendedTier: "Tier 2" },
];

const totalEmissions = keyCategories.reduce((sum, c) => sum + c.emissionsGg, 0);
const keyCategoryCount = keyCategories.filter((c) => c.isKey).length;
const keyCategoryTrendCount = keyCategories.filter((c) => c.isKeyTrend).length;

export default function KeyCategoriesPage() {
  const [activeTab, setActiveTab] = useState<"level" | "trend" | "combined">("level");
  const threshold = 95;

  const maxEmissions = Math.max(...keyCategories.map((c) => c.emissionsGg));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Target size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Key Category Analysis</h1>
            <p className="mt-1 text-sm text-gray-500">
              IPCC Approach 1 level and trend assessment — Kenya BTR-1 (2024). Base year 1990, latest year 2022. Total: 94.9 MtCO2e excl. LULUCF (PRIMAP-hist v2.6).
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-primary badge-lg">
            <Layers size={14} />
            FY 2022 Inventory
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 stagger-children">
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Key Categories (Level)</p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">{keyCategoryCount}</p>
              <p className="text-xs text-gray-400 mt-0.5">of {keyCategories.length} total</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Key Categories (Trend)</p>
              <p className="mt-1 text-2xl font-bold text-blue-600">{keyCategoryTrendCount}</p>
              <p className="text-xs text-gray-400 mt-0.5">Contributing to trend</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Cumulative Threshold</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{threshold}%</p>
              <p className="text-xs text-gray-400 mt-0.5">IPCC Approach 1</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Target size={20} />
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Emissions</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{(totalEmissions / 1000).toFixed(1)}</p>
              <p className="text-xs text-gray-400 mt-0.5">Gg CO2eq (000s)</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <BarChart3 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart Visual */}
      <div className="card-elevated animate-fade-up">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Top 10 Categories by Emission Level</h3>
            <p className="text-xs text-gray-500 mt-0.5">Horizontal bars show relative emission levels. Dashed line shows 95% cumulative threshold.</p>
          </div>
        </div>
        <div className="space-y-2.5">
          {keyCategories.map((cat) => {
            const barWidth = (cat.emissionsGg / maxEmissions) * 100;
            const isAboveThreshold = cat.cumulativePct <= threshold;
            return (
              <div key={cat.code} className="flex items-center gap-3">
                <div className="w-40 flex-shrink-0 text-right">
                  <p className="text-xs font-medium text-gray-700 truncate">{cat.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono">{cat.code}</p>
                </div>
                <div className="flex-1 relative">
                  <div className="h-7 bg-gray-100 rounded-md overflow-hidden relative">
                    <div
                      className={`h-full rounded-md transition-all duration-700 ${
                        isAboveThreshold
                          ? "bg-emerald-500"
                          : "bg-gray-300"
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                    {/* 95% threshold line */}
                    <div
                      className="absolute top-0 bottom-0 border-r-2 border-dashed border-red-400"
                      style={{ left: `${(threshold / 100) * (totalEmissions / maxEmissions) * 10}%` }}
                    />
                  </div>
                </div>
                <div className="w-24 flex-shrink-0 text-right">
                  <p className="text-xs font-mono font-semibold text-gray-900">{(cat.emissionsGg / 1000).toFixed(1)}k</p>
                  <p className="text-[10px] text-gray-400">{cat.pctTotal}%</p>
                </div>
                <div className="w-16 flex-shrink-0">
                  {cat.isKey ? (
                    <span className="badge-success">Key</span>
                  ) : (
                    <span className="badge-neutral">Non-key</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-500" /> Key Category (within 95% threshold)
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-gray-300" /> Non-Key Category
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        {[
          { key: "level" as const, label: "Level Assessment (Approach 1)" },
          { key: "trend" as const, label: "Trend Assessment (Approach 1)" },
          { key: "combined" as const, label: "Combined Key Categories" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.key
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Level Assessment Table */}
      {activeTab === "level" && (
        <div className="table-container animate-fade-up">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>IPCC Code</th>
                <th>Category</th>
                <th>Sector</th>
                <th>Gas</th>
                <th className="text-right">Emissions (Gg CO2eq)</th>
                <th className="text-right">% of Total</th>
                <th className="text-right">Cumulative %</th>
                <th>Key Category?</th>
              </tr>
            </thead>
            <tbody>
              {keyCategories.map((cat) => (
                <tr
                  key={cat.code}
                  className={cat.isKey ? "bg-emerald-50/40" : cat.cumulativePct > threshold ? "" : ""}
                >
                  <td className="font-semibold text-gray-900">{cat.rank}</td>
                  <td className="font-mono text-sm text-gray-600">{cat.code}</td>
                  <td className="text-sm font-medium text-gray-900">{cat.name}</td>
                  <td><span className="badge-neutral">{cat.sector}</span></td>
                  <td className="text-sm text-gray-600">{cat.gas}</td>
                  <td className="text-right font-mono text-sm font-semibold text-gray-900">
                    {cat.emissionsGg.toLocaleString()}
                  </td>
                  <td className="text-right font-mono text-sm text-gray-700">{cat.pctTotal.toFixed(1)}</td>
                  <td className="text-right">
                    <span className={`font-mono text-sm font-medium ${
                      cat.cumulativePct <= threshold ? "text-emerald-700" : "text-gray-500"
                    }`}>
                      {cat.cumulativePct.toFixed(1)}
                    </span>
                    {cat.cumulativePct <= threshold && cat.rank > 1 && (keyCategories[cat.rank - 2]?.cumulativePct ?? 0) < threshold && cat.cumulativePct >= threshold - 5 && (
                      <span className="ml-1 text-[10px] text-amber-500 font-medium">~threshold</span>
                    )}
                  </td>
                  <td>
                    {cat.isKey ? (
                      <span className="badge-success badge-dot">Key</span>
                    ) : (
                      <span className="badge-neutral">Non-key</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Trend Assessment Table */}
      {activeTab === "trend" && (
        <div className="table-container animate-fade-up">
          <table>
            <thead>
              <tr>
                <th>IPCC Code</th>
                <th>Category</th>
                <th className="text-right">Base Year ({keyCategories[0]?.baseYear})</th>
                <th className="text-right">Current Year ({keyCategories[0]?.currentYear})</th>
                <th className="text-right">Trend (%)</th>
                <th className="text-right">Contribution to Trend (%)</th>
                <th>Key Category?</th>
              </tr>
            </thead>
            <tbody>
              {keyCategories.map((cat) => (
                <tr key={cat.code} className={cat.isKeyTrend ? "bg-blue-50/40" : ""}>
                  <td className="font-mono text-sm text-gray-600">{cat.code}</td>
                  <td className="text-sm font-medium text-gray-900">{cat.name}</td>
                  <td className="text-right font-mono text-sm text-gray-700">
                    {cat.baseYearEmissions.toLocaleString()}
                  </td>
                  <td className="text-right font-mono text-sm font-semibold text-gray-900">
                    {cat.currentYearEmissions.toLocaleString()}
                  </td>
                  <td className="text-right">
                    <span className={`inline-flex items-center gap-1 font-mono text-sm font-medium ${
                      cat.trendPct > 0 ? "text-red-600" : "text-emerald-600"
                    }`}>
                      <ArrowUpRight size={12} />
                      +{cat.trendPct.toFixed(1)}%
                    </span>
                  </td>
                  <td className="text-right font-mono text-sm text-gray-700">{cat.trendContribution.toFixed(1)}</td>
                  <td>
                    {cat.isKeyTrend ? (
                      <span className="badge-accent badge-dot">Key (Trend)</span>
                    ) : (
                      <span className="badge-neutral">Non-key</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Combined Key Categories */}
      {activeTab === "combined" && (
        <div className="space-y-4 animate-fade-up">
          <div className="card-elevated">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Combined Key Categories with Methodology Recommendations</h3>
            <div className="space-y-3">
              {keyCategories
                .filter((c) => c.isKey || c.isKeyTrend)
                .map((cat) => (
                  <div key={cat.code} className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 hover:border-emerald-200 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold text-sm flex-shrink-0">
                      #{cat.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">{cat.name}</p>
                        <span className="badge-neutral font-mono">{cat.code}</span>
                        {cat.isKey && <span className="badge-success">Level</span>}
                        {cat.isKeyTrend && <span className="badge-accent">Trend</span>}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {cat.sector} sector | {cat.gas} | {cat.emissionsGg.toLocaleString()} Gg CO2eq ({cat.pctTotal}% of total)
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="badge-primary">{cat.recommendedTier}</span>
                      <p className="text-[10px] text-gray-400 mt-1">Recommended</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Methodology Note */}
      <div className="card-elevated animate-fade-up">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Info size={16} className="text-blue-500" />
          Methodology: IPCC Key Category Analysis - Approach 1
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Level Assessment</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Categories are sorted by their absolute emission level contribution. Categories are cumulated from largest to smallest.
              Those that together contribute to 95% of the total national emissions are identified as key categories.
              Per 2006 IPCC Guidelines, Volume 1, Chapter 4.
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Trend Assessment</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Evaluates the trend in emissions between the base year ({keyCategories[0]?.baseYear}) and the latest year ({keyCategories[0]?.currentYear}).
              Categories with the largest absolute contribution to the overall trend are identified as key categories for trend.
              This helps prioritize categories where emissions are changing rapidly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
