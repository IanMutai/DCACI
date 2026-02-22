"use client";

import Link from "next/link";
import { useState } from "react";

export default function MrvSetupPage() {
  const [config, setConfig] = useState({
    baseYear: "2015",
    inventoryYearStart: "2000",
    inventoryYearEnd: "2024",
    tier: "tier1",
    gwpSource: "ar5",
    sectors: {
      energy: true,
      ippu: true,
      agriculture: true,
      lulucf: true,
      waste: true,
    },
    gases: {
      co2: true,
      ch4: true,
      n2o: true,
      hfcs: false,
      pfcs: false,
      sf6: false,
      nf3: false,
    },
    reportingFrequency: "annual",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setConfig((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleSector(sector: string) {
    setConfig((prev) => ({
      ...prev,
      sectors: {
        ...prev.sectors,
        [sector]: !prev.sectors[sector as keyof typeof prev.sectors],
      },
    }));
  }

  function toggleGas(gas: string) {
    setConfig((prev) => ({
      ...prev,
      gases: {
        ...prev.gases,
        [gas]: !prev.gases[gas as keyof typeof prev.gases],
      },
    }));
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">MRV Configuration</h1>
        <p className="mt-2 text-sm text-slate-600">
          Configure your MRV system parameters including base year, methodology
          tier, and sector coverage.
        </p>
      </div>

      <div className="space-y-6">
        {/* Time Parameters */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Time Parameters
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Base Year
              </label>
              <select
                name="baseYear"
                value={config.baseYear}
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
                Inventory Start Year
              </label>
              <select
                name="inventoryYearStart"
                value={config.inventoryYearStart}
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
                Inventory End Year
              </label>
              <select
                name="inventoryYearEnd"
                value={config.inventoryYearEnd}
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
          </div>
        </div>

        {/* Methodology */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Methodology
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Default IPCC Tier
              </label>
              <select
                name="tier"
                value={config.tier}
                onChange={handleChange}
                className="input-field"
              >
                <option value="tier1">Tier 1 - Default Emission Factors</option>
                <option value="tier2">Tier 2 - Country-Specific Factors</option>
                <option value="tier3">Tier 3 - Advanced Modeling</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                GWP Source
              </label>
              <select
                name="gwpSource"
                value={config.gwpSource}
                onChange={handleChange}
                className="input-field"
              >
                <option value="ar4">IPCC AR4 (SAR)</option>
                <option value="ar5">IPCC AR5 (2014)</option>
                <option value="ar6">IPCC AR6 (2021)</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Reporting Frequency
            </label>
            <select
              name="reportingFrequency"
              value={config.reportingFrequency}
              onChange={handleChange}
              className="input-field max-w-xs"
            >
              <option value="annual">Annual</option>
              <option value="biennial">Biennial</option>
            </select>
          </div>
        </div>

        {/* IPCC Sectors */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            IPCC Sectors
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Select the sectors to include in your GHG inventory.
          </p>
          <div className="space-y-3">
            {[
              { id: "energy", label: "Energy (1)", desc: "Fuel combustion, fugitive emissions" },
              { id: "ippu", label: "IPPU (2)", desc: "Industrial Processes & Product Use" },
              { id: "agriculture", label: "Agriculture (3)", desc: "Livestock, rice cultivation, soils" },
              { id: "lulucf", label: "LULUCF (4)", desc: "Land Use, Land-Use Change & Forestry" },
              { id: "waste", label: "Waste (5)", desc: "Solid waste, wastewater" },
            ].map((sector) => (
              <label
                key={sector.id}
                className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 cursor-pointer hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={config.sectors[sector.id as keyof typeof config.sectors]}
                  onChange={() => toggleSector(sector.id)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                />
                <div>
                  <div className="text-sm font-medium text-slate-900">
                    {sector.label}
                  </div>
                  <div className="text-xs text-slate-500">{sector.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Greenhouse Gases */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Greenhouse Gases
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { id: "co2", label: "CO2" },
              { id: "ch4", label: "CH4" },
              { id: "n2o", label: "N2O" },
              { id: "hfcs", label: "HFCs" },
              { id: "pfcs", label: "PFCs" },
              { id: "sf6", label: "SF6" },
              { id: "nf3", label: "NF3" },
            ].map((gas) => (
              <label
                key={gas.id}
                className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 cursor-pointer hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={config.gases[gas.id as keyof typeof config.gases]}
                  onChange={() => toggleGas(gas.id)}
                  className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  {gas.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link href="/module-selection" className="btn-secondary">
          Back
        </Link>
        <Link href="/ndc-setup" className="btn-primary">
          Continue
        </Link>
      </div>
    </div>
  );
}
