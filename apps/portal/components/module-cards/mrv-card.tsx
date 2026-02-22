"use client";

import Link from "next/link";

export default function MrvCard() {
  return (
    <div className="card border-t-4 border-t-emerald-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
            <svg className="h-4 w-4 text-emerald-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-slate-900">MRV System</h3>
        </div>
        <span className="flex items-center gap-1 text-xs text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Latest Inventory</span>
          <span className="font-medium text-slate-900">2023</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Total Emissions</span>
          <span className="font-medium text-slate-900">45.2 MtCO2e</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Data Completeness</span>
          <span className="font-medium text-slate-900">87%</span>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400">QA/QC Progress</span>
            <span className="text-xs font-medium text-slate-600">72%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100">
            <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: "72%" }} />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <Link
          href="/dashboard/mrv"
          className="text-xs font-semibold text-teal-700 hover:text-teal-800"
        >
          View MRV Dashboard &rarr;
        </Link>
      </div>
    </div>
  );
}
