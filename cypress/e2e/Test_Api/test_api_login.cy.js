describe('Tests API Login', () => {

  it('Vérifie le refus de connexion pour un utilisateur inconnu', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: 'inconnu@test.fr',
        password: 'mauvaismotdepasse'
      },
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(401);

    });

  });

});
it('Vérifie la connexion avec un utilisateur connu', () => {

  cy.request({
    method: 'POST',
    url: 'http://localhost:8081/login',
    body: {
      username: 'test2@test.fr',
      password: 'testtest'
    }
  }).then((response) => {

    expect(response.status).to.eq(200);
    expect(response.body.token).to.exist;

  });

});