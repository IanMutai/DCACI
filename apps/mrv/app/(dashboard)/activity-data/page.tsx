"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Upload,
  Download,
  BarChart3,
  Database,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Eye,
  Edit3,
  Trash2,
  X,
  AlertTriangle,
  CircleDot,
} from "lucide-react";

interface ActivityDataEntry {
  id: string;
  source: string;
  sector: string;
  category: string;
  subcategory: string;
  value: number;
  unit: string;
  year: number;
  provider: string;
  status: "verified" | "pending" | "draft" | "rejected";
  quality: "high" | "medium" | "low";
  tier: "Tier 1" | "Tier 2" | "Tier 3";
  lastUpdated: string;
  notes: string;
}

const activityData: ActivityDataEntry[] = [
  { id: "AD-001", source: "National Energy Balance", sector: "Energy", category: "1.A.1", subcategory: "Electricity Generation - Fossil Fuels", value: 15200, unit: "TJ", year: 2022, provider: "EPRA", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2025-08-15", notes: "From national energy balance statistics. Cross-checked with Kenya Power generation data." },
  { id: "AD-002", source: "Petroleum Import Records", sector: "Energy", category: "1.A.3", subcategory: "Road Transport - Diesel", value: 8400, unit: "TJ", year: 2022, provider: "EPRA", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2025-07-22", notes: "Based on petroleum product imports and domestic production. Corrected for exports and stock changes." },
  { id: "AD-003", source: "Petroleum Import Records", sector: "Energy", category: "1.A.3", subcategory: "Road Transport - Gasoline", value: 6200, unit: "TJ", year: 2022, provider: "EPRA", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2025-07-22", notes: "Motor spirit (premium and regular gasoline) consumption from EPRA records." },
  { id: "AD-004", source: "Livestock Census", sector: "Agriculture", category: "3.A", subcategory: "Dairy Cattle Population", value: 3500000, unit: "heads", year: 2022, provider: "Ministry of Agriculture", status: "verified", quality: "medium", tier: "Tier 1", lastUpdated: "2025-06-10", notes: "From national livestock census. Uncertainty in smallholder dairy farms count." },
  { id: "AD-005", source: "Livestock Census", sector: "Agriculture", category: "3.A", subcategory: "Non-Dairy Cattle Population", value: 12000000, unit: "heads", year: 2022, provider: "Ministry of Agriculture", status: "pending", quality: "medium", tier: "Tier 1", lastUpdated: "2025-06-10", notes: "Estimated from livestock census and pastoral area surveys. Pastoral areas have higher uncertainty." },
  { id: "AD-006", source: "National Environment Agency", sector: "Waste", category: "5.A", subcategory: "Municipal Solid Waste Disposed", value: 4500, unit: "Gg", year: 2022, provider: "NEMA", status: "pending", quality: "low", tier: "Tier 1", lastUpdated: "2025-09-01", notes: "Estimated from urban population and per capita waste generation rates. Limited data from rural areas." },
  { id: "AD-007", source: "Cement Industry Reports", sector: "IPPU", category: "2.A.1", subcategory: "Clinker Production", value: 6350, unit: "kt", year: 2022, provider: "KCPA", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2025-05-18", notes: "Direct industry data from Kenya Cement Producers Association. Covers all 5 major producers." },
  { id: "AD-008", source: "Fertilizer Import Data", sector: "Agriculture", category: "3.D", subcategory: "Synthetic Nitrogen Fertilizer Applied", value: 185, unit: "kt N", year: 2022, provider: "KEPHIS", status: "draft", quality: "medium", tier: "Tier 1", lastUpdated: "2025-04-20", notes: "Based on fertilizer import records and domestic blending data. Some double-counting risk." },
  { id: "AD-009", source: "Forest Inventory", sector: "LULUCF", category: "4.A", subcategory: "Forest Land Area Change", value: -45, unit: "kha", year: 2022, provider: "KFS", status: "draft", quality: "low", tier: "Tier 1", lastUpdated: "2025-10-05", notes: "From remote sensing analysis. Deforestation in western and coastal regions. Reforestation efforts partially offset losses." },
  { id: "AD-010", source: "Agricultural Statistics", sector: "Agriculture", category: "3.C", subcategory: "Rice Cultivation Area - Irrigated", value: 31500, unit: "ha", year: 2022, provider: "NIB", status: "pending", quality: "medium", tier: "Tier 1", lastUpdated: "2025-07-15", notes: "Irrigated rice cultivation area from National Irrigation Board. Includes Mwea and other irrigation schemes." },
  { id: "AD-011", source: "Aviation Authority", sector: "Energy", category: "1.A.3", subcategory: "Domestic Aviation - Jet Kerosene", value: 820, unit: "TJ", year: 2022, provider: "KCAA", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2025-08-30", notes: "Domestic aviation fuel consumption from KCAA records. Excludes international bunkers." },
  { id: "AD-012", source: "LPG Import Records", sector: "Energy", category: "1.A.4", subcategory: "Residential LPG Consumption", value: 1250, unit: "TJ", year: 2022, provider: "EPRA", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2025-08-15", notes: "LPG sales data adjusted for commercial vs residential split based on cylinder size analysis." },
];

const dataGaps = [
  { sector: "Agriculture", category: "3.B - Manure Management", severity: "high", description: "No disaggregated data on manure management systems by livestock type" },
  { sector: "LULUCF", category: "4.B - Cropland", severity: "high", description: "Incomplete land use transition data for cropland-grassland conversions" },
  { sector: "Waste", category: "5.B - Wastewater Treatment", severity: "medium", description: "Limited data on industrial wastewater treatment volumes and BOD" },
  { sector: "Energy", category: "1.B.2 - Oil & Gas Fugitive", severity: "medium", description: "No facility-level fugitive emission measurements from oil distribution" },
  { sector: "IPPU", category: "2.F - HFC Use", severity: "low", description: "Incomplete records of HFC imports for refrigeration and air conditioning" },
];

const dataProviders = [
  { name: "EPRA", fullName: "Energy & Petroleum Regulatory Authority", sectors: ["Energy"], records: 4, quality: "high" },
  { name: "Ministry of Agriculture", fullName: "Ministry of Agriculture and Livestock Development", sectors: ["Agriculture"], records: 2, quality: "medium" },
  { name: "NEMA", fullName: "National Environment Management Authority", sectors: ["Waste", "LULUCF"], records: 1, quality: "low" },
  { name: "KCPA", fullName: "Kenya Cement Producers Association", sectors: ["IPPU"], records: 1, quality: "high" },
  { name: "KFS", fullName: "Kenya Forest Service", sectors: ["LULUCF"], records: 1, quality: "low" },
  { name: "KEPHIS", fullName: "Kenya Plant Health Inspectorate Service", sectors: ["Agriculture"], records: 1, quality: "medium" },
];

const statusColors: Record<string, string> = {
  verified: "badge-success badge-dot",
  pending: "badge-warning badge-dot",
  draft: "badge-neutral badge-dot",
  rejected: "badge-danger badge-dot",
};

const qualityColors = {
  high: { bg: "bg-emerald-500", dot: "text-emerald-600", label: "High" },
  medium: { bg: "bg-amber-500", dot: "text-amber-600", label: "Medium" },
  low: { bg: "bg-red-500", dot: "text-red-600", label: "Low" },
} as const satisfies Record<string, { bg: string; dot: string; label: string }>;

type QualityLevel = keyof typeof qualityColors;

function getQualityColor(quality: string) {
  return qualityColors[quality as QualityLevel] ?? qualityColors.medium;
}

export default function ActivityDataPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSector, setFilterSector] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterQuality, setFilterQuality] = useState("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"data" | "gaps" | "providers">("data");
  const [showImport, setShowImport] = useState(false);

  const filtered = activityData.filter((ad) => {
    const matchesSearch =
      searchQuery === "" ||
      ad.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = filterSector === "all" || ad.sector === filterSector;
    const matchesStatus = filterStatus === "all" || ad.status === filterStatus;
    const matchesQuality = filterQuality === "all" || ad.quality === filterQuality;
    return matchesSearch && matchesSector && matchesStatus && matchesQuality;
  });

  const sectors = [...new Set(activityData.map((ad) => ad.sector))];
  const verifiedCount = activityData.filter((ad) => ad.status === "verified").length;
  const completeness = Math.round((verifiedCount / activityData.length) * 100);

  const sectorCompleteness = sectors.map((s) => {
    const sectorData = activityData.filter((ad) => ad.sector === s);
    const verified = sectorData.filter((ad) => ad.status === "verified").length;
    return { sector: s, total: sectorData.length, verified, pct: Math.round((verified / sectorData.length) * 100) };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Database size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Activity Data Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Collect, manage, and quality-check activity data from national sources for GHG inventory calculations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary btn-sm" onClick={() => setShowImport(true)}>
            <Upload size={14} />
            <span>Import CSV/Excel</span>
          </button>
          <button className="btn-secondary btn-sm">
            <Download size={14} />
            <span>Export</span>
          </button>
          <button className="btn-primary btn-sm">
            <Plus size={14} />
            <span>Add Data Entry</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Data Sources</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{activityData.length}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sectors.length} sectors covered</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FileSpreadsheet size={20} />
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Data Completeness</p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">{completeness}%</p>
              <p className="text-xs text-gray-400 mt-0.5">{verifiedCount}/{activityData.length} verified</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="mt-3 progress-bar">
            <div className="progress-bar-fill primary" style={{ "--progress-width": `${completeness}%` } as React.CSSProperties} />
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Data Gaps</p>
              <p className="mt-1 text-2xl font-bold text-amber-600">{dataGaps.length}</p>
              <p className="text-xs text-gray-400 mt-0.5">{dataGaps.filter((g) => g.severity === "high").length} high priority</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <AlertCircle size={20} />
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Data Providers</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{dataProviders.length}</p>
              <p className="text-xs text-gray-400 mt-0.5">Government agencies</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Users size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Sector Completeness */}
      <div className="card-elevated animate-fade-up">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Completeness by Sector</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {sectorCompleteness.map((sc) => (
            <div key={sc.sector} className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                  <circle
                    cx="32" cy="32" r="28" fill="none"
                    stroke={sc.pct >= 80 ? "#10b981" : sc.pct >= 50 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${(sc.pct / 100) * 175.93} 175.93`}
                  />
                </svg>
                <span className="absolute text-xs font-bold text-gray-700">{sc.pct}%</span>
              </div>
              <p className="text-xs font-medium text-gray-700 mt-1">{sc.sector}</p>
              <p className="text-[10px] text-gray-400">{sc.verified}/{sc.total} verified</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        {[
          { key: "data" as const, label: "Activity Data", icon: <BarChart3 size={14} /> },
          { key: "gaps" as const, label: "Data Gap Analysis", icon: <AlertTriangle size={14} /> },
          { key: "providers" as const, label: "Data Providers", icon: <Users size={14} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.key
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Data Tab */}
      {activeTab === "data" && (
        <>
          {/* Search & Filters */}
          <div className="flex items-center gap-3 animate-fade-up">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search activity data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <select className="select-field w-auto" value={filterSector} onChange={(e) => setFilterSector(e.target.value)}>
              <option value="all">All Sectors</option>
              {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="select-field w-auto" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
            </select>
            <select className="select-field w-auto" value={filterQuality} onChange={(e) => setFilterQuality(e.target.value)}>
              <option value="all">All Quality</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Table */}
          <div className="table-container animate-fade-up">
            <table>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Sector</th>
                  <th>Category</th>
                  <th className="text-right">Value</th>
                  <th>Unit</th>
                  <th>Year</th>
                  <th>Provider</th>
                  <th>Status</th>
                  <th>Quality</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ad) => (
                  <>
                    <tr
                      key={ad.id}
                      className={`cursor-pointer ${expandedRow === ad.id ? "bg-emerald-50/50" : ""}`}
                      onClick={() => setExpandedRow(expandedRow === ad.id ? null : ad.id)}
                    >
                      <td>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{ad.source}</p>
                          <p className="text-xs text-gray-400">{ad.id}</p>
                        </div>
                      </td>
                      <td className="text-sm text-gray-700">{ad.sector}</td>
                      <td>
                        <div>
                          <p className="text-sm text-gray-900">{ad.subcategory}</p>
                          <p className="text-xs text-gray-400 font-mono">{ad.category}</p>
                        </div>
                      </td>
                      <td className="text-right font-mono text-sm font-semibold text-gray-900">
                        {ad.value.toLocaleString()}
                      </td>
                      <td className="text-xs text-gray-500">{ad.unit}</td>
                      <td className="text-sm text-gray-700">{ad.year}</td>
                      <td className="text-sm text-gray-600">{ad.provider}</td>
                      <td>
                        <span className={statusColors[ad.status]}>
                          {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2.5 h-2.5 rounded-full ${getQualityColor(ad.quality).bg}`} />
                          <span className={`text-xs font-medium ${getQualityColor(ad.quality).dot}`}>
                            {getQualityColor(ad.quality).label}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <button className="btn-icon p-1" onClick={(e) => { e.stopPropagation(); setExpandedRow(expandedRow === ad.id ? null : ad.id); }}>
                            {expandedRow === ad.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>
                          <button className="btn-icon p-1" onClick={(e) => e.stopPropagation()}>
                            <Edit3 size={14} className="text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRow === ad.id && (
                      <tr key={`${ad.id}-detail`}>
                        <td colSpan={10} className="!p-0">
                          <div className="bg-gray-50/80 border-t border-emerald-100 px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-2">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Notes</h4>
                                <p className="text-sm text-gray-700 leading-relaxed">{ad.notes}</p>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tier Level</h4>
                                  <span className="badge-accent">{ad.tier}</span>
                                </div>
                                <div>
                                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Last Updated</h4>
                                  <p className="text-sm text-gray-600">{ad.lastUpdated}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Data Gaps Tab */}
      {activeTab === "gaps" && (
        <div className="space-y-4 animate-fade-up">
          <div className="card-elevated">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Data Gap Analysis</h3>
            <p className="text-xs text-gray-500 mb-4">Categories with missing or incomplete activity data that need attention</p>
            <div className="space-y-3">
              {dataGaps.map((gap, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-4 ${
                    gap.severity === "high"
                      ? "border-red-200 bg-red-50/50"
                      : gap.severity === "medium"
                      ? "border-amber-200 bg-amber-50/50"
                      : "border-gray-200 bg-gray-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${
                        gap.severity === "high" ? "bg-red-100 text-red-600"
                        : gap.severity === "medium" ? "bg-amber-100 text-amber-600"
                        : "bg-gray-100 text-gray-600"
                      }`}>
                        <AlertTriangle size={12} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900">{gap.category}</p>
                          <span className="badge-neutral">{gap.sector}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{gap.description}</p>
                      </div>
                    </div>
                    <span className={`badge ${
                      gap.severity === "high" ? "badge-danger" : gap.severity === "medium" ? "badge-warning" : "badge-neutral"
                    }`}>
                      {gap.severity} priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Providers Tab */}
      {activeTab === "providers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {dataProviders.map((provider) => (
            <div key={provider.name} className="card-interactive">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Users size={18} />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${getQualityColor(provider.quality).bg}`} />
                  <span className={`text-xs font-medium ${getQualityColor(provider.quality).dot}`}>
                    {getQualityColor(provider.quality).label} quality
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{provider.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{provider.fullName}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Database size={10} /> {provider.records} records
                </span>
                <span className="flex items-center gap-1">
                  <BarChart3 size={10} /> {provider.sectors.join(", ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowImport(false)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Import Activity Data</h2>
              <button className="btn-icon" onClick={() => setShowImport(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors">
              <Upload size={32} className="mx-auto text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-700">Drop your file here or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">Supports CSV, XLS, XLSX formats</p>
            </div>
            <div className="mt-4 space-y-2">
              <div>
                <label className="input-label">Target Sector</label>
                <select className="select-field">
                  <option>Select sector...</option>
                  <option>Energy</option>
                  <option>IPPU</option>
                  <option>Agriculture</option>
                  <option>LULUCF</option>
                  <option>Waste</option>
                </select>
              </div>
              <div>
                <label className="input-label">Inventory Year</label>
                <select className="select-field">
                  <option>2022</option>
                  <option>2021</option>
                  <option>2020</option>
                </select>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <button className="btn-primary flex-1">
                <Upload size={16} />
                Import Data
              </button>
              <button className="btn-secondary" onClick={() => setShowImport(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
