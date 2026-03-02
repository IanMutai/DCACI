"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Send, Loader2, CheckCircle2, Circle, Clock, ChevronRight,
  ArrowLeft, FileDown, Download, RefreshCw, Edit3, Save, X,
  Sparkles, Wand2, FileText,
} from "lucide-react";
import {
  type DocumentState, type SectionState,
  DOCUMENT_TYPES, getDocumentType,
} from "@/lib/copilot/document-types";

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

interface Props {
  initialDoc: DocumentState;
  onSave: (doc: DocumentState) => void;
}

const SECTION_CONTENT_MARKER = "__SECTION_CONTENT__";

function parseMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("### ")) return <p key={i} className="font-bold text-slate-800 mt-3 mb-1 text-sm">{line.slice(4)}</p>;
    if (line.startsWith("## ")) return <p key={i} className="font-bold text-slate-900 mt-4 mb-1">{line.slice(3)}</p>;
    if (line.startsWith("- ") || line.startsWith("* "))
      return <li key={i} className="ml-4 text-sm text-slate-700 leading-relaxed list-disc">{line.slice(2)}</li>;
    if (line.trim() === "") return <br key={i} />;
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={i} className="text-sm text-slate-700 leading-relaxed">
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    );
  });
}

function renderDocumentPreview(doc: DocumentState) {
  const schema = getDocumentType(doc.docType);
  return (
    <div className="prose prose-sm max-w-none">
      <div className="border-b-2 border-teal-500 pb-4 mb-6">
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Government of {doc.country}</p>
        <h1 className="text-xl font-bold text-slate-900 mb-1">{doc.title}</h1>
        <p className="text-xs text-teal-600 font-semibold">{schema.unfcccFramework}</p>
      </div>
      {schema.sections.map((sectionSchema, idx) => {
        const state = doc.sections[sectionSchema.id];
        const hasContent = state?.content && state.content.trim().length > 0;
        return (
          <div key={sectionSchema.id} className="mb-8 pb-8 border-b border-slate-100 last:border-0">
            <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-1">Section {idx + 1}</p>
            <h2 className="text-base font-bold text-slate-900 mb-3">{sectionSchema.title}</h2>
            {hasContent ? (
              <div className="space-y-1">{parseMarkdown(state.content)}</div>
            ) : (
              <div className="rounded-lg bg-slate-50 border border-dashed border-slate-200 p-4 text-center">
                <p className="text-xs text-slate-400 italic">Not yet drafted</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CopilotWorkspace({ initialDoc, onSave }: Props) {
  const router = useRouter();
  const [doc, setDoc] = useState<DocumentState>(initialDoc);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "preview">("chat");
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const schema = getDocumentType(doc.docType);
  const currentSection = schema.sections.find((s) => s.id === doc.currentSectionId)!;
  const completedCount = Object.values(doc.sections).filter((s) => s.status === "complete").length;
  const totalSections = schema.sections.length;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateDoc = useCallback((updated: DocumentState) => {
    setDoc(updated);
    onSave(updated);
  }, [onSave]);

  // Auto-greet on first load
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = `Welcome! I'm your Climate Document Copilot. I'll help you draft a **${schema.title}** for **${doc.country}**.

We'll work through **${totalSections} sections** together. I'll ask you targeted questions, then draft formal UNFCCC-compliant language based on your answers.

Let's start with **Section 1: ${currentSection.title}**.

${currentSection.description}

To get started, I need some information:

${currentSection.guideQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Please answer as many as you can — even partial information is helpful. I'll flag any gaps with placeholders.`;

      setMessages([{ role: "assistant", content: greeting }]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSend(text?: string) {
    const userText = (text ?? input).trim();
    if (!userText || isStreaming) return;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setIsStreaming(true);

    // Mark section as generating
    const updatedSections = {
      ...doc.sections,
      [doc.currentSectionId]: { ...doc.sections[doc.currentSectionId], status: "generating" as const },
    };
    updateDoc({ ...doc, sections: updatedSections });

    try {
      const completedSections: Record<string, string> = {};
      Object.entries(doc.sections).forEach(([id, state]) => {
        if (state.status === "complete" && state.content) completedSections[id] = state.content;
      });

      const res = await fetch("/api/copilot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.filter((m) => !m.isStreaming),
          docType: doc.docType,
          currentSection: doc.currentSectionId,
          country: doc.country,
          completedSections,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "", isStreaming: true }]);

      while (reader) {
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
              updated[updated.length - 1] = { role: "assistant", content: accumulated, isStreaming: true };
              return updated;
            });
          } catch { /* continue */ }
        }
      }

      // Extract section content if marker is present
      let extractedContent: string | null = null;
      const markerIdx = accumulated.indexOf(SECTION_CONTENT_MARKER);
      let displayText = accumulated;

      if (markerIdx !== -1) {
        displayText = accumulated.slice(0, markerIdx).trim();
        try {
          const jsonStr = accumulated.slice(markerIdx + SECTION_CONTENT_MARKER.length).trim();
          const parsed = JSON.parse(jsonStr);
          extractedContent = parsed.content;
        } catch { /* no content extraction */ }
      }

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: displayText, isStreaming: false };
        return updated;
      });

      // Update section with extracted content
      if (extractedContent) {
        const sectionComplete: SectionState = {
          id: doc.currentSectionId,
          title: currentSection.title,
          content: extractedContent,
          status: "complete",
          lastUpdated: new Date().toISOString(),
        };

        // Find next pending section
        const currentIdx = schema.sections.findIndex((s) => s.id === doc.currentSectionId);
        const nextSection = schema.sections.slice(currentIdx + 1).find(
          (s) => doc.sections[s.id]?.status === "pending"
        );

        const newDoc = {
          ...doc,
          sections: { ...doc.sections, [doc.currentSectionId]: sectionComplete },
          currentSectionId: nextSection?.id ?? doc.currentSectionId,
        };
        updateDoc(newDoc);

        // Transition message to next section
        if (nextSection) {
          const nextSchema = schema.sections.find((s) => s.id === nextSection.id)!;
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: `✓ **${currentSection.title}** drafted successfully.\n\nNow let's work on **Section ${schema.sections.findIndex((s) => s.id === nextSection.id) + 1}: ${nextSchema.title}**.\n\n${nextSchema.description}\n\n${nextSchema.guideQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}`,
              },
            ]);
          }, 600);
        } else {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: `🎉 **All sections are now drafted!**\n\nYour ${schema.title} is complete. You can:\n- **Review and edit** each section using the preview panel\n- **Export as PDF** for official submission\n- **Export as Word** for further editing\n\nWould you like me to refine any section?`,
              },
            ]);
          }, 600);
        }
      } else {
        // No content extracted — reset section status to pending
        updateDoc({
          ...doc,
          sections: {
            ...doc.sections,
            [doc.currentSectionId]: { ...doc.sections[doc.currentSectionId], status: "pending" },
          },
        });
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        if (updated[updated.length - 1]?.isStreaming) {
          updated[updated.length - 1] = {
            role: "assistant",
            content: "I encountered an error. Please check your connection and try again.",
          };
        }
        return updated;
      });
      updateDoc({
        ...doc,
        sections: {
          ...doc.sections,
          [doc.currentSectionId]: { ...doc.sections[doc.currentSectionId], status: "pending" },
        },
      });
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  }

  function jumpToSection(sectionId: string) {
    if (isStreaming) return;
    const sectionSchema = schema.sections.find((s) => s.id === sectionId)!;
    updateDoc({ ...doc, currentSectionId: sectionId });

    const state = doc.sections[sectionId];
    const hasContent = state?.content && state.content.trim().length > 0;

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: hasContent
          ? `Switching to **${sectionSchema.title}**. This section already has a draft. Tell me what changes you'd like, or ask me to regenerate it entirely.`
          : `Switching to **Section ${schema.sections.findIndex((s) => s.id === sectionId) + 1}: ${sectionSchema.title}**.\n\n${sectionSchema.description}\n\n${sectionSchema.guideQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}`,
      },
    ]);
  }

  async function exportPdf() {
    setIsExportingPdf(true);
    try {
      const res = await fetch("/api/copilot/export/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docType: doc.docType, title: doc.title, country: doc.country, sections: doc.sections }),
      });
      if (!res.ok) throw new Error("PDF export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${doc.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("PDF export failed. Please try again.");
    } finally {
      setIsExportingPdf(false);
    }
  }

  async function exportDocx() {
    setIsExportingDocx(true);
    try {
      const res = await fetch("/api/copilot/export/docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docType: doc.docType, title: doc.title, country: doc.country, sections: doc.sections }),
      });
      if (!res.ok) throw new Error("DOCX export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${doc.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Word export failed. Please try again.");
    } finally {
      setIsExportingDocx(false);
    }
  }

  function saveEdit(sectionId: string) {
    const updated: SectionState = {
      ...doc.sections[sectionId],
      content: editContent,
      status: editContent.trim() ? "complete" : "pending",
      lastUpdated: new Date().toISOString(),
    };
    updateDoc({ ...doc, sections: { ...doc.sections, [sectionId]: updated } });
    setEditingSection(null);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  }

  function getSectionIcon(status: SectionState["status"]) {
    if (status === "complete") return <CheckCircle2 className="h-4 w-4 text-teal-500" />;
    if (status === "generating") return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
    if (status === "review") return <Clock className="h-4 w-4 text-amber-500" />;
    return <Circle className="h-4 w-4 text-slate-300" />;
  }

  const suggestedPrompts = [
    `Draft the ${currentSection.title} section now based on typical ${doc.country} data`,
    `What information do you need to draft this section?`,
    `Regenerate this section with more detail`,
    `Add UNFCCC framework references to this section`,
  ];

  return (
    <div className="flex h-screen flex-col bg-slate-50 overflow-hidden">
      {/* Top bar */}
      <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/copilot")}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Copilot
          </button>
          <span className="text-slate-300">/</span>
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-teal-600" />
            <span className="text-sm font-semibold text-slate-900 max-w-xs truncate">{doc.title}</span>
            <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-700">
              {schema.subtitle}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {savedFlash && <span className="text-xs text-teal-600 font-medium">Saved ✓</span>}
          <span className="text-xs text-slate-400">{completedCount}/{totalSections} sections</span>
          <button
            onClick={exportDocx}
            disabled={isExportingDocx || completedCount === 0}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
          >
            {isExportingDocx ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FileText className="h-3.5 w-3.5" />}
            Word
          </button>
          <button
            onClick={exportPdf}
            disabled={isExportingPdf || completedCount === 0}
            className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700 disabled:opacity-40 transition-colors"
          >
            {isExportingPdf ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
            Export PDF
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-100 shrink-0">
        <div
          className="h-full bg-teal-500 transition-all duration-500"
          style={{ width: `${(completedCount / totalSections) * 100}%` }}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Section Navigator */}
        <div className="w-56 shrink-0 border-r border-slate-200 bg-white overflow-y-auto">
          <div className="p-3 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sections</p>
          </div>
          <div className="p-2 space-y-0.5">
            {schema.sections.map((sectionSchema, idx) => {
              const state = doc.sections[sectionSchema.id];
              const isActive = sectionSchema.id === doc.currentSectionId;
              return (
                <button
                  key={sectionSchema.id}
                  onClick={() => jumpToSection(sectionSchema.id)}
                  className={`w-full text-left rounded-lg px-3 py-2.5 transition-all flex items-start gap-2 group ${
                    isActive
                      ? "bg-teal-50 border border-teal-200"
                      : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{getSectionIcon(state?.status ?? "pending")}</div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 mb-0.5">{idx + 1}</p>
                    <p className={`text-xs leading-snug font-medium truncate ${isActive ? "text-teal-700" : "text-slate-700"}`}>
                      {sectionSchema.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main area: Chat + Preview tabs */}
        <div className="flex flex-1 overflow-hidden flex-col">
          {/* Tab switcher */}
          <div className="flex border-b border-slate-200 bg-white px-4 shrink-0">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "chat"
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <Sparkles className="h-4 w-4" /> AI Copilot
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "preview"
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <FileText className="h-4 w-4" /> Document Preview
              {completedCount > 0 && (
                <span className="rounded-full bg-teal-100 px-1.5 py-0.5 text-xs font-bold text-teal-700">{completedCount}</span>
              )}
            </button>
          </div>

          {/* Chat Panel */}
          {activeTab === "chat" && (
            <div className="flex flex-1 overflow-hidden flex-col">
              {/* Current section header */}
              <div className="border-b border-slate-100 bg-slate-50 px-6 py-3 shrink-0">
                <div className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-teal-600" />
                  <span className="text-xs font-semibold text-slate-500">
                    Currently drafting:
                  </span>
                  <span className="text-xs font-bold text-teal-700">
                    Section {schema.sections.findIndex((s) => s.id === doc.currentSectionId) + 1} — {currentSection.title}
                  </span>
                  {doc.sections[doc.currentSectionId]?.status === "complete" && (
                    <span className="flex items-center gap-1 text-xs text-teal-600">
                      <CheckCircle2 className="h-3 w-3" /> Drafted
                    </span>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-600">
                        <Sparkles className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-teal-600 text-white"
                          : "bg-white border border-slate-200 shadow-sm"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <div className="space-y-1">
                          {parseMarkdown(msg.content)}
                          {msg.isStreaming && (
                            <span className="inline-block h-4 w-1 bg-teal-500 animate-pulse ml-0.5" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested prompts */}
              {messages.length <= 2 && !isStreaming && (
                <div className="px-6 pb-2 flex flex-wrap gap-2">
                  {suggestedPrompts.slice(0, 3).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="text-xs rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-teal-700 hover:bg-teal-100 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="border-t border-slate-200 bg-white p-4 shrink-0">
                <div className="flex gap-3">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
                    }}
                    rows={2}
                    placeholder={`Answer the questions above or ask for a draft of "${currentSection.title}"...`}
                    className="flex-1 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    disabled={isStreaming}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isStreaming}
                    className="flex h-full items-center justify-center rounded-xl bg-teal-600 px-4 text-white hover:bg-teal-700 disabled:opacity-40 transition-colors"
                  >
                    {isStreaming ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Enter to send · Shift+Enter for new line · Drafts auto-saved locally
                </p>
              </div>
            </div>
          )}

          {/* Document Preview Panel */}
          {activeTab === "preview" && (
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-3xl mx-auto py-8 px-8">
                {schema.sections.map((sectionSchema, idx) => {
                  const state = doc.sections[sectionSchema.id];
                  const hasContent = state?.content && state.content.trim().length > 0;
                  const isEditing = editingSection === sectionSchema.id;

                  return (
                    <div key={sectionSchema.id} className="mb-10 pb-10 border-b border-slate-100 last:border-0">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-1">
                            Section {idx + 1}
                          </p>
                          <h2 className="text-lg font-bold text-slate-900">{sectionSchema.title}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                          {getSectionIcon(state?.status ?? "pending")}
                          {hasContent && !isEditing && (
                            <button
                              onClick={() => {
                                setEditingSection(sectionSchema.id);
                                setEditContent(state.content);
                              }}
                              className="flex items-center gap-1 text-xs text-slate-500 hover:text-teal-600 border border-slate-200 rounded-lg px-2 py-1 hover:border-teal-300 transition-colors"
                            >
                              <Edit3 className="h-3 w-3" /> Edit
                            </button>
                          )}
                          <button
                            onClick={() => jumpToSection(sectionSchema.id)}
                            className="flex items-center gap-1 text-xs text-slate-500 hover:text-teal-600 border border-slate-200 rounded-lg px-2 py-1 hover:border-teal-300 transition-colors"
                          >
                            <RefreshCw className="h-3 w-3" />
                            {hasContent ? "Revise" : "Draft"}
                          </button>
                        </div>
                      </div>

                      {isEditing ? (
                        <div>
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full rounded-lg border border-teal-300 p-4 text-sm text-slate-900 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
                            rows={20}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => saveEdit(sectionSchema.id)}
                              className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700 transition-colors"
                            >
                              <Save className="h-3.5 w-3.5" /> Save changes
                            </button>
                            <button
                              onClick={() => setEditingSection(null)}
                              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <X className="h-3.5 w-3.5" /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : hasContent ? (
                        <div className="prose prose-sm max-w-none text-slate-700 space-y-1">
                          {parseMarkdown(state.content)}
                        </div>
                      ) : (
                        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                          <FileText className="h-6 w-6 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm text-slate-400">Not yet drafted</p>
                          <button
                            onClick={() => { setActiveTab("chat"); jumpToSection(sectionSchema.id); }}
                            className="mt-3 text-xs text-teal-600 hover:underline font-medium"
                          >
                            Draft this section with Copilot →
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
