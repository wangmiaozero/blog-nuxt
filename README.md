# blog-nuxt

## 🎃 Hello there, stranger!

Congratulations—you’ve stumbled upon a hidden gem: a place where you can claim a website entirely of your own.

From writing articles and taking notes to sharing personal musings and crafting your bio—everything you need is right here, offering you a little corner of the digital sky that belongs solely to you. 🌞

People often refer to this sort of thing as a "blog," but I prefer to give my website a name of its own: `Mood Town`. To me, it feels much more like a small town—a place that serves as a vessel for my moods, thoughts, experiences, and creative endeavors. Each article is a house within this town; every page is a distinct corner; and every feature serves as one of its amenities. I built this town with my heart and tend to it with care. My hope is that it becomes a warm, cozy, and engaging place—somewhere people are happy to linger, to connect, and to share.

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> |
  <strong>English</strong> |
  <a href="./README_ko.md">한국어</a> |
  <a href="./README_fr.md">Français</a> |
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

A Nuxt 4 personal blog frontend with article pages, archive, about page, letters, rainy-day page, subscription form, dark mode, local media assets, and a mock-first API layer that can be replaced by a real backend with minimal friction.

If this project helps you, please give it a Star. It makes the project easier to discover and helps keep the work alive.

## Project Overview

This repo is a frontend-oriented blog site template and reference implementation. It focuses on:

- a content-heavy personal site experience with custom visuals
- mock-first development, then backend handoff
- Nuxt SSR-friendly data loading
- article reading, comments, music, subscription, and themed pages
- desktop and mobile friendly layouts

Current route coverage:

- `/` home page
- `/article` archive page
- `/[articleId]` article detail page
- `/about` about page
- `/envelope` letter page
- `/rain` rainy-day page
- `/subscribe` subscription page

## Highlights

- Nuxt 4 + Vue 3 + Pinia architecture
- Full-page dark mode support
- Article list, detail, search, filter, and load-more flows
- Markdown article rendering with syntax highlight and media embedding
- Comment list and comment submission flow
- Local image, logo, avatar, and mp3 asset support
- Mock API contract designed for backend replacement
- SSR site info bootstrap for title and meta content

## Screenshots

### Home

![Home](./docs/screenshots/index.jpg)

### Home Dark

![Home Dark](./docs/screenshots/index-dark.jpg)

### Home Variant 1

![Home Variant 1](./docs/screenshots/index-1.jpg)

### Home Variant 2

![Home Variant 2](./docs/screenshots/index-2.jpg)

### Home Variant 3

![Home Variant 3](./docs/screenshots/index-3.jpg)

### Home Variant 4

![Home Variant 4](./docs/screenshots/index-4.jpg)

### Home Variant 5

![Home Variant 5](./docs/screenshots/index-5.jpg)

### Archive

![Archive](./docs/screenshots/article.jpg)

### Archive Dark

![Archive Dark](./docs/screenshots/article-dark.jpg)

### Article Detail

![Article Detail](./docs/screenshots/articleInfo.jpg)

### Article Detail Dark

![Article Detail Dark](./docs/screenshots/articleInfo-dark.jpg)

### About

![About](./docs/screenshots/about.jpg)

### About Dark

![About Dark](./docs/screenshots/about-dark.jpg)

### Rain

![Rain](./docs/screenshots/rain.jpg)

### Subscribe

![Subscribe](./docs/screenshots/subscribe.jpg)

## Tech Stack

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

## Project Structure

```text
blog-nuxt
├── assets/              # Global styles, fonts, theme variables
├── components/          # Shared UI pieces such as Header, Footer, Comment, ArticleContent
├── composables/         # API wrappers and HTTP client
├── config/              # App-level constants and config helpers
├── docs/                # API docs, screenshots, handoff materials
├── layouts/             # Nuxt layouts
├── mixin/               # Legacy mixins still used by some pages
├── mock/                # Local mock data source and mock endpoint handlers
├── pages/               # Nuxt route pages
├── plugins/             # App bootstrap and shared runtime behavior
├── public/              # Public static assets, images, audio, logo files
├── server/              # Server-side extensions when needed
├── stores/              # Pinia stores
├── types/               # Shared API and app types
└── utils/               # Asset helpers, image helpers, general utilities
```

## Local Development

### Install

```bash
npm install
```

### Start Dev Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed:

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

Meaning:

- `NUXT_PUBLIC_USE_MOCK=true`: use local mock handlers in `mock/index.ts`
- `NUXT_PUBLIC_USE_MOCK=false`: call the real backend
- `NUXT_PUBLIC_API_BASE_URL`: backend host only, without `/api/v1`

## Backend Integration

This project is already structured for backend handoff. The recommended process is:

1. Implement the API documented in [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) or [`docs/api.md`](./docs/api.md).
2. Keep the request paths and response field names exactly the same.
3. Return the standard envelope `{ code, message, data }`.
4. Always include `pagination.total` on list endpoints.
5. After the backend is ready, set `NUXT_PUBLIC_USE_MOCK=false`.
6. Point `NUXT_PUBLIC_API_BASE_URL` to the backend host.

Important integration notes:

- `composables/http.ts` concatenates `baseUrl + path`, so `NUXT_PUBLIC_API_BASE_URL` must be something like `http://localhost:7001`.
- For zero frontend changes, business errors are best returned as HTTP `200` with JSON `code` and `message`.
- The frontend currently expects comment avatars as local filenames such as `3.jpg`, which it resolves to `/image/comment/3.jpg`.
- The article detail page primarily renders `mdcontent`.

## API Documents

- Chinese contract: [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- English contract: [`docs/api.md`](./docs/api.md)

## Mock Layer

The mock layer is not a demo-only extra. It is the current contract source for the real backend:

- live mock handlers: [`mock/index.ts`](./mock/index.ts)
- typed API wrapper: [`composables/api.ts`](./composables/api.ts)
- response types: [`types/api.ts`](./types/api.ts)

When the backend follows those contracts, the frontend can switch off mock mode cleanly.

## License, Usage, and Disclaimer

This repository is released under the MIT License. See [`LICENSE`](./LICENSE).

Additional usage notes:

- This project is shared primarily for learning, research, and technical reference.
- Do not use this project, its content, or its derivative deployments for illegal, infringing, fraudulent, privacy-invasive, or otherwise harmful activities.
- Before any public or commercial deployment, replace personal content, filing information, branding, media assets, and any third-party embedded resources with your own compliant material.
- The software is provided "as is" without warranty of any kind. You are responsible for compliance, operations, moderation, and data protection in your own deployment.
