# blog-nuxt

## 🎃 陌生人，你好呀~~

恭喜你发现了一个宝藏，在这儿能拥有属于自己的网站。

写文章、记笔记、心情说说、个人介绍等，应有尽有，属于自己的一片天 🌞

人们总喜欢称为博客，但我更喜欢把自己的网站称之为：`心情小镇`，因为它更像是一个小镇，承载着我的心情、想法、经历和创作。每一篇文章都是小镇上的一栋房子，每一个页面都是小镇上的一个角落，每一个功能都是小镇上的一个设施。这个小镇是我用心打造的，也是我用心经营的，我希望它能成为一个温暖、舒适、有趣的地方，让人们愿意停留、愿意交流、愿意分享。

**整体风格为简约风，人的心灵到达一定阶段，心思愈渐愈偏向于简单，大道极简也许才是最终的归宿，我是创造者，也是追寻者。**

<p align="center">
  <strong>简体中文</strong> |
  <a href="./README.md">English</a> |
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

这是一个基于 Nuxt 4 的个人博客前端项目，包含首页、文章归档、文章详情、关于页、信件页、下雨天页面、订阅页、暗黑模式、本地图片与音频资源，以及一套可直接切换到真实后端的 Mock 优先接口层。

如果这个项目对你有帮助，欢迎点一个 Star，这会让项目更容易被看到，也会让我更有动力继续打磨。

## 项目简介

这个仓库更偏向“前端成品站点 + 后端对接模板”的双重定位，适合：

- 作为个人博客或内容型站点前端模板
- 作为 Nuxt 4 内容站项目参考
- 作为前后端联调契约样板
- 作为从 Mock 数据切换到真实接口的实践项目

当前页面路由：

- `/` 首页
- `/article` 文章归档页
- `/[articleId]` 文章详情页
- `/about` 关于页
- `/envelope` 信件页
- `/rain` 下雨天页
- `/subscribe` 订阅页

## 项目亮点

- Nuxt 4 + Vue 3 + Pinia 架构
- 全页级暗黑模式切换
- 文章列表、筛选、搜索、分页加载
- Markdown 正文渲染与代码高亮
- 评论列表与评论提交流程
- 本地 logo、封面、头像、mp3 资源接入
- Mock 接口与真实后端可切换
- SSR 站点信息初始化与 SEO 标题支持

## 项目预览

### 首页

![首页](./docs/screenshots/index.jpg)

### 首页暗黑模式

![首页暗黑模式](./docs/screenshots/index-dark.jpg)

### 首页样式 1

![首页样式 1](./docs/screenshots/index-1.jpg)

### 首页样式 2

![首页样式 2](./docs/screenshots/index-2.jpg)

### 首页样式 3

![首页样式 3](./docs/screenshots/index-3.jpg)

### 首页样式 4

![首页样式 4](./docs/screenshots/index-4.jpg)

### 首页样式 5

![首页样式 5](./docs/screenshots/index-5.jpg)

### 文章归档页

![文章归档页](./docs/screenshots/article.jpg)

### 文章归档页暗黑模式

![文章归档页暗黑模式](./docs/screenshots/article-dark.jpg)

### 文章详情页

![文章详情页](./docs/screenshots/articleInfo.jpg)

### 文章详情页暗黑模式

![文章详情页暗黑模式](./docs/screenshots/articleInfo-dark.jpg)

### 关于页

![关于页](./docs/screenshots/about.jpg)

### 关于页暗黑模式

![关于页暗黑模式](./docs/screenshots/about-dark.jpg)

### 下雨天页

![下雨天页](./docs/screenshots/rain.jpg)

### 订阅页

![订阅页](./docs/screenshots/subscribe.jpg)

## 技术栈

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

## 项目目录

```text
blog-nuxt
├── assets/              # 全局样式、字体、主题变量
├── components/          # Header、Footer、Comment、ArticleContent 等通用组件
├── composables/         # API 封装与 HTTP 客户端
├── config/              # 项目常量与配置辅助
├── docs/                # API 文档、截图、交接材料
├── layouts/             # Nuxt 布局
├── mixin/               # 仍在使用的旧 mixin
├── mock/                # 本地 Mock 数据与接口处理器
├── pages/               # Nuxt 页面路由
├── plugins/             # 应用初始化与运行时扩展
├── public/              # 公共静态资源，含图片、音频、logo
├── server/              # 服务端扩展目录
├── stores/              # Pinia 状态管理
├── types/               # 共享类型定义
└── utils/               # 资源辅助、图片处理、通用工具
```

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发环境

```bash
npm run dev
```

### 打包构建

```bash
npm run build
```

### 本地预览生产构建

```bash
npm run preview
```

## 环境变量

复制 `.env.example` 为 `.env` 后按需修改：

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

含义如下：

- `NUXT_PUBLIC_USE_MOCK=true`：走 `mock/index.ts` 本地模拟接口
- `NUXT_PUBLIC_USE_MOCK=false`：走真实后端接口
- `NUXT_PUBLIC_API_BASE_URL`：后端基础地址，只写主机，不要带 `/api/v1`

## 后端如何对接

这个项目已经按“后端接入后即可关闭 mock”的目标整理好了，推荐按下面步骤对接：

1. 先实现 [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) 或 [`docs/api.md`](./docs/api.md) 中定义的接口。
2. 路径、请求参数、返回字段名保持完全一致。
3. 统一返回 `{ code, message, data }` 包装结构。
4. 列表接口务必返回完整 `pagination.total`。
5. 后端准备完成后，把 `NUXT_PUBLIC_USE_MOCK` 改成 `false`。
6. 把 `NUXT_PUBLIC_API_BASE_URL` 指向真实后端主机。

对接时请特别注意：

- `composables/http.ts` 会直接做 `baseUrl + path` 拼接，所以 `NUXT_PUBLIC_API_BASE_URL` 必须是 `http://localhost:7001` 这种形式。
- 如果希望前端零改动切换，业务失败更推荐返回 HTTP `200`，再通过 JSON 的 `code` / `message` 表达错误。
- 评论头像当前建议返回 `3.jpg` 这类本地文件名，前端会自动映射到 `/image/comment/3.jpg`。
- 文章详情页当前主渲染字段是 `mdcontent`。

## API 文档

- 中文接口契约：[`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- 英文接口契约：[`docs/api.md`](./docs/api.md)

## Mock 层说明

Mock 不是演示用边角料，而是当前真实后端的对接基线：

- Mock 入口：[`mock/index.ts`](./mock/index.ts)
- API 封装：[`composables/api.ts`](./composables/api.ts)
- 接口类型：[`types/api.ts`](./types/api.ts)

只要后端遵守这些契约，前端就可以平滑关掉 mock。

## 开源协议、使用说明与免责声明

本仓库采用 MIT License，详见 [`LICENSE`](./LICENSE)。

同时请注意：

- 本项目主要用于学习、研究、交流与技术参考。
- 请不要将本项目或其衍生部署用于任何非法、侵权、欺诈、侵犯隐私或其他有害用途。
- 如果你要公开部署或商用，请先替换仓库中的个人内容、备案信息、品牌标识、媒体资源以及所有第三方嵌入内容，并自行确认合规性。
- 本项目按“现状”提供，不附带任何明示或默示担保。部署后的内容审核、数据安全、法律责任与运营风险均由使用者自行承担。
