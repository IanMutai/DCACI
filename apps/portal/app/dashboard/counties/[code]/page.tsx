"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Factory,
  Banknote,
  Leaf,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Building2,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

interface PageProps {
  params: Promise<{ code: string }>;
}

export default function CountyDetailPage({ params }: PageProps) {
  const { code } = use(params);

  // Mock data - in real app, fetch based on code
  const county = {
    code,
    name: code === "KE-030" ? "Nairobi" : code === "KE-010" ? "Marsabit" : "County",
    region: code === "KE-030" ? "Central" : "North Eastern",
    population: code === "KE-030" ? 4397073 : 459785,
    area: code === "KE-030" ? 696 : 66923,
    climateZone: code === "KE-030" ? "Highland" : "Arid",
    avgRainfall: code === "KE-030" ? 900 : 250,
    avgTemperature: code === "KE-030" ? 18 : 28,
    emissions: {
      total: code === "KE-030" ? 8500000 : 850000,
      perCapita: code === "KE-030" ? 1.93 : 1.85,
      change: code === "KE-030" ? -2.3 : -5.2,
      byCategory: [
        { name: "Energy", value: code === "KE-030" ? 3200000 : 50000, color: "amber" },
        { name: "Transport", value: code === "KE-030" ? 4100000 : 150000, color: "blue" },
        { name: "Agriculture", value: code === "KE-030" ? 200000 : 600000, color: "emerald" },
        { name: "Waste", value: code === "KE-030" ? 1000000 : 50000, color: "violet" },
      ],
    },
    finance: {
      total: code === "KE-030" ? 12500000000 : 3200000000,
      perCapita: code === "KE-030" ? 2843 : 6960,
      mitigation: code === "KE-030" ? 8750000000 : 2400000000,
      adaptation: code === "KE-030" ? 3750000000 : 800000000,
    },
    projects: [
      {
        id: code === "KE-030" ? "PRJ-NRB-003" : "PRJ-MRB-001",
        name: code === "KE-030" ? "Nairobi E-Mobility Initiative" : "Marsabit Wind Farm Phase II",
        sector: code === "KE-030" ? "Transport" : "Energy",
        status: "ACTIVE",
        reductions: code === "KE-030" ? 120000 : 320000,
      },
      {
        id: code === "KE-030" ? "PRJ-NRB-008" : "PRJ-MRB-002",
        name: code === "KE-030" ? "Dandora Methane Capture" : "Community Solar Program",
        sector: code === "KE-030" ? "Waste" : "Energy",
        status: "ACTIVE",
        reductions: code === "KE-030" ? 85000 : 45000,
      },
    ],
    dominantSectors: code === "KE-030" ? ["Transport", "Energy", "Waste"] : ["Energy", "Agriculture"],
  };

  function formatNumber(num: number, compact = false): string {
    if (compact) {
      if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toLocaleString();
  }

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
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/counties" className="hover:text-[hsl(var(--primary))]">
              Counties
            </Link>
            <span>/</span>
            <span>{county.code}</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            {county.name} County
          </h1>
        </div>
        <Link
          href="/dashboard/counties/compare"
          className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors"
        >
          <BarChart3 className="h-4 w-4" />
          Compare
        </Link>
      </div>

      {/* County Overview */}
      <div className="card bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--primary)/0.05)]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(var(--primary))]">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">{county.name}</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {county.region} Region · {county.code}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {county.dominantSectors.map((sector) => (
              <span
                key={sector}
                className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[hsl(var(--foreground))]"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Population</p>
            <p className="text-lg font-bold text-[hsl(var(--foreground))]">
              {formatNumber(county.population)}
            </p>
          </div>
          <div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Area</p>
            <p className="text-lg font-bold text-[hsl(var(--foreground))]">
              {formatNumber(county.area)} km²
            </p>
          </div>
          <div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Climate Zone</p>
            <p className="text-lg font-bold text-[hsl(var(--foreground))]">{county.climateZone}</p>
          </div>
          <div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Avg Rainfall</p>
            <p className="text-lg font-bold text-[hsl(var(--foreground))]">{county.avgRainfall} mm</p>
          </div>
          <div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Avg Temperature</p>
            <p className="text-lg font-bold text-[hsl(var(--foreground))]">{county.avgTemperature}°C</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Emissions */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Emissions Profile
            </h2>
            <Factory className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-xl bg-red-50">
              <p className="text-xs text-red-600">Total Emissions</p>
              <p className="text-xl font-bold text-red-700">
                {formatNumber(county.emissions.total, true)} tCO2e
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-[hsl(var(--secondary)/0.5)]">
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Per Capita</p>
              <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                {county.emissions.perCapita.toFixed(2)} tCO2e
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-emerald-50">
              <p className="text-xs text-emerald-600">YoY Change</p>
              <p className="text-xl font-bold text-emerald-700 flex items-center justify-center gap-1">
                <TrendingDown className="h-5 w-5" />
                {Math.abs(county.emissions.change)}%
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {county.emissions.byCategory.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-[hsl(var(--muted-foreground))]">{cat.name}</span>
                  <span className="font-medium text-[hsl(var(--foreground))]">
                    {formatNumber(cat.value, true)} tCO2e
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[hsl(var(--secondary))]">
                  <div
                    className={`h-2 rounded-full bg-${cat.color}-500`}
                    style={{ width: `${(cat.value / county.emissions.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Finance */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Climate Finance
            </h2>
            <Banknote className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 rounded-xl bg-emerald-50">
              <p className="text-xs text-emerald-600">Total Received</p>
              <p className="text-xl font-bold text-emerald-700">
                KES {formatNumber(county.finance.total, true)}
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-[hsl(var(--secondary)/0.5)]">
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Per Capita</p>
              <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                KES {formatNumber(county.finance.perCapita)}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-[hsl(var(--muted-foreground))]">Mitigation</span>
                <span className="font-medium text-blue-600">
                  KES {formatNumber(county.finance.mitigation, true)}
                </span>
              </div>
              <div className="h-3 rounded-full bg-[hsl(var(--secondary))]">
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{ width: `${(county.finance.mitigation / county.finance.total) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-[hsl(var(--muted-foreground))]">Adaptation</span>
                <span className="font-medium text-amber-600">
                  KES {formatNumber(county.finance.adaptation, true)}
                </span>
              </div>
              <div className="h-3 rounded-full bg-[hsl(var(--secondary))]">
                <div
                  className="h-3 rounded-full bg-amber-500"
                  style={{ width: `${(county.finance.adaptation / county.finance.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
            Active Projects
          </h2>
          <Link
            href="/dashboard/registry"
            className="text-sm font-medium text-[hsl(var(--primary))] hover:underline inline-flex items-center gap-1"
          >
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {county.projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary)/0.5)] transition-colors"
            >
              <div>
                <p className="font-medium text-[hsl(var(--foreground))]">{project.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{project.id}</span>
                  <span className="text-xs bg-[hsl(var(--secondary))] px-1.5 py-0.5 rounded">
                    {project.sector}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-emerald-600">
                  {formatNumber(project.reductions, true)} tCO2e
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">verified reductions</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
