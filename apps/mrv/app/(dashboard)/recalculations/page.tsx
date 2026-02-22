"use client";

import { useState } from "react";
import {
  RefreshCw,
  Plus,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Info,
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  Layers,
  BarChart3,
} from "lucide-react";

interface Recalculation {
  id: string;
  yearAffected: number;
  sector: string;
  category: string;
  categoryCode: string;
  reason: "methodology" | "data_update" | "error_correction" | "boundary_change";
  reasonDetail: string;
  originalValue: number;
  recalculatedValue: number;
  differencePct: number;
  status: "applied" | "pending_review" | "rejected";
  dateSubmitted: string;
  dateApplied: string | null;
  submittedBy: string;
  transparencyNote: string;
}

const recalculations: Recalculation[] = [
  {
    id: "RC-001", yearAffected: 2020, sector: "Energy", category: "Energy Industries", categoryCode: "1.A.1",
    reason: "methodology", reasonDetail: "Updated from Tier 1 IPCC default to Tier 2 country-specific emission factor for coal combustion based on Kenya-specific coal quality analysis.",
    originalValue: 38200, recalculatedValue: 40100, differencePct: 4.97,
    status: "applied", dateSubmitted: "2025-06-15", dateApplied: "2025-07-01", submittedBy: "J. Kamau",
    transparencyNote: "Recalculation applied consistently across the entire time series (2016-2022) to maintain temporal consistency per IPCC good practice."
  },
  {
    id: "RC-002", yearAffected: 2020, sector: "Energy", category: "Road Transport", categoryCode: "1.A.3",
    reason: "data_update", reasonDetail: "Revised fuel consumption data from updated national energy balance. EPRA corrected diesel import figures for 2020 after audit.",
    originalValue: 12800, recalculatedValue: 13400, differencePct: 4.69,
    status: "applied", dateSubmitted: "2025-05-20", dateApplied: "2025-06-10", submittedBy: "J. Kamau",
    transparencyNote: "Activity data revision based on corrected EPRA petroleum import statistics. Only affects 2020 data year."
  },
  {
    id: "RC-003", yearAffected: 2019, sector: "Agriculture", category: "Enteric Fermentation", categoryCode: "3.A",
    reason: "data_update", reasonDetail: "Corrected livestock population data following release of revised 2019 national livestock census. Previous estimates were based on projections.",
    originalValue: 10500, recalculatedValue: 11650, differencePct: 10.95,
    status: "applied", dateSubmitted: "2025-04-10", dateApplied: "2025-05-01", submittedBy: "M. Wanjiku",
    transparencyNote: "Livestock census revision impacts time series from 2019 onward. Interpolation applied for inter-censal years per IPCC guidance."
  },
  {
    id: "RC-004", yearAffected: 2021, sector: "IPPU", category: "Cement Production", categoryCode: "2.A.1",
    reason: "methodology", reasonDetail: "Updated clinker-to-cement ratio from 0.75 to 0.72 based on industry survey of all Kenyan cement producers. Revised clinker factor from KCPA.",
    originalValue: 7200, recalculatedValue: 6912, differencePct: -4.0,
    status: "pending_review", dateSubmitted: "2025-09-15", dateApplied: null, submittedBy: "P. Ochieng",
    transparencyNote: "Pending approval. If applied, recalculation to be applied to the full time series (2016-2022) for consistency."
  },
  {
    id: "RC-005", yearAffected: 2020, sector: "Waste", category: "Solid Waste Disposal", categoryCode: "5.A",
    reason: "data_update", reasonDetail: "Revised DOC (Degradable Organic Carbon) values based on 2024 national waste composition study conducted in 6 major urban centers.",
    originalValue: 1900, recalculatedValue: 2100, differencePct: 10.53,
    status: "pending_review", dateSubmitted: "2025-10-01", dateApplied: null, submittedBy: "S. Otieno",
    transparencyNote: "Pending review by sector lead. New waste composition data reflects improved sampling methodology."
  },
  {
    id: "RC-006", yearAffected: 2018, sector: "Energy", category: "Energy Industries", categoryCode: "1.A.1",
    reason: "error_correction", reasonDetail: "Corrected unit conversion error in geothermal energy data. Original calculation incorrectly applied conversion factor of 3.6 instead of 3.168 GJ/MWh.",
    originalValue: 35600, recalculatedValue: 34980, differencePct: -1.74,
    status: "applied", dateSubmitted: "2025-03-20", dateApplied: "2025-04-05", submittedBy: "J. Kamau",
    transparencyNote: "Error identified during QA/QC Tier 2 review. Corrected across full time series. Impact on total inventory: -0.7%."
  },
];

const reasonLabels: Record<string, { label: string; badge: string; description: string }> = {
  methodology: { label: "Methodology Change", badge: "badge-accent", description: "Change in calculation methodology or tier level (e.g., moving from Tier 1 to Tier 2)" },
  data_update: { label: "Data Revision", badge: "badge-warning", description: "Activity data revised by data providers (e.g., updated national statistics, census revisions)" },
  error_correction: { label: "Error Correction", badge: "badge-danger", description: "Correction of calculation errors, unit conversion mistakes, or data entry errors" },
  boundary_change: { label: "Boundary Change", badge: "badge-neutral", description: "Change in system boundary or category definitions (e.g., IPCC category reclassification)" },
};

export default function RecalculationsPage() {
  const [filterReason, setFilterReason] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = recalculations.filter((r) => {
    const matchesReason = filterReason === "all" || r.reason === filterReason;
    const matchesStatus = filterStatus === "all" || r.status === filterStatus;
    const matchesSearch = searchQuery === "" ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesReason && matchesStatus && matchesSearch;
  });

  const applied = recalculations.filter((r) => r.status === "applied").length;
  const pending = recalculations.filter((r) => r.status === "pending_review").length;
  const avgImpact = recalculations.reduce((sum, r) => sum + Math.abs(r.differencePct), 0) / recalculations.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <RefreshCw size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recalculations</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and document time series recalculations for transparency and IPCC compliance
            </p>
          </div>
        </div>
        <button className="btn-primary btn-sm">
          <Plus size={14} />
          <span>Log Recalculation</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 stagger-children">
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Recalculations</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{recalculations.length}</p>
              <p className="text-xs text-gray-400 mt-0.5">Across all years</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <RefreshCw size={20} />
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Applied</p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">{applied}</p>
              <p className="text-xs text-gray-400 mt-0.5">Successfully recalculated</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending Review</p>
              <p className="mt-1 text-2xl font-bold text-amber-600">{pending}</p>
              <p className="text-xs text-gray-400 mt-0.5">Awaiting approval</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Clock size={20} />
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Avg. Impact</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{avgImpact.toFixed(1)}%</p>
              <p className="text-xs text-gray-400 mt-0.5">Average absolute change</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <BarChart3 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 animate-fade-up">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search recalculations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select className="select-field w-auto" value={filterReason} onChange={(e) => setFilterReason(e.target.value)}>
          <option value="all">All Reasons</option>
          <option value="methodology">Methodology Change</option>
          <option value="data_update">Data Revision</option>
          <option value="error_correction">Error Correction</option>
          <option value="boundary_change">Boundary Change</option>
        </select>
        <select className="select-field w-auto" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="applied">Applied</option>
          <option value="pending_review">Pending Review</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Recalculation List */}
      <div className="space-y-3 animate-fade-up">
        {filtered.map((recalc) => (
          <div
            key={recalc.id}
            className={`card-elevated cursor-pointer transition-all ${expandedRow === recalc.id ? "ring-1 ring-emerald-200" : ""}`}
            onClick={() => setExpandedRow(expandedRow === recalc.id ? null : recalc.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 ${
                  recalc.status === "applied" ? "bg-emerald-100 text-emerald-600" :
                  recalc.status === "pending_review" ? "bg-amber-100 text-amber-600" :
                  "bg-red-100 text-red-600"
                }`}>
                  {recalc.status === "applied" ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {recalc.sector} - {recalc.category}
                    </h3>
                    <span className="badge-neutral font-mono">{recalc.categoryCode}</span>
                    <span className={reasonLabels[recalc.reason]!.badge}>
                      {reasonLabels[recalc.reason]!.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Year affected: {recalc.yearAffected} | Submitted: {recalc.dateSubmitted} by {recalc.submittedBy}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-xs text-gray-400 font-mono">{recalc.originalValue.toLocaleString()}</span>
                    <ChevronRight size={12} className="text-gray-300" />
                    <span className="text-sm font-semibold text-gray-900 font-mono">{recalc.recalculatedValue.toLocaleString()}</span>
                  </div>
                  <span className={`text-xs font-semibold ${recalc.differencePct > 0 ? "text-red-600" : "text-emerald-600"}`}>
                    {recalc.differencePct > 0 ? "+" : ""}{recalc.differencePct.toFixed(1)}%
                  </span>
                </div>
                <span className={`badge ${
                  recalc.status === "applied" ? "badge-success" :
                  recalc.status === "pending_review" ? "badge-warning" : "badge-danger"
                }`}>
                  {recalc.status === "pending_review" ? "Pending" : recalc.status.charAt(0).toUpperCase() + recalc.status.slice(1)}
                </span>
              </div>
            </div>

            {expandedRow === recalc.id && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Reason for Recalculation</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{recalc.reasonDetail}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FileText size={12} /> Transparency Note
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed bg-blue-50/50 rounded-lg p-3 border border-blue-100">
                      {recalc.transparencyNote}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-6 text-xs text-gray-500">
                  <span>ID: {recalc.id}</span>
                  {recalc.dateApplied && <span>Applied: {recalc.dateApplied}</span>}
                  <span>Gg CO2eq</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reason Categories Info */}
      <div className="card-elevated animate-fade-up">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Info size={16} className="text-blue-500" />
          Recalculation Reason Categories (per IPCC Good Practice)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(reasonLabels).map(([key, val]) => (
            <div key={key} className="rounded-lg bg-gray-50 p-3 flex items-start gap-3">
              <span className={val.badge}>{val.label}</span>
              <p className="text-xs text-gray-600 flex-1">{val.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3">
          <p className="text-xs text-emerald-800">
            <span className="font-semibold">IPCC Transparency Requirement:</span> All recalculations must be documented with
            clear explanations of the reasons, quantified impacts on emission estimates, and information on how temporal
            consistency is maintained across the time series. Reference: 2006 IPCC Guidelines, Volume 1, Chapter 5.
          </p>
        </div>
      </div>
    </div>
  );
}
