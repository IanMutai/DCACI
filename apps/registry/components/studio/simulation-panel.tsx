"use client"

import type React from "react"

import { useState } from "react"
import { User, Building2, Shield, Users, CheckCircle, Flag, ArrowRight } from "lucide-react"

interface SimulationPanelProps {
  config: Record<string, unknown>
  onFlagIssue: (issue: string) => void
}

type Persona = "proponent" | "dna" | "verifier" | "community"

const personas: Record<Persona, { label: string; icon: React.ElementType; description: string }> = {
  proponent: { label: "Project Proponent", icon: User, description: "Submit and manage carbon projects" },
  dna: { label: "DNA Officer", icon: Building2, description: "Review and authorize projects" },
  verifier: { label: "VVB Auditor", icon: Shield, description: "Validate and verify emissions" },
  community: { label: "Community Rep", icon: Users, description: "Monitor benefit sharing" },
}

export default function SimulationPanel({ config, onFlagIssue }: SimulationPanelProps) {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const [currentScreen, setCurrentScreen] = useState<string>("dashboard")
  const [testedScreens, setTestedScreens] = useState<string[]>([])

  const screens: Record<Persona, Array<{ id: string; label: string; status: "working" | "issue" | "untested" }>> = {
    proponent: [
      { id: "dashboard", label: "My Projects Dashboard", status: "untested" },
      { id: "submit-pcn", label: "Submit PCN Form", status: "untested" },
      { id: "upload-pdd", label: "Upload PDD Documents", status: "untested" },
      { id: "track-status", label: "Track Application Status", status: "untested" },
      { id: "view-credits", label: "View Issued Credits", status: "untested" },
    ],
    dna: [
      { id: "queue", label: "Approval Queue", status: "untested" },
      { id: "review-pcn", label: "Review PCN Submission", status: "untested" },
      { id: "authorize", label: "Article 6 Authorization", status: "untested" },
      { id: "reports", label: "Generate Reports", status: "untested" },
    ],
    verifier: [
      { id: "assignments", label: "Verification Assignments", status: "untested" },
      { id: "validate", label: "Validate Project", status: "untested" },
      { id: "issue-report", label: "Issue Verification Report", status: "untested" },
    ],
    community: [
      { id: "agreements", label: "View Agreements", status: "untested" },
      { id: "benefits", label: "Track Benefit Distribution", status: "untested" },
      { id: "grievance", label: "Submit Grievance", status: "untested" },
    ],
  }

  const handleTestScreen = (screenId: string) => {
    setCurrentScreen(screenId)
    if (!testedScreens.includes(screenId)) {
      setTestedScreens([...testedScreens, screenId])
    }
  }

  const getScreenStatus = (screenId: string) => {
    if (testedScreens.includes(screenId)) return "working"
    return "untested"
  }

  if (!selectedPersona) {
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">Test Drive Your Registry</h3>
          <p className="text-sm text-muted-foreground">Choose a persona to simulate the user experience</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {(Object.entries(personas) as [Persona, (typeof personas)[Persona]][]).map(([key, persona]) => (
            <button
              key={key}
              onClick={() => setSelectedPersona(key)}
              className="p-4 rounded-xl border border-border bg-white hover:border-primary hover:shadow-md transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                <persona.icon size={20} className="text-primary group-hover:text-white" />
              </div>
              <h4 className="font-semibold text-foreground">{persona.label}</h4>
              <p className="text-xs text-muted-foreground mt-1">{persona.description}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const personaScreens = screens[selectedPersona]
  const testedCount = personaScreens.filter((s) => testedScreens.includes(s.id)).length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedPersona(null)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Back
          </button>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            {(() => {
              const PersonaIcon = personas[selectedPersona].icon
              return <PersonaIcon size={16} className="text-primary" />
            })()}
            <span className="font-medium text-foreground">{personas[selectedPersona].label}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {testedCount}/{personaScreens.length} tested
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
          style={{ width: `${(testedCount / personaScreens.length) * 100}%` }}
        />
      </div>

      {/* Screens list */}
      <div className="space-y-2">
        {personaScreens.map((screen) => {
          const status = getScreenStatus(screen.id)
          return (
            <div
              key={screen.id}
              className={`p-3 rounded-lg border transition-all ${
                currentScreen === screen.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-white hover:border-primary/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      status === "working" ? "bg-green-100" : "bg-muted"
                    }`}
                  >
                    {status === "working" ? (
                      <CheckCircle size={14} className="text-green-600" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    )}
                  </div>
                  <span className="font-medium text-sm text-foreground">{screen.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onFlagIssue(screen.label)}
                    className="p-1.5 text-muted-foreground hover:text-amber-500 rounded transition-colors"
                    title="Flag issue"
                  >
                    <Flag size={14} />
                  </button>
                  <button
                    onClick={() => handleTestScreen(screen.id)}
                    className="p-1.5 text-muted-foreground hover:text-primary rounded transition-colors"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mock screen preview */}
      {currentScreen && (
        <div className="rounded-xl border border-border bg-slate-50 p-4">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              arc.registry/{selectedPersona}/{currentScreen}
            </span>
          </div>
          <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">
            <div className="text-center">
              <CheckCircle size={32} className="mx-auto mb-2 text-green-500" />
              <p>Screen renders correctly</p>
              <p className="text-xs">Based on your configuration</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
