import { test, expect } from '../../fixtures/auth.fixture';
import { InsurancePage } from '../../pages/InsurancePage';
import { PolicyPage } from '../../pages/PolicyPage';
import { insurancePurchaseTestData } from '../../fixtures/testData';
import { generateNominee } from '../../utils/dataGenerator';

/**
 * Module: Insurance Purchase
 * Source: Feature Description doc (Insurance Purchase row) and Problem
 * Statement doc (issues #8 "premium calculation mismatch" and #9 "mandatory
 * nominee/personal info validations missed").
 * Uses the "learner" persona to avoid colliding with shared insurance1@ data.
 */
test.describe('Insurance Purchase @insurance @purchase', () => {
  test.beforeEach(async ({ page }) => {
    const { LoginPage } = await import('../../pages/LoginPage');
    const { users } = await import('../../fixtures/users');
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.learner.email, users.learner.password);
    await loginPage.expectLoginSuccess();
  });

  async function openPurchaseFormForFirstProduct(page: import('@playwright/test').Page) {
  const insurance = new InsurancePage(page);
  await insurance.goto();
  const firstCard = insurance.productCardsBuy.first();
  await firstCard.click();
  
}

  test('TC-INSP-001: valid nominee details lead to successful policy creation @smoke @regression', async ({ page }) => {
    await openPurchaseFormForFirstProduct(page);
    const policy = new PolicyPage(page);
    const nominee = generateNominee();
    await policy.fillNominee(nominee.name, nominee.relationship, nominee.dateOfBirth);
    await policy.submitPurchase();
    await policy.expectConfirmation();
  });

  test('TC-INSP-002: missing mandatory nominee details are rejected @regression', async ({ page }) => {
    await openPurchaseFormForFirstProduct(page);
    const policy = new PolicyPage(page);
    const { missingNominee } = insurancePurchaseTestData;
    await policy.fillNominee(missingNominee.name, missingNominee.relationship, missingNominee.dateOfBirth);
    await policy.submitPurchase();
    await policy.expectValidationError();
  });

  test('TC-INSP-003: premium summary is shown before final confirmation @regression', async ({ page }) => {
    await openPurchaseFormForFirstProduct(page);
    const policy = new PolicyPage(page);
    const nominee = generateNominee();
    await policy.fillNominee(nominee.name, nominee.relationship, nominee.dateOfBirth);
    await policy.submitPurchase();
    await expect(policy.premiumSummary).toBeVisible();
  });

  test('TC-INSP-004: successful policy purchase generates a related transaction @regression', async ({ page }) => {
    await openPurchaseFormForFirstProduct(page);
    const policy = new PolicyPage(page);
    const nominee = generateNominee();
    await policy.fillNominee(nominee.name, nominee.relationship, nominee.dateOfBirth);
    await policy.submitPurchase();
    await policy.expectConfirmation();

    await page.goto('/transactions');
    await expect(page.locator('[data-testid^="transaction-row-"]').first()).toBeVisible();
  });

  test('TC-INSP-005: newly purchased policy appears in Policies list @regression', async ({ page }) => {
    await openPurchaseFormForFirstProduct(page);
    const policy = new PolicyPage(page);
    const nominee = generateNominee();
    await policy.fillNominee(nominee.name, nominee.relationship, nominee.dateOfBirth);
    await policy.submitPurchase();
    await policy.expectConfirmation();

    await policy.gotoPoliciesList();
    expect(await policy.getPolicyCount()).toBeGreaterThan(0);
  });
});
