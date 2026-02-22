"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileCheck,
  Search,
  Filter,
  Plus,
  Globe,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Eye,
  Edit,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";

type LoaStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "UNDER_REVIEW"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED"
  | "REVOKED";

type Article6Mechanism = "ARTICLE_6_2" | "ARTICLE_6_4";

interface LetterOfAuthorization {
  id: string;
  loaNumber: string;
  version: number;
  registryProjectId: string;
  projectTitle: string;
  mechanism: Article6Mechanism;
  acquiringCountry: string;
  acquiringEntity: string;
  authorizedQuantity: number;
  vintage: number[];
  creditingPeriodStart: string;
  creditingPeriodEnd: string;
  correspondingAdjustmentRequired: boolean;
  pricePerTonne?: number;
  currency?: string;
  status: LoaStatus;
  submittedAt?: string;
  submittedBy?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  approvedAt?: string;
  approvedBy?: string;
  currentStep?: number;
  totalSteps?: number;
}

const mockLoAs: LetterOfAuthorization[] = [
  {
    id: "1",
    loaNumber: "LOA-2024-MRB-001",
    version: 1,
    registryProjectId: "PRJ-MRB-001",
    projectTitle: "Marsabit Wind Farm Phase II",
    mechanism: "ARTICLE_6_2",
    acquiringCountry: "Switzerland",
    acquiringEntity: "Swiss Climate Foundation",
    authorizedQuantity: 250000,
    vintage: [2024, 2025, 2026],
    creditingPeriodStart: "2024-01-01",
    creditingPeriodEnd: "2030-12-31",
    correspondingAdjustmentRequired: true,
    pricePerTonne: 25,
    currency: "USD",
    status: "PENDING_APPROVAL",
    submittedAt: "2024-01-10",
    submittedBy: "John Kimani",
    reviewedAt: "2024-01-12",
    reviewedBy: "Mary Wanjiku",
    currentStep: 3,
    totalSteps: 4,
  },
  {
    id: "2",
    loaNumber: "LOA-2024-KTI-002",
    version: 1,
    registryProjectId: "PRJ-KTI-002",
    projectTitle: "Kitui Smart Agriculture CSA",
    mechanism: "ARTICLE_6_4",
    acquiringCountry: "Japan",
    acquiringEntity: "Japan Carbon Partners",
    authorizedQuantity: 85000,
    vintage: [2024, 2025],
    creditingPeriodStart: "2024-03-01",
    creditingPeriodEnd: "2029-02-28",
    correspondingAdjustmentRequired: true,
    pricePerTonne: 18,
    currency: "USD",
    status: "UNDER_REVIEW",
    submittedAt: "2024-01-08",
    submittedBy: "Grace Muthoni",
    currentStep: 2,
    totalSteps: 4,
  },
  {
    id: "3",
    loaNumber: "LOA-2024-NRB-003",
    version: 1,
    registryProjectId: "PRJ-NRB-003",
    projectTitle: "Nairobi E-Mobility Initiative",
    mechanism: "ARTICLE_6_2",
    acquiringCountry: "Singapore",
    acquiringEntity: "Singapore Green Exchange",
    authorizedQuantity: 120000,
    vintage: [2024, 2025, 2026, 2027],
    creditingPeriodStart: "2024-06-01",
    creditingPeriodEnd: "2031-05-31",
    correspondingAdjustmentRequired: true,
    pricePerTonne: 22,
    currency: "USD",
    status: "PENDING_REVIEW",
    submittedAt: "2024-01-05",
    submittedBy: "Peter Ochieng",
    currentStep: 1,
    totalSteps: 4,
  },
  {
    id: "4",
    loaNumber: "LOA-2023-KKM-004",
    version: 2,
    registryProjectId: "PRJ-KKM-004",
    projectTitle: "Kakamega Forest Protection",
    mechanism: "ARTICLE_6_2",
    acquiringCountry: "Germany",
    acquiringEntity: "KfW Carbon Fund",
    authorizedQuantity: 180000,
    vintage: [2023, 2024, 2025],
    creditingPeriodStart: "2023-01-01",
    creditingPeriodEnd: "2028-12-31",
    correspondingAdjustmentRequired: true,
    pricePerTonne: 20,
    currency: "USD",
    status: "APPROVED",
    submittedAt: "2023-10-15",
    submittedBy: "Alice Chen",
    reviewedAt: "2023-10-20",
    reviewedBy: "David Kibet",
    approvedAt: "2023-10-25",
    approvedBy: "Director CCD",
    currentStep: 4,
    totalSteps: 4,
  },
  {
    id: "5",
    loaNumber: "LOA-2024-MSA-005",
    version: 1,
    registryProjectId: "PRJ-MSA-005",
    projectTitle: "Mombasa Mangrove Restoration",
    mechanism: "ARTICLE_6_4",
    acquiringCountry: "South Korea",
    acquiringEntity: "Korea Carbon Trading",
    authorizedQuantity: 95000,
    vintage: [2024, 2025, 2026],
    creditingPeriodStart: "2024-04-01",
    creditingPeriodEnd: "2032-03-31",
    correspondingAdjustmentRequired: true,
    status: "DRAFT",
    currentStep: 0,
    totalSteps: 4,
  },
  {
    id: "6",
    loaNumber: "LOA-2023-TRK-006",
    version: 1,
    registryProjectId: "PRJ-TRK-006",
    projectTitle: "Turkana Solar Mini-Grid",
    mechanism: "ARTICLE_6_2",
    acquiringCountry: "Norway",
    acquiringEntity: "Norwegian Climate Fund",
    authorizedQuantity: 45000,
    vintage: [2023, 2024],
    creditingPeriodStart: "2023-07-01",
    creditingPeriodEnd: "2027-06-30",
    correspondingAdjustmentRequired: true,
    pricePerTonne: 28,
    currency: "USD",
    status: "REJECTED",
    submittedAt: "2023-11-01",
    submittedBy: "Bob Wilson",
    reviewedAt: "2023-11-10",
    reviewedBy: "Jane Smith",
    currentStep: 2,
    totalSteps: 4,
  },
];

const statusConfig: Record<LoaStatus, { icon: typeof CheckCircle; bg: string; text: string; label: string }> = {
  DRAFT: { icon: Edit, bg: "bg-slate-100", text: "text-slate-700", label: "Draft" },
  PENDING_REVIEW: { icon: Clock, bg: "bg-amber-100", text: "text-amber-700", label: "Pending Review" },
  UNDER_REVIEW: { icon: Eye, bg: "bg-blue-100", text: "text-blue-700", label: "Under Review" },
  PENDING_APPROVAL: { icon: Clock, bg: "bg-violet-100", text: "text-violet-700", label: "Pending Approval" },
  APPROVED: { icon: CheckCircle, bg: "bg-emerald-100", text: "text-emerald-700", label: "Approved" },
  REJECTED: { icon: XCircle, bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
  SUSPENDED: { icon: AlertCircle, bg: "bg-orange-100", text: "text-orange-700", label: "Suspended" },
  REVOKED: { icon: XCircle, bg: "bg-red-100", text: "text-red-700", label: "Revoked" },
};

const mechanismConfig: Record<Article6Mechanism, { label: string; color: string }> = {
  ARTICLE_6_2: { label: "Article 6.2", color: "blue" },
  ARTICLE_6_4: { label: "Article 6.4", color: "emerald" },
};

export default function LoaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LoaStatus | "ALL">("ALL");
  const [mechanismFilter, setMechanismFilter] = useState<Article6Mechanism | "ALL">("ALL");

  const filteredLoAs = mockLoAs.filter((loa) => {
    const matchesSearch =
      loa.loaNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loa.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loa.acquiringCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loa.acquiringEntity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || loa.status === statusFilter;
    const matchesMechanism = mechanismFilter === "ALL" || loa.mechanism === mechanismFilter;
    return matchesSearch && matchesStatus && matchesMechanism;
  });

  const stats = {
    total: mockLoAs.length,
    pending: mockLoAs.filter((l) => ["PENDING_REVIEW", "UNDER_REVIEW", "PENDING_APPROVAL"].includes(l.status)).length,
    approved: mockLoAs.filter((l) => l.status === "APPROVED").length,
    totalQuantity: mockLoAs.filter((l) => l.status === "APPROVED").reduce((sum, l) => sum + l.authorizedQuantity, 0),
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/finance" className="hover:text-[hsl(var(--primary))]">
              Finance
            </Link>
            <span>/</span>
            <span>Letters of Authorization</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Letters of Authorization
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Manage Article 6 ITMO transfer authorizations
          </p>
        </div>
        <Link
          href="/dashboard/finance/loa/create"
          className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors"
        >
          <Plus className="h-4 w-4" />
          New LoA Request
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Requests</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Pending Review</p>
          <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Approved</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.approved}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Authorized Volume</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))]">
            {(stats.totalQuantity / 1000).toFixed(0)}K tCO2e
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search LoAs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as LoaStatus | "ALL")}
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
            value={mechanismFilter}
            onChange={(e) => setMechanismFilter(e.target.value as Article6Mechanism | "ALL")}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="ALL">All Mechanisms</option>
            <option value="ARTICLE_6_2">Article 6.2</option>
            <option value="ARTICLE_6_4">Article 6.4</option>
          </select>
        </div>
      </div>

      {/* LoA Cards */}
      <div className="space-y-4">
        {filteredLoAs.map((loa) => {
          const statusConf = statusConfig[loa.status];
          const mechanismConf = mechanismConfig[loa.mechanism];
          const StatusIcon = statusConf.icon;

          return (
            <div
              key={loa.id}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-[hsl(var(--muted-foreground))]">
                      {loa.loaNumber}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-${mechanismConf.color}-100 text-${mechanismConf.color}-700`}>
                      {mechanismConf.label}
                    </span>
                    {loa.version > 1 && (
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">
                        v{loa.version}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mt-1">
                    {loa.projectTitle}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                    <span className="inline-flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      {loa.acquiringCountry} · {loa.acquiringEntity}
                    </span>
                    <span className="font-medium text-[hsl(var(--foreground))]">
                      {loa.authorizedQuantity.toLocaleString()} tCO2e
                    </span>
                    <span>
                      Vintages: {loa.vintage.join(", ")}
                    </span>
                    {loa.pricePerTonne && (
                      <span className="text-emerald-600">
                        ${loa.pricePerTonne}/tCO2e
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${statusConf.bg} ${statusConf.text}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {statusConf.label}
                  </span>
                  <button className="rounded-lg p-2 hover:bg-[hsl(var(--secondary))] transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  </button>
                </div>
              </div>

              {/* Progress Steps */}
              {loa.totalSteps && (
                <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">
                      Approval Progress
                    </span>
                    <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                      Step {loa.currentStep} of {loa.totalSteps}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: loa.totalSteps }).map((_, idx) => (
                      <div key={idx} className="flex-1 flex items-center">
                        <div
                          className={`h-2 flex-1 rounded-full ${
                            idx < (loa.currentStep || 0)
                              ? loa.status === "REJECTED"
                                ? "bg-red-500"
                                : "bg-emerald-500"
                              : idx === (loa.currentStep || 0) && loa.status !== "REJECTED" && loa.status !== "APPROVED"
                                ? "bg-amber-500"
                                : "bg-[hsl(var(--secondary))]"
                          }`}
                        />
                        {idx < loa.totalSteps - 1 && (
                          <ArrowRight className="h-3 w-3 mx-1 text-[hsl(var(--muted-foreground))]" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                    <span>Submission</span>
                    <span>Technical Review</span>
                    <span>Legal Review</span>
                    <span>Final Approval</span>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] flex flex-wrap items-center gap-6 text-xs text-[hsl(var(--muted-foreground))]">
                {loa.submittedAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Submitted: {new Date(loa.submittedAt).toLocaleDateString("en-GB")}
                    {loa.submittedBy && ` by ${loa.submittedBy}`}
                  </div>
                )}
                {loa.reviewedAt && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    Reviewed: {new Date(loa.reviewedAt).toLocaleDateString("en-GB")}
                    {loa.reviewedBy && ` by ${loa.reviewedBy}`}
                  </div>
                )}
                {loa.approvedAt && (
                  <div className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle className="h-3 w-3" />
                    Approved: {new Date(loa.approvedAt).toLocaleDateString("en-GB")}
                    {loa.approvedBy && ` by ${loa.approvedBy}`}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] flex items-center gap-3">
                <Link
                  href={`/dashboard/finance/loa/${loa.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--primary))] hover:underline"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {loa.status === "DRAFT" && (
                  <button className="text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                    Edit Draft
                  </button>
                )}
                {["PENDING_REVIEW", "UNDER_REVIEW", "PENDING_APPROVAL"].includes(loa.status) && (
                  <button className="text-sm font-medium text-amber-600 hover:text-amber-700">
                    Review Request
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
