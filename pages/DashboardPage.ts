import { Page, Locator, expect } from '@playwright/test';
import { dataTestIds } from '../fixtures/testData';
import { parseCurrencyToNumber } from '../utils/testHelpers';

export class DashboardPage {
  readonly page: Page;
  readonly root: Locator;
  readonly portfolioSummaryCard: Locator;
  readonly policySummaryCard: Locator;
  readonly recentTransactionsSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId(dataTestIds.dashboard);
    this.portfolioSummaryCard = page.getByTestId(dataTestIds.portfolio.totalValue);
    this.policySummaryCard = page.getByRole('region', { name: /polic/i });
    this.recentTransactionsSection = page.getByRole('region', { name: /recent transactions/i });
  }

  async goto() {
    await this.page.goto('/dashboard');
  }

  async expectLoaded() {
    await expect(this.root).toBeVisible();
  }

  async getPortfolioTotalValue(): Promise<number> {
    const text = (await this.portfolioSummaryCard.textContent()) ?? '0';
    return parseCurrencyToNumber(text);
  }

  async navigateToMutualFunds() {
    await this.page.getByRole('link', { name: /mutual fund/i }).click();
  }

  async navigateToInsurance() {
    await this.page.getByRole('link', { name: /insurance/i }).click();
  }

  async navigateToPortfolio() {
    await this.page.getByRole('link', { name: /portfolio/i }).click();
  }

  async navigateToTransactions() {
    await this.page.getByRole('link', { name: /transaction/i }).click();
  }
}
