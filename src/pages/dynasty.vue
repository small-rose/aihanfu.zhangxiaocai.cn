<template>
  <view class="page-layout">
    <TopNav current="dynasty" />
    <view class="content">
      <view class="page-header">
        <text class="page-title">朝代博物馆</text>
      </view>
      <view class="page-divider"></view>

      <view class="dynasty-tabs">
        <view
          v-for="(d, key) in dynasties" :key="key"
          class="dtabs-item"
          :class="{ active: current === key }"
          @tap="current = key"
        >
          <text class="dtabs-name">{{ d.name }}</text>
          <text class="dtabs-period">{{ d.period }}</text>
        </view>
      </view>

      <view v-if="data" class="dynasty-detail">
        <view class="dynasty-hero">
          <text class="dynasty-title">{{ data.name }}</text>
          <text class="dynasty-title-en">{{ data.nameEn }}</text>
          <text class="dynasty-period">{{ data.period }}</text>
          <text class="dynasty-summary">{{ data.summary }}</text>
        </view>

        <view class="detail-grid">
          <view class="detail-card">
            <text class="detail-card-title">👘 服饰特征</text>
            <text class="detail-text">{{ data.features }}</text>
          </view>
          <view class="detail-card">
            <text class="detail-card-title">💄 妆容发型</text>
            <text class="detail-text">{{ data.makeup }}</text>
          </view>
        </view>

        <view class="garment-section">
          <text class="section-title">典型服饰</text>
          <view class="garment-grid">
            <view v-for="g in data.garments" :key="g" class="garment-chip">{{ g }}</view>
          </view>
        </view>

        <image v-if="data.image" class="dynasty-img" :src="data.image" mode="widthFix" />
      </view>
    </view>
    <Footer />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { dynasties as dynastyList } from '../data/hanfu-data.js'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'

const current = ref('tang')

const dynasties = {}
dynastyList.forEach(d => { dynasties[d.id] = d })

const data = computed(() => dynasties[current.value])
</script>

<style lang="scss" scoped>
.page-layout { min-height: 100vh; background: $theme-bg; }
.content { padding: clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px); }
@media (min-width: 1200px) { .content { width: 80%; margin: 0 auto; } }

.page-header { margin-bottom: 24px; }
.page-title { font-size: $font-size-page-title-sub; font-weight: $font-weight-bold; color: $theme-ink; }

.page-divider { width: 60px; height: 3px; background: $theme-red; margin-bottom: 28px; border-radius: 2px; }

.dynasty-tabs { display: flex; gap: 8px; margin-bottom: 32px; background: $theme-white; border-radius: 10px; padding: 8px; box-shadow: 0 2px 8px rgba($theme-ink, 0.04); }

.dtabs-item {
  flex: 1; text-align: center; padding: 14px 12px; border-radius: 8px; cursor: pointer;
  transition: all 0.2s;

  &.active { background: $theme-red; .dtabs-name { color: $theme-white; } .dtabs-period { color: rgba($theme-white, 0.7); } }
  &:hover:not(.active) { background: $theme-bg; }

  .dtabs-name { font-size: $font-size-subtitle; font-weight: $font-weight-semibold; color: $theme-ink; display: block; }
  .dtabs-period { font-size: $font-size-xs-sub; color: $theme-gray; margin-top: 4px; display: block; }
}

.dynasty-detail { }

.dynasty-hero { margin-bottom: 32px; text-align: center; padding: 40px 0; }

.dynasty-title { font-size: $font-size-dynasty-title; font-weight: $font-weight-bold; color: $theme-ink; display: block; letter-spacing: $letter-spacing-medium; }
.dynasty-title-en { font-size: $font-size-body-sub; color: $theme-red; display: block; margin-top: 4px; letter-spacing: $letter-spacing-normal; text-transform: uppercase; }
.dynasty-period { font-size: $font-size-body-sub; color: $theme-gray; display: block; margin-top: 8px; }
.dynasty-summary { font-size: $font-size-subtitle; color: $theme-text-secondary; display: block; margin-top: 16px; line-height: $line-height-loose; max-width: 600px; margin-left: auto; margin-right: auto; }

.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }

.detail-card { background: $theme-white; border-radius: 10px; padding: 24px; box-shadow: 0 2px 8px rgba($theme-ink, 0.04); transition: all 0.25s; }
.detail-card:hover { box-shadow: 0 8px 24px rgba($theme-ink, 0.06); transform: translateY(-2px); }

.detail-card-title { font-size: $font-size-subtitle; font-weight: $font-weight-semibold; color: $theme-red; display: block; margin-bottom: 12px; }
.detail-text { font-size: $font-size-body-sub; color: $theme-text-body; line-height: $line-height-loose; }

.garment-section { margin-bottom: 32px; }

.section-title { font-size: $font-size-subtitle; font-weight: $font-weight-semibold; color: $theme-ink; display: block; margin-bottom: 12px; }

.garment-grid { display: flex; flex-wrap: wrap; gap: 10px; }

.garment-chip { padding: 8px 20px; background: $theme-white; border-radius: 16px; font-size: $font-size-body-sub; color: $theme-ink; border: 1px solid $theme-border; transition: all 0.2s; }
.garment-chip:hover { border-color: $theme-red; color: $theme-red; }

.dynasty-img { width: 100%; border-radius: 12px; margin-top: 20px; }
</style>
