describe('Tests API Produits', () => {

  it('Vérifie la récupération de la fiche d’un produit', () => {

    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/products/7'
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body).to.exist;

    });

  });

});