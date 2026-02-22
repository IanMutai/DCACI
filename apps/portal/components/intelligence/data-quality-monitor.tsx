"use client";

import {
  BarChart3,
  Target,
  Database,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  ArrowRight,
  Shield,
  RefreshCw,
} from "lucide-react";

interface SystemHealth {
  id: string;
  name: string;
  icon: typeof BarChart3;
  qualityScore: number;
  completeness: number;
  freshness: string;
  lastSync: string;
  status: "healthy" | "warning" | "critical";
  issues: QualityIssue[];
}

interface QualityIssue {
  id: string;
  severity: "error" | "warning" | "info";
  title: string;
  description: string;
  affectedRecords?: number;
}

const systems: SystemHealth[] = [
  {
    id: "mrv",
    name: "MRV System",
    icon: BarChart3,
    qualityScore: 87,
    completeness: 92,
    freshness: "2 hours ago",
    lastSync: "2025-01-15 14:30",
    status: "healthy",
    issues: [
      {
        id: "m1",
        severity: "warning",
        title: "Missing activity data for Q4 Waste sector",
        description: "3 facilities have not submitted Q4 waste generation data",
        affectedRecords: 3,
      },
      {
        id: "m2",
        severity: "info",
        title: "Emission factor update available",
        description:
          "IPCC 2024 emission factors are available for energy sector calculations",
      },
    ],
  },
  {
    id: "ndc",
    name: "NDC Tracker",
    icon: Target,
    qualityScore: 74,
    completeness: 78,
    freshness: "6 hours ago",
    lastSync: "2025-01-15 10:15",
    status: "warning",
    issues: [
      {
        id: "n1",
        severity: "error",
        title: "LULUCF baseline data inconsistency",
        description:
          "Reference year emissions for LULUCF differ between MRV and NDC by 12%",
        affectedRecords: 1,
      },
      {
        id: "n2",
        severity: "warning",
        title: "3 mitigation actions missing progress updates",
        description:
          "Actions MA-007, MA-012, MA-015 have not been updated in 90+ days",
        affectedRecords: 3,
      },
      {
        id: "n3",
        severity: "info",
        title: "Transport sector ahead of schedule",
        description:
          "Consider updating the 2025 interim target based on current trajectory",
      },
    ],
  },
  {
    id: "registry",
    name: "Registry",
    icon: Database,
    qualityScore: 91,
    completeness: 95,
    freshness: "30 min ago",
    lastSync: "2025-01-15 16:00",
    status: "healthy",
    issues: [
      {
        id: "r1",
        severity: "warning",
        title: "12 projects pending verification > 60 days",
        description:
          "Verification backlog may impact credit issuance timelines",
        affectedRecords: 12,
      },
    ],
  },
];

const statusConfig = {
  healthy: {
    label: "Healthy",
    color: "var(--success)",
    icon: CheckCircle2,
  },
  warning: {
    label: "Warning",
    color: "var(--accent)",
    icon: AlertTriangle,
  },
  critical: {
    label: "Critical",
    color: "var(--destructive)",
    icon: XCircle,
  },
};

const severityConfig = {
  error: { color: "var(--destructive)", icon: XCircle, label: "Error" },
  warning: { color: "var(--accent)", icon: AlertTriangle, label: "Warning" },
  info: { color: "var(--primary)", icon: CheckCircle2, label: "Info" },
};

function QualityRing({
  score,
  color,
  size = 80,
}: {
  score: number;
  color: string;
  size?: number;
}) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="4"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`hsl(${color})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="animate-score-ring"
          style={{
            ["--ring-circumference" as string]: circumference,
            ["--ring-offset" as string]: offset,
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-bold text-[hsl(var(--foreground))]">
          {score}
        </span>
        <span className="text-[9px] font-medium text-[hsl(var(--muted-foreground))]">
          /100
        </span>
      </div>
    </div>
  );
}

export default function DataQualityMonitor() {
  const overallScore = Math.round(
    systems.reduce((sum, s) => sum + s.qualityScore, 0) / systems.length
  );
  const totalIssues = systems.reduce((sum, s) => sum + s.issues.length, 0);
  const errorCount = systems.reduce(
    (sum, s) => sum + s.issues.filter((i) => i.severity === "error").length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Overview Bar */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 rounded-xl bg-white border border-[hsl(var(--border))] px-5 py-3">
          <Shield className="h-5 w-5 text-[hsl(var(--primary))]" />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Overall Quality
            </p>
            <p className="text-lg font-bold text-[hsl(var(--foreground))]">
              {overallScore}/100
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-white border border-[hsl(var(--border))] px-5 py-3">
          <AlertTriangle className="h-5 w-5 text-[hsl(var(--accent))]" />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Open Issues
            </p>
            <p className="text-lg font-bold text-[hsl(var(--foreground))]">
              {totalIssues}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-white border border-[hsl(var(--border))] px-5 py-3">
          <XCircle className="h-5 w-5 text-[hsl(var(--destructive))]" />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Errors
            </p>
            <p className="text-lg font-bold text-[hsl(var(--foreground))]">
              {errorCount}
            </p>
          </div>
        </div>
        <div className="ml-auto">
          <button className="btn-secondary text-sm">
            <RefreshCw className="h-4 w-4" />
            Sync All Systems
          </button>
        </div>
      </div>

      {/* System Health Cards */}
      <div className="stagger-children grid grid-cols-1 gap-5 lg:grid-cols-3">
        {systems.map((system) => {
          const Icon = system.icon;
          const sConfig = statusConfig[system.status];
          const StatusIcon = sConfig.icon;

          return (
            <div key={system.id} className="card-elevated overflow-hidden">
              {/* Status bar */}
              <div
                className="h-1"
                style={{ backgroundColor: `hsl(${sConfig.color})` }}
              />

              <div className="p-5">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
                      <Icon className="h-4 w-4 text-[hsl(var(--primary))]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                        {system.name}
                      </h4>
                      <div className="flex items-center gap-1">
                        <StatusIcon
                          className="h-3 w-3"
                          style={{ color: `hsl(${sConfig.color})` }}
                        />
                        <span
                          className="text-[11px] font-medium"
                          style={{ color: `hsl(${sConfig.color})` }}
                        >
                          {sConfig.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <QualityRing score={system.qualityScore} color={sConfig.color} />
                </div>

                {/* Metrics */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[hsl(var(--secondary))] p-3">
                    <p className="text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
                      Completeness
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[hsl(var(--border))]">
                        <div
                          className="h-full rounded-full bg-[hsl(var(--primary))]"
                          style={{ width: `${system.completeness}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[hsl(var(--foreground))]">
                        {system.completeness}%
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-[hsl(var(--secondary))] p-3">
                    <p className="text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
                      Last Updated
                    </p>
                    <div className="mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                      <span className="text-xs font-medium text-[hsl(var(--foreground))]">
                        {system.freshness}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Issues */}
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    Issues ({system.issues.length})
                  </p>
                  <div className="space-y-2">
                    {system.issues.map((issue) => {
                      const iConfig = severityConfig[issue.severity];
                      const IIcon = iConfig.icon;
                      return (
                        <div
                          key={issue.id}
                          className="flex items-start gap-2 rounded-lg border border-[hsl(var(--border))] p-3"
                        >
                          <IIcon
                            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                            style={{ color: `hsl(${iConfig.color})` }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[hsl(var(--foreground))]">
                              {issue.title}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[hsl(var(--muted-foreground))] line-clamp-2">
                              {issue.description}
                            </p>
                          </div>
                          {issue.affectedRecords && (
                            <span className="flex-shrink-0 rounded-md bg-[hsl(var(--secondary))] px-1.5 py-0.5 text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
                              {issue.affectedRecords} records
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
