import { Page, Locator, expect } from '@playwright/test';

export class RedemptionPage {
  readonly page: Page;
  readonly redeemByAmountOption: Locator;
  readonly redeemByUnitsOption: Locator;
  readonly unitsInput: Locator;
  readonly amountInput: Locator;
  readonly submitButton: Locator;
  readonly validationMessage: Locator;
  readonly confirmationBanner: Locator;
  readonly declaration: Locator;

  constructor(page: Page) {
    this.page = page;
    this.redeemByAmountOption = page.getByRole('radio', { name: /amount/i });
    this.redeemByUnitsOption = page.getByRole('radio', { name: /units/i });
    this.unitsInput = page.getByTestId('redeem-units-input');
    this.amountInput = page.getByTestId('redeem-amount-input');
    this.submitButton = page.getByTestId('confirm-redemption-button')
    this.validationMessage = page.getByRole('alert');
    this.confirmationBanner = page.getByText(/redemption (successful|confirmed|submitted)/i);
    this.declaration = page.getByRole('checkbox', {name: /declaration/});
  }

  async gotoByHoldingId(holdingId: string | number) {
    await this.page.goto(`/redeem/${holdingId}`);
  }

  async redeemByAmount(amount: number | string) {
    await this.redeemByAmountOption.check();
    await this.amountInput.fill(String(amount));
    await this.declaration.check();
    await this.submitButton.click();
  }

  async redeemByUnits(units: number | string) {
    await this.redeemByUnitsOption.check();
    await this.unitsInput.fill(String(units));
    await this.declaration.check();
    await this.submitButton.click();
  }

  async expectValidationError() {
    await expect(this.validationMessage).toBeVisible();
  }

  async expectConfirmation() {
    await expect(this.confirmationBanner).toBeVisible();
  }
}
