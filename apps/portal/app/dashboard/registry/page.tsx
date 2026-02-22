"use client";

import dynamic from "next/dynamic";
import IntelligenceInsights from "@/components/intelligence/intelligence-insights";

const CarbonCreditsChart = dynamic(
  () => import("@/components/charts/carbon-credits-chart"),
  { ssr: false, loading: () => <div className="h-[280px] animate-pulse bg-slate-50 rounded-lg" /> }
);
const ClimateFinanceChart = dynamic(
  () => import("@/components/charts/climate-finance-chart"),
  { ssr: false, loading: () => <div className="h-[280px] animate-pulse bg-slate-50 rounded-lg" /> }
);
const InlineIntelligence = dynamic(
  () => import("@/components/intelligence/inline-intelligence"),
  { ssr: false }
);

export default function RegistryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Carbon Registry</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage carbon credit projects, issuances, transfers, and retirements
          </p>
        </div>
      </div>

      {/* Intelligence Insights */}
      <IntelligenceInsights page="registry" />

      {/* Registry Stats - verified factual data */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-slate-500">Total Credits Issued</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">59,000,000</p>
          <p className="mt-1 text-xs text-emerald-600">tCO2e since 2011 (VCM + CDM)</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">VCM Revenue (2023)</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">$136M</p>
          <p className="mt-1 text-xs text-blue-600">External climate finance via VCM</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Projected 2025–2030</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">141M</p>
          <p className="mt-1 text-xs text-amber-600">tCO2e projected issuances</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Total Projects</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">296</p>
          <p className="mt-1 text-xs text-slate-400">Largest in Africa (25% share)</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">
            Carbon Credit Issuance (2011–2024)
          </h2>
          <p className="text-sm text-slate-500 mb-3">
            Annual and cumulative credit issuance (M tCO2e)
          </p>
          <CarbonCreditsChart />
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">
            Climate Finance Flows
          </h2>
          <p className="text-sm text-slate-500 mb-3">
            Public and private climate finance to Kenya (USD millions)
          </p>
          <ClimateFinanceChart />
        </div>
      </div>

      {/* Projects Table - verified real project data */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Major Registry Projects
          </h2>
          <button className="btn-primary text-sm px-4 py-2">
            Register Project
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 text-left font-medium text-slate-500">Project ID</th>
                <th className="pb-3 text-left font-medium text-slate-500">Name</th>
                <th className="pb-3 text-left font-medium text-slate-500">Type</th>
                <th className="pb-3 text-left font-medium text-slate-500">Credits</th>
                <th className="pb-3 text-left font-medium text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: "VCS-612", name: "Kasigau Corridor REDD+ Phase II", type: "REDD+ (Avoided Deforestation)", credits: "13,900,000", status: "Active" },
                { id: "VCS-1556", name: "TIST Reforestation (26M trees)", type: "Reforestation / Afforestation", credits: "6,000,000", status: "Active" },
                { id: "CDM-OLK", name: "KenGen Olkaria Geothermal (6 projects)", type: "Geothermal Energy", credits: "4,617,309", status: "Active" },
                { id: "VCS-1468", name: "Northern Kenya Rangelands Carbon", type: "Grassland / Soil Carbon", credits: "3,200,000", status: "Under Review" },
                { id: "VCS-1408", name: "Chyulu Hills REDD+", type: "REDD+ (Forest Conservation)", credits: "3,100,000", status: "Active" },
                { id: "CDM-LTWP", name: "Lake Turkana Wind Power (310 MW)", type: "Wind Energy", credits: "1,270,891", status: "Active" },
                { id: "GS-5642", name: "BURN Stoves Project", type: "Clean Cookstoves", credits: "144,000/yr", status: "Active" },
                { id: "PV-MKP", name: "Mikoko Pamoja (Blue Carbon)", type: "Mangrove Conservation", credits: "3,000/yr", status: "Active" },
              ].map((project) => (
                <tr key={project.id} className="hover:bg-slate-50">
                  <td className="py-3 font-mono text-xs text-slate-600">{project.id}</td>
                  <td className="py-3 text-slate-900 font-medium">{project.name}</td>
                  <td className="py-3 text-slate-600">{project.type}</td>
                  <td className="py-3 text-slate-600">{project.credits} tCO2e</td>
                  <td className="py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        project.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Lifecycle */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Recent Credit Transactions
        </h2>
        <div className="space-y-3">
          {[
            { action: "Issuance", project: "Kasigau Corridor REDD+ (VCS-612)", amount: "+1,800,000 tCO2e", date: "Feb 2025" },
            { action: "Retirement", project: "BURN Stoves (Delta Air Lines offset)", amount: "-1,164,000 tCO2e", date: "Jan 2025" },
            { action: "Transfer", project: "KenGen Olkaria CDM (Art. 6 Switzerland)", amount: "-250,000 tCO2e", date: "Dec 2024" },
            { action: "Issuance", project: "TIST Reforestation (VCS-1556)", amount: "+600,000 tCO2e", date: "Nov 2024" },
          ].map((tx, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                    tx.action === "Issuance"
                      ? "bg-green-100 text-green-700"
                      : tx.action === "Transfer"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {tx.action[0]}
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-900">{tx.action}</p>
                  <p className="text-xs text-slate-500">{tx.project}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${
                    tx.amount.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {tx.amount}
                </p>
                <p className="text-xs text-slate-400">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intelligence Assistant */}
      <InlineIntelligence page="registry" />
    </div>
  );
}
