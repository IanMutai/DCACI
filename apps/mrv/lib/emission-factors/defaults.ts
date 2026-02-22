/**
 * Default IPCC Emission Factors
 *
 * Source: 2006 IPCC Guidelines for National Greenhouse Gas Inventories
 * These are Tier 1 default emission factors for the Energy sector
 * and selected factors from other sectors.
 */

export interface EmissionFactorRecord {
  /** Unique identifier */
  id: string;
  /** GHG gas */
  gas: "CO2" | "CH4" | "N2O" | "HFCs" | "PFCs" | "SF6";
  /** IPCC category code */
  categoryCode: string;
  /** Source or fuel type */
  source: string;
  /** Emission factor value */
  factor: number;
  /** Unit of the emission factor */
  unit: string;
  /** Origin of the factor */
  origin: string;
  /** IPCC methodology tier */
  tier: "Tier 1" | "Tier 2" | "Tier 3";
  /** Lower bound of uncertainty range */
  uncertaintyLower?: number;
  /** Upper bound of uncertainty range */
  uncertaintyUpper?: number;
}

/**
 * Default CO2 emission factors for stationary combustion (Table 2.2, Vol. 2)
 * Units: kg CO2/TJ on a Net Calorific Value basis
 */
export const ENERGY_CO2_STATIONARY_COMBUSTION: EmissionFactorRecord[] = [
  {
    id: "ef-co2-coal-anthracite",
    gas: "CO2",
    categoryCode: "1.A",
    source: "Anthracite",
    factor: 98.3,
    unit: "kg CO2/TJ",
    origin: "IPCC 2006, Vol.2, Table 2.2",
    tier: "Tier 1",
    uncertaintyLower: 94.4,
    uncertaintyUpper: 101.9,
  },
  {
    id: "ef-co2-coal-bituminous",
    gas: "CO2",
    categoryCode: "1.A",
    source: "Other Bituminous Coal",
    factor: 94.6,
    unit: "kg CO2/TJ",
    origin: "IPCC 2006, Vol.2, Table 2.2",
    tier: "Tier 1",
    uncertaintyLower: 89.5,
    uncertaintyUpper: 99.7,
  },
  {
    id: "ef-co2-coal-subbituminous",
    gas: "CO2",
    categoryCode: "1.A",
    source: "Sub-Bituminous Coal",
    factor: 96.1,
    unit: "kg CO2/TJ",
    origin: "IPCC 2006, Vol.2, Table 2.2",
    tier: "Tier 1",
    uncertaintyLower: 92.8,
    uncertaintyUpper: 100.0,
  },
  {
    id: "ef-co2-coal-lignite",
    gas: "CO2",
    categoryCode: "1.A",
    source: "Lignite",
    factor: 101.0,
    unit: "kg CO2/TJ",
    origin: "IPCC 2006, Vol.2, Table 2.2",
    tier: "Tier 1",
    uncertaintyLower: 90.9,
    uncertaintyUpper: 115.0,
  },
  {
    id: "ef-co2-oil-crude",
    gas: "CO2",
    categoryCode: "1.A",
    source: "Crude Oil",
    factor: 73.3,
    unit: "kg CO2/TJ",
    origin: "IPCC 2006, Vol.2, Table 2.2",
    tier: "Tier 1",
    uncertaintyLower: 71.1,
    uncertaintyUpper: 75.5,
  },
  {
    id: "ef-co2-oil-diesel",
    gas: "CO2",
    categoryCode: "1.A",
    source: "Diesel Oil / Gas Oil",
    factor: 74.1,
    unit: "kg CO2/TJ",
    origin: "IPCC 2006, Vol.2, Table 2.2",
    tier: "Tier 1",
    uncertaintyLower: 72.6,
    uncertaintyUpper: 74.8,
  },
  {
    id: "ef-co2-oil-gasoline",
    gas: "CO2",
    categoryCode: "1.A",
    source: "Motor Gasoline",
    factor: 69.3,
    unit: "kg CO2/TJ",
    origin: "IPCC 2006, Vol.2, Table 2.2",
    tier: "Tier 1",
    uncertaintyLower: 67.5,
    uncertaintyUpper: 73.0,
  },
  {
    id: "ef-co2-oil-kerosene",
    gas: "CO2",
    categoryCode: "1.A",
    source: "Kerosene / Jet Kerosene",
    factor: 71.5,
    unit: "kg CO2/TJ",
    origin: "IPCC 2006, Vol.2, Table 2.2",
    tier: "Tier 1",
    uncertaintyLower: 69.7,
    uncertaintyUpper: 74.4,
  },
  {
    id: "ef-co2-oil-lpg",
    gas: "CO2",
    categoryCode: "1.A",
    source: "Liquefied Petroleum Gases (LPG)",
    factor: 63.1,
    unit: "kg CO2/TJ",
    origin: "IPCC 2006, Vol.2, Table 2.2",
    tier: "Tier 1",
    uncertaintyLower: 61.6,
    uncertaintyUpper: 65.6,
  },
  {
    id: "ef-co2-gas-natural",
    gas: "CO2",
    categoryCode: "1.A",
    source: "Natural Gas",
    factor: 56.1,
    unit: "kg CO2/TJ",
    origin: "IPCC 2006, Vol.2, Table 2.2",
    tier: "Tier 1",
    uncertaintyLower: 54.3,
    uncertaintyUpper: 58.3,
  },
  {
    id: "ef-co2-oil-residual",
    gas: "CO2",
    categoryCode: "1.A",
    source: "Residual Fuel Oil",
    factor: 77.4,
    unit: "kg CO2/TJ",
    origin: "IPCC 2006, Vol.2, Table 2.2",
    tier: "Tier 1",
    uncertaintyLower: 75.5,
    uncertaintyUpper: 78.8,
  },
];

/**
 * Default CH4 emission factors for enteric fermentation (Table 10.10, Vol. 4)
 * Units: kg CH4/head/year
 */
export const AGRICULTURE_CH4_ENTERIC: EmissionFactorRecord[] = [
  {
    id: "ef-ch4-cattle-dairy",
    gas: "CH4",
    categoryCode: "3.A",
    source: "Dairy Cattle (Africa)",
    factor: 46.0,
    unit: "kg CH4/head/yr",
    origin: "IPCC 2006, Vol.4, Table 10.10",
    tier: "Tier 1",
  },
  {
    id: "ef-ch4-cattle-nondairy",
    gas: "CH4",
    categoryCode: "3.A",
    source: "Non-Dairy Cattle (Africa)",
    factor: 31.0,
    unit: "kg CH4/head/yr",
    origin: "IPCC 2006, Vol.4, Table 10.10",
    tier: "Tier 1",
  },
  {
    id: "ef-ch4-sheep",
    gas: "CH4",
    categoryCode: "3.A",
    source: "Sheep",
    factor: 5.0,
    unit: "kg CH4/head/yr",
    origin: "IPCC 2006, Vol.4, Table 10.10",
    tier: "Tier 1",
  },
  {
    id: "ef-ch4-goats",
    gas: "CH4",
    categoryCode: "3.A",
    source: "Goats",
    factor: 5.0,
    unit: "kg CH4/head/yr",
    origin: "IPCC 2006, Vol.4, Table 10.10",
    tier: "Tier 1",
  },
  {
    id: "ef-ch4-camels",
    gas: "CH4",
    categoryCode: "3.A",
    source: "Camels",
    factor: 46.0,
    unit: "kg CH4/head/yr",
    origin: "IPCC 2006, Vol.4, Table 10.10",
    tier: "Tier 1",
  },
  {
    id: "ef-ch4-swine",
    gas: "CH4",
    categoryCode: "3.A",
    source: "Swine",
    factor: 1.0,
    unit: "kg CH4/head/yr",
    origin: "IPCC 2006, Vol.4, Table 10.10",
    tier: "Tier 1",
  },
];

/**
 * All default emission factors combined for easy lookup.
 */
export const ALL_DEFAULT_EMISSION_FACTORS: EmissionFactorRecord[] = [
  ...ENERGY_CO2_STATIONARY_COMBUSTION,
  ...AGRICULTURE_CH4_ENTERIC,
];

/**
 * Look up a default emission factor by gas and source.
 */
export function getDefaultEmissionFactor(
  gas: string,
  source: string
): EmissionFactorRecord | undefined {
  return ALL_DEFAULT_EMISSION_FACTORS.find(
    (ef) =>
      ef.gas === gas &&
      ef.source.toLowerCase().includes(source.toLowerCase())
  );
}
