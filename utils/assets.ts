export const LOCAL_HOME_COVER_URLS = Array.from(
  { length: 27 },
  (_, index) => `/image/home/${index + 1}.jpg`,
)

export const LOCAL_LOGO_URLS = Array.from(
  { length: 4 },
  (_, index) => `/image/logo/logo${index + 1}.png`,
)

// `4.mp3` is not present in the repo right now, so we only use existing local tracks.
export const LOCAL_MP3_URLS = ['/mp3/0.mp3', '/mp3/1.mp3', '/mp3/2.mp3', '/mp3/3.mp3', '/mp3/5.mp3', '/mp3/6.mp3']

function pickRandomFromList(list: string[], current?: string | null): string {
  const pool = current ? list.filter((item) => item !== current) : list
  const source = pool.length ? pool : list
  return source[Math.floor(Math.random() * source.length)] ?? list[0] ?? ''
}

export function pickRandomHomeCover(current?: string | null): string {
  return pickRandomFromList(LOCAL_HOME_COVER_URLS, current)
}

export function pickRandomLogo(current?: string | null): string {
  return pickRandomFromList(LOCAL_LOGO_URLS, current)
}

export function pickSeededLocalMp3(seed: string | number): string {
  const text = String(seed ?? '')
  let hash = 0
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) & 0xffff
  }
  return LOCAL_MP3_URLS[Math.abs(hash) % LOCAL_MP3_URLS.length] ?? LOCAL_MP3_URLS[0] ?? ''
}
