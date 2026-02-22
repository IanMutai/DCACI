"use client"

import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ArrowLeft, MapPin, Calendar, TrendingUp, FileText, Users, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function Article6ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectId = params.id

  // Mock project data - would come from API
  const project = {
    id: projectId,
    name: "Renewable Energy Partnership - Switzerland",
    type: "Bilateral",
    hostCountry: "Kenya",
    acquiringCountry: "Switzerland",
    status: "authorized",
    credits: 500000,
    transferred: 250000,
    startDate: "2024-01-01",
    methodology: "Article 6.2",
    location: "Kilifi County, Kenya",
    projectType: "Solar Energy",
    description:
      "Large-scale solar energy project providing clean electricity to 25,000 homes in coastal Kenya. This bilateral agreement with Switzerland under Article 6.2 of the Paris Agreement enables international transfer of mitigation outcomes (ITMOs) while supporting Kenya's sustainable development goals.",
    sdgs: [7, 8, 13],
    creditsGenerated: [
      { year: 2024, credits: 125000, status: "verified" },
      { year: 2023, credits: 110000, status: "verified" },
    ],
    communityAgreements: [
      {
        name: "Kilifi Community Development Agreement",
        date: "Dec 2023",
        beneficiaries: 5000,
        benefits: "Employment, infrastructure, education",
      },
    ],
  }

  const sdgNames: Record<number, string> = {
    7: "Affordable and Clean Energy",
    8: "Decent Work and Economic Growth",
    13: "Climate Action",
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Back Button */}
            <Link
              href="/article6-projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Article 6 Projects
            </Link>

            {/* Project Header */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl p-8 border border-primary/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">{project.name}</h1>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary font-medium">
                      {project.methodology}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                      <CheckCircle2 size={14} />
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Project ID</div>
                  <div className="font-mono font-semibold text-foreground">{project.id}</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6 mt-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Host Country</div>
                  <div className="font-semibold text-foreground">{project.hostCountry}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Acquiring Country</div>
                  <div className="font-semibold text-foreground">{project.acquiringCountry}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total ITMOs</div>
                  <div className="font-semibold text-foreground">{project.credits.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Transferred</div>
                  <div className="font-semibold text-green-600">{project.transferred.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                {/* Description */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="text-xl font-serif font-semibold text-foreground mb-4">Project Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Location</div>
                        <div className="font-medium text-foreground">{project.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Start Date</div>
                        <div className="font-medium text-foreground">{project.startDate}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credits Generated */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="text-xl font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Credits Generated
                  </h2>
                  <div className="space-y-3">
                    {project.creditsGenerated.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                        <div>
                          <div className="font-semibold text-foreground">Year {item.year}</div>
                          <div className="text-sm text-muted-foreground">{item.credits.toLocaleString()} tCO2eq</div>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Community Agreements */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="text-xl font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Community Agreements
                  </h2>
                  <div className="space-y-3">
                    {project.communityAgreements.map((agreement, idx) => (
                      <div key={idx} className="p-5 bg-secondary/30 rounded-xl border border-border">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-foreground">{agreement.name}</h3>
                          <span className="text-xs text-muted-foreground">{agreement.date}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Beneficiaries</div>
                            <div className="font-medium text-foreground">
                              {agreement.beneficiaries.toLocaleString()} people
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Benefits</div>
                            <div className="font-medium text-foreground">{agreement.benefits}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* SDGs */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Sustainable Development Goals</h3>
                  <div className="space-y-3">
                    {project.sdgs.map((sdgId) => (
                      <div key={sdgId} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                          {sdgId}
                        </div>
                        <div className="text-sm font-medium text-foreground">{sdgNames[sdgId]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Project Statistics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Transfer Progress</div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(project.transferred / project.credits) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round((project.transferred / project.credits) * 100)}% transferred
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <div className="text-xs text-muted-foreground mb-2">Project Type</div>
                      <div className="text-sm font-medium text-foreground">{project.projectType}</div>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Documents
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 hover:bg-secondary rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Authorization Letter
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-secondary rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
                      PDD Document
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-secondary rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Monitoring Reports
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
