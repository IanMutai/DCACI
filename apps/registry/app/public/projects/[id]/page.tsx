"use client"

import PublicHeader from "@/components/public/public-header"
import PublicFooter from "@/components/public/public-footer"
import { MapPin, Calendar, CheckCircle2, Users, TrendingUp, Award, FileText } from "lucide-react"

export default function PublicProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  // Mock project data - in production, fetch based on id
  const project = {
    name: "Kilifi Solar Project",
    location: "Kilifi County, Kenya",
    sector: "Energy",
    status: "Active",
    credits: "25,123",
    startDate: "2024",
    description:
      "Large-scale solar installation providing clean energy to rural communities in Kilifi County. The project reduces reliance on fossil fuels and creates local employment opportunities.",
    detailedDescription:
      "The Kilifi Solar Project is a 50MW solar photovoltaic installation designed to provide clean, renewable energy to approximately 25,000 households in coastal Kenya. The project contributes significantly to Kenya's renewable energy targets while reducing greenhouse gas emissions by an estimated 25,123 tCO2eq annually.",
    methodology: "CDM Methodology ACM0002 - Grid-connected electricity generation from renewable sources",
    creditingPeriod: "15 years (2024-2039)",
    verificationBody: "Bureau Veritas",
    sdgs: [
      { id: 7, name: "Affordable and Clean Energy", color: "bg-yellow-600" },
      { id: 8, name: "Decent Work and Economic Growth", color: "bg-red-600" },
      { id: 13, name: "Climate Action", color: "bg-green-700" },
    ],
    communityAgreements: [
      {
        title: "Free Power Connection Program",
        description: "1,000 households within 5km radius receive free solar power connections",
        beneficiaries: "1,000 households",
      },
      {
        title: "Local Employment Initiative",
        description: "Priority hiring for local residents with skills training programs",
        beneficiaries: "250+ jobs created",
      },
      {
        title: "Revenue Sharing Agreement",
        description: "5% of project revenues allocated to community development projects",
        beneficiaries: "Entire Kilifi County community",
      },
    ],
    creditsGenerated: [
      { year: "2024", amount: "25,123", status: "Verified & Issued" },
      { year: "2025 (Projected)", amount: "25,500", status: "In Progress" },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-700 ring-1 ring-green-200">
                {project.status}
              </span>
              <span className="text-sm text-muted-foreground">{project.sector}</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">{project.name}</h1>
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                {project.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                Started {project.startDate}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Total Credits Issued</p>
              <p className="text-3xl font-bold text-primary">{project.credits}</p>
              <p className="text-xs text-muted-foreground mt-1">tCO2eq annually</p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Crediting Period</p>
              <p className="text-3xl font-bold text-foreground">{project.creditingPeriod.split(" ")[0]}</p>
              <p className="text-xs text-muted-foreground mt-1">{project.creditingPeriod.split(" ")[1]}</p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">SDGs Supported</p>
              <p className="text-3xl font-bold text-foreground">{project.sdgs.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Development goals</p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Community Benefits</p>
              <p className="text-3xl font-bold text-foreground">{project.communityAgreements.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Active agreements</p>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                <p className="text-muted-foreground leading-relaxed">{project.detailedDescription}</p>
              </div>

              {/* Community Agreements */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Users size={24} className="text-primary" />
                  <h2 className="text-2xl font-serif font-semibold text-foreground">Community Agreements</h2>
                </div>
                <div className="space-y-4">
                  {project.communityAgreements.map((agreement, idx) => (
                    <div key={idx} className="p-5 bg-secondary/30 rounded-xl border border-border">
                      <h3 className="font-semibold text-foreground mb-2">{agreement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{agreement.description}</p>
                      <div className="flex items-center gap-2 text-xs text-primary font-medium">
                        <CheckCircle2 size={14} />
                        {agreement.beneficiaries}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Credits Generated */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp size={24} className="text-primary" />
                  <h2 className="text-2xl font-serif font-semibold text-foreground">Credits Generated</h2>
                </div>
                <div className="space-y-4">
                  {project.creditsGenerated.map((credit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-5 bg-secondary/30 rounded-xl border border-border"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{credit.year}</p>
                        <p className="text-sm text-muted-foreground mt-1">{credit.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{credit.amount}</p>
                        <p className="text-xs text-muted-foreground">tCO2eq</p>
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
                <div className="flex items-center gap-2 mb-4">
                  <Award size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Sustainable Development Goals</h3>
                </div>
                <div className="space-y-3">
                  {project.sdgs.map((sdg) => (
                    <div key={sdg.id} className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 ${sdg.color} rounded-lg flex items-center justify-center text-white font-bold`}
                      >
                        {sdg.id}
                      </div>
                      <span className="text-sm text-foreground font-medium">{sdg.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Details */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Technical Information</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Methodology</p>
                    <p className="text-foreground font-medium">{project.methodology}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Verification Body</p>
                    <p className="text-foreground font-medium">{project.verificationBody}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Crediting Period</p>
                    <p className="text-foreground font-medium">{project.creditingPeriod}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
