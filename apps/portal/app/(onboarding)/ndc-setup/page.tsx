"use client";

import Link from "next/link";
import { useState } from "react";

export default function NdcSetupPage() {
  const [config, setConfig] = useState({
    ndcCycle: "ndc2",
    submissionYear: "2025",
    targetYear: "2030",
    baselineYear: "2015",
    targetType: "unconditional",
    unconditionalTarget: "-7",
    conditionalTarget: "-32",
    targetMetric: "absolute",
    coversSectors: {
      energy: true,
      transport: true,
      industry: true,
      agriculture: true,
      forestry: true,
      waste: true,
    },
    trackingFrequency: "annual",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setConfig((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleSector(sector: string) {
    setConfig((prev) => ({
      ...prev,
      coversSectors: {
        ...prev.coversSectors,
        [sector]:
          !prev.coversSectors[sector as keyof typeof prev.coversSectors],
      },
    }));
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">NDC Configuration</h1>
        <p className="mt-2 text-sm text-slate-600">
          Configure your Nationally Determined Contribution tracking parameters
          including NDC cycle, target years, and reduction targets.
        </p>
      </div>

      <div className="space-y-6">
        {/* NDC Cycle */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            NDC Cycle
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Current NDC Cycle
              </label>
              <select
                name="ndcCycle"
                value={config.ndcCycle}
                onChange={handleChange}
                className="input-field"
              >
                <option value="ndc1">First NDC (NDC 1.0)</option>
                <option value="ndc2">Updated/Second NDC (NDC 2.0)</option>
                <option value="ndc3">Third NDC (NDC 3.0)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Submission Year
              </label>
              <select
                name="submissionYear"
                value={config.submissionYear}
                onChange={handleChange}
                className="input-field"
              >
                {Array.from({ length: 11 }, (_, i) => 2020 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Targets */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Emission Reduction Targets
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Baseline Year
              </label>
              <select
                name="baselineYear"
                value={config.baselineYear}
                onChange={handleChange}
                className="input-field"
              >
                {Array.from({ length: 35 }, (_, i) => 1990 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Target Year
              </label>
              <select
                name="targetYear"
                value={config.targetYear}
                onChange={handleChange}
                className="input-field"
              >
                {Array.from({ length: 31 }, (_, i) => 2025 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Target Metric
            </label>
            <select
              name="targetMetric"
              value={config.targetMetric}
              onChange={handleChange}
              className="input-field max-w-xs"
            >
              <option value="absolute">Absolute Reduction (% from baseline)</option>
              <option value="intensity">Emissions Intensity (per GDP)</option>
              <option value="bau">Below BAU Scenario</option>
            </select>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Unconditional Target (%)
              </label>
              <input
                name="unconditionalTarget"
                type="number"
                value={config.unconditionalTarget}
                onChange={handleChange}
                placeholder="-7"
                className="input-field"
              />
              <p className="mt-1 text-xs text-slate-500">
                Reduction achievable with domestic resources
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Conditional Target (%)
              </label>
              <input
                name="conditionalTarget"
                type="number"
                value={config.conditionalTarget}
                onChange={handleChange}
                placeholder="-32"
                className="input-field"
              />
              <p className="mt-1 text-xs text-slate-500">
                Reduction with international support
              </p>
            </div>
          </div>
        </div>

        {/* Sector Coverage */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            NDC Sector Coverage
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { id: "energy", label: "Energy" },
              { id: "transport", label: "Transport" },
              { id: "industry", label: "Industry" },
              { id: "agriculture", label: "Agriculture" },
              { id: "forestry", label: "Forestry/LULUCF" },
              { id: "waste", label: "Waste" },
            ].map((sector) => (
              <label
                key={sector.id}
                className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 cursor-pointer hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={
                    config.coversSectors[
                      sector.id as keyof typeof config.coversSectors
                    ]
                  }
                  onChange={() => toggleSector(sector.id)}
                  className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  {sector.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Tracking */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Progress Tracking
          </h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Tracking Frequency
            </label>
            <select
              name="trackingFrequency"
              value={config.trackingFrequency}
              onChange={handleChange}
              className="input-field max-w-xs"
            >
              <option value="quarterly">Quarterly</option>
              <option value="biannual">Bi-annual</option>
              <option value="annual">Annual</option>
              <option value="biennial">Biennial</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link href="/mrv-setup" className="btn-secondary">
          Back
        </Link>
        <Link href="/registry-setup" className="btn-primary">
          Continue
        </Link>
      </div>
    </div>
  );
}
