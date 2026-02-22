"use client";

import Link from "next/link";
import {
  Sparkles,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Lightbulb,
  ShieldAlert,
  BarChart3,
  Zap,
} from "lucide-react";

/* ─── Types ─── */
interface Insight {
  type: "alert" | "opportunity" | "risk" | "recommendation";
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  trend?: "up" | "down" | "flat";
  source: string;
  action?: { label: string; href: string };
}

interface IntelligenceInsightsProps {
  page: "dashboard" | "mrv" | "ndc" | "registry" | "finance" | "loa";
  context?: "environment" | "finance";
}

/* ─── Insight Data by Page ─── */
const insightsByPage: Record<string, Insight[]> = {
  dashboard: [
    {
      type: "alert",
      title: "Budget-NDC Misalignment: LULUCF",
      description: "LULUCF has the 2nd largest NDC target (20.8 MtCO2e) but Environment Ministry gets only KES 26.4B — 0.7% of national budget. Forest cover target requires KES 120B+.",
      metric: "0.7%",
      metricLabel: "of budget",
      source: "Budget × NDC Analysis",
      action: { label: "View alignment", href: "/dashboard/intelligence/budget-alignment" },
    },
    {
      type: "risk",
      title: "Article 6 Transfer Risk",
      description: "Pending LOAs for 585K ITMOs to Switzerland & Japan. Corresponding adjustments would reduce Kenya's reported reductions by ~0.6% of NDC target.",
      metric: "585K",
      metricLabel: "ITMOs pending",
      trend: "up",
      source: "Registry × NDC",
      action: { label: "Review LOAs", href: "/dashboard/finance/loa" },
    },
    {
      type: "opportunity",
      title: "Carbon Revenue Exceeds GCF",
      description: "296 VCM projects could yield $733M (2025-2030) at $5.20/credit — nearly double GCF allocations to Kenya ($390M total).",
      metric: "$733M",
      metricLabel: "projected",
      trend: "up",
      source: "Registry × Finance",
      action: { label: "Explore", href: "/dashboard/registry" },
    },
    {
      type: "recommendation",
      title: "Prioritize Agriculture MRV",
      description: "Agriculture is 47.4% of emissions (44.92 MtCO2e) but relies entirely on PRIMAP-hist modeled data. Bottom-up activity data urgently needed for BTR credibility.",
      metric: "47.4%",
      metricLabel: "of emissions",
      source: "MRV Quality Assessment",
      action: { label: "MRV details", href: "/dashboard/mrv" },
    },
  ],
  mrv: [
    {
      type: "alert",
      title: "Agriculture Data Gap",
      description: "Agriculture accounts for 44.92 MtCO2e (47.4% of total) but has no bottom-up activity data for enteric fermentation. PRIMAP-hist modeled estimates only.",
      metric: "44.92",
      metricLabel: "MtCO2e",
      source: "PRIMAP-hist v2.6 HISTCR",
    },
    {
      type: "risk",
      title: "Energy Emissions Surge",
      description: "Energy sector emissions grew from 34.94 to 40.27 MtCO2e (+15.3% YoY). If trend continues, will exceed 2030 BAU projection of 50.4 MtCO2e by 2028.",
      metric: "+15.3%",
      metricLabel: "YoY growth",
      trend: "up",
      source: "Trend Analysis",
    },
    {
      type: "recommendation",
      title: "Strengthen Waste Sector Reporting",
      description: "Waste emissions at 3.10 MtCO2e (3.3%) show consistent growth but have the highest uncertainty margin (±35%). Municipal solid waste data from only 12 of 47 counties.",
      metric: "±35%",
      metricLabel: "uncertainty",
      source: "Data Quality Review",
    },
  ],
  ndc: [
    {
      type: "alert",
      title: "Off-Track: Energy Sector",
      description: "Energy sector needs -48.1 MtCO2e reduction by 2030 but current trajectory shows +3.5% CAGR. 6 of 12 mitigation actions behind schedule.",
      metric: "6/12",
      metricLabel: "actions behind",
      trend: "down",
      source: "NDC Progress Tracker",
    },
    {
      type: "opportunity",
      title: "LULUCF Sink Potential",
      description: "Reforestation efforts have potential to sequester 20.8 MtCO2e by 2030. Current tree cover restoration at 5.1M ha — needs acceleration to reach 5.3M ha target.",
      metric: "5.1M ha",
      metricLabel: "restored",
      trend: "up",
      source: "LULUCF Assessment",
    },
    {
      type: "recommendation",
      title: "Focus on Transport Quick Wins",
      description: "Transport sector has smallest NDC target (4.7 MtCO2e) but highest cost-effectiveness ratio. BRT Nairobi and fuel economy standards can deliver 60% of target.",
      metric: "60%",
      metricLabel: "achievable",
      source: "Cost-Benefit Analysis",
    },
  ],
  registry: [
    {
      type: "alert",
      title: "Verification Backlog",
      description: "23 projects awaiting verification with combined 4.2M credits. Average wait time has increased from 45 to 78 days. Capacity constraint at designated verification bodies.",
      metric: "78 days",
      metricLabel: "avg wait",
      trend: "up",
      source: "Registry Operations",
    },
    {
      type: "opportunity",
      title: "High-Potential Pipeline",
      description: "Top 5 projects in pipeline represent 12.3M tCO2e potential. Lake Turkana Wind (3.2M), Menengai Geothermal (2.1M), and Mai Mahiu Geothermal (1.8M) lead.",
      metric: "12.3M",
      metricLabel: "tCO2e potential",
      source: "Project Pipeline",
    },
    {
      type: "risk",
      title: "ITMO Double-Count Risk",
      description: "3 projects with LOA requests also supply VCM credits. If ITMOs are authorized without canceling VCM credits, creates double-counting risk under Article 6.2.",
      metric: "3",
      metricLabel: "projects at risk",
      source: "Integrity Check",
    },
  ],
  finance: [
    {
      type: "alert",
      title: "53% Finance Gap",
      description: "Kenya needs $5.13B/year for NDC implementation but actual flows are only $2.40B. The $2.73B annual shortfall threatens 2030 target achievement.",
      metric: "$2.73B",
      metricLabel: "annual gap",
      trend: "down",
      source: "Climate Finance Tracker",
    },
    {
      type: "opportunity",
      title: "GCF Replenishment Window",
      description: "GCF-2 replenishment in progress. Kenya's historical $390M allocation could increase to $520M if pipeline of 8 approved readiness proposals converts.",
      metric: "$520M",
      metricLabel: "potential",
      trend: "up",
      source: "GCF Pipeline Analysis",
    },
    {
      type: "recommendation",
      title: "Budget Tagging Reform",
      description: "Only 9.1% of Kenya's KES 3.92T budget is climate-tagged. OECD Rio Markers analysis suggests actual climate relevance is 14-16%. Improved tagging unlocks additional tracking.",
      metric: "9.1%",
      metricLabel: "climate-tagged",
      source: "Budget Analysis FY 2024/25",
    },
  ],
  loa: [
    {
      type: "alert",
      title: "Corresponding Adjustment Impact",
      description: "585K ITMOs pending authorization. If all approved, Kenya must add 0.585 MtCO2e to its reported emissions — reducing NDC headroom from 3.2% to 2.6%.",
      metric: "0.585",
      metricLabel: "MtCO2e impact",
      source: "Article 6 Analysis",
    },
    {
      type: "risk",
      title: "Authorization ≠ Approval",
      description: "3 project developers have submitted LOA requests using 'approval' language. Under Article 6.2, authorization is a sovereign act with corresponding adjustment obligations.",
      metric: "3",
      metricLabel: "mislabeled",
      source: "Legal Review",
    },
    {
      type: "recommendation",
      title: "Establish NDC Buffer",
      description: "Best practice: maintain 5% NDC buffer before authorizing ITMOs. Current buffer is 3.2%. Recommend deferring new authorizations until buffer is rebuilt through mitigation.",
      metric: "3.2%",
      metricLabel: "current buffer",
      source: "Policy Advisory",
    },
  ],
};

const typeConfig = {
  alert: { icon: ShieldAlert, color: "text-red-700", bg: "bg-red-50", border: "border-red-200", badge: "bg-red-100 text-red-700" },
  risk: { icon: AlertTriangle, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-700" },
  opportunity: { icon: TrendingUp, color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700" },
  recommendation: { icon: Lightbulb, color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
};

export default function IntelligenceInsights({ page, context }: IntelligenceInsightsProps) {
  const insights = insightsByPage[page] || insightsByPage.dashboard;

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-teal-800">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Intelligence Insights</h3>
            <p className="text-[10px] text-slate-500">AI-powered analysis · Verified Kenya data</p>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-teal-100 px-2.5 py-1 text-[10px] font-semibold text-teal-700">
          <Zap className="h-3 w-3" />
          LIVE
        </span>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {insights.map((insight, i) => {
          const config = typeConfig[insight.type];
          const Icon = config.icon;
          return (
            <div key={i} className={`rounded-xl border ${config.border} ${config.bg} p-4 transition-all hover:shadow-md`}>
              <div className="flex items-start gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.badge} flex-shrink-0`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-sm font-semibold ${config.color} leading-tight`}>{insight.title}</p>
                    {insight.metric && (
                      <div className="text-right flex-shrink-0">
                        <p className={`text-lg font-bold ${config.color} leading-none`}>{insight.metric}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">{insight.metricLabel}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-400">{insight.source}</span>
                    {insight.action && (
                      <Link href={insight.action.href} className={`inline-flex items-center gap-1 text-[11px] font-medium ${config.color} hover:underline`}>
                        {insight.action.label} <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
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
