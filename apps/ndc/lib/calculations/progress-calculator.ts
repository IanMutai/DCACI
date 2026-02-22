/**
 * Progress Calculator
 *
 * Calculates progress toward NDC targets including percentage completion,
 * on-track status, and estimated time to achieve targets.
 */

export interface TargetParams {
  baselineEmissions: number;
  currentEmissions: number;
  targetEmissions: number;
  baseYear: number;
  targetYear: number;
  currentYear: number;
}

export interface ProgressResult {
  /** Percentage of the reduction target achieved (0-100+) */
  progressPercent: number;
  /** Absolute emissions reduced from baseline */
  absoluteReduction: number;
  /** Remaining emissions gap to target */
  remainingGap: number;
  /** Whether the current trajectory is on track to meet the target */
  onTrack: boolean;
  /** Estimated year of target achievement at current rate, or null if not achievable */
  estimatedAchievementYear: number | null;
  /** Annual reduction rate needed to meet target */
  requiredAnnualReduction: number;
  /** Current annual reduction rate based on historical data */
  currentAnnualReduction: number;
  /** Status classification */
  status: "on-track" | "at-risk" | "off-track" | "achieved";
}

/**
 * Calculate progress toward a specific NDC target
 */
export function calculateProgress(params: TargetParams): ProgressResult {
  const {
    baselineEmissions,
    currentEmissions,
    targetEmissions,
    baseYear,
    targetYear,
    currentYear,
  } = params;

  const totalReductionNeeded = baselineEmissions - targetEmissions;
  const reductionAchieved = baselineEmissions - currentEmissions;
  const remainingGap = currentEmissions - targetEmissions;

  // Progress percentage
  const progressPercent =
    totalReductionNeeded > 0
      ? (reductionAchieved / totalReductionNeeded) * 100
      : 0;

  // Time-based calculations
  const yearsElapsed = currentYear - baseYear;
  const yearsRemaining = targetYear - currentYear;
  const totalYears = targetYear - baseYear;

  // Expected progress at this point in time (linear)
  const expectedProgressPercent =
    totalYears > 0 ? (yearsElapsed / totalYears) * 100 : 100;

  // Current annual reduction rate
  const currentAnnualReduction =
    yearsElapsed > 0 ? reductionAchieved / yearsElapsed : 0;

  // Required annual reduction to meet target
  const requiredAnnualReduction =
    yearsRemaining > 0 ? remainingGap / yearsRemaining : remainingGap;

  // Estimated achievement year
  let estimatedAchievementYear: number | null = null;
  if (currentAnnualReduction > 0 && remainingGap > 0) {
    const yearsToTarget = remainingGap / currentAnnualReduction;
    estimatedAchievementYear = Math.ceil(currentYear + yearsToTarget);
  } else if (remainingGap <= 0) {
    estimatedAchievementYear = currentYear;
  }

  // On-track determination
  const onTrack = progressPercent >= expectedProgressPercent * 0.9;

  // Status classification
  let status: ProgressResult["status"];
  if (remainingGap <= 0) {
    status = "achieved";
  } else if (progressPercent >= expectedProgressPercent * 0.9) {
    status = "on-track";
  } else if (progressPercent >= expectedProgressPercent * 0.6) {
    status = "at-risk";
  } else {
    status = "off-track";
  }

  return {
    progressPercent: Math.round(progressPercent * 10) / 10,
    absoluteReduction: Math.round(reductionAchieved * 10) / 10,
    remainingGap: Math.round(remainingGap * 10) / 10,
    onTrack,
    estimatedAchievementYear,
    requiredAnnualReduction: Math.round(requiredAnnualReduction * 100) / 100,
    currentAnnualReduction: Math.round(currentAnnualReduction * 100) / 100,
    status,
  };
}

/**
 * Calculate aggregate progress across multiple targets
 */
export function calculateAggregateProgress(
  targets: TargetParams[]
): {
  overallProgress: number;
  totalReduced: number;
  totalGap: number;
  onTrackCount: number;
  offTrackCount: number;
  atRiskCount: number;
  achievedCount: number;
} {
  const results = targets.map(calculateProgress);

  const totalBaseline = targets.reduce((sum, t) => sum + t.baselineEmissions, 0);
  const totalCurrent = targets.reduce((sum, t) => sum + t.currentEmissions, 0);
  const totalTarget = targets.reduce((sum, t) => sum + t.targetEmissions, 0);

  const totalReduced = totalBaseline - totalCurrent;
  const totalNeeded = totalBaseline - totalTarget;
  const overallProgress = totalNeeded > 0 ? (totalReduced / totalNeeded) * 100 : 0;

  return {
    overallProgress: Math.round(overallProgress * 10) / 10,
    totalReduced: Math.round(totalReduced * 10) / 10,
    totalGap: Math.round((totalCurrent - totalTarget) * 10) / 10,
    onTrackCount: results.filter((r) => r.status === "on-track").length,
    offTrackCount: results.filter((r) => r.status === "off-track").length,
    atRiskCount: results.filter((r) => r.status === "at-risk").length,
    achievedCount: results.filter((r) => r.status === "achieved").length,
  };
}
