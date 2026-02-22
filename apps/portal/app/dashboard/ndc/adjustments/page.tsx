"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  Globe,
  TrendingDown,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calculator,
  FileText,
  ArrowRight,
  Info,
} from "lucide-react";

type CAStatus = "CALCULATED" | "PENDING_APPROVAL" | "APPROVED" | "APPLIED" | "REVERSED";

interface CorrespondingAdjustment {
  id: string;
  targetId: string;
  targetName: string;
  transferType: "ITMO_FIRST_TRANSFER" | "ITMO_SUBSEQUENT_TRANSFER" | "AUTHORIZATION";
  quantity: number;
  acquiringCountry: string;
  acquiringEntity: string;
  registryProjectId: string;
  projectTitle: string;
  loaNumber: string;
  preAdjustmentProgress: number;
  postAdjustmentProgress: number;
  progressImpact: number;
  transferDate: string;
  adjustmentDate?: string;
  reportingYear: number;
  status: CAStatus;
  approvedBy?: string;
  approvalDate?: string;
}

const mockAdjustments: CorrespondingAdjustment[] = [
  {
    id: "CA-2024-001",
    targetId: "NDC-TGT-001",
    targetName: "Energy Sector Emissions Reduction",
    transferType: "ITMO_FIRST_TRANSFER",
    quantity: 250000,
    acquiringCountry: "Switzerland",
    acquiringEntity: "Swiss Climate Foundation",
    registryProjectId: "PRJ-MRB-001",
    projectTitle: "Marsabit Wind Farm Phase II",
    loaNumber: "LOA-2024-MRB-001",
    preAdjustmentProgress: 68.5,
    postAdjustmentProgress: 65.2,
    progressImpact: -3.3,
    transferDate: "2024-01-15",
    adjustmentDate: "2024-01-16",
    reportingYear: 2024,
    status: "APPLIED",
    approvedBy: "Director CCD",
    approvalDate: "2024-01-15",
  },
  {
    id: "CA-2024-002",
    targetId: "NDC-TGT-003",
    targetName: "Agriculture Sector Mitigation",
    transferType: "ITMO_FIRST_TRANSFER",
    quantity: 85000,
    acquiringCountry: "Japan",
    acquiringEntity: "Japan Carbon Partners",
    registryProjectId: "PRJ-KTI-002",
    projectTitle: "Kitui Smart Agriculture CSA",
    loaNumber: "LOA-2024-KTI-002",
    preAdjustmentProgress: 45.2,
    postAdjustmentProgress: 43.8,
    progressImpact: -1.4,
    transferDate: "2024-01-20",
    reportingYear: 2024,
    status: "PENDING_APPROVAL",
  },
  {
    id: "CA-2023-005",
    targetId: "NDC-TGT-004",
    targetName: "Forestry & Land Use",
    transferType: "ITMO_FIRST_TRANSFER",
    quantity: 180000,
    acquiringCountry: "Germany",
    acquiringEntity: "KfW Carbon Fund",
    registryProjectId: "PRJ-KKM-004",
    projectTitle: "Kakamega Forest Protection",
    loaNumber: "LOA-2023-KKM-004",
    preAdjustmentProgress: 72.1,
    postAdjustmentProgress: 68.9,
    progressImpact: -3.2,
    transferDate: "2023-10-25",
    adjustmentDate: "2023-10-26",
    reportingYear: 2023,
    status: "APPLIED",
    approvedBy: "Director CCD",
    approvalDate: "2023-10-25",
  },
  {
    id: "CA-2024-003",
    targetId: "NDC-TGT-001",
    targetName: "Energy Sector Emissions Reduction",
    transferType: "AUTHORIZATION",
    quantity: 120000,
    acquiringCountry: "Singapore",
    acquiringEntity: "Singapore Green Exchange",
    registryProjectId: "PRJ-NRB-003",
    projectTitle: "Nairobi E-Mobility Initiative",
    loaNumber: "LOA-2024-NRB-003",
    preAdjustmentProgress: 65.2,
    postAdjustmentProgress: 63.6,
    progressImpact: -1.6,
    transferDate: "2024-02-01",
    reportingYear: 2024,
    status: "CALCULATED",
  },
];

const statusConfig: Record<CAStatus, { icon: typeof CheckCircle; bg: string; text: string; label: string }> = {
  CALCULATED: { icon: Calculator, bg: "bg-blue-100", text: "text-blue-700", label: "Calculated" },
  PENDING_APPROVAL: { icon: Clock, bg: "bg-amber-100", text: "text-amber-700", label: "Pending Approval" },
  APPROVED: { icon: CheckCircle, bg: "bg-emerald-100", text: "text-emerald-700", label: "Approved" },
  APPLIED: { icon: CheckCircle, bg: "bg-emerald-100", text: "text-emerald-700", label: "Applied" },
  REVERSED: { icon: AlertTriangle, bg: "bg-red-100", text: "text-red-700", label: "Reversed" },
};

export default function CorrespondingAdjustmentsPage() {
  const [yearFilter, setYearFilter] = useState<number | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<CAStatus | "ALL">("ALL");

  const filteredAdjustments = mockAdjustments.filter((ca) => {
    const matchesYear = yearFilter === "ALL" || ca.reportingYear === yearFilter;
    const matchesStatus = statusFilter === "ALL" || ca.status === statusFilter;
    return matchesYear && matchesStatus;
  });

  const totalQuantity = filteredAdjustments.reduce((sum, ca) => sum + ca.quantity, 0);
  const appliedQuantity = filteredAdjustments
    .filter((ca) => ca.status === "APPLIED")
    .reduce((sum, ca) => sum + ca.quantity, 0);
  const pendingQuantity = filteredAdjustments
    .filter((ca) => ca.status !== "APPLIED" && ca.status !== "REVERSED")
    .reduce((sum, ca) => sum + ca.quantity, 0);

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/ndc" className="hover:text-[hsl(var(--primary))]">
              NDC Tracker
            </Link>
            <span>/</span>
            <span>Corresponding Adjustments</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Corresponding Adjustments
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Track NDC progress adjustments for ITMO transfers under Article 6
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors">
          <Calculator className="h-4 w-4" />
          Preview New CA
        </button>
      </div>

      {/* Info Banner */}
      <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800">About Corresponding Adjustments</p>
            <p className="text-sm text-blue-700 mt-1">
              When Kenya authorizes the transfer of ITMOs to another country under Article 6,
              a corresponding adjustment must be made to avoid double counting. This reduces
              Kenya&apos;s claimed emission reductions by the quantity transferred.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Adjustments</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))]">
            {(totalQuantity / 1000).toFixed(0)}K tCO2e
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            {filteredAdjustments.length} transactions
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Applied to NDC</p>
          <p className="text-2xl font-bold text-emerald-600">
            {(appliedQuantity / 1000).toFixed(0)}K tCO2e
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            Reflected in BTR
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Pending Application</p>
          <p className="text-2xl font-bold text-amber-600">
            {(pendingQuantity / 1000).toFixed(0)}K tCO2e
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            Awaiting approval
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Avg. Progress Impact</p>
          <p className="text-2xl font-bold text-red-600">
            {(filteredAdjustments.reduce((sum, ca) => sum + ca.progressImpact, 0) / filteredAdjustments.length).toFixed(1)}%
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            Per adjustment
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value === "ALL" ? "ALL" : parseInt(e.target.value))}
          className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
        >
          <option value="ALL">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as CAStatus | "ALL")}
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

      {/* Adjustments List */}
      <div className="space-y-4">
        {filteredAdjustments.map((ca) => {
          const statusConf = statusConfig[ca.status];
          const StatusIcon = statusConf.icon;

          return (
            <div key={ca.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-[hsl(var(--muted-foreground))]">
                      {ca.id}
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusConf.bg} ${statusConf.text}`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusConf.label}
                    </span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                      {ca.reportingYear}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mt-1">
                    {ca.projectTitle}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {ca.targetName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[hsl(var(--foreground))]">
                    {ca.quantity.toLocaleString()} tCO2e
                  </p>
                  <div className="flex items-center gap-1 text-sm text-red-600 justify-end">
                    <TrendingDown className="h-4 w-4" />
                    {ca.progressImpact.toFixed(1)}% NDC impact
                  </div>
                </div>
              </div>

              {/* Transfer Details */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[hsl(var(--secondary)/0.5)]">
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Acquiring Country</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Globe className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                      {ca.acquiringCountry}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Acquiring Entity</p>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))] mt-0.5">
                    {ca.acquiringEntity}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Transfer Type</p>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))] mt-0.5">
                    {ca.transferType.replace(/_/g, " ")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">LoA Reference</p>
                  <p className="text-sm font-medium text-[hsl(var(--primary))] mt-0.5">
                    {ca.loaNumber}
                  </p>
                </div>
              </div>

              {/* Progress Impact Visualization */}
              <div className="mt-4 p-4 rounded-xl border border-[hsl(var(--border))]">
                <p className="text-sm font-medium text-[hsl(var(--foreground))] mb-3">
                  NDC Progress Impact
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[hsl(var(--muted-foreground))]">Before Adjustment</span>
                      <span className="font-medium text-[hsl(var(--foreground))]">
                        {ca.preAdjustmentProgress.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-[hsl(var(--secondary))]">
                      <div
                        className="h-3 rounded-full bg-emerald-500"
                        style={{ width: `${ca.preAdjustmentProgress}%` }}
                      />
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[hsl(var(--muted-foreground))]">After Adjustment</span>
                      <span className="font-medium text-[hsl(var(--foreground))]">
                        {ca.postAdjustmentProgress.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-[hsl(var(--secondary))]">
                      <div
                        className="h-3 rounded-full bg-amber-500"
                        style={{ width: `${ca.postAdjustmentProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-[hsl(var(--muted-foreground))]">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Transfer: {new Date(ca.transferDate).toLocaleDateString("en-GB")}
                </div>
                {ca.adjustmentDate && (
                  <div className="flex items-center gap-1">
                    <ArrowLeftRight className="h-3 w-3" />
                    Adjusted: {new Date(ca.adjustmentDate).toLocaleDateString("en-GB")}
                  </div>
                )}
                {ca.approvedBy && (
                  <div className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle className="h-3 w-3" />
                    Approved by {ca.approvedBy}
                  </div>
                )}
              </div>

              {/* Actions */}
              {ca.status === "PENDING_APPROVAL" && (
                <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] flex items-center gap-3">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                    <CheckCircle className="h-4 w-4" />
                    Approve & Apply
                  </button>
                  <button className="text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                    View Details
                  </button>
                </div>
              )}
              {ca.status === "CALCULATED" && (
                <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] flex items-center gap-3">
                  <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
                    <FileText className="h-4 w-4" />
                    Submit for Approval
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
