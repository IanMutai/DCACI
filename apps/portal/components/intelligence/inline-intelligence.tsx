"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Send,
  Loader2,
  Bot,
  User,
  Trash2,
  Lightbulb,
} from "lucide-react";
import { useAppContext } from "@/components/dashboard/context-provider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface InlineIntelligenceProps {
  page: "dashboard" | "mrv" | "ndc" | "registry" | "finance";
}

/* ─── Page-specific configuration ─── */
const PAGE_CONFIG: Record<
  string,
  {
    title: string;
    subtitle: string;
    contextHint: string;
    prompts: { text: string; tag: string }[];
    facts: { label: string; value: string; detail: string; color: string }[];
  }
> = {
  dashboard: {
    title: "DCACI Intelligence",
    subtitle: "Cross-cutting climate analysis for Kenya",
    contextHint:
      "The user is on the main DCACI dashboard. Provide cross-cutting analysis spanning MRV, NDC, Registry, and Finance. Highlight key misalignments and urgent issues.",
    prompts: [
      { text: "Give me a cross-cutting intelligence briefing on Kenya's climate status", tag: "Briefing" },
      { text: "What are the top 3 risks to Kenya achieving its NDC by 2030?", tag: "Risks" },
      { text: "How does Kenya's carbon market revenue compare to climate finance needs?", tag: "Finance" },
      { text: "Which sectors have the weakest data quality for BTR reporting?", tag: "MRV" },
      { text: "Is Kenya's budget allocation aligned with NDC sector priorities?", tag: "Budget" },
      { text: "Summarize Kenya's Article 6 pipeline and its impact on NDC headroom", tag: "Art. 6" },
    ],
    facts: [
      { label: "Emissions", value: "94.9 MtCO2e", detail: "2022 excl. LULUCF", color: "text-red-600" },
      { label: "NDC Target", value: "-32%", detail: "by 2030 (below 143 Mt BAU)", color: "text-blue-600" },
      { label: "Finance Gap", value: "53%", detail: "$2.73B/yr shortfall", color: "text-amber-600" },
      { label: "Carbon Credits", value: "59M tCO2e", detail: "296 projects since 2011", color: "text-emerald-600" },
    ],
  },
  mrv: {
    title: "MRV Intelligence",
    subtitle: "Data quality, inventory gaps, and reporting analysis",
    contextHint:
      "The user is on the MRV System page. Help with emissions data quality, sector inventory analysis, uncertainty assessment, BTR reporting compliance, and IPCC methodology. Reference PRIMAP-hist v2.6 HISTCR data.",
    prompts: [
      { text: "Which sectors have the weakest MRV data quality and highest uncertainty?", tag: "Quality" },
      { text: "Compare PRIMAP-hist modeled data vs bottom-up activity data availability", tag: "Data" },
      { text: "What are the key gaps in our BTR-1 reporting?", tag: "BTR" },
      { text: "How does agriculture emissions estimation methodology affect our total?", tag: "Method" },
      { text: "What's the uncertainty margin for each sector and how to reduce it?", tag: "Uncertainty" },
      { text: "If we had better activity data, how would our emission numbers change?", tag: "Impact" },
    ],
    facts: [
      { label: "Total 2022", value: "94.9 MtCO2e", detail: "excl. LULUCF (PRIMAP v2.6)", color: "text-red-600" },
      { label: "Sectors", value: "5 / 5", detail: "All IPCC sectors covered", color: "text-emerald-600" },
      { label: "Reporting", value: "BTR-1 Filed", detail: "December 2024", color: "text-blue-600" },
      { label: "Top Sector", value: "Agriculture", detail: "44.92 MtCO2e (47.4%)", color: "text-green-600" },
    ],
  },
  ndc: {
    title: "NDC Intelligence",
    subtitle: "Targets, budgets, priorities, and impact analysis",
    contextHint:
      "The user is on the NDC Tracker page. They want to understand NDC target progress, budget adequacy, sector priorities, cross-cutting impacts, and policy tradeoffs. Provide deep analysis comparing budget allocations against NDC implementation costs. Always use actual numbers.",
    prompts: [
      { text: "Do we have enough money budgeted to meet our NDC targets?", tag: "Budget" },
      { text: "Which sectors are most off-track and what should we prioritize?", tag: "Priority" },
      { text: "How does authorizing ITMOs affect our NDC headroom?", tag: "Impact" },
      { text: "If energy emissions keep growing at 3.5%, when do we miss 2030 target?", tag: "Projection" },
      { text: "Compare cost-effectiveness of each sector's mitigation actions", tag: "Analysis" },
      { text: "What are the top 3 risks to achieving the conditional -32% target?", tag: "Risks" },
    ],
    facts: [
      { label: "NDC Budget Gap", value: "$59.3B", detail: "of $62B needs intl support", color: "text-red-600" },
      { label: "Finance Gap", value: "53%", detail: "$2.73B/yr shortfall", color: "text-amber-600" },
      { label: "On-Track", value: "2 / 6", detail: "sectors on track for 2030", color: "text-blue-600" },
      { label: "Climate Budget", value: "9.1%", detail: "of KES 3.92T is tagged", color: "text-violet-600" },
    ],
  },
  registry: {
    title: "Registry Intelligence",
    subtitle: "Carbon projects, credits, and Article 6 analysis",
    contextHint:
      "The user is on the Carbon Registry page. Help with project pipeline analysis, credit issuance trends, Article 6 ITMO tracking, verification bottlenecks, and market insights. Reference actual project data and pricing.",
    prompts: [
      { text: "Which projects have the highest credit generation potential?", tag: "Pipeline" },
      { text: "Do any pending LOAs create double-counting risk with VCM credits?", tag: "Integrity" },
      { text: "How does Kasigau REDD+ performance compare to sector benchmarks?", tag: "Benchmark" },
      { text: "What revenue can Kenya expect from carbon markets by 2030?", tag: "Revenue" },
      { text: "How many credits should we authorize as ITMOs vs keep for domestic NDC?", tag: "Strategy" },
      { text: "What's the verification backlog and how does it affect issuance timeline?", tag: "Operations" },
    ],
    facts: [
      { label: "Projects", value: "296", detail: "Largest in Africa (25%)", color: "text-emerald-600" },
      { label: "Cumulative", value: "59M tCO2e", detail: "VCM + CDM since 2011", color: "text-blue-600" },
      { label: "VCM Revenue", value: "$136M", detail: "2023 external finance", color: "text-green-600" },
      { label: "Art. 6 Partners", value: "4", detail: "CH, SE, SG, KR bilateral", color: "text-violet-600" },
    ],
  },
  finance: {
    title: "Finance Intelligence",
    subtitle: "Climate finance flows, budget alignment, and gaps",
    contextHint:
      "The user is on the Climate Finance page. Help analyze climate finance flows, budget-NDC alignment, investment gaps, carbon market revenues, GCF/MDB pipelines, and county allocations. Compare actual spending to NDC needs.",
    prompts: [
      { text: "Where is the biggest gap between climate finance and NDC needs?", tag: "Gap" },
      { text: "How does VCM carbon revenue compare to GCF and MDB allocations?", tag: "Compare" },
      { text: "Which counties receive the least climate finance per capita?", tag: "Equity" },
      { text: "What's the ROI of investing in geothermal vs REDD+ for emissions?", tag: "ROI" },
      { text: "How much of Kenya's national budget actually reaches climate actions?", tag: "Tracking" },
      { text: "Which funding sources are growing and which are declining?", tag: "Trends" },
    ],
    facts: [
      { label: "Annual Need", value: "$5.13B", detail: "per year for NDC (2020-2030)", color: "text-red-600" },
      { label: "Actual Flows", value: "$2.40B", detail: "tracked (2019-2023 avg)", color: "text-amber-600" },
      { label: "GCF Portfolio", value: "$390M", detail: "6 approved projects", color: "text-green-600" },
      { label: "World Bank", value: "$1.7B", detail: "active climate portfolio", color: "text-blue-600" },
    ],
  },
};

export default function InlineIntelligence({ page }: InlineIntelligenceProps) {
  const { context } = useAppContext();
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const config = PAGE_CONFIG[page] || PAGE_CONFIG.dashboard;
  const track = context === "finance" ? "finance" : "environment";

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  async function handleSend(text?: string) {
    const messageText = text || input.trim();
    if (!messageText || isStreaming) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch("/api/intelligence/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          track,
          pageContext: config.contextHint,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No response stream");

      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
        for (const line of lines) {
          const data = line.replace("data: ", "");
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            accumulated += parsed.content;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: accumulated };
              return updated;
            });
          } catch { /* skip */ }
        }
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An error occurred";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: `Error: ${msg}` };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="rounded-2xl border-2 border-teal-200/60 bg-gradient-to-br from-teal-50/50 via-white to-slate-50 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 px-5 py-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{config.title}</h3>
              <p className="text-[11px] text-teal-200">{config.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-[11px] font-medium text-teal-100 hover:bg-white/20 transition-colors"
              >
                <Trash2 className="h-3 w-3" /> New conversation
              </button>
            )}
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* Context Facts */}
      <div className="border-b border-teal-100/80 bg-white/70">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-teal-100/60">
          {config.facts.map((fact) => (
            <div key={fact.label} className="px-4 py-2.5">
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">{fact.label}</p>
              <p className={`text-base font-bold ${fact.color} leading-tight`}>{fact.value}</p>
              <p className="text-[10px] text-slate-400">{fact.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex flex-col" style={{ minHeight: messages.length > 0 ? "350px" : "auto" }}>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 max-h-[450px]">
          {messages.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {config.prompts.map((prompt) => (
                <button
                  key={prompt.text}
                  onClick={() => handleSend(prompt.text)}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-left transition-all hover:shadow-md hover:border-teal-300 hover:bg-teal-50/30 group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 group-hover:bg-teal-200 flex-shrink-0 transition-colors">
                    <Lightbulb className="h-3.5 w-3.5 text-teal-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold text-teal-600 uppercase tracking-wider">{prompt.tag}</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5 line-clamp-2">{prompt.text}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-teal-800 flex-shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-[13px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-teal-700 text-white"
                    : "bg-white border border-slate-200 text-slate-800 shadow-sm"
                }`}>
                  {msg.role === "assistant" ? (
                    msg.content ? (
                      <div className="space-y-0.5">
                        {msg.content.split("\n").map((line, j) => {
                          if (line.startsWith("### ")) return <p key={j} className="font-bold text-[13px] mt-2.5 mb-0.5 text-slate-900">{line.replace("### ", "")}</p>;
                          if (line.startsWith("## ")) return <p key={j} className="font-bold text-[13px] mt-2.5 mb-0.5 text-slate-900">{line.replace("## ", "")}</p>;
                          if (line.startsWith("**") && line.endsWith("**")) return <p key={j} className="font-semibold mt-2 text-slate-900">{line.replace(/\*\*/g, "")}</p>;
                          if (line.startsWith("- ")) return <li key={j} className="ml-4 text-[12px] leading-relaxed list-disc">{line.replace("- ", "")}</li>;
                          if (line.trim() === "") return <br key={j} />;
                          return <p key={j} className="text-[12px] leading-relaxed">{line}</p>;
                        })}
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-slate-400">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Analyzing...
                      </span>
                    )
                  ) : msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200 flex-shrink-0 mt-0.5">
                    <User className="h-3.5 w-3.5 text-slate-600" />
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-teal-100/80 bg-white/80 px-5 py-3">
          <div className="flex items-end gap-2.5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask about ${page === "dashboard" ? "emissions, NDC, finance, carbon markets" : config.title.toLowerCase().replace(" intelligence", "")}...`}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
              style={{ minHeight: "42px", maxHeight: "100px" }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isStreaming}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-teal-700 text-white transition-all hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              {isStreaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-1.5 text-[9px] text-slate-400 text-center">
            Verified Kenya data · PRIMAP-hist v2.6 · NDC 2020/2025 · Budget FY 2024/25 · NCCAP III
          </p>
        </div>
      </div>
    </div>
  );
}
