import { Page, Locator, expect } from '@playwright/test';
import { dataTestIds } from '../fixtures/testData';

/**
 * Covers both the Insurance Purchase flow (/buy-insurance/:productId) and
 * the resulting Policies module (/policies, /policies/:policyId).
 */
export class PolicyPage {
  readonly page: Page;
  readonly personalDetailsSection: Locator;
  readonly nomineeNameInput: Locator;
  readonly nomineeRelationshipInput: Locator;
  readonly nomineeDobInput: Locator;
  readonly premiumSummary: Locator;
  readonly confirmPurchaseButton: Locator;
  readonly confirmationBanner: Locator;
  readonly validationMessage: Locator;
  readonly policyRows: Locator;
  readonly declaration: Locator;

  constructor(page: Page) {
    this.page = page;
    this.personalDetailsSection = page.getByRole('region', { name: /personal details/i });
    this.nomineeNameInput = page.getByLabel(/nominee name/i);
    this.nomineeRelationshipInput = page.getByTestId('nominee-relationship-select');
    this.nomineeDobInput = page.getByTestId('insured-dob-input');
    this.premiumSummary = page.getByTestId('policy-confirmation-message');
    this.confirmPurchaseButton = page.getByTestId('confirm-policy-button');
    this.confirmationBanner = page.getByText(/policy (created|confirmed|purchased)/i);
    this.validationMessage = page.getByTestId('form-error-summary');
    this.policyRows = page.locator('[data-testid^="policy-row-"]');
    this.declaration = page.getByTestId('insurance-declaration-checkbox');
  }

  async gotoPurchaseForm(productId: string | number) {
    await this.page.goto(`/buy-insurance/${productId}`);
  }

  async gotoPoliciesList() {
    await this.page.goto('/policies');
  }

  async gotoPolicyDetails(policyId: string | number) {
    await this.page.goto(`/policies/${policyId}`);
  }

  async fillNominee(name: string, relationship: string, dob: string) {
    await this.nomineeNameInput.fill(name);
    await this.nomineeRelationshipInput.selectOption({ value: relationship });
    await this.nomineeDobInput.fill(dob);
    await this.declaration.click();
  }

  async submitPurchase() {
    await this.confirmPurchaseButton.click();
  }

  async expectConfirmation() {
    await expect(this.confirmationBanner).toBeVisible();
  }

  async expectValidationError() {
    await expect(this.validationMessage).toBeVisible();
  }

  async expectPolicyVisible(policyId: string) {
    await expect(this.page.getByTestId(dataTestIds.policies.row(policyId))).toBeVisible();
  }

  async getPolicyCount(): Promise<number> {
    return this.policyRows.count();
  }
}
