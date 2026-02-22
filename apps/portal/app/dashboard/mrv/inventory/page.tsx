"use client";

import { useState } from "react";
import {
  Database,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Upload,
  Plus,
  Filter,
  Search,
  ChevronRight,
  BarChart3,
  Calculator,
  ShieldCheck,
  ArrowUpDown,
  FileText,
  Globe,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface InventoryYear {
  year: number;
  status: "SUBMITTED" | "IN_PROGRESS" | "UNDER_REVIEW" | "APPROVED";
  totalEmissions: number;
  totalRemovals: number;
  netEmissions: number;
  completeness: number;
  submissionDate?: string;
  approvalDate?: string;
  reportingCycle: string;
}

interface EmissionFactor {
  id: string;
  category: string;
  subcategory: string;
  source: string;
  value: number;
  unit: string;
  tier: 1 | 2 | 3;
  uncertainty: number;
  reference: string;
  lastUpdated: string;
  status: "ACTIVE" | "PENDING_REVIEW" | "DEPRECATED";
}

interface ActivityDataset {
  id: string;
  name: string;
  sector: string;
  source: string;
  frequency: "ANNUAL" | "QUARTERLY" | "MONTHLY";
  lastUpdate: string;
  records: number;
  coverage: number;
  status: "CURRENT" | "OUTDATED" | "MISSING";
}

interface QAQCCheck {
  id: string;
  name: string;
  category: "TIER_1" | "TIER_2" | "CATEGORY_SPECIFIC";
  description: string;
  status: "PASSED" | "FAILED" | "PENDING" | "NOT_APPLICABLE";
  lastRun: string;
  findings?: string;
}

const inventoryYears: InventoryYear[] = [
  {
    year: 2023,
    status: "IN_PROGRESS",
    totalEmissions: 98500,
    totalRemovals: 32100,
    netEmissions: 66400,
    completeness: 78,
    reportingCycle: "BTR 2024",
  },
  {
    year: 2022,
    status: "SUBMITTED",
    totalEmissions: 95200,
    totalRemovals: 31500,
    netEmissions: 63700,
    completeness: 100,
    submissionDate: "2023-12-15",
    reportingCycle: "NC4/BUR3",
  },
  {
    year: 2021,
    status: "APPROVED",
    totalEmissions: 92800,
    totalRemovals: 30800,
    netEmissions: 62000,
    completeness: 100,
    submissionDate: "2022-12-10",
    approvalDate: "2023-03-15",
    reportingCycle: "NC4/BUR3",
  },
  {
    year: 2020,
    status: "APPROVED",
    totalEmissions: 89500,
    totalRemovals: 29900,
    netEmissions: 59600,
    completeness: 100,
    submissionDate: "2021-12-01",
    approvalDate: "2022-02-20",
    reportingCycle: "BUR2",
  },
  {
    year: 2019,
    status: "APPROVED",
    totalEmissions: 91200,
    totalRemovals: 28500,
    netEmissions: 62700,
    completeness: 100,
    submissionDate: "2020-11-30",
    approvalDate: "2021-01-15",
    reportingCycle: "BUR2",
  },
];

const emissionFactors: EmissionFactor[] = [
  {
    id: "ef-001",
    category: "Energy",
    subcategory: "Electricity Generation",
    source: "Grid Emission Factor",
    value: 0.456,
    unit: "tCO2/MWh",
    tier: 2,
    uncertainty: 8.5,
    reference: "Kenya Power Annual Report 2023",
    lastUpdated: "2024-01-15",
    status: "ACTIVE",
  },
  {
    id: "ef-002",
    category: "Energy",
    subcategory: "Road Transport",
    source: "Diesel Combustion",
    value: 2.68,
    unit: "kgCO2/L",
    tier: 1,
    uncertainty: 3.0,
    reference: "IPCC 2006 Guidelines",
    lastUpdated: "2023-06-01",
    status: "ACTIVE",
  },
  {
    id: "ef-003",
    category: "Agriculture",
    subcategory: "Enteric Fermentation",
    source: "Dairy Cattle",
    value: 68,
    unit: "kgCH4/head/yr",
    tier: 2,
    uncertainty: 20,
    reference: "Kenya Livestock Study 2022",
    lastUpdated: "2023-03-20",
    status: "ACTIVE",
  },
  {
    id: "ef-004",
    category: "Waste",
    subcategory: "Solid Waste Disposal",
    source: "MSW Landfill",
    value: 0.058,
    unit: "tCH4/t waste",
    tier: 1,
    uncertainty: 25,
    reference: "IPCC 2006 Guidelines",
    lastUpdated: "2022-09-15",
    status: "PENDING_REVIEW",
  },
  {
    id: "ef-005",
    category: "LULUCF",
    subcategory: "Forest Land",
    source: "Tropical Rainforest",
    value: 310,
    unit: "tC/ha",
    tier: 2,
    uncertainty: 15,
    reference: "Kenya Forest Service 2023",
    lastUpdated: "2024-02-01",
    status: "ACTIVE",
  },
];

const activityDatasets: ActivityDataset[] = [
  {
    id: "ad-001",
    name: "National Energy Balance",
    sector: "Energy",
    source: "Ministry of Energy",
    frequency: "ANNUAL",
    lastUpdate: "2024-01-20",
    records: 156,
    coverage: 95,
    status: "CURRENT",
  },
  {
    id: "ad-002",
    name: "Vehicle Registration Database",
    sector: "Transport",
    source: "NTSA",
    frequency: "MONTHLY",
    lastUpdate: "2024-01-31",
    records: 4520000,
    coverage: 100,
    status: "CURRENT",
  },
  {
    id: "ad-003",
    name: "Livestock Census",
    sector: "Agriculture",
    source: "Kenya National Bureau of Statistics",
    frequency: "ANNUAL",
    lastUpdate: "2023-06-15",
    records: 47,
    coverage: 100,
    status: "CURRENT",
  },
  {
    id: "ad-004",
    name: "Industrial Production Index",
    sector: "IPPU",
    source: "Ministry of Industry",
    frequency: "QUARTERLY",
    lastUpdate: "2023-09-30",
    records: 245,
    coverage: 72,
    status: "OUTDATED",
  },
  {
    id: "ad-005",
    name: "Forest Cover Assessment",
    sector: "LULUCF",
    source: "Kenya Forest Service",
    frequency: "ANNUAL",
    lastUpdate: "2024-02-01",
    records: 47,
    coverage: 100,
    status: "CURRENT",
  },
  {
    id: "ad-006",
    name: "Municipal Waste Generation",
    sector: "Waste",
    source: "NEMA",
    frequency: "ANNUAL",
    lastUpdate: "2022-12-01",
    records: 47,
    coverage: 65,
    status: "OUTDATED",
  },
];

const qaqcChecks: QAQCCheck[] = [
  {
    id: "qa-001",
    name: "Time Series Consistency",
    category: "TIER_1",
    description: "Check for significant unexplained inter-annual changes",
    status: "PASSED",
    lastRun: "2024-01-25",
  },
  {
    id: "qa-002",
    name: "Completeness Check",
    category: "TIER_1",
    description: "Verify all source categories are reported",
    status: "PASSED",
    lastRun: "2024-01-25",
  },
  {
    id: "qa-003",
    name: "Emission Factor Validation",
    category: "TIER_2",
    description: "Compare EFs against IPCC default values",
    status: "PENDING",
    lastRun: "2024-01-20",
  },
  {
    id: "qa-004",
    name: "Activity Data Cross-Check",
    category: "TIER_2",
    description: "Verify AD against independent data sources",
    status: "FAILED",
    lastRun: "2024-01-22",
    findings: "Industrial production data shows 15% discrepancy with energy statistics",
  },
  {
    id: "qa-005",
    name: "Key Category Analysis",
    category: "CATEGORY_SPECIFIC",
    description: "Identify and prioritize key emission categories",
    status: "PASSED",
    lastRun: "2024-01-25",
  },
  {
    id: "qa-006",
    name: "Uncertainty Assessment",
    category: "TIER_2",
    description: "Monte Carlo simulation for combined uncertainty",
    status: "PENDING",
    lastRun: "2024-01-15",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "APPROVED":
    case "PASSED":
    case "ACTIVE":
    case "CURRENT":
      return "hsl(142 76% 36%)";
    case "SUBMITTED":
    case "UNDER_REVIEW":
    case "PENDING":
    case "PENDING_REVIEW":
      return "hsl(45 93% 47%)";
    case "IN_PROGRESS":
      return "hsl(217 91% 60%)";
    case "FAILED":
    case "DEPRECATED":
    case "OUTDATED":
    case "MISSING":
      return "hsl(0 84% 60%)";
    default:
      return "hsl(var(--muted-foreground))";
  }
}

function getStatusBg(status: string) {
  switch (status) {
    case "APPROVED":
    case "PASSED":
    case "ACTIVE":
    case "CURRENT":
      return "hsl(142 76% 36% / 0.1)";
    case "SUBMITTED":
    case "UNDER_REVIEW":
    case "PENDING":
    case "PENDING_REVIEW":
      return "hsl(45 93% 47% / 0.1)";
    case "IN_PROGRESS":
      return "hsl(217 91% 60% / 0.1)";
    case "FAILED":
    case "DEPRECATED":
    case "OUTDATED":
    case "MISSING":
      return "hsl(0 84% 60% / 0.1)";
    default:
      return "hsl(var(--muted) / 0.5)";
  }
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "APPROVED":
    case "PASSED":
    case "ACTIVE":
    case "CURRENT":
      return <CheckCircle2 className="h-4 w-4" />;
    case "SUBMITTED":
    case "UNDER_REVIEW":
    case "PENDING":
    case "PENDING_REVIEW":
      return <Clock className="h-4 w-4" />;
    case "FAILED":
    case "DEPRECATED":
    case "OUTDATED":
    case "MISSING":
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
}

export default function GHGInventoryPage() {
  const [activeTab, setActiveTab] = useState<"years" | "factors" | "activity" | "qaqc">("years");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "years", label: "Inventory Years", icon: FileSpreadsheet },
    { id: "factors", label: "Emission Factors", icon: Calculator },
    { id: "activity", label: "Activity Data", icon: Database },
    { id: "qaqc", label: "QA/QC", icon: ShieldCheck },
  ];

  // Calculate summary stats
  const totalDatasets = activityDatasets.length;
  const currentDatasets = activityDatasets.filter((d) => d.status === "CURRENT").length;
  const totalFactors = emissionFactors.length;
  const activeFactors = emissionFactors.filter((f) => f.status === "ACTIVE").length;
  const qaqcPassed = qaqcChecks.filter((c) => c.status === "PASSED").length;
  const qaqcTotal = qaqcChecks.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
            GHG Inventory Management
          </h1>
          <p className="mt-1 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            National greenhouse gas inventory data, emission factors, and quality assurance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: "hsl(var(--muted))",
              color: "hsl(var(--foreground))",
            }}
          >
            <Upload className="h-4 w-4" />
            Import Data
          </button>
          <button
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            <Plus className="h-4 w-4" />
            New Inventory
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          className="rounded-xl p-5"
          style={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: "hsl(217 91% 60% / 0.1)" }}
            >
              <Globe className="h-5 w-5" style={{ color: "hsl(217 91% 60%)" }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                Current Year Net Emissions
              </p>
              <p className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
                66.4 MtCO₂e
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4" style={{ color: "hsl(0 84% 60%)" }} />
            <span style={{ color: "hsl(0 84% 60%)" }}>+4.2%</span>
            <span style={{ color: "hsl(var(--muted-foreground))" }}>from 2022</span>
          </div>
        </div>

        <div
          className="rounded-xl p-5"
          style={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: "hsl(142 76% 36% / 0.1)" }}
            >
              <Database className="h-5 w-5" style={{ color: "hsl(142 76% 36%)" }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                Activity Datasets
              </p>
              <p className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
                {currentDatasets}/{totalDatasets} Current
              </p>
            </div>
          </div>
          <div className="mt-3">
            <div
              className="h-2 rounded-full"
              style={{ backgroundColor: "hsl(var(--muted))" }}
            >
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${(currentDatasets / totalDatasets) * 100}%`,
                  backgroundColor: "hsl(142 76% 36%)",
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="rounded-xl p-5"
          style={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: "hsl(280 87% 65% / 0.1)" }}
            >
              <Calculator className="h-5 w-5" style={{ color: "hsl(280 87% 65%)" }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                Emission Factors
              </p>
              <p className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
                {activeFactors}/{totalFactors} Active
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-sm">
            <span style={{ color: "hsl(var(--muted-foreground))" }}>
              Tier 1: 40% | Tier 2: 55% | Tier 3: 5%
            </span>
          </div>
        </div>

        <div
          className="rounded-xl p-5"
          style={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: "hsl(45 93% 47% / 0.1)" }}
            >
              <ShieldCheck className="h-5 w-5" style={{ color: "hsl(45 93% 47%)" }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                QA/QC Status
              </p>
              <p className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
                {qaqcPassed}/{qaqcTotal} Passed
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-sm">
            <AlertTriangle className="h-4 w-4" style={{ color: "hsl(0 84% 60%)" }} />
            <span style={{ color: "hsl(0 84% 60%)" }}>1 issue requires attention</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 rounded-lg p-1"
        style={{ backgroundColor: "hsl(var(--muted))" }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? "hsl(var(--background))" : "transparent",
                color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "years" && (
        <div className="space-y-4">
          <div
            className="rounded-xl"
            style={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <div
              className="flex items-center justify-between p-4"
              style={{ borderBottom: "1px solid hsl(var(--border))" }}
            >
              <h3 className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                Inventory Timeline
              </h3>
              <button className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--primary))" }}>
                <Download className="h-4 w-4" />
                Export All
              </button>
            </div>
            <div className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
              {inventoryYears.map((inventory) => (
                <div
                  key={inventory.year}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-opacity-50"
                  style={{ backgroundColor: "transparent" }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-16 flex-col items-center justify-center rounded-lg"
                      style={{ backgroundColor: "hsl(var(--muted))" }}
                    >
                      <span className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>
                        {inventory.year}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium" style={{ color: "hsl(var(--foreground))" }}>
                          {inventory.reportingCycle}
                        </span>
                        <span
                          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: getStatusBg(inventory.status),
                            color: getStatusColor(inventory.status),
                          }}
                        >
                          <StatusIcon status={inventory.status} />
                          {inventory.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="mt-1 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {inventory.submissionDate
                          ? `Submitted: ${inventory.submissionDate}`
                          : `Completeness: ${inventory.completeness}%`}
                        {inventory.approvalDate && ` • Approved: ${inventory.approvalDate}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                        Gross Emissions
                      </p>
                      <p className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                        {(inventory.totalEmissions / 1000).toFixed(1)} MtCO₂e
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                        Removals
                      </p>
                      <p className="font-semibold" style={{ color: "hsl(142 76% 36%)" }}>
                        -{(inventory.totalRemovals / 1000).toFixed(1)} MtCO₂e
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                        Net Emissions
                      </p>
                      <p className="font-bold" style={{ color: "hsl(var(--foreground))" }}>
                        {(inventory.netEmissions / 1000).toFixed(1)} MtCO₂e
                      </p>
                    </div>
                    <button
                      className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium"
                      style={{
                        backgroundColor: "hsl(var(--muted))",
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      View
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trend Chart Placeholder */}
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <h3 className="font-semibold mb-4" style={{ color: "hsl(var(--foreground))" }}>
              Emissions Trend (2019-2023)
            </h3>
            <div className="flex items-end gap-4 h-48">
              {inventoryYears.slice().reverse().map((inv) => (
                <div key={inv.year} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t"
                      style={{
                        height: `${(inv.totalEmissions / 100000) * 150}px`,
                        backgroundColor: "hsl(217 91% 60%)",
                      }}
                    />
                    <div
                      className="w-full rounded-b"
                      style={{
                        height: `${(inv.totalRemovals / 100000) * 150}px`,
                        backgroundColor: "hsl(142 76% 36%)",
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {inv.year}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(217 91% 60%)" }} />
                <span className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Gross Emissions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(142 76% 36%)" }} />
                <span className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Removals
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "factors" && (
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div
              className="flex flex-1 items-center gap-2 rounded-lg px-4 py-2"
              style={{
                backgroundColor: "hsl(var(--muted))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <Search className="h-4 w-4" style={{ color: "hsl(var(--muted-foreground))" }} />
              <input
                type="text"
                placeholder="Search emission factors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "hsl(var(--foreground))" }}
              />
            </div>
            <button
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
              style={{
                backgroundColor: "hsl(var(--muted))",
                color: "hsl(var(--foreground))",
              }}
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <Plus className="h-4 w-4" />
              Add Factor
            </button>
          </div>

          {/* Emission Factors Table */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "hsl(var(--muted))" }}>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Category / Subcategory
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Source
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Value
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Tier
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Uncertainty
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
                {emissionFactors.map((ef) => (
                  <tr key={ef.id} className="hover:bg-opacity-50" style={{ backgroundColor: "transparent" }}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm" style={{ color: "hsl(var(--foreground))" }}>
                        {ef.category}
                      </p>
                      <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {ef.subcategory}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm" style={{ color: "hsl(var(--foreground))" }}>
                        {ef.source}
                      </p>
                      <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {ef.reference}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <p className="font-mono text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>
                        {ef.value}
                      </p>
                      <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {ef.unit}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                        style={{
                          backgroundColor:
                            ef.tier === 3
                              ? "hsl(142 76% 36% / 0.1)"
                              : ef.tier === 2
                              ? "hsl(217 91% 60% / 0.1)"
                              : "hsl(var(--muted))",
                          color:
                            ef.tier === 3
                              ? "hsl(142 76% 36%)"
                              : ef.tier === 2
                              ? "hsl(217 91% 60%)"
                              : "hsl(var(--muted-foreground))",
                        }}
                      >
                        {ef.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm" style={{ color: "hsl(var(--foreground))" }}>
                        ±{ef.uncertainty}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: getStatusBg(ef.status),
                          color: getStatusColor(ef.status),
                        }}
                      >
                        <StatusIcon status={ef.status} />
                        {ef.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        className="rounded px-2 py-1 text-xs font-medium"
                        style={{ color: "hsl(var(--primary))" }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div
              className="flex flex-1 items-center gap-2 rounded-lg px-4 py-2"
              style={{
                backgroundColor: "hsl(var(--muted))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <Search className="h-4 w-4" style={{ color: "hsl(var(--muted-foreground))" }} />
              <input
                type="text"
                placeholder="Search datasets..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "hsl(var(--foreground))" }}
              />
            </div>
            <button
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
              style={{
                backgroundColor: "hsl(var(--muted))",
                color: "hsl(var(--foreground))",
              }}
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <Plus className="h-4 w-4" />
              Add Dataset
            </button>
          </div>

          {/* Activity Data Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activityDatasets.map((dataset) => (
              <div
                key={dataset.id}
                className="rounded-xl p-5"
                style={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                      {dataset.name}
                    </h4>
                    <p className="mt-1 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {dataset.source}
                    </p>
                  </div>
                  <span
                    className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: getStatusBg(dataset.status),
                      color: getStatusColor(dataset.status),
                    }}
                  >
                    <StatusIcon status={dataset.status} />
                    {dataset.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Sector
                    </p>
                    <p className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>
                      {dataset.sector}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Frequency
                    </p>
                    <p className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>
                      {dataset.frequency}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Records
                    </p>
                    <p className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>
                      {dataset.records.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Coverage
                    </p>
                    <p className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>
                      {dataset.coverage}%
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-4" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                  <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Last updated: {dataset.lastUpdate}
                  </span>
                  <button className="text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>
                    View Data
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "qaqc" && (
        <div className="space-y-4">
          {/* QA/QC Summary */}
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <h3 className="font-semibold mb-4" style={{ color: "hsl(var(--foreground))" }}>
              Quality Assurance / Quality Control Status
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "hsl(142 76% 36% / 0.1)" }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8" style={{ color: "hsl(142 76% 36%)" }} />
                  <div>
                    <p className="text-2xl font-bold" style={{ color: "hsl(142 76% 36%)" }}>
                      {qaqcChecks.filter((c) => c.status === "PASSED").length}
                    </p>
                    <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Checks Passed
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "hsl(45 93% 47% / 0.1)" }}
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8" style={{ color: "hsl(45 93% 47%)" }} />
                  <div>
                    <p className="text-2xl font-bold" style={{ color: "hsl(45 93% 47%)" }}>
                      {qaqcChecks.filter((c) => c.status === "PENDING").length}
                    </p>
                    <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Pending Review
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "hsl(0 84% 60% / 0.1)" }}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8" style={{ color: "hsl(0 84% 60%)" }} />
                  <div>
                    <p className="text-2xl font-bold" style={{ color: "hsl(0 84% 60%)" }}>
                      {qaqcChecks.filter((c) => c.status === "FAILED").length}
                    </p>
                    <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Issues Found
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QA/QC Checks List */}
          <div
            className="rounded-xl"
            style={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <div
              className="flex items-center justify-between p-4"
              style={{ borderBottom: "1px solid hsl(var(--border))" }}
            >
              <h3 className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                QA/QC Checks
              </h3>
              <button
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium"
                style={{
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                Run All Checks
              </button>
            </div>
            <div className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
              {qaqcChecks.map((check) => (
                <div key={check.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: getStatusBg(check.status) }}
                      >
                        <StatusIcon status={check.status} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium" style={{ color: "hsl(var(--foreground))" }}>
                            {check.name}
                          </h4>
                          <span
                            className="rounded px-1.5 py-0.5 text-xs font-medium"
                            style={{
                              backgroundColor: "hsl(var(--muted))",
                              color: "hsl(var(--muted-foreground))",
                            }}
                          >
                            {check.category.replace("_", " ")}
                          </span>
                        </div>
                        <p className="mt-1 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                          {check.description}
                        </p>
                        {check.findings && (
                          <div
                            className="mt-2 rounded-lg p-3"
                            style={{ backgroundColor: "hsl(0 84% 60% / 0.1)" }}
                          >
                            <p className="text-sm" style={{ color: "hsl(0 84% 60%)" }}>
                              <strong>Finding:</strong> {check.findings}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: getStatusBg(check.status),
                          color: getStatusColor(check.status),
                        }}
                      >
                        {check.status}
                      </span>
                      <p className="mt-1 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                        Last run: {check.lastRun}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
