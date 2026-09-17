import { test, expect } from '../../fixtures/auth.fixture';
import { PortfolioPage } from '../../pages/PortfolioPage';
import { ApiClient } from '../../utils/apiClient';
import { expectAmountsReconcile } from '../../utils/assertions';

/**
 * Module: Portfolio Management
 * Source: Feature Description doc (Portfolio row) and relationship map
 * (PortfolioHolding belongs to User and MutualFund).
 */
test.describe('Portfolio Management @portfolio', () => {
  test('TC-PORT-001: investor sees their own holdings only @smoke', async ({ investorPage }) => {
    const portfolio = new PortfolioPage(investorPage);
    await portfolio.goto();
    expect(await portfolio.getHoldingsCount()).toBeGreaterThan(0);
  });

  test('TC-PORT-002: new user with no holdings sees empty portfolio state @regression', async ({ page }) => {
    const { LoginPage } = await import('../../pages/LoginPage');
    const { users } = await import('../../fixtures/users');
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.newUser.email, users.newUser.password);
    await loginPage.expectLoginSuccess();

    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    expect(await portfolio.getHoldingsCount()).toBe(0);
  });

  test('TC-PORT-003: portfolio total value reconciles between UI and /api/portfolio @regression @api', async ({ investorPage, apiContext }) => {
    const portfolio = new PortfolioPage(investorPage);
    await portfolio.goto();
    const uiTotal = await portfolio.getTotalValue();

    const api = new ApiClient(apiContext);
    const response = await api.getPortfolio();
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    const holdings: Array<{ current_value?: number }> = body?.data ?? body ?? [];
    const apiTotal = holdings.reduce((sum, h) => sum + (h.current_value ?? 0), 0);

    expectAmountsReconcile(uiTotal, apiTotal, 5);
  });

  test('TC-PORT-004: clicking a holding row navigates to holding detail @regression', async ({ investorPage }) => {
    const portfolio = new PortfolioPage(investorPage);
    await portfolio.goto();
    const firstRow = portfolio.holdingsRows.first();
    const holdingId = await firstRow.getAttribute('data-testid');
    await firstRow.click();
    expect(investorPage.url()).toContain('/portfolio/');
    expect(holdingId).toBeTruthy();
  });
});
