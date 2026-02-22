"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  Building2,
  Factory,
  Zap,
  Truck,
  Leaf,
  Trash2,
  BarChart3,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Users,
  ChevronRight,
  Database,
  RefreshCw,
} from "lucide-react";

interface PageProps {
  params: Promise<{ code: string }>;
}

interface FacilityData {
  id: string;
  name: string;
  type: string;
  sector: string;
  emissions: number;
  lastReported: string;
  status: "VERIFIED" | "PENDING" | "FLAGGED";
}

interface DataSubmission {
  id: string;
  period: string;
  sector: string;
  dataPoints: number;
  emissions: number;
  submittedAt: string;
  submittedBy: string;
  status: "APPROVED" | "PENDING_REVIEW" | "REQUIRES_REVISION";
}

// Mock county lookup
const getCountyData = (code: string) => {
  const counties: Record<string, {
    name: string;
    region: string;
    population: number;
    area: number;
    climateOfficer: string;
    climateOfficerEmail: string;
  }> = {
    "KE-030": { name: "Nairobi", region: "Central", population: 4397073, area: 696, climateOfficer: "John Kamau", climateOfficerEmail: "climate@nairobi.go.ke" },
    "KE-001": { name: "Mombasa", region: "Coast", population: 1208333, area: 212, climateOfficer: "Fatuma Ali", climateOfficerEmail: "climate@mombasa.go.ke" },
    "KE-032": { name: "Nakuru", region: "Rift Valley", population: 2162202, area: 7495, climateOfficer: "Grace Wanjiku", climateOfficerEmail: "climate@nakuru.go.ke" },
    "KE-010": { name: "Marsabit", region: "North Eastern", population: 459785, area: 66923, climateOfficer: "Hassan Mohamed", climateOfficerEmail: "climate@marsabit.go.ke" },
  };
  return counties[code] || { name: "County", region: "Unknown", population: 0, area: 0, climateOfficer: "N/A", climateOfficerEmail: "" };
};

const mockFacilities: FacilityData[] = [
  { id: "FAC-001", name: "Kenya Power - Nairobi Grid", type: "Power Generation", sector: "Energy", emissions: 850000, lastReported: "2024-01-18", status: "VERIFIED" },
  { id: "FAC-002", name: "Bamburi Cement Plant", type: "Cement Production", sector: "IPPU", emissions: 620000, lastReported: "2024-01-15", status: "VERIFIED" },
  { id: "FAC-003", name: "Dandora Landfill", type: "Solid Waste Disposal", sector: "Waste", emissions: 420000, lastReported: "2024-01-10", status: "PENDING" },
  { id: "FAC-004", name: "KenGen Olkaria", type: "Geothermal", sector: "Energy", emissions: 35000, lastReported: "2024-01-17", status: "VERIFIED" },
  { id: "FAC-005", name: "Total Energies Depot", type: "Fuel Distribution", sector: "Energy", emissions: 180000, lastReported: "2024-01-12", status: "FLAGGED" },
];

const mockSubmissions: DataSubmission[] = [
  { id: "SUB-001", period: "Q4 2023", sector: "Energy", dataPoints: 245, emissions: 1850000, submittedAt: "2024-01-18", submittedBy: "County Data Officer", status: "APPROVED" },
  { id: "SUB-002", period: "Q4 2023", sector: "Transport", dataPoints: 180, emissions: 1250000, submittedAt: "2024-01-16", submittedBy: "County Data Officer", status: "APPROVED" },
  { id: "SUB-003", period: "Q4 2023", sector: "Waste", dataPoints: 85, emissions: 420000, submittedAt: "2024-01-15", submittedBy: "County Data Officer", status: "PENDING_REVIEW" },
  { id: "SUB-004", period: "Q4 2023", sector: "Agriculture", dataPoints: 320, emissions: 680000, submittedAt: "2024-01-14", submittedBy: "Agri Extension Officer", status: "REQUIRES_REVISION" },
];

const sectorBreakdown = [
  { sector: "Energy", icon: Zap, color: "amber", emissions: 3200000, share: 37.6, facilities: 45, trend: -2.5 },
  { sector: "Transport", icon: Truck, color: "blue", emissions: 4100000, share: 48.2, facilities: 0, trend: 3.2 },
  { sector: "Agriculture", icon: Leaf, color: "emerald", emissions: 200000, share: 2.4, facilities: 12, trend: -5.1 },
  { sector: "Waste", icon: Trash2, color: "violet", emissions: 1000000, share: 11.8, facilities: 8, trend: 1.8 },
];

const submissionStatusConfig = {
  APPROVED: { label: "Approved", icon: CheckCircle, color: "emerald" },
  PENDING_REVIEW: { label: "Pending Review", icon: Clock, color: "amber" },
  REQUIRES_REVISION: { label: "Requires Revision", icon: AlertTriangle, color: "red" },
};

const facilityStatusConfig = {
  VERIFIED: { label: "Verified", color: "emerald" },
  PENDING: { label: "Pending", color: "amber" },
  FLAGGED: { label: "Flagged", color: "red" },
};

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toLocaleString();
}

export default function CountyMRVDetailPage({ params }: PageProps) {
  const { code } = use(params);
  const [activeTab, setActiveTab] = useState<"overview" | "facilities" | "submissions" | "trends">("overview");

  const county = getCountyData(code);
  const totalEmissions = sectorBreakdown.reduce((sum, s) => sum + s.emissions, 0);

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/mrv/counties"
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
            <Link href="/dashboard/mrv/counties" className="hover:text-[hsl(var(--primary))]">
              Counties
            </Link>
            <span>/</span>
            <span>{county.name}</span>
          </div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))] mt-1">
            {county.name} County MRV Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Upload className="h-4 w-4" />
            Submit Data
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* County Overview Card */}
      <div className="card bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--primary)/0.05)]">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(var(--primary))]">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">{county.name} County</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {county.region} Region · {code}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                <span>Pop: {county.population.toLocaleString()}</span>
                <span>·</span>
                <span>Area: {county.area.toLocaleString()} km²</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[hsl(var(--foreground))]">{formatNumber(totalEmissions)}</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">tCO2e total emissions</p>
            <div className="flex items-center justify-end gap-1 mt-1">
              <TrendingDown className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">-3.4%</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">vs last year</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Data Completeness</p>
            <p className="text-xl font-bold text-emerald-600">94%</p>
          </div>
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Facilities</p>
            <p className="text-xl font-bold text-[hsl(var(--foreground))]">{mockFacilities.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Data Points</p>
            <p className="text-xl font-bold text-[hsl(var(--foreground))]">1,850</p>
          </div>
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Last Submission</p>
            <p className="text-sm font-bold text-[hsl(var(--foreground))]">Jan 18, 2024</p>
          </div>
          <div className="p-3 rounded-xl bg-white/70">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Climate Officer</p>
            <p className="text-sm font-bold text-[hsl(var(--foreground))]">{county.climateOfficer}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-2xl bg-[hsl(var(--secondary))] p-1.5">
        {[
          { id: "overview" as const, label: "Sector Breakdown", icon: BarChart3 },
          { id: "facilities" as const, label: "Facilities", icon: Building2 },
          { id: "submissions" as const, label: "Data Submissions", icon: FileText },
          { id: "trends" as const, label: "Trends", icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
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
              <Icon className={`h-4 w-4 ${isActive ? "text-[hsl(var(--primary))]" : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Sector Breakdown Tab */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
              Emissions by Sector
            </h2>
            <div className="space-y-4">
              {sectorBreakdown.map((sector) => {
                const Icon = sector.icon;
                return (
                  <div key={sector.sector} className="p-4 rounded-xl border border-[hsl(var(--border))]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${sector.color}-100`}>
                          <Icon className={`h-5 w-5 text-${sector.color}-600`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[hsl(var(--foreground))]">{sector.sector}</h3>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">
                            {sector.facilities > 0 ? `${sector.facilities} facilities` : "Mobile sources"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[hsl(var(--foreground))]">
                          {formatNumber(sector.emissions)} tCO2e
                        </p>
                        <p className={`text-xs flex items-center justify-end gap-1 ${
                          sector.trend < 0 ? "text-emerald-600" : "text-red-600"
                        }`}>
                          {sector.trend < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                          {Math.abs(sector.trend)}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))] mb-1">
                        <span>{sector.share}% of total</span>
                      </div>
                      <div className="h-2 rounded-full bg-[hsl(var(--secondary))]">
                        <div
                          className={`h-2 rounded-full bg-${sector.color}-500`}
                          style={{ width: `${sector.share}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Facilities Tab */}
      {activeTab === "facilities" && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Reporting Facilities
            </h2>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors">
              <Building2 className="h-4 w-4" />
              Add Facility
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Facility
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Sector
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Emissions
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Last Reported
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {mockFacilities.map((facility) => {
                  const status = facilityStatusConfig[facility.status];
                  return (
                    <tr key={facility.id} className="hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                      <td className="px-4 py-4">
                        <p className="font-medium text-[hsl(var(--foreground))]">{facility.name}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{facility.type}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-[hsl(var(--foreground))]">
                        {facility.sector}
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium text-[hsl(var(--foreground))]">
                        {formatNumber(facility.emissions)} tCO2e
                      </td>
                      <td className="px-4 py-4 text-sm text-[hsl(var(--muted-foreground))]">
                        {new Date(facility.lastReported).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-${status.color}-100 text-${status.color}-700`}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Data Submissions Tab */}
      {activeTab === "submissions" && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Data Submissions
            </h2>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors">
              <Upload className="h-4 w-4" />
              New Submission
            </button>
          </div>
          <div className="space-y-3">
            {mockSubmissions.map((submission) => {
              const status = submissionStatusConfig[submission.status];
              const StatusIcon = status.icon;
              return (
                <div key={submission.id} className="p-4 rounded-xl border border-[hsl(var(--border))]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${status.color}-100`}>
                        <StatusIcon className={`h-5 w-5 text-${status.color}-600`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[hsl(var(--foreground))]">{submission.period}</span>
                          <span className="text-xs bg-[hsl(var(--secondary))] px-2 py-0.5 rounded">
                            {submission.sector}
                          </span>
                        </div>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                          {submission.dataPoints} data points · Submitted by {submission.submittedBy}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[hsl(var(--foreground))]">
                        {formatNumber(submission.emissions)} tCO2e
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-${status.color}-100 text-${status.color}-700`}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                    <button className="text-sm font-medium text-[hsl(var(--primary))] hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Trends Tab */}
      {activeTab === "trends" && (
        <div className="card">
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
            Historical Emissions Trend
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Energy
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Transport
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Agriculture
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Waste
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {[
                  { year: 2023, energy: 3200, transport: 4100, agriculture: 200, waste: 1000, total: 8500, change: -3.4 },
                  { year: 2022, energy: 3350, transport: 3950, agriculture: 220, waste: 980, total: 8800, change: 2.1 },
                  { year: 2021, energy: 3200, transport: 3900, agriculture: 240, waste: 920, total: 8620, change: -1.5 },
                  { year: 2020, energy: 3100, transport: 4100, agriculture: 250, waste: 900, total: 8750, change: -8.2 },
                  { year: 2019, energy: 3500, transport: 4500, agriculture: 280, waste: 950, total: 9530, change: 3.5 },
                ].map((row) => (
                  <tr key={row.year} className="hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]">
                      {row.year}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-[hsl(var(--foreground))]">
                      {formatNumber(row.energy * 1000)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-[hsl(var(--foreground))]">
                      {formatNumber(row.transport * 1000)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-[hsl(var(--foreground))]">
                      {formatNumber(row.agriculture * 1000)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-[hsl(var(--foreground))]">
                      {formatNumber(row.waste * 1000)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-[hsl(var(--foreground))]">
                      {formatNumber(row.total * 1000)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-medium flex items-center justify-end gap-1 ${
                        row.change < 0 ? "text-emerald-600" : "text-red-600"
                      }`}>
                        {row.change < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                        {Math.abs(row.change)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
