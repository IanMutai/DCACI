"use client";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Unified Reporting
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Generate Biennial Transparency Reports (BTR) and other UNFCCC submissions
        </p>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Biennial Transparency Report (BTR)",
            description: "Comprehensive report combining GHG inventory, NDC progress, and support information per ETF requirements.",
            status: "Draft in Progress",
            statusColor: "amber",
            dueDate: "December 2024",
          },
          {
            title: "National Communication (NC)",
            description: "Periodic national report on climate change actions, policies, and measures.",
            status: "Template Ready",
            statusColor: "blue",
            dueDate: "June 2025",
          },
          {
            title: "National GHG Inventory Report",
            description: "Detailed greenhouse gas inventory following IPCC 2006 Guidelines and CRT tables.",
            status: "Complete",
            statusColor: "green",
            dueDate: "Submitted",
          },
          {
            title: "NDC Progress Report",
            description: "Progress tracking report on NDC targets, mitigation actions, and adaptation measures.",
            status: "Draft in Progress",
            statusColor: "amber",
            dueDate: "March 2025",
          },
          {
            title: "Article 6 Annual Report",
            description: "Report on Article 6 activities including ITMOs, corresponding adjustments, and credit transactions.",
            status: "Not Started",
            statusColor: "slate",
            dueDate: "September 2025",
          },
          {
            title: "Custom Report",
            description: "Build a custom report combining data from multiple modules and time periods.",
            status: "Builder Available",
            statusColor: "blue",
            dueDate: "On Demand",
          },
        ].map((report, i) => (
          <div key={i} className="card flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-900 pr-2">
                  {report.title}
                </h3>
                <span
                  className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    report.statusColor === "green"
                      ? "bg-green-100 text-green-700"
                      : report.statusColor === "amber"
                        ? "bg-amber-100 text-amber-700"
                        : report.statusColor === "blue"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">{report.description}</p>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs text-slate-400">Due: {report.dueDate}</span>
              <button className="text-xs font-semibold text-teal-700 hover:text-teal-800">
                {report.status === "Complete" ? "View" : report.status === "Not Started" ? "Start" : "Continue"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Generated Reports
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 text-left font-medium text-slate-500">Report</th>
                <th className="pb-3 text-left font-medium text-slate-500">Type</th>
                <th className="pb-3 text-left font-medium text-slate-500">Generated</th>
                <th className="pb-3 text-left font-medium text-slate-500">Format</th>
                <th className="pb-3 text-left font-medium text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: "GHG Inventory 2023", type: "NIR", date: "Jan 15, 2025", format: "PDF, CRT" },
                { name: "BTR Draft v2", type: "BTR", date: "Jan 10, 2025", format: "PDF" },
                { name: "NDC Progress Q4 2024", type: "NDC", date: "Dec 30, 2024", format: "PDF, XLSX" },
                { name: "Registry Annual Summary", type: "Registry", date: "Dec 28, 2024", format: "PDF" },
              ].map((report, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3 text-slate-900 font-medium">{report.name}</td>
                  <td className="py-3">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {report.type}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500">{report.date}</td>
                  <td className="py-3 text-slate-500">{report.format}</td>
                  <td className="py-3">
                    <button className="text-xs font-medium text-teal-700 hover:text-teal-800 mr-3">
                      Download
                    </button>
                    <button className="text-xs font-medium text-slate-500 hover:text-slate-700">
                      Share
                    </button>
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
