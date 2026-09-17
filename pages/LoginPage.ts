import { Page, Locator, expect } from '@playwright/test';
import { dataTestIds } from '../fixtures/testData';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId(dataTestIds.login.email);
    this.passwordInput = page.getByTestId(dataTestIds.login.password);
    this.submitButton = page.getByTestId(dataTestIds.login.submit);
    // Fallback: many apps render validation text without a dedicated test-id.
    this.errorMessage = page.getByRole('alert').or(page.getByText(/invalid|incorrect|locked/i));
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectLoginSuccess() {
    await this.page.waitForURL(/dashboard/, { timeout: 10000 });
    await expect(this.page.getByTestId(dataTestIds.dashboard)).toBeVisible();
  }

  async expectLoginError() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.page).toHaveURL(/login/);
  }

  async expectRedirectedToLogin() {
    await expect(this.page).toHaveURL(/login/);
  }

  async logout() {
    await this.page.getByRole('button', { name: /logout/i }).click();
  }
}
