"use client";

import { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Database,
  Code,
  Table2,
  Filter,
  Clock,
  CheckCircle2,
  Archive,
  Layers,
} from "lucide-react";

interface ExportFormat {
  id: string;
  name: string;
  description: string;
  format: string;
  icon: React.ReactNode;
  category: "reporting" | "data" | "custom";
  size: string;
}

const exportFormats: ExportFormat[] = [
  { id: "crf", name: "CRF Tables (Common Reporting Format)", description: "Complete set of CRF tables for UNFCCC submission. Includes Summary, Sectoral, and Trend tables.", format: "XLSX", icon: <Table2 size={20} />, category: "reporting", size: "~4.2 MB" },
  { id: "ctf", name: "Common Tabular Formats (CTF)", description: "BTR common tabular formats per Decision 18/CMA.1 reporting requirements.", format: "XLSX", icon: <Table2 size={20} />, category: "reporting", size: "~2.8 MB" },
  { id: "nir-pdf", name: "National Inventory Report (NIR)", description: "Full NIR document with all chapters, tables, and appendices.", format: "PDF", icon: <FileText size={20} />, category: "reporting", size: "~15 MB" },
  { id: "btr-pdf", name: "BTR Chapter II - GHG Inventory", description: "Biennial Transparency Report GHG inventory chapter.", format: "PDF", icon: <FileText size={20} />, category: "reporting", size: "~8 MB" },
  { id: "summary-csv", name: "Emission Summary Data", description: "Aggregated emissions data by sector, gas, and year in tabular format.", format: "CSV", icon: <FileSpreadsheet size={20} />, category: "data", size: "~120 KB" },
  { id: "time-series", name: "Time Series Data (2016-2022)", description: "Historical emission trends for all sectors and categories.", format: "CSV", icon: <FileSpreadsheet size={20} />, category: "data", size: "~350 KB" },
  { id: "ef-database", name: "Emission Factors Database", description: "Export all emission factors used in the inventory with metadata.", format: "JSON", icon: <Database size={20} />, category: "data", size: "~85 KB" },
  { id: "api-json", name: "Full Inventory (API Format)", description: "Complete inventory data in structured JSON for programmatic access.", format: "JSON", icon: <Code size={20} />, category: "data", size: "~2.1 MB" },
  { id: "crf-xml", name: "CRF XML (Machine-Readable)", description: "CRF data in XML format for automated processing and validation.", format: "XML", icon: <Code size={20} />, category: "data", size: "~1.5 MB" },
];

const exportHistory = [
  { id: 1, name: "CRF Tables 2022", format: "XLSX", date: "2025-12-10", user: "J. Kamau", size: "4.2 MB" },
  { id: 2, name: "NIR 2022 (Draft v3)", format: "PDF", date: "2025-12-08", user: "J. Kamau", size: "14.8 MB" },
  { id: 3, name: "Emission Summary 2022", format: "CSV", date: "2025-12-05", user: "M. Wanjiku", size: "118 KB" },
  { id: 4, name: "BTR Chapter II (Draft)", format: "PDF", date: "2025-11-28", user: "P. Ochieng", size: "7.9 MB" },
  { id: 5, name: "Time Series 2016-2022", format: "CSV", date: "2025-11-20", user: "J. Kamau", size: "342 KB" },
];

const formatBadgeColor: Record<string, string> = {
  XLSX: "badge-success",
  PDF: "badge-danger",
  CSV: "badge-warning",
  JSON: "badge-accent",
  XML: "badge-neutral",
};

export default function ExportsPage() {
  const [exporting, setExporting] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"formats" | "custom" | "history">("formats");
  const [customFilters, setCustomFilters] = useState({
    sectors: ["Energy", "IPPU", "Agriculture", "LULUCF", "Waste"],
    gases: ["CO2", "CH4", "N2O"],
    yearFrom: "2016",
    yearTo: "2022",
    format: "csv",
  });

  const handleExport = (id: string) => {
    setExporting(id);
    setTimeout(() => setExporting(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Download size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Export Center</h1>
            <p className="mt-1 text-sm text-gray-500">
              Export inventory data in various formats for UNFCCC submission, analysis, and sharing
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reporting/nir" className="btn-secondary btn-sm">NIR Report</a>
          <a href="/reporting/btr" className="btn-secondary btn-sm">BTR Report</a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        {[
          { key: "formats" as const, label: "Standard Exports", icon: <Download size={14} /> },
          { key: "custom" as const, label: "Custom Export", icon: <Filter size={14} /> },
          { key: "history" as const, label: "Export History", icon: <Clock size={14} /> },
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

      {/* Standard Exports */}
      {activeTab === "formats" && (
        <div className="space-y-6 animate-fade-up">
          {/* Reporting Formats */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">UNFCCC Reporting Formats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exportFormats.filter((f) => f.category === "reporting").map((fmt) => (
                <div key={fmt.id} className="card-interactive">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 flex-shrink-0">
                        {fmt.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{fmt.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{fmt.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={formatBadgeColor[fmt.format]}>{fmt.format}</span>
                          <span className="text-[10px] text-gray-400">{fmt.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => handleExport(fmt.id)}
                      disabled={exporting === fmt.id}
                    >
                      {exporting === fmt.id ? (
                        <><Clock size={12} className="animate-spin" /> Exporting...</>
                      ) : (
                        <><Download size={12} /> Export</>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Formats */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Data Export Formats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exportFormats.filter((f) => f.category === "data").map((fmt) => (
                <div key={fmt.id} className="card-elevated">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 flex-shrink-0">
                      {fmt.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{fmt.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{fmt.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={formatBadgeColor[fmt.format]}>{fmt.format}</span>
                      <span className="text-[10px] text-gray-400">{fmt.size}</span>
                    </div>
                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => handleExport(fmt.id)}
                      disabled={exporting === fmt.id}
                    >
                      {exporting === fmt.id ? "..." : <Download size={12} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bulk Export */}
          <div className="card-elevated border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Archive size={20} className="text-emerald-600" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Bulk Export - Complete Submission Package</h3>
                  <p className="text-xs text-gray-500">Download all reporting formats as a single ZIP archive for UNFCCC submission</p>
                </div>
              </div>
              <button className="btn-primary" onClick={() => handleExport("bulk")}>
                {exporting === "bulk" ? (
                  <><Clock size={16} className="animate-spin" /> Preparing...</>
                ) : (
                  <><Archive size={16} /> Download All (ZIP)</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Export */}
      {activeTab === "custom" && (
        <div className="card-elevated animate-fade-up">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Custom Data Export</h3>
          <p className="text-xs text-gray-500 mb-6">Configure filters to export specific subsets of inventory data</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="input-label">Sectors</label>
                <div className="space-y-1.5">
                  {["Energy", "IPPU", "Agriculture", "LULUCF", "Waste"].map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                      <span className="text-sm text-gray-700">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="input-label">Gases</label>
                <div className="flex flex-wrap gap-2">
                  {["CO2", "CH4", "N2O", "HFCs", "PFCs", "SF6"].map((g) => (
                    <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked={["CO2", "CH4", "N2O"].includes(g)} className="rounded text-emerald-600" />
                      <span className="text-sm text-gray-700">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="input-label">Year From</label>
                  <select className="select-field" value={customFilters.yearFrom} onChange={(e) => setCustomFilters({ ...customFilters, yearFrom: e.target.value })}>
                    {[2016, 2017, 2018, 2019, 2020, 2021, 2022].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="input-label">Year To</label>
                  <select className="select-field" value={customFilters.yearTo} onChange={(e) => setCustomFilters({ ...customFilters, yearTo: e.target.value })}>
                    {[2016, 2017, 2018, 2019, 2020, 2021, 2022].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="input-label">Export Format</label>
                <select className="select-field" value={customFilters.format} onChange={(e) => setCustomFilters({ ...customFilters, format: e.target.value })}>
                  <option value="csv">CSV</option>
                  <option value="xlsx">Excel (XLSX)</option>
                  <option value="json">JSON</option>
                  <option value="pdf">PDF Report</option>
                </select>
              </div>
              <div>
                <label className="input-label">Data Aggregation</label>
                <select className="select-field">
                  <option>By Category (detailed)</option>
                  <option>By Sector (summary)</option>
                  <option>By Gas</option>
                  <option>Total National</option>
                </select>
              </div>
              <button className="btn-primary w-full mt-2">
                <Download size={16} />
                Generate Custom Export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export History */}
      {activeTab === "history" && (
        <div className="table-container animate-fade-up">
          <table>
            <thead>
              <tr>
                <th>Export Name</th>
                <th>Format</th>
                <th>Date</th>
                <th>User</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {exportHistory.map((exp) => (
                <tr key={exp.id}>
                  <td className="text-sm font-medium text-gray-900">{exp.name}</td>
                  <td><span className={formatBadgeColor[exp.format]}>{exp.format}</span></td>
                  <td className="text-sm text-gray-600">{exp.date}</td>
                  <td className="text-sm text-gray-600">{exp.user}</td>
                  <td className="text-sm text-gray-500">{exp.size}</td>
                  <td>
                    <button className="btn-ghost btn-sm">
                      <Download size={12} />
                      Re-download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
