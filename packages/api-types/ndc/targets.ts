// ============================================================================
// NDC Targets & Tracking Types
// ============================================================================

export enum NDCStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  UPDATED = "UPDATED",
  ARCHIVED = "ARCHIVED",
}

export enum TargetType {
  ABSOLUTE = "ABSOLUTE",
  RELATIVE = "RELATIVE",
  INTENSITY = "INTENSITY",
  PEAKING = "PEAKING",
  POLICY_BASED = "POLICY_BASED",
}

export enum ReferenceType {
  BAU = "BAU",
  BASE_YEAR = "BASE_YEAR",
  FIXED_LEVEL = "FIXED_LEVEL",
}

export enum ConditionType {
  UNCONDITIONAL = "UNCONDITIONAL",
  CONDITIONAL = "CONDITIONAL",
}

export interface NDC {
  id: string;
  organizationId: string;
  countryCode: string;
  version: string;
  title: string;
  description?: string;
  status: NDCStatus;
  submissionDate?: string;
  implementationPeriodStart: string;
  implementationPeriodEnd: string;
  baseYear: number;
  targetYear: number;
  targets: Target[];
  sectors: string[];
  ghgCovered: string[];
  documentUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Target {
  id: string;
  ndcId: string;
  sector?: string;
  ghgType?: string;
  targetType: TargetType;
  referenceType: ReferenceType;
  conditionType: ConditionType;
  description: string;
  baselineValue: number;
  baselineYear: number;
  targetValue: number;
  targetYear: number;
  targetUnit: string;
  reductionPercentage: number;
  currentValue?: number;
  currentYear?: number;
  progressPercentage?: number;
  isAchieved: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NDCProgress {
  ndcId: string;
  targetId: string;
  year: number;
  currentEmissions: number;
  targetEmissions: number;
  baselineEmissions: number;
  progressPercentage: number;
  gapToTarget: number;
  onTrack: boolean;
  dataSource: string;
  notes?: string;
  updatedAt: string;
}

export interface Baseline {
  id: string;
  ndcId: string;
  sector?: string;
  referenceType: ReferenceType;
  baseYear: number;
  baseValue: number;
  projectedValues: ProjectedValue[];
  methodology: string;
  assumptions?: string;
  dataSource: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectedValue {
  year: number;
  value: number;
  scenario: "BAU" | "WITH_MEASURES" | "WITH_ADDITIONAL_MEASURES";
}

export interface GapAnalysis {
  ndcId: string;
  targetId: string;
  currentEmissions: number;
  targetEmissions: number;
  gap: number;
  gapPercentage: number;
  yearsRemaining: number;
  requiredAnnualReduction: number;
  isOnTrack: boolean;
  recommendations: string[];
  analysisDate: string;
}

export interface NDCCreateInput {
  countryCode: string;
  version: string;
  title: string;
  description?: string;
  implementationPeriodStart: string;
  implementationPeriodEnd: string;
  baseYear: number;
  targetYear: number;
  sectors: string[];
  ghgCovered: string[];
}

export interface TargetCreateInput {
  ndcId: string;
  sector?: string;
  ghgType?: string;
  targetType: TargetType;
  referenceType: ReferenceType;
  conditionType: ConditionType;
  description: string;
  baselineValue: number;
  baselineYear: number;
  targetValue: number;
  targetYear: number;
  targetUnit: string;
  reductionPercentage: number;
}
