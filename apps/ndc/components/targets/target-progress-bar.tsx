"use client";

interface TargetProgressBarProps {
  baselineEmissions: number;
  currentEmissions: number;
  targetEmissions: number;
  baseYear: number;
  targetYear: number;
  label?: string;
  showValues?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function TargetProgressBar({
  baselineEmissions,
  currentEmissions,
  targetEmissions,
  baseYear,
  targetYear,
  label,
  showValues = true,
  size = "md",
}: TargetProgressBarProps) {
  const totalReductionNeeded = baselineEmissions - targetEmissions;
  const reductionAchieved = baselineEmissions - currentEmissions;
  const progressPercent =
    totalReductionNeeded > 0
      ? (reductionAchieved / totalReductionNeeded) * 100
      : 0;

  const clampedProgress = Math.min(Math.max(progressPercent, 0), 100);

  const getStatusColor = () => {
    if (progressPercent >= 75) return "bg-green-500";
    if (progressPercent >= 50) return "bg-blue-500";
    if (progressPercent >= 25) return "bg-amber-500";
    return "bg-red-500";
  };

  const getStatusLabel = () => {
    if (progressPercent >= 75) return "On Track";
    if (progressPercent >= 50) return "Moderate Progress";
    if (progressPercent >= 25) return "Behind Schedule";
    return "Critical";
  };

  const heightClass = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }[size];

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className={`text-xs font-medium ${
            progressPercent >= 50 ? "text-green-600" : "text-amber-600"
          }`}>
            {getStatusLabel()}
          </span>
        </div>
      )}

      {showValues && (
        <div className="flex justify-between text-xs text-[var(--color-text-muted)] mb-1">
          <span>
            Baseline ({baseYear}): {baselineEmissions} MtCO2e
          </span>
          <span>
            Target ({targetYear}): {targetEmissions} MtCO2e
          </span>
        </div>
      )}

      <div className={`w-full bg-gray-100 rounded-full ${heightClass} relative`}>
        <div
          className={`${heightClass} rounded-full transition-all duration-500 ${getStatusColor()}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>

      {showValues && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-[var(--color-text-muted)]">
            Current: {currentEmissions} MtCO2e
          </span>
          <span className="text-xs font-medium">
            {clampedProgress.toFixed(1)}% achieved
          </span>
        </div>
      )}
    </div>
  );
}
