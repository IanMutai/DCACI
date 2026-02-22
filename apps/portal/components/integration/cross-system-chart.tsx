"use client";

export default function CrossSystemChart() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Cross-System Data Flow
          </h2>
          <p className="text-sm text-slate-500">
            Visualization of data integration between MRV, NDC, and Registry
          </p>
        </div>
        <select className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last year</option>
        </select>
      </div>

      {/* Placeholder Diagram */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-8">
          {/* MRV Node */}
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-300 bg-emerald-50">
              <span className="text-sm font-bold text-emerald-700">MRV</span>
            </div>
            <span className="mt-2 text-xs font-medium text-slate-600">
              Emissions Data
            </span>
            <span className="text-[10px] text-slate-400">45.2 MtCO2e</span>
          </div>

          {/* Arrows from MRV */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-1 text-slate-400">
              <div className="h-px w-12 bg-slate-300" />
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <div className="h-px w-12 bg-slate-300" />
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>

          {/* NDC Node */}
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-300 bg-blue-50">
              <span className="text-sm font-bold text-blue-700">NDC</span>
            </div>
            <span className="mt-2 text-xs font-medium text-slate-600">
              Target Tracking
            </span>
            <span className="text-[10px] text-slate-400">68% progress</span>
          </div>

          {/* Arrows from NDC */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-1 text-slate-400">
              <div className="h-px w-12 bg-slate-300" />
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <div className="h-px w-12 bg-slate-300" />
            </div>
          </div>

          {/* Registry Node */}
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-amber-300 bg-amber-50">
              <span className="text-sm font-bold text-amber-700">REG</span>
            </div>
            <span className="mt-2 text-xs font-medium text-slate-600">
              Credit Registry
            </span>
            <span className="text-[10px] text-slate-400">1.24M credits</span>
          </div>
        </div>
      </div>

      {/* Data Flow Summary */}
      <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">156</p>
          <p className="text-xs text-slate-500">Data syncs (30d)</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">99.2%</p>
          <p className="text-xs text-slate-500">Sync success rate</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">&lt; 2s</p>
          <p className="text-xs text-slate-500">Avg. sync latency</p>
        </div>
      </div>
    </div>
  );
}
