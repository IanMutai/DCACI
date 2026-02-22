import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  NDC,
  NDCCreateInput,
  NDCProgress,
  Target,
  TargetCreateInput,
  Baseline,
  GapAnalysis,
  PolicyMeasure,
  PolicyMeasureCreateInput,
  PolicyMeasureUpdateInput,
  PolicyMeasureFilter,
} from "@nctp/api-types";

import { BaseAPIClient, type ClientConfig } from "./base-client";

// ============================================================================
// NDC API Client
// ============================================================================

export class NDCClient extends BaseAPIClient {
  private readonly basePath = "/api/v1/ndc";

  constructor(config: ClientConfig) {
    super(config);
  }

  // --- NDCs ---

  async getNDCs(
    params?: PaginationParams & { countryCode?: string; status?: string }
  ): Promise<PaginatedResponse<NDC>> {
    return this.get(`${this.basePath}/ndcs`, {
      ...this.buildPaginationParams(params),
      countryCode: params?.countryCode,
      status: params?.status,
    });
  }

  async getNDC(id: string): Promise<ApiResponse<NDC>> {
    return this.get(`${this.basePath}/ndcs/${id}`);
  }

  async createNDC(data: NDCCreateInput): Promise<ApiResponse<NDC>> {
    return this.post(`${this.basePath}/ndcs`, data);
  }

  async updateNDC(id: string, data: Partial<NDCCreateInput>): Promise<ApiResponse<NDC>> {
    return this.patch(`${this.basePath}/ndcs/${id}`, data);
  }

  // --- Targets ---

  async getTargets(ndcId: string): Promise<ApiResponse<Target[]>> {
    return this.get(`${this.basePath}/ndcs/${ndcId}/targets`);
  }

  async getTarget(ndcId: string, targetId: string): Promise<ApiResponse<Target>> {
    return this.get(`${this.basePath}/ndcs/${ndcId}/targets/${targetId}`);
  }

  async createTarget(data: TargetCreateInput): Promise<ApiResponse<Target>> {
    return this.post(`${this.basePath}/ndcs/${data.ndcId}/targets`, data);
  }

  async updateTarget(
    ndcId: string,
    targetId: string,
    data: Partial<TargetCreateInput>
  ): Promise<ApiResponse<Target>> {
    return this.patch(`${this.basePath}/ndcs/${ndcId}/targets/${targetId}`, data);
  }

  // --- Progress ---

  async getProgress(ndcId: string): Promise<ApiResponse<NDCProgress[]>> {
    return this.get(`${this.basePath}/ndcs/${ndcId}/progress`);
  }

  async getTargetProgress(ndcId: string, targetId: string): Promise<ApiResponse<NDCProgress>> {
    return this.get(`${this.basePath}/ndcs/${ndcId}/targets/${targetId}/progress`);
  }

  // --- Sync from MRV ---

  async syncFromMRV(ndcId: string, options?: {
    inventoryId?: string;
    year?: number;
  }): Promise<ApiResponse<{ synced: boolean; updatedTargets: string[] }>> {
    return this.post(`${this.basePath}/ndcs/${ndcId}/sync-mrv`, options);
  }

  // --- Baselines ---

  async getBaselines(ndcId: string): Promise<ApiResponse<Baseline[]>> {
    return this.get(`${this.basePath}/ndcs/${ndcId}/baselines`);
  }

  async createBaseline(ndcId: string, data: Omit<Baseline, "id" | "ndcId" | "createdAt" | "updatedAt">): Promise<ApiResponse<Baseline>> {
    return this.post(`${this.basePath}/ndcs/${ndcId}/baselines`, data);
  }

  // --- Gap Analysis ---

  async getGapAnalysis(ndcId: string): Promise<ApiResponse<GapAnalysis[]>> {
    return this.get(`${this.basePath}/ndcs/${ndcId}/gap-analysis`);
  }

  async getTargetGapAnalysis(ndcId: string, targetId: string): Promise<ApiResponse<GapAnalysis>> {
    return this.get(`${this.basePath}/ndcs/${ndcId}/targets/${targetId}/gap-analysis`);
  }

  // --- Policies ---

  async getPolicies(
    params?: PolicyMeasureFilter & PaginationParams
  ): Promise<PaginatedResponse<PolicyMeasure>> {
    return this.get(`${this.basePath}/policies`, {
      ...this.buildPaginationParams(params),
      ...params,
    });
  }

  async getPolicy(id: string): Promise<ApiResponse<PolicyMeasure>> {
    return this.get(`${this.basePath}/policies/${id}`);
  }

  async createPolicy(data: PolicyMeasureCreateInput): Promise<ApiResponse<PolicyMeasure>> {
    return this.post(`${this.basePath}/policies`, data);
  }

  async updatePolicy(id: string, data: PolicyMeasureUpdateInput): Promise<ApiResponse<PolicyMeasure>> {
    return this.patch(`${this.basePath}/policies/${id}`, data);
  }
}
