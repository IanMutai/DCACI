"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ArrowLeft,
  ChevronDown,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Database,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Shield,
  X,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Types & Data
   ────────────────────────────────────────────────────────── */
interface DataPoint {
  id: string;
  year: number;
  value: string;
  numericValue: number;
  source: string;
  methodology: string;
  verificationStatus: "verified" | "pending" | "rejected";
  addedDate: string;
  addedBy: string;
}

interface TargetTrack {
  id: string;
  name: string;
  sector: string;
  unit: string;
  trend: "increasing" | "decreasing" | "stable";
  trendDescription: string;
  dataPoints: DataPoint[];
  qualityScore: number;
  qualityNotes: string[];
}

const trackingTargets: TargetTrack[] = [
  {
    id: "ghg-unconditional",
    name: "Economy-wide GHG Reduction (Unconditional)",
    sector: "Economy-wide",
    unit: "MtCO2e",
    trend: "decreasing",
    trendDescription:
      "Emissions showing a gradual downward trend since 2020, driven primarily by renewable energy expansion and forestry gains. Average annual reduction of 2.1% over the last 3 years.",
    qualityScore: 82,
    qualityNotes: [
      "National GHG Inventory provides Tier 2 estimates for most sectors",
      "Energy sector data verified against utility records",
      "LULUCF estimates have higher uncertainty (+-15%)",
      "2024 data still pending final verification from BTR-1",
    ],
    dataPoints: [
      { id: "dp1", year: 2015, value: "73 MtCO2e", numericValue: 73, source: "National GHG Inventory", methodology: "IPCC 2006 Guidelines, Tier 2", verificationStatus: "verified", addedDate: "2018-03-15", addedBy: "National Bureau of Statistics" },
      { id: "dp2", year: 2017, value: "80 MtCO2e", numericValue: 80, source: "National GHG Inventory", methodology: "IPCC 2006 Guidelines, Tier 2", verificationStatus: "verified", addedDate: "2019-06-20", addedBy: "National Bureau of Statistics" },
      { id: "dp3", year: 2019, value: "95 MtCO2e", numericValue: 95, source: "3rd National Communication", methodology: "IPCC 2006 Guidelines, Tier 2", verificationStatus: "verified", addedDate: "2021-01-10", addedBy: "Ministry of Environment" },
      { id: "dp4", year: 2020, value: "128 MtCO2e", numericValue: 128, source: "BUR-3", methodology: "IPCC 2006 Guidelines, Tier 2", verificationStatus: "verified", addedDate: "2022-04-01", addedBy: "Climate Change Directorate" },
      { id: "dp5", year: 2022, value: "123.5 MtCO2e", numericValue: 123.5, source: "National GHG Inventory", methodology: "IPCC 2006 Guidelines, Tier 2", verificationStatus: "verified", addedDate: "2024-02-15", addedBy: "National Bureau of Statistics" },
      { id: "dp6", year: 2024, value: "118.3 MtCO2e", numericValue: 118.3, source: "BTR-1 (Draft)", methodology: "IPCC 2006 Guidelines, Tier 2 + satellite validation", verificationStatus: "pending", addedDate: "2025-08-10", addedBy: "Climate Change Directorate" },
    ],
  },
  {
    id: "renewable-energy",
    name: "Renewable Energy Share",
    sector: "Energy",
    unit: "% of electricity generation",
    trend: "increasing",
    trendDescription:
      "Steady upward trend driven by geothermal and wind capacity additions. Year-on-year increase averages 2.8 percentage points since 2018.",
    qualityScore: 91,
    qualityNotes: [
      "Data sourced from ERC metering systems with high accuracy",
      "All grid-connected generation facilities covered",
      "Off-grid and mini-grid RE not fully captured",
      "Monthly data aggregated to annual totals",
    ],
    dataPoints: [
      { id: "re1", year: 2015, value: "70%", numericValue: 70, source: "ERC Annual Report 2015", methodology: "Grid metered generation data", verificationStatus: "verified", addedDate: "2016-06-01", addedBy: "Energy Regulatory Commission" },
      { id: "re2", year: 2018, value: "76%", numericValue: 76, source: "ERC Annual Report 2018", methodology: "Grid metered generation data", verificationStatus: "verified", addedDate: "2019-05-15", addedBy: "Energy Regulatory Commission" },
      { id: "re3", year: 2020, value: "80%", numericValue: 80, source: "ERC Annual Report 2020", methodology: "Grid metered generation data", verificationStatus: "verified", addedDate: "2021-06-01", addedBy: "Energy Regulatory Commission" },
      { id: "re4", year: 2022, value: "87%", numericValue: 87, source: "Kenya Power Annual Report", methodology: "Grid metered + IPP data", verificationStatus: "verified", addedDate: "2023-04-20", addedBy: "Kenya Power" },
      { id: "re5", year: 2024, value: "92%", numericValue: 92, source: "ERC Annual Report 2024", methodology: "Grid metered + IPP data + satellite", verificationStatus: "verified", addedDate: "2025-06-01", addedBy: "Energy Regulatory Commission" },
    ],
  },
  {
    id: "forest-cover",
    name: "Forest Cover Restoration",
    sector: "Forestry",
    unit: "% of land area",
    trend: "increasing",
    trendDescription:
      "Positive trend with forest cover expanding from 6.9% to 8.8% since 2015. Tree planting campaigns and reduced deforestation rates are key contributors.",
    qualityScore: 76,
    qualityNotes: [
      "Remote sensing data (Landsat/Sentinel-2) provides spatial coverage",
      "Ground-truthing conducted in 12 of 47 counties",
      "Definition of forest aligned with FAO (>0.5ha, >10% canopy)",
      "Community forest data integration remains incomplete",
    ],
    dataPoints: [
      { id: "fc1", year: 2015, value: "6.9%", numericValue: 6.9, source: "Kenya Forest Service", methodology: "Remote sensing + ground survey", verificationStatus: "verified", addedDate: "2017-01-15", addedBy: "Kenya Forest Service" },
      { id: "fc2", year: 2018, value: "7.4%", numericValue: 7.4, source: "KFS Forest Assessment", methodology: "Remote sensing (Landsat 8)", verificationStatus: "verified", addedDate: "2019-03-01", addedBy: "Kenya Forest Service" },
      { id: "fc3", year: 2020, value: "7.8%", numericValue: 7.8, source: "Global Forest Watch + KFS", methodology: "Remote sensing + stratified sampling", verificationStatus: "verified", addedDate: "2021-07-15", addedBy: "Kenya Forest Service" },
      { id: "fc4", year: 2022, value: "8.3%", numericValue: 8.3, source: "National Forest Inventory", methodology: "Remote sensing (Sentinel-2) + NFI plots", verificationStatus: "verified", addedDate: "2023-08-10", addedBy: "Kenya Forest Service" },
      { id: "fc5", year: 2024, value: "8.8%", numericValue: 8.8, source: "KFS + County Reports", methodology: "Remote sensing + community data", verificationStatus: "pending", addedDate: "2025-05-20", addedBy: "Kenya Forest Service" },
    ],
  },
];

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
export default function DetailedTrackingPage() {
  const [selectedTargetId, setSelectedTargetId] = useState<string>(trackingTargets[0]!.id);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDataPoint, setNewDataPoint] = useState({
    year: "2025",
    value: "",
    source: "",
    methodology: "",
  });

  const selectedTarget = useMemo(
    () => trackingTargets.find((t) => t.id === selectedTargetId) ?? trackingTargets[0]!,
    [selectedTargetId]
  );

  const trendIcon =
    selectedTarget.trend === "increasing"
      ? ArrowUpRight
      : selectedTarget.trend === "decreasing"
        ? ArrowDownRight
        : Minus;

  const trendColor =
    selectedTarget.id === "ghg-unconditional"
      ? selectedTarget.trend === "decreasing"
        ? "text-emerald-600"
        : "text-red-600"
      : selectedTarget.trend === "increasing"
        ? "text-emerald-600"
        : "text-red-600";

  const TrendIcon = trendIcon;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      {/* Breadcrumb */}
      <Link
        href="/progress/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--color-primary-light))] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Progress Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Detailed Tracking</h1>
            <p className="text-sm text-[hsl(var(--color-text-muted))]">
              Granular progress data with verification and quality assessment
            </p>
          </div>
        </div>
      </div>

      {/* Target Selector */}
      <div className="card-elevated !p-4">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
          Select Target
        </label>
        <div className="relative">
          <select
            value={selectedTargetId}
            onChange={(e) => setSelectedTargetId(e.target.value)}
            className="input-field appearance-none pr-8 text-base font-semibold"
          >
            {trackingTargets.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.sector})
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[hsl(var(--color-text-muted))]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trend Summary */}
          <div className="card-elevated">
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                trendColor === "text-emerald-600" ? "bg-emerald-50" : "bg-red-50"
              }`}>
                <TrendIcon className={`h-5 w-5 ${trendColor}`} />
              </div>
              <div>
                <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Trend Analysis</h2>
                <span className={`text-xs font-semibold capitalize ${trendColor}`}>
                  {selectedTarget.trend}
                </span>
              </div>
            </div>
            <p className="text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
              {selectedTarget.trendDescription}
            </p>
          </div>

          {/* Timeline Data Points */}
          <div className="card-elevated">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Data Point Timeline</h2>
                <p className="text-xs text-[hsl(var(--color-text-muted))]">
                  {selectedTarget.dataPoints.length} records for {selectedTarget.name}
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn-primary text-xs !px-3 !py-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Data Point
              </button>
            </div>

            {/* Add Data Point Form */}
            {showAddForm && (
              <div className="mb-5 rounded-lg border border-[hsl(var(--color-border-focus))] bg-[hsl(var(--color-primary-50))] p-4 animate-fade-up">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[hsl(var(--color-text))]">New Data Point</h3>
                  <button onClick={() => setShowAddForm(false)} className="text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))]">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[hsl(var(--color-text-secondary))]">Year</label>
                    <input
                      type="number"
                      value={newDataPoint.year}
                      onChange={(e) => setNewDataPoint((p) => ({ ...p, year: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[hsl(var(--color-text-secondary))]">
                      Value ({selectedTarget.unit})
                    </label>
                    <input
                      type="text"
                      value={newDataPoint.value}
                      onChange={(e) => setNewDataPoint((p) => ({ ...p, value: e.target.value }))}
                      placeholder={`e.g., 115 ${selectedTarget.unit}`}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[hsl(var(--color-text-secondary))]">Source</label>
                    <input
                      type="text"
                      value={newDataPoint.source}
                      onChange={(e) => setNewDataPoint((p) => ({ ...p, source: e.target.value }))}
                      placeholder="e.g., National GHG Inventory"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[hsl(var(--color-text-secondary))]">Methodology</label>
                    <input
                      type="text"
                      value={newDataPoint.methodology}
                      onChange={(e) => setNewDataPoint((p) => ({ ...p, methodology: e.target.value }))}
                      placeholder="e.g., IPCC 2006 Guidelines, Tier 2"
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <button onClick={() => setShowAddForm(false)} className="btn-secondary text-xs !px-3 !py-1.5">
                    Cancel
                  </button>
                  <button className="btn-primary text-xs !px-3 !py-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Save Data Point
                  </button>
                </div>
              </div>
            )}

            {/* Data Points List */}
            <div className="space-y-3">
              {[...selectedTarget.dataPoints].reverse().map((dp) => (
                <div
                  key={dp.id}
                  className="rounded-lg border border-[hsl(var(--color-border-light))] p-4 hover:border-[hsl(var(--color-border))] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--color-primary-50))]">
                        <span className="text-sm font-bold text-[hsl(var(--color-primary))]">{dp.year}</span>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[hsl(var(--color-text))]">{dp.value}</p>
                        <p className="text-xs text-[hsl(var(--color-text-muted))]">{dp.source}</p>
                      </div>
                    </div>
                    {dp.verificationStatus === "verified" ? (
                      <span className="badge-success">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </span>
                    ) : dp.verificationStatus === "pending" ? (
                      <span className="badge-warning">
                        <Clock className="h-3 w-3" />
                        Pending
                      </span>
                    ) : (
                      <span className="badge-danger">
                        <AlertTriangle className="h-3 w-3" />
                        Rejected
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 text-xs mt-3 pt-3 border-t border-[hsl(var(--color-border-light))]">
                    <div>
                      <span className="text-[hsl(var(--color-text-muted))]">Methodology:</span>
                      <p className="font-medium text-[hsl(var(--color-text-secondary))]">{dp.methodology}</p>
                    </div>
                    <div>
                      <span className="text-[hsl(var(--color-text-muted))]">Added by:</span>
                      <p className="font-medium text-[hsl(var(--color-text-secondary))]">{dp.addedBy}</p>
                    </div>
                    <div>
                      <span className="text-[hsl(var(--color-text-muted))]">Date added:</span>
                      <p className="font-medium text-[hsl(var(--color-text-secondary))]">
                        {new Date(dp.addedDate).toLocaleDateString("en-KE", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Data Quality Assessment */}
          <div className="card-elevated">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-[hsl(var(--color-primary-light))]" />
              <h2 className="text-base font-bold text-[hsl(var(--color-text))]">Data Quality</h2>
            </div>

            {/* Score */}
            <div className="mb-4 text-center">
              <div className="relative inline-flex">
                <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--color-border-light))" strokeWidth="8" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke={selectedTarget.qualityScore >= 80 ? "hsl(var(--color-success))" : selectedTarget.qualityScore >= 60 ? "hsl(var(--color-warning))" : "hsl(var(--color-danger))"}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - selectedTarget.qualityScore / 100)}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--color-text))]">{selectedTarget.qualityScore}</span>
                  <span className="text-[9px] text-[hsl(var(--color-text-muted))]">/ 100</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-[hsl(var(--color-text-muted))]">Quality Score</p>
            </div>

            {/* Verification Breakdown */}
            <div className="space-y-2 mb-4">
              {[
                {
                  label: "Verified",
                  count: selectedTarget.dataPoints.filter((dp) => dp.verificationStatus === "verified").length,
                  color: "bg-emerald-500",
                },
                {
                  label: "Pending",
                  count: selectedTarget.dataPoints.filter((dp) => dp.verificationStatus === "pending").length,
                  color: "bg-amber-500",
                },
                {
                  label: "Rejected",
                  count: selectedTarget.dataPoints.filter((dp) => dp.verificationStatus === "rejected").length,
                  color: "bg-red-500",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className="text-xs text-[hsl(var(--color-text-secondary))]">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-[hsl(var(--color-text))]">{item.count}</span>
                </div>
              ))}
            </div>

            {/* Quality Notes */}
            <div className="border-t border-[hsl(var(--color-border-light))] pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-2">
                Assessment Notes
              </p>
              <ul className="space-y-1.5">
                {selectedTarget.qualityNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-[hsl(var(--color-text-secondary))]">
                    <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-[hsl(var(--color-primary-light))]" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card-elevated">
            <h3 className="text-sm font-bold text-[hsl(var(--color-text))] mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[hsl(var(--color-text-muted))]">Unit</span>
                <span className="font-medium text-[hsl(var(--color-text))]">{selectedTarget.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[hsl(var(--color-text-muted))]">Data Points</span>
                <span className="font-medium text-[hsl(var(--color-text))]">{selectedTarget.dataPoints.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[hsl(var(--color-text-muted))]">First Record</span>
                <span className="font-medium text-[hsl(var(--color-text))]">{selectedTarget.dataPoints[0]?.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[hsl(var(--color-text-muted))]">Latest Record</span>
                <span className="font-medium text-[hsl(var(--color-text))]">
                  {selectedTarget.dataPoints[selectedTarget.dataPoints.length - 1]?.year}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[hsl(var(--color-text-muted))]">Sector</span>
                <span className="font-medium text-[hsl(var(--color-text))]">{selectedTarget.sector}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
