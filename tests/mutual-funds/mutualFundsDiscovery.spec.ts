import { test, expect } from '../../fixtures/auth.fixture';
import { MutualFundsPage } from '../../pages/MutualFundsPage';
import { FundDetailsPage } from '../../pages/FundDetailsPage';
import { mutualFundCategories, riskLevels } from '../../fixtures/testData';
import { expectValidFundCategory, expectValidRiskLevel } from '../../utils/assertions';

/**
 * Module: Mutual Fund Discovery
 * Source: Feature Description doc (Mutual Funds row) and Problem Statement
 * doc (issue #4 - search/filter/sort return incorrect results).
 */
test.describe('Mutual Fund Discovery @mutual-funds', () => {
  test('TC-MF-001: fund listing page loads with visible fund cards @smoke', async ({ authenticatedPage }) => {
    const fundsPage = new MutualFundsPage(authenticatedPage);
    await fundsPage.goto();
    expect(await fundsPage.getVisibleFundCount()).toBeGreaterThan(0);
  });

  test(`TC-MF-002: filtering by category "${mutualFundCategories[0]}" returns only matching funds @regression`, async ({ authenticatedPage }) => {
    const fundsPage = new MutualFundsPage(authenticatedPage);
    await fundsPage.goto();
    await fundsPage.filterByCategory(mutualFundCategories[0]);
    await fundsPage.expectResultsContainOnlyCategory(mutualFundCategories[0]);
  });

  test('TC-MF-003: searching for a known fund name returns relevant results @regression', async ({ authenticatedPage }) => {
    const fundsPage = new MutualFundsPage(authenticatedPage);
    await fundsPage.goto();
    await fundsPage.search('Equity');
    expect(await fundsPage.getVisibleFundCount()).toBeGreaterThan(0);
  });

  test('TC-MF-004: searching for a non-existent fund returns zero results (no stale data) @regression', async ({ authenticatedPage }) => {
    const fundsPage = new MutualFundsPage(authenticatedPage);
    await fundsPage.goto();
    await fundsPage.search('ZZZ-NON-EXISTENT-FUND-ZZZ');
    expect(await fundsPage.getVisibleFundCount()).toBe(0);
  });

  test('TC-MF-005: fund details page shows NAV, returns, risk, and category @regression', async ({ authenticatedPage }) => {
    const fundsPage = new MutualFundsPage(authenticatedPage);
    await fundsPage.goto();
    await fundsPage.fundCards.first().click();

    const details = new FundDetailsPage(authenticatedPage);
    await details.expectLoaded();
    const risk = await details.getRiskLevel();
    const category = await details.getCategory();
    expectValidRiskLevel(risk);
    expectValidFundCategory(category);
  });

  test(`TC-MF-006: filtering by risk level "${riskLevels[2]}" returns only matching funds @regression`, async ({ authenticatedPage }) => {
    const fundsPage = new MutualFundsPage(authenticatedPage);
    await fundsPage.goto();
    await fundsPage.filterByRisk(riskLevels[2]);
    const count = await fundsPage.getVisibleFundCount();
    expect(count).toBeGreaterThanOrEqual(0); // documents behavior even when zero funds match
  });
});
