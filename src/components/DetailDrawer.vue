<template>
  <view>
    <view v-if="item" class="drawer-overlay" @tap="$emit('close')"></view>
    <view class="detail-drawer" :class="{ open: !!item }">
      <view class="drawer-header">
        <text class="drawer-title">{{ categoryLabel }}详情</text>
        <text class="drawer-close-btn" @tap="$emit('close')">✕</text>
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
      <view class="dc-group">
      <view class="drawer-meaning-block">
        <text class="drawer-meaning-label">释义</text>
        <text class="drawer-meaning">{{ item?.meaning }}</text>
      </view>
      </view>
      <view v-if="item?.detail" class="dc-group">
      <view class="drawer-detail-block">
        <text class="drawer-detail-label">详细</text>
        <text class="drawer-detail">{{ item.detail }}</text>
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
            <text class="drawer-ai-prompt-label">中文提示词</text>
            <text class="drawer-ai-prompt-text">{{ item.cnPrompt }}</text>
          </view>
          <view v-if="item?.aiPrompt" class="drawer-ai-prompt">
            <text class="drawer-ai-prompt-label">English Prompt</text>
            <text class="drawer-ai-prompt-text">{{ item.aiPrompt }}</text>
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
  categoryLabel: { type: String, default: '词条' }
})
defineEmits(['close'])

const showAiInfo = ref(false)
const imgLoaded = ref(false)

// item 切换到新词条时重置图片加载状态（关闭 drawer 置 null 时不重置，保留缓存）
watch(() => props.item, (val) => {
  if (val) imgLoaded.value = false
})

const hasMeta = computed(() => {
  if (!props.item) return false
  const i = props.item
  return !!(i.dynasty || i.dynasties || i.identity || i.gender || i.sub)
})
</script>

<style lang="scss" scoped>
.drawer-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 200;
}

.detail-drawer {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: 33.33%; max-width: 500px; min-width: 300px;
  background: $theme-white; z-index: 201;
  transform: translateX(100%); transition: transform 0.35s ease;
  display: flex; flex-direction: column; overflow-y: auto;
  box-shadow: -4px 0 20px rgba(0,0,0,0.1);
}

.detail-drawer.open { transform: translateX(0); }

.drawer-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; flex-shrink: 0;
}

.drawer-title { font-size: 15px; font-weight: $font-weight-semibold; color: $theme-ink; }

.drawer-close-btn {
  width: 30px; height: 30px; border-radius: 50%;
  background: $theme-bg; color: $theme-gray;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; cursor: pointer; transition: background 0.2s;
  &:hover { background: #e8e0d8; }
}

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

.drawer-content { padding: 20px 24px 32px; flex: 1; }

/* 内容块因 v-if 使 nth-child 不可靠，用相邻兄弟选择器确定顺序 */
.dc-group,
.dc-group ~ .dc-group ~ .dc-group { transition: opacity 0.3s ease, transform 0.3s ease; }
.detail-drawer:not(.open) .dc-group {
  opacity: 0; transform: translateY(8px);
}
/* 用递增 delay 实现逐条入场，v-if 移除的组自动跳过 */
.detail-drawer.open .dc-group { transition-delay: 0s; }
.detail-drawer.open .dc-group ~ .dc-group { transition-delay: 0.06s; }
.detail-drawer.open .dc-group ~ .dc-group ~ .dc-group { transition-delay: 0.12s; }
.detail-drawer.open .dc-group ~ .dc-group ~ .dc-group ~ .dc-group { transition-delay: 0.18s; }
.detail-drawer.open .dc-group ~ .dc-group ~ .dc-group ~ .dc-group ~ .dc-group { transition-delay: 0.24s; }

.drawer-term {
  font-size: 22px; font-weight: $font-weight-bold; color: $theme-ink; display: block;
  line-height: 1.3;
}
.drawer-pinyin { font-size: 13px; color: $theme-placeholder; font-weight: $font-weight-regular; margin-left: 6px; }

.drawer-meaning-block { margin-top: 14px; }
.drawer-meaning-label, .drawer-detail-label {
  font-size: 11px; font-weight: $font-weight-semibold; color: $theme-placeholder;
  text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;
}

.drawer-meaning {
  font-size: 15px; color: $theme-text-body; line-height: 1.7; display: block;
}

.drawer-detail-block { margin-top: 18px; }

.drawer-detail {
  font-size: 13px; color: $theme-text-secondary; display: block;
  line-height: 1.8; text-align: justify;
}

.drawer-meta {
  display: flex; gap: 6px; flex-wrap: wrap;
  margin-top: 20px; padding-top: 16px; border-top: 1px solid $theme-light-gray;
}

.drawer-tag {
  font-size: 11px; padding: 3px 10px; border-radius: 4px; font-weight: 500;
  background: $theme-bg; color: $theme-text-secondary;
}
.drawer-tag.id-tag { background: rgba($theme-red, 0.06); color: $theme-red; }
.drawer-tag.gender-tag { background: rgba($theme-ink, 0.06); color: $theme-ink; }
.drawer-tag.sub-tag { background: rgba($theme-gold, 0.1); color: #8B6B2A; }

/* 图片版装饰区：替换渐变背景，padding 与内容区对齐 */
.drawer-deco-img {
  display: block; height: auto; background: $theme-bg; line-height: 0;
  padding: 0 24px; position: relative; min-height: 120px;
  &::after { display: none; }
}
/* 图片加载前的骨架占位，闪烁动画 */
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
/* 图片保持原始比例，不超过 280px，居中，加载后淡入 */
.drawer-deco-image {
  width: 100%; max-width: 280px; height: auto; display: block; margin: 0 auto;
  opacity: 0; transition: opacity 0.5s ease;
}
.drawer-deco-image.loaded { opacity: 1; }

/* AI 生成参考折叠/展开切换条 */
.drawer-ai-toggle {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 20px; padding: 10px 16px;
  background: rgba($theme-gold, 0.05); border-radius: 8px;
  border: 1px solid rgba($theme-gold, 0.15); cursor: pointer;
  transition: background 0.2s;
  &:hover { background: rgba($theme-gold, 0.1); }
}
.drawer-ai-toggle-label {
  font-size: 11px; font-weight: $font-weight-semibold; color: $theme-placeholder;
  text-transform: uppercase; letter-spacing: 1px;
}
.drawer-ai-toggle-arrow { font-size: 12px; color: $theme-placeholder; }

.drawer-ai-section {
  padding: 16px 16px 20px;
  background: rgba($theme-gold, 0.05); border-radius: 0 0 8px 8px;
  border-left: 1px solid rgba($theme-gold, 0.15);
  border-right: 1px solid rgba($theme-gold, 0.15);
  border-bottom: 1px solid rgba($theme-gold, 0.15);
  border-top: none;
}
.drawer-ai-label {
  font-size: 11px; font-weight: $font-weight-semibold; color: $theme-placeholder;
  text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 12px;
}
.drawer-ai-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
.ai-tag {
  font-size: 11px; padding: 3px 10px; border-radius: 4px; font-weight: 500;
}
.ai-tag.style-tag { background: rgba($theme-ink, 0.06); color: $theme-ink; }
.ai-tag.layout-tag { background: rgba($theme-red, 0.06); color: $theme-red; }
.drawer-ai-prompt { margin-top: 14px; }
.drawer-ai-prompt-label {
  font-size: 10px; font-weight: 600; color: $theme-placeholder;
  text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;
}
.drawer-ai-prompt-text {
  font-size: 11px; color: $theme-text-secondary; display: block;
  line-height: 1.6; text-align: justify; word-break: break-all;
}
</style>
