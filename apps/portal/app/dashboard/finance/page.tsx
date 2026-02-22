"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Banknote,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Building2,
  Globe,
  Landmark,
  Leaf,
  PieChart,
  FileCheck,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const summaryStats = [
  {
    title: "Total Climate Finance",
    value: "KES 45.8B",
    change: "+12.3%",
    changeType: "increase",
    icon: Banknote,
    description: "FY 2024/25",
  },
  {
    title: "Disbursed",
    value: "KES 32.1B",
    change: "+8.7%",
    changeType: "increase",
    icon: TrendingUp,
    description: "70% of committed",
  },
  {
    title: "Active Sources",
    value: "24",
    change: "+3",
    changeType: "increase",
    icon: Building2,
    description: "Bilateral & multilateral",
  },
  {
    title: "Pending LoAs",
    value: "7",
    change: "-2",
    changeType: "decrease",
    icon: FileCheck,
    description: "Awaiting approval",
  },
];

const financeSources = [
  {
    name: "Green Climate Fund",
    type: "MULTILATERAL",
    committed: 12500000000,
    disbursed: 8750000000,
    currency: "KES",
    status: "Active",
    color: "emerald",
  },
  {
    name: "World Bank - Climate",
    type: "MULTILATERAL",
    committed: 8200000000,
    disbursed: 6150000000,
    currency: "KES",
    status: "Active",
    color: "blue",
  },
  {
    name: "Germany (KfW)",
    type: "BILATERAL",
    committed: 4500000000,
    disbursed: 3200000000,
    currency: "KES",
    status: "Active",
    color: "amber",
  },
  {
    name: "National Climate Fund",
    type: "NATIONAL_BUDGET",
    committed: 15000000000,
    disbursed: 9500000000,
    currency: "KES",
    status: "Active",
    color: "violet",
  },
  {
    name: "Carbon Revenue Pool",
    type: "CARBON_REVENUE",
    committed: 5600000000,
    disbursed: 4500000000,
    currency: "KES",
    status: "Active",
    color: "teal",
  },
];

const recentTransactions = [
  {
    id: "TXN-2024-001",
    source: "Green Climate Fund",
    type: "DISBURSEMENT",
    amount: 250000000,
    sector: "Energy",
    county: "Marsabit",
    date: "2024-01-15",
    status: "Completed",
  },
  {
    id: "TXN-2024-002",
    source: "National Climate Fund",
    type: "COMMITMENT",
    amount: 450000000,
    sector: "Agriculture",
    county: "Kitui",
    date: "2024-01-14",
    status: "Approved",
  },
  {
    id: "TXN-2024-003",
    source: "World Bank - Climate",
    type: "DISBURSEMENT",
    amount: 180000000,
    sector: "Transport",
    county: "Nairobi",
    date: "2024-01-13",
    status: "Completed",
  },
  {
    id: "TXN-2024-004",
    source: "Carbon Revenue Pool",
    type: "REALLOCATION",
    amount: 75000000,
    sector: "Forestry",
    county: "Kakamega",
    date: "2024-01-12",
    status: "Pending",
  },
];

const pendingLoAs = [
  {
    loaNumber: "LOA-2024-MRB-001",
    project: "Marsabit Wind Farm Phase II",
    mechanism: "ARTICLE_6_2",
    quantity: 250000,
    acquiringCountry: "Switzerland",
    status: "PENDING_APPROVAL",
    submittedDate: "2024-01-10",
  },
  {
    loaNumber: "LOA-2024-KTI-002",
    project: "Kitui Smart Agriculture",
    mechanism: "ARTICLE_6_4",
    quantity: 85000,
    acquiringCountry: "Japan",
    status: "UNDER_REVIEW",
    submittedDate: "2024-01-08",
  },
  {
    loaNumber: "LOA-2024-NRB-003",
    project: "Nairobi E-Mobility",
    mechanism: "ARTICLE_6_2",
    quantity: 120000,
    acquiringCountry: "Singapore",
    status: "PENDING_REVIEW",
    submittedDate: "2024-01-05",
  },
];

const sectorAllocation = [
  { sector: "Energy", percentage: 35, amount: 16030000000, color: "emerald" },
  { sector: "Agriculture", percentage: 25, amount: 11450000000, color: "amber" },
  { sector: "Transport", percentage: 18, amount: 8244000000, color: "blue" },
  { sector: "Forestry", percentage: 12, amount: 5496000000, color: "green" },
  { sector: "Waste", percentage: 6, amount: 2748000000, color: "violet" },
  { sector: "Industry", percentage: 4, amount: 1832000000, color: "slate" },
];

function formatCurrency(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 1000000000) {
      return `KES ${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `KES ${(amount / 1000000).toFixed(0)}M`;
    }
    return `KES ${amount.toLocaleString()}`;
  }
  return `KES ${amount.toLocaleString()}`;
}

function getTypeIcon(type: string) {
  switch (type) {
    case "MULTILATERAL":
      return Globe;
    case "BILATERAL":
      return Building2;
    case "NATIONAL_BUDGET":
      return Landmark;
    case "CARBON_REVENUE":
      return Leaf;
    default:
      return Banknote;
  }
}

function getStatusBadge(status: string) {
  const statusConfig: Record<string, { bg: string; text: string; icon: typeof CheckCircle }> = {
    Completed: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle },
    Approved: { bg: "bg-blue-100", text: "text-blue-700", icon: CheckCircle },
    Pending: { bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
    PENDING_APPROVAL: { bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
    UNDER_REVIEW: { bg: "bg-blue-100", text: "text-blue-700", icon: AlertCircle },
    PENDING_REVIEW: { bg: "bg-slate-100", text: "text-slate-700", icon: Clock },
  };

  const config = statusConfig[status] || statusConfig.Pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon className="h-3 w-3" />
      {status.replace(/_/g, " ")}
    </span>
  );
}

export default function FinancePage() {
  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(174_40%_40%)]">
            <Banknote className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">
              Climate Finance
            </h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Track funding sources, transactions, and LoA approvals
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/finance/loa/create"
            className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors"
          >
            <FileCheck className="h-4 w-4" />
            New LoA Request
          </Link>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="card">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
                  <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium ${
                    stat.changeType === "increase"
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}
                >
                  {stat.changeType === "increase" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-[hsl(var(--foreground))]">
                  {stat.value}
                </p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {stat.title}
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground)/0.7)]">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Finance Sources */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                Finance Sources
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Active funding channels
              </p>
            </div>
            <Link
              href="/dashboard/finance/sources"
              className="text-sm font-medium text-[hsl(var(--primary))] hover:underline inline-flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {financeSources.map((source) => {
              const TypeIcon = getTypeIcon(source.type);
              const disbursementPercent = (source.disbursed / source.committed) * 100;

              return (
                <div
                  key={source.name}
                  className="flex items-center gap-4 rounded-xl border border-[hsl(var(--border))] p-4 hover:bg-[hsl(var(--secondary)/0.5)] transition-colors"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${source.color}-100`}>
                    <TypeIcon className={`h-5 w-5 text-${source.color}-600`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-[hsl(var(--foreground))] truncate">
                        {source.name}
                      </p>
                      <span className="text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--secondary))] px-2 py-0.5 rounded-full">
                        {source.type.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-[hsl(var(--muted-foreground))]">
                            {formatCurrency(source.disbursed, true)} / {formatCurrency(source.committed, true)}
                          </span>
                          <span className="font-medium text-[hsl(var(--foreground))]">
                            {disbursementPercent.toFixed(0)}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[hsl(var(--secondary))]">
                          <div
                            className={`h-1.5 rounded-full bg-${source.color}-500`}
                            style={{ width: `${disbursementPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                Sector Allocation
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                FY 2024/25
              </p>
            </div>
            <PieChart className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
          </div>
          <div className="space-y-3">
            {sectorAllocation.map((item) => (
              <div key={item.sector} className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full bg-${item.color}-500`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                      {item.sector}
                    </span>
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-[hsl(var(--secondary))]">
                    <div
                      className={`h-1.5 rounded-full bg-${item.color}-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Total Allocated: <span className="font-medium text-[hsl(var(--foreground))]">KES 45.8B</span>
            </p>
          </div>
        </div>
      </div>

      {/* Transactions & LoA Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                Recent Transactions
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Latest finance movements
              </p>
            </div>
            <Link
              href="/dashboard/finance/transactions"
              className="text-sm font-medium text-[hsl(var(--primary))] hover:underline inline-flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] p-3 hover:bg-[hsl(var(--secondary)/0.5)] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                      {txn.source}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      txn.type === "DISBURSEMENT" ? "bg-emerald-100 text-emerald-700" :
                      txn.type === "COMMITMENT" ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {txn.type}
                    </span>
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                    {txn.sector} · {txn.county} · {txn.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                    {formatCurrency(txn.amount, true)}
                  </p>
                  {getStatusBadge(txn.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending LoAs */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                Pending LoA Requests
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Article 6 authorizations awaiting approval
              </p>
            </div>
            <Link
              href="/dashboard/finance/loa"
              className="text-sm font-medium text-[hsl(var(--primary))] hover:underline inline-flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {pendingLoAs.map((loa) => (
              <div
                key={loa.loaNumber}
                className="rounded-lg border border-[hsl(var(--border))] p-3 hover:bg-[hsl(var(--secondary)/0.5)] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
                    {loa.loaNumber}
                  </span>
                  {getStatusBadge(loa.status)}
                </div>
                <p className="text-sm font-medium text-[hsl(var(--foreground))] mt-1">
                  {loa.project}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <span className="inline-flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {loa.acquiringCountry}
                  </span>
                  <span>{loa.mechanism.replace(/_/g, " ")}</span>
                  <span className="font-medium text-[hsl(var(--foreground))]">
                    {loa.quantity.toLocaleString()} tCO2e
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
