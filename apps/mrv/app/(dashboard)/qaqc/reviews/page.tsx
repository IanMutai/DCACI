"use client";

import { useState } from "react";
import {
  Users,
  ClipboardCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  FileText,
  Send,
  Upload,
  User,
} from "lucide-react";

interface Review {
  id: string;
  sector: string;
  reviewer: string;
  reviewerRole: string;
  reviewType: "tier1_qc" | "tier2_qc" | "qa_expert";
  status: "completed" | "in_progress" | "pending" | "revision_requested";
  dateAssigned: string;
  dateCompleted: string | null;
  findings: string | null;
  checkItems: { item: string; status: "pass" | "fail" | "na" }[];
  evidence: string[];
}

const reviews: Review[] = [
  {
    id: "REV-001", sector: "Energy", reviewer: "Dr. Amina K.", reviewerRole: "Energy Sector Lead",
    reviewType: "tier2_qc", status: "completed", dateAssigned: "2025-11-01", dateCompleted: "2025-12-10",
    findings: "Methodology is sound. Tier 2 emission factors well-documented. Minor revision needed for fugitive emissions documentation. Reference approach comparison is within acceptable range.",
    checkItems: [
      { item: "Activity data sources documented", status: "pass" },
      { item: "Emission factors within IPCC range", status: "pass" },
      { item: "Calculation methodology correct", status: "pass" },
      { item: "Time series consistent", status: "pass" },
      { item: "Uncertainty estimates provided", status: "fail" },
    ],
    evidence: ["Energy_sector_review_2025.pdf", "Reference_approach_comparison.xlsx"],
  },
  {
    id: "REV-002", sector: "IPPU", reviewer: "J. Ochieng", reviewerRole: "IPPU Sector Expert",
    reviewType: "tier2_qc", status: "in_progress", dateAssigned: "2025-11-15", dateCompleted: null,
    findings: "Reviewing cement production data against industry reports. Initial check shows clinker-to-cement ratio may need updating based on latest KCPA data.",
    checkItems: [
      { item: "Activity data sources documented", status: "pass" },
      { item: "Emission factors within IPCC range", status: "pass" },
      { item: "Calculation methodology correct", status: "pass" },
      { item: "Time series consistent", status: "na" },
      { item: "Uncertainty estimates provided", status: "na" },
    ],
    evidence: [],
  },
  {
    id: "REV-003", sector: "Agriculture", reviewer: "M. Wanjiku", reviewerRole: "Livestock Expert",
    reviewType: "qa_expert", status: "pending", dateAssigned: "2025-12-01", dateCompleted: null,
    findings: null,
    checkItems: [
      { item: "Activity data sources documented", status: "na" },
      { item: "Emission factors within IPCC range", status: "na" },
      { item: "Calculation methodology correct", status: "na" },
      { item: "Time series consistent", status: "na" },
      { item: "Uncertainty estimates provided", status: "na" },
    ],
    evidence: [],
  },
  {
    id: "REV-004", sector: "LULUCF", reviewer: "P. Kamau", reviewerRole: "Forestry Expert",
    reviewType: "qa_expert", status: "pending", dateAssigned: "2025-12-05", dateCompleted: null,
    findings: null,
    checkItems: [],
    evidence: [],
  },
  {
    id: "REV-005", sector: "Waste", reviewer: "S. Otieno", reviewerRole: "Waste Management Specialist",
    reviewType: "tier1_qc", status: "revision_requested", dateAssigned: "2025-11-10", dateCompleted: null,
    findings: "Waste composition data outdated (2018 study). Need to apply updated DOC values from 2024 waste characterization study. Methane correction factors should be reviewed for unmanaged sites.",
    checkItems: [
      { item: "Activity data sources documented", status: "pass" },
      { item: "Emission factors within IPCC range", status: "fail" },
      { item: "Calculation methodology correct", status: "pass" },
      { item: "Time series consistent", status: "pass" },
      { item: "Uncertainty estimates provided", status: "fail" },
    ],
    evidence: ["Waste_review_notes.pdf"],
  },
];

const statusConfig: Record<string, { label: string; badge: string; icon: React.ReactNode }> = {
  completed: { label: "Completed", badge: "badge-success badge-dot", icon: <CheckCircle2 size={14} /> },
  in_progress: { label: "In Progress", badge: "badge-warning badge-dot", icon: <Clock size={14} /> },
  pending: { label: "Pending", badge: "badge-neutral badge-dot", icon: <Clock size={14} /> },
  revision_requested: { label: "Revision Needed", badge: "badge-danger badge-dot", icon: <AlertCircle size={14} /> },
};

const reviewTypeLabels: Record<string, string> = {
  tier1_qc: "Tier 1 QC (General)",
  tier2_qc: "Tier 2 QC (Category-specific)",
  qa_expert: "QA Expert Review",
};

export default function QAQCReviewsPage() {
  const [formData, setFormData] = useState({
    sector: "",
    reviewType: "tier1_qc",
    reviewer: "",
    findings: "",
    recommendation: "approve",
  });

  const completed = reviews.filter((r) => r.status === "completed").length;
  const pending = reviews.filter((r) => r.status === "pending" || r.status === "in_progress").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <ClipboardCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manual Review Workflows</h1>
            <p className="mt-1 text-sm text-gray-500">
              Sector-level expert reviews and quality assessments per IPCC QA/QC guidelines
            </p>
          </div>
        </div>
        <button className="btn-primary btn-sm">
          <Plus size={14} />
          <span>Assign Review</span>
        </button>
      </div>

      {/* QA/QC Navigation */}
      <div className="flex items-center gap-1 border-b border-gray-200 animate-fade-up">
        <a href="/qaqc/checks" className="px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 -mb-px">
          Automated Checks
        </a>
        <a href="/qaqc/reviews" className="px-4 py-2.5 text-sm font-medium border-b-2 border-emerald-600 text-emerald-700 -mb-px">
          Manual Reviews
        </a>
        <a href="/qaqc/documentation" className="px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 -mb-px">
          Documentation
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 stagger-children">
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Reviews</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{reviews.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">Across all sectors</p>
        </div>
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Completed</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{completed}</p>
        </div>
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending / In Progress</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{pending}</p>
        </div>
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Revision Needed</p>
          <p className="mt-1 text-2xl font-bold text-red-600">
            {reviews.filter((r) => r.status === "revision_requested").length}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-3 animate-fade-up">
          {reviews.map((review) => (
            <div key={review.id} className="card-elevated">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900">{review.sector} Sector</h3>
                    <span className={statusConfig[review.status]!.badge}>
                      {statusConfig[review.status]!.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {reviewTypeLabels[review.reviewType]!} | Assigned: {review.dateAssigned}
                  </p>
                </div>
                <span className="badge-neutral font-mono text-[10px]">{review.id}</span>
              </div>

              {/* Reviewer */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <User size={12} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{review.reviewer}</p>
                  <p className="text-[10px] text-gray-400">{review.reviewerRole}</p>
                </div>
              </div>

              {/* Check Items */}
              {review.checkItems.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {review.checkItems.map((ci, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${
                          ci.status === "pass" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                          ci.status === "fail" ? "bg-red-50 text-red-700 border border-red-200" :
                          "bg-gray-50 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {ci.status === "pass" ? <CheckCircle2 size={8} /> :
                         ci.status === "fail" ? <AlertCircle size={8} /> : null}
                        {ci.item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Findings */}
              {review.findings && (
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Findings</p>
                  <p className="text-sm text-gray-700">{review.findings}</p>
                </div>
              )}

              {/* Evidence */}
              {review.evidence.length > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <FileText size={12} className="text-gray-400" />
                  <div className="flex gap-1.5">
                    {review.evidence.map((ev, i) => (
                      <span key={i} className="text-[10px] text-blue-600 hover:underline cursor-pointer">{ev}</span>
                    ))}
                  </div>
                </div>
              )}

              {review.dateCompleted && (
                <p className="text-[10px] text-gray-400 mt-2">Completed: {review.dateCompleted}</p>
              )}
            </div>
          ))}
        </div>

        {/* Review Form */}
        <div className="animate-slide-in-right">
          <div className="card-elevated sticky top-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Send size={16} className="text-emerald-600" />
              Submit New Review
            </h3>
            <div className="space-y-4">
              <div>
                <label className="input-label">Sector</label>
                <select
                  className="select-field"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                >
                  <option value="">Select sector...</option>
                  <option value="energy">Energy</option>
                  <option value="ippu">IPPU</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="lulucf">LULUCF</option>
                  <option value="waste">Waste</option>
                </select>
              </div>
              <div>
                <label className="input-label">Review Type</label>
                <select
                  className="select-field"
                  value={formData.reviewType}
                  onChange={(e) => setFormData({ ...formData, reviewType: e.target.value })}
                >
                  <option value="tier1_qc">Tier 1 QC (General)</option>
                  <option value="tier2_qc">Tier 2 QC (Category-specific)</option>
                  <option value="qa_expert">QA Expert Review</option>
                </select>
              </div>
              <div>
                <label className="input-label">Assign Reviewer</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Reviewer name..."
                  value={formData.reviewer}
                  onChange={(e) => setFormData({ ...formData, reviewer: e.target.value })}
                />
              </div>
              <div>
                <label className="input-label">Findings</label>
                <textarea
                  className="input-field min-h-[100px]"
                  placeholder="Describe review findings..."
                  value={formData.findings}
                  onChange={(e) => setFormData({ ...formData, findings: e.target.value })}
                />
              </div>
              <div>
                <label className="input-label">Evidence / Attachments</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                  <Upload size={20} className="mx-auto text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500">Drop files or click to upload</p>
                </div>
              </div>
              <div>
                <label className="input-label">Recommendation</label>
                <div className="flex gap-3">
                  {[
                    { value: "approve", label: "Approve", color: "text-emerald-600" },
                    { value: "revise", label: "Revise", color: "text-amber-600" },
                    { value: "reject", label: "Reject", color: "text-red-600" },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="recommendation"
                        value={opt.value}
                        checked={formData.recommendation === opt.value}
                        onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })}
                        className="text-emerald-600"
                      />
                      <span className={`text-sm font-medium ${opt.color}`}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button className="btn-primary w-full">
                <Send size={16} />
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
