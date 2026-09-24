import { test as base, APIRequestContext, request } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users, SeedUser } from './users';
import { apiConfig } from './testData';

/**
 * Custom fixtures:
 *  - authenticatedPage: a page already logged in as the default regression (qaUser) seed user.
 *  - investorPage: a page logged in as the investor seed user (has existing holdings).
 *  - apiContext: a pre-configured Playwright APIRequestContext with the X-API-Key header set,
 *    reused across API tests instead of re-authenticating per test.
 */
type Fixtures = {
  authenticatedPage: import('@playwright/test').Page;
  investorPage: import('@playwright/test').Page;
  apiContext: APIRequestContext;
};

async function loginAs(page: import('@playwright/test').Page, user: SeedUser) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(user.email, user.password);
  await loginPage.expectLoginSuccess();
}

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ page }, use) => {
    await loginAs(page, users.qaUser);
    await use(page);
  },

  investorPage: async ({ page }, use) => {
    await loginAs(page, users.investor);
    await use(page);
  },

  apiContext: async ({ playwright }, use) => {
    const context = await request.newContext({
      baseURL: process.env.API_BASE_URL ?? 'http://8.234.70.115:8082/api/',
      extraHTTPHeaders: {
        [apiConfig.header]: apiConfig.expectedKeyValue,
        'Content-Type': 'application/json',
      },
    });
    await use(context);
    await context.dispose();
  },
});

export { expect } from '@playwright/test';
