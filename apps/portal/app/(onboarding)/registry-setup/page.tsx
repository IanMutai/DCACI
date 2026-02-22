"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegistrySetupPage() {
  const [config, setConfig] = useState({
    registryName: "",
    registryType: "national",
    article6Participation: true,
    correspondingAdjustments: true,
    creditStandards: {
      cdm: true,
      vcs: false,
      goldStandard: false,
      nationalStandard: true,
    },
    projectTypes: {
      renewable: true,
      energyEfficiency: true,
      forestry: true,
      agriculture: true,
      waste: true,
      transport: false,
      industrial: false,
    },
    creditUnit: "tCO2e",
    serialNumberPrefix: "",
    requireVerification: true,
    autoCorrespondingAdjustment: false,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setConfig((prev) => ({ ...prev, [e.target.name]: value }));
  }

  function toggleStandard(standard: string) {
    setConfig((prev) => ({
      ...prev,
      creditStandards: {
        ...prev.creditStandards,
        [standard]:
          !prev.creditStandards[
            standard as keyof typeof prev.creditStandards
          ],
      },
    }));
  }

  function toggleProjectType(type: string) {
    setConfig((prev) => ({
      ...prev,
      projectTypes: {
        ...prev.projectTypes,
        [type]:
          !prev.projectTypes[type as keyof typeof prev.projectTypes],
      },
    }));
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Registry Configuration
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Configure your carbon credit registry including supported standards,
          project types, and Article 6 settings.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Registry Information
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Registry Name
              </label>
              <input
                name="registryName"
                value={config.registryName}
                onChange={handleChange}
                placeholder="e.g., National Carbon Registry"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Registry Type
              </label>
              <select
                name="registryType"
                value={config.registryType}
                onChange={handleChange}
                className="input-field"
              >
                <option value="national">National Registry</option>
                <option value="subnational">Sub-national Registry</option>
                <option value="sectoral">Sectoral Registry</option>
              </select>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Credit Unit
              </label>
              <select
                name="creditUnit"
                value={config.creditUnit}
                onChange={handleChange}
                className="input-field"
              >
                <option value="tCO2e">tCO2e (Tonnes CO2 equivalent)</option>
                <option value="MtCO2e">MtCO2e (Megatonnes CO2 equivalent)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Serial Number Prefix
              </label>
              <input
                name="serialNumberPrefix"
                value={config.serialNumberPrefix}
                onChange={handleChange}
                placeholder="e.g., KEN-"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Article 6 */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Article 6 Settings
          </h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                name="article6Participation"
                checked={config.article6Participation}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
              />
              <div>
                <div className="text-sm font-medium text-slate-900">
                  Enable Article 6 Participation
                </div>
                <div className="text-xs text-slate-500">
                  Allow international transfer of mitigation outcomes (ITMOs)
                </div>
              </div>
            </label>
            <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                name="correspondingAdjustments"
                checked={config.correspondingAdjustments}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
              />
              <div>
                <div className="text-sm font-medium text-slate-900">
                  Corresponding Adjustments
                </div>
                <div className="text-xs text-slate-500">
                  Apply corresponding adjustments for transferred credits
                </div>
              </div>
            </label>
            <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                name="requireVerification"
                checked={config.requireVerification}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
              />
              <div>
                <div className="text-sm font-medium text-slate-900">
                  Require Third-Party Verification
                </div>
                <div className="text-xs text-slate-500">
                  All credit issuances must be verified by an accredited body
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Credit Standards */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Supported Standards
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "cdm", label: "CDM", desc: "Clean Development Mechanism" },
              { id: "vcs", label: "VCS", desc: "Verified Carbon Standard" },
              { id: "goldStandard", label: "Gold Standard", desc: "Gold Standard for Global Goals" },
              { id: "nationalStandard", label: "National Standard", desc: "Country-specific standard" },
            ].map((std) => (
              <label
                key={std.id}
                className="flex items-start gap-2 rounded-lg border border-slate-200 p-3 cursor-pointer hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={
                    config.creditStandards[
                      std.id as keyof typeof config.creditStandards
                    ]
                  }
                  onChange={() => toggleStandard(std.id)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                />
                <div>
                  <div className="text-sm font-medium text-slate-700">
                    {std.label}
                  </div>
                  <div className="text-xs text-slate-500">{std.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Project Types */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Eligible Project Types
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { id: "renewable", label: "Renewable Energy" },
              { id: "energyEfficiency", label: "Energy Efficiency" },
              { id: "forestry", label: "Forestry/REDD+" },
              { id: "agriculture", label: "Agriculture" },
              { id: "waste", label: "Waste Management" },
              { id: "transport", label: "Transport" },
              { id: "industrial", label: "Industrial" },
            ].map((type) => (
              <label
                key={type.id}
                className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 cursor-pointer hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={
                    config.projectTypes[
                      type.id as keyof typeof config.projectTypes
                    ]
                  }
                  onChange={() => toggleProjectType(type.id)}
                  className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  {type.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link href="/ndc-setup" className="btn-secondary">
          Back
        </Link>
        <Link href="/complete" className="btn-primary">
          Complete Setup
        </Link>
      </div>
    </div>
  );
}
