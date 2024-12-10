describe('Artist Analytics', () => {
  beforeEach(() => {
    cy.login('artist@example.com', 'password');
    cy.visit('/artist/analytics');
  });

  it('displays analytics dashboard', () => {
    cy.get('[data-testid="metrics-grid"]').should('be.visible');
    cy.get('[data-testid="performance-chart"]').should('be.visible');
    cy.get('[data-testid="engagement-stats"]').should('be.visible');
  });

  it('allows changing time range', () => {
    cy.get('[data-testid="time-range-select"]').select('30d');
    cy.get('[data-testid="performance-chart"]').should('be.visible');
  });

  it('shows correct metrics formatting', () => {
    cy.get('[data-testid="total-plays"]').should('contain', ',');
    cy.get('[data-testid="revenue"]').should('contain', '$');
  });
});