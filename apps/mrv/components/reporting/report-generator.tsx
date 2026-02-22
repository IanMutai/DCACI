"use client";

import { useState } from "react";

interface ReportGeneratorProps {
  reportType: "nir" | "btr";
}

export function ReportGenerator({ reportType }: ReportGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [format, setFormat] = useState("pdf");
  const [year, setYear] = useState("2024");

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      alert(`${reportType.toUpperCase()} report generated in ${format.toUpperCase()} format.`);
    }, 2000);
  };

  const reportTitle = reportType === "nir"
    ? "National Inventory Report"
    : "Biennial Transparency Report - Chapter II";

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 mb-4">
        Generate {reportTitle}
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inventory Year
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Output Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="pdf">PDF Document</option>
            <option value="docx">Word Document (.docx)</option>
            <option value="html">HTML</option>
          </select>
        </div>

        {reportType === "btr" && (
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="text-green-600" />
              <span className="text-sm text-gray-700">
                Include Common Tabular Formats (CTFs)
              </span>
            </label>
          </div>
        )}

        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="text-green-600" />
            <span className="text-sm text-gray-700">
              Include CRF Summary Tables
            </span>
          </label>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {generating ? "Generating Report..." : "Generate Report"}
        </button>

        <div className="border-t pt-4 mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Previous Reports
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {reportType.toUpperCase()} 2023 (Final)
              </span>
              <button className="text-green-600 hover:text-green-800">
                Download
              </button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {reportType.toUpperCase()} 2022 (Final)
              </span>
              <button className="text-green-600 hover:text-green-800">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
