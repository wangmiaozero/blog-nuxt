/**
 * Unified HTTP client.
 * When useMock is true (default), all requests are served from local mock data.
 * When useMock is false, requests go to the real API at apiBaseUrl.
 *
 * Can be called from setup(), plugins, useAsyncData, or component methods.
 */
import type { ApiResponse } from '~/types/api'

function getConfig() {
  try {
    // Works in setup() and useAsyncData
    const config = useRuntimeConfig()
    return {
      useMock: (config.public.useMock ?? true) as boolean,
      baseUrl: (config.public.apiBaseUrl ?? '') as string,
    }
  } catch {
    // Fallback for component methods / outside Nuxt context
    try {
      const app = useNuxtApp()
      const pub = app.$config?.public ?? {}
      return {
        useMock: (pub.useMock ?? true) as boolean,
        baseUrl: (pub.apiBaseUrl ?? '') as string,
      }
    } catch {
      return { useMock: true, baseUrl: '' }
    }
  }
}

export function useHttp() {
  const { useMock, baseUrl } = getConfig()

  async function get<T>(path: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    if (useMock) {
      const { getMockResponse } = await import('~/mock/index')
      return getMockResponse<T>(path, params)
    }
    const query = params
      ? '?' + new URLSearchParams(
          Object.fromEntries(
            Object.entries(params)
              .filter(([, v]) => v !== undefined && v !== null && v !== '')
              .map(([k, v]) => [k, String(v)])
          )
        ).toString()
      : ''
    return $fetch<ApiResponse<T>>(`${baseUrl}${path}${query}`)
  }

  async function post<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
    if (useMock) {
      const { getMockPostResponse } = await import('~/mock/index')
      return getMockPostResponse<T>(path, body)
    }
    return $fetch<ApiResponse<T>>(`${baseUrl}${path}`, { method: 'POST', body })
  }

  return { get, post }
}
