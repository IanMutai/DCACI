"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileCheck,
  ArrowLeft,
  ArrowRight,
  Globe,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Search,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4;

interface FormData {
  // Step 1: Project Selection
  projectId: string;
  projectTitle: string;
  projectSector: string;
  projectCounty: string;
  availableCredits: number;

  // Step 2: Transfer Details
  mechanism: "ARTICLE_6_2" | "ARTICLE_6_4" | "";
  acquiringCountry: string;
  acquiringEntity: string;
  authorizedQuantity: number;
  vintages: number[];

  // Step 3: Commercial Terms
  pricePerTonne: number | null;
  currency: string;
  paymentTerms: string;
  correspondingAdjustmentRequired: boolean;
  correspondingAdjustmentMethod: string;

  // Step 4: Documentation
  supportingDocuments: string[];
  notes: string;
}

const mockProjects = [
  {
    id: "PRJ-MRB-001",
    title: "Marsabit Wind Farm Phase II",
    sector: "Energy",
    county: "Marsabit",
    availableCredits: 450000,
    vintages: [2024, 2025, 2026, 2027, 2028],
  },
  {
    id: "PRJ-KTI-002",
    title: "Kitui Smart Agriculture CSA",
    sector: "Agriculture",
    county: "Kitui",
    availableCredits: 120000,
    vintages: [2024, 2025, 2026],
  },
  {
    id: "PRJ-NRB-003",
    title: "Nairobi E-Mobility Initiative",
    sector: "Transport",
    county: "Nairobi",
    availableCredits: 280000,
    vintages: [2024, 2025, 2026, 2027],
  },
  {
    id: "PRJ-KKM-004",
    title: "Kakamega Forest Protection",
    sector: "Forestry",
    county: "Kakamega",
    availableCredits: 350000,
    vintages: [2024, 2025, 2026, 2027, 2028],
  },
  {
    id: "PRJ-MSA-005",
    title: "Mombasa Mangrove Restoration",
    sector: "Forestry",
    county: "Mombasa",
    availableCredits: 180000,
    vintages: [2024, 2025, 2026],
  },
];

const countries = [
  "Switzerland", "Japan", "Singapore", "Germany", "Norway", "Sweden",
  "United Kingdom", "Netherlands", "South Korea", "Canada", "Australia",
];

const stepLabels = [
  "Select Project",
  "Transfer Details",
  "Commercial Terms",
  "Review & Submit",
];

export default function CreateLoaPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<FormData>({
    projectId: "",
    projectTitle: "",
    projectSector: "",
    projectCounty: "",
    availableCredits: 0,
    mechanism: "",
    acquiringCountry: "",
    acquiringEntity: "",
    authorizedQuantity: 0,
    vintages: [],
    pricePerTonne: null,
    currency: "USD",
    paymentTerms: "",
    correspondingAdjustmentRequired: true,
    correspondingAdjustmentMethod: "FIRST_TRANSFER",
    supportingDocuments: [],
    notes: "",
  });

  const filteredProjects = mockProjects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedProject = mockProjects.find((p) => p.id === formData.projectId);

  const handleProjectSelect = (project: typeof mockProjects[0]) => {
    setFormData({
      ...formData,
      projectId: project.id,
      projectTitle: project.title,
      projectSector: project.sector,
      projectCounty: project.county,
      availableCredits: project.availableCredits,
    });
  };

  const handleVintageToggle = (vintage: number) => {
    const newVintages = formData.vintages.includes(vintage)
      ? formData.vintages.filter((v) => v !== vintage)
      : [...formData.vintages, vintage].sort();
    setFormData({ ...formData, vintages: newVintages });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.projectId !== "";
      case 2:
        return (
          formData.mechanism !== "" &&
          formData.acquiringCountry !== "" &&
          formData.acquiringEntity !== "" &&
          formData.authorizedQuantity > 0 &&
          formData.vintages.length > 0
        );
      case 3:
        return true; // Commercial terms are optional
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to the API
    console.log("Submitting LoA:", formData);
    router.push("/dashboard/finance/loa");
  };

  return (
    <div className="animate-fade-up space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/finance/loa"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary))] transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">
            New Letter of Authorization
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Request authorization for Article 6 ITMO transfer
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="card">
        <div className="flex items-center justify-between">
          {stepLabels.map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;

            return (
              <div key={label} className="flex-1 flex items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isActive
                          ? "bg-[hsl(var(--primary))] text-white"
                          : "bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))]"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-4 w-4" /> : stepNum}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {idx < stepLabels.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      currentStep > stepNum ? "bg-emerald-500" : "bg-[hsl(var(--secondary))]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="card">
        {/* Step 1: Project Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                Select Registry Project
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Choose the project for which you want to request ITMO transfer authorization
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[hsl(var(--border))] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  className={`text-left rounded-xl border-2 p-4 transition-all ${
                    formData.projectId === project.id
                      ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)]"
                      : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
                        {project.id}
                      </span>
                      <h3 className="text-base font-medium text-[hsl(var(--foreground))] mt-0.5">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                        <span>{project.sector}</span>
                        <span>·</span>
                        <span>{project.county}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[hsl(var(--foreground))]">
                        {project.availableCredits.toLocaleString()}
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        tCO2e available
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Transfer Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                Transfer Details
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Specify the mechanism, acquiring party, and volume for this transfer
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                  Article 6 Mechanism
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "ARTICLE_6_2", label: "Article 6.2", desc: "Bilateral/Multilateral" },
                    { value: "ARTICLE_6_4", label: "Article 6.4", desc: "Centralized (SDM)" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        setFormData({ ...formData, mechanism: option.value as "ARTICLE_6_2" | "ARTICLE_6_4" })
                      }
                      className={`rounded-xl border-2 p-4 text-left transition-all ${
                        formData.mechanism === option.value
                          ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)]"
                          : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]"
                      }`}
                    >
                      <p className="font-medium text-[hsl(var(--foreground))]">{option.label}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                  Acquiring Country
                </label>
                <select
                  value={formData.acquiringCountry}
                  onChange={(e) => setFormData({ ...formData, acquiringCountry: e.target.value })}
                  className="w-full rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-3 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
                >
                  <option value="">Select country...</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                  Acquiring Entity
                </label>
                <input
                  type="text"
                  value={formData.acquiringEntity}
                  onChange={(e) => setFormData({ ...formData, acquiringEntity: e.target.value })}
                  placeholder="e.g., Swiss Climate Foundation"
                  className="w-full rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-3 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                  Authorized Quantity (tCO2e)
                </label>
                <input
                  type="number"
                  value={formData.authorizedQuantity || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, authorizedQuantity: parseInt(e.target.value) || 0 })
                  }
                  max={selectedProject?.availableCredits || 0}
                  className="w-full rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-3 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
                />
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                  Maximum available: {selectedProject?.availableCredits.toLocaleString() || 0} tCO2e
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                  Vintages
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProject?.vintages.map((vintage) => (
                    <button
                      key={vintage}
                      onClick={() => handleVintageToggle(vintage)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        formData.vintages.includes(vintage)
                          ? "bg-[hsl(var(--primary))] text-white"
                          : "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.1)]"
                      }`}
                    >
                      {vintage}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Commercial Terms */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                Commercial Terms
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Optional: Specify pricing and payment terms for this transfer
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                  Price per Tonne
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                  <input
                    type="number"
                    value={formData.pricePerTonne || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, pricePerTonne: parseFloat(e.target.value) || null })
                    }
                    placeholder="25.00"
                    className="w-full rounded-xl border border-[hsl(var(--border))] bg-white py-3 pl-10 pr-4 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-3 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CHF">CHF - Swiss Franc</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                  Payment Terms
                </label>
                <textarea
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                  placeholder="e.g., 50% upon signing, 50% upon issuance"
                  rows={3}
                  className="w-full rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-3 text-sm focus:border-[hsl(var(--primary))] focus:outline-none resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.correspondingAdjustmentRequired}
                    onChange={(e) =>
                      setFormData({ ...formData, correspondingAdjustmentRequired: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-[hsl(var(--border))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                  />
                  <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                    Corresponding Adjustment Required
                  </span>
                </label>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 ml-7">
                  Required for ITMOs to be used towards the acquiring party&apos;s NDC
                </p>
              </div>

              {formData.correspondingAdjustmentRequired && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                    Corresponding Adjustment Method
                  </label>
                  <select
                    value={formData.correspondingAdjustmentMethod}
                    onChange={(e) =>
                      setFormData({ ...formData, correspondingAdjustmentMethod: e.target.value })
                    }
                    className="w-full rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-3 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
                  >
                    <option value="FIRST_TRANSFER">First Transfer Approach</option>
                    <option value="AUTHORIZATION">Authorization Approach</option>
                    <option value="ISSUANCE">Issuance Approach</option>
                  </select>
                </div>
              )}
            </div>

            {formData.pricePerTonne && formData.authorizedQuantity > 0 && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                <div className="flex items-center gap-2 text-emerald-800">
                  <DollarSign className="h-5 w-5" />
                  <span className="font-medium">Estimated Transaction Value</span>
                </div>
                <p className="text-2xl font-bold text-emerald-700 mt-2">
                  {formData.currency} {(formData.pricePerTonne * formData.authorizedQuantity).toLocaleString()}
                </p>
                <p className="text-sm text-emerald-600 mt-1">
                  {formData.authorizedQuantity.toLocaleString()} tCO2e × {formData.currency} {formData.pricePerTonne}/tCO2e
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                Review & Submit
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Review the LoA details before submitting for approval
              </p>
            </div>

            <div className="rounded-xl border border-[hsl(var(--border))] divide-y divide-[hsl(var(--border))]">
              {/* Project Details */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-3">
                  Project Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Project ID</p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{formData.projectId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Project Title</p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{formData.projectTitle}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Sector</p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{formData.projectSector}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">County</p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{formData.projectCounty}</p>
                  </div>
                </div>
              </div>

              {/* Transfer Details */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-3">
                  Transfer Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Mechanism</p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                      {formData.mechanism === "ARTICLE_6_2" ? "Article 6.2" : "Article 6.4"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Authorized Quantity</p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                      {formData.authorizedQuantity.toLocaleString()} tCO2e
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Acquiring Country</p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{formData.acquiringCountry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Acquiring Entity</p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{formData.acquiringEntity}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Vintages</p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                      {formData.vintages.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Commercial Terms */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-3">
                  Commercial Terms
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Price per Tonne</p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                      {formData.pricePerTonne
                        ? `${formData.currency} ${formData.pricePerTonne}`
                        : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Total Value</p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                      {formData.pricePerTonne
                        ? `${formData.currency} ${(formData.pricePerTonne * formData.authorizedQuantity).toLocaleString()}`
                        : "Not specified"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Corresponding Adjustment</p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                      {formData.correspondingAdjustmentRequired
                        ? `Required (${formData.correspondingAdjustmentMethod.replace(/_/g, " ")})`
                        : "Not required"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Important Notice</p>
                  <p className="text-sm text-amber-700 mt-1">
                    By submitting this LoA request, you confirm that you have the authority to authorize
                    the transfer of ITMOs from this project. This request will be subject to review by the
                    Climate Change Directorate.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional information for reviewers..."
                rows={3}
                className="w-full rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-3 text-sm focus:border-[hsl(var(--primary))] focus:outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[hsl(var(--border))]">
          <button
            onClick={() => setCurrentStep((currentStep - 1) as Step)}
            disabled={currentStep === 1}
            className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep((currentStep + 1) as Step)}
              disabled={!canProceed()}
              className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-medium text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              <FileCheck className="h-4 w-4" />
              Submit LoA Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
