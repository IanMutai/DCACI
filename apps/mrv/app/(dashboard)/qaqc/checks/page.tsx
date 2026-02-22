"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Play,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  BarChart3,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Filter,
  Info,
} from "lucide-react";

interface QAQCCheck {
  id: string;
  name: string;
  description: string;
  category: "completeness" | "consistency" | "accuracy" | "comparability" | "transparency";
  status: "pass" | "fail" | "warning" | "not_run";
  details: string;
  recommendedAction: string;
  severity: "high" | "medium" | "low";
  lastRun: string;
}

const checks: QAQCCheck[] = [
  { id: "QC-001", name: "Category Completeness", description: "Verify all IPCC source/sink categories have been estimated or notation keys applied", category: "completeness", status: "pass", details: "All 5 sectors covered. 42 of 44 source categories reported. 2 categories marked as 'NE' (Not Estimated) with justification.", recommendedAction: "No action required. Continue to review NE categories annually.", severity: "high", lastRun: "2025-12-15" },
  { id: "QC-002", name: "Gas Completeness", description: "Check that all required greenhouse gases are reported for each category", category: "completeness", status: "pass", details: "CO2, CH4, N2O reported for all applicable categories. HFCs reported for 2.F. PFCs and SF6 marked as 'NO' (Not Occurring).", recommendedAction: "No action needed.", severity: "high", lastRun: "2025-12-15" },
  { id: "QC-003", name: "Time Series Consistency", description: "Check for outliers and discontinuities in the time series (2016-2022)", category: "consistency", status: "warning", details: "Outlier detected in 1.A.3 (Transport) for 2020 - emissions drop of 18% likely due to COVID-19. Energy Industries shows 12% jump in 2021.", recommendedAction: "Document COVID-19 impact for 2020 transport dip. Verify 2021 energy data against national statistics.", severity: "medium", lastRun: "2025-12-15" },
  { id: "QC-004", name: "Emission Factor Range Check", description: "Verify all emission factors fall within IPCC default ranges", category: "accuracy", status: "pass", details: "All emission factors within IPCC recommended ranges. Country-specific EFs for grid electricity (0.4326 tCO2/MWh) validated against East Africa average.", recommendedAction: "No action required.", severity: "high", lastRun: "2025-12-15" },
  { id: "QC-005", name: "Cross-Sector Validation", description: "Validate data consistency across sectors (e.g., fuel allocation between energy and transport)", category: "consistency", status: "fail", details: "Total fuel consumption in sectoral approach exceeds reference approach by 4.2%. Discrepancy in diesel allocation between 1.A.1 and 1.A.3 categories.", recommendedAction: "Reconcile sectoral vs reference approach for energy. Review diesel allocation between stationary combustion and transport.", severity: "high", lastRun: "2025-12-15" },
  { id: "QC-006", name: "Reference Approach Comparison", description: "Compare sectoral approach vs reference approach for energy sector CO2", category: "accuracy", status: "warning", details: "Sectoral approach: 42,800 Gg CO2. Reference approach: 44,100 Gg CO2. Difference: 2.9% (acceptable range: +/- 5%).", recommendedAction: "Difference is within acceptable range but should be documented. Investigate fuel allocation to non-energy use.", severity: "medium", lastRun: "2025-12-14" },
  { id: "QC-007", name: "Notation Key Validation", description: "Verify correct use of notation keys (NE, NO, IE, C, NA) per IPCC guidelines", category: "transparency", status: "pass", details: "All notation keys correctly applied. NE categories justified. IE (Included Elsewhere) references provided for all cases.", recommendedAction: "No action required.", severity: "low", lastRun: "2025-12-15" },
  { id: "QC-008", name: "Unit Consistency", description: "Check that units are consistent across all categories and time series", category: "consistency", status: "pass", details: "All emissions reported in Gg CO2eq. Activity data units consistent with IPCC categories. GWP values from AR5 applied consistently.", recommendedAction: "No action required.", severity: "medium", lastRun: "2025-12-15" },
  { id: "QC-009", name: "Documentation Completeness", description: "Check that methods, data sources, and assumptions are documented for all categories", category: "transparency", status: "warning", details: "Documentation complete for Energy and IPPU sectors. Agriculture sector missing methodology description for 3.B (Manure Management). LULUCF has incomplete references.", recommendedAction: "Complete methodology documentation for Agriculture 3.B and LULUCF 4.A categories before NIR submission.", severity: "medium", lastRun: "2025-12-15" },
  { id: "QC-010", name: "International Comparability", description: "Compare per capita emissions and emission intensities with regional averages", category: "comparability", status: "pass", details: "Kenya per capita: 1.7 tCO2eq/cap (2022). Sub-Saharan Africa average: 1.2 tCO2eq/cap. East Africa average: 0.8 tCO2eq/cap. Higher due to cement industry.", recommendedAction: "Document reasons for above-average per capita emissions in NIR.", severity: "low", lastRun: "2025-12-15" },
  { id: "QC-011", name: "Activity Data Verification", description: "Cross-check activity data against independent national statistics", category: "accuracy", status: "pass", details: "Energy data verified against EPRA annual reports. Livestock data cross-checked with FAO statistics. Cement production verified with industry association.", recommendedAction: "No action required.", severity: "high", lastRun: "2025-12-15" },
  { id: "QC-012", name: "GWP Consistency", description: "Verify consistent application of Global Warming Potentials across all categories", category: "consistency", status: "pass", details: "AR5 GWP values used: CO2=1, CH4=28, N2O=265. Applied consistently across all sectors and time series years.", recommendedAction: "No action required.", severity: "medium", lastRun: "2025-12-15" },
];

const categoryLabels: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  completeness: { label: "Completeness", color: "bg-blue-100 text-blue-700 border-blue-200", icon: <BarChart3 size={12} /> },
  consistency: { label: "Consistency", color: "bg-purple-100 text-purple-700 border-purple-200", icon: <RefreshCw size={12} /> },
  accuracy: { label: "Accuracy", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 size={12} /> },
  comparability: { label: "Comparability", color: "bg-amber-100 text-amber-700 border-amber-200", icon: <BarChart3 size={12} /> },
  transparency: { label: "Transparency", color: "bg-gray-100 text-gray-700 border-gray-200", icon: <Info size={12} /> },
};

const checkHistory = [
  { date: "2025-12-15", passed: 8, warnings: 3, failed: 1, score: 87 },
  { date: "2025-11-20", passed: 7, warnings: 3, failed: 2, score: 78 },
  { date: "2025-10-15", passed: 6, warnings: 4, failed: 2, score: 72 },
  { date: "2025-09-10", passed: 5, warnings: 3, failed: 4, score: 58 },
];

export default function QAQCChecksPage() {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const filtered = checks.filter((c) => {
    const matchesCategory = filterCategory === "all" || c.category === filterCategory;
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const passed = checks.filter((c) => c.status === "pass").length;
  const warnings = checks.filter((c) => c.status === "warning").length;
  const failed = checks.filter((c) => c.status === "fail").length;
  const score = Math.round((passed / checks.length) * 100);

  const handleRunChecks = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">QA/QC Automated Checks</h1>
            <p className="mt-1 text-sm text-gray-500">
              Automated quality assurance and quality control checks aligned with IPCC Tier 1 QC requirements
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`btn-primary btn-sm ${isRunning ? "opacity-70" : ""}`}
            onClick={handleRunChecks}
            disabled={isRunning}
          >
            {isRunning ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
            <span>{isRunning ? "Running Checks..." : "Run All Checks"}</span>
          </button>
        </div>
      </div>

      {/* QA/QC Navigation */}
      <div className="flex items-center gap-1 border-b border-gray-200 animate-fade-up">
        <a href="/qaqc/checks" className="px-4 py-2.5 text-sm font-medium border-b-2 border-emerald-600 text-emerald-700 -mb-px">
          Automated Checks
        </a>
        <a href="/qaqc/reviews" className="px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 -mb-px">
          Manual Reviews
        </a>
        <a href="/qaqc/documentation" className="px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 -mb-px">
          Documentation
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 stagger-children">
        <div className="card-stat md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle cx="40" cy="40" r="34" fill="none" stroke={score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444"} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(score / 100) * 213.63} 213.63`} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">{score}%</span>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Overall QA/QC Score</p>
              <p className="text-sm text-gray-600 mt-1">Last run: {checks[0]?.lastRun}</p>
            </div>
          </div>
        </div>
        <div className="card-stat">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Passed</p>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{passed}</p>
        </div>
        <div className="card-stat">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-amber-500" />
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Warnings</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">{warnings}</p>
        </div>
        <div className="card-stat">
          <div className="flex items-center gap-2 mb-1">
            <XCircle size={16} className="text-red-500" />
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Failed</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{failed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 animate-fade-up">
        <select className="select-field w-auto" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="completeness">Completeness</option>
          <option value="consistency">Consistency</option>
          <option value="accuracy">Accuracy</option>
          <option value="comparability">Comparability</option>
          <option value="transparency">Transparency</option>
        </select>
        <select className="select-field w-auto" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pass">Passed</option>
          <option value="warning">Warning</option>
          <option value="fail">Failed</option>
        </select>
        <p className="text-xs text-gray-400 ml-auto">{filtered.length} of {checks.length} checks shown</p>
      </div>

      {/* Check List */}
      <div className="space-y-2 animate-fade-up">
        {filtered.map((check) => (
          <div
            key={check.id}
            className={`card-elevated cursor-pointer transition-all ${expandedCheck === check.id ? "ring-1 ring-emerald-200" : ""}`}
            onClick={() => setExpandedCheck(expandedCheck === check.id ? null : check.id)}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0 ${
                check.status === "pass" ? "bg-emerald-100 text-emerald-600" :
                check.status === "warning" ? "bg-amber-100 text-amber-600" :
                check.status === "fail" ? "bg-red-100 text-red-600" :
                "bg-gray-100 text-gray-400"
              }`}>
                {check.status === "pass" ? <CheckCircle2 size={14} /> :
                 check.status === "warning" ? <AlertTriangle size={14} /> :
                 check.status === "fail" ? <XCircle size={14} /> :
                 <Clock size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-gray-900">{check.name}</h3>
                  <span className={`badge border ${categoryLabels[check.category]!.color}`}>
                    {categoryLabels[check.category]!.label}
                  </span>
                  <span className={`badge ${
                    check.severity === "high" ? "badge-danger" :
                    check.severity === "medium" ? "badge-warning" : "badge-neutral"
                  }`}>
                    {check.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{check.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`badge ${
                  check.status === "pass" ? "badge-success" :
                  check.status === "warning" ? "badge-warning" :
                  check.status === "fail" ? "badge-danger" : "badge-neutral"
                }`}>
                  {check.status === "pass" ? "Passed" : check.status === "warning" ? "Warning" : check.status === "fail" ? "Failed" : "Not Run"}
                </span>
                {expandedCheck === check.id ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
              </div>
            </div>

            {expandedCheck === check.id && (
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Details</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{check.details}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Recommended Action</h4>
                  <p className={`text-sm leading-relaxed rounded-lg p-3 ${
                    check.status === "fail" ? "bg-red-50 text-red-800 border border-red-200" :
                    check.status === "warning" ? "bg-amber-50 text-amber-800 border border-amber-200" :
                    "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  }`}>
                    {check.recommendedAction}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-2">Last run: {check.lastRun} | ID: {check.id}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Check History */}
      <div className="card-elevated animate-fade-up">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Check Run History</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th className="text-center">Passed</th>
                <th className="text-center">Warnings</th>
                <th className="text-center">Failed</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {checkHistory.map((run) => (
                <tr key={run.date}>
                  <td className="text-sm text-gray-700">{run.date}</td>
                  <td className="text-center"><span className="badge-success">{run.passed}</span></td>
                  <td className="text-center"><span className="badge-warning">{run.warnings}</span></td>
                  <td className="text-center"><span className="badge-danger">{run.failed}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className={`h-full rounded-full ${run.score >= 80 ? "bg-emerald-500" : run.score >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${run.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-semibold text-gray-700">{run.score}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
