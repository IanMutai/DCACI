// ============================================================================
// Webhook Events
// ============================================================================

export enum EventType {
  // MRV Events
  MRV_INVENTORY_CREATED = "mrv.inventory.created",
  MRV_INVENTORY_UPDATED = "mrv.inventory.updated",
  MRV_INVENTORY_SUBMITTED = "mrv.inventory.submitted",
  MRV_INVENTORY_APPROVED = "mrv.inventory.approved",
  MRV_INVENTORY_PUBLISHED = "mrv.inventory.published",
  MRV_EMISSION_FACTOR_UPDATED = "mrv.emission_factor.updated",
  MRV_QAQC_COMPLETED = "mrv.qaqc.completed",

  // NDC Events
  NDC_CREATED = "ndc.created",
  NDC_UPDATED = "ndc.updated",
  NDC_SUBMITTED = "ndc.submitted",
  NDC_TARGET_UPDATED = "ndc.target.updated",
  NDC_PROGRESS_UPDATED = "ndc.progress.updated",
  NDC_POLICY_CREATED = "ndc.policy.created",
  NDC_POLICY_UPDATED = "ndc.policy.updated",
  NDC_SYNC_FROM_MRV = "ndc.sync_from_mrv",

  // Registry Events
  REGISTRY_PROJECT_CREATED = "registry.project.created",
  REGISTRY_PROJECT_REGISTERED = "registry.project.registered",
  REGISTRY_PROJECT_UPDATED = "registry.project.updated",
  REGISTRY_CREDIT_ISSUED = "registry.credit.issued",
  REGISTRY_CREDIT_TRANSFERRED = "registry.credit.transferred",
  REGISTRY_CREDIT_RETIRED = "registry.credit.retired",
  REGISTRY_TRANSACTION_COMPLETED = "registry.transaction.completed",
  REGISTRY_TRANSACTION_FAILED = "registry.transaction.failed",
}

export interface WebhookEvent<T = unknown> {
  id: string;
  type: EventType;
  version: string;
  timestamp: string;
  organizationId: string;
  source: "mrv" | "ndc" | "registry";
  data: T;
  metadata?: Record<string, unknown>;
}

export interface WebhookConfig {
  id: string;
  organizationId: string;
  url: string;
  secret: string;
  events: EventType[];
  isActive: boolean;
  failureCount: number;
  lastDeliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookDelivery {
  id: string;
  webhookConfigId: string;
  eventId: string;
  url: string;
  requestBody: string;
  responseStatus?: number;
  responseBody?: string;
  success: boolean;
  attempts: number;
  deliveredAt?: string;
  createdAt: string;
}
