import { Page, Locator, expect } from '@playwright/test';
import { dataTestIds } from '../fixtures/testData';

export class MutualFundsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly fundCards: Locator;
  readonly categoryFilter: Locator;
  readonly riskFilter: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTestId(dataTestIds.mutualFunds.searchInput);
    this.fundCards = page.locator('[data-testid^="fund-card-"]');
    this.categoryFilter = page.getByLabel(/category/i);
    this.riskFilter = page.getByLabel(/risk/i);
    this.sortDropdown = page.getByLabel(/sort/i);
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
  }

  async filterByRisk(risk: string) {
    await this.riskFilter.selectOption({ label: risk });
  }

  async openFundByCode(fundCode: string) {
    await this.page.getByTestId(dataTestIds.mutualFunds.fundCard(fundCode)).click();
  }

  async expectResultsContainOnlyCategory(category: string) {
    const count = await this.fundCards.count();
    for (let i = 0; i < count; i++) {
      await expect(this.fundCards.nth(i)).toContainText(category);
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
