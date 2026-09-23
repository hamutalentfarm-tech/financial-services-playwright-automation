# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mutual-funds\investment.spec.ts >> Mutual Fund Investment @mutual-funds @investment >> TC-INV-003: zero amount investment is rejected @regression
- Location: tests\mutual-funds\investment.spec.ts:53:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- main [ref=f1e2]:
  - generic [ref=f1e4]:
    - heading "500" [level=1] [ref=f1e5]
    - generic [ref=f1e6]: Server Error
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { dataTestIds } from '../fixtures/testData';
  3  | 
  4  | export class LoginPage {
  5  |   readonly page: Page;
  6  |   readonly emailInput: Locator;
  7  |   readonly passwordInput: Locator;
  8  |   readonly submitButton: Locator;
  9  |   readonly invalidCredentialsError: Locator;
  10 |   readonly lockedAccountError: Locator;
  11 | 
  12 | 
  13 |   constructor(page: Page) {
  14 |     this.page = page;
  15 |     this.emailInput = page.getByTestId(dataTestIds.login.email);
  16 |     this.passwordInput = page.getByTestId(dataTestIds.login.password);
  17 |     this.submitButton = page.getByTestId(dataTestIds.login.submit);
  18 |     this.invalidCredentialsError = page.getByTestId('login-form').getByText('Invalid email or password.');
  19 |     this.lockedAccountError = page.getByTestId('login-form').getByText('Your account is locked. Please contact support');
  20 |     // this.errorMessage = page.getByRole('alert').or(page.getByText(/invalid|incorrect|locked/i));
  21 |   }
  22 | 
  23 |   async goto() {
  24 |     await this.page.goto('/login');
  25 |   }
  26 | 
  27 |   async login(email: string, password: string) {
  28 |     await this.emailInput.fill(email);
  29 |     await this.passwordInput.fill(password);
  30 |     await this.submitButton.click();
  31 |   }
  32 | 
  33 |   async expectLoginSuccess() {
> 34 |     await this.page.waitForURL(/dashboard/, { timeout: 10000 });
     |                     ^ TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
  35 |     await expect(this.page.getByTestId(dataTestIds.dashboard)).toBeVisible();
  36 |   }
  37 | 
  38 |   async expectLoginError() {
  39 |     await expect(this.invalidCredentialsError).toBeVisible();
  40 |     await expect(this.page).toHaveURL(/login/);
  41 |   }
  42 | 
  43 |   async expectLockedError(){
  44 |     await expect(this.lockedAccountError).toBeVisible();
  45 |     await expect(this.page).toHaveURL(/login/);
  46 |   }
  47 | 
  48 |   async expectRedirectedToLogin() {
  49 |     await expect(this.page).toHaveURL(/login/);
  50 |   }
  51 | 
  52 |   async logout() {
  53 |     await this.page.getByRole('button', { name: /logout/i }).click();
  54 |   }
  55 | }
  56 | 
```