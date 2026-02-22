"use client";

import { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Eye,
  Download,
  Edit3,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  Printer,
  RefreshCw,
  Shield,
} from "lucide-react";

type SectionStatus = "complete" | "in-progress" | "draft" | "not-started";

interface BTRSection {
  id: string;
  title: string;
  description: string;
  status: SectionStatus;
  wordCount: number;
  targetWords: number;
  lastEdited: string;
  subsections: { id: string; title: string; status: SectionStatus }[];
  complianceNotes: string[];
}

const btrSections: BTRSection[] = [
  { id: "3.1", title: "National Circumstances", description: "Information on national circumstances relevant to the understanding of progress in implementation and achievement of the NDC.", status: "complete", wordCount: 3200, targetWords: 3000, lastEdited: "2024-12-15", subsections: [{ id: "3.1.1", title: "Geography and climate", status: "complete" }, { id: "3.1.2", title: "Population and economy", status: "complete" }, { id: "3.1.3", title: "Energy system", status: "complete" }, { id: "3.1.4", title: "Institutional arrangements", status: "complete" }], complianceNotes: ["All required elements addressed per Decision 18/CMA.1 para 65"] },
  { id: "3.2", title: "Description of NDC", description: "Description of the Party's NDC under Article 4, including type, scope, coverage, quantified targets, and timeframes.", status: "complete", wordCount: 4500, targetWords: 4000, lastEdited: "2024-12-20", subsections: [{ id: "3.2.1", title: "NDC target type and scope", status: "complete" }, { id: "3.2.2", title: "Target year and period", status: "complete" }, { id: "3.2.3", title: "Sectors and gases covered", status: "complete" }, { id: "3.2.4", title: "Conditionality", status: "complete" }, { id: "3.2.5", title: "Use of market mechanisms", status: "complete" }], complianceNotes: ["Aligned with ICTU guidance", "Covers all mandatory elements per MPGs"] },
  { id: "3.3", title: "Progress Indicators", description: "Information necessary to track progress made in implementing and achieving the NDC, including selected indicators and their values.", status: "in-progress", wordCount: 2800, targetWords: 5000, lastEdited: "2025-01-18", subsections: [{ id: "3.3.1", title: "Reference point(s)", status: "complete" }, { id: "3.3.2", title: "Time frame(s)", status: "complete" }, { id: "3.3.3", title: "Indicator(s) for tracking progress", status: "in-progress" }, { id: "3.3.4", title: "Structured summary (CTF tables)", status: "draft" }], complianceNotes: ["CTF Table 4 needs completion", "Progress indicators need latest 2023 data"] },
  { id: "3.4", title: "Mitigation Policies and Measures", description: "Information on each mitigation action, policy, and measure, including their effects, status, and contribution to achieving the NDC.", status: "in-progress", wordCount: 5200, targetWords: 8000, lastEdited: "2025-01-22", subsections: [{ id: "3.4.1", title: "Description of policies and measures", status: "complete" }, { id: "3.4.2", title: "Estimated mitigation impact", status: "in-progress" }, { id: "3.4.3", title: "Methodologies and assumptions", status: "draft" }, { id: "3.4.4", title: "CTF Table 3 (Policies and measures)", status: "in-progress" }], complianceNotes: ["Need to complete impact estimates for 3 policies", "CTF Table 3 partially filled"] },
  { id: "3.5", title: "Projected Emissions", description: "Projections of GHG emissions under with-existing-measures (WEM) and with-additional-measures (WAM) scenarios.", status: "draft", wordCount: 1500, targetWords: 4000, lastEdited: "2025-01-10", subsections: [{ id: "3.5.1", title: "Methodology and models", status: "draft" }, { id: "3.5.2", title: "WEM scenario projections", status: "draft" }, { id: "3.5.3", title: "WAM scenario projections", status: "not-started" }, { id: "3.5.4", title: "CTF Table 5 (Projections)", status: "not-started" }], complianceNotes: ["Projections need to extend to 2035", "Need to include sensitivity analysis"] },
  { id: "3.6", title: "Assessment of Progress", description: "Assessment of whether the Party is on track to achieving its NDC target, including a structured summary.", status: "not-started", wordCount: 0, targetWords: 3000, lastEdited: "--", subsections: [{ id: "3.6.1", title: "Comparison of indicators to targets", status: "not-started" }, { id: "3.6.2", title: "Assessment of achievement", status: "not-started" }, { id: "3.6.3", title: "Mitigation co-benefits of adaptation", status: "not-started" }, { id: "3.6.4", title: "Structured summary", status: "not-started" }], complianceNotes: ["Depends on completion of sections 3.3-3.5", "Need final 2023 GHG inventory data"] },
];

const complianceChecks = [
  { requirement: "All mandatory reporting elements covered", status: "pass" as const },
  { requirement: "Common Tabular Format (CTF) tables included", status: "partial" as const },
  { requirement: "Consistent with national GHG inventory", status: "pass" as const },
  { requirement: "Methodologies and assumptions documented", status: "partial" as const },
  { requirement: "Information on conditionality provided", status: "pass" as const },
  { requirement: "Aligned with Decision 18/CMA.1 guidance", status: "pass" as const },
  { requirement: "Projections extend to end of NDC period", status: "fail" as const },
  { requirement: "Structured summary provided", status: "fail" as const },
];

function getStatusConfig(status: SectionStatus) {
  switch (status) {
    case "complete": return { label: "Complete", badge: "badge-on-track", icon: CheckCircle2, color: "text-emerald-500" };
    case "in-progress": return { label: "In Progress", badge: "badge-at-risk", icon: Clock, color: "text-amber-500" };
    case "draft": return { label: "Draft", badge: "badge-info", icon: Edit3, color: "text-blue-500" };
    case "not-started": return { label: "Not Started", badge: "badge-warning", icon: AlertCircle, color: "text-gray-400" };
  }
}

export default function BTRChapter3Page() {
  const [expandedSection, setExpandedSection] = useState<string | null>("3.3");
  const totalWords = btrSections.reduce((s, sec) => s + sec.wordCount, 0);
  const targetWords = btrSections.reduce((s, sec) => s + sec.targetWords, 0);
  const completedSections = btrSections.filter(s => s.status === "complete").length;
  const totalSections = btrSections.length;
  const overallProgress = (completedSections / totalSections) * 100;
  const passCount = complianceChecks.filter(c => c.status === "pass").length;
  const totalChecks = complianceChecks.length;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20"><BookOpen className="h-5 w-5 text-white" /></div>
            <div><h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">BTR Chapter 3</h1><p className="text-sm text-[hsl(var(--color-text-muted))]">NDC Progress Tracking for Kenya&apos;s Biennial Transparency Report</p></div>
          </div>
        </div>
        <div className="flex items-center gap-2"><button className="btn-secondary"><Eye className="h-4 w-4" />Preview</button><button className="btn-secondary"><Download className="h-4 w-4" />Export</button><button className="btn-primary"><RefreshCw className="h-4 w-4" />Generate Draft</button></div>
      </div>

      <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-elevated"><div className="flex items-center gap-3"><div className="icon-container-md bg-emerald-50"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div><div><p className="text-2xl font-bold text-[hsl(var(--color-text))]">{completedSections}/{totalSections}</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Sections Complete</p></div></div><div className="mt-3 progress-bar progress-bar-success"><div className="progress-bar-fill animate-progress-fill" style={{ width: `${overallProgress}%` }} /></div></div>
        <div className="card-elevated"><div className="flex items-center gap-3"><div className="icon-container-md bg-blue-50"><FileText className="h-5 w-5 text-blue-600" /></div><div><p className="text-2xl font-bold text-[hsl(var(--color-text))]">{(totalWords / 1000).toFixed(1)}k</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Words Written</p></div></div><div className="mt-3 progress-bar"><div className="progress-bar-fill animate-progress-fill" style={{ width: `${(totalWords / targetWords) * 100}%` }} /></div><p className="mt-1 text-[10px] text-[hsl(var(--color-text-muted))]">of {(targetWords / 1000).toFixed(0)}k target</p></div>
        <div className="card-elevated"><div className="flex items-center gap-3"><div className="icon-container-md bg-indigo-50"><Shield className="h-5 w-5 text-indigo-600" /></div><div><p className="text-2xl font-bold text-[hsl(var(--color-text))]">{passCount}/{totalChecks}</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Compliance Checks</p></div></div><div className="mt-3 progress-bar progress-bar-warning"><div className="progress-bar-fill animate-progress-fill" style={{ width: `${(passCount / totalChecks) * 100}%` }} /></div></div>
        <div className="card-elevated"><div className="flex items-center gap-3"><div className="icon-container-md bg-amber-50"><Clock className="h-5 w-5 text-amber-600" /></div><div><p className="text-2xl font-bold text-amber-600">Jun 2025</p><p className="text-xs text-[hsl(var(--color-text-muted))]">Submission Deadline</p></div></div></div>
      </div>

      <div className="card-elevated">
        <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Chapter 3 Sections (per MPGs)</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Modalities, Procedures, and Guidelines for the Enhanced Transparency Framework (Decision 18/CMA.1)</p></div>
        <div className="space-y-3">
          {btrSections.map((section) => {
            const isExpanded = expandedSection === section.id;
            const statusCfg = getStatusConfig(section.status);
            const StatusIcon = statusCfg.icon;
            const wordProgress = section.targetWords > 0 ? (section.wordCount / section.targetWords) * 100 : 0;
            return (
              <div key={section.id} className="rounded-lg border border-[hsl(var(--color-border-light))] overflow-hidden">
                <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[hsl(var(--color-surface-hover))] transition-colors" onClick={() => setExpandedSection(isExpanded ? null : section.id)}>
                  <StatusIcon className={`h-5 w-5 ${statusCfg.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2"><span className="text-xs font-bold text-[hsl(var(--color-primary))]">Section {section.id}</span><h4 className="text-sm font-bold text-[hsl(var(--color-text))]">{section.title}</h4><span className={statusCfg.badge}>{statusCfg.label}</span></div>
                    <p className="mt-0.5 text-xs text-[hsl(var(--color-text-muted))] truncate">{section.description}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0 text-xs text-[hsl(var(--color-text-muted))]">
                    <div className="text-right hidden sm:block"><p className="font-semibold text-[hsl(var(--color-text))]">{section.wordCount.toLocaleString()}</p><p className="text-[10px]">words</p></div>
                    <div className="hidden sm:block text-right"><p className="font-semibold text-[hsl(var(--color-text))]">{section.lastEdited}</p><p className="text-[10px]">last edited</p></div>
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                </div>
                {isExpanded && (
                  <div className="border-t border-[hsl(var(--color-border-light))] p-4 bg-[hsl(var(--color-surface-hover))] animate-fade-up">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      <div className="lg:col-span-2">
                        <h5 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-3">Subsections</h5>
                        <div className="space-y-2">
                          {section.subsections.map((sub) => { const subCfg = getStatusConfig(sub.status); const SubIcon = subCfg.icon; return (
                            <div key={sub.id} className="flex items-center gap-3 rounded-lg bg-[hsl(var(--color-surface))] p-3"><SubIcon className={`h-4 w-4 ${subCfg.color}`} /><span className="text-xs font-semibold text-[hsl(var(--color-primary))]">{sub.id}</span><span className="text-xs text-[hsl(var(--color-text))] flex-1">{sub.title}</span><span className={subCfg.badge}>{subCfg.label}</span></div>
                          ); })}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-3">Progress</h5>
                        <div className="space-y-3">
                          <div><div className="flex items-center justify-between text-xs mb-1"><span className="text-[hsl(var(--color-text-secondary))]">Word Count</span><span className="font-semibold text-[hsl(var(--color-text))]">{section.wordCount.toLocaleString()} / {section.targetWords.toLocaleString()}</span></div><div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${Math.min(wordProgress, 100)}%` }} /></div></div>
                          <div className="flex items-center justify-between text-xs"><span className="text-[hsl(var(--color-text-secondary))]">Last Edited</span><span className="font-semibold text-[hsl(var(--color-text))]">{section.lastEdited}</span></div>
                        </div>
                        {section.complianceNotes.length > 0 && (<div className="mt-4"><h5 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-2">Compliance Notes</h5><div className="space-y-1.5">{section.complianceNotes.map((note, i) => (<div key={i} className="flex items-start gap-2 text-[11px] text-[hsl(var(--color-text-secondary))]"><AlertTriangle className="h-3 w-3 mt-0.5 text-amber-500 flex-shrink-0" />{note}</div>))}</div></div>)}
                        <div className="mt-4 flex gap-2"><button className="btn-primary text-xs py-1.5 px-3"><Edit3 className="h-3 w-3" />Edit</button><button className="btn-secondary text-xs py-1.5 px-3"><Eye className="h-3 w-3" />Preview</button></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="card-elevated">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-[hsl(var(--color-primary-light))]" /><div><h3 className="text-base font-bold text-[hsl(var(--color-text))]">UNFCCC Compliance Check</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Verification against Enhanced Transparency Framework requirements</p></div></div>
          <button className="btn-secondary"><RefreshCw className="h-4 w-4" />Re-check</button>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {complianceChecks.map((check) => (
            <div key={check.requirement} className="flex items-center gap-3 rounded-lg border border-[hsl(var(--color-border-light))] p-3">
              {check.status === "pass" ? <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" /> : check.status === "partial" ? <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" /> : <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />}
              <span className="text-xs text-[hsl(var(--color-text))] flex-1">{check.requirement}</span>
              <span className={check.status === "pass" ? "badge-on-track" : check.status === "partial" ? "badge-at-risk" : "badge-off-track"}>{check.status === "pass" ? "Pass" : check.status === "partial" ? "Partial" : "Fail"}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-elevated">
        <div className="flex items-start gap-3">
          <div className="icon-container-md bg-indigo-50 flex-shrink-0"><Printer className="h-5 w-5 text-indigo-600" /></div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-[hsl(var(--color-text))]">Generate &amp; Export</h3>
            <p className="text-xs text-[hsl(var(--color-text-muted))] mt-1">Generate a complete draft of BTR Chapter 3 from the data in this system, or export individual sections for review.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="btn-primary"><RefreshCw className="h-4 w-4" />Generate Full Draft</button>
              <button className="btn-secondary"><Download className="h-4 w-4" />Export as Word</button>
              <button className="btn-secondary"><Download className="h-4 w-4" />Export as PDF</button>
              <button className="btn-secondary"><FileText className="h-4 w-4" />Export CTF Tables</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
