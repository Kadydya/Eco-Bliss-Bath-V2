describe('Test de connexion', () => {

  it('Vérifie la connexion utilisateur', () => {

    cy.visit('http://localhost:4200/#/login');

    cy.get('[data-cy="login-input-username"]')
      .type('test2@test.fr');

    cy.get('[data-cy="login-input-password"]')
      .type('testtest');

    cy.get('[data-cy="login-submit"]').click();

    // Vérifier que le panier apparaît après connexion
    cy.get('[data-cy="nav-link-cart"]')
      .should('be.visible')
      .and('contain', 'Mon panier');

  });

});