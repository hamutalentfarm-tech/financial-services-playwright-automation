import { test, expect } from '../../fixtures/auth.fixture';
import { DashboardPage } from '../../pages/DashboardPage';
import { ApiClient } from '../../utils/apiClient';
import { expectAmountsReconcile } from '../../utils/assertions';

/**
 * Module: Dashboard
 * Source: Feature Description doc (section 4, Dashboard row) and
 * Problem Statement doc (issue #3 - dashboard value does not refresh after investment/redemption).
 */
test.describe('Dashboard @dashboard', () => {
  test('TC-DASH-001: authenticated investor sees dashboard with portfolio summary @smoke', async ({ investorPage }) => {
    const dashboard = new DashboardPage(investorPage);
    await dashboard.goto();
    await dashboard.expectLoaded();
    await expect(dashboard.portfolioSummaryCard).toBeVisible();
  });

  test('TC-DASH-002: new user with no holdings sees an empty-state portfolio summary @regression', async ({ page }) => {
    // Uses the "newUser" seed persona which has no holdings per the source doc.
    const { LoginPage } = await import('../../pages/LoginPage');
    const loginPage = new LoginPage(page);
    const { users } = await import('../../fixtures/users');
    await loginPage.goto();
    await loginPage.login(users.newUser.email, users.newUser.password);
    await loginPage.expectLoginSuccess();

    const dashboard = new DashboardPage(page);
    const total = await dashboard.getPortfolioTotalValue();
    expect(total).toBe(0);
  });

  test('TC-DASH-003: dashboard portfolio value reconciles with /api/dashboard summary @regression @api', async ({ page, apiContext }) => {
    const { LoginPage } = await import('../../pages/LoginPage');
    const loginPage = new LoginPage(page);
    const { users } = await import('../../fixtures/users');
    await loginPage.goto();
    await loginPage.login(users.newUser.email, users.newUser.password);
    await loginPage.expectLoginSuccess();
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    const uiValue = await dashboard.getPortfolioTotalValue();

    const api = new ApiClient(apiContext);
    const response = await api.getDashboard();
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    const apiValue = Number(body?.data?.portfolio_value ?? body?.portfolio_value ?? 0);

    expectAmountsReconcile(uiValue, apiValue);
  });

  test('TC-DASH-004: dashboard navigation cards route to the correct module @regression', async ({ investorPage }) => {
    const dashboard = new DashboardPage(investorPage);
    await dashboard.goto();
    await dashboard.navigateToMutualFunds();
    await expect(investorPage).toHaveURL(/mutual-funds/);

    await dashboard.goto();
    await dashboard.navigateToInsurance();
    await expect(investorPage).toHaveURL(/insurance/);

    await dashboard.goto();
    await dashboard.navigateToPortfolio();
    await expect(investorPage).toHaveURL(/portfolio/);

    await dashboard.goto();
    await dashboard.navigateToTransactions();
    await expect(investorPage).toHaveURL(/transactions/);
  });
});
