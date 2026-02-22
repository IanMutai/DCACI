"use client";

import { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Info,
  Target,
  ArrowDown,
  Layers,
  Shuffle,
  ChevronRight,
} from "lucide-react";

interface UncertaintyCategory {
  sector: string;
  code: string;
  category: string;
  emissionsGg: number;
  adUncertainty: number;
  efUncertainty: number;
  combinedUncertainty: number;
  sensitivityType1: number;
  isKeyCategory: boolean;
}

const uncertaintyData: UncertaintyCategory[] = [
  { sector: "Energy", code: "1.A.1", category: "Energy Industries - Fuel Combustion", emissionsGg: 39180, adUncertainty: 5, efUncertainty: 7, combinedUncertainty: 8.6, sensitivityType1: 35.2, isKeyCategory: true },
  { sector: "Energy", code: "1.A.3", category: "Transport - Road", emissionsGg: 14050, adUncertainty: 8, efUncertainty: 5, combinedUncertainty: 9.4, sensitivityType1: 13.8, isKeyCategory: true },
  { sector: "Agriculture", code: "3.A", category: "Enteric Fermentation", emissionsGg: 11190, adUncertainty: 10, efUncertainty: 30, combinedUncertainty: 31.6, sensitivityType1: 18.4, isKeyCategory: true },
  { sector: "IPPU", code: "2.A.1", category: "Cement Production", emissionsGg: 7770, adUncertainty: 5, efUncertainty: 10, combinedUncertainty: 11.2, sensitivityType1: 8.5, isKeyCategory: true },
  { sector: "LULUCF", code: "4.A", category: "Forest Land", emissionsGg: 6660, adUncertainty: 30, efUncertainty: 50, combinedUncertainty: 58.3, sensitivityType1: 10.1, isKeyCategory: true },
  { sector: "Energy", code: "1.A.2", category: "Manufacturing Industries", emissionsGg: 4710, adUncertainty: 5, efUncertainty: 7, combinedUncertainty: 8.6, sensitivityType1: 4.2, isKeyCategory: true },
  { sector: "Agriculture", code: "3.D", category: "Agricultural Soils (N2O)", emissionsGg: 3510, adUncertainty: 50, efUncertainty: 100, combinedUncertainty: 111.8, sensitivityType1: 9.2, isKeyCategory: true },
  { sector: "Waste", code: "5.A", category: "Solid Waste Disposal", emissionsGg: 2220, adUncertainty: 30, efUncertainty: 40, combinedUncertainty: 50.0, sensitivityType1: 6.5, isKeyCategory: false },
  { sector: "Energy", code: "1.B.2", category: "Oil & Natural Gas Fugitive", emissionsGg: 1660, adUncertainty: 20, efUncertainty: 50, combinedUncertainty: 53.9, sensitivityType1: 4.7, isKeyCategory: false },
  { sector: "Agriculture", code: "3.C", category: "Rice Cultivation (CH4)", emissionsGg: 1110, adUncertainty: 20, efUncertainty: 40, combinedUncertainty: 44.7, sensitivityType1: 2.6, isKeyCategory: false },
];

const recommendations = [
  { category: "Agricultural Soils (N2O)", code: "3.D", currentUncertainty: 111.8, priority: "high", action: "Conduct national-level field measurements of N2O emission factors. Current reliance on IPCC defaults results in highest uncertainty.", improvement: "Could reduce EF uncertainty from 100% to 30-50% with country-specific studies." },
  { category: "Forest Land", code: "4.A", currentUncertainty: 58.3, priority: "high", action: "Improve forest area change detection using high-resolution satellite imagery and implement National Forest Monitoring System.", improvement: "Could reduce AD uncertainty from 30% to 10-15% with systematic remote sensing." },
  { category: "Oil & Gas Fugitive", code: "1.B.2", currentUncertainty: 53.9, priority: "medium", action: "Implement leak detection and repair (LDAR) programs. Measure actual fugitive emission rates at facilities.", improvement: "Could reduce combined uncertainty to 20-30% with facility-level data." },
  { category: "Solid Waste Disposal", code: "5.A", currentUncertainty: 50.0, priority: "medium", action: "Improve waste composition studies and measure actual methane generation at managed disposal sites.", improvement: "Could reduce combined uncertainty to 25-35% with national waste characterization." },
  { category: "Enteric Fermentation", code: "3.A", currentUncertainty: 31.6, priority: "high", action: "Develop country-specific enteric emission factors through livestock feeding trials adapted to Kenyan breeds and management.", improvement: "Could reduce EF uncertainty from 30% to 15-20% with Tier 2 approach." },
];

export default function UncertaintyPage() {
  const [activeTab, setActiveTab] = useState<"approach1" | "montecarlo" | "recommendations">("approach1");

  const totalEmissions = uncertaintyData.reduce((sum, c) => sum + c.emissionsGg, 0);

  // Calculate overall inventory uncertainty using error propagation
  const overallUncertaintySq = uncertaintyData.reduce((sum, c) => {
    const weightedUncertainty = (c.emissionsGg / totalEmissions) * c.combinedUncertainty;
    return sum + weightedUncertainty * weightedUncertainty;
  }, 0);
  const overallUncertainty = Math.sqrt(overallUncertaintySq);

  const maxSensitivity = Math.max(...uncertaintyData.map((c) => c.sensitivityType1));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Uncertainty Analysis</h1>
            <p className="mt-1 text-sm text-gray-500">
              Quantification of uncertainty in GHG emission estimates following IPCC guidelines at the 95% confidence interval
            </p>
          </div>
        </div>
        <span className="badge-primary badge-lg">
          <Layers size={14} />
          FY 2022 Inventory
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Overall Inventory Uncertainty (Level)</p>
              <p className="mt-1 text-2xl font-bold text-blue-600">+/- {overallUncertainty.toFixed(1)}%</p>
              <p className="text-xs text-gray-400 mt-0.5">95% confidence interval</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Target size={20} />
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Trend Uncertainty</p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">+/- 4.8%</p>
              <p className="text-xs text-gray-400 mt-0.5">Year-on-year change</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Method</p>
              <p className="mt-1 text-xl font-bold text-gray-900">IPCC Approach 1</p>
              <p className="text-xs text-gray-400 mt-0.5">Propagation of errors</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <Shuffle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        {[
          { key: "approach1" as const, label: "Approach 1 - Error Propagation", icon: <BarChart3 size={14} /> },
          { key: "montecarlo" as const, label: "Monte Carlo (Approach 2)", icon: <Shuffle size={14} /> },
          { key: "recommendations" as const, label: "Reduction Priorities", icon: <ArrowDown size={14} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.key
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Approach 1 Table */}
      {activeTab === "approach1" && (
        <div className="space-y-6 animate-fade-up">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Sector</th>
                  <th>Category</th>
                  <th className="text-right">Emissions (Gg CO2eq)</th>
                  <th className="text-right">AD Uncertainty (%)</th>
                  <th className="text-right">EF Uncertainty (%)</th>
                  <th className="text-right">Combined (%)</th>
                  <th>Sensitivity</th>
                  <th>Key?</th>
                </tr>
              </thead>
              <tbody>
                {uncertaintyData.map((row) => (
                  <tr key={row.code} className={row.isKeyCategory ? "bg-emerald-50/30" : ""}>
                    <td><span className="badge-neutral">{row.sector}</span></td>
                    <td>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{row.category}</p>
                        <p className="text-xs text-gray-400 font-mono">{row.code}</p>
                      </div>
                    </td>
                    <td className="text-right font-mono text-sm font-semibold text-gray-900">
                      {row.emissionsGg.toLocaleString()}
                    </td>
                    <td className="text-right">
                      <span className={`font-mono text-sm ${row.adUncertainty > 25 ? "text-red-600 font-semibold" : row.adUncertainty > 10 ? "text-amber-600" : "text-gray-700"}`}>
                        +/- {row.adUncertainty}
                      </span>
                    </td>
                    <td className="text-right">
                      <span className={`font-mono text-sm ${row.efUncertainty > 40 ? "text-red-600 font-semibold" : row.efUncertainty > 15 ? "text-amber-600" : "text-gray-700"}`}>
                        +/- {row.efUncertainty}
                      </span>
                    </td>
                    <td className="text-right">
                      <span className={`font-mono text-sm font-semibold ${row.combinedUncertainty > 50 ? "text-red-600" : row.combinedUncertainty > 20 ? "text-amber-600" : "text-emerald-600"}`}>
                        +/- {row.combinedUncertainty.toFixed(1)}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[80px]">
                          <div
                            className={`h-full rounded-full ${row.sensitivityType1 > 15 ? "bg-red-400" : row.sensitivityType1 > 8 ? "bg-amber-400" : "bg-emerald-400"}`}
                            style={{ width: `${(row.sensitivityType1 / maxSensitivity) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 font-mono w-10">{row.sensitivityType1}%</span>
                      </div>
                    </td>
                    <td>
                      {row.isKeyCategory ? (
                        <span className="badge-success">Key</span>
                      ) : (
                        <span className="badge-neutral">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Overall Result */}
          <div className="card-elevated border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Overall Inventory Uncertainty Result</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Calculated as: U_total = sqrt( sum( (U_i x E_i / E_total)^2 ) ) for all categories
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">+/- {overallUncertainty.toFixed(1)}%</p>
                <p className="text-xs text-gray-400">at 95% confidence</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monte Carlo Placeholder */}
      {activeTab === "montecarlo" && (
        <div className="card-elevated animate-fade-up">
          <div className="text-center py-12">
            <Shuffle size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Monte Carlo Simulation (Approach 2)</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              Monte Carlo analysis uses random sampling to build a probability distribution for total inventory emissions.
              This provides a more complete uncertainty characterization than Approach 1.
            </p>
            <div className="card-elevated max-w-sm mx-auto text-left">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Simulation Parameters</h4>
              <div className="space-y-3">
                <div>
                  <label className="input-label">Number of Iterations</label>
                  <input type="number" className="input-field" defaultValue={10000} />
                </div>
                <div>
                  <label className="input-label">Distribution Type</label>
                  <select className="select-field">
                    <option>Normal (Gaussian)</option>
                    <option>Log-normal</option>
                    <option>Uniform</option>
                    <option>Triangular</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Confidence Level</label>
                  <select className="select-field">
                    <option>95%</option>
                    <option>90%</option>
                    <option>99%</option>
                  </select>
                </div>
                <button className="btn-primary w-full">
                  <Shuffle size={16} />
                  Run Monte Carlo Simulation
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Results will include probability density function, percentile values, and comparison with Approach 1 results
            </p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {activeTab === "recommendations" && (
        <div className="space-y-4 animate-fade-up">
          <div className="card-elevated">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Uncertainty Reduction Priorities</h3>
            <p className="text-xs text-gray-500 mb-4">
              Ranked by combined impact of uncertainty magnitude and emission level (key categories prioritized)
            </p>
            <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <div
                  key={rec.code}
                  className={`rounded-xl border p-5 ${
                    rec.priority === "high"
                      ? "border-red-200 bg-red-50/30"
                      : "border-amber-200 bg-amber-50/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                        rec.priority === "high" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{rec.category}</p>
                        <p className="text-xs text-gray-400 font-mono">{rec.code}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={rec.priority === "high" ? "badge-danger" : "badge-warning"}>
                        {rec.priority} priority
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Current: +/- {rec.currentUncertainty}%</p>
                    </div>
                  </div>
                  <div className="pl-11 space-y-2">
                    <div>
                      <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Recommended Action</h5>
                      <p className="text-sm text-gray-700 mt-0.5">{rec.action}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Expected Improvement</h5>
                      <p className="text-sm text-emerald-700 mt-0.5">{rec.improvement}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Methodology Description */}
      <div className="card-elevated animate-fade-up">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Info size={16} className="text-blue-500" />
          Methodology: IPCC Approach 1 - Propagation of Errors
        </h3>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            Uncertainty is estimated using IPCC Approach 1 (error propagation), combining activity data (AD) and emission
            factor (EF) uncertainties at the 95% confidence interval. The combined uncertainty for each category is
            calculated using the equation: <span className="font-mono bg-white px-1.5 py-0.5 rounded border text-xs">U_combined = sqrt(U_AD^2 + U_EF^2)</span>.
            The overall inventory uncertainty is then derived by weighting each category{"'"}s combined uncertainty by its
            share of total emissions. Sensitivity analysis identifies which categories contribute most to overall uncertainty,
            guiding improvement priorities. Reference: 2006 IPCC Guidelines, Volume 1, Chapter 3.
          </p>
        </div>
      </div>
    </div>
  );
}
