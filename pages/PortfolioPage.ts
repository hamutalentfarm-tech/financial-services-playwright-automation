import { Page, Locator, expect } from '@playwright/test';
import { dataTestIds } from '../fixtures/testData';
import { parseCurrencyToNumber } from '../utils/testHelpers';

export class PortfolioPage {
  readonly page: Page;
  readonly totalValue: Locator;
  readonly holdingsRows: Locator;
  readonly statementDownloadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.totalValue = page.getByTestId('portfolio-total');
    this.holdingsRows = page.locator('[data-testid^="holding-current-value-"]');
    this.statementDownloadButton = page.getByRole('button', { name: /download statement/i });
  }

  async goto() {
    await this.page.goto('/portfolio');
  }

  async getTotalValue(): Promise<number> {
    return parseCurrencyToNumber((await this.totalValue.textContent()) ?? '0');
  }

  async openHolding(holdingId: string) {
    await this.page.getByTestId(dataTestIds.holdings.row(holdingId)).click();
  }

  async getHoldingsCount(): Promise<number> {
    return this.holdingsRows.count();
  }

  async expectHoldingVisible(holdingId: string) {
    await expect(this.page.getByTestId(dataTestIds.holdings.row(holdingId))).toBeVisible();
  }

  async downloadStatement() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.statementDownloadButton.click(),
    ]);
    return download;
  }
}
