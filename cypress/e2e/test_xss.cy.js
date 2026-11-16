describe('Test de sécurité XSS', () => {

  it('Vérifie qu’un script ne s’exécute pas dans un commentaire', () => {

    // Se connecter
    cy.visit('http://localhost:4200/#/login');

    cy.get('[data-cy="login-input-username"]')
      .type('test2@test.fr');

    cy.get('[data-cy="login-input-password"]')
      .type('testtest');

    cy.get('[data-cy="login-submit"]').click();

    // Vérifier que la connexion est réussie
    cy.get('[data-cy="nav-link-cart"]').should('be.visible');

    // Accéder aux avis
    cy.get('[data-cy="nav-link-reviews"]').click();

    // Vérifier l'affichage du formulaire
    cy.get('[data-cy="review-input-title"]').should('be.visible');

    // Surveiller les alertes JavaScript
    cy.on('window:alert', cy.stub().as('xssAlert'));

    // Remplir le formulaire
    cy.get('[data-cy="review-input-title"]')
      .type('Test XSS Cypress');

    cy.get('[data-cy="review-input-comment"]')
      .type("<script>alert('XSS')</script>");

    // Sélectionner 3 étoiles
    cy.get('[data-cy="review-input-rating-images"] img')
      .eq(2).click();

    // Publier
    cy.get('[data-cy="review-submit"]').click();

    // Vérifier qu'aucune alerte ne s'est déclenchée
    cy.get('@xssAlert').should('not.have.been.called');

  });

});