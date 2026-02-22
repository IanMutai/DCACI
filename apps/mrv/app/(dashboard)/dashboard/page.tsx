import {
  Leaf,
  Calendar,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Flame,
  Factory,
  Wheat,
  TreePine,
  Trash2,
  Plus,
  PenLine,
  Calculator,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity,
  AlertCircle,
  CircleDot,
  ChevronRight,
} from "lucide-react";

export const metadata = {
  title: "Dashboard",
};

// Real Kenya GHG inventory data — PRIMAP-hist v2.6 HISTCR scenario, BTR-1 (2024)
const stats = [
  {
    label: "Total Inventories",
    value: "33",
    subtitle: "1990 – 2022",
    icon: <ClipboardIcon />,
    trend: "BTR-1 submitted Dec 2024",
    trendUp: true,
    color: "emerald",
  },
  {
    label: "Active Inventory Year",
    value: "2022",
    subtitle: "Latest Complete",
    icon: <CalendarIcon />,
    trend: "BTR-1 inventory years 1990–2022",
    trendUp: null,
    color: "blue",
  },
  {
    label: "Total Emissions",
    value: "94.9",
    subtitle: "MtCO2e excl. LULUCF (2022)",
    icon: <EmissionsIcon />,
    trend: "+15.3% vs 2021 (82.3 Mt)",
    trendUp: false,
    color: "amber",
  },
  {
    label: "Per Capita Emissions",
    value: "1.5",
    subtitle: "tCO2e/person (2021, all GHGs)",
    icon: <SectorsIcon />,
    trend: "78% below 6.76 global average",
    trendUp: true,
    color: "purple",
  },
  {
    label: "Grid Emission Factor",
    value: "56.81",
    subtitle: "gCO2/kWh (CDM ASB0050-2020)",
    icon: <QAIcon />,
    trend: "Geothermal-dominated grid",
    trendUp: true,
    color: "green",
  },
  {
    label: "BTR Status",
    value: "BTR-1",
    subtitle: "Submitted Dec 2024",
    icon: <BTRIcon />,
    trend: "BTR-2 due Dec 2026",
    trendUp: null,
    color: "rose",
  },
];

// PRIMAP-hist v2.6 HISTCR 2022 sector breakdown (Gg CO2e → MtCO2e)
const sectorEmissions = [
  {
    name: "Agriculture",
    emissions: 44.9,
    percentage: 47.3,
    color: "bg-green-500",
    lightColor: "bg-green-100",
    icon: <Wheat size={16} className="text-green-600" />,
    trend: "Enteric fermentation dominant (FAO: 56%)",
  },
  {
    name: "Energy",
    emissions: 40.3,
    percentage: 42.4,
    color: "bg-orange-500",
    lightColor: "bg-orange-100",
    icon: <Flame size={16} className="text-orange-600" />,
    trend: "Transport 11.1 Mt (2021), Buildings 5.4 Mt (2021)",
  },
  {
    name: "IPPU",
    emissions: 5.96,
    percentage: 6.3,
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    icon: <Factory size={16} className="text-blue-600" />,
    trend: "Cement & industrial processes",
  },
  {
    name: "Waste",
    emissions: 3.1,
    percentage: 3.3,
    color: "bg-purple-500",
    lightColor: "bg-purple-100",
    icon: <Trash2 size={16} className="text-purple-600" />,
    trend: "Solid waste & wastewater",
  },
  {
    name: "LULUCF",
    emissions: -7.57,
    percentage: 8.0,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-100",
    icon: <TreePine size={16} className="text-emerald-600" />,
    trend: "Net carbon sink (2021 estimate)",
    isSink: true,
  },
];

const recentActivity = [
  {
    action: "BTR-1 submitted to UNFCCC",
    detail: "First Biennial Transparency Report covering inventory years 1990-2022",
    time: "Dec 2024",
    type: "submission" as const,
    user: "CCD Kenya",
  },
  {
    action: "2022 Agriculture sector finalized",
    detail: "44.9 MtCO2e (PRIMAP v2.6) — Enteric fermentation dominant per FAO analysis",
    time: "Nov 2024",
    type: "check" as const,
    user: "M. Wanjiku",
  },
  {
    action: "Energy sector 2022 data verified",
    detail: "40.3 MtCO2e total (PRIMAP v2.6) — Transport, Buildings, Manufacturing subsectors",
    time: "Oct 2024",
    type: "approval" as const,
    user: "EPRA",
  },
  {
    action: "Gas breakdown analysis completed",
    detail: "CH4: 45.1%, CO2: 26.8%, N2O: 25.3%, F-gases: 2.8% (2021 data)",
    time: "Sep 2024",
    type: "update" as const,
    user: "P. Ochieng",
  },
  {
    action: "LULUCF net sink recalculated",
    detail: "Net removals: -7.57 MtCO2e for 2022 from forestry and land use changes",
    time: "Aug 2024",
    type: "update" as const,
    user: "KFS",
  },
];

const quickActions = [
  {
    label: "New Inventory",
    description: "Start a new inventory year",
    href: "/inventory",
    icon: <Plus size={20} />,
    color: "bg-emerald-500 text-white",
  },
  {
    label: "Data Entry",
    description: "Enter activity data",
    href: "/inventory/data-entry",
    icon: <PenLine size={20} />,
    color: "bg-blue-500 text-white",
  },
  {
    label: "Run Calculations",
    description: "Calculate emissions",
    href: "/inventory/calculations",
    icon: <Calculator size={20} />,
    color: "bg-amber-500 text-white",
  },
  {
    label: "Generate Report",
    description: "Export NIR or BTR",
    href: "/reporting/nir",
    icon: <FileText size={20} />,
    color: "bg-purple-500 text-white",
  },
];

const inventoryTimeline = [
  {
    year: "2022",
    status: "Submitted (BTR-1)",
    phase: "94.9 MtCO2e excl. LULUCF (PRIMAP v2.6) — Submitted Dec 2024",
    progress: 100,
    badge: "badge-success",
  },
  {
    year: "2021",
    status: "Complete",
    phase: "82.3 MtCO2e excl. LULUCF - Per capita 1.5 tCO2e",
    progress: 100,
    badge: "badge-success",
  },
  {
    year: "2020",
    status: "Complete",
    phase: "Included in BTR-1 time series (1990-2022)",
    progress: 100,
    badge: "badge-success",
  },
  {
    year: "1990",
    status: "Base Year",
    phase: "BTR-1 base year - Full time series 1990-2022",
    progress: 100,
    badge: "badge-success",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero text-white shadow-lg shadow-emerald-500/20">
            <Leaf size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Inventory Manager
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Kenya National GHG Inventory - MRV Dashboard.{" "}
              <span className="text-emerald-600 font-medium">
                3 tasks require your attention.
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary btn-sm">
            <Calendar size={14} />
            <span>FY 2022</span>
          </button>
          <button className="btn-primary btn-sm">
            <Plus size={14} />
            <span>New Inventory</span>
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {stats.map((stat) => (
          <div key={stat.label} className="card-stat">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">{stat.subtitle}</p>
              </div>
              <div className="p-2">{stat.icon}</div>
            </div>
            {stat.trend && (
              <div className="mt-3 flex items-center gap-1 text-xs">
                {stat.trendUp === true && (
                  <ArrowUpRight size={12} className="text-emerald-500" />
                )}
                {stat.trendUp === false && (
                  <ArrowDownRight size={12} className="text-amber-500" />
                )}
                {stat.trendUp === null && (
                  <Clock size={12} className="text-gray-400" />
                )}
                <span
                  className={
                    stat.trendUp === true
                      ? "text-emerald-600"
                      : stat.trendUp === false
                      ? "text-amber-600"
                      : "text-gray-500"
                  }
                >
                  {stat.trend}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sector Emissions Breakdown */}
        <div className="lg:col-span-2 card-elevated animate-fade-up">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Sector Emissions Breakdown
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                2022 National GHG Inventory (MtCO2e) — PRIMAP-hist v2.6 HISTCR
              </p>
            </div>
            <span className="badge-primary badge-lg">
              <BarChart3 size={14} />
              94.9 MtCO2e Total (excl. LULUCF)
            </span>
          </div>

          <div className="space-y-4">
            {sectorEmissions.map((sector) => (
              <div key={sector.name} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg ${sector.lightColor}`}
                    >
                      {sector.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {sector.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium ${
                        sector.isSink ? "text-emerald-600" : "text-gray-500"
                      }`}
                    >
                      {sector.trend}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                      {sector.isSink ? "" : ""}
                      {sector.emissions} Mt
                    </span>
                    <span className="text-xs text-gray-400 w-12 text-right">
                      {sector.percentage}%
                    </span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-bar-fill ${sector.color}`}
                    style={
                      {
                        "--progress-width": `${sector.percentage}%`,
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              LULUCF is a net carbon sink (-7.57 MtCO2e, 2021 est.). Net emissions incl. LULUCF: ~87.3 MtCO2e
            </p>
            <a
              href="/key-categories"
              className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              View Key Categories
              <ChevronRight size={12} />
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card-elevated animate-slide-in-right">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-2.5">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-50 transition-colors group"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color} shadow-sm group-hover:shadow-md transition-shadow`}
                >
                  {action.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {action.label}
                  </p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-300 group-hover:text-gray-500 transition-colors"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card-elevated animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">
              Recent Activity
            </h2>
            <a
              href="#"
              className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
            >
              View all
            </a>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0"
              >
                <div className="mt-0.5">
                  <ActivityIcon type={activity.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {activity.detail}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-gray-400">
                      {activity.time}
                    </span>
                    <span className="text-[11px] text-gray-300">by</span>
                    <span className="text-[11px] font-medium text-gray-500">
                      {activity.user}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Timeline */}
        <div className="card-elevated animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">
              Inventory Timeline
            </h2>
            <a
              href="/inventory"
              className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
            >
              Manage inventories
            </a>
          </div>
          <div className="space-y-4">
            {inventoryTimeline.map((inv) => (
              <div
                key={inv.year}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-sm font-bold text-gray-700">
                  {inv.year}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      FY {inv.year} Inventory
                    </span>
                    <span className={inv.badge}>{inv.status}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          inv.progress === 100
                            ? "bg-emerald-500"
                            : "bg-amber-400"
                        }`}
                        style={{ width: `${inv.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">
                      {inv.progress}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{inv.phase}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow Legend */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-[11px] text-gray-400 mb-2 font-medium uppercase tracking-wider">
              Workflow
            </p>
            <div className="flex items-center gap-1 text-xs">
              <span className="badge-neutral">Draft</span>
              <ChevronRight size={12} className="text-gray-300" />
              <span className="badge-warning">Submitted</span>
              <ChevronRight size={12} className="text-gray-300" />
              <span className="badge-accent">Under Review</span>
              <ChevronRight size={12} className="text-gray-300" />
              <span className="badge-success">Approved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Helper Icon Components ===== */

function ClipboardIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
      <BarChart3 size={20} />
    </div>
  );
}

function CalendarIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
      <Calendar size={20} />
    </div>
  );
}

function EmissionsIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
      <TrendingUp size={20} />
    </div>
  );
}

function SectorsIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
      <Activity size={20} />
    </div>
  );
}

function QAIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
      <ShieldCheck size={20} />
    </div>
  );
}

function BTRIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
      <Clock size={20} />
    </div>
  );
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "update":
      return (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <PenLine size={12} />
        </div>
      );
    case "check":
      return (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={12} />
        </div>
      );
    case "submission":
      return (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <ArrowUpRight size={12} />
        </div>
      );
    case "approval":
      return (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600">
          <ShieldCheck size={12} />
        </div>
      );
    default:
      return (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600">
          <CircleDot size={12} />
        </div>
      );
  }
}
