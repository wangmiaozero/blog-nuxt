export interface AlertOptions {
  content: string
  duration?: number
  type?: 'success' | 'warning' | 'info' | 'error' | 'zero'
  position?: 'left' | 'center' | 'right'
}

const ALERT_ID = 'lk__alert'

function removeAlertNode(): void {
  const oldAlert = document.getElementById(ALERT_ID)
  if (oldAlert?.parentNode) {
    oldAlert.parentNode.removeChild(oldAlert)
  }
}

export const alert = ({ content, duration = 3000, type = 'warning', position = 'left' }: AlertOptions): void => {
  if (typeof document === 'undefined') return

  removeAlertNode()

  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false

  const div = document.createElement('div')
  let backgroundColor = 'rgba(15, 23, 42, 0.92)'
  let color = '#fff'
  let borderColor = 'rgba(148, 163, 184, 0.18)'
  let boxShadow = '0 24px 64px rgba(15, 23, 42, 0.24)'
  let backdropFilter = 'blur(14px)'
  let top = isMobile ? 'calc(env(safe-area-inset-top, 0px) + 12px)' : '24px'
  let fontSize = isMobile ? '14px' : '16px'
  let minHeight = isMobile ? '52px' : '60px'
  let maxWidth = isMobile ? 'calc(100vw - 24px)' : 'min(560px, calc(100vw - 40px))'
  let padding = isMobile ? '14px 16px' : '16px 20px'
  let borderRadius = isMobile ? '14px' : '16px'
  let letterSpacing = '0.01em'

  switch (type) {
    case 'zero':
      backgroundColor = 'rgba(15, 23, 42, 0.92)'
      color = '#fff'
      borderColor = 'rgba(148, 163, 184, 0.18)'
      boxShadow = '0 24px 64px rgba(15, 23, 42, 0.32)'
      break
    case 'success':
      backgroundColor = 'rgba(240, 249, 235, 0.98)'
      color = '#2f7d32'
      borderColor = '#d9efc7'
      boxShadow = '0 18px 44px rgba(103, 194, 58, 0.16)'
      break
    case 'warning':
      backgroundColor = 'rgba(255, 245, 233, 0.98)'
      color = '#c76a00'
      borderColor = '#fde2bc'
      boxShadow = '0 18px 44px rgba(252, 150, 32, 0.14)'
      break
    case 'info':
      backgroundColor = 'rgba(237, 242, 252, 0.98)'
      color = '#556070'
      borderColor = '#d9e2f2'
      boxShadow = '0 18px 44px rgba(144, 147, 153, 0.12)'
      break
    case 'error':
      backgroundColor = 'rgba(254, 235, 235, 0.98)'
      color = '#d92d20'
      borderColor = '#fdcaca'
      boxShadow = '0 18px 44px rgba(249, 54, 54, 0.15)'
      break
    default:
      backgroundColor = 'rgba(255, 245, 233, 0.98)'
      color = '#c76a00'
      borderColor = '#fde2bc'
      boxShadow = '0 18px 44px rgba(252, 150, 32, 0.14)'
      break
  }

  switch (position) {
    case 'center':
      div.style.left = '50%'
      div.style.transform = 'translateX(-50%) translateY(-10px) scale(0.98)'
      break
    case 'right':
      div.style.right = isMobile ? '12px' : '24px'
      div.style.transform = 'translateY(-10px) scale(0.98)'
      break
    default:
      div.style.left = isMobile ? '12px' : '24px'
      div.style.transform = 'translateY(-10px) scale(0.98)'
      break
  }

  div.style.top = top
  div.style.transition = 'opacity 0.24s ease, transform 0.28s ease'
  div.style.backgroundColor = backgroundColor
  div.style.color = color
  div.style.boxSizing = 'border-box'
  div.style.position = 'fixed'
  div.style.zIndex = '9999999'
  div.style.opacity = '0'
  div.style.maxWidth = maxWidth
  div.style.minHeight = minHeight
  div.style.width = isMobile ? 'calc(100vw - 24px)' : 'auto'
  div.style.lineHeight = '1.6'
  div.style.borderColor = borderColor
  div.style.borderWidth = '1px'
  div.style.borderStyle = 'solid'
  div.style.borderRadius = borderRadius
  div.style.fontSize = fontSize
  div.style.fontWeight = '500'
  div.style.letterSpacing = letterSpacing
  div.style.textAlign = 'left'
  div.style.padding = padding
  div.style.boxShadow = boxShadow
  div.style.backdropFilter = backdropFilter
  div.style.webkitBackdropFilter = backdropFilter
  div.style.wordBreak = 'break-word'
  div.style.whiteSpace = 'pre-wrap'
  div.style.pointerEvents = 'none'
  div.style.display = 'flex'
  div.style.alignItems = 'center'
  div.style.gap = '10px'
  div.id = ALERT_ID
  div.className = 'lk__alert'
  div.setAttribute('role', 'alert')
  div.textContent = content

  document.body.appendChild(div)

  requestAnimationFrame(() => {
    if (!document.body.contains(div)) return
    div.style.opacity = '1'
    if (position === 'center') {
      div.style.transform = 'translateX(-50%) translateY(0) scale(1)'
    } else {
      div.style.transform = 'translateY(0) scale(1)'
    }
  })

  const close = () => {
    if (!document.body.contains(div)) return
    div.style.opacity = '0'
    if (position === 'center') {
      div.style.transform = 'translateX(-50%) translateY(-8px) scale(0.98)'
    } else {
      div.style.transform = 'translateY(-8px) scale(0.98)'
    }
    window.setTimeout(() => {
      if (document.body.contains(div)) {
        document.body.removeChild(div)
      }
    }, 220)
  }

  if (duration !== 0) {
    window.setTimeout(() => {
      close()
    }, duration)
  }
}

export default { alert }
