import type {
  ApiResponse,
  SiteInfo,
  LinkItem,
  ArticleListItem,
  ArticlePageData,
  ArticleListQuery,
  ArticleDetail,
  CommentPageData,
  CommentAddBody,
  ArticleLikeBody,
  LetterPageData,
  SubscribeBody,
} from '~/types/api'
import { useHttp } from '~/composables/http'

// ─── Site ────────────────────────────────────────────────────────────────────

export function useSiteApi() {
  const http = useHttp()
  return {
    getSiteInfo: () => http.get<SiteInfo>('/api/v1/site'),
    getLinks: () => http.get<LinkItem[]>('/api/v1/links'),
  }
}

// ─── Articles ─────────────────────────────────────────────────────────────────

export function useArticlesApi() {
  const http = useHttp()
  return {
    getArticles: (query?: ArticleListQuery) =>
      http.get<ArticlePageData>('/api/v1/articles', query as Record<string, unknown>),
    getArticleAbout: () => http.get<ArticleDetail>('/api/v1/articles/about'),
    getArticleById: (id: string) => http.get<ArticleDetail>(`/api/v1/articles/${id}`),
    likeArticle: (id: string, body: ArticleLikeBody) =>
      http.post<null>(`/api/v1/articles/${id}/like`, body),
  }
}

// ─── Comments ─────────────────────────────────────────────────────────────────

export function useCommentsApi() {
  const http = useHttp()
  return {
    getComments: (articleId: string, page = 1, size = 15) =>
      http.get<CommentPageData>(`/api/v1/articles/${articleId}/comments`, { page, size }),
    addComment: (articleId: string, body: CommentAddBody) =>
      http.post<null>(`/api/v1/articles/${articleId}/comments`, body),
  }
}

// ─── Letters ──────────────────────────────────────────────────────────────────

export function useLettersApi() {
  const http = useHttp()
  return {
    getLetters: (page = 1, size = 10) =>
      http.get<LetterPageData>('/api/v1/letters', { page, size }),
  }
}

// ─── Subscriptions ────────────────────────────────────────────────────────────

export function useSubscriptionsApi() {
  const http = useHttp()
  return {
    subscribe: (body: SubscribeBody) => http.post<null>('/api/v1/subscriptions', body),
  }
}
