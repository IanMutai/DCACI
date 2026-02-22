"use client";

import { useState } from "react";
import {
  ScrollText,
  Filter,
  Search,
  ChevronRight,
  Zap,
  Car,
  Trees,
  Wheat,
  Flame,
  Leaf,
  BarChart3,
  Calendar,
  Target,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Plus,
  Download,
} from "lucide-react";

type PolicyStatus = "implemented" | "adopted" | "planned" | "evaluated";
type PolicyType = "regulatory" | "economic" | "information" | "voluntary" | "market";
type Sector = "Energy" | "Transport" | "LULUCF" | "Agriculture" | "Cross-cutting" | "Adaptation" | "Market" | "Waste";

interface Policy {
  id: number;
  name: string;
  sector: Sector;
  type: PolicyType;
  status: PolicyStatus;
  startDate: string;
  ghgImpact: number | null;
  description: string;
  linkedTargets: string[];
  timelineStage: number;
}

const policies: Policy[] = [
  /* ── Core Legal Framework ── */
  { id: 1, name: "Climate Change Act 2016 (amended 2023)", sector: "Cross-cutting", type: "regulatory", status: "implemented", startDate: "2016-05-27", ghgImpact: null, description: "Kenya's foundational climate legislation establishing the National Climate Change Council, Climate Change Directorate, and Climate Change Fund. The 2023 amendment strengthened carbon markets provisions and county-level climate action planning requirements.", linkedTargets: ["Overall NDC governance", "Institutional capacity", "Climate mainstreaming"], timelineStage: 3 },
  { id: 2, name: "NCCAP III (2023-2027)", sector: "Cross-cutting", type: "regulatory", status: "implemented", startDate: "2023-01-01", ghgImpact: null, description: "Third National Climate Change Action Plan providing the implementation framework for Kenya's Updated NDC (2020). Covers mitigation actions across energy, transport, agriculture, forestry, industry, and waste sectors with prioritized actions and costed interventions totaling $62B.", linkedTargets: ["32% GHG reduction by 2030", "All sector mitigation targets", "Adaptation resilience"], timelineStage: 2 },
  /* ── Energy Sector ── */
  { id: 3, name: "Energy Act 2019", sector: "Energy", type: "regulatory", status: "implemented", startDate: "2019-03-12", ghgImpact: 12.5, description: "Consolidated energy legislation establishing EPRA, promoting renewable energy, energy efficiency, and rural electrification. Mandates feed-in tariffs and net metering for distributed generation. Supports Kenya's 48.1 MtCO2e energy sector mitigation target.", linkedTargets: ["Energy sector 48.1 MtCO2e reduction", "100% renewable electricity", "Energy access"], timelineStage: 2 },
  { id: 4, name: "Feed-in Tariff / REFIT Policy (revised 2021)", sector: "Energy", type: "economic", status: "implemented", startDate: "2012-01-01", ghgImpact: 8.2, description: "Guaranteed purchase tariffs for electricity from solar, wind, biomass, geothermal, and small hydro. Revised in 2021 to include auction-based pricing for large-scale projects. Contributed to Lake Turkana Wind (310 MW) and other IPP developments.", linkedTargets: ["Renewable energy generation capacity", "Grid decarbonization"], timelineStage: 3 },
  { id: 5, name: "National Clean Cooking Strategy (2019)", sector: "Energy", type: "information", status: "implemented", startDate: "2019-05-01", ghgImpact: 3.6, description: "Targets transition from traditional biomass to LPG, bioethanol, electric, and improved cookstoves. Goal of universal clean cooking access. Addresses health (4M+ households affected by indoor air pollution) and deforestation from charcoal.", linkedTargets: ["Clean cooking access", "Household emissions reduction", "Forest conservation"], timelineStage: 2 },
  /* ── Forestry / LULUCF ── */
  { id: 6, name: "Forest Conservation & Management Act 2016", sector: "LULUCF", type: "regulatory", status: "implemented", startDate: "2016-09-01", ghgImpact: 10.4, description: "Legal framework for sustainable forest management including community forests, benefit sharing, and restoration targets. Mandates 30% national forest cover by 2032 (from current ~8.8%). Supports LULUCF mitigation potential of 20.8 MtCO2e by 2030.", linkedTargets: ["30% forest cover by 2032", "20.8 MtCO2e LULUCF reduction", "REDD+ implementation"], timelineStage: 2 },
  /* ── Carbon Markets ── */
  { id: 7, name: "Carbon Markets Regulations 2024", sector: "Market", type: "market", status: "implemented", startDate: "2024-07-01", ghgImpact: null, description: "Regulatory framework for domestic and international carbon trading under Article 6 of the Paris Agreement. Establishes 25% benefit-sharing with local communities, national registry requirements, and corresponding adjustments mechanism. Positions Kenya as a regional carbon market leader.", linkedTargets: ["Article 6 readiness", "Carbon credit integrity", "NDC financing"], timelineStage: 2 },
  /* ── Long-term Strategy ── */
  { id: 8, name: "LT-LEDS 2022 (Net-Zero by 2050)", sector: "Cross-cutting", type: "regulatory", status: "adopted", startDate: "2022-11-01", ghgImpact: null, description: "Kenya's Long-Term Low Emission Development Strategy targeting net-zero GHG emissions by 2050. Outlines pathways for deep decarbonization across energy (100% RE), transport (full electrification), industry (green hydrogen), and enhanced natural sinks. Submitted to UNFCCC at COP27.", linkedTargets: ["Net-zero by 2050", "All sector long-term decarbonization"], timelineStage: 1 },
  /* ── Transport ── */
  { id: 9, name: "Integrated National Transport Policy (2023)", sector: "Transport", type: "regulatory", status: "adopted", startDate: "2023-11-01", ghgImpact: 2.4, description: "Policy framework for low-carbon transport including BRT systems, fuel efficiency standards, NMT promotion, and railway modernization. Supports the 4.7 MtCO2e transport sector mitigation target by 2030.", linkedTargets: ["Transport 4.7 MtCO2e reduction", "Modal shift", "EV adoption"], timelineStage: 1 },
  /* ── Agriculture ── */
  { id: 10, name: "Climate-Smart Agriculture Strategy (2023)", sector: "Agriculture", type: "voluntary", status: "adopted", startDate: "2023-06-01", ghgImpact: 4.8, description: "Promotes CSA practices including improved livestock feed, agroforestry, soil carbon management, and water-efficient rice cultivation. Targets 9.7 MtCO2e agriculture sector mitigation by 2030 while enhancing food security and farmer resilience.", linkedTargets: ["Agriculture 9.7 MtCO2e reduction", "Food security", "Farmer resilience"], timelineStage: 1 },
  /* ── Waste ── */
  { id: 11, name: "National Solid Waste Management Strategy (2022)", sector: "Waste", type: "regulatory", status: "adopted", startDate: "2022-03-01", ghgImpact: 0.8, description: "Framework for landfill gas capture, composting, and waste-to-energy projects. Targets 0.8 MtCO2e waste sector mitigation by 2030. Includes extended producer responsibility and circular economy principles.", linkedTargets: ["Waste 0.8 MtCO2e reduction", "Circular economy", "Methane capture"], timelineStage: 1 },
  /* ── Adaptation ── */
  { id: 12, name: "Kenya National Adaptation Plan (2015-2030)", sector: "Adaptation", type: "regulatory", status: "implemented", startDate: "2015-07-01", ghgImpact: null, description: "Long-term adaptation framework addressing climate risks in agriculture, water resources, health, infrastructure, and ecosystems. Integrates county-level adaptation planning with national priorities. Total adaptation cost estimated at $40B over 2020-2030.", linkedTargets: ["Climate resilience", "Adaptation mainstreaming", "County adaptation plans"], timelineStage: 2 },
];

const statusConfig: Record<PolicyStatus, { label: string; badgeClass: string }> = {
  implemented: { label: "Implemented", badgeClass: "badge-on-track" },
  adopted: { label: "Adopted", badgeClass: "badge-at-risk" },
  planned: { label: "Planned", badgeClass: "badge-info" },
  evaluated: { label: "Evaluated", badgeClass: "badge-success" },
};

const typeConfig: Record<PolicyType, { label: string; color: string }> = {
  regulatory: { label: "Regulatory", color: "bg-indigo-100 text-indigo-700" },
  economic: { label: "Economic", color: "bg-emerald-100 text-emerald-700" },
  information: { label: "Information", color: "bg-sky-100 text-sky-700" },
  voluntary: { label: "Voluntary", color: "bg-purple-100 text-purple-700" },
  market: { label: "Market-based", color: "bg-amber-100 text-amber-700" },
};

const sectorIcons: Record<string, React.ElementType> = {
  Energy: Zap, Transport: Car, LULUCF: Trees, Agriculture: Wheat, "Cross-cutting": Leaf, Adaptation: Leaf, Market: BarChart3, Waste: Flame,
};

const timelineStages = ["Planned", "Adopted", "Implemented", "Evaluated"];

export default function PolicyMeasuresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSector, setFilterSector] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [expandedPolicy, setExpandedPolicy] = useState<number | null>(null);

  const sectors = Array.from(new Set(policies.map((p) => p.sector)));
  const types = Array.from(new Set(policies.map((p) => p.type)));
  const statuses: PolicyStatus[] = ["implemented", "adopted", "planned", "evaluated"];

  const filteredPolicies = policies.filter((p) => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterSector !== "all" && p.sector !== filterSector) return false;
    if (filterType !== "all" && p.type !== filterType) return false;
    if (filterStatus !== "all" && p.status !== filterStatus) return false;
    return true;
  });

  const counts = {
    total: policies.length,
    implemented: policies.filter((p) => p.status === "implemented").length,
    adopted: policies.filter((p) => p.status === "adopted").length,
    planned: policies.filter((p) => p.status === "planned").length,
  };

  const totalGHGImpact = policies.reduce((sum, p) => sum + (p.ghgImpact || 0), 0);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/20">
              <ScrollText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Policy Measures</h1>
              <p className="text-sm text-[hsl(var(--color-text-muted))]">Track and manage NDC policy implementation across all sectors</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary"><Download className="h-4 w-4" />Export</button>
          <button className="btn-primary"><Plus className="h-4 w-4" />Add Policy</button>
        </div>
      </div>

      <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="card-elevated">
          <div className="flex items-center gap-3">
            <div className="icon-container-md bg-indigo-50"><ScrollText className="h-5 w-5 text-indigo-600" /></div>
            <div><p className="text-2xl font-bold text-[hsl(var(--color-text))]">{counts.total}</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Total Policies</p></div>
          </div>
        </div>
        <div className="card-elevated">
          <div className="flex items-center gap-3">
            <div className="icon-container-md bg-emerald-50"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div>
            <div><p className="text-2xl font-bold text-emerald-600">{counts.implemented}</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Implemented</p></div>
          </div>
        </div>
        <div className="card-elevated">
          <div className="flex items-center gap-3">
            <div className="icon-container-md bg-amber-50"><Clock className="h-5 w-5 text-amber-600" /></div>
            <div><p className="text-2xl font-bold text-amber-600">{counts.adopted}</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Adopted</p></div>
          </div>
        </div>
        <div className="card-elevated">
          <div className="flex items-center gap-3">
            <div className="icon-container-md bg-blue-50"><AlertCircle className="h-5 w-5 text-blue-600" /></div>
            <div><p className="text-2xl font-bold text-blue-600">{counts.planned}</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Planned</p></div>
          </div>
        </div>
        <div className="card-elevated">
          <div className="flex items-center gap-3">
            <div className="icon-container-md bg-green-50"><TrendingUp className="h-5 w-5 text-green-600" /></div>
            <div><p className="text-2xl font-bold text-green-600">{totalGHGImpact.toFixed(1)}</p><p className="text-xs text-[hsl(var(--color-text-muted))]">MtCO2eq Reduced</p></div>
          </div>
        </div>
      </div>

      <div className="card-elevated">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[hsl(var(--color-text-muted))]" />
            <span className="text-sm font-semibold text-[hsl(var(--color-text))]">Filters</span>
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-text-muted))]" />
            <input type="text" placeholder="Search policies..." className="input-field pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <select className="input-field w-auto" value={filterSector} onChange={(e) => setFilterSector(e.target.value)}>
            <option value="all">All Sectors</option>
            {sectors.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
          <select className="input-field w-auto" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            {types.map((t) => (<option key={t} value={t}>{typeConfig[t].label}</option>))}
          </select>
          <select className="input-field w-auto" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            {statuses.map((s) => (<option key={s} value={s}>{statusConfig[s].label}</option>))}
          </select>
        </div>
      </div>

      <div className="stagger-children space-y-4">
        {filteredPolicies.map((policy) => {
          const SectorIcon = sectorIcons[policy.sector] || ScrollText;
          const isExpanded = expandedPolicy === policy.id;
          return (
            <div key={policy.id} className="card-interactive cursor-pointer" onClick={() => setExpandedPolicy(isExpanded ? null : policy.id)}>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--color-primary-50))]">
                  <SectorIcon className="h-5 w-5 text-[hsl(var(--color-primary-light))]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-[hsl(var(--color-text))]">{policy.name}</h3>
                        <span className={statusConfig[policy.status].badgeClass}>{statusConfig[policy.status].label}</span>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${typeConfig[policy.type].color}`}>{typeConfig[policy.type].label}</span>
                      </div>
                      <p className="mt-1 text-xs text-[hsl(var(--color-text-muted))]">{policy.description}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      {policy.ghgImpact && (
                        <div className="text-right">
                          <p className="text-lg font-bold text-emerald-600">{policy.ghgImpact}</p>
                          <p className="text-[10px] text-[hsl(var(--color-text-muted))]">MtCO2eq reduced</p>
                        </div>
                      )}
                      <ChevronRight className={`h-5 w-5 text-[hsl(var(--color-text-muted))] transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs text-[hsl(var(--color-text-muted))]">
                    <span className="flex items-center gap-1"><Leaf className="h-3 w-3" />{policy.sector}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(policy.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                    {policy.linkedTargets.length > 0 && <span className="flex items-center gap-1"><Target className="h-3 w-3" />{policy.linkedTargets.length} linked targets</span>}
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-1">
                      {timelineStages.map((stage, idx) => (
                        <div key={stage} className="flex items-center flex-1">
                          <div className="flex flex-col items-center flex-1">
                            <div className={`h-2 w-full rounded-full ${idx <= policy.timelineStage ? idx === policy.timelineStage ? "bg-gradient-to-r from-indigo-500 to-blue-500" : "bg-emerald-500" : "bg-[hsl(var(--color-border-light))]"}`} />
                            <span className={`mt-1 text-[10px] ${idx <= policy.timelineStage ? "font-semibold text-[hsl(var(--color-text))]" : "text-[hsl(var(--color-text-muted))]"}`}>{stage}</span>
                          </div>
                          {idx < timelineStages.length - 1 && <ArrowRight className={`h-3 w-3 mx-1 flex-shrink-0 ${idx < policy.timelineStage ? "text-emerald-500" : "text-[hsl(var(--color-border))]"}`} />}
                        </div>
                      ))}
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="mt-4 border-t border-[hsl(var(--color-border-light))] pt-4 animate-fade-up">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-2">Linked Targets</h4>
                          <div className="space-y-1.5">
                            {policy.linkedTargets.map((target) => (
                              <div key={target} className="flex items-center gap-2 text-xs text-[hsl(var(--color-text))]"><Target className="h-3 w-3 text-[hsl(var(--color-primary-light))]" />{target}</div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-2">Impact Assessment</h4>
                          {policy.ghgImpact ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-[hsl(var(--color-text-secondary))]">Direct GHG Reduction</span>
                                <span className="font-semibold text-emerald-600">{policy.ghgImpact} MtCO2eq/yr</span>
                              </div>
                              <div className="progress-bar progress-bar-success"><div className="progress-bar-fill" style={{ width: `${Math.min((policy.ghgImpact / 10) * 100, 100)}%` }} /></div>
                            </div>
                          ) : (
                            <p className="text-xs text-[hsl(var(--color-text-muted))]">Impact assessment pending or not directly quantifiable</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filteredPolicies.length === 0 && (
        <div className="card-elevated text-center py-12">
          <Search className="mx-auto h-8 w-8 text-[hsl(var(--color-text-muted))]" />
          <p className="mt-2 text-sm font-semibold text-[hsl(var(--color-text))]">No policies found</p>
          <p className="text-xs text-[hsl(var(--color-text-muted))]">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
