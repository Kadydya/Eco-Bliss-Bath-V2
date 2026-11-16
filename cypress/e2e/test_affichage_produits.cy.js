describe('Affichage des produits', () => {

  it('Vérifie les informations des produits', () => {

    // Accéder à l'accueil
    cy.visit('http://localhost:4200/');

    // Accéder à la liste des produits
    cy.contains('Voir les produits').click();

    // Vérifier le nom, l'image et le prix
    cy.get('[data-cy="product-name"]').should('be.visible');
    cy.get('[data-cy="product-picture"]').should('be.visible');
    cy.get('[data-cy="product-price"]').should('be.visible');

    // Consulter le premier produit
    cy.get('[data-cy="product-link"]').first().click();

    // Vérifier le stock sur la fiche produit
    cy.get('[data-cy="detail-product-stock"]').should('be.visible');

  });

});