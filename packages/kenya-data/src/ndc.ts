/**
 * Kenya Nationally Determined Contributions (NDC) Data
 * Sources: UNFCCC, Climate Action Tracker, UNEP LEAP
 */

// ---------- First NDC (2016) ----------

export const firstNdc = {
  submissionDate: "2016-12-28",
  target: 30, // % reduction below BAU
  bau2030: 143, // MtCO2e
  reductionMtco2e: 43,
  conditionality: "fully_conditional" as const,
  lulucfTarget: 47, // % separate LULUCF reduction
  sectors: ["Energy", "Transport", "Agriculture", "Forestry (LULUCF)", "Industry (IPPU)", "Waste"],
  implementationPeriod: "2015-2030",
} as const;

// ---------- Updated NDC (2020) ----------

export const updatedNdc = {
  submissionDate: "2020-12-01",
  target: 32, // % reduction below BAU
  bau2030: 153, // MtCO2e incl LULUCF (AR4)
  bau2030ExclLulucf: 143, // IPCC SAR
  implementationPeriod: "2020-2030",
  totalCost: 62_000_000_000, // USD
  sectors: ["Energy", "Transport", "Agriculture", "Forestry (LULUCF)", "Industry (IPPU)", "Waste"],
  unconditional: {
    reductionPercent: 7, // below BAU incl LULUCF
    reductionExclLulucf: 4, // % excl LULUCF
    absoluteLevel2030: 126, // MtCO2e excl LULUCF
    domesticFinancing: 3_700_000_000, // USD
    financingShare: 21, // %
  },
  conditional: {
    reductionPercent: 32, // below BAU incl LULUCF
    reductionExclLulucf: 17, // % excl LULUCF
    absoluteLevel2030: 108, // MtCO2e excl LULUCF
    internationalSupport: 79, // % of costs
  },
  sectorMitigation: [
    { sector: "Energy", by2022: 23.2, by2025: 33.0, by2030: 48.1 },
    { sector: "LULUCF", by2022: 10.4, by2025: 14.3, by2030: 20.8 },
    { sector: "Agriculture", by2022: 2.7, by2025: 5.3, by2030: 9.7 },
    { sector: "Transport", by2022: 1.9, by2025: 3.0, by2030: 4.7 },
    { sector: "Industrial Processes", by2022: 0.8, by2025: 1.4, by2030: 2.4 },
    { sector: "Waste", by2022: 0.7, by2025: 0.7, by2030: 0.8 },
  ],
  totalMitigationPotential: 86.5, // MtCO2e by 2030
  catRating: {
    unconditional: "1.5C compatible",
    conditional: "Critically insufficient",
  },
} as const;

// ---------- Second NDC (2025) ----------

export const secondNdc = {
  submissionDate: "2025-04-30",
  targetPeriod: "2031-2035",
  target: 35, // % reduction below BAU
  bau2035: 215, // MtCO2e incl LULUCF
  totalReduction: 75.25, // MtCO2e
  totalCostMitigation: 22_500_000_000, // USD
  totalCostAdaptation: 17_700_000_000, // USD
  totalCost: 56_000_000_000, // USD
  unconditional: {
    reductionMtco2e: 15.05,
    share: 20, // %
    absoluteLevel2035: 169, // MtCO2e excl LULUCF
    domesticFinancing: 4_280_000_000, // USD
    financingShare: 19, // %
  },
  conditional: {
    reductionMtco2e: 60.2,
    share: 80, // %
    absoluteLevel2035: 118, // MtCO2e excl LULUCF
    internationalSupport: 81, // %
  },
  keyGoals: [
    "Nearly 100% renewable electricity in national grid by 2035",
    "Reduce emissions by 35% below BAU by 2035",
    "Scale climate-smart agriculture nationwide",
    "Increase forest cover to 30% by 2032",
  ],
} as const;

// ---------- Key Climate Policies ----------

export const climatePolices = [
  {
    name: "Climate Change Act",
    year: 2016,
    amended: 2023,
    description: "Primary climate legislation establishing National Climate Change Council, Climate Change Directorate, and National Climate Change Fund",
  },
  {
    name: "NCCAP I",
    year: 2013,
    endYear: 2017,
    description: "First National Climate Change Action Plan prioritizing adaptation and mitigation",
  },
  {
    name: "NCCAP II",
    year: 2018,
    endYear: 2022,
    description: "Second action plan addressing 6 mitigation sectors with 93.7 MtCO2e baseline",
  },
  {
    name: "NCCAP III",
    year: 2023,
    endYear: 2027,
    description: "Current action plan implementing 32% emissions reduction target by 2030",
  },
  {
    name: "National Adaptation Plan (NAP)",
    year: 2015,
    endYear: 2030,
    description: "Integration of climate adaptation into national and county planning across 20 sectors",
  },
  {
    name: "Green Economy Strategy (GESIP)",
    year: 2016,
    endYear: 2030,
    description: "Transition to low-carbon, resource-efficient socio-economic development",
  },
  {
    name: "Energy Act",
    year: 2019,
    description: "Consolidated energy laws, established Feed-in Tariff, mandated renewable energy master plan",
  },
  {
    name: "Forest Conservation and Management Act",
    year: 2016,
    description: "Target 10% tree cover (constitutional requirement), aiming for 30% by 2032",
  },
  {
    name: "Climate Change (Carbon Markets) Regulations",
    year: 2024,
    description: "Regulatory framework for carbon market participation under Article 6",
  },
  {
    name: "Long-Term Low Emission Development Strategy (LT-LEDS)",
    year: 2022,
    endYear: 2050,
    description: "Strategy for net-zero emissions by 2050",
  },
] as const;

// ---------- BTR / BUR Status ----------

export const transparencyReporting = {
  bur1: {
    submitted: true,
    inventoryYears: "2013-2019",
    methodology: "IPCC 2006 Guidelines",
  },
  btr1: {
    submitted: true,
    submissionYear: 2024,
    inventoryYears: "1990-2022",
    gasesReported: ["CO2", "CH4", "N2O"],
    status: "Technical Expert Review workshop held May 2025",
  },
  nationalCommunications: {
    second: { year: 2015, inventoryYear: 2010 },
    third: { year: 2024, inventoryYears: "1990-2022" },
  },
} as const;
