import axios, { AxiosInstance } from "axios";

export interface RegistryProject {
  id: string;
  projectId: string;
  name: string;
  type: string;
  methodology: string;
  status: "registration" | "validation" | "verification" | "active" | "completed";
  totalCredits: number;
  issuedCredits: number;
  location: string;
  startDate: string;
  creditingPeriodEnd: string;
}

export interface CreditTransaction {
  id: string;
  type: "issuance" | "transfer" | "retirement" | "cancellation";
  projectId: string;
  projectName: string;
  amount: number;
  unit: string;
  serialNumberStart: string;
  serialNumberEnd: string;
  date: string;
  counterparty?: string;
  isItmo: boolean;
}

export interface RegistrySummary {
  totalCreditsIssued: number;
  totalCreditsTransferred: number;
  totalCreditsRetired: number;
  totalCreditsCancelled: number;
  activeProjects: number;
  pendingVerifications: number;
}

class RegistryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "/api/proxy/registry",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getSummary(): Promise<RegistrySummary> {
    const response = await this.client.get("/summary");
    return response.data;
  }

  async getProjects(params?: {
    status?: string;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: RegistryProject[]; total: number }> {
    const response = await this.client.get("/projects", { params });
    return response.data;
  }

  async getProject(id: string): Promise<RegistryProject> {
    const response = await this.client.get(`/projects/${id}`);
    return response.data;
  }

  async registerProject(
    data: Omit<RegistryProject, "id" | "status" | "issuedCredits">
  ): Promise<RegistryProject> {
    const response = await this.client.post("/projects", data);
    return response.data;
  }

  async getTransactions(params?: {
    type?: string;
    projectId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: CreditTransaction[]; total: number }> {
    const response = await this.client.get("/transactions", { params });
    return response.data;
  }

  async issueCredits(data: {
    projectId: string;
    amount: number;
    vintageYear: number;
    monitoringPeriod: string;
  }): Promise<CreditTransaction> {
    const response = await this.client.post("/credits/issue", data);
    return response.data;
  }

  async transferCredits(data: {
    serialNumbers: string[];
    recipientAccount: string;
    isItmo: boolean;
  }): Promise<CreditTransaction> {
    const response = await this.client.post("/credits/transfer", data);
    return response.data;
  }

  async retireCredits(data: {
    serialNumbers: string[];
    reason: string;
    beneficiary?: string;
  }): Promise<CreditTransaction> {
    const response = await this.client.post("/credits/retire", data);
    return response.data;
  }
}

export const registryClient = new RegistryClient();
export default registryClient;
