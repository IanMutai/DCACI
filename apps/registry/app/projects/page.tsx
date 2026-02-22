"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import Link from "next/link"
import { Plus, Filter, Search, MapPin, Leaf, ArrowRight, MoreHorizontal, CheckCircle, X } from "lucide-react"

const projects = [
  {
    id: "PRJ-2024-007",
    name: "Kilifi Solar Project",
    type: "Solar",
    country: "Kenya",
    status: "pending",
    stage: "PCN Review",
    credits: 50000,
    startDate: "2024-12-01",
    image: "/solar-panels-kenya-coast.jpg",
    isNew: true,
  },
  {
    id: "PRJ-2024-001",
    name: "Mau Forest Conservation",
    type: "REDD+",
    country: "Kenya",
    status: "monitoring",
    stage: "Issuance",
    credits: 125000,
    startDate: "2023-01-15",
    image: "/lush-green-forest-aerial-view.jpg",
  },
  {
    id: "PRJ-2024-002",
    name: "Lake Victoria Clean Cookstoves",
    type: "Clean Energy",
    country: "Kenya",
    status: "active",
    stage: "PDD Review",
    credits: 45000,
    startDate: "2023-06-20",
    image: "/clean-cookstove-africa-village.jpg",
  },
  {
    id: "PRJ-2024-003",
    name: "Turkana Wind Power",
    type: "Renewable Energy",
    country: "Kenya",
    status: "active",
    stage: "Authorization",
    credits: 200000,
    startDate: "2022-11-01",
    image: "/wind-turbines-desert-landscape.jpg",
  },
  {
    id: "PRJ-2024-004",
    name: "Ethiopia Reforestation Initiative",
    type: "ARR",
    country: "Ethiopia",
    status: "pending",
    stage: "PCN Review",
    credits: 80000,
    startDate: "2024-01-10",
    image: "/reforestation-seedlings-africa.jpg",
  },
  {
    id: "PRJ-2024-005",
    name: "Morocco Solar Farm",
    type: "Renewable Energy",
    country: "Morocco",
    status: "active",
    stage: "Monitoring",
    credits: 150000,
    startDate: "2023-03-25",
    image: "/solar-panels-desert-morocco.jpg",
  },
  {
    id: "PRJ-2024-006",
    name: "Tanzania Mangrove Restoration",
    type: "Blue Carbon",
    country: "Tanzania",
    status: "active",
    stage: "Verification",
    credits: 35000,
    startDate: "2023-08-12",
    image: "/mangrove-forest-coastline.jpg",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "monitoring":
      return "bg-blue-100 text-blue-700"
    case "active":
      return "bg-green-100 text-green-700"
    case "pending":
      return "bg-amber-100 text-amber-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getStageColor = (stage: string) => {
  switch (stage) {
    case "Issuance":
      return "bg-purple-100 text-purple-700"
    case "Monitoring":
      return "bg-blue-100 text-blue-700"
    case "Verification":
      return "bg-cyan-100 text-cyan-700"
    case "Authorization":
      return "bg-indigo-100 text-indigo-700"
    case "PDD Review":
      return "bg-orange-100 text-orange-700"
    case "PCN Review":
      return "bg-amber-100 text-amber-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function ProjectsListPage() {
  const searchParams = useSearchParams()
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)

  useEffect(() => {
    if (searchParams.get("submitted") === "true") {
      setShowSuccessBanner(true)
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => setShowSuccessBanner(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          {showSuccessBanner && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center justify-between animate-fade-up">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Project Submitted Successfully!</h3>
                  <p className="text-sm text-green-700">
                    Your project "Kilifi Solar Project" is now pending review. You will be notified once it is approved.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSuccessBanner(false)}
                className="p-2 hover:bg-green-100 rounded-lg transition-colors"
              >
                <X size={18} className="text-green-600" />
              </button>
            </div>
          )}

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-foreground">Projects</h1>
              <p className="text-muted-foreground mt-1">Manage and track all your carbon credit projects</p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus size={16} />
              New Project
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Total Projects</div>
              <div className="font-serif text-2xl font-semibold text-foreground">25</div>
              <div className="text-xs text-green-600 mt-1">+4 this month</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Active Projects</div>
              <div className="font-serif text-2xl font-semibold text-foreground">18</div>
              <div className="text-xs text-muted-foreground mt-1">in various stages</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Total Credits</div>
              <div className="font-serif text-2xl font-semibold text-foreground">685K</div>
              <div className="text-xs text-muted-foreground mt-1">estimated issuance</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Pending Review</div>
              <div className="font-serif text-2xl font-semibold text-accent">6</div>
              <div className="text-xs text-muted-foreground mt-1">awaiting approval</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl border border-border p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[240px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <select className="px-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Monitoring</option>
              </select>
              <select className="px-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none">
                <option>All Types</option>
                <option>REDD+</option>
                <option>Clean Energy</option>
                <option>Renewable Energy</option>
                <option>ARR</option>
                <option>Blue Carbon</option>
              </select>
              <select className="px-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none">
                <option>All Countries</option>
                <option>Kenya</option>
                <option>Ethiopia</option>
                <option>Morocco</option>
                <option>Tanzania</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl text-sm hover:bg-secondary/80 transition-colors">
                <Filter size={16} />
                More Filters
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={
                  project.stage === "PCN Review"
                    ? "/pcn"
                    : project.stage === "PDD Review"
                      ? "/pdd"
                      : project.stage === "Authorization"
                        ? "/authorization"
                        : project.stage === "Monitoring" || project.stage === "Verification"
                          ? "/monitoring"
                          : "/issuance"
                }
                className={`bg-card rounded-2xl border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all group ${
                  project.isNew ? "border-green-300 ring-2 ring-green-100" : "border-border"
                }`}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    {project.isNew && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500 text-white">New</span>
                    )}
                  </div>
                  <button className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-lg hover:bg-white transition-colors">
                    <MoreHorizontal size={16} className="text-gray-600" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted-foreground font-mono">{project.id}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStageColor(project.stage)}`}>
                      {project.stage}
                    </span>
                  </div>
                  <h3 className="font-medium text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {project.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Leaf size={14} />
                      {project.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground">Est. Credits</div>
                      <div className="font-serif font-semibold text-foreground">{project.credits.toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-primary font-medium">
                      View Details
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
