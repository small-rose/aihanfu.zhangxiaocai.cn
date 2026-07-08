<template>
  <view class="page-layout">
    <TopNav current="gallery" />
    <view class="content">
      <view class="page-header">
        <text class="page-title">灵感图库</text>
        <view class="search-wrap"><input class="search-input" placeholder="搜索图片..." v-model="searchKeyword" /></view>
      </view>

      <view class="toolbar">
        <view class="filter-group">
          <view v-for="f in filters" :key="f.key"
            class="filter-chip" :class="{ active: activeFilter === f.key }"
            @tap="onFilter(f.key)">{{ f.label }} ({{ f.count }})</view>
        </view>
        <view class="layout-group">
          <view v-for="m in modes" :key="m.key"
            class="layout-chip" :class="{ active: layoutMode === m.key }"
            @tap="switchLayout(m.key)">{{ m.icon }} {{ m.label }}</view>
        </view>
      </view>

      <view class="page-divider"></view>

      <!-- ===== GRID ===== -->
      <view v-show="layoutMode === 'grid'" v-if="filtered.length" class="gallery-grid">
        <view v-for="(img, i) in filtered" :key="img.id" class="gallery-item" :class="{ skeleton: !loadedImgs.has(img.id) }" :data-img-id="img.id" @tap="openDetail(img)">
          <image class="gallery-img" :class="{ 'img-loaded': loadedImgs.has(img.id) }" :src="visibleImgs.has(img.id) ? img.src : ''" mode="aspectFill" @load="onImgLoad(img.id)" />
          <view class="gallery-overlay">
            <view class="overlay-badges"><text class="badge dynasty-tag">{{ img.dynasty }}</text></view>
            <text class="overlay-title">{{ img.title }}</text>
            <text class="gallery-tags">{{ img.tags.slice(0, 5).join(' · ') }}</text>
          </view>
        </view>
      </view>

      <!-- ===== HANDSCROLL ===== -->
      <view v-show="layoutMode === 'scroll'" v-if="filtered.length" class="scroll-layout">
        <view v-for="d in dynasties" :key="d.key" :id="'sec-'+d.key" class="scroll-section">
          <view class="scroll-hdr">
            <view class="roller left"></view>
            <text class="scroll-dynasty-title">{{ d.label }}手卷</text>
            <view class="roller right"></view>
          </view>
          <view class="scroll-track-wrap">
            <view class="wooden-roller left">
              <view class="roller-knob top"></view>
              <view class="roller-shaft"></view>
              <view class="roller-knob bottom"></view>
            </view>
            <view class="scroll-paper"
              :id="'paper-'+d.key">
              <template v-for="copy in copies" :key="copy">
                <view class="scroll-card scroll-title-card" :class="'seal-' + d.key">
                  <view class="scroll-card-inner">
                    <view class="card-img-frame title-frame">
                      <text class="title-text">{{ d.label }}手卷</text>
                      <text class="scroll-title-seal" :style="sealStyle(d.key)">{{ d.label }}</text>
                    </view>
                  </view>
                </view>
                <view v-for="img in getDynastyImages(d.key)" :key="img.id + '-' + copy" :data-img-id="img.id"
                  class="scroll-card" @click="openDetail(img)">
                  <view class="scroll-card-inner">
                    <view class="card-img-frame" :class="{ skeleton: !loadedImgs.has(img.id) }">
                      <image class="card-img" :class="{ 'img-loaded': loadedImgs.has(img.id) }" :src="visibleImgs.has(img.id) ? img.src : ''" mode="aspectFill" @load="onImgLoad(img.id)" />
                    </view>
                    <view class="card-caption">
                      <view class="caption-inner">
                        <view class="cap-seg"><text class="cap-dynasty">{{ img.dynasty }}</text></view>
                        <view class="cap-line"></view>
                        <view class="cap-seg"><text class="cap-color">{{ img.analysis?.colors?.[0] || '' }}</text></view>
                        <view class="cap-line"></view>
                        <view class="cap-seg"><text class="cap-clothing">{{ img.analysis?.clothing?.[0] || '' }}</text></view>
                      </view>
                    </view>
                  </view>
                </view>
              </template>
            </view>
            <view class="wooden-roller right">
              <view class="roller-knob top"></view>
              <view class="roller-shaft"></view>
              <view class="roller-knob bottom"></view>
            </view>
          </view>
        </view>
      </view>

      <!-- ===== ALBUM (3D 册页) ===== -->
      <view v-show="layoutMode === 'album'" v-if="filtered.length" class="album-layout">
        <view class="album-book">
          <view class="album-page page-left">
            <view class="page-flipper left-flipper" :class="{ active: isFlipping && flipDir === 'prev' }"
              @transitionend="onFlipEnd">
              <view class="page-face page-front">
                <transition name="page" mode="out-in">
                  <view class="page-content" v-if="currentLeft" :key="pageKey(currentLeft)">
                    <view v-if="currentLeft.type === 'title'" class="page-title-wrap">
                      <view class="title-paper">
                        <text class="title-chinese">{{ currentLeft.dynasty }}画册</text>
                        <view class="album-title-seal" :class="'seal-' + currentLeft.dynasty">{{ currentLeft.dynasty }}</view>
                      </view>
                    </view>
                    <view v-else class="page-img-wrap">
                      <text class="page-watermark">{{ currentLeft.item.dynasty }}</text>
                      <view class="mounting-frame">
                        <view class="mounting-inner" :class="{ skeleton: !loadedImgs.has(currentLeft.item.id) }">
                          <image class="page-img" :class="{ 'img-loaded': loadedImgs.has(currentLeft.item.id) }" :src="currentLeft.item.src" mode="aspectFill" @load="onImgLoad(currentLeft.item.id)" />
                        </view>
                        <view class="mounting-bottom">
                          <view class="mb-row">
                            <text class="label-dynasty">{{ currentLeft.item.dynasty }}</text>
                            <text class="label-sep">·</text>
                            <text class="label-fabric">{{ currentLeft.item.analysis?.fabric?.join(' · ') || '' }}</text>
                            <text class="label-sep">·</text>
                            <text class="label-color">{{ currentLeft.item.analysis?.colors?.[0] || '' }}</text>
                          </view>
                          <view class="mb-row">
                            <text class="label-clothing">{{ topBottom(currentLeft.item) }}</text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </view>
                </transition>
              </view>
              <view class="page-face page-back">
                <transition name="page" mode="out-in">
                  <view class="page-content" v-if="prevRight" :key="pageKey(prevRight)">
                    <view v-if="prevRight.type === 'title'" class="page-title-wrap">
                      <view class="title-paper">
                        <text class="title-chinese">{{ prevRight.dynasty }}画册</text>
                        <view class="album-title-seal" :class="'seal-' + prevRight.dynasty">{{ prevRight.dynasty }}</view>
                      </view>
                    </view>
                    <view v-else class="page-img-wrap">
                      <text class="page-watermark">{{ prevRight.item.dynasty }}</text>
                      <view class="mounting-frame">
                        <view class="mounting-inner" :class="{ skeleton: !loadedImgs.has(prevRight.item.id) }">
                          <image class="page-img" :class="{ 'img-loaded': loadedImgs.has(prevRight.item.id) }" :src="prevRight.item.src" mode="aspectFill" @load="onImgLoad(prevRight.item.id)" />
                        </view>
                        <view class="mounting-bottom">
                          <view class="mb-row">
                            <text class="label-dynasty">{{ prevRight.item.dynasty }}</text>
                            <text class="label-sep">·</text>
                            <text class="label-fabric">{{ prevRight.item.analysis?.fabric?.join(' · ') || '' }}</text>
                            <text class="label-sep">·</text>
                            <text class="label-color">{{ prevRight.item.analysis?.colors?.[0] || '' }}</text>
                          </view>
                          <view class="mb-row">
                            <text class="label-clothing">{{ topBottom(prevRight.item) }}</text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </view>
                  <view v-else class="page-empty" :key="'empty'">—</view>
                </transition>
              </view>
            </view>
            <view class="page-shadow left-shadow" :class="{ active: isFlipping && flipDir === 'next' }"></view>
          </view>
          <view class="album-spine"></view>
          <view class="album-page page-right">
            <view class="page-flipper right-flipper" :class="{ active: isFlipping && flipDir === 'next' }"
              @transitionend="onFlipEnd">
              <view class="page-face page-front">
                <transition name="page" mode="out-in">
                  <view class="page-content" v-if="currentRight" :key="pageKey(currentRight)">
                    <view v-if="currentRight.type === 'title'" class="page-title-wrap">
                      <view class="title-paper">
                        <text class="title-chinese">{{ currentRight.dynasty }}画册</text>
                        <view class="album-title-seal" :class="'seal-' + currentRight.dynasty">{{ currentRight.dynasty }}</view>
                      </view>
                    </view>
                    <view v-else-if="currentRight.type === 'end'" class="page-title-wrap">
                      <view class="title-paper">
                        <text class="title-chinese">画册完</text>
                      </view>
                    </view>
                    <view v-else class="page-img-wrap">
                      <text class="page-watermark">{{ currentRight.item.dynasty }}</text>
                      <view class="mounting-frame">
                        <view class="mounting-inner" :class="{ skeleton: !loadedImgs.has(currentRight.item.id) }">
                          <image class="page-img" :class="{ 'img-loaded': loadedImgs.has(currentRight.item.id) }" :src="currentRight.item.src" mode="aspectFill" @load="onImgLoad(currentRight.item.id)" />
                        </view>
                        <view class="mounting-bottom">
                          <view class="mb-row">
                            <text class="label-dynasty">{{ currentRight.item.dynasty }}</text>
                            <text class="label-sep">·</text>
                            <text class="label-fabric">{{ currentRight.item.analysis?.fabric?.join(' · ') || '' }}</text>
                            <text class="label-sep">·</text>
                            <text class="label-color">{{ currentRight.item.analysis?.colors?.[0] || '' }}</text>
                          </view>
                          <view class="mb-row">
                            <text class="label-clothing">{{ topBottom(currentRight.item) }}</text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </view>
                </transition>
              </view>
              <view class="page-face page-back">
                <transition name="page" mode="out-in">
                  <view class="page-content" v-if="nextLeft" :key="pageKey(nextLeft)">
                    <view v-if="nextLeft.type === 'title'" class="page-title-wrap">
                      <view class="title-paper">
                        <text class="title-chinese">{{ nextLeft.dynasty }}画册</text>
                        <view class="album-title-seal" :class="'seal-' + nextLeft.dynasty">{{ nextLeft.dynasty }}</view>
                      </view>
                    </view>
                    <view v-else class="page-img-wrap">
                      <text class="page-watermark">{{ nextLeft.item.dynasty }}</text>
                      <view class="mounting-frame">
                        <view class="mounting-inner" :class="{ skeleton: !loadedImgs.has(nextLeft.item.id) }">
                          <image class="page-img" :class="{ 'img-loaded': loadedImgs.has(nextLeft.item.id) }" :src="nextLeft.item.src" mode="aspectFill" @load="onImgLoad(nextLeft.item.id)" />
                        </view>
                        <view class="mounting-bottom">
                          <view class="mb-row">
                            <text class="label-dynasty">{{ nextLeft.item.dynasty }}</text>
                            <text class="label-sep">·</text>
                            <text class="label-fabric">{{ nextLeft.item.analysis?.fabric?.join(' · ') || '' }}</text>
                            <text class="label-sep">·</text>
                            <text class="label-color">{{ nextLeft.item.analysis?.colors?.[0] || '' }}</text>
                          </view>
                          <view class="mb-row">
                            <text class="label-clothing">{{ topBottom(nextLeft.item) }}</text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </view>
                  <view v-else class="page-empty" :key="'empty'">—</view>
                </transition>
              </view>
            </view>
            <view class="page-shadow right-shadow" :class="{ active: isFlipping && flipDir === 'prev' }"></view>
          </view>
        </view>
        <view class="album-hit-left" @tap="prevAlbum"></view>
        <view class="album-hit-right" @tap="nextAlbum"></view>
        <view class="album-footer">
          <text class="album-info">第 {{ spreadIdx + 1 }} 开 · {{ spreadIdx + 1 }} / {{ spreads.length }}</text>
        </view>
      </view>

      <!-- ===== STACK ===== -->
      <view v-show="layoutMode === 'stack'" v-if="filtered.length" class="stack-layout">
        <view class="stack-scene" id="stack-scene">
          <view v-for="(img, i) in filtered" :key="img.id"
            class="stack-card"
            :class="{ skeleton: !loadedImgs.has(img.id) }"
            :style="stackStyle(i)" @tap="openCard(i)"
            :id="'stack-card-' + i"
          >
            <image class="stack-img" :class="{ 'img-loaded': loadedImgs.has(img.id) }" :src="img.src" mode="aspectFill" @load="onImgLoad(img.id)" />
          </view>
        </view>
        <view class="stack-bar">
          <text class="stack-hint">桌面散落着{{ filtered.length }}张画片</text>
          <view class="stack-draw-btn" @tap="drawCard">抽卡</view>
        </view>
      </view>

      <view v-if="stackModal !== null" class="stack-modal-overlay" @tap="closeCard">
          <view class="stack-modal" :style="cardFrameStyle(filtered[stackModal].dynasty)" @tap.stop>
          <image class="stack-modal-img" :class="{ skeleton: !loadedImgs.has(filtered[stackModal].id), 'img-loaded': loadedImgs.has(filtered[stackModal].id) }" :src="filtered[stackModal].src" mode="widthFix" @load="onImgLoad(filtered[stackModal].id)" />
          <view class="stack-modal-info">
            <text class="stack-modal-dynasty">{{ filtered[stackModal].dynasty }}</text>
            <text class="stack-modal-title">{{ filtered[stackModal].title }}</text>
            <text class="stack-modal-tags">{{ filtered[stackModal].tags?.slice(0, 4).join(' · ') }}</text>
            <text class="stack-modal-detail" @tap.stop="openDetail(filtered[stackModal])">查看详情</text>
          </view>
          <view class="stack-modal-border"></view>
        </view>
      </view>

      <view v-if="!filtered.length" class="empty-state">
        <text class="empty-icon">🖼️</text>
        <text class="empty-text">暂无匹配图片</text>
        <Button variant="primary" @click="goPrompter">前往组合器</Button>
      </view>
    </view>
    <Footer />
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import Button from '../components/Button.vue'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'
import { galleryData } from '../data/gallery-data.js'

// 图片骨架屏：loadedImgs 记录已加载完成的图片 id，驱动 skeleton / img-loaded 类切换
const loadedImgs = reactive(new Set())
function onImgLoad(id) { loadedImgs.add(id) }

// 懒加载：visibleImgs 记录已进入可视区的图片 id，控制 :src 是否绑定真实 URL
const visibleImgs = reactive(new Set())
let lazyObserver = null

function initLazyObserver() {
  if (lazyObserver) lazyObserver.disconnect()
  lazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      if (entry.target.dataset.imgId) visibleImgs.add(entry.target.dataset.imgId)
    })
  }, { rootMargin: '200px' })
}

function observeVisible() {
  if (!lazyObserver) return
  nextTick(() => {
    document.querySelectorAll('[data-img-id]').forEach(el => lazyObserver.observe(el))
  })
}

function disconnectObserver() {
  if (lazyObserver) { lazyObserver.disconnect(); lazyObserver = null }
}

const layoutMode = ref('scroll')
const activeFilter = ref('all')
const searchKeyword = ref('')
const albumIdx = ref(0)
const albumDir = ref('next')
const stackModal = ref(null)
const stackPositions = ref([])
const spreadIdx = ref(0)
const isFlipping = ref(false)
const flipDir = ref('next')
let autoScrollRAF = {}
let autoScrollDisabled = {}
let wheelHandlers = {}
let scrollVelocity = {}
let scrollRaf = {}
let midFlipTimer = null

const modes = [
  { key: 'scroll', icon: '⟳', label: '手卷' },
  { key: 'album', icon: '📖', label: '册页' },
  { key: 'stack', icon: '⊟', label: '层叠' },
  { key: 'grid', icon: '⊞', label: '网格' },
]

const dynasties = [
  { key: '唐', label: '唐' },
  { key: '宋', label: '宋' },
  { key: '明', label: '明' },
]
const sealPositions = {}
dynasties.forEach(d => {
  sealPositions[d.key] = {
    top: 28 + Math.random() * 38,
    left: 45 + Math.random() * 10,
  }
})
// 无缝循环：模板渲染两份内容，滚到交界处跳回（画面一致）
const copies = [0, 1]
function sealStyle(key) {
  const p = sealPositions[key]
  return { top: p.top + '%', left: p.left + '%' }
}

onLoad((query) => {
  if (query.q) searchKeyword.value = query.q
})

onMounted(() => {
  initLazyObserver()
  observeVisible()
  genStackPositions()
  setTimeout(() => {
    dynasties.forEach(d => setupWheelListeners(d.key))
    dynasties.forEach(d => startAutoScroll(d.key))
  }, 300)
  document.addEventListener('keydown', onAlbumKey)
})

function setupWheelListeners(key) {
  cleanupWheelListeners(key)
  const el = document.getElementById('paper-' + key)
  if (!el) return
  scrollVelocity[key] = 0
  const wheelHandler = (e) => {
    e.preventDefault()
    autoScrollDisabled[key] = true
    stopAutoScroll(key)
    scrollVelocity[key] = Math.max(-80, Math.min(80, scrollVelocity[key] + e.deltaY * 0.15))
    if (!scrollRaf[key]) smoothStep(key)
  }
  const leaveHandler = () => {
    if (autoScrollDisabled[key] && layoutMode.value === 'scroll') {
      autoScrollDisabled[key] = false
      startAutoScroll(key)
    }
  }
  el.addEventListener('wheel', wheelHandler, { passive: false })
  el.addEventListener('mouseleave', leaveHandler)
  wheelHandlers[key] = { el, wheelHandler, leaveHandler }
}

function smoothStep(key) {
  const el = document.getElementById('paper-' + key)
  const v = scrollVelocity[key] || 0
  if (!el || Math.abs(v) < 0.5) {
    scrollVelocity[key] = 0
    delete scrollRaf[key]
    return
  }
  const maxScroll = el.scrollWidth - el.clientWidth
  const newPos = el.scrollLeft + v
  if (newPos < 0 || newPos > maxScroll) {
    scrollVelocity[key] = 0
    delete scrollRaf[key]
    return
  }
  el.scrollLeft = newPos
  scrollVelocity[key] *= 0.9
  scrollRaf[key] = requestAnimationFrame(() => smoothStep(key))
}

function cleanupWheelListeners(key) {
  if (wheelHandlers[key]) {
    const { el, wheelHandler, leaveHandler } = wheelHandlers[key]
    el.removeEventListener('wheel', wheelHandler)
    el.removeEventListener('mouseleave', leaveHandler)
    delete wheelHandlers[key]
  }
  if (scrollRaf[key]) {
    cancelAnimationFrame(scrollRaf[key])
    delete scrollRaf[key]
  }
  delete scrollVelocity[key]
}

const filters = computed(() => {
  const counts = {}
  galleryData.forEach(img => { counts[img.dynasty] = (counts[img.dynasty] || 0) + 1 })
  return [
    { key: 'all', label: '全部', count: galleryData.length },
    { key: '唐', label: '唐', count: counts['唐'] || 0 },
    { key: '宋', label: '宋', count: counts['宋'] || 0 },
    { key: '明', label: '明', count: counts['明'] || 0 },
  ]
})

const filtered = computed(() => {
  let list = galleryData
  if (activeFilter.value !== 'all') list = list.filter(img => img.dynasty === activeFilter.value)
  if (searchKeyword.value) {
    const kw = searchKeyword.value.toLowerCase()
    list = list.filter(img =>
      img.title.toLowerCase().includes(kw) ||
      img.dynasty.toLowerCase().includes(kw) ||
      img.tags.some(t => t.toLowerCase().includes(kw))
    )
  }
  return list
})

const spreads = computed(() => {
  const items = filtered.value
  const result = []
  let i = 0
  let curDyn = null
  if (items.length) {
    result.push({ left: { type: 'title', dynasty: items[0].dynasty }, right: { type: 'image', item: items[0] } })
    curDyn = items[0].dynasty; i = 1
  }
  while (i < items.length) {
    if (items[i].dynasty !== curDyn) {
      result.push({ left: { type: 'title', dynasty: items[i].dynasty }, right: { type: 'image', item: items[i] } })
      curDyn = items[i].dynasty; i++
    } else {
      const s = { left: { type: 'image', item: items[i] } }; i++
      s.right = i < items.length ? { type: 'image', item: items[i++] } : { type: 'end' }
      result.push(s)
    }
  }
  return result
})
const currentLeft = computed(() => spreads.value[spreadIdx.value]?.left || null)
const currentRight = computed(() => spreads.value[spreadIdx.value]?.right || null)
const nextLeft = computed(() => {
  const next = spreads.value[spreadIdx.value + 1]
  return next ? next.left : null
})
const prevRight = computed(() => {
  const prev = spreads.value[spreadIdx.value - 1]
  return prev ? prev.right : null
})

watch(filtered, () => {
  albumIdx.value = 0
  spreadIdx.value = 0
  stackModal.value = null
  genStackPositions()
  // 过滤/切换后重新注册懒加载观察
  observeVisible()
  if (layoutMode.value === 'scroll') {
    autoScrollDisabled = {}
    setTimeout(() => dynasties.forEach(d => { setupWheelListeners(d.key); startAutoScroll(d.key) }), 200)
  }
})

function switchLayout(key) {
  layoutMode.value = key
  // 切换模式后重新注册懒加载（DOM 完全变化）
  visibleImgs.clear()
  observeVisible()
  if (key === 'scroll') {
    autoScrollDisabled = {}
    nextTick(() => {
      document.querySelector('.scroll-layout')?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        dynasties.forEach(d => { setupWheelListeners(d.key); startAutoScroll(d.key) })
      }, 100)
    })
  } else if (key === 'album') {
    spreadIdx.value = 0
    isFlipping.value = false
  } else {
    dynasties.forEach(d => { stopAutoScroll(d.key); cleanupWheelListeners(d.key) })
  }
}

function getDynastyImages(key) {
  return filtered.value.filter(img => img.dynasty === key)
}


function onFilter(key) {
  if (layoutMode.value === 'scroll') {
    if (key === 'all') return
    const sec = document.getElementById('sec-' + key)
    const hdr = sec?.querySelector('.scroll-hdr')
    if (hdr) {
      const rect = hdr.getBoundingClientRect()
      window.scrollTo({ top: window.scrollY + rect.top - 74, behavior: 'smooth' })
    }
    return
  }
  activeFilter.value = key
}
function goDynasty(key) {
  document.getElementById('sec-' + key)?.scrollIntoView({ behavior: 'smooth' })
}

function startAutoScroll(key) {
  if (autoScrollDisabled[key]) return
  stopAutoScroll(key)
  const el = document.getElementById('paper-' + key)
  if (!el) return
  const pivot = el.scrollWidth / 2
  if (pivot <= el.clientWidth) {
    if (!autoScrollDisabled[key]) setTimeout(() => startAutoScroll(key), 500)
    return
  }
  let pos = el.scrollLeft || 0
  const speed = 0.8
  function step() {
    const e = document.getElementById('paper-' + key)
    if (!e || layoutMode.value !== 'scroll' || autoScrollDisabled[key]) { stopAutoScroll(key); return }
    pos += speed
    if (pos >= pivot) pos = 0
    e.scrollLeft = pos
    autoScrollRAF[key] = requestAnimationFrame(step)
  }
  autoScrollRAF[key] = requestAnimationFrame(step)
}

function stopAutoScroll(key) {
  if (autoScrollRAF[key]) {
    cancelAnimationFrame(autoScrollRAF[key])
    delete autoScrollRAF[key]
  }
}

onUnmounted(() => {
  disconnectObserver()
  dynasties.forEach(d => { stopAutoScroll(d.key); cleanupWheelListeners(d.key) })
  document.removeEventListener('keydown', onAlbumKey)
})

function preloadSpreadImages(idx) {
  const s = spreads.value[idx]
  if (!s) return
  ;[s.left, s.right].forEach(p => {
    if (p && p.type === 'image' && p.item && p.item.src) {
      const img = new Image()
      img.src = p.item.src
    }
  })
}

function nextAlbum() {
  if (isFlipping.value || spreadIdx.value >= spreads.value.length - 1) return
  flipDir.value = 'next'
  isFlipping.value = true
  preloadSpreadImages(spreadIdx.value + 1)
  // Swap left page content at mid-flip so fade overlaps with the page turn
  midFlipTimer = setTimeout(() => {
    spreadIdx.value++
    midFlipTimer = null
  }, 200)
  setTimeout(completeFlip, 800)
}

function prevAlbum() {
  if (isFlipping.value || spreadIdx.value <= 0) return
  flipDir.value = 'prev'
  isFlipping.value = true
  preloadSpreadImages(spreadIdx.value - 1)
  midFlipTimer = setTimeout(() => {
    spreadIdx.value--
    midFlipTimer = null
  }, 200)
  setTimeout(completeFlip, 800)
}

function onFlipEnd(e) {
  if (e.propertyName !== 'transform') return
  completeFlip()
}

function completeFlip() {
  if (!isFlipping.value) return
  // If mid-flip content change hasn't fired yet, do it now
  if (midFlipTimer) {
    clearTimeout(midFlipTimer)
    midFlipTimer = null
    if (flipDir.value === 'next') spreadIdx.value++
    else spreadIdx.value--
  }
  // flipper returns smoothly
  nextTick(() => { isFlipping.value = false })
}

function onAlbumKey(e) {
  if (layoutMode.value !== 'album') return
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextAlbum() }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prevAlbum() }
}

function genStackPositions() {
  const n = filtered.value.length
  const positions = []
  for (let i = 0; i < n; i++) {
    let left, top, tries = 0
    do {
      left = 2 + Math.random() * 62
      top = 2 + Math.random() * 50
      tries++
    } while (tries < 20 && positions.some(p =>
      Math.abs(p.left - left) < 14 && Math.abs(p.top - top) < 14
    ))
    positions.push({ left, top, rot: (Math.random() - 0.5) * 22 })
  }
  stackPositions.value = positions
}

function openCard(i) {
  stackModal.value = i
}
function closeCard() {
  stackModal.value = null
}

function cardFrameStyle(dynasty) {
  const map = { '唐': '#C8962E', '宋': '#7BA88E', '明': '#B8442A' }
  return { border: '5px solid ' + (map[dynasty] || '#C8962E') }
}

function drawCard() {
  const n = filtered.value.length
  if (!n) return
  const i = Math.floor(Math.random() * n)
  openCard(i)
}

function stackStyle(i) {
  const p = stackPositions.value[i]
  if (!p) return { display: 'none' }
  return {
    left: p.left + '%', top: p.top + '%',
    transform: `rotate(${p.rot}deg)`,
    zIndex: filtered.value.length - i,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  }
}

function goPrompter() { uni.navigateTo({ url: '/pages/prompter' }) }
function openDetail(img) { uni.navigateTo({ url: '/pages/detail?id=' + img.id }) }
function pageKey(p) {
  if (!p) return 'empty'
  if (p.type === 'title') return 'title-' + p.dynasty
  if (p.item && p.item.src) return p.item.src
  return 'empty'
}
function topBottom(item) {
  if (!item || !item.analysis || !item.analysis.clothing) return ''
  const c = item.analysis.clothing
  if (c.length >= 2) {
    const bottom = c[c.length - 1].includes('裙') ? c[c.length - 1] : ''
    const top = bottom ? c.slice(0, -1).join(' · ') : c.join(' · ')
    return bottom ? `${top} / ${bottom}` : top
  }
  return c[0] || ''
}
</script>

<style lang="scss" scoped>
/* ===== 骨架屏 & 图片淡入 ===== */
/* 未加载时父容器 skeleton shimmer 动画，加载后图片 opacity 渐变为 1 */
@keyframes skeleton-shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton {
  background: #e8e0d5;
  background-image: linear-gradient(90deg, #e8e0d5 25%, #f0eae0 50%, #e8e0d5 75%);
  background-size: 800px 100%;
  animation: skeleton-shimmer 1.8s ease-in-out infinite;
}

/* 图片默认透明（露出父容器骨架），加载后淡入覆盖 */
.gallery-img, .card-img, .page-img, .stack-img, .stack-modal-img {
  opacity: 0; transition: opacity 0.35s ease;
  position: relative; z-index: 1;
}
.img-loaded { opacity: 1; }

.page-layout { min-height: 100vh; background: $theme-bg; }
.content { padding: clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px); }
@media (min-width: 1200px) { .content { width: 80%; margin: 0 auto; } }

.page-header { display: flex; align-items: center; gap: 32px; margin-bottom: 16px; flex-wrap: wrap; }
.page-title { font-size: $font-size-page-title-sub; font-weight: $font-weight-bold; color: $theme-ink; white-space: nowrap; }
.search-wrap {
  display: flex; align-items: center;
  max-width: 320px; height: 34px; flex: 1;
  background: $theme-white;
  border: 1px solid $theme-border; border-radius: 4px;
  padding: 0 12px;
  transition: border-color 0.25s;
}
.search-wrap:focus-within { border-color: $theme-red; }
.search-input {
  flex: 1; height: 100%; font-size: 13px; color: $theme-ink;
  background: transparent; border: none; outline: none;
}
.search-input::placeholder { color: $theme-placeholder; font-size: 12px; }

.toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
.filter-group { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-chip {
  padding: 6px 14px; border-radius: 6px; font-size: $font-size-small-sub;
  background: $theme-white; color: $theme-gray; border: 1px solid $theme-light-gray; cursor: pointer; white-space: nowrap;
  &.active { background: $theme-red; color: $theme-white; border-color: $theme-red; }
}
.layout-group { display: flex; gap: 4px; background: $theme-white; border-radius: 8px; padding: 3px; border: 1px solid $theme-light-gray; }
.layout-chip {
  padding: 6px 12px; border-radius: 6px; font-size: $font-size-small-sub; cursor: pointer;
  color: $theme-gray; white-space: nowrap;
  &.active { background: $theme-red; color: $theme-white; }
}
.page-divider { width: 60px; height: 3px; background: $theme-red; margin-bottom: 20px; border-radius: 2px; }

/* ===== GRID ===== */
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
.gallery-item {
  position: relative; height: 400px; border-radius: 10px; overflow: hidden; cursor: pointer;
  box-shadow: 0 0 0 1px $theme-light-gray, 0 2px 8px rgba(0,0,0,0.04);
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  &::after { content: ''; position: absolute; inset: 0; border-radius: 10px; pointer-events: none; z-index: 3; border: 2px solid transparent; transition: border-color 0.35s ease; }
  &:hover { transform: scale(1.02); box-shadow: 0 0 0 1px $theme-red, 0 12px 32px rgba($theme-red, 0.08); .gallery-overlay { opacity: 1; } &::after { border-color: rgba($theme-gold, 0.3); } }
  .gallery-img { width: 100%; height: 100%; }
  .gallery-overlay {
    position: absolute; bottom: 0; left: 0; right: 0; padding: 20px;
    background: linear-gradient(transparent, rgba(0,0,0,0.7)); opacity: 0; transition: opacity 0.3s;
  }
  .overlay-badges { display: flex; gap: 4px; margin-bottom: 6px; }
  .badge { font-size: 11px; padding: 2px 10px; border-radius: 4px; font-weight: 500; }
  .dynasty-tag { background: rgba($theme-white, 0.9); color: $theme-ink; }
  .overlay-title { font-size: 15px; font-weight: 600; color: $theme-white; display: block; margin-bottom: 4px; }
  .gallery-tags { font-size: 12px; color: rgba($theme-white, 0.8); display: block; }
}

/* ===== HANDSCROLL ===== */
.scroll-layout { }
.scroll-section { margin-bottom: 64px; }
.scroll-hdr {
  display: flex; align-items: center; gap: 14px; margin-bottom: 16px;
  .roller {
    width: 24px; height: 24px; border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #C8A84E, #8B6914 60%, #5C4A1E);
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }
}
.scroll-dynasty-title {
  font-size: 24px; font-weight: 700;
  color: #C41E3A; letter-spacing: 6px;
  background: rgba(196,30,58,0.06); padding: 4px 20px;
  border-radius: 4px;
}

/* Scroll track wrapper - the whole handscroll */
.scroll-track-wrap {
  position: relative; display: flex; align-items: stretch;
  border-radius: 4px; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  min-height: 580px; overflow: hidden;
}

/* Wooden rollers */
.wooden-roller {
  display: flex; flex-direction: column; align-items: center;
  flex-shrink: 0; width: 38px;
  .roller-knob {
    width: 44px; height: 22px; border-radius: 4px;
    background: radial-gradient(circle at 40% 40%, #d4a853, #8B6914 50%, #5C4A1E);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.15);
    flex-shrink: 0;
  }
  .roller-shaft {
    flex: 1; width: 26px; min-height: 340px;
    background: linear-gradient(90deg, #a07828, #c4a24a 25%, #8B6914 50%, #6d5520 75%, #5C4A1E);
    border-radius: 12px;
    box-shadow: inset -2px 0 4px rgba(0,0,0,0.15), inset 2px 0 4px rgba(0,0,0,0.1);
  }
}
.wooden-roller.left {
  box-shadow: 2px 0 8px -4px rgba(0,0,0,0.2),
              inset -3px 0 6px -2px rgba(0,0,0,0.12);
}
.wooden-roller.right {
  box-shadow: -2px 0 8px -4px rgba(0,0,0,0.2),
              inset 3px 0 6px -2px rgba(0,0,0,0.12);
}

/* Scroll paper - the scrollable area */
.scroll-paper {
  flex: 1; overflow-x: auto; overflow-y: hidden;
  display: flex; align-items: center;
  padding: 0; position: relative;
  background: linear-gradient(135deg, #f5f0e8 0%, #ede4d3 50%, #f5f0e8 100%);
  cursor: pointer;
  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
}

/* Cards on the scroll */
.scroll-card {
  flex-shrink: 0; cursor: pointer; padding: 0;
  margin: 0 14px;
  position: relative;
  &:first-child { margin-left: 8px; }
  &:last-child { margin-right: 8px; }
  transition: transform 0.3s ease;
  &:hover { transform: scale(1.02); }
  &::after {
    content: '印';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 38px;
    border: 1.5px solid rgba($theme-red, 0.35);
    background: rgba($theme-red, 0.1);
    border-radius: 2px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: rgba($theme-red, 0.5);
    font-weight: 600;
    pointer-events: none;
    z-index: 2;
  }
  &:last-child::after { display: none; }
  /* random vertical offsets (wider range) */
  &:nth-child(7n+1)::after { top: 45%; }
  &:nth-child(7n+2)::after { top: 57%; }
  &:nth-child(7n+3)::after { top: 40%; }
  &:nth-child(7n+4)::after { top: 55%; }
  &:nth-child(7n+5)::after { top: 43%; }
  &:nth-child(7n+6)::after { top: 60%; }
  &:nth-child(7n)::after { top: 48%; }
  /* dynasty-specific seal characters */
  #paper-唐 & {
    &:nth-child(7n+1)::after { content: '唐'; }
    &:nth-child(7n+2)::after { content: '赏'; }
    &:nth-child(7n+3)::after { content: '珍'; }
    &:nth-child(7n+4)::after { content: '真'; }
    &:nth-child(7n+5)::after { content: '宝'; }
    &:nth-child(7n+6)::after { content: '盛'; }
    &:nth-child(7n)::after { content: '印'; }
  }
  #paper-宋 & {
    &:nth-child(7n+1)::after { content: '宋'; }
    &:nth-child(7n+2)::after { content: '逸'; }
    &:nth-child(7n+3)::after { content: '雅'; }
    &:nth-child(7n+4)::after { content: '趣'; }
    &:nth-child(7n+5)::after { content: '心'; }
    &:nth-child(7n+6)::after { content: '妙'; }
    &:nth-child(7n)::after { content: '印'; }
  }
  #paper-明 & {
    &:nth-child(7n+1)::after { content: '明'; }
    &:nth-child(7n+2)::after { content: '藏'; }
    &:nth-child(7n+3)::after { content: '鉴'; }
    &:nth-child(7n+4)::after { content: '喜'; }
    &:nth-child(7n+5)::after { content: '爱'; }
    &:nth-child(7n+6)::after { content: '华'; }
    &:nth-child(7n)::after { content: '印'; }
  }
}
.scroll-card-inner {
  display: flex; background: $theme-white;
  border-radius: 3px; overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}
.card-img-frame {
  position: relative; flex-shrink: 0;
  border: 3px solid rgba($theme-gold, 0.45);
  box-shadow:
    inset 0 0 0 1px rgba($theme-ink, 0.08),
    0 0 0 5px rgba($theme-ink, 0.05);
  margin: 6px;
}
.card-img {
  width: 290px; height: 440px; display: block;
}

/* Title card at start of each scroll — matches image card layout */
.scroll-title-card {
  margin: 0 6px 0 8px !important;
  &:hover { transform: none !important; }
}
.scroll-title-card::after { display: none !important; }
.title-frame {
  width: 290px; height: 446px;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  background: #faf8f4;
  border: none !important;
  box-shadow: none !important;
  margin: 6px;
}
.title-text {
  font-size: 42px; font-weight: 700;
  color: #2C2C2C; writing-mode: vertical-rl;
  letter-spacing: 14px; line-height: 2;
  z-index: 1;
}
$seal-color: #B8442A;

.scroll-title-seal {
  position: absolute;
  border: 3px solid $seal-color;
  display: flex; align-items: center; justify-content: center;
  color: $seal-color; border-radius: 4px;
  z-index: 2; mix-blend-mode: multiply;
}
.seal-唐 .scroll-title-seal {
  border-style: double; border-width: 4px;
  transform: translate(-50%, -50%) rotate(3deg);
  width: 86px; height: 86px; font-size: 54px; font-weight: 900;
  background: rgba($seal-color, 0.12);
}
.seal-宋 .scroll-title-seal {
  border-radius: 50%; border-width: 4px;
  transform: translate(-50%, -50%) rotate(-7deg);
  width: 88px; height: 88px; font-size: 58px; font-weight: 900;
  background: rgba($seal-color, 0.12);
}
.seal-明 .scroll-title-seal {
  border-style: solid; border-width: 4px;
  transform: translate(-50%, -50%) rotate(-2deg);
  width: 90px; height: 90px; font-size: 56px; font-weight: 900;
  background: rgba($seal-color, 0.16);
}

/* Vertical caption on the right of each card */
.card-caption {
  width: 60px; background: #faf8f4;
  display: flex; align-items: center; justify-content: center;
  border-left: 1px solid rgba(0,0,0,0.04);
}
.caption-inner {
  writing-mode: vertical-rl; text-orientation: mixed;
  display: flex; flex-direction: row; align-items: center;
  gap: 0; padding: 18px 4px;
}
.cap-seg {
  display: flex; flex-direction: column; align-items: center;
  padding: 4px 0;
}
.cap-line {
  width: 1px; height: 18px;
  background: rgba(0,0,0,0.08); flex-shrink: 0;
  margin: 3px 0;
}
.cap-dynasty {
  font-size: 15px; color: $theme-red; font-weight: 600;
  letter-spacing: 0.5em; line-height: 1.5;
}
.cap-color {
  font-size: 16px; font-weight: 600; color: $theme-ink;
  letter-spacing: 0.3em; line-height: 1.5;
}
.cap-clothing {
  font-size: 13px; color: $theme-text-secondary; font-weight: 500;
  letter-spacing: 0.2em; line-height: 1.4;
}

/* ===== ALBUM (3D 册页) ===== */
.album-layout { display: flex; flex-direction: column; align-items: center; user-select: none; position: relative; }
.album-book {
  position: relative; width: 100%; max-width: 840px; height: 70vh; min-height: 420px;
  display: flex; align-items: stretch;
  background: linear-gradient(135deg, #f5f0e8 0%, #ede4d3 50%, #f5f0e8 100%);
  border-radius: 4px; box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  perspective: 2400px; overflow: hidden;
}
.album-page {
  flex: 1; position: relative; overflow: hidden;
  background: #faf8f4;
  display: flex; align-items: center; justify-content: center;
}
.page-left { border-right: 1px solid rgba(0,0,0,0.06); }
.page-right { background: #f8f5ee; }

/* 3D flipper */
.page-flipper {
  position: absolute; inset: 0;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0.15, 0.2, 0.85),
              box-shadow 0.7s cubic-bezier(0.4, 0.15, 0.2, 0.85);
  backface-visibility: hidden;
  will-change: transform;
}
.right-flipper { transform-origin: left center; z-index: 2; }
.left-flipper { transform-origin: right center; z-index: 2; }
.right-flipper.active {
  transform: rotateY(-178deg);
  box-shadow: -12px 8px 32px rgba(0,0,0,0.15);
}
.left-flipper.active {
  transform: rotateY(178deg);
  box-shadow: 12px 8px 32px rgba(0,0,0,0.15);
}

.page-face {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.page-front {
  background: linear-gradient(135deg, #faf8f4 0%, #f5f0e8 100%);
}
.page-back {
  transform: rotateY(180deg);
  background:
    repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(180,160,130,0.04) 40px, rgba(180,160,130,0.04) 41px),
    linear-gradient(135deg, #f5f0e6 0%, #efe8da 50%, #f5f0e6 100%);
}
.right-flipper .page-back::after, .left-flipper .page-back::after {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 30% 40%, rgba(160,140,110,0.06) 0%, transparent 60%);
  pointer-events: none;
}

/* flip shadow overlays per page */
.page-shadow {
  position: absolute; top: 0; bottom: 0; z-index: 5;
  pointer-events: none;
  opacity: 0; transition: opacity 0.5s ease;
  &.active { opacity: 1; }
}
.left-shadow {
  right: 0; left: auto; width: 50%;
  background: linear-gradient(270deg, rgba(0,0,0,0.18), transparent 40%);
}
.right-shadow {
  left: 0; right: auto; width: 50%;
  background: linear-gradient(90deg, rgba(0,0,0,0.18), transparent 40%);
}

/* page content */
.page-content {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  padding: 6px;
  will-change: transform, opacity;
  background: #faf8f4;
}
/* page cover transition — old fades out, then new fades in, like a sheet settling */
.page-enter-active {
  animation: coverIn 0.35s ease-out;
}
.page-leave-active {
  animation: coverOut 0.25s ease-in;
}
@keyframes coverIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes coverOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
.page-title-wrap {
  display: flex; align-items: center; justify-content: center; height: 100%;
}
.title-paper {
  display: flex; flex-direction: column; align-items: center; gap: 20px;
  padding: 60px 40px;
  border: 2px solid rgba($theme-red, 0.15);
  background: rgba(255,255,255,0.5);
}
.title-chinese {
  font-size: 48px; font-weight: 700; color: $theme-ink;
  writing-mode: vertical-rl; letter-spacing: 0.4em;
  line-height: 1.6;
}
.album-title-seal {
  border: 3px solid $seal-color;
  display: flex; align-items: center; justify-content: center;
  color: $seal-color; border-radius: 4px;
  mix-blend-mode: multiply;
  width: 60px; height: 60px; font-size: 36px; font-weight: 900;
  background: rgba($seal-color, 0.12);
}
.seal-唐.album-title-seal {
  border-style: double; border-width: 4px;
  transform: rotate(3deg);
}
.seal-宋.album-title-seal {
  border-radius: 50%; border-width: 4px;
  transform: rotate(-7deg);
}
.seal-明.album-title-seal {
  border-style: solid; border-width: 4px;
  transform: rotate(-2deg);
  background: rgba($seal-color, 0.16);
}

/* Traditional album leaf mounting (册页装裱) */
.page-img-wrap {
  display: flex; flex-direction: column; height: 100%; width: 100%;
  align-items: center; justify-content: center;
  position: relative;
}
/* dynasty watermark */
.page-watermark {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -52%);
  font-size: 220px; font-weight: 900;
  color: rgba(0,0,0,0.035);
  pointer-events: none; user-select: none;
  z-index: 0; line-height: 1;
}
.mounting-frame {
  display: flex; flex-direction: column; align-items: center;
  background: #f8f5ee;
  border: 1px solid rgba(160,140,110,0.2);
  padding: 4px 6px 3px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  position: relative; z-index: 1;
  max-width: 96%; max-height: 96%;
}
.mounting-inner {
  border: 2px solid rgba($theme-gold, 0.3);
  padding: 2px;
  background: #faf8f4;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.04);
  overflow: hidden;
  flex-shrink: 0;
}
.page-img {
  display: block;
  width: 340px; height: 460px;
  object-fit: cover;
}
/* 题跋区 - info strip at bottom of mounting */
.mounting-bottom {
  margin-top: 4px; padding: 3px 6px;
  display: flex; flex-direction: column; gap: 3px;
  align-items: center;
  align-self: stretch;
}
.mounting-bottom .mb-row {
  display: flex; gap: 4px; align-items: center; justify-content: center;
}
.mounting-bottom .label-clothing {
  font-size: 13px; color: $theme-ink; font-weight: 600;
  letter-spacing: 0.08em;
}
.mounting-bottom .label-dynasty {
  font-size: 13px; color: $theme-red; font-weight: 700;
  letter-spacing: 0.15em;
}
.mounting-bottom .label-color {
  font-size: 12px; color: $theme-text-secondary;
  letter-spacing: 0.1em;
}
.mounting-bottom .label-fabric {
  font-size: 13px; color: $theme-text-secondary;
  letter-spacing: 0.08em;
}
.mounting-bottom .label-sep {
  font-size: 10px; color: rgba(0,0,0,0.15);
}
.page-empty {
  font-size: 32px; color: rgba(0,0,0,0.08); font-weight: 200;
}
.page-end-wrap {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: #faf8f4;
}
.page-end-text {
  font-size: 28px; font-weight: 700;
  color: $theme-red;
  letter-spacing: 0.5em;
  opacity: 0.7;
}

/* spine */
.album-spine {
  width: 6px; flex-shrink: 0;
  background: linear-gradient(90deg, #e0d8c8, #d0c8b8 30%, #c8c0b0 50%, #d4ccbc 70%, #e0d8c8);
  box-shadow: -1px 0 4px rgba(0,0,0,0.04), 1px 0 4px rgba(0,0,0,0.04);
  position: relative; z-index: 3;
}

/* navigation */
.album-hit-left, .album-hit-right {
  position: absolute; top: 0; bottom: 0; width: 30%; cursor: pointer; z-index: 10;
}
.album-hit-left { left: 0; }
.album-hit-right { right: 0; }

/* footer */
.album-footer { margin-top: 16px; }
.album-info { font-size: $font-size-body; color: $theme-text-secondary; letter-spacing: 0.15em; }

/* ===== STACK ===== */
.stack-layout { }
.stack-scene {
  position: relative; height: 60vh; min-height: 360px; margin: 16px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.08);
  background-color: #eaddc8;
  background-image:
    radial-gradient(ellipse 60px 28px at 18% 22%, rgba(180,140,90,0.08) 0%, transparent 70%),
    radial-gradient(ellipse 45px 20px at 22% 18%, rgba(180,140,90,0.06) 0%, transparent 70%),
    radial-gradient(ellipse 55px 25px at 52% 32%, rgba(180,140,90,0.07) 0%, transparent 70%),
    radial-gradient(ellipse 40px 18px at 56% 28%, rgba(180,140,90,0.05) 0%, transparent 70%),
    radial-gradient(ellipse 50px 22px at 78% 18%, rgba(180,140,90,0.07) 0%, transparent 70%),
    radial-gradient(ellipse 35px 16px at 82% 14%, rgba(180,140,90,0.05) 0%, transparent 70%),
    radial-gradient(ellipse 55px 25px at 32% 62%, rgba(180,140,90,0.06) 0%, transparent 70%),
    radial-gradient(ellipse 45px 20px at 36% 58%, rgba(180,140,90,0.04) 0%, transparent 70%),
    radial-gradient(ellipse 50px 22px at 65% 72%, rgba(180,140,90,0.07) 0%, transparent 70%),
    radial-gradient(ellipse 40px 18px at 69% 68%, rgba(180,140,90,0.05) 0%, transparent 70%),
    radial-gradient(ellipse 45px 20px at 88% 55%, rgba(180,140,90,0.05) 0%, transparent 70%),
    radial-gradient(ellipse 50px 22px at 8% 68%, rgba(180,140,90,0.06) 0%, transparent 70%);
}
/* Decorative corner ornaments */
.stack-scene::before, .stack-scene::after {
  content: ''; position: absolute; width: 60px; height: 60px;
  border-color: rgba(139,90,43,0.15); border-style: solid; border-width: 0; pointer-events: none;
}
.stack-scene::before {
  top: 12px; left: 12px;
  border-top-width: 2px; border-left-width: 2px;
  border-top-left-radius: 8px;
}
.stack-scene::after {
  bottom: 12px; right: 12px;
  border-bottom-width: 2px; border-right-width: 2px;
  border-bottom-right-radius: 8px;
}
.stack-card {
  position: absolute;
  width: 150px; height: 210px;
  border-radius: 6px;
  overflow: hidden; cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08);
  transform-origin: center center;
}
.stack-img { width: 100%; height: 100%; display: block; }
.stack-bar {
  display: flex; align-items: center; justify-content: center; gap: 16px;
  padding: 16px 20px 24px;
}
.stack-hint {
  font-size: $font-size-body-sub; color: $theme-text-secondary;
  flex: 1; text-align: center;
}
.stack-draw-btn {
  padding: 10px 28px; border-radius: 8px;
  font-size: $font-size-body; font-weight: 600;
  color: $theme-white; background: $theme-red;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba($theme-red, 0.3);
  &:active { transform: scale(0.95); }
}

.stack-modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
}
.stack-modal {
  position: relative; border-radius: 12px; overflow: hidden;
  width: 520px; max-width: 92vw;
  box-shadow: 0 16px 48px rgba(0,0,0,0.35);
}
.stack-modal-img { width: 100%; display: block; border-radius: 12px; }
.stack-modal-info {
  position: absolute; left: 16px; right: 16px; bottom: 16px;
  padding: 14px 16px;
  background: rgba(255,255,255,0.7);
  border-radius: 10px;
  display: flex; flex-direction: column; gap: 4px;
}
.stack-modal-dynasty { font-size: $font-size-small; color: $theme-red; font-weight: 700; }
.stack-modal-title { font-size: 18px; font-weight: 600; color: $theme-ink; }
.stack-modal-tags { font-size: $font-size-body-sub; color: $theme-text-secondary; }
.stack-modal-detail {
  margin-top: 4px; font-size: $font-size-body-sub; color: $theme-red; font-weight: 600;
  text-decoration: underline; text-underline-offset: 2px; text-decoration-color: rgba($theme-red, 0.3);
}
/* decorative card border */
.stack-modal-border {
  position: absolute; inset: 8px;
  border: 1px solid rgba(255,255,255,0.35);
  border-radius: 8px; pointer-events: none; z-index: 5;
}

/* ===== EMPTY ===== */
.empty-state { text-align: center; padding: 100px 0;
  .empty-icon { font-size: 64px; display: block; margin-bottom: 20px; opacity: 0.6; }
  .empty-text { font-size: $font-size-subtitle; color: $theme-gray; display: block; margin-bottom: 24px; }
}

/* ===== 移动端全模式适配 ===== */
@media (max-width: 768px) {
  /* --- Grid（网格）：双栏 3:4 等比例 --- */
  .gallery-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .gallery-item { height: auto; aspect-ratio: 3/4; border-radius: 8px; }
  .gallery-item .gallery-img { object-fit: cover; }
  .gallery-item .gallery-overlay { opacity: 0.85; background: linear-gradient(transparent 40%, rgba(0,0,0,0.7)); padding: 12px; }
  .gallery-item:hover .gallery-overlay { opacity: 0.85; }
  .gallery-item .overlay-title { font-size: 13px; }
  .gallery-item .gallery-tags { font-size: 11px; }
  .gallery-item::after { display: none; }
  .gallery-item:hover { transform: none; box-shadow: none; }

  /* --- Scroll（手卷）：卡片缩小（宽 195px/50vw，原 220px/55vw）+ 印章恢复显示 --- */
  .scroll-card { margin: 0 8px; }
  .card-img { width: min(195px, 50vw); height: auto; aspect-ratio: 290/440; }
  .title-frame { width: min(195px, 50vw); height: auto; aspect-ratio: 290/446; }
  .card-caption { width: 40px; }

  /* --- Album（册页）：高度压缩 + 图片等比例缩小 + 标题紧凑 --- */
  .album-book { height: 50vh; min-height: 300px; max-width: 100vw; width: 100%; }
  .title-paper { padding: 30px 20px; gap: 10px; }
  .title-chinese { font-size: 36px; }
  .album-title-seal { width: 44px; height: 44px; font-size: 26px; margin-top: -6px; }
  .page-img { width: min(130px, 38vw); height: auto; aspect-ratio: 340/460; }
  .page-watermark { font-size: 50px; }
  .mounting-bottom .label-clothing { font-size: 11px; }
  .mounting-bottom .label-fabric { font-size: 11px; }

  /* --- Stack（层叠）--- */
  .stack-card { width: 130px; height: 182px; }
  .stack-modal { width: 92vw; }

  /* --- 手卷木轴：调窄 / 缩短 / 轴头外露 --- */
  .scroll-hdr { gap: 8px; }
  .scroll-hdr .roller { width: 16px; height: 16px; }
  .scroll-dynasty-title { font-size: 18px; letter-spacing: 4px; padding: 2px 12px; }
  .scroll-track-wrap { min-height: 340px; overflow: visible; }
  .wooden-roller { width: 20px; }
  .wooden-roller .roller-knob { width: 24px; height: 12px; }
  .roller-knob.top { margin-top: -8px; }
  .roller-knob.bottom { margin-bottom: -8px; }
  .wooden-roller .roller-shaft { width: 14px; min-height: 220px; }

  /* --- 工具栏堆叠 --- */
  .toolbar { flex-direction: column; align-items: stretch; }
  .layout-group { align-self: flex-start; }
  .filter-chip, .layout-chip { font-size: 11px; padding: 4px 10px; }
}
</style>
