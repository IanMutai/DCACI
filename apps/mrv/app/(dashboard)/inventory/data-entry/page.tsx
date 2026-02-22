"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Flame,
  Factory,
  Wheat,
  TreePine,
  Trash2,
  Save,
  Send,
  AlertCircle,
  CheckCircle2,
  Info,
  FileText,
  Calculator,
  Database,
  BarChart3,
} from "lucide-react";

/* ───────────────────────────────────────────
   IPCC Category Tree Data
   ─────────────────────────────────────────── */

interface Category {
  code: string;
  name: string;
  children?: Category[];
}

type SectorInfo = { label: string; icon: React.ReactNode; color: string; categories: Category[] };

const sectorTree: { [K in "energy" | "ippu" | "agriculture" | "lulucf" | "waste"]: SectorInfo } = {
  energy: {
    label: "Energy",
    icon: <Flame size={18} className="text-orange-600" />,
    color: "bg-orange-100",
    categories: [
      {
        code: "1.A",
        name: "Fuel Combustion Activities",
        children: [
          {
            code: "1.A.1",
            name: "Energy Industries",
            children: [
              { code: "1.A.1.a", name: "Main Activity Electricity and Heat Production" },
              { code: "1.A.1.b", name: "Petroleum Refining" },
              { code: "1.A.1.c", name: "Manufacture of Solid Fuels and Other Energy Industries" },
            ],
          },
          {
            code: "1.A.2",
            name: "Manufacturing Industries and Construction",
            children: [
              { code: "1.A.2.a", name: "Iron and Steel" },
              { code: "1.A.2.b", name: "Non-Ferrous Metals" },
              { code: "1.A.2.c", name: "Chemicals" },
              { code: "1.A.2.d", name: "Pulp, Paper and Print" },
              { code: "1.A.2.e", name: "Food Processing, Beverages and Tobacco" },
              { code: "1.A.2.f", name: "Non-Metallic Minerals" },
            ],
          },
          {
            code: "1.A.3",
            name: "Transport",
            children: [
              { code: "1.A.3.a", name: "Civil Aviation" },
              { code: "1.A.3.b", name: "Road Transportation" },
              { code: "1.A.3.c", name: "Railways" },
              { code: "1.A.3.d", name: "Water-borne Navigation" },
            ],
          },
          {
            code: "1.A.4",
            name: "Other Sectors",
            children: [
              { code: "1.A.4.a", name: "Commercial/Institutional" },
              { code: "1.A.4.b", name: "Residential" },
              { code: "1.A.4.c", name: "Agriculture/Forestry/Fishing" },
            ],
          },
        ],
      },
      {
        code: "1.B",
        name: "Fugitive Emissions from Fuels",
        children: [
          { code: "1.B.1", name: "Solid Fuels" },
          {
            code: "1.B.2",
            name: "Oil and Natural Gas",
            children: [
              { code: "1.B.2.a", name: "Oil" },
              { code: "1.B.2.b", name: "Natural Gas" },
            ],
          },
        ],
      },
    ],
  },
  ippu: {
    label: "IPPU",
    icon: <Factory size={18} className="text-blue-600" />,
    color: "bg-blue-100",
    categories: [
      {
        code: "2.A",
        name: "Mineral Industry",
        children: [
          { code: "2.A.1", name: "Cement Production" },
          { code: "2.A.2", name: "Lime Production" },
          { code: "2.A.3", name: "Glass Production" },
          { code: "2.A.4", name: "Other Process Uses of Carbonates" },
        ],
      },
      {
        code: "2.B",
        name: "Chemical Industry",
        children: [
          { code: "2.B.1", name: "Ammonia Production" },
          { code: "2.B.2", name: "Nitric Acid Production" },
        ],
      },
      {
        code: "2.C",
        name: "Metal Industry",
        children: [
          { code: "2.C.1", name: "Iron and Steel Production" },
        ],
      },
      {
        code: "2.F",
        name: "Product Uses as Substitutes for ODS",
        children: [
          { code: "2.F.1", name: "Refrigeration and Air Conditioning" },
        ],
      },
    ],
  },
  agriculture: {
    label: "Agriculture",
    icon: <Wheat size={18} className="text-green-600" />,
    color: "bg-green-100",
    categories: [
      {
        code: "3.A",
        name: "Livestock",
        children: [
          { code: "3.A.1", name: "Enteric Fermentation" },
          { code: "3.A.2", name: "Manure Management" },
        ],
      },
      { code: "3.B", name: "Land (reported under LULUCF)" },
      {
        code: "3.C",
        name: "Aggregate Sources and Non-CO2 Emissions",
        children: [
          { code: "3.C.1", name: "Emissions from Biomass Burning" },
          { code: "3.C.4", name: "Direct N2O Emissions from Managed Soils" },
          { code: "3.C.5", name: "Indirect N2O Emissions from Managed Soils" },
          { code: "3.C.6", name: "Indirect N2O Emissions from Manure Management" },
          { code: "3.C.7", name: "Rice Cultivations" },
        ],
      },
    ],
  },
  lulucf: {
    label: "LULUCF",
    icon: <TreePine size={18} className="text-emerald-600" />,
    color: "bg-emerald-100",
    categories: [
      {
        code: "3B.1",
        name: "Forest Land",
        children: [
          { code: "3B.1.a", name: "Forest Land Remaining Forest Land" },
          { code: "3B.1.b", name: "Land Converted to Forest Land" },
        ],
      },
      {
        code: "3B.2",
        name: "Cropland",
        children: [
          { code: "3B.2.a", name: "Cropland Remaining Cropland" },
          { code: "3B.2.b", name: "Land Converted to Cropland" },
        ],
      },
      {
        code: "3B.3",
        name: "Grassland",
        children: [
          { code: "3B.3.a", name: "Grassland Remaining Grassland" },
          { code: "3B.3.b", name: "Land Converted to Grassland" },
        ],
      },
      { code: "3B.4", name: "Wetlands" },
      { code: "3B.5", name: "Settlements" },
      { code: "3B.6", name: "Other Land" },
    ],
  },
  waste: {
    label: "Waste",
    icon: <Trash2 size={18} className="text-purple-600" />,
    color: "bg-purple-100",
    categories: [
      {
        code: "4.A",
        name: "Solid Waste Disposal",
        children: [
          { code: "4.A.1", name: "Managed Waste Disposal Sites" },
          { code: "4.A.2", name: "Unmanaged Waste Disposal Sites" },
          { code: "4.A.3", name: "Uncategorized Waste Disposal Sites" },
        ],
      },
      { code: "4.B", name: "Biological Treatment of Solid Waste" },
      { code: "4.C", name: "Incineration and Open Burning of Waste" },
      {
        code: "4.D",
        name: "Wastewater Treatment and Discharge",
        children: [
          { code: "4.D.1", name: "Domestic Wastewater" },
          { code: "4.D.2", name: "Industrial Wastewater" },
        ],
      },
    ],
  },
};

const sectorKeys = (Object.keys(sectorTree) as Array<keyof typeof sectorTree>);

/* ─── TreeNode component ─── */

function TreeNode({
  cat,
  depth,
  selected,
  onSelect,
}: {
  cat: Category;
  depth: number;
  selected: string | null;
  onSelect: (code: string) => void;
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = cat.children && cat.children.length > 0;
  const isSelected = selected === cat.code;

  return (
    <div>
      <button
        className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm rounded-lg transition-colors ${
          isSelected
            ? "bg-emerald-50 text-emerald-700 font-medium"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
          onSelect(cat.code);
        }}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown size={14} className="shrink-0 text-gray-400" />
          ) : (
            <ChevronRight size={14} className="shrink-0 text-gray-400" />
          )
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <span className="font-mono text-xs text-gray-400 shrink-0 w-12">
          {cat.code}
        </span>
        <span className="truncate">{cat.name}</span>
      </button>
      {expanded &&
        hasChildren &&
        cat.children!.map((child) => (
          <TreeNode
            key={child.code}
            cat={child}
            depth={depth + 1}
            selected={selected}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
}

/* ─── Data Entry Form ─── */

function DataEntryForm({ categoryCode }: { categoryCode: string }) {
  const [activityValue, setActivityValue] = useState("");
  const [activityUnit, setActivityUnit] = useState("TJ");
  const [source, setSource] = useState("");
  const [tier, setTier] = useState("1");
  const [efValue, setEfValue] = useState("");
  const [efUnit, setEfUnit] = useState("tCO2/TJ");
  const [efSource, setEfSource] = useState("ipcc_default");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const adNum = parseFloat(activityValue) || 0;
  const efNum = parseFloat(efValue) || 0;
  const calculatedEmissions = adNum * efNum;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="card-elevated">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-sm font-semibold text-emerald-600">
            {categoryCode}
          </span>
          <span className="badge-primary">Data Entry</span>
        </div>

        {/* Activity Data */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Database size={14} className="text-gray-400" />
            Activity Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Value</label>
              <input
                type="number"
                value={activityValue}
                onChange={(e) => setActivityValue(e.target.value)}
                placeholder="Enter value"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Unit</label>
              <select
                value={activityUnit}
                onChange={(e) => setActivityUnit(e.target.value)}
                className="select-field"
              >
                <option value="TJ">TJ (Terajoules)</option>
                <option value="Gg">Gg (Gigagrams)</option>
                <option value="kt">kt (Kilotonnes)</option>
                <option value="m3">m3 (Cubic metres)</option>
                <option value="ha">ha (Hectares)</option>
                <option value="head">Head (Livestock)</option>
                <option value="t">t (Tonnes)</option>
              </select>
            </div>
            <div>
              <label className="input-label">Data Source</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. KNBS, ERC Report"
                className="input-field"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Methodology Tier</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="select-field"
              >
                <option value="1">Tier 1 - IPCC Default</option>
                <option value="2">Tier 2 - Country Specific</option>
                <option value="3">Tier 3 - Facility/Model</option>
              </select>
            </div>
            <div>
              <label className="input-label">Data Quality</label>
              <div className="flex items-center gap-2 mt-1.5">
                {["High", "Medium", "Low"].map((q) => (
                  <span
                    key={q}
                    className={
                      q === "High"
                        ? "badge-success"
                        : q === "Medium"
                        ? "badge-warning"
                        : "badge-danger"
                    }
                  >
                    {q}
                  </span>
                ))}
              </div>
              <p className="input-helper">Select the quality level of this data</p>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-100" />

        {/* Emission Factor */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Calculator size={14} className="text-gray-400" />
            Emission Factor
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">EF Value</label>
              <input
                type="number"
                value={efValue}
                onChange={(e) => setEfValue(e.target.value)}
                placeholder="Enter emission factor"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">EF Unit</label>
              <select
                value={efUnit}
                onChange={(e) => setEfUnit(e.target.value)}
                className="select-field"
              >
                <option value="tCO2/TJ">tCO2/TJ</option>
                <option value="kgCH4/head">kgCH4/head</option>
                <option value="kgN2O/ha">kgN2O/ha</option>
                <option value="tCO2/t">tCO2/t product</option>
                <option value="kgCH4/Gg">kgCH4/Gg waste</option>
              </select>
            </div>
            <div>
              <label className="input-label">EF Source</label>
              <select
                value={efSource}
                onChange={(e) => setEfSource(e.target.value)}
                className="select-field"
              >
                <option value="ipcc_default">IPCC Default (2006 GL)</option>
                <option value="ipcc_2019">IPCC 2019 Refinement</option>
                <option value="country_specific">Country-Specific (Kenya)</option>
                <option value="custom">Custom / Measured</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-100" />

        {/* Calculated Emissions */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-emerald-800 mb-2 flex items-center gap-2">
            <BarChart3 size={14} className="text-emerald-600" />
            Calculated Emissions
          </h3>
          <div className="flex items-end gap-3">
            <div>
              <p className="text-xs text-emerald-600 font-mono">
                E = AD x EF
              </p>
              <p className="text-2xl font-bold text-emerald-900">
                {calculatedEmissions > 0
                  ? calculatedEmissions.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                  : "--"}
              </p>
            </div>
            <p className="text-sm text-emerald-600 pb-1">
              {efUnit.includes("CO2") ? "tCO2" : "CO2 equivalent"}
            </p>
          </div>
          {calculatedEmissions === 0 && (
            <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
              <Info size={12} />
              Enter activity data and emission factor to see calculated emissions
            </p>
          )}
        </div>

        <hr className="my-6 border-gray-100" />

        {/* Notes */}
        <div>
          <label className="input-label">Notes / Documentation</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Document data sources, assumptions, methodological choices..."
            className="input-field"
          />
          <p className="input-helper">
            Good documentation improves transparency and supports QA/QC review
          </p>
        </div>

        {/* Validation */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            {activityValue ? (
              <CheckCircle2 size={14} className="text-emerald-500" />
            ) : (
              <AlertCircle size={14} className="text-gray-300" />
            )}
            <span className={activityValue ? "text-emerald-600" : "text-gray-400"}>
              Activity data entered
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {efValue ? (
              <CheckCircle2 size={14} className="text-emerald-500" />
            ) : (
              <AlertCircle size={14} className="text-gray-300" />
            )}
            <span className={efValue ? "text-emerald-600" : "text-gray-400"}>
              Emission factor specified
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {source ? (
              <CheckCircle2 size={14} className="text-emerald-500" />
            ) : (
              <AlertCircle size={14} className="text-gray-300" />
            )}
            <span className={source ? "text-emerald-600" : "text-gray-400"}>
              Data source documented
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={handleSave} className="btn-secondary">
            <Save size={14} />
            <span>{saved ? "Saved!" : "Save Draft"}</span>
          </button>
          <button className="btn-primary">
            <Send size={14} />
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
}


/* ─── Main Page ─── */

export default function DataEntryPage() {
  const [activeSector, setActiveSector] = useState<keyof typeof sectorTree>("energy");
  const [selectedCategory, setSelectedCategory] = useState<string | null>("1.A.1.a");

  const sector = sectorTree[activeSector];

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/inventory"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft size={14} />
        Inventories
      </Link>

      {/* Page Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Entry</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter activity data, emission factors, and documentation by IPCC category
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-warning badge-dot">2023 Inventory</span>
        </div>
      </div>

      {/* Sector Tabs */}
      <div className="flex gap-2 flex-wrap animate-fade-up">
        {sectorKeys.map((key) => {
          const s = sectorTree[key];
          return (
            <button
              key={key}
              onClick={() => {
                setActiveSector(key);
                setSelectedCategory(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeSector === key
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-200 hover:text-emerald-700"
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Main Content: Tree + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-up">
        {/* Category Tree */}
        <div className="lg:col-span-4">
          <div className="card-elevated sticky top-6">
            <div className="flex items-center gap-2 mb-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${sector.color}`}>
                {sector.icon}
              </div>
              <h2 className="text-sm font-semibold text-gray-900">
                {sector.label} Categories
              </h2>
            </div>
            <div className="space-y-0.5 max-h-[60vh] overflow-y-auto scrollbar-thin">
              {sector.categories.map((cat) => (
                <TreeNode
                  key={cat.code}
                  cat={cat}
                  depth={0}
                  selected={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Data Entry Form */}
        <div className="lg:col-span-8">
          {selectedCategory ? (
            <DataEntryForm categoryCode={selectedCategory} />
          ) : (
            <div className="card-elevated flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 mb-4">
                <FileText size={24} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Select a Category
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Choose an IPCC category from the tree on the left to enter activity
                data and emission factors.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
