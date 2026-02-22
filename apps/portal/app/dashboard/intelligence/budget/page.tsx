"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  DollarSign,
  Target,
  BarChart3,
  CheckCircle,
  Clock,
  XCircle,
  Lightbulb,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

type RecommendationType =
  | "REALLOCATION_CROSS_SECTOR"
  | "REALLOCATION_CROSS_COUNTY"
  | "INCREASE_HIGH_IMPACT"
  | "REDUCE_LOW_IMPACT"
  | "NEW_OPPORTUNITY"
  | "TIMING_OPTIMIZATION";

type RecommendationPriority = "HIGH" | "MEDIUM" | "LOW";
type RecommendationStatus = "PENDING" | "ACCEPTED" | "PARTIALLY_ACCEPTED" | "REJECTED" | "EXPIRED";

interface BudgetRecommendation {
  id: string;
  type: RecommendationType;
  priority: RecommendationPriority;
  confidence: number;
  currentSector: string;
  currentCounty?: string;
  currentAmount: number;
  currentExpectedImpact: number;
  currentCostEffectiveness: number;
  recommendedSector: string;
  recommendedCounty?: string;
  recommendedAmount: number;
  recommendedExpectedImpact: number;
  recommendedCostEffectiveness: number;
  impactAnalysis: {
    additionalReductions: number;
    costSavings: number;
    ndcProgressImprovement: number;
    roiImprovement: number;
  };
  rationale: string;
  status: RecommendationStatus;
  fiscalYear: number;
  generatedAt: string;
  acceptedAt?: string;
  acceptedBy?: string;
}

const mockRecommendations: BudgetRecommendation[] = [
  {
    id: "REC-2024-001",
    type: "REALLOCATION_CROSS_SECTOR",
    priority: "HIGH",
    confidence: 0.91,
    currentSector: "Transport",
    currentAmount: 500000000,
    currentExpectedImpact: 8500,
    currentCostEffectiveness: 58823,
    recommendedSector: "Energy",
    recommendedAmount: 500000000,
    recommendedExpectedImpact: 18500,
    recommendedCostEffectiveness: 27027,
    impactAnalysis: {
      additionalReductions: 10000,
      costSavings: 0,
      ndcProgressImprovement: 1.8,
      roiImprovement: 118,
    },
    rationale: "Analysis shows renewable energy projects in Turkana and Marsabit counties deliver 2.2x higher emission reductions per KES invested compared to current transport sector allocation. The wind and solar resources in these regions remain underutilized.",
    status: "PENDING",
    fiscalYear: 2024,
    generatedAt: "2024-01-20",
  },
  {
    id: "REC-2024-002",
    type: "INCREASE_HIGH_IMPACT",
    priority: "HIGH",
    confidence: 0.88,
    currentSector: "Forestry",
    currentAmount: 1200000000,
    currentExpectedImpact: 45000,
    currentCostEffectiveness: 26667,
    recommendedSector: "Forestry",
    recommendedAmount: 1800000000,
    recommendedExpectedImpact: 72000,
    recommendedCostEffectiveness: 25000,
    impactAnalysis: {
      additionalReductions: 27000,
      costSavings: 0,
      ndcProgressImprovement: 2.4,
      roiImprovement: 7,
    },
    rationale: "Forest conservation projects show the highest cost-effectiveness ratio (KES 25,000/tCO2e) among all sectors. Increasing allocation to cover additional community-managed forest areas in Western Kenya can maximize NDC progress.",
    status: "ACCEPTED",
    fiscalYear: 2024,
    generatedAt: "2024-01-15",
    acceptedAt: "2024-01-18",
    acceptedBy: "Director Budget",
  },
  {
    id: "REC-2024-003",
    type: "REALLOCATION_CROSS_COUNTY",
    priority: "MEDIUM",
    confidence: 0.82,
    currentSector: "Agriculture",
    currentCounty: "Nairobi",
    currentAmount: 300000000,
    currentExpectedImpact: 4200,
    currentCostEffectiveness: 71428,
    recommendedSector: "Agriculture",
    recommendedCounty: "Kitui",
    recommendedAmount: 300000000,
    recommendedExpectedImpact: 9800,
    recommendedCostEffectiveness: 30612,
    impactAnalysis: {
      additionalReductions: 5600,
      costSavings: 0,
      ndcProgressImprovement: 0.9,
      roiImprovement: 133,
    },
    rationale: "Climate-smart agriculture interventions in semi-arid counties like Kitui show significantly better results due to larger available agricultural land and higher baseline emissions from current farming practices.",
    status: "PENDING",
    fiscalYear: 2024,
    generatedAt: "2024-01-18",
  },
  {
    id: "REC-2024-004",
    type: "REDUCE_LOW_IMPACT",
    priority: "MEDIUM",
    confidence: 0.79,
    currentSector: "Industry",
    currentAmount: 800000000,
    currentExpectedImpact: 6500,
    currentCostEffectiveness: 123077,
    recommendedSector: "Energy",
    recommendedAmount: 600000000,
    recommendedExpectedImpact: 12000,
    recommendedCostEffectiveness: 50000,
    impactAnalysis: {
      additionalReductions: 5500,
      costSavings: 200000000,
      ndcProgressImprovement: 0.7,
      roiImprovement: 146,
    },
    rationale: "Industrial sector projects show lowest cost-effectiveness due to high capital costs and limited adoption. Reducing allocation and redirecting to distributed renewable energy can achieve better outcomes with lower investment.",
    status: "REJECTED",
    fiscalYear: 2024,
    generatedAt: "2024-01-12",
  },
  {
    id: "REC-2024-005",
    type: "NEW_OPPORTUNITY",
    priority: "HIGH",
    confidence: 0.86,
    currentSector: "N/A",
    currentAmount: 0,
    currentExpectedImpact: 0,
    currentCostEffectiveness: 0,
    recommendedSector: "Waste",
    recommendedCounty: "Nairobi",
    recommendedAmount: 450000000,
    recommendedExpectedImpact: 22000,
    recommendedCostEffectiveness: 20455,
    impactAnalysis: {
      additionalReductions: 22000,
      costSavings: 0,
      ndcProgressImprovement: 1.5,
      roiImprovement: 0,
    },
    rationale: "New methane capture opportunity identified at Dandora landfill. With existing infrastructure and municipal commitment, this project can achieve exceptional cost-effectiveness and generate carbon credits for additional revenue.",
    status: "PENDING",
    fiscalYear: 2024,
    generatedAt: "2024-01-22",
  },
];

const typeConfig: Record<RecommendationType, { icon: typeof ArrowRight; color: string; label: string }> = {
  REALLOCATION_CROSS_SECTOR: { icon: ArrowRight, color: "blue", label: "Cross-Sector Reallocation" },
  REALLOCATION_CROSS_COUNTY: { icon: ArrowRight, color: "violet", label: "Cross-County Reallocation" },
  INCREASE_HIGH_IMPACT: { icon: TrendingUp, color: "emerald", label: "Increase High Impact" },
  REDUCE_LOW_IMPACT: { icon: TrendingDown, color: "amber", label: "Reduce Low Impact" },
  NEW_OPPORTUNITY: { icon: Lightbulb, color: "cyan", label: "New Opportunity" },
  TIMING_OPTIMIZATION: { icon: Clock, color: "slate", label: "Timing Optimization" },
};

const priorityConfig: Record<RecommendationPriority, { bg: string; text: string }> = {
  HIGH: { bg: "bg-red-100", text: "text-red-700" },
  MEDIUM: { bg: "bg-amber-100", text: "text-amber-700" },
  LOW: { bg: "bg-slate-100", text: "text-slate-700" },
};

const statusConfig: Record<RecommendationStatus, { icon: typeof CheckCircle; bg: string; text: string; label: string }> = {
  PENDING: { icon: Clock, bg: "bg-amber-100", text: "text-amber-700", label: "Pending" },
  ACCEPTED: { icon: CheckCircle, bg: "bg-emerald-100", text: "text-emerald-700", label: "Accepted" },
  PARTIALLY_ACCEPTED: { icon: CheckCircle, bg: "bg-blue-100", text: "text-blue-700", label: "Partially Accepted" },
  REJECTED: { icon: XCircle, bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
  EXPIRED: { icon: AlertTriangle, bg: "bg-slate-100", text: "text-slate-700", label: "Expired" },
};

function formatCurrency(amount: number): string {
  if (amount >= 1000000000) return `KES ${(amount / 1000000000).toFixed(1)}B`;
  if (amount >= 1000000) return `KES ${(amount / 1000000).toFixed(0)}M`;
  return `KES ${amount.toLocaleString()}`;
}

export default function BudgetIntelligencePage() {
  const [statusFilter, setStatusFilter] = useState<RecommendationStatus | "ALL">("ALL");
  const [priorityFilter, setPriorityFilter] = useState<RecommendationPriority | "ALL">("ALL");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredRecommendations = mockRecommendations.filter((rec) => {
    const matchesStatus = statusFilter === "ALL" || rec.status === statusFilter;
    const matchesPriority = priorityFilter === "ALL" || rec.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const stats = {
    total: mockRecommendations.length,
    pending: mockRecommendations.filter((r) => r.status === "PENDING").length,
    potentialReductions: mockRecommendations
      .filter((r) => r.status === "PENDING")
      .reduce((sum, r) => sum + r.impactAnalysis.additionalReductions, 0),
    potentialNDCImprovement: mockRecommendations
      .filter((r) => r.status === "PENDING")
      .reduce((sum, r) => sum + r.impactAnalysis.ndcProgressImprovement, 0),
  };

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
            <span>Budget Analysis</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Budget Intelligence
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            AI-powered recommendations for optimal climate finance allocation
          </p>
        </div>
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
              Run Analysis
            </>
          )}
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Recommendations</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Awaiting Decision</p>
          <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Potential Reductions</p>
          <p className="text-2xl font-bold text-emerald-600">
            +{(stats.potentialReductions / 1000).toFixed(1)}K tCO2e
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">NDC Progress Gain</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))]">
            +{stats.potentialNDCImprovement.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Cost Effectiveness Overview */}
      <div className="card">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Sector Cost-Effectiveness
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { sector: "Forestry", cost: 25000, color: "emerald" },
            { sector: "Waste", cost: 28000, color: "teal" },
            { sector: "Energy", cost: 35000, color: "blue" },
            { sector: "Agriculture", cost: 45000, color: "amber" },
            { sector: "Transport", cost: 65000, color: "red" },
          ].map((item) => (
            <div key={item.sector} className="text-center">
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.sector}</p>
              <p className={`text-lg font-bold text-${item.color}-600`}>
                KES {(item.cost / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">per tCO2e</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as RecommendationStatus | "ALL")}
          className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
        >
          <option value="ALL">All Statuses</option>
          {Object.entries(statusConfig).map(([status, config]) => (
            <option key={status} value={status}>
              {config.label}
            </option>
          ))}
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as RecommendationPriority | "ALL")}
          className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
        >
          <option value="ALL">All Priorities</option>
          <option value="HIGH">High Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="LOW">Low Priority</option>
        </select>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecommendations.map((rec) => {
          const typeConf = typeConfig[rec.type];
          const statusConf = statusConfig[rec.status];
          const priorityConf = priorityConfig[rec.priority];
          const TypeIcon = typeConf.icon;
          const StatusIcon = statusConf.icon;

          return (
            <div key={rec.id} className="card hover:shadow-md transition-shadow">
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
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityConf.bg} ${priorityConf.text}`}>
                        {rec.priority}
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusConf.bg} ${statusConf.text}`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConf.label}
                      </span>
                    </div>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                      {(rec.confidence * 100).toFixed(0)}% confidence · FY {rec.fiscalYear}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison */}
              <div className="mt-4 grid grid-cols-3 gap-4 p-4 rounded-xl bg-[hsl(var(--secondary)/0.5)]">
                <div className="text-center">
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Current</p>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                    {rec.currentSector}{rec.currentCounty && ` (${rec.currentCounty})`}
                  </p>
                  <p className="text-lg font-bold text-[hsl(var(--foreground))]">
                    {formatCurrency(rec.currentAmount)}
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    {rec.currentExpectedImpact.toLocaleString()} tCO2e
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-[hsl(var(--primary))]" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Recommended</p>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                    {rec.recommendedSector}{rec.recommendedCounty && ` (${rec.recommendedCounty})`}
                  </p>
                  <p className="text-lg font-bold text-emerald-600">
                    {formatCurrency(rec.recommendedAmount)}
                  </p>
                  <p className="text-xs text-emerald-600">
                    {rec.recommendedExpectedImpact.toLocaleString()} tCO2e
                  </p>
                </div>
              </div>

              {/* Impact */}
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-xl bg-emerald-50">
                  <p className="text-xs text-emerald-600 mb-1">Additional Reductions</p>
                  <p className="text-lg font-bold text-emerald-700">
                    +{rec.impactAnalysis.additionalReductions.toLocaleString()}
                  </p>
                  <p className="text-xs text-emerald-600">tCO2e</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-blue-50">
                  <p className="text-xs text-blue-600 mb-1">NDC Progress</p>
                  <p className="text-lg font-bold text-blue-700">
                    +{rec.impactAnalysis.ndcProgressImprovement.toFixed(1)}%
                  </p>
                </div>
                <div className="text-center p-3 rounded-xl bg-violet-50">
                  <p className="text-xs text-violet-600 mb-1">ROI Improvement</p>
                  <p className="text-lg font-bold text-violet-700">
                    +{rec.impactAnalysis.roiImprovement}%
                  </p>
                </div>
                <div className="text-center p-3 rounded-xl bg-amber-50">
                  <p className="text-xs text-amber-600 mb-1">Cost Savings</p>
                  <p className="text-lg font-bold text-amber-700">
                    {rec.impactAnalysis.costSavings > 0 ? formatCurrency(rec.impactAnalysis.costSavings) : "—"}
                  </p>
                </div>
              </div>

              {/* Rationale */}
              <div className="mt-4 p-4 rounded-xl border border-[hsl(var(--border))]">
                <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mb-2">
                  AI Rationale
                </p>
                <p className="text-sm text-[hsl(var(--foreground))]">{rec.rationale}</p>
              </div>

              {/* Actions */}
              {rec.status === "PENDING" && (
                <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] flex items-center gap-3">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                    <CheckCircle className="h-4 w-4" />
                    Accept
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
                    Partially Accept
                  </button>
                  <button className="text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                    Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
