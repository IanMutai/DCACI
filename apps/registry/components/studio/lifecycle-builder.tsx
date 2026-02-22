"use client"

import type React from "react"

import { useState } from "react"
import { GripVertical, Plus, X, CheckCircle } from "lucide-react"

interface LifecycleStage {
  id: string
  name: string
  description: string
  confidence: "high" | "medium" | "inferred"
  confirmed: boolean
}

interface LifecycleBuilderProps {
  initialStages: LifecycleStage[]
  onConfirm: (stages: LifecycleStage[]) => void
}

export default function LifecycleBuilder({ initialStages, onConfirm }: LifecycleBuilderProps) {
  const [stages, setStages] = useState<LifecycleStage[]>(initialStages)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newStages = [...stages]
    const draggedStage = newStages[draggedIndex]
    newStages.splice(draggedIndex, 1)
    newStages.splice(index, 0, draggedStage)
    setStages(newStages)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const addStage = () => {
    const newStage: LifecycleStage = {
      id: `stage-${Date.now()}`,
      name: "New Stage",
      description: "Define this stage",
      confidence: "inferred",
      confirmed: false,
    }
    setStages([...stages, newStage])
  }

  const removeStage = (id: string) => {
    setStages(stages.filter((s) => s.id !== id))
  }

  const updateStage = (id: string, updates: Partial<LifecycleStage>) => {
    setStages(stages.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "high":
        return <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">High</span>
      case "medium":
        return <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">Medium</span>
      case "inferred":
        return <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">Inferred</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {/* Visual flow */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center">
            <div
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                stage.confirmed ? "bg-primary text-white" : "bg-muted text-foreground"
              }`}
            >
              {stage.name}
            </div>
            {index < stages.length - 1 && <div className="w-8 h-0.5 bg-border mx-1" />}
          </div>
        ))}
      </div>

      {/* Editable list */}
      <div className="space-y-2">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 p-3 bg-white border rounded-xl transition-all ${
              draggedIndex === index ? "border-primary shadow-lg scale-[1.02]" : "border-border hover:border-primary/30"
            }`}
          >
            <div className="cursor-grab text-muted-foreground hover:text-foreground">
              <GripVertical size={18} />
            </div>

            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
              {index + 1}
            </div>

            <div className="flex-1">
              <input
                type="text"
                value={stage.name}
                onChange={(e) => updateStage(stage.id, { name: e.target.value })}
                className="font-medium text-foreground bg-transparent border-none focus:outline-none focus:ring-0 w-full"
              />
              <input
                type="text"
                value={stage.description}
                onChange={(e) => updateStage(stage.id, { description: e.target.value })}
                className="text-sm text-muted-foreground bg-transparent border-none focus:outline-none focus:ring-0 w-full"
              />
            </div>

            {getConfidenceBadge(stage.confidence)}

            <button
              onClick={() => updateStage(stage.id, { confirmed: !stage.confirmed })}
              className={`p-2 rounded-lg transition-colors ${
                stage.confirmed ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <CheckCircle size={18} />
            </button>

            <button
              onClick={() => removeStage(stage.id)}
              className="p-2 text-muted-foreground hover:text-red-500 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Add stage button */}
      <button
        onClick={addStage}
        className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Stage
      </button>

      {/* Confirm button */}
      <button
        onClick={() => onConfirm(stages)}
        className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
      >
        Confirm Lifecycle ({stages.length} stages)
      </button>
    </div>
  )
}
