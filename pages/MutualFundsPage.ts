import { Page, Locator, expect } from '@playwright/test';
import { dataTestIds } from '../fixtures/testData';

export class MutualFundsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly fundCards: Locator;
  readonly fundCardSequenceData: Locator;
  readonly categoryFilter: Locator;
  readonly riskFilter: Locator;
  readonly sortDropdown: Locator;
  readonly fundFilterSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTestId('fund-search-input');
    this.fundCards = page.locator('[data-testid^="fund-details-link"]');
    this.fundCardSequenceData = page.locator('[data-testid^="fund-card"]')
    this.categoryFilter = page.getByTestId('fund-category-filter');
    this.riskFilter = page.getByTestId('fund-risk-filter');
    this.sortDropdown = page.getByTestId('fund-sort-select');
    this.fundFilterSubmit = page.getByTestId('fund-filter-submit');
  }

  async goto() {
    await this.page.goto('/mutual-funds');
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async filterByCategory(category: string) {
    await this.categoryFilter.selectOption({ label: category });
    await this.fundFilterSubmit.click();
  }

  async filterByRisk(risk: string) {
    await this.riskFilter.selectOption({ label: risk });
  }

  async openFundByCode(fundCode: string) {
    await this.page.getByTestId(dataTestIds.mutualFunds.fundCard(fundCode)).click();
  }

  async expectResultsContainOnlyCategory(category: string) {
    const count = await this.fundCardSequenceData.count();
    for (let i = 0; i < count; i++) {
      await expect(this.fundCardSequenceData.nth(i)).toContainText(category);
    }
  }

  async getVisibleFundCount(): Promise<number> {
    return this.fundCards.count();
  }

  async addToWatchlist(fundCode: string) {
    const card = this.page.getByTestId(dataTestIds.mutualFunds.fundCard(fundCode));
    await card.getByRole('button', { name: /watchlist/i }).click();
  }
}
