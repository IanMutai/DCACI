"use client";

import { useState } from "react";
import {
  Globe,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Eye,
  ChevronRight,
  Layers,
  ListChecks,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

interface BTRSection {
  id: number;
  title: string;
  status: "complete" | "in_progress" | "draft" | "pending";
  completeness: number;
  description: string;
  subsections: string[];
}

const btrSections: BTRSection[] = [
  {
    id: 1, title: "National GHG Inventory", status: "in_progress", completeness: 65,
    description: "GHG emissions and removals following the Modalities, Procedures and Guidelines (MPGs)",
    subsections: ["Emission Estimates", "Methodologies", "Key Categories", "Recalculations"],
  },
  {
    id: 2, title: "Emission Trends Analysis", status: "draft", completeness: 45,
    description: "Historical trend analysis of national emissions from 2016 to 2022",
    subsections: ["Time Series Data", "Trend Charts", "Sector Analysis", "Per Capita Trends"],
  },
  {
    id: 3, title: "Common Tabular Formats (CTFs)", status: "in_progress", completeness: 55,
    description: "Standardized CTF tables per Decision 18/CMA.1 and reporting guidance",
    subsections: ["Summary Tables", "Sectoral Tables", "Trend Tables", "Indirect CO2"],
  },
  {
    id: 4, title: "NDC Progress Tracking", status: "draft", completeness: 30,
    description: "Information on progress towards implementation and achievement of NDC targets",
    subsections: ["NDC Targets", "Mitigation Measures", "Progress Indicators", "Projections"],
  },
  {
    id: 5, title: "Methods and Data Sources", status: "draft", completeness: 50,
    description: "Description of methodologies, data sources, and key assumptions used",
    subsections: ["Methodology Description", "Activity Data Sources", "Emission Factors", "GWP Values"],
  },
  {
    id: 6, title: "Key Category Analysis", status: "complete", completeness: 100,
    description: "Key category analysis results and methodology tier justification",
    subsections: ["Level Assessment", "Trend Assessment", "Tier Recommendations"],
  },
  {
    id: 7, title: "Uncertainty Assessment", status: "draft", completeness: 60,
    description: "Quantitative uncertainty assessment for the national inventory",
    subsections: ["Approach 1 Results", "Category Uncertainties", "Improvement Priorities"],
  },
  {
    id: 8, title: "QA/QC and Verification", status: "pending", completeness: 20,
    description: "Quality management system description and verification results",
    subsections: ["QA/QC Plan", "Tier 1 QC Results", "Expert Reviews", "Improvement Plan"],
  },
  {
    id: 9, title: "Support Received", status: "pending", completeness: 10,
    description: "Information on financial, technology transfer, and capacity-building support",
    subsections: ["Financial Support", "Technology Transfer", "Capacity Building"],
  },
  {
    id: 10, title: "Recalculations and Improvements", status: "pending", completeness: 15,
    description: "Recalculations performed and planned improvements for future reporting",
    subsections: ["Recalculation Summary", "Time Series Consistency", "Planned Improvements"],
  },
];

const complianceChecks = [
  { requirement: "National inventory follows 2006 IPCC Guidelines", status: "pass", reference: "MPG para. 20" },
  { requirement: "Time series from 2016 onward included", status: "pass", reference: "MPG para. 22" },
  { requirement: "All gases reported (CO2, CH4, N2O, HFCs, PFCs, SF6, NF3)", status: "pass", reference: "MPG para. 21" },
  { requirement: "Key category analysis performed", status: "pass", reference: "MPG para. 25" },
  { requirement: "Uncertainty assessment included", status: "warning", reference: "MPG para. 29" },
  { requirement: "QA/QC procedures described", status: "warning", reference: "MPG para. 31" },
  { requirement: "CTF tables populated", status: "warning", reference: "MPG para. 37" },
  { requirement: "NDC progress tracking information provided", status: "fail", reference: "MPG para. 65" },
  { requirement: "Support received information included", status: "fail", reference: "MPG para. 118" },
  { requirement: "Document formatted per ETF requirements", status: "warning", reference: "Decision 18/CMA.1" },
];

const statusConfig: Record<string, { badge: string; label: string }> = {
  complete: { badge: "badge-success badge-dot", label: "Complete" },
  in_progress: { badge: "badge-warning badge-dot", label: "In Progress" },
  draft: { badge: "badge-accent badge-dot", label: "Draft" },
  pending: { badge: "badge-neutral badge-dot", label: "Pending" },
};

export default function BTRPage() {
  const [generating, setGenerating] = useState(false);
  const [format, setFormat] = useState("pdf");
  const [activeTab, setActiveTab] = useState<"structure" | "compliance">("structure");

  const overallCompleteness = Math.round(btrSections.reduce((sum, s) => sum + s.completeness, 0) / btrSections.length);
  const passedChecks = complianceChecks.filter((c) => c.status === "pass").length;
  const compliancePct = Math.round((passedChecks / complianceChecks.length) * 100);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Globe size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Biennial Transparency Report (BTR)</h1>
            <p className="mt-1 text-sm text-gray-500">
              BTR preparation under the Enhanced Transparency Framework (ETF) of the Paris Agreement
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reporting/nir" className="btn-secondary btn-sm">NIR Report</a>
          <a href="/reporting/exports" className="btn-secondary btn-sm">Exports</a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 stagger-children">
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">BTR Completeness</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">{overallCompleteness}%</p>
          <div className="mt-2 progress-bar">
            <div className="progress-bar-fill accent" style={{ "--progress-width": `${overallCompleteness}%` } as React.CSSProperties} />
          </div>
        </div>
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">UNFCCC Compliance</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{compliancePct}%</p>
          <p className="text-xs text-gray-400 mt-0.5">{passedChecks}/{complianceChecks.length} checks passed</p>
        </div>
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sections</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {btrSections.filter((s) => s.status === "complete").length}/{btrSections.length}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Chapters complete</p>
        </div>
        <div className="card-stat">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Submission Due</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">Dec 2026</p>
          <p className="text-xs text-gray-400 mt-0.5">BTR-2 deadline</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("structure")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "structure" ? "border-emerald-600 text-emerald-700" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Layers size={14} /> BTR Structure
        </button>
        <button
          onClick={() => setActiveTab("compliance")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "compliance" ? "border-emerald-600 text-emerald-700" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <ShieldCheck size={14} /> Compliance Check
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-fade-up">
          {activeTab === "structure" && (
            <div className="card-elevated">
              <h2 className="text-base font-semibold text-gray-900 mb-4">BTR Chapter Structure (MPGs Format)</h2>
              <div className="space-y-2">
                {btrSections.map((section) => (
                  <div key={section.id} className="rounded-xl border border-gray-100 p-4 hover:border-emerald-200 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 text-xs font-bold ${
                          section.status === "complete" ? "bg-emerald-100 text-emerald-700" :
                          section.status === "in_progress" ? "bg-amber-100 text-amber-700" :
                          section.status === "draft" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-500"
                        }`}>
                          {section.id}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-gray-900">{section.title}</h3>
                            <span className={statusConfig[section.status]!.badge}>
                              {statusConfig[section.status]!.label}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{section.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-11 flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[200px]">
                        <div
                          className={`h-full rounded-full ${
                            section.completeness === 100 ? "bg-emerald-500" :
                            section.completeness >= 50 ? "bg-amber-400" : "bg-gray-300"
                          }`}
                          style={{ width: `${section.completeness}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">{section.completeness}%</span>
                    </div>
                    {section.subsections.length > 0 && (
                      <div className="ml-11 mt-2 flex flex-wrap gap-1">
                        {section.subsections.map((sub) => (
                          <span key={sub} className="badge-neutral text-[10px]">{sub}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "compliance" && (
            <div className="card-elevated">
              <h2 className="text-base font-semibold text-gray-900 mb-4">UNFCCC ETF Compliance Check</h2>
              <div className="space-y-2">
                {complianceChecks.map((check, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 ${
                      check.status === "pass" ? "bg-emerald-100 text-emerald-600" :
                      check.status === "warning" ? "bg-amber-100 text-amber-600" :
                      "bg-red-100 text-red-600"
                    }`}>
                      {check.status === "pass" ? <CheckCircle2 size={12} /> :
                       check.status === "warning" ? <AlertCircle size={12} /> :
                       <AlertCircle size={12} />}
                    </div>
                    <span className="text-sm text-gray-800 flex-1">{check.requirement}</span>
                    <span className="badge-neutral text-[10px] font-mono">{check.reference}</span>
                    <span className={`badge ${
                      check.status === "pass" ? "badge-success" :
                      check.status === "warning" ? "badge-warning" : "badge-danger"
                    }`}>
                      {check.status === "pass" ? "Pass" : check.status === "warning" ? "Partial" : "Missing"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Generator Panel */}
        <div className="animate-slide-in-right">
          <div className="card-elevated sticky top-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Globe size={16} className="text-blue-600" />
              Generate BTR
            </h3>
            <div className="space-y-4">
              <div>
                <label className="input-label">Reporting Period</label>
                <select className="select-field">
                  <option>2022 (BTR-2)</option>
                  <option>2020 (BTR-1)</option>
                </select>
              </div>
              <div>
                <label className="input-label">Output Format</label>
                <select className="select-field" value={format} onChange={(e) => setFormat(e.target.value)}>
                  <option value="pdf">PDF Document</option>
                  <option value="docx">Word (.docx)</option>
                  <option value="html">HTML</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                  <span className="text-sm text-gray-700">Include CTF Tables</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                  <span className="text-sm text-gray-700">Include CRF Summary Tables</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-emerald-600" />
                  <span className="text-sm text-gray-700">Include NDC Tracking Chapter</span>
                </label>
              </div>
              <div className="flex gap-2">
                <button className="btn-accent flex-1" onClick={handleGenerate} disabled={generating}>
                  {generating ? <Clock size={16} className="animate-spin" /> : <Download size={16} />}
                  {generating ? "Generating..." : "Generate BTR"}
                </button>
                <button className="btn-secondary">
                  <Eye size={16} />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Previous Reports</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-gray-600">BTR-1 2020 (Final)</span>
                  <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
