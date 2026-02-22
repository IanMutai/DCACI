"use client";

import { useState } from "react";

interface ActivityDataFormProps {
  sectorCode: string;
}

export function ActivityDataForm({ sectorCode }: ActivityDataFormProps) {
  const [formData, setFormData] = useState({
    categoryCode: "",
    description: "",
    value: "",
    unit: "",
    year: "2024",
    source: "",
    methodology: "measured",
    uncertainty: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit activity data to API
    alert("Activity data saved.");
  };

  const categoryOptions: Record<string, string[]> = {
    "1": ["1.A.1", "1.A.2", "1.A.3", "1.A.4", "1.B.1", "1.B.2"],
    "2": ["2.A.1", "2.A.2", "2.B", "2.C", "2.D", "2.F"],
    "3": ["3.A", "3.B", "3.C", "3.D", "3.E", "3.F"],
    "4": ["4.A", "4.B", "4.C", "4.D", "4.E", "4.F"],
    "5": ["5.A", "5.B", "5.C", "5.D"],
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Add Activity Data - Sector {sectorCode}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IPCC Category
            </label>
            <select
              name="categoryCode"
              value={formData.categoryCode}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select category...</option>
              {(categoryOptions[sectorCode] || []).map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Coal consumption for electricity generation"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Value
            </label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="0.00"
              step="any"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select unit...</option>
              <option value="TJ">TJ (Terajoules)</option>
              <option value="Gg">Gg (Gigagrams)</option>
              <option value="kt">kt (Kilotonnes)</option>
              <option value="heads">heads (Livestock)</option>
              <option value="ha">ha (Hectares)</option>
              <option value="m3">m3 (Cubic meters)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Uncertainty (+/- %)
            </label>
            <input
              type="number"
              name="uncertainty"
              value={formData.uncertainty}
              onChange={handleChange}
              placeholder="e.g., 5"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Source
          </label>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="e.g., National Statistics Bureau Annual Report 2024"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Collection Method
          </label>
          <select
            name="methodology"
            value={formData.methodology}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="measured">Measured / Reported</option>
            <option value="estimated">Estimated</option>
            <option value="modeled">Modeled</option>
            <option value="expert_judgment">Expert Judgment</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
          >
            Save Activity Data
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
