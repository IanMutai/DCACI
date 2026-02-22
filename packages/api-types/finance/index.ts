/**
 * Climate Finance Types
 * Types for tracking climate finance sources, transactions, allocations, and LoA workflows
 */

// ==================== ENUMS ====================

export enum FinanceSourceType {
  BILATERAL = "BILATERAL",
  MULTILATERAL = "MULTILATERAL",
  GREEN_CLIMATE_FUND = "GREEN_CLIMATE_FUND",
  ADAPTATION_FUND = "ADAPTATION_FUND",
  GLOBAL_ENVIRONMENT_FACILITY = "GLOBAL_ENVIRONMENT_FACILITY",
  NATIONAL_BUDGET = "NATIONAL_BUDGET",
  PRIVATE_SECTOR = "PRIVATE_SECTOR",
  CARBON_REVENUE = "CARBON_REVENUE",
  OTHER = "OTHER",
}

export enum FinanceTransactionType {
  DISBURSEMENT = "DISBURSEMENT",
  COMMITMENT = "COMMITMENT",
  REFUND = "REFUND",
  REALLOCATION = "REALLOCATION",
  INTEREST_PAYMENT = "INTEREST_PAYMENT",
}

export enum AllocationStatus {
  PLANNED = "PLANNED",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  DEPLETED = "DEPLETED",
  CANCELLED = "CANCELLED",
}

export enum Article6MechanismType {
  ARTICLE_6_2 = "ARTICLE_6_2",
  ARTICLE_6_4 = "ARTICLE_6_4",
}

export enum LoaStatus {
  DRAFT = "DRAFT",
  PENDING_REVIEW = "PENDING_REVIEW",
  UNDER_REVIEW = "UNDER_REVIEW",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
  REVOKED = "REVOKED",
}

export enum ApprovalStepStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  SKIPPED = "SKIPPED",
}

export enum ApprovalDecision {
  APPROVE = "APPROVE",
  REJECT = "REJECT",
  REQUEST_CHANGES = "REQUEST_CHANGES",
  DEFER = "DEFER",
}

// ==================== FINANCE SOURCE ====================

export interface FinanceSource {
  id: string;
  tenantId: string;
  name: string;
  type: FinanceSourceType;
  organization?: string;
  contactPerson?: string;
  contactEmail?: string;
  totalCommitted: number;
  totalDisbursed: number;
  totalAvailable: number;
  currency: string;
  grantPercentage?: number;
  interestRate?: number;
  disbursementSchedule?: DisbursementScheduleItem[];
  agreementDate?: string;
  expiryDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DisbursementScheduleItem {
  date: string;
  amount: number;
  description?: string;
}

export interface FinanceSourceInput {
  name: string;
  type: FinanceSourceType;
  organization?: string;
  contactPerson?: string;
  contactEmail?: string;
  totalCommitted: number;
  currency?: string;
  grantPercentage?: number;
  interestRate?: number;
  disbursementSchedule?: DisbursementScheduleItem[];
  agreementDate?: string;
  expiryDate?: string;
}

// ==================== FINANCE TRANSACTION ====================

export interface FinanceTransaction {
  id: string;
  tenantId: string;
  sourceId: string;
  source?: FinanceSource;
  type: FinanceTransactionType;
  amount: number;
  currency: string;
  exchangeRate?: number;
  purpose: string;
  sector?: string;
  projectId?: string;
  countyCode?: string;
  countyName?: string;
  transactionDate: string;
  fiscalYear: number;
  quarter?: number;
  reference?: string;
  documentUrl?: string;
  notes?: string;
  recordedBy: string;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinanceTransactionInput {
  sourceId: string;
  type: FinanceTransactionType;
  amount: number;
  currency?: string;
  exchangeRate?: number;
  purpose: string;
  sector?: string;
  projectId?: string;
  countyCode?: string;
  countyName?: string;
  transactionDate: string;
  fiscalYear: number;
  quarter?: number;
  reference?: string;
  documentUrl?: string;
  notes?: string;
}

// ==================== FINANCE ALLOCATION ====================

export interface FinanceAllocation {
  id: string;
  tenantId: string;
  sourceId: string;
  source?: FinanceSource;
  sector: string;
  activity?: string;
  projectId?: string;
  countyCode?: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  currency: string;
  fiscalYear: number;
  startDate: string;
  endDate: string;
  status: AllocationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FinanceAllocationInput {
  sourceId: string;
  sector: string;
  activity?: string;
  projectId?: string;
  countyCode?: string;
  allocatedAmount: number;
  currency?: string;
  fiscalYear: number;
  startDate: string;
  endDate: string;
}

// ==================== LETTER OF AUTHORIZATION ====================

export interface LetterOfAuthorization {
  id: string;
  tenantId: string;
  loaNumber: string;
  version: number;
  registryProjectId: string;
  projectTitle: string;
  mechanism: Article6MechanismType;
  acquiringCountry: string;
  acquiringEntity: string;
  authorizedQuantity: number;
  vintage: number[];
  creditingPeriodStart: string;
  creditingPeriodEnd: string;
  correspondingAdjustmentRequired: boolean;
  correspondingAdjustmentMethod?: string;
  pricePerTonne?: number;
  currency?: string;
  paymentTerms?: string;
  status: LoaStatus;
  submittedAt?: string;
  submittedBy?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  approvedAt?: string;
  approvedBy?: string;
  rejectedAt?: string;
  rejectedBy?: string;
  rejectionReason?: string;
  draftDocumentUrl?: string;
  signedDocumentUrl?: string;
  approvalSteps: LoaApprovalStep[];
  createdAt: string;
  updatedAt: string;
}

export interface LoaCreateInput {
  registryProjectId: string;
  projectTitle: string;
  mechanism: Article6MechanismType;
  acquiringCountry: string;
  acquiringEntity: string;
  authorizedQuantity: number;
  vintage: number[];
  creditingPeriodStart: string;
  creditingPeriodEnd: string;
  correspondingAdjustmentRequired?: boolean;
  correspondingAdjustmentMethod?: string;
  pricePerTonne?: number;
  currency?: string;
  paymentTerms?: string;
}

export interface LoaUpdateInput {
  acquiringCountry?: string;
  acquiringEntity?: string;
  authorizedQuantity?: number;
  vintage?: number[];
  pricePerTonne?: number;
  currency?: string;
  paymentTerms?: string;
}

export interface LoaApprovalStep {
  id: string;
  loaId: string;
  stepNumber: number;
  stepName: string;
  assignedTo?: string;
  assignedRole?: string;
  status: ApprovalStepStatus;
  decision?: ApprovalDecision;
  decisionDate?: string;
  decidedBy?: string;
  comments?: string;
  requiredDocuments: string[];
  uploadedDocuments?: UploadedDocument[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadedDocument {
  name: string;
  url: string;
  uploadedAt: string;
  uploadedBy?: string;
}

export interface LoaApprovalInput {
  decision: ApprovalDecision;
  comments?: string;
}

// ==================== FINANCE SUMMARIES ====================

export interface FinanceSummary {
  tenantId: string;
  fiscalYear: number;
  totalCommitted: number;
  totalDisbursed: number;
  totalAllocated: number;
  totalSpent: number;
  bySector: SectorFinanceSummary[];
  bySource: SourceFinanceSummary[];
  byCounty: CountyFinanceSummary[];
  currency: string;
}

export interface SectorFinanceSummary {
  sector: string;
  allocated: number;
  spent: number;
  remaining: number;
  projectCount: number;
}

export interface SourceFinanceSummary {
  sourceId: string;
  sourceName: string;
  sourceType: FinanceSourceType;
  committed: number;
  disbursed: number;
  allocated: number;
}

export interface CountyFinanceSummary {
  countyCode: string;
  countyName: string;
  allocated: number;
  spent: number;
  projectCount: number;
}

// ==================== API QUERY PARAMS ====================

export interface FinanceTransactionQueryParams {
  sourceId?: string;
  type?: FinanceTransactionType;
  sector?: string;
  countyCode?: string;
  fiscalYear?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface FinanceAllocationQueryParams {
  sourceId?: string;
  sector?: string;
  countyCode?: string;
  fiscalYear?: number;
  status?: AllocationStatus;
  page?: number;
  limit?: number;
}

export interface LoaQueryParams {
  status?: LoaStatus;
  mechanism?: Article6MechanismType;
  acquiringCountry?: string;
  registryProjectId?: string;
  page?: number;
  limit?: number;
}
