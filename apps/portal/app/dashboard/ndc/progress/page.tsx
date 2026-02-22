"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity,
  Download,
} from "lucide-react";

interface SectorProgress {
  sector: string;
  baselineEmissions: number;
  currentEmissions: number;
  targetEmissions: number;
  reductionAchieved: number;
  reductionTarget: number;
  progressPercent: number;
  trend: "up" | "down" | "stable";
  color: string;
}

interface YearlyData {
  year: number;
  totalEmissions: number;
  removals: number;
  netEmissions: number;
  ndcProgress: number;
}

const sectorProgress: SectorProgress[] = [
  {
    sector: "Energy",
    baselineEmissions: 15200000,
    currentEmissions: 12500000,
    targetEmissions: 10336000,
    reductionAchieved: 2700000,
    reductionTarget: 4864000,
    progressPercent: 55.5,
    trend: "down",
    color: "amber",
  },
  {
    sector: "Transport",
    baselineEmissions: 8500000,
    currentEmissions: 7800000,
    targetEmissions: 6375000,
    reductionAchieved: 700000,
    reductionTarget: 2125000,
    progressPercent: 32.9,
    trend: "down",
    color: "blue",
  },
  {
    sector: "Agriculture",
    baselineEmissions: 12800000,
    currentEmissions: 11500000,
    targetEmissions: 10240000,
    reductionAchieved: 1300000,
    reductionTarget: 2560000,
    progressPercent: 50.8,
    trend: "down",
    color: "emerald",
  },
  {
    sector: "LULUCF",
    baselineEmissions: -2500000,
    currentEmissions: -3200000,
    targetEmissions: -3500000,
    reductionAchieved: 700000,
    reductionTarget: 1000000,
    progressPercent: 70.0,
    trend: "down",
    color: "green",
  },
  {
    sector: "Waste",
    baselineEmissions: 4200000,
    currentEmissions: 3900000,
    targetEmissions: 2940000,
    reductionAchieved: 300000,
    reductionTarget: 1260000,
    progressPercent: 23.8,
    trend: "down",
    color: "violet",
  },
  {
    sector: "IPPU",
    baselineEmissions: 5800000,
    currentEmissions: 5500000,
    targetEmissions: 4930000,
    reductionAchieved: 300000,
    reductionTarget: 870000,
    progressPercent: 34.5,
    trend: "down",
    color: "slate",
  },
];

const yearlyData: YearlyData[] = [
  { year: 2015, totalEmissions: 44000000, removals: 2500000, netEmissions: 41500000, ndcProgress: 0 },
  { year: 2016, totalEmissions: 44800000, removals: 2550000, netEmissions: 42250000, ndcProgress: -1.8 },
  { year: 2017, totalEmissions: 45200000, removals: 2600000, netEmissions: 42600000, ndcProgress: -2.7 },
  { year: 2018, totalEmissions: 44500000, removals: 2700000, netEmissions: 41800000, ndcProgress: -0.7 },
  { year: 2019, totalEmissions: 43800000, removals: 2850000, netEmissions: 40950000, ndcProgress: 1.3 },
  { year: 2020, totalEmissions: 42000000, removals: 2900000, netEmissions: 39100000, ndcProgress: 5.8 },
  { year: 2021, totalEmissions: 42500000, removals: 3000000, netEmissions: 39500000, ndcProgress: 4.8 },
  { year: 2022, totalEmissions: 41800000, removals: 3100000, netEmissions: 38700000, ndcProgress: 6.7 },
  { year: 2023, totalEmissions: 41000000, removals: 3200000, netEmissions: 37800000, ndcProgress: 8.9 },
];

function formatEmissions(value: number): string {
  const absValue = Math.abs(value);
  if (absValue >= 1000000) {
    return `${value < 0 ? "-" : ""}${(absValue / 1000000).toFixed(1)}M`;
  }
  return value.toLocaleString();
}

export default function NDCProgressPage() {
  const [selectedYear, setSelectedYear] = useState(2023);

  const currentYearData = yearlyData.find((d) => d.year === selectedYear);
  const baselineData = yearlyData[0];

  const totalBaselineEmissions = sectorProgress.reduce((sum, s) => sum + Math.max(0, s.baselineEmissions), 0);
  const totalCurrentEmissions = sectorProgress.reduce((sum, s) => sum + Math.max(0, s.currentEmissions), 0);
  const totalTargetEmissions = sectorProgress.reduce((sum, s) => sum + Math.max(0, s.targetEmissions), 0);
  const overallProgress = ((totalBaselineEmissions - totalCurrentEmissions) / (totalBaselineEmissions - totalTargetEmissions)) * 100;

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
            <span>Progress</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            NDC Progress Tracking
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Monitor Kenya&apos;s progress towards 2030 NDC commitments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            {yearlyData.map((d) => (
              <option key={d.year} value={d.year}>
                {d.year}
              </option>
            ))}
          </select>
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Overall Progress Card */}
      <div className="card bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--primary)/0.05)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Overall NDC Progress
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Progress towards 2030 targets (Baseline: 2015)
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-[hsl(var(--primary))]">
              {overallProgress.toFixed(1)}%
            </p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">of target achieved</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="h-4 rounded-full bg-white/50">
            <div
              className="h-4 rounded-full bg-[hsl(var(--primary))] transition-all duration-500"
              style={{ width: `${Math.min(overallProgress, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-[hsl(var(--muted-foreground))]">
            <span>Baseline: {formatEmissions(totalBaselineEmissions)} tCO2e</span>
            <span>Current: {formatEmissions(totalCurrentEmissions)} tCO2e</span>
            <span>Target: {formatEmissions(totalTargetEmissions)} tCO2e</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Net Emissions ({selectedYear})</p>
            {currentYearData && currentYearData.netEmissions < baselineData.netEmissions ? (
              <TrendingDown className="h-4 w-4 text-emerald-500" />
            ) : (
              <TrendingUp className="h-4 w-4 text-red-500" />
            )}
          </div>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))] mt-1">
            {formatEmissions(currentYearData?.netEmissions || 0)} tCO2e
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Carbon Removals</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {formatEmissions(currentYearData?.removals || 0)} tCO2e
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">YoY Change</p>
          <p className={`text-2xl font-bold mt-1 ${(currentYearData?.ndcProgress || 0) > 0 ? "text-emerald-600" : "text-red-600"}`}>
            {(currentYearData?.ndcProgress || 0) > 0 ? "+" : ""}{currentYearData?.ndcProgress || 0}%
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Years to Target</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))] mt-1">
            {2030 - selectedYear} years
          </p>
        </div>
      </div>

      {/* Sector Progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Sector Progress
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Breakdown by IPCC sector
            </p>
          </div>
          <BarChart3 className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
        </div>
        <div className="space-y-6">
          {sectorProgress.map((sector) => (
            <div key={sector.sector}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full bg-${sector.color}-500`} />
                  <span className="font-medium text-[hsl(var(--foreground))]">{sector.sector}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[hsl(var(--muted-foreground))]">
                    {formatEmissions(sector.currentEmissions)} / {formatEmissions(sector.targetEmissions)} tCO2e
                  </span>
                  <span className={`font-medium ${
                    sector.progressPercent >= 50 ? "text-emerald-600" :
                    sector.progressPercent >= 30 ? "text-amber-600" :
                    "text-red-600"
                  }`}>
                    {sector.progressPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-[hsl(var(--secondary))]">
                <div
                  className={`h-2 rounded-full bg-${sector.color}-500 transition-all duration-500`}
                  style={{ width: `${Math.min(sector.progressPercent, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                <span>Reduced: {formatEmissions(sector.reductionAchieved)} tCO2e</span>
                <span>Remaining: {formatEmissions(sector.reductionTarget - sector.reductionAchieved)} tCO2e</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emissions Trend */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Emissions Trend
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Historical emissions since baseline year
            </p>
          </div>
          <Activity className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Year
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Total Emissions
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Removals
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Net Emissions
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  NDC Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {yearlyData.map((data) => (
                <tr
                  key={data.year}
                  className={`hover:bg-[hsl(var(--secondary)/0.5)] transition-colors ${
                    data.year === selectedYear ? "bg-[hsl(var(--primary)/0.05)]" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]">
                    {data.year}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-[hsl(var(--foreground))]">
                    {formatEmissions(data.totalEmissions)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-emerald-600">
                    -{formatEmissions(data.removals)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-[hsl(var(--foreground))]">
                    {formatEmissions(data.netEmissions)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                      data.ndcProgress > 0 ? "text-emerald-600" : data.ndcProgress < 0 ? "text-red-600" : "text-slate-600"
                    }`}>
                      {data.ndcProgress > 0 ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : data.ndcProgress < 0 ? (
                        <ArrowDownRight className="h-4 w-4" />
                      ) : null}
                      {data.ndcProgress > 0 ? "+" : ""}{data.ndcProgress}%
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
