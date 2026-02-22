"use client";

import { useState } from "react";
import {
  Sparkles,
  MessageSquare,
  Lightbulb,
  Route,
  FileText,
  Shield,
  Layers,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import AiChat from "@/components/intelligence/ai-chat";
import InsightCards from "@/components/intelligence/insight-cards";
import PlanningAssistant from "@/components/intelligence/planning-assistant";
import ReportGenerator from "@/components/intelligence/report-generator";
import DataQualityMonitor from "@/components/intelligence/data-quality-monitor";
import CrossSystemDashboard from "@/components/intelligence/cross-system-dashboard";
import PredictiveAnalytics from "@/components/intelligence/predictive-analytics";
import AnomalyTimeline from "@/components/intelligence/anomaly-timeline";

const tabs = [
  { id: "chat", label: "AI Chat", icon: MessageSquare },
  { id: "dashboard", label: "Cross-System", icon: Layers },
  { id: "insights", label: "Insights", icon: Lightbulb },
  { id: "anomalies", label: "Anomalies", icon: AlertTriangle },
  { id: "forecasts", label: "Forecasts", icon: TrendingUp },
  { id: "planning", label: "Planning", icon: Route },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "quality", label: "Data Quality", icon: Shield },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function IntelligencePage() {
  const [activeTab, setActiveTab] = useState<TabId>("chat");

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(174_40%_40%)]">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">
              Intelligence Hub
            </h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              AI-powered insights across MRV, NDC & Registry
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--destructive)/0.1)] px-3 py-1.5 text-xs font-medium text-[hsl(var(--destructive))]">
            2 Critical Anomalies
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--primary)/0.1)] px-3 py-1.5 text-xs font-medium text-[hsl(var(--primary))]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--success))] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--success))]" />
            </span>
            Live Data Connected
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto rounded-2xl bg-[hsl(var(--secondary))] p-1.5 scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-[hsl(var(--foreground))] shadow-sm"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-[hsl(var(--primary))]" : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-up" key={activeTab}>
        {activeTab === "chat" && <AiChat />}
        {activeTab === "dashboard" && <CrossSystemDashboard />}
        {activeTab === "insights" && <InsightCards />}
        {activeTab === "anomalies" && <AnomalyTimeline />}
        {activeTab === "forecasts" && <PredictiveAnalytics />}
        {activeTab === "planning" && <PlanningAssistant />}
        {activeTab === "reports" && <ReportGenerator />}
        {activeTab === "quality" && <DataQualityMonitor />}
      </div>
    </div>
  );
}
