# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard\dashboard.spec.ts >> Dashboard @dashboard >> TC-DASH-003: dashboard portfolio value reconciles with /api/dashboard summary @regression @api
- Location: tests\dashboard\dashboard.spec.ts:33:7

# Error details

```
Error: UI value 92910.6 vs API value 0 exceeds tolerance 1

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    92910.6
```

# Page snapshot

```yaml
- generic [ref=f2e2]:
  - banner [ref=f2e3]:
    - link "FS FinServe Retail" [ref=f2e4] [cursor=pointer]:
      - /url: http://8.231.116.131:8082/dashboard
      - generic [ref=f2e5]: FS
      - generic [ref=f2e6]: FinServe Retail
    - navigation "Main navigation" [ref=f2e7]:
      - link "Dashboard" [ref=f2e8] [cursor=pointer]:
        - /url: http://8.231.116.131:8082/dashboard
      - link "Mutual Funds" [ref=f2e9] [cursor=pointer]:
        - /url: http://8.231.116.131:8082/mutual-funds
      - link "Portfolio" [ref=f2e10] [cursor=pointer]:
        - /url: http://8.231.116.131:8082/portfolio
      - link "Insurance" [ref=f2e11] [cursor=pointer]:
        - /url: http://8.231.116.131:8082/insurance
      - link "Policies" [ref=f2e12] [cursor=pointer]:
        - /url: http://8.231.116.131:8082/policies
      - link "Transactions" [ref=f2e13] [cursor=pointer]:
        - /url: http://8.231.116.131:8082/transactions
      - link "Support" [ref=f2e14] [cursor=pointer]:
        - /url: http://8.231.116.131:8082/support
      - link "Profile" [ref=f2e15] [cursor=pointer]:
        - /url: http://8.231.116.131:8082/profile
    - generic [ref=f2e16]:
      - generic [ref=f2e17]: Arjun Mehta
      - button "Logout" [ref=f2e19] [cursor=pointer]
  - main [ref=f2e20]:
    - generic [ref=f2e21]:
      - generic [ref=f2e22]:
        - generic [ref=f2e23]: Customer Dashboard
        - heading "Welcome, Arjun Mehta" [level=1] [ref=f2e24]
        - paragraph [ref=f2e25]: Track your portfolio, policies, transactions, and recommended products.
      - generic [ref=f2e26]:
        - generic [ref=f2e27]:
          - generic [ref=f2e28]: Portfolio Value
          - generic [ref=f2e29]: ₹92,910.60
        - generic [ref=f2e30]:
          - generic [ref=f2e31]: Invested Amount
          - generic [ref=f2e32]: ₹85,260.00
        - generic [ref=f2e33]:
          - generic [ref=f2e34]: Gain / Loss
          - generic [ref=f2e35]: ₹7,650.60
        - generic [ref=f2e36]:
          - generic [ref=f2e37]: Active Policies
          - generic [ref=f2e38]: "0"
      - generic [ref=f2e39]:
        - generic [ref=f2e40]:
          - generic [ref=f2e41]:
            - heading "Recent Transactions" [level=2] [ref=f2e42]
            - paragraph [ref=f2e43]: Latest account activity across investments, redemptions, and policies.
          - link "View all" [ref=f2e44] [cursor=pointer]:
            - /url: http://8.231.116.131:8082/transactions
        - table [ref=f2e46]:
          - rowgroup [ref=f2e47]:
            - row [ref=f2e48]:
              - columnheader "Reference" [ref=f2e49]
              - columnheader "Type" [ref=f2e50]
              - columnheader "Amount" [ref=f2e51]
              - columnheader "Status" [ref=f2e52]
          - rowgroup [ref=f2e53]:
            - row [ref=f2e54]:
              - cell "TXN-20260610140759-OYIHN" [ref=f2e55]
              - cell "Redemption" [ref=f2e56]
              - cell "₹3,197.52" [ref=f2e57]
              - cell "SUCCESS" [ref=f2e58]
            - row [ref=f2e60]:
              - cell "TXN-20260610140658-CFMP5" [ref=f2e61]
              - cell "Investment" [ref=f2e62]
              - cell "₹50,000.00" [ref=f2e63]
              - cell "SUCCESS" [ref=f2e64]
            - row [ref=f2e66]:
              - cell "TXN-20260610140441-ZJH1W" [ref=f2e67]
              - cell "Redemption" [ref=f2e68]
              - cell "₹38,594.46" [ref=f2e69]
              - cell "SUCCESS" [ref=f2e70]
            - row [ref=f2e72]:
              - cell "TXN-20260610140358-PRZVU" [ref=f2e73]
              - cell "Redemption" [ref=f2e74]
              - cell "₹57,019.12" [ref=f2e75]
              - cell "SUCCESS" [ref=f2e76]
            - row [ref=f2e78]:
              - cell "TXN-20260610135750-ROV31" [ref=f2e79]
              - cell "Investment" [ref=f2e80]
              - cell "₹2,000.00" [ref=f2e81]
              - cell "SUCCESS" [ref=f2e82]
      - generic [ref=f2e84]:
        - generic [ref=f2e85]:
          - generic [ref=f2e86]:
            - generic [ref=f2e87]:
              - heading "Recommended Mutual Funds" [level=2] [ref=f2e88]
              - paragraph [ref=f2e89]: Explore funds suitable for portfolio building.
            - link "Explore" [ref=f2e90] [cursor=pointer]:
              - /url: http://8.231.116.131:8082/mutual-funds
          - generic [ref=f2e91]:
            - generic [ref=f2e92]:
              - heading "FinServe Midcap Opportunities Fund" [level=3] [ref=f2e93]
              - paragraph [ref=f2e94]: Equity Fund
              - generic [ref=f2e95]:
                - generic [ref=f2e96]: Very High Risk
                - generic [ref=f2e97]: 22.30% 1Y
                - generic [ref=f2e98]: NAV ₹91.77
              - link "View details" [ref=f2e100] [cursor=pointer]:
                - /url: http://8.231.116.131:8082/mutual-funds/3
            - generic [ref=f2e101]:
              - heading "FinServe FastStart SIP Fund" [level=3] [ref=f2e102]
              - paragraph [ref=f2e103]: Equity Fund
              - generic [ref=f2e104]:
                - generic [ref=f2e105]: High Risk
                - generic [ref=f2e106]: 19.20% 1Y
                - generic [ref=f2e107]: NAV ₹27.35
              - link "View details" [ref=f2e109] [cursor=pointer]:
                - /url: http://8.231.116.131:8082/mutual-funds/11
            - generic [ref=f2e110]:
              - heading "FinServe Bluechip Equity Fund" [level=3] [ref=f2e111]
              - paragraph [ref=f2e112]: Equity Fund
              - generic [ref=f2e113]:
                - generic [ref=f2e114]: High Risk
                - generic [ref=f2e115]: 18.60% 1Y
                - generic [ref=f2e116]: NAV ₹142.55
              - link "View details" [ref=f2e118] [cursor=pointer]:
                - /url: http://8.231.116.131:8082/mutual-funds/1
        - generic [ref=f2e119]:
          - generic [ref=f2e120]:
            - generic [ref=f2e121]:
              - heading "Recommended Insurance Products" [level=2] [ref=f2e122]
              - paragraph [ref=f2e123]: Review insurance options based on seeded demo data.
            - link "Explore" [ref=f2e124] [cursor=pointer]:
              - /url: http://8.231.116.131:8082/insurance
          - generic [ref=f2e125]:
            - generic [ref=f2e126]:
              - heading "FinServe Life Protect Term Plan" [level=3] [ref=f2e127]
              - paragraph [ref=f2e128]: Term Insurance
              - generic [ref=f2e129]:
                - generic [ref=f2e130]: Cover ₹10,000,000
                - generic [ref=f2e131]: Premium ₹14,500
                - generic [ref=f2e132]: 25 years
              - link "View details" [ref=f2e134] [cursor=pointer]:
                - /url: http://8.231.116.131:8082/insurance/1
            - generic [ref=f2e135]:
              - heading "FinServe Secure Future Term Plan" [level=3] [ref=f2e136]
              - paragraph [ref=f2e137]: Term Insurance
              - generic [ref=f2e138]:
                - generic [ref=f2e139]: Cover ₹5,000,000
                - generic [ref=f2e140]: Premium ₹9,200
                - generic [ref=f2e141]: 20 years
              - link "View details" [ref=f2e143] [cursor=pointer]:
                - /url: http://8.231.116.131:8082/insurance/2
            - generic [ref=f2e144]:
              - heading "FinServe Health Secure Plan" [level=3] [ref=f2e145]
              - paragraph [ref=f2e146]: Health Insurance
              - generic [ref=f2e147]:
                - generic [ref=f2e148]: Cover ₹1,000,000
                - generic [ref=f2e149]: Premium ₹18,500
                - generic [ref=f2e150]: 1 years
              - link "View details" [ref=f2e152] [cursor=pointer]:
                - /url: http://8.231.116.131:8082/insurance/3
  - contentinfo [ref=f2e153]: FinServe Retail Demo Platform · Built for Playwright QA Automation Practice
```

# Test source

```ts
  1  | import { APIResponse, expect } from '@playwright/test';
  2  | import { transactionStatuses, transactionTypes, insuranceTypes, mutualFundCategories, riskLevels } from '../fixtures/testData';
  3  | 
  4  | /**
  5  |  * Reusable, meaningful assertion helpers shared across UI and API tests,
  6  |  * so validation logic is written once and imported everywhere.
  7  |  */
  8  | 
  9  | export async function expectStatus(response: APIResponse, expected: number) {
  10 |   expect(response.status(), `Expected HTTP ${expected} but got ${response.status()} for ${response.url()}`).toBe(expected);
  11 | }
  12 | 
  13 | export async function expectSuccessEnvelope(response: APIResponse) {
  14 |   const body = await response.json();
  15 |   expect(body, 'API response should contain a data field on success').toHaveProperty('data');
  16 |   return body;
  17 | }
  18 | 
  19 | export async function expectValidationErrorEnvelope(response: APIResponse) {
  20 |   const body = await response.json();
  21 |   expect(body, 'Validation error response should contain an errors/message field').toEqual(
  22 |     expect.objectContaining({}),
  23 |   );
  24 |   return body;
  25 | }
  26 | 
  27 | export function expectValidTransactionStatus(status: string) {
  28 |   expect(transactionStatuses as readonly string[]).toContain(status);
  29 | }
  30 | 
  31 | export function expectValidTransactionType(type: string) {
  32 |   expect(transactionTypes as readonly string[]).toContain(type);
  33 | }
  34 | 
  35 | export function expectValidInsuranceType(type: string) {
  36 |   expect(insuranceTypes as readonly string[]).toContain(type);
  37 | }
  38 | 
  39 | export function expectValidFundCategory(category: string) {
  40 |   expect(mutualFundCategories as readonly string[]).toContain(category);
  41 | }
  42 | 
  43 | export function expectValidRiskLevel(risk: string) {
  44 |   expect(riskLevels as readonly string[]).toContain(risk);
  45 | }
  46 | 
  47 | /** Compares a numeric UI value against an API value within a small tolerance (for currency rounding). */
  48 | export function expectAmountsReconcile(uiValue: number, apiValue: number, tolerance = 1) {
> 49 |   expect(Math.abs(uiValue - apiValue), `UI value ${uiValue} vs API value ${apiValue} exceeds tolerance ${tolerance}`).toBeLessThanOrEqual(tolerance);
     |                                                                                                                       ^ Error: UI value 92910.6 vs API value 0 exceeds tolerance 1
  50 | }
  51 | 
```