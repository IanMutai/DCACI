"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  Search,
  Filter,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";

type TransactionType = "DISBURSEMENT" | "COMMITMENT" | "REFUND" | "REALLOCATION" | "INTEREST_PAYMENT";
type TransactionStatus = "PENDING" | "APPROVED" | "COMPLETED" | "REJECTED" | "CANCELLED";

interface FinanceTransaction {
  id: string;
  sourceId: string;
  sourceName: string;
  type: TransactionType;
  amount: number;
  currency: string;
  purpose: string;
  sector: string;
  projectId?: string;
  projectName?: string;
  countyCode?: string;
  countyName?: string;
  transactionDate: string;
  fiscalYear: number;
  quarter?: number;
  reference?: string;
  status: TransactionStatus;
  recordedBy: string;
  approvedBy?: string;
  approvedAt?: string;
}

const mockTransactions: FinanceTransaction[] = [
  {
    id: "TXN-2024-001",
    sourceId: "1",
    sourceName: "Green Climate Fund",
    type: "DISBURSEMENT",
    amount: 250000000,
    currency: "KES",
    purpose: "Wind Farm Equipment Procurement",
    sector: "Energy",
    projectId: "PRJ-MRB-001",
    projectName: "Marsabit Wind Farm Phase II",
    countyCode: "KE-010",
    countyName: "Marsabit",
    transactionDate: "2024-01-15",
    fiscalYear: 2024,
    quarter: 3,
    reference: "GCF/KE/2024/D001",
    status: "COMPLETED",
    recordedBy: "John Doe",
    approvedBy: "Jane Smith",
    approvedAt: "2024-01-14",
  },
  {
    id: "TXN-2024-002",
    sourceId: "4",
    sourceName: "National Climate Fund",
    type: "COMMITMENT",
    amount: 450000000,
    currency: "KES",
    purpose: "Smart Agriculture Implementation",
    sector: "Agriculture",
    projectId: "PRJ-KTI-002",
    projectName: "Kitui Smart Agriculture",
    countyCode: "KE-015",
    countyName: "Kitui",
    transactionDate: "2024-01-14",
    fiscalYear: 2024,
    quarter: 3,
    reference: "NCF/2024/C045",
    status: "APPROVED",
    recordedBy: "Peter Ochieng",
    approvedBy: "Mary Wanjiku",
    approvedAt: "2024-01-13",
  },
  {
    id: "TXN-2024-003",
    sourceId: "2",
    sourceName: "World Bank - Climate",
    type: "DISBURSEMENT",
    amount: 180000000,
    currency: "KES",
    purpose: "E-Mobility Infrastructure",
    sector: "Transport",
    projectId: "PRJ-NRB-003",
    projectName: "Nairobi E-Mobility",
    countyCode: "KE-030",
    countyName: "Nairobi",
    transactionDate: "2024-01-13",
    fiscalYear: 2024,
    quarter: 3,
    reference: "WB/KE/2024/D012",
    status: "COMPLETED",
    recordedBy: "Alice Chen",
  },
  {
    id: "TXN-2024-004",
    sourceId: "5",
    sourceName: "Carbon Revenue Pool",
    type: "REALLOCATION",
    amount: 75000000,
    currency: "KES",
    purpose: "Forest Conservation Extension",
    sector: "Forestry",
    projectId: "PRJ-KKM-004",
    projectName: "Kakamega Forest Protection",
    countyCode: "KE-037",
    countyName: "Kakamega",
    transactionDate: "2024-01-12",
    fiscalYear: 2024,
    quarter: 3,
    reference: "CRP/2024/R003",
    status: "PENDING",
    recordedBy: "Bob Wilson",
  },
  {
    id: "TXN-2024-005",
    sourceId: "3",
    sourceName: "Germany (KfW)",
    type: "DISBURSEMENT",
    amount: 320000000,
    currency: "KES",
    purpose: "Geothermal Exploration",
    sector: "Energy",
    countyCode: "KE-028",
    countyName: "Nakuru",
    transactionDate: "2024-01-10",
    fiscalYear: 2024,
    quarter: 3,
    reference: "KFW/KE/2024/D008",
    status: "COMPLETED",
    recordedBy: "Grace Muthoni",
    approvedBy: "Klaus Schmidt",
    approvedAt: "2024-01-09",
  },
  {
    id: "TXN-2024-006",
    sourceId: "6",
    sourceName: "Adaptation Fund",
    type: "DISBURSEMENT",
    amount: 95000000,
    currency: "KES",
    purpose: "Drought Resilience Program",
    sector: "Agriculture",
    countyCode: "KE-009",
    countyName: "Turkana",
    transactionDate: "2024-01-08",
    fiscalYear: 2024,
    quarter: 3,
    reference: "AF/KE/2024/D002",
    status: "APPROVED",
    recordedBy: "David Kibet",
  },
  {
    id: "TXN-2024-007",
    sourceId: "4",
    sourceName: "National Climate Fund",
    type: "REFUND",
    amount: 25000000,
    currency: "KES",
    purpose: "Unutilized Project Funds Return",
    sector: "Waste",
    transactionDate: "2024-01-05",
    fiscalYear: 2024,
    quarter: 3,
    reference: "NCF/2024/R001",
    status: "COMPLETED",
    recordedBy: "Peter Ochieng",
  },
  {
    id: "TXN-2024-008",
    sourceId: "7",
    sourceName: "Japan JICA",
    type: "COMMITMENT",
    amount: 550000000,
    currency: "KES",
    purpose: "Coastal Mangrove Restoration",
    sector: "Forestry",
    countyCode: "KE-001",
    countyName: "Mombasa",
    transactionDate: "2024-01-03",
    fiscalYear: 2024,
    quarter: 3,
    reference: "JICA/KE/2024/C003",
    status: "PENDING",
    recordedBy: "Yuki Tanaka",
  },
];

const typeConfig: Record<TransactionType, { icon: typeof ArrowDownLeft; color: string; label: string }> = {
  DISBURSEMENT: { icon: ArrowDownLeft, color: "emerald", label: "Disbursement" },
  COMMITMENT: { icon: Clock, color: "blue", label: "Commitment" },
  REFUND: { icon: ArrowUpRight, color: "amber", label: "Refund" },
  REALLOCATION: { icon: RefreshCw, color: "violet", label: "Reallocation" },
  INTEREST_PAYMENT: { icon: ArrowUpRight, color: "slate", label: "Interest" },
};

const statusConfig: Record<TransactionStatus, { icon: typeof CheckCircle; bg: string; text: string }> = {
  COMPLETED: { icon: CheckCircle, bg: "bg-emerald-100", text: "text-emerald-700" },
  APPROVED: { icon: CheckCircle, bg: "bg-blue-100", text: "text-blue-700" },
  PENDING: { icon: Clock, bg: "bg-amber-100", text: "text-amber-700" },
  REJECTED: { icon: XCircle, bg: "bg-red-100", text: "text-red-700" },
  CANCELLED: { icon: AlertCircle, bg: "bg-slate-100", text: "text-slate-700" },
};

function formatCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return `KES ${(amount / 1000000000).toFixed(2)}B`;
  }
  if (amount >= 1000000) {
    return `KES ${(amount / 1000000).toFixed(0)}M`;
  }
  return `KES ${amount.toLocaleString()}`;
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "ALL">("ALL");
  const [sectorFilter, setSectorFilter] = useState<string>("ALL");

  const sectors = [...new Set(mockTransactions.map((t) => t.sector))];

  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesSearch =
      txn.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.sourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (txn.projectName && txn.projectName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === "ALL" || txn.type === typeFilter;
    const matchesStatus = statusFilter === "ALL" || txn.status === statusFilter;
    const matchesSector = sectorFilter === "ALL" || txn.sector === sectorFilter;
    return matchesSearch && matchesType && matchesStatus && matchesSector;
  });

  const totalAmount = filteredTransactions.reduce((sum, t) => {
    if (t.type === "REFUND") return sum - t.amount;
    return sum + t.amount;
  }, 0);

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
            <span>Transactions</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            Finance Transactions
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Track disbursements, commitments, and reallocations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors">
            <ArrowDownLeft className="h-4 w-4" />
            Record Transaction
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Showing {filteredTransactions.length} transactions
            </p>
            <p className="text-2xl font-bold text-[hsl(var(--foreground))]">
              {formatCurrency(totalAmount)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {Object.entries(typeConfig).map(([type, config]) => {
              const count = filteredTransactions.filter((t) => t.type === type).length;
              if (count === 0) return null;
              const Icon = config.icon;
              return (
                <div key={type} className="flex items-center gap-2">
                  <div className={`flex h-6 w-6 items-center justify-center rounded bg-${config.color}-100`}>
                    <Icon className={`h-3 w-3 text-${config.color}-600`} />
                  </div>
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">
                    {count} {config.label}s
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TransactionType | "ALL")}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="ALL">All Types</option>
            {Object.entries(typeConfig).map(([type, config]) => (
              <option key={type} value={type}>
                {config.label}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | "ALL")}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="COMPLETED">Completed</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="ALL">All Sectors</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Sector / Location
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {filteredTransactions.map((txn) => {
                const typeConf = typeConfig[txn.type];
                const statusConf = statusConfig[txn.status];
                const TypeIcon = typeConf.icon;
                const StatusIcon = statusConf.icon;

                return (
                  <tr key={txn.id} className="hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-[hsl(var(--foreground))]">{txn.purpose}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                          {txn.id} {txn.reference && `· ${txn.reference}`}
                        </p>
                        {txn.projectName && (
                          <p className="text-xs text-[hsl(var(--primary))] mt-0.5">
                            {txn.projectName}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-${typeConf.color}-100 text-${typeConf.color}-700`}>
                        <TypeIcon className="h-3 w-3" />
                        {typeConf.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-[hsl(var(--foreground))]">{txn.sourceName}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <span className="text-sm text-[hsl(var(--foreground))]">{txn.sector}</span>
                        {txn.countyName && (
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">{txn.countyName}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`font-medium ${txn.type === "REFUND" ? "text-red-600" : "text-[hsl(var(--foreground))]"}`}>
                        {txn.type === "REFUND" ? "-" : ""}{formatCurrency(txn.amount)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusConf.bg} ${statusConf.text}`}>
                        <StatusIcon className="h-3 w-3" />
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))]">
                        <Calendar className="h-3 w-3" />
                        {new Date(txn.transactionDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
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
