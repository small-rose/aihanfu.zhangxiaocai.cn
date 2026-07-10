<template>
  <view>
    <!-- 悬浮按钮 -->
    <view class="fab-btn" @tap="togglePanel">
      <text class="fab-icon">{{ panelOpen ? '✕' : '📌' }}</text>
      <text v-if="totalCount > 0 && !panelOpen" class="fab-badge">{{ totalCount > 99 ? '99+' : totalCount }}</text>
    </view>

    <!-- 遮罩 -->
    <view v-if="panelOpen" class="fab-overlay" @tap="togglePanel"></view>

    <!-- 收藏面板 -->
    <view class="fab-panel" :class="{ open: panelOpen }">
      <view class="fp-header">
        <text class="fp-title">收藏</text>
        <text class="fp-count">{{ totalCount }} 项</text>
      </view>
      <view class="fp-divider"></view>

      <!-- 分类标签 -->
      <view class="fp-tabs">
        <view v-for="t in tabs" :key="t.key" class="fp-tab"
          :class="{ active: activeTab === t.key }" @tap="activeTab = t.key">
          <text class="fp-tab-icon">{{ t.icon }}</text>
          <text class="fp-tab-label">{{ t.label }}</text>
        </view>
      </view>

      <!-- 列表 -->
      <view class="fp-list" v-if="items.length">
        <view v-for="item in items" :key="item.id" class="fp-item" @tap="showDetail(item)">
          <view class="fp-item-preview" :style="previewStyle(item)">
            <text class="fp-item-type">{{ typeIcon(item.type) }}</text>
          </view>
          <view class="fp-item-info">
            <text class="fp-item-name">{{ item.type === 'color' ? '色彩 ' + item.name : item.name }}</text>
            <text class="fp-item-sub">{{ item.sub }}</text>
          </view>
          <text class="fp-item-time">{{ formatTime(item.createdAt) }}</text>
          <text class="fp-item-del" @tap.stop="remove(item.id)">✕</text>
        </view>
      </view>
      <view v-else class="fp-empty">
        <text class="fp-empty-icon">📌</text>
        <text class="fp-empty-text">暂无收藏</text>
      </view>
    </view>

    <!-- 详情弹窗 -->
    <view v-if="detailItem" class="fd-overlay" @tap="detailItem = null"></view>
    <view class="fd-modal" :class="{ open: !!detailItem }" v-if="detailItem">
      <view class="fd-header">
        <view class="fd-header-info">
          <text class="fd-type-badge" :style="{ background: detailItem.preview?.startsWith('#') ? detailItem.preview : '#C41E3A' }">{{ typeIcon(detailItem.type) }}</text>
          <view>
            <text class="fd-title">收藏详细 · {{ FAVORITE_TYPES.find(t => t.key === detailItem.type)?.label || detailItem.type }}</text>
            <text class="fd-sub" v-if="detailItem.sub">{{ detailItem.sub }}</text>
          </view>
        </view>
        <text class="fd-close" @tap="detailItem = null">✕</text>
      </view>
      <view class="fd-body">
        <template v-if="detailItem.type === 'prompt'">
          <view class="fd-section" v-if="detailItem.contentCN">
            <text class="fd-label">中文提示词</text>
            <view class="fd-content-wrap">
              <view class="fd-content-scroll"><text class="fd-content">{{ detailItem.contentCN }}</text></view>
              <text class="fd-copy-btn" @tap.stop="copyText(detailItem.contentCN)">📋</text>
            </view>
          </view>
          <view class="fd-section" v-if="detailItem.contentEN">
            <text class="fd-label">English Prompt</text>
            <view class="fd-content-wrap">
              <view class="fd-content-scroll"><text class="fd-content">{{ detailItem.contentEN }}</text></view>
              <text class="fd-copy-btn" @tap.stop="copyText(detailItem.contentEN)">📋</text>
            </view>
          </view>
        </template>
        <template v-else-if="detailItem.type === 'color'">
          <view class="fd-color-hero">
            <view class="fd-color-swatch" :style="{ backgroundColor: detailItem.preview }">
              <text class="fd-color-hex">{{ detailItem.preview }}</text>
            </view>
            <view class="fd-color-name">
              <text class="fd-color-name-text">{{ detailItem.name }}</text>
              <text class="fd-color-cat">{{ detailItem.sub }}</text>
            </view>
          </view>
          <view class="fd-section" v-if="detailItem.meaning">
            <text class="fd-label">寓意</text>
            <text class="fd-value">{{ detailItem.meaning }}</text>
          </view>
          <view class="fd-section" v-if="detailItem.content">
            <text class="fd-label">文史典故</text>
            <view class="fd-content-scroll"><text class="fd-content">{{ detailItem.content }}</text></view>
          </view>
          <view class="fd-section" v-if="detailItem.pairs && detailItem.pairs.length">
            <text class="fd-label">推荐搭配色</text>
            <view class="fd-pair-grid">
              <view v-for="pn in detailItem.pairs" :key="pn" class="fd-pair-card">
                <view class="fd-pair-swatch" :style="{ backgroundColor: hexByName(pn) }"></view>
                <text class="fd-pair-label">{{ pn }}</text>
              </view>
            </view>
          </view>
        </template>
        <template v-else-if="detailItem.type === 'image'">
          <view class="fd-section">
            <text class="fd-label">图片信息</text>
            <text class="fd-value">{{ detailItem.sub }}</text>
          </view>
          <view class="fd-section" v-if="detailItem.content">
            <text class="fd-label">生成提示词</text>
            <view class="fd-content-scroll"><text class="fd-content">{{ detailItem.content }}</text></view>
          </view>
        </template>
        <template v-else>
          <view class="fd-section">
            <text class="fd-label">名称</text>
            <text class="fd-value">{{ detailItem.name }}</text>
          </view>
          <view class="fd-section" v-if="detailItem.sub">
            <text class="fd-label">信息</text>
            <text class="fd-value">{{ detailItem.sub }}</text>
          </view>
        </template>
      </view>
      <view class="fd-footer">
        <text class="fd-btn" @tap="goItem(detailItem)">前往查看</text>
        <text class="fd-btn fd-btn-del" @tap="removeWithRefresh(detailItem.id)">删除</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getFavorites, addFavorite, removeFavorite, isFavorite, clearFavorites, FAVORITE_TYPES } from '../utils/useFavorites.js'
import { showToast } from '../utils/useToast.js'
import allColors from '../data/color-data.js'

const panelOpen = ref(false)
const activeTab = ref('all')
const refreshKey = ref(0)
const detailItem = ref(null)

const tabs = FAVORITE_TYPES

const items = computed(() => {
  refreshKey.value // 触发重新计算
  return getFavorites(activeTab.value === 'all' ? undefined : activeTab.value)
})

const totalCount = computed(() => { refreshKey.value; return getFavorites().length })

function togglePanel() { panelOpen.value = !panelOpen.value }

function showDetail(item) { detailItem.value = item }

function goItem(item) {
  panelOpen.value = false; detailItem.value = null
  if (item.route) uni.navigateTo({ url: item.route + (item.query ? '?' + obj2params(item.query) : '') })
}

function removeWithRefresh(id) { removeFavorite(id); refreshKey.value++; detailItem.value = null }

function pad(n) { return n < 10 ? '0' + n : n }
function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  const now = new Date()
  const diff = now - d
  if (diff < 60000) return '刚刚'
  if (diff < 7200000) return Math.floor(diff / 60000) + '分钟前'
  const y = d.getFullYear()
  const mo = pad(d.getMonth() + 1)
  const da = pad(d.getDate())
  const h = pad(d.getHours())
  const mi = pad(d.getMinutes())
  const s = pad(d.getSeconds())
  return y + '-' + mo + '-' + da + ' ' + h + ':' + mi + ':' + s
}

function copyText(txt) {
  if (!txt) return
  navigator.clipboard.writeText(txt).then(() => showToast('已复制', true)).catch(() => showToast('已复制', true))
}

function remove(id) { removeFavorite(id); refreshKey.value++ }

function typeIcon(type) {
  const m = { image: '🖼️', color: '🎨', prompt: '✍️', palette: '🎯', lexicon: '📖', pattern: '🔄' }
  return m[type] || '📌'
}

function previewStyle(item) {
  if (item.preview?.startsWith('#')) return { backgroundColor: item.preview }
  if (item.preview?.startsWith('/') || item.preview?.startsWith('http')) return { backgroundImage: 'url(' + item.preview + ')', backgroundSize: 'cover' }
  return {}
}

function hexByName(name) {
  const c = allColors.find(x => x.name === name)
  return c ? c.hex : '#ddd'
}

function obj2params(obj) {
  return Object.entries(obj).map(([k, v]) => k + '=' + encodeURIComponent(v)).join('&')
}

// 暴露给外部使用
defineExpose({ addFavorite, isFavorite, removeFavorite })
</script>

<style lang="scss" scoped>
.fab-btn {
  position: fixed; bottom: 80px; right: 20px;
  width: 48px; height: 48px; border-radius: 50%;
  background: $theme-red; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; z-index: 99;
  box-shadow: 0 4px 16px rgba($theme-red, 0.3);
  cursor: pointer;
}
.fab-badge {
  position: absolute; top: -4px; right: -4px;
  min-width: 18px; height: 18px; border-radius: 9px;
  background: $theme-ink; color: #fff;
  font-size: 10px; display: flex; align-items: center; justify-content: center;
  padding: 0 4px; line-height: 1;
}
.fab-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.25); z-index: 100;
}
.fab-panel {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: 33.33%; max-width: 500px; min-width: 300px;
  background: $theme-white; z-index: 101;
  transform: translateX(100%); transition: transform 0.3s ease;
  display: flex; flex-direction: column;
  box-shadow: -4px 0 20px rgba(0,0,0,0.1);
}
.fab-panel.open { transform: translateX(0); }
.fp-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: calc(clamp(48px, 7vw, 64px) + 12px) 20px 8px; flex-shrink: 0;
}
.fp-title { font-size: 17px; font-weight: $font-weight-bold; color: $theme-ink; }
.fp-count { font-size: 12px; color: $theme-gray; }
.fp-divider { height: 2px; background: $theme-red; margin: 4px 20px 10px; border-radius: 1px; }
.fp-tabs {
  display: flex; gap: 4px; padding: 0 16px 10px; overflow-x: auto;
  flex-shrink: 0; flex-wrap: wrap;
}
.fp-tab {
  display: flex; align-items: center; gap: 3px;
  padding: 4px 10px; border-radius: 6px;
  background: $theme-bg; font-size: 11px; cursor: pointer;
  white-space: nowrap; color: $theme-gray;
  &.active { background: $theme-red; color: #fff; }
}
.fp-tab-icon { font-size: 12px; }
.fp-tab-label { font-weight: 500; }
.fp-list { flex: 1; overflow-y: auto; padding: 0 16px 20px; }
.fp-item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 0; border-bottom: 1px solid $theme-light-gray; cursor: pointer;
  &:active { opacity: 0.7; }
}
.fp-item-preview {
  width: 28px; height: 28px; border-radius: 5px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: $theme-bg;
}
.fp-item-type { font-size: 13px; }
.fp-item-info { flex: 1; min-width: 0; }
.fp-item-name { font-size: 12px; font-weight: 500; color: $theme-ink; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fp-item-sub { font-size: 10px; color: $theme-gray; margin-top: 1px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fp-item-time { font-size: 9px; color: $theme-placeholder; white-space: nowrap; flex-shrink: 0; margin-right: 4px; }
.fp-item-del { font-size: 11px; color: $theme-placeholder; padding: 2px; cursor: pointer; flex-shrink: 0; &:hover { color: $theme-red; } }
.fp-empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; padding-bottom: 40px;
}
.fp-empty-icon { font-size: 32px; margin-bottom: 8px; }
.fp-empty-text { font-size: 13px; color: $theme-placeholder; }

/* 详情弹窗 */
.fd-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 200;
}
.fd-modal {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%) scale(0.9);
  width: min(720px, 94vw); max-height: 85vh;
  background: #fff; border-radius: 14px; z-index: 201;
  display: flex; flex-direction: column; opacity: 0; transition: all 0.25s ease;
  box-shadow: 0 16px 48px rgba(0,0,0,0.2); overflow: hidden;
}
.fd-modal.open { opacity: 1; transform: translate(-50%,-50%) scale(1); }
.fd-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 20px 24px; border-bottom: 1px solid #eee; flex-shrink: 0; gap: 12px;
}
.fd-header-info { display: flex; align-items: center; gap: 14px; min-width: 0; }
.fd-type-badge {
  width: 32px; height: 32px; border-radius: 7px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 15px;
}
.fd-title { font-size: 18px; font-weight: 700; color: #1a1a1a; display: block; }
.fd-sub { font-size: 13px; color: #888; margin-top: 3px; display: block; }
.fd-close { font-size: 22px; color: #999; cursor: pointer; padding: 4px; line-height: 1; flex-shrink: 0; }
.fd-close:hover { color: #333; }
.fd-body { padding: 20px 24px 16px; overflow-y: auto; flex: 1; }
.fd-section { margin-bottom: 18px; }
.fd-label {
  font-size: 13px; font-weight: 600; color: #555; display: block; margin-bottom: 6px;
  padding-left: 10px; border-left: 3px solid $theme-red;
}
.fd-value { font-size: 15px; color: #333; display: block; line-height: 1.7; }
.fd-content-wrap { position: relative; }
.fd-content-scroll {
  max-height: 200px; overflow-y: auto; border-radius: 8px;
  border: 1px solid #e8e4dc; background: #f8f6f2;
}
.fd-content-scroll::-webkit-scrollbar { width: 4px; }
.fd-content-scroll::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }
.fd-content {
  display: block; padding: 12px 14px 36px;
  font-size: 13px; color: #333; line-height: 1.7;
  white-space: pre-wrap; word-break: break-word;
}
.fd-copy-btn {
  position: absolute; bottom: 6px; right: 8px;
  width: 24px; height: 24px; border-radius: 5px;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; background: $theme-red; color: #fff; cursor: pointer; z-index: 1;
  &:active { opacity: 0.8; }
}
.fd-color-hero {
  display: flex; gap: 16px; align-items: center; margin-bottom: 16px;
  padding: 14px; background: #f8f6f2; border-radius: 10px;
}
.fd-color-swatch {
  width: 80px; height: 80px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: flex-end; justify-content: flex-end; padding: 4px 6px;
}
.fd-color-hex { font-size: 10px; color: rgba(255,255,255,0.75); font-family: monospace; }
.fd-color-name-text { font-size: 20px; font-weight: 700; color: #1a1a1a; display: block; }
.fd-color-cat { font-size: 13px; color: #888; margin-top: 2px; display: block; }
.fd-pair-grid { display: flex; gap: 8px; flex-wrap: wrap; }
.fd-pair-card { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.fd-pair-swatch { width: 48px; height: 48px; border-radius: 8px; flex-shrink: 0; border: 1px solid #e0dcd4; }
.fd-pair-label { font-size: 11px; color: #666; }
.fd-footer {
  padding: 14px 24px 18px; display: flex; gap: 10px;
  border-top: 1px solid #eee; flex-shrink: 0;
}
.fd-btn {
  flex: 1; padding: 11px; border-radius: 8px; font-size: 14px; font-weight: 600;
  text-align: center; cursor: pointer;
  background: $theme-red; color: #fff;
  &:active { opacity: 0.85; }
}
.fd-btn-del { background: #fff; color: #333; border: 1px solid #ddd; }
</style>
