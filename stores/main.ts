import { defineStore } from 'pinia'
import type { SiteInfo } from '~/types/api'

export const useMainStore = defineStore('main', {
  state: () => ({
    siteInfo: null as SiteInfo | null,
    blogrollList: [] as unknown[],
    index: false,
    status: 'more' as string,
    dark: false,
    keyWord: '',
  }),

  getters: {
    /** Alias kept for backward compat with pages that read userInfo.webName etc. */
    userInfo(state): SiteInfo | null {
      return state.siteInfo
    },
  },

  actions: {
    setSiteInfo(val: SiteInfo | null) {
      this.siteInfo = val
    },
    setDark(val: boolean) {
      this.dark = val
    },
    setBlogrollList(val: unknown[]) {
      this.blogrollList = val
    },
    isIndex(val?: boolean) {
      this.index = val !== undefined ? val : true
    },
    setStatus(val: string) {
      this.status = val
    },
    setKeyWord(val: string) {
      this.keyWord = val
    },
    toggleDark() {
      const colorMode = useColorMode()
      const nextDark = colorMode.value !== 'dark'
      this.dark = nextDark
      colorMode.preference = nextDark ? 'dark' : 'light'
    },

    async nuxtServerInit() {
      const config = useRuntimeConfig()
      const useMock = config.public.useMock as boolean
      if (useMock) {
        const { getMockResponse } = await import('~/mock/index')
        const siteRes = getMockResponse<SiteInfo>('/api/v1/site')
        const linksRes = getMockResponse<unknown[]>('/api/v1/links')
        if (siteRes.code === 200 && siteRes.data) this.setSiteInfo(siteRes.data)
        if (linksRes.code === 200 && Array.isArray(linksRes.data)) this.setBlogrollList(linksRes.data)
      } else {
        const baseUrl = config.public.apiBaseUrl as string
        const [siteRes, linksRes] = await Promise.all([
          $fetch<{ code: number; data: SiteInfo }>(`${baseUrl}/api/v1/site`).catch(() => null),
          $fetch<{ code: number; data: unknown[] }>(`${baseUrl}/api/v1/links`).catch(() => null),
        ])
        if (siteRes?.code === 200 && siteRes.data) this.setSiteInfo(siteRes.data)
        if (linksRes?.code === 200 && Array.isArray(linksRes.data)) this.setBlogrollList(linksRes.data)
      }
    },
  },
})
