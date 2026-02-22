import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  Inventory,
  InventoryCreateInput,
  InventoryUpdateInput,
  InventorySummary,
  SectorData,
  EmissionFactor,
  EmissionFactorCreateInput,
  EmissionFactorFilter,
  EmissionsSummary,
  EmissionTrend,
  QAQCRecord,
  ActivityData,
  CategoryData,
} from "@nctp/api-types";

import { BaseAPIClient, type ClientConfig } from "./base-client";

// ============================================================================
// MRV API Client
// ============================================================================

export class MRVClient extends BaseAPIClient {
  private readonly basePath = "/api/v1/mrv";

  constructor(config: ClientConfig) {
    super(config);
  }

  // --- Inventories ---

  async getInventories(
    params?: PaginationParams & { year?: number; status?: string; countryCode?: string }
  ): Promise<PaginatedResponse<InventorySummary>> {
    return this.get(`${this.basePath}/inventories`, {
      ...this.buildPaginationParams(params),
      year: params?.year,
      status: params?.status,
      countryCode: params?.countryCode,
    });
  }

  async getInventory(id: string): Promise<ApiResponse<Inventory>> {
    return this.get(`${this.basePath}/inventories/${id}`);
  }

  async createInventory(data: InventoryCreateInput): Promise<ApiResponse<Inventory>> {
    return this.post(`${this.basePath}/inventories`, data);
  }

  async updateInventory(id: string, data: InventoryUpdateInput): Promise<ApiResponse<Inventory>> {
    return this.patch(`${this.basePath}/inventories/${id}`, data);
  }

  async deleteInventory(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return this.delete(`${this.basePath}/inventories/${id}`);
  }

  async submitInventory(id: string): Promise<ApiResponse<Inventory>> {
    return this.post(`${this.basePath}/inventories/${id}/submit`);
  }

  async approveInventory(id: string): Promise<ApiResponse<Inventory>> {
    return this.post(`${this.basePath}/inventories/${id}/approve`);
  }

  // --- Sectors ---

  async getSectors(inventoryId: string): Promise<ApiResponse<SectorData[]>> {
    return this.get(`${this.basePath}/inventories/${inventoryId}/sectors`);
  }

  async getSector(inventoryId: string, sectorId: string): Promise<ApiResponse<SectorData>> {
    return this.get(`${this.basePath}/inventories/${inventoryId}/sectors/${sectorId}`);
  }

  // --- Categories & Activities ---

  async getCategories(inventoryId: string, sectorId: string): Promise<ApiResponse<CategoryData[]>> {
    return this.get(`${this.basePath}/inventories/${inventoryId}/sectors/${sectorId}/categories`);
  }

  async getActivities(
    inventoryId: string,
    sectorId: string,
    categoryId: string
  ): Promise<ApiResponse<ActivityData[]>> {
    return this.get(
      `${this.basePath}/inventories/${inventoryId}/sectors/${sectorId}/categories/${categoryId}/activities`
    );
  }

  // --- Emissions ---

  async getEmissions(inventoryId: string): Promise<ApiResponse<EmissionsSummary>> {
    return this.get(`${this.basePath}/inventories/${inventoryId}/emissions`);
  }

  async getTotalEmissions(params?: {
    countryCode?: string;
    startYear?: number;
    endYear?: number;
  }): Promise<ApiResponse<EmissionTrend[]>> {
    return this.get(`${this.basePath}/emissions/total`, params);
  }

  async getEmissionTrends(params?: {
    countryCode?: string;
    sector?: string;
    startYear?: number;
    endYear?: number;
  }): Promise<ApiResponse<EmissionTrend[]>> {
    return this.get(`${this.basePath}/emissions/trends`, params);
  }

  // --- Emission Factors ---

  async getEmissionFactors(
    filter?: EmissionFactorFilter & PaginationParams
  ): Promise<PaginatedResponse<EmissionFactor>> {
    return this.get(`${this.basePath}/emission-factors`, {
      ...this.buildPaginationParams(filter),
      ...filter,
    });
  }

  async getEmissionFactor(id: string): Promise<ApiResponse<EmissionFactor>> {
    return this.get(`${this.basePath}/emission-factors/${id}`);
  }

  async createEmissionFactor(data: EmissionFactorCreateInput): Promise<ApiResponse<EmissionFactor>> {
    return this.post(`${this.basePath}/emission-factors`, data);
  }

  // --- QA/QC ---

  async getQAQCRecords(inventoryId: string): Promise<ApiResponse<QAQCRecord[]>> {
    return this.get(`${this.basePath}/inventories/${inventoryId}/qaqc`);
  }

  async runQAQC(inventoryId: string): Promise<ApiResponse<QAQCRecord[]>> {
    return this.post(`${this.basePath}/inventories/${inventoryId}/qaqc/run`);
  }
}
