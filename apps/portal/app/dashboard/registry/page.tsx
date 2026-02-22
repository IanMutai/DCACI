"use client";

export default function RegistryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Carbon Registry</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage carbon credit projects, issuances, transfers, and retirements
        </p>
      </div>

      {/* Registry Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-slate-500">Total Credits Issued</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">1,245,000</p>
          <p className="mt-1 text-xs text-emerald-600">tCO2e</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Credits Transferred</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">380,000</p>
          <p className="mt-1 text-xs text-blue-600">tCO2e</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Credits Retired</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">520,000</p>
          <p className="mt-1 text-xs text-amber-600">tCO2e</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Active Projects</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">47</p>
          <p className="mt-1 text-xs text-slate-400">Across 5 sectors</p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Registry Projects
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
                { id: "KEN-001", name: "Lake Turkana Wind Power", type: "Renewable Energy", credits: "450,000", status: "Active" },
                { id: "KEN-002", name: "Mau Forest Restoration", type: "Forestry/REDD+", credits: "280,000", status: "Active" },
                { id: "KEN-003", name: "Nairobi Clean Cooking", type: "Energy Efficiency", credits: "125,000", status: "Verification" },
                { id: "KEN-004", name: "Tana River Biogas", type: "Waste", credits: "85,000", status: "Active" },
                { id: "KEN-005", name: "Geothermal Expansion", type: "Renewable Energy", credits: "305,000", status: "Registration" },
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
                          : project.status === "Verification"
                            ? "bg-amber-100 text-amber-700"
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
            { action: "Issuance", project: "Lake Turkana Wind Power", amount: "+50,000 tCO2e", date: "Jan 20, 2025" },
            { action: "Transfer", project: "Mau Forest Restoration", amount: "-25,000 tCO2e", date: "Jan 18, 2025" },
            { action: "Retirement", project: "Nairobi Clean Cooking", amount: "-10,000 tCO2e", date: "Jan 15, 2025" },
            { action: "Issuance", project: "Tana River Biogas", amount: "+15,000 tCO2e", date: "Jan 12, 2025" },
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
    </div>
  );
}
