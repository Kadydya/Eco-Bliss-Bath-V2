describe('Tests Eco-Bliss-Bath', () => {

  it('Vérifie que la page d’accueil s’affiche', () => {
    cy.visit('http://localhost:4200/');
    cy.get('body').should('be.visible');
  });

  

});