/**
 * Cross-System Linkage Types
 * Defines types for linking Registry projects to NDC targets and MRV baselines
 */

/** GeoJSON Polygon type for geospatial boundaries */
interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: number[][][];
}

// ==================== ENUMS ====================

export enum LinkageType {
  PROJECT_TO_NDC_TARGET = "PROJECT_TO_NDC_TARGET",
  PROJECT_TO_MRV_BASELINE = "PROJECT_TO_MRV_BASELINE",
  CREDIT_TO_CORRESPONDING_ADJUSTMENT = "CREDIT_TO_CORRESPONDING_ADJUSTMENT",
  POLICY_TO_PROJECT = "POLICY_TO_PROJECT",
}

export enum ContributionStatus {
  PROJECTED = "PROJECTED",
  PARTIALLY_VERIFIED = "PARTIALLY_VERIFIED",
  FULLY_VERIFIED = "FULLY_VERIFIED",
  EXCEEDED = "EXCEEDED",
  UNDERPERFORMING = "UNDERPERFORMING",
}

export enum Article6Mechanism {
  ARTICLE_6_2_BILATERAL = "ARTICLE_6_2_BILATERAL",
  ARTICLE_6_4_CENTRALIZED = "ARTICLE_6_4_CENTRALIZED",
  VOLUNTARY_MARKET = "VOLUNTARY_MARKET",
  DOMESTIC_ONLY = "DOMESTIC_ONLY",
}

export enum MRVVerificationStatus {
  PENDING = "PENDING",
  VERIFIED_MATCH = "VERIFIED_MATCH",
  VERIFIED_DISCREPANCY = "VERIFIED_DISCREPANCY",
  REJECTED = "REJECTED",
}

// ==================== PROJECT-NDC LINKAGE ====================

export interface ProjectNDCLinkage {
  id: string;
  projectId: string;
  ndcTargetId: string;
  ndcTargetName: string;
  ndcSector: string;
  expectedContribution: number; // tCO2e
  verifiedContribution?: number; // tCO2e
  contributionStatus: ContributionStatus;
  linkedAt: string;
  linkedBy?: string;
  notes?: string;
}

export interface ProjectNDCLinkageInput {
  projectId: string;
  ndcTargetId: string;
  ndcTargetName: string;
  ndcSector: string;
  expectedContribution: number;
  notes?: string;
}

export interface ProjectNDCLinkageUpdate {
  verifiedContribution?: number;
  contributionStatus?: ContributionStatus;
  notes?: string;
}

// ==================== PROJECT-MRV VERIFICATION ====================

export interface ProjectMRVVerification {
  id: string;
  projectId: string;
  mrvInventoryYear: number;
  mrvSectorCode: string;
  mrvCategoryCode?: string;
  baselineEmissions: number;
  projectEmissions: number;
  verifiedReductions: number;
  dataQualityScore?: number; // 0-100
  verificationMethod?: "SATELLITE" | "GROUND_TRUTH" | "HYBRID";
  verifierName?: string;
  verificationDate?: string;
  satelliteDataRef?: string;
  geospatialBoundary?: GeoJSONPolygon;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMRVVerificationInput {
  projectId: string;
  mrvInventoryYear: number;
  mrvSectorCode: string;
  mrvCategoryCode?: string;
  baselineEmissions: number;
  projectEmissions: number;
  verifiedReductions: number;
  dataQualityScore?: number;
  verificationMethod?: "SATELLITE" | "GROUND_TRUTH" | "HYBRID";
  verifierName?: string;
  verificationDate?: string;
  satelliteDataRef?: string;
  geospatialBoundary?: GeoJSONPolygon;
}

// ==================== CROSS-SYSTEM LINKAGE ====================

export interface CrossSystemLinkage {
  id: string;
  sourceSystem: "registry" | "ndc" | "mrv";
  sourceEntityId: string;
  sourceEntityType: string;
  targetSystem: "registry" | "ndc" | "mrv";
  targetEntityId: string;
  targetEntityType: string;
  linkageType: LinkageType;
  status: "active" | "inactive" | "pending";
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CrossSystemLinkageInput {
  sourceSystem: "registry" | "ndc" | "mrv";
  sourceEntityId: string;
  sourceEntityType: string;
  targetSystem: "registry" | "ndc" | "mrv";
  targetEntityId: string;
  targetEntityType: string;
  linkageType: LinkageType;
  metadata?: Record<string, unknown>;
}

// ==================== CORRESPONDING ADJUSTMENT ====================

export enum TransferType {
  ITMO_FIRST_TRANSFER = "ITMO_FIRST_TRANSFER",
  ITMO_SUBSEQUENT_TRANSFER = "ITMO_SUBSEQUENT_TRANSFER",
  AUTHORIZATION = "AUTHORIZATION",
}

export enum CAStatus {
  CALCULATED = "CALCULATED",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  APPLIED = "APPLIED",
  REVERSED = "REVERSED",
}

export interface CorrespondingAdjustment {
  id: string;
  tenantConfigId: string;
  targetId: string;
  transferType: TransferType;
  quantity: number; // tCO2e
  acquiringCountry: string; // ISO country code
  registryProjectId: string;
  registryProjectTitle?: string;
  registryCreditIds: string[];
  preAdjustmentProgress: number; // %
  postAdjustmentProgress: number; // %
  progressImpact: number; // % points
  preAdjustmentReductions?: number;
  postAdjustmentReductions?: number;
  transferDate: string;
  adjustmentDate: string;
  reportingYear: number;
  approvedBy?: string;
  approvalDate?: string;
  notes?: string;
  status: CAStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CorrespondingAdjustmentInput {
  targetId: string;
  transferType: TransferType;
  quantity: number;
  acquiringCountry: string;
  registryProjectId: string;
  registryProjectTitle?: string;
  registryCreditIds: string[];
  transferDate: string;
  reportingYear: number;
  notes?: string;
}

export interface CorrespondingAdjustmentPreview {
  input: CorrespondingAdjustmentInput;
  preAdjustmentProgress: number;
  postAdjustmentProgress: number;
  progressImpact: number;
  preAdjustmentReductions: number;
  postAdjustmentReductions: number;
  warnings: string[];
}

export interface CorrespondingAdjustmentSummary {
  tenantConfigId: string;
  reportingYear: number;
  totalAdjustments: number;
  totalQuantity: number; // tCO2e
  byTarget: Array<{
    targetId: string;
    targetName: string;
    sector: string;
    totalQuantity: number;
    adjustmentCount: number;
  }>;
  byCountry: Array<{
    countryCode: string;
    countryName: string;
    totalQuantity: number;
    adjustmentCount: number;
  }>;
}

// ==================== REGISTRY PROJECT CACHE ====================

export interface RegistryProjectCache {
  id: string;
  tenantConfigId: string;
  registryProjectId: string;
  projectTitle: string;
  projectSector: string;
  totalCreditsIssued: number;
  totalCreditsRetired: number;
  totalITMOTransferred: number;
  linkedTargetIds: string[];
  lastSyncedAt: string;
}

// ==================== API RESPONSES ====================

export interface LinkageListResponse {
  linkages: CrossSystemLinkage[];
  total: number;
  page: number;
  limit: number;
}

export interface LinkageQueryParams {
  sourceSystem?: "registry" | "ndc" | "mrv";
  targetSystem?: "registry" | "ndc" | "mrv";
  linkageType?: LinkageType;
  status?: "active" | "inactive" | "pending";
  page?: number;
  limit?: number;
}
