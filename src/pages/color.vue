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
    <view class="pair-modal" :class="{ open: !!pairModal }" v-if="pairModal" :style="{ border: '2px solid ' + pairModal.hex }">
      <view class="pm-header">
        <text class="pm-title" :style="{ borderBottom: '2px solid ' + pairModal.hex }">{{ pairModal.name }} 配色</text>
        <text class="pm-close" @tap="closePairModal">✕</text>
      </view>
      <view class="pm-body" ref="pairBodyRef">
        <view v-for="(pn, pi) in pairModal.pairs" :key="pi" class="pm-card">
          <view class="pm-left-info">
            <text class="pm-label-left">{{ pairModal.name }}</text>
            <text class="pm-hex-left">{{ pairModal.hex }}</text>
          </view>
          <view class="pm-swatch-wrap" :class="{ connected: swatchConnected }">
            <view class="pm-main-swatch" :style="{ backgroundColor: pairModal.hex }"></view>
            <view v-if="!swatchConnected" class="pm-arrow">⇌</view>
            <view class="pm-pair-swatch" :style="{ backgroundColor: hexForColor(pn) }"></view>
          </view>
          <view class="pm-right-info">
            <text class="pm-label-right">{{ pn }}</text>
            <text class="pm-hex-right">{{ hexForColor(pn) }}</text>
          </view>
        </view>
      </view>
      <view class="pm-footer">
        <text class="pm-btn pm-btn-secondary" @tap="swatchConnected = !swatchConnected">{{ swatchConnected ? '断开' : '连接' }}</text>
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
              <text class="pair-note">{{ pairDesc(detail.name, pn, pi) }}</text>
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
const swatchConnected = ref(false)

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
function rgbForColor(name) {
  const c = allColors.find(x => x.name === name)
  return c ? c.rgb : ''
}

function pairDesc(main, paired, idx) {
  const mc = allColors.find(x => x.name === main)
  const pc = allColors.find(x => x.name === paired)
  if (!mc || !pc) return ''
  const a = parseInt(mc.hex.slice(1), 16)
  const b = parseInt(pc.hex.slice(1), 16)
  // idx(0-3) 加上颜色本身确保每对唯一
  const seed = ((a * 31 + b) >>> 0) % 1000000 + (idx || 0) * 7919
  const p1 = ['明','暗','浓','淡','浅','暖','清','雅','沉','盈','幽','素','鲜','郁','腴','朗','穆','和','穆','润']
  const p2 = ['配','映','衬','和','融','谐','辅','交','叠','对','合','应','随','傍','间','夹','错','参','掩','绕']
  const p3 = ['韵','彩','调','度','泽','华','致','光','味','气','色','风','神','骨','格','趣','态','姿','形','意']
  const p4 = ['生','成','宜','洽','妙','谐','融','畅','匀','合','得','匀','适','臻','至','见','显','含','蕴','兼']
  return p1[seed % 20] + p2[Math.floor(seed / 20) % 20] + p3[Math.floor(seed / 400) % 20] + p4[Math.floor(seed / 8000) % 20]
}

function openDetail(c) { detail.value = c }

function openPairModal() {
  if (!detail.value || !detail.value.pairs) return
  pairModal.value = { name: detail.value.name, hex: detail.value.hex, pairs: detail.value.pairs }
  swatchConnected.value = false
}

function closePairModal() { pairModal.value = null }

function exportPairs() {
  if (!pairModal.value) return
  const { name, hex, pairs } = pairModal.value
  const leftW = 110, rightW = 110, swatchW = 240, gap = 10
  const totalW = leftW + gap + swatchW + gap + rightW
  const pad = 40
  const topPad = 60
  const rowH = 60
  const rowGap = 14
  const footerH = 32
  const canvasW = totalW + pad * 2
  const canvasH = topPad + 10 + pairs.length * (rowH + rowGap) + 8 + footerH + pad
  const canvas = document.createElement('canvas')
  canvas.width = canvasW * 2
  canvas.height = canvasH * 2
  const ctx = canvas.getContext('2d')
  const scale = 2
  ctx.scale(scale, scale)
  
  // White background
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, canvasW, canvasH)
  
  // Border in main color
  ctx.strokeStyle = hex
  ctx.lineWidth = 2
  ctx.strokeRect(1, 1, canvasW - 2, canvasH - 2)
  
  // Header - centered
  const headerY = 42
  ctx.textAlign = 'center'
  ctx.fillStyle = '#2C2C2C'
  ctx.font = 'bold 18px sans-serif'
  ctx.fillText(name + ' 配色', canvasW / 2, headerY)
  // Title underline - centered
  const titleW = ctx.measureText(name + ' 配色').width
  ctx.strokeStyle = hex
  ctx.lineWidth = 2.5
  ctx.beginPath()
  ctx.moveTo((canvasW - titleW) / 2, headerY + 5)
  ctx.lineTo((canvasW + titleW) / 2, headerY + 5)
  ctx.stroke()
  ctx.textAlign = 'left'
  
  // Helper: rounded rect
  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2)
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.arcTo(x + w, y, x + w, y + r, r)
    ctx.lineTo(x + w, y + h - r)
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
    ctx.lineTo(x + r, y + h)
    ctx.arcTo(x, y + h, x, y + h - r, r)
    ctx.lineTo(x, y + r)
    ctx.arcTo(x, y, x + r, y, r)
    ctx.closePath()
  }

  const contentY = topPad + 10
  const r = 6

  pairs.forEach((pn, i) => {
    const py = contentY + i * (rowH + rowGap)
    const ph = hexForColor(pn)
    const swatchY = py
    const textCenterY = py + rowH / 2
    const swatchX = pad + leftW + gap
    const halfW = swatchW / 2
    const rightX = swatchX + swatchW + gap
    
    // Left: name + hex (right-aligned)
    ctx.fillStyle = '#2C2C2C'
    ctx.font = 'bold 13px sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(name, pad + leftW - 4, textCenterY - 5)
    ctx.fillStyle = '#999'
    ctx.font = '11px monospace'
    ctx.fillText(hex, pad + leftW - 4, textCenterY + 12)
    ctx.textAlign = 'left'
    
    if (swatchConnected.value) {
      ctx.save()
      roundRect(ctx, swatchX, swatchY, swatchW, rowH, r)
      ctx.clip()
      ctx.fillStyle = hex
      ctx.fillRect(swatchX, swatchY, halfW, rowH)
      ctx.fillStyle = ph
      ctx.fillRect(swatchX + halfW, swatchY, halfW, rowH)
      ctx.restore()
    } else {
      const arrowSpace = 12
      const sw = halfW - Math.ceil(arrowSpace / 2)
      roundRect(ctx, swatchX, swatchY, sw, rowH, r)
      ctx.fillStyle = hex
      ctx.fill()
      ctx.fillStyle = '#999'
      ctx.font = '11px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('⇌', swatchX + sw + arrowSpace / 2, textCenterY + 4)
      ctx.textAlign = 'left'
      roundRect(ctx, swatchX + sw + arrowSpace, swatchY, sw, rowH, r)
      ctx.fillStyle = ph
      ctx.fill()
    }
    
    // Right: name + hex (left-aligned)
    ctx.fillStyle = '#2C2C2C'
    ctx.font = 'bold 13px sans-serif'
    ctx.fillText(pn, rightX, textCenterY - 5)
    ctx.fillStyle = '#999'
    ctx.font = '11px monospace'
    ctx.fillText(ph, rightX, textCenterY + 12)
  })
  
  // Footer source link
  const footerY = contentY + pairs.length * (rowH + rowGap) + 6
  ctx.fillStyle = '#BBB'
  ctx.font = '10px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('配色来源：https://aihanfu.zhangxiaocai.cn', canvasW / 2, footerY + footerH - 6)
  ctx.textAlign = 'left'
  
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
  width: min(600px, 92vw); max-height: 80vh;
  background: $theme-white; border-radius: 14px; z-index: 301;
  display: flex; flex-direction: column; opacity: 0; transition: all 0.25s ease;
  box-shadow: 0 12px 40px rgba(0,0,0,0.2);
  overflow: hidden;
}
.pair-modal.open { opacity: 1; transform: translate(-50%,-50%) scale(1); }
.pm-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px; flex-shrink: 0;
  border-bottom: 1px solid $theme-light-gray;
}
.pm-title { font-size: 16px; font-weight: $font-weight-bold; color: $theme-ink; padding-bottom: 4px; display: inline-block; }
.pm-close { font-size: 20px; cursor: pointer; padding: 4px; line-height: 1; opacity: 0.85; color: $theme-gray; }
.pm-body {
  padding: 20px 24px; overflow-y: auto; flex: 1;
  display: flex; flex-direction: column; gap: 16px;
}
.pm-card {
  display: flex; align-items: center; gap: 16px;
  padding: 0 8px;
}
.pm-left-info { display: flex; flex-direction: column; align-items: flex-end; min-width: 72px; }
.pm-label-left { font-size: 14px; font-weight: $font-weight-semibold; color: $theme-ink; white-space: nowrap; }
.pm-hex-left { font-size: 11px; color: $theme-placeholder; font-family: monospace; margin-top: 2px; }
.pm-right-info { display: flex; flex-direction: column; align-items: flex-start; min-width: 72px; }
.pm-label-right { font-size: 14px; font-weight: $font-weight-semibold; color: $theme-ink; white-space: nowrap; }
.pm-hex-right { font-size: 11px; color: $theme-placeholder; font-family: monospace; margin-top: 2px; }
.pm-swatch-wrap {
  display: flex; align-items: center; gap: 4px; flex: 1;
}
.pm-swatch-wrap.connected { gap: 0; }
.pm-main-swatch, .pm-pair-swatch {
  flex: 1; height: 60px; border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.pm-swatch-wrap.connected .pm-main-swatch { border-radius: 6px 0 0 6px; }
.pm-swatch-wrap.connected .pm-pair-swatch { border-radius: 0 6px 6px 0; }
.pm-arrow { font-size: 16px; color: $theme-border; flex-shrink: 0; }
.pm-footer {
  padding: 14px 24px 18px; display: flex; justify-content: center; gap: 10px; flex-shrink: 0;
}
.pm-btn {
  padding: 8px 20px; border-radius: 6px; font-size: 13px; font-weight: 600;
  background: $theme-red; color: #fff; cursor: pointer; border: none;
  &:active { opacity: 0.85; }
}
.pm-btn-secondary { background: $theme-white; color: $theme-ink; border: 1px solid $theme-border; }

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