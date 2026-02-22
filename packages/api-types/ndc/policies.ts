// ============================================================================
// NDC Policy & Measures Types
// ============================================================================

export enum PolicyType {
  REGULATORY = "REGULATORY",
  ECONOMIC = "ECONOMIC",
  FISCAL = "FISCAL",
  VOLUNTARY = "VOLUNTARY",
  INFORMATION = "INFORMATION",
  EDUCATION = "EDUCATION",
  RESEARCH = "RESEARCH",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  OTHER = "OTHER",
}

export enum PolicyStatus {
  PLANNED = "PLANNED",
  ADOPTED = "ADOPTED",
  IMPLEMENTED = "IMPLEMENTED",
  EXPIRED = "EXPIRED",
  SUPERSEDED = "SUPERSEDED",
}

export enum PolicyImpactLevel {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  UNKNOWN = "UNKNOWN",
}

export interface PolicyMeasure {
  id: string;
  ndcId: string;
  organizationId: string;
  title: string;
  description: string;
  type: PolicyType;
  status: PolicyStatus;
  sector: string;
  subsector?: string;
  targetedGHGs: string[];
  implementingEntity: string;
  startDate?: string;
  endDate?: string;
  estimatedReduction: number;
  estimatedReductionUnit: string;
  actualReduction?: number;
  impact: PolicyImpact;
  fundingSource?: string;
  budgetAllocated?: number;
  budgetCurrency?: string;
  relatedTargetIds: string[];
  indicators: PolicyIndicator[];
  createdAt: string;
  updatedAt: string;
}

export interface PolicyImpact {
  level: PolicyImpactLevel;
  mitigationPotential: number;
  mitigationUnit: string;
  cobenefits: string[];
  risks: string[];
  costEffectiveness?: number;
  costUnit?: string;
  assessmentDate?: string;
  methodology?: string;
  notes?: string;
}

export interface PolicyIndicator {
  id: string;
  policyId: string;
  name: string;
  description?: string;
  unit: string;
  baselineValue: number;
  targetValue: number;
  currentValue?: number;
  year: number;
  source?: string;
}

export interface PolicyMeasureCreateInput {
  ndcId: string;
  title: string;
  description: string;
  type: PolicyType;
  sector: string;
  subsector?: string;
  targetedGHGs: string[];
  implementingEntity: string;
  startDate?: string;
  endDate?: string;
  estimatedReduction: number;
  estimatedReductionUnit: string;
  fundingSource?: string;
  budgetAllocated?: number;
  budgetCurrency?: string;
}

export interface PolicyMeasureUpdateInput {
  title?: string;
  description?: string;
  status?: PolicyStatus;
  actualReduction?: number;
  endDate?: string;
  impact?: Partial<PolicyImpact>;
}

export interface PolicyMeasureFilter {
  ndcId?: string;
  type?: PolicyType;
  status?: PolicyStatus;
  sector?: string;
  search?: string;
}
