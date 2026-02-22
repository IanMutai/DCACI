"use client";

import { useState } from "react";

interface SectorFormProps {
  sectorCode: string;
}

const sectorNames: Record<string, string> = {
  "1": "Energy",
  "2": "Industrial Processes and Product Use (IPPU)",
  "3": "Agriculture",
  "4": "Land Use, Land-Use Change and Forestry (LULUCF)",
  "5": "Waste",
};

export function SectorForm({ sectorCode }: SectorFormProps) {
  const [methodology, setMethodology] = useState("tier1");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit sector data to API
    alert(`Sector ${sectorCode} data saved.`);
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Sector {sectorCode}: {sectorNames[sectorCode] || "Unknown"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inventory Year
          </label>
          <select className="w-full border rounded-md px-3 py-2 text-sm">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Methodology Tier
          </label>
          <div className="flex gap-4">
            {["tier1", "tier2", "tier3"].map((tier) => (
              <label key={tier} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="methodology"
                  value={tier}
                  checked={methodology === tier}
                  onChange={(e) => setMethodology(e.target.value)}
                  className="text-green-600"
                />
                <span className="text-sm text-gray-700 capitalize">
                  {tier.replace("tier", "Tier ")}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Source
          </label>
          <input
            type="text"
            placeholder="e.g., National Statistics Bureau, Ministry of Energy"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reference Year for Emission Factors
          </label>
          <select className="w-full border rounded-md px-3 py-2 text-sm">
            <option value="ipcc2006">IPCC 2006 Guidelines</option>
            <option value="ipcc2019">2019 Refinement to IPCC 2006</option>
            <option value="country_specific">Country-Specific</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes / Methodology Description
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Describe the data sources, assumptions, and methodology used..."
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
          >
            Save Sector Data
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
