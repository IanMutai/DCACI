"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  FileText,
  Building2,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Filter,
  Calendar,
} from "lucide-react";

interface BudgetLine {
  id: string;
  ministry: string;
  program: string;
  vote: string;
  description: string;
  allocatedAmount: number;
  executedAmount: number;
  ndcRelevance: "HIGH" | "MEDIUM" | "LOW" | "NONE";
  ndcCategory: "MITIGATION" | "ADAPTATION" | "CROSS_CUTTING" | "NOT_APPLICABLE";
  linkedTargets: string[];
  expectedReductions: number;
  actualReductions: number;
  alignmentScore: number;
  fiscalYear: number;
  recommendations: string[];
}

interface MinistryAlignmentSummary {
  ministry: string;
  totalBudget: number;
  climateBudget: number;
  climatePercentage: number;
  mitigationAmount: number;
  adaptationAmount: number;
  crossCuttingAmount: number;
  alignmentScore: number;
  trend: "UP" | "DOWN" | "STABLE";
  ndcContribution: number;
}

interface NDCBudgetGap {
  target: string;
  sector: string;
  requiredBudget: number;
  allocatedBudget: number;
  gap: number;
  gapPercentage: number;
  impact: string;
}

const mockBudgetLines: BudgetLine[] = [
  {
    id: "BL-001",
    ministry: "Ministry of Energy",
    program: "Renewable Energy Development",
    vote: "V1061",
    description: "Grid-connected solar and wind power generation projects",
    allocatedAmount: 15000000000,
    executedAmount: 12500000000,
    ndcRelevance: "HIGH",
    ndcCategory: "MITIGATION",
    linkedTargets: ["NDC-E001", "NDC-E002"],
    expectedReductions: 250000,
    actualReductions: 195000,
    alignmentScore: 92,
    fiscalYear: 2024,
    recommendations: ["Accelerate procurement to improve execution rate"],
  },
  {
    id: "BL-002",
    ministry: "Ministry of Energy",
    program: "Rural Electrification",
    vote: "V1062",
    description: "Last-mile connectivity using solar mini-grids",
    allocatedAmount: 8500000000,
    executedAmount: 7200000000,
    ndcRelevance: "MEDIUM",
    ndcCategory: "MITIGATION",
    linkedTargets: ["NDC-E003"],
    expectedReductions: 85000,
    actualReductions: 72000,
    alignmentScore: 78,
    fiscalYear: 2024,
    recommendations: ["Strengthen monitoring of mini-grid emissions reductions"],
  },
  {
    id: "BL-003",
    ministry: "Ministry of Transport",
    program: "Public Transport Modernization",
    vote: "V1082",
    description: "BRT and mass transit system development",
    allocatedAmount: 22000000000,
    executedAmount: 15000000000,
    ndcRelevance: "HIGH",
    ndcCategory: "MITIGATION",
    linkedTargets: ["NDC-T001"],
    expectedReductions: 180000,
    actualReductions: 95000,
    alignmentScore: 65,
    fiscalYear: 2024,
    recommendations: ["Review project delays affecting emissions impact", "Consider EV integration"],
  },
  {
    id: "BL-004",
    ministry: "Ministry of Environment",
    program: "Forest Conservation",
    vote: "V1151",
    description: "Protected area management and reforestation",
    allocatedAmount: 6500000000,
    executedAmount: 6200000000,
    ndcRelevance: "HIGH",
    ndcCategory: "MITIGATION",
    linkedTargets: ["NDC-F001", "NDC-F002"],
    expectedReductions: 320000,
    actualReductions: 305000,
    alignmentScore: 95,
    fiscalYear: 2024,
    recommendations: [],
  },
  {
    id: "BL-005",
    ministry: "Ministry of Agriculture",
    program: "Climate-Smart Agriculture",
    vote: "V1191",
    description: "Sustainable farming practices and resilient crops",
    allocatedAmount: 12000000000,
    executedAmount: 9800000000,
    ndcRelevance: "HIGH",
    ndcCategory: "CROSS_CUTTING",
    linkedTargets: ["NDC-A001", "NDC-A002"],
    expectedReductions: 145000,
    actualReductions: 118000,
    alignmentScore: 81,
    fiscalYear: 2024,
    recommendations: ["Expand coverage to more counties"],
  },
  {
    id: "BL-006",
    ministry: "Ministry of Water",
    program: "Water Infrastructure Development",
    vote: "V1141",
    description: "Dams, water harvesting and storage facilities",
    allocatedAmount: 18000000000,
    executedAmount: 14000000000,
    ndcRelevance: "MEDIUM",
    ndcCategory: "ADAPTATION",
    linkedTargets: ["NDC-W001"],
    expectedReductions: 25000,
    actualReductions: 18000,
    alignmentScore: 72,
    fiscalYear: 2024,
    recommendations: ["Integrate renewable energy for pumping"],
  },
  {
    id: "BL-007",
    ministry: "Ministry of Housing",
    program: "Affordable Housing Program",
    vote: "V2011",
    description: "Housing construction under Big Four Agenda",
    allocatedAmount: 25000000000,
    executedAmount: 20000000000,
    ndcRelevance: "LOW",
    ndcCategory: "NOT_APPLICABLE",
    linkedTargets: [],
    expectedReductions: 0,
    actualReductions: 0,
    alignmentScore: 25,
    fiscalYear: 2024,
    recommendations: ["Integrate green building standards", "Require energy efficiency certification"],
  },
  {
    id: "BL-008",
    ministry: "Ministry of Industry",
    program: "Industrial Development",
    vote: "V2041",
    description: "Special Economic Zones and industrial parks",
    allocatedAmount: 8000000000,
    executedAmount: 5500000000,
    ndcRelevance: "LOW",
    ndcCategory: "NOT_APPLICABLE",
    linkedTargets: [],
    expectedReductions: 0,
    actualReductions: 0,
    alignmentScore: 18,
    fiscalYear: 2024,
    recommendations: ["Mandate emissions reporting for SEZs", "Integrate clean energy requirements"],
  },
];

const ministryAlignments: MinistryAlignmentSummary[] = [
  {
    ministry: "Ministry of Environment",
    totalBudget: 12500000000,
    climateBudget: 10200000000,
    climatePercentage: 81.6,
    mitigationAmount: 6500000000,
    adaptationAmount: 2800000000,
    crossCuttingAmount: 900000000,
    alignmentScore: 95,
    trend: "UP",
    ndcContribution: 12.5,
  },
  {
    ministry: "Ministry of Energy",
    totalBudget: 45000000000,
    climateBudget: 23500000000,
    climatePercentage: 52.2,
    mitigationAmount: 22000000000,
    adaptationAmount: 500000000,
    crossCuttingAmount: 1000000000,
    alignmentScore: 88,
    trend: "UP",
    ndcContribution: 28.8,
  },
  {
    ministry: "Ministry of Agriculture",
    totalBudget: 38000000000,
    climateBudget: 15200000000,
    climatePercentage: 40.0,
    mitigationAmount: 5000000000,
    adaptationAmount: 8200000000,
    crossCuttingAmount: 2000000000,
    alignmentScore: 81,
    trend: "STABLE",
    ndcContribution: 18.6,
  },
  {
    ministry: "Ministry of Water",
    totalBudget: 32000000000,
    climateBudget: 18000000000,
    climatePercentage: 56.3,
    mitigationAmount: 2000000000,
    adaptationAmount: 15500000000,
    crossCuttingAmount: 500000000,
    alignmentScore: 72,
    trend: "UP",
    ndcContribution: 8.2,
  },
  {
    ministry: "Ministry of Transport",
    totalBudget: 85000000000,
    climateBudget: 22000000000,
    climatePercentage: 25.9,
    mitigationAmount: 20000000000,
    adaptationAmount: 1500000000,
    crossCuttingAmount: 500000000,
    alignmentScore: 65,
    trend: "DOWN",
    ndcContribution: 15.4,
  },
  {
    ministry: "Ministry of Housing",
    totalBudget: 35000000000,
    climateBudget: 2500000000,
    climatePercentage: 7.1,
    mitigationAmount: 1500000000,
    adaptationAmount: 800000000,
    crossCuttingAmount: 200000000,
    alignmentScore: 25,
    trend: "STABLE",
    ndcContribution: 1.2,
  },
];

const ndcBudgetGaps: NDCBudgetGap[] = [
  {
    target: "32% Energy Sector Reduction",
    sector: "Energy",
    requiredBudget: 45000000000,
    allocatedBudget: 23500000000,
    gap: 21500000000,
    gapPercentage: 47.8,
    impact: "Risk of missing 2030 target by 8-12%",
  },
  {
    target: "25% Transport Emissions Reduction",
    sector: "Transport",
    requiredBudget: 38000000000,
    allocatedBudget: 22000000000,
    gap: 16000000000,
    gapPercentage: 42.1,
    impact: "Limited progress on urban mobility transition",
  },
  {
    target: "10% Forest Cover Target",
    sector: "LULUCF",
    requiredBudget: 18000000000,
    allocatedBudget: 10200000000,
    gap: 7800000000,
    gapPercentage: 43.3,
    impact: "Reforestation targets may not be achieved",
  },
  {
    target: "30% Waste Sector Reduction",
    sector: "Waste",
    requiredBudget: 8500000000,
    allocatedBudget: 3200000000,
    gap: 5300000000,
    gapPercentage: 62.4,
    impact: "Methane capture projects delayed",
  },
];

const relevanceConfig = {
  HIGH: { label: "High", bg: "bg-emerald-100", text: "text-emerald-700" },
  MEDIUM: { label: "Medium", bg: "bg-blue-100", text: "text-blue-700" },
  LOW: { label: "Low", bg: "bg-amber-100", text: "text-amber-700" },
  NONE: { label: "None", bg: "bg-slate-100", text: "text-slate-700" },
};

const categoryConfig = {
  MITIGATION: { label: "Mitigation", bg: "bg-blue-100", text: "text-blue-700" },
  ADAPTATION: { label: "Adaptation", bg: "bg-emerald-100", text: "text-emerald-700" },
  CROSS_CUTTING: { label: "Cross-Cutting", bg: "bg-violet-100", text: "text-violet-700" },
  NOT_APPLICABLE: { label: "N/A", bg: "bg-slate-100", text: "text-slate-700" },
};

function formatCurrency(amount: number): string {
  if (Math.abs(amount) >= 1000000000000) return `KES ${(amount / 1000000000000).toFixed(1)}T`;
  if (Math.abs(amount) >= 1000000000) return `KES ${(amount / 1000000000).toFixed(1)}B`;
  if (Math.abs(amount) >= 1000000) return `KES ${(amount / 1000000).toFixed(0)}M`;
  return `KES ${amount.toLocaleString()}`;
}

export default function BudgetNDCAlignmentPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "lines" | "gaps">("overview");
  const [relevanceFilter, setRelevanceFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredBudgetLines = mockBudgetLines.filter((line) => {
    const matchesRelevance = relevanceFilter === "ALL" || line.ndcRelevance === relevanceFilter;
    const matchesCategory = categoryFilter === "ALL" || line.ndcCategory === categoryFilter;
    return matchesRelevance && matchesCategory;
  });

  const totalBudget = mockBudgetLines.reduce((sum, l) => sum + l.allocatedAmount, 0);
  const climateBudget = mockBudgetLines
    .filter((l) => l.ndcRelevance !== "NONE")
    .reduce((sum, l) => sum + l.allocatedAmount, 0);
  const totalExpectedReductions = mockBudgetLines.reduce((sum, l) => sum + l.expectedReductions, 0);
  const totalActualReductions = mockBudgetLines.reduce((sum, l) => sum + l.actualReductions, 0);
  const overallAlignmentScore = Math.round(
    mockBudgetLines.reduce((sum, l) => sum + l.alignmentScore, 0) / mockBudgetLines.length
  );
  const totalGap = ndcBudgetGaps.reduce((sum, g) => sum + g.gap, 0);

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
            <span>Budget-NDC Alignment</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Budget-NDC Alignment Analysis
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Analyze how the national budget aligns with NDC targets and climate commitments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none">
            <option value="2024">FY 2024/25</option>
            <option value="2023">FY 2023/24</option>
            <option value="2022">FY 2022/23</option>
          </select>
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
                Analyze Budget
              </>
            )}
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="card bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--primary)/0.05)] border-[hsl(var(--primary)/0.2)]">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--primary))]">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Budget Alignment Summary - FY 2024/25
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
              Analysis of climate-relevant budget allocations and their contribution to NDC targets
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
              <div className="p-3 rounded-xl bg-white/70">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Total Analyzed</p>
                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                  {formatCurrency(totalBudget)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/70">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Climate-Relevant</p>
                <p className="text-xl font-bold text-emerald-600">
                  {formatCurrency(climateBudget)}
                </p>
                <p className="text-xs text-emerald-600">
                  {((climateBudget / totalBudget) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/70">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Alignment Score</p>
                <p className={`text-xl font-bold ${
                  overallAlignmentScore >= 70 ? "text-emerald-600" :
                  overallAlignmentScore >= 50 ? "text-amber-600" : "text-red-600"
                }`}>
                  {overallAlignmentScore}/100
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/70">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Expected Reductions</p>
                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                  {(totalExpectedReductions / 1000).toFixed(0)}K tCO2e
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Achieved: {(totalActualReductions / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/70">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Funding Gap</p>
                <p className="text-xl font-bold text-red-600">
                  {formatCurrency(totalGap)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {overallAlignmentScore < 70 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-800">Budget Alignment Below Target</p>
              <p className="text-sm text-amber-700 mt-1">
                Current alignment score ({overallAlignmentScore}/100) is below the recommended threshold of 70.
                Consider reallocating resources from low-relevance programs to high-impact climate activities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-2xl bg-[hsl(var(--secondary))] p-1.5">
        {[
          { id: "overview" as const, label: "Ministry Overview", icon: Building2 },
          { id: "lines" as const, label: "Budget Lines", icon: FileText },
          { id: "gaps" as const, label: "NDC Gaps", icon: Target },
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

      {/* Ministry Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Ministry Climate Budget Alignment
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[hsl(var(--border))]">
                    <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      Ministry
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      Total Budget
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      Climate Budget
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      % Climate
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      Alignment
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      Trend
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      NDC Contribution
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {ministryAlignments
                    .sort((a, b) => b.alignmentScore - a.alignmentScore)
                    .map((ministry) => (
                      <tr key={ministry.ministry} className="hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                        <td className="px-4 py-4">
                          <p className="font-medium text-[hsl(var(--foreground))]">{ministry.ministry}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                              Mit: {formatCurrency(ministry.mitigationAmount)}
                            </span>
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                              Adp: {formatCurrency(ministry.adaptationAmount)}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right text-sm text-[hsl(var(--foreground))]">
                          {formatCurrency(ministry.totalBudget)}
                        </td>
                        <td className="px-4 py-4 text-right text-sm font-medium text-emerald-600">
                          {formatCurrency(ministry.climateBudget)}
                        </td>
                        <td className="px-4 py-4 text-right text-sm text-[hsl(var(--foreground))]">
                          {ministry.climatePercentage.toFixed(1)}%
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                            ministry.alignmentScore >= 80 ? "bg-emerald-100 text-emerald-700" :
                            ministry.alignmentScore >= 60 ? "bg-blue-100 text-blue-700" :
                            ministry.alignmentScore >= 40 ? "bg-amber-100 text-amber-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {ministry.alignmentScore}/100
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          {ministry.trend === "UP" ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 text-sm">
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          ) : ministry.trend === "DOWN" ? (
                            <span className="inline-flex items-center gap-1 text-red-600 text-sm">
                              <ArrowDownRight className="h-4 w-4" />
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-right text-sm font-medium text-[hsl(var(--primary))]">
                          {ministry.ndcContribution.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Budget Lines Tab */}
      {activeTab === "lines" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Filter:</span>
            </div>
            <select
              value={relevanceFilter}
              onChange={(e) => setRelevanceFilter(e.target.value)}
              className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
            >
              <option value="ALL">All Relevance</option>
              <option value="HIGH">High Relevance</option>
              <option value="MEDIUM">Medium Relevance</option>
              <option value="LOW">Low Relevance</option>
              <option value="NONE">No Relevance</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="MITIGATION">Mitigation</option>
              <option value="ADAPTATION">Adaptation</option>
              <option value="CROSS_CUTTING">Cross-Cutting</option>
              <option value="NOT_APPLICABLE">Not Applicable</option>
            </select>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Budget Line Analysis
            </h2>
            <div className="space-y-4">
              {filteredBudgetLines.map((line) => {
                const relevance = relevanceConfig[line.ndcRelevance];
                const category = categoryConfig[line.ndcCategory];
                const executionRate = (line.executedAmount / line.allocatedAmount) * 100;
                const reductionRate = line.expectedReductions > 0
                  ? (line.actualReductions / line.expectedReductions) * 100
                  : 0;

                return (
                  <div
                    key={line.id}
                    className="p-4 rounded-xl border border-[hsl(var(--border))] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[hsl(var(--muted-foreground))]">{line.vote}</span>
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${relevance.bg} ${relevance.text}`}>
                            {relevance.label} Relevance
                          </span>
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${category.bg} ${category.text}`}>
                            {category.label}
                          </span>
                        </div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mt-1">{line.program}</h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">{line.ministry}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{line.description}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${
                          line.alignmentScore >= 80 ? "text-emerald-600" :
                          line.alignmentScore >= 60 ? "text-blue-600" :
                          line.alignmentScore >= 40 ? "text-amber-600" :
                          "text-red-600"
                        }`}>
                          {line.alignmentScore}
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">Alignment Score</p>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">Allocated</p>
                        <p className="text-lg font-bold text-[hsl(var(--foreground))]">
                          {formatCurrency(line.allocatedAmount)}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">Executed</p>
                        <p className="text-lg font-bold text-[hsl(var(--foreground))]">
                          {formatCurrency(line.executedAmount)}
                        </p>
                        <p className={`text-xs ${executionRate >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
                          {executionRate.toFixed(0)}% execution
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">Expected Reductions</p>
                        <p className="text-lg font-bold text-[hsl(var(--foreground))]">
                          {line.expectedReductions > 0 ? `${(line.expectedReductions / 1000).toFixed(0)}K tCO2e` : "—"}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">Actual Reductions</p>
                        <p className={`text-lg font-bold ${reductionRate >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
                          {line.actualReductions > 0 ? `${(line.actualReductions / 1000).toFixed(0)}K tCO2e` : "—"}
                        </p>
                        {line.expectedReductions > 0 && (
                          <p className={`text-xs ${reductionRate >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
                            {reductionRate.toFixed(0)}% achieved
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Linked NDC Targets */}
                    {line.linkedTargets.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mb-2">Linked NDC Targets</p>
                        <div className="flex flex-wrap gap-2">
                          {line.linkedTargets.map((target) => (
                            <span
                              key={target}
                              className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--primary)/0.1)] px-2.5 py-1 text-xs font-medium text-[hsl(var(--primary))]"
                            >
                              <Target className="h-3 w-3" />
                              {target}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    {line.recommendations.length > 0 && (
                      <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <p className="text-xs font-medium text-amber-800 mb-1">AI Recommendations</p>
                        <ul className="space-y-1">
                          {line.recommendations.map((rec, i) => (
                            <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* NDC Gaps Tab */}
      {activeTab === "gaps" && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              NDC Target Funding Gaps
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
              Critical funding shortfalls that risk NDC target achievement
            </p>
            <div className="space-y-4">
              {ndcBudgetGaps
                .sort((a, b) => b.gapPercentage - a.gapPercentage)
                .map((gap) => (
                  <div
                    key={gap.target}
                    className="p-4 rounded-xl border border-[hsl(var(--border))]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-[hsl(var(--secondary))] px-2.5 py-1 text-xs font-medium text-[hsl(var(--foreground))]">
                            {gap.sector}
                          </span>
                        </div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mt-1">{gap.target}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">{gap.gapPercentage.toFixed(0)}%</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">Underfunded</p>
                      </div>
                    </div>

                    {/* Funding visualization */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))] mb-1">
                        <span>Allocated: {formatCurrency(gap.allocatedBudget)}</span>
                        <span>Required: {formatCurrency(gap.requiredBudget)}</span>
                      </div>
                      <div className="h-4 rounded-full bg-[hsl(var(--secondary))]">
                        <div
                          className="h-4 rounded-full bg-emerald-500"
                          style={{ width: `${(gap.allocatedBudget / gap.requiredBudget) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-red-50">
                        <p className="text-xs text-red-600">Funding Gap</p>
                        <p className="text-xl font-bold text-red-700">{formatCurrency(gap.gap)}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50">
                        <p className="text-xs text-amber-600">Risk Impact</p>
                        <p className="text-sm font-medium text-amber-700">{gap.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Summary Card */}
          <div className="card bg-red-50 border-red-200">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">Total Funding Gap for NDC Achievement</h3>
                <p className="text-3xl font-bold text-red-700 mt-2">{formatCurrency(totalGap)}</p>
                <p className="text-sm text-red-600 mt-2">
                  Without addressing this funding gap, Kenya risks falling short of its 2030 NDC commitments.
                  Consider climate budget reallocation, green bond issuance, and enhanced international climate finance mobilization.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
