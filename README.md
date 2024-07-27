# InstaPlanner

InstaPlanner est un outil conçu pour planifier les posts Instagram, visant à simplifier et optimiser la gestion de votre présence sur Instagram. Que vous soyez une entreprise cherchant à maximiser votre portée ou un utilisateur individuel souhaitant partager du contenu régulièrement et stratégiquement, InstaPlanner vous offre une solution complète et intuitive.

## Prérequis

Avant de commencer, assurez-vous d'avoir les prérequis suivants :

- **Node.js** et **npm** : Assurez-vous que Node.js et npm sont installés. Vous pouvez les télécharger depuis [nodejs.org](https://nodejs.org/).
- **MariaDB** : Assurez-vous que MariaDB est installé et en cours d'exécution sur votre machine.

## Installation

Pour configurer le projet, suivez ces étapes :

1. **Cloner le dépôt :**

   ```sh
   git clone git@github.com:Mathox75/InstaPlanner.git
   cd insta-planner
    ```

2. **Installer les dépendances frontend :**

    ```sh
    npm install
    ```
3. **Installer les dépendances backend : :**

    ```sh
    cd backend
    npm install
    ```

4. **Lancer le projet :**

Frontend

    ```sh
    npm run dev
    ```
Le serveur frontend sera accessible à l'adresse http://localhost:3000

Backend

    ```sh
    cd backend
    npm run dev
    ```
Le serveur backend sera accessible à l'adresse http://localhost:3001

## Structure des Dossiers

Voici une vue d'ensemble de la structure des dossiers du projet :

```
insta-planner/
├── backend/
│   ├── dist/
│   ├── node_modules/
│   ├── src/
│   │   ├── types/
│   │   │   └── env.d.ts
│   │   ├── server.ts
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   ├── components/
│   │   └── navbar.tsx
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
├── README.md

```

## Variables d'Environnement

Créez un fichier .env dans le répertoire backend et ajoutez les variables d'environnement nécessaires :
    
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_DATABASE=instaplanner
    JWT_SECRET=your_jwt_secret


## Commandes Utiles

npm run dev : Lance le serveur de développement.
npm run build : Compile le projet pour la production.
npm start : Démarre le serveur en mode production.
npm install : Installe les dépendances du projet.




