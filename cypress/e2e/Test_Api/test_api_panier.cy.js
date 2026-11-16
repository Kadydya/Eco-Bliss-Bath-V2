describe('Tests API Eco-Bliss-Bath', () => {

  it('Vérifie que le panier est inaccessible sans connexion', () => {

    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(401);

    });

  });

});

it('Vérifie la récupération du panier après connexion', () => {

  // Connexion à l'API
  cy.request({
    method: 'POST',
    url: 'http://localhost:8081/login',
    body: {
      username: 'test2@test.fr',
      password: 'testtest'
    }
  }).then((loginResponse) => {

    expect(loginResponse.status).to.eq(200);

    const token = loginResponse.body.token;

    // Récupération du panier
    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body).to.exist;

    });

  });

});
it('Vérifie l’ajout d’un produit disponible au panier', () => {

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

    // Ajouter le produit ID 7
    cy.request({
      method: 'PUT',
      url: 'http://localhost:8081/orders/add',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        product: 7,
        quantity: 1
      }
    }).then((response) => {

      expect(response.status).to.eq(200);

    });

  });

});
it('Vérifie l’ajout d’un produit en rupture de stock', () => {

  cy.request({
    method: 'POST',
    url: 'http://localhost:8081/login',
    body: {
      username: 'test2@test.fr',
      password: 'testtest'
    }
  }).then((loginResponse) => {

    const token = loginResponse.body.token;

    cy.request({
      method: 'PUT',
      url: 'http://localhost:8081/orders/add',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        product: 4,
        quantity: 1
      },
      failOnStatusCode: false
    }).then((response) => {

      // Fabio a constaté que l'API acceptait cet ajout
      expect(response.status).to.eq(200);

    });

  });

});