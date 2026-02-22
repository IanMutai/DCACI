"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Leaf,
  Users,
  FileCheck,
  Globe,
  Shield,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Search,
  Bell,
  Menu,
  X,
  MapPin,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Clock,
  FileText,
  Award,
  Zap,
  TreePine,
  Sun,
} from "lucide-react"

// Uganda National Carbon Registry - Powered by ARC
export default function UgandaRegistryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  const branding = {
    primaryColor: "#1E5631",
    secondaryColor: "#FFD700",
    accentColor: "#D90000",
    coat: "🇺🇬",
    authority: "National Environment Management Authority (NEMA)",
    ministry: "Ministry of Water and Environment",
  }

  const stats = [
    { label: "Active Projects", value: "24", icon: Leaf, change: "+3 this month", trend: "up" },
    { label: "Credits Issued", value: "1.2M", icon: FileCheck, change: "tCO₂e total", trend: "up" },
    { label: "Registered Users", value: "156", icon: Users, change: "+12 this week", trend: "up" },
    { label: "Article 6 Transfers", value: "8", icon: Globe, change: "ITMOs traded", trend: "neutral" },
  ]

  const projects = [
    {
      id: "UG-2024-001",
      name: "Murchison Falls Conservation",
      type: "REDD+",
      location: "Murchison Falls National Park",
      status: "Active",
      credits: "450,000",
      icon: TreePine,
      color: "emerald",
    },
    {
      id: "UG-2024-002",
      name: "Lake Victoria Clean Cookstoves",
      type: "Energy Efficiency",
      location: "Kampala Region",
      status: "Active",
      credits: "125,000",
      icon: Zap,
      color: "amber",
    },
    {
      id: "UG-2024-003",
      name: "Karamoja Solar Initiative",
      type: "Renewable Energy",
      location: "Karamoja Sub-region",
      status: "Verification",
      credits: "75,000",
      icon: Sun,
      color: "orange",
    },
    {
      id: "UG-2024-004",
      name: "Rwenzori Reforestation",
      type: "A/R",
      location: "Rwenzori Mountains",
      status: "Active",
      credits: "320,000",
      icon: TreePine,
      color: "green",
    },
  ]

  const recentActivity = [
    {
      action: "Credit issuance approved",
      project: "Murchison Falls Conservation",
      time: "2 hours ago",
      type: "success",
    },
    { action: "New project submitted", project: "Bwindi Forest Protection", time: "5 hours ago", type: "info" },
    { action: "Verification completed", project: "Lake Victoria Cookstoves", time: "1 day ago", type: "success" },
    { action: "Article 6 transfer initiated", project: "Karamoja Solar", time: "2 days ago", type: "warning" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 text-white shadow-lg" style={{ backgroundColor: branding.primaryColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                {branding.coat}
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight">Uganda National Carbon Registry</h1>
                <p className="text-white/70 text-xs">{branding.authority}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {["Dashboard", "Projects", "Credits", "Verify", "Article 6", "Reports"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.toLowerCase()
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/20">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-medium">
                  JN
                </div>
                <span className="text-sm">John Nagenda</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white/80 hover:text-white"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-white/10 backdrop-blur-sm">
            <div className="px-4 py-3 space-y-1">
              {["Dashboard", "Projects", "Credits", "Verify", "Article 6", "Reports"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveTab(item.toLowerCase())
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg text-white/90 hover:bg-white/10 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Banner */}
      <div
        className="text-white py-8"
        style={{
          background: `linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.primaryColor}cc 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                <MapPin size={14} />
                <span>Republic of Uganda</span>
                <span className="mx-2">•</span>
                <Calendar size={14} />
                <span>Registry Live Since 2024</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">Welcome to Uganda's Carbon Registry</h2>
              <p className="text-white/80">Transparent management of carbon credits under the Paris Agreement</p>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <button
                className="px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                style={{ backgroundColor: branding.secondaryColor, color: branding.primaryColor }}
              >
                <FileCheck size={18} />
                Register New Project
              </button>
              <button className="px-5 py-2.5 bg-white/20 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center gap-2">
                <Shield size={18} />
                Verify Document
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${branding.primaryColor}15` }}
                >
                  <stat.icon size={20} style={{ color: branding.primaryColor }} />
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    stat.trend === "up"
                      ? "bg-green-100 text-green-700"
                      : stat.trend === "down"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">Active Projects</h3>
                  <p className="text-sm text-slate-500">Carbon projects registered in Uganda</p>
                </div>
                <button
                  className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ color: branding.primaryColor }}
                >
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <div key={project.id} className="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          project.color === "emerald"
                            ? "bg-emerald-100 text-emerald-600"
                            : project.color === "amber"
                              ? "bg-amber-100 text-amber-600"
                              : project.color === "orange"
                                ? "bg-orange-100 text-orange-600"
                                : "bg-green-100 text-green-600"
                        }`}
                      >
                        <project.icon size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-slate-900 group-hover:text-primary transition-colors">
                            {project.name}
                          </h4>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              project.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <FileText size={14} />
                            {project.id}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {project.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-slate-600">{project.type}</span>
                          <span className="font-medium" style={{ color: branding.primaryColor }}>
                            {project.credits} tCO₂e
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { title: "Submit Project", desc: "Start PCN application", icon: FileCheck, color: "emerald" },
                { title: "Verify Document", desc: "Check authenticity", icon: Shield, color: "blue" },
                { title: "Credit Trading", desc: "Market & prices", icon: TrendingUp, color: "amber" },
                { title: "Article 6 Portal", desc: "ITMO management", icon: Globe, color: "purple" },
              ].map((action, i) => (
                <button
                  key={i}
                  className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/30 transition-all text-left group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                      action.color === "emerald"
                        ? "bg-emerald-100 text-emerald-600"
                        : action.color === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : action.color === "amber"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    <action.icon size={20} />
                  </div>
                  <p className="font-medium text-slate-900 group-hover:text-primary transition-colors">
                    {action.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{action.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">Recent Activity</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="px-5 py-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.type === "success"
                            ? "bg-green-100 text-green-600"
                            : activity.type === "warning"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {activity.type === "success" ? (
                          <CheckCircle2 size={16} />
                        ) : activity.type === "warning" ? (
                          <Clock size={16} />
                        ) : (
                          <FileText size={16} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                        <p className="text-xs text-slate-500 truncate">{activity.project}</p>
                        <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-slate-200">
                <button
                  className="text-sm font-medium flex items-center gap-1"
                  style={{ color: branding.primaryColor }}
                >
                  View all activity
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Article 6 Summary */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={20} className="text-emerald-400" />
                <h3 className="font-semibold">Article 6 Status</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">ITMOs Authorized</span>
                  <span className="font-semibold">250,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">ITMOs Transferred</span>
                  <span className="font-semibold">180,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Partner Countries</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="pt-3 border-t border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Compliance Rate</span>
                    <span className="text-emerald-400 font-semibold">98.5%</span>
                  </div>
                  <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[98.5%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Powered by ARC */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Powered by ARC</p>
                  <p className="text-xs text-slate-500">African Registry for Carbon</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                This registry is built on ARC's enterprise-grade carbon registry infrastructure.
              </p>
              <Link
                href="/"
                className="text-sm font-medium flex items-center gap-1"
                style={{ color: branding.primaryColor }}
              >
                Learn more about ARC
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{branding.coat}</div>
              <div>
                <p className="font-semibold text-slate-900">Uganda National Carbon Registry</p>
                <p className="text-sm text-slate-500">{branding.ministry}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="#" className="hover:text-slate-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">
                Contact Support
              </Link>
            </div>
            <div className="text-sm text-slate-400">
              Powered by{" "}
              <Link href="/" className="text-primary font-medium hover:underline">
                ARC
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
