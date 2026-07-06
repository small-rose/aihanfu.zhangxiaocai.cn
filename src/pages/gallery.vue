<template>
  <view class="page-layout">
    <TopNav current="gallery" />
    <view class="content">
      <view class="page-header">
        <text class="page-title">灵感图库</text>
        <input class="search-input" placeholder="搜索图片..." v-model="searchKeyword" />
        <view class="filter-group">
          <view
            v-for="f in filters" :key="f.key"
            class="filter-chip"
            :class="{ active: activeFilter === f.key }"
            @tap="activeFilter = f.key"
          >{{ f.label }} ({{ f.count }})</view>
        </view>
      </view>
      <view class="page-divider"></view>

      <view v-if="filtered.length" class="gallery-grid">
        <view v-for="(img, i) in filtered" :key="i" class="gallery-item" @tap="openDetail(img)">
          <image class="gallery-img" :src="img.src" mode="aspectFill" />
          <view class="gallery-overlay">
            <view class="overlay-badges">
              <text class="badge dynasty-tag">{{ img.dynasty }}</text>
            </view>
            <text class="overlay-title">{{ img.title }}</text>
            <text class="gallery-tags">{{ img.tags.slice(0, 5).join(' · ') }}</text>
          </view>
        </view>
      </view>

      <view v-else class="empty-state">
        <text class="empty-icon">🖼️</text>
        <text class="empty-text">暂无图片，去组合器生成吧</text>
        <Button variant="primary" @click="goPrompter">前往组合器</Button>
      </view>
    </view>
    <Footer />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import Button from '../components/Button.vue'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'
import { galleryData } from '../data/gallery-data.js'

const activeFilter = ref('all')
const searchKeyword = ref('')

onLoad((query) => {
  if (query.q) searchKeyword.value = query.q
})

const filters = computed(() => {
  const counts = {}
  galleryData.forEach(img => {
    counts[img.dynasty] = (counts[img.dynasty] || 0) + 1
  })
  return [
    { key: 'all', label: '全部', count: galleryData.length },
    { key: '唐', label: '唐', count: counts['唐'] || 0 },
    { key: '宋', label: '宋', count: counts['宋'] || 0 },
  ]
})

const filtered = computed(() => {
  let list = galleryData
  if (activeFilter.value !== 'all') {
    list = list.filter(img => img.dynasty === activeFilter.value)
  }
  if (searchKeyword.value) {
    const kw = searchKeyword.value.toLowerCase()
    list = list.filter(img => {
      if (img.title.toLowerCase().includes(kw)) return true
      if (img.dynasty.toLowerCase().includes(kw)) return true
      if (img.tags.some(t => t.toLowerCase().includes(kw))) return true
      return false
    })
  }
  return list
})

function goPrompter() {
  uni.navigateTo({ url: '/pages/prompter' })
}

function openDetail(img) {
  uni.navigateTo({ url: '/pages/detail?id=' + img.id })
}
</script>

<style lang="scss" scoped>
.page-layout { min-height: 100vh; background: $theme-bg; }
.content { padding: clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px); }
@media (min-width: 1200px) { .content { width: 80%; margin: 0 auto; } }

.page-header { display: flex; align-items: center; gap: 32px; margin-bottom: 24px; }
.page-title { font-size: $font-size-page-title-sub; font-weight: $font-weight-bold; color: $theme-ink; white-space: nowrap; }
.page-divider { width: 60px; height: 3px; background: $theme-red; margin-bottom: 28px; border-radius: 2px; }

.search-input {
  flex: 1; max-width: 320px; height: 38px; background: $theme-white; border-radius: 10px;
  padding: 0 14px; font-size: $font-size-body-sub; color: $theme-ink;
  border: 1px solid $theme-light-gray; outline: none;
  &:focus { border-color: $theme-red; }
}

.filter-group { display: flex; gap: 8px; }

.filter-chip {
  padding: 8px 18px; border-radius: 6px; font-size: $font-size-small-sub;
  background: $theme-white; color: $theme-gray; border: 1px solid $theme-light-gray; cursor: pointer;
  &.active { background: $theme-red; color: $theme-white; border-color: $theme-red; }
}

.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }

.gallery-item {
  position: relative; height: 400px; border-radius: 10px; overflow: hidden; cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.02); box-shadow: 0 8px 24px rgba($theme-ink, 0.08);
    .gallery-overlay { opacity: 1; }
  }

  .gallery-img { width: 100%; height: 100%; }
  .gallery-overlay {
    position: absolute; bottom: 0; left: 0; right: 0; padding: 20px;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    opacity: 0; transition: opacity 0.3s;
  }
  .overlay-badges { display: flex; gap: 4px; margin-bottom: 6px; }
  .badge { font-size: 11px; padding: 2px 10px; border-radius: 4px; font-weight: 500; }
  .dynasty-tag { background: rgba($theme-white, 0.9); color: $theme-ink; }
  .overlay-title { font-size: 15px; font-weight: 600; color: $theme-white; display: block; margin-bottom: 4px; }
  .gallery-tags { font-size: 12px; color: rgba($theme-white, 0.8); display: block; }
}

.empty-state { text-align: center; padding: 100px 0;
  .empty-icon { font-size: 64px; display: block; margin-bottom: 20px; opacity: 0.6; }
  .empty-text { font-size: $font-size-subtitle; color: $theme-gray; display: block; margin-bottom: 24px; }
}
</style>
