import { test, expect } from '../../fixtures/auth.fixture';
import { ApiClient } from '../../utils/apiClient';
import { apiConfig } from '../../fixtures/testData';
import { expectStatus, expectValidTransactionStatus, expectValidTransactionType } from '../../utils/assertions';

/**
 * API Module: Transactions
 * Source: Feature Description doc, sections 4, 5, 7 (Transactions row and data entity).
 */
test.describe('API - Transactions @api', () => {
  test('TC-API-040: GET /transactions returns 200 with a list @smoke @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.getTransactions();
    await expectStatus(response, apiConfig.expectedStatusCodes.ok);
  });

  test('TC-API-041: every transaction has an allowed status and type value @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.getTransactions();
    const body = await response.json();
    const transactions: Array<{ status: string; transaction_type: string }> = body?.data ?? body;

    for (const txn of transactions) {
      expectValidTransactionStatus(txn.status);
      expectValidTransactionType(txn.transaction_type);
    }
  });

  test('TC-API-042: GET /transactions/{id} with invalid id returns 404 @regression @api', async ({ apiContext }) => {
    const api = new ApiClient(apiContext);
    const response = await api.getTransactionById('non-existent-id-99999');
    await expectStatus(response, apiConfig.expectedStatusCodes.notFound);
  });
});
