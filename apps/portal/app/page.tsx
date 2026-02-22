import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-teal-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">NC</span>
              </div>
              <span className="text-lg font-bold text-slate-900">NCTP</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>
              <Link href="/register" className="btn-primary text-sm px-4 py-2">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5">
                <span className="text-xs font-medium text-teal-700">
                  Supporting Paris Agreement Compliance
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                National Climate Transparency Platform
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
                A unified digital platform that enables countries to fulfill their
                Paris Agreement obligations through integrated MRV systems, NDC
                tracking, and carbon credit registry management. Streamline your
                climate transparency reporting with confidence.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link href="/login" className="btn-primary">
                  Login to Platform
                </Link>
                <Link href="#features" className="btn-outline">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative gradient */}
          <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
            <div className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-teal-200 to-blue-200 opacity-20 sm:w-[72rem]" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Integrated Climate Management
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Three powerful modules working together to provide comprehensive
                climate transparency.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* MRV Module */}
              <div className="card hover:shadow-md transition-shadow">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                  <svg className="h-6 w-6 text-emerald-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  MRV System
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Measurement, Reporting, and Verification of greenhouse gas
                  emissions across all IPCC sectors with UNFCCC-compliant
                  methodologies.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    GHG Inventory Management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Activity Data Collection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    QA/QC Workflows
                  </li>
                </ul>
              </div>

              {/* NDC Module */}
              <div className="card hover:shadow-md transition-shadow">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  NDC Tracker
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Track Nationally Determined Contributions progress, manage
                  mitigation actions, and monitor adaptation measures against
                  national targets.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Target Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Mitigation Actions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Progress Analytics
                  </li>
                </ul>
              </div>

              {/* Registry Module */}
              <div className="card hover:shadow-md transition-shadow">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                  <svg className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Carbon Registry
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Manage carbon credit projects, track issuances, transfers, and
                  retirements with full Article 6 compliance and ITMOs support.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Project Management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Credit Lifecycle
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    ITMO Tracking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-teal-700 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to enhance your climate transparency?
            </h2>
            <p className="mt-4 text-lg text-teal-100">
              Join nations worldwide in building robust climate reporting systems.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-sm transition-colors hover:bg-teal-50"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-500">
              National Climate Transparency Platform (NCTP)
            </p>
            <p className="text-sm text-slate-400">
              Supporting UNFCCC Enhanced Transparency Framework
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
