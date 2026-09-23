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
  readonly zeroAmountError: Locator
  readonly confirmationBanner: Locator;
  readonly paymentMode : Locator;

  constructor(page: Page) {
    this.page = page;
    this.sipOption = page.getByRole('radio', { name: /sip/i });
    this.lumpsumOption = page.getByRole('radio', { name: /lumpsum/i });
    this.amountInput = page.getByTestId(dataTestIds.investment.amountInput);
    this.declarationCheckbox = page.getByTestId('investment-declaration-checkbox')
    this.confirmButton = page.getByTestId(dataTestIds.investment.confirmButton);
    this.validationMessage = page.getByTestId('form-error-summary');
    this.zeroAmountError = page.getByTestId('investment-error')
    this.confirmationBanner = page.getByTestId('investment-confirmation-message');
    this.paymentMode = page.getByTestId('payment-method-select')
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

  async selectPaymentMode(payment: string){
    await this.paymentMode.selectOption({value: payment});
  }

  async acceptDeclaration() {
    // if (await this.declarationCheckbox.isVisible().catch(() => false)) {
      await this.declarationCheckbox.check();
    // }
  }

  async submit() {
    await this.confirmButton.click();
  }

  async expectValidationError() {
    await expect(this.validationMessage).toBeVisible();
    
  }

  async expectZeroValidationError(){
    await expect(this.zeroAmountError).toBeVisible();
  }

  async expectConfirmation() {
    await expect(this.confirmationBanner).toBeVisible();
  }

  async completeLumpsumInvestment(amount: number | string, payment: string) {
    await this.selectLumpsum();
    await this.enterAmount(amount);
    this.selectPaymentMode(payment);
    await this.acceptDeclaration();
    await this.submit();
  }
}
