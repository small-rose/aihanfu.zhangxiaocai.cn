<template>
  <view>
    <view v-show="item" class="drawer-overlay" :class="{ fade: !closing }" @tap="startClose"></view>
    <view class="detail-drawer" :class="{ open: !!item && !closing }">
      <view class="drawer-header">
        <text class="drawer-title">{{ categoryLabel }}详情</text>
        <view class="drawer-header-actions">
          <text class="drawer-fav-btn" @tap.stop="$emit('toggle-fav')">{{ favorite ? '★' : '☆' }}</text>
          <text class="drawer-close-btn" @tap="startClose">✕</text>
        </view>
      </view>
      <!-- 顶部装饰区：有图时展示 AI 生成的发髻图，无图时保持渐变+首字占位 -->
      <!-- 用 v-show 保持 DOM 不销毁，避免抽屉关闭再打开时图片重新加载 -->
      <view v-show="item?.imagePath" class="drawer-deco drawer-deco-img">
        <view v-show="!imgLoaded" class="drawer-img-placeholder"></view>
        <image class="drawer-deco-image" :class="{ loaded: imgLoaded }" :src="item.imagePath" mode="widthFix" @load="imgLoaded = true" />
      </view>
      <view v-show="item && !item?.imagePath" class="drawer-deco">
        <text class="drawer-deco-char">{{ item?.term?.[0] || '?' }}</text>
        <text class="drawer-deco-label">{{ item?.sub || categoryLabel }}</text>
      </view>
      <view class="drawer-content">
      <view class="dc-group">
      <text class="drawer-term">{{ item?.term }}<text v-if="item?.pinyin" class="drawer-pinyin">（{{ item.pinyin }}）</text></text>
      </view>
      <!-- 释义：ds-title/ds-text 参考 color.vue 色彩详情样式，左侧红竖线+两端对齐 -->
      <view class="dc-group">
      <view class="drawer-section">
        <text class="ds-title">释义</text>
        <text class="ds-text">{{ item?.meaning }}</text>
      </view>
      </view>
      <view v-if="item?.detail" class="dc-group">
      <view class="drawer-section">
        <text class="ds-title">详细</text>
        <text class="ds-text">{{ item.detail }}</text>
      </view>
      </view>
      <!-- 朝代/身份/子类标签 -->
      <view v-if="hasMeta" class="dc-group">
      <view class="drawer-meta">
        <text v-if="item?.dynasty && item.dynasty !== '通用'" class="drawer-tag">{{ item.dynasty }}</text>
        <text v-if="item?.dynasties" v-for="d in item.dynasties" :key="d" class="drawer-tag">{{ d }}</text>
        <text v-if="item?.identity" class="drawer-tag id-tag">{{ item.identity }}</text>
        <text v-if="item?.gender" class="drawer-tag gender-tag">{{ item.gender }}</text>
        <text v-if="item?.sub" class="drawer-tag sub-tag">{{ item.sub }}</text>
      </view>
      </view>
      <!-- AI 生成参考：默认折叠，点击展开 -->
      <view v-if="item?.aiPrompt || item?.cnPrompt" class="dc-group">
      <view class="drawer-ai-toggle" @tap="showAiInfo = !showAiInfo">
        <text class="drawer-ai-toggle-label">AI 生成参考</text>
        <text class="drawer-ai-toggle-arrow">{{ showAiInfo ? '▾' : '▸' }}</text>
      </view>
      <template v-if="showAiInfo">
        <view class="drawer-ai-section">
          <view v-if="item?.aiStyle" class="drawer-ai-tags">
            <text class="ai-tag style-tag">{{ item.aiStyle }}</text>
            <text v-if="item?.aiLayout" class="ai-tag layout-tag">{{ item.aiLayout }}</text>
          </view>
          <view v-if="item?.cnPrompt" class="drawer-ai-prompt">
            <text class="ds-title">中文提示词</text>
            <text class="ds-text">{{ item.cnPrompt }}</text>
          </view>
          <view v-if="item?.aiPrompt" class="drawer-ai-prompt">
            <text class="ds-title">English Prompt</text>
            <text class="ds-text">{{ item.aiPrompt }}</text>
          </view>
        </view>
      </template>
      </view>
    </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  item: { type: Object, default: null },
  categoryLabel: { type: String, default: '词条' },
  favorite: { type: Boolean, default: false }
})
const emit = defineEmits(['close', 'toggle-fav'])

const showAiInfo = ref(false)
const imgLoaded = ref(false)
const closing = ref(false)

// item 切换到新词条时重置图片加载状态（关闭 drawer 置 null 时不重置，保留缓存）
watch(() => props.item, (val) => {
  if (val) { imgLoaded.value = false; closing.value = false }
})

function startClose() {
  closing.value = true
  setTimeout(() => { closing.value = false; emit('close') }, 500)
}

const hasMeta = computed(() => {
  if (!props.item) return false
  const i = props.item
  return !!(i.dynasty || i.dynasties || i.identity || i.gender || i.sub)
})
</script>

<style lang="scss" scoped>
.drawer-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 200;
  opacity: 0; transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.drawer-overlay.fade { opacity: 1; }

.detail-drawer {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: 33.33%; max-width: 500px; min-width: 300px;
  background: $theme-white; z-index: 201;
  transform: translateX(100%); transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex; flex-direction: column; overflow-y: auto;
  box-shadow: -4px 0 20px rgba(0,0,0,0.1);
}

.detail-drawer.open { transform: translateX(0); }

.drawer-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; flex-shrink: 0;
}

.drawer-title { font-size: 15px; font-weight: $font-weight-semibold; color: $theme-ink; }

.drawer-header-actions { display: flex; align-items: center; gap: 6px; }
.drawer-fav-btn {
  font-size: 18px; cursor: pointer; color: $theme-gold;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1); transition: transform 0.2s;
  &:hover { transform: scale(1.2); }
}

.drawer-close-btn {
  width: 30px; height: 30px; border-radius: 50%;
  background: $theme-bg; color: $theme-gray;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; cursor: pointer; transition: background 0.2s;
  &:hover { background: #e8e0d8; }
}

/* 无图时的渐变占位 */
.drawer-deco {
  height: 100px; background: linear-gradient(135deg, $theme-ink, #555);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  flex-shrink: 0; position: relative; overflow: hidden;
  &::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 30% 40%, rgba($theme-gold, 0.08), transparent 60%);
  }
}
.drawer-deco-char {
  font-size: 36px; color: rgba($theme-white, 0.9); font-weight: $font-weight-bold;
  font-family: $font-cn; position: relative; z-index: 1;
}
.drawer-deco-label {
  font-size: 11px; color: rgba($theme-white, 0.5); margin-top: 4px;
  position: relative; z-index: 1;
}

.drawer-deco-img {
  display: block; height: auto; background: $theme-bg; line-height: 0;
  padding: 0 24px; position: relative; min-height: 120px;
  &::after { display: none; }
}
.drawer-img-placeholder {
  width: 100%; max-width: 280px; margin: 0 auto; padding-bottom: 75%;
  background: linear-gradient(110deg, $theme-bg 30%, #e8e0d8 50%, $theme-bg 70%);
  background-size: 200% 100%;
  animation: shimmer 1.2s ease infinite;
}
@keyframes shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
.drawer-deco-image {
  width: 100%; max-width: 280px; height: auto; display: block; margin: 0 auto;
  opacity: 0; transition: opacity 0.5s ease;
  border-radius: 2px;
}
.drawer-deco-image.loaded { opacity: 1; }

.drawer-content { padding: 16px 20px 32px; flex: 1; }

/* 入场动画 */
.dc-group,
.dc-group ~ .dc-group ~ .dc-group { transition: opacity 0.3s ease, transform 0.3s ease; }
.detail-drawer:not(.open) .dc-group {
  opacity: 0; transform: translateY(8px);
}
.detail-drawer.open .dc-group { transition-delay: 0s; }
.detail-drawer.open .dc-group ~ .dc-group { transition-delay: 0.08s; }
.detail-drawer.open .dc-group ~ .dc-group ~ .dc-group { transition-delay: 0.16s; }
.detail-drawer.open .dc-group ~ .dc-group ~ .dc-group ~ .dc-group { transition-delay: 0.24s; }
.detail-drawer.open .dc-group ~ .dc-group ~ .dc-group ~ .dc-group ~ .dc-group { transition-delay: 0.32s; }

/* 词条名：大号+底部装饰线 */
.dc-group:first-child {
  padding-bottom: 12px; margin-bottom: 12px;
  border-bottom: 2px solid $theme-red;
  position: relative;
  &::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 40px; height: 2px; background: $theme-gold;
  }
}

.drawer-term {
  font-size: 26px; font-weight: $font-weight-bold; color: $theme-ink; display: block;
  line-height: 1.3; font-family: $font-cn;
}
.drawer-pinyin {
  font-size: 13px; color: $theme-placeholder; font-weight: $font-weight-regular;
  margin-left: 8px; font-family: $font-en;
}

.drawer-section { margin-bottom: 16px; }
.ds-title {
  font-size: 13px; font-weight: $font-weight-semibold; color: $theme-ink;
  display: block; margin-bottom: 6px;
  padding-left: 10px; border-left: 3px solid $theme-red;
}
.ds-text {
  font-size: $font-size-body-sub; color: $theme-text-body;
  line-height: 1.7; display: block; text-align: justify;
}

.drawer-meta {
  display: flex; gap: 5px; flex-wrap: wrap;
  margin-top: 16px; padding-top: 14px;
  border-top: 1px solid $theme-light-gray;
}
.drawer-tag {
  font-size: 11px; padding: 2px 10px; border-radius: 3px; font-weight: 500;
  background: $theme-white; color: $theme-text-secondary;
  border: 1px solid $theme-border;
}
.drawer-tag.id-tag { border-color: rgba($theme-red, 0.25); color: $theme-red; background: rgba($theme-red, 0.04); }
.drawer-tag.gender-tag { border-color: rgba($theme-ink, 0.15); color: $theme-ink; }
.drawer-tag.sub-tag { border-color: rgba($theme-gold, 0.25); color: #8B6B2A; background: rgba($theme-gold, 0.06); }

/* AI 生成参考 */
.drawer-ai-toggle {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 16px; padding: 8px 12px;
  background: rgba($theme-gold, 0.04); border-radius: 6px;
  border: 1px solid rgba($theme-gold, 0.12); cursor: pointer;
  transition: background 0.2s;
  &:hover { background: rgba($theme-gold, 0.08); }
}
.drawer-ai-toggle-label {
  font-size: 11px; font-weight: $font-weight-semibold; color: $theme-placeholder;
  letter-spacing: 1px;
}
.drawer-ai-toggle-arrow { font-size: 11px; color: $theme-placeholder; }
.drawer-ai-section {
  padding: 12px 12px 16px;
  background: rgba($theme-gold, 0.04);
  border-radius: 0 0 6px 6px;
  border-left: 1px solid rgba($theme-gold, 0.12);
  border-right: 1px solid rgba($theme-gold, 0.12);
  border-bottom: 1px solid rgba($theme-gold, 0.12);
  border-top: none;
}
.drawer-ai-tags { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 12px; }
.ai-tag {
  font-size: 10px; padding: 2px 8px; border-radius: 3px; font-weight: 500;
}
.ai-tag.style-tag { background: rgba($theme-ink, 0.05); color: $theme-ink; }
.ai-tag.layout-tag { background: rgba($theme-red, 0.05); color: $theme-red; }
.drawer-ai-prompt { margin-top: 10px; }
.drawer-ai-prompt-label {
  font-size: 10px; font-weight: 600; color: $theme-placeholder;
  letter-spacing: 0.5px; display: block; margin-bottom: 4px;
}
.drawer-ai-prompt-text {
  font-size: 11px; color: $theme-text-secondary; display: block;
  line-height: 1.6; text-align: justify; word-break: break-all;
}
</style>
