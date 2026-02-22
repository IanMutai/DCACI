// ============================================================================
// Organization / Tenant Types
// ============================================================================

export enum OrganizationType {
  GOVERNMENT = "GOVERNMENT",
  MINISTRY = "MINISTRY",
  AGENCY = "AGENCY",
  PRIVATE_SECTOR = "PRIVATE_SECTOR",
  NGO = "NGO",
  MULTILATERAL = "MULTILATERAL",
  ACADEMIC = "ACADEMIC",
}

export enum TenantTier {
  FREE = "FREE",
  BASIC = "BASIC",
  PROFESSIONAL = "PROFESSIONAL",
  ENTERPRISE = "ENTERPRISE",
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: OrganizationType;
  tier: TenantTier;
  countryCode: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  address?: Address;
  contactEmail: string;
  contactPhone?: string;
  settings: OrganizationSettings;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country: string;
}

export interface OrganizationSettings {
  defaultCurrency: string;
  defaultLanguage: string;
  timezone: string;
  enableMRV: boolean;
  enableNDC: boolean;
  enableRegistry: boolean;
  inventoryYearStart?: number;
  reportingFrequency: "ANNUAL" | "BIENNIAL" | "QUARTERLY";
}

export interface OrganizationCreateInput {
  name: string;
  type: OrganizationType;
  countryCode: string;
  contactEmail: string;
  description?: string;
  website?: string;
  contactPhone?: string;
}

export interface OrganizationUpdateInput {
  name?: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: Address;
  settings?: Partial<OrganizationSettings>;
}

export interface Tenant {
  id: string;
  organizationId: string;
  tier: TenantTier;
  maxUsers: number;
  maxProjects: number;
  storageQuotaMB: number;
  features: string[];
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}
