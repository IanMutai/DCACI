/**
 * Gap Analyzer
 *
 * Analyzes the gap between current emission trajectory and NDC targets.
 * Provides sectoral breakdown, priority ranking, and closure recommendations.
 */

export interface SectorData {
  sector: string;
  currentTrajectory: number;
  target: number;
  policies: {
    name: string;
    estimatedReduction: number;
    status: "implemented" | "planned" | "under-review";
  }[];
}

export interface GapResult {
  sector: string;
  currentTrajectory: number;
  target: number;
  absoluteGap: number;
  relativeGap: number;
  priority: "high" | "medium" | "low";
  implementedReduction: number;
  plannedReduction: number;
  residualGap: number;
  closurePercent: number;
}

export interface GapAnalysisSummary {
  totalCurrentTrajectory: number;
  totalTarget: number;
  totalAbsoluteGap: number;
  totalRelativeGap: number;
  sectorGaps: GapResult[];
  highPriorityCount: number;
  gapClosureWithPlanned: number;
}

/**
 * Analyze the gap for a single sector
 */
export function analyzeSectorGap(data: SectorData): GapResult {
  const absoluteGap = data.currentTrajectory - data.target;
  const relativeGap =
    data.currentTrajectory !== 0
      ? (absoluteGap / data.currentTrajectory) * 100
      : 0;

  // Sum reductions from policies by status
  const implementedReduction = data.policies
    .filter((p) => p.status === "implemented")
    .reduce((sum, p) => sum + p.estimatedReduction, 0);

  const plannedReduction = data.policies
    .filter((p) => p.status === "planned" || p.status === "under-review")
    .reduce((sum, p) => sum + p.estimatedReduction, 0);

  const totalPolicyReduction = implementedReduction + plannedReduction;
  const residualGap = Math.max(absoluteGap - totalPolicyReduction, 0);

  const closurePercent =
    absoluteGap > 0
      ? Math.min((totalPolicyReduction / absoluteGap) * 100, 100)
      : 100;

  // Priority based on relative gap and absolute size
  let priority: GapResult["priority"];
  if (relativeGap > 25 || absoluteGap > 15) {
    priority = "high";
  } else if (relativeGap > 10 || absoluteGap > 5) {
    priority = "medium";
  } else {
    priority = "low";
  }

  return {
    sector: data.sector,
    currentTrajectory: data.currentTrajectory,
    target: data.target,
    absoluteGap: Math.round(absoluteGap * 10) / 10,
    relativeGap: Math.round(relativeGap * 10) / 10,
    priority,
    implementedReduction: Math.round(implementedReduction * 10) / 10,
    plannedReduction: Math.round(plannedReduction * 10) / 10,
    residualGap: Math.round(residualGap * 10) / 10,
    closurePercent: Math.round(closurePercent * 10) / 10,
  };
}

/**
 * Perform comprehensive gap analysis across all sectors
 */
export function analyzeGaps(sectors: SectorData[]): GapAnalysisSummary {
  const sectorGaps = sectors.map(analyzeSectorGap);

  const totalCurrentTrajectory = sectors.reduce(
    (sum, s) => sum + s.currentTrajectory,
    0
  );
  const totalTarget = sectors.reduce((sum, s) => sum + s.target, 0);
  const totalAbsoluteGap = totalCurrentTrajectory - totalTarget;
  const totalRelativeGap =
    totalCurrentTrajectory !== 0
      ? (totalAbsoluteGap / totalCurrentTrajectory) * 100
      : 0;

  const totalPlannedReduction = sectorGaps.reduce(
    (sum, g) => sum + g.implementedReduction + g.plannedReduction,
    0
  );

  const gapClosureWithPlanned =
    totalAbsoluteGap > 0
      ? Math.min((totalPlannedReduction / totalAbsoluteGap) * 100, 100)
      : 100;

  return {
    totalCurrentTrajectory: Math.round(totalCurrentTrajectory * 10) / 10,
    totalTarget: Math.round(totalTarget * 10) / 10,
    totalAbsoluteGap: Math.round(totalAbsoluteGap * 10) / 10,
    totalRelativeGap: Math.round(totalRelativeGap * 10) / 10,
    sectorGaps: sectorGaps.sort((a, b) => b.absoluteGap - a.absoluteGap),
    highPriorityCount: sectorGaps.filter((g) => g.priority === "high").length,
    gapClosureWithPlanned: Math.round(gapClosureWithPlanned * 10) / 10,
  };
}

/**
 * Generate gap closure recommendations
 */
export function generateRecommendations(
  gapSummary: GapAnalysisSummary
): string[] {
  const recommendations: string[] = [];

  const highPriority = gapSummary.sectorGaps.filter(
    (g) => g.priority === "high"
  );

  for (const gap of highPriority) {
    if (gap.residualGap > 0) {
      recommendations.push(
        `${gap.sector}: Additional measures needed to close residual gap of ${gap.residualGap} MtCO2e`
      );
    }
  }

  if (gapSummary.gapClosureWithPlanned < 100) {
    recommendations.push(
      `Overall gap closure with planned measures is ${gapSummary.gapClosureWithPlanned}% - additional policies required`
    );
  }

  const lowClosure = gapSummary.sectorGaps.filter(
    (g) => g.closurePercent < 50
  );
  for (const gap of lowClosure) {
    recommendations.push(
      `${gap.sector}: Policy coverage is only ${gap.closurePercent}% of the sector gap - consider scaling up existing measures`
    );
  }

  return recommendations;
}
