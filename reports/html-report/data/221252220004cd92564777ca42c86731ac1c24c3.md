# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mutual-funds\mutualFundsDiscovery.spec.ts >> Mutual Fund Discovery @mutual-funds >> TC-MF-002: filtering by category "Equity Fund" returns only matching funds @regression
- Location: tests\mutual-funds\mutualFundsDiscovery.spec.ts:19:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('[data-testid^="fund-details-link"]').first()
Expected substring: "Equity Fund"
Received string:    "View Details"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('[data-testid^="fund-details-link"]').first()
    14 × locator resolved to <a class="btn btn-secondary" data-testid="fund-details-link-FSBAL007" href="http://8.231.116.131:8082/mutual-funds/7">View Details</a>
       - unexpected value "View Details"

```

```yaml
- link "View Details":
  - /url: http://8.231.116.131:8082/mutual-funds/7
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { dataTestIds } from '../fixtures/testData';
  3  | 
  4  | export class MutualFundsPage {
  5  |   readonly page: Page;
  6  |   readonly searchInput: Locator;
  7  |   readonly fundCards: Locator;
  8  |   readonly categoryFilter: Locator;
  9  |   readonly riskFilter: Locator;
  10 |   readonly sortDropdown: Locator;
  11 | 
  12 |   constructor(page: Page) {
  13 |     this.page = page;
  14 |     this.searchInput = page.getByTestId('fund-search-input');
  15 |     this.fundCards = page.locator('[data-testid^="fund-details-link"]');
  16 |     this.categoryFilter = page.getByTestId('fund-category-filter');
  17 |     this.riskFilter = page.getByTestId('fund-risk-filter');
  18 |     this.sortDropdown = page.getByTestId('fund-sort-select');
  19 |   }
  20 | 
  21 |   async goto() {
  22 |     await this.page.goto('/mutual-funds');
  23 |   }
  24 | 
  25 |   async search(term: string) {
  26 |     await this.searchInput.fill(term);
  27 |     await this.searchInput.press('Enter');
  28 |   }
  29 | 
  30 |   async filterByCategory(category: string) {
  31 |     await this.categoryFilter.selectOption({ label: category });
  32 |   }
  33 | 
  34 |   async filterByRisk(risk: string) {
  35 |     await this.riskFilter.selectOption({ label: risk });
  36 |   }
  37 | 
  38 |   async openFundByCode(fundCode: string) {
  39 |     await this.page.getByTestId(dataTestIds.mutualFunds.fundCard(fundCode)).click();
  40 |   }
  41 | 
  42 |   async expectResultsContainOnlyCategory(category: string) {
  43 |     const count = await this.fundCards.count();
  44 |     for (let i = 0; i < count; i++) {
> 45 |       await expect(this.fundCards.nth(i)).toContainText(category);
     |                                           ^ Error: expect(locator).toContainText(expected) failed
  46 |     }
  47 |   }
  48 | 
  49 |   async getVisibleFundCount(): Promise<number> {
  50 |     return this.fundCards.count();
  51 |   }
  52 | 
  53 |   async addToWatchlist(fundCode: string) {
  54 |     const card = this.page.getByTestId(dataTestIds.mutualFunds.fundCard(fundCode));
  55 |     await card.getByRole('button', { name: /watchlist/i }).click();
  56 |   }
  57 | }
  58 | 
```