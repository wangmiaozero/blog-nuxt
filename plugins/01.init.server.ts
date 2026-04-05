import { useMainStore } from '~/stores/main'

export default defineNuxtPlugin({
  name: 'init-server-store',
  dependsOn: ['pinia'],
  async setup(nuxtApp) {
    if (!import.meta.server) return
    const store = useMainStore(nuxtApp.$pinia)
    await store.nuxtServerInit()
  },
})
