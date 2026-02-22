"use client";

import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Activity,
  ArrowRight,
  BarChart3,
  Target,
  Database,
} from "lucide-react";

type InsightCategory = "anomaly" | "trend" | "recommendation" | "alert";
type Severity = "high" | "medium" | "low" | "info";

interface Insight {
  id: string;
  category: InsightCategory;
  severity: Severity;
  title: string;
  description: string;
  source: string;
  metric?: string;
  metricValue?: string;
  actionLabel?: string;
}

const categoryConfig: Record<
  InsightCategory,
  { icon: typeof TrendingUp; label: string; color: string }
> = {
  anomaly: {
    icon: AlertTriangle,
    label: "Anomaly",
    color: "var(--destructive)",
  },
  trend: { icon: TrendingUp, label: "Trend", color: "var(--primary)" },
  recommendation: {
    icon: Lightbulb,
    label: "Recommendation",
    color: "var(--accent)",
  },
  alert: { icon: Activity, label: "Alert", color: "45 90% 55%" },
};

const severityColors: Record<Severity, string> = {
  high: "var(--destructive)",
  medium: "var(--accent)",
  low: "var(--primary)",
  info: "var(--muted-foreground)",
};

const sourceIcons: Record<string, typeof BarChart3> = {
  MRV: BarChart3,
  NDC: Target,
  Registry: Database,
};

const mockInsights: Insight[] = [
  {
    id: "1",
    category: "anomaly",
    severity: "high",
    title: "Unusual spike in IPPU sector emissions",
    description:
      "Industrial processes emissions increased by 15% in Q3, deviating significantly from the 3-year trend. This may indicate new industrial activity or data entry errors.",
    source: "MRV",
    metric: "IPPU Emissions",
    metricValue: "+15% QoQ",
    actionLabel: "Investigate",
  },
  {
    id: "2",
    category: "trend",
    severity: "info",
    title: "Energy sector on track to meet NDC target",
    description:
      "Renewable energy capacity additions are driving a consistent downward trend in energy sector emissions. Current trajectory suggests the 2030 target will be met 2 years early.",
    source: "NDC",
    metric: "Progress Rate",
    metricValue: "78%",
    actionLabel: "View Details",
  },
  {
    id: "3",
    category: "recommendation",
    severity: "medium",
    title: "Accelerate LULUCF mitigation actions",
    description:
      "LULUCF sector shows the largest gap between current trajectory and NDC target. Recommend increasing reforestation efforts by 40% and adding 3 new REDD+ projects to the registry.",
    source: "NDC",
    metric: "Gap to Target",
    metricValue: "25%",
    actionLabel: "Plan Actions",
  },
  {
    id: "4",
    category: "alert",
    severity: "medium",
    title: "12 registry projects pending verification",
    description:
      "Projects totaling 340K potential credits have been waiting for verification for over 60 days. Expediting verification could significantly boost credit issuance.",
    source: "Registry",
    metric: "Pending Credits",
    metricValue: "340K",
    actionLabel: "Review Queue",
  },
  {
    id: "5",
    category: "trend",
    severity: "low",
    title: "Transport emissions declining faster than projected",
    description:
      "EV adoption rates exceeded forecasts by 25%, resulting in transport sector emissions declining 8% YoY versus the projected 5%.",
    source: "MRV",
    metric: "Transport Emissions",
    metricValue: "-8% YoY",
    actionLabel: "View Analysis",
  },
  {
    id: "6",
    category: "recommendation",
    severity: "info",
    title: "Consider linking agriculture credits to NDC",
    description:
      "15 agriculture-based projects in the registry are generating credits that could be counted towards NDC agricultural sector targets. Linking these would improve reported progress by ~5%.",
    source: "Registry",
    metric: "Potential Uplift",
    metricValue: "+5%",
    actionLabel: "Explore",
  },
];

const categoryFilters: InsightCategory[] = [
  "anomaly",
  "trend",
  "recommendation",
  "alert",
];

export default function InsightCards() {
  return (
    <div className="space-y-6">
      {/* Summary Bar */}
      <div className="flex items-center gap-6">
        {categoryFilters.map((cat) => {
          const config = categoryConfig[cat];
          const count = mockInsights.filter((i) => i.category === cat).length;
          const Icon = config.icon;
          return (
            <div
              key={cat}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 border border-[hsl(var(--border))]"
            >
              <Icon
                className="h-4 w-4"
                style={{ color: `hsl(${config.color})` }}
              />
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                {count}
              </span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                {config.label}s
              </span>
            </div>
          );
        })}
      </div>

      {/* Insight Cards Grid */}
      <div className="stagger-children grid grid-cols-1 gap-4 lg:grid-cols-2">
        {mockInsights.map((insight) => {
          const catConfig = categoryConfig[insight.category];
          const CatIcon = catConfig.icon;
          const SourceIcon = sourceIcons[insight.source] || BarChart3;

          return (
            <div
              key={insight.id}
              className="card-elevated overflow-hidden p-5 transition-all hover:shadow-lg"
            >
              {/* Top row: category + severity */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `hsl(${catConfig.color} / 0.1)`,
                    }}
                  >
                    <CatIcon
                      className="h-3.5 w-3.5"
                      style={{ color: `hsl(${catConfig.color})` }}
                    />
                  </div>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: `hsl(${catConfig.color})` }}
                  >
                    {catConfig.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: `hsl(${severityColors[insight.severity]})`,
                    }}
                  />
                  <span className="text-[11px] font-medium capitalize text-[hsl(var(--muted-foreground))]">
                    {insight.severity}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h4 className="mb-2 text-sm font-semibold text-[hsl(var(--foreground))]">
                {insight.title}
              </h4>

              {/* Description */}
              <p className="mb-4 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                {insight.description}
              </p>

              {/* Metric + Source + Action */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Source badge */}
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-[hsl(var(--secondary))] px-2 py-1 text-[11px] font-medium text-[hsl(var(--primary))]">
                    <SourceIcon className="h-3 w-3" />
                    {insight.source}
                  </span>
                  {/* Metric */}
                  {insight.metric && (
                    <span className="text-[11px] text-[hsl(var(--muted-foreground))]">
                      {insight.metric}:{" "}
                      <span className="font-semibold text-[hsl(var(--foreground))]">
                        {insight.metricValue}
                      </span>
                    </span>
                  )}
                </div>
                {insight.actionLabel && (
                  <button className="flex items-center gap-1 text-xs font-medium text-[hsl(var(--primary))] transition-colors hover:text-[hsl(174_40%_25%)]">
                    {insight.actionLabel}
                    <ArrowRight className="h-3 w-3" />
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
