"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Globe,
  Landmark,
  Leaf,
  Banknote,
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  MoreHorizontal,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";

type FinanceSourceType =
  | "BILATERAL"
  | "MULTILATERAL"
  | "GREEN_CLIMATE_FUND"
  | "ADAPTATION_FUND"
  | "GLOBAL_ENVIRONMENT_FACILITY"
  | "NATIONAL_BUDGET"
  | "PRIVATE_SECTOR"
  | "CARBON_REVENUE"
  | "OTHER";

interface FinanceSource {
  id: string;
  name: string;
  type: FinanceSourceType;
  organization: string;
  totalCommitted: number;
  totalDisbursed: number;
  totalAvailable: number;
  currency: string;
  grantPercentage?: number;
  agreementDate?: string;
  expiryDate?: string;
  isActive: boolean;
  contactPerson?: string;
  contactEmail?: string;
}

const mockSources: FinanceSource[] = [
  {
    id: "1",
    name: "Green Climate Fund - Kenya",
    type: "GREEN_CLIMATE_FUND",
    organization: "Green Climate Fund",
    totalCommitted: 12500000000,
    totalDisbursed: 8750000000,
    totalAvailable: 3750000000,
    currency: "KES",
    grantPercentage: 100,
    agreementDate: "2021-03-15",
    expiryDate: "2028-03-14",
    isActive: true,
    contactPerson: "John Kimani",
    contactEmail: "jkimani@gcf.ke",
  },
  {
    id: "2",
    name: "World Bank Climate Action",
    type: "MULTILATERAL",
    organization: "World Bank",
    totalCommitted: 8200000000,
    totalDisbursed: 6150000000,
    totalAvailable: 2050000000,
    currency: "KES",
    grantPercentage: 50,
    agreementDate: "2020-06-01",
    expiryDate: "2027-05-31",
    isActive: true,
    contactPerson: "Mary Wanjiku",
    contactEmail: "mwanjiku@worldbank.org",
  },
  {
    id: "3",
    name: "Germany (KfW) Bilateral",
    type: "BILATERAL",
    organization: "KfW Development Bank",
    totalCommitted: 4500000000,
    totalDisbursed: 3200000000,
    totalAvailable: 1300000000,
    currency: "KES",
    grantPercentage: 75,
    agreementDate: "2022-01-10",
    expiryDate: "2029-01-09",
    isActive: true,
    contactPerson: "Klaus Schmidt",
    contactEmail: "k.schmidt@kfw.de",
  },
  {
    id: "4",
    name: "National Climate Fund",
    type: "NATIONAL_BUDGET",
    organization: "National Treasury",
    totalCommitted: 15000000000,
    totalDisbursed: 9500000000,
    totalAvailable: 5500000000,
    currency: "KES",
    agreementDate: "2023-07-01",
    expiryDate: "2026-06-30",
    isActive: true,
    contactPerson: "Peter Ochieng",
    contactEmail: "pochieng@treasury.go.ke",
  },
  {
    id: "5",
    name: "Carbon Revenue Pool",
    type: "CARBON_REVENUE",
    organization: "Kenya Carbon Registry",
    totalCommitted: 5600000000,
    totalDisbursed: 4500000000,
    totalAvailable: 1100000000,
    currency: "KES",
    agreementDate: "2023-01-01",
    isActive: true,
  },
  {
    id: "6",
    name: "Adaptation Fund - Kenya",
    type: "ADAPTATION_FUND",
    organization: "Adaptation Fund",
    totalCommitted: 2800000000,
    totalDisbursed: 1400000000,
    totalAvailable: 1400000000,
    currency: "KES",
    grantPercentage: 100,
    agreementDate: "2022-09-01",
    expiryDate: "2027-08-31",
    isActive: true,
  },
  {
    id: "7",
    name: "Japan JICA Climate",
    type: "BILATERAL",
    organization: "JICA",
    totalCommitted: 3200000000,
    totalDisbursed: 2100000000,
    totalAvailable: 1100000000,
    currency: "KES",
    grantPercentage: 30,
    agreementDate: "2021-11-15",
    expiryDate: "2026-11-14",
    isActive: true,
  },
  {
    id: "8",
    name: "Private Climate Investment",
    type: "PRIVATE_SECTOR",
    organization: "Kenya Climate Ventures",
    totalCommitted: 1500000000,
    totalDisbursed: 800000000,
    totalAvailable: 700000000,
    currency: "KES",
    agreementDate: "2023-04-01",
    isActive: true,
  },
];

const typeConfig: Record<FinanceSourceType, { icon: typeof Globe; color: string; label: string }> = {
  BILATERAL: { icon: Building2, color: "amber", label: "Bilateral" },
  MULTILATERAL: { icon: Globe, color: "blue", label: "Multilateral" },
  GREEN_CLIMATE_FUND: { icon: Leaf, color: "emerald", label: "GCF" },
  ADAPTATION_FUND: { icon: Leaf, color: "teal", label: "Adaptation Fund" },
  GLOBAL_ENVIRONMENT_FACILITY: { icon: Globe, color: "green", label: "GEF" },
  NATIONAL_BUDGET: { icon: Landmark, color: "violet", label: "National Budget" },
  PRIVATE_SECTOR: { icon: Building2, color: "slate", label: "Private Sector" },
  CARBON_REVENUE: { icon: Banknote, color: "cyan", label: "Carbon Revenue" },
  OTHER: { icon: DollarSign, color: "gray", label: "Other" },
};

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

export default function SourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<FinanceSourceType | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<"name" | "committed" | "disbursed">("committed");

  const filteredSources = mockSources
    .filter((source) => {
      const matchesSearch =
        source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.organization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "ALL" || source.type === typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "committed") return b.totalCommitted - a.totalCommitted;
      return b.totalDisbursed - a.totalDisbursed;
    });

  const totalCommitted = filteredSources.reduce((sum, s) => sum + s.totalCommitted, 0);
  const totalDisbursed = filteredSources.reduce((sum, s) => sum + s.totalDisbursed, 0);
  const totalAvailable = filteredSources.reduce((sum, s) => sum + s.totalAvailable, 0);

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/finance" className="hover:text-[hsl(var(--primary))]">
              Finance
            </Link>
            <span>/</span>
            <span>Sources</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Finance Sources
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Manage bilateral, multilateral, and domestic funding channels
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors">
          <Plus className="h-4 w-4" />
          Add Source
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Committed</p>
              <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                {formatCurrency(totalCommitted, true)}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Disbursed</p>
              <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                {formatCurrency(totalDisbursed, true)}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
              <Banknote className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Available Balance</p>
              <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                {formatCurrency(totalAvailable, true)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as FinanceSourceType | "ALL")}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="ALL">All Types</option>
            {Object.entries(typeConfig).map(([type, config]) => (
              <option key={type} value={type}>
                {config.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="committed">Sort by Committed</option>
            <option value="disbursed">Sort by Disbursed</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Sources List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Committed
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Disbursed
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Expiry
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {filteredSources.map((source) => {
                const config = typeConfig[source.type];
                const Icon = config.icon;
                const disbursementPercent = (source.totalDisbursed / source.totalCommitted) * 100;

                return (
                  <tr key={source.id} className="hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-${config.color}-100`}>
                          <Icon className={`h-4 w-4 text-${config.color}-600`} />
                        </div>
                        <div>
                          <p className="font-medium text-[hsl(var(--foreground))]">{source.name}</p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">{source.organization}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-${config.color}-100 text-${config.color}-700`}>
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-medium text-[hsl(var(--foreground))]">
                        {formatCurrency(source.totalCommitted, true)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-[hsl(var(--foreground))]">
                        {formatCurrency(source.totalDisbursed, true)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="w-24">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-[hsl(var(--muted-foreground))]">
                            {disbursementPercent.toFixed(0)}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[hsl(var(--secondary))]">
                          <div
                            className={`h-1.5 rounded-full bg-${config.color}-500`}
                            style={{ width: `${disbursementPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {source.expiryDate ? (
                        <div className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))]">
                          <Calendar className="h-3 w-3" />
                          {new Date(source.expiryDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      ) : (
                        <span className="text-sm text-[hsl(var(--muted-foreground))]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button className="rounded-lg p-2 hover:bg-[hsl(var(--secondary))] transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
