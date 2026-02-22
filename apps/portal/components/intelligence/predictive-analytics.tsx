"use client";

import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Zap,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Target,
  Leaf,
  Clock,
} from "lucide-react";

interface Forecast {
  id: string;
  title: string;
  metric: string;
  currentValue: string;
  forecastValue: string;
  forecastDate: string;
  confidence: number;
  trend: "up" | "down";
  impact: "positive" | "negative" | "neutral";
  description: string;
  assumptions: string[];
}

interface Milestone {
  id: string;
  title: string;
  targetDate: string;
  probability: number;
  status: "likely" | "possible" | "unlikely";
  description: string;
}

const forecasts: Forecast[] = [
  {
    id: "1",
    title: "Total National Emissions",
    metric: "GHG Emissions",
    currentValue: "45.2 MtCO2e",
    forecastValue: "41.8 MtCO2e",
    forecastDate: "2026",
    confidence: 78,
    trend: "down",
    impact: "positive",
    description:
      "Based on current policy trajectory and renewable energy deployment rates, emissions are projected to decrease by 7.5% by end of 2026.",
    assumptions: [
      "Renewable energy growth maintains 15% CAGR",
      "No new fossil fuel capacity added",
      "Transport electrification continues at current pace",
    ],
  },
  {
    id: "2",
    title: "NDC Achievement Probability",
    metric: "NDC Target",
    currentValue: "68%",
    forecastValue: "85%",
    forecastDate: "2028",
    confidence: 62,
    trend: "up",
    impact: "positive",
    description:
      "Current mitigation actions put the country on track to reach 85% of NDC targets by 2028. Full achievement requires accelerated action in agriculture and LULUCF.",
    assumptions: [
      "All 23 current mitigation actions continue",
      "Agriculture sector reforms are implemented",
      "REDD+ projects expand by 30%",
    ],
  },
  {
    id: "3",
    title: "Carbon Credit Supply",
    metric: "Registry Credits",
    currentValue: "1.2M",
    forecastValue: "2.1M",
    forecastDate: "2027",
    confidence: 71,
    trend: "up",
    impact: "neutral",
    description:
      "Projected credit issuance will nearly double by 2027, driven by 12 pending projects and expected new registrations. Market price may face downward pressure.",
    assumptions: [
      "All pending projects verified successfully",
      "15-20 new projects registered annually",
      "Verification backlog resolved within 6 months",
    ],
  },
  {
    id: "4",
    title: "IPPU Sector Emissions",
    metric: "IPPU Emissions",
    currentValue: "7.2 MtCO2e",
    forecastValue: "8.5 MtCO2e",
    forecastDate: "2026",
    confidence: 55,
    trend: "up",
    impact: "negative",
    description:
      "Industrial emissions are projected to increase by 18% due to new cement and steel facilities. Without intervention, this sector will become the primary barrier to NDC achievement.",
    assumptions: [
      "2 new industrial facilities become operational",
      "No carbon capture deployment",
      "Current efficiency standards maintained",
    ],
  },
];

const milestones: Milestone[] = [
  {
    id: "1",
    title: "Reach 75% of NDC target",
    targetDate: "Q2 2026",
    probability: 82,
    status: "likely",
    description: "Energy and transport sectors driving progress. On track if current policies maintained.",
  },
  {
    id: "2",
    title: "2M cumulative credits issued",
    targetDate: "Q4 2026",
    probability: 68,
    status: "possible",
    description: "Dependent on resolving verification backlog and onboarding new projects.",
  },
  {
    id: "3",
    title: "Complete national GHG inventory",
    targetDate: "Q1 2026",
    probability: 91,
    status: "likely",
    description: "All sector data collected. Pending final QA/QC review and sign-off.",
  },
  {
    id: "4",
    title: "Submit BTR to UNFCCC",
    targetDate: "Q3 2026",
    probability: 58,
    status: "possible",
    description: "Draft in progress. Requires completion of mitigation actions section and peer review.",
  },
  {
    id: "5",
    title: "Achieve net-zero in energy sector",
    targetDate: "2035",
    probability: 25,
    status: "unlikely",
    description: "Requires transformative policy changes and massive renewable investment beyond current trajectory.",
  },
];

const milestoneStatusConfig = {
  likely: { color: "var(--success)", icon: CheckCircle2 },
  possible: { color: "var(--accent)", icon: AlertTriangle },
  unlikely: { color: "var(--destructive)", icon: AlertTriangle },
};

export default function PredictiveAnalytics() {
  return (
    <div className="space-y-6">
      {/* Forecast Cards */}
      <div className="stagger-children grid grid-cols-1 gap-5 lg:grid-cols-2">
        {forecasts.map((fc) => {
          const TrendIcon = fc.trend === "up" ? TrendingUp : TrendingDown;
          const impactColor =
            fc.impact === "positive"
              ? "var(--success)"
              : fc.impact === "negative"
                ? "var(--destructive)"
                : "var(--muted-foreground)";

          return (
            <div key={fc.id} className="card-elevated overflow-hidden">
              <div
                className="h-1"
                style={{ backgroundColor: `hsl(${impactColor})` }}
              />
              <div className="p-5">
                {/* Header */}
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                      {fc.title}
                    </h4>
                    <span className="text-[11px] text-[hsl(var(--muted-foreground))]">
                      {fc.metric}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-[hsl(var(--secondary))] px-2.5 py-1">
                    <Calendar className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                    <span className="text-[11px] font-medium text-[hsl(var(--foreground))]">
                      {fc.forecastDate}
                    </span>
                  </div>
                </div>

                {/* Current vs Forecast */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-[hsl(var(--secondary))] p-3 text-center flex-1">
                    <p className="text-[10px] font-medium text-[hsl(var(--muted-foreground))]">Current</p>
                    <p className="mt-1 text-lg font-bold text-[hsl(var(--foreground))]">{fc.currentValue}</p>
                  </div>
                  <TrendIcon
                    className="h-5 w-5 flex-shrink-0"
                    style={{ color: `hsl(${impactColor})` }}
                  />
                  <div
                    className="rounded-lg p-3 text-center flex-1"
                    style={{ backgroundColor: `hsl(${impactColor} / 0.08)` }}
                  >
                    <p className="text-[10px] font-medium text-[hsl(var(--muted-foreground))]">Forecast</p>
                    <p
                      className="mt-1 text-lg font-bold"
                      style={{ color: `hsl(${impactColor})` }}
                    >
                      {fc.forecastValue}
                    </p>
                  </div>
                </div>

                {/* Confidence */}
                <div className="mb-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[hsl(var(--muted-foreground))]">
                      Confidence
                    </span>
                    <span className="text-[11px] font-bold text-[hsl(var(--foreground))]">
                      {fc.confidence}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[hsl(var(--secondary))]">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${fc.confidence}%`,
                        backgroundColor: `hsl(${impactColor})`,
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="mb-3 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {fc.description}
                </p>

                {/* Assumptions */}
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    Key Assumptions
                  </p>
                  <ul className="space-y-1">
                    {fc.assumptions.map((a, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-[hsl(var(--foreground))]">
                        <Zap className="mt-0.5 h-3 w-3 flex-shrink-0 text-[hsl(var(--accent))]" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestones Timeline */}
      <div className="card-elevated p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-[hsl(var(--primary))]" />
            <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">
              Predicted Milestones
            </h3>
          </div>
          <span className="badge-primary">
            <Leaf className="h-3 w-3" />
            AI Projected
          </span>
        </div>

        <div className="space-y-4">
          {milestones.map((ms) => {
            const config = milestoneStatusConfig[ms.status];
            const StatusIcon = config.icon;
            return (
              <div
                key={ms.id}
                className="flex items-start gap-4 rounded-xl border border-[hsl(var(--border))] p-4 transition-colors hover:bg-[hsl(var(--secondary)/0.3)]"
              >
                {/* Probability ring */}
                <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center">
                  <svg className="-rotate-90" width={48} height={48}>
                    <circle cx="24" cy="24" r="19" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                    <circle
                      cx="24"
                      cy="24"
                      r="19"
                      fill="none"
                      stroke={`hsl(${config.color})`}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${(ms.probability / 100) * 119.4} 119.4`}
                    />
                  </svg>
                  <span className="absolute text-[10px] font-bold text-[hsl(var(--foreground))]">
                    {ms.probability}%
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                      {ms.title}
                    </h4>
                    <span
                      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize"
                      style={{
                        backgroundColor: `hsl(${config.color} / 0.1)`,
                        color: `hsl(${config.color})`,
                      }}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {ms.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                    {ms.description}
                  </p>
                </div>

                {/* Date */}
                <div className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-[hsl(var(--secondary))] px-3 py-1.5">
                  <Clock className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                  <span className="text-xs font-medium text-[hsl(var(--foreground))]">
                    {ms.targetDate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
