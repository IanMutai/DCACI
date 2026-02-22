"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Leaf,
  Factory,
  Truck,
  Droplets,
  Wind,
  Sun,
  ArrowRight,
  MapPin,
  TrendingUp,
  CheckCircle,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
} from "lucide-react";

type SynergyType =
  | "ENERGY_TO_AGRICULTURE"
  | "WASTE_TO_ENERGY"
  | "TRANSPORT_ELECTRIFICATION"
  | "CROSS_COUNTY_INFRASTRUCTURE"
  | "CARBON_REVENUE_POOLING"
  | "SHARED_MRV_INFRASTRUCTURE";

type SynergyStatus = "DETECTED" | "REVIEWED" | "APPROVED" | "IMPLEMENTING" | "IMPLEMENTED" | "DISMISSED";

interface SynergyOpportunity {
  id: string;
  type: SynergyType;
  confidence: number;
  sourceProjectId: string;
  sourceProjectTitle: string;
  sourceSector: string;
  sourceCounty: string;
  beneficiaryProjectId?: string;
  beneficiaryProjectTitle?: string;
  beneficiarySector?: string;
  beneficiaryCounty?: string;
  description: string;
  potentialBenefit: string;
  estimatedImpact: {
    additionalReductions: number;
    costSavings: number;
    efficiencyGain: number;
  };
  recommendations: string[];
  status: SynergyStatus;
  detectedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

const mockSynergies: SynergyOpportunity[] = [
  {
    id: "SYN-2024-001",
    type: "ENERGY_TO_AGRICULTURE",
    confidence: 0.92,
    sourceProjectId: "PRJ-MRB-001",
    sourceProjectTitle: "Marsabit Wind Farm Phase II",
    sourceSector: "Energy",
    sourceCounty: "Marsabit",
    beneficiaryProjectId: "PRJ-MRB-AGR-002",
    beneficiaryProjectTitle: "Marsabit Irrigation Modernization",
    beneficiarySector: "Agriculture",
    beneficiaryCounty: "Marsabit",
    description: "The Marsabit Wind Farm can provide clean energy to power electric irrigation pumps, replacing diesel-powered systems in nearby agricultural projects.",
    potentialBenefit: "Reduced agricultural emissions through electrification of irrigation systems",
    estimatedImpact: {
      additionalReductions: 15000,
      costSavings: 45000000,
      efficiencyGain: 25,
    },
    recommendations: [
      "Install dedicated power line from wind farm to irrigation hub",
      "Deploy smart grid controllers for load balancing",
      "Implement time-of-use pricing to optimize consumption",
    ],
    status: "APPROVED",
    detectedAt: "2024-01-05",
    reviewedAt: "2024-01-10",
    reviewedBy: "Mary Wanjiku",
  },
  {
    id: "SYN-2024-002",
    type: "WASTE_TO_ENERGY",
    confidence: 0.85,
    sourceProjectId: "PRJ-KTI-002",
    sourceProjectTitle: "Kitui Smart Agriculture CSA",
    sourceSector: "Agriculture",
    sourceCounty: "Kitui",
    beneficiaryProjectId: "PRJ-KTI-ENR-003",
    beneficiaryProjectTitle: "Kitui Community Biogas",
    beneficiarySector: "Energy",
    beneficiaryCounty: "Kitui",
    description: "Agricultural waste from the CSA project can be diverted to biogas production, creating a circular economy loop between agriculture and energy sectors.",
    potentialBenefit: "Convert agricultural waste into clean cooking fuel, reducing deforestation pressure",
    estimatedImpact: {
      additionalReductions: 8500,
      costSavings: 28000000,
      efficiencyGain: 18,
    },
    recommendations: [
      "Establish waste collection network from farms to biogas plant",
      "Install pre-processing facility for agricultural residues",
      "Create revenue-sharing agreement with farmers",
    ],
    status: "IMPLEMENTING",
    detectedAt: "2024-01-08",
    reviewedAt: "2024-01-12",
    reviewedBy: "Peter Ochieng",
  },
  {
    id: "SYN-2024-003",
    type: "TRANSPORT_ELECTRIFICATION",
    confidence: 0.78,
    sourceProjectId: "PRJ-NRB-003",
    sourceProjectTitle: "Nairobi E-Mobility Initiative",
    sourceSector: "Transport",
    sourceCounty: "Nairobi",
    beneficiaryProjectId: "PRJ-KMB-001",
    beneficiaryProjectTitle: "Kiambu Logistics Hub",
    beneficiarySector: "Transport",
    beneficiaryCounty: "Kiambu",
    description: "The EV charging infrastructure from Nairobi E-Mobility can be extended to service electric delivery vehicles operating the Nairobi-Kiambu corridor.",
    potentialBenefit: "Accelerate electrification of freight transport on key logistics routes",
    estimatedImpact: {
      additionalReductions: 22000,
      costSavings: 65000000,
      efficiencyGain: 30,
    },
    recommendations: [
      "Deploy fast-charging stations at Kiambu logistics hub",
      "Partner with freight operators for fleet conversion incentives",
      "Integrate with existing power grid upgrade plans",
    ],
    status: "DETECTED",
    detectedAt: "2024-01-15",
  },
  {
    id: "SYN-2024-004",
    type: "CARBON_REVENUE_POOLING",
    confidence: 0.88,
    sourceProjectId: "PRJ-KKM-004",
    sourceProjectTitle: "Kakamega Forest Protection",
    sourceSector: "Forestry",
    sourceCounty: "Kakamega",
    beneficiaryProjectId: "PRJ-NRK-005",
    beneficiaryProjectTitle: "Narok Community Forest",
    beneficiarySector: "Forestry",
    beneficiaryCounty: "Narok",
    description: "Both forestry projects can pool carbon revenues to fund shared monitoring infrastructure and reduce per-project MRV costs.",
    potentialBenefit: "Reduce MRV costs by 40% through shared satellite monitoring and verification",
    estimatedImpact: {
      additionalReductions: 5000,
      costSavings: 120000000,
      efficiencyGain: 40,
    },
    recommendations: [
      "Establish joint MRV monitoring agreement",
      "Deploy shared satellite imagery subscription",
      "Create unified carbon credit aggregation platform",
    ],
    status: "REVIEWED",
    detectedAt: "2024-01-12",
    reviewedAt: "2024-01-18",
    reviewedBy: "Alice Chen",
  },
  {
    id: "SYN-2024-005",
    type: "CROSS_COUNTY_INFRASTRUCTURE",
    confidence: 0.72,
    sourceProjectId: "PRJ-TRK-006",
    sourceProjectTitle: "Turkana Solar Mini-Grid",
    sourceSector: "Energy",
    sourceCounty: "Turkana",
    beneficiarySector: "Energy",
    beneficiaryCounty: "Marsabit",
    description: "Grid interconnection between Turkana Solar and Marsabit Wind can improve reliability through complementary generation profiles (solar peaks during day, wind during evening).",
    potentialBenefit: "Increase renewable energy utilization by 35% through grid balancing",
    estimatedImpact: {
      additionalReductions: 18000,
      costSavings: 85000000,
      efficiencyGain: 35,
    },
    recommendations: [
      "Conduct grid interconnection feasibility study",
      "Develop power purchase agreement between county utilities",
      "Install grid-scale battery storage at interconnection point",
    ],
    status: "DETECTED",
    detectedAt: "2024-01-20",
  },
];

const typeConfig: Record<SynergyType, { icon: typeof Zap; color: string; label: string }> = {
  ENERGY_TO_AGRICULTURE: { icon: Zap, color: "emerald", label: "Energy → Agriculture" },
  WASTE_TO_ENERGY: { icon: RefreshCw, color: "amber", label: "Waste → Energy" },
  TRANSPORT_ELECTRIFICATION: { icon: Truck, color: "blue", label: "Transport Electrification" },
  CROSS_COUNTY_INFRASTRUCTURE: { icon: MapPin, color: "violet", label: "Cross-County Infrastructure" },
  CARBON_REVENUE_POOLING: { icon: Leaf, color: "teal", label: "Carbon Revenue Pooling" },
  SHARED_MRV_INFRASTRUCTURE: { icon: Eye, color: "slate", label: "Shared MRV" },
};

const statusConfig: Record<SynergyStatus, { bg: string; text: string; label: string }> = {
  DETECTED: { bg: "bg-blue-100", text: "text-blue-700", label: "Detected" },
  REVIEWED: { bg: "bg-amber-100", text: "text-amber-700", label: "Reviewed" },
  APPROVED: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Approved" },
  IMPLEMENTING: { bg: "bg-violet-100", text: "text-violet-700", label: "Implementing" },
  IMPLEMENTED: { bg: "bg-green-100", text: "text-green-700", label: "Implemented" },
  DISMISSED: { bg: "bg-slate-100", text: "text-slate-700", label: "Dismissed" },
};

export default function SynergiesPage() {
  const [typeFilter, setTypeFilter] = useState<SynergyType | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<SynergyStatus | "ALL">("ALL");
  const [isDetecting, setIsDetecting] = useState(false);

  const filteredSynergies = mockSynergies.filter((syn) => {
    const matchesType = typeFilter === "ALL" || syn.type === typeFilter;
    const matchesStatus = statusFilter === "ALL" || syn.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const stats = {
    total: mockSynergies.length,
    highConfidence: mockSynergies.filter((s) => s.confidence >= 0.85).length,
    totalReductions: mockSynergies.reduce((sum, s) => sum + s.estimatedImpact.additionalReductions, 0),
    totalSavings: mockSynergies.reduce((sum, s) => sum + s.estimatedImpact.costSavings, 0),
  };

  const handleRunDetection = () => {
    setIsDetecting(true);
    setTimeout(() => setIsDetecting(false), 3000);
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
            <span>Synergies</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Cross-Sector Synergies
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            AI-detected opportunities for cross-project collaboration and efficiency gains
          </p>
        </div>
        <button
          onClick={handleRunDetection}
          disabled={isDetecting}
          className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors disabled:opacity-50"
        >
          {isDetecting ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Detecting...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Run Detection
            </>
          )}
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Opportunities Detected</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">High Confidence (≥85%)</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.highConfidence}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Potential Reductions</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))]">
            {(stats.totalReductions / 1000).toFixed(1)}K tCO2e
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Potential Savings</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))]">
            KES {(stats.totalSavings / 1000000).toFixed(0)}M
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as SynergyType | "ALL")}
          className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
        >
          <option value="ALL">All Types</option>
          {Object.entries(typeConfig).map(([type, config]) => (
            <option key={type} value={type}>
              {config.label}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as SynergyStatus | "ALL")}
          className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
        >
          <option value="ALL">All Statuses</option>
          {Object.entries(statusConfig).map(([status, config]) => (
            <option key={status} value={status}>
              {config.label}
            </option>
          ))}
        </select>
      </div>

      {/* Synergies List */}
      <div className="space-y-4">
        {filteredSynergies.map((syn) => {
          const typeConf = typeConfig[syn.type];
          const statusConf = statusConfig[syn.status];
          const TypeIcon = typeConf.icon;

          return (
            <div key={syn.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-${typeConf.color}-100`}>
                    <TypeIcon className={`h-6 w-6 text-${typeConf.color}-600`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-${typeConf.color}-100 text-${typeConf.color}-700`}>
                        {typeConf.label}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusConf.bg} ${statusConf.text}`}>
                        {statusConf.label}
                      </span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">
                        {(syn.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mt-1">
                      {syn.sourceProjectTitle}
                    </h3>
                    {syn.beneficiaryProjectTitle && (
                      <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mt-0.5">
                        <ArrowRight className="h-4 w-4" />
                        {syn.beneficiaryProjectTitle}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-600">
                    +{syn.estimatedImpact.additionalReductions.toLocaleString()} tCO2e
                  </p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    KES {(syn.estimatedImpact.costSavings / 1000000).toFixed(0)}M savings
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-[hsl(var(--foreground))]">
                {syn.description}
              </p>

              <div className="mt-4 p-4 rounded-xl bg-[hsl(var(--secondary)/0.5)]">
                <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mb-2">
                  Key Benefit
                </p>
                <p className="text-sm text-[hsl(var(--foreground))]">{syn.potentialBenefit}</p>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mb-2">
                  Recommendations
                </p>
                <ul className="space-y-1">
                  {syn.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[hsl(var(--foreground))]">
                      <span className="text-[hsl(var(--primary))]">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
                  <span>Detected: {new Date(syn.detectedAt).toLocaleDateString("en-GB")}</span>
                  {syn.reviewedBy && (
                    <span>Reviewed by {syn.reviewedBy}</span>
                  )}
                </div>
                {syn.status === "DETECTED" && (
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      Approve
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                      <ThumbsDown className="h-4 w-4" />
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
