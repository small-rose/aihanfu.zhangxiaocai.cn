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
        <view v-for="item in items" :key="item.id" class="fp-item" @tap="goItem(item)">
          <view class="fp-item-preview" :style="previewStyle(item)">
            <text class="fp-item-type">{{ typeIcon(item.type) }}</text>
          </view>
          <view class="fp-item-info">
            <text class="fp-item-name">{{ item.name }}</text>
            <text class="fp-item-sub">{{ item.sub }}</text>
          </view>
          <text class="fp-item-del" @tap.stop="remove(item.id)">✕</text>
        </view>
      </view>
      <view v-else class="fp-empty">
        <text class="fp-empty-icon">📌</text>
        <text class="fp-empty-text">暂无收藏</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getFavorites, addFavorite, removeFavorite, isFavorite, clearFavorites, FAVORITE_TYPES } from '../utils/useFavorites.js'

const panelOpen = ref(false)
const activeTab = ref('all')
const refreshKey = ref(0)

const tabs = FAVORITE_TYPES

const items = computed(() => {
  refreshKey.value // 触发重新计算
  return getFavorites(activeTab.value === 'all' ? undefined : activeTab.value)
})

const totalCount = computed(() => getFavorites().length)

function togglePanel() { panelOpen.value = !panelOpen.value }

function goItem(item) {
  panelOpen.value = false
  if (item.route) uni.navigateTo({ url: item.route + (item.query ? '?' + obj2params(item.query) : '') })
}

function remove(id) { removeFavorite(id); refreshKey.value++ }

function typeIcon(type) {
  const m = { color: '🎨', prompt: '✍️', palette: '🎯', lexicon: '📖', pattern: '🔄' }
  return m[type] || '📌'
}

function previewStyle(item) {
  if (item.preview?.startsWith('#')) return { backgroundColor: item.preview }
  if (item.preview?.startsWith('/') || item.preview?.startsWith('http')) return { backgroundImage: 'url(' + item.preview + ')', backgroundSize: 'cover' }
  return {}
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
  width: 340px; max-width: 85vw;
  background: $theme-white; z-index: 101;
  transform: translateX(100%); transition: transform 0.3s ease;
  display: flex; flex-direction: column;
  box-shadow: -4px 0 20px rgba(0,0,0,0.1);
}
.fab-panel.open { transform: translateX(0); }
.fp-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px 12px; flex-shrink: 0;
}
.fp-title { font-size: 17px; font-weight: $font-weight-bold; color: $theme-ink; }
.fp-count { font-size: 12px; color: $theme-gray; }
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
  display: flex; align-items: center; gap: 10px;
  padding: 10px 0; border-bottom: 1px solid $theme-light-gray; cursor: pointer;
  &:active { opacity: 0.7; }
}
.fp-item-preview {
  width: 40px; height: 40px; border-radius: 6px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: $theme-bg;
}
.fp-item-type { font-size: 16px; }
.fp-item-info { flex: 1; min-width: 0; }
.fp-item-name { font-size: 13px; font-weight: 500; color: $theme-ink; display: block; }
.fp-item-sub { font-size: 11px; color: $theme-gray; margin-top: 2px; display: block; }
.fp-item-del {
  font-size: 12px; color: $theme-placeholder; padding: 4px; flex-shrink: 0;
  &:hover { color: $theme-red; }
}
.fp-empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; padding-bottom: 40px;
}
.fp-empty-icon { font-size: 32px; margin-bottom: 8px; }
.fp-empty-text { font-size: 13px; color: $theme-placeholder; }
</style>
