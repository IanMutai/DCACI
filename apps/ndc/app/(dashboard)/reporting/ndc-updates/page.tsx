"use client";

import { useState } from "react";
import {
  FileBarChart,
  Calendar,
  CheckCircle2,
  Clock,
  Globe2,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Download,
  Eye,
  Upload,
  Edit3,
  ChevronRight,
} from "lucide-react";

interface NDCVersion {
  version: string;
  title: string;
  submissionDate: string;
  unfcccRef: string;
  status: "submitted" | "in-preparation" | "planned";
  keyTargets: { label: string; value: string }[];
  enhancements: string[];
  documents: { name: string; type: string; size: string }[];
}

const ndcVersions: NDCVersion[] = [
  { version: "1st NDC", title: "Kenya's Intended Nationally Determined Contribution", submissionDate: "2016-12-28", unfcccRef: "NDC Registry - Kenya (2016)", status: "submitted", keyTargets: [{ label: "Unconditional Target", value: "30% GHG reduction by 2030 vs BAU" }, { label: "Conditional Target", value: "Additional emissions reduction subject to international support" }, { label: "Base Year", value: "2010" }, { label: "Target Year", value: "2030" }, { label: "Scope", value: "Economy-wide (6 sectors)" }, { label: "GHG Covered", value: "CO2, CH4, N2O" }], enhancements: [], documents: [{ name: "Kenya_INDC_2016.pdf", type: "PDF", size: "2.4 MB" }, { name: "Kenya_INDC_Technical_Analysis.pdf", type: "PDF", size: "1.8 MB" }] },
  { version: "Updated NDC", title: "Kenya's Updated Nationally Determined Contribution", submissionDate: "2020-12-24", unfcccRef: "NDC Registry - Kenya (2020)", status: "submitted", keyTargets: [{ label: "Unconditional Target", value: "32% GHG reduction by 2030 vs BAU" }, { label: "Conditional Target", value: "Additional 10% (total 42%) with international support" }, { label: "Base Year", value: "2015" }, { label: "Target Year", value: "2030" }, { label: "Scope", value: "Economy-wide (7 sectors including LULUCF)" }, { label: "GHG Covered", value: "CO2, CH4, N2O, HFCs" }, { label: "Adaptation Component", value: "Enhanced adaptation priorities across 8 sectors" }], enhancements: ["Raised unconditional target from 30% to 32%", "Added explicit conditional target of 42%", "Updated base year from 2010 to 2015", "Expanded GHG coverage to include HFCs", "Added LULUCF sector", "Strengthened adaptation component", "Aligned with Long-Term Low Emission Development Strategy"], documents: [{ name: "Kenya_Updated_NDC_2020.pdf", type: "PDF", size: "3.1 MB" }, { name: "Kenya_NDC_Implementation_Plan.pdf", type: "PDF", size: "4.5 MB" }, { name: "Kenya_NDC_Finance_Strategy.pdf", type: "PDF", size: "2.2 MB" }] },
  { version: "2nd NDC", title: "Kenya's Second Nationally Determined Contribution", submissionDate: "2025-02-01", unfcccRef: "In preparation", status: "in-preparation", keyTargets: [{ label: "Unconditional Target", value: "Estimated 35-38% GHG reduction by 2035 vs BAU" }, { label: "Conditional Target", value: "Up to 47% with full international support" }, { label: "Base Year", value: "2015" }, { label: "Target Year", value: "2035" }, { label: "Scope", value: "Economy-wide, all IPCC sectors" }, { label: "GHG Covered", value: "All Kyoto gases" }, { label: "Net-Zero Alignment", value: "Pathway to carbon neutrality by 2050" }], enhancements: ["Extended timeframe to 2035 aligned with global stocktake", "Enhanced unconditional ambition (35-38% vs 32%)", "All Kyoto Protocol gases included", "Net-zero 2050 pathway integration", "Strengthened adaptation and loss & damage", "Article 6 carbon market provisions", "Just transition considerations", "Gender-responsive climate action"], documents: [{ name: "Kenya_2nd_NDC_Draft_v2.pdf", type: "PDF", size: "5.8 MB" }, { name: "Kenya_2nd_NDC_Technical_Annex.xlsx", type: "Excel", size: "3.2 MB" }] },
];

const preparationChecklist = [
  { id: 1, task: "Stakeholder consultations completed", status: "complete" as const, dueDate: "2024-09-30" },
  { id: 2, task: "GHG inventory update (2015-2022)", status: "complete" as const, dueDate: "2024-10-15" },
  { id: 3, task: "Sector-level target modeling", status: "complete" as const, dueDate: "2024-11-30" },
  { id: 4, task: "Adaptation needs assessment", status: "complete" as const, dueDate: "2024-12-15" },
  { id: 5, task: "Finance needs assessment update", status: "in-progress" as const, dueDate: "2025-01-31" },
  { id: 6, task: "Policy gap analysis", status: "in-progress" as const, dueDate: "2025-01-31" },
  { id: 7, task: "Draft NDC document", status: "in-progress" as const, dueDate: "2025-02-28" },
  { id: 8, task: "Public review period", status: "pending" as const, dueDate: "2025-03-31" },
  { id: 9, task: "Cabinet approval", status: "pending" as const, dueDate: "2025-05-15" },
  { id: 10, task: "UNFCCC submission", status: "pending" as const, dueDate: "2025-06-30" },
];

export default function NDCUpdatesPage() {
  const [expandedVersion, setExpandedVersion] = useState<string>("2nd NDC");
  const completedTasks = preparationChecklist.filter(t => t.status === "complete").length;
  const totalTasks = preparationChecklist.length;
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20"><FileBarChart className="h-5 w-5 text-white" /></div>
            <div><h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">NDC Updates</h1><p className="text-sm text-[hsl(var(--color-text-muted))]">Manage NDC submissions and track enhanced ambition</p></div>
          </div>
        </div>
        <div className="flex items-center gap-2"><button className="btn-secondary"><Upload className="h-4 w-4" />Upload Document</button><button className="btn-primary"><Edit3 className="h-4 w-4" />Edit Draft</button></div>
      </div>

      <div className="card-elevated">
        <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">NDC Submission Timeline</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Kenya&apos;s nationally determined contributions under the Paris Agreement</p></div>
        <div className="flex items-center gap-4 mb-6 px-4">
          {ndcVersions.map((ndc, idx) => (
            <div key={ndc.version} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${ndc.status === "submitted" ? "bg-emerald-500" : ndc.status === "in-preparation" ? "bg-amber-500" : "bg-gray-300"} text-white font-bold text-sm`}>{idx + 1}</div>
                <p className="mt-2 text-xs font-bold text-[hsl(var(--color-text))]">{ndc.version}</p>
                <p className="text-[10px] text-[hsl(var(--color-text-muted))]">{new Date(ndc.submissionDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</p>
              </div>
              {idx < ndcVersions.length - 1 && <ArrowRight className={`h-5 w-5 mx-2 flex-shrink-0 ${ndcVersions[idx + 1]?.status === "submitted" ? "text-emerald-500" : "text-[hsl(var(--color-border))]"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="stagger-children space-y-4">
        {ndcVersions.map((ndc) => {
          const isExpanded = expandedVersion === ndc.version;
          return (
            <div key={ndc.version} className="card-interactive" onClick={() => setExpandedVersion(isExpanded ? "" : ndc.version)}>
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 ${ndc.status === "submitted" ? "bg-emerald-50" : ndc.status === "in-preparation" ? "bg-amber-50" : "bg-gray-50"}`}>
                  <Globe2 className={`h-6 w-6 ${ndc.status === "submitted" ? "text-emerald-600" : ndc.status === "in-preparation" ? "text-amber-600" : "text-gray-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-[hsl(var(--color-text))]">{ndc.version}</h3>
                    <span className={ndc.status === "submitted" ? "badge-on-track" : ndc.status === "in-preparation" ? "badge-at-risk" : "badge-info"}>{ndc.status === "submitted" ? "Submitted" : ndc.status === "in-preparation" ? "In Preparation" : "Planned"}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-[hsl(var(--color-text-secondary))]">{ndc.title}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-[hsl(var(--color-text-muted))]">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(ndc.submissionDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Globe2 className="h-3 w-3" />{ndc.unfcccRef}</span>
                  </div>
                </div>
                <ChevronRight className={`h-5 w-5 text-[hsl(var(--color-text-muted))] transition-transform flex-shrink-0 ${isExpanded ? "rotate-90" : ""}`} />
              </div>
              {isExpanded && (
                <div className="mt-4 border-t border-[hsl(var(--color-border-light))] pt-4 animate-fade-up" onClick={(e) => e.stopPropagation()}>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-3">Key Targets</h4>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {ndc.keyTargets.map((t) => (<div key={t.label} className="rounded-lg bg-[hsl(var(--color-primary-50))] p-3"><p className="text-[10px] font-semibold text-[hsl(var(--color-text-muted))] uppercase tracking-wider">{t.label}</p><p className="mt-0.5 text-xs font-semibold text-[hsl(var(--color-primary))]">{t.value}</p></div>))}
                      </div>
                      {ndc.enhancements.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-3">Enhanced Ambition (vs Previous)</h4>
                          <div className="space-y-1.5">{ndc.enhancements.map((e, i) => (<div key={i} className="flex items-center gap-2 text-xs text-[hsl(var(--color-text))]"><ArrowUpRight className="h-3 w-3 text-emerald-500 flex-shrink-0" />{e}</div>))}</div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-3">Documents</h4>
                      <div className="space-y-2">
                        {ndc.documents.map((doc) => (<div key={doc.name} className="flex items-center gap-3 rounded-lg border border-[hsl(var(--color-border-light))] p-3 hover:bg-[hsl(var(--color-surface-hover))] cursor-pointer transition-colors"><FileText className="h-4 w-4 text-[hsl(var(--color-primary-light))]" /><div className="flex-1 min-w-0"><p className="text-xs font-semibold text-[hsl(var(--color-text))] truncate">{doc.name}</p><p className="text-[10px] text-[hsl(var(--color-text-muted))]">{doc.type} - {doc.size}</p></div><Download className="h-3.5 w-3.5 text-[hsl(var(--color-text-muted))]" /></div>))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="card-elevated">
        <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Ambition Enhancement Comparison</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Progressive ambition increase across NDC cycles</p></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-[hsl(var(--color-border))]"><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Parameter</th><th className="pb-3 text-center text-xs font-semibold text-[hsl(var(--color-text-muted))]">1st NDC (2016)</th><th className="pb-3 text-center text-xs font-semibold text-[hsl(var(--color-text-muted))]">Updated NDC (2020)</th><th className="pb-3 text-center text-xs font-semibold text-[hsl(var(--color-text-muted))]">2nd NDC (Draft)</th></tr></thead>
            <tbody>
              {[{ param: "Unconditional Target", v1: "30%", v2: "32%", v3: "35-38%" }, { param: "Conditional Target", v1: "Not specified", v2: "42%", v3: "47%" }, { param: "Target Year", v1: "2030", v2: "2030", v3: "2035" }, { param: "Base Year", v1: "2010", v2: "2015", v3: "2015" }, { param: "GHG Coverage", v1: "CO2, CH4, N2O", v2: "CO2, CH4, N2O, HFCs", v3: "All Kyoto gases" }, { param: "Sectors", v1: "6 sectors", v2: "7 sectors (+ LULUCF)", v3: "All IPCC sectors" }, { param: "Adaptation", v1: "Limited", v2: "Enhanced", v3: "Comprehensive + L&D" }, { param: "Net-Zero Alignment", v1: "No", v2: "No", v3: "Yes (2050)" }].map((row) => (
                <tr key={row.param} className="border-b border-[hsl(var(--color-border-light))]"><td className="py-2.5 text-xs font-semibold text-[hsl(var(--color-text))]">{row.param}</td><td className="py-2.5 text-center text-xs text-[hsl(var(--color-text-secondary))]">{row.v1}</td><td className="py-2.5 text-center text-xs text-[hsl(var(--color-text-secondary))]">{row.v2}</td><td className="py-2.5 text-center text-xs font-semibold text-[hsl(var(--color-primary))]">{row.v3}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-elevated">
        <div className="flex items-center justify-between mb-4">
          <div><h3 className="text-base font-bold text-[hsl(var(--color-text))]">2nd NDC Preparation Checklist</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">{completedTasks} of {totalTasks} tasks completed</p></div>
          <div className="flex items-center gap-2"><div className="w-32 progress-bar"><div className="progress-bar-fill animate-progress-fill" style={{ width: `${progress}%` }} /></div><span className="text-xs font-bold text-[hsl(var(--color-primary))]">{progress.toFixed(0)}%</span></div>
        </div>
        <div className="space-y-2">
          {preparationChecklist.map((task) => (
            <div key={task.id} className="flex items-center gap-3 rounded-lg border border-[hsl(var(--color-border-light))] px-4 py-3">
              {task.status === "complete" ? <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" /> : task.status === "in-progress" ? <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" /> : <div className="h-5 w-5 rounded-full border-2 border-[hsl(var(--color-border))] flex-shrink-0" />}
              <div className="flex-1 min-w-0"><p className={`text-sm ${task.status === "complete" ? "text-[hsl(var(--color-text-muted))] line-through" : "text-[hsl(var(--color-text))] font-medium"}`}>{task.task}</p></div>
              <div className="flex items-center gap-2 flex-shrink-0"><span className="text-xs text-[hsl(var(--color-text-muted))]">{new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span><span className={task.status === "complete" ? "badge-on-track" : task.status === "in-progress" ? "badge-at-risk" : "badge-info"}>{task.status === "complete" ? "Done" : task.status === "in-progress" ? "In Progress" : "Pending"}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
