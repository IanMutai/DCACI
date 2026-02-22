"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  Truck,
  Factory,
  Leaf,
  Trash2,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Download,
  BarChart3,
  PieChart,
  MapPin,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Database,
  ArrowUpRight,
  Filter,
  Layers,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface Subcategory {
  id: string;
  code: string;
  name: string;
  emissions: number;
  previousYear: number;
  change: number;
  dataCompleteness: number;
  activityTypes: number;
  topDown: number;
  bottomUp: number;
}

interface CountyData {
  code: string;
  name: string;
  emissions: number;
  share: number;
  facilities: number;
  dataCompleteness: number;
  lastReported: string;
}

interface ActivityData {
  id: string;
  name: string;
  emissionFactor: number;
  unit: string;
  totalActivity: number;
  emissions: number;
  source: string;
  tier: 1 | 2 | 3;
  uncertainty: number;
}

const sectorConfig: Record<string, {
  name: string;
  fullName: string;
  icon: typeof Zap;
  color: string;
  description: string;
}> = {
  energy: {
    name: "Energy",
    fullName: "1. Energy",
    icon: Zap,
    color: "amber",
    description: "Emissions from fuel combustion and fugitive emissions from fuels",
  },
  transport: {
    name: "Transport",
    fullName: "1A3. Transport",
    icon: Truck,
    color: "blue",
    description: "Emissions from road, rail, aviation, navigation, and other transport",
  },
  ippu: {
    name: "IPPU",
    fullName: "2. Industrial Processes & Product Use",
    icon: Factory,
    color: "slate",
    description: "Emissions from industrial processes and use of products",
  },
  agriculture: {
    name: "Agriculture",
    fullName: "3A. Agriculture",
    icon: Leaf,
    color: "emerald",
    description: "Emissions from enteric fermentation, manure management, and agricultural soils",
  },
  lulucf: {
    name: "LULUCF",
    fullName: "3B. Land Use, Land-Use Change & Forestry",
    icon: Leaf,
    color: "green",
    description: "Net emissions and removals from land use changes and forestry",
  },
  waste: {
    name: "Waste",
    fullName: "4. Waste",
    icon: Trash2,
    color: "violet",
    description: "Emissions from solid waste disposal, wastewater, and waste incineration",
  },
};

// Mock subcategory data
const getSubcategories = (sectorId: string): Subcategory[] => {
  const subcategoryData: Record<string, Subcategory[]> = {
    energy: [
      { id: "1A1", code: "1A1", name: "Energy Industries", emissions: 4200000, previousYear: 4500000, change: -6.7, dataCompleteness: 95, activityTypes: 5, topDown: 4300000, bottomUp: 4200000 },
      { id: "1A2", code: "1A2", name: "Manufacturing & Construction", emissions: 3100000, previousYear: 3000000, change: 3.3, dataCompleteness: 88, activityTypes: 6, topDown: 3200000, bottomUp: 3100000 },
      { id: "1A4", code: "1A4", name: "Other Sectors (Residential, Commercial)", emissions: 2800000, previousYear: 2900000, change: -3.4, dataCompleteness: 75, activityTypes: 4, topDown: 3000000, bottomUp: 2800000 },
      { id: "1B", code: "1B", name: "Fugitive Emissions from Fuels", emissions: 5100000, previousYear: 5400000, change: -5.6, dataCompleteness: 82, activityTypes: 3, topDown: 5000000, bottomUp: 5100000 },
    ],
    transport: [
      { id: "1A3a", code: "1A3a", name: "Civil Aviation", emissions: 450000, previousYear: 420000, change: 7.1, dataCompleteness: 92, activityTypes: 2, topDown: 480000, bottomUp: 450000 },
      { id: "1A3b", code: "1A3b", name: "Road Transportation", emissions: 6800000, previousYear: 6500000, change: 4.6, dataCompleteness: 85, activityTypes: 6, topDown: 7200000, bottomUp: 6800000 },
      { id: "1A3c", code: "1A3c", name: "Railways", emissions: 120000, previousYear: 130000, change: -7.7, dataCompleteness: 90, activityTypes: 2, topDown: 125000, bottomUp: 120000 },
      { id: "1A3d", code: "1A3d", name: "Water-borne Navigation", emissions: 280000, previousYear: 260000, change: 7.7, dataCompleteness: 65, activityTypes: 2, topDown: 320000, bottomUp: 280000 },
      { id: "1A3e", code: "1A3e", name: "Other Transportation", emissions: 850000, previousYear: 890000, change: -4.5, dataCompleteness: 70, activityTypes: 2, topDown: 900000, bottomUp: 850000 },
    ],
    agriculture: [
      { id: "3A1", code: "3A1", name: "Enteric Fermentation", emissions: 6200000, previousYear: 6400000, change: -3.1, dataCompleteness: 88, activityTypes: 8, topDown: 6300000, bottomUp: 6200000 },
      { id: "3A2", code: "3A2", name: "Manure Management", emissions: 1800000, previousYear: 1750000, change: 2.9, dataCompleteness: 82, activityTypes: 6, topDown: 1850000, bottomUp: 1800000 },
      { id: "3C", code: "3C", name: "Aggregate Sources (Rice, Burning)", emissions: 2400000, previousYear: 2500000, change: -4.0, dataCompleteness: 78, activityTypes: 4, topDown: 2500000, bottomUp: 2400000 },
      { id: "3C4", code: "3C4", name: "Agricultural Soils", emissions: 2400000, previousYear: 2550000, change: -5.9, dataCompleteness: 75, activityTypes: 4, topDown: 2350000, bottomUp: 2400000 },
    ],
    waste: [
      { id: "4A", code: "4A", name: "Solid Waste Disposal", emissions: 2100000, previousYear: 2000000, change: 5.0, dataCompleteness: 72, activityTypes: 3, topDown: 2300000, bottomUp: 2100000 },
      { id: "4B", code: "4B", name: "Biological Treatment", emissions: 180000, previousYear: 170000, change: 5.9, dataCompleteness: 65, activityTypes: 2, topDown: 200000, bottomUp: 180000 },
      { id: "4C", code: "4C", name: "Incineration & Open Burning", emissions: 320000, previousYear: 350000, change: -8.6, dataCompleteness: 58, activityTypes: 2, topDown: 380000, bottomUp: 320000 },
      { id: "4D", code: "4D", name: "Wastewater Treatment", emissions: 1600000, previousYear: 1580000, change: 1.3, dataCompleteness: 68, activityTypes: 3, topDown: 1620000, bottomUp: 1600000 },
    ],
    lulucf: [
      { id: "3B1", code: "3B1", name: "Forest Land", emissions: -3200000, previousYear: -2900000, change: 10.3, dataCompleteness: 78, activityTypes: 4, topDown: -3000000, bottomUp: -3200000 },
      { id: "3B2", code: "3B2", name: "Cropland", emissions: 450000, previousYear: 480000, change: -6.3, dataCompleteness: 72, activityTypes: 3, topDown: 470000, bottomUp: 450000 },
      { id: "3B3", code: "3B3", name: "Grassland", emissions: 180000, previousYear: 170000, change: 5.9, dataCompleteness: 65, activityTypes: 3, topDown: 200000, bottomUp: 180000 },
      { id: "3B5", code: "3B5", name: "Settlements", emissions: 70000, previousYear: 50000, change: 40.0, dataCompleteness: 60, activityTypes: 2, topDown: 80000, bottomUp: 70000 },
    ],
    ippu: [
      { id: "2A", code: "2A", name: "Mineral Industry", emissions: 2800000, previousYear: 2700000, change: 3.7, dataCompleteness: 75, activityTypes: 4, topDown: 2900000, bottomUp: 2800000 },
      { id: "2B", code: "2B", name: "Chemical Industry", emissions: 1200000, previousYear: 1150000, change: 4.3, dataCompleteness: 68, activityTypes: 3, topDown: 1300000, bottomUp: 1200000 },
      { id: "2C", code: "2C", name: "Metal Industry", emissions: 950000, previousYear: 900000, change: 5.6, dataCompleteness: 62, activityTypes: 3, topDown: 1000000, bottomUp: 950000 },
      { id: "2D", code: "2D", name: "Non-Energy Products", emissions: 850000, previousYear: 850000, change: 0.0, dataCompleteness: 55, activityTypes: 2, topDown: 1000000, bottomUp: 850000 },
    ],
  };
  return subcategoryData[sectorId] || [];
};

// Mock county data
const getCountyData = (sectorId: string): CountyData[] => {
  return [
    { code: "KE-030", name: "Nairobi", emissions: 2800000, share: 18.4, facilities: 145, dataCompleteness: 92, lastReported: "2024-01-18" },
    { code: "KE-001", name: "Mombasa", emissions: 1950000, share: 12.8, facilities: 78, dataCompleteness: 88, lastReported: "2024-01-17" },
    { code: "KE-032", name: "Nakuru", emissions: 1200000, share: 7.9, facilities: 52, dataCompleteness: 82, lastReported: "2024-01-16" },
    { code: "KE-022", name: "Kisumu", emissions: 980000, share: 6.4, facilities: 38, dataCompleteness: 78, lastReported: "2024-01-15" },
    { code: "KE-047", name: "Narok", emissions: 850000, share: 5.6, facilities: 24, dataCompleteness: 72, lastReported: "2024-01-14" },
    { code: "KE-036", name: "Bomet", emissions: 720000, share: 4.7, facilities: 18, dataCompleteness: 68, lastReported: "2024-01-12" },
    { code: "KE-042", name: "Uasin Gishu", emissions: 680000, share: 4.5, facilities: 32, dataCompleteness: 75, lastReported: "2024-01-13" },
    { code: "KE-012", name: "Meru", emissions: 620000, share: 4.1, facilities: 28, dataCompleteness: 70, lastReported: "2024-01-10" },
  ];
};

function formatEmissions(value: number): string {
  const absValue = Math.abs(value);
  if (absValue >= 1000000) {
    return `${value < 0 ? "-" : ""}${(absValue / 1000000).toFixed(2)}M`;
  }
  if (absValue >= 1000) {
    return `${value < 0 ? "-" : ""}${(absValue / 1000).toFixed(0)}K`;
  }
  return value.toLocaleString();
}

export default function SectorDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<"subcategories" | "counties" | "activity" | "qa">("subcategories");

  const sector = sectorConfig[id] || sectorConfig.energy;
  const subcategories = getSubcategories(id);
  const countyData = getCountyData(id);
  const Icon = sector.icon;

  const totalEmissions = subcategories.reduce((sum, s) => sum + s.emissions, 0);
  const avgCompleteness = Math.round(
    subcategories.reduce((sum, s) => sum + s.dataCompleteness, 0) / subcategories.length
  );

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/mrv/sectors"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary))] transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/dashboard/mrv" className="hover:text-[hsl(var(--primary))]">
              MRV System
            </Link>
            <span>/</span>
            <Link href="/dashboard/mrv/sectors" className="hover:text-[hsl(var(--primary))]">
              Sectors
            </Link>
            <span>/</span>
            <span>{sector.name}</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            {sector.fullName}
          </h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
          <Download className="h-4 w-4" />
          Export Sector Data
        </button>
      </div>

      {/* Sector Overview */}
      <div className={`card bg-gradient-to-br from-${sector.color}-50 to-${sector.color}-100/50 border-${sector.color}-200`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-${sector.color}-500`}>
              <Icon className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">{sector.name} Sector</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{sector.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-3xl font-bold ${totalEmissions < 0 ? "text-emerald-600" : "text-[hsl(var(--foreground))]"}`}>
              {formatEmissions(totalEmissions)}
            </p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">tCO2e total emissions</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Subcategories</p>
            <p className="text-xl font-bold text-[hsl(var(--foreground))]">{subcategories.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Activity Types</p>
            <p className="text-xl font-bold text-[hsl(var(--foreground))]">
              {subcategories.reduce((sum, s) => sum + s.activityTypes, 0)}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Counties Reporting</p>
            <p className="text-xl font-bold text-[hsl(var(--foreground))]">{countyData.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Data Completeness</p>
            <p className={`text-xl font-bold ${
              avgCompleteness >= 80 ? "text-emerald-600" :
              avgCompleteness >= 60 ? "text-amber-600" : "text-red-600"
            }`}>
              {avgCompleteness}%
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-2xl bg-[hsl(var(--secondary))] p-1.5">
        {[
          { id: "subcategories" as const, label: "Subcategories", icon: Layers },
          { id: "counties" as const, label: "County Data", icon: MapPin },
          { id: "activity" as const, label: "Activity Data", icon: Database },
          { id: "qa" as const, label: "QA/QC", icon: CheckCircle },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-[hsl(var(--foreground))] shadow-sm"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              <TabIcon className={`h-4 w-4 ${isActive ? "text-[hsl(var(--primary))]" : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Subcategories Tab */}
      {activeTab === "subcategories" && (
        <div className="space-y-4">
          {subcategories.map((sub) => {
            const discrepancy = Math.abs(sub.topDown - sub.bottomUp);
            const discrepancyPercent = ((discrepancy / Math.abs(sub.topDown)) * 100).toFixed(1);
            const hasDiscrepancy = parseFloat(discrepancyPercent) > 5;

            return (
              <div key={sub.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium bg-[hsl(var(--secondary))] px-2 py-0.5 rounded">
                        {sub.code}
                      </span>
                      {hasDiscrepancy && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                          <AlertTriangle className="h-3 w-3" />
                          {discrepancyPercent}% discrepancy
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-[hsl(var(--foreground))] mt-1">{sub.name}</h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                      {sub.activityTypes} activity types
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${sub.emissions < 0 ? "text-emerald-600" : "text-[hsl(var(--foreground))]"}`}>
                      {formatEmissions(sub.emissions)}
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">tCO2e</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Previous Year</p>
                    <p className="text-sm font-bold text-[hsl(var(--foreground))]">
                      {formatEmissions(sub.previousYear)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)]">
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">YoY Change</p>
                    <p className={`text-sm font-bold flex items-center gap-1 ${
                      sub.change < 0 ? "text-emerald-600" : "text-red-600"
                    }`}>
                      {sub.change < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                      {Math.abs(sub.change)}%
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50">
                    <p className="text-xs text-blue-600">Top-Down</p>
                    <p className="text-sm font-bold text-blue-700">{formatEmissions(sub.topDown)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-violet-50">
                    <p className="text-xs text-violet-600">Bottom-Up</p>
                    <p className="text-sm font-bold text-violet-700">{formatEmissions(sub.bottomUp)}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[hsl(var(--muted-foreground))]">Data Completeness</span>
                    <span className={`font-medium ${
                      sub.dataCompleteness >= 80 ? "text-emerald-600" :
                      sub.dataCompleteness >= 60 ? "text-amber-600" : "text-red-600"
                    }`}>
                      {sub.dataCompleteness}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[hsl(var(--secondary))]">
                    <div
                      className={`h-1.5 rounded-full ${
                        sub.dataCompleteness >= 80 ? "bg-emerald-500" :
                        sub.dataCompleteness >= 60 ? "bg-amber-500" : "bg-red-500"
                      }`}
                      style={{ width: `${sub.dataCompleteness}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* County Data Tab */}
      {activeTab === "counties" && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                County-Level Emissions
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Bottom-up data aggregated from county reports
              </p>
            </div>
            <Link
              href="/dashboard/mrv/counties"
              className="text-sm font-medium text-[hsl(var(--primary))] hover:underline"
            >
              View All Counties →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    County
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Emissions
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Share
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Facilities
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Completeness
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Last Reported
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {countyData.map((county) => (
                  <tr key={county.code} className="hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                    <td className="px-4 py-4">
                      <Link
                        href={`/dashboard/mrv/counties/${county.code}`}
                        className="flex items-center gap-2 hover:text-[hsl(var(--primary))]"
                      >
                        <MapPin className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                        <span className="font-medium text-[hsl(var(--foreground))]">{county.name}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-[hsl(var(--foreground))]">
                      {formatEmissions(county.emissions)} tCO2e
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-[hsl(var(--foreground))]">
                      {county.share.toFixed(1)}%
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-[hsl(var(--foreground))]">
                      {county.facilities}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`text-sm font-medium ${
                        county.dataCompleteness >= 80 ? "text-emerald-600" :
                        county.dataCompleteness >= 60 ? "text-amber-600" : "text-red-600"
                      }`}>
                        {county.dataCompleteness}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-[hsl(var(--muted-foreground))]">
                      {new Date(county.lastReported).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Activity Data Tab */}
      {activeTab === "activity" && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                Activity Data & Emission Factors
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Detailed activity data used in emissions calculations
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
          <div className="space-y-3">
            {[
              { id: "AD-001", name: "Electricity Generation - Grid", emissionFactor: 0.52, unit: "tCO2e/MWh", totalActivity: 8500000, emissions: 4420000, source: "KPLC", tier: 2, uncertainty: 8 },
              { id: "AD-002", name: "Diesel Consumption - Industry", emissionFactor: 2.68, unit: "tCO2e/kL", totalActivity: 850000, emissions: 2278000, source: "KRA", tier: 2, uncertainty: 5 },
              { id: "AD-003", name: "Natural Gas - Commercial", emissionFactor: 1.89, unit: "tCO2e/1000m³", totalActivity: 420000, emissions: 793800, source: "KNCPC", tier: 2, uncertainty: 10 },
              { id: "AD-004", name: "LPG - Residential", emissionFactor: 2.98, unit: "tCO2e/tonne", totalActivity: 180000, emissions: 536400, source: "EPRA", tier: 1, uncertainty: 15 },
              { id: "AD-005", name: "Charcoal Production", emissionFactor: 9.2, unit: "tCO2e/tonne", totalActivity: 250000, emissions: 2300000, source: "KFS", tier: 1, uncertainty: 25 },
            ].map((activity) => (
              <div key={activity.id} className="p-4 rounded-xl border border-[hsl(var(--border))]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{activity.id}</span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        activity.tier === 3 ? "bg-emerald-100 text-emerald-700" :
                        activity.tier === 2 ? "bg-blue-100 text-blue-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        Tier {activity.tier}
                      </span>
                    </div>
                    <h4 className="font-medium text-[hsl(var(--foreground))] mt-1">{activity.name}</h4>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Source: {activity.source}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[hsl(var(--foreground))]">
                      {formatEmissions(activity.emissions)}
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">tCO2e</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-3 text-xs">
                  <div>
                    <p className="text-[hsl(var(--muted-foreground))]">Emission Factor</p>
                    <p className="font-medium text-[hsl(var(--foreground))]">{activity.emissionFactor} {activity.unit}</p>
                  </div>
                  <div>
                    <p className="text-[hsl(var(--muted-foreground))]">Activity Data</p>
                    <p className="font-medium text-[hsl(var(--foreground))]">{activity.totalActivity.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[hsl(var(--muted-foreground))]">Uncertainty</p>
                    <p className={`font-medium ${
                      activity.uncertainty <= 10 ? "text-emerald-600" :
                      activity.uncertainty <= 20 ? "text-amber-600" : "text-red-600"
                    }`}>±{activity.uncertainty}%</p>
                  </div>
                  <div>
                    <p className="text-[hsl(var(--muted-foreground))]">IPCC Category</p>
                    <p className="font-medium text-[hsl(var(--foreground))]">1A1a</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QA/QC Tab */}
      {activeTab === "qa" && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Quality Assurance / Quality Control Status
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-emerald-50 text-center">
                <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto" />
                <p className="text-2xl font-bold text-emerald-700 mt-2">12</p>
                <p className="text-sm text-emerald-600">Checks Passed</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 text-center">
                <AlertTriangle className="h-8 w-8 text-amber-600 mx-auto" />
                <p className="text-2xl font-bold text-amber-700 mt-2">3</p>
                <p className="text-sm text-amber-600">Warnings</p>
              </div>
              <div className="p-4 rounded-xl bg-red-50 text-center">
                <AlertTriangle className="h-8 w-8 text-red-600 mx-auto" />
                <p className="text-2xl font-bold text-red-700 mt-2">1</p>
                <p className="text-sm text-red-600">Issues</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { check: "Time series consistency", status: "PASSED", details: "No significant breaks in time series" },
                { check: "Emission factor validation", status: "PASSED", details: "All EFs within IPCC default ranges" },
                { check: "Activity data completeness", status: "WARNING", details: "Missing data for 3 subcategories" },
                { check: "Top-down/Bottom-up reconciliation", status: "WARNING", details: "5.2% discrepancy in transport subsector" },
                { check: "Documentation completeness", status: "PASSED", details: "All methodology documentation available" },
                { check: "Uncertainty assessment", status: "ISSUE", details: "Uncertainty analysis incomplete for LULUCF" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border ${
                    item.status === "PASSED" ? "border-emerald-200 bg-emerald-50/50" :
                    item.status === "WARNING" ? "border-amber-200 bg-amber-50/50" :
                    "border-red-200 bg-red-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {item.status === "PASSED" ? (
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                      ) : item.status === "WARNING" ? (
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium text-[hsl(var(--foreground))]">{item.check}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{item.details}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${
                      item.status === "PASSED" ? "text-emerald-600" :
                      item.status === "WARNING" ? "text-amber-600" : "text-red-600"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
