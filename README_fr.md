# blog-nuxt

## 🎃 Bonjour, étranger·ère !

Félicitations — vous venez de tomber sur une petite perle : un endroit où vous pouvez revendiquer un site entièrement à vous.

Rédiger des articles, prendre des notes, partager des pensées ou votre bio — tout est là, pour un coin de ciel numérique qui ne vous appartient qu’à vous. 🌞

On appelle souvent cela un « blog », mais je préfère donner un nom à mon site : `Mood Town`. Pour moi, c’est plutôt une petite ville — un réceptacle pour humeurs, idées, expériences et créations. Chaque article est une maison ; chaque page, un recoin ; chaque fonctionnalité, un équipement. J’ai bâti cette ville avec le cœur et je la soigne avec attention. J’espère qu’elle sera chaleureuse, confortable et vivante — un lieu où l’on aime s’attarder, échanger et partager.

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> |
  <a href="./README.md">English</a> |
  <a href="./README_ko.md">한국어</a> |
  <strong>Français</strong> |
  <a href="./README_de.md">Deutsch</a> |
  <a href="./README_ja.md">日本語</a> |
  <a href="./README_ru.md">Русский</a> |
  <a href="./README_es.md">Español</a> |
  <a href="./README_pt.md">Português</a> |
  <a href="./README_it.md">Italiano</a> |
  <a href="./README_vi.md">Tiếng Việt</a> |
  <a href="./README_ar.md">العربية</a>
</p>

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3-F7C545?logo=pinia&logoColor=333)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Mock Ready](https://img.shields.io/badge/API-Mock%20Ready-0F172A)

Frontend de blog personnel Nuxt 4 avec pages d’articles, archive, à propos, lettres, page « jour de pluie », formulaire d’abonnement, mode sombre, médias locaux et une couche API mock-first remplaçable par un vrai backend avec peu de friction.

Si ce projet vous aide, une étoile aide à le faire connaître et à poursuivre le travail.

## Aperçu du projet

Ce dépôt est un modèle de site blog orienté frontend et une implémentation de référence. Il met l’accent sur :

- une expérience de site personnel riche en contenu et visuels sur mesure
- le développement mock-first, puis la passation backend
- le chargement de données compatible SSR Nuxt
- lecture d’articles, commentaires, musique, abonnement et pages à thème
- mises en page adaptées bureau et mobile

Routes actuelles :

- `/` accueil
- `/article` archive
- `/[articleId]` détail d’article
- `/about` à propos
- `/envelope` lettres
- `/rain` jour de pluie
- `/subscribe` abonnement

## Points forts

- Architecture Nuxt 4 + Vue 3 + Pinia
- Mode sombre sur toute la page
- Liste d’articles, détail, recherche, filtres, chargement « plus »
- Rendu Markdown avec coloration syntaxique et médias intégrés
- Liste et soumission de commentaires
- Images locales, logo, avatar et mp3
- Contrat API mock pensé pour le remplacement backend
- Bootstrap des infos du site en SSR pour titre et meta

## Captures d’écran

### Accueil

![Home](./docs/screenshots/index.jpg)

### Accueil sombre

![Home Dark](./docs/screenshots/index-dark.jpg)

### Variante accueil 1

![Home Variant 1](./docs/screenshots/index-1.jpg)

### Variante accueil 2

![Home Variant 2](./docs/screenshots/index-2.jpg)

### Variante accueil 3

![Home Variant 3](./docs/screenshots/index-3.jpg)

### Variante accueil 4

![Home Variant 4](./docs/screenshots/index-4.jpg)

### Variante accueil 5

![Home Variant 5](./docs/screenshots/index-5.jpg)

### Archive

![Archive](./docs/screenshots/article.jpg)

### Archive sombre

![Archive Dark](./docs/screenshots/article-dark.jpg)

### Détail article

![Article Detail](./docs/screenshots/articleInfo.jpg)

### Détail article sombre

![Article Detail Dark](./docs/screenshots/articleInfo-dark.jpg)

### À propos

![About](./docs/screenshots/about.jpg)

### À propos sombre

![About Dark](./docs/screenshots/about-dark.jpg)

### Pluie

![Rain](./docs/screenshots/rain.jpg)

### Abonnement

![Subscribe](./docs/screenshots/subscribe.jpg)

## Stack technique

- Nuxt 4
- Vue 3
- Pinia
- TypeScript
- SCSS
- `@nuxtjs/color-mode`
- `marked`
- `highlight.js`
- `viewerjs`
- `parallax-js`

## Structure du projet

```text
blog-nuxt
├── assets/              # Styles globaux, polices, variables de thème
├── components/          # UI partagée : Header, Footer, Comment, ArticleContent
├── composables/         # Wrappers API et client HTTP
├── config/              # Constantes et helpers de configuration
├── docs/                # Docs API, captures, matériel de passation
├── layouts/             # Layouts Nuxt
├── mixin/               # Mixins hérités encore utilisés
├── mock/                # Données mock locales et handlers
├── pages/               # Pages de routes Nuxt
├── plugins/             # Bootstrap et comportement runtime
├── public/              # Assets statiques publics, images, audio, logos
├── server/              # Extensions serveur si besoin
├── stores/              # Stores Pinia
├── types/               # Types API et applicatifs partagés
└── utils/               # Helpers assets, images, utilitaires
```

## Développement local

### Installation

```bash
npm install
```

### Serveur de dev

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Prévisualiser le build de prod

```bash
npm run preview
```

## Variables d’environnement

Copiez `.env.example` vers `.env` et adaptez :

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

Signification :

- `NUXT_PUBLIC_USE_MOCK=true` : handlers mock locaux dans `mock/index.ts`
- `NUXT_PUBLIC_USE_MOCK=false` : appeler le vrai backend
- `NUXT_PUBLIC_API_BASE_URL` : hôte backend uniquement, sans `/api/v1`

## Intégration backend

Le projet est déjà structuré pour la passation. Processus recommandé :

1. Implémenter l’API décrite dans [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) ou [`docs/api.md`](./docs/api.md).
2. Conserver chemins et noms de champs identiques.
3. Retourner l’enveloppe `{ code, message, data }`.
4. Toujours inclure `pagination.total` sur les listes.
5. Quand le backend est prêt : `NUXT_PUBLIC_USE_MOCK=false`.
6. Pointer `NUXT_PUBLIC_API_BASE_URL` vers l’hôte backend.

Notes importantes :

- `composables/http.ts` concatène `baseUrl + path` — `NUXT_PUBLIC_API_BASE_URL` doit ressembler à `http://localhost:7001`.
- Pour éviter les changements frontend, les erreurs métier peuvent être renvoyées en HTTP `200` avec `code` et `message` JSON.
- Les avatars de commentaire sont attendus comme noms de fichiers locaux (`3.jpg` → `/image/comment/3.jpg`).
- La page détail rend surtout `mdcontent`.

## Documents API

- Contrat chinois : [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- Contrat anglais : [`docs/api.md`](./docs/api.md)

## Couche Mock

Le mock n’est pas un bonus démo : c’est la source de contrat actuelle pour le backend réel :

- handlers : [`mock/index.ts`](./mock/index.ts)
- wrapper typé : [`composables/api.ts`](./composables/api.ts)
- types de réponse : [`types/api.ts`](./types/api.ts)

Si le backend respecte ces contrats, le frontend peut désactiver le mock proprement.

## Licence, usage et avertissement

Publié sous licence MIT — voir [`LICENSE`](./LICENSE).

- Partagé surtout pour l’apprentissage, la recherche et la référence technique.
- N’utilisez pas ce projet pour des activités illégales, frauduleuses, invasives ou nuisibles.
- Avant déploiement public ou commercial, remplacez contenus personnels, mentions légales, marque, médias et ressources tierces par du matériel conforme.
- Logiciel fourni « tel quel », sans garantie. Vous êtes responsable de la conformité, de l’exploitation et de la protection des données.
