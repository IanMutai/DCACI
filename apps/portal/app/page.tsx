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
                <span className="text-white font-bold text-sm">DC</span>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">DCACI</span>
                <span className="hidden sm:inline text-xs text-slate-400 ml-2">Kenya</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary text-sm px-4 py-2">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5">
                <span className="text-xs font-medium text-teal-700">
                  Supporting Kenya&apos;s Paris Agreement &amp; Updated NDC Compliance
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Digital Center for Applied Carbon Intelligence
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
                An integrated platform enabling Kenya to track 94.9 MtCO2e of emissions,
                monitor -32% NDC reduction targets, manage 296 carbon credit projects,
                and mobilize $62B in climate finance &mdash; powered by AI-driven intelligence.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link href="/dashboard" className="btn-primary px-6 py-3">Enter Platform</Link>
                <Link href="#modules" className="btn-outline px-6 py-3">Explore Modules</Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
            <div className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-teal-200 to-blue-200 opacity-20 sm:w-[72rem]" />
          </div>
        </section>

        {/* Key Stats */}
        <section className="bg-slate-900 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { label: "Total Emissions (2022)", value: "94.9 MtCO2e", sub: "PRIMAP-hist v2.6" },
                { label: "NDC Reduction Target", value: "-32% by 2030", sub: "7% + 25% conditional" },
                { label: "Carbon Credit Projects", value: "296", sub: "Largest in Africa" },
                { label: "Climate Finance Need", value: "$62B", sub: "2020-2030" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-teal-400">{stat.label}</p>
                  <p className="text-xs text-slate-400">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules */}
        <section id="modules" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Integrated Climate Management Platform
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Four interconnected modules powered by an AI Intelligence Hub.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* MRV */}
              <div className="card hover:shadow-lg transition-shadow group">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                  <svg className="h-6 w-6 text-emerald-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">MRV System</h3>
                <p className="mt-2 text-sm text-slate-600">GHG inventory, PRIMAP-hist data, BTR reporting across all IPCC sectors.</p>
                <div className="mt-4 rounded-lg bg-emerald-50 p-3">
                  <p className="text-xs font-medium text-emerald-700">94.9 MtCO2e | BTR-1 Filed</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <Link href="/dashboard/mrv" className="text-xs font-medium text-teal-700 hover:text-teal-900">Portal &rarr;</Link>
                  <a href="http://localhost:4001" className="text-xs text-slate-400 hover:text-slate-600">:4001</a>
                </div>
              </div>

              {/* NDC */}
              <div className="card hover:shadow-lg transition-shadow group">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                  <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">NDC Tracker</h3>
                <p className="mt-2 text-sm text-slate-600">Track -32% (2030) and -35% (2035) targets. 6 sector mitigation actions.</p>
                <div className="mt-4 rounded-lg bg-blue-50 p-3">
                  <p className="text-xs font-medium text-blue-700">86.5 MtCO2e potential | 2nd NDC</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <Link href="/dashboard/ndc" className="text-xs font-medium text-teal-700 hover:text-teal-900">Portal &rarr;</Link>
                  <a href="http://localhost:4002" className="text-xs text-slate-400 hover:text-slate-600">:4002</a>
                </div>
              </div>

              {/* Registry */}
              <div className="card hover:shadow-lg transition-shadow group">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 group-hover:bg-amber-200 transition-colors">
                  <svg className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Carbon Registry</h3>
                <p className="mt-2 text-sm text-slate-600">296 projects, 59M credits, Article 6 agreements, ITMO tracking.</p>
                <div className="mt-4 rounded-lg bg-amber-50 p-3">
                  <p className="text-xs font-medium text-amber-700">$136M VCM revenue | 4 Art. 6</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <Link href="/dashboard/registry" className="text-xs font-medium text-teal-700 hover:text-teal-900">Portal &rarr;</Link>
                  <a href="http://localhost:4003" className="text-xs text-slate-400 hover:text-slate-600">:4003</a>
                </div>
              </div>

              {/* Intelligence Hub */}
              <div className="card hover:shadow-lg transition-shadow group border-2 border-teal-200 bg-gradient-to-b from-teal-50/50 to-white">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-teal-800">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Intelligence Hub</h3>
                <p className="mt-2 text-sm text-slate-600">AI-powered cross-system intelligence, anomaly detection, and reporting.</p>
                <div className="mt-4 rounded-lg bg-teal-50 p-3">
                  <p className="text-xs font-medium text-teal-700">Environment + Finance tracks</p>
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/intelligence" className="text-xs font-medium text-teal-700 hover:text-teal-900">Open Hub &rarr;</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-teal-700 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Kenya&apos;s Climate Intelligence Platform</h2>
            <p className="mt-4 text-lg text-teal-100">Bridging MRV, NDC tracking, carbon markets, and climate finance.</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-sm hover:bg-teal-50">
                Enter Platform
              </Link>
              <Link href="/dashboard/intelligence" className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
                Intelligence Hub
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="text-sm font-medium text-slate-700">Digital Center for Applied Carbon Intelligence (DCACI)</p>
              <p className="text-xs text-slate-400">Republic of Kenya &middot; Climate Change Directorate</p>
            </div>
            <p className="text-sm text-slate-400">Supporting UNFCCC Enhanced Transparency Framework</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
