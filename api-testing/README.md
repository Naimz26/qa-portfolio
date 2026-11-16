# Tests API avec Postman — projet à réaliser

> **Statut : à réaliser.** Ce dossier décrit le projet prévu. Aucun test API n'a encore été écrit ni exécuté ; aucun résultat n'est donc présenté.

## Objectif

Tester une API REST publique de démonstration et montrer une démarche de test API complète : vérification des codes de réponse, du contenu, des cas d'erreur et des enchaînements de requêtes, avec exécution automatique en intégration continue.

## API cible envisagée

Une API publique conçue pour l'apprentissage et les démonstrations (par exemple une API de type « Restful Booker » ou « JSONPlaceholder »). Le choix sera fait au démarrage du projet, en vérifiant ses conditions d'utilisation.

## Scénarios prévus

| ID | Scénario | Vérifications |
|---|---|---|
| API-01 | Lire une ressource existante | Code 200, schéma de la réponse, valeurs attendues |
| API-02 | Lire une ressource inexistante | Code 404, message d'erreur |
| API-03 | Créer une ressource valide | Code 201 (ou 200), identifiant retourné, données enregistrées |
| API-04 | Créer une ressource invalide (champ obligatoire manquant) | Code 400, message explicite |
| API-05 | Modifier sans authentification | Code 401 / 403 |
| API-06 | Enchaîner création → lecture → suppression | Variables de collection, cohérence des données |
| API-07 | Temps de réponse | Seuil indicatif, sans en faire un test de performance |

## Structure prévue

```
api-testing/
├── README.md                     # ce document, puis résultats réels
├── collection.postman_collection.json
├── environment.postman_environment.json   # sans aucun secret
└── reports/                      # rapports Newman (générés, non versionnés)
```

## Exécution prévue

- Postman pour la conception et l'exécution manuelle.
- Newman (`npx newman run ...`) pour l'exécution en ligne de commande.
- Un job GitHub Actions dédié, ajouté uniquement lorsque la collection existera.

## Ce qui sera publié

Les résultats réellement obtenus (nombre de requêtes, d'assertions réussies et échouées), avec le rapport d'exécution. Rien ne sera présenté tant que les tests n'auront pas été exécutés.
