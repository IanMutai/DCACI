"use client";

import { useState } from "react";
import {
  FileText,
  BookOpen,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Printer,
  ChevronRight,
  Layers,
  ListChecks,
  Globe,
} from "lucide-react";

interface NIRChapter {
  id: number;
  title: string;
  status: "complete" | "in_progress" | "draft" | "pending";
  pages: number;
  completeness: number;
  description: string;
}

const nirChapters: NIRChapter[] = [
  { id: 1, title: "Executive Summary", status: "complete", pages: 12, completeness: 100, description: "Overview of national emissions, trends, key findings, and institutional arrangements." },
  { id: 2, title: "National Circumstances", status: "complete", pages: 25, completeness: 100, description: "Geographic, demographic, economic, and climate context relevant to GHG emissions." },
  { id: 3, title: "Energy (CRF Sector 1)", status: "in_progress", pages: 45, completeness: 85, description: "Fuel combustion, fugitive emissions, and CO2 transport and storage." },
  { id: 4, title: "Industrial Processes and Product Use (CRF Sector 2)", status: "in_progress", pages: 30, completeness: 70, description: "Process emissions from mineral, chemical, metal industries and product use." },
  { id: 5, title: "Agriculture (CRF Sector 3)", status: "draft", pages: 35, completeness: 50, description: "Enteric fermentation, manure management, rice cultivation, agricultural soils." },
  { id: 6, title: "Land Use, Land-Use Change and Forestry (CRF Sector 4)", status: "draft", pages: 28, completeness: 40, description: "Forest land, cropland, grassland, wetlands, settlements, other land." },
  { id: 7, title: "Waste (CRF Sector 5)", status: "pending", pages: 0, completeness: 15, description: "Solid waste disposal, biological treatment, wastewater treatment and discharge." },
  { id: 8, title: "Cross-cutting: Recalculations & Improvements", status: "pending", pages: 0, completeness: 10, description: "Time series recalculations, planned improvements, and trend analysis." },
  { id: 9, title: "Cross-cutting: QA/QC", status: "pending", pages: 0, completeness: 20, description: "Quality management plan, Tier 1/2 QC results, expert review outcomes." },
  { id: 10, title: "Cross-cutting: Uncertainty Analysis", status: "draft", pages: 8, completeness: 60, description: "Approach 1 uncertainty assessment and sensitivity analysis for key categories." },
];

const submissionChecklist = [
  { item: "NIR document finalized and reviewed", completed: false },
  { item: "CRF tables completed and validated", completed: false },
  { item: "Executive summary updated with final figures", completed: false },
  { item: "All notation keys applied correctly", completed: true },
  { item: "Key category analysis included", completed: true },
  { item: "Uncertainty analysis complete", completed: false },
  { item: "QA/QC documentation included", completed: false },
  { item: "National focal point approval obtained", completed: false },
  { item: "Document formatted per UNFCCC requirements", completed: false },
  { item: "Submission portal accessed and tested", completed: true },
];

const statusConfig: Record<string, { badge: string; label: string }> = {
  complete: { badge: "badge-success badge-dot", label: "Complete" },
  in_progress: { badge: "badge-warning badge-dot", label: "In Progress" },
  draft: { badge: "badge-accent badge-dot", label: "Draft" },
  pending: { badge: "badge-neutral badge-dot", label: "Pending" },
};

export default function NIRPage() {
  const [generating, setGenerating] = useState(false);
  const [format, setFormat] = useState("pdf");
  const [year, setYear] = useState("2022");

  const totalPages = nirChapters.reduce((sum, ch) => sum + ch.pages, 0);
  const overallCompleteness = Math.round(nirChapters.reduce((sum, ch) => sum + ch.completeness, 0) / nirChapters.length);
  const completedChapters = nirChapters.filter((ch) => ch.status === "complete").length;
  const checklistCompleted = submissionChecklist.filter((c) => c.completed).length;

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">National Inventory Report (NIR)</h1>
            <p className="mt-1 text-sm text-gray-500">
              Generate and manage the National Inventory Report for UNFCCC submission
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reporting/btr" className="btn-secondary btn-sm">BTR Report</a>
          <a href="/reporting/exports" className="btn-secondary btn-sm">Exports</a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 stagger-children">
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Overall Completeness</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{overallCompleteness}%</p>
          <div className="mt-2 progress-bar">
            <div className="progress-bar-fill primary" style={{ "--progress-width": `${overallCompleteness}%` } as React.CSSProperties} />
          </div>
        </div>
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Chapters Complete</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{completedChapters}/{nirChapters.length}</p>
        </div>
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Pages</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{totalPages}</p>
          <p className="text-xs text-gray-400 mt-0.5">Draft pages written</p>
        </div>
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Submission Checklist</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{checklistCompleted}/{submissionChecklist.length}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chapter List */}
        <div className="lg:col-span-2 space-y-6 animate-fade-up">
          <div className="card-elevated">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">NIR Chapter Structure</h2>
              <span className="badge-primary badge-lg">
                <Layers size={14} /> IPCC Format
              </span>
            </div>
            <div className="space-y-2">
              {nirChapters.map((chapter) => (
                <div key={chapter.id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors cursor-pointer group">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0 text-sm font-bold ${
                    chapter.status === "complete" ? "bg-emerald-100 text-emerald-700" :
                    chapter.status === "in_progress" ? "bg-amber-100 text-amber-700" :
                    chapter.status === "draft" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {chapter.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{chapter.title}</p>
                      <span className={statusConfig[chapter.status]!.badge}>
                        {statusConfig[chapter.status]!.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{chapter.description}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[200px]">
                        <div
                          className={`h-full rounded-full ${
                            chapter.completeness === 100 ? "bg-emerald-500" :
                            chapter.completeness >= 50 ? "bg-amber-400" : "bg-gray-300"
                          }`}
                          style={{ width: `${chapter.completeness}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">{chapter.completeness}%</span>
                      {chapter.pages > 0 && (
                        <span className="text-[10px] text-gray-400">{chapter.pages} pages</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* UNFCCC Submission Checklist */}
          <div className="card-elevated">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ListChecks size={16} className="text-emerald-600" />
              UNFCCC Submission Checklist
            </h3>
            <div className="space-y-1.5">
              {submissionChecklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-gray-50">
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0 ${
                    item.completed ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"
                  }`}>
                    {item.completed ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                  </div>
                  <span className={`text-sm flex-1 ${item.completed ? "text-gray-500 line-through" : "text-gray-800"}`}>
                    {item.item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report Generator */}
        <div className="animate-slide-in-right">
          <div className="card-elevated sticky top-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={16} className="text-emerald-600" />
              Generate NIR
            </h3>
            <div className="space-y-4">
              <div>
                <label className="input-label">Inventory Year</label>
                <select className="select-field" value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>
              <div>
                <label className="input-label">Output Format</label>
                <select className="select-field" value={format} onChange={(e) => setFormat(e.target.value)}>
                  <option value="pdf">PDF Document</option>
                  <option value="docx">Word Document (.docx)</option>
                  <option value="html">HTML</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                  <span className="text-sm text-gray-700">Include CRF Summary Tables</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                  <span className="text-sm text-gray-700">Include Trend Charts</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-emerald-600" />
                  <span className="text-sm text-gray-700">Include Appendices</span>
                </label>
              </div>
              <div className="flex gap-2">
                <button className="btn-primary flex-1" onClick={handleGenerate} disabled={generating}>
                  {generating ? <Clock size={16} className="animate-spin" /> : <Download size={16} />}
                  {generating ? "Generating..." : "Generate NIR"}
                </button>
                <button className="btn-secondary">
                  <Eye size={16} />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Previous Reports</h4>
              <div className="space-y-2">
                {["2021 (Final)", "2020 (Final)", "2019 (Final)"].map((report) => (
                  <div key={report} className="flex items-center justify-between py-1.5">
                    <span className="text-sm text-gray-600">NIR {report}</span>
                    <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
