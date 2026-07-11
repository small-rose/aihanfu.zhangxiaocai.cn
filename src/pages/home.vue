<template>
  <view class="home-page">
    <TopNav current="index" />
    <view class="hero">
      <view class="hero-inner">
        <text class="brand">朝代脉络</text>
        <text class="brand-en">Dynasty Lineage</text>
        <text class="hero-title hero-title-pc">循衣冠之脉 · 览千年华章</text>
        <view class="hero-title hero-title-mb">
          <text>循衣冠之脉</text>
          <text>览千年华章</text>
        </view>
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

    <FavoriteFab />
    <Footer />
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { dynasties } from '../data/hanfu-data.js'

onLoad(() => {
  document.title = '汉服图鉴 | Hanfu Reference - 朝代脉络'
  let d = document.querySelector('meta[name="description"]')
  if (!d) { d = document.createElement('meta'); d.name = 'description'; document.head.appendChild(d) }
  d.content = '汉服图鉴——从先秦到明末，一览千年服章之美。汉服朝代博物馆、传统色彩、服饰词库、AI提示词生成器。'
  let k = document.querySelector('meta[name="keywords"]')
  if (!k) { k = document.createElement('meta'); k.name = 'keywords'; document.head.appendChild(k) }
  k.content = '汉服,汉服图鉴,传统服饰,汉服朝代,中国传统文化,汉服词库'
})
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'
import FavoriteFab from '../components/FavoriteFab.vue'

const selectedDynasty = ref('sui')

  /* 移动端（≤768px）默认选中"汉"，PC 保持"隋" */
onMounted(() => {
  const sys = uni.getSystemInfoSync()
  if (sys.windowWidth <= 768) selectedDynasty.value = 'han'
})

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
    font-family: $font-cn;
  }

  .brand-en {
    font-size: $font-size-xxs; color: $theme-border; letter-spacing: $letter-spacing-medium; text-transform: uppercase;
    display: block; margin-bottom: 32px;
  }

  .hero-title {
    font-size: $font-size-hero; font-weight: $font-weight-bold; color: $theme-ink;
    letter-spacing: $letter-spacing-wide; display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Serif SC', serif;
  }
  /* PC 显示含中点单行，移动端显示两行无中点（由 media query 切换） */
  .hero-title-pc { display: block; }
  .hero-title-mb { display: none; }

  .hero-subtitle {
    font-size: $font-size-subtitle; color: $theme-gray;
    margin-top: 16px; letter-spacing: 3px; display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Serif SC', serif;
  }

  /* 移动端：标题分两行，去掉中点"·" */
  @media (max-width: 768px) {
    .hero-title-pc { display: none; }
    .hero-title-mb {
      display: flex; flex-direction: column; align-items: center;
      gap: 6px;
    }
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

@media (max-width: 768px) {
  .page-layout { overflow-x: hidden; }
  .tl-row {
    grid-template-columns: none;
    display: flex; gap: 8px; overflow-x: auto; padding: 4px 0 12px;
    -webkit-overflow-scrolling: touch; scroll-snap-type: x mandatory;
    &::after { content: ''; flex-shrink: 0; width: 8px; }
  }
  .tl-line { display: none; }
  .tl-node { flex-shrink: 0; width: 100px; scroll-snap-align: start; }
  .tl-dot { width: 72px; height: 72px; }
  .tl-img { width: 60px; height: 60px; }
  .tl-period { font-size: 10px; }
  .features-row { grid-template-columns: 1fr 1fr; gap: 12px; }
  .feature-card { padding: 20px 16px; }
  .feature-card .feature-icon { font-size: 22px; }
  .feature-card .feature-title { font-size: 15px; }
  .feature-card .feature-desc { font-size: 12px; }
  .tl-desc-card { padding: 20px 16px; }
  .section-label { font-size: 22px; }
}
</style>
