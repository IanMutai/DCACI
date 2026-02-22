/**
 * Kenya Carbon Markets Data
 * Sources: Berkeley VROD, Verra Registry, Gold Standard, UNFCCC CDM,
 * NEMA, Allied Offsets, CarbonCredits.com
 */

// ---------- Market Overview ----------

export const marketOverview = {
  totalProjects: 296, // highest in Africa
  totalCreditsIssued: 59_000_000, // tonnes since 2011
  projectedIssuances2025_2030: 141_000_000, // MtCO2e
  africaMarketShare: 25, // % of African VCM credits
  eastAfricaShare: 50, // % of East Africa's projects
  creditsIssued2022: 11_000_000, // VCM credits in 2022
  vcmExternalFinance2023: 136_000_000, // USD
  source: "Berkeley VROD / Allied Offsets / Think Business Africa",
} as const;

// ---------- Registry Breakdown ----------

export const registryBreakdown = [
  { registry: "Gold Standard", projects: 51, focus: "Cookstoves, clean energy" },
  { registry: "Verra (VCS)", projects: 19, focus: "REDD+, forestry, grassland carbon" },
  { registry: "CDM (UNFCCC)", projects: 49, focus: "Renewable energy, 12.3M CERs generated" },
  { registry: "Plan Vivo", projects: 2, focus: "Blue carbon (mangroves)" },
] as const;

// ---------- Major Carbon Projects ----------

export const carbonProjects = [
  {
    id: "kasigau",
    name: "Kasigau Corridor REDD+ Project",
    type: "REDD+ (Avoided Deforestation)",
    location: "Taita-Taveta County",
    registry: "Verra VCS (#562, #612)",
    developer: "Wildlife Works Carbon LLC",
    creditsPerYear: 1_800_000,
    totalCredits: 13_900_000,
    status: "Active - World's first certified REDD+ initiative (2009)",
    pricePerTon: 12,
  },
  {
    id: "nkrcp",
    name: "Northern Kenya Rangelands Carbon Project",
    type: "Grassland/Soil Carbon",
    location: "Northern Kenya (multiple conservancies)",
    registry: "Verra VCS (#1468)",
    developer: "Northern Rangelands Trust (NRT)",
    totalCredits: 3_200_000,
    totalRevenue: 14_600_000,
    potential30Year: 50_000_000,
    status: "Under Verra review since 2023",
    pricePerTon: 15,
  },
  {
    id: "chyulu",
    name: "Chyulu Hills REDD+ Carbon Project",
    type: "REDD+ (Forest Conservation)",
    location: "Tsavo-Amboseli ecosystem",
    registry: "Verra VCS",
    developer: "Chyulu Hills Conservation Trust / Conservation International",
    totalCredits: 3_100_000,
    annualTarget: 600_000,
    status: "Active - 1 billionth VCS credit globally came from this project",
    pricePerTon: 18,
  },
  {
    id: "burn",
    name: "BURN Stoves Project",
    type: "Clean Cookstoves",
    location: "All 47 counties (factory in Ruiru)",
    registry: "Gold Standard (#5642)",
    developer: "BURN Manufacturing / ECOA Climate Capital",
    creditsPerYear: 144_000,
    status: "Active - First CCP-eligible cookstove credits",
    pricePerTon: 10,
  },
  {
    id: "kengen-olkaria",
    name: "KenGen Olkaria Geothermal CDM Projects",
    type: "Geothermal Energy",
    location: "Olkaria, Rift Valley",
    registry: "CDM (UNFCCC)",
    developer: "KenGen",
    totalCredits: 4_617_309,
    totalRevenue: 32_050_000,
    annualOffset: 1_500_000,
    status: "Active - 6 CDM projects",
    pricePerTon: 7,
  },
  {
    id: "ltwp",
    name: "Lake Turkana Wind Power",
    type: "Wind Energy",
    location: "Marsabit County",
    registry: "CDM (UNFCCC)",
    developer: "LTWP Ltd",
    totalCredits: 1_270_891,
    unsoldCredits: 780_000,
    annualCapacity: 736_615,
    capacityMW: 310,
    turbines: 365,
    status: "Credits generated but not yet sold",
    pricePerTon: 10,
  },
  {
    id: "tist",
    name: "TIST Program Kenya",
    type: "Reforestation / Afforestation",
    location: "Multiple locations",
    registry: "Verra VCS",
    developer: "TIST",
    totalCredits: 6_000_000,
    treesPlanted: 26_000_000,
    farmers: 230_000,
    farmerRevenueShare: 70, // %
    status: "Active",
    pricePerTon: 30,
  },
  {
    id: "ktda",
    name: "KTDA Small Hydropower Programme",
    type: "Small Hydropower",
    location: "Central Kenya tea regions",
    registry: "CDM (UNFCCC)",
    developer: "Kenya Tea Development Agency",
    annualOffset: 50_000,
    plants: 7,
    totalCapacityMW: 16,
    teaFactories: 39,
    smallholderBeneficiaries: 350_000,
    status: "Active - Ci-Dev supported",
    pricePerTon: 8,
  },
  {
    id: "mikoko-pamoja",
    name: "Mikoko Pamoja",
    type: "Blue Carbon (Mangrove Conservation)",
    location: "Gazi Bay, Kwale County",
    registry: "Plan Vivo Foundation",
    developer: "Gazi Bay community / ACES",
    creditsPerYear: 3_000,
    communityRevenueShare: 60, // %
    status: "Active - World's first blue carbon project (2012)",
    pricePerTon: 25,
  },
  {
    id: "lamu-blue",
    name: "Lamu Blue Carbon Project",
    type: "Blue Carbon (Mangrove Conservation)",
    location: "Lamu County",
    registry: "Plan Vivo",
    developer: "County Government of Lamu",
    annualTarget: 50_000,
    annualRevenueTarget: 600_000, // USD
    hectares: 4_000,
    status: "Kenya's largest coastal carbon trading project",
    pricePerTon: 20,
  },
] as const;

// ---------- Article 6 ----------

export const article6 = {
  dna: "NEMA (National Environment Management Authority)",
  registryLaunch: "2026-02-17",
  registryName: "Kenya National Carbon Registry (KNCR)",
  emissionReductionPotential: 86, // MtCO2e
  ndcCommitted: 46, // MtCO2e
  reservedForTrading: 40, // MtCO2e
  bilateralAgreements: [
    { country: "Switzerland", status: "Signed", date: "2025-05-02" },
    { country: "Sweden", status: "Signed", date: "2025" },
    { country: "Singapore", status: "In negotiations" },
    { country: "South Korea", status: "In negotiations" },
  ],
  revenueProjection: {
    at30PerTon: {
      correspondingAdjustmentFees: 160_000_000, // USD
      itmoIssuanceFees: 8_000_000,
      domesticBenefitSharing: 2_000_000,
      totalPotential: 1_000_000_000, // USD
    },
  },
} as const;

// ---------- Regulations ----------

export const carbonRegulations = {
  primaryLaw: "Climate Change (Carbon Markets) Regulations, 2024",
  effectiveDate: "2024-05-17",
  benefitSharing: {
    landBasedPublicCommunity: 40, // % minimum community share
    nonLandBasedPublicCommunity: 25, // %
    privateLand: 0, // no mandatory contribution
  },
  requirements: [
    "Registration with Kenya National Carbon Registry (KNCR)",
    "Environmental and Social Impact Assessment (ESIA)",
    "Free, Prior and Informed Consent (FPIC) for community land",
    "Community Development Agreements (CDAs)",
    "Certification by recognized international body",
    "Letter of support from respective county",
  ],
  taxIncentive: {
    corporateTaxRate: 15, // %
    duration: 10, // years for certified carbon market operators
  },
} as const;

// ---------- Pricing ----------

export const carbonPricing = {
  source: "Various Kenya market sources",
  ranges: [
    { category: "General Kenya projects", min: 5, max: 20 },
    { category: "Community forest conservation", avg: 18 },
    { category: "Cookstove credits", min: 7, max: 10 },
    { category: "High-integrity removal credits", min: 60, max: 100 },
    { category: "TIST reforestation", avg: 30 },
    { category: "EcoSafi cookstoves", avg: 35 },
    { category: "Acorn agroforestry", min: 20, max: 31 },
  ],
  globalVcmAverage2024: 6.34, // USD/tCO2e
} as const;

// ---------- Major Buyers ----------

export const majorBuyers = [
  { name: "Delta Air Lines", volume: 1_164_000, year: 2021 },
  { name: "Netflix", volume: 699_000, year: 2021 },
  { name: "BHP", volume: 200_000, year: 2021 },
  { name: "Apple", volume: null, year: null },
  { name: "Shell", volume: null, year: null },
  { name: "Air France-KLM", volume: null, year: null },
  { name: "Kering", volume: null, year: null },
  { name: "Nespresso", volume: null, year: null },
] as const;
