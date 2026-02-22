"use client";

import dynamic from "next/dynamic";
import SummaryCard from "@/components/dashboard/summary-card";
import MrvCard from "@/components/module-cards/mrv-card";
import NdcCard from "@/components/module-cards/ndc-card";
import RegistryCard from "@/components/module-cards/registry-card";
import IntelligenceInsights from "@/components/intelligence/intelligence-insights";

const EmissionsTrendChart = dynamic(
  () => import("@/components/charts/emissions-trend-chart"),
  { ssr: false, loading: () => <div className="h-[320px] animate-pulse bg-slate-50 rounded-lg" /> }
);
const SectorPieChart = dynamic(
  () => import("@/components/charts/sector-breakdown-chart").then((m) => ({ default: m.SectorPieChart })),
  { ssr: false, loading: () => <div className="h-[280px] animate-pulse bg-slate-50 rounded-lg" /> }
);
const SectorStackedBarChart = dynamic(
  () => import("@/components/charts/sector-breakdown-chart").then((m) => ({ default: m.SectorStackedBarChart })),
  { ssr: false, loading: () => <div className="h-[280px] animate-pulse bg-slate-50 rounded-lg" /> }
);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of Kenya&apos;s Digital Center for Applied Carbon Intelligence
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Emissions"
          value="94.9 MtCO2e"
          change="+15.3% vs 2021"
          changeType="increase"
          description="2022 excl. LULUCF (PRIMAP-hist v2.6)"
          icon="emissions"
        />
        <SummaryCard
          title="NDC Target"
          value="-32%"
          change="by 2030"
          changeType="increase"
          description="7% unconditional + 25% conditional below BAU"
          icon="target"
        />
        <SummaryCard
          title="Carbon Credits"
          value="59M"
          change="+11M in 2022"
          changeType="increase"
          description="Cumulative tCO2e since 2011 (VCM + CDM)"
          icon="credits"
        />
        <SummaryCard
          title="Carbon Projects"
          value="296"
          change="Largest in Africa"
          changeType="increase"
          description="25% of African VCM projects"
          icon="projects"
        />
      </div>

      {/* Intelligence Insights */}
      <IntelligenceInsights page="dashboard" />

      {/* Emissions Trend Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Kenya GHG Emissions Trajectory
            </h2>
            <p className="text-sm text-slate-500">
              Historical emissions (1990–2022) and NDC projections to 2035 (MtCO2e excl. LULUCF)
            </p>
          </div>
        </div>
        <EmissionsTrendChart />
      </div>

      {/* Sector Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">
            Sector Breakdown (2022)
          </h2>
          <p className="text-sm text-slate-500 mb-3">
            GHG emissions by IPCC sector, excl. LULUCF
          </p>
          <SectorPieChart />
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">
            Sector Growth (2010–2022)
          </h2>
          <p className="text-sm text-slate-500 mb-3">
            Stacked sector emissions over time
          </p>
          <SectorStackedBarChart />
        </div>
      </div>

      {/* Module Status Cards */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Module Status
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <MrvCard />
          <NdcCard />
          <RegistryCard />
        </div>
      </div>

      {/* Standalone Portals & Intelligence Hub */}
      <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-teal-50 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Quick Access</h2>
            <p className="text-sm text-slate-500">Jump to standalone portals or Intelligence Hub</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <a
            href="http://localhost:4001"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 rounded-xl border border-emerald-200 bg-white p-4 text-center transition-all hover:shadow-md hover:border-emerald-300"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <svg className="h-5 w-5 text-emerald-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-900">MRV Portal</span>
            <span className="text-[10px] font-mono text-slate-400">:4001</span>
          </a>
          <a
            href="http://localhost:4002"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 rounded-xl border border-blue-200 bg-white p-4 text-center transition-all hover:shadow-md hover:border-blue-300"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <svg className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-900">NDC Portal</span>
            <span className="text-[10px] font-mono text-slate-400">:4002</span>
          </a>
          <a
            href="http://localhost:4003"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 rounded-xl border border-amber-200 bg-white p-4 text-center transition-all hover:shadow-md hover:border-amber-300"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
              <svg className="h-5 w-5 text-amber-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-900">Registry Portal</span>
            <span className="text-[10px] font-mono text-slate-400">:4003</span>
          </a>
          <a
            href="/dashboard/intelligence"
            className="flex flex-col items-center gap-2 rounded-xl border-2 border-teal-200 bg-gradient-to-b from-teal-50 to-white p-4 text-center transition-all hover:shadow-md hover:border-teal-300"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-teal-800">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-teal-900">Intelligence Hub</span>
            <span className="text-[10px] text-teal-600">AI-Powered</span>
          </a>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              {
                action: "2022 GHG inventory submitted to UNFCCC",
                module: "MRV",
                user: "Climate Change Directorate",
                time: "Dec 2024",
                color: "emerald",
              },
              {
                action: "Second NDC (2031–2035) submitted",
                module: "NDC",
                user: "Ministry of Environment",
                time: "30 Apr 2025",
                color: "blue",
              },
              {
                action: "Kasigau REDD+ issuance: 1.8M tCO2e",
                module: "Registry",
                user: "Wildlife Works",
                time: "Feb 2025",
                color: "amber",
              },
              {
                action: "BTR-1 (Biennial Transparency Report) filed",
                module: "MRV",
                user: "Climate Change Directorate",
                time: "Dec 2024",
                color: "emerald",
              },
              {
                action: "Article 6 framework signed with Sweden",
                module: "Registry",
                user: "Ministry of Environment",
                time: "Nov 2024",
                color: "amber",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg p-2 hover:bg-slate-50"
              >
                <span
                  className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                    item.color === "emerald"
                      ? "bg-emerald-500"
                      : item.color === "blue"
                        ? "bg-blue-500"
                        : "bg-amber-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900">{item.action}</p>
                  <p className="text-xs text-slate-500">
                    {item.user} &middot; {item.module} &middot; {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Submit Activity Data",
                href: "/dashboard/mrv",
                icon: "M12 4.5v15m7.5-7.5h-15",
                color: "emerald",
              },
              {
                label: "Update NDC Progress",
                href: "/dashboard/ndc",
                icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
                color: "blue",
              },
              {
                label: "Issue Credits",
                href: "/dashboard/registry",
                icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375",
                color: "amber",
              },
              {
                label: "Generate BTR Report",
                href: "/dashboard/reports",
                icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
                color: "slate",
              },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-4 text-center transition-colors hover:bg-slate-50 hover:border-slate-300"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    action.color === "emerald"
                      ? "bg-emerald-100"
                      : action.color === "blue"
                        ? "bg-blue-100"
                        : action.color === "amber"
                          ? "bg-amber-100"
                          : "bg-slate-100"
                  }`}
                >
                  <svg
                    className={`h-5 w-5 ${
                      action.color === "emerald"
                        ? "text-emerald-700"
                        : action.color === "blue"
                          ? "text-blue-700"
                          : action.color === "amber"
                            ? "text-amber-700"
                            : "text-slate-700"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={action.icon}
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {action.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
