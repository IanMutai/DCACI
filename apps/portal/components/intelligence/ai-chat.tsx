"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Sparkles,
  User,
  BarChart3,
  Target,
  Database,
  Copy,
  ThumbsUp,
  RotateCcw,
  MessageSquare,
  Plus,
  Clock,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: { system: string; label: string }[];
}

const suggestedPrompts = [
  {
    label: "Summarize NDC progress",
    icon: Target,
    prompt: "Give me a summary of our current NDC progress against 2030 targets",
  },
  {
    label: "Compare sector emissions",
    icon: BarChart3,
    prompt: "Compare emissions across all sectors for the last 3 years",
  },
  {
    label: "Registry overview",
    icon: Database,
    prompt: "What is the current status of carbon credit projects in the registry?",
  },
  {
    label: "Draft BTR section",
    icon: Sparkles,
    prompt: "Help me draft the mitigation actions section for the BTR report",
  },
];

const conversationHistory = [
  { id: "1", title: "NDC Progress Analysis", date: "Today" },
  { id: "2", title: "IPPU Emissions Anomaly", date: "Yesterday" },
  { id: "3", title: "BTR Draft Assistance", date: "Jan 13" },
  { id: "4", title: "Registry Credit Forecast", date: "Jan 10" },
  { id: "5", title: "LULUCF Gap Assessment", date: "Jan 8" },
];

const mockResponses: { content: string; sources: { system: string; label: string }[] }[] = [
  {
    content:
      "Based on cross-system analysis, here are the key findings:\n\n**Emissions Trend**: Total national GHG emissions decreased by 3.2% year-over-year to 45.2 MtCO2e, primarily driven by renewable energy adoption in the energy sector.\n\n**NDC Progress**: You are currently at 68% of your 2030 NDC target. The energy and transport sectors are leading contributors, while LULUCF needs attention.\n\n**Registry Status**: 47 active projects have issued 1.2M carbon credits. 12 projects are pending verification, representing an estimated 340K additional credits.\n\n**Recommendation**: Focus mitigation efforts on the agriculture sector, which shows the largest gap between current trajectory and NDC targets.",
    sources: [
      { system: "MRV", label: "GHG Inventory 2024" },
      { system: "NDC", label: "Progress Tracker" },
      { system: "Registry", label: "Project Database" },
    ],
  },
  {
    content:
      "Here's the sector-by-sector emissions comparison for 2022–2024:\n\n| Sector | 2022 | 2023 | 2024 | Trend |\n|--------|------|------|------|-------|\n| Energy | 18.5 | 17.8 | 16.9 | -4.3% avg |\n| Transport | 8.2 | 8.0 | 7.4 | -5.0% avg |\n| IPPU | 6.1 | 6.3 | 7.2 | +8.5% avg |\n| Agriculture | 7.8 | 7.9 | 7.8 | -0.1% avg |\n| LULUCF | 3.2 | 3.4 | 3.6 | +6.1% avg |\n| Waste | 2.5 | 2.4 | 2.3 | -4.0% avg |\n\n**Key Insight**: While Energy and Transport show strong downward trends, IPPU sector emissions have spiked significantly (+15% in Q3 2024). This anomaly warrants investigation — it could indicate new industrial facilities coming online or potential data quality issues.\n\n**Action Required**: The LULUCF sector is trending upward, potentially due to deforestation pressure. Cross-referencing with 3 registry REDD+ projects shows they're offsetting only 40% of the increase.",
    sources: [
      { system: "MRV", label: "Sector Analysis 2022-2024" },
      { system: "MRV", label: "IPPU Quarterly Report" },
      { system: "Registry", label: "REDD+ Projects" },
    ],
  },
  {
    content:
      "**Registry Project Status Overview**\n\nAcross all 47 active projects in the national carbon registry:\n\n**By Category:**\n- Renewable Energy: 18 projects (38%) — 520K credits issued\n- Energy Efficiency: 12 projects (26%) — 310K credits issued\n- REDD+ / Forestry: 8 projects (17%) — 245K credits issued\n- Waste Management: 5 projects (11%) — 85K credits issued\n- Agriculture: 4 projects (8%) — 40K credits issued\n\n**Verification Pipeline:**\n- 12 projects pending verification (est. 340K credits)\n- Average verification time: 72 days (target: 45 days)\n- 3 projects flagged for additional documentation\n\n**Credit Market:**\n- Total issued: 1.2M credits\n- Retired: 680K credits\n- Available for transfer: 520K credits\n- Average price: $12.40/credit (up 15% from last quarter)\n\n**Recommendation**: Expedite verification of the 12 pending projects. If cleared, total issuance would increase by 28%, potentially meeting the annual target ahead of schedule.",
    sources: [
      { system: "Registry", label: "Project Database" },
      { system: "Registry", label: "Credit Ledger" },
      { system: "Registry", label: "Verification Queue" },
    ],
  },
  {
    content:
      "I'll help draft the **Mitigation Actions & Effects** section for the BTR.\n\n---\n\n## 4. Mitigation Actions and Their Effects\n\n### 4.1 Overview of Mitigation Policies and Measures\n\nThe country has implemented a comprehensive portfolio of 23 mitigation actions across six IPCC sectors, contributing to an estimated cumulative reduction of 12.8 MtCO2e since the baseline year.\n\n### 4.2 Sector-Specific Actions\n\n**Energy Sector** (8 actions — 6.2 MtCO2e reduced)\n- National Renewable Energy Program: 2.4 GW solar + 800 MW wind capacity added\n- Grid modernization and efficiency improvements\n- Fossil fuel subsidy reform (Phase 1 complete)\n\n**Transport Sector** (5 actions — 3.1 MtCO2e reduced)\n- Electric vehicle incentive program: 45,000 EVs registered\n- Public transit electrification in 3 major cities\n- Fuel efficiency standards for commercial vehicles\n\n**LULUCF Sector** (4 actions — 2.1 MtCO2e reduced)\n- National reforestation program: 150,000 hectares planted\n- 3 REDD+ projects protecting 500,000 hectares\n\n### 4.3 Estimated Effects\n\n[Table of quantified mitigation effects per action with methodologies...]\n\n---\n\n*This is a draft. Please review the data against your latest MRV records and adjust the emission reduction figures as needed.*",
    sources: [
      { system: "NDC", label: "Mitigation Actions Registry" },
      { system: "MRV", label: "Emission Reductions Database" },
      { system: "NDC", label: "BTR Template Guidelines" },
    ],
  },
];

let responseIndex = 0;

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend(text?: string) {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response — cycle through contextual mock responses
    setTimeout(() => {
      const response = mockResponses[responseIndex % mockResponses.length]!;
      responseIndex++;
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
        sources: response.sources,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1800);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex h-[calc(100vh-16rem)] gap-4">
      {/* Conversation History Sidebar */}
      <div className="hidden w-64 flex-shrink-0 flex-col rounded-2xl border border-[hsl(var(--border))] bg-white lg:flex">
        <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
          <span className="text-sm font-semibold text-[hsl(var(--foreground))]">History</span>
          <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[hsl(var(--primary))] text-white transition-colors hover:bg-[hsl(174_40%_25%)]">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
          {conversationHistory.map((conv) => (
            <button
              key={conv.id}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[hsl(var(--secondary))]"
            >
              <MessageSquare className="h-3.5 w-3.5 flex-shrink-0 text-[hsl(var(--muted-foreground))]" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[hsl(var(--foreground))] truncate">{conv.title}</p>
                <p className="flex items-center gap-1 text-[10px] text-[hsl(var(--muted-foreground))]">
                  <Clock className="h-2.5 w-2.5" />
                  {conv.date}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(174_40%_40%)]">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-[hsl(var(--foreground))]">
              Climate Intelligence Assistant
            </h3>
            <p className="mb-8 max-w-md text-center text-sm text-[hsl(var(--muted-foreground))]">
              Ask questions about your MRV data, NDC progress, or Registry
              projects. I can analyze trends, generate insights, and help draft
              reports.
            </p>

            {/* Suggested Prompts */}
            <div className="grid w-full max-w-2xl grid-cols-2 gap-3">
              {suggestedPrompts.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleSend(item.prompt)}
                    className="card-interactive flex items-start gap-3 p-4 text-left"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary)/0.1)]">
                      <Icon className="h-4 w-4 text-[hsl(var(--primary))]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))] line-clamp-2">
                        {item.prompt}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`animate-message-in flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(174_40%_40%)]">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-[hsl(var(--primary))] text-white"
                      : "card-elevated"
                  }`}
                >
                  <div
                    className={`whitespace-pre-wrap text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "text-[hsl(var(--foreground))]"
                        : ""
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 border-t border-[hsl(var(--border))] pt-3">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                        Sources:
                      </span>
                      {msg.sources.map((src, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-md bg-[hsl(var(--secondary))] px-2 py-0.5 text-[11px] font-medium text-[hsl(var(--primary))]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
                          {src.system}: {src.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action buttons for AI messages */}
                  {msg.role === "assistant" && (
                    <div className="mt-2 flex gap-1">
                      <button className="rounded-lg p-1.5 text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]">
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-lg p-1.5 text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]">
                        <ThumbsUp className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-lg p-1.5 text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]">
                        <RotateCcw className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--secondary))]">
                    <User className="h-4 w-4 text-[hsl(var(--foreground))]" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="animate-message-in flex gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(174_40%_40%)]">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="card-elevated flex items-center gap-1.5 px-4 py-3">
                  <span
                    className="h-2 w-2 rounded-full bg-[hsl(var(--primary))] animate-ai-dot-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-[hsl(var(--primary))] animate-ai-dot-bounce"
                    style={{ animationDelay: "160ms" }}
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-[hsl(var(--primary))] animate-ai-dot-bounce"
                    style={{ animationDelay: "320ms" }}
                  />
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="border-t border-[hsl(var(--border))] bg-white/80 px-2 pt-4 pb-2 backdrop-blur-sm">
        <div className="flex items-center gap-2 rounded-2xl border border-[hsl(var(--border))] bg-white px-4 py-2 shadow-sm transition-all focus-within:border-[hsl(var(--primary))] focus-within:ring-2 focus-within:ring-[hsl(var(--primary)/0.1)]">
          <button className="rounded-lg p-1.5 text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]">
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about emissions, NDC targets, or registry projects..."
            className="flex-1 bg-transparent text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] outline-none"
          />
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[hsl(var(--primary)/0.1)] px-2 py-0.5 text-[10px] font-semibold text-[hsl(var(--primary))]">
              AI
            </span>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-[hsl(var(--primary))] text-white transition-all hover:bg-[hsl(174_40%_25%)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-[hsl(var(--muted-foreground))]">
          AI can make mistakes. Verify important climate data with official sources.
        </p>
      </div>
      </div>
    </div>
  );
}
