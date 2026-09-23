import { Page, Locator, expect } from '@playwright/test';

export class InsurancePage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly typeFilter: Locator;
  readonly premiumFilter: Locator;
  readonly coverageFilter: Locator;
  readonly compareButton: Locator;
  readonly productCardsBuy: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCardsBuy = page.locator('[data-testid^="buy-insurance-link"]');
    this.productCards = page.locator('[data-testid^="insurance-details-link"]');
    this.typeFilter = page.getByLabel(/insurance type/i);
    this.premiumFilter = page.getByLabel(/premium/i);
    this.coverageFilter = page.getByLabel(/coverage/i);
    this.compareButton = page.getByRole('button', { name: /compare/i });
  }

  async goto() {
    await this.page.goto('/insurance');
  }

  async filterByType(type: string) {
    await this.typeFilter.selectOption({ label: type });
  }

  async openProduct(productId: string | number) {
    await this.page.getByTestId(`insurance-card-${productId}`).click();
  }

  async expectResultsContainOnlyType(type: string) {
    const count = await this.productCards.count();
    for (let i = 0; i < count; i++) {
      await expect(this.productCards.nth(i)).toContainText(type);
    }
  }
}
