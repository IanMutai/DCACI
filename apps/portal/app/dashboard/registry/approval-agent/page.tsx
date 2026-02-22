"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bot,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Target,
  BarChart3,
  Shield,
  FileCheck,
  Zap,
  RefreshCw,
  Eye,
  ArrowRight,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Layers,
  Lock,
  Unlock,
  Users,
  Building2,
  Globe,
  ListChecks,
  ChevronRight,
  Info,
} from "lucide-react";

interface ApprovalCheck {
  id: string;
  name: string;
  category: "NDC_ALIGNMENT" | "CARBON_BUDGET" | "MRV_COMPLIANCE" | "ENTITY_WHITELIST" | "METHODOLOGY" | "ENVIRONMENTAL_SAFEGUARDS";
  status: "PASSED" | "FAILED" | "WARNING" | "PENDING" | "SKIPPED";
  score: number;
  maxScore: number;
  details: string;
  recommendation?: string;
  linkedData?: {
    type: string;
    id: string;
    label: string;
  };
}

interface ProjectApprovalRequest {
  id: string;
  projectId: string;
  projectTitle: string;
  projectDeveloper: string;
  sector: string;
  county: string;
  submittedAt: string;
  expectedReductions: number;
  requestedCredits: number;
  mechanism: "ARTICLE_6_2" | "ARTICLE_6_4" | "VOLUNTARY";
  status: "PENDING_REVIEW" | "AI_APPROVED" | "AI_FLAGGED" | "MANUAL_REVIEW" | "APPROVED" | "REJECTED";
  agentScore: number;
  checks: ApprovalCheck[];
  agentRecommendation: "APPROVE" | "REJECT" | "MANUAL_REVIEW";
  agentRationale: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

interface WhitelistEntity {
  id: string;
  type: "PROJECT_DEVELOPER" | "VERIFIER" | "METHODOLOGY" | "COUNTERPARTY";
  name: string;
  registrationNumber?: string;
  country: string;
  status: "ACTIVE" | "SUSPENDED" | "PENDING";
  approvedSince: string;
  lastVerified: string;
  projectsCount: number;
  totalCredits: number;
  riskRating: "LOW" | "MEDIUM" | "HIGH";
}

interface CarbonBudgetCheck {
  sectorBudget: number;
  sectorUsed: number;
  sectorAvailable: number;
  requestedAmount: number;
  itmoReserveAvailable: number;
  bufferRequired: number;
  postApprovalAvailable: number;
  isWithinBudget: boolean;
  recommendation: string;
}

const mockApprovalRequests: ProjectApprovalRequest[] = [
  {
    id: "APR-001",
    projectId: "PRJ-2024-045",
    projectTitle: "Turkana Solar Mini-Grid Expansion",
    projectDeveloper: "Kenya Renewable Energy Ltd",
    sector: "Energy",
    county: "Turkana",
    submittedAt: "2024-01-22",
    expectedReductions: 45000,
    requestedCredits: 42000,
    mechanism: "ARTICLE_6_2",
    status: "AI_APPROVED",
    agentScore: 94,
    agentRecommendation: "APPROVE",
    agentRationale: "Project demonstrates strong NDC alignment with Energy sector targets, developer is whitelisted with excellent track record, carbon budget is available, and MRV baseline documentation is complete. All safeguards checks passed.",
    checks: [
      { id: "CHK-001", name: "NDC Sector Alignment", category: "NDC_ALIGNMENT", status: "PASSED", score: 25, maxScore: 25, details: "Project aligns with NDC Energy target E001 (conditional 32% total reduction by 2030, 7% unconditional)", linkedData: { type: "target", id: "NDC-E001", label: "Energy Sector Target" } },
      { id: "CHK-002", name: "Carbon Budget Availability", category: "CARBON_BUDGET", status: "PASSED", score: 20, maxScore: 20, details: "Requested 42,000 tCO2e within available sector budget of 14.3M tCO2e" },
      { id: "CHK-003", name: "Developer Whitelist Status", category: "ENTITY_WHITELIST", status: "PASSED", score: 15, maxScore: 15, details: "Kenya Renewable Energy Ltd is an approved developer since 2019", linkedData: { type: "entity", id: "DEV-001", label: "Kenya Renewable Energy Ltd" } },
      { id: "CHK-004", name: "MRV Baseline Documentation", category: "MRV_COMPLIANCE", status: "PASSED", score: 15, maxScore: 15, details: "Complete GHG inventory baseline submitted and verified" },
      { id: "CHK-005", name: "Methodology Approval", category: "METHODOLOGY", status: "PASSED", score: 10, maxScore: 10, details: "ACM0002 methodology approved for grid-connected solar" },
      { id: "CHK-006", name: "Environmental & Social Safeguards", category: "ENVIRONMENTAL_SAFEGUARDS", status: "PASSED", score: 9, maxScore: 10, details: "ESIA completed, minor recommendations pending implementation", recommendation: "Follow up on community consultation feedback within 30 days" },
    ],
  },
  {
    id: "APR-002",
    projectId: "PRJ-2024-046",
    projectTitle: "Nairobi Industrial Energy Efficiency",
    projectDeveloper: "Green Industries Kenya",
    sector: "Industry",
    county: "Nairobi",
    submittedAt: "2024-01-21",
    expectedReductions: 28000,
    requestedCredits: 26000,
    mechanism: "ARTICLE_6_4",
    status: "AI_FLAGGED",
    agentScore: 62,
    agentRecommendation: "MANUAL_REVIEW",
    agentRationale: "Project shows potential but has concerning gaps: developer is not yet whitelisted, MRV documentation is incomplete, and the methodology requires additional validation for industrial applications.",
    checks: [
      { id: "CHK-007", name: "NDC Sector Alignment", category: "NDC_ALIGNMENT", status: "PASSED", score: 20, maxScore: 25, details: "Partial alignment with Industry sector target - methodology covers only 80% of proposed activities" },
      { id: "CHK-008", name: "Carbon Budget Availability", category: "CARBON_BUDGET", status: "PASSED", score: 18, maxScore: 20, details: "Within budget but requires 5% OMGE buffer allocation (1,300 tCO2e)" },
      { id: "CHK-009", name: "Developer Whitelist Status", category: "ENTITY_WHITELIST", status: "FAILED", score: 0, maxScore: 15, details: "Green Industries Kenya is not on the approved developer whitelist", recommendation: "Developer must complete accreditation process before approval" },
      { id: "CHK-010", name: "MRV Baseline Documentation", category: "MRV_COMPLIANCE", status: "WARNING", score: 8, maxScore: 15, details: "Baseline inventory incomplete - missing Scope 2 emissions data", recommendation: "Request complete GHG inventory including electricity consumption" },
      { id: "CHK-011", name: "Methodology Approval", category: "METHODOLOGY", status: "WARNING", score: 6, maxScore: 10, details: "AMS-II.C methodology requires additional validation for combined heat & power systems" },
      { id: "CHK-012", name: "Environmental & Social Safeguards", category: "ENVIRONMENTAL_SAFEGUARDS", status: "PASSED", score: 10, maxScore: 10, details: "All safeguards documentation complete and approved" },
    ],
  },
  {
    id: "APR-003",
    projectId: "PRJ-2024-047",
    projectTitle: "Mombasa Waste-to-Energy Facility",
    projectDeveloper: "CleanTech Solutions Africa",
    sector: "Waste",
    county: "Mombasa",
    submittedAt: "2024-01-20",
    expectedReductions: 85000,
    requestedCredits: 80000,
    mechanism: "ARTICLE_6_2",
    status: "PENDING_REVIEW",
    agentScore: 0,
    agentRecommendation: "MANUAL_REVIEW",
    agentRationale: "Awaiting AI agent analysis...",
    checks: [],
  },
];

const mockWhitelist: WhitelistEntity[] = [
  {
    id: "DEV-001",
    type: "PROJECT_DEVELOPER",
    name: "Kenya Renewable Energy Ltd",
    registrationNumber: "KRE-2019-001",
    country: "Kenya",
    status: "ACTIVE",
    approvedSince: "2019-03-15",
    lastVerified: "2024-01-10",
    projectsCount: 8,
    totalCredits: 520000,
    riskRating: "LOW",
  },
  {
    id: "DEV-002",
    type: "PROJECT_DEVELOPER",
    name: "African Solar Holdings",
    registrationNumber: "ASH-2020-015",
    country: "Kenya",
    status: "ACTIVE",
    approvedSince: "2020-06-22",
    lastVerified: "2024-01-05",
    projectsCount: 5,
    totalCredits: 280000,
    riskRating: "LOW",
  },
  {
    id: "VER-001",
    type: "VERIFIER",
    name: "Bureau Veritas Kenya",
    registrationNumber: "BVK-2018-003",
    country: "Kenya",
    status: "ACTIVE",
    approvedSince: "2018-09-01",
    lastVerified: "2023-12-15",
    projectsCount: 24,
    totalCredits: 1850000,
    riskRating: "LOW",
  },
  {
    id: "VER-002",
    type: "VERIFIER",
    name: "RINA Services Kenya",
    registrationNumber: "RSK-2021-008",
    country: "Kenya",
    status: "ACTIVE",
    approvedSince: "2021-02-10",
    lastVerified: "2024-01-08",
    projectsCount: 12,
    totalCredits: 650000,
    riskRating: "LOW",
  },
  {
    id: "CNT-001",
    type: "COUNTERPARTY",
    name: "Swiss Climate Foundation",
    country: "Switzerland",
    status: "ACTIVE",
    approvedSince: "2022-01-15",
    lastVerified: "2024-01-12",
    projectsCount: 3,
    totalCredits: 250000,
    riskRating: "LOW",
  },
  {
    id: "DEV-003",
    type: "PROJECT_DEVELOPER",
    name: "East Africa Carbon Ltd",
    registrationNumber: "EAC-2022-022",
    country: "Kenya",
    status: "SUSPENDED",
    approvedSince: "2022-08-10",
    lastVerified: "2023-11-20",
    projectsCount: 2,
    totalCredits: 45000,
    riskRating: "HIGH",
  },
];

const categoryConfig = {
  NDC_ALIGNMENT: { label: "NDC Alignment", icon: Target, color: "blue" },
  CARBON_BUDGET: { label: "Carbon Budget", icon: BarChart3, color: "emerald" },
  MRV_COMPLIANCE: { label: "MRV Compliance", icon: FileCheck, color: "violet" },
  ENTITY_WHITELIST: { label: "Entity Whitelist", icon: Shield, color: "amber" },
  METHODOLOGY: { label: "Methodology", icon: Layers, color: "cyan" },
  ENVIRONMENTAL_SAFEGUARDS: { label: "Safeguards", icon: CheckCircle, color: "green" },
};

const statusConfig = {
  PASSED: { icon: CheckCircle, color: "emerald", label: "Passed" },
  FAILED: { icon: XCircle, color: "red", label: "Failed" },
  WARNING: { icon: AlertTriangle, color: "amber", label: "Warning" },
  PENDING: { icon: Clock, color: "slate", label: "Pending" },
  SKIPPED: { icon: Clock, color: "slate", label: "Skipped" },
};

const entityTypeConfig = {
  PROJECT_DEVELOPER: { label: "Developer", icon: Building2, color: "blue" },
  VERIFIER: { label: "Verifier", icon: FileCheck, color: "violet" },
  METHODOLOGY: { label: "Methodology", icon: Layers, color: "cyan" },
  COUNTERPARTY: { label: "Counterparty", icon: Globe, color: "emerald" },
};

const riskConfig = {
  LOW: { label: "Low Risk", color: "emerald" },
  MEDIUM: { label: "Medium Risk", color: "amber" },
  HIGH: { label: "High Risk", color: "red" },
};

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toLocaleString();
}

export default function ApprovalAgentPage() {
  const [activeTab, setActiveTab] = useState<"requests" | "whitelist" | "settings">("requests");
  const [selectedRequest, setSelectedRequest] = useState<ProjectApprovalRequest | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [whitelistFilter, setWhitelistFilter] = useState<string>("ALL");

  const pendingRequests = mockApprovalRequests.filter((r) => r.status === "PENDING_REVIEW");
  const flaggedRequests = mockApprovalRequests.filter((r) => r.status === "AI_FLAGGED");
  const approvedRequests = mockApprovalRequests.filter((r) => r.status === "AI_APPROVED" || r.status === "APPROVED");

  const filteredWhitelist = mockWhitelist.filter((e) => {
    if (whitelistFilter === "ALL") return true;
    return e.type === whitelistFilter;
  });

  const handleRunAgent = (requestId: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/registry" className="hover:text-[hsl(var(--primary))]">
              Registry
            </Link>
            <span>/</span>
            <span>Approval Agent</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Intelligent Project Approval Agent
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            AI-powered project evaluation against NDC targets, carbon budget, MRV data, and entity whitelist
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Agent Active
          </span>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Pending Review</p>
            <Clock className="h-4 w-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))] mt-1">{pendingRequests.length}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">AI Flagged</p>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-600 mt-1">{flaggedRequests.length}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">AI Approved</p>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{approvedRequests.length}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Whitelisted Entities</p>
            <Shield className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))] mt-1">
            {mockWhitelist.filter((e) => e.status === "ACTIVE").length}
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-2xl bg-[hsl(var(--secondary))] p-1.5">
        {[
          { id: "requests" as const, label: "Approval Requests", icon: ListChecks },
          { id: "whitelist" as const, label: "Entity Whitelist", icon: Shield },
          { id: "settings" as const, label: "Agent Settings", icon: Bot },
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

      {/* Approval Requests Tab */}
      {activeTab === "requests" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Request List */}
          <div className="lg:col-span-2 space-y-4">
            {mockApprovalRequests.map((request) => (
              <div
                key={request.id}
                className={`card cursor-pointer hover:shadow-md transition-all ${
                  selectedRequest?.id === request.id ? "ring-2 ring-[hsl(var(--primary))]" : ""
                }`}
                onClick={() => setSelectedRequest(request)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{request.projectId}</span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        request.status === "AI_APPROVED" ? "bg-emerald-100 text-emerald-700" :
                        request.status === "AI_FLAGGED" ? "bg-amber-100 text-amber-700" :
                        request.status === "PENDING_REVIEW" ? "bg-slate-100 text-slate-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {request.status === "AI_APPROVED" ? "AI Approved" :
                         request.status === "AI_FLAGGED" ? "Flagged for Review" :
                         request.status === "PENDING_REVIEW" ? "Pending" : request.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[hsl(var(--foreground))] mt-1">{request.projectTitle}</h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {request.projectDeveloper} · {request.sector} · {request.county}
                    </p>
                  </div>
                  {request.agentScore > 0 && (
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${
                        request.agentScore >= 80 ? "text-emerald-600" :
                        request.agentScore >= 60 ? "text-amber-600" :
                        "text-red-600"
                      }`}>
                        {request.agentScore}
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Agent Score</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div className="p-2 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Expected Reductions</p>
                    <p className="text-sm font-bold text-[hsl(var(--foreground))]">
                      {formatNumber(request.expectedReductions)} tCO2e
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Requested Credits</p>
                    <p className="text-sm font-bold text-[hsl(var(--foreground))]">
                      {formatNumber(request.requestedCredits)} tCO2e
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Mechanism</p>
                    <p className="text-sm font-bold text-[hsl(var(--foreground))]">
                      {request.mechanism.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>

                {request.status === "PENDING_REVIEW" && (
                  <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRunAgent(request.id);
                      }}
                      disabled={isAnalyzing}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Bot className="h-4 w-4" />
                          Run AI Agent Analysis
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            {selectedRequest ? (
              <>
                {/* Agent Assessment */}
                <div className="card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
                      <Bot className="h-5 w-5 text-[hsl(var(--primary))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[hsl(var(--foreground))]">Agent Assessment</h3>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        AI-powered evaluation results
                      </p>
                    </div>
                  </div>

                  {selectedRequest.agentScore > 0 ? (
                    <>
                      <div className={`p-4 rounded-xl mb-4 ${
                        selectedRequest.agentRecommendation === "APPROVE" ? "bg-emerald-50 border border-emerald-200" :
                        selectedRequest.agentRecommendation === "REJECT" ? "bg-red-50 border border-red-200" :
                        "bg-amber-50 border border-amber-200"
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {selectedRequest.agentRecommendation === "APPROVE" ? (
                            <ThumbsUp className="h-5 w-5 text-emerald-600" />
                          ) : selectedRequest.agentRecommendation === "REJECT" ? (
                            <ThumbsDown className="h-5 w-5 text-red-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-amber-600" />
                          )}
                          <span className={`font-semibold ${
                            selectedRequest.agentRecommendation === "APPROVE" ? "text-emerald-800" :
                            selectedRequest.agentRecommendation === "REJECT" ? "text-red-800" :
                            "text-amber-800"
                          }`}>
                            {selectedRequest.agentRecommendation === "APPROVE" ? "Recommended for Approval" :
                             selectedRequest.agentRecommendation === "REJECT" ? "Recommended for Rejection" :
                             "Manual Review Required"}
                          </span>
                        </div>
                        <p className="text-sm text-[hsl(var(--foreground))]">{selectedRequest.agentRationale}</p>
                      </div>

                      {/* Checks */}
                      <div className="space-y-3">
                        {selectedRequest.checks.map((check) => {
                          const category = categoryConfig[check.category];
                          const status = statusConfig[check.status];
                          const CategoryIcon = category.icon;
                          const StatusIcon = status.icon;
                          return (
                            <div key={check.id} className="p-3 rounded-xl border border-[hsl(var(--border))]">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-2">
                                  <CategoryIcon className={`h-4 w-4 text-${category.color}-600 mt-0.5`} />
                                  <div>
                                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{check.name}</p>
                                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{check.details}</p>
                                    {check.recommendation && (
                                      <p className="text-xs text-amber-600 mt-1">
                                        <AlertTriangle className="h-3 w-3 inline mr-1" />
                                        {check.recommendation}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-[hsl(var(--foreground))]">
                                    {check.score}/{check.maxScore}
                                  </span>
                                  <StatusIcon className={`h-4 w-4 text-${status.color}-600`} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Actions */}
                      <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] flex items-center gap-3">
                        <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </button>
                        <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
                          <MessageSquare className="h-4 w-4" />
                          Request Info
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Bot className="h-12 w-12 text-[hsl(var(--muted-foreground))] mx-auto mb-3" />
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        Run AI agent analysis to evaluate this project
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="card">
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-[hsl(var(--muted-foreground))] mx-auto mb-3" />
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Select a request to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Whitelist Tab */}
      {activeTab === "whitelist" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <select
              value={whitelistFilter}
              onChange={(e) => setWhitelistFilter(e.target.value)}
              className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
            >
              <option value="ALL">All Entity Types</option>
              <option value="PROJECT_DEVELOPER">Project Developers</option>
              <option value="VERIFIER">Verifiers</option>
              <option value="COUNTERPARTY">Counterparties</option>
            </select>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors">
              <Users className="h-4 w-4" />
              Add Entity
            </button>
          </div>

          {/* Whitelist Table */}
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Approved Entities Whitelist
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[hsl(var(--border))]">
                    <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      Entity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      Projects
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      Total Credits
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      Risk
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {filteredWhitelist.map((entity) => {
                    const typeConfig = entityTypeConfig[entity.type];
                    const risk = riskConfig[entity.riskRating];
                    const TypeIcon = typeConfig.icon;
                    return (
                      <tr key={entity.id} className="hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <TypeIcon className={`h-5 w-5 text-${typeConfig.color}-600`} />
                            <div>
                              <p className="font-medium text-[hsl(var(--foreground))]">{entity.name}</p>
                              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                {entity.registrationNumber || entity.country}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center rounded-full bg-${typeConfig.color}-100 px-2.5 py-1 text-xs font-medium text-${typeConfig.color}-700`}>
                            {typeConfig.label}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {entity.status === "ACTIVE" ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 text-sm">
                              <Unlock className="h-4 w-4" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-600 text-sm">
                              <Lock className="h-4 w-4" />
                              Suspended
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-right text-sm text-[hsl(var(--foreground))]">
                          {entity.projectsCount}
                        </td>
                        <td className="px-4 py-4 text-right text-sm font-medium text-[hsl(var(--foreground))]">
                          {formatNumber(entity.totalCredits)}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center rounded-full bg-${risk.color}-100 px-2.5 py-1 text-xs font-medium text-${risk.color}-700`}>
                            {risk.label}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button className="text-sm font-medium text-[hsl(var(--primary))] hover:underline">
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Agent Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Agent Configuration
            </h2>
            <div className="space-y-6">
              {/* Scoring Weights */}
              <div>
                <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3">Scoring Weights</h3>
                <div className="space-y-3">
                  {Object.entries(categoryConfig).map(([key, config]) => {
                    const Icon = config.icon;
                    const weights: Record<string, number> = {
                      NDC_ALIGNMENT: 25,
                      CARBON_BUDGET: 20,
                      MRV_COMPLIANCE: 15,
                      ENTITY_WHITELIST: 15,
                      METHODOLOGY: 10,
                      ENVIRONMENTAL_SAFEGUARDS: 10,
                    };
                    return (
                      <div key={key} className="flex items-center gap-4">
                        <div className="flex items-center gap-2 w-48">
                          <Icon className={`h-4 w-4 text-${config.color}-600`} />
                          <span className="text-sm text-[hsl(var(--foreground))]">{config.label}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="30"
                          defaultValue={weights[key]}
                          className="flex-1 h-2 bg-[hsl(var(--secondary))] rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-sm font-medium text-[hsl(var(--foreground))] w-12 text-right">
                          {weights[key]}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Thresholds */}
              <div className="pt-4 border-t border-[hsl(var(--border))]">
                <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3">Approval Thresholds</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[hsl(var(--muted-foreground))]">Auto-Approve Threshold</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="number"
                        defaultValue={80}
                        className="w-20 rounded-xl border border-[hsl(var(--border))] px-3 py-2 text-sm"
                      />
                      <span className="text-sm text-[hsl(var(--muted-foreground))]">/ 100</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[hsl(var(--muted-foreground))]">Manual Review Threshold</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="number"
                        defaultValue={60}
                        className="w-20 rounded-xl border border-[hsl(var(--border))] px-3 py-2 text-sm"
                      />
                      <span className="text-sm text-[hsl(var(--muted-foreground))]">/ 100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integration Settings */}
              <div className="pt-4 border-t border-[hsl(var(--border))]">
                <h3 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3">System Integrations</h3>
                <div className="space-y-3">
                  {[
                    { name: "NDC Target System", status: "Connected", description: "Real-time alignment checking" },
                    { name: "Carbon Budget Registry", status: "Connected", description: "Budget availability verification" },
                    { name: "MRV Data System", status: "Connected", description: "Baseline inventory validation" },
                    { name: "Entity Whitelist", status: "Connected", description: "Developer/verifier verification" },
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-3 rounded-xl border border-[hsl(var(--border))]">
                      <div>
                        <p className="text-sm font-medium text-[hsl(var(--foreground))]">{integration.name}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{integration.description}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {integration.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-[hsl(var(--border))] flex justify-end">
                <button className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors">
                  <CheckCircle className="h-4 w-4" />
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
