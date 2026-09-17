/**
 * Seed users as defined in the FinServe Retail Demo Platform feature
 * description (section 9 - Seeded Users and Test Data Isolation).
 * Passwords are read from environment variables - never hard-coded.
 */
export interface SeedUser {
  key: string;
  email: string;
  password: string;
  description: string;
}

export const users: Record<string, SeedUser> = {
  investor: {
    key: 'investor',
    email: process.env.INVESTOR_USER_EMAIL ?? 'investor1@finserve.test',
    password: process.env.INVESTOR_USER_PASSWORD ?? 'Password@123',
    description: 'Existing investor with an active portfolio',
  },
  newUser: {
    key: 'newUser',
    email: process.env.NEW_USER_EMAIL ?? 'newuser@finserve.test',
    password: process.env.NEW_USER_PASSWORD ?? 'Password@123',
    description: 'New user with no holdings (empty-state scenarios)',
  },
  insuranceUser: {
    key: 'insuranceUser',
    email: process.env.INSURANCE_USER_EMAIL ?? 'insurance1@finserve.test',
    password: process.env.INSURANCE_USER_PASSWORD ?? 'Password@123',
    description: 'User with active insurance policies',
  },
  qaUser: {
    key: 'qaUser',
    email: process.env.QA_USER_EMAIL ?? 'qauser@finserve.test',
    password: process.env.QA_USER_PASSWORD ?? 'Password@123',
    description: 'General purpose regression user',
  },
  lockedUser: {
    key: 'lockedUser',
    email: process.env.LOCKED_USER_EMAIL ?? 'locked@finserve.test',
    password: process.env.LOCKED_USER_PASSWORD ?? 'Password@123',
    description: 'Locked account - negative login scenario',
  },
  learner: {
    key: 'learner',
    email: process.env.LEARNER_USER_EMAIL ?? 'learner001@finserve.test',
    password: process.env.LEARNER_USER_PASSWORD ?? 'Password@123',
    description: 'Learner-isolated user for write scenarios (create investment/redemption/policy/support)',
  },
};

export const invalidUser: SeedUser = {
  key: 'invalid',
  email: 'not-a-real-user@finserve.test',
  password: 'WrongPassword@000',
  description: 'Deliberately invalid credentials for negative login test',
};
