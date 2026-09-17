import { test, expect } from '../../fixtures/auth.fixture';
import { ApiClient } from '../../utils/apiClient';
import { users, invalidUser } from '../../fixtures/users';
import { apiConfig } from '../../fixtures/testData';
import { expectStatus } from '../../utils/assertions';

/**
 * API Module: Health & Login
 * Source: Feature Description doc, section 7 (API Coverage) and section 8 (Auth header).
 */
test.describe('API - Health & Auth @api', () => {
  test('TC-API-001: GET /health returns 200 @smoke @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.health();
    await expectStatus(response, apiConfig.expectedStatusCodes.ok);
  });

  test('TC-API-002: POST /login with valid credentials returns 200 @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.login({ email: users.qaUser.email, password: users.qaUser.password });
    await expectStatus(response, apiConfig.expectedStatusCodes.ok);
  });

  test('TC-API-003: POST /login with invalid credentials returns a validation/auth error @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.login({ email: invalidUser.email, password: invalidUser.password });
    expect([apiConfig.expectedStatusCodes.unauthorized, apiConfig.expectedStatusCodes.validationError]).toContain(response.status());
  });

  test('TC-API-004: request without X-API-Key header returns 401 @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.withoutApiKey('get', '/dashboard');
    await expectStatus(response, apiConfig.expectedStatusCodes.unauthorized);
  });
});
