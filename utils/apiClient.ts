import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Thin wrapper around Playwright's APIRequestContext for the FinServe API
 * (base path /api, auth via static X-API-Key header). Keeps endpoint paths
 * in one place so tests reference methods, not raw URL strings.
 */
export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  health(): Promise<APIResponse> {
    return this.request.get('health');
  }

  login(payload: { email: string; password: string }): Promise<APIResponse> {
    return this.request.post('login', { data: payload });
  }

  getDashboard(): Promise<APIResponse> {
    return this.request.get('dashboard');
  }

  getMutualFunds(): Promise<APIResponse> {
    return this.request.get('mutual-funds');
  }

  getMutualFundById(id: string | number): Promise<APIResponse> {
    return this.request.get(`mutual-funds/${id}`);
  }

  getPortfolio(): Promise<APIResponse> {
    return this.request.get('portfolio');
  }

  createInvestment(payload: Record<string, unknown>): Promise<APIResponse> {
    return this.request.post('investments', { data: payload });
  }

  createRedemption(payload: Record<string, unknown>): Promise<APIResponse> {
    return this.request.post('redemptions', { data: payload });
  }

  getInsuranceProducts(): Promise<APIResponse> {
    return this.request.get('insurance-products');
  }

  getInsuranceProductById(id: string | number): Promise<APIResponse> {
    return this.request.get(`insurance-products/${id}`);
  }

  createPolicy(payload: Record<string, unknown>): Promise<APIResponse> {
    return this.request.post('policies', { data: payload });
  }

  getPolicies(): Promise<APIResponse> {
    return this.request.get('policies');
  }

  getPolicyById(id: string | number): Promise<APIResponse> {
    return this.request.get(`policies/${id}`);
  }

  getTransactions(): Promise<APIResponse> {
    return this.request.get('transactions');
  }

  getTransactionById(id: string | number): Promise<APIResponse> {
    return this.request.get(`transactions/${id}`);
  }

  /** Issue a raw request without the API key header, to test unauthorized (401) handling. */
  async withoutApiKey(method: 'get' | 'post', path: string, data?: Record<string, unknown>): Promise<APIResponse> {
    return this.request[method](path, {
      data,
      headers: { 'X-API-Key': '' },
    });
  }
}
