# blog-nuxt

## 🎃 Ciao, sconosciuto

Congratulazioni — hai trovato una gemma nascosta: un posto dove puoi avere un sito tutto tuo.

Scrivere articoli, prendere appunti, condividere pensieri e la tua bio — tutto è qui, con un angolo di cielo digitale solo per te. 🌞

Di solito si chiama “blog”, ma preferisco dare al mio sito un nome proprio: `Mood Town`. Per me è più una piccola città — un contenitore per stati d’animo, idee, esperienze e creatività. Ogni articolo è una casa; ogni pagina, un angolo; ogni funzione, un servizio. Ho costruito questa città col cuore e la curo con attenzione. Spero sia calda e accogliente — un luogo dove fermarsi, connettersi e condividere.

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> |
  <a href="./README.md">English</a> |
  <a href="./README_ko.md">한국어</a> |
  <a href="./README_fr.md">Français</a> |
  <a href="./README_de.md">Deutsch</a> |
  <a href="./README_ja.md">日本語</a> |
  <a href="./README_zh-TW.md">繁體中文</a> |
  <a href="./README_ru.md">Русский</a> |
  <a href="./README_es.md">Español</a> |
  <a href="./README_pt.md">Português</a> |
  <strong>Italiano</strong> |
  <a href="./README_vi.md">Tiếng Việt</a> |
  <a href="./README_ar.md">العربية</a>
</p>

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3-F7C545?logo=pinia&logoColor=333)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Mock Ready](https://img.shields.io/badge/API-Mock%20Ready-0F172A)

Frontend di blog personale con Nuxt 4: pagine articoli, archivio, chi siamo, lettere, pagina pioggia, modulo iscrizione, dark mode, media locali e un layer API mock-first sostituibile con un backend reale a basso attrito.

Se il progetto ti è utile, una stella aiuta a farlo trovare e a tenere vivo il lavoro.

## Panoramica del progetto

Questo repository è un template di blog orientato al frontend e un’implementazione di riferimento. Punta a:

- esperienza di sito personale ricco di contenuti e visivi personalizzati
- sviluppo mock-first e poi passaggio al backend
- caricamento dati compatibile con SSR Nuxt
- lettura articoli, commenti, musica, iscrizione e pagine tematiche
- layout desktop e mobile

Route attuali:

- `/` home
- `/article` archivio
- `/[articleId]` dettaglio articolo
- `/about` chi siamo
- `/envelope` lettere
- `/rain` giorno di pioggia
- `/subscribe` iscrizione

## Punti di forza

- Architettura Nuxt 4 + Vue 3 + Pinia
- Dark mode a pagina intera
- Lista articoli, dettaglio, ricerca, filtri e “carica altro”
- Markdown con evidenziazione sintassi e media incorporati
- Lista e invio commenti
- Immagini locali, logo, avatar e mp3
- Contratto API mock pensato per la sostituzione del backend
- Bootstrap SSR delle informazioni del sito per titolo e meta

## Screenshot

### Home

![Home](./docs/screenshots/index.jpg)

### Home scura

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

### Archivio

![Archive](./docs/screenshots/article.jpg)

### Archivio scuro

![Archive Dark](./docs/screenshots/article-dark.jpg)

### Dettaglio articolo

![Article Detail](./docs/screenshots/articleInfo.jpg)

### Dettaglio articolo scuro

![Article Detail Dark](./docs/screenshots/articleInfo-dark.jpg)

### Chi siamo

![About](./docs/screenshots/about.jpg)

### Chi siamo scuro

![About Dark](./docs/screenshots/about-dark.jpg)

### Pioggia

![Rain](./docs/screenshots/rain.jpg)

### Iscrizione

![Subscribe](./docs/screenshots/subscribe.jpg)

## Stack tecnologico

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

## Struttura del progetto

```text
blog-nuxt
├── assets/              # Stili globali, font, variabili tema
├── components/          # UI condivisa: Header, Footer, Comment, ArticleContent
├── composables/         # Wrapper API e client HTTP
├── config/              # Costanti e helper di configurazione
├── docs/                # Documentazione API, screenshot, materiali handoff
├── layouts/             # Layout Nuxt
├── mixin/               # Mixin legacy ancora usati da alcune pagine
├── mock/                # Dati mock locali e handler endpoint
├── pages/               # Pagine route Nuxt
├── plugins/             # Bootstrap app e comportamento runtime
├── public/              # Asset statici pubblici, immagini, audio, logo
├── server/              # Estensioni server se necessarie
├── stores/              # Store Pinia
├── types/               # Tipi API e app condivisi
└── utils/               # Helper asset, immagini, utilità
```

## Sviluppo locale

### Installazione

```bash
npm install
```

### Server di sviluppo

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Anteprima build di produzione

```bash
npm run preview
```

## Variabili d’ambiente

Copia `.env.example` in `.env` e adatta:

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

Significato:

- `NUXT_PUBLIC_USE_MOCK=true`: handler mock locali in `mock/index.ts`
- `NUXT_PUBLIC_USE_MOCK=false`: chiamare il backend reale
- `NUXT_PUBLIC_API_BASE_URL`: solo host backend, senza `/api/v1`

## Integrazione backend

Il progetto è già strutturato per il passaggio. Processo consigliato:

1. Implementare l’API documentata in [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) o [`docs/api.md`](./docs/api.md).
2. Mantenere percorsi e nomi dei campi identici.
3. Restituire l’involucro standard `{ code, message, data }`.
4. Includere sempre `pagination.total` nelle liste.
5. Quando il backend è pronto: `NUXT_PUBLIC_USE_MOCK=false`.
6. Impostare `NUXT_PUBLIC_API_BASE_URL` sull’host del backend.

Note importanti:

- `composables/http.ts` concatena `baseUrl + path`; `NUXT_PUBLIC_API_BASE_URL` deve essere tipo `http://localhost:7001`.
- Per evitare modifiche al frontend, gli errori di business possono essere HTTP `200` con JSON `code` e `message`.
- Gli avatar dei commenti sono nomi file locali come `3.jpg`, risolti in `/image/comment/3.jpg`.
- La pagina dettaglio renderizza soprattutto `mdcontent`.

## Documenti API

- Contratto in cinese: [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- Contratto in inglese: [`docs/api.md`](./docs/api.md)

## Layer Mock

Il mock non è un extra solo demo: è la fonte contrattuale attuale per il backend reale:

- handler: [`mock/index.ts`](./mock/index.ts)
- wrapper API tipizzato: [`composables/api.ts`](./composables/api.ts)
- tipi di risposta: [`types/api.ts`](./types/api.ts)

Se il backend rispetta quei contratti, il frontend può disattivare il mock in modo pulito.

## Licenza, uso e disclaimer

Rilasciato sotto licenza MIT — vedi [`LICENSE`](./LICENSE).

- Condiviso principalmente per apprendimento, ricerca e riferimento tecnico.
- Non usare il progetto per attività illegali, fraudolente, invasive o dannose.
- Prima di un deploy pubblico o commerciale, sostituisci contenuti personali, dati legali, branding, media e risorse di terze parti con materiale conforme.
- Il software è fornito “così com’è”, senza garanzie. Conformità, operazioni e protezione dati sono a tuo carico.
