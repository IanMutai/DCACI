"use client"

import { useState, useEffect } from "react"
import {
  ExternalLink,
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  Shield,
  Leaf,
  Users,
  FileCheck,
  Globe,
  ChevronRight,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Rocket,
  CheckCircle2,
  Sparkles,
} from "lucide-react"

interface RegistryPreviewProps {
  countryName: string
  config: Record<string, unknown>
  onComplete?: () => void
}

export default function RegistryPreview({ countryName, config, onComplete }: RegistryPreviewProps) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showLaunchReady, setShowLaunchReady] = useState(false)

  const countrySlug = countryName.toLowerCase().replace(/\s+/g, "-")
  const registryUrl = `https://www.arc.verst.earth/${countrySlug}`

  // Country-specific branding
  const getBranding = () => {
    if (countryName.toLowerCase().includes("uganda")) {
      return {
        primaryColor: "#1E5631",
        secondaryColor: "#FFD700",
        accentColor: "#D90000",
        flagColors: ["#000000", "#FFD700", "#D90000"],
        coat: "🇺🇬",
        motto: "For God and My Country",
        currency: "UGX",
        authority: "National Environment Management Authority (NEMA)",
        ministry: "Ministry of Water and Environment",
      }
    }
    return {
      primaryColor: "#2E7D32",
      secondaryColor: "#FFA000",
      accentColor: "#1565C0",
      flagColors: ["#2E7D32", "#FFA000"],
      coat: "🌍",
      motto: "Carbon Registry",
      currency: "USD",
      authority: "National Carbon Authority",
      ministry: "Ministry of Environment",
    }
  }

  const branding = getBranding()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Show launch ready state after preview loads
      setTimeout(() => setShowLaunchReady(true), 2000)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const getViewportWidth = () => {
    switch (viewport) {
      case "mobile":
        return "w-[375px]"
      case "tablet":
        return "w-[768px]"
      default:
        return "w-full"
    }
  }

  return (
    <div className="space-y-4">
      {/* Preview Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-500" />
            Registry Deployed Successfully
          </h3>
          <p className="text-sm text-muted-foreground">Preview your live registry below</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`/${countrySlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-1.5"
          >
            <ExternalLink size={14} />
            Open Live
          </a>
        </div>
      </div>

      {/* Browser Preview */}
      <div className="rounded-xl border border-border overflow-hidden bg-white shadow-xl">
        {/* Browser chrome */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
          </div>

          {/* URL bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-border text-xs">
              <Shield size={12} className="text-green-600" />
              <span className="text-muted-foreground">{registryUrl}</span>
              <ExternalLink size={10} className="text-muted-foreground ml-auto" />
            </div>
          </div>

          {/* Viewport toggles */}
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-border">
            {[
              { id: "desktop", icon: Monitor },
              { id: "tablet", icon: Tablet },
              { id: "mobile", icon: Smartphone },
            ].map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setViewport(id as typeof viewport)}
                className={`p-1.5 rounded transition-colors ${
                  viewport === id ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setIsLoading(true)
              setTimeout(() => setIsLoading(false), 1000)
            }}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors ml-2"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Preview content */}
        <div className="bg-slate-200 p-4 flex justify-center overflow-x-auto min-h-[500px]">
          <div
            className={`${getViewportWidth()} bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300`}
          >
            {isLoading ? (
              <div className="h-[480px] flex items-center justify-center">
                <div className="text-center">
                  <RefreshCw size={24} className="animate-spin text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Loading registry...</p>
                </div>
              </div>
            ) : (
              <div className="h-[480px] overflow-y-auto">
                {/* Registry Header */}
                <header
                  className="px-6 py-4 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.primaryColor}dd 100%)`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                        {branding.coat}
                      </div>
                      <div>
                        <h1 className="font-bold text-lg">{countryName} National Carbon Registry</h1>
                        <p className="text-white/80 text-xs">{branding.authority}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-3 py-1.5 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors">
                        Sign In
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        style={{ backgroundColor: branding.secondaryColor, color: branding.primaryColor }}
                      >
                        Register Project
                      </button>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="flex gap-6 mt-4 text-sm">
                    {["Dashboard", "Projects", "Credits", "Verify", "Article 6"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setActiveTab(item.toLowerCase())}
                        className={`pb-2 border-b-2 transition-colors ${
                          activeTab === item.toLowerCase()
                            ? "border-white text-white"
                            : "border-transparent text-white/70 hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </nav>
                </header>

                {/* Registry Content */}
                <main className="p-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Active Projects", value: "0", icon: Leaf, change: "New" },
                      { label: "Credits Issued", value: "0", icon: FileCheck, change: "tCO₂e" },
                      { label: "Registered Users", value: "1", icon: Users, change: "Admin" },
                      { label: "Article 6 Transfers", value: "0", icon: Globe, change: "ITMOs" },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl border border-border bg-gradient-to-br from-white to-slate-50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <stat.icon size={18} style={{ color: branding.primaryColor }} />
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-muted-foreground">
                            {stat.change}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold mb-3 text-foreground">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { title: "Submit New Project", desc: "Start your PCN application", icon: FileCheck },
                        { title: "Verify Document", desc: "Check letter authenticity", icon: Shield },
                        { title: "View Credit Prices", desc: "Market rates & trading", icon: TrendingUp },
                        { title: "Article 6 Portal", desc: "ITMO management", icon: Globe },
                      ].map((action, i) => (
                        <button
                          key={i}
                          className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${branding.primaryColor}15` }}
                          >
                            <action.icon size={18} style={{ color: branding.primaryColor }} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-foreground">{action.title}</p>
                            <p className="text-xs text-muted-foreground">{action.desc}</p>
                          </div>
                          <ChevronRight
                            size={16}
                            className="text-muted-foreground group-hover:text-primary transition-colors"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h2 className="text-sm font-semibold mb-3 text-foreground">Recent Activity</h2>
                    <div className="rounded-xl border border-border overflow-hidden">
                      <div className="p-8 text-center bg-slate-50">
                        <div
                          className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                          style={{ backgroundColor: `${branding.primaryColor}15` }}
                        >
                          <BarChart3 size={24} style={{ color: branding.primaryColor }} />
                        </div>
                        <p className="font-medium text-foreground">Registry Ready</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your carbon registry is live and ready for projects
                        </p>
                        <button
                          className="mt-4 px-4 py-2 rounded-lg text-white text-sm font-medium inline-flex items-center gap-2"
                          style={{ backgroundColor: branding.primaryColor }}
                        >
                          Register First Project
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </main>

                {/* Footer */}
                <footer
                  className="px-6 py-4 text-white/80 text-xs mt-4"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{countryName} National Carbon Registry</p>
                      <p>{branding.ministry}</p>
                    </div>
                    <div className="text-right">
                      <p>Powered by ARC</p>
                      <p className="text-white/60">African Registry for Carbon</p>
                    </div>
                  </div>
                </footer>
              </div>
            )}
          </div>
        </div>
      </div>

      {showLaunchReady && (
        <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-r from-primary/5 via-amber-50 to-green-50 p-6 animate-fade-up">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-green-600 flex items-center justify-center text-white shadow-lg">
              <Sparkles size={28} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">Your Registry is Live!</h3>
              <p className="text-muted-foreground mt-1">
                The <strong>{countryName} National Carbon Registry</strong> has been successfully deployed to
                production. You can access it at{" "}
                <code className="px-1.5 py-0.5 bg-primary/10 rounded text-primary text-sm">{registryUrl}</code>
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button
                  onClick={onComplete}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-green-600 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
                >
                  <Rocket size={18} className="group-hover:animate-bounce" />
                  Complete & Publish
                  <Sparkles size={16} />
                </button>

                <a
                  href={`/${countrySlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Visit Registry
                </a>

                <button className="px-4 py-3 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
                  <Globe size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Success indicators */}
          <div className="grid grid-cols-4 gap-3 mt-6 pt-6 border-t border-border/50">
            {[
              { label: "SSL Certificate", status: "Active", color: "text-green-600" },
              { label: "CDN Distribution", status: "Global", color: "text-blue-600" },
              { label: "Database", status: "Connected", color: "text-green-600" },
              { label: "API Gateway", status: "Running", color: "text-green-600" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={14} className={item.color} />
                <span className="text-muted-foreground">{item.label}:</span>
                <span className={`font-medium ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
