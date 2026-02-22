"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Upload,
  FileSpreadsheet,
  Database,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Calendar,
  Building2,
  Factory,
  Truck,
  Leaf,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

type DataStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
type Sector = "ENERGY" | "TRANSPORT" | "IPPU" | "AGRICULTURE" | "LULUCF" | "WASTE";

interface ActivityData {
  id: string;
  title: string;
  sector: Sector;
  category: string;
  source: string;
  year: number;
  value: number;
  unit: string;
  emissionFactor: number;
  emissions: number;
  status: DataStatus;
  submittedBy?: string;
  submittedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

const mockData: ActivityData[] = [
  {
    id: "AD-2024-001",
    title: "Grid Electricity Consumption",
    sector: "ENERGY",
    category: "1.A.1 - Energy Industries",
    source: "Kenya Power Annual Report",
    year: 2023,
    value: 11500,
    unit: "GWh",
    emissionFactor: 0.32,
    emissions: 3680000,
    status: "APPROVED",
    submittedBy: "John Kimani",
    submittedAt: "2024-01-05",
    reviewedBy: "Mary Wanjiku",
    reviewedAt: "2024-01-08",
  },
  {
    id: "AD-2024-002",
    title: "Diesel Fuel Sales",
    sector: "TRANSPORT",
    category: "1.A.3 - Transport",
    source: "EPRA Petroleum Statistics",
    year: 2023,
    value: 2850000,
    unit: "m³",
    emissionFactor: 2.68,
    emissions: 7638000,
    status: "APPROVED",
    submittedBy: "Peter Ochieng",
    submittedAt: "2024-01-06",
    reviewedBy: "Mary Wanjiku",
    reviewedAt: "2024-01-09",
  },
  {
    id: "AD-2024-003",
    title: "Cement Production",
    sector: "IPPU",
    category: "2.A.1 - Cement Production",
    source: "Kenya Bureau of Statistics",
    year: 2023,
    value: 8200000,
    unit: "tonnes",
    emissionFactor: 0.52,
    emissions: 4264000,
    status: "UNDER_REVIEW",
    submittedBy: "Alice Chen",
    submittedAt: "2024-01-10",
  },
  {
    id: "AD-2024-004",
    title: "Livestock Population - Cattle",
    sector: "AGRICULTURE",
    category: "3.A.1 - Enteric Fermentation",
    source: "Kenya Livestock Census",
    year: 2023,
    value: 18500000,
    unit: "head",
    emissionFactor: 0.056,
    emissions: 1036000,
    status: "SUBMITTED",
    submittedBy: "Grace Muthoni",
    submittedAt: "2024-01-12",
  },
  {
    id: "AD-2024-005",
    title: "Forest Area Change",
    sector: "LULUCF",
    category: "4.A - Forest Land",
    source: "Kenya Forest Service",
    year: 2023,
    value: -45000,
    unit: "hectares",
    emissionFactor: 150,
    emissions: -6750000,
    status: "DRAFT",
  },
  {
    id: "AD-2024-006",
    title: "Municipal Solid Waste",
    sector: "WASTE",
    category: "5.A - Solid Waste Disposal",
    source: "County Governments Report",
    year: 2023,
    value: 12500000,
    unit: "tonnes",
    emissionFactor: 0.28,
    emissions: 3500000,
    status: "SUBMITTED",
    submittedBy: "David Kibet",
    submittedAt: "2024-01-11",
  },
];

const sectorConfig: Record<Sector, { icon: typeof Factory; color: string; label: string }> = {
  ENERGY: { icon: Factory, color: "amber", label: "Energy" },
  TRANSPORT: { icon: Truck, color: "blue", label: "Transport" },
  IPPU: { icon: Building2, color: "slate", label: "IPPU" },
  AGRICULTURE: { icon: Leaf, color: "emerald", label: "Agriculture" },
  LULUCF: { icon: Leaf, color: "green", label: "LULUCF" },
  WASTE: { icon: Trash2, color: "violet", label: "Waste" },
};

const statusConfig: Record<DataStatus, { icon: typeof CheckCircle; bg: string; text: string; label: string }> = {
  DRAFT: { icon: Clock, bg: "bg-slate-100", text: "text-slate-700", label: "Draft" },
  SUBMITTED: { icon: Clock, bg: "bg-amber-100", text: "text-amber-700", label: "Submitted" },
  UNDER_REVIEW: { icon: AlertTriangle, bg: "bg-blue-100", text: "text-blue-700", label: "Under Review" },
  APPROVED: { icon: CheckCircle, bg: "bg-emerald-100", text: "text-emerald-700", label: "Approved" },
  REJECTED: { icon: AlertTriangle, bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
};

function formatNumber(num: number): string {
  if (Math.abs(num) >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (Math.abs(num) >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
}

export default function MrvDataPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState<Sector | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<DataStatus | "ALL">("ALL");
  const [yearFilter, setYearFilter] = useState<number>(2023);

  const filteredData = mockData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = sectorFilter === "ALL" || item.sector === sectorFilter;
    const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
    const matchesYear = item.year === yearFilter;
    return matchesSearch && matchesSector && matchesStatus && matchesYear;
  });

  const totalEmissions = filteredData.reduce((sum, item) => sum + item.emissions, 0);

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
            <span>Data Collection</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Activity Data Collection
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Submit and manage GHG inventory activity data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Upload className="h-4 w-4" />
            Import Data
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors">
            <Plus className="h-4 w-4" />
            Add Activity Data
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Database className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Records</p>
              <p className="text-xl font-bold text-[hsl(var(--foreground))]">{filteredData.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Approved</p>
              <p className="text-xl font-bold text-emerald-600">
                {filteredData.filter((d) => d.status === "APPROVED").length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Pending Review</p>
              <p className="text-xl font-bold text-amber-600">
                {filteredData.filter((d) => ["SUBMITTED", "UNDER_REVIEW"].includes(d.status)).length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <Factory className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Emissions</p>
              <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                {formatNumber(totalEmissions)} tCO2e
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
            placeholder="Search activity data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(parseInt(e.target.value))}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value as Sector | "ALL")}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="ALL">All Sectors</option>
            {Object.entries(sectorConfig).map(([sector, config]) => (
              <option key={sector} value={sector}>
                {config.label}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DataStatus | "ALL")}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            {Object.entries(statusConfig).map(([status, config]) => (
              <option key={status} value={status}>
                {config.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Value
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Emissions
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {filteredData.map((item) => {
                const sectorConf = sectorConfig[item.sector];
                const statusConf = statusConfig[item.status];
                const SectorIcon = sectorConf.icon;
                const StatusIcon = statusConf.icon;

                return (
                  <tr key={item.id} className="hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-[hsl(var(--foreground))]">{item.title}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                          {item.category}
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                          Source: {item.source}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-${sectorConf.color}-100 text-${sectorConf.color}-700`}>
                        <SectorIcon className="h-3 w-3" />
                        {sectorConf.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-medium text-[hsl(var(--foreground))]">
                        {formatNumber(item.value)}
                      </span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))] ml-1">
                        {item.unit}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`font-medium ${item.emissions < 0 ? "text-emerald-600" : "text-[hsl(var(--foreground))]"}`}>
                        {item.emissions < 0 ? "" : ""}{formatNumber(item.emissions)}
                      </span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))] ml-1">tCO2e</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusConf.bg} ${statusConf.text}`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConf.label}
                      </span>
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
