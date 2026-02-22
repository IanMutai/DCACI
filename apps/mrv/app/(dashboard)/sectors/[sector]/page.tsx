"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Flame,
  Factory,
  Wheat,
  TreePine,
  Trash2,
  TrendingUp,
  AlertCircle,
  Info,
  Star,
  Download,
} from "lucide-react";

/* ───────────────────────────────────────────
   IPCC Sector Data for Kenya — 2022 inventory
   Source: PRIMAP-hist v2.6 HISTCR for sector totals
   Subcategory breakdowns are modelled estimates
   ─────────────────────────────────────────── */

interface SubCategory {
  code: string;
  name: string;
  emissions: number;
  co2: number;
  ch4: number;
  n2o: number;
  tier: string;
  completeness: number;
  isKey: boolean;
  children?: SubCategory[];
}

interface YearTrend {
  year: number;
  value: number;
}

interface SectorConfig {
  name: string;
  fullName: string;
  code: string;
  icon: React.ReactNode;
  iconBg: string;
  totalEmissions: number;
  description: string;
  gasBreakdown: { gas: string; value: number; color: string }[];
  trend: YearTrend[];
  categories: SubCategory[];
}

const sectorData: Record<string, SectorConfig> = {
  energy: {
    name: "Energy",
    fullName: "Energy",
    code: "1",
    icon: <Flame size={22} className="text-orange-600" />,
    iconBg: "bg-orange-100",
    totalEmissions: 40.3,
    description: "Fuel combustion activities and fugitive emissions from fuels. Second largest sector (42.4% of 94.9 MtCO2e). Transport is the largest subsector (11.1 Mt, 2021). Grid factor 56.81 gCO2/kWh due to geothermal dominance. Source: PRIMAP-hist v2.6 HISTCR.",
    gasBreakdown: [
      { gas: "CO2", value: 35.4, color: "bg-gray-500" },
      { gas: "CH4", value: 3.2, color: "bg-amber-500" },
      { gas: "N2O", value: 1.7, color: "bg-blue-500" },
    ],
    trend: [
      { year: 2018, value: 32.8 },
      { year: 2019, value: 34.2 },
      { year: 2020, value: 33.1 },
      { year: 2021, value: 36.5 },
      { year: 2022, value: 40.3 },
    ],
    categories: [
      {
        code: "1.A",
        name: "Fuel Combustion Activities",
        emissions: 39.6,
        co2: 35.8,
        ch4: 2.6,
        n2o: 1.2,
        tier: "Tier 1/2",
        completeness: 95,
        isKey: true,
        children: [
          {
            code: "1.A.1",
            name: "Energy Industries",
            emissions: 8.4,
            co2: 8.0,
            ch4: 0.3,
            n2o: 0.1,
            tier: "Tier 2",
            completeness: 100,
            isKey: true,
            children: [
              { code: "1.A.1.a", name: "Main Activity Electricity & Heat", emissions: 6.8, co2: 6.5, ch4: 0.2, n2o: 0.1, tier: "Tier 2", completeness: 100, isKey: true },
              { code: "1.A.1.b", name: "Petroleum Refining", emissions: 1.2, co2: 1.1, ch4: 0.1, n2o: 0.0, tier: "Tier 2", completeness: 100, isKey: false },
              { code: "1.A.1.c", name: "Other Energy Industries", emissions: 0.4, co2: 0.4, ch4: 0.0, n2o: 0.0, tier: "Tier 1", completeness: 85, isKey: false },
            ],
          },
          {
            code: "1.A.2",
            name: "Manufacturing Industries & Construction",
            emissions: 4.8,
            co2: 4.5,
            ch4: 0.2,
            n2o: 0.1,
            tier: "Tier 1",
            completeness: 90,
            isKey: false,
            children: [
              { code: "1.A.2.a", name: "Iron and Steel", emissions: 0.3, co2: 0.3, ch4: 0.0, n2o: 0.0, tier: "Tier 1", completeness: 85, isKey: false },
              { code: "1.A.2.e", name: "Food & Beverage & Tobacco", emissions: 2.1, co2: 2.0, ch4: 0.1, n2o: 0.0, tier: "Tier 1", completeness: 90, isKey: false },
              { code: "1.A.2.f", name: "Non-Metallic Minerals", emissions: 1.8, co2: 1.7, ch4: 0.1, n2o: 0.0, tier: "Tier 1", completeness: 90, isKey: false },
            ],
          },
          {
            code: "1.A.3",
            name: "Transport",
            emissions: 18.2,
            co2: 17.4,
            ch4: 0.5,
            n2o: 0.3,
            tier: "Tier 1",
            completeness: 92,
            isKey: true,
            children: [
              { code: "1.A.3.a", name: "Civil Aviation", emissions: 1.8, co2: 1.7, ch4: 0.1, n2o: 0.0, tier: "Tier 1", completeness: 95, isKey: false },
              { code: "1.A.3.b", name: "Road Transportation", emissions: 14.6, co2: 14.0, ch4: 0.3, n2o: 0.3, tier: "Tier 1", completeness: 90, isKey: true },
              { code: "1.A.3.c", name: "Railways", emissions: 0.4, co2: 0.4, ch4: 0.0, n2o: 0.0, tier: "Tier 1", completeness: 88, isKey: false },
              { code: "1.A.3.d", name: "Water-borne Navigation", emissions: 1.4, co2: 1.3, ch4: 0.1, n2o: 0.0, tier: "Tier 1", completeness: 80, isKey: false },
            ],
          },
          {
            code: "1.A.4",
            name: "Other Sectors",
            emissions: 8.2,
            co2: 5.9,
            ch4: 1.6,
            n2o: 0.7,
            tier: "Tier 1",
            completeness: 85,
            isKey: false,
            children: [
              { code: "1.A.4.a", name: "Commercial/Institutional", emissions: 1.4, co2: 1.2, ch4: 0.1, n2o: 0.1, tier: "Tier 1", completeness: 85, isKey: false },
              { code: "1.A.4.b", name: "Residential", emissions: 5.8, co2: 3.8, ch4: 1.4, n2o: 0.6, tier: "Tier 1", completeness: 82, isKey: false },
              { code: "1.A.4.c", name: "Agriculture/Forestry/Fishing", emissions: 1.0, co2: 0.9, ch4: 0.1, n2o: 0.0, tier: "Tier 1", completeness: 80, isKey: false },
            ],
          },
        ],
      },
      {
        code: "1.B",
        name: "Fugitive Emissions from Fuels",
        emissions: 3.2,
        co2: 2.4,
        ch4: 0.5,
        n2o: 0.3,
        tier: "Tier 1",
        completeness: 78,
        isKey: false,
        children: [
          { code: "1.B.1", name: "Solid Fuels", emissions: 0.8, co2: 0.5, ch4: 0.2, n2o: 0.1, tier: "Tier 1", completeness: 75, isKey: false },
          { code: "1.B.2", name: "Oil and Natural Gas", emissions: 2.4, co2: 1.9, ch4: 0.3, n2o: 0.2, tier: "Tier 1", completeness: 80, isKey: false },
        ],
      },
    ],
  },
  ippu: {
    name: "IPPU",
    fullName: "Industrial Processes and Product Use",
    code: "2",
    icon: <Factory size={22} className="text-blue-600" />,
    iconBg: "bg-blue-100",
    totalEmissions: 5.96,
    description: "Emissions from industrial processes (6.3% of 94.9 MtCO2e). Dominated by cement production from 6 major plants. F-gases growing from refrigeration and air conditioning. Source: PRIMAP-hist v2.6 HISTCR.",
    gasBreakdown: [
      { gas: "CO2", value: 4.5, color: "bg-gray-500" },
      { gas: "HFCs", value: 1.0, color: "bg-purple-500" },
      { gas: "Other", value: 0.46, color: "bg-teal-500" },
    ],
    trend: [
      { year: 2018, value: 4.8 },
      { year: 2019, value: 5.1 },
      { year: 2020, value: 4.7 },
      { year: 2021, value: 5.5 },
      { year: 2022, value: 5.96 },
    ],
    categories: [
      {
        code: "2.A",
        name: "Mineral Industry",
        emissions: 1.9,
        co2: 1.9,
        ch4: 0.0,
        n2o: 0.0,
        tier: "Tier 2",
        completeness: 95,
        isKey: true,
        children: [
          { code: "2.A.1", name: "Cement Production", emissions: 1.5, co2: 1.5, ch4: 0.0, n2o: 0.0, tier: "Tier 2", completeness: 100, isKey: true },
          { code: "2.A.2", name: "Lime Production", emissions: 0.2, co2: 0.2, ch4: 0.0, n2o: 0.0, tier: "Tier 1", completeness: 90, isKey: false },
          { code: "2.A.4", name: "Other Uses of Carbonates", emissions: 0.2, co2: 0.2, ch4: 0.0, n2o: 0.0, tier: "Tier 1", completeness: 85, isKey: false },
        ],
      },
      { code: "2.B", name: "Chemical Industry", emissions: 0.3, co2: 0.2, ch4: 0.0, n2o: 0.1, tier: "Tier 1", completeness: 80, isKey: false },
      { code: "2.C", name: "Metal Industry", emissions: 0.2, co2: 0.2, ch4: 0.0, n2o: 0.0, tier: "Tier 1", completeness: 75, isKey: false },
      { code: "2.F", name: "Product Uses as ODS Substitutes", emissions: 0.7, co2: 0.0, ch4: 0.0, n2o: 0.0, tier: "Tier 1", completeness: 70, isKey: false },
    ],
  },
  agriculture: {
    name: "Agriculture",
    fullName: "Agriculture, Forestry and Other Land Use (Agriculture)",
    code: "3",
    icon: <Wheat size={22} className="text-green-600" />,
    iconBg: "bg-green-100",
    totalEmissions: 44.9,
    description: "Largest emitting sector (47.3% of 94.9 MtCO2e). Dominated by enteric fermentation from ~18M cattle (FAO: 56% of agriculture). Manure on pasture is second largest source. Tier 1 IPCC defaults used. Source: PRIMAP-hist v2.6 HISTCR.",
    gasBreakdown: [
      { gas: "CH4", value: 28.5, color: "bg-amber-500" },
      { gas: "N2O", value: 14.4, color: "bg-blue-500" },
      { gas: "CO2", value: 2.0, color: "bg-gray-500" },
    ],
    trend: [
      { year: 2018, value: 38.6 },
      { year: 2019, value: 39.8 },
      { year: 2020, value: 40.2 },
      { year: 2021, value: 42.5 },
      { year: 2022, value: 44.9 },
    ],
    categories: [
      {
        code: "3.A",
        name: "Livestock",
        emissions: 18.8,
        co2: 0.0,
        ch4: 15.2,
        n2o: 3.6,
        tier: "Tier 2",
        completeness: 95,
        isKey: true,
        children: [
          { code: "3.A.1", name: "Enteric Fermentation", emissions: 16.2, co2: 0.0, ch4: 16.2, n2o: 0.0, tier: "Tier 2", completeness: 98, isKey: true },
          { code: "3.A.2", name: "Manure Management", emissions: 2.6, co2: 0.0, ch4: 1.4, n2o: 1.2, tier: "Tier 1", completeness: 90, isKey: false },
        ],
      },
      {
        code: "3.C",
        name: "Aggregate Sources and Non-CO2",
        emissions: 6.8,
        co2: 1.0,
        ch4: 1.2,
        n2o: 4.6,
        tier: "Tier 1",
        completeness: 85,
        isKey: true,
        children: [
          { code: "3.C.1", name: "Biomass Burning", emissions: 0.8, co2: 0.3, ch4: 0.4, n2o: 0.1, tier: "Tier 1", completeness: 80, isKey: false },
          { code: "3.C.4", name: "Direct N2O from Managed Soils", emissions: 3.8, co2: 0.0, ch4: 0.0, n2o: 3.8, tier: "Tier 1", completeness: 85, isKey: true },
          { code: "3.C.5", name: "Indirect N2O from Managed Soils", emissions: 1.2, co2: 0.0, ch4: 0.0, n2o: 1.2, tier: "Tier 1", completeness: 80, isKey: false },
          { code: "3.C.7", name: "Rice Cultivations", emissions: 0.6, co2: 0.0, ch4: 0.6, n2o: 0.0, tier: "Tier 1", completeness: 75, isKey: false },
        ],
      },
    ],
  },
  lulucf: {
    name: "LULUCF",
    fullName: "Land Use, Land-Use Change and Forestry",
    code: "3B",
    icon: <TreePine size={22} className="text-emerald-600" />,
    iconBg: "bg-emerald-100",
    totalEmissions: -7.57,
    description: "Net carbon sink (-7.57 MtCO2e, 2021 est.). Forest cover ~7.4% of land area. Reforestation programs (incl. 15 billion tree campaign) partially offset deforestation. Note: LULUCF sign is methodology-dependent. Source: emission-index.com/EDGAR.",
    gasBreakdown: [
      { gas: "CO2 (removals)", value: -10.2, color: "bg-emerald-500" },
      { gas: "CO2 (emissions)", value: 2.3, color: "bg-gray-500" },
      { gas: "CH4/N2O", value: 0.33, color: "bg-amber-500" },
    ],
    trend: [
      { year: 2018, value: -6.5 },
      { year: 2019, value: -6.8 },
      { year: 2020, value: -6.9 },
      { year: 2021, value: -7.2 },
      { year: 2022, value: -7.57 },
    ],
    categories: [
      {
        code: "3B.1",
        name: "Forest Land",
        emissions: -9.8,
        co2: -10.0,
        ch4: 0.1,
        n2o: 0.1,
        tier: "Tier 2",
        completeness: 90,
        isKey: true,
        children: [
          { code: "3B.1.a", name: "Forest Land Remaining Forest Land", emissions: -11.2, co2: -11.4, ch4: 0.1, n2o: 0.1, tier: "Tier 2", completeness: 92, isKey: true },
          { code: "3B.1.b", name: "Land Converted to Forest Land", emissions: 1.4, co2: 1.4, ch4: 0.0, n2o: 0.0, tier: "Tier 1", completeness: 80, isKey: false },
        ],
      },
      {
        code: "3B.2",
        name: "Cropland",
        emissions: -1.2,
        co2: -1.3,
        ch4: 0.0,
        n2o: 0.1,
        tier: "Tier 1",
        completeness: 78,
        isKey: false,
        children: [
          { code: "3B.2.a", name: "Cropland Remaining Cropland", emissions: -0.4, co2: -0.5, ch4: 0.0, n2o: 0.1, tier: "Tier 1", completeness: 80, isKey: false },
          { code: "3B.2.b", name: "Land Converted to Cropland", emissions: -0.8, co2: -0.8, ch4: 0.0, n2o: 0.0, tier: "Tier 1", completeness: 75, isKey: false },
        ],
      },
      {
        code: "3B.3",
        name: "Grassland",
        emissions: -1.6,
        co2: -1.7,
        ch4: 0.0,
        n2o: 0.1,
        tier: "Tier 1",
        completeness: 72,
        isKey: false,
      },
      { code: "3B.4", name: "Wetlands", emissions: 0.1, co2: 0.0, ch4: 0.1, n2o: 0.0, tier: "Tier 1", completeness: 60, isKey: false },
      { code: "3B.5", name: "Settlements", emissions: 0.2, co2: 0.2, ch4: 0.0, n2o: 0.0, tier: "Tier 1", completeness: 65, isKey: false },
    ],
  },
  waste: {
    name: "Waste",
    fullName: "Waste",
    code: "4",
    icon: <Trash2 size={22} className="text-purple-600" />,
    iconBg: "bg-purple-100",
    totalEmissions: 3.1,
    description: "Smallest sector (3.3% of 94.9 MtCO2e). Methane from solid waste disposal is the primary source. Limited data — most waste goes to open dumpsites without weighbridges. Source: PRIMAP-hist v2.6 HISTCR (3,101 Gg CO2e).",
    gasBreakdown: [
      { gas: "CH4", value: 2.3, color: "bg-amber-500" },
      { gas: "N2O", value: 0.5, color: "bg-blue-500" },
      { gas: "CO2", value: 0.3, color: "bg-gray-500" },
    ],
    trend: [
      { year: 2018, value: 2.6 },
      { year: 2019, value: 2.7 },
      { year: 2020, value: 2.8 },
      { year: 2021, value: 2.9 },
      { year: 2022, value: 3.1 },
    ],
    categories: [
      {
        code: "4.A",
        name: "Solid Waste Disposal",
        emissions: 4.8,
        co2: 0.0,
        ch4: 4.8,
        n2o: 0.0,
        tier: "Tier 1",
        completeness: 85,
        isKey: true,
        children: [
          { code: "4.A.1", name: "Managed Waste Disposal Sites", emissions: 2.1, co2: 0.0, ch4: 2.1, n2o: 0.0, tier: "Tier 1", completeness: 90, isKey: false },
          { code: "4.A.2", name: "Unmanaged Waste Disposal Sites", emissions: 2.4, co2: 0.0, ch4: 2.4, n2o: 0.0, tier: "Tier 1", completeness: 80, isKey: true },
          { code: "4.A.3", name: "Uncategorized Waste Disposal", emissions: 0.3, co2: 0.0, ch4: 0.3, n2o: 0.0, tier: "Tier 1", completeness: 70, isKey: false },
        ],
      },
      { code: "4.B", name: "Biological Treatment of Solid Waste", emissions: 0.3, co2: 0.0, ch4: 0.2, n2o: 0.1, tier: "Tier 1", completeness: 70, isKey: false },
      { code: "4.C", name: "Incineration and Open Burning", emissions: 0.5, co2: 0.4, ch4: 0.0, n2o: 0.1, tier: "Tier 1", completeness: 65, isKey: false },
      {
        code: "4.D",
        name: "Wastewater Treatment and Discharge",
        emissions: 2.8,
        co2: 0.0,
        ch4: 1.8,
        n2o: 1.0,
        tier: "Tier 1",
        completeness: 80,
        isKey: true,
        children: [
          { code: "4.D.1", name: "Domestic Wastewater", emissions: 2.0, co2: 0.0, ch4: 1.3, n2o: 0.7, tier: "Tier 1", completeness: 82, isKey: false },
          { code: "4.D.2", name: "Industrial Wastewater", emissions: 0.8, co2: 0.0, ch4: 0.5, n2o: 0.3, tier: "Tier 1", completeness: 75, isKey: false },
        ],
      },
    ],
  },
};

/* ─── Recursive category tree row ─── */

function CategoryRow({
  cat,
  depth,
  expanded,
  onToggle,
}: {
  cat: SubCategory;
  depth: number;
  expanded: Record<string, boolean>;
  onToggle: (code: string) => void;
}) {
  const hasChildren = cat.children && cat.children.length > 0;
  const isExpanded = expanded[cat.code] ?? depth < 1;

  return (
    <>
      <tr className={depth === 0 ? "bg-gray-50/50 font-medium" : ""}>
        <td>
          <div
            className="flex items-center gap-1"
            style={{ paddingLeft: `${depth * 20}px` }}
          >
            {hasChildren ? (
              <button
                onClick={() => onToggle(cat.code)}
                className="p-0.5 rounded hover:bg-gray-100"
              >
                {isExpanded ? (
                  <ChevronDown size={14} className="text-gray-400" />
                ) : (
                  <ChevronRight size={14} className="text-gray-400" />
                )}
              </button>
            ) : (
              <span className="w-5" />
            )}
            <span className="font-mono text-xs text-gray-500">{cat.code}</span>
          </div>
        </td>
        <td>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${depth === 0 ? "font-semibold text-gray-900" : "text-gray-700"}`}>
              {cat.name}
            </span>
            {cat.isKey && (
              <Star size={12} className="text-amber-500 fill-amber-500" />
            )}
          </div>
        </td>
        <td>
          <span className={`font-mono text-sm ${cat.emissions < 0 ? "text-emerald-600" : "text-gray-900"}`}>
            {cat.emissions > 0 ? "+" : ""}{cat.emissions.toFixed(1)}
          </span>
        </td>
        <td className="font-mono text-xs text-gray-500">{cat.co2.toFixed(1)}</td>
        <td className="font-mono text-xs text-gray-500">{cat.ch4.toFixed(1)}</td>
        <td className="font-mono text-xs text-gray-500">{cat.n2o.toFixed(1)}</td>
        <td>
          <div className="flex items-center gap-2">
            <div className="progress-bar w-12">
              <div
                className={`progress-bar-fill ${cat.completeness >= 90 ? "primary" : cat.completeness >= 70 ? "accent" : "warning"}`}
                style={{ "--progress-width": `${cat.completeness}%` } as React.CSSProperties}
              />
            </div>
            <span className="text-[10px] text-gray-400">{cat.completeness}%</span>
          </div>
        </td>
        <td>
          <span className={cat.tier.includes("2") ? "badge-accent" : cat.tier.includes("3") ? "badge-primary" : "badge-neutral"}>
            {cat.tier}
          </span>
        </td>
      </tr>
      {isExpanded &&
        hasChildren &&
        cat.children!.map((child) => (
          <CategoryRow
            key={child.code}
            cat={child}
            depth={depth + 1}
            expanded={expanded}
            onToggle={onToggle}
          />
        ))}
    </>
  );
}

/* ─── Main Page ─── */

export default function SectorPage() {
  const params = useParams();
  const sectorSlug = params.sector as string;
  const sector = sectorData[sectorSlug];

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (code: string) => {
    setExpanded((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  if (!sector) {
    return (
      <div className="space-y-6">
        <Link
          href="/inventory"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Inventory
        </Link>
        <div className="card-elevated text-center py-16">
          <AlertCircle size={32} className="mx-auto mb-3 text-gray-300" />
          <h2 className="text-lg font-semibold text-gray-900">Sector Not Found</h2>
          <p className="text-sm text-gray-500 mt-1">
            The sector &quot;{sectorSlug}&quot; does not exist. Valid sectors: energy, ippu, agriculture, lulucf, waste.
          </p>
        </div>
      </div>
    );
  }

  const maxTrend = Math.max(...sector.trend.map((t) => Math.abs(t.value)));

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

      {/* Sector Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${sector.iconBg}`}>
            {sector.icon}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                Sector {sector.code}: {sector.name}
              </h1>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">{sector.fullName}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-lg font-bold ${sector.totalEmissions < 0 ? "text-emerald-700" : "text-gray-900"}`}>
                {sector.totalEmissions > 0 ? "+" : ""}{sector.totalEmissions.toFixed(1)} MtCO2eq
              </span>
              <span className="text-xs text-gray-400">(2022)</span>
            </div>
          </div>
        </div>
        <button className="btn-primary btn-sm">
          <Download size={14} />
          <span>Export Sector</span>
        </button>
      </div>

      {/* Description */}
      <div className="card-elevated animate-fade-up">
        <div className="flex items-start gap-2">
          <Info size={14} className="text-gray-400 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-600">{sector.description}</p>
        </div>
      </div>

      {/* Gas Breakdown + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up">
        {/* Emissions by Gas */}
        <div className="card-elevated">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Emissions by Gas Type
          </h2>
          <div className="space-y-3">
            {sector.gasBreakdown.map((g) => {
              const absMax = Math.max(...sector.gasBreakdown.map((gb) => Math.abs(gb.value)));
              const pct = (Math.abs(g.value) / absMax) * 100;
              return (
                <div key={g.gas}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{g.gas}</span>
                    <span className={`text-sm font-semibold ${g.value < 0 ? "text-emerald-600" : "text-gray-900"}`}>
                      {g.value > 0 ? "" : ""}{g.value.toFixed(1)} Mt CO2eq
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-bar-fill ${g.color}`}
                      style={{ "--progress-width": `${pct}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emissions Trend 2019-2023 */}
        <div className="card-elevated">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Emissions Trend (2019-2023)
          </h2>
          <div className="space-y-3">
            {sector.trend.map((t) => {
              const pct = (Math.abs(t.value) / maxTrend) * 100;
              return (
                <div key={t.year} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-500 w-10">{t.year}</span>
                  <div className="flex-1 progress-bar">
                    <div
                      className={`progress-bar-fill ${t.value < 0 ? "bg-emerald-500" : "bg-orange-400"}`}
                      style={{ "--progress-width": `${pct}%` } as React.CSSProperties}
                    />
                  </div>
                  <span className={`text-xs font-mono w-16 text-right ${t.value < 0 ? "text-emerald-600" : "text-gray-700"}`}>
                    {t.value > 0 ? "" : ""}{t.value.toFixed(1)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <TrendingUp size={12} />
              <span>
                {(() => {
                  const last = sector.trend[sector.trend.length - 1]!;
                  const first = sector.trend[0]!;
                  const pct = ((last.value - first.value) / Math.abs(first.value) * 100).toFixed(1);
                  return sector.totalEmissions >= 0
                    ? `+${pct}% change (2019-2023)`
                    : `${pct}% change (2019-2023)`;
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Hierarchy Table */}
      <div className="card-elevated animate-fade-up">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              IPCC Category Hierarchy
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              <Star size={10} className="inline text-amber-500 fill-amber-500" /> = Key Category
            </p>
          </div>
          <span className="text-xs text-gray-400">
            {sector.categories.length} top-level categories
          </span>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Category</th>
                <th>MtCO2eq</th>
                <th>CO2</th>
                <th>CH4</th>
                <th>N2O</th>
                <th>Completeness</th>
                <th>Tier</th>
              </tr>
            </thead>
            <tbody>
              {sector.categories.map((cat) => (
                <CategoryRow
                  key={cat.code}
                  cat={cat}
                  depth={0}
                  expanded={expanded}
                  onToggle={toggleExpand}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Categories */}
      <div className="card-elevated animate-fade-up">
        <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Star size={14} className="text-amber-500 fill-amber-500" />
          Key Categories
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Categories that contribute significantly to national emissions totals or trends.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {getAllKeyCategories(sector.categories).map((cat) => (
            <div
              key={cat.code}
              className="flex items-center justify-between p-3 rounded-xl border border-amber-100 bg-amber-50/50"
            >
              <div>
                <span className="font-mono text-xs text-amber-600">{cat.code}</span>
                <p className="text-sm font-medium text-gray-900">{cat.name}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${cat.emissions < 0 ? "text-emerald-600" : "text-gray-900"}`}>
                  {cat.emissions > 0 ? "+" : ""}{cat.emissions.toFixed(1)} Mt
                </p>
                <span className={cat.tier.includes("2") ? "badge-accent" : "badge-neutral"}>
                  {cat.tier}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Helper to extract all key categories recursively */
function getAllKeyCategories(cats: SubCategory[]): SubCategory[] {
  const result: SubCategory[] = [];
  for (const cat of cats) {
    if (cat.isKey) result.push(cat);
    if (cat.children) {
      result.push(...getAllKeyCategories(cat.children));
    }
  }
  return result;
}
