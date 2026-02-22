"use client";

import { useState } from "react";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  Users,
  ScrollText,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Zap,
  Car,
  Trees,
  Wheat,
  Trash2,
  Droplets,
  ArrowRight,
  Lightbulb,
  Download,
} from "lucide-react";

type TrafficLight = "green" | "amber" | "red";
type GapType = "implementation" | "policy" | "finance" | "capacity";

interface SectorGap {
  sector: string;
  icon: React.ElementType;
  ndcTarget: number;
  currentProgress: number;
  gapMt: number;
  gapPercent: number;
  priority: "Critical" | "High" | "Medium" | "Low";
  trafficLight: TrafficLight;
  recommendedActions: string[];
  policyGap: string;
  financeRequired: number;
  financeCommitted: number;
  capacityNeeds: string[];
}

const sectorGaps: SectorGap[] = [
  { sector: "Energy", icon: Zap, ndcTarget: 12.8, currentProgress: 18.4, gapMt: -15.0, gapPercent: 30, priority: "Critical", trafficLight: "amber", recommendedActions: ["Accelerate renewable energy deployment from 87% to 100% grid share", "Implement energy efficiency standards for buildings and industry", "Scale up geothermal exploration and development"], policyGap: "Missing industrial energy efficiency regulations and building energy codes", financeRequired: 18.0, financeCommitted: 8.5, capacityNeeds: ["Grid modernization expertise", "Energy auditing capacity", "Regulatory enforcement"] },
  { sector: "Agriculture", icon: Wheat, ndcTarget: 10.6, currentProgress: 15.1, gapMt: -8.0, gapPercent: 42, priority: "Critical", trafficLight: "red", recommendedActions: ["Scale climate-smart agriculture to 60% of farmland", "Implement livestock methane reduction programs", "Expand agroforestry and soil carbon sequestration"], policyGap: "Climate-smart agriculture strategy only adopted, not fully implemented. No livestock methane policy.", financeRequired: 6.0, financeCommitted: 1.8, capacityNeeds: ["Extension services for CSA", "Methane measurement systems", "Soil carbon monitoring"] },
  { sector: "Transport", icon: Car, ndcTarget: 5.7, currentProgress: 8.2, gapMt: -5.5, gapPercent: 44, priority: "High", trafficLight: "red", recommendedActions: ["Implement public transit expansion in Nairobi and Mombasa", "Introduce fuel efficiency standards for vehicle imports", "Develop EV charging infrastructure nationwide"], policyGap: "Green Transport Strategy adopted but EV Policy still planned. No fuel efficiency standards.", financeRequired: 8.0, financeCommitted: 2.1, capacityNeeds: ["Transport planning capacity", "EV technical standards", "Public transit management"] },
  { sector: "Forestry (LULUCF)", icon: Trees, ndcTarget: -18.0, currentProgress: -12.5, gapMt: -5.5, gapPercent: 31, priority: "High", trafficLight: "amber", recommendedActions: ["Accelerate the 10% tree cover target implementation", "Strengthen community forest management programs", "Combat illegal logging through enhanced enforcement"], policyGap: "Forest Act in place but enforcement capacity limited. REDD+ strategy needs updating.", financeRequired: 4.0, financeCommitted: 2.2, capacityNeeds: ["Forest monitoring systems", "Community forest management", "REDD+ MRV"] },
  { sector: "Waste", icon: Trash2, ndcTarget: 3.4, currentProgress: 4.8, gapMt: -2.8, gapPercent: 29, priority: "Medium", trafficLight: "amber", recommendedActions: ["Expand waste-to-energy projects in major cities", "Implement organic waste diversion and composting", "Improve landfill gas capture systems"], policyGap: "No dedicated waste sector climate policy. Relying on general waste management regulations.", financeRequired: 1.5, financeCommitted: 0.4, capacityNeeds: ["Waste data collection systems", "Landfill engineering", "Circular economy expertise"] },
  { sector: "Water", icon: Droplets, ndcTarget: 0, currentProgress: 0, gapMt: 0, gapPercent: 0, priority: "Medium", trafficLight: "amber", recommendedActions: ["Integrate water-energy nexus in climate planning", "Expand water harvesting and storage infrastructure", "Implement climate-resilient water management"], policyGap: "Water sector adaptation plan exists but lacks climate mitigation integration.", financeRequired: 3.0, financeCommitted: 0.9, capacityNeeds: ["Water resource modeling", "Climate-resilient infrastructure design", "Watershed management"] },
];

const recommendations = [
  { priority: 1, title: "Scale Renewable Energy to 100% Grid Share", sectors: ["Energy"], impact: "5-8 MtCO2eq reduction", cost: "$4.5B", timeframe: "2025-2030", description: "Accelerate geothermal, solar, and wind deployment to achieve fully decarbonized electricity grid by 2030." },
  { priority: 2, title: "National Climate-Smart Agriculture Program", sectors: ["Agriculture"], impact: "4-6 MtCO2eq reduction", cost: "$2.8B", timeframe: "2025-2030", description: "Roll out CSA practices to 60% of farmland with extension services, inputs, and market linkages." },
  { priority: 3, title: "Urban Public Transit Transformation", sectors: ["Transport"], impact: "2-3 MtCO2eq reduction", cost: "$5.2B", timeframe: "2025-2032", description: "BRT systems for Nairobi and Mombasa, NMT infrastructure, and electric bus fleet procurement." },
  { priority: 4, title: "10% Tree Cover Campaign Acceleration", sectors: ["Forestry"], impact: "3-5 MtCO2eq sequestration", cost: "$1.5B", timeframe: "2025-2030", description: "Community-based reforestation, commercial forestry expansion, and urban greening programs." },
  { priority: 5, title: "Waste-to-Energy Program", sectors: ["Waste"], impact: "1-2 MtCO2eq reduction", cost: "$0.8B", timeframe: "2025-2028", description: "Waste-to-energy plants in 5 major cities, landfill gas capture, and organic waste diversion." },
];

function getTrafficLightClass(light: TrafficLight) {
  switch (light) { case "green": return "bg-emerald-500"; case "amber": return "bg-amber-500"; case "red": return "bg-red-500"; }
}

function getPriorityBadge(priority: string) {
  switch (priority) { case "Critical": return "badge-danger"; case "High": return "badge-warning"; case "Medium": return "badge-info"; default: return "badge-success"; }
}

export default function GapAnalysisPage() {
  const [expandedSector, setExpandedSector] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<GapType>("implementation");

  const totalGapMt = sectorGaps.reduce((sum, s) => sum + s.gapMt, 0);
  const totalFinanceRequired = sectorGaps.reduce((sum, s) => sum + s.financeRequired, 0);
  const totalFinanceCommitted = sectorGaps.reduce((sum, s) => sum + s.financeCommitted, 0);
  const financeGap = totalFinanceRequired - totalFinanceCommitted;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg shadow-red-500/20">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Gap Analysis</h1>
              <p className="text-sm text-[hsl(var(--color-text-muted))]">Comprehensive assessment of gaps between NDC targets and current trajectory</p>
            </div>
          </div>
        </div>
        <button className="btn-secondary"><Download className="h-4 w-4" />Export Report</button>
      </div>

      {/* Overall Ambition Gap */}
      <div className="card-elevated overflow-hidden">
        <div className="gradient-hero -m-6 p-6 text-white">
          <div className="flex items-center gap-2 mb-4"><Target className="h-5 w-5 text-indigo-300" /><h2 className="text-base font-bold">Overall Ambition Gap Assessment</h2></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center"><p className="text-3xl font-bold">143 <span className="text-sm font-normal text-indigo-200">MtCO2e</span></p><p className="text-xs text-indigo-300 mt-1">BAU Emissions (2030)</p></div>
            <div className="text-center"><p className="text-3xl font-bold">97 <span className="text-sm font-normal text-indigo-200">MtCO2e</span></p><p className="text-xs text-indigo-300 mt-1">Current Trajectory (WAM)</p></div>
            <div className="text-center"><p className="text-3xl font-bold text-amber-400">76 <span className="text-sm font-normal text-amber-200">MtCO2e</span></p><p className="text-xs text-amber-300 mt-1">NDC Conditional Target (2030)</p></div>
          </div>
          <div className="mt-5 rounded-lg bg-white/10 p-4">
            <div className="flex items-center justify-between mb-2"><span className="text-xs font-semibold text-indigo-200">Ambition Gap</span><span className="text-sm font-bold text-amber-400">21 MtCO2e</span></div>
            <div className="h-3 rounded-full bg-white/20 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" style={{ width: "68%" }} /></div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-indigo-300"><span>68% of conditional target pathway achieved</span><span>32% gap remaining</span></div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-lg bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] p-1">
        {([["implementation", "Implementation Gap", TrendingDown], ["policy", "Policy Gap", ScrollText], ["finance", "Finance Gap", DollarSign], ["capacity", "Capacity Gap", Users]] as [GapType, string, React.ElementType][]).map(([key, label, Icon]) => (
          <button key={key} onClick={() => setActiveTab(key)} className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold transition-all ${activeTab === key ? "bg-[hsl(var(--color-primary))] text-white shadow-sm" : "text-[hsl(var(--color-text-secondary))] hover:bg-[hsl(var(--color-surface-hover))]"}`}>
            <Icon className="h-3.5 w-3.5" />{label}
          </button>
        ))}
      </div>

      {/* Traffic Light Summary */}
      <div className="card-elevated">
        <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Sector Status Overview</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Traffic light assessment across all sectors</p></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {sectorGaps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.sector} className="card-interactive flex flex-col items-center gap-2 p-4 text-center" onClick={() => setExpandedSector(expandedSector === s.sector ? null : s.sector)}>
                <div className={`h-3 w-3 rounded-full ${getTrafficLightClass(s.trafficLight)}`} />
                <Icon className="h-5 w-5 text-[hsl(var(--color-text-secondary))]" />
                <span className="text-xs font-semibold text-[hsl(var(--color-text))]">{s.sector}</span>
                <span className={getPriorityBadge(s.priority)}>{s.priority}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Implementation Gap Table */}
      {activeTab === "implementation" && (
        <div className="card-elevated">
          <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Implementation Gap by Sector</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">NDC target vs current progress across sectors</p></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(var(--color-border))]">
                  <th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Sector</th>
                  <th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">NDC Target (MtCO2e)</th>
                  <th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Current (MtCO2e)</th>
                  <th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Gap (MtCO2e)</th>
                  <th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Gap (%)</th>
                  <th className="pb-3 text-center text-xs font-semibold text-[hsl(var(--color-text-muted))]">Status</th>
                  <th className="pb-3 text-center text-xs font-semibold text-[hsl(var(--color-text-muted))]">Priority</th>
                  <th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Key Action</th>
                </tr>
              </thead>
              <tbody>
                {sectorGaps.filter(s => s.gapMt !== 0).map((s) => {
                  const Icon = s.icon;
                  return (
                    <tr key={s.sector} className="border-b border-[hsl(var(--color-border-light))] hover:bg-[hsl(var(--color-surface-hover))] cursor-pointer" onClick={() => setExpandedSector(expandedSector === s.sector ? null : s.sector)}>
                      <td className="py-3"><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-[hsl(var(--color-primary-light))]" /><span className="text-xs font-semibold text-[hsl(var(--color-text))]">{s.sector}</span></div></td>
                      <td className="py-3 text-right text-xs text-[hsl(var(--color-text))]">{s.ndcTarget}</td>
                      <td className="py-3 text-right text-xs text-[hsl(var(--color-text))]">{s.currentProgress}</td>
                      <td className="py-3 text-right text-xs font-bold text-red-600">{s.gapMt}</td>
                      <td className="py-3 text-right text-xs font-semibold text-red-600">{s.gapPercent}%</td>
                      <td className="py-3 text-center"><div className={`mx-auto h-3 w-3 rounded-full ${getTrafficLightClass(s.trafficLight)}`} /></td>
                      <td className="py-3 text-center"><span className={getPriorityBadge(s.priority)}>{s.priority}</span></td>
                      <td className="py-3 text-xs text-[hsl(var(--color-text-secondary))] max-w-[200px] truncate">{s.recommendedActions[0]}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot><tr className="border-t-2 border-[hsl(var(--color-border))]"><td className="py-3 text-xs font-bold text-[hsl(var(--color-text))]">Total</td><td /><td /><td className="py-3 text-right text-xs font-bold text-red-600">{totalGapMt.toFixed(1)}</td><td colSpan={4} /></tr></tfoot>
            </table>
          </div>
          {expandedSector && (() => {
            const s = sectorGaps.find(sg => sg.sector === expandedSector);
            if (!s) return null;
            return (
              <div className="mt-4 rounded-lg border border-[hsl(var(--color-border))] p-4 animate-fade-up">
                <h4 className="text-sm font-bold text-[hsl(var(--color-text))] mb-3">{s.sector} - Detailed Gap Analysis</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div><p className="text-xs font-semibold text-[hsl(var(--color-text-muted))] uppercase tracking-wider mb-2">Recommended Actions</p><div className="space-y-1.5">{s.recommendedActions.map((a, i) => (<div key={i} className="flex items-start gap-2 text-xs text-[hsl(var(--color-text))]"><ArrowRight className="h-3 w-3 mt-0.5 text-[hsl(var(--color-primary-light))] flex-shrink-0" />{a}</div>))}</div></div>
                  <div><p className="text-xs font-semibold text-[hsl(var(--color-text-muted))] uppercase tracking-wider mb-2">Capacity Needs</p><div className="space-y-1.5">{s.capacityNeeds.map((c, i) => (<div key={i} className="flex items-start gap-2 text-xs text-[hsl(var(--color-text))]"><Users className="h-3 w-3 mt-0.5 text-purple-500 flex-shrink-0" />{c}</div>))}</div></div>
                  <div><p className="text-xs font-semibold text-[hsl(var(--color-text-muted))] uppercase tracking-wider mb-2">Finance Status</p><div className="space-y-2"><div className="flex justify-between text-xs"><span className="text-[hsl(var(--color-text-secondary))]">Required</span><span className="font-semibold text-[hsl(var(--color-text))]">${s.financeRequired}B</span></div><div className="flex justify-between text-xs"><span className="text-[hsl(var(--color-text-secondary))]">Committed</span><span className="font-semibold text-emerald-600">${s.financeCommitted}B</span></div><div className="flex justify-between text-xs"><span className="text-[hsl(var(--color-text-secondary))]">Gap</span><span className="font-bold text-red-600">${(s.financeRequired - s.financeCommitted).toFixed(1)}B</span></div><div className="progress-bar progress-bar-warning"><div className="progress-bar-fill" style={{ width: `${(s.financeCommitted / s.financeRequired) * 100}%` }} /></div></div></div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {activeTab === "policy" && (
        <div className="card-elevated">
          <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Policy Gap Assessment</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Which sectors need additional or strengthened policies</p></div>
          <div className="space-y-3">
            {sectorGaps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.sector} className="rounded-lg border border-[hsl(var(--color-border-light))] p-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${s.trafficLight === "green" ? "bg-emerald-50" : s.trafficLight === "amber" ? "bg-amber-50" : "bg-red-50"}`}>
                      <Icon className={`h-4 w-4 ${s.trafficLight === "green" ? "text-emerald-600" : s.trafficLight === "amber" ? "text-amber-600" : "text-red-600"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[hsl(var(--color-text))]">{s.sector}</span>
                        {s.trafficLight === "green" ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : s.trafficLight === "amber" ? <MinusCircle className="h-4 w-4 text-amber-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                      </div>
                      <p className="mt-1 text-xs text-[hsl(var(--color-text-secondary))]">{s.policyGap}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "finance" && (
        <div className="card-elevated">
          <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Finance Gap by Sector</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Required vs committed funding</p></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
            <div className="rounded-lg bg-indigo-50 p-4 text-center"><p className="text-2xl font-bold text-indigo-700">${totalFinanceRequired.toFixed(1)}B</p><p className="text-xs text-indigo-600">Total Required</p></div>
            <div className="rounded-lg bg-emerald-50 p-4 text-center"><p className="text-2xl font-bold text-emerald-700">${totalFinanceCommitted.toFixed(1)}B</p><p className="text-xs text-emerald-600">Total Committed</p></div>
            <div className="rounded-lg bg-red-50 p-4 text-center"><p className="text-2xl font-bold text-red-700">${financeGap.toFixed(1)}B</p><p className="text-xs text-red-600">Finance Gap</p></div>
          </div>
          <div className="space-y-4">
            {sectorGaps.map((s) => (
              <div key={s.sector}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-[hsl(var(--color-text))]">{s.sector}</span>
                  <div className="flex items-center gap-3 text-xs"><span className="text-emerald-600 font-semibold">${s.financeCommitted}B committed</span><span className="text-[hsl(var(--color-text-muted))]">of ${s.financeRequired}B needed</span></div>
                </div>
                <div className="progress-bar"><div className="absolute inset-y-0 left-0 rounded-full bg-emerald-500" style={{ width: `${(s.financeCommitted / s.financeRequired) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "capacity" && (
        <div className="card-elevated">
          <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Institutional Capacity Gaps</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Key capacity building needs by sector</p></div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sectorGaps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.sector} className="rounded-lg border border-[hsl(var(--color-border-light))] p-4">
                  <div className="flex items-center gap-2 mb-3"><Icon className="h-4 w-4 text-[hsl(var(--color-primary-light))]" /><span className="text-sm font-bold text-[hsl(var(--color-text))]">{s.sector}</span></div>
                  <div className="space-y-2">{s.capacityNeeds.map((need, i) => (<div key={i} className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--color-primary-light))]" /><span className="text-xs text-[hsl(var(--color-text-secondary))]">{need}</span></div>))}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prioritized Recommendations */}
      <div className="card-elevated">
        <div className="flex items-center gap-2 mb-4"><Lightbulb className="h-5 w-5 text-amber-500" /><div><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Prioritized Recommendations</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Top actions to close the NDC implementation gap</p></div></div>
        <div className="stagger-children space-y-3">
          {recommendations.map((rec) => (
            <div key={rec.priority} className="rounded-lg border border-[hsl(var(--color-border-light))] p-4 hover:border-[hsl(var(--color-primary-lighter))] transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-sm font-bold flex-shrink-0">{rec.priority}</div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[hsl(var(--color-text))]">{rec.title}</h4>
                  <p className="mt-1 text-xs text-[hsl(var(--color-text-secondary))]">{rec.description}</p>
                  <div className="mt-2 flex items-center gap-4 text-[11px] text-[hsl(var(--color-text-muted))]">
                    <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" />{rec.impact}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{rec.cost}</span>
                    <span className="flex items-center gap-1"><Target className="h-3 w-3" />{rec.timeframe}</span>
                    {rec.sectors.map((s) => (<span key={s} className="badge-primary">{s}</span>))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
