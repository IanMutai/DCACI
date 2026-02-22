"use client";

import { useState } from "react";

export function ReviewForm() {
  const [formData, setFormData] = useState({
    sector: "",
    reviewType: "tier1_qc",
    findings: "",
    recommendation: "approve",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Review submitted.");
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Submit New Review</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sector
          </label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select sector...</option>
            <option value="energy">Energy</option>
            <option value="ippu">IPPU</option>
            <option value="agriculture">Agriculture</option>
            <option value="lulucf">LULUCF</option>
            <option value="waste">Waste</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review Type
          </label>
          <select
            name="reviewType"
            value={formData.reviewType}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="tier1_qc">Tier 1 QC (General)</option>
            <option value="tier2_qc">Tier 2 QC (Category-specific)</option>
            <option value="qa_expert">QA Expert Review</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Findings
          </label>
          <textarea
            name="findings"
            value={formData.findings}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your review findings..."
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recommendation
          </label>
          <div className="flex gap-4">
            {[
              { value: "approve", label: "Approve" },
              { value: "revise", label: "Request Revision" },
              { value: "reject", label: "Reject" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="recommendation"
                  value={option.value}
                  checked={formData.recommendation === option.value}
                  onChange={handleChange}
                  className="text-green-600"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
