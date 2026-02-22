"use client"

import { useState, useEffect } from "react"
import { PartyPopper, Rocket, ExternalLink, Copy, Check, Github, Mail, Twitter } from "lucide-react"
import confetti from "canvas-confetti"

interface CelebrationModalProps {
  countryName: string
  registryUrl: string
  onClose: () => void
}

export default function CelebrationModal({ countryName, registryUrl, onClose }: CelebrationModalProps) {
  const [copied, setCopied] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const countrySlug = countryName.toLowerCase().replace(/\s+/g, "-")

  useEffect(() => {
    // Trigger confetti
    const duration = 3000
    const end = Date.now() + duration

    const colors = ["#2E7D32", "#FFD700", "#1E88E5", "#E53935"]

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    // Show content with delay
    setTimeout(() => setShowContent(true), 500)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(registryUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ${
          showContent ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Gradient header */}
        <div className="h-32 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0tNC00aC0ydi0yaDJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-bounce">
              <PartyPopper size={40} className="text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Congratulations!</h2>
          <p className="text-muted-foreground mb-6">
            The <span className="font-semibold text-foreground">{countryName} National Carbon Registry</span> is now
            live and published on ARC Cloud.
          </p>

          {/* URL Box */}
          <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-xl mb-6">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Rocket size={16} className="text-emerald-600" />
            </div>
            <code className="flex-1 text-sm text-left font-mono text-foreground truncate">{registryUrl}</code>
            <button onClick={handleCopy} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
              {copied ? (
                <Check size={16} className="text-emerald-600" />
              ) : (
                <Copy size={16} className="text-muted-foreground" />
              )}
            </button>
            <a
              href={`/${countrySlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <ExternalLink size={16} className="text-muted-foreground" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Modules", value: "7" },
              { label: "Roles", value: "4" },
              { label: "Stages", value: "6" },
            ].map((stat, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Next Steps */}
          <div className="text-left mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Next Steps</h3>
            <div className="space-y-2">
              {[
                "Invite team members and assign roles",
                "Configure email notifications",
                "Set up your first project template",
                "Connect to your ministry's SSO (optional)",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                    {i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Share:</span>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Twitter size={18} className="text-[#1DA1F2]" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Mail size={18} className="text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Github size={18} className="text-foreground" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-slate-50 transition-colors"
            >
              Back to Studio
            </button>
            <a
              href={`/${countrySlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              Open Registry
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
