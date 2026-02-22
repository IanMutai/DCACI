"use client";

import Link from "next/link";

export default function RegistryCard() {
  return (
    <div className="card border-t-4 border-t-amber-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
            <svg className="h-4 w-4 text-amber-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-slate-900">Carbon Registry</h3>
        </div>
        <span className="flex items-center gap-1 text-xs text-amber-600">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Total Credits</span>
          <span className="font-medium text-slate-900">59M tCO2e</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Active Projects</span>
          <span className="font-medium text-slate-900">296</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">VCM Revenue</span>
          <span className="font-medium text-slate-900">$136M (2023)</span>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400">Art. 6 Agreements</span>
            <span className="text-xs font-medium text-amber-600">4 bilateral</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100">
            <div className="h-1.5 rounded-full bg-amber-500" style={{ width: "50%" }} />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <Link
          href="/dashboard/registry"
          className="text-xs font-semibold text-teal-700 hover:text-teal-800"
        >
          View Registry Dashboard &rarr;
        </Link>
      </div>
    </div>
  );
}
