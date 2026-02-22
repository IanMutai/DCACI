/**
 * Kenya Climate Finance Data
 * Sources: CPI, World Bank, GCF, Adaptation Fund, GEF, AfDB,
 * Kenya National Treasury, FLLoCA
 */

// ---------- Climate Finance Overview ----------

export const climateFinanceOverview = {
  year: 2018,
  source: "Climate Policy Initiative - Landscape of Climate Finance in Kenya (2021)",
  totalFlows: 2_400_000_000, // USD (KES 243.3 billion)
  totalFlowsKES: 243_300_000_000,
  annualNeed: 5_130_000_000, // USD (World Bank CCDR 2023)
  annualGap: 2_700_000_000, // USD (~53% shortfall)
  mitigationShare: 79.8, // %
  adaptationShare: 11.7, // %
  dualPurposeShare: 8.5, // %
  publicInvestment: {
    totalKES: 144_300_000_000,
    shareOfTotal: 59.4, // %
    domestic: 34_000_000_000, // KES
    international: 42_000_000_000, // KES
  },
  privateInvestment: {
    totalKES: 98_900_000_000,
    totalUSD: 979_000_000,
    shareOfTotal: 40.7, // %
    domesticShare: 34.4, // %
    internationalShare: 65.6, // %
  },
} as const;

// ---------- NDC Implementation Costs ----------

export const ndcCosts = {
  updatedNdc2020_2030: {
    total: 62_000_000_000, // USD
    mitigation: 17_700_000_000,
    adaptation: 43_900_000_000,
    unconditionalDomestic: 8_000_000_000, // 13%
    conditionalInternational: 54_000_000_000, // 87%
    annualRequirement: 6_200_000_000,
  },
  secondNdc2031_2035: {
    total: 56_000_000_000, // USD
    mitigation: 22_500_000_000,
    adaptation: 17_700_000_000,
    domesticShare: 1_050_000_000, // ~19%
    internationalShare: 18_340_000_000, // 81% of mitigation
  },
} as const;

// ---------- National Budget ----------

export const nationalBudget = {
  fy2023_24: {
    totalKES: 3_700_000_000_000,
    totalUSD: 26_400_000_000,
    climateRelatedExpenditureKES: 76_000_000_000, // climate-related dev expenditure
    envSectorKES: 62_300_000_000, // Environmental Protection, Water & Natural Resources
    climateActionKES: 3_600_000_000,
    envManagementKES: 3_800_000_000,
    forestServiceKES: 7_440_000_000,
    irrigationKES: 23_000_000_000,
    kcsapKES: 1_500_000_000, // Kenya Climate Smart Agriculture Project
    fertilizerSubsidyKES: 5_000_000_000,
  },
  fy2024_25: {
    totalKES: 3_920_000_000_000,
    totalUSD: 28_000_000_000,
    fertilizerSubsidyKES: 10_000_000_000,
    agricValueChainKES: 6_100_000_000,
    blueEconomyKES: 11_300_000_000,
    waterSectorKES: 30_380_000_000,
  },
  waterSectorGap: {
    annualNeedKES: 100_000_000_000,
    annualAllocatedKES: 40_000_000_000,
  },
} as const;

// ---------- Green Climate Fund ----------

export const gcfFunding = {
  totalFunding: 990_000_000, // USD (without co-financing)
  approvedProjects: 17,
  readinessProjects: 6,
  readinessAmount: 4_800_000, // USD
  keyProjects: [
    {
      id: "FP255",
      name: "Transforming Livelihoods - Lake Region Bloc",
      amount: 29_200_000,
      coFinancing: 20_800_000,
      beneficiaries: 2_700_000,
      year: 2025,
      focus: "Agricultural value chains",
    },
    {
      id: "FP113",
      name: "TWENDE - Ending Drought Emergencies",
      amount: 35_500_000,
      beneficiaries: 620_000,
      focus: "Ecosystem-based adaptation in ASAL rangelands",
    },
    {
      id: "FP175",
      name: "Upper Athi River Water Security",
      amount: 10_000_000,
      focus: "Water security and climate resilience",
    },
  ],
} as const;

// ---------- GEF Funding ----------

export const gefFunding = {
  totalGrants: 437_840_000, // USD all-time
  totalProjects: 61,
  nationalProjects: 18,
  regionalGlobalProjects: 43,
  coFinancingRatio: 4.5,
  currentCycle: {
    name: "GEF-8",
    biodiversity: { allocated: 13_420_000, utilized: 13_420_000 },
    climateChange: { allocated: 3_060_000, utilized: 3_000_000 },
    landDegradation: { allocated: 4_820_000, utilized: 4_820_000 },
    total: { allocated: 21_300_000, utilized: 21_250_000 },
  },
  smallGrantsProjects: 400, // since 1993
} as const;

// ---------- World Bank ----------

export const worldBankFunding = [
  {
    name: "Development Policy Operation (climate, fiscal, green growth)",
    amount: 1_200_000_000,
    year: 2024,
    details: "IBRD $850M + IDA $300M + IDA grant $50M",
  },
  {
    name: "FLLoCA - Financing Locally Led Climate Action",
    amount: 150_000_000,
    year: 2021,
    coFinancing: { government: 75_000_000, bilateral: 62_000_000 },
    totalProgram: 287_000_000,
  },
  {
    name: "KEWASIP - Watershed & Sustainable Landscape",
    amount: 200_000_000,
    year: 2025,
  },
  {
    name: "SME & Climate-aligned Business Initiative",
    amount: 430_000_000,
    year: 2025,
  },
  {
    name: "Green Entrepreneurship Platform",
    amount: 43_000_000,
    year: 2025,
  },
] as const;

// ---------- AfDB ----------

export const afdbFunding = [
  {
    name: "KCB Bank Green Finance Deal",
    amount: 150_000_000,
    year: 2025,
    details: "$100M subordinated debt + $50M guarantee",
  },
  {
    name: "OrPower Twenty-Two Geothermal (35 MW)",
    amount: 16_500_000,
    year: 2025,
  },
  {
    name: "Transmission Network Improvement Project",
    amount: 59_000_000,
    year: 2023,
    details: "Climate component of $116M total",
  },
] as const;

// ---------- Adaptation Fund ----------

export const adaptationFund = {
  nie: "NEMA (accredited March 2012)",
  secondNie: "NETFUND",
  projects: [
    {
      name: "Integrated Programme to Build Resilience",
      amount: 9_998_302,
      counties: 14,
      components: ["Food security", "Water management", "Coastal management", "Disaster risk reduction", "Knowledge management"],
    },
    {
      name: "AWARE: Adaptation for Water Access and Resilience",
      amount: 20_000_000,
      location: "Ewaso Nyiro River Basin",
      status: "Requested",
    },
  ],
} as const;

// ---------- FLLoCA ----------

export const flloca = {
  name: "Financing Locally-Led Climate Action",
  totalFinancing: 287_000_000, // USD
  idaCredit: 150_000_000,
  governmentContribution: 75_000_000,
  bilateralDonors: 62_000_000,
  disbursedToCounties: 82_000_000, // as of late 2024
  countyGrantsCommittedKES: 7_400_000_000,
  countiesCovered: 47,
  avgPerCountyPerYear: 1_250_000, // USD
  bilateralPartners: ["Denmark", "Netherlands", "Sweden", "KfW (Germany)"],
  allocationMethod: "Performance-based formula",
} as const;

// ---------- County Climate Change Funds ----------

export const cccf = {
  pilotCounties: ["Isiolo", "Garissa", "Kitui", "Makueni", "Wajir"],
  expansionCounties: ["Tharaka Nithi", "Embu", "Kilifi", "Taita-Taveta", "Kwale", "Machakos"],
  countiesWithLegislation: 45, // out of 47
  mandatedAllocation: { min: 1, max: 3 }, // % of county development budgets
  scaledToAllCounties: true,
  firstCountyToEnactRegulations: "Makueni",
} as const;
