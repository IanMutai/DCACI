// ============================================================================
// MRV Emissions & Emission Factor Types
// ============================================================================

export enum GHGType {
  CO2 = "CO2",
  CH4 = "CH4",
  N2O = "N2O",
  HFC = "HFC",
  PFC = "PFC",
  SF6 = "SF6",
  NF3 = "NF3",
  OTHER = "OTHER",
}

export enum EmissionFactorSource {
  IPCC_DEFAULT = "IPCC_DEFAULT",
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  FACILITY = "FACILITY",
  CUSTOM = "CUSTOM",
}

export interface EmissionFactor {
  id: string;
  name: string;
  ghgType: GHGType;
  value: number;
  unit: string;
  activityUnit: string;
  source: EmissionFactorSource;
  sourceReference?: string;
  sector: string;
  category?: string;
  subcategory?: string;
  countryCode?: string;
  year?: number;
  gwp: number;
  gwpSource: string;
  uncertainty?: number;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmissionCalculation {
  id: string;
  inventoryId: string;
  activityDataId: string;
  emissionFactorId: string;
  ghgType: GHGType;
  activityValue: number;
  activityUnit: string;
  emissionFactorValue: number;
  rawEmission: number;
  gwpValue: number;
  co2Equivalent: number;
  unit: string;
  methodology: string;
  tier: 1 | 2 | 3;
  calculatedAt: string;
  calculatedBy?: string;
}

export interface EmissionsSummary {
  totalCO2e: number;
  byGHG: Record<GHGType, number>;
  bySector: Record<string, number>;
  byYear?: Record<number, number>;
  unit: string;
}

export interface EmissionTrend {
  year: number;
  totalEmissions: number;
  totalRemovals: number;
  netEmissions: number;
  changeFromPrevious?: number;
  changeFromBase?: number;
}

export interface EmissionFactorCreateInput {
  name: string;
  ghgType: GHGType;
  value: number;
  unit: string;
  activityUnit: string;
  source: EmissionFactorSource;
  sourceReference?: string;
  sector: string;
  category?: string;
  countryCode?: string;
  year?: number;
  gwp: number;
  gwpSource: string;
  uncertainty?: number;
  notes?: string;
}

export interface EmissionFactorFilter {
  ghgType?: GHGType;
  source?: EmissionFactorSource;
  sector?: string;
  countryCode?: string;
  year?: number;
  search?: string;
}
