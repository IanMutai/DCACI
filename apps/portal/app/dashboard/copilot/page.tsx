"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Target,
  BarChart3,
  Globe2,
  Layers,
  MapPin,
  Wand2,
  ArrowRight,
  Clock,
  FileText,
  ChevronRight,
} from "lucide-react";
import { DOCUMENT_TYPES, KENYA_COUNTIES, initDocumentState, type DocType, type DocumentState } from "@/lib/copilot/document-types";

const ICON_MAP: Record<string, React.ElementType> = {
  Target,
  BarChart3,
  Globe2,
  Layers,
  MapPin,
};

const COLOR_MAP: Record<string, { bg: string; border: string; badge: string; icon: string; dot: string }> = {
  teal:   { bg: "bg-teal-50",   border: "border-teal-200",   badge: "bg-teal-100 text-teal-700",   icon: "text-teal-600",   dot: "bg-teal-500" },
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   badge: "bg-blue-100 text-blue-700",   icon: "text-blue-600",   dot: "bg-blue-500" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  badge: "bg-green-100 text-green-700", icon: "text-green-600",  dot: "bg-green-500" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-100 text-purple-700", icon: "text-purple-600", dot: "bg-purple-500" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-100 text-orange-700", icon: "text-orange-600", dot: "bg-orange-500" },
};

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Angola", "Argentina", "Armenia", "Australia",
  "Bangladesh", "Benin", "Bolivia", "Botswana", "Brazil", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Canada", "Chad", "Chile", "China", "Colombia", "Congo",
  "Costa Rica", "Ecuador", "Egypt", "El Salvador", "Ethiopia", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Guatemala", "Guinea", "Haiti",
  "Honduras", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Laos", "Lebanon",
  "Liberia", "Libya", "Madagascar", "Malawi", "Malaysia", "Mali", "Mexico", "Mongolia",
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "Norway", "Pakistan", "Panama", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal", "Romania", "Rwanda", "Saudi Arabia", "Senegal",
  "Sierra Leone", "Singapore", "Somalia", "South Africa", "South Korea", "Spain",
  "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Tanzania", "Thailand", "Togo",
  "Tunisia", "Turkey", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

function getDraftDocs(): DocumentState[] {
  if (typeof window === "undefined") return [];
  const keys = Object.keys(localStorage).filter((k) => k.startsWith("copilot_doc_"));
  return keys
    .map((k) => {
      try { return JSON.parse(localStorage.getItem(k) ?? ""); } catch { return null; }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export default function CopilotPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<DocType | null>(null);
  const [country, setCountry] = useState("Kenya");
  const [county, setCounty] = useState(KENYA_COUNTIES[0]);
  const [title, setTitle] = useState("");
  const [drafts, setDrafts] = useState<DocumentState[]>([]);
  const [showForm, setShowForm] = useState(false);

  const selectedSchema = DOCUMENT_TYPES.find((d) => d.id === selectedType);
  const isKenyaOnly = selectedSchema?.kenyaOnly ?? false;
  const isCountyLevel = selectedSchema?.countyLevel ?? false;

  useEffect(() => {
    setDrafts(getDraftDocs());
  }, []);

  useEffect(() => {
    if (selectedType && selectedSchema) {
      const label = isCountyLevel ? county : (isKenyaOnly ? "Kenya" : country);
      setTitle(`${label} ${selectedSchema.subtitle} ${new Date().getFullYear()}`);
    }
  }, [selectedType, country, county, selectedSchema, isKenyaOnly, isCountyLevel]);

  function handleStart() {
    if (!selectedType || !title) return;
    const effectiveCountry = isKenyaOnly ? "Kenya" : country;
    const effectiveCounty = isCountyLevel ? county : undefined;
    const doc = initDocumentState(selectedType, title, effectiveCountry, effectiveCounty);
    localStorage.setItem(`copilot_doc_${doc.id}`, JSON.stringify(doc));
    router.push(`/dashboard/copilot/${doc.id}`);
  }

  function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  function completedCount(doc: DocumentState) {
    return Object.values(doc.sections).filter((s) => s.status === "complete").length;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600">
              <Wand2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Climate Document Copilot</h1>
              <p className="text-sm text-slate-500">
                AI-assisted creation of UNFCCC-compliant climate documents
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 space-y-10">

        {/* Draft documents */}
        {drafts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900">Resume a Draft</h2>
              <span className="text-xs text-slate-400">{drafts.length} draft{drafts.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {drafts.map((doc) => {
                const schema = DOCUMENT_TYPES.find((d) => d.id === doc.docType)!;
                const colors = COLOR_MAP[schema.color];
                const completed = completedCount(doc);
                const total = schema.sections.length;
                const pct = Math.round((completed / total) * 100);
                return (
                  <button
                    key={doc.id}
                    onClick={() => router.push(`/dashboard/copilot/${doc.id}`)}
                    className="text-left border border-slate-200 bg-white rounded-xl p-4 hover:border-teal-300 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>{schema.subtitle}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />{timeAgo(doc.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 mb-1 line-clamp-2">{doc.title}</p>
                    <p className="text-xs text-slate-500 mb-3">{doc.country}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{completed}/{total}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-600 transition-colors" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* New document */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-900">Start a New Document</h2>
          </div>

          {/* Step 1: Choose document type */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Step 1 — Choose document type</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DOCUMENT_TYPES.map((docType) => {
                const Icon = ICON_MAP[docType.icon];
                const colors = COLOR_MAP[docType.color];
                const isSelected = selectedType === docType.id;
                return (
                  <button
                    key={docType.id}
                    onClick={() => { setSelectedType(docType.id); setShowForm(true); }}
                    className={`text-left rounded-xl border-2 p-5 transition-all ${
                      isSelected
                        ? `${colors.border} ${colors.bg} shadow-sm`
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${isSelected ? colors.bg : "bg-slate-100"}`}>
                      <Icon className={`h-5 w-5 ${isSelected ? colors.icon : "text-slate-500"}`} />
                    </div>
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${colors.badge}`}>
                      {docType.subtitle}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1 leading-snug">{docType.title}</h3>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">{docType.description}</p>
                    <div className="flex flex-wrap gap-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />{docType.estimatedPages}
                      </span>
                      <span>·</span>
                      <span>{docType.sections.length} sections</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Configure */}
          {showForm && selectedType && selectedSchema && (
            <div className="border border-slate-200 bg-white rounded-xl p-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Step 2 — Configure your document</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* County selector — only for county-level docs */}
                {isCountyLevel && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Kenya County</label>
                    <select
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      {KENYA_COUNTIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Country selector — only for non-Kenya-specific docs */}
                {!isKenyaOnly && !isCountyLevel && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Kenya badge — shown for Kenya-only non-county docs */}
                {isKenyaOnly && !isCountyLevel && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
                      <span className="text-sm text-slate-900 font-medium">Kenya</span>
                      <span className="text-xs text-slate-400 ml-1">— this document type is Kenya-specific</span>
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Document Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder={isCountyLevel ? `e.g. ${county} County CCAP 2025–2030` : "e.g. Kenya Third NDC 2036-2040"}
                  />
                </div>
              </div>
              {selectedType && (
                <div className="mb-6 rounded-lg bg-slate-50 p-4 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 mb-2">Sections that will be created:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {DOCUMENT_TYPES.find((d) => d.id === selectedType)?.sections.map((s, i) => (
                      <span key={s.id} className="text-xs bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                        {i + 1}. {s.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={handleStart}
                disabled={!title.trim()}
                className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Wand2 className="h-4 w-4" />
                Start with Copilot
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </section>

        {/* Info banner */}
        <section className="rounded-xl border border-teal-100 bg-teal-50 p-6">
          <h3 className="text-sm font-semibold text-teal-900 mb-2">How the Climate Document Copilot works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-teal-800">
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">1</span>
              <p><strong>Guide.</strong> The AI asks targeted questions about your country's specific situation — targets, baselines, sector data.</p>
            </div>
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">2</span>
              <p><strong>Draft.</strong> Using your answers, it generates formal UNFCCC-compliant language for each section, one at a time.</p>
            </div>
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">3</span>
              <p><strong>Export.</strong> Download the complete document as a professional PDF or Word file, ready for review and submission.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
