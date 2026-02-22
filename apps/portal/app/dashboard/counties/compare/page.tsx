"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  ArrowLeft,
  Plus,
  X,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Factory,
  Banknote,
  Leaf,
  Users,
} from "lucide-react";

interface County {
  code: string;
  name: string;
  region: string;
  population: number;
  area: number;
  totalEmissions: number;
  emissionsPerCapita: number;
  emissionsChange: number;
  climateFinance: number;
  financePerCapita: number;
  activeProjects: number;
  creditsIssued: number;
  mitigationFinance: number;
  adaptationFinance: number;
  energyEmissions: number;
  transportEmissions: number;
  agricultureEmissions: number;
  wasteEmissions: number;
  forestryRemovals: number;
}

const allCounties: County[] = [
  {
    code: "KE-030",
    name: "Nairobi",
    region: "Central",
    population: 4397073,
    area: 696,
    totalEmissions: 8500000,
    emissionsPerCapita: 1.93,
    emissionsChange: -2.3,
    climateFinance: 12500000000,
    financePerCapita: 2843,
    activeProjects: 15,
    creditsIssued: 450000,
    mitigationFinance: 8750000000,
    adaptationFinance: 3750000000,
    energyEmissions: 3200000,
    transportEmissions: 4100000,
    agricultureEmissions: 200000,
    wasteEmissions: 1000000,
    forestryRemovals: 50000,
  },
  {
    code: "KE-001",
    name: "Mombasa",
    region: "Coast",
    population: 1208333,
    area: 212,
    totalEmissions: 3200000,
    emissionsPerCapita: 2.65,
    emissionsChange: -1.8,
    climateFinance: 4800000000,
    financePerCapita: 3972,
    activeProjects: 8,
    creditsIssued: 180000,
    mitigationFinance: 2900000000,
    adaptationFinance: 1900000000,
    energyEmissions: 1100000,
    transportEmissions: 1500000,
    agricultureEmissions: 100000,
    wasteEmissions: 500000,
    forestryRemovals: 80000,
  },
  {
    code: "KE-010",
    name: "Marsabit",
    region: "North Eastern",
    population: 459785,
    area: 66923,
    totalEmissions: 850000,
    emissionsPerCapita: 1.85,
    emissionsChange: -5.2,
    climateFinance: 3200000000,
    financePerCapita: 6960,
    activeProjects: 6,
    creditsIssued: 320000,
    mitigationFinance: 2400000000,
    adaptationFinance: 800000000,
    energyEmissions: 50000,
    transportEmissions: 150000,
    agricultureEmissions: 600000,
    wasteEmissions: 50000,
    forestryRemovals: 200000,
  },
  {
    code: "KE-015",
    name: "Kitui",
    region: "Eastern",
    population: 1136187,
    area: 24385,
    totalEmissions: 1450000,
    emissionsPerCapita: 1.28,
    emissionsChange: -3.1,
    climateFinance: 2100000000,
    financePerCapita: 1848,
    activeProjects: 5,
    creditsIssued: 95000,
    mitigationFinance: 1200000000,
    adaptationFinance: 900000000,
    energyEmissions: 100000,
    transportEmissions: 200000,
    agricultureEmissions: 1000000,
    wasteEmissions: 150000,
    forestryRemovals: 350000,
  },
  {
    code: "KE-037",
    name: "Kakamega",
    region: "Western",
    population: 1867579,
    area: 3034,
    totalEmissions: 1200000,
    emissionsPerCapita: 0.64,
    emissionsChange: -4.5,
    climateFinance: 1800000000,
    financePerCapita: 964,
    activeProjects: 7,
    creditsIssued: 210000,
    mitigationFinance: 900000000,
    adaptationFinance: 900000000,
    energyEmissions: 150000,
    transportEmissions: 200000,
    agricultureEmissions: 600000,
    wasteEmissions: 250000,
    forestryRemovals: 450000,
  },
  {
    code: "KE-028",
    name: "Nakuru",
    region: "Rift Valley",
    population: 2162202,
    area: 7495,
    totalEmissions: 2800000,
    emissionsPerCapita: 1.29,
    emissionsChange: -1.2,
    climateFinance: 3500000000,
    financePerCapita: 1619,
    activeProjects: 9,
    creditsIssued: 175000,
    mitigationFinance: 2100000000,
    adaptationFinance: 1400000000,
    energyEmissions: 800000,
    transportEmissions: 600000,
    agricultureEmissions: 1100000,
    wasteEmissions: 300000,
    forestryRemovals: 280000,
  },
  {
    code: "KE-009",
    name: "Turkana",
    region: "North Eastern",
    population: 926976,
    area: 68680,
    totalEmissions: 420000,
    emissionsPerCapita: 0.45,
    emissionsChange: -6.8,
    climateFinance: 2800000000,
    financePerCapita: 3020,
    activeProjects: 4,
    creditsIssued: 85000,
    mitigationFinance: 1800000000,
    adaptationFinance: 1000000000,
    energyEmissions: 20000,
    transportEmissions: 50000,
    agricultureEmissions: 320000,
    wasteEmissions: 30000,
    forestryRemovals: 50000,
  },
];

function formatNumber(num: number, compact = false): string {
  if (compact) {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toLocaleString();
}

const metrics = [
  { key: "totalEmissions", label: "Total Emissions", unit: "tCO2e", format: "compact" },
  { key: "emissionsPerCapita", label: "Emissions per Capita", unit: "tCO2e", format: "decimal" },
  { key: "emissionsChange", label: "YoY Change", unit: "%", format: "percent" },
  { key: "climateFinance", label: "Climate Finance", unit: "KES", format: "currency" },
  { key: "financePerCapita", label: "Finance per Capita", unit: "KES", format: "number" },
  { key: "activeProjects", label: "Active Projects", unit: "", format: "number" },
  { key: "creditsIssued", label: "Credits Issued", unit: "tCO2e", format: "compact" },
  { key: "mitigationFinance", label: "Mitigation Finance", unit: "KES", format: "currency" },
  { key: "adaptationFinance", label: "Adaptation Finance", unit: "KES", format: "currency" },
];

export default function CompareCountiesPage() {
  const [selectedCounties, setSelectedCounties] = useState<string[]>(["KE-030", "KE-010"]);
  const [showSelector, setShowSelector] = useState(false);

  const counties = selectedCounties
    .map((code) => allCounties.find((c) => c.code === code))
    .filter(Boolean) as County[];

  const handleAddCounty = (code: string) => {
    if (!selectedCounties.includes(code) && selectedCounties.length < 4) {
      setSelectedCounties([...selectedCounties, code]);
    }
    setShowSelector(false);
  };

  const handleRemoveCounty = (code: string) => {
    setSelectedCounties(selectedCounties.filter((c) => c !== code));
  };

  const formatValue = (value: number, format: string): string => {
    switch (format) {
      case "compact":
        return formatNumber(value, true);
      case "decimal":
        return value.toFixed(2);
      case "percent":
        return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
      case "currency":
        return `KES ${formatNumber(value, true)}`;
      case "number":
      default:
        return formatNumber(value);
    }
  };

  const getMaxValue = (key: string): number => {
    return Math.max(...counties.map((c) => Math.abs((c as unknown as Record<string, number>)[key] ?? 0)));
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/counties"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary))] transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">
            Compare Counties
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Side-by-side comparison of climate metrics across counties
          </p>
        </div>
      </div>

      {/* County Selection */}
      <div className="card">
        <h2 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-4">
          Selected Counties (up to 4)
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {counties.map((county) => (
            <div
              key={county.code}
              className="flex items-center gap-2 rounded-xl bg-[hsl(var(--secondary))] px-4 py-2"
            >
              <MapPin className="h-4 w-4 text-[hsl(var(--primary))]" />
              <span className="font-medium text-[hsl(var(--foreground))]">{county.name}</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{county.code}</span>
              <button
                onClick={() => handleRemoveCounty(county.code)}
                className="ml-1 rounded-full p-1 hover:bg-[hsl(var(--border))] transition-colors"
              >
                <X className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
              </button>
            </div>
          ))}
          {selectedCounties.length < 4 && (
            <div className="relative">
              <button
                onClick={() => setShowSelector(!showSelector)}
                className="flex items-center gap-2 rounded-xl border-2 border-dashed border-[hsl(var(--border))] px-4 py-2 text-sm text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add County
              </button>
              {showSelector && (
                <div className="absolute top-full mt-2 left-0 z-10 w-64 rounded-xl border border-[hsl(var(--border))] bg-white shadow-lg p-2 max-h-64 overflow-y-auto">
                  {allCounties
                    .filter((c) => !selectedCounties.includes(c.code))
                    .map((county) => (
                      <button
                        key={county.code}
                        onClick={() => handleAddCounty(county.code)}
                        className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-[hsl(var(--secondary))] transition-colors"
                      >
                        <span className="font-medium text-[hsl(var(--foreground))]">
                          {county.name}
                        </span>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">
                          {county.code}
                        </span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {counties.length > 0 && (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="px-4 py-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">
                  Metric
                </th>
                {counties.map((county) => (
                  <th
                    key={county.code}
                    className="px-4 py-3 text-left text-sm font-medium text-[hsl(var(--foreground))]"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[hsl(var(--primary))]" />
                      {county.name}
                    </div>
                    <span className="text-xs font-normal text-[hsl(var(--muted-foreground))]">
                      {county.region}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {/* Basic Info */}
              <tr className="bg-[hsl(var(--secondary)/0.3)]">
                <td className="px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]" colSpan={counties.length + 1}>
                  Basic Information
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Population
                  </div>
                </td>
                {counties.map((county) => (
                  <td key={county.code} className="px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]">
                    {formatNumber(county.population)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Area (km²)
                  </div>
                </td>
                {counties.map((county) => (
                  <td key={county.code} className="px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]">
                    {formatNumber(county.area)}
                  </td>
                ))}
              </tr>

              {/* Emissions */}
              <tr className="bg-[hsl(var(--secondary)/0.3)]">
                <td className="px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]" colSpan={counties.length + 1}>
                  Emissions Profile
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">
                  <div className="flex items-center gap-2">
                    <Factory className="h-4 w-4" />
                    Total Emissions
                  </div>
                </td>
                {counties.map((county) => {
                  const max = getMaxValue("totalEmissions");
                  const width = (county.totalEmissions / max) * 100;
                  return (
                    <td key={county.code} className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                          {formatNumber(county.totalEmissions, true)} tCO2e
                        </span>
                        <div className="h-1.5 rounded-full bg-[hsl(var(--secondary))] w-full">
                          <div
                            className="h-1.5 rounded-full bg-red-500"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">
                  Emissions per Capita
                </td>
                {counties.map((county) => (
                  <td key={county.code} className="px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]">
                    {county.emissionsPerCapita.toFixed(2)} tCO2e
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">
                  Year-on-Year Change
                </td>
                {counties.map((county) => (
                  <td key={county.code} className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-medium ${
                        county.emissionsChange < 0 ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {county.emissionsChange < 0 ? (
                        <TrendingDown className="h-4 w-4" />
                      ) : (
                        <TrendingUp className="h-4 w-4" />
                      )}
                      {Math.abs(county.emissionsChange)}%
                    </span>
                  </td>
                ))}
              </tr>

              {/* Finance */}
              <tr className="bg-[hsl(var(--secondary)/0.3)]">
                <td className="px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]" colSpan={counties.length + 1}>
                  Climate Finance
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4" />
                    Total Finance
                  </div>
                </td>
                {counties.map((county) => {
                  const max = getMaxValue("climateFinance");
                  const width = (county.climateFinance / max) * 100;
                  return (
                    <td key={county.code} className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                          KES {formatNumber(county.climateFinance, true)}
                        </span>
                        <div className="h-1.5 rounded-full bg-[hsl(var(--secondary))] w-full">
                          <div
                            className="h-1.5 rounded-full bg-emerald-500"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">
                  Finance per Capita
                </td>
                {counties.map((county) => (
                  <td key={county.code} className="px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]">
                    KES {formatNumber(county.financePerCapita)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">
                  Mitigation vs Adaptation
                </td>
                {counties.map((county) => {
                  const total = county.mitigationFinance + county.adaptationFinance;
                  const mitPct = (county.mitigationFinance / total) * 100;
                  return (
                    <td key={county.code} className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-blue-600">Mit: {mitPct.toFixed(0)}%</span>
                          <span className="text-amber-600">Adp: {(100 - mitPct).toFixed(0)}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-amber-500 w-full overflow-hidden">
                          <div
                            className="h-2 bg-blue-500"
                            style={{ width: `${mitPct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Projects & Credits */}
              <tr className="bg-[hsl(var(--secondary)/0.3)]">
                <td className="px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]" colSpan={counties.length + 1}>
                  Projects & Carbon Credits
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">
                  Active Projects
                </td>
                {counties.map((county) => (
                  <td key={county.code} className="px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]">
                    {county.activeProjects}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-[hsl(var(--muted-foreground))]">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4" />
                    Credits Issued
                  </div>
                </td>
                {counties.map((county) => {
                  const max = getMaxValue("creditsIssued");
                  const width = (county.creditsIssued / max) * 100;
                  return (
                    <td key={county.code} className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                          {formatNumber(county.creditsIssued, true)} tCO2e
                        </span>
                        <div className="h-1.5 rounded-full bg-[hsl(var(--secondary))] w-full">
                          <div
                            className="h-1.5 rounded-full bg-violet-500"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {counties.length === 0 && (
        <div className="card flex flex-col items-center justify-center py-12">
          <BarChart3 className="h-12 w-12 text-[hsl(var(--muted-foreground)/0.3)]" />
          <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
            Select at least one county to compare
          </p>
        </div>
      )}
    </div>
  );
}
