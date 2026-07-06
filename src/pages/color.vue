<template>
  <view class="page-layout">
    <TopNav current="color" />
    <view class="content">
      <view class="page-header">
        <text class="page-title">传统色彩</text>
      </view>
      <view class="page-divider"></view>
        <view class="color-toggle">
          <view class="t-btn" :class="{ active: mode === 'full' }" @tap="mode = 'full'">全色库 (103色)</view>
          <view class="t-btn" :class="{ active: mode === 'ai' }" @tap="mode = 'ai'">AI 友好色</view>
        </view>
        <view class="grid">
          <view v-for="c in colors" :key="c.name" class="color-card">
            <view class="swatch" :style="{ backgroundColor: c.hex }"></view>
            <text class="c-name">{{ c.name }}</text>
            <text class="c-hex">{{ c.hex }}</text>
          </view>
      </view>
    </view>
    <Footer />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'

const mode = ref('full')

const fullColors = [
  { name: '赤', hex: '#C41E3A' },
  { name: '玄', hex: '#2C2C2C' },
  { name: '青', hex: '#1B5583' },
  { name: '白', hex: '#FAFAFA' },
  { name: '黄', hex: '#D4A84B' },
  { name: '绯', hex: '#C4444C' },
  { name: '黛', hex: '#4A5568' },
  { name: '藕荷', hex: '#C9A9B0' }
]

const aiColors = fullColors.filter(c => c.hex !== '#2C2C2C')

const colors = computed(() => mode.value === 'full' ? fullColors : aiColors)
</script>

<style lang="scss" scoped>
.page-layout { min-height: 100vh; background: $theme-bg; }
.content { padding: clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px); }
@media (min-width: 1200px) { .content { width: 80%; margin: 0 auto; } }

.page-header { margin-bottom: 24px; }
.page-title { font-size: $font-size-page-title-sub; font-weight: $font-weight-bold; color: $theme-ink; }

.page-divider { width: 60px; height: 3px; background: $theme-red; margin-bottom: 28px; border-radius: 2px; }

.color-toggle {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.t-btn {
  padding: 10px 24px;
  border-radius: 20px;
  font-size: $font-size-body-sub;
  background: $theme-white;
  color: $theme-gray;
  border: 1px solid $theme-border;
  cursor: pointer;

  &.active { background: $theme-red; color: $theme-white; border-color: $theme-red; }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}

.color-card {
  text-align: center;
}

.swatch {
  width: 100%;
  height: 80px;
  border-radius: 8px;
  border: 1px solid $theme-light-gray;
  margin-bottom: 8px;
  transition: all 0.25s;
}

.color-card:hover .swatch {
  box-shadow: 0 4px 12px rgba($theme-ink, 0.1);
  transform: scale(1.03);
}

.c-name {
  font-size: $font-size-body-sub;
  color: $theme-ink;
  display: block;
}

.c-hex {
  font-size: $font-size-xxs;
  color: $theme-gray;
}
</style>
