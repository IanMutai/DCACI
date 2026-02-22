/**
 * Kenya Energy Data
 * Sources: IEA Kenya 2024, EPRA Bi-Annual Statistics 2023, KenGen, KPLC
 */

// ---------- Installed Power Capacity ----------

export const installedCapacity = {
  year: 2023,
  totalMW: 3321,
  source: "EPRA Bi-Annual Statistics Report 2023/2024",
  bySource: [
    { name: "Geothermal", capacityMW: 943.7, percentage: 28.4, color: "#dc2626" },
    { name: "Hydro", capacityMW: 872.4, percentage: 26.3, color: "#2563eb" },
    { name: "Thermal (diesel/gas)", capacityMW: 572.8, percentage: 17.2, color: "#6b7280" },
    { name: "Wind", capacityMW: 436.1, percentage: 13.1, color: "#06b6d4" },
    { name: "Solar", capacityMW: 200, percentage: 6.0, color: "#eab308" },
    { name: "Biomass", capacityMW: 26, percentage: 0.8, color: "#22c55e" },
  ],
  keyInstallations: [
    { name: "Olkaria Geothermal Complex", type: "Geothermal", capacityMW: 799, operator: "KenGen" },
    { name: "Lake Turkana Wind Power", type: "Wind", capacityMW: 310, operator: "LTWP Ltd" },
    { name: "Kipeto Wind Farm", type: "Wind", capacityMW: 100, operator: "Kipeto Energy" },
    { name: "Garissa Solar Plant", type: "Solar", capacityMW: 55, operator: "KenGen" },
  ],
} as const;

// ---------- Electricity Generation ----------

export const electricityGeneration = {
  year: 2023,
  totalGWh: 13424,
  source: "EPRA / The Star Kenya",
  bySource: [
    { name: "Geothermal", generationGWh: 6032, percentage: 44.9, color: "#dc2626" },
    { name: "Hydro", generationGWh: 2667, percentage: 19.9, color: "#2563eb" },
    { name: "Wind", generationGWh: 2008, percentage: 15.0, color: "#06b6d4" },
    { name: "Thermal", generationGWh: 1306, percentage: 9.7, color: "#6b7280" },
    { name: "Solar", generationGWh: 492, percentage: 3.7, color: "#eab308" },
    { name: "Imports & Other", generationGWh: 920, percentage: 6.9, color: "#a855f7" },
  ],
  renewablePercentage: 83.5, // geothermal + hydro + wind + solar
  gridCarbonFactor: 56.81, // gCO2/kWh
  peakDemandMW: 2051,
} as const;

// ---------- Primary Energy Supply ----------

export const primaryEnergySupply = {
  year: 2023,
  source: "IEA Kenya 2024",
  bySource: [
    { name: "Biomass & Waste", percentage: 61 },
    { name: "Oil", percentage: 17 },
    { name: "Renewables (geo/hydro/wind/solar)", percentage: 16 },
    { name: "Coal", percentage: 3 },
    { name: "Other", percentage: 3 },
  ],
  energyDemandBySector: [
    { name: "Buildings (mostly biomass cooking)", percentage: 68 },
    { name: "Transport", percentage: 20 },
    { name: "Industry", percentage: 12 },
  ],
} as const;

// ---------- KenGen Portfolio ----------

export const kengenPortfolio = {
  ownershipGovernment: 70, // %
  totalCapacityMW: 1821,
  shareOfNationalGeneration: 67, // ~two-thirds
  bySource: [
    { name: "Hydropower", capacityMW: 825.69, plants: 30 },
    { name: "Geothermal", capacityMW: 713.13, plants: 7 },
    { name: "Thermal", capacityMW: 256, plants: 4 },
    { name: "Wind", capacityMW: 26, plants: 1 },
  ],
  expansionTarget: 3000, // MW additional renewable capacity planned
  geothermalTarget: 1500, // MW from current 754 MW
} as const;

// ---------- Electricity Access ----------

export const electricityAccess = {
  year: 2023,
  nationalAccess: 84, // %
  householdAccess2013: 26,
  householdAccess2018: 77,
  ruralAccess: 32, // % of rural households
  ruralOffGrid: 75, // % of rural electricity from off-grid
  miniGrids: {
    installedCapacityMW: 25.3,
    contractsLaunched: 14,
    plannedMiniGrids: 113,
    valueUSD: 72_500_000,
    targetCounties: 12,
  },
  kosapProject: {
    targetSolarHomeSystems: 250_000,
    targetMiniGrids: 120,
    targetCounties: 14,
  },
} as const;
