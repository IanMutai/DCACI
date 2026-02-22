import {
  Target,
  TrendingUp,
  BarChart3,
  ScrollText,
  Wallet,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  FileText,
  Zap,
  Search,
  FileBarChart,
  Globe2,
  Leaf,
  Car,
  Trees,
  Wheat,
  Trash2,
} from "lucide-react";

export const metadata = {
  title: "Dashboard",
};

const statCards = [
  {
    label: "Active NDC",
    value: "2nd NDC",
    detail: "Updated 2024",
    icon: Globe2,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    trend: null,
  },
  {
    label: "Total Targets",
    value: "14",
    detail: "7 unconditional, 7 conditional",
    icon: Target,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    trend: null,
  },
  {
    label: "Overall Progress",
    value: "47%",
    detail: "Toward 2030 target",
    icon: TrendingUp,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    trend: { value: "+5.2%", positive: true },
  },
  {
    label: "On-Track Targets",
    value: "8",
    detail: "of 14 targets",
    icon: BarChart3,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    trend: { value: "+2", positive: true },
  },
  {
    label: "Policies Implemented",
    value: "23",
    detail: "of 31 planned",
    icon: ScrollText,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    trend: { value: "+3", positive: true },
  },
  {
    label: "Finance Gap",
    value: "$4.2B",
    detail: "of $6.7B needed",
    icon: Wallet,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    trend: { value: "-$0.8B", positive: true },
  },
];

const sectorProgress = [
  { sector: "Energy", icon: Zap, progress: 52, status: "on-track" as const, emissions: "18.4 MtCO2e", target: "12.8 MtCO2e" },
  { sector: "Transport", icon: Car, progress: 35, status: "at-risk" as const, emissions: "8.2 MtCO2e", target: "5.7 MtCO2e" },
  { sector: "Forestry", icon: Trees, progress: 68, status: "on-track" as const, emissions: "-12.5 MtCO2e", target: "-18.0 MtCO2e" },
  { sector: "Agriculture", icon: Wheat, progress: 28, status: "off-track" as const, emissions: "15.1 MtCO2e", target: "10.6 MtCO2e" },
  { sector: "Waste", icon: Trash2, progress: 44, status: "at-risk" as const, emissions: "4.8 MtCO2e", target: "3.4 MtCO2e" },
];

const scenarios = [
  { name: "BAU", label: "Business as Usual", emissions: "143 MtCO2e", color: "bg-red-500" },
  { name: "WEM", label: "With Existing Measures", emissions: "118 MtCO2e", color: "bg-amber-500" },
  { name: "WAM", label: "With Additional Measures", emissions: "97 MtCO2e", color: "bg-emerald-500" },
];

const recentActivity = [
  {
    type: "target" as const,
    title: "Energy sector target updated",
    description: "Unconditional target revised to 30% renewable energy by 2030",
    time: "2 hours ago",
    icon: Target,
  },
  {
    type: "policy" as const,
    title: "Feed-in Tariff Policy approved",
    description: "New policy milestone: KES 12/kWh for solar installations under 1MW",
    time: "1 day ago",
    icon: ScrollText,
  },
  {
    type: "progress" as const,
    title: "Q3 2024 Progress Report submitted",
    description: "Quarterly progress report for BTR Chapter 3 compilation",
    time: "3 days ago",
    icon: FileText,
  },
  {
    type: "finance" as const,
    title: "GCF readiness grant received",
    description: "$1.2M disbursed for NDC implementation support",
    time: "1 week ago",
    icon: Wallet,
  },
];

const quickActions = [
  { label: "Update Progress", icon: TrendingUp, href: "/progress/tracking", color: "from-indigo-500 to-blue-600" },
  { label: "Add Policy", icon: ScrollText, href: "/policies/measures", color: "from-purple-500 to-indigo-600" },
  { label: "Gap Analysis", icon: Search, href: "/gap-analysis", color: "from-amber-500 to-orange-600" },
  { label: "Generate BTR", icon: FileBarChart, href: "/reporting/btr-chapter3", color: "from-emerald-500 to-teal-600" },
];

function getStatusBadgeClass(status: "on-track" | "at-risk" | "off-track") {
  switch (status) {
    case "on-track":
      return "badge-on-track";
    case "at-risk":
      return "badge-at-risk";
    case "off-track":
      return "badge-off-track";
  }
}

function getProgressBarClass(status: "on-track" | "at-risk" | "off-track") {
  switch (status) {
    case "on-track":
      return "progress-bar-success";
    case "at-risk":
      return "progress-bar-warning";
    case "off-track":
      return "progress-bar-danger";
  }
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      {/* Welcome Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">
                Welcome back, Climate Officer
              </h1>
              <p className="text-sm text-[hsl(var(--color-text-muted))]">
                Kenya&apos;s NDC implementation is 47% on track toward 2030 goals
              </p>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <span className="badge-primary">2nd NDC Cycle</span>
          <span className="badge-on-track">Implementation Phase</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card-elevated">
              <div className="flex items-start justify-between">
                <div className={`icon-container-md ${card.iconBg}`}>
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
                {card.trend && (
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                      card.trend.positive
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {card.trend.positive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {card.trend.value}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-[hsl(var(--color-text))]">
                  {card.value}
                </p>
                <p className="text-xs text-[hsl(var(--color-text-muted))]">
                  {card.label}
                </p>
              </div>
              <p className="mt-1 text-[11px] text-[hsl(var(--color-text-muted))]">
                {card.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Progress Overview - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Unconditional vs Conditional */}
          <div className="card-elevated">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[hsl(var(--color-text))]">
                  NDC Target Progress
                </h2>
                <p className="text-xs text-[hsl(var(--color-text-muted))]">
                  Kenya&apos;s 2030 emission reduction targets
                </p>
              </div>
              <span className="badge-primary">Paris Agreement</span>
            </div>

            <div className="space-y-5">
              {/* Unconditional */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[hsl(var(--color-text))]">
                      Unconditional Target
                    </span>
                    <span className="badge-on-track">On Track</span>
                  </div>
                  <span className="text-sm font-bold text-[hsl(var(--color-primary))]">
                    32% reduction
                  </span>
                </div>
                <div className="progress-bar progress-bar-success">
                  <div
                    className="progress-bar-fill animate-progress-fill"
                    style={{ width: "54%" }}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-[hsl(var(--color-text-muted))]">
                  <span>54% achieved (17.3% of 32%)</span>
                  <span>Base year: 2015</span>
                </div>
              </div>

              {/* Conditional */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[hsl(var(--color-text))]">
                      Conditional Target
                    </span>
                    <span className="badge-at-risk">At Risk</span>
                  </div>
                  <span className="text-sm font-bold text-[hsl(var(--color-accent-dark))]">
                    Additional 10% (total 42%)
                  </span>
                </div>
                <div className="progress-bar progress-bar-warning">
                  <div
                    className="progress-bar-fill animate-progress-fill"
                    style={{ width: "31%" }}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-[hsl(var(--color-text-muted))]">
                  <span>31% achieved (3.1% of 10%)</span>
                  <span>Requires international support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sector Progress */}
          <div className="card-elevated">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[hsl(var(--color-text))]">
                  Sector-Level Progress
                </h2>
                <p className="text-xs text-[hsl(var(--color-text-muted))]">
                  Emission reduction progress by sector
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {sectorProgress.map((sector) => {
                const Icon = sector.icon;
                return (
                  <div key={sector.sector} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--color-primary-50))]">
                      <Icon className="h-4 w-4 text-[hsl(var(--color-primary-light))]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[hsl(var(--color-text))]">
                            {sector.sector}
                          </span>
                          <span className={getStatusBadgeClass(sector.status)}>
                            {sector.status.replace("-", " ")}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-[hsl(var(--color-text-secondary))]">
                          {sector.progress}%
                        </span>
                      </div>
                      <div className={`progress-bar ${getProgressBarClass(sector.status)}`}>
                        <div
                          className="progress-bar-fill animate-progress-fill"
                          style={{ width: `${sector.progress}%` }}
                        />
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-[hsl(var(--color-text-muted))]">
                        <span>Current: {sector.emissions}</span>
                        <span>Target: {sector.target}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scenario Comparison */}
          <div className="card-elevated">
            <div className="mb-5">
              <h2 className="text-base font-bold text-[hsl(var(--color-text))]">
                Emission Scenario Comparison (2030)
              </h2>
              <p className="text-xs text-[hsl(var(--color-text-muted))]">
                Projected emissions under different policy scenarios
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.name}
                  className="rounded-xl border border-[hsl(var(--color-border))] p-4 text-center"
                >
                  <div className={`mx-auto mb-2 h-2 w-12 rounded-full ${scenario.color}`} />
                  <p className="text-xs font-semibold text-[hsl(var(--color-text-muted))] uppercase tracking-wider">
                    {scenario.name}
                  </p>
                  <p className="mt-1 text-xl font-bold text-[hsl(var(--color-text))]">
                    {scenario.emissions}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[hsl(var(--color-text-muted))]">
                    {scenario.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg bg-[hsl(var(--color-primary-50))] p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--color-primary-light))]" />
                <div>
                  <p className="text-xs font-semibold text-[hsl(var(--color-primary))]">
                    Ambition Gap: 21 MtCO2e
                  </p>
                  <p className="text-[11px] text-[hsl(var(--color-primary-light))]">
                    Difference between WAM scenario and conditional NDC target of 76 MtCO2e by 2030
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card-elevated">
            <h2 className="mb-4 text-base font-bold text-[hsl(var(--color-text))]">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    className="card-interactive flex flex-col items-center gap-2 p-4 text-center"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} shadow-sm`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-[hsl(var(--color-text))]">
                      {action.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card-elevated">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-[hsl(var(--color-text))]">
                Recent Activity
              </h2>
              <a
                href="/progress/tracking"
                className="text-xs font-medium text-[hsl(var(--color-primary-light))] hover:underline"
              >
                View all
              </a>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div key={idx} className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--color-primary-50))]">
                      <Icon className="h-4 w-4 text-[hsl(var(--color-primary-light))]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[hsl(var(--color-text))]">
                        {activity.title}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-[hsl(var(--color-text-muted))]">
                        {activity.description}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-[hsl(var(--color-text-muted))]">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NDC Summary Card */}
          <div className="overflow-hidden rounded-xl gradient-hero p-5 text-white">
            <div className="flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-indigo-300" />
              <h3 className="text-sm font-bold">Kenya NDC Summary</h3>
            </div>
            <div className="mt-3 space-y-2 text-[12px] leading-relaxed text-indigo-100/80">
              <div className="flex items-center justify-between">
                <span>Base Year</span>
                <span className="font-semibold text-white">2015</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Target Year</span>
                <span className="font-semibold text-white">2030</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Unconditional</span>
                <span className="font-semibold text-white">-32% GHG</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Conditional</span>
                <span className="font-semibold text-white">-42% GHG</span>
              </div>
              <div className="flex items-center justify-between">
                <span>NDC Cycle</span>
                <span className="font-semibold text-white">2nd (2024)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Type</span>
                <span className="font-semibold text-white">Economy-wide</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] font-medium text-emerald-300">
                Submitted to UNFCCC
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
