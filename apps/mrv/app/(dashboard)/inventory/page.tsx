"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Pencil,
  BarChart3,
  TrendingUp,
  ListChecks,
  Archive,
} from "lucide-react";

/* ───────────────────────────────────────────
   Real Kenya GHG inventory data (BTR-1, 2024)
   Time series: 1990–2022 | Source: PRIMAP-hist v2.6 HISTCR
   2022: 94.9 MtCO2e excl. LULUCF | 2021: 82.3 MtCO2e
   ─────────────────────────────────────────── */

type InventoryStatus = "approved" | "under_review" | "data_entry" | "draft" | "calculations";

interface Inventory {
  year: number;
  country: string;
  status: InventoryStatus;
  totalEmissions: number;
  totalRemovals: number;
  netEmissions: number;
  completeness: number;
  sectors: number;
  lastUpdated: string;
}

const inventories: Inventory[] = [
  {
    year: 2022,
    country: "Kenya",
    status: "approved",
    totalEmissions: 94.9,
    totalRemovals: -7.57,
    netEmissions: 87.3,
    completeness: 100,
    sectors: 5,
    lastUpdated: "2024-12-01",
  },
  {
    year: 2021,
    country: "Kenya",
    status: "approved",
    totalEmissions: 82.3,
    totalRemovals: -7.2,
    netEmissions: 75.1,
    completeness: 100,
    sectors: 5,
    lastUpdated: "2024-11-15",
  },
  {
    year: 2020,
    country: "Kenya",
    status: "approved",
    totalEmissions: 78.6,
    totalRemovals: -6.9,
    netEmissions: 71.7,
    completeness: 100,
    sectors: 5,
    lastUpdated: "2024-10-20",
  },
  {
    year: 2019,
    country: "Kenya",
    status: "approved",
    totalEmissions: 76.2,
    totalRemovals: -6.8,
    netEmissions: 69.4,
    completeness: 100,
    sectors: 5,
    lastUpdated: "2024-09-10",
  },
  {
    year: 2018,
    country: "Kenya",
    status: "approved",
    totalEmissions: 73.5,
    totalRemovals: -6.5,
    netEmissions: 67.0,
    completeness: 100,
    sectors: 5,
    lastUpdated: "2024-08-05",
  },
  {
    year: 2015,
    country: "Kenya",
    status: "approved",
    totalEmissions: 65.8,
    totalRemovals: -6.1,
    netEmissions: 59.7,
    completeness: 100,
    sectors: 5,
    lastUpdated: "2024-07-01",
  },
  {
    year: 2010,
    country: "Kenya",
    status: "approved",
    totalEmissions: 52.4,
    totalRemovals: -5.5,
    netEmissions: 46.9,
    completeness: 100,
    sectors: 5,
    lastUpdated: "2024-06-15",
  },
  {
    year: 2000,
    country: "Kenya",
    status: "approved",
    totalEmissions: 38.7,
    totalRemovals: -4.8,
    netEmissions: 33.9,
    completeness: 100,
    sectors: 5,
    lastUpdated: "2024-05-20",
  },
  {
    year: 1990,
    country: "Kenya",
    status: "approved",
    totalEmissions: 27.3,
    totalRemovals: -4.2,
    netEmissions: 23.1,
    completeness: 100,
    sectors: 5,
    lastUpdated: "2024-04-10",
  },
];

const statusConfig: Record<
  InventoryStatus,
  { label: string; badge: string; icon: React.ReactNode }
> = {
  approved: {
    label: "Approved",
    badge: "badge-success badge-dot",
    icon: <CheckCircle2 size={14} />,
  },
  under_review: {
    label: "Under Review",
    badge: "badge-accent badge-dot",
    icon: <Clock size={14} />,
  },
  data_entry: {
    label: "Data Entry",
    badge: "badge-warning badge-dot",
    icon: <Pencil size={14} />,
  },
  draft: {
    label: "Draft",
    badge: "badge-neutral badge-dot",
    icon: <FileText size={14} />,
  },
  calculations: {
    label: "Calculations",
    badge: "badge-primary badge-dot",
    icon: <BarChart3 size={14} />,
  },
};

type SortKey = keyof Inventory;
type SortDir = "asc" | "desc";

export default function InventoryListPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<InventoryStatus | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("year");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filtered = useMemo(() => {
    let result = [...inventories];
    if (statusFilter !== "all") {
      result = result.filter((i) => i.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.year.toString().includes(q) ||
          i.country.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return result;
  }, [search, statusFilter, sortKey, sortDir]);

  /* Summary stats */
  const totalCount = inventories.length;
  const approvedCount = inventories.filter((i) => i.status === "approved").length;
  const reviewCount = inventories.filter((i) => i.status === "under_review").length;
  const draftCount = inventories.filter(
    (i) => i.status === "draft" || i.status === "data_entry"
  ).length;

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortDir === "asc" ? (
        <ChevronUp size={14} className="text-emerald-600" />
      ) : (
        <ChevronDown size={14} className="text-emerald-600" />
      )
    ) : (
      <ArrowUpDown size={12} className="text-gray-300" />
    );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventories</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage Kenya national GHG inventories across reporting years
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary btn-sm">
            <Download size={14} />
            <span>Export</span>
          </button>
          <Link href="/inventory/data-entry" className="btn-primary btn-sm">
            <Plus size={14} />
            <span>New Inventory</span>
          </Link>
        </div>
      </div>

      {/* Summary Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
        <div className="card-stat">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Archive size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
              <p className="text-xs text-gray-500">Total Inventories</p>
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{approvedCount}</p>
              <p className="text-xs text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{reviewCount}</p>
              <p className="text-xs text-gray-500">Under Review</p>
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <ListChecks size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{draftCount}</p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card-elevated animate-fade-up">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search inventories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as InventoryStatus | "all")
              }
              className="select-field py-2"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="under_review">Under Review</option>
              <option value="data_entry">Data Entry</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="table-container animate-fade-up">
        <table>
          <thead>
            <tr>
              <th>
                <button
                  onClick={() => toggleSort("year")}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Year <SortIcon col="year" />
                </button>
              </th>
              <th>Country</th>
              <th>Status</th>
              <th>
                <button
                  onClick={() => toggleSort("totalEmissions")}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Total Emissions <SortIcon col="totalEmissions" />
                </button>
              </th>
              <th>
                <button
                  onClick={() => toggleSort("netEmissions")}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Net Emissions <SortIcon col="netEmissions" />
                </button>
              </th>
              <th>
                <button
                  onClick={() => toggleSort("completeness")}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Completeness <SortIcon col="completeness" />
                </button>
              </th>
              <th>Sectors</th>
              <th>
                <button
                  onClick={() => toggleSort("lastUpdated")}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Last Updated <SortIcon col="lastUpdated" />
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv) => {
              const cfg = statusConfig[inv.status];
              return (
                <tr key={inv.year}>
                  <td>
                    <Link
                      href={`/inventory/${inv.year}`}
                      className="font-semibold text-gray-900 hover:text-emerald-600"
                    >
                      {inv.year}
                    </Link>
                  </td>
                  <td className="text-gray-700">{inv.country}</td>
                  <td>
                    <span className={cfg.badge}>{cfg.label}</span>
                  </td>
                  <td className="font-mono text-sm">
                    {inv.totalEmissions.toFixed(1)} MtCO2eq
                  </td>
                  <td className="font-mono text-sm">
                    {inv.netEmissions.toFixed(1)} MtCO2eq
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar w-20">
                        <div
                          className={`progress-bar-fill ${
                            inv.completeness === 100
                              ? "primary"
                              : inv.completeness >= 80
                              ? "accent"
                              : "warning"
                          }`}
                          style={
                            {
                              "--progress-width": `${inv.completeness}%`,
                            } as React.CSSProperties
                          }
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8">
                        {inv.completeness}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="badge-neutral">{inv.sectors}/5</span>
                  </td>
                  <td className="text-xs text-gray-500">{inv.lastUpdated}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/inventory/${inv.year}`}
                        className="btn-icon p-1.5"
                        title="View"
                      >
                        <Eye size={14} className="text-gray-500" />
                      </Link>
                      <Link
                        href="/inventory/data-entry"
                        className="btn-icon p-1.5"
                        title="Edit"
                      >
                        <Pencil size={14} className="text-gray-500" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-12 text-gray-400">
                  <AlertCircle size={24} className="mx-auto mb-2 opacity-50" />
                  No inventories match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
        <Link href="/inventory/data-entry" className="card-interactive">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Pencil size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Data Entry</h3>
              <p className="text-xs text-gray-500">
                Enter activity data and emission factors
              </p>
            </div>
          </div>
        </Link>
        <Link href="/inventory/calculations" className="card-interactive">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <TrendingUp size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Calculations</h3>
              <p className="text-xs text-gray-500">
                Run emission calculations and view results
              </p>
            </div>
          </div>
        </Link>
        <Link href="/inventory/review" className="card-interactive">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Review &amp; Approval</h3>
              <p className="text-xs text-gray-500">
                QA/QC checks and approval workflow
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
