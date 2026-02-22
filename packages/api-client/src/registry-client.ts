import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  Project,
  ProjectCreateInput,
  ProjectUpdateInput,
  ProjectFilter,
  ProjectSummary,
  Credit,
  CreditBalance,
  CreditIssuanceInput,
  TransferInput,
  RetirementInput,
  Transaction,
  TransactionFilter,
  ITMOSummary,
} from "@nctp/api-types";

import { BaseAPIClient, type ClientConfig } from "./base-client";

// ============================================================================
// Registry API Client
// ============================================================================

export class RegistryClient extends BaseAPIClient {
  private readonly basePath = "/api/v1/registry";

  constructor(config: ClientConfig) {
    super(config);
  }

  // --- Projects ---

  async getProjects(
    params?: ProjectFilter & PaginationParams
  ): Promise<PaginatedResponse<ProjectSummary>> {
    return this.get(`${this.basePath}/projects`, {
      ...this.buildPaginationParams(params),
      ...params,
    });
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    return this.get(`${this.basePath}/projects/${id}`);
  }

  async createProject(data: ProjectCreateInput): Promise<ApiResponse<Project>> {
    return this.post(`${this.basePath}/projects`, data);
  }

  async updateProject(id: string, data: ProjectUpdateInput): Promise<ApiResponse<Project>> {
    return this.patch(`${this.basePath}/projects/${id}`, data);
  }

  async deleteProject(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return this.delete(`${this.basePath}/projects/${id}`);
  }

  // --- Credits ---

  async getCredits(
    params?: PaginationParams & {
      projectId?: string;
      status?: string;
      vintageYear?: number;
    }
  ): Promise<PaginatedResponse<Credit>> {
    return this.get(`${this.basePath}/credits`, {
      ...this.buildPaginationParams(params),
      projectId: params?.projectId,
      status: params?.status,
      vintageYear: params?.vintageYear,
    });
  }

  async getCredit(id: string): Promise<ApiResponse<Credit>> {
    return this.get(`${this.basePath}/credits/${id}`);
  }

  async issueCredits(data: CreditIssuanceInput): Promise<ApiResponse<Credit[]>> {
    return this.post(`${this.basePath}/credits/issue`, data);
  }

  async transferCredits(data: TransferInput): Promise<ApiResponse<Transaction>> {
    return this.post(`${this.basePath}/credits/transfer`, data);
  }

  async retireCredits(data: RetirementInput): Promise<ApiResponse<Transaction>> {
    return this.post(`${this.basePath}/credits/retire`, data);
  }

  // --- Credit Balance ---

  async getCreditBalance(organizationId?: string): Promise<ApiResponse<CreditBalance>> {
    return this.get(`${this.basePath}/credits/balance`, {
      organizationId,
    });
  }

  // --- ITMO ---

  async getITMOSummary(countryCode?: string): Promise<ApiResponse<ITMOSummary>> {
    return this.get(`${this.basePath}/itmo/summary`, {
      countryCode,
    });
  }

  // --- Transactions ---

  async getTransactions(
    params?: TransactionFilter & PaginationParams
  ): Promise<PaginatedResponse<Transaction>> {
    return this.get(`${this.basePath}/transactions`, {
      ...this.buildPaginationParams(params),
      ...params,
    });
  }

  async getTransaction(id: string): Promise<ApiResponse<Transaction>> {
    return this.get(`${this.basePath}/transactions/${id}`);
  }
}
