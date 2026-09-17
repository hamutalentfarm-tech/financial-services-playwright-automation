import { test, expect } from '../../fixtures/auth.fixture';
import { PortfolioPage } from '../../pages/PortfolioPage';
import { RedemptionPage } from '../../pages/RedemptionPage';
import { redemptionTestData } from '../../fixtures/testData';

/**
 * Module: Redemption / Sell Flow
 * Source: Feature Description doc (Redemption row) and Problem Statement doc
 * (issue #7 - redemption allows amount greater than available holding value).
 */
test.describe('Redemption @portfolio @redemption', () => {
  test.beforeEach(async ({ page }) => {
    const { LoginPage } = await import('../../pages/LoginPage');
    const { users } = await import('../../fixtures/users');
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.investor.email, users.investor.password);
    await loginPage.expectLoginSuccess();
  });

  async function openRedemptionFormForFirstHolding(page: import('@playwright/test').Page) {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await portfolio.holdingsRows.first().click();
    await page.getByRole('button', { name: /redeem/i }).click();
  }

  test('TC-RED-001: valid partial redemption by units succeeds @smoke @regression', async ({ page }) => {
    await openRedemptionFormForFirstHolding(page);
    const redemption = new RedemptionPage(page);
    await redemption.redeemByUnits(redemptionTestData.validPartialUnits);
    await redemption.expectConfirmation();
  });

  test('TC-RED-002: redemption exceeding available units is rejected @regression', async ({ page }) => {
    await openRedemptionFormForFirstHolding(page);
    const redemption = new RedemptionPage(page);
    await redemption.redeemByUnits(redemptionTestData.exceedsAvailableUnits);
    await redemption.expectValidationError();
  });

  test('TC-RED-003: zero-unit redemption is rejected @regression', async ({ page }) => {
    await openRedemptionFormForFirstHolding(page);
    const redemption = new RedemptionPage(page);
    await redemption.redeemByUnits(redemptionTestData.zeroUnits);
    await redemption.expectValidationError();
  });

  test('TC-RED-004: negative-unit redemption is rejected @regression', async ({ page }) => {
    await openRedemptionFormForFirstHolding(page);
    const redemption = new RedemptionPage(page);
    await redemption.redeemByUnits(redemptionTestData.negativeUnits);
    await redemption.expectValidationError();
  });

  test('TC-RED-005: successful redemption creates a corresponding transaction @regression', async ({ page }) => {
    await openRedemptionFormForFirstHolding(page);
    const redemption = new RedemptionPage(page);
    await redemption.redeemByUnits(redemptionTestData.validPartialUnits);
    await redemption.expectConfirmation();

    await page.goto('/transactions');
    await expect(page.locator('[data-testid^="transaction-row-"]').first()).toBeVisible();
  });
});
