<template>
  <view class="topnav">
    <view class="topnav-inner">
      <view class="topnav-brand" @tap="goHome">
        <view class="brand-logo">汉</view>
        <view class="brand-texts">
          <text class="topnav-brand-cn">汉服图鉴</text>
          <text class="topnav-brand-en">Hanfu Reference</text>
        </view>
      </view>

      <view class="topnav-links">
        <view
          v-for="item in navItems"
          :key="item.key"
          class="nav-link"
          :class="{ active: current === item.key }"
          @tap="navTo(item.key)"
        >
          <text class="nav-link-label">{{ item.label }}</text>
        </view>
      </view>

      <view class="topnav-search">
        <text class="search-icon" @tap="doSearch">🔍</text>
        <input class="search-input" placeholder="搜索服饰、朝代、词条..." v-model="searchKeyword" />
      </view>

      <view class="topnav-lang">
        <text class="lang-btn active">中</text>
        <text class="lang-split">|</text>
        <text class="lang-btn">EN</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  current: { type: String, default: 'index' }
})

const searchKeyword = ref('')

const navItems = [
  { key: 'lexicon', label: '词库', labelEn: 'Lexicon' },
  { key: 'prompter', label: '提示词', labelEn: 'Prompts' },
  { key: 'dynasty', label: '朝代', labelEn: 'Dynasty' },
  { key: 'gallery', label: '图库', labelEn: 'Gallery' }
]

function navTo(key) {
  // 当前页面路由与目标一致时跳过，否则允许导航（detail 页 current=gallery 但不拦截图库跳转）
  const pages = getCurrentPages()
  const route = pages[pages.length - 1]?.route || ''
  if (route === `pages/${key}`) return
  uni.navigateTo({ url: `/pages/${key}` })
}

function goHome() {
  uni.reLaunch({ url: '/pages/home' })
}

function doSearch() {
  const input = document.querySelector('.uni-input-input')
  const q = input ? input.value.trim() : searchKeyword.value.trim()
  if (!q) return
  uni.navigateTo({ url: '/pages/search?q=' + encodeURIComponent(q) })
}
</script>

<style lang="scss" scoped>
.topnav {
  height: 64px;
  background: $theme-white;
  border-bottom: 1px solid $theme-light-gray;
  position: sticky;
  top: 0;
  z-index: 100;
}

.topnav-inner {
  display: flex;
  align-items: center;
  padding: 0 clamp(16px, 4vw, 48px);
  height: 100%;
}

@media (min-width: 1200px) {
  .topnav-inner {
    width: 80%;
    max-width: none;
    margin: 0 auto;
  }
}

.topnav-brand {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-logo {
  width: 36px;
  height: 36px;
  background: $theme-red;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-brand;
  font-weight: $font-weight-bold;
  color: $theme-white;
  font-family: $font-cn;
  flex-shrink: 0;
}

.brand-texts {
  display: flex;
  flex-direction: column;
}

.topnav-brand-cn { font-size: $font-size-brand; font-weight: $font-weight-bold; color: $theme-red; letter-spacing: $letter-spacing-normal; line-height: $line-height-tight; }
.topnav-brand-en { font-size: $font-size-xxxs; color: $theme-border; letter-spacing: $letter-spacing-tight; margin-top: 1px; }

.topnav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 40px;
}

.nav-link {
  padding: 8px 18px;
  border-radius: 8px;
  font-size: $font-size-body;
  font-weight: $font-weight-medium;
  color: $theme-ink;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: $theme-bg;
  }

  &.active {
    background: $theme-red;
    color: $theme-white;
  }
}

.topnav-search {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: clamp(8px, 2vw, 24px);
  width: clamp(140px, 18vw, 300px);
  background: $theme-bg;
  border-radius: 10px;
  padding: 0 16px;
  height: 36px;
}

.search-icon { font-size: $font-size-body; margin-right: 8px; cursor: pointer; }

.search-input {
  flex: 1;
  font-size: $font-size-small;
  color: $theme-ink;
  background: transparent;
  border: none;
  outline: none;
  height: 100%;
}

.topnav-lang {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lang-btn {
  font-size: $font-size-small; color: $theme-gray; cursor: pointer;
  &.active { color: $theme-red; font-weight: $font-weight-bold; }
}

.lang-split { color: $theme-border; font-size: $font-size-xs; }
</style>