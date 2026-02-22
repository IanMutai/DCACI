"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  FileText,
  User,
  Calendar,
  ArrowRight,
  Eye,
  MessageSquare,
} from "lucide-react";

type VerificationStatus = "PENDING" | "IN_PROGRESS" | "APPROVED" | "REJECTED" | "REVISION_REQUESTED";
type VerificationType = "INTERNAL_QC" | "INTERNAL_QA" | "EXTERNAL_VERIFICATION" | "THIRD_PARTY_AUDIT";

interface VerificationTask {
  id: string;
  title: string;
  description: string;
  type: VerificationType;
  sector: string;
  inventoryYear: number;
  dataRecords: number;
  status: VerificationStatus;
  assignedTo?: string;
  assignedRole: string;
  dueDate: string;
  startedAt?: string;
  completedAt?: string;
  findings?: number;
  comments?: number;
}

const mockTasks: VerificationTask[] = [
  {
    id: "VER-2024-001",
    title: "Energy Sector QC Review",
    description: "Quality control review of all energy sector activity data for 2023 inventory",
    type: "INTERNAL_QC",
    sector: "Energy",
    inventoryYear: 2023,
    dataRecords: 45,
    status: "APPROVED",
    assignedTo: "Mary Wanjiku",
    assignedRole: "QC Officer",
    dueDate: "2024-01-15",
    startedAt: "2024-01-08",
    completedAt: "2024-01-12",
    findings: 3,
    comments: 8,
  },
  {
    id: "VER-2024-002",
    title: "Transport Sector QC Review",
    description: "Quality control review of transport sector fuel consumption data",
    type: "INTERNAL_QC",
    sector: "Transport",
    inventoryYear: 2023,
    dataRecords: 28,
    status: "IN_PROGRESS",
    assignedTo: "John Kimani",
    assignedRole: "QC Officer",
    dueDate: "2024-01-20",
    startedAt: "2024-01-15",
    findings: 2,
    comments: 4,
  },
  {
    id: "VER-2024-003",
    title: "Agriculture Sector QA Review",
    description: "Quality assurance review of livestock and crop data",
    type: "INTERNAL_QA",
    sector: "Agriculture",
    inventoryYear: 2023,
    dataRecords: 62,
    status: "PENDING",
    assignedRole: "QA Manager",
    dueDate: "2024-01-25",
  },
  {
    id: "VER-2024-004",
    title: "IPPU External Verification",
    description: "Third-party verification of industrial process emissions",
    type: "EXTERNAL_VERIFICATION",
    sector: "IPPU",
    inventoryYear: 2023,
    dataRecords: 18,
    status: "PENDING",
    assignedRole: "External Verifier",
    dueDate: "2024-02-01",
  },
  {
    id: "VER-2024-005",
    title: "LULUCF Satellite Data Verification",
    description: "Verification of land use change data against satellite imagery",
    type: "EXTERNAL_VERIFICATION",
    sector: "LULUCF",
    inventoryYear: 2023,
    dataRecords: 35,
    status: "REVISION_REQUESTED",
    assignedTo: "Alice Chen",
    assignedRole: "GIS Specialist",
    dueDate: "2024-01-18",
    startedAt: "2024-01-10",
    findings: 5,
    comments: 12,
  },
  {
    id: "VER-2024-006",
    title: "Waste Sector QC Review",
    description: "Quality control of municipal and industrial waste data",
    type: "INTERNAL_QC",
    sector: "Waste",
    inventoryYear: 2023,
    dataRecords: 22,
    status: "REJECTED",
    assignedTo: "Peter Ochieng",
    assignedRole: "QC Officer",
    dueDate: "2024-01-12",
    startedAt: "2024-01-05",
    completedAt: "2024-01-10",
    findings: 8,
    comments: 15,
  },
];

const typeConfig: Record<VerificationType, { label: string; color: string }> = {
  INTERNAL_QC: { label: "Internal QC", color: "blue" },
  INTERNAL_QA: { label: "Internal QA", color: "violet" },
  EXTERNAL_VERIFICATION: { label: "External", color: "amber" },
  THIRD_PARTY_AUDIT: { label: "Third Party", color: "emerald" },
};

const statusConfig: Record<VerificationStatus, { icon: typeof CheckCircle; bg: string; text: string; label: string }> = {
  PENDING: { icon: Clock, bg: "bg-slate-100", text: "text-slate-700", label: "Pending" },
  IN_PROGRESS: { icon: Clock, bg: "bg-blue-100", text: "text-blue-700", label: "In Progress" },
  APPROVED: { icon: CheckCircle, bg: "bg-emerald-100", text: "text-emerald-700", label: "Approved" },
  REJECTED: { icon: XCircle, bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
  REVISION_REQUESTED: { icon: AlertTriangle, bg: "bg-amber-100", text: "text-amber-700", label: "Revision Requested" },
};

export default function MrvVerificationPage() {
  const [statusFilter, setStatusFilter] = useState<VerificationStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<VerificationType | "ALL">("ALL");

  const filteredTasks = mockTasks.filter((task) => {
    const matchesStatus = statusFilter === "ALL" || task.status === statusFilter;
    const matchesType = typeFilter === "ALL" || task.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const stats = {
    total: mockTasks.length,
    pending: mockTasks.filter((t) => t.status === "PENDING").length,
    inProgress: mockTasks.filter((t) => t.status === "IN_PROGRESS").length,
    completed: mockTasks.filter((t) => ["APPROVED", "REJECTED"].includes(t.status)).length,
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/mrv" className="hover:text-[hsl(var(--primary))]">
              MRV System
            </Link>
            <span>/</span>
            <span>Verification</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            QA/QC & Verification
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Manage quality assurance and verification workflows
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors">
          <Shield className="h-4 w-4" />
          Start Verification
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Tasks</p>
          <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Pending</p>
          <p className="text-2xl font-bold text-slate-600">{stats.pending}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">In Progress</p>
          <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
        </div>
        <div className="card">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Completed</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as VerificationStatus | "ALL")}
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
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as VerificationType | "ALL")}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="ALL">All Types</option>
            {Object.entries(typeConfig).map(([type, config]) => (
              <option key={type} value={type}>
                {config.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Verification Tasks */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const statusConf = statusConfig[task.status];
          const typeConf = typeConfig[task.type];
          const StatusIcon = statusConf.icon;

          return (
            <div key={task.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
                      {task.id}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-${typeConf.color}-100 text-${typeConf.color}-700`}>
                      {typeConf.label}
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusConf.bg} ${statusConf.text}`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusConf.label}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mt-1">
                    {task.title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">
                    {task.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Sector</p>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">{task.sector}</p>
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Inventory Year</p>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">{task.inventoryYear}</p>
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Data Records</p>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">{task.dataRecords}</p>
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Assigned To</p>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                    {task.assignedTo || task.assignedRole}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Due Date</p>
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                    {new Date(task.dueDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>

              {(task.findings !== undefined || task.comments !== undefined) && (
                <div className="mt-4 flex items-center gap-4 text-sm text-[hsl(var(--muted-foreground))]">
                  {task.findings !== undefined && (
                    <span className="inline-flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      {task.findings} findings
                    </span>
                  )}
                  {task.comments !== undefined && (
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {task.comments} comments
                    </span>
                  )}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] flex items-center gap-3">
                <button className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--primary))] hover:underline">
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
                {task.status === "PENDING" && (
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline">
                    <ArrowRight className="h-4 w-4" />
                    Start Review
                  </button>
                )}
                {task.status === "IN_PROGRESS" && (
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline">
                    <CheckCircle className="h-4 w-4" />
                    Complete Review
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
