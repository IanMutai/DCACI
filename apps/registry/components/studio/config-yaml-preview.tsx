"use client"

import { useState, useEffect, useRef } from "react"
import { Copy, Check, Download } from "lucide-react"

interface ConfigYamlPreviewProps {
  config: Record<string, unknown>
  isStreaming?: boolean
}

export default function ConfigYamlPreview({ config, isStreaming = false }: ConfigYamlPreviewProps) {
  const [copied, setCopied] = useState(false)
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const yamlString = generateYaml(config)
  const allLines = yamlString.split("\n")

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedLines(allLines)
      return
    }

    setDisplayedLines([])
    let lineIndex = 0

    const interval = setInterval(() => {
      if (lineIndex < allLines.length) {
        setDisplayedLines((prev) => [...prev, allLines[lineIndex]])
        lineIndex++

        // Auto-scroll
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [config, isStreaming])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(yamlString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([yamlString], { type: "text/yaml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "registry-config.yaml"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-sm font-mono text-slate-400">registry-config.yaml</span>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className="p-1.5 text-slate-400 hover:text-white rounded transition-colors">
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          <button onClick={handleDownload} className="p-1.5 text-slate-400 hover:text-white rounded transition-colors">
            <Download size={14} />
          </button>
        </div>
      </div>

      {/* Code */}
      <div ref={containerRef} className="bg-slate-900 p-4 overflow-auto max-h-[400px] font-mono text-sm">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex">
            <span className="w-8 text-slate-600 select-none text-right pr-4">{i + 1}</span>
            <span className={getLineColor(line)}>{line}</span>
          </div>
        ))}
        {isStreaming && displayedLines.length < allLines.length && (
          <div className="flex">
            <span className="w-8 text-slate-600 select-none text-right pr-4">{displayedLines.length + 1}</span>
            <span className="w-2 h-4 bg-primary animate-pulse" />
          </div>
        )}
      </div>
    </div>
  )
}

function generateYaml(config: Record<string, unknown>, indent = 0): string {
  const spaces = "  ".repeat(indent)
  let result = ""

  for (const [key, value] of Object.entries(config)) {
    if (value === null || value === undefined) continue

    if (Array.isArray(value)) {
      result += `${spaces}${key}:\n`
      value.forEach((item) => {
        if (typeof item === "object") {
          result += `${spaces}  -\n`
          result += generateYaml(item as Record<string, unknown>, indent + 2)
        } else {
          result += `${spaces}  - ${item}\n`
        }
      })
    } else if (typeof value === "object") {
      result += `${spaces}${key}:\n`
      result += generateYaml(value as Record<string, unknown>, indent + 1)
    } else if (typeof value === "string") {
      result += `${spaces}${key}: "${value}"\n`
    } else {
      result += `${spaces}${key}: ${value}\n`
    }
  }

  return result
}

function getLineColor(line: string): string {
  if (!line || typeof line !== "string") return "text-slate-300"

  if (line.trim().startsWith("#")) return "text-slate-500"
  if (line.includes(":") && !line.includes('"')) {
    const key = line.split(":")[0]?.trim()
    if (key && !key.startsWith("-")) return "text-teal-400"
  }
  if (line.includes('"')) return "text-amber-300"
  if (line.includes("true") || line.includes("false")) return "text-purple-400"
  if (/\d+/.test(line)) return "text-blue-400"
  return "text-slate-300"
}
