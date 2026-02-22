// ============================================================================
// Registry Credit & Transaction Types
// ============================================================================

export enum CreditStatus {
  PENDING = "PENDING",
  ISSUED = "ISSUED",
  ACTIVE = "ACTIVE",
  TRANSFERRED = "TRANSFERRED",
  RETIRED = "RETIRED",
  CANCELLED = "CANCELLED",
  SUSPENDED = "SUSPENDED",
}

export enum CreditType {
  MITIGATION_OUTCOME = "MITIGATION_OUTCOME",
  ITMO = "ITMO",
  CARBON_CREDIT = "CARBON_CREDIT",
  EMISSION_REDUCTION = "EMISSION_REDUCTION",
}

export enum TransactionType {
  ISSUANCE = "ISSUANCE",
  TRANSFER = "TRANSFER",
  RETIREMENT = "RETIREMENT",
  CANCELLATION = "CANCELLATION",
  CONVERSION = "CONVERSION",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REVERSED = "REVERSED",
}

export interface Credit {
  id: string;
  serialNumber: string;
  projectId: string;
  organizationId: string;
  type: CreditType;
  status: CreditStatus;
  vintageYear: number;
  quantity: number;
  unit: string;
  originCountry: string;
  currentHolderId: string;
  issuedAt: string;
  issuedBy: string;
  retiredAt?: string;
  retiredBy?: string;
  retirementReason?: string;
  correspondingAdjustment: boolean;
  articleSixCompliant: boolean;
  verificationId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreditBalance {
  organizationId: string;
  totalIssued: number;
  totalActive: number;
  totalTransferred: number;
  totalRetired: number;
  totalCancelled: number;
  byType: Record<CreditType, number>;
  byVintage: Record<number, number>;
  asOfDate: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  creditIds: string[];
  quantity: number;
  unit: string;
  fromOrganizationId?: string;
  toOrganizationId?: string;
  fromCountry?: string;
  toCountry?: string;
  price?: number;
  currency?: string;
  correspondingAdjustment: boolean;
  authorizationCode?: string;
  purpose?: string;
  notes?: string;
  initiatedBy: string;
  approvedBy?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITMOSummary {
  countryCode: string;
  totalAuthorized: number;
  totalTransferredOut: number;
  totalTransferredIn: number;
  totalFirstTransfer: number;
  netPosition: number;
  correspondingAdjustments: number;
  bySector: Record<string, number>;
  byPartnerCountry: Record<string, number>;
  asOfDate: string;
}

export interface CreditIssuanceInput {
  projectId: string;
  type: CreditType;
  vintageYear: number;
  quantity: number;
  correspondingAdjustment: boolean;
  articleSixCompliant: boolean;
  verificationId?: string;
}

export interface TransferInput {
  creditIds: string[];
  toOrganizationId: string;
  toCountry?: string;
  price?: number;
  currency?: string;
  correspondingAdjustment: boolean;
  authorizationCode?: string;
  purpose?: string;
  notes?: string;
}

export interface RetirementInput {
  creditIds: string[];
  reason: string;
  beneficiary?: string;
  notes?: string;
}

export interface TransactionFilter {
  type?: TransactionType;
  status?: TransactionStatus;
  fromOrganizationId?: string;
  toOrganizationId?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
}
