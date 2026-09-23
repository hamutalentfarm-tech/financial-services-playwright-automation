# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\auth.api.spec.ts >> API - Health & Auth @api >> TC-API-004: request without X-API-Key header returns 401 @regression @api
- Location: tests\api\auth.api.spec.ts:30:7

# Error details

```
Error: Expected HTTP 401 but got 200 for http://8.231.116.131:8082/login

expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 200
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
> 10 |   expect(response.status(), `Expected HTTP ${expected} but got ${response.status()} for ${response.url()}`).toBe(expected);
     |                                                                                                             ^ Error: Expected HTTP 401 but got 200 for http://8.231.116.131:8082/login
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
  49 |   expect(Math.abs(uiValue - apiValue), `UI value ${uiValue} vs API value ${apiValue} exceeds tolerance ${tolerance}`).toBeLessThanOrEqual(tolerance);
  50 | }
  51 | 
```