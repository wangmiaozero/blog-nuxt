export function newGuid(): string {
  let guid = ''
  for (let i = 1; i <= 32; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16)
    guid += n
    if (i === 8 || i === 12 || i === 16 || i === 20) guid += '-'
  }
  return guid
}

export const groupBy = <T>(array: T[], f: (item: T) => string): T[][] => {
  const groups: Record<string, T[]> = {}
  array.forEach((o) => {
    const group = formdataTime(f(o), 'YYYY-MM')
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  return Object.keys(groups).map((group) => groups[group])
}

export const formdataTime = (params: string, type: 'YYYY-MM-DD' | 'YYYY-MM' = 'YYYY-MM-DD'): string => {
  if (type === 'YYYY-MM-DD') {
    return params.split(' ')[0]
  }
  const time = params.split(' ')[0].split('-')
  return `${time[0]}-${time[1]}`
}

export const stringVerification = (str: string): boolean => {
  return /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(str)
}

export const emailVerification = (str: string): boolean => {
  return /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(str)
}

export const checkURL = (url: string): boolean => {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/.test(url)
}

export const randomNun = (m: number, n: number): number => {
  return Math.floor(Math.random() * (m - n) + n)
}

export const DEFAULT_COMMENT_AVATAR = '4.jpg'

export function normalizeCommentAvatarName(avatarUrl: string): string {
  // Accept any valid 1-10 avatar filename; fall back to default
  if (!avatarUrl) return DEFAULT_COMMENT_AVATAR
  const name = avatarUrl.split('/').pop() || ''
  const match = name.match(/^(\d+)\.jpg$/)
  if (match) {
    const n = parseInt(match[1])
    if (n >= 1 && n <= 10) return name
  }
  return DEFAULT_COMMENT_AVATAR
}

export function getCommentAvatarSrc(avatarUrl: string): string {
  return `/image/comment/${normalizeCommentAvatarName(avatarUrl)}`
}

export function orderBy<T extends Record<string, unknown>>(list: T[], key: string): T[] {
  return list.sort((a, b) => (a[key] as number) - (b[key] as number))
}

export interface TreeNode {
  id: string
  parentId: string | null
  orderNum?: number
  children?: TreeNode[]
  [key: string]: unknown
}

export function deepTree<T extends TreeNode>(list: T[]): T[] {
  const newList: T[] = []
  const map: Record<string, T> = {}

  list.forEach((e) => (map[e.id] = e))

  list.forEach((e) => {
    const parent = map[e.parentId as string]
    if (parent) {
      ;(parent.children || (parent.children = [])).push(e)
    } else {
      newList.push(e)
    }
  })

  const fn = (items: T[]) => {
    items.forEach((e) => {
      if (Array.isArray(e.children)) {
        e.children = orderBy(e.children as T[], 'orderNum')
        fn(e.children as T[])
      }
    })
  }

  fn(newList)
  return orderBy(newList, 'orderNum')
}

export function dateFormat(): string {
  const date = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export interface UserInfoStorage {
  name: string
  email: string
  address: string
  wechat: string
  qq: string
  content: string
  userId: string
  avatarUrl: string
}

export function initUserInfo(userInfo?: Partial<UserInfoStorage>): void {
  const defaults: UserInfoStorage = {
    name: '',
    email: '',
    address: '',
    wechat: '',
    qq: '',
    content: '',
    userId: newGuid(),
    avatarUrl: DEFAULT_COMMENT_AVATAR,
  }
  try {
    if (userInfo) {
      const merged = { ...defaults, ...userInfo, content: '', avatarUrl: normalizeCommentAvatarName(userInfo.avatarUrl || '') }
      localStorage.setItem('_userInfo', JSON.stringify(merged))
    } else {
      localStorage.setItem('_userInfo', JSON.stringify(defaults))
    }
  } catch {
    localStorage.setItem('_userInfo', JSON.stringify(defaults))
  }
}

export function randomImg(): string {
  const n = randomNun(100000, 999999)
  return `https://picsum.photos/seed/tool-rnd-${n}/800/450`
}

export function randomImgFromSeed(seed: string): string {
  const s = String(seed).replace(/[^a-zA-Z0-9_-]/g, '') || '0'
  return `https://picsum.photos/seed/${s}/800/450`
}

export default {
  newGuid,
  groupBy,
  formdataTime,
  stringVerification,
  emailVerification,
  checkURL,
  randomNun,
  orderBy,
  deepTree,
  dateFormat,
  initUserInfo,
  randomImg,
  randomImgFromSeed,
  DEFAULT_COMMENT_AVATAR,
  normalizeCommentAvatarName,
  getCommentAvatarSrc,
}
