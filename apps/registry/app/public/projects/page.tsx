import Link from "next/link"
import PublicHeader from "@/components/public/public-header"
import PublicFooter from "@/components/public/public-footer"
import { Search, MapPin, Calendar, ChevronRight, Filter, Sun, Recycle, TreePine, Wind, Waves } from "lucide-react"

export default function PublicProjectsPage() {
  const projects = [
    {
      id: "1",
      name: "Kilifi Solar Project",
      location: "Kilifi, Kenya",
      country: "Kenya",
      sector: "Energy",
      status: "Active",
      credits: "25,123",
      startDate: "2024",
      description: "Large-scale solar installation providing clean energy to rural communities.",
      colorScheme: {
        gradient: "from-amber-400/20 via-orange-300/10 to-yellow-200/20",
        icon: "text-amber-500",
        iconBg: "bg-amber-50",
        accent: "border-l-amber-500",
      },
      Icon: Sun,
    },
    {
      id: "2",
      name: "Lagos Waste-to-Energy",
      location: "Lagos, Nigeria",
      country: "Nigeria",
      sector: "Waste Management",
      status: "Active",
      credits: "38,450",
      startDate: "2023",
      description: "Converting municipal waste to energy while reducing landfill emissions.",
      colorScheme: {
        gradient: "from-emerald-400/20 via-green-300/10 to-teal-200/20",
        icon: "text-emerald-600",
        iconBg: "bg-emerald-50",
        accent: "border-l-emerald-500",
      },
      Icon: Recycle,
    },
    {
      id: "3",
      name: "Addis Ababa Urban Forestry",
      location: "Addis Ababa, Ethiopia",
      country: "Ethiopia",
      sector: "Agriculture, Forestry & Land Use",
      status: "Active",
      credits: "42,100",
      startDate: "2022",
      description: "Urban reforestation initiative creating carbon sinks in metropolitan areas.",
      colorScheme: {
        gradient: "from-green-500/20 via-emerald-300/10 to-lime-200/20",
        icon: "text-green-600",
        iconBg: "bg-green-50",
        accent: "border-l-green-500",
      },
      Icon: TreePine,
    },
    {
      id: "4",
      name: "Marrakech Wind Farm",
      location: "Marrakech, Morocco",
      country: "Morocco",
      sector: "Energy",
      status: "Pending",
      credits: "55,000",
      startDate: "2024",
      description: "Wind farm project harnessing the powerful winds of the Atlas region.",
      colorScheme: {
        gradient: "from-sky-400/20 via-blue-300/10 to-cyan-200/20",
        icon: "text-sky-500",
        iconBg: "bg-sky-50",
        accent: "border-l-sky-500",
      },
      Icon: Wind,
    },
    {
      id: "5",
      name: "Serengeti Conservation",
      location: "Mara, Tanzania",
      country: "Tanzania",
      sector: "Agriculture, Forestry & Land Use",
      status: "Active",
      credits: "68,750",
      startDate: "2021",
      description: "Conservation project protecting wildlife habitats and natural carbon stores.",
      colorScheme: {
        gradient: "from-lime-400/20 via-green-300/10 to-emerald-200/20",
        icon: "text-lime-600",
        iconBg: "bg-lime-50",
        accent: "border-l-lime-500",
      },
      Icon: TreePine,
    },
    {
      id: "6",
      name: "Cape Town Blue Carbon",
      location: "Western Cape, South Africa",
      country: "South Africa",
      sector: "Blue Carbon",
      status: "Active",
      credits: "22,300",
      startDate: "2023",
      description: "Coastal ecosystem restoration protecting mangroves and seagrass beds.",
      colorScheme: {
        gradient: "from-blue-400/20 via-cyan-300/10 to-teal-200/20",
        icon: "text-blue-500",
        iconBg: "bg-blue-50",
        accent: "border-l-blue-500",
      },
      Icon: Waves,
    },
  ]

  const sectors = [
    "All Sectors",
    "Energy",
    "Agriculture, Forestry & Land Use",
    "Waste Management",
    "Transport",
    "Blue Carbon",
  ]
  const statuses = ["All Statuses", "Active", "Pending", "Completed"]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <h1 className="h2 text-foreground mb-3">Carbon Projects</h1>
            <p className="text-muted-foreground">Explore registered carbon projects across the country</p>
          </div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-5 mb-10">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <select className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all lg:w-56">
                {sectors.map((sector) => (
                  <option key={sector}>{sector}</option>
                ))}
              </select>
              <select className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all lg:w-40">
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              <button className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all flex items-center gap-2 shadow-md shadow-primary/20">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const IconComponent = project.Icon
              return (
                <div
                  key={project.id}
                  className={`bg-card border border-border rounded-2xl shadow-sm hover:shadow-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 border-l-4 ${project.colorScheme.accent}`}
                >
                  <div
                    className={`h-44 bg-gradient-to-br ${project.colorScheme.gradient} flex items-center justify-center relative`}
                  >
                    <div
                      className={`w-20 h-20 rounded-2xl ${project.colorScheme.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`w-10 h-10 ${project.colorScheme.icon}`} />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === "Active"
                            ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
                            : project.status === "Pending"
                              ? "bg-amber-100 text-amber-700 ring-1 ring-amber-200"
                              : "bg-gray-100 text-gray-600 ring-1 ring-gray-200"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-lg ${project.colorScheme.iconBg} ${project.colorScheme.icon}`}
                      >
                        {project.sector.length > 20 ? project.sector.substring(0, 18) + "..." : project.sector}
                      </span>
                    </div>

                    {/* Project Name */}
                    <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <MapPin size={12} className="text-primary" />
                        </div>
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-accent/30 flex items-center justify-center">
                          <Calendar size={12} className="text-accent-foreground" />
                        </div>
                        {project.startDate}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">Carbon Credits</div>
                        <div className={`text-2xl font-serif font-bold ${project.colorScheme.icon}`}>
                          {project.credits}
                        </div>
                      </div>
                      <Link
                        href={`/public/projects/${project.id}`}
                        className="flex items-center gap-1 text-sm bg-primary/10 hover:bg-primary hover:text-white px-4 py-2 rounded-xl text-primary font-medium transition-all group/link"
                      >
                        View Details
                        <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2.5 border border-border rounded-xl hover:bg-secondary transition-colors text-sm">
                Previous
              </button>
              <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm shadow-md shadow-primary/20">
                1
              </button>
              <button className="px-4 py-2.5 border border-border rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-colors text-sm">
                2
              </button>
              <button className="px-4 py-2.5 border border-border rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-colors text-sm">
                3
              </button>
              <button className="px-4 py-2.5 border border-border rounded-xl hover:bg-secondary transition-colors text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
