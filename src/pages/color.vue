<template>
  <view class="page-layout">
    <TopNav current="color" />
    <view class="content">
      <view class="page-header">
        <text class="page-title">传统色彩</text>
        <text class="page-subtitle">{{ displayColors.length }} 色</text>
      </view>
      <view class="page-divider"></view>

      <view class="color-toggle">
        <view class="t-btn" :class="{ active: filterBy === 'all' }" @tap="filterBy = 'all'">全色库</view>
        <view class="t-btn" :class="{ active: filterBy === 'ai' }" @tap="filterBy = 'ai'">AI 友好色</view>
      </view>
      <view class="tag-toggle">
        <view v-for="t in allTags" :key="t" class="t-btn tag-btn"
          :class="{ active: selectedTags.has(t) }"
          @tap="toggleTag(t)">{{ t }}</view>
      </view>

      <view v-for="grp in colorGroups" :key="grp.label" class="section">
        <text class="section-label">{{ grp.label }} ({{ grp.items.length }})</text>
        <view class="grid">
          <view v-for="c in grp.items" :key="c.name" class="color-card" @tap="openDetail(c)">
            <view class="swatch" :style="{ backgroundColor: c.hex }"></view>
            <text class="c-name">{{ c.name }}</text>
            <text class="c-hex">{{ c.hex }}</text>
            <view class="card-tags">
              <text v-if="filterBy !== 'ai'" class="c-ai-tag" :class="{ ok: c.ai, no: !c.ai }">{{ c.ai ? 'AI' : '—' }}</text>
              <text class="c-type-tag" v-if="c.tags?.includes('中国色')">典</text>
              <text class="c-type-tag wa" v-else-if="c.tags?.includes('和风')">和</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <Footer />

    <!-- detail drawer -->
    <!-- 配色搭配弹窗 -->
    <view v-if="pairModal" class="pair-overlay" @tap="closePairModal"></view>
    <view class="pair-modal" :class="{ open: !!pairModal }" v-if="pairModal">
      <view class="pm-header">
        <text class="pm-title">{{ pairModal.name }} · 配色搭配</text>
        <text class="pm-close" @tap="closePairModal">✕</text>
      </view>
      <view class="pm-body" ref="pairBodyRef">
        <view v-for="(pn, pi) in pairModal.pairs" :key="pi" class="pm-card">
          <view class="pm-card-inner">
            <view class="pm-swatch pm-main-swatch" :style="{ backgroundColor: pairModal.hex }">
              <text class="pm-label">{{ pairModal.name }}</text>
              <text class="pm-hex">{{ pairModal.hex }}</text>
            </view>
            <view class="pm-swatch pm-pair-swatch" :style="{ backgroundColor: hexForColor(pn) }">
              <text class="pm-label">{{ pn }}</text>
              <text class="pm-hex">{{ hexForColor(pn) }}</text>
            </view>
          </view>
          <text class="pm-desc">{{ pairDesc(pairModal.name, pn) }}</text>
        </view>
      </view>
      <view class="pm-footer">
        <text class="pm-btn" @tap="exportPairs">导出 PNG</text>
      </view>
    </view>

    <view v-if="detail" class="drawer-overlay" @tap="detail = null"></view>
    <view class="detail-drawer" :class="{ open: !!detail }">
      <view class="drawer-header">
        <text class="drawer-title">色彩详情</text>
        <text class="drawer-close-btn" @tap="detail = null">✕</text>
      </view>
      <view class="drawer-body" v-if="detail">
        <view class="drawer-hero">
          <view class="drawer-swatch" :style="{ backgroundColor: detail.hex }">
            <text class="swatch-inner-hex">{{ detail.hex }}</text>
          </view>
          <view class="drawer-hero-text">
            <text class="drawer-name">{{ detail.name }}</text>
            <text class="drawer-hex">{{ detail.hex }}</text>
            <text v-if="detail.rgb" class="drawer-rgb">RGB {{ detail.rgb }}</text>
            <view class="drawer-hero-badges">
              <text class="tag tag-cat">{{ detail.category }}</text>
              <text class="tag" v-if="detail.dynasty">{{ detail.dynasty }}</text>
            </view>
          </view>
        </view>

        <view class="drawer-tags">
          <text class="tag" :class="{ 'tag-ok': detail.ai, 'tag-no': !detail.ai }">{{ detail.ai ? 'AI友好' : '非AI友好' }}</text>
          <text class="tag" v-for="t in detail.tags" :key="t" :class="{ 'tag-cn': t==='中国色', 'tag-wa': t==='和风' }">{{ t }}</text>
        </view>

        <view v-if="adjacentColors.length" class="drawer-section">
          <text class="ds-title">相邻色</text>
          <view class="adjacent-row">
            <view v-for="ac in adjacentColors" :key="ac.name" class="adj-item" @tap="openDetail(ac)">
              <view class="adj-swatch" :style="{ backgroundColor: ac.hex }"></view>
              <text class="adj-label">{{ ac.name }}</text>
            </view>
          </view>
        </view>

        <view v-if="detail.pairs && detail.pairs.length" class="drawer-section">
          <text class="ds-title">配色推荐 <text class="ds-sub" @tap.stop="openPairModal">查看搭配 ›</text></text>
          <view class="pair-list">
            <view v-for="(pn, pi) in detail.pairs" :key="pi" class="pair-item" @tap="openPairModal">
              <view class="pair-swatch" :style="{ backgroundColor: hexForColor(pn) }"></view>
              <text class="pair-name">{{ pn }}</text>
              <text class="pair-note">{{ pairDesc(detail.name, pn) }}</text>
            </view>
          </view>
        </view>

        <view class="drawer-section">
          <text class="ds-title">色彩来源</text>
          <text class="ds-text">{{ detail.origin }}</text>
        </view>
        <view class="drawer-section">
          <text class="ds-title">文化典故</text>
          <text class="ds-text">{{ detail.story }}</text>
        </view>
        <view class="drawer-section">
          <text class="ds-title">色彩寓意</text>
          <text class="ds-text">{{ detail.meaning }}</text>
        </view>
        <view class="drawer-section">
          <text class="ds-title">详细介绍</text>
          <text class="ds-text">{{ detail.description }}</text>
        </view>
        <view v-if="!detail.ai" class="drawer-section note">
          <text class="ds-title">⚠️ AI 提示</text>
          <text class="ds-text">{{ detail.reason || '此色在主流 AI 图像生成器中表现不稳定，建议换用更常见的相近色。' }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'
import allColors from '../data/color-data.js'

const filterBy = ref('all')
const selectedTags = ref(new Set())
const detail = ref(null)
const pairModal = ref(null)
const pairBodyRef = ref(null)

function toggleTag(t) {
  const set = selectedTags.value
  if (set.has(t)) set.delete(t)
  else set.add(t)
  // trigger reactivity
  selectedTags.value = new Set(set)
}

onLoad((query) => {
  if (query.q) {
    const found = allColors.find(c => c.name === query.q)
    if (found) openDetail(found)
  }
})

// 从数据中提取所有标签去重后排序
const allTags = computed(() => {
  const set = new Set()
  allColors.forEach(c => (c.tags || []).forEach(t => set.add(t)))
  return [...set].sort()
})

const catOrder = ['红', '黄', '绿', '蓝', '紫', '褐', '黑白']
const catLabels = { '红': '红系 · 暖红', '黄': '黄系 · 暖黄', '绿': '绿系 · 冷绿', '蓝': '蓝系 · 冷蓝', '紫': '紫系 · 冷紫', '褐': '褐系 · 大地色', '黑白': '素色系 · 黑白' }

const displayColors = computed(() => {
  let list = filterBy.value === 'ai' ? allColors.filter(c => c.ai) : allColors
  const tags = [...selectedTags.value]
  if (tags.length > 0) {
    list = list.filter(c => tags.some(t => c.tags?.includes(t)))
  }
  return list
})

const colorGroups = computed(() => {
  const map = {}
  displayColors.value.forEach(c => {
    if (!map[c.category]) map[c.category] = []
    map[c.category].push(c)
  })
  return catOrder.filter(k => map[k]).map(k => ({ label: catLabels[k] || k, items: map[k] }))
})

const adjacentColors = computed(() => {
  if (!detail.value) return []
  const cat = detail.value.category
  const sameCat = allColors.filter(c => c.category === cat && c.name !== detail.value.name)
  const idx = sameCat.findIndex(c => c.name === detail.value.name)
  if (idx < 0) {
    // Not found in same cat (shouldn't happen), return first 4
    return sameCat.slice(0, 4)
  }
  const start = Math.max(0, idx - 2)
  const end = Math.min(sameCat.length, idx + 3)
  return sameCat.slice(start, end)
})

function hexForColor(name) {
  const c = allColors.find(x => x.name === name)
  return c ? c.hex : '#ccc'
}

function pairDesc(main, paired) {
  const catMap = { '红':'红色', '黄':'黄色', '绿':'绿色', '蓝':'蓝色', '紫':'紫色', '褐':'褐色', '黑白':'素色' }
  const mc = allColors.find(x => x.name === main)
  const pc = allColors.find(x => x.name === paired)
  if (!mc || !pc) return ''
  const mcat = catMap[mc.category] || mc.category
  const pcat = catMap[pc.category] || pc.category

  // 亮度对比：从 hex 估算
  const lum = h => (parseInt(h.slice(1,3),16)*0.299 + parseInt(h.slice(3,5),16)*0.587 + parseInt(h.slice(5,7),16)*0.114)
  const ml = lum(mc.hex), pl = lum(pc.hex)
  const diff = ml - pl
  const lightDesc = diff > 40 ? '主色更深沉，搭配色更明亮' : diff < -40 ? '主色更明亮，搭配色更深沉' : '两色亮度相近'
  
  // 饱和度对比
  const sat = h => { const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16); const max=Math.max(r,g,b),min=Math.min(r,g,b); return max===0?0:Math.round((max-min)/max*100); }
  const ms = sat(mc.hex), ps = sat(pc.hex)
  const satDesc = Math.abs(ms-ps) > 30 ? '饱和度反差明显，各具风采' : '饱和度协调统一'

  // 同类色 — 按亮度差异细分
  if (mc.category === pc.category) {
    const depth = diff > 50 ? '更浅更明亮' : diff > 20 ? '稍浅' : diff > -20 ? '色调相近' : diff > -50 ? '稍深' : '更深更暗'
    return `${mcat}系，${depth}，${satDesc}`
  }

  const pair1 = `${mcat}与${pcat}`

  // 互补对比
  if ((mc.category === '红' && pc.category === '绿') || (mc.category === '绿' && pc.category === '红'))
    return `${pair1}，红绿经典反差，鲜明热烈。${lightDesc}`
  if ((mc.category === '蓝' && pc.category === '黄') || (mc.category === '黄' && pc.category === '蓝'))
    return `${pair1}，冷暖撞色，视觉张力强。${lightDesc}，${satDesc}`
  if ((mc.category === '紫' && pc.category === '黄') || (mc.category === '黄' && pc.category === '紫'))
    return `${pair1}，黄紫对比，华贵醒目。${lightDesc}`

  // 无彩色
  if (mc.category === '黑白') return `${pcat}底色上衬以${mcat}，素雅大方，${satDesc}`
  if (pc.category === '黑白') return `${mcat}配素色，主次分明，沉稳不失亮点。${lightDesc}`

  // 冷暖组合
  const warm = ['红','黄','褐'], cool = ['绿','蓝','紫']
  if (warm.includes(mc.category) && cool.includes(pc.category))
    return `${pair1}，冷暖调和，张弛有度。${lightDesc}`
  if (cool.includes(mc.category) && warm.includes(pc.category))
    return `${pair1}，冷中带暖，层次丰富。${lightDesc}`

  // 邻近色
  if ((mc.category === '红' && pc.category === '紫') || (mc.category === '紫' && pc.category === '红'))
    return `${pair1}，红紫相邻，温婉和谐。${lightDesc}`
  if ((mc.category === '绿' && pc.category === '蓝') || (mc.category === '蓝' && pc.category === '绿'))
    return `${pair1}，蓝绿邻近，清新自然。${lightDesc}`
  if ((mc.category === '黄' && pc.category === '绿') || (mc.category === '绿' && pc.category === '黄'))
    return `${pair1}，黄绿邻近，生机盎然。${lightDesc}`
  if ((mc.category === '蓝' && pc.category === '紫') || (mc.category === '紫' && pc.category === '蓝'))
    return `${pair1}，蓝紫邻近，沉静优雅。${lightDesc}`
  if ((mc.category === '褐' && pc.category === '黄') || (mc.category === '黄' && pc.category === '褐'))
    return `${pair1}，大地暖调，温润质朴。${lightDesc}`
  if ((mc.category === '褐' && pc.category === '红') || (mc.category === '红' && pc.category === '褐'))
    return `${pair1}，暖色过渡，温厚醇和。${lightDesc}`

  return `${pair1}交融，${lightDesc}，${satDesc}`
}

function openDetail(c) { detail.value = c }

function openPairModal() {
  if (!detail.value || !detail.value.pairs) return
  pairModal.value = { name: detail.value.name, hex: detail.value.hex, pairs: detail.value.pairs }
}

function closePairModal() { pairModal.value = null }

function exportPairs() {
  if (!pairModal.value) return
  const { name, hex, pairs } = pairModal.value
  const canvas = document.createElement('canvas')
  canvas.width = 800; canvas.height = 200 + pairs.length * 120
  const ctx = canvas.getContext('2d')
  
  // Background
  ctx.fillStyle = '#FAF8F4'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Title
  ctx.fillStyle = '#2C2C2C'
  ctx.font = 'bold 22px sans-serif'
  ctx.fillText(name + ' · 配色方案', 30, 40)
  
  // Subtitle
  ctx.fillStyle = '#999'
  ctx.font = '13px sans-serif'
  ctx.fillText(name + ' ' + hex, 30, 65)
  
  // Draw each pair
  pairs.forEach((pn, i) => {
    const py = 100 + i * 120
    const ph = hexForColor(pn)
    const sw = 300
    
    // Main color swatch
    ctx.fillStyle = hex
    ctx.fillRect(30, py, sw, 80)
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 14px sans-serif'
    ctx.fillText(name, 40, py + 30)
    ctx.font = '11px monospace'
    ctx.fillText(hex, 40, py + 50)
    
    // Arrow
    ctx.fillStyle = '#999'
    ctx.font = '20px sans-serif'
    ctx.fillText('⇌', 345, py + 48)
    
    // Pair color swatch
    ctx.fillStyle = ph
    ctx.fillRect(370, py, sw, 80)
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 14px sans-serif'
    ctx.fillText(pn, 380, py + 30)
    ctx.font = '11px monospace'
    ctx.fillText(ph, 380, py + 50)
    
    // Description
    ctx.fillStyle = '#666'
    ctx.font = '12px sans-serif'
    ctx.fillText(pairDesc(name, pn), 40, py + 100)
  })
  
  // Download
  const link = document.createElement('a')
  link.download = name + '-配色.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
</script>

<style lang="scss" scoped>
.page-layout { min-height: 100vh; background: $theme-bg; }
.content { padding: clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px); }
@media (min-width: 1200px) { .content { width: 80%; margin: 0 auto; } }

.page-header { margin-bottom: 24px; }
.page-title { font-size: $font-size-page-title-sub; font-weight: $font-weight-bold; color: $theme-ink; }
.page-subtitle { font-size: $font-size-small; color: $theme-gray; margin-top: 4px; }

.page-divider { width: 60px; height: 3px; background: $theme-red; margin-bottom: 28px; border-radius: 2px; }

.color-toggle {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
}
.t-btn {
  padding: 8px 24px;
  border-radius: 8px;
  font-size: $font-size-body;
  color: $theme-text-secondary;
  background: $theme-white;
  border: 1px solid $theme-light-gray;
  cursor: pointer;
  transition: all 0.2s;
  &.active { background: $theme-red; color: $theme-white; border-color: $theme-red; }
}

.tag-toggle {
  display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 16px;
}
.tag-btn { font-size: 11px; padding: 4px 10px; }
.tag-btn.active { background: $theme-ink; color: $theme-white; border-color: $theme-ink; }


.section { margin-bottom: 36px; }
.section-label {
  font-size: $font-size-subtitle;
  font-weight: $font-weight-semibold;
  color: $theme-ink;
  display: block;
  margin-bottom: 14px;
  padding-left: 12px;
  border-left: 3px solid $theme-red;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 14px;
}

.color-card {
  background: $theme-white;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
}

.swatch {
  height: 80px;
}

.c-name {
  display: block;
  font-size: $font-size-body;
  font-weight: $font-weight-semibold;
  color: $theme-ink;
  padding: 8px 10px 2px;
}

.c-hex {
  display: block;
  font-size: 11px;
  color: $theme-placeholder;
  font-family: monospace;
  padding: 0 10px 6px;
}

.c-ai-tag {
  display: inline-block;
  font-size: 10px;
  padding: 1px 8px;
  border-radius: 3px;
  &.ok { background: #E8F5E9; color: #2E7D32; }
  &.no { background: #FBE9E7; color: #BF360C; }
}
.card-tags { display: flex; gap: 4px; padding: 0 10px 8px; flex-wrap: wrap; }
.c-type-tag {
  font-size: 10px; padding: 1px 6px; border-radius: 3px; font-weight: 600; display: inline-block;
  background: #E3F2FD; color: #1565C0;
  &.wa { background: #FFF3E0; color: #E65100; }
}

/* drawer */
.drawer-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 200;
}

.detail-drawer {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: 33.33%; max-width: 520px; min-width: 300px;
  background: $theme-white; z-index: 201;
  transform: translateX(100%); transition: transform 0.35s ease;
  display: flex; flex-direction: column; overflow-y: auto;
  box-shadow: -4px 0 20px rgba(0,0,0,0.1);
}
.detail-drawer.open { transform: translateX(0); }

.drawer-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px; border-bottom: 1px solid $theme-light-gray;
}
.drawer-title { font-size: $font-size-subtitle; font-weight: $font-weight-bold; color: $theme-ink; }
.drawer-close-btn { font-size: 20px; color: $theme-gray; cursor: pointer; padding: 4px; }

.drawer-body { padding: 24px; }

.drawer-hero {
  display: flex; gap: 16px; margin-bottom: 16px;
}
.drawer-swatch {
  width: 100px; height: 100px; border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: flex-end; justify-content: flex-end; padding: 6px 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.swatch-inner-hex { font-size: 10px; color: rgba(255,255,255,0.7); font-family: monospace; }
.drawer-hero-text { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.drawer-name { font-size: 26px; font-weight: $font-weight-bold; color: $theme-ink; display: block; line-height: 1.2; }
.drawer-hex { font-size: $font-size-body; color: $theme-placeholder; font-family: monospace; display: block; margin-top: 2px; }
.drawer-rgb { font-size: $font-size-small; color: $theme-border; font-family: monospace; display: block; }
.drawer-hero-badges { display: flex; gap: 4px; margin-top: 6px; }
.drawer-hero-badges .tag { font-size: 10px; padding: 2px 8px; }

.drawer-tags { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 20px; }
.tag {
  font-size: 11px; padding: 3px 10px; border-radius: 4px;
  background: $theme-bg; color: $theme-text-secondary;
}
.tag-ok { background: #E8F5E9; color: #2E7D32; }
.tag-no { background: #FBE9E7; color: #BF360C; }
.tag-cat { background: #E3F2FD; color: #1565C0; }
.tag-cn { background: #E8F5E9; color: #2E7D32; }
.tag-wa { background: #FFF3E0; color: #E65100; }

/* 配色搭配弹窗 */
.pair-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 300;
}
.pair-modal {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%) scale(0.9);
  width: min(520px, 90vw); max-height: 80vh;
  background: $theme-white; border-radius: 14px; z-index: 301;
  display: flex; flex-direction: column; opacity: 0; transition: all 0.25s ease;
  box-shadow: 0 12px 40px rgba(0,0,0,0.2);
  overflow: hidden;
}
.pair-modal.open { opacity: 1; transform: translate(-50%,-50%) scale(1); }
.pm-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid $theme-light-gray;
  flex-shrink: 0;
}
.pm-title { font-size: 16px; font-weight: $font-weight-bold; color: $theme-ink; }
.pm-close { font-size: 20px; color: $theme-gray; cursor: pointer; padding: 4px; line-height: 1; }
.pm-body { padding: 16px 20px 8px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 12px; }
.pm-card {
  background: $theme-bg; border-radius: 10px; overflow: hidden;
  border: 1px solid $theme-light-gray;
}
.pm-card-inner { display: flex; }
.pm-swatch {
  flex: 1; height: 80px; display: flex; flex-direction: column;
  justify-content: flex-end; padding: 8px 12px;
}
.pm-main-swatch { border-right: 2px solid rgba(0,0,0,0.06); }
.pm-label { font-size: 14px; font-weight: $font-weight-semibold; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.3); }
.pm-hex { font-size: 11px; color: rgba(255,255,255,0.8); font-family: monospace; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }
.pm-desc { font-size: 12px; color: $theme-gray; padding: 6px 12px 8px; }
.pm-footer {
  padding: 12px 20px 16px; border-top: 1px solid $theme-light-gray;
  display: flex; justify-content: center; flex-shrink: 0;
}
.pm-btn {
  padding: 8px 28px; border-radius: 6px; font-size: 14px; font-weight: 600;
  background: $theme-red; color: #fff; cursor: pointer;
  &:active { opacity: 0.85; }
}

.drawer-section { margin-bottom: 20px; }
.ds-title {
  font-size: 13px; font-weight: $font-weight-semibold; color: $theme-ink;
  display: block; margin-bottom: 6px;
  padding-left: 10px; border-left: 3px solid $theme-red;
}
.ds-sub { font-size: 11px; color: $theme-red; cursor: pointer; font-weight: $font-weight-regular; margin-left: 8px; }
.ds-sub:hover { text-decoration: underline; }
.ds-text { font-size: $font-size-body-sub; color: $theme-text-body; line-height: 1.7; display: block; text-align: justify; }
.adjacent-row { display: flex; gap: 10px; flex-wrap: wrap; }
.adj-item { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.adj-swatch { width: 40px; height: 40px; border-radius: 6px; border: 1px solid $theme-light-gray; }
.adj-label { font-size: 11px; color: $theme-text-secondary; margin-top: 4px; }

.pair-list { display: flex; flex-wrap: wrap; gap: 10px; }
.pair-item {
  display: flex; align-items: center; gap: 8px;
  background: $theme-bg; padding: 8px 14px; border-radius: 8px;
  min-width: 180px; flex: 1;
}
.pair-swatch { width: 24px; height: 24px; border-radius: 4px; border: 1px solid $theme-light-gray; flex-shrink: 0; }
.pair-name { font-size: $font-size-body; font-weight: $font-weight-semibold; color: $theme-ink; flex-shrink: 0; }
.pair-note { font-size: 11px; color: $theme-gray; line-height: 1.3; }

.note {
  background: #FFF8E1; border-radius: 8px; padding: 14px;
  .ds-title { color: #E65100; }
  .ds-text { color: #795548; }
}
</style>