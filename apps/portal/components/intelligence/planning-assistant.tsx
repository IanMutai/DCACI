"use client";

import {
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  Leaf,
  Plus,
  ArrowRight,
  BarChart3,
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  description: string;
  targetReduction: number;
  currentProgress: number;
  timeline: string;
  confidence: number;
  status: "on-track" | "at-risk" | "off-track";
  keyActions: string[];
  sectors: { name: string; progress: number; target: number }[];
}

const scenarios: Scenario[] = [
  {
    id: "current",
    name: "Current Path",
    description:
      "Continuation of existing policies and mitigation actions without additional interventions.",
    targetReduction: 25,
    currentProgress: 68,
    timeline: "2030",
    confidence: 82,
    status: "on-track",
    keyActions: [
      "Maintain renewable energy subsidies",
      "Continue fleet electrification program",
      "Existing reforestation commitments",
    ],
    sectors: [
      { name: "Energy", progress: 78, target: 30 },
      { name: "Transport", progress: 65, target: 20 },
      { name: "IPPU", progress: 42, target: 15 },
      { name: "Agriculture", progress: 38, target: 25 },
      { name: "LULUCF", progress: 55, target: 35 },
      { name: "Waste", progress: 71, target: 20 },
    ],
  },
  {
    id: "accelerated",
    name: "Accelerated",
    description:
      "Enhanced mitigation with additional policies targeting underperforming sectors.",
    targetReduction: 35,
    currentProgress: 48,
    timeline: "2030",
    confidence: 65,
    status: "at-risk",
    keyActions: [
      "Double renewable capacity by 2028",
      "Implement carbon pricing mechanism",
      "Scale up nature-based solutions",
      "Industrial efficiency standards",
    ],
    sectors: [
      { name: "Energy", progress: 55, target: 40 },
      { name: "Transport", progress: 42, target: 30 },
      { name: "IPPU", progress: 30, target: 25 },
      { name: "Agriculture", progress: 25, target: 35 },
      { name: "LULUCF", progress: 40, target: 45 },
      { name: "Waste", progress: 52, target: 30 },
    ],
  },
  {
    id: "ambitious",
    name: "Ambitious (Net Zero)",
    description:
      "Maximum mitigation effort aligned with net-zero pathway requiring transformative changes.",
    targetReduction: 50,
    currentProgress: 28,
    timeline: "2050",
    confidence: 40,
    status: "off-track",
    keyActions: [
      "100% renewable grid by 2035",
      "Ban ICE vehicle sales by 2030",
      "Carbon capture deployment at scale",
      "Complete agricultural transformation",
      "Massive reforestation program",
    ],
    sectors: [
      { name: "Energy", progress: 35, target: 55 },
      { name: "Transport", progress: 22, target: 45 },
      { name: "IPPU", progress: 18, target: 40 },
      { name: "Agriculture", progress: 15, target: 50 },
      { name: "LULUCF", progress: 28, target: 60 },
      { name: "Waste", progress: 38, target: 45 },
    ],
  },
];

const statusConfig = {
  "on-track": {
    icon: CheckCircle2,
    label: "On Track",
    color: "var(--success)",
  },
  "at-risk": {
    icon: AlertCircle,
    label: "At Risk",
    color: "var(--accent)",
  },
  "off-track": {
    icon: AlertCircle,
    label: "Off Track",
    color: "var(--destructive)",
  },
};

export default function PlanningAssistant() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Compare mitigation scenarios and identify gaps between current
            trajectory and NDC targets.
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="h-4 w-4" />
          Generate New Scenario
        </button>
      </div>

      {/* Scenario Cards */}
      <div className="stagger-children grid grid-cols-1 gap-5 lg:grid-cols-3">
        {scenarios.map((scenario) => {
          const status = statusConfig[scenario.status];
          const StatusIcon = status.icon;

          return (
            <div
              key={scenario.id}
              className="card-elevated flex flex-col overflow-hidden"
            >
              {/* Status bar */}
              <div
                className="h-1"
                style={{ backgroundColor: `hsl(${status.color})` }}
              />

              <div className="flex flex-1 flex-col p-5">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                      {scenario.name}
                    </h4>
                    <div className="mt-1 flex items-center gap-2">
                      <StatusIcon
                        className="h-3.5 w-3.5"
                        style={{ color: `hsl(${status.color})` }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{ color: `hsl(${status.color})` }}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>
                  {/* Confidence ring */}
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="3"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke={`hsl(${status.color})`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${(scenario.confidence / 100) * 125.6} 125.6`}
                      />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-[hsl(var(--foreground))]">
                      {scenario.confidence}%
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-4 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {scenario.description}
                </p>

                {/* Key Metrics */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[hsl(var(--secondary))] p-3">
                    <div className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))]">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-[10px] font-medium">
                        Reduction Target
                      </span>
                    </div>
                    <p className="mt-1 text-lg font-bold text-[hsl(var(--foreground))]">
                      {scenario.targetReduction}%
                    </p>
                  </div>
                  <div className="rounded-lg bg-[hsl(var(--secondary))] p-3">
                    <div className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))]">
                      <Clock className="h-3 w-3" />
                      <span className="text-[10px] font-medium">Timeline</span>
                    </div>
                    <p className="mt-1 text-lg font-bold text-[hsl(var(--foreground))]">
                      {scenario.timeline}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[hsl(var(--muted-foreground))]">
                      Overall Progress
                    </span>
                    <span className="text-[11px] font-bold text-[hsl(var(--foreground))]">
                      {scenario.currentProgress}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[hsl(var(--secondary))]">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${scenario.currentProgress}%`,
                        backgroundColor: `hsl(${status.color})`,
                      }}
                    />
                  </div>
                </div>

                {/* Key Actions */}
                <div className="mb-4 flex-1">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    Key Actions
                  </p>
                  <ul className="space-y-1.5">
                    {scenario.keyActions.map((action, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-[hsl(var(--foreground))]"
                      >
                        <Zap className="mt-0.5 h-3 w-3 flex-shrink-0 text-[hsl(var(--accent))]" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View Full Analysis button */}
                <button className="btn-secondary w-full text-xs">
                  View Full Analysis
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gap Analysis Section */}
      <div className="card-elevated p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[hsl(var(--primary))]" />
            <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">
              Sector Gap Analysis — Current Path
            </h3>
          </div>
          <span className="badge-primary">
            <Leaf className="h-3 w-3" />
            NDC Aligned
          </span>
        </div>

        <div className="space-y-4">
          {scenarios[0]!.sectors.map((sector) => {
            const gap = sector.target - sector.progress;
            const isAhead = gap <= 0;
            return (
              <div key={sector.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                    {sector.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                      {sector.progress}% / {sector.target}%
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        isAhead
                          ? "text-[hsl(var(--success))]"
                          : "text-[hsl(var(--accent))]"
                      }`}
                    >
                      {isAhead ? "Ahead" : `${gap}% gap`}
                    </span>
                  </div>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-[hsl(var(--secondary))]">
                  {/* Target line */}
                  <div
                    className="absolute top-0 h-full w-0.5 bg-[hsl(var(--foreground)/0.3)] z-10"
                    style={{ left: `${sector.target}%` }}
                  />
                  {/* Progress */}
                  <div
                    className="h-full rounded-full animate-progress-fill"
                    style={{
                      ["--progress-width" as string]: `${sector.progress}%`,
                      backgroundColor: isAhead
                        ? "hsl(var(--success))"
                        : "hsl(var(--primary))",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
