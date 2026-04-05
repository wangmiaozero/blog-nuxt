# blog-nuxt Backend API Spec

This document defines the backend contract for the current Nuxt 4 project. Once the backend is implemented according to this spec, set `NUXT_PUBLIC_USE_MOCK=false` and the frontend will call the real service.

Source of truth:

- `composables/api.ts`
- `composables/http.ts`
- `types/api.ts`
- `mock/index.ts`

## Naming Rules

- Paths are separated only by `/`.
- Query parameters, JSON request fields, and JSON response fields use lower camelCase.
- Do not use underscore-style field names or legacy leftover fields.

## Environment Variables

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

Rules:

- `NUXT_PUBLIC_USE_MOCK=true`: use local mock handlers.
- `NUXT_PUBLIC_USE_MOCK=false`: use the real backend.
- `NUXT_PUBLIC_API_BASE_URL`: host only, without `/api/v1`.

Examples:

- Correct: `http://localhost:7001`
- Incorrect: `http://localhost:7001/api/v1`

## Standard Response Envelope

Every endpoint returns:

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

| Field | Type | Description |
| --- | --- | --- |
| `code` | `number` | Business status code. Success is always `200` |
| `message` | `string` | Status text |
| `data` | `T` | Actual payload |

## Pagination Shape

Every list endpoint returns:

```json
{
  "list": [],
  "pagination": {
    "page": 1,
    "size": 20,
    "total": 100
  }
}
```

`pagination.total` is required because the current list loading logic depends on it.

## Data Models

### ApiResponse<T>

```ts
interface ApiResponse<T> {
  code: number
  message: string
  data: T
}
```

### Pagination

```ts
interface Pagination {
  page: number
  size: number
  total: number
}
```

### SiteInfo

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `webName` | `string` | Yes | Site title |
| `webDescribe` | `string` | No | Site description |
| `webAddress` | `string` | No | Site URL |
| `webSeo` | `string` | No | SEO keywords |
| `icpTxt` | `string` | No | ICP text |
| `icpLink` | `string` | No | ICP link |
| `nickName` | `string` | No | Nickname |
| `headImg` | `string` | No | Avatar or logo URL |

### LinkItem

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No | Link id |
| `name` | `string` | Yes | Link name |
| `url` | `string` | Yes | Link URL |
| `description` | `string` | No | Description |
| `avatar` | `string` | No | Icon URL |

### ArticleListQuery

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | `number` | No | Page number, default `1` |
| `size` | `number` | No | Page size |
| `sort` | `'asc' \| 'desc'` | No | Sort direction |
| `order` | `string` | No | Sort field such as `createTime` |
| `typeId` | `number \| string` | No | Category filter |
| `keyword` | `string` | No | Search keyword |

### ArticleListItem

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | Article id |
| `typeId` | `number` | No | Category id |
| `title` | `string` | Yes | Title |
| `author` | `string` | No | Author |
| `excerpt` | `string` | No | Summary |
| `readCounts` | `number` | No | View count |
| `typeName` | `string` | No | Category name |
| `createTime` | `string` | No | Creation time, recommended format `YYYY-MM-DD HH:mm:ss` |
| `updateTime` | `string` | No | Update time |
| `isPrivacy` | `number` | No | `0` public, `1` private |
| `listPic` | `string \| null` | No | Cover image |
| `music` | `string \| null` | No | Music URL |
| `collectTotal` | `number \| null` | No | Favorite count |
| `likeTotal` | `number \| null` | No | Like count |

### ArticleDetail

Extends `ArticleListItem` with:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mdcontent` | `string` | Recommended | Markdown body |
| `content` | `string` | No | HTML body |
| `isShow` | `number` | No | Display flag |
| `shareCode` | `string` | No | Share image or QR code URL |
| `isTop` | `number` | No | Sticky flag |

### CommentItem

Comments are returned as a flat list. The frontend builds the tree from `parentId`.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | Comment id |
| `name` | `string` | Yes | Author name |
| `avatarUrl` | `string` | No | Avatar filename such as `4.jpg` |
| `targetId` | `string` | Yes | Article id |
| `parentId` | `string \| null` | Yes | Parent comment id, `null` for root comments |
| `commentName` | `string` | No | Current article title |
| `content` | `string` | Yes | Comment content |
| `platformType` | `string` | No | Platform flag, currently `pc` |
| `topStatus` | `number` | No | Top flag |
| `createTime` | `string` | No | Creation time |
| `updateTime` | `string` | No | Update time |

### CommentAddBody

Only the comment submission request keeps the `phone` field.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Nickname |
| `email` | `string` | Yes | Email |
| `phone` | `string` | No | Mobile number |
| `address` | `string` | No | Website |
| `wechat` | `string` | No | WeChat |
| `qq` | `string` | No | QQ |
| `content` | `string` | Yes | Comment body |
| `userId` | `string` | Yes | Anonymous user id |
| `avatarUrl` | `string` | No | Avatar filename |
| `captchaId` | `string` | No | Captcha id |
| `verifyCode` | `string` | No | Captcha code |
| `commentName` | `string` | No | Current article title |
| `targetId` | `string` | No | Current article id |
| `parentId` | `string \| null` | No | Parent comment id |
| `platformType` | `string` | Yes | Currently fixed to `pc` |

### ArticleLikeBody

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `userId` | `string` | Yes | Anonymous user id |
| `platformType` | `string` | Yes | Currently fixed to `pc` |

### LetterItem

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contentHtml` | `string` | Yes | Letter HTML content |
| `time` | `string` | Yes | Time string |

### SubscribeBody

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | Subscription email |
| `userId` | `string` | No | Anonymous user id |
| `captchaId` | `string` | No | Captcha id |
| `verifyCode` | `string` | No | Captcha code |
| `platformType` | `string` | Yes | Currently fixed to `pc` |

## Endpoint List

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/v1/site` | `GET` | Get site info |
| `/api/v1/links` | `GET` | Get blogroll links |
| `/api/v1/articles` | `GET` | Get article list |
| `/api/v1/articles/about` | `GET` | Get about page article |
| `/api/v1/articles/:id` | `GET` | Get article detail |
| `/api/v1/articles/:id/comments` | `GET` | Get comment list |
| `/api/v1/articles/:id/comments` | `POST` | Submit a comment |
| `/api/v1/articles/:id/like` | `POST` | Like an article |
| `/api/v1/letters` | `GET` | Get letter list |
| `/api/v1/subscriptions` | `POST` | Submit an email subscription |

## Endpoint Details

### 1. GET /api/v1/site

Request parameters: none

Example response:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "webName": "全栈 | 兔子零 — Wang Xiaoming's Personal Website",
    "webDescribe": "王小明，全栈，h5前端开发，web技术，node，小程序开发",
    "webAddress": "https://example.com",
    "webSeo": "王小明,全栈,前端开发,兔子零",
    "icpTxt": "京ICP备2026012345号-1",
    "icpLink": "https://beian.miit.gov.cn",
    "nickName": "admin",
    "headImg": "/image/logo/logo1.png"
  }
}
```

### 2. GET /api/v1/links

Request parameters: none

Example response:

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "1",
      "name": "Example Blog",
      "url": "https://example.com",
      "description": "A great blog",
      "avatar": "https://example.com/avatar.png"
    }
  ]
}
```

### 3. GET /api/v1/articles

Query parameters:

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | `number` | No | Default `1` |
| `size` | `number` | No | Page size |
| `sort` | `asc \| desc` | No | Sort direction |
| `order` | `string` | No | Sort field |
| `typeId` | `number \| string` | No | Category filter |
| `keyword` | `string` | No | Search keyword |

Example response:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "422",
        "typeId": 99,
        "title": "Vue3.0的设计目标是什么？做了哪些优化?",
        "author": "兔子零",
        "excerpt": "不以解决实际业务痛点的更新都是耍流氓...",
        "readCounts": 78,
        "typeName": "刷题",
        "createTime": "2022-01-11 23:16:52",
        "updateTime": "2022-01-15 21:38:57",
        "isPrivacy": 0,
        "listPic": "https://example.com/cover.jpg",
        "music": "https://example.com/music.mp3",
        "collectTotal": 0,
        "likeTotal": 1
      }
    ],
    "pagination": {
      "page": 1,
      "size": 20,
      "total": 354
    }
  }
}
```

### 4. GET /api/v1/articles/about

Request parameters: none

Response:

- `data` follows `ArticleDetail`

### 5. GET /api/v1/articles/:id

Path parameters:

| Param | Type | Description |
| --- | --- | --- |
| `id` | `string` | Article id |

Response:

- `data` follows `ArticleDetail`

Notes:

- `mdcontent` is the primary article body field
- the detail header uses `excerpt`, `createTime`, `readCounts`, `likeTotal`, and `collectTotal`

### 6. GET /api/v1/articles/:id/comments

Path parameters:

| Param | Type | Description |
| --- | --- | --- |
| `id` | `string` | Article id |

Query parameters:

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | `number` | No | Default `1` |
| `size` | `number` | No | Requested by the page |

Example response:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "10042",
        "name": "路过读者",
        "avatarUrl": "3.jpg",
        "targetId": "3",
        "parentId": null,
        "commentName": "世界上只有一种英雄主义",
        "content": "写得很克制，读完沉默了很久。",
        "platformType": "pc",
        "topStatus": 0,
        "createTime": "2022-01-11 15:42:00",
        "updateTime": "2022-01-11 15:42:00"
      }
    ],
    "pagination": {
      "page": 1,
      "size": 15,
      "total": 7
    }
  }
}
```

### 7. POST /api/v1/articles/:id/comments

Path parameters:

| Param | Type | Description |
| --- | --- | --- |
| `id` | `string` | Article id |

Request body example:

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "phone": "13800138000",
  "address": "",
  "wechat": "",
  "qq": "",
  "content": "Nice article.",
  "userId": "client-generated-guid",
  "avatarUrl": "5.jpg",
  "captchaId": "",
  "verifyCode": "1234",
  "commentName": "世界上只有一种英雄主义，就是在认清生活真相之后依然选择热爱生活",
  "targetId": "3",
  "parentId": null,
  "platformType": "pc"
}
```

Example response:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 8. POST /api/v1/articles/:id/like

Request body example:

```json
{
  "userId": "client-generated-guid",
  "platformType": "pc"
}
```

Example response:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 9. GET /api/v1/letters

Query parameters:

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | `number` | No | Default `1` |
| `size` | `number` | No | Default `10` |

Example response:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "contentHtml": "<p>你好，这是一封模拟信件。愿温柔长伴，愿岁月静好。</p>",
        "time": "2022-01-12 10:00:00"
      }
    ],
    "pagination": {
      "page": 1,
      "size": 10,
      "total": 5
    }
  }
}
```

### 10. POST /api/v1/subscriptions

Request body example:

```json
{
  "email": "alice@example.com",
  "userId": "client-generated-guid",
  "captchaId": "",
  "verifyCode": "1234",
  "platformType": "pc"
}
```

Example response:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

## Switching from Mock to Real API

1. Implement all endpoints in this document.
2. Set `NUXT_PUBLIC_USE_MOCK=false`.
3. Set `NUXT_PUBLIC_API_BASE_URL` to the real backend host.
4. Start the frontend and verify the integration.
