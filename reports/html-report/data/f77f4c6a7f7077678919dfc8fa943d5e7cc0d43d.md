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
  - waiting for getByRole('button', { name: /buy now|purchase/i })

```

# Page snapshot

```yaml
- generic [ref=f2e2]:
  - banner [ref=f2e3]:
    - link "FS FinServe Retail" [ref=f2e4] [cursor=pointer]:
      - /url: http://34.100.128.117:8082/dashboard
      - generic [ref=f2e5]: FS
      - generic [ref=f2e6]: FinServe Retail
    - navigation "Main navigation" [ref=f2e7]:
      - link "Dashboard" [ref=f2e8] [cursor=pointer]:
        - /url: http://34.100.128.117:8082/dashboard
      - link "Mutual Funds" [ref=f2e9] [cursor=pointer]:
        - /url: http://34.100.128.117:8082/mutual-funds
      - link "Portfolio" [ref=f2e10] [cursor=pointer]:
        - /url: http://34.100.128.117:8082/portfolio
      - link "Insurance" [ref=f2e11] [cursor=pointer]:
        - /url: http://34.100.128.117:8082/insurance
      - link "Policies" [ref=f2e12] [cursor=pointer]:
        - /url: http://34.100.128.117:8082/policies
      - link "Transactions" [ref=f2e13] [cursor=pointer]:
        - /url: http://34.100.128.117:8082/transactions
      - link "Support" [ref=f2e14] [cursor=pointer]:
        - /url: http://34.100.128.117:8082/support
      - link "Profile" [ref=f2e15] [cursor=pointer]:
        - /url: http://34.100.128.117:8082/profile
    - generic [ref=f2e16]:
      - generic [ref=f2e17]: Learner 001
      - button "Logout" [ref=f2e19] [cursor=pointer]
  - main [ref=f2e20]:
    - generic [ref=f2e22]:
      - heading "Insurance Products" [level=1] [ref=f2e23]
      - paragraph [ref=f2e24]: Browse protection products and validate search, filter, detail, and purchase flows.
    - generic [ref=f2e26]:
      - generic [ref=f2e27]:
        - generic [ref=f2e28]: Search
        - textbox "Search" [ref=f2e29]:
          - /placeholder: Search insurance products
      - generic [ref=f2e30]:
        - generic [ref=f2e31]: Insurance Type
        - combobox "Insurance Type" [ref=f2e32]:
          - option "All Types" [selected]
          - option "Term Insurance"
          - option "Health Insurance"
          - option "Motor Insurance"
          - option "Travel Insurance"
      - generic [ref=f2e33]:
        - generic [ref=f2e34]: Premium Range
        - combobox "Premium Range" [ref=f2e35]:
          - option "All Premiums" [selected]
          - option "Under ₹5,000"
          - option "₹5,000 - ₹15,000"
          - option "Above ₹15,000"
      - generic [ref=f2e36]:
        - button "Apply" [ref=f2e37] [cursor=pointer]
        - link "Reset" [ref=f2e38] [cursor=pointer]:
          - /url: http://34.100.128.117:8082/insurance
    - generic [ref=f2e39]:
      - article [ref=f2e40]:
        - generic [ref=f2e41]:
          - generic [ref=f2e42]: Term Insurance
          - text: FSLIFE002
        - heading "FinServe Secure Future Term Plan" [level=2] [ref=f2e43]
        - paragraph [ref=f2e44]: FinServe Secure Future Term Plan is a seeded demo insurance product for black-box QA automation practice.
        - generic [ref=f2e45]:
          - generic [ref=f2e46]:
            - term [ref=f2e47]: Coverage
            - definition [ref=f2e48]: ₹5,000,000
          - generic [ref=f2e49]:
            - term [ref=f2e50]: Premium
            - definition [ref=f2e51]: ₹9,200
          - generic [ref=f2e52]:
            - term [ref=f2e53]: Term
            - definition [ref=f2e54]: 20 years
        - generic [ref=f2e55]:
          - link "View Details" [ref=f2e56] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/insurance/2
          - link "Buy" [ref=f2e57] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/buy-insurance/2
      - article [ref=f2e58]:
        - generic [ref=f2e59]:
          - generic [ref=f2e60]: Term Insurance
          - text: FSLIFE001
        - heading "FinServe Life Protect Term Plan" [level=2] [ref=f2e61]
        - paragraph [ref=f2e62]: FinServe Life Protect Term Plan is a seeded demo insurance product for black-box QA automation practice.
        - generic [ref=f2e63]:
          - generic [ref=f2e64]:
            - term [ref=f2e65]: Coverage
            - definition [ref=f2e66]: ₹10,000,000
          - generic [ref=f2e67]:
            - term [ref=f2e68]: Premium
            - definition [ref=f2e69]: ₹14,500
          - generic [ref=f2e70]:
            - term [ref=f2e71]: Term
            - definition [ref=f2e72]: 25 years
        - generic [ref=f2e73]:
          - link "View Details" [ref=f2e74] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/insurance/1
          - link "Buy" [ref=f2e75] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/buy-insurance/1
      - article [ref=f2e76]:
        - generic [ref=f2e77]:
          - generic [ref=f2e78]: Health Insurance
          - text: FSACCD008
        - heading "FinServe Accident Cover Plus" [level=2] [ref=f2e79]
        - paragraph [ref=f2e80]: FinServe Accident Cover Plus is a seeded demo insurance product for black-box QA automation practice.
        - generic [ref=f2e81]:
          - generic [ref=f2e82]:
            - term [ref=f2e83]: Coverage
            - definition [ref=f2e84]: ₹2,500,000
          - generic [ref=f2e85]:
            - term [ref=f2e86]: Premium
            - definition [ref=f2e87]: ₹7,800
          - generic [ref=f2e88]:
            - term [ref=f2e89]: Term
            - definition [ref=f2e90]: 1 years
        - generic [ref=f2e91]:
          - link "View Details" [ref=f2e92] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/insurance/8
          - link "Buy" [ref=f2e93] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/buy-insurance/8
      - article [ref=f2e94]:
        - generic [ref=f2e95]:
          - generic [ref=f2e96]: Health Insurance
          - text: FSHLTH003
        - heading "FinServe Health Secure Plan" [level=2] [ref=f2e97]
        - paragraph [ref=f2e98]: FinServe Health Secure Plan is a seeded demo insurance product for black-box QA automation practice.
        - generic [ref=f2e99]:
          - generic [ref=f2e100]:
            - term [ref=f2e101]: Coverage
            - definition [ref=f2e102]: ₹1,000,000
          - generic [ref=f2e103]:
            - term [ref=f2e104]: Premium
            - definition [ref=f2e105]: ₹18,500
          - generic [ref=f2e106]:
            - term [ref=f2e107]: Term
            - definition [ref=f2e108]: 1 years
        - generic [ref=f2e109]:
          - link "View Details" [ref=f2e110] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/insurance/3
          - link "Buy" [ref=f2e111] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/buy-insurance/3
      - article [ref=f2e112]:
        - generic [ref=f2e113]:
          - generic [ref=f2e114]: Health Insurance
          - text: FSHLTH004
        - heading "FinServe Family Health Plus" [level=2] [ref=f2e115]
        - paragraph [ref=f2e116]: FinServe Family Health Plus is a seeded demo insurance product for black-box QA automation practice.
        - generic [ref=f2e117]:
          - generic [ref=f2e118]:
            - term [ref=f2e119]: Coverage
            - definition [ref=f2e120]: ₹2,000,000
          - generic [ref=f2e121]:
            - term [ref=f2e122]: Premium
            - definition [ref=f2e123]: ₹29,500
          - generic [ref=f2e124]:
            - term [ref=f2e125]: Term
            - definition [ref=f2e126]: 1 years
        - generic [ref=f2e127]:
          - link "View Details" [ref=f2e128] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/insurance/4
          - link "Buy" [ref=f2e129] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/buy-insurance/4
      - article [ref=f2e130]:
        - generic [ref=f2e131]:
          - generic [ref=f2e132]: Motor Insurance
          - text: FSMOTO006
        - heading "FinServe Two Wheeler Protect" [level=2] [ref=f2e133]
        - paragraph [ref=f2e134]: FinServe Two Wheeler Protect is a seeded demo insurance product for black-box QA automation practice.
        - generic [ref=f2e135]:
          - generic [ref=f2e136]:
            - term [ref=f2e137]: Coverage
            - definition [ref=f2e138]: ₹125,000
          - generic [ref=f2e139]:
            - term [ref=f2e140]: Premium
            - definition [ref=f2e141]: ₹2,100
          - generic [ref=f2e142]:
            - term [ref=f2e143]: Term
            - definition [ref=f2e144]: 1 years
        - generic [ref=f2e145]:
          - link "View Details" [ref=f2e146] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/insurance/6
          - link "Buy" [ref=f2e147] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/buy-insurance/6
      - article [ref=f2e148]:
        - generic [ref=f2e149]:
          - generic [ref=f2e150]: Motor Insurance
          - text: FSMOTO005
        - heading "FinServe Motor Shield" [level=2] [ref=f2e151]
        - paragraph [ref=f2e152]: FinServe Motor Shield is a seeded demo insurance product for black-box QA automation practice.
        - generic [ref=f2e153]:
          - generic [ref=f2e154]:
            - term [ref=f2e155]: Coverage
            - definition [ref=f2e156]: ₹700,000
          - generic [ref=f2e157]:
            - term [ref=f2e158]: Premium
            - definition [ref=f2e159]: ₹12,500
          - generic [ref=f2e160]:
            - term [ref=f2e161]: Term
            - definition [ref=f2e162]: 1 years
        - generic [ref=f2e163]:
          - link "View Details" [ref=f2e164] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/insurance/5
          - link "Buy" [ref=f2e165] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/buy-insurance/5
      - article [ref=f2e166]:
        - generic [ref=f2e167]:
          - generic [ref=f2e168]: Travel Insurance
          - text: FSTRVL007
        - heading "FinServe Travel Guard" [level=2] [ref=f2e169]
        - paragraph [ref=f2e170]: FinServe Travel Guard is a seeded demo insurance product for black-box QA automation practice.
        - generic [ref=f2e171]:
          - generic [ref=f2e172]:
            - term [ref=f2e173]: Coverage
            - definition [ref=f2e174]: ₹500,000
          - generic [ref=f2e175]:
            - term [ref=f2e176]: Premium
            - definition [ref=f2e177]: ₹1,800
          - generic [ref=f2e178]:
            - term [ref=f2e179]: Term
            - definition [ref=f2e180]: 1 years
        - generic [ref=f2e181]:
          - link "View Details" [ref=f2e182] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/insurance/7
          - link "Buy" [ref=f2e183] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/buy-insurance/7
  - contentinfo [ref=f2e184]: FinServe Retail Demo Platform · Built for Playwright QA Automation Practice
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
  27 |     await insurance.productCards.first().click();
> 28 |     await page.getByRole('button', { name: /buy now|purchase/i }).click();
     |                                                                   ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
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