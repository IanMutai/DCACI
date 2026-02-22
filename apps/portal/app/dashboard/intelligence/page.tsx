"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Sparkles,
  Globe2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  BarChart3,
  ArrowRight,
  Zap,
  Scale,
  Building,
  TreePine,
  Fuel,
  Factory,
  Trash2,
} from "lucide-react";

const AiIntelligenceAssistant = dynamic(
  () => import("@/components/intelligence/ai-intelligence-assistant"),
  { ssr: false, loading: () => <div className="h-[600px] animate-pulse bg-slate-50 rounded-2xl" /> }
);

/* ─── Kenya Budget Data (FY 2024/25, KES Billions) ─── */
const budgetData = [
  { ministry: "Energy & Petroleum", allocated: 119.7, ndcRelevant: 78.3, ndcTarget: 48.1, sector: "Energy", icon: Fuel },
  { ministry: "Agriculture & Livestock", allocated: 63.2, ndcRelevant: 18.9, ndcTarget: 9.7, sector: "Agriculture", icon: TreePine },
  { ministry: "Transport & Infrastructure", allocated: 218.3, ndcRelevant: 32.7, ndcTarget: 4.7, sector: "Transport", icon: Building },
  { ministry: "Environment & Forestry", allocated: 26.4, ndcRelevant: 22.1, ndcTarget: 20.8, sector: "LULUCF", icon: TreePine },
  { ministry: "Industrialization", allocated: 14.8, ndcRelevant: 3.7, ndcTarget: 2.4, sector: "IPPU", icon: Factory },
];

/* ─── AI-Generated Alerts (cross-cutting) ─── */
const intelligenceAlerts = [
  {
    severity: "critical" as const,
    title: "Budget-NDC Misalignment: LULUCF",
    description: "LULUCF has the 2nd largest NDC target (20.8 MtCO2e) but Ministry of Environment gets only KES 26.4B — just 0.7% of national budget. Forest cover target of 10% by 2030 requires KES 120B+.",
    source: "Budget × NDC",
    action: "/dashboard/intelligence/budget-alignment",
  },
  {
    severity: "warning" as const,
    title: "Article 6 Transfer Risk",
    description: "Pending LOAs for 585K ITMOs to Switzerland and Japan. If authorized, corresponding adjustments reduce Kenya's reported reductions by ~0.6% of NDC target. Verify domestic NDC buffer.",
    source: "Registry × NDC",
    action: "/dashboard/finance/loa",
  },
  {
    severity: "info" as const,
    title: "Carbon Revenue Opportunity",
    description: "296 VCM projects generated $136M in 2023. Projected 141M tCO2e (2025-2030) at average $5.20/credit could yield $733M — exceeding GCF allocations to Kenya ($390M total).",
    source: "Registry × Finance",
    action: "/dashboard/finance",
  },
  {
    severity: "warning" as const,
    title: "MRV Data Gap: Agriculture",
    description: "Agriculture is 47.4% of emissions (44.92 MtCO2e) but relies on PRIMAP-hist modeled data. No bottom-up activity data for enteric fermentation. Weakens BTR credibility.",
    source: "MRV Quality",
    action: "/dashboard/mrv",
  },
];

const severityConfig = {
  critical: { color: "text-red-700", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500" },
  warning: { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500" },
  info: { color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500" },
};

export default function IntelligencePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-800">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Intelligence Hub</h1>
            <p className="text-sm text-slate-500">
              Cross-cutting decision support — emissions, finance, policy alignment
            </p>
          </div>
        </div>
      </div>

      {/* Cross-System KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe2 className="h-4 w-4 text-emerald-600" />
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Emissions</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">94.9</p>
          <p className="text-xs text-slate-500">MtCO2e (2022, excl. LULUCF)</p>
          <div className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <TrendingUp className="h-3 w-3" />
            +15.3% vs 2021
          </div>
        </div>
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-[11px] font-semibold text-slate-500 uppercase">NDC Gap</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">-32%</p>
          <p className="text-xs text-slate-500">Target by 2030 vs 143 MtCO2e BAU</p>
          <div className="mt-1 flex items-center gap-1 text-xs text-amber-600">
            <AlertTriangle className="h-3 w-3" />
            On watch — 3.5% CAGR growth
          </div>
        </div>
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-teal-600" />
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Finance Gap</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">$2.73B</p>
          <p className="text-xs text-slate-500">Annual shortfall vs $5.13B need</p>
          <div className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <TrendingDown className="h-3 w-3" />
            53% unmet annually
          </div>
        </div>
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-violet-600" />
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Carbon Market</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">$136M</p>
          <p className="text-xs text-slate-500">VCM revenue (2023), 296 projects</p>
          <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            Largest portfolio in Africa
          </div>
        </div>
      </div>

      {/* Intelligence Alerts */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">
          Intelligence Alerts
        </h2>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {intelligenceAlerts.map((alert, i) => {
            const config = severityConfig[alert.severity];
            return (
              <div
                key={i}
                className={`rounded-xl border ${config.border} ${config.bg} p-4`}
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${config.dot}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-sm font-semibold ${config.color}`}>
                        {alert.title}
                      </p>
                      <span className="text-[10px] font-medium text-slate-400">
                        {alert.source}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {alert.description}
                    </p>
                    <Link
                      href={alert.action}
                      className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${config.color}`}
                    >
                      Investigate <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget vs NDC Alignment (quick view) */}
      <div className="card-elevated p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Budget × NDC Alignment (FY 2024/25)
            </h2>
            <p className="text-xs text-slate-500">
              Ministry allocations vs NDC mitigation targets (KES Billions)
            </p>
          </div>
          <Link
            href="/dashboard/intelligence/budget-alignment"
            className="text-xs font-medium text-teal-700 hover:text-teal-900 flex items-center gap-1"
          >
            Deep Analysis <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {budgetData.map((row) => {
            const Icon = row.icon;
            const ratio = row.ndcRelevant / row.allocated;
            return (
              <div key={row.ministry} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 flex-shrink-0">
                  <Icon className="h-4 w-4 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-700 truncate">
                      {row.ministry}
                    </span>
                    <span className="text-xs text-slate-500">
                      KES {row.ndcRelevant}B / {row.allocated}B ({(ratio * 100).toFixed(0)}% climate-tagged)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-500"
                      style={{ width: `${Math.min(ratio * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-[10px] text-slate-400">
                      NDC sector: {row.sector} ({row.ndcTarget} MtCO2e target)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-[10px] text-slate-400">
            Total climate-tagged: KES 358B (~9.1% of KES 3.92T budget) | Source: Kenya National Treasury FY 2024/25, NCCAP III
          </p>
        </div>
      </div>

      {/* AI Intelligence Assistant */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-5 w-5 text-teal-600" />
          <h2 className="text-lg font-semibold text-slate-900">
            AI Decision Support
          </h2>
          <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold text-teal-700">
            LIVE
          </span>
        </div>
        <AiIntelligenceAssistant track="joint" />
      </div>

      {/* Quick Access to Deep Analysis */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Link
          href="/dashboard/intelligence/priorities"
          className="card-interactive p-5 group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
              <Target className="h-4 w-4 text-emerald-700" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Strategic Priorities</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Sector-by-sector NDC implementation priorities with cost-effectiveness ranking.
          </p>
        </Link>
        <Link
          href="/dashboard/intelligence/synergies"
          className="card-interactive p-5 group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
              <BarChart3 className="h-4 w-4 text-blue-700" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Cross-Sector Synergies</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Identify where MRV, NDC, and Registry data reveal compounding opportunities.
          </p>
        </Link>
        <Link
          href="/dashboard/intelligence/budget-alignment"
          className="card-interactive p-5 group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 group-hover:bg-violet-200 transition-colors">
              <DollarSign className="h-4 w-4 text-violet-700" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Budget-NDC Alignment</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Deep analysis of national budget allocations against NDC implementation requirements.
          </p>
        </Link>
      </div>
    </div>
  );
}
