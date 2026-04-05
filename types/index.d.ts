declare module '#app' {
  interface NuxtApp {
    $setScroll: (type: string, times?: number) => void
    $loadMore: (
      arg:
        | 'none'
        | { url: string; paramsData: Record<string, unknown> },
      cb?: (data: unknown) => void
    ) => void
    $loadStatus: (data: unknown[]) => void
    $throttle: (fn: (...args: unknown[]) => void, interval: number) => () => void
    $debounce: (fn: (...args: unknown[]) => void, interval: number) => () => void
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $setScroll: import('#app').NuxtApp['$setScroll']
    $loadMore: import('#app').NuxtApp['$loadMore']
    $loadStatus: import('#app').NuxtApp['$loadStatus']
    $throttle: import('#app').NuxtApp['$throttle']
    $debounce: import('#app').NuxtApp['$debounce']
  }
}

export {}
