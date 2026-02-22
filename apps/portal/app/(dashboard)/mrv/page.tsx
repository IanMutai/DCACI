"use client";

export default function MrvPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">MRV System</h1>
        <p className="mt-1 text-sm text-slate-500">
          Measurement, Reporting, and Verification of greenhouse gas emissions
        </p>
      </div>

      {/* MRV Navigation Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6">
          {["GHG Inventory", "Activity Data", "Emission Factors", "QA/QC", "Reports"].map(
            (tab, i) => (
              <button
                key={tab}
                className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                  i === 0
                    ? "border-teal-700 text-teal-700"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-slate-500">Total Emissions</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">45.2 MtCO2e</p>
          <p className="mt-1 text-xs text-emerald-600">-3.2% from base year</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Sectors Covered</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">5 / 5</p>
          <p className="mt-1 text-xs text-slate-400">All IPCC sectors</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Data Completeness</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">87%</p>
          <p className="mt-1 text-xs text-amber-600">13% pending review</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">QA/QC Status</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">In Progress</p>
          <p className="mt-1 text-xs text-blue-600">Tier 2 review</p>
        </div>
      </div>

      {/* Sector Breakdown */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Emissions by Sector
        </h2>
        <div className="space-y-4">
          {[
            { sector: "Energy", emissions: "28.5 MtCO2e", pct: 63, color: "bg-red-500" },
            { sector: "Agriculture", emissions: "8.1 MtCO2e", pct: 18, color: "bg-green-500" },
            { sector: "IPPU", emissions: "4.2 MtCO2e", pct: 9, color: "bg-blue-500" },
            { sector: "Waste", emissions: "2.8 MtCO2e", pct: 6, color: "bg-purple-500" },
            { sector: "LULUCF", emissions: "1.6 MtCO2e", pct: 4, color: "bg-amber-500" },
          ].map((item) => (
            <div key={item.sector}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">
                  {item.sector}
                </span>
                <span className="text-sm text-slate-500">
                  {item.emissions} ({item.pct}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className={`h-2 rounded-full ${item.color}`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Recent Data Submissions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 text-left font-medium text-slate-500">Sector</th>
                <th className="pb-3 text-left font-medium text-slate-500">Category</th>
                <th className="pb-3 text-left font-medium text-slate-500">Year</th>
                <th className="pb-3 text-left font-medium text-slate-500">Status</th>
                <th className="pb-3 text-left font-medium text-slate-500">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { sector: "Energy", category: "Fuel Combustion", year: "2023", status: "Approved", date: "Jan 15, 2025" },
                { sector: "Agriculture", category: "Livestock", year: "2023", status: "Under Review", date: "Jan 12, 2025" },
                { sector: "Waste", category: "Solid Waste", year: "2023", status: "Draft", date: "Jan 10, 2025" },
                { sector: "IPPU", category: "Cement Production", year: "2023", status: "Approved", date: "Jan 8, 2025" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3 text-slate-900">{row.sector}</td>
                  <td className="py-3 text-slate-600">{row.category}</td>
                  <td className="py-3 text-slate-600">{row.year}</td>
                  <td className="py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        row.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : row.status === "Under Review"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
