/**
 * Lightweight, dependency-free test data generator so learners are not
 * forced to overwrite each other's data (see "Learner-specific users" in
 * the Feature Description doc, section 9).
 */

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomAmount(min = 1000, max = 100000): number {
  return randomInt(min, max / 100) * 100;
}

export function uniqueSuffix(): string {
  return `${Date.now()}-${randomInt(1000, 9999)}`;
}

export function generateSupportTicketSubject(): string {
  return `QA automated support request ${uniqueSuffix()}`;
}

export function generateNominee() {
  const suffix = uniqueSuffix();
  return {
    name: `QA Nominee ${suffix}`,
    relationship: 'Spouse',
    dateOfBirth: '1990-01-01',
  };
}

/** Builds a transaction reference-like string for assertions/logging only (not for submission to the app). */
export function buildExpectedTxnPrefix(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `TXN${yyyy}${mm}${dd}`;
}
