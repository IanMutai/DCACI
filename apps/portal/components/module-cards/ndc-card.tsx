"use client";

import Link from "next/link";

export default function NdcCard() {
  return (
    <div className="card border-t-4 border-t-blue-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <svg className="h-4 w-4 text-blue-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-slate-900">NDC Tracker</h3>
        </div>
        <span className="flex items-center gap-1 text-xs text-blue-600">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">NDC Cycle</span>
          <span className="font-medium text-slate-900">NDC 2.0</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Target Year</span>
          <span className="font-medium text-slate-900">2030</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Active Measures</span>
          <span className="font-medium text-slate-900">12</span>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400">Overall Progress</span>
            <span className="text-xs font-medium text-slate-600">68%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100">
            <div className="h-1.5 rounded-full bg-blue-500" style={{ width: "68%" }} />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <Link
          href="/dashboard/ndc"
          className="text-xs font-semibold text-teal-700 hover:text-teal-800"
        >
          View NDC Dashboard &rarr;
        </Link>
      </div>
    </div>
  );
}
