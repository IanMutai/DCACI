import Link from "next/link"
import PublicHeader from "@/components/public/public-header"
import PublicFooter from "@/components/public/public-footer"
import { ArrowLeft, ArrowRight, FileText, GitBranch, Users, DollarSign, Download } from "lucide-react"

export default function SampleBlueprintPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to ARC Studio</span>
          </Link>

          <div className="mb-12">
            <h1 className="h2 text-foreground mb-4">Sample Registry Blueprint</h1>
            <p className="text-muted-foreground max-w-2xl">
              This is an example blueprint for a national carbon registry based on Kenya's regulatory framework. Use
              this as a reference when configuring your own registry.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Legal */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Legal Snapshot</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Primary Framework:</span>
                  <p className="text-foreground font-medium">Climate Change Act 2016</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Designated Authority:</span>
                  <p className="text-foreground font-medium">NEMA (Kenya)</p>
                </div>
              </div>
            </div>

            {/* Lifecycle */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <GitBranch size={20} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Project Lifecycle</h3>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {["PCN", "PDD", "Validation", "Registration", "Issuance", "Monitoring"].map((stage, i) => (
                  <div key={stage} className="flex items-center">
                    <span className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg">
                      {stage}
                    </span>
                    {i < 5 && <ArrowRight size={16} className="mx-1 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Roles */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <Users size={20} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Key Roles</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-muted/50 rounded-lg p-3">
                  <span className="font-medium text-foreground">Proponent</span>
                  <p className="text-muted-foreground mt-1">Submits projects</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <span className="font-medium text-foreground">Reviewer</span>
                  <p className="text-muted-foreground mt-1">Technical review</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <span className="font-medium text-foreground">Approver</span>
                  <p className="text-muted-foreground mt-1">Final decisions</p>
                </div>
              </div>
            </div>

            {/* Fees */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <DollarSign size={20} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Fee Structure (KES)</h3>
              </div>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">50K</p>
                  <p className="text-muted-foreground">PCN Review</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">150K</p>
                  <p className="text-muted-foreground">PDD Review</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">200K</p>
                  <p className="text-muted-foreground">Registration</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">100K</p>
                  <p className="text-muted-foreground">Annual</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/studio/workspace" className="btn-primary">
              Start Your Configuration
              <ArrowRight size={18} />
            </Link>
            <button className="btn-secondary">
              <Download size={18} />
              Download Sample JSON
            </button>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
