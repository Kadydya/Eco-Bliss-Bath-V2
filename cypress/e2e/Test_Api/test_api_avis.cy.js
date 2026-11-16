describe('Tests API Avis', () => {

  it('Vérifie l’ajout d’un avis', () => {

    // Se connecter
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: 'test2@test.fr',
        password: 'testtest'
      }
    }).then((loginResponse) => {

      const token = loginResponse.body.token;

      // Ajouter un avis
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/reviews',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          title: 'Avis de test Cypress',
          comment: 'Test automatisé de création d’un avis.',
          rating: 5
        }
      }).then((response) => {

        expect(response.status).to.eq(200);

      });

    });

  });

});