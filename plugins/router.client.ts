export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const gp = nuxtApp.vueApp.config.globalProperties

  router.afterEach(() => {
    setTimeout(() => {
      const el = document.querySelector('.loader') as HTMLElement | null
      if (el) el.style.display = 'none'
    }, 1000)
  })

  router.beforeEach((to, from) => {
    const el = document.querySelector('.loader') as HTMLElement | null
    if (el) el.style.display = 'block'

    if (['index', 'article', 'envelope', 'articleId'].includes(String(from.name))) {
      gp.$loadMore?.('none')
    }
  })
})
