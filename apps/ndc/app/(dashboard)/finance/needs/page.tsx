"use client";

import { useState } from "react";
import {
  Wallet,
  DollarSign,
  TrendingUp,
  Zap,
  Car,
  Trees,
  Wheat,
  Droplets,
  Heart,
  ArrowUpRight,
  ChevronRight,
  Shield,
  Globe2,
  Download,
  BarChart3,
} from "lucide-react";

interface SectorNeed {
  sector: string;
  icon: React.ElementType;
  totalNeed: number;
  committed: number;
  gap: number;
  domesticPercent: number;
  internationalPercent: number;
  mitigationShare: number;
  adaptationShare: number;
  priorityInvestments: string[];
}

const sectorNeeds: SectorNeed[] = [
  { sector: "Energy", icon: Zap, totalNeed: 18.0, committed: 8.5, gap: 9.5, domesticPercent: 25, internationalPercent: 75, mitigationShare: 15.0, adaptationShare: 3.0, priorityInvestments: ["Geothermal power expansion ($5.2B)", "Solar PV and wind farms ($4.8B)", "Grid modernization ($3.5B)", "Energy efficiency programs ($2.2B)", "Clean cooking solutions ($2.3B)"] },
  { sector: "Transport", icon: Car, totalNeed: 8.0, committed: 2.1, gap: 5.9, domesticPercent: 30, internationalPercent: 70, mitigationShare: 7.0, adaptationShare: 1.0, priorityInvestments: ["BRT systems ($3.5B)", "EV charging infrastructure ($1.8B)", "Non-motorized transport ($1.2B)", "Rail electrification ($1.5B)"] },
  { sector: "Agriculture", icon: Wheat, totalNeed: 6.0, committed: 1.8, gap: 4.2, domesticPercent: 40, internationalPercent: 60, mitigationShare: 2.5, adaptationShare: 3.5, priorityInvestments: ["Climate-smart agriculture ($2.8B)", "Irrigation infrastructure ($1.5B)", "Agricultural insurance ($0.8B)", "Post-harvest loss reduction ($0.9B)"] },
  { sector: "Forestry", icon: Trees, totalNeed: 4.0, committed: 2.2, gap: 1.8, domesticPercent: 35, internationalPercent: 65, mitigationShare: 3.0, adaptationShare: 1.0, priorityInvestments: ["Reforestation programs ($1.5B)", "Community forest management ($1.0B)", "REDD+ implementation ($0.8B)", "Forest monitoring systems ($0.7B)"] },
  { sector: "Water", icon: Droplets, totalNeed: 3.0, committed: 0.9, gap: 2.1, domesticPercent: 45, internationalPercent: 55, mitigationShare: 0.5, adaptationShare: 2.5, priorityInvestments: ["Water storage infrastructure ($1.2B)", "Flood management systems ($0.8B)", "Water-efficient irrigation ($0.6B)", "Watershed management ($0.4B)"] },
  { sector: "Health", icon: Heart, totalNeed: 1.0, committed: 0.3, gap: 0.7, domesticPercent: 50, internationalPercent: 50, mitigationShare: 0.0, adaptationShare: 1.0, priorityInvestments: ["Climate-resilient health infrastructure ($0.4B)", "Early warning systems ($0.3B)", "Disease surveillance ($0.3B)"] },
];

const totalNeed = 62.0;
const mitigationTotal = 40.0;
const adaptationTotal = 22.0;

const conditionalNeeds = {
  unconditional: { amount: 19.5, description: "Domestic resources + baseline international support" },
  conditional: { amount: 42.5, description: "Requires additional international climate finance" },
};

const priorityInvestments = [
  { rank: 1, name: "Geothermal Power Expansion", sector: "Energy", amount: 5.2, impact: "3.2 MtCO2eq", bcr: 2.8 },
  { rank: 2, name: "Solar and Wind Deployment", sector: "Energy", amount: 4.8, impact: "2.8 MtCO2eq", bcr: 2.4 },
  { rank: 3, name: "BRT System Development", sector: "Transport", amount: 3.5, impact: "1.5 MtCO2eq", bcr: 1.9 },
  { rank: 4, name: "Grid Modernization", sector: "Energy", amount: 3.5, impact: "1.8 MtCO2eq", bcr: 2.1 },
  { rank: 5, name: "Climate-Smart Agriculture Scale-up", sector: "Agriculture", amount: 2.8, impact: "2.2 MtCO2eq", bcr: 1.7 },
  { rank: 6, name: "Clean Cooking Transition", sector: "Energy", amount: 2.3, impact: "2.4 MtCO2eq", bcr: 3.1 },
  { rank: 7, name: "Energy Efficiency Programs", sector: "Energy", amount: 2.2, impact: "1.5 MtCO2eq", bcr: 2.6 },
  { rank: 8, name: "EV Infrastructure", sector: "Transport", amount: 1.8, impact: "0.8 MtCO2eq", bcr: 1.2 },
  { rank: 9, name: "Reforestation Programs", sector: "Forestry", amount: 1.5, impact: "3.5 MtCO2eq", bcr: 3.8 },
  { rank: 10, name: "Irrigation Infrastructure", sector: "Agriculture", amount: 1.5, impact: "Adaptation", bcr: 1.5 },
];

export default function FinanceNeedsPage() {
  const [expandedSector, setExpandedSector] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20"><Wallet className="h-5 w-5 text-white" /></div>
            <div><h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Finance Needs Assessment</h1><p className="text-sm text-[hsl(var(--color-text-muted))]">NDC implementation finance requirements (2020-2030)</p></div>
          </div>
        </div>
        <button className="btn-secondary"><Download className="h-4 w-4" />Export Assessment</button>
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="gradient-hero -m-6 p-6 text-white">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center md:text-left"><p className="text-xs text-indigo-300 uppercase tracking-wider font-semibold mb-1">Total Finance Need</p><p className="text-4xl font-bold">${totalNeed}B</p><p className="text-sm text-indigo-200 mt-1">2020-2030 NDC Implementation</p></div>
            <div className="text-center"><p className="text-xs text-emerald-300 uppercase tracking-wider font-semibold mb-1">Mitigation</p><p className="text-3xl font-bold text-emerald-400">${mitigationTotal}B</p><p className="text-sm text-indigo-200 mt-1">{((mitigationTotal / totalNeed) * 100).toFixed(0)}% of total</p></div>
            <div className="text-center md:text-right"><p className="text-xs text-amber-300 uppercase tracking-wider font-semibold mb-1">Adaptation</p><p className="text-3xl font-bold text-amber-400">${adaptationTotal}B</p><p className="text-sm text-indigo-200 mt-1">{((adaptationTotal / totalNeed) * 100).toFixed(0)}% of total</p></div>
          </div>
          <div className="mt-5 h-4 rounded-full bg-white/10 overflow-hidden flex">
            <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: `${(mitigationTotal / totalNeed) * 100}%` }} />
            <div className="h-full bg-amber-500 rounded-r-full" style={{ width: `${(adaptationTotal / totalNeed) * 100}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-indigo-300"><span>Mitigation ({((mitigationTotal / totalNeed) * 100).toFixed(0)}%)</span><span>Adaptation ({((adaptationTotal / totalNeed) * 100).toFixed(0)}%)</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="card-elevated">
          <div className="flex items-center gap-3 mb-3"><div className="icon-container-md bg-indigo-50"><Shield className="h-5 w-5 text-indigo-600" /></div><div><h3 className="text-sm font-bold text-[hsl(var(--color-text))]">Unconditional Needs</h3><p className="text-[11px] text-[hsl(var(--color-text-muted))]">{conditionalNeeds.unconditional.description}</p></div></div>
          <p className="text-3xl font-bold text-[hsl(var(--color-primary))]">${conditionalNeeds.unconditional.amount}B</p>
          <div className="mt-3 progress-bar"><div className="progress-bar-fill animate-progress-fill" style={{ width: `${(conditionalNeeds.unconditional.amount / totalNeed) * 100}%` }} /></div>
          <p className="mt-1 text-[11px] text-[hsl(var(--color-text-muted))]">{((conditionalNeeds.unconditional.amount / totalNeed) * 100).toFixed(0)}% of total need</p>
        </div>
        <div className="card-elevated">
          <div className="flex items-center gap-3 mb-3"><div className="icon-container-md bg-amber-50"><Globe2 className="h-5 w-5 text-amber-600" /></div><div><h3 className="text-sm font-bold text-[hsl(var(--color-text))]">Conditional Needs</h3><p className="text-[11px] text-[hsl(var(--color-text-muted))]">{conditionalNeeds.conditional.description}</p></div></div>
          <p className="text-3xl font-bold text-amber-600">${conditionalNeeds.conditional.amount}B</p>
          <div className="mt-3 progress-bar progress-bar-warning"><div className="progress-bar-fill animate-progress-fill" style={{ width: `${(conditionalNeeds.conditional.amount / totalNeed) * 100}%` }} /></div>
          <p className="mt-1 text-[11px] text-[hsl(var(--color-text-muted))]">{((conditionalNeeds.conditional.amount / totalNeed) * 100).toFixed(0)}% of total need</p>
        </div>
      </div>

      <div className="card-elevated">
        <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Sector Breakdown</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Finance needs by sector with domestic and international split</p></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--color-border))]">
                <th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Sector</th>
                <th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Need ($B)</th>
                <th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Committed ($B)</th>
                <th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Gap ($B)</th>
                <th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Domestic %</th>
                <th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">International %</th>
                <th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Funding Progress</th>
                <th className="pb-3 text-center text-xs font-semibold text-[hsl(var(--color-text-muted))]" />
              </tr>
            </thead>
            <tbody>
              {sectorNeeds.map((s) => {
                const Icon = s.icon;
                const pct = (s.committed / s.totalNeed) * 100;
                const isExpanded = expandedSector === s.sector;
                return (
                  <tr key={s.sector} className="border-b border-[hsl(var(--color-border-light))] hover:bg-[hsl(var(--color-surface-hover))] cursor-pointer" onClick={() => setExpandedSector(isExpanded ? null : s.sector)}>
                    <td className="py-3"><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-[hsl(var(--color-primary-light))]" /><span className="text-xs font-semibold text-[hsl(var(--color-text))]">{s.sector}</span></div></td>
                    <td className="py-3 text-right text-xs font-semibold text-[hsl(var(--color-text))]">${s.totalNeed.toFixed(1)}</td>
                    <td className="py-3 text-right text-xs font-semibold text-emerald-600">${s.committed.toFixed(1)}</td>
                    <td className="py-3 text-right text-xs font-bold text-red-600">${s.gap.toFixed(1)}</td>
                    <td className="py-3 text-right text-xs text-[hsl(var(--color-text))]">{s.domesticPercent}%</td>
                    <td className="py-3 text-right text-xs text-[hsl(var(--color-text))]">{s.internationalPercent}%</td>
                    <td className="py-3"><div className="flex items-center gap-2"><div className="flex-1 progress-bar"><div className="absolute inset-y-0 left-0 rounded-full bg-emerald-500" style={{ width: `${pct}%` }} /></div><span className="text-xs font-semibold text-[hsl(var(--color-text))]">{pct.toFixed(0)}%</span></div></td>
                    <td className="py-3 text-center"><ChevronRight className={`h-4 w-4 text-[hsl(var(--color-text-muted))] transition-transform ${isExpanded ? "rotate-90" : ""}`} /></td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot><tr className="border-t-2 border-[hsl(var(--color-border))]"><td className="py-3 text-xs font-bold text-[hsl(var(--color-text))]">Total</td><td className="py-3 text-right text-xs font-bold text-[hsl(var(--color-text))]">${totalNeed.toFixed(1)}</td><td className="py-3 text-right text-xs font-bold text-emerald-600">${sectorNeeds.reduce((s, n) => s + n.committed, 0).toFixed(1)}</td><td className="py-3 text-right text-xs font-bold text-red-600">${sectorNeeds.reduce((s, n) => s + n.gap, 0).toFixed(1)}</td><td colSpan={4} /></tr></tfoot>
          </table>
        </div>
        {expandedSector && (() => {
          const s = sectorNeeds.find(sn => sn.sector === expandedSector);
          if (!s) return null;
          return (
            <div className="mt-4 rounded-lg bg-[hsl(var(--color-primary-50))] p-4 animate-fade-up">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div><p className="text-xs font-semibold text-[hsl(var(--color-text-muted))] uppercase tracking-wider mb-2">Priority Investments</p><div className="space-y-1.5">{s.priorityInvestments.map((inv, i) => (<div key={i} className="flex items-center gap-2 text-xs text-[hsl(var(--color-text))]"><ArrowUpRight className="h-3 w-3 text-[hsl(var(--color-primary-light))] flex-shrink-0" />{inv}</div>))}</div></div>
                <div><p className="text-xs font-semibold text-[hsl(var(--color-text-muted))] uppercase tracking-wider mb-2">Mitigation vs Adaptation</p><div className="space-y-2"><div className="flex justify-between text-xs"><span className="text-emerald-700">Mitigation</span><span className="font-semibold">${s.mitigationShare}B</span></div><div className="flex justify-between text-xs"><span className="text-amber-700">Adaptation</span><span className="font-semibold">${s.adaptationShare}B</span></div><div className="h-3 rounded-full bg-gray-100 overflow-hidden flex"><div className="h-full bg-emerald-500" style={{ width: `${(s.mitigationShare / s.totalNeed) * 100}%` }} /><div className="h-full bg-amber-500" style={{ width: `${(s.adaptationShare / s.totalNeed) * 100}%` }} /></div></div></div>
              </div>
            </div>
          );
        })()}
      </div>

      <div className="card-elevated">
        <div className="flex items-center gap-2 mb-4"><BarChart3 className="h-5 w-5 text-[hsl(var(--color-primary-light))]" /><div><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Priority Investments Ranked</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Top investments by impact and cost-effectiveness</p></div></div>
        <div className="stagger-children space-y-2">
          {priorityInvestments.map((inv) => (
            <div key={inv.rank} className="flex items-center gap-4 rounded-lg border border-[hsl(var(--color-border-light))] p-3 hover:border-[hsl(var(--color-primary-lighter))] transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-sm font-bold flex-shrink-0">{inv.rank}</div>
              <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-[hsl(var(--color-text))] truncate">{inv.name}</p><p className="text-[11px] text-[hsl(var(--color-text-muted))]">{inv.sector}</p></div>
              <div className="flex items-center gap-6 flex-shrink-0 text-xs">
                <div className="text-right"><p className="font-bold text-[hsl(var(--color-text))]">${inv.amount}B</p><p className="text-[10px] text-[hsl(var(--color-text-muted))]">Investment</p></div>
                <div className="text-right"><p className="font-bold text-emerald-600">{inv.impact}</p><p className="text-[10px] text-[hsl(var(--color-text-muted))]">Impact</p></div>
                <div className="text-right"><p className="font-bold text-[hsl(var(--color-primary))]">{inv.bcr}x</p><p className="text-[10px] text-[hsl(var(--color-text-muted))]">BCR</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
