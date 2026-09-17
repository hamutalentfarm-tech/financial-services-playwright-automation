import { test, expect } from '../../fixtures/auth.fixture';
import { InsurancePage } from '../../pages/InsurancePage';
import { insuranceTypes } from '../../fixtures/testData';

/**
 * Module: Insurance Discovery
 * Source: Feature Description doc (Insurance Products row).
 */
test.describe('Insurance Discovery @insurance', () => {
  test('TC-INS-001: insurance product listing loads with visible products @smoke', async ({ authenticatedPage }) => {
    const insurance = new InsurancePage(authenticatedPage);
    await insurance.goto();
    expect(await insurance.productCards.count()).toBeGreaterThan(0);
  });

  test(`TC-INS-002: filtering by type "${insuranceTypes[0]}" returns only matching products @regression`, async ({ authenticatedPage }) => {
    const insurance = new InsurancePage(authenticatedPage);
    await insurance.goto();
    await insurance.filterByType(insuranceTypes[0]);
    await insurance.expectResultsContainOnlyType(insuranceTypes[0]);
  });

  test('TC-INS-003: opening a product shows its detail page @regression', async ({ authenticatedPage }) => {
    const insurance = new InsurancePage(authenticatedPage);
    await insurance.goto();
    await insurance.productCards.first().click();
    await expect(authenticatedPage).toHaveURL(/insurance\/.+/);
  });
});
