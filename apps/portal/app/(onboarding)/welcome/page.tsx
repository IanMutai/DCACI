"use client";

import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="card py-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
          <svg
            className="h-8 w-8 text-teal-700"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome to NCTP
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-lg mx-auto">
          Let&apos;s set up your National Climate Transparency Platform. This
          process will help configure the system for your country&apos;s specific
          needs and reporting requirements.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 text-left max-w-lg mx-auto">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="text-sm font-semibold text-slate-900">Step 1</div>
            <div className="mt-1 text-xs text-slate-500">
              Set up your country profile and basic configuration
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="text-sm font-semibold text-slate-900">Step 2</div>
            <div className="mt-1 text-xs text-slate-500">
              Select which modules to enable (MRV, NDC, Registry)
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="text-sm font-semibold text-slate-900">Step 3</div>
            <div className="mt-1 text-xs text-slate-500">
              Configure each module with your specific parameters
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/country-profile" className="btn-primary">
            Get Started
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          This setup takes approximately 10-15 minutes
        </p>
      </div>
    </div>
  );
}
