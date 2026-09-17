# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio\portfolio.spec.ts >> Portfolio Management @portfolio >> TC-PORT-001: investor sees their own holdings only @smoke
- Location: tests\portfolio\portfolio.spec.ts:12:7

# Error details

```
TimeoutError: locator.fill: Timeout 10000ms exceeded.
Call log:
  - waiting for getByTestId('login-email')

```

# Page snapshot

```yaml
- main [ref=e2]:
  - generic [ref=e4]:
    - heading "500" [level=1] [ref=e5]
    - generic [ref=e6]: Server Error
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
  9  |   readonly errorMessage: Locator;
  10 | 
  11 |   constructor(page: Page) {
  12 |     this.page = page;
  13 |     this.emailInput = page.getByTestId(dataTestIds.login.email);
  14 |     this.passwordInput = page.getByTestId(dataTestIds.login.password);
  15 |     this.submitButton = page.getByTestId(dataTestIds.login.submit);
  16 |     // Fallback: many apps render validation text without a dedicated test-id.
  17 |     this.errorMessage = page.getByRole('alert').or(page.getByText(/invalid|incorrect|locked/i));
  18 |   }
  19 | 
  20 |   async goto() {
  21 |     await this.page.goto('/login');
  22 |   }
  23 | 
  24 |   async login(email: string, password: string) {
> 25 |     await this.emailInput.fill(email);
     |                           ^ TimeoutError: locator.fill: Timeout 10000ms exceeded.
  26 |     await this.passwordInput.fill(password);
  27 |     await this.submitButton.click();
  28 |   }
  29 | 
  30 |   async expectLoginSuccess() {
  31 |     await this.page.waitForURL(/dashboard/, { timeout: 10000 });
  32 |     await expect(this.page.getByTestId(dataTestIds.dashboard)).toBeVisible();
  33 |   }
  34 | 
  35 |   async expectLoginError() {
  36 |     await expect(this.errorMessage).toBeVisible();
  37 |     await expect(this.page).toHaveURL(/login/);
  38 |   }
  39 | 
  40 |   async expectRedirectedToLogin() {
  41 |     await expect(this.page).toHaveURL(/login/);
  42 |   }
  43 | 
  44 |   async logout() {
  45 |     await this.page.getByRole('button', { name: /logout/i }).click();
  46 |   }
  47 | }
  48 | 
```