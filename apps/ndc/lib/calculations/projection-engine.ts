/**
 * Projection Engine
 *
 * Simple linear and growth-based projection engine for emission forecasting.
 * Supports multiple projection methods and scenario-based adjustments.
 */

export type ProjectionMethod = "linear" | "exponential" | "logarithmic" | "compound-growth";

export interface HistoricalDataPoint {
  year: number;
  emissions: number;
}

export interface ProjectionConfig {
  method: ProjectionMethod;
  fromYear: number;
  toYear: number;
  historicalData: HistoricalDataPoint[];
  /** Annual growth rate for compound-growth method (decimal, e.g. 0.03 for 3%) */
  growthRate?: number;
  /** Policy adjustments: additional reductions per year */
  policyAdjustments?: { year: number; reduction: number }[];
}

export interface ProjectionResult {
  year: number;
  projectedEmissions: number;
  cumulativeReduction: number;
}

/**
 * Calculate linear trend from historical data using least squares regression
 */
function linearRegression(data: HistoricalDataPoint[]): {
  slope: number;
  intercept: number;
} {
  const n = data.length;
  if (n < 2) return { slope: 0, intercept: data[0]?.emissions || 0 };

  const sumX = data.reduce((sum, d) => sum + d.year, 0);
  const sumY = data.reduce((sum, d) => sum + d.emissions, 0);
  const sumXY = data.reduce((sum, d) => sum + d.year * d.emissions, 0);
  const sumX2 = data.reduce((sum, d) => sum + d.year * d.year, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

/**
 * Project emissions using linear extrapolation
 */
function projectLinear(config: ProjectionConfig): ProjectionResult[] {
  const { slope, intercept } = linearRegression(config.historicalData);
  const results: ProjectionResult[] = [];
  const baselineEmission =
    config.historicalData[config.historicalData.length - 1]?.emissions || 0;

  for (let year = config.fromYear; year <= config.toYear; year++) {
    const projected = slope * year + intercept;
    const adjustment = getAdjustment(config.policyAdjustments, year);
    const finalEmissions = Math.max(projected - adjustment, 0);

    results.push({
      year,
      projectedEmissions: Math.round(finalEmissions * 10) / 10,
      cumulativeReduction:
        Math.round((baselineEmission - finalEmissions) * 10) / 10,
    });
  }

  return results;
}

/**
 * Project emissions using compound growth rate
 */
function projectCompoundGrowth(config: ProjectionConfig): ProjectionResult[] {
  const lastData = config.historicalData[config.historicalData.length - 1];
  if (!lastData) return [];

  const rate = config.growthRate || 0;
  const results: ProjectionResult[] = [];

  for (let year = config.fromYear; year <= config.toYear; year++) {
    const yearsFromBase = year - lastData.year;
    const projected = lastData.emissions * Math.pow(1 + rate, yearsFromBase);
    const adjustment = getAdjustment(config.policyAdjustments, year);
    const finalEmissions = Math.max(projected - adjustment, 0);

    results.push({
      year,
      projectedEmissions: Math.round(finalEmissions * 10) / 10,
      cumulativeReduction:
        Math.round((lastData.emissions - finalEmissions) * 10) / 10,
    });
  }

  return results;
}

/**
 * Project emissions using exponential decay (for declining trends)
 */
function projectExponential(config: ProjectionConfig): ProjectionResult[] {
  const data = config.historicalData;
  if (data.length < 2) return [];

  const first = data[0]!;
  const last = data[data.length - 1]!;
  const years = last.year - first.year;

  // Calculate decay rate from historical trend
  const ratio = last.emissions / first.emissions;
  const annualRate = years > 0 ? Math.pow(ratio, 1 / years) : 1;

  const results: ProjectionResult[] = [];

  for (let year = config.fromYear; year <= config.toYear; year++) {
    const yearsFromLast = year - last.year;
    const projected = last.emissions * Math.pow(annualRate, yearsFromLast);
    const adjustment = getAdjustment(config.policyAdjustments, year);
    const finalEmissions = Math.max(projected - adjustment, 0);

    results.push({
      year,
      projectedEmissions: Math.round(finalEmissions * 10) / 10,
      cumulativeReduction:
        Math.round((last.emissions - finalEmissions) * 10) / 10,
    });
  }

  return results;
}

/**
 * Project emissions using logarithmic growth
 */
function projectLogarithmic(config: ProjectionConfig): ProjectionResult[] {
  const data = config.historicalData;
  if (data.length < 2) return [];

  const last = data[data.length - 1]!;

  // Simple log approximation based on trend
  const { slope } = linearRegression(data);
  const dampingFactor = 0.8; // Logarithmic dampening

  const results: ProjectionResult[] = [];

  for (let year = config.fromYear; year <= config.toYear; year++) {
    const yearsFromLast = year - last.year;
    const logGrowth =
      slope > 0
        ? slope * Math.log(1 + yearsFromLast) * dampingFactor
        : slope * yearsFromLast * dampingFactor;

    const projected = last.emissions + logGrowth;
    const adjustment = getAdjustment(config.policyAdjustments, year);
    const finalEmissions = Math.max(projected - adjustment, 0);

    results.push({
      year,
      projectedEmissions: Math.round(finalEmissions * 10) / 10,
      cumulativeReduction:
        Math.round((last.emissions - finalEmissions) * 10) / 10,
    });
  }

  return results;
}

/**
 * Get cumulative policy adjustment for a given year
 */
function getAdjustment(
  adjustments: ProjectionConfig["policyAdjustments"],
  year: number
): number {
  if (!adjustments) return 0;
  return adjustments
    .filter((a) => a.year <= year)
    .reduce((sum, a) => sum + a.reduction, 0);
}

/**
 * Run projections using the specified method
 */
export function runProjection(config: ProjectionConfig): ProjectionResult[] {
  switch (config.method) {
    case "linear":
      return projectLinear(config);
    case "compound-growth":
      return projectCompoundGrowth(config);
    case "exponential":
      return projectExponential(config);
    case "logarithmic":
      return projectLogarithmic(config);
    default:
      return projectLinear(config);
  }
}

/**
 * Compare projections across multiple methods
 */
export function compareProjections(
  baseConfig: Omit<ProjectionConfig, "method">
): Record<ProjectionMethod, ProjectionResult[]> {
  const methods: ProjectionMethod[] = [
    "linear",
    "exponential",
    "logarithmic",
    "compound-growth",
  ];

  const results: Record<string, ProjectionResult[]> = {};
  for (const method of methods) {
    results[method] = runProjection({ ...baseConfig, method });
  }

  return results as Record<ProjectionMethod, ProjectionResult[]>;
}
