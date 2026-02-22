"use client";

import { useState } from "react";
import {
  FileText,
  BookOpen,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Archive,
  ChevronRight,
  Shield,
  Layers,
  ListChecks,
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  version: string;
  lastUpdated: string;
  status: "current" | "archived" | "draft";
  type: "plan" | "procedure" | "form" | "report";
  description: string;
}

const documents: Document[] = [
  { id: "DOC-001", title: "National GHG Inventory QA/QC Plan", version: "v2.1", lastUpdated: "2025-11-15", status: "current", type: "plan", description: "Comprehensive QA/QC plan covering Tier 1 general checks, Tier 2 category-specific checks, and QA expert review procedures." },
  { id: "DOC-002", title: "Tier 1 General QC Procedures Manual", version: "v1.3", lastUpdated: "2025-10-20", status: "current", type: "procedure", description: "Step-by-step procedures for general quality control checks applied to all inventory categories." },
  { id: "DOC-003", title: "Tier 2 Category-Specific QC Procedures", version: "v1.1", lastUpdated: "2025-09-30", status: "current", type: "procedure", description: "Detailed technical review procedures for key categories including Energy Industries, Transport, and Enteric Fermentation." },
  { id: "DOC-004", title: "Expert Review Guidelines", version: "v1.0", lastUpdated: "2025-08-15", status: "current", type: "procedure", description: "Guidelines for independent expert review of the national inventory, including reviewer qualifications and review protocols." },
  { id: "DOC-005", title: "Data Collection Templates", version: "v2.0", lastUpdated: "2025-07-01", status: "current", type: "form", description: "Standardized data collection forms for each sector with built-in validation and documentation fields." },
  { id: "DOC-006", title: "QA/QC Annual Report 2024", version: "v1.0", lastUpdated: "2025-03-15", status: "archived", type: "report", description: "Annual summary of QA/QC activities, findings, and corrective actions for the 2024 inventory cycle." },
];

const checklistItems = [
  { id: 1, section: "General Inventory", item: "National circumstances documented", status: "completed" },
  { id: 2, section: "General Inventory", item: "Institutional arrangements described", status: "completed" },
  { id: 3, section: "General Inventory", item: "Methods described for all categories", status: "in_progress" },
  { id: 4, section: "General Inventory", item: "Data sources referenced", status: "completed" },
  { id: 5, section: "General Inventory", item: "GWP values documented (AR5)", status: "completed" },
  { id: 6, section: "Key Categories", item: "Key category analysis performed", status: "completed" },
  { id: 7, section: "Key Categories", item: "Tier levels justified for key categories", status: "in_progress" },
  { id: 8, section: "Uncertainty", item: "Approach 1 uncertainty analysis complete", status: "completed" },
  { id: 9, section: "Uncertainty", item: "Category-level uncertainties documented", status: "in_progress" },
  { id: 10, section: "QA/QC", item: "QA/QC plan implemented", status: "completed" },
  { id: 11, section: "QA/QC", item: "Tier 1 QC checks documented", status: "completed" },
  { id: 12, section: "QA/QC", item: "Expert reviews assigned for all key categories", status: "pending" },
  { id: 13, section: "Recalculations", item: "Recalculations documented with justification", status: "completed" },
  { id: 14, section: "Recalculations", item: "Time series consistency maintained", status: "completed" },
  { id: 15, section: "Improvements", item: "Improvement plan updated", status: "in_progress" },
];

const versionHistory = [
  { version: "v2.1", date: "2025-11-15", author: "Inventory Team", changes: "Updated Tier 2 QC procedures for Energy sector. Added reference approach comparison requirement." },
  { version: "v2.0", date: "2025-06-01", author: "Inventory Team", changes: "Major revision: Added Tier 2 QC procedures for key categories. Updated data collection templates." },
  { version: "v1.2", date: "2024-12-15", author: "J. Kamau", changes: "Added expert review checklist. Updated improvement plan priorities." },
  { version: "v1.1", date: "2024-09-01", author: "J. Kamau", changes: "Minor corrections. Added cross-sector validation procedures." },
  { version: "v1.0", date: "2024-03-15", author: "NCTP Team", changes: "Initial QA/QC plan based on 2006 IPCC Guidelines, Volume 1, Chapter 6." },
];

const improvements = [
  { priority: "high", item: "Move Energy sector from Tier 1 to Tier 2 methodology", target: "2026", status: "in_progress" },
  { priority: "high", item: "Develop country-specific emission factors for cement production", target: "2026", status: "in_progress" },
  { priority: "high", item: "Conduct national N2O emission factor study for agricultural soils", target: "2026-2027", status: "pending" },
  { priority: "medium", item: "Improve activity data collection for LULUCF sector", target: "2026", status: "in_progress" },
  { priority: "medium", item: "Implement Monte Carlo uncertainty analysis (Approach 2)", target: "2026", status: "pending" },
  { priority: "low", item: "Automate data import from national statistics databases", target: "2027", status: "pending" },
  { priority: "low", item: "Develop web portal for sector experts to submit data directly", target: "2027", status: "pending" },
];

export default function QAQCDocumentationPage() {
  const [activeTab, setActiveTab] = useState<"plan" | "checklist" | "archive" | "improvements">("plan");

  const completedChecklist = checklistItems.filter((i) => i.status === "completed").length;
  const checklistPct = Math.round((completedChecklist / checklistItems.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">QA/QC Documentation</h1>
            <p className="mt-1 text-sm text-gray-500">
              Quality management plans, procedures, checklists, and archival records per IPCC guidelines
            </p>
          </div>
        </div>
      </div>

      {/* QA/QC Navigation */}
      <div className="flex items-center gap-1 border-b border-gray-200 animate-fade-up">
        <a href="/qaqc/checks" className="px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 -mb-px">
          Automated Checks
        </a>
        <a href="/qaqc/reviews" className="px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 -mb-px">
          Manual Reviews
        </a>
        <a href="/qaqc/documentation" className="px-4 py-2.5 text-sm font-medium border-b-2 border-emerald-600 text-emerald-700 -mb-px">
          Documentation
        </a>
      </div>

      {/* QA/QC Plan Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
        <div className="card-interactive" onClick={() => setActiveTab("plan")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 mb-3">
            <Shield size={18} />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Tier 1 QC - General</h3>
          <p className="text-xs text-gray-500 mt-1">
            Generic quality checks on data processing, handling, completeness, and documentation applied to all categories.
          </p>
          <div className="mt-3">
            <span className="badge-success badge-dot">Active</span>
          </div>
        </div>
        <div className="card-interactive" onClick={() => setActiveTab("plan")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-3">
            <Layers size={18} />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Tier 2 QC - Category-Specific</h3>
          <p className="text-xs text-gray-500 mt-1">
            Detailed technical review of source-specific data, methods, and emission factors for key categories.
          </p>
          <div className="mt-3">
            <span className="badge-success badge-dot">Active</span>
          </div>
        </div>
        <div className="card-interactive" onClick={() => setActiveTab("plan")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 mb-3">
            <ListChecks size={18} />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">QA - Expert Review</h3>
          <p className="text-xs text-gray-500 mt-1">
            Independent expert review of the inventory including methods, assumptions, and documentation.
          </p>
          <div className="mt-3">
            <span className="badge-warning badge-dot">In Progress</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        {[
          { key: "plan" as const, label: "Documents", icon: <FileText size={14} /> },
          { key: "checklist" as const, label: "Checklist", icon: <ListChecks size={14} /> },
          { key: "improvements" as const, label: "Improvement Plan", icon: <Layers size={14} /> },
          { key: "archive" as const, label: "Version History", icon: <Archive size={14} /> },
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

      {/* Documents */}
      {activeTab === "plan" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
          {documents.map((doc) => (
            <div key={doc.id} className="card-elevated">
              <div className="flex items-start justify-between mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 flex-shrink-0">
                  <FileText size={16} />
                </div>
                <span className={doc.status === "current" ? "badge-success" : doc.status === "draft" ? "badge-warning" : "badge-neutral"}>
                  {doc.status}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mt-2">{doc.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span>{doc.version}</span>
                  <span>Updated: {doc.lastUpdated}</span>
                </div>
                <button className="btn-ghost btn-sm">
                  <Download size={12} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Checklist */}
      {activeTab === "checklist" && (
        <div className="space-y-4 animate-fade-up">
          <div className="card-elevated">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Documentation Completeness Checklist</h3>
                <p className="text-xs text-gray-500">Track completion of all required documentation elements</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="progress-bar w-32">
                  <div className="progress-bar-fill primary" style={{ "--progress-width": `${checklistPct}%` } as React.CSSProperties} />
                </div>
                <span className="text-sm font-bold text-emerald-600">{checklistPct}%</span>
              </div>
            </div>
            {Object.entries(
              checklistItems.reduce<Record<string, typeof checklistItems>>((groups, item) => {
                (groups[item.section] = groups[item.section] || []).push(item);
                return groups;
              }, {})
            ).map(([section, items]) => (
              <div key={section} className="mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{section}</h4>
                <div className="space-y-1.5">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-gray-50">
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0 ${
                        item.status === "completed" ? "bg-emerald-100 text-emerald-600" :
                        item.status === "in_progress" ? "bg-amber-100 text-amber-600" :
                        "bg-gray-100 text-gray-400"
                      }`}>
                        {item.status === "completed" ? <CheckCircle2 size={10} /> :
                         item.status === "in_progress" ? <Clock size={10} /> :
                         <AlertCircle size={10} />}
                      </div>
                      <span className={`text-sm flex-1 ${item.status === "completed" ? "text-gray-500 line-through" : "text-gray-800"}`}>
                        {item.item}
                      </span>
                      <span className={`badge ${
                        item.status === "completed" ? "badge-success" :
                        item.status === "in_progress" ? "badge-warning" : "badge-neutral"
                      }`}>
                        {item.status.replace("_", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Improvements */}
      {activeTab === "improvements" && (
        <div className="card-elevated animate-fade-up">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Inventory Improvement Plan</h3>
          <p className="text-xs text-gray-500 mb-4">Planned improvements for future inventory cycles based on QA/QC findings and key category analysis</p>
          <div className="space-y-2.5">
            {improvements.map((imp, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors">
                <span className={`badge flex-shrink-0 ${
                  imp.priority === "high" ? "badge-danger" :
                  imp.priority === "medium" ? "badge-warning" : "badge-neutral"
                }`}>
                  {imp.priority}
                </span>
                <p className="text-sm text-gray-800 flex-1">{imp.item}</p>
                <span className={`badge flex-shrink-0 ${
                  imp.status === "in_progress" ? "badge-warning badge-dot" :
                  imp.status === "completed" ? "badge-success badge-dot" : "badge-neutral badge-dot"
                }`}>
                  {imp.status.replace("_", " ")}
                </span>
                <span className="text-xs text-gray-400 flex-shrink-0 w-20 text-right">{imp.target}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Version History */}
      {activeTab === "archive" && (
        <div className="card-elevated animate-fade-up">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">QA/QC Plan Version History</h3>
          <div className="space-y-4">
            {versionHistory.map((ver, i) => (
              <div key={ver.version} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    i === 0 ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    <Calendar size={14} />
                  </div>
                  {i < versionHistory.length - 1 && <div className="w-px h-full bg-gray-200 mt-1" />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2">
                    <span className={i === 0 ? "badge-primary" : "badge-neutral"}>{ver.version}</span>
                    <span className="text-xs text-gray-500">{ver.date}</span>
                    <span className="text-xs text-gray-400">by {ver.author}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{ver.changes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
