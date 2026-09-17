import { Page } from '@playwright/test';

/**
 * Miscellaneous helpers used across page objects/tests.
 * Deliberately avoids hard-coded waits (page.waitForTimeout) per the
 * automation best practices in the Technical Environment doc (section 1.6).
 */

export function parseCurrencyToNumber(text: string): number {
  // Strips currency symbols/commas, e.g. "₹1,23,456.00" -> 123456.00
  const cleaned = text.replace(/[^0-9.-]/g, '');
  return Number(cleaned);
}

export async function getTestIdText(page: Page, testId: string): Promise<string> {
  const locator = page.getByTestId(testId);
  await locator.waitFor({ state: 'visible' });
  return (await locator.textContent())?.trim() ?? '';
}

export async function isLoggedIn(page: Page, dashboardTestId: string): Promise<boolean> {
  try {
    await page.getByTestId(dashboardTestId).waitFor({ state: 'visible', timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

/** Waits for a network response matching a URL fragment and method, useful for UI/API reconciliation. */
export function waitForApiResponse(page: Page, urlFragment: string, method = 'GET') {
  return page.waitForResponse(
    (resp) => resp.url().includes(urlFragment) && resp.request().method() === method,
  );
}
