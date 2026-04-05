# blog-nuxt

## 🎃 Здравствуй, незнакомец!

Поздравляю — ты нашёл спрятанную жемчужину: место, где можно обрести сайт целиком свой.

Статьи, заметки, мысли и биография — всё здесь, чтобы подарить тебе уголок цифрового неба только для тебя. 🌞

Такое часто называют «блогом», но я предпочитаю дать сайту своё имя: `Mood Town`. Для меня это скорее маленький город — сосуд для настроений, мыслей, опыта и творчества. Каждая статья — дом, каждая страница — уголок, каждая функция — удобство. Я строил этот город с душой и ухаживаю за ним бережно. Надеюсь, он станет тёплым и уютным — местом, где приятно задержаться, общаться и делиться.

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> |
  <a href="./README.md">English</a> |
  <a href="./README_ko.md">한국어</a> |
  <a href="./README_fr.md">Français</a> |
  <a href="./README_de.md">Deutsch</a> |
  <a href="./README_ja.md">日本語</a> |
  <strong>Русский</strong> |
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

Фронтенд личного блога на Nuxt 4: страницы статей, архив, «обо мне», письма, страница дождя, форма подписки, тёмная тема, локальные медиа и слой API «сначала mock», который легко заменить настоящим бэкендом.

Если проект помог — поставь звезду: так его проще найти, а мне проще продолжать работу.

## Обзор проекта

Репозиторий — шаблон блога с упором на фронтенд и эталонная реализация. Акценты:

- контентный персональный сайт с собственной визуальной подачей
- разработка через mock, затем передача бэкенду
- загрузка данных, дружественная к SSR Nuxt
- чтение статей, комментарии, музыка, подписка и тематические страницы
- вёрстка для десктопа и мобильных

Текущие маршруты:

- `/` главная
- `/article` архив
- `/[articleId]` статья
- `/about` обо мне
- `/envelope` письма
- `/rain` дождь
- `/subscribe` подписка

## Особенности

- Архитектура Nuxt 4 + Vue 3 + Pinia
- Тёмная тема на всю страницу
- Список статей, деталь, поиск, фильтры, «загрузить ещё»
- Markdown с подсветкой синтаксиса и встраиванием медиа
- Комментарии: список и отправка
- Локальные изображения, логотип, аватар, mp3
- Контракт mock API для замены бэкенда
- SSR-инициализация данных сайта для заголовков и meta

## Скриншоты

### Главная

![Home](./docs/screenshots/index.jpg)

### Главная (тёмная)

![Home Dark](./docs/screenshots/index-dark.jpg)

### Вариант 1

![Home Variant 1](./docs/screenshots/index-1.jpg)

### Вариант 2

![Home Variant 2](./docs/screenshots/index-2.jpg)

### Вариант 3

![Home Variant 3](./docs/screenshots/index-3.jpg)

### Вариант 4

![Home Variant 4](./docs/screenshots/index-4.jpg)

### Вариант 5

![Home Variant 5](./docs/screenshots/index-5.jpg)

### Архив

![Archive](./docs/screenshots/article.jpg)

### Архив (тёмный)

![Archive Dark](./docs/screenshots/article-dark.jpg)

### Статья

![Article Detail](./docs/screenshots/articleInfo.jpg)

### Статья (тёмная)

![Article Detail Dark](./docs/screenshots/articleInfo-dark.jpg)

### Обо мне

![About](./docs/screenshots/about.jpg)

### Обо мне (тёмная)

![About Dark](./docs/screenshots/about-dark.jpg)

### Дождь

![Rain](./docs/screenshots/rain.jpg)

### Подписка

![Subscribe](./docs/screenshots/subscribe.jpg)

## Стек

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

## Структура проекта

```text
blog-nuxt
├── assets/              # Глобальные стили, шрифты, переменные темы
├── components/          # Общие UI: Header, Footer, Comment, ArticleContent
├── composables/         # Обёртки API и HTTP-клиент
├── config/              # Константы и хелперы конфигурации
├── docs/                # Документация API, скриншоты, материалы передачи
├── layouts/             # Макеты Nuxt
├── mixin/               # Устаревшие mixins, ещё используемые на страницах
├── mock/                # Локальные mock-данные и обработчики
├── pages/               # Страницы маршрутов Nuxt
├── plugins/             # Инициализация и поведение в рантайме
├── public/              # Публичные статические файлы, изображения, аудио, логотипы
├── server/              # Серверные расширения при необходимости
├── stores/              # Хранилища Pinia
├── types/               # Общие типы API и приложения
└── utils/               # Хелперы для ресурсов, изображений, утилиты
```

## Локальная разработка

### Установка

```bash
npm install
```

### Dev-сервер

```bash
npm run dev
```

### Сборка

```bash
npm run build
```

### Просмотр production-сборки

```bash
npm run preview
```

## Переменные окружения

Скопируйте `.env.example` в `.env` и настройте:

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

Значение:

- `NUXT_PUBLIC_USE_MOCK=true` — локальные mock-обработчики в `mock/index.ts`
- `NUXT_PUBLIC_USE_MOCK=false` — вызов реального бэкенда
- `NUXT_PUBLIC_API_BASE_URL` — только хост бэкенда, без `/api/v1`

## Интеграция с бэкендом

Проект уже подготовлен к передаче. Рекомендуемый порядок:

1. Реализовать API из [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) или [`docs/api.md`](./docs/api.md).
2. Сохранить пути и имена полей ответа.
3. Возвращать обёртку `{ code, message, data }`.
4. Для списков всегда включать `pagination.total`.
5. Когда бэкенд готов — `NUXT_PUBLIC_USE_MOCK=false`.
6. Указать `NUXT_PUBLIC_API_BASE_URL` на хост бэкенда.

Важно:

- `composables/http.ts` склеивает `baseUrl + path`, поэтому `NUXT_PUBLIC_API_BASE_URL` должен быть вида `http://localhost:7001`.
- Чтобы не менять фронт, бизнес-ошибки лучше отдавать как HTTP `200` с JSON `code` и `message`.
- Аватары комментариев — локальные имена файлов вроде `3.jpg`, разрешаются в `/image/comment/3.jpg`.
- Страница статьи в основном рендерит `mdcontent`.

## Документы API

- Контракт на китайском: [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- Контракт на английском: [`docs/api.md`](./docs/api.md)

## Слой Mock

Mock — не демо-надстройка, а текущий источник контракта для реального бэкенда:

- обработчики: [`mock/index.ts`](./mock/index.ts)
- типизированная обёртка API: [`composables/api.ts`](./composables/api.ts)
- типы ответов: [`types/api.ts`](./types/api.ts)

Если бэкенд соблюдает контракт, mock можно корректно отключить.

## Лицензия, использование и отказ от ответственности

Репозиторий под лицензией MIT — см. [`LICENSE`](./LICENSE).

- В основном для обучения, исследований и технической справки.
- Не используйте проект в незаконных, мошеннических или вредоносных целях.
- Перед публичным или коммерческим развёртыванием замените личный контент, реквизиты, брендинг и медиа на собственные соответствующие материалы.
- ПО поставляется «как есть», без гарантий. Соответствие закону, эксплуатация и защита данных — ваша зона ответственности.
