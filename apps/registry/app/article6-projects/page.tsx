import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { FileCheck, Globe, ArrowRightLeft, CheckCircle2, Clock, AlertTriangle, ExternalLink, Plus } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: "A6-2024-CHE",
    name: "Kenya-Switzerland Bilateral Agreement",
    type: "Bilateral",
    hostCountry: "Kenya",
    acquiringCountry: "Switzerland",
    status: "authorized",
    credits: 10000000,
    startDate: "2024-06-01",
    methodology: "Article 6.2",
  },
  {
    id: "A6-2024-SWE",
    name: "Kenya-Sweden Bilateral Agreement",
    type: "Bilateral",
    hostCountry: "Kenya",
    acquiringCountry: "Sweden",
    status: "authorized",
    credits: 8000000,
    startDate: "2024-09-01",
    methodology: "Article 6.2",
  },
  {
    id: "A6-2025-SGP",
    name: "Kenya-Singapore ITMO Negotiations",
    type: "Bilateral",
    hostCountry: "Kenya",
    acquiringCountry: "Singapore",
    status: "pending_loa",
    credits: 5000000,
    startDate: null,
    methodology: "Article 6.2",
  },
  {
    id: "A6-2025-KOR",
    name: "Kenya-South Korea Climate Partnership",
    type: "Bilateral",
    hostCountry: "Kenya",
    acquiringCountry: "South Korea",
    status: "under_review",
    credits: 7000000,
    startDate: null,
    methodology: "Article 6.2",
  },
]

export default function Article6ProjectsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-foreground">Article 6 Projects</h1>
              <p className="text-muted-foreground mt-1">
                Kenya's bilateral agreements under Paris Agreement Article 6.2 - KNCR launched Feb 2026
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/article6-projects/itmo-dashboard"
                className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                <FileCheck size={16} />
                ITMO Dashboard
              </Link>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                <Plus size={16} />
                Register Project
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FileCheck size={20} className="text-primary" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-1">Signed Agreements</div>
              <div className="font-serif text-2xl font-semibold text-foreground">2</div>
              <div className="text-xs text-muted-foreground mt-1">Switzerland & Sweden</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <ArrowRightLeft size={20} className="text-accent" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-1">Trading Potential</div>
              <div className="font-serif text-2xl font-semibold text-foreground">40M</div>
              <div className="text-xs text-muted-foreground mt-1">MtCO2e reserved</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Globe size={20} className="text-green-600" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-1">Partner Countries</div>
              <div className="font-serif text-2xl font-semibold text-foreground">4</div>
              <div className="text-xs text-muted-foreground mt-1">2 signed, 2 negotiating</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-amber-600" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-1">DNA Authority</div>
              <div className="font-serif text-2xl font-semibold text-accent">NEMA</div>
              <div className="text-xs text-muted-foreground mt-1">Designated National Authority</div>
            </div>
          </div>

          {/* Projects List */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-serif text-lg font-semibold text-foreground">Registered Article 6 Projects</h2>
            </div>
            <div className="divide-y divide-border">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/article6-projects/${project.id}`}
                  className="block p-6 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-foreground">{project.name}</h3>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "authorized"
                              ? "bg-green-100 text-green-700"
                              : project.status === "pending_loa"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {project.status === "authorized" && <CheckCircle2 size={12} className="mr-1" />}
                          {project.status === "pending_loa" && <Clock size={12} className="mr-1" />}
                          {project.status === "under_review" && <AlertTriangle size={12} className="mr-1" />}
                          {project.status.replace("_", " ")}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-secondary text-muted-foreground">
                          {project.methodology}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">ID: </span>
                          <span className="text-foreground font-mono">{project.id}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Host: </span>
                          <span className="text-foreground">{project.hostCountry}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Acquiring: </span>
                          <span className="text-foreground">{project.acquiringCountry}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Credits: </span>
                          <span className="text-foreground font-medium">{project.credits.toLocaleString()}</span>
                        </div>
                        {project.startDate && (
                          <div>
                            <span className="text-muted-foreground">Start: </span>
                            <span className="text-foreground">{project.startDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="View Details">
                      <ExternalLink size={18} className="text-muted-foreground" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
