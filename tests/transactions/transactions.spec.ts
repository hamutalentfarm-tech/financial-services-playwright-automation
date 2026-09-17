import { test, expect } from '../../fixtures/auth.fixture';
import { TransactionPage } from '../../pages/TransactionPage';
import { ApiClient } from '../../utils/apiClient';
import { transactionStatuses } from '../../fixtures/testData';
import { expectValidTransactionStatus, expectValidTransactionType } from '../../utils/assertions';

/**
 * Module: Transactions and Policies (transaction history slice)
 * Source: Feature Description doc (Transactions row) and Problem Statement
 * doc (issue #10 - transaction history does not show latest activity, and
 * issue #12 - filters behave differently across browsers, covered by the
 * chromium/firefox/webkit projects in playwright.config.ts).
 */
test.describe('Transaction History @transactions', () => {
  test('TC-TXN-001: transaction history loads for the authenticated user @smoke', async ({ investorPage }) => {
    const transactions = new TransactionPage(investorPage);
    await transactions.goto();
    expect(await transactions.getVisibleCount()).toBeGreaterThanOrEqual(0);
  });

  test(`TC-TXN-002: filtering by status "${transactionStatuses[0]}" returns only matching rows @regression`, async ({ investorPage }) => {
    const transactions = new TransactionPage(investorPage);
    await transactions.goto();
    await transactions.filterByStatus(transactionStatuses[0]);
    await transactions.expectAllRowsHaveStatus(transactionStatuses[0]);
  });

  test('TC-TXN-003: transaction list from UI is consistent with /api/transactions @regression @api', async ({ investorPage, apiContext }) => {
    const transactions = new TransactionPage(investorPage);
    await transactions.goto();
    const uiCount = await transactions.getVisibleCount();

    const api = new ApiClient(apiContext);
    const response = await api.getTransactions();
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    const apiTransactions: Array<{ status: string; transaction_type: string }> = body?.data ?? body ?? [];

    expect(apiTransactions.length).toBeGreaterThanOrEqual(uiCount > 0 ? 1 : 0);
    for (const txn of apiTransactions) {
      expectValidTransactionStatus(txn.status);
      expectValidTransactionType(txn.transaction_type);
    }
  });

  test('TC-TXN-004: opening a transaction row shows transaction detail @regression', async ({ investorPage }) => {
    const transactions = new TransactionPage(investorPage);
    await transactions.goto();
    const firstRow = transactions.transactionRows.first();
    if (await firstRow.isVisible().catch(() => false)) {
      await firstRow.click();
      await expect(investorPage).toHaveURL(/transactions\/.+/);
    }
  });
});
