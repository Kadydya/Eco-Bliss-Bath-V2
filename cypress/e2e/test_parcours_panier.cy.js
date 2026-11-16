
describe('Parcours fonctionnel du panier', () => {

  const seConnecter = () => {
    cy.visit('http://localhost:4200/#/login');
    cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
    cy.get('[data-cy="login-input-password"]').type('testtest');
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="nav-link-cart"]').should('be.visible');
  };

  // TEST 1 : PRODUIT NON DISPONIBLE
  it('NON OK - Tenter d’ajouter un produit en rupture de stock', () => {
    seConnecter();
    cy.visit('http://localhost:4200/#/products/3');

    cy.get('[data-cy="detail-product-stock"]').should('be.visible');
    cy.get('[data-cy="detail-product-quantity"]').clear().type('1');
    cy.get('[data-cy="detail-product-add"]').click();
    

    cy.get('[data-cy="nav-link-cart"]').click();
    cy.get('[data-cy="cart-line-name"]').should('be.visible');
  });

  // TEST 2 : PRODUIT DISPONIBLE
  it('OK - Ajouter Poussière de lune au panier', () => {
    seConnecter();
    cy.visit('http://localhost:4200/#/products/5');

    cy.get('[data-cy="detail-product-stock"]').should('be.visible');
    cy.get('[data-cy="detail-product-quantity"]').clear().type('1');
    cy.get('[data-cy="detail-product-add"]').click();

    cy.get('[data-cy="nav-link-cart"]').click();
    cy.get('[data-cy="cart-line-name"]').should('contain', 'Poussière de lune');
  });

  // TEST 3 : QUANTITÉ NÉGATIVE
  it('Vérifier les quantités négatives dans le panier', () => {
    seConnecter();
    cy.get('[data-cy="nav-link-cart"]').click();

    cy.get('[data-cy="cart-line-quantity"]').first()
      .clear()
      .type('-1');

    cy.get('[data-cy="cart-line-quantity"]').first()
      .should(($input) => {
        expect(Number($input.val())).to.be.greaterThan(0);
      });
  });

  // TEST 4 : MODIFIER LA QUANTITÉ
  it('Modifier la quantité d’un produit dans le panier', () => {
    seConnecter();
    cy.get('[data-cy="nav-link-cart"]').click();

    cy.get('[data-cy="cart-line-quantity"]').first()
      .then(($input) => {
        const ancienneQuantite = Number($input.val());
        const nouvelleQuantite = ancienneQuantite + 1;

        cy.wrap($input).clear().type(String(nouvelleQuantite));

        cy.get('[data-cy="cart-line-quantity"]').first()
          .should('have.value', String(nouvelleQuantite));
      });
  });

  

// TEST 5 : QUANTITÉ SUPÉRIEURE À 20
it('Vérifier une quantité supérieure à 20', () => {
  seConnecter();
  cy.get('[data-cy="nav-link-cart"]').click();

  cy.get('[data-cy="cart-line-quantity"]').first()
    .invoke('val', '21')
    .trigger('input')
    .trigger('change');

  cy.get('[data-cy="cart-line-quantity"]').first()
    .should('have.value', '21');


});
});
