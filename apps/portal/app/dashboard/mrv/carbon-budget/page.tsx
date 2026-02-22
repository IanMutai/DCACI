"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Target,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Layers,
  Globe,
  BarChart3,
  PieChart,
  RefreshCw,
  Download,
  Lock,
  Unlock,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Info,
} from "lucide-react";

interface CarbonBudgetAccount {
  id: string;
  name: string;
  type: "NATIONAL" | "SECTOR" | "BUFFER" | "ITMO_RESERVE" | "OMGE";
  totalAllocation: number;
  usedAmount: number;
  reservedAmount: number;
  availableAmount: number;
  commitmentPeriod: string;
  lastUpdated: string;
  status: "ACTIVE" | "DEPLETED" | "RESTRICTED";
}

interface CarbonTransaction {
  id: string;
  date: string;
  type: "ISSUANCE" | "TRANSFER_OUT" | "TRANSFER_IN" | "RETIREMENT" | "CANCELLATION" | "CA_ADJUSTMENT" | "BUFFER_ALLOCATION";
  description: string;
  quantity: number;
  fromAccount: string;
  toAccount: string;
  projectId?: string;
  counterparty?: string;
  reference: string;
  status: "COMPLETED" | "PENDING" | "REVERSED";
}

interface CorrespondingAdjustmentImpact {
  id: string;
  loaNumber: string;
  acquiringCountry: string;
  transferQuantity: number;
  adjustmentDate: string;
  preAdjustmentBudget: number;
  postAdjustmentBudget: number;
  impactOnNDC: number;
  status: "APPLIED" | "PENDING" | "PREVIEW";
}

interface SectorBudgetAllocation {
  sector: string;
  totalBudget: number;
  allocated: number;
  utilized: number;
  reserved: number;
  available: number;
  projectsCount: number;
  color: string;
}

const carbonAccounts: CarbonBudgetAccount[] = [
  {
    id: "ACC-001",
    name: "National Carbon Budget 2021-2030",
    type: "NATIONAL",
    totalAllocation: 143000000,
    usedAmount: 45200000,
    reservedAmount: 28500000,
    availableAmount: 69300000,
    commitmentPeriod: "2021-2030",
    lastUpdated: "2024-01-20",
    status: "ACTIVE",
  },
  {
    id: "ACC-002",
    name: "ITMO Export Reserve",
    type: "ITMO_RESERVE",
    totalAllocation: 15000000,
    usedAmount: 3200000,
    reservedAmount: 5800000,
    availableAmount: 6000000,
    commitmentPeriod: "2024-2030",
    lastUpdated: "2024-01-20",
    status: "ACTIVE",
  },
  {
    id: "ACC-003",
    name: "Buffer Account (5% OMGE)",
    type: "BUFFER",
    totalAllocation: 7150000,
    usedAmount: 0,
    reservedAmount: 2280000,
    availableAmount: 4870000,
    commitmentPeriod: "2021-2030",
    lastUpdated: "2024-01-15",
    status: "ACTIVE",
  },
  {
    id: "ACC-004",
    name: "Share of Proceeds (SOP) Account",
    type: "OMGE",
    totalAllocation: 3575000,
    usedAmount: 850000,
    reservedAmount: 0,
    availableAmount: 2725000,
    commitmentPeriod: "2024-2030",
    lastUpdated: "2024-01-18",
    status: "ACTIVE",
  },
  {
    id: "ACC-005",
    name: "Energy Sector Budget",
    type: "SECTOR",
    totalAllocation: 35000000,
    usedAmount: 12500000,
    reservedAmount: 8200000,
    availableAmount: 14300000,
    commitmentPeriod: "2021-2030",
    lastUpdated: "2024-01-20",
    status: "ACTIVE",
  },
  {
    id: "ACC-006",
    name: "Transport Sector Budget",
    type: "SECTOR",
    totalAllocation: 28000000,
    usedAmount: 8800000,
    reservedAmount: 5500000,
    availableAmount: 13700000,
    commitmentPeriod: "2021-2030",
    lastUpdated: "2024-01-19",
    status: "ACTIVE",
  },
];

const recentTransactions: CarbonTransaction[] = [
  {
    id: "TXN-001",
    date: "2024-01-20",
    type: "ISSUANCE",
    description: "Credit issuance for Marsabit Wind Farm Phase II",
    quantity: 85000,
    fromAccount: "—",
    toAccount: "Energy Sector Budget",
    projectId: "PRJ-MRB-001",
    reference: "ISS-2024-001",
    status: "COMPLETED",
  },
  {
    id: "TXN-002",
    date: "2024-01-18",
    type: "TRANSFER_OUT",
    description: "ITMO transfer to Switzerland",
    quantity: 50000,
    fromAccount: "ITMO Export Reserve",
    toAccount: "External (Switzerland)",
    counterparty: "Swiss Climate Foundation",
    reference: "LOA-2024-MRB-001",
    status: "COMPLETED",
  },
  {
    id: "TXN-003",
    date: "2024-01-18",
    type: "CA_ADJUSTMENT",
    description: "Corresponding adjustment for ITMO transfer",
    quantity: -50000,
    fromAccount: "National Carbon Budget",
    toAccount: "CA Adjustment Account",
    reference: "CA-2024-001",
    status: "COMPLETED",
  },
  {
    id: "TXN-004",
    date: "2024-01-15",
    type: "BUFFER_ALLOCATION",
    description: "5% OMGE allocation for Article 6.4 project",
    quantity: 4250,
    fromAccount: "National Carbon Budget",
    toAccount: "Buffer Account (5% OMGE)",
    projectId: "PRJ-NRB-008",
    reference: "BUF-2024-001",
    status: "COMPLETED",
  },
  {
    id: "TXN-005",
    date: "2024-01-12",
    type: "RETIREMENT",
    description: "Voluntary retirement for national contribution",
    quantity: 25000,
    fromAccount: "National Carbon Budget",
    toAccount: "Retired",
    reference: "RET-2024-001",
    status: "COMPLETED",
  },
];

const correspondingAdjustments: CorrespondingAdjustmentImpact[] = [
  {
    id: "CA-001",
    loaNumber: "LOA-2024-MRB-001",
    acquiringCountry: "Switzerland",
    transferQuantity: 50000,
    adjustmentDate: "2024-01-18",
    preAdjustmentBudget: 69350000,
    postAdjustmentBudget: 69300000,
    impactOnNDC: -0.035,
    status: "APPLIED",
  },
  {
    id: "CA-002",
    loaNumber: "LOA-2024-TRK-002",
    acquiringCountry: "Japan",
    transferQuantity: 75000,
    adjustmentDate: "",
    preAdjustmentBudget: 69300000,
    postAdjustmentBudget: 69225000,
    impactOnNDC: -0.052,
    status: "PENDING",
  },
  {
    id: "CA-003",
    loaNumber: "LOA-2024-NKR-003",
    acquiringCountry: "Germany",
    transferQuantity: 100000,
    adjustmentDate: "",
    preAdjustmentBudget: 69225000,
    postAdjustmentBudget: 69125000,
    impactOnNDC: -0.07,
    status: "PREVIEW",
  },
];

const sectorAllocations: SectorBudgetAllocation[] = [
  { sector: "Energy", totalBudget: 35000000, allocated: 28500000, utilized: 12500000, reserved: 8200000, available: 14300000, projectsCount: 12, color: "amber" },
  { sector: "Transport", totalBudget: 28000000, allocated: 22000000, utilized: 8800000, reserved: 5500000, available: 13700000, projectsCount: 8, color: "blue" },
  { sector: "Agriculture", totalBudget: 25000000, allocated: 18500000, utilized: 6200000, reserved: 4100000, available: 14700000, projectsCount: 15, color: "emerald" },
  { sector: "Forestry", totalBudget: 32000000, allocated: 26000000, utilized: 14500000, reserved: 6800000, available: 10700000, projectsCount: 22, color: "green" },
  { sector: "Waste", totalBudget: 12000000, allocated: 8500000, utilized: 2800000, reserved: 2500000, available: 6700000, projectsCount: 5, color: "violet" },
  { sector: "Industry", totalBudget: 11000000, allocated: 6500000, utilized: 400000, reserved: 1400000, available: 9200000, projectsCount: 3, color: "slate" },
];

const accountTypeConfig = {
  NATIONAL: { label: "National", icon: Globe, color: "blue" },
  SECTOR: { label: "Sector", icon: Layers, color: "emerald" },
  BUFFER: { label: "Buffer", icon: Shield, color: "amber" },
  ITMO_RESERVE: { label: "ITMO Reserve", icon: ArrowRight, color: "violet" },
  OMGE: { label: "SOP/OMGE", icon: Lock, color: "slate" },
};

const transactionTypeConfig = {
  ISSUANCE: { label: "Issuance", color: "emerald", icon: ArrowUpRight },
  TRANSFER_OUT: { label: "Transfer Out", color: "red", icon: ArrowUpRight },
  TRANSFER_IN: { label: "Transfer In", color: "emerald", icon: ArrowDownRight },
  RETIREMENT: { label: "Retirement", color: "slate", icon: Lock },
  CANCELLATION: { label: "Cancellation", color: "red", icon: Minus },
  CA_ADJUSTMENT: { label: "CA Adjustment", color: "amber", icon: AlertTriangle },
  BUFFER_ALLOCATION: { label: "Buffer Alloc.", color: "blue", icon: Shield },
};

function formatNumber(num: number): string {
  if (Math.abs(num) >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (Math.abs(num) >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toLocaleString();
}

export default function CarbonBudgetPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "accounts" | "transactions" | "adjustments">("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const nationalAccount = carbonAccounts.find((a) => a.type === "NATIONAL");
  const totalBudget = nationalAccount?.totalAllocation || 0;
  const totalUsed = nationalAccount?.usedAmount || 0;
  const totalReserved = nationalAccount?.reservedAmount || 0;
  const totalAvailable = nationalAccount?.availableAmount || 0;
  const utilizationRate = ((totalUsed / totalBudget) * 100).toFixed(1);

  const pendingCAs = correspondingAdjustments.filter((ca) => ca.status === "PENDING");
  const totalPendingCAImpact = pendingCAs.reduce((sum, ca) => sum + ca.transferQuantity, 0);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/mrv" className="hover:text-[hsl(var(--primary))]">
              MRV System
            </Link>
            <span>/</span>
            <span>Carbon Budget</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Carbon Budget Management
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Track national carbon budget, sector allocations, ITMO reserves, and corresponding adjustments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* National Carbon Budget Overview */}
      <div className="card bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--primary)/0.05)] border-[hsl(var(--primary)/0.2)]">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--primary))]">
              <Target className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                National Carbon Budget (2021-2030)
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Total NDC commitment period allocation and utilization status
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[hsl(var(--primary))]">{formatNumber(totalAvailable)}</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">tCO2e Available</p>
          </div>
        </div>

        {/* Budget visualization */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))] mb-2">
            <span>Total Budget: {formatNumber(totalBudget)} tCO2e</span>
            <span>{utilizationRate}% utilized</span>
          </div>
          <div className="h-6 rounded-full bg-white/50 flex overflow-hidden">
            <div
              className="h-6 bg-emerald-500 flex items-center justify-center text-xs font-medium text-white"
              style={{ width: `${(totalUsed / totalBudget) * 100}%` }}
            >
              {((totalUsed / totalBudget) * 100).toFixed(0)}%
            </div>
            <div
              className="h-6 bg-amber-400 flex items-center justify-center text-xs font-medium text-amber-900"
              style={{ width: `${(totalReserved / totalBudget) * 100}%` }}
            >
              {((totalReserved / totalBudget) * 100).toFixed(0)}%
            </div>
          </div>
          <div className="flex items-center gap-6 mt-2 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              Used: {formatNumber(totalUsed)}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              Reserved: {formatNumber(totalReserved)}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-white/50" />
              Available: {formatNumber(totalAvailable)}
            </span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">ITMO Reserve</p>
            <p className="text-lg font-bold text-violet-600">
              {formatNumber(carbonAccounts.find((a) => a.type === "ITMO_RESERVE")?.availableAmount || 0)}
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">available for export</p>
          </div>
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Buffer Account</p>
            <p className="text-lg font-bold text-amber-600">
              {formatNumber(carbonAccounts.find((a) => a.type === "BUFFER")?.availableAmount || 0)}
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">5% OMGE reserve</p>
          </div>
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Pending CAs</p>
            <p className="text-lg font-bold text-red-600">{formatNumber(totalPendingCAImpact)}</p>
            <p className="text-xs text-red-600">{pendingCAs.length} transfers pending</p>
          </div>
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Active Projects</p>
            <p className="text-lg font-bold text-[hsl(var(--foreground))]">
              {sectorAllocations.reduce((sum, s) => sum + s.projectsCount, 0)}
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">across all sectors</p>
          </div>
        </div>
      </div>

      {/* Alert for Pending CAs */}
      {pendingCAs.length > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-amber-800">Pending Corresponding Adjustments</p>
              <p className="text-sm text-amber-700 mt-1">
                {pendingCAs.length} ITMO transfer(s) totaling {formatNumber(totalPendingCAImpact)} tCO2e are pending corresponding adjustment.
                Once applied, the available carbon budget will be reduced accordingly.
              </p>
            </div>
            <Link
              href="#adjustments"
              onClick={() => setActiveTab("adjustments")}
              className="text-sm font-medium text-amber-700 hover:text-amber-900"
            >
              Review →
            </Link>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-2xl bg-[hsl(var(--secondary))] p-1.5">
        {[
          { id: "overview" as const, label: "Sector Allocation", icon: PieChart },
          { id: "accounts" as const, label: "Accounts", icon: Layers },
          { id: "transactions" as const, label: "Transactions", icon: BarChart3 },
          { id: "adjustments" as const, label: "Corresponding Adjustments", icon: ArrowRight },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-[hsl(var(--foreground))] shadow-sm"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-[hsl(var(--primary))]" : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Sector Allocation Tab */}
      {activeTab === "overview" && (
        <div className="card">
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
            Sector Carbon Budget Allocation
          </h2>
          <div className="space-y-4">
            {sectorAllocations.map((sector) => {
              const utilizationPct = (sector.utilized / sector.totalBudget) * 100;
              const reservedPct = (sector.reserved / sector.totalBudget) * 100;
              return (
                <div key={sector.sector} className="p-4 rounded-xl border border-[hsl(var(--border))]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`h-4 w-4 rounded-full bg-${sector.color}-500`} />
                      <h3 className="font-semibold text-[hsl(var(--foreground))]">{sector.sector}</h3>
                      <span className="text-xs bg-[hsl(var(--secondary))] px-2 py-0.5 rounded-full">
                        {sector.projectsCount} projects
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[hsl(var(--foreground))]">
                        {formatNumber(sector.available)}
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">available tCO2e</p>
                    </div>
                  </div>
                  <div className="h-3 rounded-full bg-[hsl(var(--secondary))] flex overflow-hidden">
                    <div
                      className={`h-3 bg-${sector.color}-500`}
                      style={{ width: `${utilizationPct}%` }}
                    />
                    <div
                      className={`h-3 bg-${sector.color}-300`}
                      style={{ width: `${reservedPct}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-3 text-xs">
                    <div>
                      <p className="text-[hsl(var(--muted-foreground))]">Total Budget</p>
                      <p className="font-medium text-[hsl(var(--foreground))]">{formatNumber(sector.totalBudget)}</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--muted-foreground))]">Utilized</p>
                      <p className={`font-medium text-${sector.color}-600`}>{formatNumber(sector.utilized)}</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--muted-foreground))]">Reserved</p>
                      <p className="font-medium text-amber-600">{formatNumber(sector.reserved)}</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--muted-foreground))]">Available</p>
                      <p className="font-medium text-emerald-600">{formatNumber(sector.available)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Accounts Tab */}
      {activeTab === "accounts" && (
        <div className="card">
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
            Carbon Budget Accounts
          </h2>
          <div className="space-y-4">
            {carbonAccounts.map((account) => {
              const config = accountTypeConfig[account.type];
              const Icon = config.icon;
              const utilizationPct = (account.usedAmount / account.totalAllocation) * 100;
              return (
                <div key={account.id} className="p-4 rounded-xl border border-[hsl(var(--border))]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${config.color}-100`}>
                        <Icon className={`h-5 w-5 text-${config.color}-600`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-[hsl(var(--foreground))]">{account.name}</h3>
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-${config.color}-100 text-${config.color}-700`}>
                            {config.label}
                          </span>
                        </div>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                          {account.commitmentPeriod} · Last updated: {new Date(account.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${account.status === "DEPLETED" ? "text-red-600" : "text-emerald-600"}`}>
                        {formatNumber(account.availableAmount)}
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">available tCO2e</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-2 rounded-full bg-[hsl(var(--secondary))] flex overflow-hidden">
                      <div
                        className="h-2 bg-emerald-500"
                        style={{ width: `${utilizationPct}%` }}
                      />
                      <div
                        className="h-2 bg-amber-400"
                        style={{ width: `${(account.reservedAmount / account.totalAllocation) * 100}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-2 text-xs">
                      <div>
                        <p className="text-[hsl(var(--muted-foreground))]">Total</p>
                        <p className="font-medium">{formatNumber(account.totalAllocation)}</p>
                      </div>
                      <div>
                        <p className="text-[hsl(var(--muted-foreground))]">Used</p>
                        <p className="font-medium text-emerald-600">{formatNumber(account.usedAmount)}</p>
                      </div>
                      <div>
                        <p className="text-[hsl(var(--muted-foreground))]">Reserved</p>
                        <p className="font-medium text-amber-600">{formatNumber(account.reservedAmount)}</p>
                      </div>
                      <div>
                        <p className="text-[hsl(var(--muted-foreground))]">Available</p>
                        <p className="font-medium text-[hsl(var(--foreground))]">{formatNumber(account.availableAmount)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <div className="card">
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
            Recent Carbon Budget Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {recentTransactions.map((txn) => {
                  const config = transactionTypeConfig[txn.type];
                  const Icon = config.icon;
                  return (
                    <tr key={txn.id} className="hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                      <td className="px-4 py-4 text-sm text-[hsl(var(--foreground))]">
                        {new Date(txn.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-${config.color}-100 text-${config.color}-700`}>
                          <Icon className="h-3 w-3" />
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-[hsl(var(--foreground))]">{txn.description}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                          {txn.fromAccount} → {txn.toAccount}
                        </p>
                      </td>
                      <td className={`px-4 py-4 text-right text-sm font-medium ${txn.quantity > 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {txn.quantity > 0 ? "+" : ""}{formatNumber(txn.quantity)} tCO2e
                      </td>
                      <td className="px-4 py-4 text-sm text-[hsl(var(--muted-foreground))]">
                        {txn.reference}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Corresponding Adjustments Tab */}
      {activeTab === "adjustments" && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                  Corresponding Adjustments
                </h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Track how ITMO transfers affect the national carbon budget
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  Applied at first transfer per Article 6.2
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {correspondingAdjustments.map((ca) => (
                <div
                  key={ca.id}
                  className={`p-4 rounded-xl border ${
                    ca.status === "APPLIED" ? "border-emerald-200 bg-emerald-50/50" :
                    ca.status === "PENDING" ? "border-amber-200 bg-amber-50/50" :
                    "border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.3)]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[hsl(var(--foreground))]">{ca.loaNumber}</span>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          ca.status === "APPLIED" ? "bg-emerald-100 text-emerald-700" :
                          ca.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                          "bg-slate-100 text-slate-700"
                        }`}>
                          {ca.status === "APPLIED" ? "Applied" : ca.status === "PENDING" ? "Pending" : "Preview"}
                        </span>
                      </div>
                      <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                        Transfer to {ca.acquiringCountry}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-red-600">-{formatNumber(ca.transferQuantity)}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">tCO2e adjustment</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-4">
                    <div className="p-3 rounded-lg bg-white/70">
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Pre-Adjustment Budget</p>
                      <p className="text-lg font-bold text-[hsl(var(--foreground))]">{formatNumber(ca.preAdjustmentBudget)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/70">
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Post-Adjustment Budget</p>
                      <p className="text-lg font-bold text-[hsl(var(--foreground))]">{formatNumber(ca.postAdjustmentBudget)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/70">
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">NDC Progress Impact</p>
                      <p className="text-lg font-bold text-red-600">{ca.impactOnNDC.toFixed(3)}%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/70">
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Adjustment Date</p>
                      <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                        {ca.adjustmentDate ? new Date(ca.adjustmentDate).toLocaleDateString() : "Pending"}
                      </p>
                    </div>
                  </div>

                  {ca.status === "PENDING" && (
                    <div className="mt-4 flex items-center justify-end gap-3">
                      <button className="text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                        View LoA
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors">
                        <CheckCircle className="h-4 w-4" />
                        Apply Adjustment
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
