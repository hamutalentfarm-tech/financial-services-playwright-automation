import { Page, Locator, expect } from '@playwright/test';
import { dataTestIds } from '../fixtures/testData';

export class TransactionPage {
  readonly page: Page;
  readonly statusFilter: Locator;
  readonly transactionRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.statusFilter = page.getByTestId(dataTestIds.transactions.statusFilter);
    this.transactionRows = page.locator('[data-testid^="transaction-row-"]');
  }

  async goto() {
    await this.page.goto('/transactions');
  }

  async filterByStatus(status: string) {
    await this.statusFilter.selectOption({ label: status });
  }

  async openTransaction(transactionId: string) {
    await this.page.getByTestId(dataTestIds.transactions.row(transactionId)).click();
  }

  async getVisibleCount(): Promise<number> {
    return this.transactionRows.count();
  }

  async expectAllRowsHaveStatus(status: string) {
    const count = await this.transactionRows.count();
    for (let i = 0; i < count; i++) {
      await expect(this.transactionRows.nth(i)).toContainText(status);
    }
  }

  async expectLatestTransactionVisible(transactionId: string) {
    await expect(this.page.getByTestId(dataTestIds.transactions.row(transactionId))).toBeVisible();
  }
}
