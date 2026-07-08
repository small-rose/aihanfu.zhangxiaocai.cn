<template>
  <view class="page-layout">
    <TopNav current="lexicon" />
    <view class="content">
      <view class="page-header">
        <text class="page-title">汉服词库</text>
        <view class="search-wrap"><input class="search-input" placeholder="搜索词条..." v-model="keyword" /></view>
      </view>
      <view class="page-divider"></view>

      <view class="lexicon-body">
        <view class="cat-sidebar">
          <view
            v-for="cat in categories"
            :key="cat.key"
            class="cat-item"
            :class="{ active: activeCat === cat.key }"
            @tap="activeCat = cat.key"
          >
            <text class="cat-icon">{{ cat.icon }}</text>
            <text class="cat-label">{{ cat.label }}</text>
            <text class="cat-count">{{ cat.count }}</text>
          </view>
        </view>

        <view class="lexicon-main">
          <view v-if="currentSub" class="sub-tabs">
            <view
              class="sub-tab"
              :class="{ active: activeSub === 'all' }"
              @tap="activeSub = 'all'"
            >全部</view>
            <view
              v-for="sub in currentSubs"
              :key="sub.key"
              class="sub-tab"
              :class="{ active: activeSub === sub.key }"
              @tap="activeSub = sub.key"
            >{{ sub.label }} ({{ sub.count }})</view>
          </view>

          <view v-if="filtered.length">
            <text v-if="keyword" class="search-result-title">搜索结果：<text class="search-kw">{{ keyword }}</text><text class="search-clear" @tap="keyword = ''">取消</text></text>
            <view v-for="(group, gi) in grouped" :key="gi" class="sub-section">
              <text v-if="group.catLabel" class="sub-heading">{{ group.catLabel }}</text>
              <text v-if="group.sub && !keyword" class="sub-heading">{{ group.sub }}</text>
              <view class="lexicon-grid" :class="{ 'grid-4col': activeCat === 'color' }">
                <view v-for="item in group.items" :key="item.id" class="lexicon-card" @tap="openDrawer(item)">
                  <view v-if="item.hex" class="color-swatch" :style="{ backgroundColor: item.hex }">
                    <text class="color-hex">{{ item.hex }}</text>
                  </view>
                  <text v-if="item.gender" class="gender-badge-pos">{{ item.gender }}</text>
                  <view class="card-badges">
                    <template v-if="item.dynasties">
                      <text v-for="d in item.dynasties" :key="d" class="badge">{{ d }}</text>
                    </template>
                    <text v-else-if="item.dynasty && item.dynasty !== '通用'" class="badge">{{ item.dynasty }}</text>
                  </view>
                  <text class="card-term">{{ item.term }}<text v-if="item.pinyin" class="card-pinyin">（{{ item.pinyin }}）</text></text>
                  <text class="card-meaning">{{ item.meaning }}</text>
                </view>
              </view>
            </view>
          </view>
          <view v-else class="empty-state">
            <text class="empty-text">暂无匹配词条</text>
          </view>
        </view>

        <view v-if="activeCat === 'garment' || activeCat === 'hairstyle'" class="filter-panel">
          <text class="filter-title">筛选</text>
          <text v-if="activeCat === 'garment'" class="filter-label">性别</text>
          <view v-if="activeCat === 'garment'" class="filter-tags">
            <view
              v-for="g in ['男', '女']"
              :key="g"
              class="filter-tag"
              :class="{ active: selectedGenders.includes(g) }"
              @tap="toggleGender(g)"
            >{{ g }}</view>
          </view>
          <text class="filter-label">朝代</text>
          <view class="filter-tags">
            <view
              v-for="d in dynastyFilterOptions"
              :key="d"
              class="filter-tag"
              :class="{ active: selectedDynasties.includes(d) }"
              @tap="toggleDynasty(d)"
            >{{ d }}</view>
          </view>
          <text v-if="activeCat === 'hairstyle'" class="filter-label">身份</text>
          <view v-if="activeCat === 'hairstyle'" class="filter-tags-single">
            <view
              v-for="id in identityOptions"
              :key="id"
              class="filter-tag"
              :class="{ active: selectedIdentities.includes(id) }"
              @tap="toggleIdentity(id)"
            >{{ id }}</view>
          </view>
          <view class="filter-clear" @tap="clearFilters">清除筛选</view>
        </view>
      </view>
    </view>

    <DetailDrawer :item="drawerItem" :category-label="drawerCategoryLabel" @close="drawerItem = null" />

    <Footer />
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'  // nextTick 用于 DOM 更新后滚动
import { onLoad } from '@dcloudio/uni-app'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'
import { categories, categoryMeta, filterItems } from '../data/lexicon-data.js'
import DetailDrawer from '../components/DetailDrawer.vue'

const keyword = ref('')

onLoad((query) => {
  if (query.q) {
    keyword.value = query.q
  }
})
const activeCat = ref('garment')
// 切换大类时平滑滚动到内容区顶部（-90px 补偿固定 TopNav）
watch(activeCat, () => {
  nextTick(() => {
    const el = document.querySelector('.lexicon-body')
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 90
    window.scrollTo({ top, behavior: 'smooth' })
  })
})
const activeSub = ref('all')
const selectedGenders = ref([])
const selectedDynasties = ref([])
const selectedIdentities = ref([])
const drawerItem = ref(null)

const dynastyFilterOptions = ['先秦', '汉', '魏晋', '南北朝', '隋', '唐', '宋', '明']
const identityOptions = ['各阶层', '各阶层女性', '贵族女性', '宫人', '未婚少女', '仕女', '仙女', '民间女性', '已婚妇女', '侍女少女', '儿童少女', '成年男子', '少年男子', '男童', '男子']

const currentMeta = computed(() => categoryMeta.find(c => c.key === activeCat.value))
const currentSubs = computed(() => currentMeta.value?.subcategories || [])

const filtered = computed(() => {
  const opts = { keyword: keyword.value }
  if (keyword.value) {
    // 全局搜索：忽略分类和子类，gender/identity 仅关联分类时生效
    if (activeCat.value === 'garment' && selectedGenders.value.length) opts.gender = selectedGenders.value
    if (selectedDynasties.value.length) opts.dynasty = selectedDynasties.value
  } else {
    // 分类浏览：按当前选中分类 + 子类 + 性别/朝代筛选
    opts.category = activeCat.value
    if (activeSub.value !== 'all') opts.sub = activeSub.value
    if (activeCat.value === 'garment' && selectedGenders.value.length) opts.gender = selectedGenders.value
    if (selectedDynasties.value.length) opts.dynasty = selectedDynasties.value
    if (activeCat.value === 'hairstyle' && selectedIdentities.value.length) opts.identity = selectedIdentities.value
  }
  return filterItems(opts)
})

const grouped = computed(() => {
  const list = filtered.value
  if (keyword.value) {
    // 全局搜索：按 category 分组
    const catGroups = []
    const catMap = {}
    list.forEach(item => {
      const meta = categoryMeta.find(c => c.key === item.category)
      const label = meta?.label || item.category
      if (!catMap[label]) { catMap[label] = { catLabel: label, items: [] }; catGroups.push(catMap[label]) }
      catMap[label].items.push(item)
    })
    return catGroups
  }
  if (activeSub.value !== 'all' || !currentSubs.value.length) {
    return [{ sub: null, items: list }]
  }
  const groups = []
  const subMap = {}
  list.forEach(item => {
    const sub = item.sub || ''
    if (!subMap[sub]) { subMap[sub] = { sub, items: [] }; groups.push(subMap[sub]) }
    subMap[sub].items.push(item)
  })
  return groups
})

function toggleGender(g) {
  const i = selectedGenders.value.indexOf(g)
  i >= 0 ? selectedGenders.value.splice(i, 1) : selectedGenders.value.push(g)
}

function toggleDynasty(d) {
  const i = selectedDynasties.value.indexOf(d)
  i >= 0 ? selectedDynasties.value.splice(i, 1) : selectedDynasties.value.push(d)
}

function toggleIdentity(id) {
  const i = selectedIdentities.value.indexOf(id)
  i >= 0 ? selectedIdentities.value.splice(i, 1) : selectedIdentities.value.push(id)
}

function clearFilters() {
  selectedGenders.value = []
  selectedDynasties.value = []
  selectedIdentities.value = []
}

function openDrawer(item) {
  drawerItem.value = item
}
const drawerCategoryLabel = computed(() => {
  if (!drawerItem.value) return '词条'
  const meta = categoryMeta.find(c => c.key === drawerItem.value.category)
  return meta?.label || '词条'
})
</script>

<style lang="scss" scoped>
.page-layout { min-height: 100vh; background: $theme-bg; }
.content { padding: clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px); }
@media (min-width: 1200px) { .content { width: 80%; margin: 0 auto; } }

.page-header { display: flex; align-items: center; gap: 32px; margin-bottom: 24px; }

.page-title { font-size: $font-size-page-title-sub; font-weight: $font-weight-bold; color: $theme-ink; white-space: nowrap; }

.page-divider { width: 60px; height: 3px; background: $theme-red; margin-bottom: 28px; border-radius: 2px; }

.search-wrap {
  display: flex; align-items: center;
  max-width: 400px; height: 34px; flex: 1;
  background: $theme-white;
  border: 1px solid $theme-border; border-radius: 4px;
  padding: 0 12px;
  transition: border-color 0.25s;
}
.search-wrap:focus-within { border-color: $theme-red; }
.search-input {
  flex: 1; height: 100%; font-size: 13px; color: $theme-ink;
  background: transparent; border: none; outline: none;
}
.search-input::placeholder { color: $theme-placeholder; font-size: 12px; }

.lexicon-body { display: flex; gap: 32px; }

// 词库分类侧栏：吸顶固定在 TopNav 下方，+20px 留出间距
.cat-sidebar { width: auto; min-width: 72px; flex-shrink: 0; position: sticky; top: calc(clamp(48px, 7vw, 64px) + 20px); align-self: flex-start; }

.cat-item {
  display: flex; align-items: center; padding: 6px 8px; margin-bottom: 1px;
  border-radius: 5px; cursor: pointer; transition: all 0.2s;

  &:hover { background: $theme-white; }

  &.active { background: $theme-red; .cat-label { color: $theme-white; font-weight: $font-weight-semibold; } .cat-count { color: rgba($theme-white, 0.7); } }

  .cat-icon { font-size: 12px; margin-right: 4px; flex-shrink: 0; }
  .cat-label { font-size: 12px; color: $theme-ink; flex: 1; white-space: nowrap; }
  .cat-count { font-size: 9px; color: $theme-placeholder; margin-left: 2px; }
}

.lexicon-main { flex: 1; }

.sub-tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }

.sub-tab {
  padding: 5px 14px; border-radius: 6px; font-size: 13px; cursor: pointer;
  background: $theme-white; color: $theme-gray; border: 1px solid $theme-border;
  &.active { background: $theme-ink; color: $theme-white; border-color: $theme-ink; }
}

.lexicon-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.grid-4col { grid-template-columns: repeat(4, 1fr); }

.lexicon-card {
  background: $theme-white; border-radius: 10px; padding: 16px;
  transition: all 0.25s; cursor: pointer; position: relative;

  &:hover { box-shadow: 0 8px 24px rgba($theme-ink, 0.06); transform: translateY(-2px); }

  .color-swatch {
    height: 50px; border-radius: 6px; display: flex; align-items: flex-end;
    justify-content: flex-end; padding: 4px 8px; margin-bottom: 10px;
  }

  .color-hex { font-size: 10px; color: rgba($theme-white, 0.8); font-family: monospace; }

  .card-badges { display: flex; gap: 4px; margin-bottom: 6px; flex-wrap: wrap; }

  .badge { font-size: 12px; padding: 2px 10px; border-radius: 4px; font-weight: 500; background: $theme-bg; color: $theme-text-secondary; border: 1px solid $theme-border; }

  .gender-badge-pos {
    position: absolute; top: 12px; right: 12px; font-size: 12px; padding: 2px 10px;
    border-radius: 4px; font-weight: 500;
    background: rgba($theme-red, 0.08); color: $theme-red;
  }

  .card-term { font-size: $font-size-section-title-sub; font-weight: $font-weight-semibold; color: $theme-ink; display: block; }
  .card-pinyin { font-size: 12px; color: $theme-placeholder; font-weight: $font-weight-regular; margin-left: 4px; }
  .card-meaning { font-size: $font-size-small-sub; color: $theme-gray; margin-top: 4px; line-height: 1.5; display: block; }
}

.empty-state { text-align: center; padding: 80px 0; .empty-text { font-size: $font-size-subtitle; color: $theme-placeholder; } }

.search-result-title { font-size: $font-size-subtitle; font-weight: $font-weight-semibold; color: $theme-ink; display: block; margin-bottom: 16px; }
.search-kw { color: $theme-red; }
.search-clear { font-size: 12px; color: $theme-gray; cursor: pointer; margin-left: 8px; font-weight: $font-weight-regular; }

.sub-section { margin-bottom: 28px; }

.sub-heading {
  font-size: $font-size-subtitle; font-weight: $font-weight-semibold; color: $theme-ink;
  display: block; margin-bottom: 12px; padding-left: 4px;
  border-left: 3px solid $theme-red; padding-left: 12px;
}

.filter-panel {
  width: 110px; flex-shrink: 0; position: sticky; top: 84px; align-self: flex-start;
}

.filter-title { font-size: 13px; font-weight: $font-weight-semibold; color: $theme-ink; display: block; margin-bottom: 12px; }

.filter-label { font-size: 12px; color: $theme-text-body; display: block; margin-bottom: 6px; margin-top: 10px; }

.filter-tags { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
.filter-tags-single { display: grid; grid-template-columns: 1fr; gap: 4px; }

.filter-tag {
  padding: 4px 8px; border-radius: 4px; font-size: 12px; cursor: pointer; text-align: center;
  background: $theme-white; color: $theme-text-body; border: 1px solid $theme-border;
  &.active { background: $theme-ink; color: $theme-white; border-color: $theme-ink; }
}

.filter-clear { font-size: 11px; color: $theme-red; cursor: pointer; margin-top: 12px; display: block; }

/* 移动端：侧栏变顶部横滚 + 2 列卡片 */
@media (max-width: 768px) {
  .lexicon-body { flex-direction: column; }
  .cat-sidebar { display: flex; overflow-x: auto; gap: 4px; min-width: 0; width: 100%; padding-bottom: 8px; position: static; } // 移动端取消吸顶，变水平滚动
  .cat-sidebar::-webkit-scrollbar { display: none; }
  .cat-item { flex-shrink: 0; padding: 6px 14px; white-space: nowrap; }
  .cat-item .cat-label { font-size: 12px; }
  .cat-item .cat-count { display: none; }
  .cat-item .cat-icon { margin-right: 6px; }
  .lexicon-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .grid-4col { grid-template-columns: repeat(3, 1fr); }
  .filter-panel { width: 100%; position: static; margin-top: 12px; }
  .filter-tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .filter-tags .filter-tag { flex-shrink: 0; }
}

</style>
