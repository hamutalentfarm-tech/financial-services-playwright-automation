import { test, expect } from '../../fixtures/auth.fixture';
import { LoginPage } from '../../pages/LoginPage';
import { users, invalidUser } from '../../fixtures/users';

/**
 * Module: Authentication
 * Source: Feature Description doc (section 4, Authentication row) and
 * Problem Statement doc (issues #1, #2 - login failures / incorrect error display).
 */
test.describe('Authentication @auth', () => {
  test('TC-AUTH-001: valid seed user can log in and reach dashboard @smoke @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.qaUser.email, users.qaUser.password);
    await loginPage.expectLoginSuccess();
  });

  test('TC-AUTH-002: invalid credentials show an error and remain on login page @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(invalidUser.email, invalidUser.password);
    await loginPage.expectLoginError();
  });

  test('TC-AUTH-003: empty credentials are rejected client-side or server-side @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await loginPage.expectRedirectedToLogin();
  });

  test('TC-AUTH-004: locked seed user cannot log in @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.lockedUser.email, users.lockedUser.password);
    await loginPage.expectLockedError();
  });

  test('TC-AUTH-005: unauthenticated user is redirected away from a protected route @regression', async ({ page }) => {
    await page.goto('/dashboard');
    const loginPage = new LoginPage(page);
    await loginPage.expectRedirectedToLogin();
  });

  test('TC-AUTH-006: logged-in user can log out and lose access to protected routes @regression', async ({ authenticatedPage }) => {
    const loginPage = new LoginPage(authenticatedPage);
    await loginPage.logout();
    await loginPage.expectRedirectedToLogin();
    await authenticatedPage.goto('/dashboard');
    await loginPage.expectRedirectedToLogin();
  });
});
