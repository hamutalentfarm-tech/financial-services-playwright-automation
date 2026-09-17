# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: insurance\insurancePurchase.spec.ts >> Insurance Purchase @insurance @purchase >> TC-INSP-001: valid nominee details lead to successful policy creation @smoke @regression
- Location: tests\insurance\insurancePurchase.spec.ts:31:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-testid^="insurance-card-"]').first()

```

# Page snapshot

```yaml
- main [ref=f2e2]:
  - generic [ref=f2e4]:
    - heading "500" [level=1] [ref=f2e5]
    - generic [ref=f2e6]: Server Error
```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures/auth.fixture';
  2  | import { InsurancePage } from '../../pages/InsurancePage';
  3  | import { PolicyPage } from '../../pages/PolicyPage';
  4  | import { insurancePurchaseTestData } from '../../fixtures/testData';
  5  | import { generateNominee } from '../../utils/dataGenerator';
  6  | 
  7  | /**
  8  |  * Module: Insurance Purchase
  9  |  * Source: Feature Description doc (Insurance Purchase row) and Problem
  10 |  * Statement doc (issues #8 "premium calculation mismatch" and #9 "mandatory
  11 |  * nominee/personal info validations missed").
  12 |  * Uses the "learner" persona to avoid colliding with shared insurance1@ data.
  13 |  */
  14 | test.describe('Insurance Purchase @insurance @purchase', () => {
  15 |   test.beforeEach(async ({ page }) => {
  16 |     const { LoginPage } = await import('../../pages/LoginPage');
  17 |     const { users } = await import('../../fixtures/users');
  18 |     const loginPage = new LoginPage(page);
  19 |     await loginPage.goto();
  20 |     await loginPage.login(users.learner.email, users.learner.password);
  21 |     await loginPage.expectLoginSuccess();
  22 |   });
  23 | 
  24 |   async function openPurchaseFormForFirstProduct(page: import('@playwright/test').Page) {
  25 |     const insurance = new InsurancePage(page);
  26 |     await insurance.goto();
> 27 |     await insurance.productCards.first().click();
     |                                          ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  28 |     await page.getByRole('button', { name: /buy now|purchase/i }).click();
  29 |   }
  30 | 
  31 |   test('TC-INSP-001: valid nominee details lead to successful policy creation @smoke @regression', async ({ page }) => {
  32 |     await openPurchaseFormForFirstProduct(page);
  33 |     const policy = new PolicyPage(page);
  34 |     const nominee = generateNominee();
  35 |     await policy.fillNominee(nominee.name, nominee.relationship, nominee.dateOfBirth);
  36 |     await policy.submitPurchase();
  37 |     await policy.expectConfirmation();
  38 |   });
  39 | 
  40 |   test('TC-INSP-002: missing mandatory nominee details are rejected @regression', async ({ page }) => {
  41 |     await openPurchaseFormForFirstProduct(page);
  42 |     const policy = new PolicyPage(page);
  43 |     const { missingNominee } = insurancePurchaseTestData;
  44 |     await policy.fillNominee(missingNominee.name, missingNominee.relationship, missingNominee.dateOfBirth);
  45 |     await policy.submitPurchase();
  46 |     await policy.expectValidationError();
  47 |   });
  48 | 
  49 |   test('TC-INSP-003: premium summary is shown before final confirmation @regression', async ({ page }) => {
  50 |     await openPurchaseFormForFirstProduct(page);
  51 |     const policy = new PolicyPage(page);
  52 |     await expect(policy.premiumSummary).toBeVisible();
  53 |   });
  54 | 
  55 |   test('TC-INSP-004: successful policy purchase generates a related transaction @regression', async ({ page }) => {
  56 |     await openPurchaseFormForFirstProduct(page);
  57 |     const policy = new PolicyPage(page);
  58 |     const nominee = generateNominee();
  59 |     await policy.fillNominee(nominee.name, nominee.relationship, nominee.dateOfBirth);
  60 |     await policy.submitPurchase();
  61 |     await policy.expectConfirmation();
  62 | 
  63 |     await page.goto('/transactions');
  64 |     await expect(page.locator('[data-testid^="transaction-row-"]').first()).toBeVisible();
  65 |   });
  66 | 
  67 |   test('TC-INSP-005: newly purchased policy appears in Policies list @regression', async ({ page }) => {
  68 |     await openPurchaseFormForFirstProduct(page);
  69 |     const policy = new PolicyPage(page);
  70 |     const nominee = generateNominee();
  71 |     await policy.fillNominee(nominee.name, nominee.relationship, nominee.dateOfBirth);
  72 |     await policy.submitPurchase();
  73 |     await policy.expectConfirmation();
  74 | 
  75 |     await policy.gotoPoliciesList();
  76 |     expect(await policy.getPolicyCount()).toBeGreaterThan(0);
  77 |   });
  78 | });
  79 | 
```