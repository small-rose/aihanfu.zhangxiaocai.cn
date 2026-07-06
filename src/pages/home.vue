<template>
  <view class="home-page">
    <TopNav current="index" />
    <view class="hero">
      <view class="hero-inner">
        <text class="brand">朝代脉络</text>
        <text class="brand-en">Dynasty Lineage</text>
        <text class="hero-title">循衣冠之脉 · 览千年华章</text>
        <text class="hero-subtitle">从先秦到明末，一览千年服章之美</text>
      </view>
    </view>

    <view class="section">
      <view class="tl-row">
        <view class="tl-line"></view>
        <view
          v-for="d in dynasties"
          :key="d.id"
          class="tl-node"
          @tap="selectDynasty(d.id)"
        >
          <view
            class="tl-dot"
            :class="{ active: selectedDynasty === d.id }"
          >
            <image
              class="tl-img"
              :src="d.icon"
              :class="{ active: selectedDynasty === d.id }"
              mode="aspectFill"
            />
          </view>
          <text class="tl-name" :class="{ active: selectedDynasty === d.id }">{{ d.name }}</text>
          <text class="tl-period">{{ d.period }}</text>
        </view>
      </view>

      <view class="tl-desc-card">
        <text class="tl-desc-title">
          {{ currentDynasty.name }}
          <text class="tl-desc-period"> {{ currentDynasty.period }}</text>
        </text>
        <text class="tl-desc-summary">{{ currentDynasty.summary }}</text>
        <view class="tl-detail">
          <view class="tl-detail-item">
            <text class="tl-detail-label">服饰特征</text>
            <text class="tl-detail-text">{{ currentDynasty.features }}</text>
          </view>
          <view class="tl-detail-item">
            <text class="tl-detail-label">妆容发型</text>
            <text class="tl-detail-text">{{ currentDynasty.makeup }}</text>
          </view>
          <view class="tl-detail-item">
            <text class="tl-detail-label">典型服饰</text>
            <view class="tl-detail-chips">
              <text v-for="g in currentDynasty.garments" :key="g" class="chip">{{ g }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-divider"></view>
      <text class="section-label">六大主题 · 遍览华服</text>
      <view class="features-row">
        <view class="feature-card" @tap="navTo('lexicon')">
          <text class="feature-icon">📖</text>
          <text class="feature-title">词库浏览</text>
          <text class="feature-desc">200+ 汉服专业词汇，含释义与配图</text>
        </view>
        <view class="feature-card" @tap="navTo('prompter')">
          <text class="feature-icon">✨</text>
          <text class="feature-title">提示词组合器</text>
          <text class="feature-desc">自由组合服饰元素，一键生成 AI 绘图提示词</text>
        </view>
        <view class="feature-card" @tap="navTo('dynasty')">
          <text class="feature-icon">🏛️</text>
          <text class="feature-title">朝代博物馆</text>
          <text class="feature-desc">纵览历代服饰演变，感受时代风华</text>
        </view>
        <view class="feature-card" @tap="navTo('gallery')">
          <text class="feature-icon">🖼️</text>
          <text class="feature-title">灵感图库</text>
          <text class="feature-desc">精选 AI 生成汉服作品，启发创作灵感</text>
        </view>
        <view class="feature-card" @tap="navTo('color')">
          <text class="feature-icon">🎨</text>
          <text class="feature-title">传统色彩</text>
          <text class="feature-desc">103 种中国传统色，含 HEX 与 AI 可用标识</text>
        </view>
        <view class="feature-card" style="opacity:0.7;cursor:default;" @tap="showToast">
          <text class="feature-icon">📐</text>
          <text class="feature-title">纹样库</text>
          <text class="feature-desc">传统纹样图案参考（即将上线）</text>
        </view>
      </view>
    </view>

    <Footer />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { dynasties } from '../data/hanfu-data.js'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'

const selectedDynasty = ref('sui')

const currentDynasty = computed(() =>
  dynasties.find(d => d.id === selectedDynasty.value) || null
)

function selectDynasty(id) {
  selectedDynasty.value = id
}

function navTo(page) {
  uni.navigateTo({ url: `/pages/${page}` })
}

function showToast() {
  uni.showToast({ title: '即将上线，敬请期待', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background: $theme-bg;
}



.hero {
  padding: clamp(40px, 8vw, 80px) clamp(16px, 4vw, 48px) clamp(32px, 5vw, 60px);
  text-align: center;
  background: linear-gradient(180deg, $theme-cream 0%, $theme-bg 100%);

  .hero-inner { max-width: 800px; margin: 0 auto; }

  .brand {
    font-size: $font-size-small; color: $theme-red; letter-spacing: $letter-spacing-wide; text-transform: uppercase;
    display: block; margin-bottom: 24px; font-weight: $font-weight-semibold;
  }

  .brand-en {
    font-size: $font-size-xxs; color: $theme-border; letter-spacing: $letter-spacing-medium; text-transform: uppercase;
    display: block; margin-bottom: 32px;
  }

  .hero-title {
    font-size: $font-size-hero; font-weight: $font-weight-bold; color: $theme-ink;
    letter-spacing: $letter-spacing-wide; display: block;
  }

  .hero-subtitle {
    font-size: $font-size-subtitle; color: $theme-gray;
    margin-top: 16px; letter-spacing: 3px; display: block;
  }
}

.section {
  padding: clamp(24px, 4vw, 48px) clamp(16px, 4vw, 48px) clamp(12px, 2vw, 24px);
}
@media (min-width: 1200px) { .section { width: 80%; margin: 0 auto; } }

.section-divider {
  width: 60px; height: 3px; background: $theme-red;
  margin: 0 auto 20px; border-radius: 2px;
}

.section-label {
  font-size: 26px; color: $theme-ink; letter-spacing: $letter-spacing-wide; text-transform: uppercase;
  display: block; margin-bottom: 20px; font-weight: $font-weight-semibold; text-align: center;
}

.tl-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  position: relative;
  margin-bottom: 24px;
}

.tl-line {
  position: absolute;
  top: 46px;
  left: 0;
  right: 0;
  height: 1px;
  background: $theme-border;
  z-index: 0;
}

.tl-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.tl-dot {
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: 2px solid $theme-border;
  background: $theme-bg;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-sizing: border-box;
  overflow: hidden;
}

.tl-dot.active {
  border-color: $theme-red;
  box-shadow: 0 0 0 6px rgba($theme-red, 0.12);
}

.tl-img {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  object-fit: cover;
  opacity: 0.8;
  filter: grayscale(35%);
  transition: all 0.3s;
}

.tl-img.active {
  opacity: 1;
  filter: grayscale(0%);
}

.tl-node:hover .tl-img:not(.active) {
  opacity: 1;
  filter: grayscale(0%);
}

.tl-node:hover .tl-dot:not(.active) {
  border-color: rgba($theme-red, 0.5);
}

.tl-name {
  font-size: $font-size-subtitle;
  font-weight: $font-weight-bold;
  color: $theme-ink;
  transition: color 0.3s;
  font-family: $font-cn;
}

.tl-name.active {
  color: $theme-red;
}

.tl-period {
  font-size: $font-size-xxs;
  color: $theme-gray;
  text-align: center;
  line-height: $line-height-tight;
}

.tl-desc-card {
  max-width: 720px;
  margin: 0 auto;
  background: $theme-white;
  border-radius: 12px;
  border: 1px solid $theme-light-gray;
  padding: 28px 32px;
}

.tl-desc-title {
  display: block;
  text-align: center;
  font-size: 20px;
  font-weight: $font-weight-bold;
  color: $theme-red;
  font-family: $font-cn;
  letter-spacing: $letter-spacing-normal;
}

.tl-desc-period {
  font-size: $font-size-small;
  font-weight: $font-weight-regular;
  color: $theme-gray;
  letter-spacing: 0;
}

.tl-desc-summary {
  display: block;
  text-align: center;
  font-size: $font-size-body;
  color: $theme-text-secondary;
  line-height: $line-height-relaxed;
  margin-top: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid $theme-light-gray;
}

.tl-detail {
  margin-top: 16px;
}

.tl-detail-item {
  margin-bottom: 18px;
}

.tl-detail-label {
  display: block;
  font-size: $font-size-body;
  font-weight: $font-weight-semibold;
  color: $theme-red;
  margin-bottom: 6px;
}

.tl-detail-text {
  display: block;
  font-size: $font-size-small;
  color: $theme-text-body;
  line-height: $line-height-relaxed;
}

.tl-detail-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  padding: 5px 14px;
  background: $theme-bg;
  border-radius: 12px;
  font-size: $font-size-small;
  color: $theme-ink;
}

.features-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.feature-card {
  background: $theme-white;
  border-radius: 12px;
  padding: 32px 28px;
  cursor: pointer;
  transition: all 0.25s;
  box-shadow: 0 2px 8px rgba($theme-ink, 0.04);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba($theme-red, 0.08);
  }

  .feature-icon { font-size: $font-size-page-title; display: block; margin-bottom: 12px; }
  .feature-title { font-size: $font-size-section-title; font-weight: $font-weight-semibold; color: $theme-red; display: block; margin-bottom: 8px; }
  .feature-desc { font-size: $font-size-body; color: $theme-gray; line-height: $line-height-normal; }
}
</style>
