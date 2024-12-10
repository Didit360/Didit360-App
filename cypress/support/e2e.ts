import './commands';

beforeEach(() => {
  cy.intercept('GET', '/api/analytics', { fixture: 'analytics.json' });
  cy.intercept('GET', '/api/user/profile', { fixture: 'profile.json' });
});