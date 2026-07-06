<template>
  <view>
    <view v-if="item" class="drawer-overlay" @tap="$emit('close')"></view>
    <view class="detail-drawer" :class="{ open: !!item }">
      <view class="drawer-header">
        <text class="drawer-title">{{ categoryLabel }}详情</text>
        <text class="drawer-close-btn" @tap="$emit('close')">✕</text>
      </view>
      <view class="drawer-img-area">
        <text class="drawer-img-placeholder">{{ item?.term?.[0] || '?' }}</text>
      </view>
      <view class="drawer-content">
        <text class="drawer-term">{{ item?.term }}<text v-if="item?.pinyin" class="drawer-pinyin">（{{ item.pinyin }}）</text></text>
        <text class="drawer-meaning">{{ item?.meaning }}</text>
        <text v-if="item?.detail" class="drawer-detail">{{ item.detail }}</text>
        <view class="drawer-meta">
          <text v-if="item?.dynasty && item.dynasty !== '通用'" class="drawer-tag">{{ item.dynasty }}</text>
          <text v-if="item?.dynasties" v-for="d in item.dynasties" :key="d" class="drawer-tag">{{ d }}</text>
          <text v-if="item?.identity" class="drawer-tag id-tag">{{ item.identity }}</text>
          <text v-if="item?.gender" class="drawer-tag gender-tag">{{ item.gender }}</text>
          <text v-if="item?.sub" class="drawer-tag sub-tag">{{ item.sub }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, default: null },
  categoryLabel: { type: String, default: '词条' }
})
defineEmits(['close'])
</script>

<style lang="scss" scoped>
.drawer-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 200;
}

.detail-drawer {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: 33.33%; max-width: 500px; min-width: 300px;
  background: $theme-white; z-index: 201;
  transform: translateX(100%); transition: transform 0.3s ease;
  display: flex; flex-direction: column; overflow-y: auto;
  box-shadow: -4px 0 20px rgba(0,0,0,0.1);
}

.detail-drawer.open { transform: translateX(0); }

.drawer-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; flex-shrink: 0;
}

.drawer-title { font-size: 16px; font-weight: $font-weight-semibold; color: $theme-ink; }

.drawer-close-btn {
  width: 32px; height: 32px; border-radius: 50%;
  background: $theme-bg; color: $theme-gray;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; cursor: pointer;
}

.drawer-img-area {
  height: 280px; background: $theme-bg; display: flex;
  align-items: center; justify-content: center; flex-shrink: 0;
}

.drawer-img-placeholder {
  font-size: 64px; color: $theme-border; font-weight: $font-weight-bold;
  font-family: $font-cn;
}

.drawer-content { padding: 24px; flex: 1; }

.drawer-term { font-size: 22px; font-weight: $font-weight-bold; color: $theme-ink; display: block; }
.drawer-pinyin { font-size: 14px; color: $theme-placeholder; font-weight: $font-weight-regular; margin-left: 6px; }

.drawer-meaning { font-size: 15px; color: $theme-text-body; display: block; margin-top: 8px; line-height: 1.6; }

.drawer-detail { font-size: 13px; color: $theme-text-secondary; display: block; margin-top: 16px; line-height: 1.8; text-align: justify; }

.drawer-meta { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 16px; padding-top: 16px; border-top: 1px solid $theme-light-gray; }

.drawer-tag {
  font-size: 12px; padding: 4px 12px; border-radius: 4px; font-weight: 500;
  background: $theme-bg; color: $theme-text-secondary;
}
.drawer-tag.id-tag { background: rgba($theme-red, 0.06); color: $theme-red; }
.drawer-tag.gender-tag { background: rgba($theme-ink, 0.06); color: $theme-ink; }
.drawer-tag.sub-tag { background: rgba($theme-gold, 0.1); color: #8B6B2A; }
</style>
