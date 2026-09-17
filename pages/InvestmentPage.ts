import { Page, Locator, expect } from '@playwright/test';
import { dataTestIds } from '../fixtures/testData';

export class InvestmentPage {
  readonly page: Page;
  readonly sipOption: Locator;
  readonly lumpsumOption: Locator;
  readonly amountInput: Locator;
  readonly declarationCheckbox: Locator;
  readonly confirmButton: Locator;
  readonly validationMessage: Locator;
  readonly confirmationBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sipOption = page.getByRole('radio', { name: /sip/i });
    this.lumpsumOption = page.getByRole('radio', { name: /lumpsum/i });
    this.amountInput = page.getByTestId(dataTestIds.investment.amountInput);
    this.declarationCheckbox = page.getByRole('checkbox', { name: /declar|confirm|agree/i });
    this.confirmButton = page.getByTestId(dataTestIds.investment.confirmButton);
    this.validationMessage = page.getByRole('alert');
    this.confirmationBanner = page.getByText(/investment (successful|confirmed|placed)/i);
  }

  async gotoByFundId(fundId: string | number) {
    await this.page.goto(`/invest/${fundId}`);
  }

  async selectSip() {
    await this.sipOption.check();
  }

  async selectLumpsum() {
    await this.lumpsumOption.check();
  }

  async enterAmount(amount: number | string) {
    await this.amountInput.fill(String(amount));
  }

  async acceptDeclaration() {
    if (await this.declarationCheckbox.isVisible().catch(() => false)) {
      await this.declarationCheckbox.check();
    }
  }

  async submit() {
    await this.confirmButton.click();
  }

  async expectValidationError(messagePattern?: RegExp) {
    await expect(this.validationMessage).toBeVisible();
    if (messagePattern) {
      await expect(this.validationMessage).toHaveText(messagePattern);
    }
  }

  async expectConfirmation() {
    await expect(this.confirmationBanner).toBeVisible();
  }

  async completeLumpsumInvestment(amount: number | string) {
    await this.selectLumpsum();
    await this.enterAmount(amount);
    await this.acceptDeclaration();
    await this.submit();
  }
}
