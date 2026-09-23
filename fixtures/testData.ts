/**
 * Domain test data derived from the source-defined data entities
 * (Feature Description doc, section 5) and metrics dictionary
 * (Problem Statement doc, section 2.1 / 2.2).
 * Keep values here instead of scattering literals across test files.
 */

export const mutualFundCategories = ['Equity Fund', 'Debt Fund', 'Hybrid Fund', 'Index Fund', 'ELSS'] as const;
export const riskLevels = ['Low Risk', 'Moderate Risk', 'High Risk', 'Very High Risk'] as const;
export const insuranceTypes = ['Term Insurance', 'Health Insurance', 'Motor Insurance', 'Travel Insurance'] as const;
export const transactionStatuses = ['SUCCESS', 'PENDING', 'FAILED', 'CANCELLED'] as const;
export const transactionTypes = ['Investment', 'Redemption', 'Premium Payment', 'Refund', 'Failed Payment'] as const;
export const kycStatuses = ['VERIFIED', 'PENDING', 'REJECTED'] as const;
export const accountStatuses = ['ACTIVE', 'LOCKED'] as const;

export const investmentTestData = {
  validLumpsumAmount: 10000,
  validSipAmount: 5000,
  belowMinimumAmount: 1, // expected to fail minimum_lumpsum / minimum_sip validation
  zeroAmount: 0,
  negativeAmount: -500,
  nonNumericAmount: 'abcd',
  extremelyLargeAmount: 999999999999,
  validPayment: 'UPI'
};

export const redemptionTestData = {
  validPartialUnits: 10,
  exceedsAvailableUnits: 999999,
  zeroUnits: 0,
  negativeUnits: -5,
};

export const insurancePurchaseTestData = {
  validNominee: {
    name: 'Test Nominee',
    relationship: 'Spouse',
    dateOfBirth: '1990-05-15',
  },
  missingNominee: {
    name: '',
    relationship: '',
    dateOfBirth: '',
  },
  underageApplicant: { age: 15 },
  overageApplicant: { age: 90 },
};

export const apiConfig = {
  header: 'X-API-Key',
  expectedKeyValue: process.env.API_KEY ?? 'qa-demo-token-123',
  expectedStatusCodes: {
    ok: 200,
    created: 201,
    validationError: 422,
    unauthorized: 401,
    notFound: 404,
    serverError: 500,
  },
};

export const dataTestIds = {
  login: {
    email: 'login-email',
    password: 'login-password',
    submit: 'login-submit',
  },
  dashboard: 'dashboard-page',
  portfolio: {
    totalValue: 'portfolio-total-value',
  },
  mutualFunds: {
    searchInput: 'fund-search-input',
    fundCard: (fundCode: string) => `fund-card-${fundCode}`,
  },
  investment: {
    amountInput: 'investment-amount-input',
    confirmButton: 'confirm-investment-button',
  },
  transactions: {
    statusFilter: 'transaction-status-filter',
    row: (transactionId: string) => `transaction-row-${transactionId}`,
  },
  holdings: {
    row: (holdingId: string) => `holding-row-${holdingId}`,
  },
  policies: {
    row: (policyId: string) => `policy-row-${policyId}`,
  },
};
