<template>
  <view class="footer">
    <view class="footer-decoration"></view>
    <view class="footer-inner">
      <view class="footer-brand">
        <view class="footer-logo">汉</view>
        <view class="footer-brand-texts">
          <text class="footer-brand-cn">汉服图鉴</text>
          <text class="footer-brand-en">Hanfu Reference</text>
        </view>
      </view>
      <text class="footer-desc">循衣冠之脉 · 览千年华章 — 汉服知识参考与 AI 提示词工具</text>
      <view class="footer-links">
        <text class="footer-link">故宫博物院</text>
        <text class="footer-dot">·</text>
        <text class="footer-link">中国丝绸博物馆</text>
        <text class="footer-dot">·</text>
        <text class="footer-link">国家博物馆</text>
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
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.footer-link {
  font-size: $font-size-small;
  color: $theme-gray;
  cursor: pointer;
  padding: 4px 4px;
  transition: color 0.2s;

  &:hover { color: $theme-red; }
}

.footer-dot {
  font-size: $font-size-xs;
  color: $theme-border;
  margin: 0 8px;
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
