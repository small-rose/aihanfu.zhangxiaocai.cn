<script setup>
function goHome() {
  uni.reLaunch({ url: '/pages/home' })
}
function navigate(page) {
  uni.navigateTo({ url: '/pages/' + page })
}
</script>

<template>
  <view class="footer">
    <view class="footer-decoration"></view>
    <view class="footer-inner">
      <view class="footer-brand" @tap="goHome">
        <view class="footer-logo">汉</view>
        <view class="footer-brand-texts">
          <text class="footer-brand-cn">汉服图鉴</text>
          <text class="footer-brand-en">Hanfu Reference</text>
        </view>
      </view>
      <text class="footer-desc">循衣冠之脉 · 览千年华章 — 汉服知识参考与 AI 提示词工具</text>
      <view class="footer-refs">
        <view class="footer-ref-group">
          <text class="footer-ref-cat">典籍文献</text>
          <view class="footer-ref-items">
            <text class="footer-ref">《中华古今注》</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">《妆台记》</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">《髻鬟品》</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">《后汉书》</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">《宋史》</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">《晋书》</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">《诗经》</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">《礼记》</text>
          </view>
        </view>
        <view class="footer-ref-group">
          <text class="footer-ref-cat">学术机构</text>
          <view class="footer-ref-items">
            <text class="footer-ref">中国社会科学院考古研究所</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">故宫博物院</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">中国丝绸博物馆</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">敦煌研究院</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">国家博物馆</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">陕西历史博物馆</text>
          </view>
        </view>
        <view class="footer-ref-group">
          <text class="footer-ref-cat">媒体与平台</text>
          <view class="footer-ref-items">
            <text class="footer-ref">国家人文历史</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">中国文物网</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">百度百科</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">Navos AI</text>
          </view>
        </view>
        <view class="footer-ref-group">
          <text class="footer-ref-cat">素材来源</text>
          <view class="footer-ref-items">
            <text class="footer-ref">中国传统色·故宫里的色彩美学（郭浩/李健明）</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">zhongguose.com 中国色</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">Agnes AI Image Series</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">历代壁画、陶俑、绘画复原图</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">Noto Serif SC（Google Fonts）</text><text class="footer-ref-dot">·</text>
            <text class="footer-ref">uni-app（DCloud）</text>
          </view>
        </view>
      </view>
      <view class="footer-links">
        <text class="footer-link" @tap="navigate('disclaimer')">网站声明</text>
        <text class="footer-dot">·</text>
        <text class="footer-link" @tap="navigate('privacy')">隐私政策</text>
        <text class="footer-dot">·</text>
        <text class="footer-link" @tap="navigate('changelog')">更新日志</text>
      </view>
      <view class="footer-meta">
        <text class="footer-copy">© 2026 汉服图鉴 · 仅供学习参考</text>
        <text class="footer-tech">Built with uni-app · AI-generated imagery</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.footer {
  background: $theme-white;
  margin-top: 64px;
  position: relative;
}

.footer-decoration {
  height: 4px;
  background: linear-gradient(90deg, transparent, $theme-red, $theme-gold, $theme-red, transparent);
  opacity: 0.6;
}

.footer-inner {
  padding: 40px clamp(16px, 4vw, 48px) 32px;
  text-align: center;
}

@media (min-width: 1200px) {
  .footer-inner {
    width: 80%;
    max-width: none;
    margin: 0 auto;
  }
}

.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
}

.footer-logo {
  width: 32px;
  height: 32px;
  background: $theme-red;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-subtitle;
  font-weight: $font-weight-bold;
  color: $theme-white;
  font-family: $font-cn;
}

.footer-brand-cn {
  font-size: $font-size-brand;
  font-weight: $font-weight-bold;
  color: $theme-ink;
  font-family: $font-cn;
  letter-spacing: $letter-spacing-normal;
}

.footer-brand-en {
  font-size: $font-size-xxs;
  color: $theme-gray;
  letter-spacing: $letter-spacing-tight;
  display: block;
  text-align: left;
}

.footer-desc {
  display: block;
  font-size: $font-size-small;
  color: $theme-text-secondary;
  margin-bottom: 20px;
  letter-spacing: $letter-spacing-tight;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.footer-link {
  font-size: 12px;
  color: $theme-gray;
  cursor: pointer;
  padding: 2px 4px;
  transition: color 0.2s;

  &:hover { color: $theme-red; }
}

.footer-dot {
  font-size: 10px;
  color: $theme-border;
  margin: 0 6px;
}

.footer-refs {
  margin-bottom: 24px; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;
}
.footer-ref-group { margin-bottom: 10px; display: flex; gap: 8px; align-items: baseline; }
.footer-ref-cat {
  font-size: 10px; font-weight: $font-weight-semibold; color: $theme-placeholder;
  text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; min-width: 64px;
}
.footer-ref-items { display: flex; flex-wrap: wrap; align-items: center; gap: 0; }
.footer-ref {
  font-size: 11px; color: $theme-text-secondary; white-space: nowrap;
}
.footer-ref-dot {
  font-size: 10px; color: $theme-border; margin: 0 5px;
}

.footer-meta {
  border-top: 1px solid $theme-light-gray;
  padding-top: 16px;
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.footer-copy {
  font-size: $font-size-xs;
  color: $theme-gray;
}

.footer-tech {
  font-size: $font-size-xs;
  color: $theme-placeholder;
}
</style>
