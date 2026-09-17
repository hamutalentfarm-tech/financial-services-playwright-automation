import { test, expect } from '../../fixtures/auth.fixture';
import { ApiClient } from '../../utils/apiClient';
import { apiConfig, redemptionTestData } from '../../fixtures/testData';
import { expectStatus } from '../../utils/assertions';

/**
 * API Module: Portfolio & Redemptions
 * Source: Feature Description doc, sections 4, 7 (Portfolio / Redemption rows).
 */
test.describe('API - Portfolio & Redemptions @api', () => {
  test('TC-API-020: GET /portfolio returns 200 with holdings scoped to the caller @smoke @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.getPortfolio();
    await expectStatus(response, apiConfig.expectedStatusCodes.ok);
  });

  test('TC-API-021: POST /redemptions exceeding available units returns 422 @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.createRedemption({
      holding_id: 1,
      units: redemptionTestData.exceedsAvailableUnits,
    });
    await expectStatus(response, apiConfig.expectedStatusCodes.validationError);
  });

  test('TC-API-022: POST /redemptions with negative units returns 422 @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.createRedemption({
      holding_id: 1,
      units: redemptionTestData.negativeUnits,
    });
    await expectStatus(response, apiConfig.expectedStatusCodes.validationError);
  });
});
