"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  BarChart3,
  Target,
  Database,
  Eye,
  XCircle,
  Info,
  Filter,
  ChevronDown,
} from "lucide-react";

type AnomalySeverity = "critical" | "warning" | "info" | "resolved";

interface Anomaly {
  id: string;
  severity: AnomalySeverity;
  title: string;
  description: string;
  system: string;
  detectedAt: string;
  sector?: string;
  impact: string;
  status: "open" | "investigating" | "resolved" | "dismissed";
  details: string;
}

const anomalies: Anomaly[] = [
  {
    id: "AN-001",
    severity: "critical",
    title: "IPPU emissions spike — 15% above expected range",
    description:
      "Q3 2024 industrial process emissions are significantly higher than the 3-year moving average. Deviation exceeds 2 standard deviations.",
    system: "MRV",
    detectedAt: "2 hours ago",
    sector: "IPPU",
    impact: "May impact NDC progress by 2-3% if sustained",
    status: "investigating",
    details:
      "Root cause analysis in progress. Possible causes: new cement plant online, data entry error in facility F-2847, or methodology change in emission calculations.",
  },
  {
    id: "AN-002",
    severity: "warning",
    title: "LULUCF baseline mismatch between MRV and NDC",
    description:
      "Reference year LULUCF emissions differ by 12% between MRV inventory and NDC baseline. This affects progress calculations.",
    system: "NDC",
    detectedAt: "6 hours ago",
    sector: "LULUCF",
    impact: "NDC progress may be overstated by 5%",
    status: "open",
    details:
      "MRV reports 3.6 MtCO2e for LULUCF baseline while NDC uses 3.2 MtCO2e. Need to reconcile methodologies and update one or both systems.",
  },
  {
    id: "AN-003",
    severity: "warning",
    title: "Registry verification backlog exceeding SLA",
    description:
      "12 projects have been in verification for over 60 days, exceeding the 45-day SLA. Total potential credits at stake: 340K.",
    system: "Registry",
    detectedAt: "1 day ago",
    impact: "Delays may impact Q1 credit issuance targets",
    status: "open",
    details:
      "Bottleneck identified in third-party auditor availability. 3 projects flagged for additional documentation requirements.",
  },
  {
    id: "AN-004",
    severity: "info",
    title: "Transport emissions declining faster than model predicted",
    description:
      "Actual transport sector emissions are 25% below the forecast model. EV adoption rates exceeded projections.",
    system: "MRV",
    detectedAt: "2 days ago",
    sector: "Transport",
    impact: "Positive deviation — NDC transport target may be met early",
    status: "resolved",
    details:
      "Model updated to reflect actual EV adoption rates. New forecast shows transport sector target achievement by 2028 (2 years ahead).",
  },
  {
    id: "AN-005",
    severity: "critical",
    title: "Missing Q4 data from 3 waste management facilities",
    description:
      "Facilities WM-012, WM-019, and WM-023 have not submitted Q4 2024 activity data. This creates a gap in the national inventory.",
    system: "MRV",
    detectedAt: "3 days ago",
    sector: "Waste",
    impact: "Incomplete inventory may delay BTR submission",
    status: "investigating",
    details:
      "Contact attempts made to facility operators. WM-012 confirmed data is being compiled. No response from WM-019 and WM-023.",
  },
  {
    id: "AN-006",
    severity: "info",
    title: "New emission factor available for energy sector",
    description:
      "IPCC 2024 emission factors published. Applying new factors may change energy sector emissions by 1-3%.",
    system: "MRV",
    detectedAt: "5 days ago",
    sector: "Energy",
    impact: "Minor recalculation needed for consistency",
    status: "open",
    details:
      "New country-specific factors available for grid electricity, natural gas combustion, and diesel generators. Recommend applying in next inventory cycle.",
  },
  {
    id: "AN-007",
    severity: "resolved",
    title: "Duplicate credit issuance detected and corrected",
    description:
      "System detected 5,000 credits were issued twice to project P-2341 due to a processing error. Duplicates have been revoked.",
    system: "Registry",
    detectedAt: "1 week ago",
    impact: "No lasting impact — duplicates revoked within 4 hours",
    status: "resolved",
    details:
      "Root cause: Race condition in credit issuance API when processing concurrent requests. Fix deployed to prevent recurrence.",
  },
];

const severityConfig: Record<
  AnomalySeverity,
  { icon: typeof AlertTriangle; color: string; bgColor: string; label: string }
> = {
  critical: {
    icon: XCircle,
    color: "var(--destructive)",
    bgColor: "var(--destructive)",
    label: "Critical",
  },
  warning: {
    icon: AlertTriangle,
    color: "var(--accent)",
    bgColor: "var(--accent)",
    label: "Warning",
  },
  info: {
    icon: Info,
    color: "var(--primary)",
    bgColor: "var(--primary)",
    label: "Info",
  },
  resolved: {
    icon: CheckCircle2,
    color: "var(--success)",
    bgColor: "var(--success)",
    label: "Resolved",
  },
};

const statusConfig = {
  open: { label: "Open", color: "var(--accent)" },
  investigating: { label: "Investigating", color: "var(--primary)" },
  resolved: { label: "Resolved", color: "var(--success)" },
  dismissed: { label: "Dismissed", color: "var(--muted-foreground)" },
};

const systemIcons: Record<string, typeof BarChart3> = {
  MRV: BarChart3,
  NDC: Target,
  Registry: Database,
};

export default function AnomalyTimeline() {
  const criticalCount = anomalies.filter((a) => a.severity === "critical").length;
  const warningCount = anomalies.filter((a) => a.severity === "warning").length;
  const openCount = anomalies.filter((a) => a.status === "open" || a.status === "investigating").length;

  return (
    <div className="space-y-6">
      {/* Summary Bar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl border border-[hsl(var(--destructive)/0.3)] bg-[hsl(var(--destructive)/0.05)] px-4 py-2.5">
          <XCircle className="h-4 w-4 text-[hsl(var(--destructive))]" />
          <span className="text-sm font-bold text-[hsl(var(--destructive))]">{criticalCount}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">Critical</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[hsl(var(--accent)/0.3)] bg-[hsl(var(--accent)/0.05)] px-4 py-2.5">
          <AlertTriangle className="h-4 w-4 text-[hsl(var(--accent))]" />
          <span className="text-sm font-bold text-[hsl(var(--accent))]">{warningCount}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">Warnings</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5">
          <Eye className="h-4 w-4 text-[hsl(var(--primary))]" />
          <span className="text-sm font-bold text-[hsl(var(--foreground))]">{openCount}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">Open</span>
        </div>
        <div className="ml-auto">
          <button className="btn-ghost text-xs">
            <Filter className="h-3.5 w-3.5" />
            Filter
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-[hsl(var(--border))]" />

        <div className="space-y-4">
          {anomalies.map((anomaly) => {
            const sev = severityConfig[anomaly.severity];
            const SevIcon = sev.icon;
            const stat = statusConfig[anomaly.status];
            const SysIcon = systemIcons[anomaly.system] || BarChart3;

            return (
              <div key={anomaly.id} className="relative flex gap-4 pl-2">
                {/* Timeline dot */}
                <div
                  className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 bg-white"
                  style={{ borderColor: `hsl(${sev.color})` }}
                >
                  <SevIcon
                    className="h-3.5 w-3.5"
                    style={{ color: `hsl(${sev.color})` }}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 card-elevated p-4 mb-1">
                  {/* Top row */}
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="rounded-md px-2 py-0.5 text-[10px] font-semibold"
                        style={{
                          backgroundColor: `hsl(${sev.bgColor} / 0.1)`,
                          color: `hsl(${sev.color})`,
                        }}
                      >
                        {sev.label}
                      </span>
                      <span className="text-[10px] font-mono text-[hsl(var(--muted-foreground))]">
                        {anomaly.id}
                      </span>
                      {anomaly.sector && (
                        <span className="rounded-md bg-[hsl(var(--secondary))] px-2 py-0.5 text-[10px] font-medium text-[hsl(var(--foreground))]">
                          {anomaly.sector}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize"
                        style={{
                          backgroundColor: `hsl(${stat.color} / 0.1)`,
                          color: `hsl(${stat.color})`,
                        }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="mb-1 text-sm font-semibold text-[hsl(var(--foreground))]">
                    {anomaly.title}
                  </h4>

                  {/* Description */}
                  <p className="mb-3 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {anomaly.description}
                  </p>

                  {/* Impact */}
                  <div className="mb-3 rounded-lg bg-[hsl(var(--secondary)/0.5)] p-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      Impact Assessment
                    </p>
                    <p className="mt-0.5 text-xs text-[hsl(var(--foreground))]">
                      {anomaly.impact}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-[hsl(var(--primary)/0.1)] px-2 py-1 text-[11px] font-medium text-[hsl(var(--primary))]">
                        <SysIcon className="h-3 w-3" />
                        {anomaly.system}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[hsl(var(--muted-foreground))]">
                        <Clock className="h-3 w-3" />
                        {anomaly.detectedAt}
                      </span>
                    </div>
                    <button className="text-xs font-medium text-[hsl(var(--primary))] transition-colors hover:text-[hsl(174_40%_25%)]">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
