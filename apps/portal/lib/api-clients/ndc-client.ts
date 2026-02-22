import axios, { AxiosInstance } from "axios";

export interface NdcTarget {
  id: string;
  ndcCycle: string;
  targetYear: number;
  baselineYear: number;
  unconditionalTarget: number;
  conditionalTarget: number;
  targetMetric: "absolute" | "intensity" | "bau";
  currentProgress: number;
}

export interface MitigationAction {
  id: string;
  name: string;
  sector: string;
  description: string;
  expectedReduction: number;
  unit: string;
  status: "planned" | "in_progress" | "completed";
  progress: number;
  startDate: string;
  endDate: string;
}

export interface NdcProgress {
  unconditionalProgress: number;
  conditionalProgress: number;
  totalMitigationActions: number;
  activeMitigationActions: number;
  totalExpectedReduction: number;
}

class NdcClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "/api/proxy/ndc",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getCurrentTarget(): Promise<NdcTarget> {
    const response = await this.client.get("/targets/current");
    return response.data;
  }

  async getTargets(): Promise<NdcTarget[]> {
    const response = await this.client.get("/targets");
    return response.data;
  }

  async getProgress(): Promise<NdcProgress> {
    const response = await this.client.get("/progress");
    return response.data;
  }

  async getMitigationActions(params?: {
    sector?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: MitigationAction[]; total: number }> {
    const response = await this.client.get("/mitigation-actions", { params });
    return response.data;
  }

  async createMitigationAction(
    data: Omit<MitigationAction, "id">
  ): Promise<MitigationAction> {
    const response = await this.client.post("/mitigation-actions", data);
    return response.data;
  }

  async updateMitigationAction(
    id: string,
    data: Partial<MitigationAction>
  ): Promise<MitigationAction> {
    const response = await this.client.patch(
      `/mitigation-actions/${id}`,
      data
    );
    return response.data;
  }

  async getCorrespondingAdjustments(): Promise<unknown[]> {
    const response = await this.client.get("/corresponding-adjustments");
    return response.data;
  }
}

export const ndcClient = new NdcClient();
export default ndcClient;
