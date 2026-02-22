"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  CheckCircle2,
  Loader2,
  Clock,
  Sparkles,
  ChevronRight,
  FileType,
  Globe2,
  BarChart3,
  BookOpen,
  Edit3,
} from "lucide-react";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: typeof FileText;
  sections: ReportSection[];
  estimatedPages: number;
}

interface ReportSection {
  id: string;
  title: string;
  status: "complete" | "generating" | "pending" | "review";
  wordCount?: number;
}

const templates: ReportTemplate[] = [
  {
    id: "btr",
    name: "Biennial Transparency Report",
    description:
      "Comprehensive BTR for UNFCCC submission covering emissions inventory, NDC progress, and support needs.",
    icon: Globe2,
    estimatedPages: 120,
    sections: [
      { id: "1", title: "Executive Summary", status: "complete", wordCount: 1200 },
      { id: "2", title: "National Circumstances", status: "complete", wordCount: 3400 },
      { id: "3", title: "GHG Inventory", status: "generating" },
      { id: "4", title: "Mitigation Actions & Effects", status: "pending" },
      { id: "5", title: "NDC Progress & Achievement", status: "pending" },
      { id: "6", title: "Adaptation Actions", status: "pending" },
      { id: "7", title: "Support Needed & Received", status: "pending" },
      { id: "8", title: "Appendices & Data Tables", status: "pending" },
    ],
  },
  {
    id: "ndc-progress",
    name: "NDC Progress Report",
    description:
      "Tracking progress against nationally determined contributions with sector-level analysis.",
    icon: BarChart3,
    estimatedPages: 45,
    sections: [
      { id: "1", title: "Overview & Summary", status: "complete", wordCount: 800 },
      { id: "2", title: "Target Analysis", status: "complete", wordCount: 2100 },
      { id: "3", title: "Sector Progress", status: "complete", wordCount: 4500 },
      { id: "4", title: "Gap Assessment", status: "generating" },
      { id: "5", title: "Recommendations", status: "pending" },
    ],
  },
  {
    id: "annual",
    name: "Annual Report",
    description:
      "Year-end summary of climate action activities, emissions data, and project performance.",
    icon: BookOpen,
    estimatedPages: 60,
    sections: [
      { id: "1", title: "Year in Review", status: "pending" },
      { id: "2", title: "Emissions Summary", status: "pending" },
      { id: "3", title: "Project Highlights", status: "pending" },
      { id: "4", title: "Financial Overview", status: "pending" },
      { id: "5", title: "Outlook", status: "pending" },
    ],
  },
  {
    id: "custom",
    name: "Custom Report",
    description:
      "AI-assisted custom report with your own structure and focus areas.",
    icon: Edit3,
    estimatedPages: 0,
    sections: [],
  },
];

const statusConfig = {
  complete: {
    icon: CheckCircle2,
    label: "Complete",
    color: "var(--success)",
  },
  generating: {
    icon: Loader2,
    label: "Generating...",
    color: "var(--primary)",
  },
  pending: {
    icon: Clock,
    label: "Pending",
    color: "var(--muted-foreground)",
  },
  review: {
    icon: Edit3,
    label: "Needs Review",
    color: "var(--accent)",
  },
};

const exportFormats = [
  { id: "pdf", label: "PDF", ext: ".pdf" },
  { id: "docx", label: "Word", ext: ".docx" },
  { id: "html", label: "HTML", ext: ".html" },
];

export default function ReportGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("btr");
  const [selectedFormat, setSelectedFormat] = useState<string>("pdf");

  const template = templates.find((t) => t.id === selectedTemplate)!;
  const completeSections = template.sections.filter(
    (s) => s.status === "complete"
  ).length;
  const totalSections = template.sections.length;
  const progress =
    totalSections > 0 ? Math.round((completeSections / totalSections) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {templates.map((tmpl) => {
          const Icon = tmpl.icon;
          const isSelected = selectedTemplate === tmpl.id;
          return (
            <button
              key={tmpl.id}
              onClick={() => setSelectedTemplate(tmpl.id)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                isSelected
                  ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)]"
                  : "border-[hsl(var(--border))] bg-white hover:border-[hsl(var(--primary)/0.3)]"
              }`}
            >
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                  isSelected
                    ? "bg-[hsl(var(--primary))] text-white"
                    : "bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                {tmpl.name}
              </h4>
              <p className="mt-1 text-[11px] text-[hsl(var(--muted-foreground))] line-clamp-2">
                {tmpl.description}
              </p>
              {tmpl.estimatedPages > 0 && (
                <span className="mt-2 inline-block text-[10px] font-medium text-[hsl(var(--primary))]">
                  ~{tmpl.estimatedPages} pages
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Report Builder */}
      {template.sections.length > 0 && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sections List */}
          <div className="card-elevated col-span-2 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[hsl(var(--primary))]" />
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">
                  Report Sections
                </h3>
              </div>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                {completeSections}/{totalSections} sections complete
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[hsl(var(--secondary))]">
                <div
                  className="h-full rounded-full bg-[hsl(var(--primary))] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-2">
              {template.sections.map((section, index) => {
                const sConfig = statusConfig[section.status];
                const SIcon = sConfig.icon;
                const isGenerating = section.status === "generating";

                return (
                  <div
                    key={section.id}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      isGenerating
                        ? "animate-pulse-border border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.03)]"
                        : "border border-transparent hover:bg-[hsl(var(--secondary)/0.5)]"
                    }`}
                  >
                    <span className="w-6 text-center text-xs font-medium text-[hsl(var(--muted-foreground))]">
                      {index + 1}
                    </span>
                    <SIcon
                      className={`h-4 w-4 flex-shrink-0 ${isGenerating ? "animate-spin" : ""}`}
                      style={{ color: `hsl(${sConfig.color})` }}
                    />
                    <span className="flex-1 text-sm font-medium text-[hsl(var(--foreground))]">
                      {section.title}
                    </span>
                    <span
                      className="text-[11px] font-medium"
                      style={{ color: `hsl(${sConfig.color})` }}
                    >
                      {sConfig.label}
                    </span>
                    {section.wordCount && (
                      <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                        {section.wordCount.toLocaleString()} words
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Controls */}
          <div className="space-y-4">
            {/* Export Format */}
            <div className="card-elevated p-5">
              <h4 className="mb-3 text-sm font-semibold text-[hsl(var(--foreground))]">
                Export Format
              </h4>
              <div className="space-y-2">
                {exportFormats.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                      selectedFormat === fmt.id
                        ? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]"
                        : "hover:bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]"
                    }`}
                  >
                    <FileType className="h-4 w-4" />
                    <span className="flex-1 text-sm font-medium">
                      {fmt.label}
                    </span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                      {fmt.ext}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button className="btn-primary w-full text-sm" disabled={progress < 100}>
              <Sparkles className="h-4 w-4" />
              {progress < 100 ? "Generating..." : "Generate Report"}
            </button>

            {/* Download Button */}
            <button
              className="btn-secondary w-full text-sm"
              disabled={progress < 100}
            >
              <Download className="h-4 w-4" />
              Download Draft
            </button>

            {/* Info */}
            <div className="rounded-xl bg-[hsl(var(--secondary))] p-4">
              <p className="text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                AI generates initial drafts based on your MRV inventory data,
                NDC targets, and registry records. All sections require human
                review before submission.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
