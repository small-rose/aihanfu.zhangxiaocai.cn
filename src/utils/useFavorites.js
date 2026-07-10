const STORAGE_KEY = 'hanfu_favorites'
let cache = null

function load() {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    cache = raw ? JSON.parse(raw) : []
  } catch { cache = [] }
  return cache
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cache)) } catch {}
}

export function getFavorites(type) {
  const list = load()
  return type ? list.filter(f => f.type === type) : list
}

export function addFavorite(item) {
  const list = load()
  if (list.some(f => f.id === item.id)) return
  list.unshift({ ...item, createdAt: Date.now() })
  save()
}

export function removeFavorite(id) {
  const list = load()
  const idx = list.findIndex(f => f.id === id)
  if (idx >= 0) { list.splice(idx, 1); save() }
}

export function isFavorite(id) {
  return load().some(f => f.id === id)
}

export function clearFavorites(type) {
  if (type) { cache = load().filter(f => f.type !== type); save() }
  else { cache = []; save() }
}

export const FAVORITE_TYPES = [
  { key: 'all', label: '全部', icon: '📌' },
  { key: 'image', label: '图片', icon: '🖼️' },
  { key: 'color', label: '色彩', icon: '🎨' },
  { key: 'prompt', label: '提示词', icon: '✍️' },
  { key: 'palette', label: '配色卡', icon: '🎯' },
  { key: 'lexicon', label: '词库', icon: '📖' },
  { key: 'pattern', label: '纹样', icon: '🔄' }
]
