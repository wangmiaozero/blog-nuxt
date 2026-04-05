# blog-nuxt

## 🎃 Hallo, Fremder!

Glückwunsch — du bist auf ein verstecktes Juwel gestoßen: einem Ort, an dem du eine Website ganz für dich beanspruchen kannst.

Artikel schreiben, Notizen machen, Gedanken teilen und deine Bio gestalten — alles ist da und schenkt dir eine kleine Ecke des digitalen Himmels nur für dich. 🌞

So etwas nennen viele „Blog“, aber ich gebe meiner Seite einen eigenen Namen: `Mood Town`. Für mich ist es eher ein kleines Dorf — ein Gefäß für Stimmungen, Gedanken, Erfahrungen und kreatives Tun. Jeder Artikel ist ein Haus, jede Seite eine Ecke, jedes Feature eine Einrichtung. Ich habe dieses Dorf mit Herz gebaut und pflege es sorgfältig. Ich hoffe, es wird warm, gemütlich und einladend — ein Ort zum Verweilen, Vernetzen und Teilen.

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> |
  <a href="./README.md">English</a> |
  <a href="./README_ko.md">한국어</a> |
  <a href="./README_fr.md">Français</a> |
  <strong>Deutsch</strong> |
  <a href="./README_ja.md">日本語</a> |
  <a href="./README_zh-TW.md">繁體中文</a> |
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

Ein Nuxt-4-Personalblog-Frontend mit Artikelseiten, Archiv, Über-mich, Briefen, Regentages-Seite, Abo-Formular, Dark Mode, lokalen Medien und einer Mock-first-API-Schicht, die sich mit wenig Reibung durch ein echtes Backend ersetzen lässt.

Wenn das Projekt hilft, gib einen Star — das erleichtert das Finden und hält die Arbeit am Leben.

## Projektüberblick

Dieses Repo ist eine frontend-orientierte Blog-Vorlage und Referenzimplementierung. Schwerpunkte:

- inhaltsstarke persönliche Site mit eigenem Look
- Mock-first-Entwicklung, dann Backend-Übergabe
- Nuxt-SSR-freundliches Datenladen
- Artikel, Kommentare, Musik, Abo und Themenseiten
- Desktop- und mobilfreundliche Layouts

Aktuelle Routen:

- `/` Startseite
- `/article` Archiv
- `/[articleId]` Artikeldetail
- `/about` Über
- `/envelope` Briefe
- `/rain` Regentag
- `/subscribe` Abo

## Highlights

- Architektur Nuxt 4 + Vue 3 + Pinia
- Dark Mode für die ganze Seite
- Artikelliste, Detail, Suche, Filter, „Mehr laden“
- Markdown mit Syntaxhervorhebung und eingebetteten Medien
- Kommentarliste und -absendung
- Lokale Bilder, Logo, Avatar, mp3
- Mock-API-Vertrag für Backend-Austausch
- SSR-Bootstrap der Site-Infos für Titel und Meta

## Screenshots

### Startseite

![Home](./docs/screenshots/index.jpg)

### Startseite dunkel

![Home Dark](./docs/screenshots/index-dark.jpg)

### Variante 1

![Home Variant 1](./docs/screenshots/index-1.jpg)

### Variante 2

![Home Variant 2](./docs/screenshots/index-2.jpg)

### Variante 3

![Home Variant 3](./docs/screenshots/index-3.jpg)

### Variante 4

![Home Variant 4](./docs/screenshots/index-4.jpg)

### Variante 5

![Home Variant 5](./docs/screenshots/index-5.jpg)

### Archiv

![Archive](./docs/screenshots/article.jpg)

### Archiv dunkel

![Archive Dark](./docs/screenshots/article-dark.jpg)

### Artikeldetail

![Article Detail](./docs/screenshots/articleInfo.jpg)

### Artikeldetail dunkel

![Article Detail Dark](./docs/screenshots/articleInfo-dark.jpg)

### Über

![About](./docs/screenshots/about.jpg)

### Über dunkel

![About Dark](./docs/screenshots/about-dark.jpg)

### Regen

![Rain](./docs/screenshots/rain.jpg)

### Abo

![Subscribe](./docs/screenshots/subscribe.jpg)

## Tech-Stack

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

## Projektstruktur

```text
blog-nuxt
├── assets/              # Globale Styles, Schriften, Theme-Variablen
├── components/          # Gemeinsame UI: Header, Footer, Comment, ArticleContent
├── composables/         # API-Wrapper und HTTP-Client
├── config/              # App-Konstanten und Konfig-Helfer
├── docs/                # API-Docs, Screenshots, Übergabeunterlagen
├── layouts/             # Nuxt-Layouts
├── mixin/               # Legacy-Mixins, noch von Seiten genutzt
├── mock/                # Lokale Mock-Daten und Handler
├── pages/               # Nuxt-Routen
├── plugins/             # Bootstrap und Laufzeitverhalten
├── public/              # Öffentliche Assets, Bilder, Audio, Logos
├── server/              # Server-Erweiterungen bei Bedarf
├── stores/              # Pinia-Stores
├── types/               # Gemeinsame API- und App-Typen
└── utils/               # Asset-/Bild-Helfer, Utilities
```

## Lokale Entwicklung

### Installation

```bash
npm install
```

### Dev-Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Produktions-Build ansehen

```bash
npm run preview
```

## Umgebungsvariablen

`.env.example` nach `.env` kopieren und anpassen:

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

Bedeutung:

- `NUXT_PUBLIC_USE_MOCK=true`: lokale Mock-Handler in `mock/index.ts`
- `NUXT_PUBLIC_USE_MOCK=false`: echtes Backend
- `NUXT_PUBLIC_API_BASE_URL`: nur Backend-Host, ohne `/api/v1`

## Backend-Integration

Das Projekt ist für die Übergabe vorbereitet. Empfohlener Ablauf:

1. API aus [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) oder [`docs/api.md`](./docs/api.md) umsetzen.
2. Pfade und Feldnamen exakt gleich lassen.
3. Standard-Hülle `{ code, message, data }` zurückgeben.
4. Bei Listen immer `pagination.total` mitsenden.
5. Wenn das Backend steht: `NUXT_PUBLIC_USE_MOCK=false`.
6. `NUXT_PUBLIC_API_BASE_URL` auf den Backend-Host setzen.

Wichtige Hinweise:

- `composables/http.ts` setzt `baseUrl + path` zusammen — `NUXT_PUBLIC_API_BASE_URL` sollte wie `http://localhost:7001` aussehen.
- Für keine Frontend-Änderungen: Geschäftsfehler gern als HTTP `200` mit JSON `code` und `message`.
- Kommentar-Avatare als lokale Dateinamen wie `3.jpg`, aufgelöst nach `/image/comment/3.jpg`.
- Artikeldetail rendert vor allem `mdcontent`.

## API-Dokumente

- Chinesischer Vertrag: [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- Englischer Vertrag: [`docs/api.md`](./docs/api.md)

## Mock-Schicht

Die Mock-Schicht ist kein reines Demo-Extra — sie ist die aktuelle Vertragsquelle für das echte Backend:

- Handler: [`mock/index.ts`](./mock/index.ts)
- typisierter API-Wrapper: [`composables/api.ts`](./composables/api.ts)
- Antworttypen: [`types/api.ts`](./types/api.ts)

Hält sich das Backend daran, lässt sich der Mock-Modus sauber abschalten.

## Lizenz, Nutzung und Haftungsausschluss

Veröffentlicht unter der MIT-Lizenz — siehe [`LICENSE`](./LICENSE).

- Vor allem für Lernen, Forschung und technische Referenz.
- Keine Nutzung für illegale, rechtswidrige, betrügerische oder schädliche Zwecke.
- Vor öffentlichem oder kommerziellem Einsatz persönliche Inhalte, Impressum/Angaben, Branding und Medien durch eigenes konformes Material ersetzen.
- Software „wie besehen“, ohne Gewähr. Compliance, Betrieb und Datenschutz liegen bei dir.
