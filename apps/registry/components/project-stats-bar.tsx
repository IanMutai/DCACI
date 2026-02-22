"use client"

import { TrendingDown, Zap, Clock, DollarSign, Pencil, Eye } from "lucide-react"

interface ProjectStatsBarProps {
  emissionReduction: string
  annualGeneration: string
  creditingPeriod: string
  projectedRevenue: string
  revenueLabel?: string
  onEdit?: () => void
  onView?: () => void
}

export default function ProjectStatsBar({
  emissionReduction,
  annualGeneration,
  creditingPeriod,
  projectedRevenue,
  revenueLabel = "Projected Revenue",
  onEdit,
  onView,
}: ProjectStatsBarProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Emission Reduction */}
      <div className="flex items-center gap-3 bg-card px-5 py-4 rounded-xl border border-border shadow-sm">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <TrendingDown size={20} className="text-primary" />
        </div>
        <div>
          <div className="text-lg font-serif font-medium text-foreground">{emissionReduction}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Avg. Annual Emission Reduction
          </div>
        </div>
      </div>

      {/* Annual Generation */}
      <div className="flex items-center gap-3 bg-card px-5 py-4 rounded-xl border border-border shadow-sm">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Zap size={20} className="text-accent" />
        </div>
        <div>
          <div className="text-lg font-serif font-medium text-foreground">{annualGeneration}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Annual Generation</div>
        </div>
      </div>

      {/* Crediting Period */}
      <div className="flex items-center gap-3 bg-card px-5 py-4 rounded-xl border border-border shadow-sm">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Clock size={20} className="text-success" />
        </div>
        <div>
          <div className="text-lg font-serif font-medium text-foreground">{creditingPeriod}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Crediting Period</div>
        </div>
      </div>

      {/* Projected Revenue / Finance Raised */}
      <div className="flex items-center gap-3 bg-primary/5 px-5 py-4 rounded-xl border border-primary/20 shadow-sm">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <DollarSign size={20} className="text-primary" />
        </div>
        <div>
          <div className="text-lg font-serif font-medium text-foreground">{projectedRevenue}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{revenueLabel}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 ml-auto">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-3 text-primary hover:bg-primary/10 rounded-xl border border-border bg-card transition-all hover:border-primary/30"
        >
          <Pencil size={16} />
          <span className="text-sm font-medium">Edit</span>
        </button>
        <button
          onClick={onView}
          className="flex items-center gap-2 px-4 py-3 text-primary hover:bg-primary/10 rounded-xl border border-border bg-card transition-all hover:border-primary/30"
        >
          <Eye size={16} />
          <span className="text-sm font-medium">View</span>
        </button>
      </div>
    </div>
  )
}
