"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Target,
  TrendingUp,
  TrendingDown,
  Calendar,
  Building2,
  Leaf,
  Link as LinkIcon,
  Edit,
  MoreHorizontal,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NDCTargetDetailPage({ params }: PageProps) {
  const { id } = use(params);

  // Mock data - in real app, fetch based on id
  const target = {
    id,
    name: "Energy Sector Emissions Reduction",
    description: "Reduce GHG emissions from energy generation and consumption through renewable energy deployment and efficiency improvements",
    sector: "Energy",
    type: "CONDITIONAL",
    baselineYear: 2015,
    baselineEmissions: 15200000,
    targetYear: 2030,
    targetReduction: 32,
    targetEmissions: 10336000,
    currentEmissions: 12500000,
    currentProgress: 55.6,
    status: "ON_TRACK",
    lastUpdated: "2024-01-15",
    linkedProjects: [
      { id: "PRJ-MRB-001", name: "Marsabit Wind Farm Phase II", reductions: 320000 },
      { id: "PRJ-TRK-006", name: "Turkana Solar Mini-Grid", reductions: 180000 },
      { id: "PRJ-NKR-007", name: "Nakuru Geothermal Extension", reductions: 250000 },
      { id: "PRJ-NRB-003", name: "Nairobi E-Mobility Initiative", reductions: 100000 },
    ],
    mitigationActions: [
      { name: "Grid-Connected Solar PV", target: 1000, current: 650, unit: "MW" },
      { name: "Wind Power Capacity", target: 800, current: 430, unit: "MW" },
      { name: "Geothermal Expansion", target: 1500, current: 890, unit: "MW" },
      { name: "Energy Efficiency Standards", target: 100, current: 45, unit: "%" },
    ],
  };

  const formatEmissions = (value: number): string => {
    if (Math.abs(value) >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/ndc/targets"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary))] transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/ndc" className="hover:text-[hsl(var(--primary))]">
              NDC Tracker
            </Link>
            <span>/</span>
            <Link href="/dashboard/ndc/targets" className="hover:text-[hsl(var(--primary))]">
              Targets
            </Link>
            <span>/</span>
            <span>{target.id}</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            {target.name}
          </h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
          <Edit className="h-4 w-4" />
          Edit Target
        </button>
      </div>

      {/* Status Banner */}
      <div className={`rounded-xl p-4 ${
        target.status === "ON_TRACK" ? "bg-emerald-50 border border-emerald-200" :
        target.status === "AT_RISK" ? "bg-amber-50 border border-amber-200" :
        "bg-red-50 border border-red-200"
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {target.status === "ON_TRACK" ? (
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            ) : (
              <TrendingDown className="h-6 w-6 text-amber-600" />
            )}
            <div>
              <p className={`font-semibold ${
                target.status === "ON_TRACK" ? "text-emerald-800" : "text-amber-800"
              }`}>
                {target.status === "ON_TRACK" ? "On Track" : "At Risk"}
              </p>
              <p className={`text-sm ${
                target.status === "ON_TRACK" ? "text-emerald-600" : "text-amber-600"
              }`}>
                {target.currentProgress.toFixed(1)}% progress towards 2030 target
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[hsl(var(--foreground))]">
              {target.currentProgress.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="card">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">Overview</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">{target.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Sector</p>
            <p className="text-sm font-medium text-[hsl(var(--foreground))]">{target.sector}</p>
          </div>
          <div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Type</p>
            <p className="text-sm font-medium text-[hsl(var(--foreground))]">{target.type}</p>
          </div>
          <div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Target Year</p>
            <p className="text-sm font-medium text-[hsl(var(--foreground))]">{target.targetYear}</p>
          </div>
          <div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Reduction Target</p>
            <p className="text-sm font-medium text-[hsl(var(--foreground))]">{target.targetReduction}%</p>
          </div>
        </div>
      </div>

      {/* Emissions Progress */}
      <div className="card">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">Emissions Progress</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 rounded-xl bg-[hsl(var(--secondary)/0.5)]">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Baseline ({target.baselineYear})</p>
            <p className="text-xl font-bold text-[hsl(var(--foreground))]">
              {formatEmissions(target.baselineEmissions)} tCO2e
            </p>
          </div>
          <div className="text-center p-4 rounded-xl bg-blue-50">
            <p className="text-xs text-blue-600">Current</p>
            <p className="text-xl font-bold text-blue-700">
              {formatEmissions(target.currentEmissions)} tCO2e
            </p>
          </div>
          <div className="text-center p-4 rounded-xl bg-emerald-50">
            <p className="text-xs text-emerald-600">Target ({target.targetYear})</p>
            <p className="text-xl font-bold text-emerald-700">
              {formatEmissions(target.targetEmissions)} tCO2e
            </p>
          </div>
        </div>
        <div className="h-4 rounded-full bg-[hsl(var(--secondary))]">
          <div
            className="h-4 rounded-full bg-emerald-500"
            style={{ width: `${target.currentProgress}%` }}
          />
        </div>
      </div>

      {/* Linked Projects */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Linked Projects</h2>
          <button className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--primary))]">
            <LinkIcon className="h-4 w-4" />
            Link Project
          </button>
        </div>
        <div className="space-y-3">
          {target.linkedProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-3 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary)/0.5)] transition-colors"
            >
              <div>
                <p className="font-medium text-[hsl(var(--foreground))]">{project.name}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{project.id}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-emerald-600">
                  {formatEmissions(project.reductions)} tCO2e
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">verified reductions</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mitigation Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">Mitigation Actions</h2>
        <div className="space-y-4">
          {target.mitigationActions.map((action, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">{action.name}</span>
                <span className="text-sm text-[hsl(var(--muted-foreground))]">
                  {action.current} / {action.target} {action.unit}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[hsl(var(--secondary))]">
                <div
                  className="h-2 rounded-full bg-[hsl(var(--primary))]"
                  style={{ width: `${(action.current / action.target) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
