"use client"

import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ArrowLeft, MapPin, Calendar, Award, FileText, Download } from "lucide-react"
import Link from "next/link"

export default function CreditDetailPage({ params }: { params: { id: string } }) {
  const credit = {
    id: params.id,
    projectName: "Mau Forest Conservation",
    projectType: "REDD+",
    vintage: "2023",
    available: 25000,
    rating: "Gold Standard",
    location: "Mau Forest, Kenya",
    verificationBody: "Bureau Veritas",
    issuanceDate: "2024-01-15",
    methodology: "VM0015 - Methodology for Avoided Unplanned Deforestation",
    serialRange: "ACR-2024-VCM-001-00001 to ACR-2024-VCM-001-25000",
    sdgs: [
      { id: 13, name: "Climate Action", color: "bg-green-700" },
      { id: 15, name: "Life on Land", color: "bg-lime-600" },
    ],
    specifications: {
      projectStartDate: "2022-01-01",
      creditingPeriod: "10 years",
      annualReduction: "25,000 tCO2eq",
      totalReduction: "250,000 tCO2eq over crediting period",
    },
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          {/* Back Button */}
          <Link
            href="/credit-listings"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Listings
          </Link>

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono text-muted-foreground">{credit.id}</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                  {credit.rating}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Issued
                </span>
              </div>
              <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">{credit.projectName}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {credit.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  Vintage {credit.vintage}
                </div>
              </div>
            </div>
          </div>

          {/* Registry Information Card */}
          <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-2xl p-8 border border-primary/20 mb-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Issued Credits</p>
                <p className="font-serif text-5xl font-bold text-primary">{credit.available.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-2">tCO2eq</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Issuance Date</p>
                <p className="font-serif text-2xl font-semibold text-foreground">{credit.issuanceDate}</p>
                <p className="text-xs text-muted-foreground mt-1">Registered & Verified</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Details Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Project Details</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Project Type</span>
                    <span className="text-foreground font-medium">{credit.projectType}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Methodology</span>
                    <span className="text-foreground font-medium">{credit.methodology}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Verification Body</span>
                    <span className="text-foreground font-medium">{credit.verificationBody}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Issuance Date</span>
                    <span className="text-foreground font-medium">{credit.issuanceDate}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Serial Number Range</span>
                    <span className="text-foreground font-medium font-mono text-xs">{credit.serialRange}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-muted-foreground">Crediting Period</span>
                    <span className="text-foreground font-medium">{credit.specifications.creditingPeriod}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Emission Reductions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Annual Reduction</p>
                    <p className="text-2xl font-bold text-foreground">{credit.specifications.annualReduction}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Total Reduction</p>
                    <p className="text-2xl font-bold text-foreground">
                      {credit.specifications.totalReduction.split(" ")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">over crediting period</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">SDGs Supported</h3>
                </div>
                <div className="space-y-3">
                  {credit.sdgs.map((sdg) => (
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

              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Documents</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-primary" />
                      <span className="text-sm text-foreground">Project Design Document</span>
                    </div>
                    <Download size={16} className="text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-primary" />
                      <span className="text-sm text-foreground">Verification Report</span>
                    </div>
                    <Download size={16} className="text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-primary" />
                      <span className="text-sm text-foreground">Monitoring Report</span>
                    </div>
                    <Download size={16} className="text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-primary" />
                      <span className="text-sm text-foreground">Issuance Certificate</span>
                    </div>
                    <Download size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
