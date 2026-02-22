import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Users, FileCheck, AlertCircle, CheckCircle2, Clock, Download, Plus, Eye } from "lucide-react"
import Link from "next/link"

const agreements = [
  {
    id: "CDA-2024-001",
    projectName: "Mau Forest Conservation",
    community: "Mau Community Forest Association",
    status: "approved",
    beneficiaries: 12500,
    sharePercentage: 60,
    signedDate: "2024-01-10",
    expiryDate: "2029-01-10",
  },
  {
    id: "CDA-2024-002",
    projectName: "Lake Victoria Clean Cookstoves",
    community: "Kisumu Women's Cooperative",
    status: "pending_review",
    beneficiaries: 8000,
    sharePercentage: 55,
    signedDate: null,
    expiryDate: null,
  },
  {
    id: "CDA-2024-003",
    projectName: "Turkana Wind Power",
    community: "Turkana Pastoralist Union",
    status: "approved",
    beneficiaries: 5000,
    sharePercentage: 50,
    signedDate: "2023-11-15",
    expiryDate: "2028-11-15",
  },
  {
    id: "CDA-2023-015",
    projectName: "Nairobi Solar Initiative",
    community: "Kibera Green Energy Group",
    status: "under_negotiation",
    beneficiaries: 3500,
    sharePercentage: 45,
    signedDate: null,
    expiryDate: null,
  },
]

export default function CommunityDevelopmentPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-foreground">Community Agreements</h1>
              <p className="text-muted-foreground mt-1">Manage benefit-sharing agreements with local communities</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus size={16} />
              New Agreement
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FileCheck size={20} className="text-primary" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-1">Active Agreements</div>
              <div className="font-serif text-2xl font-semibold text-foreground">24</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Users size={20} className="text-accent" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-1">Total Beneficiaries</div>
              <div className="font-serif text-2xl font-semibold text-foreground">45,000+</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-green-600" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-1">Benefits Distributed</div>
              <div className="font-serif text-2xl font-semibold text-foreground">$2.4M</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-amber-600" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-1">Pending Review</div>
              <div className="font-serif text-2xl font-semibold text-accent">5</div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-8 flex items-start gap-4">
            <AlertCircle size={20} className="text-primary mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Community Benefit Requirements</h3>
              <p className="text-sm text-muted-foreground">
                All carbon credit projects must demonstrate community engagement and benefit-sharing arrangements as per
                Article 6.4 guidelines. Minimum 40% of proceeds must be allocated to local communities.
              </p>
            </div>
          </div>

          {/* Agreements List */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-serif text-lg font-semibold text-foreground">Community Development Agreements</h2>
            </div>
            <div className="divide-y divide-border">
              {agreements.map((agreement) => (
                <Link
                  key={agreement.id}
                  href={`/community-development/${agreement.id}`}
                  className="block p-6 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-foreground">{agreement.projectName}</h3>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            agreement.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : agreement.status === "pending_review"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {agreement.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{agreement.community}</p>
                      <div className="flex flex-wrap gap-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">Agreement ID: </span>
                          <span className="text-foreground font-medium">{agreement.id}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Beneficiaries: </span>
                          <span className="text-foreground font-medium">
                            {agreement.beneficiaries.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Benefit Share: </span>
                          <span className="text-foreground font-medium">{agreement.sharePercentage}%</span>
                        </div>
                        {agreement.signedDate && (
                          <div>
                            <span className="text-muted-foreground">Valid Until: </span>
                            <span className="text-foreground font-medium">{agreement.expiryDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="View Agreement">
                        <Eye size={18} className="text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Download">
                        <Download size={18} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
