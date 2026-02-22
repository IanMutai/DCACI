/**
 * Kenya GHG Emissions Data
 * Sources: Climate Action Tracker, UNFCCC BTR1, emission-index.com,
 * Climate Analytics, NCCAP 2018-2022 Technical Analysis
 */

// ---------- National Total Emissions ----------

export const nationalEmissions = {
  /** Total GHG emissions by year (MtCO2e, excluding LULUCF) */
  totalByYear: [
    { year: 1995, total: 31.0, source: "Kenya Second National Communication" },
    { year: 2010, total: 62.0, source: "PRIMAP / Climate Action Tracker" },
    { year: 2015, total: 67.7, source: "NCCAP 2018-2022" },
    { year: 2016, total: 70.2, source: "Climate Watch / PRIMAP" },
    { year: 2017, total: 73.1, source: "Climate Watch / PRIMAP" },
    { year: 2018, total: 75.8, source: "Climate Watch / PRIMAP" },
    { year: 2019, total: 81.0, source: "Climate Action Tracker" },
    { year: 2020, total: 82.0, source: "Climate Action Tracker" },
    { year: 2021, total: 82.3, source: "emission-index.com / EDGAR" },
    { year: 2022, total: 94.5, source: "Climate Analytics / PRIMAP" },
  ],
  /** Total including LULUCF */
  totalWithLulucf: [
    { year: 1995, total: 56.8, source: "NCCAP / SNC" },
    { year: 2015, total: 93.7, source: "NCCAP 2018-2022" },
    { year: 2021, total: 74.7, source: "emission-index.com (LULUCF as net sink)" },
  ],
  /** Per capita emissions */
  perCapita: {
    year: 2021,
    value: 1.5, // tCO2e per person
    globalAverage: 6.76,
    globalRank: 164, // out of 191 countries
  },
  /** Global context */
  globalShare: 0.18, // % of global emissions
  globalRank: 59,
} as const;

// ---------- Emissions by Sector ----------

export const sectorEmissions2021 = {
  year: 2021,
  source: "emission-index.com / EDGAR",
  sectors: [
    { name: "Agriculture", emissions: 52.7, percentage: 64.1, color: "#16a34a" },
    { name: "Energy", emissions: 21.2, percentage: 25.8, color: "#dc2626" },
    { name: "Industrial Processes", emissions: 6.9, percentage: 8.4, color: "#9333ea" },
    { name: "Waste", emissions: 2.7, percentage: 3.3, color: "#ca8a04" },
  ],
  totalExclLulucf: 82.3,
  lulucf: -7.57, // net carbon sink
  totalInclLulucf: 74.7,
} as const;

export const sectorEmissions2022 = {
  year: 2022,
  source: "Climate Analytics / PRIMAP",
  sectors: [
    { name: "Agriculture", emissions: 44.4, percentage: 47.0, color: "#16a34a" },
    { name: "Energy", emissions: 39.7, percentage: 42.0, color: "#dc2626" },
    { name: "Industrial Processes", emissions: 5.9, percentage: 6.2, color: "#9333ea" },
    { name: "Waste", emissions: 3.1, percentage: 3.3, color: "#ca8a04" },
  ],
  totalExclLulucf: 94.5,
} as const;

export const sectorEmissions2015 = {
  year: 2015,
  source: "NCCAP 2018-2022 / NDC Baseline",
  sectors: [
    { name: "Agriculture", emissions: 34.0, percentage: 36.3, color: "#16a34a" },
    { name: "LULUCF", emissions: 26.0, percentage: 27.7, color: "#15803d" },
    { name: "Transport", emissions: 11.4, percentage: 12.2, color: "#2563eb" },
    { name: "Energy (excl. Transport)", emissions: 7.4, percentage: 7.9, color: "#dc2626" },
    { name: "Industrial Processes", emissions: 3.3, percentage: 3.5, color: "#9333ea" },
    { name: "Waste", emissions: 2.6, percentage: 2.8, color: "#ca8a04" },
  ],
  totalInclLulucf: 93.7,
} as const;

// ---------- Emissions by Gas Type ----------

export const emissionsByGas = {
  year: 2021,
  source: "emission-index.com",
  gases: [
    { name: "Methane (CH₄)", percentage: 45.1, color: "#f97316" },
    { name: "Carbon Dioxide (CO₂)", percentage: 26.8, color: "#6b7280" },
    { name: "Nitrous Oxide (N₂O)", percentage: 25.3, color: "#3b82f6" },
    { name: "F-gases", percentage: 2.8, color: "#a855f7" },
  ],
} as const;

// ---------- Energy Sector Breakdown ----------

export const energySectorBreakdown = {
  year: 2021,
  source: "emission-index.com / IEA Kenya 2024",
  subsectors: [
    { name: "Transport", emissions: 11.1, percentage: 13.5 },
    { name: "Buildings", emissions: 5.36, percentage: 6.5 },
    { name: "Manufacturing & Construction", emissions: 3.26, percentage: 4.0 },
    { name: "Electricity Generation", emissions: 0.68, percentage: 0.8 },
    { name: "Other Energy", emissions: 0.8, percentage: 1.0 },
  ],
  totalEnergy: 21.2,
  gridCarbonFactor: 56.81, // gCO2/kWh
} as const;

// ---------- Agriculture Sector Breakdown ----------

export const agricultureBreakdown = {
  year: 2021,
  source: "FAO / CGIAR / CCAC",
  totalEmissions: 52.7,
  subsectors: [
    { name: "Enteric Fermentation", percentage: 56, emissions: 29.5 },
    { name: "Manure on Pasture", percentage: 24, emissions: 12.6 },
    { name: "Food Waste Disposal", percentage: 11, emissions: 5.8 },
    { name: "Synthetic Fertilizers / Soils", percentage: 5, emissions: 2.6 },
    { name: "Crop Residue Burning", percentage: 3, emissions: 1.6 },
    { name: "Rice Cultivation", percentage: 1, emissions: 0.3 },
  ],
  dairySector: {
    emissions: 12.3, // MtCO2e
    percentOfNational: 8,
    cattleCount: 4_600_000,
    dairyGdpShare: 14, // % of agricultural GDP
    namaTarget: 8.8, // MtCO2e reduction target
  },
} as const;

// ---------- BAU Projections ----------

export const bauProjections = {
  source: "Updated NDC / NCCAP / Climate Action Tracker",
  ndc2030: {
    bau: 143, // MtCO2e excl LULUCF (IPCC SAR)
    bauInclLulucf: 153, // AR4
    currentPolicies: 92, // MtCO2e excl LULUCF under current policies
  },
  sectorBau2030: [
    { sector: "Energy", bau: 48.1 },
    { sector: "LULUCF", bau: 22.0 },
    { sector: "Transport", bau: 23.4 },
    { sector: "Agriculture", bau: 41.6 },
    { sector: "Industrial Processes", bau: 5.9 },
    { sector: "Waste", bau: 5.2 },
  ],
} as const;
