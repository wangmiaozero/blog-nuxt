# blog-nuxt

## 🎃 Hola, desconocido

Enhorabuena: has dado con una joya oculta, un lugar donde puedes hacer tuyo un sitio web por completo.

Escribir artículos, tomar notas, compartir reflexiones y tu biografía — todo está aquí, con un rinconcito de cielo digital solo para ti. 🌞

A esto lo llaman «blog», pero prefiero darle a mi sitio un nombre propio: `Mood Town`. Para mí es más un pueblo — un recipiente para estados de ánimo, ideas, experiencias y creación. Cada artículo es una casa; cada página, un rincón; cada función, un servicio. Construí este pueblo con el corazón y lo cuido con mimo. Espero que sea cálido y acogedor — un sitio donde guste quedarse, conectar y compartir.

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> |
  <a href="./README.md">English</a> |
  <a href="./README_ko.md">한국어</a> |
  <a href="./README_fr.md">Français</a> |
  <a href="./README_de.md">Deutsch</a> |
  <a href="./README_ja.md">日本語</a> |
  <a href="./README_ru.md">Русский</a> |
  <strong>Español</strong> |
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

Frontend de blog personal con Nuxt 4: páginas de artículos, archivo, acerca de, cartas, página de lluvia, formulario de suscripción, modo oscuro, medios locales y una capa API mock-first que se puede sustituir por un backend real con poca fricción.

Si el proyecto te ayuda, una estrella facilita que se descubra y mantiene vivo el trabajo.

## Descripción del proyecto

Este repositorio es una plantilla de blog orientada al frontend y una implementación de referencia. Se centra en:

- experiencia de sitio personal con mucho contenido y visuales propios
- desarrollo mock-first y luego entrega al backend
- carga de datos compatible con SSR en Nuxt
- lectura de artículos, comentarios, música, suscripción y páginas temáticas
- diseños amigables en escritorio y móvil

Rutas actuales:

- `/` inicio
- `/article` archivo
- `/[articleId]` detalle del artículo
- `/about` acerca de
- `/envelope` cartas
- `/rain` día de lluvia
- `/subscribe` suscripción

## Destacados

- Arquitectura Nuxt 4 + Vue 3 + Pinia
- Modo oscuro a página completa
- Lista de artículos, detalle, búsqueda, filtros y «cargar más»
- Markdown con resaltado de sintaxis e incrustación de medios
- Lista y envío de comentarios
- Imágenes locales, logo, avatar y mp3
- Contrato de API mock pensado para reemplazar el backend
- Bootstrap SSR de la información del sitio para título y meta

## Capturas

### Inicio

![Home](./docs/screenshots/index.jpg)

### Inicio oscuro

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

### Archivo

![Archive](./docs/screenshots/article.jpg)

### Archivo oscuro

![Archive Dark](./docs/screenshots/article-dark.jpg)

### Detalle del artículo

![Article Detail](./docs/screenshots/articleInfo.jpg)

### Detalle del artículo oscuro

![Article Detail Dark](./docs/screenshots/articleInfo-dark.jpg)

### Acerca de

![About](./docs/screenshots/about.jpg)

### Acerca de oscuro

![About Dark](./docs/screenshots/about-dark.jpg)

### Lluvia

![Rain](./docs/screenshots/rain.jpg)

### Suscripción

![Subscribe](./docs/screenshots/subscribe.jpg)

## Stack tecnológico

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

## Estructura del proyecto

```text
blog-nuxt
├── assets/              # Estilos globales, fuentes, variables de tema
├── components/          # UI compartida: Header, Footer, Comment, ArticleContent
├── composables/         # Wrappers de API y cliente HTTP
├── config/              # Constantes y ayudantes de configuración
├── docs/                # Docs de API, capturas, material de entrega
├── layouts/             # Layouts de Nuxt
├── mixin/               # Mixins heredados aún usados en algunas páginas
├── mock/                # Datos mock locales y manejadores
├── pages/               # Páginas de rutas Nuxt
├── plugins/             # Arranque de la app y comportamiento en runtime
├── public/              # Activos estáticos públicos, imágenes, audio, logos
├── server/              # Extensiones del servidor si hace falta
├── stores/              # Stores de Pinia
├── types/               # Tipos compartidos de API y app
└── utils/               # Ayudantes de recursos e imágenes, utilidades
```

## Desarrollo local

### Instalación

```bash
npm install
```

### Servidor de desarrollo

```bash
npm run dev
```

### Compilación

```bash
npm run build
```

### Vista previa del build de producción

```bash
npm run preview
```

## Variables de entorno

Copia `.env.example` a `.env` y ajústalo:

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

Significado:

- `NUXT_PUBLIC_USE_MOCK=true`: manejadores mock locales en `mock/index.ts`
- `NUXT_PUBLIC_USE_MOCK=false`: llamar al backend real
- `NUXT_PUBLIC_API_BASE_URL`: solo el host del backend, sin `/api/v1`

## Integración con el backend

El proyecto ya está estructurado para la entrega. Proceso recomendado:

1. Implementar la API documentada en [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) o [`docs/api.md`](./docs/api.md).
2. Mantener rutas y nombres de campos idénticos.
3. Devolver el sobre estándar `{ code, message, data }`.
4. Incluir siempre `pagination.total` en listas.
5. Cuando el backend esté listo: `NUXT_PUBLIC_USE_MOCK=false`.
6. Apuntar `NUXT_PUBLIC_API_BASE_URL` al host del backend.

Notas importantes:

- `composables/http.ts` concatena `baseUrl + path`; `NUXT_PUBLIC_API_BASE_URL` debe ser algo como `http://localhost:7001`.
- Para no tocar el frontend, los errores de negocio pueden ir en HTTP `200` con `code` y `message` en JSON.
- Los avatares de comentarios son nombres de archivo locales como `3.jpg`, resueltos a `/image/comment/3.jpg`.
- La página de detalle renderiza principalmente `mdcontent`.

## Documentos de API

- Contrato en chino: [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- Contrato en inglés: [`docs/api.md`](./docs/api.md)

## Capa Mock

El mock no es un extra solo para demo: es la fuente de contrato actual para el backend real:

- manejadores: [`mock/index.ts`](./mock/index.ts)
- wrapper tipado de API: [`composables/api.ts`](./composables/api.ts)
- tipos de respuesta: [`types/api.ts`](./types/api.ts)

Si el backend cumple esos contratos, el frontend puede desactivar el mock sin problemas.

## Licencia, uso y descargo de responsabilidad

Publicado bajo la licencia MIT — ver [`LICENSE`](./LICENSE).

- Compartido principalmente para aprendizaje, investigación y referencia técnica.
- No uses el proyecto para actividades ilegales, fraudulentas, invasivas o dañinas.
- Antes de un despliegue público o comercial, sustituye contenido personal, datos legales, marca, medios y recursos de terceros por material conforme.
- El software se ofrece «tal cual», sin garantías. Cumplimiento, operación y protección de datos son tu responsabilidad.
