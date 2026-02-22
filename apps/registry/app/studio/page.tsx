import Link from "next/link"
import { ArrowRight, FileText, GitBranch, Boxes, Sparkles, Shield, Users, Zap, Globe, Play } from "lucide-react"
import ARCLogo from "@/components/arc-logo"

export default function StudioLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ARCLogo size="sm" theme="color" />
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold text-foreground">Studio</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Beta</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back to Portal
            </Link>
            <Link
              href="/studio/workspace"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background effects - lighter colors */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-8">
            <Sparkles size={14} />
            AI-Powered Registry Configuration
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Configure registries</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              at the speed of thought
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Upload your regulations, describe your requirements, and let AI generate a complete carbon registry
            blueprint. From concept to deployment in hours, not months.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/studio/workspace"
              className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105"
            >
              Start Building
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/studio/blueprint/sample"
              className="flex items-center gap-2 px-8 py-4 bg-white border border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-colors shadow-sm"
            >
              <Play size={18} />
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-muted rounded-lg text-xs text-muted-foreground">arc.studio/workspace</div>
              </div>
            </div>

            {/* Preview content */}
            <div className="flex h-[400px]">
              {/* Chat side */}
              <div className="flex-1 p-6 border-r border-border bg-slate-50/50">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <div className="bg-white border border-border rounded-2xl px-4 py-3 max-w-[80%] shadow-sm">
                      <p className="text-sm text-foreground">
                        Welcome to ARC Studio. Which country are you configuring a registry for?
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <Users size={14} className="text-white" />
                    </div>
                    <div className="bg-primary rounded-2xl px-4 py-3 max-w-[80%]">
                      <p className="text-sm text-white">
                        Kenya - I want to set up a national carbon registry with Article 6 support.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <div className="bg-white border border-border rounded-2xl px-4 py-3 max-w-[80%] shadow-sm">
                      <p className="text-sm text-foreground">
                        I&apos;ll configure a registry for Kenya with Article 6.2 and 6.4 support. Let me analyze
                        Kenya&apos;s Climate Change Act 2016...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview side */}
              <div className="w-80 p-4 bg-white">
                <div className="text-xs font-medium text-muted-foreground mb-3">Blueprint Preview</div>
                <div className="space-y-2">
                  {["Legal Framework", "Project Lifecycle", "Roles & Permissions", "Article 6 Settings"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          i < 2 ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            i < 2 ? "bg-primary" : "bg-muted"
                          }`}
                        >
                          {i < 2 && <span className="text-[10px] text-white">&#10003;</span>}
                        </div>
                        <span className={`text-sm ${i < 2 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                          {item}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">How it works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to configure a complete carbon registry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                step: "01",
                title: "Ingest Regulations",
                description:
                  "Upload your country's climate laws, NDC commitments, and policy documents. Our AI extracts key requirements automatically.",
              },
              {
                icon: GitBranch,
                step: "02",
                title: "Configure Workflows",
                description:
                  "Define project lifecycle stages, approval workflows, and stakeholder permissions through natural conversation.",
              },
              {
                icon: Boxes,
                step: "03",
                title: "Deploy Blueprint",
                description:
                  "Export a complete registry configuration as JSON, ready for deployment to ARC infrastructure.",
              },
            ].map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-px bg-gradient-to-b from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-2xl border border-border bg-white h-full shadow-sm">
                  <div className="text-5xl font-bold text-muted/30 mb-4">{feature.step}</div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "Secure by Design" },
              { icon: Globe, label: "Article 6 Ready" },
              { icon: Zap, label: "Fast Deployment" },
              { icon: Users, label: "Role-Based Access" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white border border-border shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon size={20} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-center text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ready to configure your registry?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join governments across Africa using AI to accelerate their carbon registry deployment.
          </p>
          <Link
            href="/studio/workspace"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105"
          >
            Launch ARC Studio
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ARCLogo size="sm" theme="color" />
            <span className="text-sm text-muted-foreground">ARC Studio</span>
          </div>
          <p className="text-sm text-muted-foreground">Built for Africa&apos;s climate future</p>
        </div>
      </footer>
    </div>
  )
}
