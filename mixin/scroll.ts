// Scroll position mixin — tracks scroll position, direction, and bottom detection
export default {
  data() {
    return {
      scroll_current: null as number | null,
      scroll_isBottom: false,
      scrollFn: () => {},
      scroll_direction: null as 'top' | 'bottom' | null,
    }
  },
  beforeMount() {
    this.scrollFn = (this as any).$throttle((this as any).handleScroll, 150)
    window.addEventListener('scroll', (this as any).scrollFn, { passive: true })
    ;(this as any).handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', (this as any).scrollFn, { passive: true })
  },
  watch: {
    scroll_current(val: number | null, oldVal: number | null) {
      if (val === null || val === undefined || oldVal === null) return
      this.scroll_direction = val - oldVal < 0 ? 'top' : 'bottom'
    },
  },
  methods: {
    handleScroll() {
      const t = (this as any).getWin('scrollTop') as number
      const h = (this as any).getWin('scrollHeight') as number
      const windwH = (this as any).getWin('clientHeight') as number
      if (h === windwH) return // guard against route-change flash
      this.scroll_current = t
      this.scroll_isBottom = t + windwH >= h - 10
    },
    getWin(type: 'scrollTop' | 'scrollHeight' | 'clientHeight'): number {
      return (document.documentElement[type] || document.body[type]) as number
    },
  },
}
