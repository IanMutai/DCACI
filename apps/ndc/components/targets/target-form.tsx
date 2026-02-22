"use client";

import { useState } from "react";

interface TargetFormData {
  name: string;
  type: string;
  sector: string;
  baseYear: number;
  targetYear: number;
  reductionPercent: number;
  baselineEmissions: number;
  conditionalityType: string;
  description: string;
  ghgCovered: string[];
}

interface TargetFormProps {
  initialData?: Partial<TargetFormData>;
  onSubmit: (data: TargetFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const defaultData: TargetFormData = {
  name: "",
  type: "economy-wide",
  sector: "",
  baseYear: 2015,
  targetYear: 2030,
  reductionPercent: 0,
  baselineEmissions: 0,
  conditionalityType: "unconditional",
  description: "",
  ghgCovered: [],
};

const sectors = [
  "All Sectors",
  "Energy",
  "Industrial Processes",
  "Agriculture",
  "LULUCF",
  "Waste",
  "Transport",
];

const ghgGases = ["CO2", "CH4", "N2O", "HFCs", "PFCs", "SF6", "NF3"];

export default function TargetForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: TargetFormProps) {
  const [formData, setFormData] = useState<TargetFormData>({
    ...defaultData,
    ...initialData,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = <K extends keyof TargetFormData>(
    field: K,
    value: TargetFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleGHG = (gas: string) => {
    const updated = formData.ghgCovered.includes(gas)
      ? formData.ghgCovered.filter((g) => g !== gas)
      : [...formData.ghgCovered, gas];
    updateField("ghgCovered", updated);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card space-y-4">
        <h2 className="font-semibold text-lg">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Target Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
            placeholder="e.g., Economy-wide GHG Reduction Target"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Target Type</label>
            <select
              value={formData.type}
              onChange={(e) => updateField("type", e.target.value)}
              className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
            >
              <option value="economy-wide">Economy-wide</option>
              <option value="sectoral">Sectoral</option>
              <option value="intensity">Intensity-based</option>
              <option value="absolute">Absolute</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sector</label>
            <select
              value={formData.sector}
              onChange={(e) => updateField("sector", e.target.value)}
              className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
              required
            >
              <option value="">Select sector</option>
              {sectors.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={3}
            className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="font-semibold text-lg">Target Parameters</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Base Year</label>
            <input
              type="number"
              value={formData.baseYear}
              onChange={(e) => updateField("baseYear", parseInt(e.target.value))}
              className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Target Year</label>
            <input
              type="number"
              value={formData.targetYear}
              onChange={(e) => updateField("targetYear", parseInt(e.target.value))}
              className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Reduction (%)</label>
            <input
              type="number"
              value={formData.reductionPercent}
              onChange={(e) => updateField("reductionPercent", parseFloat(e.target.value))}
              min={0}
              max={100}
              className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Baseline Emissions (MtCO2e)</label>
            <input
              type="number"
              value={formData.baselineEmissions}
              onChange={(e) => updateField("baselineEmissions", parseFloat(e.target.value))}
              className="w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="font-semibold text-lg">GHG Coverage</h2>
        <div className="flex flex-wrap gap-3">
          {ghgGases.map((gas) => (
            <label key={gas} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.ghgCovered.includes(gas)}
                onChange={() => toggleGHG(gas)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{gas}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {isEditing ? "Update Target" : "Create Target"}
        </button>
      </div>
    </form>
  );
}
