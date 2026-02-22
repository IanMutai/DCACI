/**
 * Tier 2 Emission Calculation
 *
 * Uses country-specific emission factors and parameters for more accurate results.
 * Formula: Emission = Activity Data x Country-Specific EF x GWP
 *
 * Tier 2 methods use the same general equations as Tier 1 but apply
 * emission factors and parameters that are specific to the country.
 *
 * Reference: 2006 IPCC Guidelines for National Greenhouse Gas Inventories
 */

export interface Tier2Input {
  /** Activity data value */
  activityData: number;
  /** Country-specific emission factor */
  countrySpecificEF: number;
  /** Global Warming Potential (100-year horizon). Default: 1 for CO2 */
  gwp?: number;
  /** Oxidation factor (fraction, 0-1). Default: 1.0 */
  oxidationFactor?: number;
  /** Carbon content fraction (for fuel combustion). Optional. */
  carbonContent?: number;
  /** Net calorific value (for energy calculations, in TJ/Gg). Optional. */
  netCalorificValue?: number;
  /** Country-specific correction factors. Optional. */
  correctionFactors?: Record<string, number>;
}

export interface Tier2Result {
  /** Calculated emissions in native gas units */
  emissionsNative: number;
  /** Calculated emissions in CO2 equivalent */
  emissionsCO2eq: number;
  /** Unit of CO2 equivalent result */
  unit: string;
  /** Methodology tier used */
  tier: "Tier 2";
  /** Input parameters used */
  inputs: Tier2Input;
  /** Whether country-specific factors were applied */
  countrySpecific: true;
}

/**
 * Calculate emissions using IPCC Tier 2 methodology with country-specific factors.
 *
 * @param input - Tier 2 calculation input parameters
 * @returns Tier 2 calculation result
 */
export function calculateTier2(input: Tier2Input): Tier2Result {
  const {
    activityData,
    countrySpecificEF,
    gwp = 1,
    oxidationFactor = 1.0,
    carbonContent,
    netCalorificValue,
    correctionFactors,
  } = input;

  if (activityData < 0) {
    throw new Error("Activity data must be non-negative");
  }
  if (countrySpecificEF < 0) {
    throw new Error("Emission factor must be non-negative");
  }

  let emissionsNative: number;

  if (carbonContent !== undefined && netCalorificValue !== undefined) {
    // Energy sector Tier 2: Use carbon content and NCV
    // Emission = Fuel Consumption x NCV x Carbon Content x Oxidation Factor x 44/12
    emissionsNative =
      activityData *
      netCalorificValue *
      carbonContent *
      oxidationFactor *
      (44 / 12); // Convert C to CO2
  } else {
    // General Tier 2: Activity Data x Country-Specific EF x Oxidation Factor
    emissionsNative = activityData * countrySpecificEF * oxidationFactor;
  }

  // Apply any additional correction factors
  if (correctionFactors) {
    for (const factor of Object.values(correctionFactors)) {
      emissionsNative *= factor;
    }
  }

  const emissionsCO2eq = emissionsNative * gwp;

  return {
    emissionsNative,
    emissionsCO2eq,
    unit: "Gg CO2 eq",
    tier: "Tier 2",
    inputs: input,
    countrySpecific: true,
  };
}

/**
 * Calculate Tier 2 emissions for energy sector fuel combustion.
 * Uses country-specific carbon content and net calorific values.
 *
 * @param fuelConsumption - Fuel consumption in physical units (e.g., Gg)
 * @param netCalorificValue - Country-specific NCV (TJ/Gg)
 * @param carbonContent - Country-specific carbon content (tC/TJ)
 * @param oxidationFactor - Fraction of carbon oxidized (default: 1.0)
 * @returns Emissions in Gg CO2
 */
export function calculateEnergyTier2(
  fuelConsumption: number,
  netCalorificValue: number,
  carbonContent: number,
  oxidationFactor: number = 1.0
): number {
  // Emission (Gg CO2) = Fuel (Gg) x NCV (TJ/Gg) x CC (tC/TJ) x OF x 44/12 x 10^-3
  return (
    fuelConsumption *
    netCalorificValue *
    carbonContent *
    oxidationFactor *
    (44 / 12) *
    0.001
  );
}

/**
 * Batch calculate Tier 2 emissions for multiple inputs.
 */
export function calculateTier2Batch(inputs: Tier2Input[]): {
  results: Tier2Result[];
  totalEmissionsCO2eq: number;
} {
  const results = inputs.map(calculateTier2);
  const totalEmissionsCO2eq = results.reduce(
    (sum, r) => sum + r.emissionsCO2eq,
    0
  );

  return { results, totalEmissionsCO2eq };
}
