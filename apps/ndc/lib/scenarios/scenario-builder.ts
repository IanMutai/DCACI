/**
 * Scenario Builder
 *
 * Build BAU (Business As Usual), WEM (With Existing Measures), and
 * WAM (With Additional Measures) emission scenarios for NDC planning.
 */

import {
  runProjection,
  type HistoricalDataPoint,
  type ProjectionResult,
} from "../calculations/projection-engine";

export type ScenarioType = "BAU" | "WEM" | "WAM";

export interface PolicyMeasure {
  id: string;
  name: string;
  sector: string;
  estimatedReduction: number;
  implementationYear: number;
  status: "implemented" | "planned" | "under-review";
}

export interface ScenarioConfig {
  name: string;
  type: ScenarioType;
  baseYear: number;
  targetYear: number;
  historicalData: HistoricalDataPoint[];
  /** GDP growth rate for BAU modeling */
  gdpGrowthRate: number;
  /** Population growth rate for BAU modeling */
  populationGrowthRate: number;
  /** Policies included in this scenario */
  policies: PolicyMeasure[];
  /** Additional assumptions */
  assumptions: string[];
}

export interface ScenarioResult {
  name: string;
  type: ScenarioType;
  baseYear: number;
  targetYear: number;
  projections: ProjectionResult[];
  totalReductionFromBAU: number;
  finalYearEmissions: number;
  assumptions: string[];
  policiesIncluded: string[];
}

/**
 * Build a BAU scenario - no climate policies, emissions driven by economic growth
 */
export function buildBAU(config: ScenarioConfig): ScenarioResult {
  // BAU uses compound growth based on GDP/population growth
  const emissionsGrowthRate =
    config.gdpGrowthRate * 0.7 + config.populationGrowthRate * 0.3;

  const projections = runProjection({
    method: "compound-growth",
    fromYear: config.baseYear + 1,
    toYear: config.targetYear,
    historicalData: config.historicalData,
    growthRate: emissionsGrowthRate,
  });

  const finalYearEmissions =
    projections.length > 0
      ? projections[projections.length - 1]!.projectedEmissions
      : 0;

  return {
    name: config.name || "Business As Usual (BAU)",
    type: "BAU",
    baseYear: config.baseYear,
    targetYear: config.targetYear,
    projections,
    totalReductionFromBAU: 0,
    finalYearEmissions,
    assumptions: [
      `GDP growth: ${(config.gdpGrowthRate * 100).toFixed(1)}% annually`,
      `Population growth: ${(config.populationGrowthRate * 100).toFixed(1)}% annually`,
      "No new climate policies implemented",
      "Current energy mix maintained",
      ...config.assumptions,
    ],
    policiesIncluded: [],
  };
}

/**
 * Build a WEM scenario - with currently implemented policies only
 */
export function buildWEM(
  config: ScenarioConfig,
  bauResult: ScenarioResult
): ScenarioResult {
  const implementedPolicies = config.policies.filter(
    (p) => p.status === "implemented"
  );

  const policyAdjustments = implementedPolicies.map((p) => ({
    year: p.implementationYear,
    reduction: p.estimatedReduction,
  }));

  const projections = runProjection({
    method: "compound-growth",
    fromYear: config.baseYear + 1,
    toYear: config.targetYear,
    historicalData: config.historicalData,
    growthRate:
      config.gdpGrowthRate * 0.7 + config.populationGrowthRate * 0.3,
    policyAdjustments,
  });

  const finalYearEmissions =
    projections.length > 0
      ? projections[projections.length - 1]!.projectedEmissions
      : 0;

  const totalReductionFromBAU =
    bauResult.finalYearEmissions - finalYearEmissions;

  return {
    name: config.name || "With Existing Measures (WEM)",
    type: "WEM",
    baseYear: config.baseYear,
    targetYear: config.targetYear,
    projections,
    totalReductionFromBAU: Math.round(totalReductionFromBAU * 10) / 10,
    finalYearEmissions,
    assumptions: [
      "All currently implemented policies fully operational",
      `${implementedPolicies.length} policies included`,
      ...config.assumptions,
    ],
    policiesIncluded: implementedPolicies.map((p) => p.name),
  };
}

/**
 * Build a WAM scenario - with all planned additional measures
 */
export function buildWAM(
  config: ScenarioConfig,
  bauResult: ScenarioResult
): ScenarioResult {
  // Include all policies (implemented + planned + under review)
  const allPolicies = config.policies;

  const policyAdjustments = allPolicies.map((p) => ({
    year: p.implementationYear,
    reduction: p.estimatedReduction,
  }));

  const projections = runProjection({
    method: "compound-growth",
    fromYear: config.baseYear + 1,
    toYear: config.targetYear,
    historicalData: config.historicalData,
    growthRate:
      config.gdpGrowthRate * 0.7 + config.populationGrowthRate * 0.3,
    policyAdjustments,
  });

  const finalYearEmissions =
    projections.length > 0
      ? projections[projections.length - 1]!.projectedEmissions
      : 0;

  const totalReductionFromBAU =
    bauResult.finalYearEmissions - finalYearEmissions;

  return {
    name: config.name || "With Additional Measures (WAM)",
    type: "WAM",
    baseYear: config.baseYear,
    targetYear: config.targetYear,
    projections,
    totalReductionFromBAU: Math.round(totalReductionFromBAU * 10) / 10,
    finalYearEmissions,
    assumptions: [
      "All planned policies successfully implemented",
      "International support secured for conditional measures",
      `${allPolicies.length} policies included`,
      ...config.assumptions,
    ],
    policiesIncluded: allPolicies.map((p) => p.name),
  };
}

/**
 * Build all three scenarios (BAU, WEM, WAM) from a single configuration
 */
export function buildAllScenarios(config: ScenarioConfig): {
  bau: ScenarioResult;
  wem: ScenarioResult;
  wam: ScenarioResult;
  comparison: {
    bauFinal: number;
    wemFinal: number;
    wamFinal: number;
    wemReductionPercent: number;
    wamReductionPercent: number;
  };
} {
  const bauConfig = { ...config, name: "Business As Usual (BAU)", type: "BAU" as ScenarioType };
  const wemConfig = { ...config, name: "With Existing Measures (WEM)", type: "WEM" as ScenarioType };
  const wamConfig = { ...config, name: "With Additional Measures (WAM)", type: "WAM" as ScenarioType };

  const bau = buildBAU(bauConfig);
  const wem = buildWEM(wemConfig, bau);
  const wam = buildWAM(wamConfig, bau);

  const wemReductionPercent =
    bau.finalYearEmissions > 0
      ? ((bau.finalYearEmissions - wem.finalYearEmissions) / bau.finalYearEmissions) * 100
      : 0;

  const wamReductionPercent =
    bau.finalYearEmissions > 0
      ? ((bau.finalYearEmissions - wam.finalYearEmissions) / bau.finalYearEmissions) * 100
      : 0;

  return {
    bau,
    wem,
    wam,
    comparison: {
      bauFinal: bau.finalYearEmissions,
      wemFinal: wem.finalYearEmissions,
      wamFinal: wam.finalYearEmissions,
      wemReductionPercent: Math.round(wemReductionPercent * 10) / 10,
      wamReductionPercent: Math.round(wamReductionPercent * 10) / 10,
    },
  };
}
