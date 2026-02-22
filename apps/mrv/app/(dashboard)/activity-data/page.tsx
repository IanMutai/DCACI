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
  { id: "AD-001", source: "National Energy Balance", sector: "Energy", category: "1.A.3", subcategory: "Transport - All Fuels", value: 11100, unit: "Gg CO2e", year: 2021, provider: "EPRA", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2024-10-15", notes: "Transport subsector: 11.1 MtCO2e (13.5% of national total). Largest energy subsector. Based on EPRA petroleum product sales records." },
  { id: "AD-002", source: "Building Energy Surveys", sector: "Energy", category: "1.A.4", subcategory: "Buildings - Residential & Commercial", value: 5360, unit: "Gg CO2e", year: 2021, provider: "EPRA", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2024-09-22", notes: "Buildings subsector: 5.36 MtCO2e (6.5%). Includes LPG, kerosene, and charcoal use in residential and commercial buildings." },
  { id: "AD-003", source: "Industrial Energy Returns", sector: "Energy", category: "1.A.2", subcategory: "Manufacturing & Construction", value: 3260, unit: "Gg CO2e", year: 2021, provider: "EPRA", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2024-09-22", notes: "Manufacturing subsector: 3.26 MtCO2e (4.0%). Cement, food processing, and other industrial fuel combustion." },
  { id: "AD-004", source: "Kenya Power Generation Data", sector: "Energy", category: "1.A.1", subcategory: "Electricity Generation", value: 680, unit: "Gg CO2e", year: 2021, provider: "EPRA", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2024-10-01", notes: "Electricity generation: 0.68 MtCO2e (0.8%). Very low due to geothermal-dominated grid. Grid factor: 56.81 gCO2/kWh." },
  { id: "AD-005", source: "Livestock Census & Surveys", sector: "Agriculture", category: "3.A.1", subcategory: "Enteric Fermentation - All Livestock", value: 29500, unit: "Gg CO2e", year: 2021, provider: "Ministry of Agriculture", status: "verified", quality: "medium", tier: "Tier 1", lastUpdated: "2024-08-10", notes: "Enteric fermentation: 29.5 MtCO2e (56% of agriculture). Dominated by cattle (dairy and non-dairy). ~18M cattle nationally." },
  { id: "AD-006", source: "Livestock Census & Surveys", sector: "Agriculture", category: "3.A.2", subcategory: "Manure Left on Pasture", value: 12600, unit: "Gg CO2e", year: 2021, provider: "Ministry of Agriculture", status: "verified", quality: "medium", tier: "Tier 1", lastUpdated: "2024-08-10", notes: "Manure on pasture: 12.6 MtCO2e (24% of agriculture). Primarily from pastoral and agro-pastoral livestock systems." },
  { id: "AD-007", source: "Food Loss Estimates", sector: "Agriculture", category: "3.H", subcategory: "Food Waste Emissions", value: 5800, unit: "Gg CO2e", year: 2021, provider: "Ministry of Agriculture", status: "pending", quality: "medium", tier: "Tier 1", lastUpdated: "2024-07-20", notes: "Food waste: 5.8 MtCO2e (11% of agriculture). Estimated from post-harvest loss surveys and FAOSTAT data." },
  { id: "AD-008", source: "IPPU Industry Reports", sector: "IPPU", category: "2.A.1", subcategory: "Cement & Industrial Processes", value: 5955, unit: "Gg CO2e", year: 2022, provider: "KNBS", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2024-06-18", notes: "IPPU sector: 5.96 MtCO2e (6.3% of national 94.9 Mt). Dominated by cement production from 6 major plants. Source: PRIMAP-hist v2.6 HISTCR." },
  { id: "AD-009", source: "Waste Management Records", sector: "Waste", category: "5.A", subcategory: "Solid Waste & Wastewater", value: 3100, unit: "Gg CO2e", year: 2022, provider: "NEMA", status: "pending", quality: "low", tier: "Tier 1", lastUpdated: "2024-09-01", notes: "Waste sector: 3.1 MtCO2e (3.3%). Limited data on landfill methane. Most waste disposed in open dumpsites." },
  { id: "AD-010", source: "Forest & Land Use Survey", sector: "LULUCF", category: "4.A", subcategory: "Land Use, Land-Use Change & Forestry", value: -7570, unit: "Gg CO2e", year: 2022, provider: "KFS", status: "verified", quality: "medium", tier: "Tier 1", lastUpdated: "2024-10-05", notes: "LULUCF net sink: -7.57 MtCO2e. Forest cover ~7.4%. Reforestation programs partially offset deforestation." },
  { id: "AD-011", source: "PRIMAP-hist v2.6 HISTCR", sector: "Energy", category: "1.A", subcategory: "Total Energy Sector (2022)", value: 40273, unit: "Gg CO2e", year: 2022, provider: "PRIMAP/CCD", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2024-11-30", notes: "Energy sector total: 40.3 MtCO2e (42.4% of national 94.9 Mt). Second largest sector after agriculture. Source: PRIMAP-hist v2.6 country-reported priority." },
  { id: "AD-012", source: "PRIMAP-hist v2.6 HISTCR", sector: "Agriculture", category: "3", subcategory: "Total Agriculture Sector (2022)", value: 44920, unit: "Gg CO2e", year: 2022, provider: "PRIMAP/CCD", status: "verified", quality: "medium", tier: "Tier 1", lastUpdated: "2024-11-30", notes: "Agriculture sector total: 44.9 MtCO2e (47.3% of national 94.9 Mt). Largest emitting sector. Dominated by livestock. Source: PRIMAP-hist v2.6 country-reported priority." },
  { id: "AD-013", source: "Gas Breakdown Analysis", sector: "Energy", category: "All", subcategory: "CH4 Emissions (45.1% of total)", value: 37100, unit: "Gg CO2e", year: 2021, provider: "KNBS", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2024-09-15", notes: "Methane is Kenya's dominant GHG at 45.1% of total. Mainly from livestock and waste sectors." },
  { id: "AD-014", source: "Gas Breakdown Analysis", sector: "Energy", category: "All", subcategory: "CO2 Emissions (26.8% of total)", value: 22100, unit: "Gg CO2e", year: 2021, provider: "KNBS", status: "verified", quality: "high", tier: "Tier 2", lastUpdated: "2024-09-15", notes: "CO2 accounts for 26.8% of national emissions - unusually low share due to clean grid and agriculture dominance." },
  { id: "AD-015", source: "Gas Breakdown Analysis", sector: "Agriculture", category: "All", subcategory: "N2O Emissions (25.3% of total)", value: 20800, unit: "Gg CO2e", year: 2021, provider: "KNBS", status: "verified", quality: "medium", tier: "Tier 1", lastUpdated: "2024-09-15", notes: "N2O accounts for 25.3% of total - primarily from agricultural soils and manure management." },
];

const dataGaps = [
  { sector: "Agriculture", category: "3.A - Enteric Fermentation", severity: "high", description: "Tier 1 default EFs used for 29.5 MtCO2e category. Need country-specific EFs for Kenya cattle breeds (Zebu, Boran, dairy crosses)" },
  { sector: "Agriculture", category: "3.B - Manure Management", severity: "high", description: "No disaggregated data on manure management systems. Manure on pasture (12.6 Mt) uses IPCC defaults for pastoral systems" },
  { sector: "LULUCF", category: "4.A - Forest Land", severity: "high", description: "Incomplete activity data for forest land transitions. Remote sensing data gaps in ASALs. Carbon stock change factors use Tier 1 defaults" },
  { sector: "Waste", category: "5.A - Solid Waste Disposal", severity: "medium", description: "Limited data on waste composition and methane recovery. Most waste goes to open dumpsites without weighbridges" },
  { sector: "Energy", category: "1.B - Fugitive Emissions", severity: "medium", description: "No facility-level measurements from petroleum distribution. F-gases (2.8% of total) have incomplete import records" },
  { sector: "IPPU", category: "2.F - F-gas Consumption", severity: "medium", description: "Incomplete HFC/PFC import records for refrigeration and air conditioning. F-gases growing rapidly" },
  { sector: "Agriculture", category: "3.D - Agricultural Soils", severity: "low", description: "Fertilizer application data from imports only. Actual field application rates and crop-specific data needed for Tier 2" },
];

const dataProviders = [
  { name: "EPRA", fullName: "Energy & Petroleum Regulatory Authority", sectors: ["Energy"], records: 5, quality: "high" },
  { name: "Ministry of Agriculture", fullName: "Ministry of Agriculture & Livestock Development", sectors: ["Agriculture"], records: 4, quality: "medium" },
  { name: "NEMA", fullName: "National Environment Management Authority", sectors: ["Waste", "LULUCF"], records: 1, quality: "low" },
  { name: "KFS", fullName: "Kenya Forest Service", sectors: ["LULUCF"], records: 1, quality: "medium" },
  { name: "KNBS", fullName: "Kenya National Bureau of Statistics", sectors: ["IPPU", "Energy", "Agriculture"], records: 4, quality: "high" },
  { name: "CCD", fullName: "Climate Change Directorate (MoEF)", sectors: ["All - BTR Coordination"], records: 15, quality: "high" },
  { name: "Kenya Power", fullName: "Kenya Electricity Generating Company", sectors: ["Energy"], records: 1, quality: "high" },
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
