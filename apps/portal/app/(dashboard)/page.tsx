"use client";

import SummaryCard from "@/components/dashboard/summary-card";
import MrvCard from "@/components/module-cards/mrv-card";
import NdcCard from "@/components/module-cards/ndc-card";
import RegistryCard from "@/components/module-cards/registry-card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your Digital Center for Applied Carbon Intelligence
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Emissions"
          value="45.2 MtCO2e"
          change="-3.2%"
          changeType="decrease"
          description="Latest inventory year"
          icon="emissions"
        />
        <SummaryCard
          title="NDC Progress"
          value="68%"
          change="+12%"
          changeType="increase"
          description="Towards 2030 target"
          icon="target"
        />
        <SummaryCard
          title="Carbon Credits"
          value="1.2M"
          change="+156K"
          changeType="increase"
          description="Total issued credits"
          icon="credits"
        />
        <SummaryCard
          title="Active Projects"
          value="47"
          change="+5"
          changeType="increase"
          description="Registry projects"
          icon="projects"
        />
      </div>

      {/* Emissions Trend Chart Placeholder */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Emissions Trend
            </h2>
            <p className="text-sm text-slate-500">
              National GHG emissions over time (MtCO2e)
            </p>
          </div>
          <select className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700">
            <option>All Sectors</option>
            <option>Energy</option>
            <option>IPPU</option>
            <option>Agriculture</option>
            <option>LULUCF</option>
            <option>Waste</option>
          </select>
        </div>
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
            <p className="mt-2 text-sm text-slate-400">
              Emissions trend chart will render here
            </p>
            <p className="text-xs text-slate-300">
              Connect to MRV service for live data
            </p>
          </div>
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
                action: "GHG inventory data submitted",
                module: "MRV",
                user: "John Doe",
                time: "2 hours ago",
                color: "emerald",
              },
              {
                action: "NDC progress report generated",
                module: "NDC",
                user: "Jane Smith",
                time: "5 hours ago",
                color: "blue",
              },
              {
                action: "50,000 credits issued",
                module: "Registry",
                user: "System",
                time: "1 day ago",
                color: "amber",
              },
              {
                action: "QA/QC review completed",
                module: "MRV",
                user: "Alice Chen",
                time: "2 days ago",
                color: "emerald",
              },
              {
                action: "Mitigation action updated",
                module: "NDC",
                user: "Bob Wilson",
                time: "3 days ago",
                color: "blue",
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
