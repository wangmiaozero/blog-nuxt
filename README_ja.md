# blog-nuxt

## 🎃 はじめまして、見知らぬ方へ

おめでとうございます——自分だけのウェブサイトをまるごと手に入れられる、隠れた宝物に出会いました。

記事を書き、メモし、所思を共有し、自己紹介をつくる——必要なものはここにあり、あなただけのデジタルの空の片隅を届けます。🌞

こうしたものを「ブログ」と呼ぶことも多いですが、私はサイトに独自の名前を付けたいと思っています：`Mood Town`。私にとってそれは小さな町のようなもの——気持ちや考え、経験、創作を受け止める器です。記事は町の家、ページは角、機能は施設です。この町は心を込めて建て、大切に手入れしています。温かく居心地よく、人が留まり、つながり、分かち合える場所になればと願っています。

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> |
  <a href="./README.md">English</a> |
  <a href="./README_ko.md">한국어</a> |
  <a href="./README_fr.md">Français</a> |
  <a href="./README_de.md">Deutsch</a> |
  <strong>日本語</strong> |
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

記事ページ、アーカイブ、About、手紙、雨の日ページ、購読フォーム、ダークモード、ローカルメディア、実バックエンドへ差し替えやすい Mock 優先の API レイヤーを備えた Nuxt 4 製の個人ブログフロントエンドです。

役に立ったら Star をお願いします。発見されやすくなり、開発を続ける励みになります。

## プロジェクト概要

本リポジトリはフロントエンド志向のブログテンプレート兼参照実装です。重点は次のとおりです。

- カスタムビジュアルを伴うコンテンツ重視の個人サイト体験
- Mock 優先の開発のあとバックエンド引き渡し
- Nuxt SSR に適したデータ取得
- 記事閲覧、コメント、音楽、購読、テーマページ
- デスクトップ・モバイル両対応レイアウト

現在のルート：

- `/` ホーム
- `/article` アーカイブ
- `/[articleId]` 記事詳細
- `/about` について
- `/envelope` 手紙
- `/rain` 雨の日
- `/subscribe` 購読

## ハイライト

- Nuxt 4 + Vue 3 + Pinia アーキテクチャ
- ページ全体のダークモード
- 記事一覧・詳細・検索・フィルタ・もっと読む
- シンタックスハイライトとメディア埋め込み付き Markdown レンダリング
- コメント一覧と投稿フロー
- ローカル画像、ロゴ、アバター、mp3 対応
- バックエンド差し替え用の Mock API 契約
- タイトル・メタ用の SSR サイト情報ブートストラップ

## スクリーンショット

### ホーム

![Home](./docs/screenshots/index.jpg)

### ホーム（ダーク）

![Home Dark](./docs/screenshots/index-dark.jpg)

### ホーム バリエーション 1

![Home Variant 1](./docs/screenshots/index-1.jpg)

### ホーム バリエーション 2

![Home Variant 2](./docs/screenshots/index-2.jpg)

### ホーム バリエーション 3

![Home Variant 3](./docs/screenshots/index-3.jpg)

### ホーム バリエーション 4

![Home Variant 4](./docs/screenshots/index-4.jpg)

### ホーム バリエーション 5

![Home Variant 5](./docs/screenshots/index-5.jpg)

### アーカイブ

![Archive](./docs/screenshots/article.jpg)

### アーカイブ（ダーク）

![Archive Dark](./docs/screenshots/article-dark.jpg)

### 記事詳細

![Article Detail](./docs/screenshots/articleInfo.jpg)

### 記事詳細（ダーク）

![Article Detail Dark](./docs/screenshots/articleInfo-dark.jpg)

### About

![About](./docs/screenshots/about.jpg)

### About（ダーク）

![About Dark](./docs/screenshots/about-dark.jpg)

### 雨の日

![Rain](./docs/screenshots/rain.jpg)

### 購読

![Subscribe](./docs/screenshots/subscribe.jpg)

## 技術スタック

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

## プロジェクト構成

```text
blog-nuxt
├── assets/              # グローバルスタイル、フォント、テーマ変数
├── components/          # Header、Footer、Comment、ArticleContent など共有 UI
├── composables/         # API ラッパーと HTTP クライアント
├── config/              # アプリ定数と設定ヘルパー
├── docs/                # API ドキュメント、スクリーンショット、引き渡し資料
├── layouts/             # Nuxt レイアウト
├── mixin/               # 一部ページで使用中のレガシー mixin
├── mock/                # ローカル Mock データとエンドポイントハンドラ
├── pages/               # Nuxt ルートページ
├── plugins/             # アプリ起動とランタイム挙動
├── public/              # 公開静的アセット、画像、音声、ロゴ
├── server/              # 必要に応じたサーバー拡張
├── stores/              # Pinia ストア
├── types/               # 共有 API・アプリ型
└── utils/               # アセット・画像ヘルパー、汎用ユーティリティ
```

## ローカル開発

### インストール

```bash
npm install
```

### 開発サーバー

```bash
npm run dev
```

### ビルド

```bash
npm run build
```

### 本番ビルドのプレビュー

```bash
npm run preview
```

## 環境変数

`.env.example` を `.env` にコピーして調整します。

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

意味：

- `NUXT_PUBLIC_USE_MOCK=true`：`mock/index.ts` のローカル Mock ハンドラを使用
- `NUXT_PUBLIC_USE_MOCK=false`：実バックエンドを呼び出す
- `NUXT_PUBLIC_API_BASE_URL`：バックエンドホストのみ（`/api/v1` は含めない）

## バックエンド連携

バックエンド引き渡しを想定した構成です。推奨手順：

1. [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) または [`docs/api.md`](./docs/api.md) に沿って API を実装する。
2. パスとレスポンスのフィールド名を同一に保つ。
3. 標準ラッパー `{ code, message, data }` を返す。
4. 一覧 API では常に `pagination.total` を含める。
5. バックエンド準備後、`NUXT_PUBLIC_USE_MOCK=false` にする。
6. `NUXT_PUBLIC_API_BASE_URL` をバックエンドホストに向ける。

連携の注意：

- `composables/http.ts` は `baseUrl + path` を連結するため、`NUXT_PUBLIC_API_BASE_URL` は `http://localhost:7001` のような形にする。
- フロントを変えずに済ませるなら、業務エラーは HTTP `200` と JSON の `code` / `message` で返すのがよい。
- コメントのアバターは `3.jpg` のようなローカルファイル名を想定し、`/image/comment/3.jpg` に解決される。
- 記事詳細は主に `mdcontent` を描画する。

## API ドキュメント

- 中国語契約：[`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- 英語契約：[`docs/api.md`](./docs/api.md)

## Mock レイヤー

Mock はデモ用の付け足しではなく、実バックエンド向けの現在の契約ソースです。

- ハンドラ：[`mock/index.ts`](./mock/index.ts)
- 型付き API ラッパー：[`composables/api.ts`](./composables/api.ts)
- レスポンス型：[`types/api.ts`](./types/api.ts)

バックエンドがこれらの契約に従えば、Mock モードをきれいにオフにできる。

## ライセンス・利用・免責

MIT License。詳しくは [`LICENSE`](./LICENSE)。

- 主に学習・研究・技術参照のための共有です。
- 違法・侵害・詐欺・プライバシー侵害など有害な利用はしないでください。
- 公開・商用デプロイ前に、個人コンテンツ、届出情報、ブランド、メディア、第三者埋め込みを適合した素材に差し替えてください。
- ソフトウェアは現状のまま提供され、保証はありません。コンプライアンス・運用・モデレーション・データ保護は利用者の責任です。
