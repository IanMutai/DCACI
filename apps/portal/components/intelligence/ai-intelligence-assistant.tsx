"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles,
  Send,
  Loader2,
  User,
  Bot,
  Trash2,
  BarChart3,
  Target,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Globe2,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AiAssistantProps {
  track?: "environment" | "finance" | "joint";
}

const trackPrompts: Record<string, { label: string; prompts: { text: string; icon: typeof BarChart3 }[] }> = {
  environment: {
    label: "Environment Track",
    prompts: [
      { text: "Analyze Kenya's 2022 emissions by sector — which sectors grew fastest?", icon: BarChart3 },
      { text: "Is Kenya on track to meet the -32% NDC target by 2030?", icon: Target },
      { text: "What are the key misalignments between MRV data and NDC targets?", icon: AlertTriangle },
      { text: "Which mitigation actions have the highest impact-to-cost ratio?", icon: TrendingUp },
    ],
  },
  finance: {
    label: "Finance Track",
    prompts: [
      { text: "Compare Kenya's climate budget allocation against NDC implementation costs", icon: DollarSign },
      { text: "Analyze the gap between climate finance needs ($5.13B/yr) and actual flows", icon: AlertTriangle },
      { text: "What revenue can Kenya expect from Article 6 ITMO transfers?", icon: Globe2 },
      { text: "Which sectors have the largest budget-to-NDC misalignment?", icon: TrendingUp },
    ],
  },
  joint: {
    label: "Joint Intelligence",
    prompts: [
      { text: "Give me a cross-cutting intelligence briefing: emissions, NDC progress, and finance gaps", icon: Sparkles },
      { text: "Which carbon credit projects best align with NDC mitigation targets?", icon: Target },
      { text: "Identify conflicts between Article 6 transfers and domestic climate commitments", icon: AlertTriangle },
      { text: "How does Kenya's 296-project carbon portfolio compare to its NDC ambition?", icon: BarChart3 },
    ],
  },
};

export default function AiIntelligenceAssistant({ track = "joint" }: AiAssistantProps) {
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
          track,
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
            // skip malformed chunks
          }
        }
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An error occurred";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: `Error: ${msg}. Please check your API key configuration.`,
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

  const currentPrompts = trackPrompts[track] || trackPrompts.joint;

  return (
    <div className="flex flex-col h-[600px] rounded-2xl border border-[hsl(var(--border))] bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[hsl(var(--border))] bg-gradient-to-r from-[hsl(var(--primary)/0.05)] to-transparent">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-teal-800">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
              DCACI Intelligence
            </h3>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
              {currentPrompts.label} — Decision Support
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] transition-colors"
          >
            <Trash2 className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 mb-4">
              <Sparkles className="h-7 w-7 text-teal-700" />
            </div>
            <h4 className="text-base font-semibold text-[hsl(var(--foreground))] mb-1">
              Climate Intelligence Assistant
            </h4>
            <p className="text-xs text-[hsl(var(--muted-foreground))] text-center max-w-sm mb-6">
              Ask about emissions, NDC progress, climate finance, carbon markets, or policy alignment.
              All responses backed by verified Kenya data.
            </p>
            <div className="grid grid-cols-1 gap-2 w-full max-w-lg">
              {currentPrompts.prompts.map((prompt) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={prompt.text}
                    onClick={() => handleSend(prompt.text)}
                    className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] px-4 py-3 text-left text-xs text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] hover:border-[hsl(var(--primary)/0.3)] transition-all"
                  >
                    <Icon className="h-4 w-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    <span>{prompt.text}</span>
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
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-teal-800 flex-shrink-0 mt-0.5">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[hsl(var(--primary))] text-white"
                    : "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm prose-slate max-w-none">
                    {msg.content ? (
                      msg.content.split("\n").map((line, j) => {
                        if (line.startsWith("### "))
                          return (
                            <h4 key={j} className="text-sm font-bold mt-3 mb-1">
                              {line.replace("### ", "")}
                            </h4>
                          );
                        if (line.startsWith("## "))
                          return (
                            <h3 key={j} className="text-sm font-bold mt-3 mb-1">
                              {line.replace("## ", "")}
                            </h3>
                          );
                        if (line.startsWith("**") && line.endsWith("**"))
                          return (
                            <p key={j} className="font-semibold mt-2">
                              {line.replace(/\*\*/g, "")}
                            </p>
                          );
                        if (line.startsWith("- "))
                          return (
                            <li key={j} className="ml-4 text-xs leading-relaxed">
                              {line.replace("- ", "")}
                            </li>
                          );
                        if (line.trim() === "") return <br key={j} />;
                        return (
                          <p key={j} className="text-xs leading-relaxed">
                            {line}
                          </p>
                        );
                      })
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Analyzing...
                      </span>
                    )}
                  </div>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === "user" && (
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[hsl(var(--secondary))] flex-shrink-0 mt-0.5">
                  <User className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[hsl(var(--border))] p-4">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about emissions, NDC targets, climate finance, carbon markets..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.1)] transition-all"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isStreaming}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--primary))] text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isStreaming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="mt-2 text-[10px] text-[hsl(var(--muted-foreground))] text-center">
          Powered by AI with verified Kenya climate data (PRIMAP-hist v2.6, NDC 2020/2025, NCCAP)
        </p>
      </div>
    </div>
  );
}
