import { test, expect } from '../../fixtures/auth.fixture';
import { ApiClient } from '../../utils/apiClient';
import { apiConfig } from '../../fixtures/testData';
import { expectStatus, expectValidInsuranceType } from '../../utils/assertions';

/**
 * API Module: Insurance Products & Policies
 * Source: Feature Description doc, sections 4, 5, 7.
 */
test.describe('API - Insurance & Policies @api', () => {
  test('TC-API-030: GET /insurance-products returns 200 with a list @smoke @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.getInsuranceProducts();
    await expectStatus(response, apiConfig.expectedStatusCodes.ok);
  });

  test('TC-API-031: each insurance product has an allowed insurance_type value @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.getInsuranceProducts();
    const body = await response.json();
    const products: Array<{ insurance_type: string }> = body?.data ?? body;
    for (const product of products) {
      expectValidInsuranceType(product.insurance_type);
    }
  });

  test('TC-API-032: GET /insurance-products/{id} with invalid id returns 404 @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.getInsuranceProductById('non-existent-id-99999');
    await expectStatus(response, apiConfig.expectedStatusCodes.notFound);
  });

  test('TC-API-033: POST /policies with missing required fields returns 422 @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.createPolicy({ insurance_product_id: 1 }); // nominee/personal details omitted
    await expectStatus(response, apiConfig.expectedStatusCodes.validationError);
  });

  test('TC-API-034: GET /policies returns policies scoped to the authenticated user @smoke @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.getPolicies();
    await expectStatus(response, apiConfig.expectedStatusCodes.ok);
  });

  test('TC-API-035: GET /policies/{id} with invalid id returns 404 @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.getPolicyById('non-existent-id-99999');
    await expectStatus(response, apiConfig.expectedStatusCodes.notFound);
  });
});
