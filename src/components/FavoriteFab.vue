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
        <view v-for="item in items" :key="item.id" class="fp-item" @tap="showDetail(item)">
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

    <!-- 详情弹窗 -->
    <view v-if="detailItem" class="fd-overlay" @tap="detailItem = null"></view>
    <view class="fd-modal" :class="{ open: !!detailItem }" v-if="detailItem">
      <view class="fd-header">
        <text class="fd-title">{{ detailItem.name }}</text>
        <text class="fd-close" @tap="detailItem = null">✕</text>
      </view>
      <view class="fd-body">
        <view class="fd-preview" :style="previewStyle(detailItem)">
          <text class="fd-type-icon">{{ typeIcon(detailItem.type) }}</text>
        </view>
        <view class="fd-section">
          <text class="fd-label">类型</text>
          <text class="fd-value">{{ FAVORITE_TYPES.find(t => t.key === detailItem.type)?.label || detailItem.type }}</text>
        </view>
        <view class="fd-section">
          <text class="fd-label">名称</text>
          <text class="fd-value">{{ detailItem.name }}</text>
        </view>
        <view class="fd-section" v-if="detailItem.sub">
          <text class="fd-label">信息</text>
          <text class="fd-value">{{ detailItem.sub }}</text>
        </view>
        <view class="fd-section" v-if="detailItem.content">
          <text class="fd-label">内容</text>
          <text class="fd-value fd-content">{{ detailItem.content }}</text>
        </view>
      </view>
      <view class="fd-footer">
        <text class="fd-btn" @tap="goItem(detailItem)">前往查看</text>
        <text class="fd-btn fd-btn-del" @tap="removeWithRefresh(detailItem.id)">删除收藏</text>
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
const detailItem = ref(null)

const tabs = FAVORITE_TYPES

const items = computed(() => {
  refreshKey.value // 触发重新计算
  return getFavorites(activeTab.value === 'all' ? undefined : activeTab.value)
})

const totalCount = computed(() => getFavorites().length)

function togglePanel() { panelOpen.value = !panelOpen.value }

function showDetail(item) { detailItem.value = item }

function goItem(item) {
  panelOpen.value = false; detailItem.value = null
  if (item.route) uni.navigateTo({ url: item.route + (item.query ? '?' + obj2params(item.query) : '') })
}

function removeWithRefresh(id) { removeFavorite(id); refreshKey.value++; detailItem.value = null }

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

/* 详情弹窗 */
.fd-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 200;
}
.fd-modal {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%) scale(0.9);
  width: min(440px, 85vw); max-height: 70vh;
  background: $theme-white; border-radius: 14px; z-index: 201;
  display: flex; flex-direction: column; opacity: 0; transition: all 0.25s ease;
  box-shadow: 0 12px 40px rgba(0,0,0,0.18); overflow: hidden;
}
.fd-modal.open { opacity: 1; transform: translate(-50%,-50%) scale(1); }
.fd-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid $theme-light-gray; flex-shrink: 0;
}
.fd-title { font-size: 16px; font-weight: $font-weight-bold; color: $theme-ink; }
.fd-close { font-size: 20px; color: $theme-gray; cursor: pointer; padding: 4px; line-height: 1; }
.fd-body { padding: 16px 20px 12px; overflow-y: auto; flex: 1; }
.fd-preview {
  width: 60px; height: 60px; border-radius: 10px; margin: 0 auto 16px;
  display: flex; align-items: center; justify-content: center;
  background: $theme-bg; font-size: 24px;
}
.fd-section { margin-bottom: 12px; }
.fd-label { font-size: 11px; font-weight: 600; color: $theme-placeholder; display: block; margin-bottom: 2px; }
.fd-value { font-size: 14px; color: $theme-text-body; display: block; line-height: 1.5; }
.fd-content { font-size: 12px; color: $theme-text-secondary; background: $theme-bg; padding: 8px 10px; border-radius: 6px; max-height: 140px; overflow-y: auto; word-break: break-all; }
.fd-footer {
  padding: 12px 20px 16px; display: flex; gap: 10px;
  border-top: 1px solid $theme-light-gray; flex-shrink: 0;
}
.fd-btn {
  flex: 1; padding: 8px; border-radius: 6px; font-size: 13px; font-weight: 600;
  text-align: center; cursor: pointer;
  background: $theme-red; color: #fff;
}
.fd-btn-del { background: $theme-white; color: $theme-ink; border: 1px solid $theme-border; }
</style>
