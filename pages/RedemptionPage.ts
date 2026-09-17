import { Page, Locator, expect } from '@playwright/test';

export class RedemptionPage {
  readonly page: Page;
  readonly redeemByAmountOption: Locator;
  readonly redeemByUnitsOption: Locator;
  readonly amountOrUnitsInput: Locator;
  readonly submitButton: Locator;
  readonly validationMessage: Locator;
  readonly confirmationBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.redeemByAmountOption = page.getByRole('radio', { name: /amount/i });
    this.redeemByUnitsOption = page.getByRole('radio', { name: /units/i });
    this.amountOrUnitsInput = page.getByLabel(/redemption (amount|units)/i);
    this.submitButton = page.getByRole('button', { name: /redeem|submit/i });
    this.validationMessage = page.getByRole('alert');
    this.confirmationBanner = page.getByText(/redemption (successful|confirmed|submitted)/i);
  }

  async gotoByHoldingId(holdingId: string | number) {
    await this.page.goto(`/redeem/${holdingId}`);
  }

  async redeemByAmount(amount: number | string) {
    await this.redeemByAmountOption.check();
    await this.amountOrUnitsInput.fill(String(amount));
    await this.submitButton.click();
  }

  async redeemByUnits(units: number | string) {
    await this.redeemByUnitsOption.check();
    await this.amountOrUnitsInput.fill(String(units));
    await this.submitButton.click();
  }

  async expectValidationError() {
    await expect(this.validationMessage).toBeVisible();
  }

  async expectConfirmation() {
    await expect(this.confirmationBanner).toBeVisible();
  }
}
