<template>
  <view class="page-layout">
    <TopNav current="color" />
    <view class="content">
      <view class="page-header">
        <text class="page-title">传统色彩</text>
        <text class="page-subtitle">{{ mode === 'full' ? '全色库' : 'AI 友好色' }} · {{ displayColors.length }} 色</text>
      </view>
      <view class="page-divider"></view>

      <view class="color-toggle">
        <view class="t-btn" :class="{ active: mode === 'full' }" @tap="mode = 'full'">全色库</view>
        <view class="t-btn" :class="{ active: mode === 'ai' }" @tap="mode = 'ai'">AI 友好色</view>
      </view>

      <view v-for="grp in colorGroups" :key="grp.label" class="section">
        <text class="section-label">{{ grp.label }} ({{ grp.items.length }})</text>
        <view class="grid">
          <view v-for="c in grp.items" :key="c.name" class="color-card" @tap="openDetail(c)">
            <view class="swatch" :style="{ backgroundColor: c.hex }"></view>
            <text class="c-name">{{ c.name }}</text>
            <text class="c-hex">{{ c.hex }}</text>
            <text v-if="mode === 'full'" class="c-ai-tag" :class="{ ok: c.ai, no: !c.ai }">{{ c.ai ? 'AI' : '—' }}</text>
          </view>
        </view>
      </view>
    </view>
    <Footer />

    <!-- detail drawer -->
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
          <text class="tag" v-for="t in detail.tags" :key="t">{{ t }}</text>
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
          <text class="ds-title">配色推荐</text>
          <view class="pair-list">
            <view v-for="(pn, pi) in detail.pairs" :key="pi" class="pair-item">
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

const mode = ref('full')
const detail = ref(null)

onLoad((query) => {
  if (query.q) {
    const found = allColors.find(c => c.name === query.q)
    if (found) openDetail(found)
  }
})

const catOrder = ['红', '黄', '绿', '蓝紫', '褐', '黑白']
const catLabels = { '红': '红系 · 暖红', '黄': '黄系 · 暖黄', '绿': '绿系 · 冷绿', '蓝紫': '蓝紫系 · 冷蓝紫', '褐': '褐系 · 大地色', '黑白': '素色系 · 黑白' }

const displayColors = computed(() =>
  mode.value === 'full' ? allColors : allColors.filter(c => c.ai)
)

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
  const catMap = { '红':'红色', '黄':'黄色', '绿':'绿色', '蓝紫':'蓝紫色', '褐':'褐色', '黑白':'素色' }
  const mc = allColors.find(x => x.name === main)
  const pc = allColors.find(x => x.name === paired)
  if (!mc || !pc) return ''
  const mcat = catMap[mc.category] || mc.category
  const pcat = catMap[pc.category] || pc.category
  if (mc.category === pc.category) return `同系深浅，和谐统一`
  if ((mc.category === '红' && pc.category === '黑白') || (mc.category === '黑白' && pc.category === '红')) return '经典对比，鲜明夺目'
  if (pc.category === '黄' || pc.category === '褐') return '冷暖平衡，温润雅致'
  return `${mcat}配${pcat}，层次丰富`
}

function openDetail(c) { detail.value = c }
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
  margin: 0 10px 8px;
  padding: 1px 8px;
  border-radius: 3px;
  &.ok { background: #E8F5E9; color: #2E7D32; }
  &.no { background: #FBE9E7; color: #BF360C; }
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

.drawer-section { margin-bottom: 20px; }
.ds-title {
  font-size: 13px; font-weight: $font-weight-semibold; color: $theme-ink;
  display: block; margin-bottom: 6px;
  padding-left: 10px; border-left: 3px solid $theme-red;
}
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