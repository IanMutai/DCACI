"use client";

import { useState } from "react";
import {
  Zap,
  BarChart3,
  TrendingUp,
  Users,
  Heart,
  ShieldCheck,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertTriangle,
  Link2,
  ChevronDown,
  Activity,
} from "lucide-react";

interface PolicyImpact {
  id: number;
  name: string;
  sector: string;
  directReduction: number;
  costEffectiveness: number;
  coBenefits: {
    jobsCreated: number;
    healthImprovement: string;
    energySecurity: string;
  };
  yearlyImpact: { year: number; expected: number; actual: number | null }[];
  mrvMethod: string;
}

const policyImpacts: PolicyImpact[] = [
  {
    id: 1,
    name: "National Energy Policy (2018)",
    sector: "Energy",
    directReduction: 5.2,
    costEffectiveness: 12,
    coBenefits: { jobsCreated: 45000, healthImprovement: "Reduced indoor air pollution", energySecurity: "Diversified energy mix" },
    yearlyImpact: [
      { year: 2019, expected: 0.8, actual: 0.6 },
      { year: 2020, expected: 1.5, actual: 1.2 },
      { year: 2021, expected: 2.3, actual: 2.1 },
      { year: 2022, expected: 3.2, actual: 3.0 },
      { year: 2023, expected: 4.1, actual: 3.8 },
      { year: 2024, expected: 5.0, actual: 4.7 },
      { year: 2025, expected: 5.2, actual: null },
    ],
    mrvMethod: "Grid emission factor tracking, renewable capacity monitoring, annual energy balance surveys",
  },
  {
    id: 2,
    name: "Feed-in Tariff Policy",
    sector: "Energy",
    directReduction: 3.8,
    costEffectiveness: 18,
    coBenefits: { jobsCreated: 28000, healthImprovement: "Cleaner electricity generation", energySecurity: "Reduced fossil fuel dependence" },
    yearlyImpact: [
      { year: 2013, expected: 0.3, actual: 0.2 },
      { year: 2015, expected: 1.0, actual: 0.9 },
      { year: 2017, expected: 1.8, actual: 1.7 },
      { year: 2019, expected: 2.5, actual: 2.4 },
      { year: 2021, expected: 3.2, actual: 3.1 },
      { year: 2023, expected: 3.8, actual: 3.6 },
    ],
    mrvMethod: "Metered renewable generation data, EPRA reporting, grid displacement calculations",
  },
  {
    id: 3,
    name: "Forest Conservation & Management Act",
    sector: "LULUCF",
    directReduction: 8.1,
    costEffectiveness: 5,
    coBenefits: { jobsCreated: 120000, healthImprovement: "Watershed protection, clean water", energySecurity: "Biomass energy sustainability" },
    yearlyImpact: [
      { year: 2017, expected: 1.0, actual: 0.8 },
      { year: 2018, expected: 2.5, actual: 2.0 },
      { year: 2019, expected: 4.0, actual: 3.5 },
      { year: 2020, expected: 5.5, actual: 4.8 },
      { year: 2021, expected: 6.5, actual: 6.0 },
      { year: 2022, expected: 7.5, actual: 7.2 },
      { year: 2023, expected: 8.1, actual: 7.8 },
    ],
    mrvMethod: "National forest inventory, satellite-based deforestation monitoring, community forest reports",
  },
  {
    id: 4,
    name: "Green Transport Strategy",
    sector: "Transport",
    directReduction: 1.2,
    costEffectiveness: 35,
    coBenefits: { jobsCreated: 15000, healthImprovement: "Reduced urban air pollution", energySecurity: "Lower oil imports" },
    yearlyImpact: [
      { year: 2024, expected: 0.2, actual: 0.1 },
      { year: 2025, expected: 0.5, actual: null },
      { year: 2026, expected: 0.8, actual: null },
      { year: 2027, expected: 1.0, actual: null },
      { year: 2028, expected: 1.2, actual: null },
    ],
    mrvMethod: "Transport activity data, fleet composition surveys, fuel consumption statistics",
  },
  {
    id: 5,
    name: "Climate-Smart Agriculture Strategy",
    sector: "Agriculture",
    directReduction: 3.1,
    costEffectiveness: 22,
    coBenefits: { jobsCreated: 85000, healthImprovement: "Food security improvement", energySecurity: "Bioenergy potential" },
    yearlyImpact: [
      { year: 2024, expected: 0.4, actual: 0.3 },
      { year: 2025, expected: 1.0, actual: null },
      { year: 2026, expected: 1.8, actual: null },
      { year: 2027, expected: 2.5, actual: null },
      { year: 2028, expected: 3.1, actual: null },
    ],
    mrvMethod: "Agricultural census data, soil carbon sampling, livestock methane measurement protocols",
  },
];

const sectorAggregates = [
  { sector: "Energy", totalReduction: 9.0, policyCount: 3, color: "bg-amber-500" },
  { sector: "LULUCF", totalReduction: 8.1, policyCount: 1, color: "bg-emerald-500" },
  { sector: "Agriculture", totalReduction: 3.1, policyCount: 1, color: "bg-green-500" },
  { sector: "Transport", totalReduction: 2.0, policyCount: 2, color: "bg-blue-500" },
  { sector: "Waste", totalReduction: 1.4, policyCount: 1, color: "bg-purple-500" },
];

const policyInteractions = [
  {
    policies: ["National Energy Policy", "Feed-in Tariff Policy"],
    type: "synergy" as const,
    description: "Feed-in tariffs directly support the renewable energy targets set in the National Energy Policy, creating a mutually reinforcing policy framework.",
  },
  {
    policies: ["Forest Conservation Act", "Climate-Smart Agriculture"],
    type: "synergy" as const,
    description: "Agroforestry practices supported by CSA strategy complement forest conservation by reducing pressure on natural forests.",
  },
  {
    policies: ["National Energy Policy", "Clean Cooking Strategy"],
    type: "synergy" as const,
    description: "Clean cooking transitions reduce biomass demand, supporting forest conservation while achieving energy sector targets.",
  },
  {
    policies: ["Carbon Markets", "Electric Mobility"],
    type: "conflict" as const,
    description: "Potential double counting risk if EV carbon credits are also counted toward transport sector NDC targets without proper accounting.",
  },
];

export default function ImpactAnalysisPage() {
  const [selectedPolicyId, setSelectedPolicyId] = useState<number>(1);
  const selectedPolicy = policyImpacts.find((p) => p.id === selectedPolicyId)!;
  const maxReduction = Math.max(...sectorAggregates.map((s) => s.totalReduction));

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Impact Analysis</h1>
              <p className="text-sm text-[hsl(var(--color-text-muted))]">
                Assess the effectiveness and co-benefits of NDC policy measures
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Selector */}
      <div className="card-elevated">
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-[hsl(var(--color-text))]">Select Policy:</label>
          <div className="relative flex-1 max-w-md">
            <select
              className="input-field appearance-none pr-8"
              value={selectedPolicyId}
              onChange={(e) => setSelectedPolicyId(Number(e.target.value))}
            >
              {policyImpacts.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-[hsl(var(--color-text-muted))]" />
          </div>
          <span className="badge-primary">{selectedPolicy.sector}</span>
        </div>
      </div>

      {/* Impact Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Direct Emission Reductions */}
        <div className="card-elevated">
          <div className="flex items-center gap-2 mb-4">
            <div className="icon-container-sm bg-emerald-50">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <h3 className="text-sm font-bold text-[hsl(var(--color-text))]">Direct Emission Reductions</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-600">{selectedPolicy.directReduction} <span className="text-sm font-normal text-[hsl(var(--color-text-muted))]">MtCO2eq/yr</span></p>
          <div className="mt-3 progress-bar progress-bar-success">
            <div className="progress-bar-fill animate-progress-fill" style={{ width: `${(selectedPolicy.directReduction / 10) * 100}%` }} />
          </div>
          <p className="mt-1.5 text-[11px] text-[hsl(var(--color-text-muted))]">
            {((selectedPolicy.directReduction / 28.6) * 100).toFixed(1)}% of total NDC mitigation target
          </p>
        </div>

        {/* Co-Benefits */}
        <div className="card-elevated">
          <div className="flex items-center gap-2 mb-4">
            <div className="icon-container-sm bg-blue-50">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="text-sm font-bold text-[hsl(var(--color-text))]">Co-Benefits</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Users className="h-4 w-4 mt-0.5 text-indigo-500" />
              <div>
                <p className="text-sm font-semibold text-[hsl(var(--color-text))]">{selectedPolicy.coBenefits.jobsCreated.toLocaleString()}</p>
                <p className="text-[11px] text-[hsl(var(--color-text-muted))]">Jobs created / supported</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Heart className="h-4 w-4 mt-0.5 text-rose-500" />
              <div>
                <p className="text-sm font-semibold text-[hsl(var(--color-text))]">{selectedPolicy.coBenefits.healthImprovement}</p>
                <p className="text-[11px] text-[hsl(var(--color-text-muted))]">Health impact</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 mt-0.5 text-emerald-500" />
              <div>
                <p className="text-sm font-semibold text-[hsl(var(--color-text))]">{selectedPolicy.coBenefits.energySecurity}</p>
                <p className="text-[11px] text-[hsl(var(--color-text-muted))]">Energy security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cost-Effectiveness */}
        <div className="card-elevated">
          <div className="flex items-center gap-2 mb-4">
            <div className="icon-container-sm bg-amber-50">
              <DollarSign className="h-4 w-4 text-amber-600" />
            </div>
            <h3 className="text-sm font-bold text-[hsl(var(--color-text))]">Cost-Effectiveness</h3>
          </div>
          <p className="text-3xl font-bold text-[hsl(var(--color-text))]">
            ${selectedPolicy.costEffectiveness} <span className="text-sm font-normal text-[hsl(var(--color-text-muted))]">/tCO2eq</span>
          </p>
          <div className="mt-3 rounded-lg bg-[hsl(var(--color-primary-50))] p-3">
            <p className="text-xs text-[hsl(var(--color-primary))]">
              {selectedPolicy.costEffectiveness < 20
                ? "Highly cost-effective - among the lowest-cost abatement options"
                : selectedPolicy.costEffectiveness < 50
                ? "Moderately cost-effective - good return on investment"
                : "Higher cost - may require additional financial support"}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline of Impact */}
      <div className="card-elevated">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[hsl(var(--color-text))]">Impact Timeline</h3>
            <p className="text-xs text-[hsl(var(--color-text-muted))]">Expected vs actual emission reductions over time</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
              Expected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Actual
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--color-border-light))]">
                <th className="pb-2 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Year</th>
                {selectedPolicy.yearlyImpact.map((y) => (
                  <th key={y.year} className="pb-2 text-center text-xs font-semibold text-[hsl(var(--color-text-muted))]">{y.year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[hsl(var(--color-border-light))]">
                <td className="py-3 text-xs font-medium text-[hsl(var(--color-text))]">Expected (MtCO2eq)</td>
                {selectedPolicy.yearlyImpact.map((y) => (
                  <td key={y.year} className="py-3 text-center text-xs font-semibold text-indigo-600">{y.expected}</td>
                ))}
              </tr>
              <tr className="border-b border-[hsl(var(--color-border-light))]">
                <td className="py-3 text-xs font-medium text-[hsl(var(--color-text))]">Actual (MtCO2eq)</td>
                {selectedPolicy.yearlyImpact.map((y) => (
                  <td key={y.year} className="py-3 text-center text-xs font-semibold text-emerald-600">
                    {y.actual !== null ? y.actual : <span className="text-[hsl(var(--color-text-muted))]">--</span>}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-xs font-medium text-[hsl(var(--color-text))]">Variance</td>
                {selectedPolicy.yearlyImpact.map((y) => {
                  if (y.actual === null) return <td key={y.year} className="py-3 text-center text-xs text-[hsl(var(--color-text-muted))]">--</td>;
                  const variance = y.actual - y.expected;
                  return (
                    <td key={y.year} className="py-3 text-center">
                      <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${variance >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {variance >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(variance).toFixed(1)}
                      </span>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Aggregate Impact by Sector */}
        <div className="card-elevated">
          <div className="mb-4">
            <h3 className="text-base font-bold text-[hsl(var(--color-text))]">Aggregate Impact by Sector</h3>
            <p className="text-xs text-[hsl(var(--color-text-muted))]">Total emission reductions from all policies per sector</p>
          </div>
          <div className="space-y-4">
            {sectorAggregates.map((s) => (
              <div key={s.sector}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[hsl(var(--color-text))]">{s.sector}</span>
                    <span className="text-[11px] text-[hsl(var(--color-text-muted))]">{s.policyCount} {s.policyCount === 1 ? "policy" : "policies"}</span>
                  </div>
                  <span className="text-sm font-bold text-[hsl(var(--color-text))]">{s.totalReduction} MtCO2eq</span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full ${s.color}`}
                    style={{ width: `${(s.totalReduction / maxReduction) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-[hsl(var(--color-border-light))]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[hsl(var(--color-text))]">Total</span>
              <span className="text-sm font-bold text-emerald-600">
                {sectorAggregates.reduce((s, a) => s + a.totalReduction, 0).toFixed(1)} MtCO2eq
              </span>
            </div>
          </div>
        </div>

        {/* Policy Interaction Analysis */}
        <div className="card-elevated">
          <div className="mb-4">
            <h3 className="text-base font-bold text-[hsl(var(--color-text))]">Policy Interactions</h3>
            <p className="text-xs text-[hsl(var(--color-text-muted))]">Synergies and conflicts between policy measures</p>
          </div>
          <div className="space-y-3">
            {policyInteractions.map((interaction, idx) => (
              <div
                key={idx}
                className={`rounded-lg border p-3 ${
                  interaction.type === "synergy"
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-red-200 bg-red-50/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {interaction.type === "synergy" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    interaction.type === "synergy" ? "text-emerald-700" : "text-red-700"
                  }`}>
                    {interaction.type}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-xs font-semibold text-[hsl(var(--color-text))]">{interaction.policies[0]}</span>
                  <Link2 className="h-3 w-3 text-[hsl(var(--color-text-muted))]" />
                  <span className="text-xs font-semibold text-[hsl(var(--color-text))]">{interaction.policies[1]}</span>
                </div>
                <p className="text-[11px] text-[hsl(var(--color-text-secondary))]">{interaction.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MRV Linkage */}
      <div className="card-elevated">
        <div className="flex items-center gap-2 mb-4">
          <div className="icon-container-sm bg-purple-50">
            <Activity className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[hsl(var(--color-text))]">MRV Linkage</h3>
            <p className="text-xs text-[hsl(var(--color-text-muted))]">How the impact of &quot;{selectedPolicy.name}&quot; is measured, reported, and verified</p>
          </div>
        </div>
        <div className="rounded-lg bg-[hsl(var(--color-primary-50))] p-4">
          <div className="flex items-start gap-3">
            <BarChart3 className="h-5 w-5 mt-0.5 text-[hsl(var(--color-primary-light))]" />
            <div>
              <p className="text-sm font-semibold text-[hsl(var(--color-primary))]">Measurement Methodology</p>
              <p className="mt-1 text-xs text-[hsl(var(--color-primary-light))]">{selectedPolicy.mrvMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
