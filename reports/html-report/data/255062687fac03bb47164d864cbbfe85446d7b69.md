# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: transactions\transactions.spec.ts >> Transaction History @transactions >> TC-TXN-004: opening a transaction row shows transaction detail @regression
- Location: tests\transactions\transactions.spec.ts:46:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /transactions\/.+/
Received string:  "http://8.231.116.131:8082/transactions"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://8.231.116.131:8082/transactions"

```

```yaml
- banner:
  - link "FS FinServe Retail":
    - /url: http://8.231.116.131:8082/dashboard
  - navigation "Main navigation":
    - link "Dashboard":
      - /url: http://8.231.116.131:8082/dashboard
    - link "Mutual Funds":
      - /url: http://8.231.116.131:8082/mutual-funds
    - link "Portfolio":
      - /url: http://8.231.116.131:8082/portfolio
    - link "Insurance":
      - /url: http://8.231.116.131:8082/insurance
    - link "Policies":
      - /url: http://8.231.116.131:8082/policies
    - link "Transactions":
      - /url: http://8.231.116.131:8082/transactions
    - link "Support":
      - /url: http://8.231.116.131:8082/support
    - link "Profile":
      - /url: http://8.231.116.131:8082/profile
  - text: Arjun Mehta
  - button "Logout"
- main:
  - paragraph: Transaction History
  - heading "Transactions" [level=1]
  - paragraph: Search and filter your investment, redemption, premium, refund, and failed payment transactions.
  - text: Search
  - textbox "Search":
    - /placeholder: Reference or product name
  - text: Type
  - combobox "Type":
    - option "All Types" [selected]
    - option "Investment"
    - option "Redemption"
    - option "Premium Payment"
    - option "Refund"
    - option "Failed Payment"
  - text: Status
  - combobox "Status":
    - option "All Statuses" [selected]
    - option "SUCCESS"
    - option "PENDING"
    - option "FAILED"
    - option "CANCELLED"
  - text: From
  - textbox "From"
  - text: To
  - textbox "To"
  - button "Apply Filters"
  - link "Reset":
    - /url: http://8.231.116.131:8082/transactions
  - table:
    - rowgroup:
      - row "Reference Date Type Product Amount Status Action":
        - columnheader "Reference"
        - columnheader "Date"
        - columnheader "Type"
        - columnheader "Product"
        - columnheader "Amount"
        - columnheader "Status"
        - columnheader "Action"
    - rowgroup:
      - row "TXN-20260610140759-OYIHN 10 Jun 2026 Redemption FinServe Balanced Allocation Fund ₹3,197.52 SUCCESS View":
        - cell "TXN-20260610140759-OYIHN"
        - cell "10 Jun 2026"
        - cell "Redemption"
        - cell "FinServe Balanced Allocation Fund"
        - cell "₹3,197.52"
        - cell "SUCCESS"
        - cell "View":
          - link "View":
            - /url: http://8.231.116.131:8082/transactions/103
      - row "TXN-20260610140658-CFMP5 10 Jun 2026 Investment FinServe Dividend Yield Fund ₹50,000.00 SUCCESS View":
        - cell "TXN-20260610140658-CFMP5"
        - cell "10 Jun 2026"
        - cell "Investment"
        - cell "FinServe Dividend Yield Fund"
        - cell "₹50,000.00"
        - cell "SUCCESS"
        - cell "View":
          - link "View":
            - /url: http://8.231.116.131:8082/transactions/102
      - row "TXN-20260610140441-ZJH1W 10 Jun 2026 Redemption FinServe Nifty Index Fund ₹38,594.46 SUCCESS View":
        - cell "TXN-20260610140441-ZJH1W"
        - cell "10 Jun 2026"
        - cell "Redemption"
        - cell "FinServe Nifty Index Fund"
        - cell "₹38,594.46"
        - cell "SUCCESS"
        - cell "View":
          - link "View":
            - /url: http://8.231.116.131:8082/transactions/101
      - row "TXN-20260610140358-PRZVU 10 Jun 2026 Redemption FinServe Bluechip Equity Fund ₹57,019.12 SUCCESS View":
        - cell "TXN-20260610140358-PRZVU"
        - cell "10 Jun 2026"
        - cell "Redemption"
        - cell "FinServe Bluechip Equity Fund"
        - cell "₹57,019.12"
        - cell "SUCCESS"
        - cell "View":
          - link "View":
            - /url: http://8.231.116.131:8082/transactions/100
      - row "TXN-20260610135750-ROV31 10 Jun 2026 Investment FinServe Balanced Allocation Fund ₹2,000.00 SUCCESS View":
        - cell "TXN-20260610135750-ROV31"
        - cell "10 Jun 2026"
        - cell "Investment"
        - cell "FinServe Balanced Allocation Fund"
        - cell "₹2,000.00"
        - cell "SUCCESS"
        - cell "View":
          - link "View":
            - /url: http://8.231.116.131:8082/transactions/99
      - row "TXN-20260610135547-VBM9K 10 Jun 2026 Investment FinServe Balanced Allocation Fund ₹1,000.00 SUCCESS View":
        - cell "TXN-20260610135547-VBM9K"
        - cell "10 Jun 2026"
        - cell "Investment"
        - cell "FinServe Balanced Allocation Fund"
        - cell "₹1,000.00"
        - cell "SUCCESS"
        - cell "View":
          - link "View":
            - /url: http://8.231.116.131:8082/transactions/98
      - row "TXN-ARJ-FAIL-001 16 May 2026 Failed Payment FinServe Bluechip Equity Fund ₹9,999.00 SUCCESS View":
        - cell "TXN-ARJ-FAIL-001"
        - cell "16 May 2026"
        - cell "Failed Payment"
        - cell "FinServe Bluechip Equity Fund"
        - cell "₹9,999.00"
        - cell "SUCCESS"
        - cell "View":
          - link "View":
            - /url: http://8.231.116.131:8082/transactions/3
      - row "TXN-ARJ-RED-001 16 May 2026 Redemption FinServe Bluechip Equity Fund ₹1,425.48 SUCCESS View":
        - cell "TXN-ARJ-RED-001"
        - cell "16 May 2026"
        - cell "Redemption"
        - cell "FinServe Bluechip Equity Fund"
        - cell "₹1,425.48"
        - cell "SUCCESS"
        - cell "View":
          - link "View":
            - /url: http://8.231.116.131:8082/transactions/2
      - row "TXN-ARJ-INV-001 16 May 2026 Investment FinServe Bluechip Equity Fund ₹25,000.00 SUCCESS View":
        - cell "TXN-ARJ-INV-001"
        - cell "16 May 2026"
        - cell "Investment"
        - cell "FinServe Bluechip Equity Fund"
        - cell "₹25,000.00"
        - cell "SUCCESS"
        - cell "View":
          - link "View":
            - /url: http://8.231.116.131:8082/transactions/1
- contentinfo: FinServe Retail Demo Platform · Built for Playwright QA Automation Practice
```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures/auth.fixture';
  2  | import { TransactionPage } from '../../pages/TransactionPage';
  3  | import { ApiClient } from '../../utils/apiClient';
  4  | import { transactionStatuses } from '../../fixtures/testData';
  5  | import { expectValidTransactionStatus, expectValidTransactionType } from '../../utils/assertions';
  6  | 
  7  | /**
  8  |  * Module: Transactions and Policies (transaction history slice)
  9  |  * Source: Feature Description doc (Transactions row) and Problem Statement
  10 |  * doc (issue #10 - transaction history does not show latest activity, and
  11 |  * issue #12 - filters behave differently across browsers, covered by the
  12 |  * chromium/firefox/webkit projects in playwright.config.ts).
  13 |  */
  14 | test.describe('Transaction History @transactions', () => {
  15 |   test('TC-TXN-001: transaction history loads for the authenticated user @smoke', async ({ investorPage }) => {
  16 |     const transactions = new TransactionPage(investorPage);
  17 |     await transactions.goto();
  18 |     expect(await transactions.getVisibleCount()).toBeGreaterThanOrEqual(0);
  19 |   });
  20 | 
  21 |   test(`TC-TXN-002: filtering by status "${transactionStatuses[0]}" returns only matching rows @regression`, async ({ investorPage }) => {
  22 |     const transactions = new TransactionPage(investorPage);
  23 |     await transactions.goto();
  24 |     await transactions.filterByStatus(transactionStatuses[0]);
  25 |     await transactions.expectAllRowsHaveStatus(transactionStatuses[0]);
  26 |   });
  27 | 
  28 |   test('TC-TXN-003: transaction list from UI is consistent with /api/transactions @regression @api', async ({ investorPage, apiContext }) => {
  29 |     const transactions = new TransactionPage(investorPage);
  30 |     await transactions.goto();
  31 |     const uiCount = await transactions.getVisibleCount();
  32 | 
  33 |     const api = new ApiClient(apiContext);
  34 |     const response = await api.getTransactions();
  35 |     expect(response.ok()).toBeTruthy();
  36 |     const body = await response.json();
  37 |     const apiTransactions: Array<{ status: string; transaction_type: string }> = body?.data ?? body ?? [];
  38 | 
  39 |     expect(apiTransactions.length).toBeGreaterThanOrEqual(uiCount > 0 ? 1 : 0);
  40 |     for (const txn of apiTransactions) {
  41 |       expectValidTransactionStatus(txn.status);
  42 |       expectValidTransactionType(txn.transaction_type);
  43 |     }
  44 |   });
  45 | 
  46 |   test('TC-TXN-004: opening a transaction row shows transaction detail @regression', async ({ investorPage }) => {
  47 |     const transactions = new TransactionPage(investorPage);
  48 |     await transactions.goto();
  49 |     const firstRow = transactions.transactionRows.first();
  50 |     if (await firstRow.isVisible().catch(() => false)) {
  51 |       await firstRow.click();
> 52 |       await expect(investorPage).toHaveURL(/transactions\/.+/);
     |                                  ^ Error: expect(page).toHaveURL(expected) failed
  53 |     }
  54 |   });
  55 | });
  56 | 
```