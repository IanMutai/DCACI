// ============================================================================
// Registry Project Types
// ============================================================================

export enum ProjectStatus {
  CONCEPT = "CONCEPT",
  VALIDATION = "VALIDATION",
  REGISTERED = "REGISTERED",
  MONITORING = "MONITORING",
  VERIFICATION = "VERIFICATION",
  CREDIT_ISSUED = "CREDIT_ISSUED",
  COMPLETED = "COMPLETED",
  SUSPENDED = "SUSPENDED",
  WITHDRAWN = "WITHDRAWN",
}

export enum ProjectType {
  RENEWABLE_ENERGY = "RENEWABLE_ENERGY",
  ENERGY_EFFICIENCY = "ENERGY_EFFICIENCY",
  AFFORESTATION = "AFFORESTATION",
  REFORESTATION = "REFORESTATION",
  AVOIDED_DEFORESTATION = "AVOIDED_DEFORESTATION",
  WASTE_MANAGEMENT = "WASTE_MANAGEMENT",
  TRANSPORT = "TRANSPORT",
  INDUSTRIAL = "INDUSTRIAL",
  AGRICULTURE = "AGRICULTURE",
  CARBON_CAPTURE = "CARBON_CAPTURE",
  OTHER = "OTHER",
}

export enum MethodologyStandard {
  CDM = "CDM",
  VCS = "VCS",
  GOLD_STANDARD = "GOLD_STANDARD",
  ARTICLE_6_4 = "ARTICLE_6_4",
  NATIONAL = "NATIONAL",
  OTHER = "OTHER",
}

export interface Project {
  id: string;
  organizationId: string;
  registryId: string;
  title: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  methodology: MethodologyStandard;
  methodologyReference?: string;
  countryCode: string;
  region?: string;
  location?: GeoLocation;
  proponentName: string;
  proponentContact: string;
  startDate: string;
  endDate?: string;
  creditingPeriodStart: string;
  creditingPeriodEnd: string;
  estimatedAnnualReduction: number;
  totalEstimatedReduction: number;
  totalCreditsIssued: number;
  totalCreditsRetired: number;
  sector: string;
  cobenefits: string[];
  sdgGoals: number[];
  validationBody?: string;
  validationDate?: string;
  documents: ProjectDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  name?: string;
}

export interface ProjectDocument {
  id: string;
  projectId: string;
  type: "PDD" | "VALIDATION_REPORT" | "MONITORING_REPORT" | "VERIFICATION_REPORT" | "OTHER";
  title: string;
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface ProjectCreateInput {
  title: string;
  description: string;
  type: ProjectType;
  methodology: MethodologyStandard;
  methodologyReference?: string;
  countryCode: string;
  region?: string;
  location?: GeoLocation;
  proponentName: string;
  proponentContact: string;
  startDate: string;
  creditingPeriodStart: string;
  creditingPeriodEnd: string;
  estimatedAnnualReduction: number;
  sector: string;
  cobenefits?: string[];
  sdgGoals?: number[];
}

export interface ProjectUpdateInput {
  title?: string;
  description?: string;
  status?: ProjectStatus;
  endDate?: string;
  validationBody?: string;
  validationDate?: string;
  cobenefits?: string[];
  sdgGoals?: number[];
}

export interface ProjectFilter {
  status?: ProjectStatus;
  type?: ProjectType;
  countryCode?: string;
  sector?: string;
  methodology?: MethodologyStandard;
  search?: string;
}

export interface ProjectSummary {
  id: string;
  title: string;
  type: ProjectType;
  status: ProjectStatus;
  countryCode: string;
  totalCreditsIssued: number;
  totalCreditsRetired: number;
  updatedAt: string;
}
