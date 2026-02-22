"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Package, Filter, Search, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const vcmListings = [
  {
    id: "VCS-612",
    projectName: "Kasigau Corridor REDD+ Phase II (Wildlife Works)",
    projectType: "REDD+",
    vintage: "2023",
    available: 13900000,
    rating: "Verra VCS",
    status: "Issued",
  },
  {
    id: "GS-5642",
    projectName: "BURN Cookstoves Program",
    projectType: "Clean Energy",
    vintage: "2024",
    available: 144000,
    rating: "Gold Standard",
    status: "Issued",
  },
  {
    id: "CDM-KEN-001",
    projectName: "KenGen Olkaria Geothermal",
    projectType: "Renewable Energy",
    vintage: "2023",
    available: 4600000,
    rating: "CDM/UNFCCC",
    status: "Issued",
  },
  {
    id: "VCS-1556",
    projectName: "TIST Reforestation Kenya (26M Trees)",
    projectType: "ARR / Reforestation",
    vintage: "2023",
    available: 6000000,
    rating: "Verra VCS",
    status: "Issued",
  },
  {
    id: "VCS-1408",
    projectName: "Chyulu Hills REDD+ (Conservation Intl)",
    projectType: "REDD+",
    vintage: "2024",
    available: 3100000,
    rating: "Verra VCS",
    status: "Issued",
  },
  {
    id: "PV-KEN-001",
    projectName: "Mikoko Pamoja Blue Carbon (Gazi Bay)",
    projectType: "Blue Carbon",
    vintage: "2024",
    available: 3000,
    rating: "Plan Vivo",
    status: "Issued",
  },
]

const article6Listings = [
  {
    id: "A6-2025-ITMO-001",
    projectName: "Kenya-Switzerland Climate Partnership",
    projectType: "Renewable Energy / Clean Cooking",
    vintage: "2025",
    available: 10000000,
    rating: "Article 6.2",
    acquiringCountry: "Switzerland",
    status: "Authorized",
  },
  {
    id: "A6-2025-ITMO-002",
    projectName: "Kenya-Sweden Bilateral Agreement",
    projectType: "Forestry / REDD+",
    vintage: "2025",
    available: 8000000,
    rating: "Article 6.2",
    acquiringCountry: "Sweden",
    status: "Authorized",
  },
  {
    id: "A6-2025-ITMO-003",
    projectName: "Kenya-Singapore ITMO Transfer",
    projectType: "Clean Energy",
    vintage: "2025",
    available: 5000000,
    rating: "Article 6.2",
    acquiringCountry: "Singapore",
    status: "Negotiation",
  },
  {
    id: "A6-2025-ITMO-004",
    projectName: "Kenya-South Korea Climate Partnership",
    projectType: "Renewable Energy",
    vintage: "2025",
    available: 7000000,
    rating: "Article 6.2",
    acquiringCountry: "South Korea",
    status: "Negotiation",
  },
]

export default function CreditListingsPage() {
  const [activeTab, setActiveTab] = useState<"vcm" | "article6">("vcm")

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-foreground">Credit Listings</h1>
              <p className="text-muted-foreground mt-1">
                Browse verified carbon credits registered in the Kenya National Carbon Registry (KNCR)
              </p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              <Package size={16} />
              List Credits
            </button>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Total Credits Issued</div>
              <div className="text-3xl font-bold text-foreground">59M</div>
              <div className="text-xs text-green-600 mt-1">Since 2011 across all registries</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Registered Projects</div>
              <div className="text-3xl font-bold text-foreground">296</div>
              <div className="text-xs text-blue-600 mt-1">Highest in Africa</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Article 6 Reserve</div>
              <div className="text-3xl font-bold text-foreground">40M</div>
              <div className="text-xs text-primary mt-1">MtCO2e trading potential</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">VCM External Finance</div>
              <div className="text-3xl font-bold text-foreground">$136M</div>
              <div className="text-xs text-amber-600 mt-1">2023 inflows</div>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as "vcm" | "article6")}
            className="space-y-6"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-secondary/50 p-1 rounded-xl">
              <TabsTrigger value="vcm" className="rounded-lg">
                Voluntary Carbon Market
              </TabsTrigger>
              <TabsTrigger value="article6" className="rounded-lg">
                Article 6 ITMOs
              </TabsTrigger>
            </TabsList>

            {/* Filters */}
            <div className="bg-card rounded-2xl border border-border p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[240px]">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search projects or credits..."
                    className="w-full pl-10 pr-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <select className="px-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none">
                  <option>All Project Types</option>
                  <option>REDD+</option>
                  <option>Clean Energy</option>
                  <option>ARR</option>
                  <option>Blue Carbon</option>
                </select>
                <select className="px-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none">
                  <option>All Vintages</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl text-sm hover:bg-secondary/80 transition-colors">
                  <Filter size={16} />
                  More Filters
                </button>
              </div>
            </div>

            {/* VCM Listings */}
            <TabsContent value="vcm" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {vcmListings.map((listing) => (
                  <Link
                    key={listing.id}
                    href={`/credit-listings/${listing.id}`}
                    className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground font-mono">{listing.id}</span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              listing.rating.includes("Gold")
                                ? "bg-amber-100 text-amber-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {listing.rating}
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            {listing.status}
                          </span>
                        </div>
                        <h3 className="font-medium text-lg text-foreground">{listing.projectName}</h3>
                        <p className="text-sm text-muted-foreground">{listing.projectType}</p>
                      </div>
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                        <ExternalLink size={18} className="text-muted-foreground" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between pt-4 border-t border-border">
                      <div>
                        <div className="text-sm text-muted-foreground">Issued Credits</div>
                        <div className="font-serif text-xl font-semibold text-foreground">
                          {listing.available.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Vintage {listing.vintage}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Registry Status</div>
                        <div className="font-serif text-lg font-semibold text-primary">{listing.status}</div>
                        <div className="text-xs text-muted-foreground">Verified & Registered</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Article 6 Listings */}
            <TabsContent value="article6" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {article6Listings.map((listing) => (
                  <Link
                    key={listing.id}
                    href={`/credit-listings/${listing.id}`}
                    className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground font-mono">{listing.id}</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {listing.rating}
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            {listing.status}
                          </span>
                        </div>
                        <h3 className="font-medium text-lg text-foreground">{listing.projectName}</h3>
                        <p className="text-sm text-muted-foreground">{listing.projectType}</p>
                      </div>
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                        <ExternalLink size={18} className="text-muted-foreground" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between pt-4 border-t border-border">
                      <div>
                        <div className="text-sm text-muted-foreground">Issued ITMOs</div>
                        <div className="font-serif text-xl font-semibold text-foreground">
                          {listing.available.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Vintage {listing.vintage}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Acquiring Country</div>
                        <div className="font-serif text-lg font-semibold text-primary">{listing.acquiringCountry}</div>
                        <div className="text-xs text-muted-foreground">Bilateral Agreement</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
