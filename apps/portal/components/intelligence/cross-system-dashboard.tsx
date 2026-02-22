"use client";

import {
  BarChart3,
  Target,
  Database,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
  Globe2,
  Zap,
  TrendingUp,
  Layers,
} from "lucide-react";

interface SystemMetric {
  system: string;
  icon: typeof BarChart3;
  metrics: {
    label: string;
    value: string;
    change: string;
    trend: "up" | "down" | "flat";
    unit?: string;
  }[];
}

interface DataFlow {
  from: string;
  to: string;
  label: string;
  volume: string;
  status: "active" | "syncing" | "stale";
}

const systemMetrics: SystemMetric[] = [
  {
    system: "MRV",
    icon: BarChart3,
    metrics: [
      { label: "Total Emissions", value: "45.2", change: "-3.2%", trend: "down", unit: "MtCO2e" },
      { label: "Data Points", value: "12,847", change: "+1,240", trend: "up" },
      { label: "Sector Coverage", value: "6/6", change: "100%", trend: "flat" },
      { label: "QA/QC Score", value: "87%", change: "+5%", trend: "up" },
    ],
  },
  {
    system: "NDC",
    icon: Target,
    metrics: [
      { label: "Overall Progress", value: "68%", change: "+12%", trend: "up" },
      { label: "Active Actions", value: "23", change: "+3", trend: "up" },
      { label: "Target Gap", value: "25%", change: "-5%", trend: "down" },
      { label: "Sectors On Track", value: "4/6", change: "+1", trend: "up" },
    ],
  },
  {
    system: "Registry",
    icon: Database,
    metrics: [
      { label: "Total Credits", value: "1.2M", change: "+156K", trend: "up" },
      { label: "Active Projects", value: "47", change: "+5", trend: "up" },
      { label: "Pending Verification", value: "12", change: "+3", trend: "up" },
      { label: "Avg Credit Price", value: "$12.40", change: "+15%", trend: "up" },
    ],
  },
];

const dataFlows: DataFlow[] = [
  { from: "MRV", to: "NDC", label: "Emissions data feeds NDC progress tracking", volume: "12.8K records", status: "active" },
  { from: "MRV", to: "Registry", label: "Baseline data for project validation", volume: "3.2K records", status: "active" },
  { from: "NDC", to: "Registry", label: "Mitigation actions linked to projects", volume: "23 actions", status: "syncing" },
  { from: "Registry", to: "NDC", label: "Credit issuance updates NDC progress", volume: "1.2M credits", status: "active" },
  { from: "Registry", to: "MRV", label: "Project monitoring data", volume: "47 projects", status: "stale" },
];

const correlations = [
  {
    title: "Emissions Reduction vs Credit Issuance",
    description: "Strong negative correlation: as MRV-tracked emissions decrease, registry credit issuance increases proportionally.",
    strength: 0.87,
    type: "negative" as const,
    systems: ["MRV", "Registry"],
  },
  {
    title: "NDC Progress vs Mitigation Action Count",
    description: "Moderate positive correlation: adding new mitigation actions is associated with incremental NDC progress gains.",
    strength: 0.64,
    type: "positive" as const,
    systems: ["NDC", "NDC"],
  },
  {
    title: "Data Quality Score vs Verification Speed",
    description: "High correlation: projects with better MRV data quality complete registry verification 40% faster.",
    strength: 0.78,
    type: "positive" as const,
    systems: ["MRV", "Registry"],
  },
  {
    title: "LULUCF Emissions vs REDD+ Credits",
    description: "Weak correlation: REDD+ credits are only offsetting 40% of LULUCF emission increases, indicating a coverage gap.",
    strength: 0.34,
    type: "positive" as const,
    systems: ["MRV", "Registry"],
  },
];

const statusColors = {
  active: "var(--success)",
  syncing: "var(--accent)",
  stale: "var(--destructive)",
};

export default function CrossSystemDashboard() {
  return (
    <div className="space-y-6">
      {/* System Overview Cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {systemMetrics.map((sys) => {
          const Icon = sys.icon;
          return (
            <div key={sys.system} className="card-elevated p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
                  <Icon className="h-4 w-4 text-[hsl(var(--primary))]" />
                </div>
                <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                  {sys.system} System
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {sys.metrics.map((m) => {
                  const TrendIcon =
                    m.trend === "up"
                      ? ArrowUpRight
                      : m.trend === "down"
                        ? ArrowDownRight
                        : Minus;
                  const trendColor =
                    m.trend === "up"
                      ? "text-[hsl(var(--success))]"
                      : m.trend === "down"
                        ? "text-[hsl(var(--accent))]"
                        : "text-[hsl(var(--muted-foreground))]";
                  return (
                    <div key={m.label} className="rounded-lg bg-[hsl(var(--secondary))] p-3">
                      <p className="text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
                        {m.label}
                      </p>
                      <p className="mt-1 text-base font-bold text-[hsl(var(--foreground))]">
                        {m.value}
                        {m.unit && (
                          <span className="ml-1 text-[10px] font-normal text-[hsl(var(--muted-foreground))]">
                            {m.unit}
                          </span>
                        )}
                      </p>
                      <div className={`mt-0.5 flex items-center gap-1 text-[11px] font-medium ${trendColor}`}>
                        <TrendIcon className="h-3 w-3" />
                        {m.change}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Data Flow Visualization */}
      <div className="card-elevated p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-[hsl(var(--primary))]" />
            <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">
              Cross-System Data Flows
            </h3>
          </div>
          <button className="btn-ghost text-xs">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </div>

        <div className="space-y-3">
          {dataFlows.map((flow, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-[hsl(var(--border))] p-4 transition-colors hover:bg-[hsl(var(--secondary)/0.3)]"
            >
              {/* Source */}
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[hsl(var(--primary)/0.1)] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--primary))]">
                {flow.from}
              </span>

              {/* Arrow */}
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-[hsl(var(--muted-foreground))]" />

              {/* Target */}
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[hsl(var(--primary)/0.1)] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--primary))]">
                {flow.to}
              </span>

              {/* Description */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[hsl(var(--foreground))] truncate">
                  {flow.label}
                </p>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                  {flow.volume}
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: `hsl(${statusColors[flow.status]})` }}
                />
                <span
                  className="text-[11px] font-medium capitalize"
                  style={{ color: `hsl(${statusColors[flow.status]})` }}
                >
                  {flow.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-System Correlations */}
      <div className="card-elevated p-6">
        <div className="mb-5 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[hsl(var(--primary))]" />
          <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">
            AI-Detected Correlations
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {correlations.map((corr, i) => (
            <div
              key={i}
              className="rounded-xl border border-[hsl(var(--border))] p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                  {corr.title}
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-[hsl(var(--muted-foreground))]">
                    r =
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      corr.strength >= 0.7
                        ? "text-[hsl(var(--success))]"
                        : corr.strength >= 0.5
                          ? "text-[hsl(var(--accent))]"
                          : "text-[hsl(var(--muted-foreground))]"
                    }`}
                  >
                    {corr.type === "negative" ? "-" : ""}
                    {corr.strength.toFixed(2)}
                  </span>
                </div>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                {corr.description}
              </p>
              {/* Correlation strength bar */}
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[hsl(var(--secondary))]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${corr.strength * 100}%`,
                      backgroundColor:
                        corr.strength >= 0.7
                          ? "hsl(var(--success))"
                          : corr.strength >= 0.5
                            ? "hsl(var(--accent))"
                            : "hsl(var(--muted-foreground))",
                    }}
                  />
                </div>
                <div className="flex gap-1">
                  {corr.systems.map((sys, j) => (
                    <span
                      key={j}
                      className="rounded-md bg-[hsl(var(--secondary))] px-1.5 py-0.5 text-[9px] font-semibold text-[hsl(var(--primary))]"
                    >
                      {sys}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
