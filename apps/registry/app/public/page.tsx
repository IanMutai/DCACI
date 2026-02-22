"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import PublicHeader from "@/components/public/public-header"
import PublicFooter from "@/components/public/public-footer"
import AfricaMapInteractive from "@/components/public/africa-map-interactive"
import {
  ArrowRight,
  FileCheck,
  Shield,
  Globe,
  Zap,
  Users,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  TreePine,
  Wind,
} from "lucide-react"

export default function PublicLandingPage() {
  const [countUp, setCountUp] = useState({
    countries: 0,
    projects: 0,
    itmos: 0,
    tons: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.3 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const animateCounters = () => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCountUp({
        countries: Math.floor(4 * progress),
        projects: Math.floor(296 * progress),
        itmos: Math.floor(40 * progress),
        tons: Math.floor(59 * progress * 10) / 10,
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setCountUp({
          countries: 4,
          projects: 296,
          itmos: 40,
          tons: 59,
        })
      }
    }, stepDuration)
  }

  const sectorData = [
    { name: "Clean Cooking / Cookstoves (Gold Standard)", count: 51, percentage: 24, color: "bg-amber-500" },
    { name: "Renewable Energy / CDM", count: 49, percentage: 23, color: "bg-cyan-500" },
    { name: "REDD+ / Forestry (Verra VCS)", count: 19, percentage: 35, color: "bg-emerald-500" },
    { name: "Reforestation / ARR", count: 12, percentage: 10, color: "bg-green-600" },
    { name: "Blue Carbon / Mangroves (Plan Vivo)", count: 2, percentage: 3, color: "bg-blue-500" },
    { name: "Other / Mixed", count: 163, percentage: 5, color: "bg-violet-500" },
  ]

  const features = [
    {
      icon: Shield,
      title: "Carbon Markets Regulations 2024",
      description: "Full compliance with Kenya's Carbon Markets Regulations (May 2024) - 40% community benefit sharing for land-based projects.",
      color: "bg-teal-50 text-teal-600",
      gradient: "from-teal-500/10 to-teal-500/5",
    },
    {
      icon: Globe,
      title: "Article 6 Bilateral Agreements",
      description: "Active agreements with Switzerland and Sweden, negotiations with Singapore and South Korea under NEMA oversight.",
      color: "bg-amber-50 text-amber-600",
      gradient: "from-amber-500/10 to-amber-500/5",
    },
    {
      icon: Zap,
      title: "Multi-Registry Integration",
      description: "Unified tracking across Gold Standard (51 projects), CDM (49), Verra VCS (19), and Plan Vivo (2) registries.",
      color: "bg-violet-50 text-violet-600",
      gradient: "from-violet-500/10 to-violet-500/5",
    },
    {
      icon: Users,
      title: "Community-First Design",
      description: "Transparent benefit-sharing tracking for 657K+ beneficiaries across 296 projects with 15% tax incentive for operators.",
      color: "bg-rose-50 text-rose-600",
      gradient: "from-rose-500/10 to-rose-500/5",
    },
  ]

  const partnerLogos = [
    { name: "NEMA", icon: Shield },
    { name: "Gold Standard", icon: Award },
    { name: "Verra VCS", icon: Globe },
    { name: "CDM/UNFCCC", icon: Layers },
  ]

  const impactMetrics = [
    { icon: TreePine, value: "26M", label: "Trees Planted (TIST)", color: "text-emerald-600" },
    { icon: Wind, value: "296", label: "Registered Projects", color: "text-cyan-600" },
    { icon: Users, value: "657K+", label: "Community Beneficiaries", color: "text-violet-600" },
    { icon: Award, value: "59M", label: "Credits Issued", color: "text-amber-600" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-36 overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute inset-0">
            <img
              src="/african-landscape-solar-panels-wind-turbines-green.jpg"
              alt="African renewable energy landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          {/* Animated gradient overlays */}
          <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-[5%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl animate-float-delayed" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="animate-fade-up">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm text-primary rounded-full text-sm font-medium mb-8 hover:bg-primary/20 transition-all hover:scale-105 cursor-default border border-primary/20">
                  <Sparkles size={16} className="animate-pulse" />
                  Kenya National Carbon Registry (KNCR)
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                  Empowering Kenya's
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-500 to-accent animate-gradient-text">
                    Carbon Markets
                  </span>
                </h1>

                <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                  Kenya's official carbon registry platform - 296 projects, 59M credits issued, and 25% of Africa's
                  voluntary carbon market. Powered by the Kenya National Carbon Registry (KNCR).
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 mb-12">
                  <Link
                    href="/public/projects"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105"
                  >
                    Explore Projects
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-background/80 backdrop-blur-sm border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-all hover:scale-105"
                  >
                    Register Your Project
                  </Link>
                </div>

                {/* Trusted by logos */}
                <div className="animate-fade-up animation-delay-300">
                  <p className="text-sm text-muted-foreground mb-4">Trusted by leading organizations</p>
                  <div className="flex flex-wrap gap-6 items-center">
                    {partnerLogos.map((partner, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 transition-all"
                      >
                        <partner.icon size={16} className="text-primary" />
                        <span className="text-sm font-medium text-foreground">{partner.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Stats Grid */}
              <div ref={statsRef} className="grid grid-cols-2 gap-4 animate-fade-up animation-delay-200">
                {impactMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="group card-elevated p-6 hover:scale-105 transition-all cursor-default backdrop-blur-sm bg-card/80"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <metric.icon className={`w-6 h-6 ${metric.color}`} />
                      </div>
                      <div className={`text-3xl font-serif font-bold ${metric.color} mb-1`}>{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{isVisible ? countUp.countries : 0}</div>
                <div className="text-sm text-white">Art. 6 Partner Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{isVisible ? countUp.projects : 0}</div>
                <div className="text-sm text-white">Registered Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{isVisible ? countUp.itmos : 0}M</div>
                <div className="text-sm text-white">MtCO2e Trading Potential</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{isVisible ? countUp.tons : 0}M</div>
                <div className="text-sm text-white">Credits Issued</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-up">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
                Built for Kenya's Carbon Market Leadership
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools aligned with the Carbon Markets Regulations 2024 and Kenya's Article 6
                bilateral agreements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden card-interactive p-6 hover:shadow-xl transition-all animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <div className="relative">
                    <div
                      className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-gradient-to-b from-background to-card">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Interactive Africa Map */}
              <div className="relative animate-fade-up">
                <AfricaMapInteractive />
              </div>

              {/* Sector Distribution */}
              <div className="animate-fade-up animation-delay-200">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Projects by Registry & Sector</h2>
                <p className="text-lg text-muted-foreground mb-10">
                  296 carbon projects across Gold Standard, CDM/UNFCCC, Verra VCS, and Plan Vivo registries in Kenya.
                </p>

                <div className="space-y-5">
                  {sectorData.map((sector, index) => (
                    <div key={index} className="group animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{sector.name}</span>
                        <span className="text-sm text-muted-foreground">{sector.count} projects</span>
                      </div>
                      <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full ${sector.color} rounded-full transition-all duration-1000 group-hover:scale-x-105`}
                          style={{ width: `${sector.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/public/projects"
                  className="inline-flex items-center gap-2 text-primary font-medium mt-8 hover:gap-3 transition-all group"
                >
                  View all projects
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-fade-up">
                <img
                  src="/african-solar-farm-community-workers-happy.jpg"
                  alt="Solar project in Africa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
                    Case Study
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Kasigau Corridor REDD+</h3>
                  <p className="text-white/80 text-sm">13.9M credits issued - Wildlife Works - Taita-Taveta County, $12/ton</p>
                </div>
              </div>

              <div className="flex flex-col justify-center animate-fade-up animation-delay-200">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">Accelerating Kenya's Climate Action</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    "The Kenya National Carbon Registry represents a critical step forward in building transparent,
                    efficient carbon market infrastructure. With 296 projects and $136M in VCM finance, Kenya leads
                    Africa's carbon markets with signed Article 6 agreements with Switzerland and Sweden."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-teal-500 rounded-full flex items-center justify-center">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">NEMA - National Environment Management Authority</div>
                      <div className="text-sm text-muted-foreground">Designated National Authority for Carbon Markets</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-card border border-border rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">$136M</div>
                    <div className="text-sm text-muted-foreground">VCM Finance (2023)</div>
                  </div>
                  <div className="p-4 bg-card border border-border rounded-xl">
                    <div className="text-2xl font-bold text-amber-600 mb-1">141M</div>
                    <div className="text-sm text-muted-foreground">MtCO2e Projected 2025-2030</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verify Documents CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sidebar via-sidebar to-[hsl(174,30%,20%)] p-10 lg:p-16 animate-fade-up">
              <div className="absolute top-0 right-0 w-80 h-80 bg-sidebar-primary/10 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow animation-delay-300" />

              <div className="relative flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 text-center lg:text-left">
                  <div className="w-16 h-16 bg-sidebar-primary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0 animate-bounce-slow">
                    <FileCheck className="w-8 h-8 text-sidebar-primary" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-sidebar-foreground mb-4">
                    Verify Document Authenticity
                  </h3>
                  <p className="text-sidebar-foreground/60 max-w-lg leading-relaxed">
                    Use our verification portal to confirm the validity of Letters of No Objection, Letters of Approval,
                    and Letters of Authorization issued through the KNCR.
                  </p>
                </div>
                <Link
                  href="/public/verify"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-sidebar-primary text-sidebar-primary-foreground font-semibold rounded-xl hover:bg-sidebar-primary/90 transition-all shadow-lg shadow-sidebar-primary/20 hover:shadow-xl hover:scale-105"
                >
                  Verify Documents
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
