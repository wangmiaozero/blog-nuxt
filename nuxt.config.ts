// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxtjs/color-mode'],

  css: ['~/assets/css/main.css', '~/assets/font/iconfont.css'],

  runtimeConfig: {
    public: {
      useMock: process.env.NUXT_PUBLIC_USE_MOCK !== 'false',
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:7001',
    },
  },

  nitro: {
    devProxy: {
      '/api': {
        target: process.env.BASE_URL || 'http://127.0.0.1:7001',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://127.0.0.1:7001/',
        changeOrigin: true,
      },
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  app: {
    head: {
      title: 'Libai',
      meta: [
        { charset: 'utf-8' },
        { name: 'Author', content: 'Libai' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
        {
          name: 'description',
          content:
            '世界上每个角落都有人过着相似的人生。愿所有的美好如约而至，愿所有的黑暗都能看到希望，我们都能微笑前行，人生没有完美，也许有些遗憾才美...',
        },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/image/logo/favicon.ico' }],
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  },
})
