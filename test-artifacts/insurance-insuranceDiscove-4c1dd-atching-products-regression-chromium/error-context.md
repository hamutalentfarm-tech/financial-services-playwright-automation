# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: insurance\insuranceDiscovery.spec.ts >> Insurance Discovery @insurance >> TC-INS-002: filtering by type "Term Insurance" returns only matching products @regression
- Location: tests\insurance\insuranceDiscovery.spec.ts:16:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('[data-testid^="insurance-details-link"]').first()
Expected substring: "Term Insurance"
Received string:    "View Details"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('[data-testid^="insurance-details-link"]').first()
    14 × locator resolved to <a class="btn btn-primary" href="http://8.231.116.131:8082/insurance/2" data-testid="insurance-details-link-FSLIFE002">View Details</a>
       - unexpected value "View Details"

```

```yaml
- link "View Details":
  - /url: http://8.231.116.131:8082/insurance/2
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | 
  3  | export class InsurancePage {
  4  |   readonly page: Page;
  5  |   readonly productCards: Locator;
  6  |   readonly typeFilter: Locator;
  7  |   readonly premiumFilter: Locator;
  8  |   readonly coverageFilter: Locator;
  9  |   readonly compareButton: Locator;
  10 |   readonly productCardsBuy: Locator;
  11 | 
  12 |   constructor(page: Page) {
  13 |     this.page = page;
  14 |     this.productCardsBuy = page.locator('[data-testid^="buy-insurance-link"]');
  15 |     this.productCards = page.locator('[data-testid^="insurance-details-link"]');
  16 |     this.typeFilter = page.getByLabel(/insurance type/i);
  17 |     this.premiumFilter = page.getByLabel(/premium/i);
  18 |     this.coverageFilter = page.getByLabel(/coverage/i);
  19 |     this.compareButton = page.getByRole('button', { name: /compare/i });
  20 |   }
  21 | 
  22 |   async goto() {
  23 |     await this.page.goto('/insurance');
  24 |   }
  25 | 
  26 |   async filterByType(type: string) {
  27 |     await this.typeFilter.selectOption({ label: type });
  28 |   }
  29 | 
  30 |   async openProduct(productId: string | number) {
  31 |     await this.page.getByTestId(`insurance-card-${productId}`).click();
  32 |   }
  33 | 
  34 |   async expectResultsContainOnlyType(type: string) {
  35 |     const count = await this.productCards.count();
  36 |     for (let i = 0; i < count; i++) {
> 37 |       await expect(this.productCards.nth(i)).toContainText(type);
     |                                              ^ Error: expect(locator).toContainText(expected) failed
  38 |     }
  39 |   }
  40 | }
  41 | 
```