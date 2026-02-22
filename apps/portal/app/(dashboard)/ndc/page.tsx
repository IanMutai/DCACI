"use client";

export default function NdcPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">NDC Tracker</h1>
        <p className="mt-1 text-sm text-slate-500">
          Track Nationally Determined Contributions progress and mitigation actions
        </p>
      </div>

      {/* NDC Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card border-l-4 border-l-blue-500">
          <p className="text-sm text-slate-500">Current NDC Cycle</p>
          <p className="mt-1 text-xl font-bold text-slate-900">NDC 2.0</p>
          <p className="mt-1 text-xs text-slate-400">Submitted 2025</p>
        </div>
        <div className="card border-l-4 border-l-emerald-500">
          <p className="text-sm text-slate-500">Unconditional Target</p>
          <p className="mt-1 text-xl font-bold text-slate-900">-7% by 2030</p>
          <p className="mt-1 text-xs text-emerald-600">68% on track</p>
        </div>
        <div className="card border-l-4 border-l-amber-500">
          <p className="text-sm text-slate-500">Conditional Target (with intl support)</p>
          <p className="mt-1 text-xl font-bold text-slate-900">-32% by 2030</p>
          <p className="mt-1 text-xs text-amber-600">42% on track</p>
        </div>
      </div>

      {/* Target Progress */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Target Progress
        </h2>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                Unconditional Target (-7%)
              </span>
              <span className="text-sm font-semibold text-emerald-600">68%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-emerald-500" style={{ width: "68%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                Conditional Target (-32%, with intl support)
              </span>
              <span className="text-sm font-semibold text-amber-600">42%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-amber-500" style={{ width: "42%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Mitigation Actions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Mitigation Actions
          </h2>
          <button className="btn-primary text-sm px-4 py-2">
            Add Action
          </button>
        </div>
        <div className="space-y-3">
          {[
            {
              name: "Renewable Energy Scale-up",
              sector: "Energy",
              reduction: "8.5 MtCO2e",
              status: "In Progress",
              progress: 72,
            },
            {
              name: "Forest Restoration Program",
              sector: "LULUCF",
              reduction: "3.2 MtCO2e",
              status: "In Progress",
              progress: 45,
            },
            {
              name: "Clean Cooking Initiative",
              sector: "Energy",
              reduction: "2.1 MtCO2e",
              status: "Planned",
              progress: 15,
            },
            {
              name: "Waste-to-Energy Projects",
              sector: "Waste",
              reduction: "1.8 MtCO2e",
              status: "In Progress",
              progress: 60,
            },
            {
              name: "Public Transport Electrification",
              sector: "Transport",
              reduction: "1.5 MtCO2e",
              status: "Planned",
              progress: 10,
            },
          ].map((action, i) => (
            <div
              key={i}
              className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {action.name}
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {action.sector} &middot; {action.reduction} expected reduction
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    action.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {action.status}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">Progress</span>
                  <span className="text-xs font-medium text-slate-600">
                    {action.progress}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100">
                  <div
                    className="h-1.5 rounded-full bg-blue-500"
                    style={{ width: `${action.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
