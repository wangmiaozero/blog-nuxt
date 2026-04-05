// Standard API response envelope
export const API_SUCCESS_CODE = 200

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface Pagination {
  page: number
  size: number
  total: number
}

// ─── Site / User ────────────────────────────────────────────────────────────

export interface SiteInfo {
  webName: string
  webDescribe?: string
  webAddress?: string
  webSeo?: string
  icpTxt?: string
  icpLink?: string
  nickName?: string
  headImg?: string
}

// ─── Links (blogroll) ────────────────────────────────────────────────────────

export interface LinkItem {
  id?: string
  name: string
  url: string
  description?: string
  avatar?: string
}

// ─── Articles ────────────────────────────────────────────────────────────────

export interface ArticleListItem {
  id: string
  typeId?: number
  title: string
  author?: string
  excerpt?: string
  readCounts?: number
  typeName?: string
  createTime?: string
  updateTime?: string
  isPrivacy?: number
  listPic?: string | null
  music?: string | null
  collectTotal?: number | null
  likeTotal?: number | null
}

export interface ArticlePageData {
  list: ArticleListItem[]
  pagination: Pagination
}

export interface ArticleListQuery {
  page?: number
  size?: number
  sort?: 'asc' | 'desc'
  order?: string
  typeId?: number | string
  keyword?: string
}

export interface ArticleDetail extends ArticleListItem {
  mdcontent?: string
  content?: string
  isShow?: number
  shareCode?: string
  isTop?: number
}

// ─── Comments ────────────────────────────────────────────────────────────────

export interface CommentItem {
  id: string
  name: string
  avatarUrl?: string
  targetId: string
  parentId: string | null
  commentName?: string
  content: string
  platformType?: string
  topStatus?: number
  createTime?: string
  updateTime?: string
  children?: CommentItem[]
}

export interface CommentPageData {
  list: CommentItem[]
  pagination: Pagination
}

export interface CommentAddBody {
  name: string
  email: string
  content: string
  parentId?: string | null
  phone?: string
  address?: string
  wechat?: string
  qq?: string
  avatarUrl?: string
  userId: string
  captchaId?: string
  verifyCode?: string
  platformType: string
}

export interface ArticleLikeBody {
  userId: string
  platformType: string
}

// ─── Letters (envelope) ──────────────────────────────────────────────────────

export interface LetterItem {
  contentHtml: string
  time: string
}

export interface LetterPageData {
  list: LetterItem[]
  pagination: Pagination
}

// ─── Subscriptions ───────────────────────────────────────────────────────────

export interface SubscribeBody {
  email: string
  userId?: string
  captchaId?: string
  verifyCode?: string
  platformType: string
}

// ─── API Path Constants ───────────────────────────────────────────────────────

export const ApiPaths = {
  site: '/api/v1/site',
  links: '/api/v1/links',
  articles: '/api/v1/articles',
  articleAbout: '/api/v1/articles/about',
  articleDetail: (id: string) => `/api/v1/articles/${id}`,
  articleComments: (id: string) => `/api/v1/articles/${id}/comments`,
  articleLike: (id: string) => `/api/v1/articles/${id}/like`,
  letters: '/api/v1/letters',
  subscriptions: '/api/v1/subscriptions',
} as const
