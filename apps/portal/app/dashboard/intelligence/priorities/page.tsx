"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Leaf,
  Factory,
  Truck,
  Trash2,
  Building2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Globe,
  Shield,
  Lightbulb,
  Award,
  RefreshCw,
  Download,
  ChevronRight,
} from "lucide-react";

interface SectorPotential {
  sector: string;
  icon: typeof Zap;
  currentEmissions: number;
  reductionPotential: number;
  investmentRequired: number;
  costEffectiveness: number;
  timeToImpact: "SHORT" | "MEDIUM" | "LONG";
  readinessLevel: "HIGH" | "MEDIUM" | "LOW";
  cobenefits: string[];
  priorityScore: number;
  recommendation: "PRIORITY" | "INVEST" | "MAINTAIN" | "DEPRIORITIZE";
  keyActions: string[];
  fundingSources: string[];
}

interface StrategicGap {
  area: string;
  currentState: string;
  targetState: string;
  gap: number;
  impact: "HIGH" | "MEDIUM" | "LOW";
  fiscalImplication: number;
  recommendation: string;
}

interface FiscalOpportunity {
  id: string;
  title: string;
  type: "REVENUE" | "SAVINGS" | "EFFICIENCY" | "MOBILIZATION";
  potentialValue: number;
  timeframe: string;
  confidence: number;
  description: string;
  requirements: string[];
}

const sectorPotentials: SectorPotential[] = [
  {
    sector: "Energy",
    icon: Zap,
    currentEmissions: 15200000,
    reductionPotential: 8500000,
    investmentRequired: 450000000000,
    costEffectiveness: 52941,
    timeToImpact: "MEDIUM",
    readinessLevel: "HIGH",
    cobenefits: ["Energy security", "Job creation", "Rural electrification", "Reduced fuel imports"],
    priorityScore: 92,
    recommendation: "PRIORITY",
    keyActions: [
      "Scale grid-connected solar PV to 1,500 MW by 2028",
      "Complete geothermal expansion in Olkaria and Menengai",
      "Deploy 500 MW wind capacity in northern corridor",
      "Implement net metering regulations for distributed solar",
    ],
    fundingSources: ["GCF", "World Bank", "AfDB", "Bilateral (Germany, UK)", "Carbon markets"],
  },
  {
    sector: "Forestry & Land Use",
    icon: Leaf,
    currentEmissions: -2500000,
    reductionPotential: 5500000,
    investmentRequired: 180000000000,
    costEffectiveness: 32727,
    timeToImpact: "MEDIUM",
    readinessLevel: "HIGH",
    cobenefits: ["Biodiversity", "Water security", "Community livelihoods", "Tourism revenue"],
    priorityScore: 88,
    recommendation: "PRIORITY",
    keyActions: [
      "Restore 5.1 million hectares of degraded forest land",
      "Expand community forest management programs",
      "Implement Payment for Ecosystem Services (PES) schemes",
      "Strengthen REDD+ monitoring and verification",
    ],
    fundingSources: ["GCF", "REDD+", "Carbon markets (VCM)", "Bilateral donors"],
  },
  {
    sector: "Agriculture",
    icon: Leaf,
    currentEmissions: 12800000,
    reductionPotential: 4200000,
    investmentRequired: 220000000000,
    costEffectiveness: 52381,
    timeToImpact: "MEDIUM",
    readinessLevel: "MEDIUM",
    cobenefits: ["Food security", "Rural incomes", "Climate resilience", "Soil health"],
    priorityScore: 78,
    recommendation: "INVEST",
    keyActions: [
      "Scale climate-smart agriculture to 2 million farmers",
      "Promote agroforestry integration in farming systems",
      "Improve livestock management to reduce methane",
      "Deploy efficient irrigation systems",
    ],
    fundingSources: ["GCF", "IFAD", "World Bank", "FAO", "Bilateral"],
  },
  {
    sector: "Transport",
    icon: Truck,
    currentEmissions: 8500000,
    reductionPotential: 2800000,
    investmentRequired: 380000000000,
    costEffectiveness: 135714,
    timeToImpact: "LONG",
    readinessLevel: "LOW",
    cobenefits: ["Urban air quality", "Reduced congestion", "Energy savings", "Modernization"],
    priorityScore: 62,
    recommendation: "INVEST",
    keyActions: [
      "Electrify urban public transport (BRT, matatus)",
      "Implement fuel efficiency standards",
      "Develop non-motorized transport infrastructure",
      "Incentivize EV adoption through tax breaks",
    ],
    fundingSources: ["GCF", "AfDB", "National budget", "Private sector PPPs"],
  },
  {
    sector: "Waste",
    icon: Trash2,
    currentEmissions: 4200000,
    reductionPotential: 2100000,
    investmentRequired: 85000000000,
    costEffectiveness: 40476,
    timeToImpact: "SHORT",
    readinessLevel: "MEDIUM",
    cobenefits: ["Public health", "Urban cleanliness", "Energy generation", "Job creation"],
    priorityScore: 75,
    recommendation: "INVEST",
    keyActions: [
      "Deploy methane capture at major landfills",
      "Implement waste-to-energy projects in cities",
      "Scale municipal composting programs",
      "Introduce extended producer responsibility (EPR)",
    ],
    fundingSources: ["National budget", "Municipal bonds", "Carbon markets", "Private sector"],
  },
  {
    sector: "Industry",
    icon: Factory,
    currentEmissions: 5800000,
    reductionPotential: 1500000,
    investmentRequired: 250000000000,
    costEffectiveness: 166667,
    timeToImpact: "LONG",
    readinessLevel: "LOW",
    cobenefits: ["Competitiveness", "Export compliance", "Innovation", "Resource efficiency"],
    priorityScore: 48,
    recommendation: "MAINTAIN",
    keyActions: [
      "Implement industrial energy efficiency standards",
      "Support fuel switching in cement and manufacturing",
      "Develop green industrial zones",
      "Provide technical assistance for SME decarbonization",
    ],
    fundingSources: ["Development finance", "Private sector", "Green bonds"],
  },
];

const strategicGaps: StrategicGap[] = [
  {
    area: "Climate Finance Mobilization",
    currentState: "KES 45B annually",
    targetState: "KES 150B annually needed",
    gap: 70,
    impact: "HIGH",
    fiscalImplication: 105000000000,
    recommendation: "Strengthen climate budget tagging, establish green bond framework, and enhance GCF pipeline",
  },
  {
    area: "MRV System Coverage",
    currentState: "65% of emissions tracked",
    targetState: "100% UNFCCC-compliant inventory",
    gap: 35,
    impact: "HIGH",
    fiscalImplication: 2500000000,
    recommendation: "Complete sector-specific MRV systems for transport, waste, and IPPU sectors",
  },
  {
    area: "Carbon Market Readiness",
    currentState: "5 registered projects",
    targetState: "50+ Article 6 eligible projects",
    gap: 90,
    impact: "HIGH",
    fiscalImplication: -25000000000,
    recommendation: "Fast-track project registration, establish national carbon registry, train verifiers",
  },
  {
    area: "Subnational Implementation",
    currentState: "12 counties with CCAPs",
    targetState: "47 counties with climate plans",
    gap: 74,
    impact: "MEDIUM",
    fiscalImplication: 4700000000,
    recommendation: "Provide technical support and conditional grants for county climate action plans",
  },
  {
    area: "Private Sector Engagement",
    currentState: "Limited corporate climate action",
    targetState: "Major emitters with science-based targets",
    gap: 80,
    impact: "MEDIUM",
    fiscalImplication: 0,
    recommendation: "Introduce mandatory climate risk disclosure and carbon pricing mechanism",
  },
];

const fiscalOpportunities: FiscalOpportunity[] = [
  {
    id: "OPP-001",
    title: "Carbon Revenue from ITMO Sales",
    type: "REVENUE",
    potentialValue: 25000000000,
    timeframe: "2025-2030",
    confidence: 0.75,
    description: "Kenya can generate significant revenue through Article 6.2 bilateral transfers of ITMOs to compliance markets in Europe and Asia",
    requirements: ["Functioning carbon registry", "LoA approval process", "Corresponding adjustment accounting"],
  },
  {
    id: "OPP-002",
    title: "Green Bond Issuance",
    type: "MOBILIZATION",
    potentialValue: 50000000000,
    timeframe: "2024-2026",
    confidence: 0.82,
    description: "Sovereign green bonds can mobilize domestic and international capital for climate investments at competitive rates",
    requirements: ["Green bond framework", "External review", "Eligible project pipeline"],
  },
  {
    id: "OPP-003",
    title: "Fossil Fuel Subsidy Reform",
    type: "SAVINGS",
    potentialValue: 35000000000,
    timeframe: "2024-2028",
    confidence: 0.65,
    description: "Gradual phase-out of fuel subsidies can free up fiscal space while aligning with climate objectives",
    requirements: ["Social protection measures", "Transition support", "Public communication"],
  },
  {
    id: "OPP-004",
    title: "Climate Budget Efficiency Gains",
    type: "EFFICIENCY",
    potentialValue: 8000000000,
    timeframe: "2024-2025",
    confidence: 0.88,
    description: "Better coordination and prioritization of climate spending across ministries can improve impact per shilling spent",
    requirements: ["Climate budget tagging", "Cross-ministerial coordination", "Impact monitoring"],
  },
  {
    id: "OPP-005",
    title: "GCF Pipeline Acceleration",
    type: "MOBILIZATION",
    potentialValue: 40000000000,
    timeframe: "2024-2027",
    confidence: 0.70,
    description: "Accelerating GCF project proposals in the pipeline can secure additional grant and concessional financing",
    requirements: ["Proposal development capacity", "Accredited entities", "Government co-financing"],
  },
];

const timeToImpactConfig = {
  SHORT: { label: "1-3 years", color: "emerald" },
  MEDIUM: { label: "3-5 years", color: "blue" },
  LONG: { label: "5+ years", color: "amber" },
};

const readinessConfig = {
  HIGH: { label: "High", color: "emerald" },
  MEDIUM: { label: "Medium", color: "amber" },
  LOW: { label: "Low", color: "red" },
};

const recommendationConfig = {
  PRIORITY: { label: "Priority Investment", color: "emerald", bg: "bg-emerald-100", text: "text-emerald-700" },
  INVEST: { label: "Strategic Investment", color: "blue", bg: "bg-blue-100", text: "text-blue-700" },
  MAINTAIN: { label: "Maintain Current", color: "amber", bg: "bg-amber-100", text: "text-amber-700" },
  DEPRIORITIZE: { label: "Deprioritize", color: "slate", bg: "bg-slate-100", text: "text-slate-700" },
};

const opportunityTypeConfig = {
  REVENUE: { label: "New Revenue", color: "emerald", icon: DollarSign },
  SAVINGS: { label: "Cost Savings", color: "blue", icon: TrendingDown },
  EFFICIENCY: { label: "Efficiency", color: "violet", icon: Zap },
  MOBILIZATION: { label: "Mobilization", color: "amber", icon: Globe },
};

function formatCurrency(amount: number): string {
  if (Math.abs(amount) >= 1000000000000) return `KES ${(amount / 1000000000000).toFixed(1)}T`;
  if (Math.abs(amount) >= 1000000000) return `KES ${(amount / 1000000000).toFixed(0)}B`;
  if (Math.abs(amount) >= 1000000) return `KES ${(amount / 1000000).toFixed(0)}M`;
  return `KES ${amount.toLocaleString()}`;
}

function formatEmissions(value: number): string {
  const absValue = Math.abs(value);
  if (absValue >= 1000000) {
    return `${value < 0 ? "-" : ""}${(absValue / 1000000).toFixed(1)}M`;
  }
  return value.toLocaleString();
}

export default function StrategicPrioritiesPage() {
  const [activeTab, setActiveTab] = useState<"sectors" | "gaps" | "fiscal">("sectors");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const totalReductionPotential = sectorPotentials.reduce((sum, s) => sum + s.reductionPotential, 0);
  const totalInvestmentRequired = sectorPotentials.reduce((sum, s) => sum + s.investmentRequired, 0);
  const prioritySectors = sectorPotentials.filter(s => s.recommendation === "PRIORITY");
  const totalFiscalOpportunity = fiscalOpportunities.reduce((sum, o) => sum + o.potentialValue, 0);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/intelligence" className="hover:text-[hsl(var(--primary))]">
              Intelligence
            </Link>
            <span>/</span>
            <span>Strategic Priorities</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Strategic Priorities & Country Potential
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            AI-driven analysis of climate action priorities for Ministry of Finance planning
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Update Analysis
              </>
            )}
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Download className="h-4 w-4" />
            Export Brief
          </button>
        </div>
      </div>

      {/* Executive Summary for Ministry of Finance */}
      <div className="card bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--primary)/0.05)] border-[hsl(var(--primary)/0.2)]">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--primary))]">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Executive Summary for Treasury & Budget Planning
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
              Based on comprehensive analysis of NDC targets, sector emissions, cost-effectiveness ratios, and implementation readiness
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="p-3 rounded-xl bg-white/70">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Total Reduction Potential</p>
                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                  {formatEmissions(totalReductionPotential)} tCO2e
                </p>
                <p className="text-xs text-emerald-600">by 2030</p>
              </div>
              <div className="p-3 rounded-xl bg-white/70">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Investment Required</p>
                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                  {formatCurrency(totalInvestmentRequired)}
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">across all sectors</p>
              </div>
              <div className="p-3 rounded-xl bg-white/70">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Priority Sectors</p>
                <p className="text-xl font-bold text-emerald-600">{prioritySectors.length}</p>
                <p className="text-xs text-emerald-600">highest impact</p>
              </div>
              <div className="p-3 rounded-xl bg-white/70">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Fiscal Opportunity</p>
                <p className="text-xl font-bold text-[hsl(var(--primary))]">
                  {formatCurrency(totalFiscalOpportunity)}
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">potential mobilization</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Recommendations Banner */}
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-800">Top 3 Strategic Recommendations for FY 2024/25</p>
            <ol className="mt-2 space-y-1">
              <li className="text-sm text-emerald-700 flex items-start gap-2">
                <span className="font-bold">1.</span>
                <span><strong>Prioritize Energy Sector:</strong> Renewable energy delivers 2.2x better cost-effectiveness than transport, with established implementation capacity</span>
              </li>
              <li className="text-sm text-emerald-700 flex items-start gap-2">
                <span className="font-bold">2.</span>
                <span><strong>Scale Forest Conservation:</strong> LULUCF offers highest carbon sequestration potential with significant co-benefits for water security</span>
              </li>
              <li className="text-sm text-emerald-700 flex items-start gap-2">
                <span className="font-bold">3.</span>
                <span><strong>Accelerate Carbon Market Entry:</strong> Potential KES 25B revenue from ITMO sales can significantly offset climate investment costs</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-2xl bg-[hsl(var(--secondary))] p-1.5">
        {[
          { id: "sectors" as const, label: "Sector Priorities", icon: BarChart3 },
          { id: "gaps" as const, label: "Strategic Gaps", icon: AlertTriangle },
          { id: "fiscal" as const, label: "Fiscal Opportunities", icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-[hsl(var(--foreground))] shadow-sm"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-[hsl(var(--primary))]" : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Sector Priorities Tab */}
      {activeTab === "sectors" && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Sector Investment Priority Matrix
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
              Ranked by cost-effectiveness, reduction potential, and implementation readiness
            </p>
            <div className="space-y-4">
              {sectorPotentials
                .sort((a, b) => b.priorityScore - a.priorityScore)
                .map((sector, idx) => {
                  const Icon = sector.icon;
                  const recConfig = recommendationConfig[sector.recommendation];
                  const timeConfig = timeToImpactConfig[sector.timeToImpact];
                  const readyConfig = readinessConfig[sector.readinessLevel];

                  return (
                    <div
                      key={sector.sector}
                      className="p-4 rounded-xl border border-[hsl(var(--border))] hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-[hsl(var(--muted-foreground))]">
                              #{idx + 1}
                            </span>
                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-${recConfig.color}-100`}>
                              <Icon className={`h-6 w-6 text-${recConfig.color}-600`} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-[hsl(var(--foreground))]">
                                {sector.sector}
                              </h3>
                              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${recConfig.bg} ${recConfig.text}`}>
                                {recConfig.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                              <span className="flex items-center gap-1">
                                <span className={`h-2 w-2 rounded-full bg-${timeConfig.color}-500`} />
                                Time to Impact: {timeConfig.label}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className={`h-2 w-2 rounded-full bg-${readyConfig.color}-500`} />
                                Readiness: {readyConfig.label}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[hsl(var(--primary))]">
                            {sector.priorityScore}
                          </p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">Priority Score</p>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)] text-center">
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">Reduction Potential</p>
                          <p className="text-lg font-bold text-emerald-600">
                            {formatEmissions(sector.reductionPotential)} tCO2e
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)] text-center">
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">Investment Required</p>
                          <p className="text-lg font-bold text-[hsl(var(--foreground))]">
                            {formatCurrency(sector.investmentRequired)}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)] text-center">
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">Cost-Effectiveness</p>
                          <p className="text-lg font-bold text-blue-600">
                            KES {(sector.costEffectiveness / 1000).toFixed(0)}K/tCO2e
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)] text-center">
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">Current Emissions</p>
                          <p className="text-lg font-bold text-[hsl(var(--foreground))]">
                            {formatEmissions(sector.currentEmissions)} tCO2e
                          </p>
                        </div>
                      </div>

                      {/* Co-benefits */}
                      <div className="mt-4">
                        <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mb-2">Co-benefits</p>
                        <div className="flex flex-wrap gap-2">
                          {sector.cobenefits.map((benefit) => (
                            <span
                              key={benefit}
                              className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700"
                            >
                              <CheckCircle className="h-3 w-3" />
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Actions */}
                      <div className="mt-4">
                        <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mb-2">Key Actions</p>
                        <ul className="space-y-1">
                          {sector.keyActions.slice(0, 2).map((action, i) => (
                            <li key={i} className="text-sm text-[hsl(var(--foreground))] flex items-start gap-2">
                              <ChevronRight className="h-4 w-4 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Funding Sources */}
                      <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
                        <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mb-2">Potential Funding Sources</p>
                        <div className="flex flex-wrap gap-2">
                          {sector.fundingSources.map((source) => (
                            <span
                              key={source}
                              className="inline-flex items-center rounded-full bg-[hsl(var(--secondary))] px-2.5 py-1 text-xs font-medium text-[hsl(var(--foreground))]"
                            >
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Strategic Gaps Tab */}
      {activeTab === "gaps" && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Strategic Implementation Gaps
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
              Critical gaps that require fiscal attention to achieve NDC targets
            </p>
            <div className="space-y-4">
              {strategicGaps.map((gap, idx) => (
                <div
                  key={gap.area}
                  className="p-4 rounded-xl border border-[hsl(var(--border))]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[hsl(var(--foreground))]">{gap.area}</h3>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          gap.impact === "HIGH" ? "bg-red-100 text-red-700" :
                          gap.impact === "MEDIUM" ? "bg-amber-100 text-amber-700" :
                          "bg-slate-100 text-slate-700"
                        }`}>
                          {gap.impact} Impact
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">{gap.gap}%</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Gap</p>
                    </div>
                  </div>

                  {/* Progress visualization */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))] mb-1">
                      <span>Current: {gap.currentState}</span>
                      <span>Target: {gap.targetState}</span>
                    </div>
                    <div className="h-3 rounded-full bg-[hsl(var(--secondary))]">
                      <div
                        className="h-3 rounded-full bg-[hsl(var(--primary))]"
                        style={{ width: `${100 - gap.gap}%` }}
                      />
                    </div>
                  </div>

                  {/* Fiscal implication */}
                  <div className="mt-4 flex items-center justify-between p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Fiscal Implication</p>
                      <p className={`text-lg font-bold ${gap.fiscalImplication < 0 ? "text-emerald-600" : "text-amber-600"}`}>
                        {gap.fiscalImplication < 0 ? "+" : ""}{formatCurrency(Math.abs(gap.fiscalImplication))}
                        {gap.fiscalImplication < 0 && <span className="text-xs font-normal ml-1">(potential revenue)</span>}
                      </p>
                    </div>
                    <div className="text-right max-w-md">
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Recommendation</p>
                      <p className="text-sm text-[hsl(var(--foreground))]">{gap.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fiscal Opportunities Tab */}
      {activeTab === "fiscal" && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Fiscal Opportunities for Climate Action
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
              Revenue, savings, and financing opportunities to support climate investments
            </p>

            {/* Summary stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {Object.entries(opportunityTypeConfig).map(([type, config]) => {
                const Icon = config.icon;
                const typeOpportunities = fiscalOpportunities.filter(o => o.type === type);
                const total = typeOpportunities.reduce((sum, o) => sum + o.potentialValue, 0);
                return (
                  <div key={type} className="p-4 rounded-xl bg-[hsl(var(--secondary)/0.5)] text-center">
                    <Icon className={`h-6 w-6 mx-auto text-${config.color}-600`} />
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">{config.label}</p>
                    <p className={`text-xl font-bold text-${config.color}-600`}>
                      {formatCurrency(total)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4">
              {fiscalOpportunities.map((opp) => {
                const config = opportunityTypeConfig[opp.type];
                const Icon = config.icon;
                return (
                  <div
                    key={opp.id}
                    className="p-4 rounded-xl border border-[hsl(var(--border))] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-${config.color}-100`}>
                          <Icon className={`h-6 w-6 text-${config.color}-600`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-[hsl(var(--foreground))]">{opp.title}</h3>
                            <span className={`inline-flex items-center rounded-full bg-${config.color}-100 px-2 py-0.5 text-xs font-medium text-${config.color}-700`}>
                              {config.label}
                            </span>
                          </div>
                          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{opp.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold text-${config.color}-600`}>
                          {formatCurrency(opp.potentialValue)}
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{opp.timeframe}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Requirements</p>
                        <div className="flex flex-wrap gap-2">
                          {opp.requirements.map((req) => (
                            <span
                              key={req}
                              className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--secondary))] px-2.5 py-1 text-xs font-medium text-[hsl(var(--foreground))]"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">Confidence</p>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 rounded-full bg-[hsl(var(--secondary))]">
                            <div
                              className={`h-2 rounded-full bg-${config.color}-500`}
                              style={{ width: `${opp.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                            {(opp.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
