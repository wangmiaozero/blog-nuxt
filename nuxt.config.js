
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'Author', content: 'Libai' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'image/logo/favicon.ico' }
    ]
  },
  server: {
    port: 3000
  },
  env: {
   baseUrl: process.env.BASE_URL || 'http://server:3000/web/api',
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/color-mode'
  ],
   /* 需要使用 aixos必须配置以下两项axios和proxy*/
  axios: {
    proxy: true,
    prefix: '/api', // baseURL
    credentials: true,
  },
  proxy: {
    '/api': {
      target: process.env.BASE_URL ||'http://127.0.0.1:7001',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      },
    },
    '/uploads': {
      target: 'http://127.0.0.1:7001/',
      changeOrigin: true,
    },
  }, 
  loading: '~/components/LoadingTab.vue',
  css: ["~assets/css/main.css", "~assets/font/iconfont.css"],
  plugins: [
    { src: '@/plugins/axios.js', ssr: true },
    { src: '@/plugins/common.js', ssr: true },
    { src: '@/plugins/component.js', ssr: true },
    { src: '@/plugins/router.js', ssr: false },// 前端
  ]
}
