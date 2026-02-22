/**
 * Tier 1 Emission Calculation
 *
 * Basic IPCC methodology using default emission factors.
 * Formula: Emission = Activity Data x Emission Factor x GWP
 *
 * Reference: 2006 IPCC Guidelines for National Greenhouse Gas Inventories
 */

export interface Tier1Input {
  /** Activity data value (e.g., fuel consumption in TJ, livestock heads) */
  activityData: number;
  /** Emission factor (e.g., kg CO2/GJ, kg CH4/head/yr) */
  emissionFactor: number;
  /** Global Warming Potential (100-year horizon). Default: 1 for CO2 */
  gwp?: number;
  /** Oxidation factor (fraction, 0-1). Default: 1.0 */
  oxidationFactor?: number;
}

export interface Tier1Result {
  /** Calculated emissions in original units (before GWP conversion) */
  emissionsNative: number;
  /** Calculated emissions in CO2 equivalent */
  emissionsCO2eq: number;
  /** Unit of CO2 equivalent result */
  unit: string;
  /** Methodology tier used */
  tier: "Tier 1";
  /** Input parameters used */
  inputs: Tier1Input;
}

/**
 * Calculate emissions using IPCC Tier 1 methodology.
 *
 * Emission = Activity Data x Emission Factor x Oxidation Factor
 * Emission (CO2 eq) = Emission x GWP
 *
 * @param input - Tier 1 calculation input parameters
 * @returns Tier 1 calculation result
 */
export function calculateTier1(input: Tier1Input): Tier1Result {
  const { activityData, emissionFactor, gwp = 1, oxidationFactor = 1.0 } = input;

  if (activityData < 0) {
    throw new Error("Activity data must be non-negative");
  }
  if (emissionFactor < 0) {
    throw new Error("Emission factor must be non-negative");
  }
  if (gwp <= 0) {
    throw new Error("GWP must be positive");
  }

  const emissionsNative = activityData * emissionFactor * oxidationFactor;
  const emissionsCO2eq = emissionsNative * gwp;

  return {
    emissionsNative,
    emissionsCO2eq,
    unit: "Gg CO2 eq",
    tier: "Tier 1",
    inputs: input,
  };
}

/**
 * Batch calculate Tier 1 emissions for multiple activity data entries.
 *
 * @param inputs - Array of Tier 1 calculation inputs
 * @returns Array of results and total emissions
 */
export function calculateTier1Batch(inputs: Tier1Input[]): {
  results: Tier1Result[];
  totalEmissionsCO2eq: number;
} {
  const results = inputs.map(calculateTier1);
  const totalEmissionsCO2eq = results.reduce(
    (sum, r) => sum + r.emissionsCO2eq,
    0
  );

  return { results, totalEmissionsCO2eq };
}

/**
 * IPCC AR5 Global Warming Potentials (100-year horizon)
 * Used to convert individual gas emissions to CO2 equivalents.
 */
export const GWP_AR5: Record<string, number> = {
  CO2: 1,
  CH4: 28,
  N2O: 265,
  SF6: 23500,
  NF3: 16100,
  // Common HFCs
  "HFC-23": 12400,
  "HFC-32": 677,
  "HFC-125": 3170,
  "HFC-134a": 1300,
  "HFC-143a": 4800,
  "HFC-152a": 138,
  "HFC-227ea": 3350,
  "HFC-236fa": 8060,
  "HFC-245fa": 858,
  "HFC-365mfc": 804,
  "HFC-43-10mee": 1650,
  // Common PFCs
  CF4: 6630,
  C2F6: 11100,
  C3F8: 8900,
  "c-C4F8": 9540,
  C5F12: 8550,
  C6F14: 7910,
};
