"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Send,
  Paperclip,
  FileText,
  GitBranch,
  Users,
  Globe,
  DollarSign,
  Heart,
  ShieldCheck,
  Bot,
  User,
  Sparkles,
  Command,
  Download,
  Rocket,
} from "lucide-react"
import ARCLogo from "@/components/arc-logo"
import ThinkingIndicator from "@/components/studio/thinking-indicator"
import StreamingText from "@/components/studio/streaming-text"
import DocumentUpload from "@/components/studio/document-upload"
import RegulationMap from "@/components/studio/regulation-map"
import LifecycleBuilder from "@/components/studio/lifecycle-builder"
import RolesMatrix from "@/components/studio/roles-matrix"
import ConfigYamlPreview from "@/components/studio/config-yaml-preview"
import SimulationPanel from "@/components/studio/simulation-panel"
import DeploymentTerminal from "@/components/studio/deployment-terminal"
import RegistryPreview from "@/components/studio/registry-preview"
import CelebrationModal from "@/components/studio/celebration-modal"

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
  timestamp: Date
  isStreaming?: boolean
  component?: React.ReactNode
}

interface BlueprintSection {
  id: string
  title: string
  icon: React.ElementType
  status: "pending" | "generating" | "complete"
  summary?: string
  data?: Record<string, unknown>
}

type WorkflowStage =
  | "start"
  | "upload"
  | "analyze"
  | "lifecycle"
  | "roles"
  | "article6"
  | "fees"
  | "community"
  | "verification"
  | "simulate"
  | "deploy"
  | "complete"

export default function StudioWorkspacePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [thinkingStage, setThinkingStage] = useState<"analyzing" | "reasoning" | "generating" | "finalizing">(
    "analyzing",
  )
  const [workflowStage, setWorkflowStage] = useState<WorkflowStage>("start")
  const [countryName, setCountryName] = useState("")
  const [showUpload, setShowUpload] = useState(false)
  const [showRegulationMap, setShowRegulationMap] = useState(false)
  const [showLifecycleBuilder, setShowLifecycleBuilder] = useState(false)
  const [showRolesMatrix, setShowRolesMatrix] = useState(false)
  const [showSimulation, setShowSimulation] = useState(false)
  const [showDeployment, setShowDeployment] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [isYamlStreaming, setIsYamlStreaming] = useState(false)

  const [blueprintSections, setBlueprintSections] = useState<BlueprintSection[]>([
    { id: "legal", title: "Legal Framework", icon: FileText, status: "pending" },
    { id: "lifecycle", title: "Project Lifecycle", icon: GitBranch, status: "pending" },
    { id: "roles", title: "Roles & Permissions", icon: Users, status: "pending" },
    { id: "article6", title: "Article 6 Settings", icon: Globe, status: "pending" },
    { id: "fees", title: "Fee Structure", icon: DollarSign, status: "pending" },
    { id: "community", title: "Community Benefits", icon: Heart, status: "pending" },
    { id: "verification", title: "Verification Rules", icon: ShieldCheck, status: "pending" },
  ])

  const [registryConfig, setRegistryConfig] = useState<Record<string, unknown>>({
    version: "1.0.0",
    status: "draft",
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  // Initial message
  useEffect(() => {
    const initialMessage: Message = {
      id: "1",
      role: "assistant",
      content:
        "Welcome to ARC Studio. I'm your AI copilot for configuring national carbon registries.\n\nTo begin, tell me which country you're configuring this registry for.",
      timestamp: new Date(),
      isStreaming: true,
    }
    setMessages([initialMessage])
    setTimeout(() => {
      setMessages((prev) => prev.map((m) => ({ ...m, isStreaming: false })))
    }, 2000)
  }, [])

  const addAssistantMessage = async (content: string, component?: React.ReactNode) => {
    setIsThinking(true)
    setThinkingStage("analyzing")

    await new Promise((resolve) => setTimeout(resolve, 800))
    setThinkingStage("reasoning")
    await new Promise((resolve) => setTimeout(resolve, 600))
    setThinkingStage("generating")
    await new Promise((resolve) => setTimeout(resolve, 500))
    setThinkingStage("finalizing")
    await new Promise((resolve) => setTimeout(resolve, 400))

    setIsThinking(false)

    const message: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content,
      timestamp: new Date(),
      isStreaming: true,
      component,
    }
    setMessages((prev) => [...prev, message])

    setTimeout(() => {
      setMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, isStreaming: false } : m)))
    }, content.length * 12)
  }

  const updateSection = (
    sectionId: string,
    status: BlueprintSection["status"],
    summary?: string,
    data?: Record<string, unknown>,
  ) => {
    setBlueprintSections((prev) => prev.map((s) => (s.id === sectionId ? { ...s, status, summary, data } : s)))
    if (data) {
      setRegistryConfig((prev) => ({ ...prev, [sectionId]: data }))
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isThinking) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    const userInput = input.toLowerCase()
    setInput("")

    // Handle based on workflow stage
    if (workflowStage === "start") {
      // Extract country name
      const country = input.trim()
      setCountryName(country)
      setRegistryConfig((prev) => ({ ...prev, country }))
      setWorkflowStage("upload")

      await addAssistantMessage(
        `Excellent! I'll configure a carbon registry for ${country}.\n\nLet's start by ingesting your regulatory documents. Upload your:\n\n• Climate Change Act / Regulations\n• Project Cycle Guidelines\n• Article 6 Policy Documents\n\nOr click "Use Templates" to start with standard African carbon registry templates.`,
      )
      setShowUpload(true)
    } else if (userInput.includes("template") || userInput.includes("standard") || userInput.includes("skip")) {
      handleUseTemplates()
    } else if (
      userInput.includes("yes") ||
      userInput.includes("proceed") ||
      userInput.includes("confirm") ||
      userInput.includes("deploy")
    ) {
      if (workflowStage === "lifecycle") {
        handleConfirmLifecycle()
      } else if (workflowStage === "roles") {
        handleProceedToArticle6()
      } else if (workflowStage === "article6") {
        handleProceedToFees()
      } else if (workflowStage === "fees") {
        handleProceedToCommunity()
      } else if (workflowStage === "community") {
        handleProceedToVerification()
      } else if (workflowStage === "verification") {
        handleStartSimulation()
      } else if (workflowStage === "simulate") {
        handleStartDeployment()
      }
    } else {
      // Default contextual response
      await addAssistantMessage(
        "I understand. Let me help you with that.\n\nBased on your current progress, you can:\n\n• Continue configuring the remaining sections\n• Review what we've set up so far\n• Ask questions about any specific aspect\n\nWhat would you like to focus on?",
      )
    }
  }

  const handleDocumentsReady = async () => {
    setShowUpload(false)
    setShowRegulationMap(true)
    setWorkflowStage("analyze")

    updateSection("legal", "generating")

    await addAssistantMessage(
      `Ingesting documents...\n\nI'm scanning for key concepts: project stages, roles, fees, Article 6 provisions, community benefit-sharing requirements...`,
    )
  }

  const handleUseTemplates = async () => {
    setShowUpload(false)
    setWorkflowStage("analyze")

    updateSection("legal", "generating")

    await addAssistantMessage(
      `Loading standard African carbon registry templates for ${countryName}...\n\nI'll base this on best practices from Kenya, Rwanda, and Ghana's carbon registries, adapted for your context.`,
    )

    setShowRegulationMap(true)
  }

  const handleRegulationMapComplete = async () => {
    updateSection("legal", "complete", "Regulatory framework analyzed", {
      framework: "standard",
      parisAligned: true,
      ndcCompatible: true,
    })

    setShowRegulationMap(false)
    setWorkflowStage("lifecycle")

    await addAssistantMessage(
      `Here's how your project cycle appears from the analysis:\n\n→ Projects start with a **Project Concept Note (PCN)**\n→ After approval, a **Project Design Document (PDD)** is prepared\n→ The project undergoes **Validation** by accredited verifiers\n→ Upon validation, the project is **Registered**\n→ Credits are **Issued** based on verified emissions reductions\n→ Ongoing **Monitoring** ensures continued compliance\n\nDoes this match how ${countryName} intends to run its project cycle?`,
    )

    setShowLifecycleBuilder(true)
  }

  const handleConfirmLifecycle = async () => {
    updateSection("lifecycle", "complete", "6-stage workflow", {
      stages: ["PCN", "PDD", "Validation", "Registration", "Issuance", "Monitoring"],
    })

    setShowLifecycleBuilder(false)
    setWorkflowStage("roles")

    await addAssistantMessage(
      `From your documents, I identified these key actors:\n\n• **Project Proponent** - Develops and submits projects\n• **National Environment Authority** - Technical review\n• **Designated National Authority (DNA)** - Approvals & authorization\n• **Accredited Verifiers** - Third-party validation\n\nLet's map who does what at each stage.`,
    )

    setShowRolesMatrix(true)
  }

  const handleRolesSaved = async () => {
    updateSection("roles", "complete", "4 roles configured", {
      roles: ["Proponent", "NEA", "DNA", "Verifier"],
    })

    setShowRolesMatrix(false)
    setWorkflowStage("article6")

    await addAssistantMessage(
      `Now let's configure **Article 6 Settings**.\n\nBased on standard provisions, I recommend:\n\n✓ Enable Article 6.2 bilateral agreements\n✓ Enable Article 6.4 mechanism\n✓ Require authorization before ITMO transfer\n✓ Automatic corresponding adjustment tracking\n\nShall I apply these settings?`,
    )
  }

  const handleProceedToArticle6 = async () => {
    handleRolesSaved()
  }

  const handleProceedToFees = async () => {
    updateSection("article6", "complete", "Art 6.2, 6.4 enabled", {
      article62: true,
      article64: true,
      authorizationTiming: "before_transfer",
      correspondingAdjustment: "automatic",
    })

    setWorkflowStage("fees")

    await addAssistantMessage(
      `Article 6 configuration saved.\n\nNow for the **Fee Structure**. I propose:\n\n| Stage | Fee Type | Amount |\n|-------|----------|--------|\n| PCN Application | Flat | 500,000 ${countryName === "Uganda" ? "UGX" : "Local Currency"} |\n| Issuance | Per-credit | 0.03 USD/tCO₂e |\n| Annual Monitoring | Tiered | Based on project size |\n\n10% of issuance fees flow to National Climate Fund.\n\nProceed with this fee structure?`,
    )
  }

  const handleProceedToCommunity = async () => {
    updateSection("fees", "complete", "Hybrid fee model", {
      pcnFee: 500000,
      issuanceRate: 0.03,
      climateFundShare: 10,
    })

    setWorkflowStage("community")

    await addAssistantMessage(
      `Fee structure configured.\n\nFor **Community Benefit-Sharing**:\n\n✓ Agreements registered at project registration\n✓ Minimum 5% benefit share to local communities\n✓ FPIC (Free, Prior, Informed Consent) required\n✓ Grievance mechanism mandatory\n✓ Quarterly distribution reports\n\nEnable these community safeguards?`,
    )
  }

  const handleProceedToVerification = async () => {
    updateSection("community", "complete", "FPIC + 5% benefit share", {
      fpic: true,
      benefitShare: 5,
      grievanceMechanism: true,
    })

    setWorkflowStage("verification")

    await addAssistantMessage(
      `Community protections enabled.\n\nFinal section: **Verification Rules**\n\n✓ ISO 14064-3 verification framework\n✓ VVB must be internationally accredited\n✓ 5-year verification cycle\n✓ Verra VCS methodology compatibility\n\nApply these verification standards?`,
    )
  }

  const handleStartSimulation = async () => {
    updateSection("verification", "complete", "ISO 14064-3 + VCS", {
      standard: "ISO 14064-3",
      cycle: 5,
      compatibility: ["VCS", "Gold Standard"],
    })

    setWorkflowStage("simulate")
    setIsYamlStreaming(true)

    await addAssistantMessage(
      `**Blueprint Complete!** All 7 sections configured.\n\nI'm now compiling your registry specification...\n\nReady to test drive your registry with the simulation, or type "deploy" to launch it now!`,
    )

    setTimeout(() => setIsYamlStreaming(false), 3000)
    setShowSimulation(true)
  }

  const handleStartDeployment = async () => {
    setShowSimulation(false)
    setWorkflowStage("deploy")

    await addAssistantMessage(
      `Initiating deployment sequence for **${countryName} National Carbon Registry**...\n\nThis will:\n• Create production infrastructure on ARC Cloud\n• Deploy all configured modules\n• Set up DNS and SSL certificates\n• Run health checks\n\nDeployment in progress...`,
    )

    setShowDeployment(true)
  }

  const handleDeploymentComplete = () => {
    setShowDeployment(false)
    setShowPreview(true)
    // Don't automatically show celebration - let user click the complete button
  }

  const handlePreviewComplete = () => {
    setShowCelebration(true)
  }

  const handleFlagIssue = async (screen: string) => {
    await addAssistantMessage(
      `I've noted the issue with "${screen}".\n\nWould you like to:\n• Adjust role permissions for this screen\n• Hide specific fields\n• Add validation rules\n\nDescribe the change you'd like to make.`,
    )
  }

  const completedCount = blueprintSections.filter((s) => s.status === "complete").length
  const registryUrl = `https://${countryName.toLowerCase().replace(/\s+/g, "")}.arc.earth`

  return (
    <div className="h-screen flex flex-col bg-slate-50 text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-white">
        <div className="flex items-center gap-4">
          <Link
            href="/studio"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back</span>
          </Link>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2">
            <ARCLogo size="sm" theme="color" />
            <span className="font-semibold text-foreground">Studio</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Beta</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${i < completedCount ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
            <span>{completedCount}/7</span>
          </div>
          {completedCount === 7 && workflowStage !== "complete" && (
            <button
              onClick={handleStartDeployment}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-all"
            >
              <Rocket size={14} />
              Deploy Registry
            </button>
          )}
          {workflowStage === "complete" && (
            <a
              href={registryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition-all"
            >
              <Globe size={14} />
              View Live Registry
            </a>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat panel */}
        <div className="flex-1 flex flex-col border-r border-border bg-white">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-sm">ARC Copilot</h2>
              <p className="text-xs text-muted-foreground">AI configuration assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.role === "assistant" ? "bg-gradient-to-br from-primary to-primary/70" : "bg-accent"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot size={14} className="text-white" />
                  ) : (
                    <User size={14} className="text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "assistant" ? "bg-white border border-border shadow-sm" : "bg-primary text-white"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.isStreaming ? <StreamingText text={message.content} speed={12} /> : message.content}
                  </div>
                  {message.component}
                </div>
              </div>
            ))}

            {/* Interactive components */}
            {showUpload && (
              <div className="max-w-[80%] ml-11">
                <DocumentUpload onDocumentsReady={handleDocumentsReady} />
                <button
                  onClick={handleUseTemplates}
                  className="mt-3 w-full py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                >
                  Use Standard Templates Instead
                </button>
              </div>
            )}

            {showRegulationMap && (
              <div className="max-w-[90%] ml-11">
                <RegulationMap isAnalyzing={true} onComplete={handleRegulationMapComplete} />
              </div>
            )}

            {showLifecycleBuilder && (
              <div className="max-w-[90%] ml-11">
                <LifecycleBuilder
                  initialStages={[
                    {
                      id: "pcn",
                      name: "PCN",
                      description: "Project Concept Note submission",
                      confidence: "high",
                      confirmed: false,
                    },
                    {
                      id: "pdd",
                      name: "PDD",
                      description: "Project Design Document preparation",
                      confidence: "high",
                      confirmed: false,
                    },
                    {
                      id: "validation",
                      name: "Validation",
                      description: "Third-party validation",
                      confidence: "medium",
                      confirmed: false,
                    },
                    {
                      id: "registration",
                      name: "Registration",
                      description: "Official project registration",
                      confidence: "high",
                      confirmed: false,
                    },
                    {
                      id: "issuance",
                      name: "Issuance",
                      description: "Carbon credit issuance",
                      confidence: "high",
                      confirmed: false,
                    },
                    {
                      id: "monitoring",
                      name: "Monitoring",
                      description: "Ongoing monitoring & verification",
                      confidence: "medium",
                      confirmed: false,
                    },
                  ]}
                  onConfirm={handleConfirmLifecycle}
                />
              </div>
            )}

            {showRolesMatrix && (
              <div className="max-w-[95%] ml-11">
                <RolesMatrix
                  roles={[
                    { id: "proponent", name: "Project Proponent", description: "Develops and submits projects" },
                    { id: "nea", name: "Environment Authority", description: "Technical review and oversight" },
                    { id: "dna", name: "DNA Official", description: "National authority approvals" },
                    { id: "verifier", name: "VVB Auditor", description: "Third-party verification" },
                  ]}
                  stages={["PCN", "PDD", "Validation", "Registration", "Issuance", "Monitoring"]}
                  initialPermissions={[
                    { roleId: "proponent", stageId: "PCN", type: "submitter" },
                    { roleId: "nea", stageId: "PCN", type: "reviewer" },
                    { roleId: "dna", stageId: "PCN", type: "approver" },
                    { roleId: "proponent", stageId: "PDD", type: "submitter" },
                    { roleId: "verifier", stageId: "Validation", type: "approver" },
                    { roleId: "dna", stageId: "Registration", type: "approver" },
                    { roleId: "dna", stageId: "Issuance", type: "approver" },
                  ]}
                  onSave={handleRolesSaved}
                />
              </div>
            )}

            {showSimulation && (
              <div className="max-w-[90%] ml-11">
                <SimulationPanel config={registryConfig} onFlagIssue={handleFlagIssue} />
                <button
                  onClick={handleStartDeployment}
                  className="mt-4 w-full py-3 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <Rocket size={16} />
                  Deploy to Production
                </button>
              </div>
            )}

            {showDeployment && (
              <div className="max-w-[95%] ml-11">
                <DeploymentTerminal countryName={countryName} onComplete={handleDeploymentComplete} />
              </div>
            )}

            {showPreview && (
              <div className="max-w-[95%] ml-11">
                <RegistryPreview countryName={countryName} config={registryConfig} onComplete={handlePreviewComplete} />
              </div>
            )}

            {isThinking && <ThinkingIndicator stage={thinkingStage} />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-border bg-white">
            <div className="flex items-end gap-2 p-2 rounded-xl bg-slate-50 border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
                <Paperclip size={18} />
              </button>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Describe your registry requirements..."
                className="flex-1 bg-transparent resize-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[40px] max-h-[120px] py-2"
                rows={1}
                disabled={isThinking}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="p-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1">
              <p className="text-xs text-muted-foreground">
                <Command size={10} className="inline mr-1" />
                Press Enter to send
              </p>
              <p className="text-xs text-muted-foreground">Shift + Enter for new line</p>
            </div>
          </div>
        </div>

        {/* Preview panel */}
        <div className="w-[450px] flex flex-col bg-white overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Live Configuration</h3>
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-muted-foreground hover:text-foreground rounded transition-colors">
                <Download size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <ConfigYamlPreview config={registryConfig} isStreaming={isYamlStreaming} />
          </div>

          {/* Section status */}
          <div className="p-4 border-t border-border bg-slate-50">
            <div className="grid grid-cols-4 gap-2">
              {blueprintSections.slice(0, 4).map((section) => (
                <div
                  key={section.id}
                  className={`p-2 rounded-lg text-center ${
                    section.status === "complete" ? "bg-primary/10" : "bg-muted/50"
                  }`}
                >
                  <section.icon
                    size={16}
                    className={`mx-auto ${section.status === "complete" ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <p className="text-[10px] text-muted-foreground mt-1 truncate">{section.title.split(" ")[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebration && (
        <CelebrationModal
          countryName={countryName}
          registryUrl={registryUrl}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  )
}
