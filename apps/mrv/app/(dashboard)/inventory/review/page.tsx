"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  MessageSquare,
  Send,
  FileCheck,
  BarChart3,
  Scale,
  Eye,
  FileText,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
} from "lucide-react";

/* ───────────────────────────────────────────
   QA/QC Review Data
   ─────────────────────────────────────────── */

type CheckStatus = "pass" | "fail" | "pending" | "warning";

interface QACheck {
  id: string;
  category: string;
  name: string;
  description: string;
  status: CheckStatus;
  reviewer: string | null;
  date: string | null;
  comments: string | null;
}

const qaChecks: QACheck[] = [
  {
    id: "complete-1",
    category: "Completeness",
    name: "All IPCC sectors covered",
    description: "Verify that all 5 IPCC sectors (Energy, IPPU, Agriculture, LULUCF, Waste) have data entries.",
    status: "pass",
    reviewer: "System (Automated)",
    date: "2025-09-05",
    comments: "5/5 sectors have data entries. 94% of subcategories populated.",
  },
  {
    id: "complete-2",
    category: "Completeness",
    name: "All greenhouse gases reported",
    description: "Ensure CO2, CH4, N2O, HFCs, PFCs, SF6, and NF3 are reported where applicable.",
    status: "pass",
    reviewer: "System (Automated)",
    date: "2025-09-05",
    comments: "All 7 GHG gases reported. F-gas reporting covers HFC-134a and SF6.",
  },
  {
    id: "complete-3",
    category: "Completeness",
    name: "Activity data sources documented",
    description: "Check that all activity data entries have documented sources.",
    status: "warning",
    reviewer: "J. Kamau",
    date: "2025-09-06",
    comments: "89% of entries have documented sources. Missing: 1.A.4.c, 1.B.1, 4.B.",
  },
  {
    id: "consist-1",
    category: "Consistency",
    name: "Time series consistency (2019-2022)",
    description: "Compare emission trends across the 2019-2022 time series for sudden changes.",
    status: "pass",
    reviewer: "Dr. Amina K.",
    date: "2025-09-07",
    comments: "All sectors show consistent trends. Energy sector +12% over period aligns with economic growth data.",
  },
  {
    id: "consist-2",
    category: "Consistency",
    name: "Cross-sector consistency",
    description: "Verify that fuel consumption data in Energy matches industrial data in IPPU.",
    status: "pass",
    reviewer: "Dr. Amina K.",
    date: "2025-09-07",
    comments: "Energy and IPPU fuel data reconciled. Minor discrepancy in petroleum coke (0.2%) documented.",
  },
  {
    id: "compare-1",
    category: "Comparability",
    name: "IPCC 2006 Guidelines methodology alignment",
    description: "Confirm all calculations follow 2006 IPCC Guidelines (with 2019 Refinement where applicable).",
    status: "pass",
    reviewer: "P. Ochieng",
    date: "2025-09-08",
    comments: "Methodology aligned with 2006 GL. Tier 2 applied for key categories (enteric fermentation, cement, electricity).",
  },
  {
    id: "compare-2",
    category: "Comparability",
    name: "GWP values consistent (AR5)",
    description: "Verify AR5 GWP values used throughout for CO2eq conversions.",
    status: "pass",
    reviewer: "System (Automated)",
    date: "2025-09-05",
    comments: "AR5 GWP values confirmed: CH4=28, N2O=265, HFC-134a=1300.",
  },
  {
    id: "accuracy-1",
    category: "Accuracy",
    name: "Uncertainty assessment for key categories",
    description: "Quantitative uncertainty assessment performed for categories contributing >5% of total emissions.",
    status: "warning",
    reviewer: "M. Wanjiku",
    date: "2025-09-08",
    comments: "Uncertainty ranges provided for Energy and Agriculture key categories. LULUCF uncertainty still needs quantification.",
  },
  {
    id: "accuracy-2",
    category: "Accuracy",
    name: "Emission factor validation",
    description: "Country-specific emission factors validated against peer-reviewed literature.",
    status: "pass",
    reviewer: "Dr. Amina K.",
    date: "2025-09-09",
    comments: "Kenya-specific EFs for enteric fermentation validated against recent ILRI research. Cement EF confirmed with industry data.",
  },
  {
    id: "accuracy-3",
    category: "Accuracy",
    name: "Calculation verification (spot checks)",
    description: "Random spot checks on 10% of calculations to verify AD x EF x GWP formulas.",
    status: "pending",
    reviewer: null,
    date: null,
    comments: null,
  },
  {
    id: "transp-1",
    category: "Transparency",
    name: "Documentation of methodological choices",
    description: "All tier selections, data sources, and assumptions documented in the NIR.",
    status: "warning",
    reviewer: "P. Ochieng",
    date: "2025-09-09",
    comments: "Most documentation complete. Pending: LULUCF methodology narrative and Waste sector assumptions.",
  },
  {
    id: "transp-2",
    category: "Transparency",
    name: "Recalculation documentation",
    description: "Document and explain any changes from previously submitted inventory values.",
    status: "pending",
    reviewer: null,
    date: null,
    comments: null,
  },
];

const reviewComments = [
  {
    author: "Dr. Amina K.",
    role: "Sector Lead - Agriculture",
    date: "2025-09-09 16:30",
    text: "Agriculture sector data looks solid. The Tier 2 enteric fermentation EF from ILRI research is well-documented. I approve the agriculture section.",
    type: "approval" as const,
  },
  {
    author: "P. Ochieng",
    role: "National GHG Coordinator",
    date: "2025-09-09 14:15",
    text: "Please complete the LULUCF uncertainty assessment and the recalculation documentation before we can proceed to final approval.",
    type: "request" as const,
  },
  {
    author: "M. Wanjiku",
    role: "QA/QC Manager",
    date: "2025-09-08 11:22",
    text: "Automated Tier 1 checks have passed. Some manual checks still pending. Energy and Waste sectors need spot-check verification.",
    type: "info" as const,
  },
  {
    author: "J. Kamau",
    role: "Data Manager",
    date: "2025-09-06 09:45",
    text: "Missing data source documentation for categories 1.A.4.c, 1.B.1, and 4.B. I've reached out to the respective ministry contacts for the reference documents.",
    type: "info" as const,
  },
];

const statusIcons: Record<CheckStatus, React.ReactNode> = {
  pass: <CheckCircle2 size={16} className="text-emerald-500" />,
  fail: <XCircle size={16} className="text-red-500" />,
  warning: <AlertTriangle size={16} className="text-amber-500" />,
  pending: <Clock size={16} className="text-gray-400" />,
};

const statusBadges: Record<CheckStatus, string> = {
  pass: "badge-success",
  fail: "badge-danger",
  warning: "badge-warning",
  pending: "badge-neutral",
};

const statusLabels: Record<CheckStatus, string> = {
  pass: "Passed",
  fail: "Failed",
  warning: "Warning",
  pending: "Pending",
};

const categoryIcons: Record<string, React.ReactNode> = {
  Completeness: <FileCheck size={14} className="text-emerald-500" />,
  Consistency: <BarChart3 size={14} className="text-blue-500" />,
  Comparability: <Scale size={14} className="text-purple-500" />,
  Accuracy: <Eye size={14} className="text-amber-500" />,
  Transparency: <FileText size={14} className="text-gray-500" />,
};

export default function ReviewPage() {
  const [newComment, setNewComment] = useState("");

  const totalChecks = qaChecks.length;
  const passedChecks = qaChecks.filter((c) => c.status === "pass").length;
  const warningChecks = qaChecks.filter((c) => c.status === "warning").length;
  const pendingChecks = qaChecks.filter((c) => c.status === "pending").length;
  const failedChecks = qaChecks.filter((c) => c.status === "fail").length;

  /* Group checks by category */
  const categories = [...new Set(qaChecks.map((c) => c.category))];

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/inventory"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft size={14} />
        Inventories
      </Link>

      {/* Page Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              QA/QC Review
            </h1>
            <span className="badge-accent badge-dot badge-lg">Under Review</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Quality Assurance / Quality Control workflow for Kenya 2022 Inventory
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-danger btn-sm">
            <ThumbsDown size={14} />
            <span>Reject</span>
          </button>
          <button className="btn-secondary btn-sm">
            <RotateCcw size={14} />
            <span>Request Changes</span>
          </button>
          <button className="btn-primary btn-sm">
            <ThumbsUp size={14} />
            <span>Approve</span>
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 stagger-children">
        <div className="card-stat">
          <p className="text-xs text-gray-500">Total Checks</p>
          <p className="text-2xl font-bold text-gray-900">{totalChecks}</p>
        </div>
        <div className="card-stat">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <p className="text-xs text-gray-500">Passed</p>
          </div>
          <p className="text-2xl font-bold text-emerald-700">{passedChecks}</p>
        </div>
        <div className="card-stat">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" />
            <p className="text-xs text-gray-500">Warnings</p>
          </div>
          <p className="text-2xl font-bold text-amber-700">{warningChecks}</p>
        </div>
        <div className="card-stat">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <p className="text-xs text-gray-500">Pending</p>
          </div>
          <p className="text-2xl font-bold text-gray-600">{pendingChecks}</p>
        </div>
        <div className="card-stat">
          <div className="flex items-center gap-2">
            <XCircle size={16} className="text-red-500" />
            <p className="text-xs text-gray-500">Failed</p>
          </div>
          <p className="text-2xl font-bold text-red-700">{failedChecks}</p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="card-elevated animate-fade-up">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-900">
            Overall QA/QC Progress
          </h2>
          <span className="text-sm font-semibold text-emerald-700">
            {Math.round((passedChecks / totalChecks) * 100)}% Complete
          </span>
        </div>
        <div className="progress-bar h-3">
          <div
            className="progress-bar-fill primary"
            style={{ "--progress-width": `${(passedChecks / totalChecks) * 100}%` } as React.CSSProperties}
          />
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Passed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Warnings
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-300" /> Pending
          </span>
        </div>
      </div>

      {/* QA/QC Checklist by Category */}
      <div className="space-y-4 animate-fade-up">
        {categories.map((cat) => {
          const checks = qaChecks.filter((c) => c.category === cat);
          const catPassed = checks.filter((c) => c.status === "pass").length;
          return (
            <div key={cat} className="card-elevated">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {categoryIcons[cat]}
                  <h2 className="text-sm font-semibold text-gray-900">
                    {cat} Check
                  </h2>
                  <span className="badge-neutral text-[10px]">
                    {catPassed}/{checks.length}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {checks.map((check) => (
                  <div
                    key={check.id}
                    className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {statusIcons[check.status]}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {check.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {check.description}
                          </p>
                        </div>
                      </div>
                      <span className={statusBadges[check.status]}>
                        {statusLabels[check.status]}
                      </span>
                    </div>
                    {(check.reviewer || check.comments) && (
                      <div className="mt-3 pl-7 pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          {check.reviewer && (
                            <span className="flex items-center gap-1">
                              <User size={10} />
                              {check.reviewer}
                            </span>
                          )}
                          {check.date && (
                            <span className="flex items-center gap-1">
                              <Calendar size={10} />
                              {check.date}
                            </span>
                          )}
                        </div>
                        {check.comments && (
                          <p className="text-xs text-gray-600 mt-1.5 bg-gray-50 rounded-lg px-3 py-2">
                            {check.comments}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reviewer Comments */}
      <div className="card-elevated animate-fade-up">
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare size={16} className="text-gray-400" />
          Review Comments
        </h2>
        <div className="space-y-4">
          {reviewComments.map((comment, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-4 border ${
                comment.type === "approval"
                  ? "border-emerald-200 bg-emerald-50/50"
                  : comment.type === "request"
                  ? "border-amber-200 bg-amber-50/50"
                  : "border-gray-100 bg-gray-50/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-gray-600 text-xs font-semibold">
                    {comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {comment.author}
                    </p>
                    <p className="text-[10px] text-gray-400">{comment.role}</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">{comment.date}</span>
              </div>
              <p className="text-sm text-gray-700 pl-9">{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <label className="input-label">Add a Comment</label>
          <div className="flex gap-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={2}
              placeholder="Write your review comment..."
              className="input-field flex-1"
            />
            <button className="btn-primary self-end">
              <Send size={14} />
              <span>Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
