"use client";

import { useState } from "react";
import {
  Scale,
  DollarSign,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Globe2,
  Briefcase,
  Download,
  Info,
} from "lucide-react";

interface PolicyCBA {
  name: string;
  sector: string;
  implementationCost: number;
  annualSavings: number;
  emissionReduction: number;
  costPerTon: number;
  npv: number;
  bcr: number;
}

const policyCBA: PolicyCBA[] = [
  { name: "Forest Conservation & Management Act", sector: "LULUCF", implementationCost: 320, annualSavings: 180, emissionReduction: 8.1, costPerTon: 5, npv: 1450, bcr: 3.2 },
  { name: "National Energy Policy", sector: "Energy", implementationCost: 2800, annualSavings: 950, emissionReduction: 5.2, costPerTon: 12, npv: 4200, bcr: 2.1 },
  { name: "Feed-in Tariff Policy", sector: "Energy", implementationCost: 1500, annualSavings: 420, emissionReduction: 3.8, costPerTon: 18, npv: 1800, bcr: 1.8 },
  { name: "Climate-Smart Agriculture Strategy", sector: "Agriculture", implementationCost: 850, annualSavings: 310, emissionReduction: 3.1, costPerTon: 22, npv: 980, bcr: 1.6 },
  { name: "National Clean Cooking Strategy", sector: "Energy", implementationCost: 450, annualSavings: 280, emissionReduction: 2.4, costPerTon: 15, npv: 1100, bcr: 2.4 },
  { name: "Green Transport Strategy", sector: "Transport", implementationCost: 3200, annualSavings: 580, emissionReduction: 1.2, costPerTon: 35, npv: 620, bcr: 1.2 },
  { name: "Electric Mobility Policy", sector: "Transport", implementationCost: 4500, annualSavings: 750, emissionReduction: 0.8, costPerTon: 48, npv: -200, bcr: 0.9 },
  { name: "Carbon Markets Regulations", sector: "Cross-cutting", implementationCost: 50, annualSavings: 120, emissionReduction: 0, costPerTon: 0, npv: 850, bcr: 5.1 },
];

const sectorInvestments = [
  { sector: "Energy", required: 18.0, committed: 8.5, color: "bg-amber-500" },
  { sector: "Transport", required: 8.0, committed: 2.1, color: "bg-blue-500" },
  { sector: "Agriculture", required: 6.0, committed: 1.8, color: "bg-green-500" },
  { sector: "Forestry", required: 4.0, committed: 2.2, color: "bg-emerald-500" },
  { sector: "Water", required: 3.0, committed: 0.9, color: "bg-sky-500" },
  { sector: "Waste", required: 1.5, committed: 0.4, color: "bg-purple-500" },
  { sector: "Health", required: 1.0, committed: 0.3, color: "bg-rose-500" },
];

const fundingSources = [
  { source: "Domestic Budget", amount: 8.2, percentage: 13, icon: Building2, color: "bg-indigo-500" },
  { source: "International Climate Finance", amount: 28.5, percentage: 46, icon: Globe2, color: "bg-emerald-500" },
  { source: "Private Sector", amount: 18.8, percentage: 30, icon: Briefcase, color: "bg-amber-500" },
  { source: "Carbon Markets", amount: 6.5, percentage: 11, icon: BarChart3, color: "bg-purple-500" },
];

const macSectors = [
  { sector: "Forestry (reforestation)", cost: -15, reduction: 8.1, color: "bg-emerald-500" },
  { sector: "Energy efficiency", cost: -5, reduction: 3.2, color: "bg-green-500" },
  { sector: "Clean cooking", cost: 5, reduction: 2.4, color: "bg-lime-500" },
  { sector: "Renewable energy", cost: 12, reduction: 5.2, color: "bg-amber-500" },
  { sector: "Feed-in tariffs", cost: 18, reduction: 3.8, color: "bg-orange-500" },
  { sector: "Agriculture CSA", cost: 22, reduction: 3.1, color: "bg-yellow-500" },
  { sector: "Green transport", cost: 35, reduction: 1.2, color: "bg-blue-500" },
  { sector: "Electric mobility", cost: 48, reduction: 0.8, color: "bg-red-500" },
];

export default function CostBenefitPage() {
  const [sortField, setSortField] = useState<keyof PolicyCBA>("costPerTon");
  const [sortAsc, setSortAsc] = useState(true);

  const sortedPolicies = [...policyCBA].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === "number" && typeof bVal === "number") return sortAsc ? aVal - bVal : bVal - aVal;
    return sortAsc ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
  });

  const handleSort = (field: keyof PolicyCBA) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  const totalInvestment = sectorInvestments.reduce((s, i) => s + i.required, 0);
  const totalCommitted = sectorInvestments.reduce((s, i) => s + i.committed, 0);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg shadow-teal-500/20">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Cost-Benefit Analysis</h1>
              <p className="text-sm text-[hsl(var(--color-text-muted))]">Economic analysis of NDC policy measures and investment requirements</p>
            </div>
          </div>
        </div>
        <button className="btn-secondary"><Download className="h-4 w-4" />Export Analysis</button>
      </div>

      <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-elevated"><div className="flex items-center gap-3"><div className="icon-container-md bg-indigo-50"><DollarSign className="h-5 w-5 text-indigo-600" /></div><div><p className="text-2xl font-bold text-[hsl(var(--color-text))]">${totalInvestment.toFixed(1)}B</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Total Investment Required</p></div></div></div>
        <div className="card-elevated"><div className="flex items-center gap-3"><div className="icon-container-md bg-emerald-50"><TrendingUp className="h-5 w-5 text-emerald-600" /></div><div><p className="text-2xl font-bold text-emerald-600">${totalCommitted.toFixed(1)}B</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Total Committed</p></div></div></div>
        <div className="card-elevated"><div className="flex items-center gap-3"><div className="icon-container-md bg-amber-50"><Scale className="h-5 w-5 text-amber-600" /></div><div><p className="text-2xl font-bold text-amber-600">$18</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Avg Cost per tCO2eq</p></div></div></div>
        <div className="card-elevated"><div className="flex items-center gap-3"><div className="icon-container-md bg-green-50"><BarChart3 className="h-5 w-5 text-green-600" /></div><div><p className="text-2xl font-bold text-green-600">2.0x</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Avg Benefit-Cost Ratio</p></div></div></div>
      </div>

      <div className="card-elevated">
        <div className="mb-4">
          <h3 className="text-base font-bold text-[hsl(var(--color-text))]">Policy Cost-Benefit Comparison</h3>
          <p className="text-xs text-[hsl(var(--color-text-muted))]">Click column headers to sort</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--color-border))]">
                {([["name","Policy"],["sector","Sector"],["implementationCost","Cost ($M)"],["annualSavings","Annual Savings ($M)"],["emissionReduction","Reduction (MtCO2eq)"],["costPerTon","$/tCO2eq"],["npv","NPV ($M)"],["bcr","BCR"]] as [keyof PolicyCBA, string][]).map(([key, label]) => (
                  <th key={key} className="cursor-pointer pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))]" onClick={() => handleSort(key)}>
                    <span className="flex items-center gap-1">{label}{sortField === key && (sortAsc ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedPolicies.map((p) => (
                <tr key={p.name} className="border-b border-[hsl(var(--color-border-light))] hover:bg-[hsl(var(--color-surface-hover))]">
                  <td className="py-3 text-xs font-semibold text-[hsl(var(--color-text))]">{p.name}</td>
                  <td className="py-3 text-xs text-[hsl(var(--color-text-secondary))]">{p.sector}</td>
                  <td className="py-3 text-xs text-[hsl(var(--color-text))]">${p.implementationCost.toLocaleString()}</td>
                  <td className="py-3 text-xs text-emerald-600 font-semibold">${p.annualSavings.toLocaleString()}</td>
                  <td className="py-3 text-xs text-[hsl(var(--color-text))]">{p.emissionReduction || "--"}</td>
                  <td className="py-3 text-xs"><span className={`font-semibold ${p.costPerTon <= 15 ? "text-emerald-600" : p.costPerTon <= 30 ? "text-amber-600" : "text-red-600"}`}>{p.costPerTon ? `$${p.costPerTon}` : "--"}</span></td>
                  <td className="py-3 text-xs"><span className={`font-semibold ${p.npv >= 0 ? "text-emerald-600" : "text-red-600"}`}>${p.npv.toLocaleString()}</span></td>
                  <td className="py-3 text-xs"><span className={`font-bold ${p.bcr >= 1.5 ? "text-emerald-600" : p.bcr >= 1.0 ? "text-amber-600" : "text-red-600"}`}>{p.bcr.toFixed(1)}x</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card-elevated">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-base font-bold text-[hsl(var(--color-text))]">Marginal Abatement Cost Curve</h3>
            <div className="group relative">
              <Info className="h-4 w-4 text-[hsl(var(--color-text-muted))] cursor-help" />
              <div className="invisible group-hover:visible absolute left-6 top-0 z-10 w-48 rounded-lg bg-[hsl(var(--color-text))] p-2 text-[11px] text-white shadow-lg">Sectors ordered by cost-effectiveness. Negative costs represent net savings.</div>
            </div>
          </div>
          <div className="space-y-2.5">
            {macSectors.map((s) => (
              <div key={s.sector} className="flex items-center gap-3">
                <div className="w-[140px] flex-shrink-0"><p className="text-xs font-medium text-[hsl(var(--color-text))] truncate">{s.sector}</p></div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 relative h-6 flex items-center">
                    {s.cost < 0 ? (
                      <div className="ml-auto flex items-center justify-end" style={{ width: "50%" }}>
                        <div className={`h-5 rounded-l ${s.color}`} style={{ width: `${Math.abs(s.cost) * 3}%`, minWidth: "8px" }} />
                      </div>
                    ) : (
                      <div className="flex items-center" style={{ marginLeft: "50%" }}>
                        <div className={`h-5 rounded-r ${s.color}`} style={{ width: `${s.cost * 2}%`, minWidth: "8px" }} />
                      </div>
                    )}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[hsl(var(--color-border))]" />
                  </div>
                  <span className={`w-12 text-right text-xs font-semibold ${s.cost < 0 ? "text-emerald-600" : "text-[hsl(var(--color-text))]"}`}>${s.cost}</span>
                </div>
                <span className="w-16 text-right text-xs text-[hsl(var(--color-text-muted))]">{s.reduction} Mt</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] text-[hsl(var(--color-text-muted))]"><span>Net savings</span><span>$/tCO2eq</span><span>Net cost</span></div>
        </div>

        <div className="card-elevated">
          <div className="mb-4">
            <h3 className="text-base font-bold text-[hsl(var(--color-text))]">Funding Sources</h3>
            <p className="text-xs text-[hsl(var(--color-text-muted))]">Required funding by source (2020-2030)</p>
          </div>
          <div className="space-y-4">
            {fundingSources.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.source}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${s.color}`}><Icon className="h-3.5 w-3.5 text-white" /></div>
                      <span className="text-sm font-semibold text-[hsl(var(--color-text))]">{s.source}</span>
                    </div>
                    <div className="text-right"><span className="text-sm font-bold text-[hsl(var(--color-text))]">${s.amount}B</span><span className="ml-1 text-xs text-[hsl(var(--color-text-muted))]">({s.percentage}%)</span></div>
                  </div>
                  <div className="progress-bar"><div className={`absolute inset-y-0 left-0 rounded-full ${s.color}`} style={{ width: `${s.percentage}%` }} /></div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-[hsl(var(--color-border-light))]">
            <div className="flex items-center justify-between"><span className="text-sm font-bold text-[hsl(var(--color-text))]">Total Required</span><span className="text-sm font-bold text-[hsl(var(--color-primary))]">$62.0B</span></div>
          </div>
        </div>
      </div>

      <div className="card-elevated">
        <div className="mb-4">
          <h3 className="text-base font-bold text-[hsl(var(--color-text))]">Investment Requirements by Sector</h3>
          <p className="text-xs text-[hsl(var(--color-text-muted))]">Required vs committed funding (2020-2030, in $B)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--color-border))]">
                <th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Sector</th>
                <th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Required ($B)</th>
                <th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Committed ($B)</th>
                <th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Gap ($B)</th>
                <th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Funding Progress</th>
              </tr>
            </thead>
            <tbody>
              {sectorInvestments.map((s) => {
                const gap = s.required - s.committed;
                const pct = (s.committed / s.required) * 100;
                return (
                  <tr key={s.sector} className="border-b border-[hsl(var(--color-border-light))]">
                    <td className="py-3 text-xs font-semibold text-[hsl(var(--color-text))]">{s.sector}</td>
                    <td className="py-3 text-right text-xs text-[hsl(var(--color-text))]">${s.required.toFixed(1)}</td>
                    <td className="py-3 text-right text-xs font-semibold text-emerald-600">${s.committed.toFixed(1)}</td>
                    <td className="py-3 text-right text-xs font-semibold text-red-600">${gap.toFixed(1)}</td>
                    <td className="py-3"><div className="flex items-center gap-2"><div className="flex-1 progress-bar"><div className={`absolute inset-y-0 left-0 rounded-full ${s.color}`} style={{ width: `${pct}%` }} /></div><span className="text-xs font-semibold text-[hsl(var(--color-text))]">{pct.toFixed(0)}%</span></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
