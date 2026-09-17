import { test, expect } from '../../fixtures/auth.fixture';
import { ApiClient } from '../../utils/apiClient';
import { apiConfig, investmentTestData } from '../../fixtures/testData';
import { expectStatus, expectValidFundCategory, expectValidRiskLevel } from '../../utils/assertions';

/**
 * API Module: Mutual Funds & Investments
 * Source: Feature Description doc, sections 4, 5, 7 (Mutual Funds / Investment rows and data entities).
 */
test.describe('API - Mutual Funds @api', () => {
  test('TC-API-010: GET /mutual-funds returns 200 with a list @smoke @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.getMutualFunds();
    await expectStatus(response, apiConfig.expectedStatusCodes.ok);
    const body = await response.json();
    const funds = body?.data ?? body;
    expect(Array.isArray(funds)).toBeTruthy();
  });

  test('TC-API-011: each fund exposes required fields with allowed category/risk values @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.getMutualFunds();
    const body = await response.json();
    const funds: Array<{ fund_code: string; category: string; risk_level: string }> = body?.data ?? body;

    for (const fund of funds) {
      expect(fund.fund_code).toBeTruthy();
      expectValidFundCategory(fund.category);
      expectValidRiskLevel(fund.risk_level);
    }
  });

  test('TC-API-012: GET /mutual-funds/{id} returns fund details for a valid id @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const listResponse = await api.getMutualFunds();
    const listBody = await listResponse.json();
    const funds = listBody?.data ?? listBody;
    test.skip(!funds?.length, 'No funds returned from list endpoint to derive a valid id from');

    const response = await api.getMutualFundById(funds[0].id ?? funds[0].fund_code);
    await expectStatus(response, apiConfig.expectedStatusCodes.ok);
  });

  test('TC-API-013: GET /mutual-funds/{id} with an invalid id returns 404 @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.getMutualFundById('non-existent-id-99999');
    await expectStatus(response, apiConfig.expectedStatusCodes.notFound);
  });

  test('TC-API-014: POST /investments below minimum amount returns 422 @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.createInvestment({
      fund_id: 1,
      investment_type: 'Lumpsum',
      amount: investmentTestData.belowMinimumAmount,
    });
    await expectStatus(response, apiConfig.expectedStatusCodes.validationError);
  });

  test('TC-API-015: POST /investments with valid payload returns 201 @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.createInvestment({
      fund_id: 1,
      investment_type: 'Lumpsum',
      amount: investmentTestData.validLumpsumAmount,
    });
    await expectStatus(response, apiConfig.expectedStatusCodes.created);
  });
});
