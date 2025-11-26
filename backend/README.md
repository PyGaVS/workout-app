# 🏋️‍♂️ Backend - AppMuscu

Backend de l’application **WorkoutApp**, développé avec [AdonisJS](https://adonisjs.com/) et TypeScript.


## 🚀 Technologies utilisées

- **AdonisJS v6** (framework Node.js)
- **TypeScript**
- **Lucid ORM** (relations entre modèles)
- **VineJS** (validation des données)
- **Bouncer** (policies et autorisations)
- **PostgreSQL**


## 📂 Structure principale

```
backend/ 
├── app/ 
│ ├── commons/
│ │ └── models/ 
│ │ └── ... 
│ ├── domains/ 
│ │ └── workout/ 
│ │ │ ├── controllers/ 
│ │ │ │ └── workouts_controller.ts
│ │ │ ├── policies/
│ │ │ ├── services/ 
│ │ │ ├── validators/ 
│ │ │ ├── router.ts  
│ │ └── exercise/ 
│ │ └── .../ 
│ └── policies/ 
│ └── WorkoutPolicy.ts 
├── config/ 
├── database/ 
│ └── migrations/
│ └── seeders/
│ └── ... 
└── README.md
```


## 📌 Fonctionnalités

- Création d’un **workout** avec ou sans blocs
- Ajout de **exercise blocs** liés à un workout
- Ajout de **sets** liés à un bloc
- Validation stricte des données avec VineJS
- Autorisation via Permissions



## 🛠️ Installation


#### Installer les dépendances
`npm install | pnpm i`

#### Créer le fichier .env
`cp .env.example .env`
`node ace generate:key`
`APP_KEY=generated_key`

#### Lancer les migrations et seeders
`node ace db:refresh`

#### Démarrer le serveur
`node ace serve --watch | pnpm run dev`


## 📑 Exemple de requête API

`GET` /exercises

**Content-Type**: application/json

**Authorization** : Bearer {{token}}
```JSON
{
  "meta": {
    "total": 2,
    "perPage": 5,
    "currentPage": 1,
    "lastPage": 1,
    "firstPage": 1,
    "firstPageUrl": "/?page=1",
    "lastPageUrl": "/?page=1",
    "nextPageUrl": null,
    "previousPageUrl": null
  },
  "data": [
    {
      "id": 1,
      "name": "Développé couché",
      "normalizedName": "developpe couche",
      "type": "polyarticulaire",
      "createdAt": "2025-11-21T13:38:37.553+00:00",
      "updatedAt": "2025-11-21T13:38:37.553+00:00"
    },
    {
      "id": 9,
      "name": "Développé militaire",
      "normalizedName": "developpe militaire",
      "type": "polyarticulaire",
      "createdAt": "2025-11-21T13:38:37.659+00:00",
      "updatedAt": "2025-11-21T13:38:37.659+00:00"
    }
  ]
}
```
---

`POST` /workouts

**Content-Type**: application/json

**Authorization** : Bearer {{token}}

```JSON
{
  "date": "2022-12-12 10:10:10"
}
```

## 🔒 Sécurité
Authentification via `auth.user`

Autorisation des actions avec Policies

Validation stricte des payloads avec `VineJS`

## 📌 À venir
Gestion des users et profils

Ajout de statistiques (volume total, PR tracking)

Tests unitaires et d’intégration

## 👨‍💻 Auteur
Développé par Alexandre et Lylian
