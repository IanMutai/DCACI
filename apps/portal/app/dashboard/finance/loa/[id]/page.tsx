"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileCheck,
  Globe,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  ArrowRight,
  Download,
  MessageSquare,
  User,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LoaDetailPage({ params }: PageProps) {
  const { id } = use(params);

  // Mock data - in real app, fetch based on id
  const loa = {
    id,
    loaNumber: "LOA-2024-MRB-001",
    version: 1,
    projectId: "PRJ-MRB-001",
    projectTitle: "Marsabit Wind Farm Phase II",
    projectSector: "Energy",
    mechanism: "ARTICLE_6_2",
    acquiringCountry: "Switzerland",
    acquiringEntity: "Swiss Climate Foundation",
    authorizedQuantity: 250000,
    vintages: [2024, 2025, 2026],
    creditingPeriodStart: "2024-01-01",
    creditingPeriodEnd: "2030-12-31",
    correspondingAdjustmentRequired: true,
    correspondingAdjustmentMethod: "FIRST_TRANSFER",
    pricePerTonne: 25,
    currency: "USD",
    totalValue: 6250000,
    status: "PENDING_APPROVAL",
    submittedAt: "2024-01-10",
    submittedBy: "John Kimani",
    currentStep: 3,
    totalSteps: 4,
    approvalSteps: [
      {
        stepNumber: 1,
        stepName: "Submission",
        status: "COMPLETED",
        assignedTo: "System",
        completedAt: "2024-01-10",
      },
      {
        stepNumber: 2,
        stepName: "Technical Review",
        status: "COMPLETED",
        assignedTo: "Mary Wanjiku",
        completedAt: "2024-01-12",
        comments: "Technical requirements verified. Project documentation complete.",
      },
      {
        stepNumber: 3,
        stepName: "Legal Review",
        status: "IN_PROGRESS",
        assignedTo: "Peter Ochieng",
        dueDate: "2024-01-18",
      },
      {
        stepNumber: 4,
        stepName: "Final Approval",
        status: "PENDING",
        assignedTo: "Director CCD",
        dueDate: "2024-01-22",
      },
    ],
  };

  const stepStatusConfig = {
    COMPLETED: { icon: CheckCircle, color: "emerald" },
    IN_PROGRESS: { icon: Clock, color: "blue" },
    PENDING: { icon: Clock, color: "slate" },
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/finance/loa"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary))] transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/finance" className="hover:text-[hsl(var(--primary))]">
              Finance
            </Link>
            <span>/</span>
            <Link href="/dashboard/finance/loa" className="hover:text-[hsl(var(--primary))]">
              LoA Requests
            </Link>
            <span>/</span>
            <span>{loa.loaNumber}</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            {loa.loaNumber}
          </h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
          <Download className="h-4 w-4" />
          Download PDF
        </button>
      </div>

      {/* Status Banner */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-amber-600" />
            <div>
              <p className="font-semibold text-amber-800">Pending Approval</p>
              <p className="text-sm text-amber-600">
                Step {loa.currentStep} of {loa.totalSteps}: Legal Review in progress
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors">
              <MessageSquare className="h-4 w-4" />
              Add Comment
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Information */}
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Project Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Project ID</p>
                <p className="text-sm font-medium text-[hsl(var(--primary))]">{loa.projectId}</p>
              </div>
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Project Title</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{loa.projectTitle}</p>
              </div>
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Sector</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{loa.projectSector}</p>
              </div>
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Mechanism</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                  {loa.mechanism === "ARTICLE_6_2" ? "Article 6.2" : "Article 6.4"}
                </p>
              </div>
            </div>
          </div>

          {/* Transfer Details */}
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Transfer Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Acquiring Country</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Globe className="h-4 w-4 text-[hsl(var(--primary))]" />
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">{loa.acquiringCountry}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Acquiring Entity</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{loa.acquiringEntity}</p>
              </div>
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Authorized Quantity</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                  {loa.authorizedQuantity.toLocaleString()} tCO2e
                </p>
              </div>
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Vintages</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                  {loa.vintages.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Crediting Period</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                  {new Date(loa.creditingPeriodStart).toLocaleDateString()} - {new Date(loa.creditingPeriodEnd).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">CA Method</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                  {loa.correspondingAdjustmentMethod.replace(/_/g, " ")}
                </p>
              </div>
            </div>
          </div>

          {/* Commercial Terms */}
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Commercial Terms
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-[hsl(var(--secondary)/0.5)]">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Price per Tonne</p>
                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                  ${loa.pricePerTonne}
                </p>
              </div>
              <div className="text-center p-4 rounded-xl bg-[hsl(var(--secondary)/0.5)]">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Total Quantity</p>
                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                  {(loa.authorizedQuantity / 1000).toFixed(0)}K tCO2e
                </p>
              </div>
              <div className="text-center p-4 rounded-xl bg-emerald-50">
                <p className="text-xs text-emerald-600">Total Value</p>
                <p className="text-xl font-bold text-emerald-700">
                  ${(loa.totalValue / 1000000).toFixed(2)}M
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Approval Timeline */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Approval Timeline
            </h2>
            <div className="space-y-4">
              {loa.approvalSteps.map((step, idx) => {
                const config = stepStatusConfig[step.status as keyof typeof stepStatusConfig];
                const Icon = config.icon;
                const isLast = idx === loa.approvalSteps.length - 1;

                return (
                  <div key={step.stepNumber} className="relative">
                    {!isLast && (
                      <div className={`absolute left-4 top-8 w-0.5 h-full ${
                        step.status === "COMPLETED" ? "bg-emerald-500" : "bg-[hsl(var(--border))]"
                      }`} />
                    )}
                    <div className="flex items-start gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 bg-${config.color}-100`}>
                        <Icon className={`h-4 w-4 text-${config.color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[hsl(var(--foreground))]">
                          {step.stepName}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                          <User className="h-3 w-3" />
                          {step.assignedTo}
                        </div>
                        {step.completedAt && (
                          <p className="text-xs text-emerald-600 mt-1">
                            Completed {new Date(step.completedAt).toLocaleDateString()}
                          </p>
                        )}
                        {step.dueDate && step.status !== "COMPLETED" && (
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                            Due {new Date(step.dueDate).toLocaleDateString()}
                          </p>
                        )}
                        {step.comments && (
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 p-2 bg-[hsl(var(--secondary)/0.5)] rounded">
                            {step.comments}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submission Info */}
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Submission Details
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Submitted By</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{loa.submittedBy}</p>
              </div>
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Submission Date</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                  {new Date(loa.submittedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Version</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">v{loa.version}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
