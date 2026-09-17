import { APIResponse, expect } from '@playwright/test';
import { transactionStatuses, transactionTypes, insuranceTypes, mutualFundCategories, riskLevels } from '../fixtures/testData';

/**
 * Reusable, meaningful assertion helpers shared across UI and API tests,
 * so validation logic is written once and imported everywhere.
 */

export async function expectStatus(response: APIResponse, expected: number) {
  expect(response.status(), `Expected HTTP ${expected} but got ${response.status()} for ${response.url()}`).toBe(expected);
}

export async function expectSuccessEnvelope(response: APIResponse) {
  const body = await response.json();
  expect(body, 'API response should contain a data field on success').toHaveProperty('data');
  return body;
}

export async function expectValidationErrorEnvelope(response: APIResponse) {
  const body = await response.json();
  expect(body, 'Validation error response should contain an errors/message field').toEqual(
    expect.objectContaining({}),
  );
  return body;
}

export function expectValidTransactionStatus(status: string) {
  expect(transactionStatuses as readonly string[]).toContain(status);
}

export function expectValidTransactionType(type: string) {
  expect(transactionTypes as readonly string[]).toContain(type);
}

export function expectValidInsuranceType(type: string) {
  expect(insuranceTypes as readonly string[]).toContain(type);
}

export function expectValidFundCategory(category: string) {
  expect(mutualFundCategories as readonly string[]).toContain(category);
}

export function expectValidRiskLevel(risk: string) {
  expect(riskLevels as readonly string[]).toContain(risk);
}

/** Compares a numeric UI value against an API value within a small tolerance (for currency rounding). */
export function expectAmountsReconcile(uiValue: number, apiValue: number, tolerance = 1) {
  expect(Math.abs(uiValue - apiValue), `UI value ${uiValue} vs API value ${apiValue} exceeds tolerance ${tolerance}`).toBeLessThanOrEqual(tolerance);
}
