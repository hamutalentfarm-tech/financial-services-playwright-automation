import { Page, Locator, expect } from '@playwright/test';

export class FundDetailsPage {
  readonly page: Page;
  readonly navValue: Locator;
  readonly oneYearReturn: Locator;
  readonly threeYearReturn: Locator;
  readonly riskLevel: Locator;
  readonly category: Locator;
  readonly investButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navValue = page.getByTestId('fund-detail-nav');
    this.oneYearReturn = page.getByTestId('fund-detail-one-year-return');
    this.threeYearReturn = page.getByTestId('fund-3y-return');
    this.riskLevel = page.locator('.risk');
    this.category = page.locator('.badge');
    this.investButton = page.getByTestId('invest-now-button');
  }

  async gotoById(fundId: string | number) {
    await this.page.goto(`/mutual-funds/${fundId}`);
  }

  async expectLoaded() {
    await expect(this.investButton).toBeVisible();
  }

  async clickInvest() {
    await this.investButton.click();
  }

  async getRiskLevel(): Promise<string> {
    return ((await this.riskLevel.textContent()) ?? '').trim();
  }

  async getCategory(): Promise<string> {
    return ((await this.category.textContent()) ?? '').trim();
  }
}
