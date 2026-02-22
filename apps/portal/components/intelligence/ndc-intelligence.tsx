"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles,
  Send,
  Loader2,
  Bot,
  User,
  Trash2,
  DollarSign,
  Target,
  AlertTriangle,
  TrendingUp,
  Scale,
  Lightbulb,
  ArrowRight,
  BarChart3,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const NDC_QUICK_PROMPTS = [
  {
    text: "Do we have enough money budgeted to meet our NDC targets?",
    icon: DollarSign,
    category: "Budget",
  },
  {
    text: "Which sectors are most off-track and what should we prioritize?",
    icon: Target,
    category: "Priority",
  },
  {
    text: "How does authorizing 585K ITMOs affect our NDC headroom?",
    icon: Scale,
    category: "Impact",
  },
  {
    text: "If energy emissions keep growing at 3.5% CAGR, when do we miss the 2030 target?",
    icon: TrendingUp,
    category: "Projection",
  },
  {
    text: "Compare the cost-effectiveness of each sector's mitigation actions",
    icon: BarChart3,
    category: "Analysis",
  },
  {
    text: "What are the top 3 risks to achieving the conditional -32% target?",
    icon: AlertTriangle,
    category: "Risk",
  },
];

const NDC_CONTEXT_FACTS = [
  { label: "NDC Budget Gap", value: "$59.3B", detail: "of $62B needed by 2030 requires intl support", color: "text-red-600" },
  { label: "Finance Gap", value: "53%", detail: "$2.73B/yr shortfall vs $5.13B needed", color: "text-amber-600" },
  { label: "On-Track Sectors", value: "2 / 6", detail: "Only Transport & Waste on-track for 2030", color: "text-blue-600" },
  { label: "Budget Alignment", value: "9.1%", detail: "of KES 3.92T budget is climate-tagged", color: "text-violet-600" },
];

export default function NdcIntelligence() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
          track: "environment",
          pageContext:
            "The user is on the NDC Tracker page. They want to understand NDC target progress, budget adequacy, sector priorities, cross-cutting impacts, and policy tradeoffs. Provide deep analysis with actual numbers, budget comparisons, and actionable recommendations. Always compare budget allocations against NDC implementation costs.",
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to get response");
      }

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
              updated[updated.length - 1] = {
                role: "assistant",
                content: accumulated,
              };
              return updated;
            });
          } catch {
            /* skip malformed chunks */
          }
        }
      }
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "An error occurred";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: `Error: ${msg}`,
        };
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
    <div className="rounded-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50/80 via-white to-blue-50/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                NDC Intelligence Assistant
              </h3>
              <p className="text-xs text-teal-200">
                Ask about budgets, priorities, impacts, and tradeoffs
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-teal-100 hover:bg-white/20 transition-colors"
              >
                <Trash2 className="h-3 w-3" /> Clear
              </button>
            )}
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-semibold text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* Context Facts Bar */}
      <div className="border-b border-teal-100 bg-white/60 backdrop-blur-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-teal-100">
          {NDC_CONTEXT_FACTS.map((fact) => (
            <div key={fact.label} className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                {fact.label}
              </p>
              <p className={`text-lg font-bold ${fact.color}`}>
                {fact.value}
              </p>
              <p className="text-[10px] text-slate-400 leading-tight">
                {fact.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col" style={{ minHeight: "400px" }}>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 max-h-[500px]">
          {messages.length === 0 ? (
            <div className="space-y-4">
              <div className="text-center py-2">
                <Lightbulb className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-900">
                  Ask me anything about Kenya&apos;s NDC
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Budget adequacy, sector priorities, policy impacts, risk
                  analysis
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {NDC_QUICK_PROMPTS.map((prompt) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={prompt.text}
                      onClick={() => handleSend(prompt.text)}
                      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition-all hover:shadow-md hover:border-teal-300 hover:bg-teal-50/30 group"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 group-hover:bg-teal-200 flex-shrink-0 transition-colors">
                        <Icon className="h-4 w-4 text-teal-700" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-teal-600 uppercase tracking-wider">
                          {prompt.category}
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
                          {prompt.text}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex-shrink-0 mt-0.5">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-teal-700 text-white"
                      : "bg-white border border-slate-200 text-slate-800 shadow-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    msg.content ? (
                      <div className="space-y-1">
                        {msg.content.split("\n").map((line, j) => {
                          if (line.startsWith("### "))
                            return (
                              <p
                                key={j}
                                className="font-bold text-sm mt-3 mb-1 text-slate-900"
                              >
                                {line.replace("### ", "")}
                              </p>
                            );
                          if (line.startsWith("## "))
                            return (
                              <p
                                key={j}
                                className="font-bold text-sm mt-3 mb-1 text-slate-900"
                              >
                                {line.replace("## ", "")}
                              </p>
                            );
                          if (line.startsWith("**") && line.endsWith("**"))
                            return (
                              <p
                                key={j}
                                className="font-semibold mt-2 text-slate-900"
                              >
                                {line.replace(/\*\*/g, "")}
                              </p>
                            );
                          if (line.startsWith("- "))
                            return (
                              <li
                                key={j}
                                className="ml-4 text-[13px] leading-relaxed list-disc"
                              >
                                {line.replace("- ", "")}
                              </li>
                            );
                          if (line.trim() === "") return <br key={j} />;
                          return (
                            <p
                              key={j}
                              className="text-[13px] leading-relaxed"
                            >
                              {line}
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing NDC data...
                      </span>
                    )
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-200 flex-shrink-0 mt-0.5">
                    <User className="h-4 w-4 text-slate-600" />
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-teal-100 bg-white/80 backdrop-blur-sm px-6 py-4">
          <div className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about NDC budgets, priorities, impacts..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isStreaming}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-white transition-all hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-sm"
            >
              {isStreaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="mt-2 text-[10px] text-slate-400 text-center">
            Powered by verified Kenya data: PRIMAP-hist v2.6 · Updated NDC
            (2020) · Second NDC (2025) · National Budget FY 2024/25 · NCCAP
            III
          </p>
        </div>
      </div>
    </div>
  );
}
