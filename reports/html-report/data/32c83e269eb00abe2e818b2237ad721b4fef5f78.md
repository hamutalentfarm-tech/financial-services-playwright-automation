# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio\redemption.spec.ts >> Redemption @portfolio @redemption >> TC-RED-001: valid partial redemption by units succeeds @smoke @regression
- Location: tests\portfolio\redemption.spec.ts:28:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /redeem/i })

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
      - generic [ref=f2e17]: Arjun Mehta
      - button "Logout" [ref=f2e19] [cursor=pointer]
  - main [ref=f2e20]:
    - generic [ref=f2e21]:
      - generic [ref=f2e22]:
        - generic [ref=f2e23]: Portfolio
        - heading "Mutual Fund Holdings" [level=1] [ref=f2e24]
        - paragraph [ref=f2e25]: Review your holdings, current value, gains, and redemption actions.
      - generic [ref=f2e26]:
        - generic [ref=f2e27]:
          - generic [ref=f2e28]:
            - heading "Your Mutual Fund Portfolio" [level=2] [ref=f2e29]
            - paragraph [ref=f2e30]: A consolidated view of your investment value and current performance.
          - link "Invest More" [ref=f2e31] [cursor=pointer]:
            - /url: http://34.100.128.117:8082/mutual-funds
        - generic [ref=f2e32]:
          - generic [ref=f2e33]:
            - generic [ref=f2e34]: Current Value
            - generic [ref=f2e35]: ₹92,910.60
          - generic [ref=f2e36]:
            - generic [ref=f2e37]: Invested Amount
            - generic [ref=f2e38]: ₹85,260.00
          - generic [ref=f2e39]:
            - generic [ref=f2e40]: Gain / Loss
            - generic [ref=f2e41]: ₹7,650.60
          - generic [ref=f2e42]:
            - generic [ref=f2e43]: Return %
            - generic [ref=f2e44]: 8.97%
      - generic [ref=f2e45]:
        - generic [ref=f2e47]:
          - heading "Holdings" [level=2] [ref=f2e48]
          - paragraph [ref=f2e49]: Fund-wise units, NAV, investment value, and redemption action.
        - table [ref=f2e51]:
          - rowgroup [ref=f2e52]:
            - row [ref=f2e53]:
              - columnheader "Folio" [ref=f2e54]
              - columnheader "Fund" [ref=f2e55]
              - columnheader "Units" [ref=f2e56]
              - columnheader "Avg NAV" [ref=f2e57]
              - columnheader "Current NAV" [ref=f2e58]
              - columnheader "Invested" [ref=f2e59]
              - columnheader "Current Value" [ref=f2e60]
              - columnheader "Gain / Loss" [ref=f2e61]
              - columnheader "Action" [ref=f2e62]
          - rowgroup [ref=f2e63]:
            - row [ref=f2e64]:
              - cell "FOL-ARJ-001" [ref=f2e65]
              - cell [ref=f2e66]:
                - strong [ref=f2e67]: FinServe Bluechip Equity Fund
                - text: FSBLU001
              - cell "0.0000" [ref=f2e68]
              - cell "₹118.00" [ref=f2e69]
              - cell "₹142.55" [ref=f2e70]
              - cell "₹0.00" [ref=f2e71]
              - cell "₹0.00" [ref=f2e72]
              - cell "₹0.00" [ref=f2e73]
              - cell [ref=f2e74]:
                - link "Redeem" [ref=f2e75] [cursor=pointer]:
                  - /url: http://34.100.128.117:8082/redeem/1
            - row [ref=f2e76]:
              - cell "FOL-ARJ-002" [ref=f2e77]
              - cell [ref=f2e78]:
                - strong [ref=f2e79]: FinServe Nifty Index Fund
                - text: FSIDX004
              - cell "0.0000" [ref=f2e80]
              - cell "₹52.25" [ref=f2e81]
              - cell "₹64.32" [ref=f2e82]
              - cell "₹0.00" [ref=f2e83]
              - cell "₹0.00" [ref=f2e84]
              - cell "₹0.00" [ref=f2e85]
              - cell [ref=f2e86]:
                - link "Redeem" [ref=f2e87] [cursor=pointer]:
                  - /url: http://34.100.128.117:8082/redeem/2
            - row [ref=f2e88]:
              - cell "FOL-ARJ-003" [ref=f2e89]
              - cell [ref=f2e90]:
                - strong [ref=f2e91]: FinServe Hybrid Advantage Fund
                - text: FSHYB006
              - cell "820.0000" [ref=f2e92]
              - cell "₹43.00" [ref=f2e93]
              - cell "₹52.33" [ref=f2e94]
              - cell "₹35,260.00" [ref=f2e95]
              - cell "₹42,910.60" [ref=f2e96]
              - cell "₹7,650.60" [ref=f2e97]
              - cell [ref=f2e98]:
                - link "Redeem" [ref=f2e99] [cursor=pointer]:
                  - /url: http://34.100.128.117:8082/redeem/3
            - row [ref=f2e100]:
              - cell "FOL-0001-FSBAL007-135547" [ref=f2e101]
              - cell [ref=f2e102]:
                - strong [ref=f2e103]: FinServe Balanced Allocation Fund
                - text: FSBAL007
              - cell "0.0000" [ref=f2e104]
              - cell "₹45.68" [ref=f2e105]
              - cell "₹45.68" [ref=f2e106]
              - cell "₹0.00" [ref=f2e107]
              - cell "₹0.00" [ref=f2e108]
              - cell "₹0.00" [ref=f2e109]
              - cell [ref=f2e110]:
                - link "Redeem" [ref=f2e111] [cursor=pointer]:
                  - /url: http://34.100.128.117:8082/redeem/48
            - row [ref=f2e112]:
              - cell "FOL-0001-FSDIV012-140657" [ref=f2e113]
              - cell [ref=f2e114]:
                - strong [ref=f2e115]: FinServe Dividend Yield Fund
                - text: FSDIV012
              - cell "594.3890" [ref=f2e116]
              - cell "₹84.12" [ref=f2e117]
              - cell "₹84.12" [ref=f2e118]
              - cell "₹50,000.00" [ref=f2e119]
              - cell "₹50,000.00" [ref=f2e120]
              - cell "₹0.00" [ref=f2e121]
              - cell [ref=f2e122]:
                - link "Redeem" [ref=f2e123] [cursor=pointer]:
                  - /url: http://34.100.128.117:8082/redeem/49
  - contentinfo [ref=f2e124]: FinServe Retail Demo Platform · Built for Playwright QA Automation Practice
```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures/auth.fixture';
  2  | import { PortfolioPage } from '../../pages/PortfolioPage';
  3  | import { RedemptionPage } from '../../pages/RedemptionPage';
  4  | import { redemptionTestData } from '../../fixtures/testData';
  5  | 
  6  | /**
  7  |  * Module: Redemption / Sell Flow
  8  |  * Source: Feature Description doc (Redemption row) and Problem Statement doc
  9  |  * (issue #7 - redemption allows amount greater than available holding value).
  10 |  */
  11 | test.describe('Redemption @portfolio @redemption', () => {
  12 |   test.beforeEach(async ({ page }) => {
  13 |     const { LoginPage } = await import('../../pages/LoginPage');
  14 |     const { users } = await import('../../fixtures/users');
  15 |     const loginPage = new LoginPage(page);
  16 |     await loginPage.goto();
  17 |     await loginPage.login(users.investor.email, users.investor.password);
  18 |     await loginPage.expectLoginSuccess();
  19 |   });
  20 | 
  21 |   async function openRedemptionFormForFirstHolding(page: import('@playwright/test').Page) {
  22 |     const portfolio = new PortfolioPage(page);
  23 |     await portfolio.goto();
  24 |     await portfolio.holdingsRows.first().click();
> 25 |     await page.getByRole('button', { name: /redeem/i }).click();
     |                                                         ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  26 |   }
  27 | 
  28 |   test('TC-RED-001: valid partial redemption by units succeeds @smoke @regression', async ({ page }) => {
  29 |     await openRedemptionFormForFirstHolding(page);
  30 |     const redemption = new RedemptionPage(page);
  31 |     await redemption.redeemByUnits(redemptionTestData.validPartialUnits);
  32 |     await redemption.expectConfirmation();
  33 |   });
  34 | 
  35 |   test('TC-RED-002: redemption exceeding available units is rejected @regression', async ({ page }) => {
  36 |     await openRedemptionFormForFirstHolding(page);
  37 |     const redemption = new RedemptionPage(page);
  38 |     await redemption.redeemByUnits(redemptionTestData.exceedsAvailableUnits);
  39 |     await redemption.expectValidationError();
  40 |   });
  41 | 
  42 |   test('TC-RED-003: zero-unit redemption is rejected @regression', async ({ page }) => {
  43 |     await openRedemptionFormForFirstHolding(page);
  44 |     const redemption = new RedemptionPage(page);
  45 |     await redemption.redeemByUnits(redemptionTestData.zeroUnits);
  46 |     await redemption.expectValidationError();
  47 |   });
  48 | 
  49 |   test('TC-RED-004: negative-unit redemption is rejected @regression', async ({ page }) => {
  50 |     await openRedemptionFormForFirstHolding(page);
  51 |     const redemption = new RedemptionPage(page);
  52 |     await redemption.redeemByUnits(redemptionTestData.negativeUnits);
  53 |     await redemption.expectValidationError();
  54 |   });
  55 | 
  56 |   test('TC-RED-005: successful redemption creates a corresponding transaction @regression', async ({ page }) => {
  57 |     await openRedemptionFormForFirstHolding(page);
  58 |     const redemption = new RedemptionPage(page);
  59 |     await redemption.redeemByUnits(redemptionTestData.validPartialUnits);
  60 |     await redemption.expectConfirmation();
  61 | 
  62 |     await page.goto('/transactions');
  63 |     await expect(page.locator('[data-testid^="transaction-row-"]').first()).toBeVisible();
  64 |   });
  65 | });
  66 | 
```