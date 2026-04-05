# blog-nuxt

## 🎃 你好，陌生人

恭喜你發現了一塊藏寶地：在這裡，你可以擁有一個完全屬於自己的網站。

寫文章、做筆記、分享心情、整理自我介紹——你需要的都在這裡，為你保留一片只屬於你的數位天空。🌞

大家常把這種東西叫做「部落格」，但我更想替網站取一個自己的名字：`Mood Town`。對我而言，它更像一座小鎮——承載情緒、想法、經驗與創作的容器。每篇文章是小鎮裡的一棟房子；每個頁面是一個角落；每個功能是一項設施。這座小鎮是我用心搭建、也用心經營的。我希望它溫暖、舒適、讓人願意停留、連結與分享。

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> |
  <a href="./README.md">English</a> |
  <a href="./README_ko.md">한국어</a> |
  <a href="./README_fr.md">Français</a> |
  <a href="./README_de.md">Deutsch</a> |
  <a href="./README_ja.md">日本語</a> |
  <strong>繁體中文</strong> |
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

以 Nuxt 4 打造的個人部落格前端，包含首頁、文章彙整、文章內頁、關於頁、信件頁、雨天頁、訂閱表單、深色模式、本機媒體資源，以及可平滑切換真實後端的 Mock 優先 API 層。

若這個專案對你有幫助，歡迎給一顆 Star，讓專案更容易被看見，也讓我更有動力持續打磨。

## 專案概覽

此儲存庫偏向「前端成品站＋後端對接範本」的定位，著重於：

- 內容為主、具自訂視覺的個人網站體驗
- 先以 Mock 開發，再交給後端
- 符合 Nuxt SSR 的資料載入
- 文章閱讀、留言、音樂、訂閱與主題頁面
- 桌機與行動裝置友善的版面

目前路由：

- `/` 首頁
- `/article` 文章彙整
- `/[articleId]` 文章內頁
- `/about` 關於
- `/envelope` 信件
- `/rain` 雨天
- `/subscribe` 訂閱

## 亮點

- Nuxt 4 + Vue 3 + Pinia 架構
- 全頁深色模式
- 文章列表、內頁、搜尋、篩選、載入更多
- Markdown 內容渲染、語法醒目提示與媒體嵌入
- 留言列表與送出流程
- 本機圖片、logo、大頭照、mp3 支援
- 為替換後端設計的 Mock API 契約
- SSR 初始化網站資訊以支援標題與 meta

## 畫面截圖

### 首頁

![Home](./docs/screenshots/index.jpg)

### 首頁（深色）

![Home Dark](./docs/screenshots/index-dark.jpg)

### 首頁變體 1

![Home Variant 1](./docs/screenshots/index-1.jpg)

### 首頁變體 2

![Home Variant 2](./docs/screenshots/index-2.jpg)

### 首頁變體 3

![Home Variant 3](./docs/screenshots/index-3.jpg)

### 首頁變體 4

![Home Variant 4](./docs/screenshots/index-4.jpg)

### 首頁變體 5

![Home Variant 5](./docs/screenshots/index-5.jpg)

### 文章彙整

![Archive](./docs/screenshots/article.jpg)

### 文章彙整（深色）

![Archive Dark](./docs/screenshots/article-dark.jpg)

### 文章內頁

![Article Detail](./docs/screenshots/articleInfo.jpg)

### 文章內頁（深色）

![Article Detail Dark](./docs/screenshots/articleInfo-dark.jpg)

### 關於

![About](./docs/screenshots/about.jpg)

### 關於（深色）

![About Dark](./docs/screenshots/about-dark.jpg)

### 雨天

![Rain](./docs/screenshots/rain.jpg)

### 訂閱

![Subscribe](./docs/screenshots/subscribe.jpg)

## 技術棧

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

## 專案結構

```text
blog-nuxt
├── assets/              # 全域樣式、字型、主題變數
├── components/          # 共用 UI：Header、Footer、Comment、ArticleContent 等
├── composables/         # API 封裝與 HTTP 用戶端
├── config/              # 應用程式常數與設定輔助
├── docs/                # API 文件、截圖、交接資料
├── layouts/             # Nuxt 版面
├── mixin/               # 部分頁面仍使用的舊 mixin
├── mock/                # 本機 Mock 資料與端點處理器
├── pages/               # Nuxt 路由頁面
├── plugins/             # 應用程式啟動與執行期行為
├── public/              # 公開靜態資源、圖片、音訊、logo
├── server/              # 需要時的伺服器擴充
├── stores/              # Pinia 狀態
├── types/               # 共用 API 與應用程式型別
└── utils/               # 資源／圖片輔助與一般工具
```

## 本機開發

### 安裝

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

### 建置

```bash
npm run build
```

### 預覽正式建置

```bash
npm run preview
```

## 環境變數

複製 `.env.example` 為 `.env` 後再調整：

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

說明：

- `NUXT_PUBLIC_USE_MOCK=true`：使用 `mock/index.ts` 的本機 Mock 處理器
- `NUXT_PUBLIC_USE_MOCK=false`：改呼叫真實後端
- `NUXT_PUBLIC_API_BASE_URL`：僅後端主機，不含 `/api/v1`

## 後端整合

專案已為後端交接整理結構，建議流程：

1. 依 [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) 或 [`docs/api.md`](./docs/api.md) 實作 API。
2. 請求路徑與回傳欄位名稱維持一致。
3. 回傳標準包裝 `{ code, message, data }`。
4. 清單端點務必包含 `pagination.total`。
5. 後端就緒後，將 `NUXT_PUBLIC_USE_MOCK` 設為 `false`。
6. 將 `NUXT_PUBLIC_API_BASE_URL` 指向真實後端主機。

整合注意：

- `composables/http.ts` 會串接 `baseUrl + path`，因此 `NUXT_PUBLIC_API_BASE_URL` 需類似 `http://localhost:7001`。
- 若希望前端零改動，業務錯誤較建議以 HTTP `200` 搭配 JSON 的 `code`／`message` 表達。
- 留言大頭照目前預期為本機檔名（如 `3.jpg`），前端會對應到 `/image/comment/3.jpg`。
- 文章內頁主要渲染 `mdcontent`。

## API 文件

- 中文介面契約：[`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- 英文介面契約：[`docs/api.md`](./docs/api.md)

## Mock 層

Mock 並非僅供展示；它是目前對真實後端的契約基準：

- Mock 處理器：[`mock/index.ts`](./mock/index.ts)
- 型別化 API 封裝：[`composables/api.ts`](./composables/api.ts)
- 回應型別：[`types/api.ts`](./types/api.ts)

後端若遵守契約，前端即可順暢關閉 Mock。

## 授權、使用與免責聲明

本儲存庫採 MIT License，詳見 [`LICENSE`](./LICENSE)。

- 主要供學習、研究與技術參考。
- 請勿用於違法、侵權、詐欺、侵害隱私或其他有害用途。
- 公開或商業部署前，請替換個人內容、備案資訊、品牌、媒體與第三方嵌入，並自行確認合規。
- 軟體依「現狀」提供，不附任何擔保；合規、營運、審核與資料保護由部署者自行負責。
