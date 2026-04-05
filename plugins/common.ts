import { useMainStore } from '~/stores/main'
import { useHttp } from '~/composables/http'

export default defineNuxtPlugin({
  name: 'common-props',
  dependsOn: ['pinia'],
  setup(nuxtApp) {
  const gp = nuxtApp.vueApp.config.globalProperties
  // Capture http client once in plugin setup (Nuxt context is available here)
  const http = useHttp()

  function getWin(type: 'scrollTop' | 'scrollHeight' | 'clientHeight') {
    if (!import.meta.client) return 0
    return (document.documentElement[type] || document.body[type]) as number
  }

  const Tween = {
    linear(t: number, b: number, c: number, d: number) {
      return (c * t) / d + b
    },
  }

  let timerScroll: ReturnType<typeof setInterval> | null = null

  gp.$setScroll = (type: string, times = 1000) => {
    if (!import.meta.client) return
    const startTime = Date.now()
    const typeList: Record<string, () => number> = {
      index: () => getWin('scrollTop') + getWin('clientHeight') / 2,
      article: () => 0,
      envelope: () => 0,
      message: () => 0,
      comment: () => {
        const form = document.querySelector('.comment-form') as HTMLElement | null
        if (!form) return 0
        const h = form.offsetHeight
        const t = form.offsetTop
        return t + h + 20 - getWin('clientHeight')
      },
      viewComment: () => {
        const comment = document.getElementById('comment')
        return comment ? comment.offsetTop : 0
      },
      top: () => 0,
    }

    const target = typeList[type]?.() ?? 0
    let beforeScroll = 0

    timerScroll = setInterval(() => {
      let curScroll = getWin('scrollTop')
      const curTime = Date.now()
      const t = times - Math.max(0, startTime - curTime + times)
      const value = Tween.linear(t, curScroll, target - curScroll, times)

      document.body.scrollTop = value
      document.documentElement.scrollTop = value
      curScroll = value

      let result: boolean | null = null
      if (type === 'comment' || type === 'viewComment') {
        result =
          (beforeScroll !== 0 && curScroll > beforeScroll) || curScroll <= target || curScroll === 0
      } else if (type === 'top') {
        result = curScroll === target || (beforeScroll !== 0 && curScroll > beforeScroll)
      } else {
        result = curScroll <= beforeScroll || curScroll === target
      }

      if (result && timerScroll) {
        clearInterval(timerScroll)
        timerScroll = null
      }

      beforeScroll = curScroll
    }, 25)
  }

  let page = 1
  let loadType = 'more'
  let loadTime: number | null = null

  function setLoadType(type: string) {
    const main = useMainStore(nuxtApp.$pinia)
    main.setStatus(type)
    loadType = type
    loadTime = null
  }

  gp.$loadMore = (arg1: unknown, arg2?: (err: unknown) => void) => {
    if (arg1 === 'none') {
      const main = useMainStore(nuxtApp.$pinia)
      main.setStatus('reset')
      page = 1
      loadType = 'more'
      return
    }

    const opts = arg1 as { url: string; paramsData: Record<string, unknown> }
    const callback = arg2 as ((data: unknown) => void) | undefined
    const { url, paramsData } = opts

    const main = useMainStore(nuxtApp.$pinia)
    if (main.status === 'reset') {
      page = 1
      loadType = 'more'
    } else {
      page += 1
    }

    if (loadType === 'loading' || loadType === 'nomore') {
      return
    }

    setLoadType('loading')
    loadTime = Date.now()

    if (page < 1) page = 1
    const params = { page, ...paramsData }

    http.get<{ list: unknown[]; pagination: { total: number } }>(url, params as Record<string, unknown>).then((res) => {
      const inner = res.data
      if (!inner?.pagination || !inner.list) {
        page--
        setLoadType('more')
        return
      }

      const pagination = inner.pagination
      const list = inner.list
      const a = Math.ceil(pagination.total / (paramsData.size as number))
      const result = page <= a ? 'more' : 'nomore'

      if (!list.length) {
        setLoadType('nomore')
      }

      let timer = 500 - Date.now() + (loadTime || 0)
      if (timer < 0) timer = 0

      setTimeout(() => {
        callback?.(res)
        setLoadType(result)
        if (import.meta.client) {
          gp.$setScroll('index')
        }
      }, timer)
    }).catch(() => {
      page--
      setLoadType('more')
    })
  }

  gp.$loadStatus = (data: unknown[]) => {
    if (!data?.length) {
      setLoadType('nomore')
    }
  }

  const listenList: { el: Element; src: string }[] = []
  const lazyScrollOpts: AddEventListenerOptions = { passive: true }

  function lazyLoad(item: { el: Element; src: string }) {
    const { el, src } = item
    const info = el.getBoundingClientRect()
    const show = info.bottom + 100 > 0 && info.top - getWin('clientHeight') < 0
    if (src && show) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        if (el instanceof HTMLImageElement) {
          el.src = src
        }
        const index = listenList.indexOf(item)
        if (index > -1) listenList.splice(index, 1)
        if (listenList.length === 0 && import.meta.client) {
          window.removeEventListener('scroll', watchLazy, lazyScrollOpts)
        }
      }
    }
  }

  function watchLazy() {
    gp.$throttle(() => listenList.map((i) => lazyLoad(i)), 100)()
  }

  nuxtApp.vueApp.directive('lazy', {
    mounted(el, binding) {
      if (!import.meta.client) return
      const src = binding.value as string
      if (src) {
        listenList.push({ el, src })
        window.addEventListener('scroll', watchLazy, lazyScrollOpts)
        lazyLoad({ el, src })
      }
    },
  })

  gp.$throttle = (fn: (...args: unknown[]) => void, interval: number) => {
    let flag = true
    return (...args: unknown[]) => {
      if (flag) {
        flag = false
        setTimeout(() => {
          fn.apply(null, args)
          flag = true
        }, interval)
      }
    }
  }

  gp.$debounce = (fn: (...args: unknown[]) => void, interval: number) => {
    let timer: ReturnType<typeof setTimeout> | null = null
    return (...args: unknown[]) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(null, args)
      }, interval)
    }
  }
  },
})
