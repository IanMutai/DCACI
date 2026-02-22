import axios, { AxiosInstance } from "axios";

export interface MrvInventorySummary {
  year: number;
  totalEmissions: number;
  unit: string;
  sectors: {
    energy: number;
    ippu: number;
    agriculture: number;
    lulucf: number;
    waste: number;
  };
  completeness: number;
  status: "draft" | "submitted" | "approved";
}

export interface MrvActivityData {
  id: string;
  sector: string;
  category: string;
  subcategory: string;
  year: number;
  value: number;
  unit: string;
  source: string;
  status: "draft" | "submitted" | "reviewed" | "approved";
}

class MrvClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "/api/proxy/mrv",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getInventorySummary(year?: number): Promise<MrvInventorySummary> {
    const params = year ? { year } : {};
    const response = await this.client.get("/inventory/summary", { params });
    return response.data;
  }

  async getInventoryTimeSeries(
    startYear: number,
    endYear: number
  ): Promise<MrvInventorySummary[]> {
    const response = await this.client.get("/inventory/timeseries", {
      params: { startYear, endYear },
    });
    return response.data;
  }

  async getActivityData(params: {
    sector?: string;
    year?: number;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: MrvActivityData[]; total: number }> {
    const response = await this.client.get("/activity-data", { params });
    return response.data;
  }

  async submitActivityData(
    data: Omit<MrvActivityData, "id" | "status">
  ): Promise<MrvActivityData> {
    const response = await this.client.post("/activity-data", data);
    return response.data;
  }

  async getEmissionFactors(params: {
    sector?: string;
    gas?: string;
  }): Promise<unknown[]> {
    const response = await this.client.get("/emission-factors", { params });
    return response.data;
  }

  async getTotalEmissions(): Promise<{
    total: number;
    unit: string;
    changeFromBaseYear: number;
  }> {
    const response = await this.client.get("/emissions/total");
    return response.data;
  }

  async getQaqcStatus(): Promise<{
    status: string;
    completedChecks: number;
    totalChecks: number;
    issues: number;
  }> {
    const response = await this.client.get("/qaqc/status");
    return response.data;
  }
}

export const mrvClient = new MrvClient();
export default mrvClient;
