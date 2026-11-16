describe('Smoke tests', () => {

  // Test 1 : vérifier le formulaire de connexion
  it('Vérifie l’affichage du formulaire de connexion', () => {
    cy.visit('http://localhost:4200/#/login');

    cy.get('[data-cy="login-input-username"]').should('be.visible');
    cy.get('[data-cy="login-input-password"]').should('be.visible');
    cy.get('[data-cy="login-submit"]').should('be.visible');
  });

  // Test 2 : vérifier la présence du panier après connexion
  it('Vérifie la présence du panier après connexion', () => {
    cy.visit('http://localhost:4200/#/login');

    cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
    cy.get('[data-cy="login-input-password"]').type('testtest');
    cy.get('[data-cy="login-submit"]').click();

    cy.get('[data-cy="nav-link-cart"]').should('be.visible');
  });

});