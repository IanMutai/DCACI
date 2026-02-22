"use client"

import { useState, useEffect, useRef } from "react"
import { Terminal, CheckCircle2, Circle, Loader2 } from "lucide-react"

interface DeploymentStep {
  id: string
  label: string
  command?: string
  status: "pending" | "running" | "complete" | "error"
  output?: string[]
  duration?: number
}

interface DeploymentTerminalProps {
  countryName: string
  onComplete: () => void
}

export default function DeploymentTerminal({ countryName, onComplete }: DeploymentTerminalProps) {
  const [steps, setSteps] = useState<DeploymentStep[]>([
    { id: "init", label: "Initializing deployment", command: "arc init --production", status: "pending" },
    { id: "validate", label: "Validating configuration", command: "arc validate config.yaml", status: "pending" },
    {
      id: "compile",
      label: "Compiling registry modules",
      command: "arc compile --target=production",
      status: "pending",
    },
    {
      id: "git",
      label: "Pushing to ARC Cloud",
      command: `git push arc-cloud main:${countryName.toLowerCase().replace(/\s+/g, "-")}-registry`,
      status: "pending",
    },
    {
      id: "provision",
      label: "Provisioning infrastructure",
      command: "arc provision --region=africa-east",
      status: "pending",
    },
    { id: "migrate", label: "Running database migrations", command: "arc db:migrate --seed", status: "pending" },
    { id: "deploy", label: "Deploying application", command: "arc deploy --env=production", status: "pending" },
    {
      id: "dns",
      label: "Configuring DNS",
      command: `arc dns:setup ${countryName.toLowerCase().replace(/\s+/g, "")}.arc.earth`,
      status: "pending",
    },
    { id: "ssl", label: "Issuing SSL certificate", command: "arc ssl:issue --provider=letsencrypt", status: "pending" },
    { id: "verify", label: "Running health checks", command: "arc health:check --all", status: "pending" },
  ])
  const [currentLine, setCurrentLine] = useState("")
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "ARC Cloud Deployment System v2.4.0",
    "────────────────────────────────────────────",
    `Target: ${countryName} National Carbon Registry`,
    "Environment: Production",
    "",
  ])
  const [isComplete, setIsComplete] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    runDeployment()
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  const addLine = (line: string) => {
    setTerminalLines((prev) => [...prev, line])
  }

  const typeCommand = async (command: string) => {
    setCurrentLine("$ ")
    for (let i = 0; i < command.length; i++) {
      await new Promise((r) => setTimeout(r, 15 + Math.random() * 25))
      setCurrentLine((prev) => prev + command[i])
    }
    await new Promise((r) => setTimeout(r, 100))
    addLine("$ " + command)
    setCurrentLine("")
  }

  const runDeployment = async () => {
    await new Promise((r) => setTimeout(r, 500))

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]

      // Update step to running
      setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, status: "running" } : s)))

      // Type command
      if (step.command) {
        await typeCommand(step.command)
      }

      // Simulate output based on step
      const outputs = getStepOutputs(step.id, countryName)
      for (const output of outputs) {
        await new Promise((r) => setTimeout(r, 80 + Math.random() * 120))
        addLine(output)
      }

      // Mark complete
      setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, status: "complete" } : s)))
      await new Promise((r) => setTimeout(r, 300))
    }

    addLine("")
    addLine("════════════════════════════════════════════")
    addLine("✓ Deployment successful!")
    addLine(`✓ Registry URL: https://${countryName.toLowerCase().replace(/\s+/g, "")}.arc.earth`)
    addLine("════════════════════════════════════════════")

    setIsComplete(true)
    setTimeout(onComplete, 1500)
  }

  const getStepOutputs = (stepId: string, country: string): string[] => {
    const countrySlug = country.toLowerCase().replace(/\s+/g, "-")
    switch (stepId) {
      case "init":
        return [
          "→ Loading deployment configuration...",
          "→ Authenticating with ARC Cloud...",
          "✓ Session established: arc-prod-session-x8k2m",
        ]
      case "validate":
        return [
          "→ Checking schema version...",
          "→ Validating lifecycle stages... 6 stages ✓",
          "→ Validating roles & permissions... 4 roles ✓",
          "→ Validating Article 6 settings... enabled ✓",
          "→ Validating fee structure... valid ✓",
          "✓ Configuration valid (0 errors, 0 warnings)",
        ]
      case "compile":
        return [
          "→ Compiling ProjectLifecycle module...",
          "→ Compiling RolesPermissions module...",
          "→ Compiling Article6Integration module...",
          "→ Compiling FeeCalculation module...",
          "→ Compiling CommunityBenefits module...",
          "→ Compiling VerificationEngine module...",
          "→ Bundling assets (2.4 MB)...",
          "✓ Compilation complete in 3.2s",
        ]
      case "git":
        return [
          `Enumerating objects: 847, done.`,
          `Counting objects: 100% (847/847), done.`,
          `Delta compression using up to 8 threads`,
          `Compressing objects: 100% (612/612), done.`,
          `Writing objects: 100% (847/847), 2.41 MiB | 12.3 MiB/s, done.`,
          `remote: Resolving deltas: 100% (234/234), done.`,
          `To arc-cloud:registries/${countrySlug}.git`,
          ` * [new branch]      main -> ${countrySlug}-registry`,
          "✓ Pushed to ARC Cloud repository",
        ]
      case "provision":
        return [
          "→ Allocating compute resources...",
          "→ Region: africa-east-1 (Nairobi)",
          "→ Instance type: arc.registry.medium",
          "→ Creating PostgreSQL cluster...",
          "→ Creating Redis cache...",
          "→ Creating object storage bucket...",
          "✓ Infrastructure provisioned",
        ]
      case "migrate":
        return [
          "→ Connecting to database...",
          "→ Running migration: 001_create_projects_table",
          "→ Running migration: 002_create_credits_table",
          "→ Running migration: 003_create_verifications_table",
          "→ Running migration: 004_create_transactions_table",
          "→ Running migration: 005_create_article6_tables",
          "→ Seeding lookup data...",
          "✓ Database ready (6 migrations, 12 tables)",
        ]
      case "deploy":
        return [
          "→ Building Docker image...",
          "→ Pushing to container registry...",
          "→ Deploying to Kubernetes cluster...",
          "→ Starting 3 replicas...",
          "→ Waiting for pods to be ready...",
          "  Pod arc-registry-7d8f9b6c4-2xk8m: Running",
          "  Pod arc-registry-7d8f9b6c4-9pq3n: Running",
          "  Pod arc-registry-7d8f9b6c4-4wj7v: Running",
          "✓ Application deployed successfully",
        ]
      case "dns":
        return [
          `→ Creating DNS record: ${country.toLowerCase().replace(/\s+/g, "")}.arc.earth`,
          "→ Configuring load balancer...",
          "→ Setting up CDN endpoints...",
          "→ Propagating DNS (this may take a moment)...",
          "✓ DNS configured",
        ]
      case "ssl":
        return [
          "→ Requesting certificate from Let's Encrypt...",
          "→ Validating domain ownership...",
          "→ Certificate issued: valid until 2026-11-30",
          "→ Installing certificate...",
          "✓ HTTPS enabled",
        ]
      case "verify":
        return [
          "→ Checking API health... 200 OK",
          "→ Checking database connection... OK",
          "→ Checking cache connection... OK",
          "→ Checking storage access... OK",
          "→ Running smoke tests...",
          "  Test: Create project draft... PASS",
          "  Test: Submit PCN... PASS",
          "  Test: Calculate fees... PASS",
          "✓ All health checks passed (4/4)",
        ]
      default:
        return ["✓ Complete"]
    }
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-[#1a1a2e] shadow-2xl">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#16162a] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-white/60 text-xs ml-2 font-mono">
            arc-deploy — {countryName.toLowerCase().replace(/\s+/g, "-")}-registry
          </span>
        </div>
        <Terminal size={14} className="text-white/40" />
      </div>

      {/* Terminal content */}
      <div className="flex">
        {/* Steps sidebar */}
        <div className="w-56 p-3 border-r border-white/10 bg-[#16162a]/50">
          <p className="text-[10px] uppercase tracking-wider text-white/40 mb-3 font-medium">Deployment Steps</p>
          <div className="space-y-1.5">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2">
                {step.status === "pending" && <Circle size={12} className="text-white/20" />}
                {step.status === "running" && <Loader2 size={12} className="text-cyan-400 animate-spin" />}
                {step.status === "complete" && <CheckCircle2 size={12} className="text-emerald-400" />}
                {step.status === "error" && <Circle size={12} className="text-red-400" />}
                <span
                  className={`text-xs font-mono ${
                    step.status === "running"
                      ? "text-cyan-400"
                      : step.status === "complete"
                        ? "text-white/80"
                        : "text-white/40"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal output */}
        <div ref={terminalRef} className="flex-1 p-4 h-[350px] overflow-y-auto font-mono text-xs leading-relaxed">
          {terminalLines.map((line, i) => (
            <div
              key={i}
              className={`${
                line.startsWith("✓")
                  ? "text-emerald-400"
                  : line.startsWith("→")
                    ? "text-cyan-400"
                    : line.startsWith("$")
                      ? "text-yellow-400"
                      : line.includes("PASS")
                        ? "text-emerald-400"
                        : line.includes("error") || line.includes("Error")
                          ? "text-red-400"
                          : line.startsWith("═") || line.startsWith("─")
                            ? "text-white/60"
                            : "text-white/80"
              }`}
            >
              {line}
            </div>
          ))}
          {currentLine && (
            <div className="text-yellow-400">
              {currentLine}
              <span className="animate-pulse">▊</span>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#16162a] border-t border-white/10 text-[10px] text-white/50 font-mono">
        <span>Region: africa-east-1</span>
        <span>
          {steps.filter((s) => s.status === "complete").length}/{steps.length} steps
        </span>
        <span>{isComplete ? "✓ Deployed" : "Deploying..."}</span>
      </div>
    </div>
  )
}
