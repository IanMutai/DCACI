import Link from "next/link"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import {
  FolderOpen,
  FileText,
  CheckCircle,
  TrendingUp,
  ExternalLink,
  ArrowRight,
  Globe,
  Plus,
  Sun,
  Trash2,
  TreePine,
  Sparkles,
  Clock,
} from "lucide-react"

export default function DashboardPage() {
  const stats = [
    { label: "Total Projects", value: "3", icon: FolderOpen, color: "bg-primary/10", iconColor: "text-primary" },
    {
      label: "Pending Reviews",
      value: "2",
      icon: Clock,
      color: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
    { label: "Approved", value: "1", icon: CheckCircle, color: "bg-emerald-500/10", iconColor: "text-emerald-500" },
    {
      label: "Credits Issued",
      value: "25,123",
      icon: TrendingUp,
      color: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
  ]

  const recentProjects = [
    {
      name: "Kilifi Solar Project",
      status: "Authorization",
      stage: "authorization",
      location: "Kilifi County",
      icon: Sun,
      color: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
    {
      name: "Nairobi Waste-to-Energy",
      status: "PCN Review",
      stage: "pcn",
      location: "Nairobi County",
      icon: Trash2,
      color: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      name: "Mau Forest Reforestation",
      status: "PDD Submission",
      stage: "pdd",
      location: "Nakuru County",
      icon: TreePine,
      color: "bg-green-600/10",
      iconColor: "text-green-600",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8 stagger-children">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground leading-tight">
                      Welcome back, Ian Mutai
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">Here's an overview of your carbon projects</p>
                  </div>
                </div>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-br from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-white rounded-xl font-semibold transition-all shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
              >
                <Plus size={19} />
                New Project
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                    <div>
                      <div className="text-3xl font-serif font-bold text-foreground leading-none mb-1.5">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-7 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-bold text-foreground">Recent Projects</h2>
                  <Link
                    href="/projects"
                    className="text-sm text-primary hover:text-primary/80 font-semibold flex items-center gap-1.5 group"
                  >
                    View All
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentProjects.map((project, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between p-4 bg-secondary/40 hover:bg-secondary/70 rounded-xl transition-all cursor-pointer border border-transparent hover:border-border/50 hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 ${project.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}
                        >
                          <project.icon className={`w-6 h-6 ${project.iconColor}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground mb-1">{project.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Globe size={13} />
                            {project.location}
                            <span className="text-border">•</span>
                            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/${project.stage}`}
                        className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-semibold opacity-0 group-hover:opacity-100 transition-all"
                      >
                        Continue
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-7 shadow-sm">
                <h2 className="text-xl font-serif font-bold text-foreground mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    href="/"
                    className="group flex items-center justify-center gap-2.5 w-full px-5 py-4 bg-gradient-to-br from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-white rounded-xl font-semibold transition-all shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
                  >
                    <Plus size={18} />
                    Add New Project
                  </Link>
                  <Link
                    href="http://www.arc.verst.earth/"
                    target="_blank"
                    className="group flex items-center justify-center gap-2.5 w-full px-5 py-4 bg-secondary/50 hover:bg-secondary text-foreground rounded-xl font-semibold transition-all border border-border hover:border-border/80 shadow-sm hover:shadow"
                  >
                    <ExternalLink
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                    Verify Document
                  </Link>
                  <Link
                    href="http://www.arc.verst.earth/"
                    target="_blank"
                    className="group flex items-center justify-center gap-2.5 w-full px-5 py-4 bg-card hover:bg-secondary/50 text-foreground rounded-xl font-semibold transition-all border border-border hover:border-border/80"
                  >
                    <Globe size={16} />
                    Public Portal
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-7 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-foreground mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="group flex items-start gap-4 p-5 bg-gradient-to-br from-emerald-50 to-green-50/50 rounded-xl border border-emerald-200/60 hover:border-emerald-300/60 transition-all cursor-pointer">
                  <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground mb-1">Kilifi Solar Project - PCN Approved</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      Your Letter of No Objection has been issued. Proceed to PDD submission.
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-2 font-medium">2 hours ago</div>
                  </div>
                </div>
                <div className="group flex items-start gap-4 p-5 bg-gradient-to-br from-amber-50 to-yellow-50/50 rounded-xl border border-amber-200/60 hover:border-amber-300/60 transition-all cursor-pointer">
                  <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                    <FileText className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground mb-1">Nairobi Waste-to-Energy - PCN Under Review</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      Your PCN is being reviewed. Expected completion in 5 business days.
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-2 font-medium">1 day ago</div>
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
