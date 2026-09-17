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

  constructor(page: Page) {
    this.page = page;
    this.personalDetailsSection = page.getByRole('region', { name: /personal details/i });
    this.nomineeNameInput = page.getByLabel(/nominee name/i);
    this.nomineeRelationshipInput = page.getByLabel(/relationship/i);
    this.nomineeDobInput = page.getByLabel(/nominee.*date of birth|date of birth.*nominee/i);
    this.premiumSummary = page.getByTestId('premium-summary');
    this.confirmPurchaseButton = page.getByRole('button', { name: /confirm purchase|buy now/i });
    this.confirmationBanner = page.getByText(/policy (created|confirmed|purchased)/i);
    this.validationMessage = page.getByRole('alert');
    this.policyRows = page.locator('[data-testid^="policy-row-"]');
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
    await this.nomineeRelationshipInput.fill(relationship);
    await this.nomineeDobInput.fill(dob);
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
