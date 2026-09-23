# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard\dashboard.spec.ts >> Dashboard @dashboard >> TC-DASH-004: dashboard navigation cards route to the correct module @regression
- Location: tests\dashboard\dashboard.spec.ts:47:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: /transaction/i })

```

# Page snapshot

```yaml
- main [ref=f8e2]:
  - generic [ref=f8e4]:
    - heading "500" [level=1] [ref=f8e5]
    - generic [ref=f8e6]: Server Error
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { dataTestIds } from '../fixtures/testData';
  3  | import { parseCurrencyToNumber } from '../utils/testHelpers';
  4  | 
  5  | export class DashboardPage {
  6  |   readonly page: Page;
  7  |   readonly root: Locator;
  8  |   readonly portfolioSummaryCard: Locator;
  9  |   readonly policySummaryCard: Locator;
  10 |   readonly recentTransactionsSection: Locator;
  11 | 
  12 |   constructor(page: Page) {
  13 |     this.page = page;
  14 |     this.root = page.getByTestId(dataTestIds.dashboard);
  15 |     this.portfolioSummaryCard = page.getByTestId(dataTestIds.portfolio.totalValue);
  16 |     this.policySummaryCard = page.getByRole('region', { name: /polic/i });
  17 |     this.recentTransactionsSection = page.getByRole('region', { name: /recent transactions/i });
  18 |   }
  19 | 
  20 |   async goto() {
  21 |     await this.page.goto('/dashboard');
  22 |   }
  23 | 
  24 |   async expectLoaded() {
  25 |     await expect(this.root).toBeVisible();
  26 |   }
  27 | 
  28 |   async getPortfolioTotalValue(): Promise<number> {
  29 |     const text = (await this.portfolioSummaryCard.textContent()) ?? '0';
  30 |     return parseCurrencyToNumber(text);
  31 |   }
  32 | 
  33 |   async navigateToMutualFunds() {
  34 |     await this.page.getByRole('link', { name: /mutual fund/i }).click();
  35 |   }
  36 | 
  37 |   async navigateToInsurance() {
  38 |     await this.page.getByRole('link', { name: /insurance/i }).click();
  39 |   }
  40 | 
  41 |   async navigateToPortfolio() {
  42 |     await this.page.getByRole('link', { name: /portfolio/i }).click();
  43 |   }
  44 | 
  45 |   async navigateToTransactions() {
> 46 |     await this.page.getByRole('link', { name: /transaction/i }).click();
     |                                                                 ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  47 |   }
  48 | }
  49 | 
```