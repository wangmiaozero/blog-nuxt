# blog-nuxt 后端接口规范

本文档以当前项目代码为准，用于后端直接实现接口。后端完成后，将 `.env` 中的 `NUXT_PUBLIC_USE_MOCK` 改为 `false` 即可切换到真实服务。

事实来源：

- `composables/api.ts`
- `composables/http.ts`
- `types/api.ts`
- `mock/index.ts`

## 命名规则

- 接口路径使用 `/` 分段。
- 查询参数、路径参数语义字段、JSON 入参、JSON 出参全部使用小驼峰。
- 不使用下划线命名，不保留下划线字段和历史遗留字段。

## 环境变量

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

说明：

- `NUXT_PUBLIC_USE_MOCK=true`：走本地 Mock。
- `NUXT_PUBLIC_USE_MOCK=false`：走真实后端。
- `NUXT_PUBLIC_API_BASE_URL`：只写后端主机地址，不带 `/api/v1`。

示例：

- 正确：`http://localhost:7001`
- 错误：`http://localhost:7001/api/v1`

## 统一响应结构

所有接口统一返回：

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

字段说明：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | `number` | 业务状态码，成功固定为 `200` |
| `message` | `string` | 接口提示信息 |
| `data` | `T` | 实际数据 |

项目当前请求层按这个结构工作，后端请保持一致。

## 分页结构

所有列表接口统一返回：

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

`pagination.total` 为必填字段，列表加载状态依赖它判断是否还有下一页。

## 数据模型

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

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `webName` | `string` | 是 | 站点标题 |
| `webDescribe` | `string` | 否 | 站点描述 |
| `webAddress` | `string` | 否 | 站点地址 |
| `webSeo` | `string` | 否 | SEO 关键词 |
| `icpTxt` | `string` | 否 | ICP 文案 |
| `icpLink` | `string` | 否 | ICP 链接 |
| `nickName` | `string` | 否 | 昵称 |
| `headImg` | `string` | 否 | 头像或 Logo 地址 |

### LinkItem

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `string` | 否 | 链接 id |
| `name` | `string` | 是 | 名称 |
| `url` | `string` | 是 | 地址 |
| `description` | `string` | 否 | 描述 |
| `avatar` | `string` | 否 | 图标地址 |

### ArticleListQuery

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page` | `number` | 否 | 页码，默认 `1` |
| `size` | `number` | 否 | 每页数量 |
| `sort` | `'asc' \| 'desc'` | 否 | 排序方向 |
| `order` | `string` | 否 | 排序字段，例如 `createTime` |
| `typeId` | `number \| string` | 否 | 分类筛选 |
| `keyword` | `string` | 否 | 关键词搜索 |

### ArticleListItem

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `string` | 是 | 文章 id |
| `typeId` | `number` | 否 | 分类 id |
| `title` | `string` | 是 | 标题 |
| `author` | `string` | 否 | 作者 |
| `excerpt` | `string` | 否 | 摘要 |
| `readCounts` | `number` | 否 | 阅读量 |
| `typeName` | `string` | 否 | 分类名称 |
| `createTime` | `string` | 否 | 创建时间，建议格式 `YYYY-MM-DD HH:mm:ss` |
| `updateTime` | `string` | 否 | 更新时间 |
| `isPrivacy` | `number` | 否 | `0` 公开，`1` 私密 |
| `listPic` | `string \| null` | 否 | 封面图 |
| `music` | `string \| null` | 否 | 音乐地址 |
| `collectTotal` | `number \| null` | 否 | 收藏数 |
| `likeTotal` | `number \| null` | 否 | 点赞数 |

### ArticleDetail

在 `ArticleListItem` 基础上新增：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `mdcontent` | `string` | 建议是 | Markdown 正文 |
| `content` | `string` | 否 | HTML 正文 |
| `isShow` | `number` | 否 | 是否展示 |
| `shareCode` | `string` | 否 | 分享图或分享二维码地址 |
| `isTop` | `number` | 否 | 是否置顶 |

### CommentItem

评论列表返回扁平结构，由前端根据 `parentId` 组装为树。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `string` | 是 | 评论 id |
| `name` | `string` | 是 | 评论人昵称 |
| `avatarUrl` | `string` | 否 | 头像文件名，例如 `4.jpg` |
| `targetId` | `string` | 是 | 文章 id |
| `parentId` | `string \| null` | 是 | 父评论 id，顶级评论为 `null` |
| `commentName` | `string` | 否 | 当前文章标题 |
| `content` | `string` | 是 | 评论内容 |
| `platformType` | `string` | 否 | 平台标记，当前固定为 `pc` |
| `topStatus` | `number` | 否 | 置顶状态 |
| `createTime` | `string` | 否 | 评论时间 |
| `updateTime` | `string` | 否 | 更新时间 |

### CommentAddBody

只有评论提交接口保留 `phone` 字段。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | `string` | 是 | 昵称 |
| `email` | `string` | 是 | 邮箱 |
| `phone` | `string` | 否 | 手机号码 |
| `address` | `string` | 否 | 网址 |
| `wechat` | `string` | 否 | 微信 |
| `qq` | `string` | 否 | QQ |
| `content` | `string` | 是 | 评论内容 |
| `userId` | `string` | 是 | 匿名用户 id |
| `avatarUrl` | `string` | 否 | 头像文件名 |
| `captchaId` | `string` | 否 | 验证码 id |
| `verifyCode` | `string` | 否 | 验证码内容 |
| `commentName` | `string` | 否 | 当前文章标题 |
| `targetId` | `string` | 否 | 当前文章 id |
| `parentId` | `string \| null` | 否 | 回复父评论 id |
| `platformType` | `string` | 是 | 当前固定为 `pc` |

### ArticleLikeBody

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `userId` | `string` | 是 | 匿名用户 id |
| `platformType` | `string` | 是 | 当前固定为 `pc` |

### LetterItem

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `contentHtml` | `string` | 是 | 信件 HTML 内容 |
| `time` | `string` | 是 | 时间字符串 |

### SubscribeBody

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `email` | `string` | 是 | 订阅邮箱 |
| `userId` | `string` | 否 | 匿名用户 id |
| `captchaId` | `string` | 否 | 验证码 id |
| `verifyCode` | `string` | 否 | 验证码内容 |
| `platformType` | `string` | 是 | 当前固定为 `pc` |

## 接口清单

| 接口 | 方法 | 用途 |
| --- | --- | --- |
| `/api/v1/site` | `GET` | 获取站点信息 |
| `/api/v1/links` | `GET` | 获取友情链接 |
| `/api/v1/articles` | `GET` | 获取文章列表 |
| `/api/v1/articles/about` | `GET` | 获取关于页文章 |
| `/api/v1/articles/:id` | `GET` | 获取文章详情 |
| `/api/v1/articles/:id/comments` | `GET` | 获取评论列表 |
| `/api/v1/articles/:id/comments` | `POST` | 提交评论 |
| `/api/v1/articles/:id/like` | `POST` | 点赞文章 |
| `/api/v1/letters` | `GET` | 获取信件列表 |
| `/api/v1/subscriptions` | `POST` | 提交邮件订阅 |

## 详细接口说明

### 1. GET /api/v1/site

请求参数：无

返回示例：

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

请求参数：无

返回示例：

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

查询参数：

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page` | `number` | 否 | 默认 `1` |
| `size` | `number` | 否 | 默认由页面传入 |
| `sort` | `asc \| desc` | 否 | 排序方向 |
| `order` | `string` | 否 | 排序字段 |
| `typeId` | `number \| string` | 否 | 分类筛选 |
| `keyword` | `string` | 否 | 关键词搜索 |

返回示例：

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

请求参数：无

返回：

- `data` 结构为 `ArticleDetail`

### 5. GET /api/v1/articles/:id

路径参数：

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `string` | 文章 id |

返回：

- `data` 结构为 `ArticleDetail`

说明：

- 文章正文主字段为 `mdcontent`
- 详情头部会使用 `excerpt`、`createTime`、`readCounts`、`likeTotal`、`collectTotal`

### 6. GET /api/v1/articles/:id/comments

路径参数：

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `string` | 文章 id |

查询参数：

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page` | `number` | 否 | 默认 `1` |
| `size` | `number` | 否 | 默认由页面传入 |

返回示例：

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

路径参数：

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `string` | 文章 id |

请求体示例：

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

返回示例：

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 8. POST /api/v1/articles/:id/like

请求体示例：

```json
{
  "userId": "client-generated-guid",
  "platformType": "pc"
}
```

返回示例：

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 9. GET /api/v1/letters

查询参数：

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page` | `number` | 否 | 默认 `1` |
| `size` | `number` | 否 | 默认 `10` |

返回示例：

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

请求体示例：

```json
{
  "email": "alice@example.com",
  "userId": "client-generated-guid",
  "captchaId": "",
  "verifyCode": "1234",
  "platformType": "pc"
}
```

返回示例：

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

## 对接完成后的切换方式

1. 后端按本文档实现全部接口。
2. 将 `.env` 中的 `NUXT_PUBLIC_USE_MOCK` 改为 `false`。
3. 将 `NUXT_PUBLIC_API_BASE_URL` 改为真实后端主机地址。
4. 启动前端并联调。
