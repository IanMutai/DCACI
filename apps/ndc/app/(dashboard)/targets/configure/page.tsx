"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Settings2,
  Target,
  BarChart3,
  FileText,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────── */
interface FormData {
  // Step 1 — Basic Info
  name: string;
  sector: string;
  description: string;
  ndcLinkage: string;
  // Step 2 — Metrics
  type: "absolute" | "intensity";
  referenceType: "bau" | "fixed";
  baseYear: string;
  baseValue: string;
  targetYear: string;
  targetValue: string;
  unit: string;
  // Step 3 — Conditions
  conditionality: "unconditional" | "conditional";
  supportNeeded: string;
  prerequisites: string;
}

const initialFormData: FormData = {
  name: "",
  sector: "",
  description: "",
  ndcLinkage: "",
  type: "absolute",
  referenceType: "bau",
  baseYear: "2015",
  baseValue: "",
  targetYear: "2030",
  targetValue: "",
  unit: "",
  conditionality: "unconditional",
  supportNeeded: "",
  prerequisites: "",
};

const sectors = [
  "Economy-wide",
  "Energy",
  "Transport",
  "Forestry",
  "Agriculture",
  "Industry",
  "Waste",
  "LULUCF",
];

const steps = [
  { label: "Basic Info", icon: FileText },
  { label: "Metrics", icon: BarChart3 },
  { label: "Conditions", icon: Settings2 },
  { label: "Review", icon: Check },
];

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
export default function TargetConfigurePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canNext = () => {
    if (currentStep === 0) return formData.name.trim() !== "" && formData.sector !== "";
    if (currentStep === 1) return formData.baseValue.trim() !== "" && formData.targetValue.trim() !== "" && formData.unit.trim() !== "";
    return true;
  };

  const next = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };
  const prev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-[800px] animate-fade-up py-12 text-center">
        <div className="card-elevated py-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-[hsl(var(--color-text))]">Target Created Successfully</h2>
          <p className="mt-2 text-sm text-[hsl(var(--color-text-muted))]">
            &quot;{formData.name}&quot; has been added to the NDC target registry.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/targets" className="btn-primary">
              <Target className="h-4 w-4" />
              View All Targets
            </Link>
            <button
              onClick={() => {
                setFormData(initialFormData);
                setCurrentStep(0);
                setSubmitted(false);
              }}
              className="btn-secondary"
            >
              Add Another Target
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[900px] space-y-6 animate-fade-up">
      {/* Breadcrumb */}
      <Link
        href="/targets"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--color-primary-light))] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Targets
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20">
          <Settings2 className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Configure Target</h1>
          <p className="text-sm text-[hsl(var(--color-text-muted))]">
            Define a new NDC target with metrics and conditions
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="card-elevated !p-4">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === currentStep;
            const isComplete = i < currentStep;
            return (
              <div key={step.label} className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => i <= currentStep && setCurrentStep(i)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[hsl(var(--color-primary-50))] text-[hsl(var(--color-primary))]"
                      : isComplete
                        ? "text-emerald-600"
                        : "text-[hsl(var(--color-text-muted))]"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      isActive
                        ? "bg-[hsl(var(--color-primary))] text-white"
                        : isComplete
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-[hsl(var(--color-background))] text-[hsl(var(--color-text-muted))]"
                    }`}
                  >
                    {isComplete ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div
                    className={`hidden h-0.5 flex-1 rounded-full sm:block ${
                      i < currentStep ? "bg-emerald-400" : "bg-[hsl(var(--color-border))]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="card-elevated">
        {/* Step 1: Basic Info */}
        {currentStep === 0 && (
          <div className="space-y-5 animate-fade-up">
            <h2 className="text-lg font-bold text-[hsl(var(--color-text))]">Basic Information</h2>
            <p className="text-sm text-[hsl(var(--color-text-muted))]">
              Provide the fundamental details for this NDC target.
            </p>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                Target Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g., Economy-wide GHG Reduction"
                className="input-field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                Sector <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.sector}
                  onChange={(e) => update("sector", e.target.value)}
                  className="input-field appearance-none pr-8"
                >
                  <option value="">Select sector...</option>
                  {sectors.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-text-muted))]" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe the target's scope, coverage, and objectives..."
                rows={4}
                className="input-field resize-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                NDC Linkage
              </label>
              <input
                type="text"
                value={formData.ndcLinkage}
                onChange={(e) => update("ndcLinkage", e.target.value)}
                placeholder="e.g., 2nd NDC, Section 4.2 - Mitigation Targets"
                className="input-field"
              />
              <p className="mt-1 text-xs text-[hsl(var(--color-text-muted))]">
                Reference to the specific NDC document section this target fulfills.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Metrics */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fade-up">
            <h2 className="text-lg font-bold text-[hsl(var(--color-text))]">Target Metrics</h2>
            <p className="text-sm text-[hsl(var(--color-text-muted))]">
              Define the quantitative parameters and measurement approach.
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                  Target Type <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {(["absolute", "intensity"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => update("type", t)}
                      className={`flex-1 rounded-lg border p-3 text-center text-sm font-medium transition-all ${
                        formData.type === t
                          ? "border-[hsl(var(--color-border-focus))] bg-[hsl(var(--color-primary-50))] text-[hsl(var(--color-primary))]"
                          : "border-[hsl(var(--color-border))] text-[hsl(var(--color-text-secondary))] hover:border-[hsl(var(--color-border-focus))]"
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                  Reference Type
                </label>
                <div className="flex gap-3">
                  {(["bau", "fixed"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => update("referenceType", r)}
                      className={`flex-1 rounded-lg border p-3 text-center text-sm font-medium transition-all ${
                        formData.referenceType === r
                          ? "border-[hsl(var(--color-border-focus))] bg-[hsl(var(--color-primary-50))] text-[hsl(var(--color-primary))]"
                          : "border-[hsl(var(--color-border))] text-[hsl(var(--color-text-secondary))] hover:border-[hsl(var(--color-border-focus))]"
                      }`}
                    >
                      {r === "bau" ? "BAU Baseline" : "Fixed Baseline"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                  Base Year
                </label>
                <input
                  type="number"
                  value={formData.baseYear}
                  onChange={(e) => update("baseYear", e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                  Base Value <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.baseValue}
                  onChange={(e) => update("baseValue", e.target.value)}
                  placeholder="e.g., 73 MtCO2e"
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                  Target Year
                </label>
                <input
                  type="number"
                  value={formData.targetYear}
                  onChange={(e) => update("targetYear", e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                  Target Value <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.targetValue}
                  onChange={(e) => update("targetValue", e.target.value)}
                  placeholder="e.g., 32% below BAU"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                Unit <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => update("unit", e.target.value)}
                placeholder="e.g., MtCO2e, %, MW, % of farmers"
                className="input-field"
              />
            </div>
          </div>
        )}

        {/* Step 3: Conditions */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fade-up">
            <h2 className="text-lg font-bold text-[hsl(var(--color-text))]">Conditionality</h2>
            <p className="text-sm text-[hsl(var(--color-text-muted))]">
              Specify whether this target is conditional on international support.
            </p>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                Conditionality Type
              </label>
              <div className="flex gap-3">
                {(["unconditional", "conditional"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => update("conditionality", c)}
                    className={`flex-1 rounded-lg border p-4 text-left transition-all ${
                      formData.conditionality === c
                        ? "border-[hsl(var(--color-border-focus))] bg-[hsl(var(--color-primary-50))]"
                        : "border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-border-focus))]"
                    }`}
                  >
                    <p className={`text-sm font-semibold ${formData.conditionality === c ? "text-[hsl(var(--color-primary))]" : "text-[hsl(var(--color-text))]"}`}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </p>
                    <p className="mt-0.5 text-xs text-[hsl(var(--color-text-muted))]">
                      {c === "unconditional"
                        ? "Achievable with domestic resources only"
                        : "Requires international support (finance, technology, capacity building)"}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {formData.conditionality === "conditional" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                    Support Needed
                  </label>
                  <textarea
                    value={formData.supportNeeded}
                    onChange={(e) => update("supportNeeded", e.target.value)}
                    placeholder="Describe the international support required (finance, technology transfer, capacity building)..."
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text))]">
                    Prerequisites
                  </label>
                  <textarea
                    value={formData.prerequisites}
                    onChange={(e) => update("prerequisites", e.target.value)}
                    placeholder="List any prerequisites or conditions that must be met..."
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                    <div>
                      <p className="text-xs font-semibold text-amber-800">
                        Conditional Target Note
                      </p>
                      <p className="text-[11px] text-amber-700">
                        Conditional targets require clear articulation of support needs for BTR reporting under Article 13 of the Paris Agreement.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fade-up">
            <h2 className="text-lg font-bold text-[hsl(var(--color-text))]">Review & Save</h2>
            <p className="text-sm text-[hsl(var(--color-text-muted))]">
              Review all details before saving the target.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Basic Info */}
              <div className="rounded-lg border border-[hsl(var(--color-border))] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-[hsl(var(--color-primary-light))]" />
                  <h3 className="text-sm font-bold text-[hsl(var(--color-text))]">Basic Information</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-text-muted))]">Name</span>
                    <span className="font-medium text-[hsl(var(--color-text))]">{formData.name || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-text-muted))]">Sector</span>
                    <span className="font-medium text-[hsl(var(--color-text))]">{formData.sector || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-text-muted))]">NDC Linkage</span>
                    <span className="font-medium text-[hsl(var(--color-text))]">{formData.ndcLinkage || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="rounded-lg border border-[hsl(var(--color-border))] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-4 w-4 text-[hsl(var(--color-primary-light))]" />
                  <h3 className="text-sm font-bold text-[hsl(var(--color-text))]">Target Metrics</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-text-muted))]">Type</span>
                    <span className="font-medium text-[hsl(var(--color-text))] capitalize">{formData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-text-muted))]">Reference</span>
                    <span className="font-medium text-[hsl(var(--color-text))]">{formData.referenceType === "bau" ? "BAU Baseline" : "Fixed Baseline"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-text-muted))]">Base</span>
                    <span className="font-medium text-[hsl(var(--color-text))]">{formData.baseValue || "—"} ({formData.baseYear})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-text-muted))]">Target</span>
                    <span className="font-medium text-[hsl(var(--color-text))]">{formData.targetValue || "—"} ({formData.targetYear})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-text-muted))]">Unit</span>
                    <span className="font-medium text-[hsl(var(--color-text))]">{formData.unit || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Conditionality */}
              <div className="rounded-lg border border-[hsl(var(--color-border))] p-4 sm:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <Settings2 className="h-4 w-4 text-[hsl(var(--color-primary-light))]" />
                  <h3 className="text-sm font-bold text-[hsl(var(--color-text))]">Conditionality</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--color-text-muted))]">Type</span>
                    <span className={`font-medium capitalize ${formData.conditionality === "unconditional" ? "text-emerald-600" : "text-amber-600"}`}>
                      {formData.conditionality}
                    </span>
                  </div>
                  {formData.conditionality === "conditional" && formData.supportNeeded && (
                    <div>
                      <span className="text-[hsl(var(--color-text-muted))]">Support Needed:</span>
                      <p className="mt-0.5 text-[hsl(var(--color-text-secondary))]">{formData.supportNeeded}</p>
                    </div>
                  )}
                  {formData.conditionality === "conditional" && formData.prerequisites && (
                    <div>
                      <span className="text-[hsl(var(--color-text-muted))]">Prerequisites:</span>
                      <p className="mt-0.5 text-[hsl(var(--color-text-secondary))]">{formData.prerequisites}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {formData.description && (
                <div className="rounded-lg border border-[hsl(var(--color-border))] p-4 sm:col-span-2">
                  <h3 className="text-sm font-bold text-[hsl(var(--color-text))] mb-1">Description</h3>
                  <p className="text-sm text-[hsl(var(--color-text-secondary))]">{formData.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between border-t border-[hsl(var(--color-border-light))] pt-5">
          <button
            onClick={prev}
            disabled={currentStep === 0}
            className={`btn-secondary ${currentStep === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button onClick={next} disabled={!canNext()} className={`btn-primary ${!canNext() ? "opacity-50 cursor-not-allowed" : ""}`}>
              Next Step
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary">
              <CheckCircle2 className="h-4 w-4" />
              Save Target
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
