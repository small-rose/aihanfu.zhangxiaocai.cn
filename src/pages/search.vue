<template>
  <view class="page-layout">
    <TopNav />
    <view class="content">
      <view class="page-header">
        <text class="page-title">全局搜索</text>
        <text v-if="keyword" class="search-summary">"<text class="keyword">{{ keyword }}</text>" 共 {{ totalCount }} 条结果</text>
      </view>
      <view class="page-divider"></view>

      <view v-if="totalCount" class="results">
        <view v-if="lexiconResults.length" class="result-group">
          <text class="group-title">📖 词库 ({{ lexiconResults.length }})</text>
          <view class="result-list">
            <view v-for="item in lexiconResults.slice(0, 20)" :key="'l'+item.id" class="result-card" @tap="goLexicon(item.term)">
              <text class="result-term">{{ item.term }}<text v-if="item.pinyin" class="result-pinyin">（{{ item.pinyin }}）</text></text>
              <text class="result-brief">{{ item.meaning }}</text>
              <view class="result-meta">
                <text v-if="item.dynasty" class="meta-tag">{{ item.dynasty }}</text>
                <text v-if="item.gender" class="meta-tag">{{ item.gender }}</text>
              </view>
            </view>
          </view>
          <text v-if="lexiconResults.length > 20" class="more-link" @tap="goLexicon(keyword)">共 {{ lexiconResults.length }} 条，前往词库查看全部 &gt;</text>
        </view>

        <view v-if="galleryResults.length" class="result-group">
          <text class="group-title">🖼️ 图库 ({{ galleryResults.length }})</text>
          <view class="result-list">
            <view v-for="img in galleryResults" :key="'g'+img.id" class="result-card" @tap="goGallery(img.id)">
              <text class="result-term">{{ img.title }}</text>
              <text class="result-brief">{{ img.tags.slice(0, 4).join(' · ') }}</text>
              <view class="result-meta">
                <text class="meta-tag">{{ img.dynasty }}</text>
              </view>
            </view>
          </view>
        </view>

        <view v-if="dynastyResults.length" class="result-group">
          <text class="group-title">🏛️ 朝代 ({{ dynastyResults.length }})</text>
          <view class="result-list">
            <view v-for="d in dynastyResults" :key="'d'+d.id" class="result-card" @tap="goDynasty">
              <text class="result-term">{{ d.name }}</text>
              <text class="result-brief">{{ d.period }} · {{ d.summary }}</text>
            </view>
          </view>
        </view>

        <view v-if="colorResults.length" class="result-group">
          <text class="group-title">🎨 色彩 ({{ colorResults.length }})</text>
          <view class="result-list">
            <view v-for="c in colorResults" :key="'c'+c.name" class="result-card" @tap="goColor(c.name)">
              <view class="color-row">
                <view class="color-dot" :style="{ backgroundColor: c.hex }"></view>
                <text class="result-term">{{ c.name }}</text>
                <text class="color-hex">{{ c.hex }}</text>
                <text v-if="c.dynasty" class="meta-tag">{{ c.dynasty }}</text>
              </view>
            </view>
          </view>
        </view>

        <view v-if="supplementResults.length" class="result-group">
          <text class="group-title">✨ 提示词 ({{ supplementResults.length }})</text>
          <view class="result-list">
            <view v-for="(item, i) in supplementResults" :key="'s'+i" class="result-card" @tap="goPrompter(item.term)">
              <text class="result-term">{{ item.term }}</text>
              <text class="result-brief">{{ item.en || '' }}</text>
              <view class="result-meta">
                <text class="meta-tag">{{ item.catLabel }}</text>
              </view>
            </view>
          </view>
          <text v-if="supplementResults.length > 20" class="more-link" @tap="goPrompter(keyword)">共 {{ supplementResults.length }} 条，前往提示词页查看全部 &gt;</text>
        </view>
      </view>

      <view v-else-if="searched" class="empty-state">
        <text class="empty-icon">🔍</text>
        <text class="empty-text">未找到与 "<text class="keyword">{{ keyword }}</text>" 相关的结果</text>
      </view>
    </view>
    <FavoriteFab />
    <Footer />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'
import { filterItems, categoryMeta } from '../data/lexicon-data.js'
import { galleryData } from '../data/gallery-data.js'
import { dynasties } from '../data/hanfu-data.js'
import supplementData from '../data/prompt-supplement.json'
import allColors from '../data/color-data.js'
import FavoriteFab from '../components/FavoriteFab.vue'

const keyword = ref('')
const searched = ref(false)

const kw = computed(() => keyword.value.toLowerCase().trim())

const lexiconResults = computed(() => {
  if (!kw.value) return []
  return filterItems({ keyword: kw.value })
})

const galleryResults = computed(() => {
  if (!kw.value) return []
  const k = kw.value
  return galleryData.filter(img => {
    if (img.title.toLowerCase().includes(k)) return true
    if (img.dynasty.toLowerCase().includes(k)) return true
    if (img.tags.some(t => t.toLowerCase().includes(k))) return true
    if (img.analysis.clothing.some(c => c.toLowerCase().includes(k))) return true
    if (img.analysis.colors.some(c => c.toLowerCase().includes(k))) return true
    if (img.analysis.fabric.some(f => f.toLowerCase().includes(k))) return true
    if (img.analysis.faceShape && img.analysis.faceShape.toLowerCase().includes(k)) return true
    if (img.analysis.hairstyle && img.analysis.hairstyle.toLowerCase().includes(k)) return true
    if (img.analysis.pose && img.analysis.pose.toLowerCase().includes(k)) return true
    return false
  })
})

const dynastyResults = computed(() => {
  if (!kw.value) return []
  const k = kw.value
  return dynasties.filter(d => {
    if (d.name.includes(k) || d.nameEn.toLowerCase().includes(k)) return true
    if (d.period.toLowerCase().includes(k)) return true
    if (d.summary.includes(k)) return true
    if (d.features.includes(k)) return true
    if (d.makeup.includes(k)) return true
    if (d.garments.some(g => g.includes(k))) return true
    return false
  })
})

const colorResults = computed(() => {
  if (!kw.value) return []
  const k = kw.value
  return allColors.filter(c => c.name.includes(k) || c.hex.toLowerCase().includes(k) || (c.tags && c.tags.some(t => t.includes(k))) || (c.dynasty && c.dynasty.includes(k)))
})

const supplementResults = computed(() => {
  if (!kw.value) return []
  const k = kw.value
  const results = []
  supplementData.categories.forEach(cat => {
    cat.items.forEach(item => {
      if (item.term.includes(k) || item.en.toLowerCase().includes(k)) {
        results.push({ ...item, catLabel: cat.label })
      }
    })
  })
  return results
})

const totalCount = computed(() =>
  lexiconResults.value.length + galleryResults.value.length +
  dynastyResults.value.length + colorResults.value.length +
  supplementResults.value.length
)

function goLexicon(q) {
  uni.navigateTo({ url: '/pages/lexicon?q=' + encodeURIComponent(q) })
}

function goGallery(id) {
  uni.navigateTo({ url: '/pages/detail?id=' + id })
}

function goDynasty() {
  uni.navigateTo({ url: '/pages/dynasty' })
}

function goColor(name) {
  uni.navigateTo({ url: '/pages/color?q=' + encodeURIComponent(name) })
}

function goPrompter(q) {
  uni.navigateTo({ url: '/pages/prompter?q=' + encodeURIComponent(q) })
}

onLoad((query) => {
  document.title = '全局搜索 | Search'
  let d = document.querySelector('meta[name="description"]')
  if (!d) { d = document.createElement('meta'); d.name = 'description'; document.head.appendChild(d) }
  d.content = '搜索汉服词库、传统色彩、灵感图库等内容。'
  let k = document.querySelector('meta[name="keywords"]')
  if (!k) { k = document.createElement('meta'); k.name = 'keywords'; document.head.appendChild(k) }
  k.content = '汉服,搜索,汉服图鉴,词库,色彩,图库'
  if (query.q) {
    keyword.value = query.q
    searched.value = true
  }
})
</script>

<style lang="scss" scoped>
.page-layout { min-height: 100vh; background: $theme-bg; }
.content { padding: clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px); }
@media (min-width: 1200px) { .content { width: 80%; margin: 0 auto; } }

.page-header { display: flex; align-items: baseline; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
.page-title { font-size: $font-size-page-title-sub; font-weight: $font-weight-bold; color: $theme-ink; white-space: nowrap; }
.search-summary { font-size: $font-size-body-sub; color: $theme-gray; }
.keyword { color: $theme-red; font-weight: $font-weight-semibold; }

.page-divider { width: 60px; height: 3px; background: $theme-red; margin-bottom: 28px; border-radius: 2px; }

.result-group { margin-bottom: 32px; }

.group-title {
  font-size: $font-size-subtitle; font-weight: $font-weight-semibold; color: $theme-ink;
  display: block; margin-bottom: 12px; padding-left: 12px;
  border-left: 3px solid $theme-red;
}

.result-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
@media (min-width: 900px) { .result-list { grid-template-columns: repeat(4, 1fr); } }

.result-card {
  background: $theme-white; border-radius: 8px; padding: 14px 18px;
  cursor: pointer; transition: all 0.2s;
  &:hover { box-shadow: 0 4px 12px rgba($theme-ink, 0.06); transform: translateX(4px); }
}

.result-term { font-size: $font-size-body; font-weight: $font-weight-semibold; color: $theme-ink; display: block; }
.result-pinyin { font-size: 12px; color: $theme-placeholder; font-weight: $font-weight-regular; margin-left: 4px; }
.result-brief { font-size: $font-size-small-sub; color: $theme-gray; margin-top: 4px; display: block; line-height: 1.4; }

.result-meta { display: flex; gap: 4px; margin-top: 6px; flex-wrap: wrap; }
.meta-tag { font-size: 11px; padding: 2px 8px; border-radius: 3px; background: $theme-bg; color: $theme-text-secondary; }

.more-link {
  display: block; text-align: center; font-size: $font-size-small-sub; color: $theme-red;
  margin-top: 12px; cursor: pointer; padding: 8px;
  &:hover { background: rgba($theme-red, 0.04); border-radius: 6px; }
}

.color-row { display: flex; align-items: center; gap: 10px; }
.color-dot { width: 20px; height: 20px; border-radius: 4px; border: 1px solid $theme-light-gray; flex-shrink: 0; }
.color-hex { font-size: 11px; color: $theme-placeholder; font-family: monospace; }

.empty-state { text-align: center; padding: 100px 0;
  .empty-icon { font-size: 64px; display: block; margin-bottom: 20px; opacity: 0.6; }
  .empty-text { font-size: $font-size-subtitle; color: $theme-gray; display: block; }
}
</style>
