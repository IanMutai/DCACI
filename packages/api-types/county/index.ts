/**
 * County Types
 * Types for sub-national (county-level) tracking for Kenya's 47 counties
 */

// ==================== COUNTY BASE ====================

export interface County {
  id: string;
  tenantId: string;
  code: string; // KE-001 to KE-047 (ISO 3166-2:KE)
  name: string;
  region?: string; // e.g., "Eastern", "Coastal", "Central"
  area?: number; // km²
  population?: number;
  coordinates?: GeoJSONPoint;
  boundary?: GeoJSONPolygon;
  climateZone?: string; // e.g., "Arid", "Semi-arid", "Tropical"
  avgRainfall?: number; // mm/year
  avgTemperature?: number; // Celsius
  dominantSectors: string[]; // e.g., ["Agriculture", "Energy"]
  countyGovernorEmail?: string;
  climateOfficerEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeoJSONPoint {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: Array<Array<[number, number]>>;
}

// ==================== COUNTY EMISSION SUMMARY ====================

export interface CountyEmissionSummary {
  id: string;
  countyId: string;
  county?: County;
  year: number;
  totalEmissions: number; // tCO2e
  totalRemovals: number; // tCO2e (LULUCF sinks)
  netEmissions: number; // tCO2e
  energyEmissions: number;
  transportEmissions: number;
  agricultureEmissions: number;
  wasteEmissions: number;
  industrialEmissions: number;
  lulucfEmissions: number; // Can be negative (sinks)
  emissionsPerCapita?: number; // tCO2e per person
  changeFromPrevYear?: number; // tCO2e
  changePercent?: number; // %
  dataCompleteness?: number; // 0-100%
  methodology?: string;
  lastUpdatedAt: string;
}

export interface CountyEmissionSummaryInput {
  countyId: string;
  year: number;
  totalEmissions: number;
  totalRemovals?: number;
  energyEmissions?: number;
  transportEmissions?: number;
  agricultureEmissions?: number;
  wasteEmissions?: number;
  industrialEmissions?: number;
  lulucfEmissions?: number;
  emissionsPerCapita?: number;
  dataCompleteness?: number;
  methodology?: string;
}

// ==================== COUNTY FINANCE SUMMARY ====================

export interface CountyFinanceSummaryData {
  id: string;
  countyId: string;
  county?: County;
  fiscalYear: number;
  climateFinanceReceived: number;
  climateFinanceSpent: number;
  mitigationFinance: number;
  adaptationFinance: number;
  crossCuttingFinance: number;
  nationalBudget: number;
  internationalGrants: number;
  privateInvestment: number;
  carbonRevenue: number;
  activeProjects: number;
  totalCreditsIssued: number;
  lastUpdatedAt: string;
}

// ==================== COUNTY PROJECT ====================

export interface CountyProject {
  id: string;
  countyId: string;
  county?: County;
  registryProjectId: string;
  projectTitle: string;
  sector: string;
  subCounty?: string;
  ward?: string;
  specificLocation?: string;
  estimatedReductions?: number; // tCO2e
  verifiedReductions?: number; // tCO2e
  jobsCreated?: number;
  beneficiaries?: number;
  createdAt: string;
  updatedAt: string;
}

// ==================== COUNTY DASHBOARD ====================

export interface CountyDashboard {
  county: County;
  latestEmissions?: CountyEmissionSummary;
  emissionsTrend: CountyEmissionSummary[];
  latestFinance?: CountyFinanceSummaryData;
  financeTrend: CountyFinanceSummaryData[];
  projects: CountyProject[];
  metrics: CountyMetrics;
}

export interface CountyMetrics {
  totalProjects: number;
  activeProjects: number;
  totalCreditsIssued: number;
  totalFinanceReceived: number;
  totalEmissions: number;
  emissionsChangePercent: number;
  dominantSector: string;
  topProjectsBySector: Array<{
    sector: string;
    count: number;
  }>;
}

// ==================== COUNTY COMPARISON ====================

export interface CountyComparison {
  counties: County[];
  metrics: string[];
  data: CountyComparisonData[];
}

export interface CountyComparisonData {
  metric: string;
  unit: string;
  values: Array<{
    countyCode: string;
    countyName: string;
    value: number;
    rank: number;
  }>;
}

// ==================== AGGREGATION ====================

export interface CountyAggregationRequest {
  tenantId: string;
  year?: number;
  fiscalYear?: number;
  counties?: string[]; // County codes to aggregate, or all if empty
}

export interface CountyAggregationResult {
  requestId: string;
  tenantId: string;
  startedAt: string;
  completedAt?: string;
  status: "pending" | "processing" | "completed" | "failed";
  countiesProcessed: number;
  totalCounties: number;
  errors?: string[];
  summary?: {
    totalEmissions: number;
    totalFinance: number;
    totalProjects: number;
  };
}

// ==================== KENYA COUNTIES REFERENCE ====================

export const KENYA_COUNTIES: Array<{ code: string; name: string; region: string }> = [
  { code: "KE-001", name: "Mombasa", region: "Coastal" },
  { code: "KE-002", name: "Kwale", region: "Coastal" },
  { code: "KE-003", name: "Kilifi", region: "Coastal" },
  { code: "KE-004", name: "Tana River", region: "Coastal" },
  { code: "KE-005", name: "Lamu", region: "Coastal" },
  { code: "KE-006", name: "Taita-Taveta", region: "Coastal" },
  { code: "KE-007", name: "Garissa", region: "North Eastern" },
  { code: "KE-008", name: "Wajir", region: "North Eastern" },
  { code: "KE-009", name: "Mandera", region: "North Eastern" },
  { code: "KE-010", name: "Marsabit", region: "Eastern" },
  { code: "KE-011", name: "Isiolo", region: "Eastern" },
  { code: "KE-012", name: "Meru", region: "Eastern" },
  { code: "KE-013", name: "Tharaka-Nithi", region: "Eastern" },
  { code: "KE-014", name: "Embu", region: "Eastern" },
  { code: "KE-015", name: "Kitui", region: "Eastern" },
  { code: "KE-016", name: "Machakos", region: "Eastern" },
  { code: "KE-017", name: "Makueni", region: "Eastern" },
  { code: "KE-018", name: "Nyandarua", region: "Central" },
  { code: "KE-019", name: "Nyeri", region: "Central" },
  { code: "KE-020", name: "Kirinyaga", region: "Central" },
  { code: "KE-021", name: "Murang'a", region: "Central" },
  { code: "KE-022", name: "Kiambu", region: "Central" },
  { code: "KE-023", name: "Turkana", region: "Rift Valley" },
  { code: "KE-024", name: "West Pokot", region: "Rift Valley" },
  { code: "KE-025", name: "Samburu", region: "Rift Valley" },
  { code: "KE-026", name: "Trans-Nzoia", region: "Rift Valley" },
  { code: "KE-027", name: "Uasin Gishu", region: "Rift Valley" },
  { code: "KE-028", name: "Elgeyo-Marakwet", region: "Rift Valley" },
  { code: "KE-029", name: "Nandi", region: "Rift Valley" },
  { code: "KE-030", name: "Baringo", region: "Rift Valley" },
  { code: "KE-031", name: "Laikipia", region: "Rift Valley" },
  { code: "KE-032", name: "Nakuru", region: "Rift Valley" },
  { code: "KE-033", name: "Narok", region: "Rift Valley" },
  { code: "KE-034", name: "Kajiado", region: "Rift Valley" },
  { code: "KE-035", name: "Kericho", region: "Rift Valley" },
  { code: "KE-036", name: "Bomet", region: "Rift Valley" },
  { code: "KE-037", name: "Kakamega", region: "Western" },
  { code: "KE-038", name: "Vihiga", region: "Western" },
  { code: "KE-039", name: "Bungoma", region: "Western" },
  { code: "KE-040", name: "Busia", region: "Western" },
  { code: "KE-041", name: "Siaya", region: "Nyanza" },
  { code: "KE-042", name: "Kisumu", region: "Nyanza" },
  { code: "KE-043", name: "Homa Bay", region: "Nyanza" },
  { code: "KE-044", name: "Migori", region: "Nyanza" },
  { code: "KE-045", name: "Kisii", region: "Nyanza" },
  { code: "KE-046", name: "Nyamira", region: "Nyanza" },
  { code: "KE-047", name: "Nairobi", region: "Nairobi" },
];

// ==================== API QUERY PARAMS ====================

export interface CountyQueryParams {
  region?: string;
  climateZone?: string;
  page?: number;
  limit?: number;
}

export interface CountyEmissionQueryParams {
  countyCode?: string;
  year?: number;
  startYear?: number;
  endYear?: number;
  page?: number;
  limit?: number;
}

export interface CountyCompareParams {
  countyCodes: string[]; // At least 2 county codes
  metrics: string[]; // e.g., ["totalEmissions", "climateFinanceReceived"]
  year?: number;
  fiscalYear?: number;
}
