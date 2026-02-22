"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Send,
  Loader2,
  Bot,
  User,
  X,
  Trash2,
  AlertTriangle,
  TrendingUp,
  Target,
  BarChart3,
  DollarSign,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { useAppContext } from "@/components/dashboard/context-provider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface IntelligencePanelProps {
  onClose: () => void;
}

function getPageContext(pathname: string): string {
  if (pathname.includes("/mrv")) return "The user is viewing the MRV System. Help with data quality, sector analysis, BTR reporting.";
  if (pathname.includes("/ndc/targets") || pathname.includes("/ndc/progress")) return "The user is viewing NDC sector targets. Help analyze progress gaps.";
  if (pathname.includes("/ndc")) return "The user is viewing the NDC Tracker. Help with target tracking and BAU comparisons.";
  if (pathname.includes("/registry")) return "The user is viewing the Carbon Registry. Help with project analysis and Article 6 transfers.";
  if (pathname.includes("/finance/loa")) return "The user is viewing Letters of Authorization. Help with ITMO authorization and Article 6 compliance.";
  if (pathname.includes("/finance")) return "The user is viewing Climate Finance. Help analyze funding sources and budget gaps.";
  if (pathname.includes("/counties")) return "The user is viewing County-level data.";
  if (pathname.includes("/intelligence/budget")) return "The user is viewing Budget-NDC Alignment.";
  return "The user is on the main dashboard. Provide cross-cutting intelligence.";
}

function getQuickPrompts(context: string, pathname: string): { text: string; icon: typeof BarChart3 }[] {
  if (pathname.includes("/mrv")) {
    return [
      { text: "Which sectors have the weakest MRV data quality?", icon: AlertTriangle },
      { text: "Compare PRIMAP-hist vs bottom-up activity data", icon: BarChart3 },
    ];
  }
  if (pathname.includes("/ndc")) {
    return [
      { text: "Which mitigation actions are off-track for 2030?", icon: Target },
      { text: "What's the gap between trajectory and NDC target?", icon: TrendingUp },
    ];
  }
  if (pathname.includes("/registry") || pathname.includes("/finance/loa")) {
    return [
      { text: "Do pending LOAs conflict with domestic NDC?", icon: AlertTriangle },
      { text: "Highest credit issuance potential projects?", icon: TrendingUp },
    ];
  }
  if (pathname.includes("/finance")) {
    return [
      { text: "Where is the biggest budget-to-NDC misalignment?", icon: AlertTriangle },
      { text: "VCM revenue vs GCF allocations?", icon: DollarSign },
    ];
  }
  if (context === "finance") {
    return [
      { text: "Summarize Kenya's climate finance gaps", icon: DollarSign },
      { text: "Which sectors are most underfunded?", icon: AlertTriangle },
    ];
  }
  return [
    { text: "Cross-cutting intelligence briefing", icon: Sparkles },
    { text: "Top 3 risks to Kenya's NDC targets?", icon: AlertTriangle },
  ];
}

export default function IntelligencePanel({ onClose }: IntelligencePanelProps) {
  const { context } = useAppContext();
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const track = context === "finance" ? "finance" : "environment";
  const quickPrompts = getQuickPrompts(context, pathname);

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
      const pageCtx = getPageContext(pathname);
      const response = await fetch("/api/intelligence/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
          track,
          pageContext: pageCtx,
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
        updated[updated.length - 1] = { role: "assistant", content: `Error: ${msg}. Check API key in .env.local.` };
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

  const panelWidth = expanded ? "w-[520px]" : "w-[380px]";
  const panelHeight = expanded ? "h-[600px]" : "h-[480px]";

  return (
    <div className={`fixed bottom-20 right-6 ${panelWidth} ${panelHeight} z-50 flex flex-col rounded-2xl border border-[hsl(var(--border))] bg-white shadow-2xl shadow-black/10 transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 rounded-t-2xl bg-gradient-to-r from-teal-700 to-teal-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">DCACI Intelligence</h3>
            <p className="text-[10px] text-teal-200">
              {context === "finance" ? "Finance" : "Environment"} · Decision Support
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button onClick={() => setMessages([])} className="rounded-lg p-1.5 text-teal-200 hover:bg-white/10 transition-colors" title="Clear chat">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
          <button onClick={() => setExpanded((p) => !p)} className="rounded-lg p-1.5 text-teal-200 hover:bg-white/10 transition-colors" title={expanded ? "Minimize" : "Expand"}>
            {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
          <button onClick={onClose} className="rounded-lg p-1.5 text-teal-200 hover:bg-white/10 transition-colors" title="Close">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-2">
            <p className="text-xs font-semibold text-[hsl(var(--foreground))] mb-1">Ask anything</p>
            <p className="text-[11px] text-[hsl(var(--muted-foreground))] text-center mb-4 leading-relaxed">
              Emissions, NDC targets, budget alignment, carbon markets — verified Kenya data.
            </p>
            <div className="space-y-2 w-full">
              {quickPrompts.map((prompt) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={prompt.text}
                    onClick={() => handleSend(prompt.text)}
                    className="flex items-center gap-2.5 w-full rounded-xl border border-[hsl(var(--border))] px-3 py-2.5 text-left text-[11px] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] hover:border-teal-300 transition-all leading-relaxed"
                  >
                    <Icon className="h-3.5 w-3.5 text-teal-600 flex-shrink-0" />
                    <span>{prompt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-teal-600 to-teal-800 flex-shrink-0 mt-0.5">
                  <Bot className="h-3 w-3 text-white" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-xl px-3 py-2 text-[12px] leading-relaxed ${msg.role === "user" ? "bg-teal-700 text-white" : "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]"}`}>
                {msg.role === "assistant" ? (
                  msg.content ? (
                    msg.content.split("\n").map((line, j) => {
                      if (line.startsWith("### ")) return <p key={j} className="font-bold mt-2 mb-0.5 text-[12px]">{line.replace("### ", "")}</p>;
                      if (line.startsWith("## ")) return <p key={j} className="font-bold mt-2 mb-0.5 text-[12px]">{line.replace("## ", "")}</p>;
                      if (line.startsWith("**") && line.endsWith("**")) return <p key={j} className="font-semibold mt-1.5">{line.replace(/\*\*/g, "")}</p>;
                      if (line.startsWith("- ")) return <li key={j} className="ml-3 text-[11px] leading-relaxed">{line.replace("- ", "")}</li>;
                      if (line.trim() === "") return <br key={j} />;
                      return <p key={j} className="text-[11px] leading-relaxed">{line}</p>;
                    })
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[hsl(var(--muted-foreground))]">
                      <Loader2 className="h-3 w-3 animate-spin" /> Analyzing...
                    </span>
                  )
                ) : msg.content}
              </div>
              {msg.role === "user" && (
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[hsl(var(--secondary))] flex-shrink-0 mt-0.5">
                  <User className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-[hsl(var(--border))] px-3 py-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] px-3 py-2.5 text-[12px] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
            style={{ minHeight: "40px", maxHeight: "100px" }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isStreaming}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white transition-all hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            {isStreaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
        <p className="mt-1.5 text-[9px] text-[hsl(var(--muted-foreground))] text-center">
          PRIMAP-hist v2.6 · NDC 2020/2025 · NCCAP · Kenya National Budget FY 2024/25
        </p>
      </div>
    </div>
  );
}
