"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  Download,
  RefreshCw,
  Clock,
  Flame,
  Droplets,
  Wind,
  Snowflake,
  Info,
  BarChart3,
} from "lucide-react";

/* ───────────────────────────────────────────
   Kenya GHG calculation results data
   ─────────────────────────────────────────── */

const gasSummary = [
  { gas: "CO2", value: 62.4, unit: "Mt", color: "bg-gray-100 text-gray-700", icon: <Wind size={18} className="text-gray-600" /> },
  { gas: "CH4", value: 18.8, unit: "Mt CO2eq", color: "bg-amber-100 text-amber-700", icon: <Flame size={18} className="text-amber-600" /> },
  { gas: "N2O", value: 10.2, unit: "Mt CO2eq", color: "bg-blue-100 text-blue-700", icon: <Droplets size={18} className="text-blue-600" /> },
  { gas: "HFCs", value: 0.72, unit: "Mt CO2eq", color: "bg-purple-100 text-purple-700", icon: <Snowflake size={18} className="text-purple-600" /> },
  { gas: "PFCs", value: 0.05, unit: "Mt CO2eq", color: "bg-rose-100 text-rose-700", icon: <Snowflake size={18} className="text-rose-600" /> },
  { gas: "SF6", value: 0.18, unit: "Mt CO2eq", color: "bg-indigo-100 text-indigo-700", icon: <Snowflake size={18} className="text-indigo-600" /> },
  { gas: "NF3", value: 0.01, unit: "Mt CO2eq", color: "bg-teal-100 text-teal-700", icon: <Snowflake size={18} className="text-teal-600" /> },
];

const calculationResults = [
  { code: "1.A.1.a", name: "Electricity and Heat Production", ad: "10,460 TJ", ef: "94.6 tCO2/TJ", co2eq: 989.5, tier: "Tier 2", uncertainty: "5-8%" },
  { code: "1.A.2", name: "Manufacturing Industries", ad: "6,340 TJ", ef: "77.4 tCO2/TJ", co2eq: 490.7, tier: "Tier 1", uncertainty: "10-15%" },
  { code: "1.A.3.b", name: "Road Transportation", ad: "43,120 TJ", ef: "69.3 tCO2/TJ", co2eq: 2988.2, tier: "Tier 1", uncertainty: "8-12%" },
  { code: "1.A.3.a", name: "Civil Aviation", ad: "4,230 TJ", ef: "71.5 tCO2/TJ", co2eq: 302.4, tier: "Tier 1", uncertainty: "10-15%" },
  { code: "1.A.4.b", name: "Residential", ad: "12,870 TJ", ef: "112.0 tCO2/TJ", co2eq: 1441.4, tier: "Tier 1", uncertainty: "15-20%" },
  { code: "1.B.2", name: "Oil and Natural Gas (fugitive)", ad: "8,420 TJ", ef: "1.2 kgCH4/TJ", co2eq: 282.1, tier: "Tier 1", uncertainty: "50-150%" },
  { code: "2.A.1", name: "Cement Production", ad: "2,890 kt", ef: "0.52 tCO2/t", co2eq: 1502.8, tier: "Tier 2", uncertainty: "5-10%" },
  { code: "2.F.1", name: "Refrigeration and AC (HFCs)", ad: "380 t", ef: "1,430 GWP", co2eq: 543.4, tier: "Tier 1", uncertainty: "20-50%" },
  { code: "3.A.1", name: "Enteric Fermentation", ad: "18.2M head", ef: "56 kgCH4/head", co2eq: 28560.0, tier: "Tier 2", uncertainty: "20-30%" },
  { code: "3.A.2", name: "Manure Management", ad: "18.2M head", ef: "2.5 kgCH4/head", co2eq: 1274.0, tier: "Tier 1", uncertainty: "30-50%" },
  { code: "3.C.4", name: "Direct N2O from Managed Soils", ad: "245 kt N", ef: "0.01 kgN2O-N/kgN", co2eq: 3822.0, tier: "Tier 1", uncertainty: "50-150%" },
  { code: "3B.1", name: "Forest Land", ad: "3.8M ha", ef: "-3.21 tCO2/ha", co2eq: -12198.0, tier: "Tier 2", uncertainty: "30-50%" },
  { code: "4.A", name: "Solid Waste Disposal", ad: "12,560 Gg", ef: "62 kgCH4/Gg", co2eq: 21804.0, tier: "Tier 1", uncertainty: "40-60%" },
  { code: "4.D", name: "Wastewater Treatment", ad: "1,240 Gg BOD", ef: "0.48 kgCH4/kgBOD", co2eq: 16646.4, tier: "Tier 1", uncertainty: "50-80%" },
];

const gwpTable = [
  { gas: "CO2", ar4: 1, ar5: 1, ar6: 1 },
  { gas: "CH4", ar4: 25, ar5: 28, ar6: 27.9 },
  { gas: "N2O", ar4: 298, ar5: 265, ar6: 273 },
  { gas: "HFC-134a", ar4: 1430, ar5: 1300, ar6: 1526 },
  { gas: "SF6", ar4: 22800, ar5: 23500, ar6: 25200 },
  { gas: "NF3", ar4: 17200, ar5: 16100, ar6: 17400 },
];

export default function CalculationsPage() {
  const [calculating, setCalculating] = useState(false);
  const [lastRun] = useState("2025-12-15 14:30 EAT");

  const handleRecalculate = () => {
    setCalculating(true);
    setTimeout(() => setCalculating(false), 2500);
  };

  const totalCO2eq = gasSummary.reduce((sum, g) => sum + g.value, 0);

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
          <h1 className="text-2xl font-bold text-gray-900">
            Emission Calculations
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            GHG emission calculations using IPCC methodology &middot; E = AD x EF x
            GWP
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 mr-2">
            <Clock size={12} className="inline mr-1" />
            Last run: {lastRun}
          </span>
          <button
            onClick={handleRecalculate}
            disabled={calculating}
            className="btn-secondary btn-sm"
          >
            <RefreshCw size={14} className={calculating ? "animate-spin" : ""} />
            <span>{calculating ? "Calculating..." : "Recalculate"}</span>
          </button>
          <button className="btn-primary btn-sm">
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Gas Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 stagger-children">
        {gasSummary.map((g) => (
          <div key={g.gas} className="card-stat text-center">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${g.color} mx-auto mb-2`}>
              {g.icon}
            </div>
            <p className="text-lg font-bold text-gray-900">{g.value}</p>
            <p className="text-[10px] text-gray-400">{g.unit}</p>
            <p className="text-xs font-semibold text-gray-600 mt-1">{g.gas}</p>
          </div>
        ))}
      </div>

      {/* Total Banner */}
      <div className="card-elevated bg-emerald-50 border-emerald-200 animate-fade-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <BarChart3 size={22} />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-700">
                Total GHG Emissions (2022)
              </p>
              <p className="text-2xl font-bold text-emerald-900">
                {totalCO2eq.toFixed(1)} MtCO2eq
              </p>
            </div>
          </div>
          <span className="badge-success badge-lg">AR5 GWP Values</span>
        </div>
      </div>

      {/* Calculation Results Table */}
      <div className="card-elevated animate-fade-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">
            Sector-by-Sector Calculation Results
          </h2>
          <span className="text-xs text-gray-400">
            {calculationResults.length} categories
          </span>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Category Code</th>
                <th>Name</th>
                <th>Activity Data</th>
                <th>Emission Factor</th>
                <th>CO2eq (Gg)</th>
                <th>Tier</th>
                <th>Uncertainty</th>
              </tr>
            </thead>
            <tbody>
              {calculationResults.map((r) => (
                <tr key={r.code}>
                  <td className="font-mono text-xs font-semibold text-gray-600">
                    {r.code}
                  </td>
                  <td className="text-sm font-medium text-gray-900">{r.name}</td>
                  <td className="font-mono text-xs text-gray-600">{r.ad}</td>
                  <td className="font-mono text-xs text-gray-600">{r.ef}</td>
                  <td>
                    <span
                      className={`font-mono text-sm font-semibold ${
                        r.co2eq < 0 ? "text-emerald-600" : "text-gray-900"
                      }`}
                    >
                      {r.co2eq > 0 ? "+" : ""}
                      {r.co2eq.toLocaleString(undefined, {
                        maximumFractionDigits: 1,
                      })}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        r.tier === "Tier 2"
                          ? "badge-accent"
                          : r.tier === "Tier 3"
                          ? "badge-primary"
                          : "badge-neutral"
                      }
                    >
                      {r.tier}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-gray-500">{r.uncertainty}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GWP Conversion Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-elevated animate-fade-up">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Info size={14} className="text-gray-400" />
            GWP Conversion Values
          </h2>
          <p className="text-xs text-gray-500 mb-3">
            Global Warming Potential values used to convert GHG gases to CO2
            equivalent. Current inventory uses AR5 values.
          </p>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Gas</th>
                  <th>AR4</th>
                  <th>
                    AR5{" "}
                    <span className="badge-success ml-1 text-[10px]">
                      Active
                    </span>
                  </th>
                  <th>AR6</th>
                </tr>
              </thead>
              <tbody>
                {gwpTable.map((g) => (
                  <tr key={g.gas}>
                    <td className="font-semibold text-sm text-gray-900">
                      {g.gas}
                    </td>
                    <td className="font-mono text-xs text-gray-500">
                      {g.ar4.toLocaleString()}
                    </td>
                    <td className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50">
                      {g.ar5.toLocaleString()}
                    </td>
                    <td className="font-mono text-xs text-gray-500">
                      {g.ar6.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Methodology Info */}
        <div className="card-elevated animate-fade-up">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calculator size={14} className="text-gray-400" />
            Calculation Methodology
          </h2>
          <div className="space-y-4">
            {[
              {
                tier: "Tier 1",
                desc: "Default emission factors from IPCC 2006 Guidelines. Basic method using global averages.",
                formula: "E = AD x EF_default x GWP",
                badge: "badge-neutral",
              },
              {
                tier: "Tier 2",
                desc: "Country-specific emission factors for Kenya. Improved accuracy using national parameters.",
                formula: "E = AD x EF_country x GWP",
                badge: "badge-accent",
              },
              {
                tier: "Tier 3",
                desc: "Facility-level models and measurements. Highest accuracy for key categories.",
                formula: "E = Model(AD, params) x GWP",
                badge: "badge-primary",
              },
            ].map((m) => (
              <div
                key={m.tier}
                className="p-4 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={m.badge}>{m.tier}</span>
                </div>
                <p className="text-sm text-gray-600">{m.desc}</p>
                <p className="mt-2 text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                  {m.formula}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recalculation Comparison */}
      <div className="card-elevated animate-fade-up">
        <h2 className="text-base font-semibold text-gray-900 mb-2">
          Recalculation Comparison
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Comparing current calculations with previous submission values to
          identify significant changes.
        </p>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sector</th>
                <th>Previous (Gg CO2eq)</th>
                <th>Current (Gg CO2eq)</th>
                <th>Difference</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium text-gray-900">Energy</td>
                <td className="font-mono text-sm">41,200</td>
                <td className="font-mono text-sm">42,800</td>
                <td>
                  <span className="text-xs font-medium text-red-600">+3.9%</span>
                </td>
                <td className="text-xs text-gray-500">Updated transport AD</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-900">Agriculture</td>
                <td className="font-mono text-sm">25,100</td>
                <td className="font-mono text-sm">25,600</td>
                <td>
                  <span className="text-xs font-medium text-red-600">+2.0%</span>
                </td>
                <td className="text-xs text-gray-500">
                  Revised livestock population
                </td>
              </tr>
              <tr>
                <td className="font-medium text-gray-900">LULUCF</td>
                <td className="font-mono text-sm">-11,800</td>
                <td className="font-mono text-sm">-12,300</td>
                <td>
                  <span className="text-xs font-medium text-emerald-600">
                    -4.2%
                  </span>
                </td>
                <td className="text-xs text-gray-500">
                  New forest inventory data
                </td>
              </tr>
              <tr>
                <td className="font-medium text-gray-900">Waste</td>
                <td className="font-mono text-sm">8,000</td>
                <td className="font-mono text-sm">8,400</td>
                <td>
                  <span className="text-xs font-medium text-red-600">+5.0%</span>
                </td>
                <td className="text-xs text-gray-500">Methodology update</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
