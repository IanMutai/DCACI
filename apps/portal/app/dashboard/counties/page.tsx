"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Leaf,
  Banknote,
  Factory,
  Users,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";

interface County {
  code: string;
  name: string;
  region: string;
  population: number;
  totalEmissions: number;
  emissionsChange: number;
  climateFinance: number;
  activeProjects: number;
  creditsIssued: number;
  dominantSectors: string[];
}

const mockCounties: County[] = [
  {
    code: "KE-030",
    name: "Nairobi",
    region: "Central",
    population: 4397073,
    totalEmissions: 8500000,
    emissionsChange: -2.3,
    climateFinance: 12500000000,
    activeProjects: 15,
    creditsIssued: 450000,
    dominantSectors: ["Transport", "Energy", "Waste"],
  },
  {
    code: "KE-001",
    name: "Mombasa",
    region: "Coast",
    population: 1208333,
    totalEmissions: 3200000,
    emissionsChange: -1.8,
    climateFinance: 4800000000,
    activeProjects: 8,
    creditsIssued: 180000,
    dominantSectors: ["Transport", "Industry", "Forestry"],
  },
  {
    code: "KE-010",
    name: "Marsabit",
    region: "North Eastern",
    population: 459785,
    totalEmissions: 850000,
    emissionsChange: -5.2,
    climateFinance: 3200000000,
    activeProjects: 6,
    creditsIssued: 320000,
    dominantSectors: ["Energy", "Agriculture"],
  },
  {
    code: "KE-015",
    name: "Kitui",
    region: "Eastern",
    population: 1136187,
    totalEmissions: 1450000,
    emissionsChange: -3.1,
    climateFinance: 2100000000,
    activeProjects: 5,
    creditsIssued: 95000,
    dominantSectors: ["Agriculture", "Forestry"],
  },
  {
    code: "KE-037",
    name: "Kakamega",
    region: "Western",
    population: 1867579,
    totalEmissions: 1200000,
    emissionsChange: -4.5,
    climateFinance: 1800000000,
    activeProjects: 7,
    creditsIssued: 210000,
    dominantSectors: ["Forestry", "Agriculture"],
  },
  {
    code: "KE-028",
    name: "Nakuru",
    region: "Rift Valley",
    population: 2162202,
    totalEmissions: 2800000,
    emissionsChange: -1.2,
    climateFinance: 3500000000,
    activeProjects: 9,
    creditsIssued: 175000,
    dominantSectors: ["Energy", "Agriculture", "Industry"],
  },
  {
    code: "KE-009",
    name: "Turkana",
    region: "North Eastern",
    population: 926976,
    totalEmissions: 420000,
    emissionsChange: -6.8,
    climateFinance: 2800000000,
    activeProjects: 4,
    creditsIssued: 85000,
    dominantSectors: ["Energy", "Agriculture"],
  },
  {
    code: "KE-022",
    name: "Kiambu",
    region: "Central",
    population: 2417735,
    totalEmissions: 3100000,
    emissionsChange: -0.8,
    climateFinance: 2200000000,
    activeProjects: 6,
    creditsIssued: 120000,
    dominantSectors: ["Agriculture", "Waste", "Industry"],
  },
  {
    code: "KE-047",
    name: "Narok",
    region: "Rift Valley",
    population: 1157873,
    totalEmissions: 1850000,
    emissionsChange: -2.9,
    climateFinance: 1500000000,
    activeProjects: 5,
    creditsIssued: 280000,
    dominantSectors: ["Forestry", "Agriculture"],
  },
  {
    code: "KE-003",
    name: "Kilifi",
    region: "Coast",
    population: 1453787,
    totalEmissions: 980000,
    emissionsChange: -3.4,
    climateFinance: 1200000000,
    activeProjects: 4,
    creditsIssued: 95000,
    dominantSectors: ["Forestry", "Agriculture", "Energy"],
  },
];

const regions = [...new Set(mockCounties.map((c) => c.region))];

function formatNumber(num: number, compact = false): string {
  if (compact) {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toLocaleString();
}

export default function CountiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"emissions" | "finance" | "projects" | "name">("emissions");

  const filteredCounties = mockCounties
    .filter((county) => {
      const matchesSearch =
        county.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        county.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = regionFilter === "ALL" || county.region === regionFilter;
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "emissions") return b.totalEmissions - a.totalEmissions;
      if (sortBy === "finance") return b.climateFinance - a.climateFinance;
      if (sortBy === "projects") return b.activeProjects - a.activeProjects;
      return 0;
    });

  const totalStats = {
    totalEmissions: filteredCounties.reduce((sum, c) => sum + c.totalEmissions, 0),
    totalFinance: filteredCounties.reduce((sum, c) => sum + c.climateFinance, 0),
    totalProjects: filteredCounties.reduce((sum, c) => sum + c.activeProjects, 0),
    totalCredits: filteredCounties.reduce((sum, c) => sum + c.creditsIssued, 0),
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(174_40%_40%)]">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">
              County Dashboard
            </h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Sub-national climate data for Kenya&apos;s 47 counties
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/counties/compare"
          className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors"
        >
          <BarChart3 className="h-4 w-4" />
          Compare Counties
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <Factory className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Emissions</p>
              <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                {formatNumber(totalStats.totalEmissions, true)} tCO2e
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <Banknote className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Climate Finance</p>
              <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                KES {formatNumber(totalStats.totalFinance, true)}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Active Projects</p>
              <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                {totalStats.totalProjects}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
              <Leaf className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Credits Issued</p>
              <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                {formatNumber(totalStats.totalCredits, true)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="card">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
          Kenya County Map
        </h2>
        <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.5)]">
          <div className="text-center">
            <MapPin className="mx-auto h-12 w-12 text-[hsl(var(--muted-foreground)/0.3)]" />
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              Interactive county map will render here
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground)/0.7)]">
              Shows emissions intensity by county
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search counties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="ALL">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-xl border border-[hsl(var(--border))] bg-white px-3 py-2.5 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
          >
            <option value="emissions">Sort by Emissions</option>
            <option value="finance">Sort by Finance</option>
            <option value="projects">Sort by Projects</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Counties Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCounties.map((county) => (
          <Link
            key={county.code}
            href={`/dashboard/counties/${county.code}`}
            className="card hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
                  {county.code}
                </span>
                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                  {county.name}
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{county.region}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-1">
                  <Factory className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">Emissions</span>
                </div>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                  {formatNumber(county.totalEmissions, true)} tCO2e
                </p>
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                    county.emissionsChange < 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {county.emissionsChange < 0 ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : (
                    <TrendingUp className="h-3 w-3" />
                  )}
                  {Math.abs(county.emissionsChange)}%
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <Banknote className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">Finance</span>
                </div>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                  KES {formatNumber(county.climateFinance, true)}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">Projects</span>
                </div>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                  {county.activeProjects} active
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <Leaf className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">Credits</span>
                </div>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                  {formatNumber(county.creditsIssued, true)}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
              <div className="flex items-center gap-1">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Key Sectors:</span>
                {county.dominantSectors.map((sector) => (
                  <span
                    key={sector}
                    className="text-xs bg-[hsl(var(--secondary))] px-1.5 py-0.5 rounded"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
