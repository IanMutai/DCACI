"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  ChevronDown,
  ChevronRight,
  X,
  Database,
  Beaker,
  Edit3,
  Trash2,
  Info,
  BookOpen,
  FlaskConical,
  Globe,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface EmissionFactor {
  id: string;
  gas: string;
  sector: string;
  category: string;
  subcategory: string;
  value: number;
  unit: string;
  source: "IPCC" | "National" | "Custom";
  tier: "Tier 1" | "Tier 2" | "Tier 3";
  year: number;
  methodology: string;
  uncertaintyLow: number;
  uncertaintyHigh: number;
  references: string[];
}

const emissionFactors: EmissionFactor[] = [
  {
    id: "EF-001",
    gas: "CO2",
    sector: "Energy",
    category: "1.A.1 - Energy Industries",
    subcategory: "Grid Electricity",
    value: 0.4326,
    unit: "tCO2/MWh",
    source: "National",
    tier: "Tier 2",
    year: 2022,
    methodology: "Country-specific grid emission factor based on electricity generation mix. Calculated using IGES List of Grid Emission Factors methodology. Includes all fossil fuel plants connected to the national grid.",
    uncertaintyLow: -8,
    uncertaintyHigh: 10,
    references: ["Kenya Power Annual Report 2022", "EPRA Energy Statistics 2022", "IGES Grid EF Database v11.1"],
  },
  {
    id: "EF-002",
    gas: "CO2",
    sector: "Energy",
    category: "1.A.1 - Energy Industries",
    subcategory: "Diesel Combustion",
    value: 74.1,
    unit: "tCO2/TJ",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor from 2006 IPCC Guidelines, Volume 2, Chapter 2, Table 2.2. Applicable to all diesel/gas oil combustion in stationary sources.",
    uncertaintyLow: -2,
    uncertaintyHigh: 2,
    references: ["2006 IPCC Guidelines Vol. 2 Ch. 2 Table 2.2"],
  },
  {
    id: "EF-003",
    gas: "CO2",
    sector: "Energy",
    category: "1.A.3 - Transport",
    subcategory: "Gasoline/Petrol Combustion",
    value: 69.3,
    unit: "tCO2/TJ",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor from 2006 IPCC Guidelines, Volume 2, Chapter 2, Table 2.2. Applicable to motor gasoline combustion in road transport.",
    uncertaintyLow: -2,
    uncertaintyHigh: 2,
    references: ["2006 IPCC Guidelines Vol. 2 Ch. 2 Table 2.2"],
  },
  {
    id: "EF-004",
    gas: "CO2",
    sector: "Energy",
    category: "1.A.1 - Energy Industries",
    subcategory: "Coal Combustion",
    value: 94.6,
    unit: "tCO2/TJ",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor from 2006 IPCC Guidelines for other bituminous coal. Volume 2, Chapter 2, Table 2.2.",
    uncertaintyLow: -3,
    uncertaintyHigh: 3,
    references: ["2006 IPCC Guidelines Vol. 2 Ch. 2 Table 2.2"],
  },
  {
    id: "EF-005",
    gas: "CO2",
    sector: "Energy",
    category: "1.A.1 - Energy Industries",
    subcategory: "Natural Gas Combustion",
    value: 56.1,
    unit: "tCO2/TJ",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor from 2006 IPCC Guidelines for natural gas. Volume 2, Chapter 2, Table 2.2.",
    uncertaintyLow: -1,
    uncertaintyHigh: 1,
    references: ["2006 IPCC Guidelines Vol. 2 Ch. 2 Table 2.2"],
  },
  {
    id: "EF-006",
    gas: "CH4",
    sector: "Agriculture",
    category: "3.A - Enteric Fermentation",
    subcategory: "Cattle (average dairy/non-dairy)",
    value: 62,
    unit: "kg CH4/head/yr",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor for cattle in developing countries (Africa) from 2006 IPCC Guidelines, Volume 4, Chapter 10, Table 10.11. Weighted average of dairy (68 kg) and non-dairy cattle (56 kg).",
    uncertaintyLow: -30,
    uncertaintyHigh: 30,
    references: ["2006 IPCC Guidelines Vol. 4 Ch. 10 Table 10.11"],
  },
  {
    id: "EF-007",
    gas: "CH4",
    sector: "Agriculture",
    category: "3.A - Enteric Fermentation",
    subcategory: "Dairy Cattle",
    value: 68,
    unit: "kg CH4/head/yr",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor for dairy cattle in Africa from 2006 IPCC Guidelines, Volume 4, Chapter 10, Table 10.11.",
    uncertaintyLow: -30,
    uncertaintyHigh: 30,
    references: ["2006 IPCC Guidelines Vol. 4 Ch. 10 Table 10.11"],
  },
  {
    id: "EF-008",
    gas: "CH4",
    sector: "Agriculture",
    category: "3.A - Enteric Fermentation",
    subcategory: "Non-Dairy Cattle",
    value: 56,
    unit: "kg CH4/head/yr",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor for non-dairy cattle in Africa from 2006 IPCC Guidelines, Volume 4, Chapter 10, Table 10.11.",
    uncertaintyLow: -30,
    uncertaintyHigh: 30,
    references: ["2006 IPCC Guidelines Vol. 4 Ch. 10 Table 10.11"],
  },
  {
    id: "EF-009",
    gas: "CH4",
    sector: "Agriculture",
    category: "3.C - Rice Cultivation",
    subcategory: "Continuously Flooded Fields",
    value: 1.3,
    unit: "kg CH4/ha/day",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor for continuously flooded rice fields without organic amendments from 2006 IPCC Guidelines, Volume 4, Chapter 5, Table 5.11.",
    uncertaintyLow: -40,
    uncertaintyHigh: 40,
    references: ["2006 IPCC Guidelines Vol. 4 Ch. 5 Table 5.11"],
  },
  {
    id: "EF-010",
    gas: "CH4",
    sector: "Waste",
    category: "5.A - Solid Waste Disposal",
    subcategory: "Managed Solid Waste (SWDS)",
    value: 0.6,
    unit: "tCH4/Gg waste",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default methane generation rate for managed disposal sites in tropical regions from 2006 IPCC Guidelines, Volume 5, Chapter 3. MCF=1.0 for managed sites.",
    uncertaintyLow: -30,
    uncertaintyHigh: 30,
    references: ["2006 IPCC Guidelines Vol. 5 Ch. 3"],
  },
  {
    id: "EF-011",
    gas: "CO2",
    sector: "IPPU",
    category: "2.A.1 - Cement Production",
    subcategory: "Clinker Production",
    value: 0.52,
    unit: "tCO2/t clinker",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor for cement clinker production from 2006 IPCC Guidelines, Volume 3, Chapter 2, Table 2.1. Based on stoichiometric calculation.",
    uncertaintyLow: -5,
    uncertaintyHigh: 5,
    references: ["2006 IPCC Guidelines Vol. 3 Ch. 2 Table 2.1"],
  },
  {
    id: "EF-012",
    gas: "N2O",
    sector: "Agriculture",
    category: "3.D - Agricultural Soils",
    subcategory: "Direct N2O (Synthetic Fertilizer)",
    value: 0.01,
    unit: "kg N2O-N/kg N",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor for direct N2O emissions from nitrogen additions to managed soils. 2006 IPCC Guidelines, Volume 4, Chapter 11, Table 11.1.",
    uncertaintyLow: -50,
    uncertaintyHigh: 50,
    references: ["2006 IPCC Guidelines Vol. 4 Ch. 11 Table 11.1"],
  },
  {
    id: "EF-013",
    gas: "CO2",
    sector: "Energy",
    category: "1.A.3 - Transport",
    subcategory: "Jet Kerosene",
    value: 71.5,
    unit: "tCO2/TJ",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor for jet kerosene combustion from 2006 IPCC Guidelines, Volume 2, Chapter 2, Table 2.2.",
    uncertaintyLow: -2,
    uncertaintyHigh: 2,
    references: ["2006 IPCC Guidelines Vol. 2 Ch. 2 Table 2.2"],
  },
  {
    id: "EF-014",
    gas: "CO2",
    sector: "Energy",
    category: "1.A.4 - Other Sectors",
    subcategory: "LPG Combustion",
    value: 63.1,
    unit: "tCO2/TJ",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor for liquefied petroleum gas from 2006 IPCC Guidelines, Volume 2, Chapter 2, Table 2.2.",
    uncertaintyLow: -1,
    uncertaintyHigh: 1,
    references: ["2006 IPCC Guidelines Vol. 2 Ch. 2 Table 2.2"],
  },
  {
    id: "EF-015",
    gas: "CH4",
    sector: "Agriculture",
    category: "3.A - Enteric Fermentation",
    subcategory: "Sheep",
    value: 5,
    unit: "kg CH4/head/yr",
    source: "IPCC",
    tier: "Tier 1",
    year: 2006,
    methodology: "Default emission factor for sheep in developing countries from 2006 IPCC Guidelines, Volume 4, Chapter 10, Table 10.10.",
    uncertaintyLow: -30,
    uncertaintyHigh: 30,
    references: ["2006 IPCC Guidelines Vol. 4 Ch. 10 Table 10.10"],
  },
];

const gasColors: Record<string, string> = {
  CO2: "badge-primary",
  CH4: "badge-warning",
  N2O: "badge-danger",
  HFCs: "badge-accent",
  PFCs: "badge-neutral",
  SF6: "badge-neutral",
};

const sourceIcons: Record<string, React.ReactNode> = {
  IPCC: <Globe size={14} />,
  National: <BookOpen size={14} />,
  Custom: <FlaskConical size={14} />,
};

const sourceBadges: Record<string, string> = {
  IPCC: "badge-accent",
  National: "badge-primary",
  Custom: "badge-warning",
};

const tierBadges: Record<string, string> = {
  "Tier 1": "badge-neutral",
  "Tier 2": "badge-accent",
  "Tier 3": "badge-primary",
};

export default function EmissionFactorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGas, setFilterGas] = useState("all");
  const [filterSector, setFilterSector] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [filterTier, setFilterTier] = useState("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [newFactor, setNewFactor] = useState({
    gas: "CO2",
    sector: "Energy",
    category: "",
    subcategory: "",
    value: "",
    unit: "",
    source: "Custom" as const,
    tier: "Tier 1" as "Tier 1" | "Tier 2" | "Tier 3",
    year: "2024",
    methodology: "",
    uncertaintyLow: "",
    uncertaintyHigh: "",
    references: "",
  });

  const filtered = emissionFactors.filter((ef) => {
    const matchesSearch =
      searchQuery === "" ||
      ef.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ef.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ef.gas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ef.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGas = filterGas === "all" || ef.gas === filterGas;
    const matchesSector = filterSector === "all" || ef.sector === filterSector;
    const matchesSource = filterSource === "all" || ef.source === filterSource;
    const matchesTier = filterTier === "all" || ef.tier === filterTier;
    return matchesSearch && matchesGas && matchesSector && matchesSource && matchesTier;
  });

  const gases = [...new Set(emissionFactors.map((ef) => ef.gas))];
  const sectors = [...new Set(emissionFactors.map((ef) => ef.sector))];

  const activeFilterCount = [filterGas, filterSector, filterSource, filterTier].filter((f) => f !== "all").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Database size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Emission Factors Database</h1>
            <p className="mt-1 text-sm text-gray-500">
              Searchable database of IPCC default and country-specific emission factors for GHG calculations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary btn-sm">
            <Upload size={14} />
            <span>Import</span>
          </button>
          <button className="btn-secondary btn-sm">
            <Download size={14} />
            <span>Export</span>
          </button>
          <button className="btn-primary btn-sm" onClick={() => setShowAddPanel(true)}>
            <Plus size={14} />
            <span>Add Custom Factor</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 stagger-children">
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Factors</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{emissionFactors.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">Across all sectors</p>
        </div>
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">IPCC Default</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">
            {emissionFactors.filter((ef) => ef.source === "IPCC").length}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">2006 IPCC Guidelines</p>
        </div>
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Country-Specific</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">
            {emissionFactors.filter((ef) => ef.source === "National").length}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Kenya-specific factors</p>
        </div>
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Gases Covered</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{gases.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">{gases.join(", ")}</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card-elevated animate-fade-up">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, gas, category, or source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button
            className={`btn-secondary btn-sm ${activeFilterCount > 0 ? "border-emerald-300 bg-emerald-50" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={14} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="input-label">Gas Type</label>
              <select className="select-field" value={filterGas} onChange={(e) => setFilterGas(e.target.value)}>
                <option value="all">All Gases</option>
                {gases.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="input-label">Sector</label>
              <select className="select-field" value={filterSector} onChange={(e) => setFilterSector(e.target.value)}>
                <option value="all">All Sectors</option>
                {sectors.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="input-label">Source</label>
              <select className="select-field" value={filterSource} onChange={(e) => setFilterSource(e.target.value)}>
                <option value="all">All Sources</option>
                <option value="IPCC">IPCC Default</option>
                <option value="National">National</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="input-label">Tier</label>
              <select className="select-field" value={filterTier} onChange={(e) => setFilterTier(e.target.value)}>
                <option value="all">All Tiers</option>
                <option value="Tier 1">Tier 1</option>
                <option value="Tier 2">Tier 2</option>
                <option value="Tier 3">Tier 3</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-container animate-fade-up">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Gas</th>
              <th>Sector</th>
              <th>Category / Subcategory</th>
              <th className="text-right">Value</th>
              <th>Unit</th>
              <th>Source</th>
              <th>Tier</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ef) => (
              <>
                <tr
                  key={ef.id}
                  className={`cursor-pointer ${expandedRow === ef.id ? "bg-emerald-50/50" : ""}`}
                  onClick={() => setExpandedRow(expandedRow === ef.id ? null : ef.id)}
                >
                  <td className="font-mono text-xs text-gray-500">{ef.id}</td>
                  <td>
                    <span className={gasColors[ef.gas] || "badge-neutral"}>{ef.gas}</span>
                  </td>
                  <td className="text-sm text-gray-700">{ef.sector}</td>
                  <td>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{ef.subcategory}</p>
                      <p className="text-xs text-gray-400">{ef.category}</p>
                    </div>
                  </td>
                  <td className="text-right font-mono text-sm font-semibold text-gray-900">{ef.value}</td>
                  <td className="text-xs text-gray-500">{ef.unit}</td>
                  <td>
                    <span className={`${sourceBadges[ef.source]} badge-dot`}>
                      {ef.source}
                    </span>
                  </td>
                  <td>
                    <span className={tierBadges[ef.tier]}>{ef.tier}</span>
                  </td>
                  <td className="text-sm text-gray-500">{ef.year}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button
                        className="btn-icon p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedRow(expandedRow === ef.id ? null : ef.id);
                        }}
                      >
                        {expandedRow === ef.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </button>
                      <button className="btn-icon p-1" onClick={(e) => e.stopPropagation()}>
                        <Edit3 size={14} className="text-gray-400 hover:text-emerald-600" />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRow === ef.id && (
                  <tr key={`${ef.id}-detail`}>
                    <td colSpan={10} className="!p-0">
                      <div className="bg-gray-50/80 border-t border-emerald-100 px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Beaker size={12} /> Methodology Notes
                            </h4>
                            <p className="text-sm text-gray-700 leading-relaxed">{ef.methodology}</p>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <AlertTriangle size={12} /> Uncertainty Range (95% CI)
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="badge-danger">{ef.uncertaintyLow}%</span>
                                <span className="text-xs text-gray-400">to</span>
                                <span className="badge-success">+{ef.uncertaintyHigh}%</span>
                              </div>
                              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-red-300 via-amber-300 to-emerald-300 rounded-full"
                                  style={{ width: "100%" }}
                                />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <BookOpen size={12} /> References
                              </h4>
                              <ul className="space-y-1">
                                {ef.references.map((ref, i) => (
                                  <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                                    <span className="text-emerald-500 mt-0.5">&#8226;</span>
                                    {ref}
                                  </li>
                                ))}
                              </ul>
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
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <Database size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">No emission factors match your search criteria</p>
            <button className="btn-ghost btn-sm mt-2" onClick={() => { setSearchQuery(""); setFilterGas("all"); setFilterSector("all"); setFilterSource("all"); setFilterTier("all"); }}>
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Methodology Summary */}
      <div className="card-elevated animate-fade-up">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Info size={16} className="text-blue-500" />
          Emission Factor Tier Guidance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-gray-50 p-4 border-l-4 border-gray-400">
            <h4 className="text-sm font-semibold text-gray-800">Tier 1 - IPCC Default</h4>
            <p className="text-xs text-gray-600 mt-1">
              Uses IPCC default emission factors. Simplest approach with highest uncertainty. Appropriate for non-key categories.
            </p>
          </div>
          <div className="rounded-lg bg-blue-50/50 p-4 border-l-4 border-blue-400">
            <h4 className="text-sm font-semibold text-gray-800">Tier 2 - Country-Specific</h4>
            <p className="text-xs text-gray-600 mt-1">
              Uses country-specific emission factors derived from national data. Recommended for key categories.
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50/50 p-4 border-l-4 border-emerald-400">
            <h4 className="text-sm font-semibold text-gray-800">Tier 3 - Facility-Level</h4>
            <p className="text-xs text-gray-600 mt-1">
              Uses plant or facility-specific measurement data. Highest accuracy, lowest uncertainty. Best practice for large point sources.
            </p>
          </div>
        </div>
      </div>

      {/* Add Custom Factor Slide-out Panel */}
      {showAddPanel && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowAddPanel(false)} />
          <div className="relative w-full max-w-lg bg-white shadow-xl overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Add Custom Emission Factor</h2>
                <p className="text-xs text-gray-500 mt-0.5">Add a country-specific or custom emission factor</p>
              </div>
              <button className="btn-icon" onClick={() => setShowAddPanel(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Gas Type</label>
                  <select
                    className="select-field"
                    value={newFactor.gas}
                    onChange={(e) => setNewFactor({ ...newFactor, gas: e.target.value })}
                  >
                    <option value="CO2">CO2</option>
                    <option value="CH4">CH4</option>
                    <option value="N2O">N2O</option>
                    <option value="HFCs">HFCs</option>
                    <option value="PFCs">PFCs</option>
                    <option value="SF6">SF6</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Sector</label>
                  <select
                    className="select-field"
                    value={newFactor.sector}
                    onChange={(e) => setNewFactor({ ...newFactor, sector: e.target.value })}
                  >
                    <option value="Energy">Energy</option>
                    <option value="IPPU">IPPU</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="LULUCF">LULUCF</option>
                    <option value="Waste">Waste</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="input-label">IPCC Category</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., 1.A.1 - Energy Industries"
                  value={newFactor.category}
                  onChange={(e) => setNewFactor({ ...newFactor, category: e.target.value })}
                />
              </div>
              <div>
                <label className="input-label">Subcategory / Source</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Coal Combustion"
                  value={newFactor.subcategory}
                  onChange={(e) => setNewFactor({ ...newFactor, subcategory: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Emission Factor Value</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g., 74.1"
                    value={newFactor.value}
                    onChange={(e) => setNewFactor({ ...newFactor, value: e.target.value })}
                  />
                </div>
                <div>
                  <label className="input-label">Unit</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., tCO2/TJ"
                    value={newFactor.unit}
                    onChange={(e) => setNewFactor({ ...newFactor, unit: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Tier Level</label>
                  <select
                    className="select-field"
                    value={newFactor.tier}
                    onChange={(e) => setNewFactor({ ...newFactor, tier: e.target.value as "Tier 1" | "Tier 2" | "Tier 3" })}
                  >
                    <option value="Tier 1">Tier 1</option>
                    <option value="Tier 2">Tier 2</option>
                    <option value="Tier 3">Tier 3</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Reference Year</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newFactor.year}
                    onChange={(e) => setNewFactor({ ...newFactor, year: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Uncertainty Low (%)</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g., -10"
                    value={newFactor.uncertaintyLow}
                    onChange={(e) => setNewFactor({ ...newFactor, uncertaintyLow: e.target.value })}
                  />
                </div>
                <div>
                  <label className="input-label">Uncertainty High (%)</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g., 10"
                    value={newFactor.uncertaintyHigh}
                    onChange={(e) => setNewFactor({ ...newFactor, uncertaintyHigh: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="input-label">Methodology Notes</label>
                <textarea
                  className="input-field min-h-[100px]"
                  placeholder="Describe the methodology and data sources..."
                  value={newFactor.methodology}
                  onChange={(e) => setNewFactor({ ...newFactor, methodology: e.target.value })}
                />
              </div>
              <div>
                <label className="input-label">References (one per line)</label>
                <textarea
                  className="input-field min-h-[80px]"
                  placeholder="Enter references, one per line..."
                  value={newFactor.references}
                  onChange={(e) => setNewFactor({ ...newFactor, references: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button className="btn-primary flex-1">
                  <CheckCircle2 size={16} />
                  Save Emission Factor
                </button>
                <button className="btn-secondary" onClick={() => setShowAddPanel(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
