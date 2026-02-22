"use client"

import { useState } from "react"
import { FileJson, Check, Loader2, ChevronRight, Code, Eye } from "lucide-react"

interface BlueprintSection {
  id: string
  title: string
  status: "pending" | "generating" | "complete"
  data?: Record<string, unknown>
}

interface LivePreviewPanelProps {
  sections: BlueprintSection[]
  activeSection?: string
}

export default function LivePreviewPanel({ sections, activeSection }: LivePreviewPanelProps) {
  const [viewMode, setViewMode] = useState<"visual" | "json">("visual")
  const [expandedSection, setExpandedSection] = useState<string | null>(activeSection || null)

  const getStatusIcon = (status: BlueprintSection["status"]) => {
    switch (status) {
      case "complete":
        return <Check size={14} className="text-white" />
      case "generating":
        return <Loader2 size={14} className="text-primary animate-spin" />
      default:
        return <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
    }
  }

  const completedCount = sections.filter((s) => s.status === "complete").length

  return (
    <div className="h-full flex flex-col bg-white border-l border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileJson size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">Blueprint Preview</h3>
            <p className="text-xs text-muted-foreground">
              {completedCount}/{sections.length} sections
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setViewMode("visual")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "visual"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => setViewMode("json")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "json" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code size={14} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-2 border-b border-border">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50/50">
        {viewMode === "visual" ? (
          sections.map((section, index) => (
            <div
              key={section.id}
              className={`rounded-lg border transition-all duration-300 ${
                section.status === "generating"
                  ? "border-primary/50 bg-primary/5 shadow-md"
                  : section.status === "complete"
                    ? "border-primary/30 bg-white shadow-sm"
                    : "border-border bg-white/50"
              } ${index > 0 ? "animate-slide-in-right" : ""}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      section.status === "complete" ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    {getStatusIcon(section.status)}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      section.status === "pending" ? "text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {section.title}
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  className={`text-muted-foreground transition-transform ${
                    expandedSection === section.id ? "rotate-90" : ""
                  }`}
                />
              </button>

              {expandedSection === section.id && section.data && (
                <div className="px-3 pb-3 border-t border-border mt-1 pt-3">
                  <pre className="text-xs text-muted-foreground font-mono overflow-x-auto bg-slate-50 p-2 rounded">
                    {JSON.stringify(section.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-slate-800 p-4 font-mono text-xs overflow-x-auto">
            <pre className="text-slate-300">
              <span className="text-teal-400">{"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-amber-300">&quot;registryBlueprint&quot;</span>:{" "}
              <span className="text-teal-400">{"{"}</span>
              {"\n"}
              {"    "}
              <span className="text-amber-300">&quot;version&quot;</span>:{" "}
              <span className="text-emerald-400">&quot;1.0.0&quot;</span>,{"\n"}
              {"    "}
              <span className="text-amber-300">&quot;sections&quot;</span>: <span className="text-teal-400">{"["}</span>
              {sections.map((section, i) => (
                <span key={section.id}>
                  {"\n      "}
                  <span className={section.status === "complete" ? "text-slate-100" : "text-slate-500"}>
                    {`"${section.id}"`}: {section.status === "complete" ? "{ ... }" : "null"}
                    {i < sections.length - 1 ? "," : ""}
                  </span>
                </span>
              ))}
              {"\n    "}
              <span className="text-teal-400">{"]"}</span>
              {"\n  "}
              <span className="text-teal-400">{"}"}</span>
              {"\n"}
              <span className="text-teal-400">{"}"}</span>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
