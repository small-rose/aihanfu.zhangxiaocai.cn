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
      <view class="hamburger" @tap="toggleMenu">
        <text class="hamburger-icon">{{ menuOpen ? '✕' : '☰' }}</text>
      </view>
    </view>
    <view class="mobile-backdrop" :class="{ open: menuOpen }" @tap="toggleMenu"></view>
    <view class="mobile-drawer" :class="{ open: menuOpen }">
      <view class="drawer-accent"></view>
      <view class="mobile-drawer-header">
        <view class="drawer-brand">
          <view class="drawer-logo">汉</view>
          <view class="drawer-texts">
            <text class="drawer-title-cn">汉服图鉴</text>
            <text class="drawer-title-en">Hanfu Reference</text>
          </view>
        </view>
      </view>
      <view class="drawer-nav">
        <view
          v-for="(item, i) in navItems"
          :key="item.key"
          class="mobile-nav-link"
          :class="{ active: current === item.key }"
          @tap="navToMobile(item.key)"
        >
          <text class="nav-link-icon">{{ ['📖','🎨','✍️','🏛️','🖼️'][i] }}</text>
          <view class="nav-link-texts">
            <text class="mobile-nav-label">{{ item.label }}</text>
            <text class="mobile-nav-label-en">{{ item.labelEn }}</text>
          </view>
        </view>
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
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function navToMobile(key) {
  menuOpen.value = false
  navTo(key)
}

const navItems = [
  { key: 'lexicon', label: '词库', labelEn: 'Lexicon' },
  { key: 'color', label: '色彩', labelEn: 'Colors' },
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
  const q = searchKeyword.value.trim()
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
  z-index: 102;
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
  background: $theme-white;
  border: 1px solid $theme-border;
  border-radius: 4px;
  padding: 0 12px;
  height: 34px;
  transition: border-color 0.25s;
}
.topnav-search:focus-within {
  border-color: $theme-red;
}

.search-icon {
  font-size: 13px; margin-right: 6px; cursor: pointer;
  color: $theme-gray; flex-shrink: 0;
}

.search-input {
  flex: 1;
  font-size: 13px;
  color: $theme-ink;
  background: transparent;
  border: none;
  outline: none;
  height: 100%;
}
.search-input::placeholder {
  color: $theme-placeholder;
  font-size: 12px;
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

.hamburger {
  display: none; margin-left: 12px; cursor: pointer;
  width: 36px; height: 36px; align-items: center; justify-content: center;
}
.hamburger { border: 1px solid $theme-border; border-radius: 6px; }

/* — 遮罩层 — */
.mobile-backdrop {
  display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44, 24, 16, 0.45); z-index: 100; opacity: 0;
  transition: opacity 0.3s;
}
.mobile-backdrop.open {
  display: block; opacity: 1;
}

/* — 左侧抽屉导航：210px，顶部金色→胭脂渐变装饰条 — */
.mobile-drawer {
  position: fixed; top: 0; left: 0; bottom: 0; width: 210px;
  background: $theme-cream; z-index: 101;
  transform: translateX(-100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex; flex-direction: column;
  box-shadow: 3px 0 24px rgba(44, 24, 16, 0.12);
}
.mobile-drawer.open { transform: translateX(0); }

.drawer-accent {
  height: 3px; background: linear-gradient(90deg, $theme-gold, $theme-red);
  flex: none;
}

/* — 品牌区：汉 logo + 汉服图鉴 / Hanfu Reference — */
.mobile-drawer-header {
  padding: 28px clamp(16px, 4vw, 48px) 20px;
  border-bottom: 1px solid $theme-border;
  flex: none;
}
.drawer-brand { display: flex; align-items: center; gap: 10px; }
.drawer-logo {
  width: 34px; height: 34px; background: $theme-red; border-radius: 5px;
  display: flex; align-items: center; justify-content: center;
  font-size: 17px; color: $theme-cream; font-weight: $font-weight-bold;
}
.drawer-texts { display: flex; flex-direction: column; }
.drawer-title-cn {
  font-size: 16px; color: $theme-ink;
  font-weight: $font-weight-bold; letter-spacing: 2px;
}
.drawer-title-en {
  font-family: $font-en; font-size: 10px; color: $theme-gray;
  letter-spacing: 1.5px; text-transform: uppercase; margin-top: 2px;
}

/* — 导航项：图标 + 中英文，激活态左侧金色竖条 — */
.drawer-nav { flex: 1; padding: 8px 0; overflow-y: auto; }
.mobile-nav-link {
  display: flex; align-items: center; gap: 10px;
  padding: 14px clamp(16px, 4vw, 48px); cursor: pointer;
  border-left: 3px solid transparent;
  transition: all 0.2s;
  &:active { background: #E8E0D5; }
  &.active {
    color: $theme-red;
    border-left-color: $theme-gold;
    background: linear-gradient(90deg, rgba(212, 168, 75, 0.1), transparent);
  }
}
.nav-link-icon { font-size: 16px; width: 22px; text-align: center; flex: none; }
.nav-link-texts { display: flex; flex-direction: column; }
.mobile-nav-label {
  font-size: $font-size-body; color: inherit;
  font-weight: $font-weight-medium; letter-spacing: 1.5px;
}
.mobile-nav-label-en {
  font-family: $font-en; font-size: 10px; color: $theme-gray;
  letter-spacing: 0.5px; margin-top: 1px;
}
.mobile-nav-link.active .mobile-nav-label-en { color: $theme-red; }

.mobile-nav-link + .mobile-nav-link {
  border-top: 1px solid #E8E0D5;
  margin-top: 0;
}

/* 移动端：导航链接/搜索隐藏 → 汉堡 + 抽屉 */
@media (max-width: 768px) {
  .topnav-links { display: none; }
  .topnav-search { display: none; }
  .topnav-lang { margin-left: auto; }
  .hamburger { display: flex; }
  .topnav-brand-cn { font-size: 16px; }
  .brand-logo { width: 30px; height: 30px; font-size: 16px; }
  .topnav-brand-en { display: none; }
}
</style>