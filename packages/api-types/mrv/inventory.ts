// ============================================================================
// MRV Inventory Types
// ============================================================================

export enum InventoryStatus {
  DRAFT = "DRAFT",
  IN_REVIEW = "IN_REVIEW",
  APPROVED = "APPROVED",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum DataQuality {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  DEFAULT = "DEFAULT",
}

export enum IPCCSector {
  ENERGY = "ENERGY",
  IPPU = "IPPU",
  AGRICULTURE = "AGRICULTURE",
  LULUCF = "LULUCF",
  WASTE = "WASTE",
  OTHER = "OTHER",
}

export interface Inventory {
  id: string;
  organizationId: string;
  year: number;
  status: InventoryStatus;
  countryCode: string;
  title: string;
  description?: string;
  baseYear?: number;
  methodology: string;
  sectors: SectorData[];
  totalEmissions: number;
  totalRemovals: number;
  netEmissions: number;
  unit: string;
  dataQuality: DataQuality;
  verifiedAt?: string;
  verifiedBy?: string;
  submittedAt?: string;
  submittedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SectorData {
  id: string;
  inventoryId: string;
  sector: IPCCSector;
  name: string;
  description?: string;
  totalEmissions: number;
  totalRemovals: number;
  netEmissions: number;
  categories: CategoryData[];
  completeness: number;
  dataQuality: DataQuality;
  notes?: string;
}

export interface CategoryData {
  id: string;
  sectorDataId: string;
  code: string;
  name: string;
  description?: string;
  totalEmissions: number;
  totalRemovals: number;
  activities: ActivityData[];
  methodology?: string;
  tier: 1 | 2 | 3;
  isKeyCategory: boolean;
}

export interface ActivityData {
  id: string;
  categoryDataId: string;
  name: string;
  description?: string;
  activityValue: number;
  activityUnit: string;
  emissionFactorId?: string;
  emissionFactorValue: number;
  emissionFactorUnit: string;
  emissions: number;
  ghgType: string;
  gwpValue: number;
  co2Equivalent: number;
  dataSource: string;
  dataQuality: DataQuality;
  uncertainty?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryCreateInput {
  year: number;
  countryCode: string;
  title: string;
  description?: string;
  baseYear?: number;
  methodology: string;
}

export interface InventoryUpdateInput {
  title?: string;
  description?: string;
  status?: InventoryStatus;
  methodology?: string;
}

export interface InventorySummary {
  id: string;
  year: number;
  status: InventoryStatus;
  totalEmissions: number;
  netEmissions: number;
  sectorCount: number;
  completeness: number;
  updatedAt: string;
}

export interface QAQCRecord {
  id: string;
  inventoryId: string;
  checkType: "QA" | "QC";
  category: string;
  description: string;
  status: "PASS" | "FAIL" | "WARNING" | "PENDING";
  findings?: string;
  recommendations?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}
