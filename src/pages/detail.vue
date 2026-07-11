<template>
  <view class="page-layout">
    <TopNav current="gallery" />
    <view v-if="img" class="detail-body">
      <view class="detail-left">
        <image class="main-img" :src="img.src" mode="widthFix" @tap="previewImage" />
      </view>
      <view class="detail-right">
        <view class="dc-header">
          <view class="dc-header-text">
            <text class="dc-title">{{ img.title }}</text>
            <text class="dc-dynasty">{{ img.dynasty }}</text>
          </view>
        </view>

        <view class="analysis-section">
          <text class="section-title">基础信息</text>
          <view class="analysis-grid">
            <view v-if="analysis.faceShape" class="analysis-item"><text class="al">脸型</text><text class="av">{{ analysis.faceShape }}</text></view>
            <view v-if="analysis.eyeType" class="analysis-item"><text class="al">眼型</text><text class="av">{{ analysis.eyeType }}</text></view>
            <view v-if="analysis.browType" class="analysis-item"><text class="al">眉型</text><text class="av">{{ analysis.browType }}</text></view>
            <view v-if="analysis.lipType" class="analysis-item"><text class="al">唇型</text><text class="av">{{ analysis.lipType }}</text></view>
            <view v-if="analysis.skinType" class="analysis-item"><text class="al">肤色</text><text class="av">{{ analysis.skinType }}</text></view>
            <view v-if="analysis.hairstyle" class="analysis-item"><text class="al">发髻</text><text class="av">{{ analysis.hairstyle }}</text></view>
            <view v-if="analysis.hairAccessory" class="analysis-item"><text class="al">发饰</text><text class="av">{{ analysis.hairAccessory }}</text></view>
            <view v-if="analysis.pose" class="analysis-item"><text class="al">姿势</text><text class="av">{{ analysis.pose }}</text></view>
          </view>
        </view>

        <view class="analysis-section">
          <text class="section-title">服饰搭配</text>
          <view class="analysis-grid">
            <view v-if="analysis.fabric.length" class="analysis-item"><text class="al">面料</text><text class="av">{{ analysis.fabric.join('、') }}</text></view>
            <view v-if="analysis.colors.length" class="analysis-item"><text class="al">色彩</text><text class="av">{{ analysis.colors.join('、') }}</text></view>
            <view v-if="analysis.clothing.length" class="analysis-item"><text class="al">款式</text><text class="av">{{ analysis.clothing.join('、') }}</text></view>
            <view v-if="analysis.scene.length" class="analysis-item"><text class="al">场景</text><text class="av">{{ analysis.scene.join('、') }}</text></view>
          </view>
        </view>

        <view v-if="analysis.suggestedTemperament.length" class="analysis-section">
          <text class="section-title">适合气质</text>
          <view class="tag-row">
            <text v-for="t in analysis.suggestedTemperament" :key="t" class="tag temperament-tag">{{ t }}</text>
          </view>
        </view>

        <view v-if="analysis.suggestedFaceShape.length" class="analysis-section">
          <text class="section-title">建议脸型</text>
          <view class="tag-row">
            <text v-for="t in analysis.suggestedFaceShape" :key="t" class="tag face-tag">{{ t }}</text>
          </view>
        </view>

        <view v-if="analysis.suggestedHairstyle.length" class="analysis-section">
          <text class="section-title">建议发髻</text>
          <view class="tag-row">
            <text v-for="t in analysis.suggestedHairstyle" :key="t" class="tag hair-tag">{{ t }}</text>
          </view>
        </view>

        <view v-if="analysis.tips.length" class="analysis-section">
          <text class="section-title">搭配心得</text>
          <view class="tips-list">
            <text v-for="(tip, i) in analysis.tips" :key="i" class="tip-item">· {{ tip }}</text>
          </view>
        </view>

        <view class="prompt-section">
          <view class="prompt-header">
            <text class="section-title">完整提示词</text>
          </view>
          <text class="prompt-label">中文</text>
          <textarea class="prompt-box" :value="img.prompt" readonly />
          <text class="prompt-label">English</text>
          <textarea class="prompt-box" :value="enPrompt" readonly />
        </view>

          <text class="dc-meta">{{ img.model }} · {{ img.size }} · {{ img.date }}</text>
        <view class="dc-fav-wrap">
          <view class="dc-fav-btn" @tap="toggleFav">
            <view class="dc-fav-icon">{{ isFav ? '★' : '☆' }}</view>
            <text class="dc-fav-text">收藏</text>
          </view>
        </view>
      </view>
    </view>
    <view v-if="!img" class="empty-state">
      <text class="empty-text">未找到图片</text>
    </view>
    <FavoriteFab />
    <Footer />
  </view>
</template>

<script>
import FavoriteFab from '../components/FavoriteFab.vue'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'
import { galleryData } from '../data/gallery-data.js'
import { addFavorite, removeFavorite, isFavorite } from '../utils/useFavorites.js'
import { showToast } from '../utils/useToast.js'
export default {
  components: { TopNav, Footer, FavoriteFab },
  data() { return { img: null, favId: null, favRefreshKey: 0, promptFavRefreshKey: 0 } },
  computed: {
    isFav() { const k = this.favRefreshKey; return this.favId ? isFavorite(this.favId) : false },
    isPromptFav() { this.promptFavRefreshKey; return this.favId ? isFavorite('prompt_' + this.favId) : false },
    analysis() { return this.img?.analysis || {} },
    enPrompt() {
      if (!this.img) return ''
      return this.img.prompt
        .replace(/，/g, ', ').replace(/。/g, '. ')
        .replace(/立于/g, 'standing in ').replace(/头梳/g, 'with ')
        .replace(/身穿/g, 'wearing ').replace(/上身穿着/g, 'wearing ')
        .replace(/内搭/g, 'over ').replace(/下穿/g, 'and ')
        .replace(/下着/g, 'and ').replace(/外披/g, 'with ')
        .replace(/脚穿/g, 'wearing ')
        .replace(/全身构图/g, 'full body shot')
        .replace(/从头到脚完整入镜/g, 'full body in frame')
        .replace(/平视角度/g, 'eye level')
        .replace(/商业摄影级画质/g, 'commercial photography quality')
        .replace(/8K超高清/g, '8K ultra high definition')
    }
  },
  onLoad(query) {
    document.title = query.title || '图片详情 | Image Detail'
    if (query.id) { this.img = galleryData.find(i => i.id === query.id) || null; this.favId = 'detail_' + query.id }
  },
  methods: {
    toggleFav() {
      if (!this.favId || !this.img) return
      if (isFavorite(this.favId)) { removeFavorite(this.favId); showToast('已取消收藏') }
      else {
        addFavorite({ id: this.favId, type: 'image', name: this.img.title, sub: this.img.dynasty + ' · ' + (this.img.analysis?.clothing?.[0] || ''), preview: this.img.src, route: '/pages/detail', query: { id: this.img.id }, content: this.img.prompt || '' })
        showToast('已收藏')
      }
      this.favRefreshKey++
      window.dispatchEvent(new Event('favorite-changed'))
    },
    previewImage() {
      if (this.img?.src) uni.previewImage({ urls: [this.img.src] })
    },
    toggleFavPrompt() {
      if (!this.favId || !this.img) return
      const { addFavorite, removeFavorite, isFavorite } = require('../utils/useFavorites.js')
      const promptId = 'prompt_' + this.favId
      if (isFavorite(promptId)) { removeFavorite(promptId) }
      else {
        addFavorite({ id: promptId, type: 'prompt', name: this.img.title, sub: this.img.dynasty + ' · ' + (this.img.analysis?.clothing?.[0] || ''), preview: '#C41E3A', route: '/pages/detail', query: { id: this.img.id }, contentCN: this.img.prompt, contentEN: this.enPrompt })
        // 自动收藏图片
        if (!isFavorite(this.favId)) {
          addFavorite({ id: this.favId, type: 'image', name: this.img.title, sub: this.img.dynasty + ' · ' + (this.img.analysis?.clothing?.[0] || ''), preview: this.img.src, route: '/pages/detail', query: { id: this.img.id }, content: this.img.prompt || '' })
          this.favRefreshKey++
        }
      }
      this.promptFavRefreshKey++
      window.dispatchEvent(new Event('favorite-changed'))
    }
  }
}
</script>

<style lang="scss" scoped>
.page-layout { min-height: 100vh; background: $theme-bg; }

.detail-body {
  display: flex; gap: 32px; align-items: flex-start;
  padding: clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px);
}
@media (min-width: 1200px) { .detail-body { width: 80%; margin: 0 auto; } }

.detail-left {
  flex: 1; position: sticky; top: 84px;
}

.main-img { width: 100%; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); cursor: pointer; }

.detail-right {
  width: min(420px, 40vw); flex-shrink: 0;
}

.dc-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 24px; }
.dc-header-text { flex: 1; }
.dc-fav-wrap { display: flex; justify-content: center; margin-top: 24px; }
.dc-fav-btn { display: flex; align-items: center; gap: 8px; padding: 8px 24px; border-radius: 6px; cursor: pointer; background: #c41e3a; color: #fff; border: none; transition: opacity 0.2s; &:active { opacity: 0.8; } }
.dc-fav-icon { font-size: 18px; flex-shrink: 0; line-height: 1; }
.dc-fav-text { font-size: 14px; font-weight: 600; line-height: 1; }

.dc-title { font-size: 24px; font-weight: $font-weight-bold; color: $theme-ink; }

.dc-dynasty { font-size: 12px; padding: 3px 12px; border-radius: 4px; background: $theme-bg; color: $theme-text-secondary; }

.analysis-section { margin-bottom: 24px; }

.section-title { font-size: 16px; font-weight: $font-weight-semibold; color: $theme-ink; display: block; margin-bottom: 12px; border-left: 3px solid $theme-red; padding-left: 12px; }

.analysis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

.analysis-item { display: flex; gap: 8px; align-items: baseline; padding: 8px 12px; background: $theme-white; border-radius: 6px; }

.al { font-size: 12px; color: $theme-gray; white-space: nowrap; min-width: 40px; }

.av { font-size: 13px; color: $theme-ink; }

.tag-row { display: flex; flex-wrap: wrap; gap: 6px; }

.tag { font-size: 12px; padding: 4px 14px; border-radius: 4px; font-weight: 500; }

.temperament-tag { background: rgba($theme-red, 0.08); color: $theme-red; }
.face-tag { background: $theme-bg; color: $theme-text-secondary; }
.hair-tag { background: rgba($theme-gold, 0.12); color: #8B6B2A; }

.tips-list { background: $theme-white; border-radius: 8px; padding: 14px 18px; }

.tip-item { font-size: 13px; color: $theme-text-body; line-height: 1.8; display: block; }

.prompt-section { margin-bottom: 24px; }
.prompt-header { display: flex; align-items: center; gap: 8px; }

.prompt-label { font-size: 13px; font-weight: $font-weight-semibold; color: $theme-ink; display: block; margin-top: 12px; margin-bottom: 6px; }

.prompt-box {
  width: 100%; height: 200px; padding: 12px; border-radius: 8px;
  font-size: 13px; color: $theme-ink; line-height: 1.7;
  border: 1px solid $theme-light-gray; resize: vertical;
  background: $theme-input-bg; box-sizing: border-box;
}

.dc-meta { font-size: 12px; color: $theme-placeholder; display: block; margin-top: 24px; text-align: center; }

.empty-state { text-align: center; padding: 100px 0; .empty-text { font-size: 16px; color: $theme-gray; } }

/* 移动端：详情页堆叠 + 图片撑满宽度 */
@media (max-width: 768px) {
  .page-layout { overflow-x: hidden; }
  .detail-body { flex-direction: column; }
  .detail-left { position: static; flex: none; width: 100%; }
  .detail-right { width: 100%; }
  .dc-title { font-size: 20px; }
  .analysis-grid { grid-template-columns: 1fr; gap: 6px; }
  .analysis-item { padding: 6px 10px; }
  .prompt-box { height: 140px; font-size: 12px; }
  .section-title { font-size: 14px; margin-bottom: 8px; }
  .dc-fav-wrap { margin-top: 16px; }
}
</style>
