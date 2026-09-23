import { test, expect } from '../../fixtures/auth.fixture';
import { MutualFundsPage } from '../../pages/MutualFundsPage';
import { FundDetailsPage } from '../../pages/FundDetailsPage';
import { InvestmentPage } from '../../pages/InvestmentPage';
import { PortfolioPage } from '../../pages/PortfolioPage';
import { investmentTestData } from '../../fixtures/testData';

/**
 * Module: Mutual Fund Investment (SIP/lumpsum)
 * Source: Feature Description doc (Investment row) and Problem Statement doc
 * (issues #5 "minimum investment validation not enforced" and #6 "confirmation
 * shown even when payment fails").
 * Uses the "learner" seed persona so write actions do not collide with other learners.
 */
test.describe('Mutual Fund Investment @mutual-funds @investment', () => {
  test.beforeEach(async ({ page }) => {
    const { LoginPage } = await import('../../pages/LoginPage');
    const { users } = await import('../../fixtures/users');
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.learner.email, users.learner.password);
    await loginPage.expectLoginSuccess();
  });

  async function navigateToFirstFundInvestmentForm(page: import('@playwright/test').Page) {
    const fundsPage = new MutualFundsPage(page);
    await fundsPage.goto();
    await fundsPage.fundCards.first().click();
    const details = new FundDetailsPage(page);
    await details.expectLoaded();
    await details.clickInvest();
  }

  test('TC-INV-001: valid lumpsum investment above minimum succeeds and updates portfolio @smoke @regression', async ({ page }) => {
    await navigateToFirstFundInvestmentForm(page);
    const investment = new InvestmentPage(page);
    const portfolioBefore = new PortfolioPage(page);

    await investment.completeLumpsumInvestment(investmentTestData.validLumpsumAmount, investmentTestData.validPayment);
    await investment.expectConfirmation();

    await portfolioBefore.goto();
    expect(await portfolioBefore.getHoldingsCount()).toBeGreaterThan(0);
  });

  test('TC-INV-002: investment below minimum amount is rejected with validation message @regression', async ({ page }) => {
    await navigateToFirstFundInvestmentForm(page);
    const investment = new InvestmentPage(page);
    await investment.completeLumpsumInvestment(investmentTestData.belowMinimumAmount, investmentTestData.validPayment);
    await investment.expectValidationError();
  });

  test('TC-INV-003: zero amount investment is rejected @regression', async ({ page }) => {
    await navigateToFirstFundInvestmentForm(page);
    const investment = new InvestmentPage(page);
    await investment.completeLumpsumInvestment(investmentTestData.zeroAmount, investmentTestData.validPayment);
    await investment.expectZeroValidationError();
  });

  test('TC-INV-004: negative amount investment is rejected @regression', async ({ page }) => {
    await navigateToFirstFundInvestmentForm(page);
    const investment = new InvestmentPage(page);
    await investment.completeLumpsumInvestment(investmentTestData.negativeAmount, investmentTestData.validPayment);
    await investment.expectZeroValidationError();
  });

  //OOS as UI is not accepting non numerics to type
  // test('TC-INV-005: non-numeric amount input is rejected @regression', async ({ page }) => {
  //   await navigateToFirstFundInvestmentForm(page);
  //   const investment = new InvestmentPage(page);
  //   await investment.completeLumpsumInvestment(investmentTestData.nonNumericAmount, investmentTestData.validPayment);
  //   await investment.expectValidationError();
  // });

  test('TC-INV-006: SIP investment path can be selected and submitted @regression', async ({ page }) => {
    await navigateToFirstFundInvestmentForm(page);
    const investment = new InvestmentPage(page);
    await investment.selectSip();
    await investment.enterAmount(investmentTestData.validSipAmount);
    await investment.selectPaymentMode(investmentTestData.validPayment);
    await investment.acceptDeclaration();
    await investment.submit();
    await investment.expectConfirmation();
  });

  test('TC-INV-007: submitting without accepting mandatory declaration is blocked @regression', async ({ page }) => {
    await navigateToFirstFundInvestmentForm(page);
    const investment = new InvestmentPage(page);
    await investment.selectLumpsum();
    await investment.enterAmount(investmentTestData.validLumpsumAmount);
    // Deliberately skip acceptDeclaration()
    await investment.submit();
    await investment.expectValidationError();
  });
});
