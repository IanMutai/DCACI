"use client";

import Link from "next/link";

export default function OnboardingCompletePage() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="card py-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Setup Complete!
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-md mx-auto">
          Your National Climate Transparency Platform has been configured
          successfully. You&apos;re ready to start managing your climate data.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 text-left max-w-lg mx-auto">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-green-900">
                MRV System
              </span>
            </div>
            <p className="text-xs text-green-700">Configured and ready</p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-green-900">
                NDC Tracker
              </span>
            </div>
            <p className="text-xs text-green-700">Configured and ready</p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-green-900">
                Registry
              </span>
            </div>
            <p className="text-xs text-green-700">Configured and ready</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-slate-50 p-4 max-w-md mx-auto text-left">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">
            What&apos;s Next?
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
              Import your existing GHG inventory data
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
              Configure user roles and permissions
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
              Set up data collection workflows
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
              Review the BTR reporting templates
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <Link href="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
