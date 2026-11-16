# OpenClassrooms - Eco-Bliss-Bath

<div align="center">

<p align="center">
  <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
  <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
  <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
  <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
</p>

</div>

# Prérequis

Pour démarrer cet applicatif web, vous devez avoir les outils suivants :

- Docker
- Node.js
- npm
- Git

# Installation et démarrage

Clonez le projet pour le récupérer :

```bash
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2
```

Pour démarrer l'API avec sa base de données :

```bash
docker compose up -d
```

Pour vérifier que les conteneurs sont démarrés :

```bash
docker compose ps
```

L'API est accessible à l'adresse :

`http://localhost:8081`

La documentation Swagger est accessible à l'adresse :

`http://localhost:8081/api/doc/`

# Pour démarrer le frontend de l'applicatif

Rendez-vous dans le dossier frontend :

```bash
cd ./frontend
```

Installez les dépendances du projet :

```bash
npm i
```

ou

```bash
npm install
```

Démarrez le frontend avec le script prévu dans le projet :

```bash
npm start
```

L'application est accessible à l'adresse :

`http://localhost:4200/`

# Tests automatisés avec Cypress

## Prérequis

Les tests automatisés utilisent Cypress.

Depuis le dossier frontend, vérifiez que Cypress est disponible :

```bash
npx cypress --version
```

## Lancement de Cypress

Pour ouvrir l'interface graphique Cypress :

```bash
npx cypress open
```

Sélectionnez **E2E Testing**, puis le navigateur souhaité et le fichier de test à exécuter.

Pour lancer les tests en mode terminal :

```bash
npx cypress run
```

Pour exécuter un fichier de test précis :

```bash
npx cypress run --spec "cypress/e2e/test_connexion.cy.js"
```

## Tests réalisés

Les scripts couvrent les vérifications suivantes :

| Fichier de test | Fonctionnalité vérifiée |
|---|---|
| `test_connexion.cy.js` | Connexion utilisateur |
| `test_affichage_produits.cy.js` | Affichage des produits |
| `test_parcours_panier.cy.js` | Parcours du panier |
| `test_smoke.cy.js` | Tests Smoke |
| `test_xss.cy.js` | Premier contrôle XSS |
| `test_api_login.cy.js` | Authentification API |
| `test_api_panier.cy.js` | Opérations sur le panier via API |
| `test_api_produits.cy.js` | Consultation des produits via API |
| `test_api_avis.cy.js` | Création d'un avis via API |

# Génération du rapport d'exécution

Pour lancer l'ensemble des tests et conserver les résultats dans un fichier texte :

```bash
npx cypress run --reporter spec > rapport-cypress.txt 2>&1
```

Le fichier `rapport-cypress.txt` est créé dans le dossier depuis lequel la commande est exécutée.

Il contient les résultats de l'exécution : tests réussis, tests échoués et éventuels messages d'erreur.

Les captures d'écran et vidéos produites par Cypress sont enregistrées dans les dossiers de résultats configurés dans le projet, notamment `cypress/screenshots` et `cypress/videos` lorsqu'ils sont activés.

# Anomalies détectées pendant la campagne

Les tests ont permis d'identifier plusieurs écarts :

- **Gestion du stock :** l'ajout au panier d'un produit avec un stock nul ou négatif est accepté.
- **Quantité maximale :** une quantité supérieure à 20 est acceptée. Ce point est à confirmer par rapport à la règle fonctionnelle attendue.
- **Disponibilité :** aucune information de disponibilité du produit n'est affichée dans le panier.
- **Authentification API :** une réponse HTTP 401 est obtenue lors d'un accès non authentifié au panier, alors que le document de test indique 403 comme résultat attendu. Le contrat API doit être confirmé.

Les anomalies doivent être reproduites, documentées et transmises à l'équipe de développement pour correction.

# Publication du projet sur GitHub

Le dépôt contenant les scripts de tests doit être public afin que le mentor puisse consulter le travail réalisé.

Pour publier les modifications du README et les scripts :

```bash
git add .
git commit -m "Ajout des tests automatisés Cypress et documentation"
git push
```

Vérifiez ensuite sur GitHub que :

- Le dépôt est bien public.
- Les scripts Cypress sont présents.
- Le fichier `README.md` est visible à la racine du dépôt.
- Les commandes d'installation et d'exécution sont documentées.

**Attention :** ne publiez pas de mots de passe, de jetons d'authentification ou de données personnelles dans le dépôt.