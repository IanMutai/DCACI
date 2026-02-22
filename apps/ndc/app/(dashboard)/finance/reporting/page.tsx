"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  FileBarChart,
  Printer,
} from "lucide-react";

interface SupportEntry {
  id: number;
  source: string;
  channel: string;
  amount: number;
  instrument: string;
  sector: string;
  status: string;
  year: number;
  purpose: string;
}

const supportReceived: SupportEntry[] = [
  { id: 1, source: "Germany (BMZ)", channel: "GIZ", amount: 45.0, instrument: "Grant", sector: "Energy", status: "Received", year: 2023, purpose: "Renewable energy capacity building" },
  { id: 2, source: "World Bank / IDA", channel: "Multilateral", amount: 150.0, instrument: "Concessional Loan", sector: "Energy", status: "Received", year: 2023, purpose: "Electricity expansion project" },
  { id: 3, source: "Green Climate Fund", channel: "UNDP", amount: 28.5, instrument: "Grant", sector: "Agriculture", status: "Received", year: 2023, purpose: "Climate-smart agriculture programme" },
  { id: 4, source: "France (AFD)", channel: "Bilateral", amount: 65.0, instrument: "Concessional Loan", sector: "Transport", status: "Received", year: 2023, purpose: "Urban mobility improvements" },
  { id: 5, source: "Japan (JICA)", channel: "Bilateral", amount: 38.0, instrument: "Grant", sector: "Forestry", status: "Received", year: 2023, purpose: "Community forest management" },
  { id: 6, source: "EU Delegation", channel: "Multilateral", amount: 22.0, instrument: "Grant", sector: "Cross-cutting", status: "Received", year: 2022, purpose: "NDC implementation support" },
  { id: 7, source: "AfDB", channel: "Multilateral", amount: 120.0, instrument: "Concessional Loan", sector: "Energy", status: "Received", year: 2022, purpose: "Geothermal development" },
  { id: 8, source: "DANIDA", channel: "Bilateral", amount: 15.0, instrument: "Grant", sector: "Water", status: "Received", year: 2022, purpose: "Water resource management" },
];

const supportNeeded: SupportEntry[] = [
  { id: 1, source: "To be identified", channel: "Multilateral", amount: 500.0, instrument: "Grant/Loan", sector: "Energy", status: "Needed", year: 2025, purpose: "Geothermal expansion Phase III" },
  { id: 2, source: "To be identified", channel: "Bilateral/Multilateral", amount: 320.0, instrument: "Concessional Loan", sector: "Transport", status: "Needed", year: 2025, purpose: "BRT systems for Nairobi" },
  { id: 3, source: "GCF", channel: "Multilateral", amount: 150.0, instrument: "Grant", sector: "Agriculture", status: "Submitted", year: 2025, purpose: "National CSA scale-up programme" },
  { id: 4, source: "To be identified", channel: "Any", amount: 200.0, instrument: "Grant", sector: "Forestry", status: "Needed", year: 2025, purpose: "10% tree cover acceleration" },
  { id: 5, source: "Adaptation Fund", channel: "Multilateral", amount: 80.0, instrument: "Grant", sector: "Water", status: "Pipeline", year: 2026, purpose: "Climate-resilient water infrastructure" },
];

const btrSections = [
  { id: "6.1", title: "Support received", status: "complete" as const, description: "Financial, technology transfer, and capacity-building support received" },
  { id: "6.2", title: "Support needed", status: "in-progress" as const, description: "Financial, technology transfer, and capacity-building support needed" },
  { id: "6.3", title: "Support received vs needed", status: "not-started" as const, description: "Comparison and gap analysis of support" },
  { id: "6.4", title: "Challenges and barriers", status: "not-started" as const, description: "Challenges in accessing and utilizing climate finance" },
];

export default function FinanceReportingPage() {
  const [activeView, setActiveView] = useState<"received" | "needed" | "comparison">("received");
  const totalReceived = supportReceived.reduce((s, e) => s + e.amount, 0);
  const totalNeeded = supportNeeded.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-fade-up">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20"><FileText className="h-5 w-5 text-white" /></div>
            <div><h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Finance Reporting</h1><p className="text-sm text-[hsl(var(--color-text-muted))]">UNFCCC-format finance reporting for Biennial Transparency Report (BTR) Chapter 6</p></div>
          </div>
        </div>
        <div className="flex items-center gap-2"><button className="btn-secondary"><Eye className="h-4 w-4" />Preview BTR</button><button className="btn-primary"><Download className="h-4 w-4" />Generate Report</button></div>
      </div>

      <div className="card-elevated">
        <div className="flex items-center gap-2 mb-4"><FileBarChart className="h-5 w-5 text-[hsl(var(--color-primary-light))]" /><div><h3 className="text-base font-bold text-[hsl(var(--color-text))]">BTR Chapter 6 - Support Received and Needed</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Section completion status per Modalities, Procedures, and Guidelines (MPGs)</p></div></div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {btrSections.map((section) => (
            <div key={section.id} className="rounded-lg border border-[hsl(var(--color-border-light))] p-4">
              <div className="flex items-center gap-2 mb-2">
                {section.status === "complete" ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : section.status === "in-progress" ? <AlertTriangle className="h-4 w-4 text-amber-500" /> : <div className="h-4 w-4 rounded-full border-2 border-[hsl(var(--color-border))]" />}
                <span className="text-xs font-bold text-[hsl(var(--color-primary))]">Section {section.id}</span>
              </div>
              <p className="text-sm font-semibold text-[hsl(var(--color-text))]">{section.title}</p>
              <p className="mt-1 text-[11px] text-[hsl(var(--color-text-muted))]">{section.description}</p>
              <span className={`mt-2 inline-block ${section.status === "complete" ? "badge-on-track" : section.status === "in-progress" ? "badge-at-risk" : "badge-info"}`}>{section.status === "complete" ? "Complete" : section.status === "in-progress" ? "In Progress" : "Not Started"}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card-elevated text-center"><p className="text-xs text-[hsl(var(--color-text-muted))] uppercase tracking-wider font-semibold">Support Received</p><p className="text-3xl font-bold text-emerald-600 mt-1">${totalReceived.toFixed(1)}M</p><p className="text-[11px] text-[hsl(var(--color-text-muted))]">{supportReceived.length} transactions tracked</p></div>
        <div className="card-elevated text-center"><p className="text-xs text-[hsl(var(--color-text-muted))] uppercase tracking-wider font-semibold">Support Needed</p><p className="text-3xl font-bold text-amber-600 mt-1">${(totalNeeded / 1000).toFixed(2)}B</p><p className="text-[11px] text-[hsl(var(--color-text-muted))]">{supportNeeded.length} priority needs identified</p></div>
        <div className="card-elevated text-center"><p className="text-xs text-[hsl(var(--color-text-muted))] uppercase tracking-wider font-semibold">Reporting Gap</p><p className="text-3xl font-bold text-red-600 mt-1">${((totalNeeded - totalReceived) / 1000).toFixed(2)}B</p><p className="text-[11px] text-[hsl(var(--color-text-muted))]">Additional support required</p></div>
      </div>

      <div className="flex items-center gap-1 rounded-lg bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] p-1">
        {([["received", "Support Received"], ["needed", "Support Needed"], ["comparison", "Comparison"]] as [typeof activeView, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setActiveView(key)} className={`flex-1 rounded-md px-4 py-2 text-xs font-semibold transition-all ${activeView === key ? "bg-[hsl(var(--color-primary))] text-white shadow-sm" : "text-[hsl(var(--color-text-secondary))] hover:bg-[hsl(var(--color-surface-hover))]"}`}>{label}</button>
        ))}
      </div>

      {activeView === "received" && (
        <div className="card-elevated">
          <div className="flex items-center justify-between mb-4"><div><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Support Received (UNFCCC CTF Table)</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Per Common Tabular Format for BTR reporting</p></div><button className="btn-secondary"><Printer className="h-4 w-4" />Export CTF</button></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-[hsl(var(--color-border))]"><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Source</th><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Channel</th><th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Amount ($M)</th><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Instrument</th><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Sector</th><th className="pb-3 text-center text-xs font-semibold text-[hsl(var(--color-text-muted))]">Year</th><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Purpose</th><th className="pb-3 text-center text-xs font-semibold text-[hsl(var(--color-text-muted))]">Status</th></tr></thead>
              <tbody>{supportReceived.map((e) => (<tr key={e.id} className="border-b border-[hsl(var(--color-border-light))] hover:bg-[hsl(var(--color-surface-hover))]"><td className="py-3 text-xs font-semibold text-[hsl(var(--color-text))]">{e.source}</td><td className="py-3 text-xs text-[hsl(var(--color-text-secondary))]">{e.channel}</td><td className="py-3 text-right text-xs font-bold text-emerald-600">${e.amount.toFixed(1)}</td><td className="py-3"><span className="badge-primary">{e.instrument}</span></td><td className="py-3 text-xs text-[hsl(var(--color-text))]">{e.sector}</td><td className="py-3 text-center text-xs text-[hsl(var(--color-text))]">{e.year}</td><td className="py-3 text-xs text-[hsl(var(--color-text-secondary))] max-w-[200px] truncate">{e.purpose}</td><td className="py-3 text-center"><span className="badge-on-track">{e.status}</span></td></tr>))}</tbody>
              <tfoot><tr className="border-t-2 border-[hsl(var(--color-border))]"><td className="py-3 text-xs font-bold text-[hsl(var(--color-text))]" colSpan={2}>Total</td><td className="py-3 text-right text-xs font-bold text-emerald-600">${totalReceived.toFixed(1)}</td><td colSpan={5} /></tr></tfoot>
            </table>
          </div>
        </div>
      )}

      {activeView === "needed" && (
        <div className="card-elevated">
          <div className="flex items-center justify-between mb-4"><div><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Support Needed (UNFCCC CTF Table)</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Priority support needs for NDC implementation</p></div><button className="btn-secondary"><Printer className="h-4 w-4" />Export CTF</button></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-[hsl(var(--color-border))]"><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Source</th><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Channel</th><th className="pb-3 text-right text-xs font-semibold text-[hsl(var(--color-text-muted))]">Amount ($M)</th><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Instrument</th><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Sector</th><th className="pb-3 text-center text-xs font-semibold text-[hsl(var(--color-text-muted))]">Timeline</th><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Purpose</th><th className="pb-3 text-center text-xs font-semibold text-[hsl(var(--color-text-muted))]">Status</th></tr></thead>
              <tbody>{supportNeeded.map((e) => (<tr key={e.id} className="border-b border-[hsl(var(--color-border-light))] hover:bg-[hsl(var(--color-surface-hover))]"><td className="py-3 text-xs font-semibold text-[hsl(var(--color-text))]">{e.source}</td><td className="py-3 text-xs text-[hsl(var(--color-text-secondary))]">{e.channel}</td><td className="py-3 text-right text-xs font-bold text-amber-600">${e.amount.toFixed(1)}</td><td className="py-3"><span className="badge-warning">{e.instrument}</span></td><td className="py-3 text-xs text-[hsl(var(--color-text))]">{e.sector}</td><td className="py-3 text-center text-xs text-[hsl(var(--color-text))]">{e.year}</td><td className="py-3 text-xs text-[hsl(var(--color-text-secondary))] max-w-[200px] truncate">{e.purpose}</td><td className="py-3 text-center"><span className={e.status === "Submitted" ? "badge-at-risk" : e.status === "Pipeline" ? "badge-info" : "badge-warning"}>{e.status}</span></td></tr>))}</tbody>
              <tfoot><tr className="border-t-2 border-[hsl(var(--color-border))]"><td className="py-3 text-xs font-bold text-[hsl(var(--color-text))]" colSpan={2}>Total</td><td className="py-3 text-right text-xs font-bold text-amber-600">${totalNeeded.toFixed(1)}</td><td colSpan={5} /></tr></tfoot>
            </table>
          </div>
        </div>
      )}

      {activeView === "comparison" && (
        <div className="card-elevated">
          <div className="mb-4"><h3 className="text-base font-bold text-[hsl(var(--color-text))]">Support Needed vs Received Comparison</h3><p className="text-xs text-[hsl(var(--color-text-muted))]">Gap analysis by sector (in $M)</p></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-[hsl(var(--color-border))]"><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Sector</th><th className="pb-3 text-right text-xs font-semibold text-emerald-600">Received ($M)</th><th className="pb-3 text-right text-xs font-semibold text-amber-600">Needed ($M)</th><th className="pb-3 text-right text-xs font-semibold text-red-600">Gap ($M)</th><th className="pb-3 text-left text-xs font-semibold text-[hsl(var(--color-text-muted))]">Coverage</th></tr></thead>
              <tbody>
                {(() => {
                  const sectors = Array.from(new Set([...supportReceived.map(e => e.sector), ...supportNeeded.map(e => e.sector)]));
                  return sectors.map((sector) => {
                    const received = supportReceived.filter(e => e.sector === sector).reduce((s, e) => s + e.amount, 0);
                    const needed = supportNeeded.filter(e => e.sector === sector).reduce((s, e) => s + e.amount, 0);
                    const gap = needed - received;
                    const coverage = needed > 0 ? (received / needed) * 100 : received > 0 ? 100 : 0;
                    return (
                      <tr key={sector} className="border-b border-[hsl(var(--color-border-light))]">
                        <td className="py-3 text-xs font-semibold text-[hsl(var(--color-text))]">{sector}</td>
                        <td className="py-3 text-right text-xs font-semibold text-emerald-600">${received.toFixed(1)}</td>
                        <td className="py-3 text-right text-xs font-semibold text-amber-600">${needed.toFixed(1)}</td>
                        <td className="py-3 text-right text-xs font-bold text-red-600">${gap > 0 ? gap.toFixed(1) : "--"}</td>
                        <td className="py-3"><div className="flex items-center gap-2"><div className="flex-1 progress-bar"><div className="absolute inset-y-0 left-0 rounded-full bg-emerald-500" style={{ width: `${Math.min(coverage, 100)}%` }} /></div><span className="text-xs font-semibold text-[hsl(var(--color-text))]">{coverage > 0 ? `${coverage.toFixed(0)}%` : "--"}</span></div></td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-lg bg-[hsl(var(--color-primary-50))] p-4">
            <div className="flex items-start gap-3"><FileBarChart className="h-5 w-5 mt-0.5 text-[hsl(var(--color-primary-light))]" /><div className="flex-1"><p className="text-sm font-bold text-[hsl(var(--color-primary))]">Generate BTR Chapter 6 Report</p><p className="mt-1 text-xs text-[hsl(var(--color-primary-light))]">Compile all support received and needed data into UNFCCC Common Tabular Format for inclusion in Kenya&apos;s Biennial Transparency Report.</p><div className="mt-3 flex items-center gap-2"><button className="btn-primary"><FileBarChart className="h-4 w-4" />Generate BTR Chapter 6</button><button className="btn-secondary"><Eye className="h-4 w-4" />Preview</button></div></div></div>
          </div>
        </div>
      )}
    </div>
  );
}
