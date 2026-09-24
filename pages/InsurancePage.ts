import { Page, Locator, expect } from '@playwright/test';

export class InsurancePage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly typeFilter: Locator;
  readonly premiumFilter: Locator;
  readonly coverageFilter: Locator;
  readonly compareButton: Locator;
  readonly productCardsBuy: Locator;
  readonly productCardsSequence: Locator;
  readonly insuranceFilterSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCardsBuy = page.locator('[data-testid^="buy-insurance-link"]');
    this.productCards = page.locator('[data-testid^="insurance-details-link"]');
    this.typeFilter = page.getByLabel(/insurance type/i);
    this.premiumFilter = page.getByLabel(/premium/i);
    this.coverageFilter = page.getByLabel(/coverage/i);
    this.compareButton = page.getByRole('button', { name: /compare/i });
    this.productCardsSequence = page.locator('[data-testid^="insurance-card"]'); 
    this.insuranceFilterSubmit = page.getByTestId('insurance-filter-submit');
  }

  async goto() {
    await this.page.goto('/insurance');
  }

  async filterByType(type: string) {
    await this.typeFilter.selectOption({ label: type });
    await this.insuranceFilterSubmit.click();
  }

  async openProduct(productId: string | number) {
    await this.page.getByTestId(`insurance-card-${productId}`).click();
  }

  async expectResultsContainOnlyType(type: string) {
    const count = await this.productCardsSequence.count();
    for (let i = 0; i < count; i++) {
      await expect(this.productCardsSequence.nth(i)).toContainText(type);
    }
  }
}
