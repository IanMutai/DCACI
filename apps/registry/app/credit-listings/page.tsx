"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Package, Filter, Search, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const vcmListings = [
  {
    id: "ACR-2024-VCM-001",
    projectName: "Mau Forest Conservation",
    projectType: "REDD+",
    vintage: "2023",
    available: 25000,
    rating: "Gold Standard",
    status: "Issued",
  },
  {
    id: "ACR-2024-VCM-002",
    projectName: "Lake Victoria Clean Cookstoves",
    projectType: "Clean Energy",
    vintage: "2024",
    available: 15000,
    rating: "Verra VCS",
    status: "Issued",
  },
]

const article6Listings = [
  {
    id: "A6-2024-ITMO-001",
    projectName: "Renewable Energy Partnership - Switzerland",
    projectType: "Renewable Energy",
    vintage: "2024",
    available: 50000,
    rating: "Article 6.2",
    acquiringCountry: "Switzerland",
    status: "Authorized",
  },
  {
    id: "A6-2024-ITMO-002",
    projectName: "Forest Conservation Partnership - Germany",
    projectType: "REDD+",
    vintage: "2023",
    available: 35000,
    rating: "Article 6.2",
    acquiringCountry: "Germany",
    status: "Authorized",
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
                Browse verified carbon credits registered in the African Registry for Carbon
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
              <div className="text-3xl font-bold text-foreground">125,450</div>
              <div className="text-xs text-green-600 mt-1">+12% this month</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Active Projects</div>
              <div className="text-3xl font-bold text-foreground">24</div>
              <div className="text-xs text-blue-600 mt-1">3 pending approval</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Article 6 ITMOs</div>
              <div className="text-3xl font-bold text-foreground">85,000</div>
              <div className="text-xs text-primary mt-1">2 bilateral agreements</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">VCM Credits</div>
              <div className="text-3xl font-bold text-foreground">40,450</div>
              <div className="text-xs text-amber-600 mt-1">Multiple standards</div>
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
