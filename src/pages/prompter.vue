<template>
  <view class="page-layout">
    <TopNav current="prompter" />
    <view class="content">
      <view class="page-header">
        <text class="page-title">提示词</text>
        <input class="search-input" placeholder="搜索标签..." v-model="keyword" />
      </view>
      <view class="page-divider"></view>

      <view class="prompter-body">
        <view class="prompter-left">
          <view class="gender-tabs">
            <view class="gender-btn" :class="{ active: gender === 'female' }" @tap="gender = 'female'">女性</view>
            <view class="gender-btn" :class="{ active: gender === 'male' }" @tap="gender = 'male'">男性</view>
            <view class="gender-btn" :class="{ active: gender === 'all' }" @tap="gender = 'all'">通用</view>
          </view>

          <view class="dynasty-row">
            <text class="dynasty-label">朝代</text>
            <view class="dynasty-tags">
              <view
                v-for="d in dynastyOptions"
                :key="d"
                class="dynasty-tag"
                :class="{ active: selectedDynasties.includes(d) }"
                @tap="toggleDynasty(d)"
              >{{ d }}</view>
            </view>
          </view>

          <view class="cat-list">
            <view v-for="cat in availableCategories" :key="cat.key" class="cat-section">
              <text class="cat-title">{{ cat.icon }} {{ cat.label }}</text>
              <view v-for="(group, gi) in cat.groups" :key="gi">
                <text v-if="group.sub" class="cat-sub">{{ group.sub }}</text>
                <view class="tag-grid">
                  <view
                    v-for="item in group.items"
                    :key="item.id"
                    class="tag-btn"
                    :class="{ selected: isSelected(item) }"
                    @tap="toggleTag(item)"
                  >{{ item.term }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="prompter-right">
          <view class="panel-section">
            <text class="panel-title">已选标签</text>
            <view v-if="selectedList.length" class="selected-list">
              <text v-for="(item, i) in selectedList" :key="i" class="selected-tag" @tap="removeTag(i)">{{ item.term }} ×</text>
            </view>
            <text v-else class="placeholder-text">点击左侧标签开始构建</text>
          </view>

          <view class="platform-row">
            <view
              v-for="p in platforms"
              :key="p.key"
              class="platform-btn"
              :class="{ active: platform === p.key }"
              @tap="platform = p.key"
            >{{ p.label }}</view>
          </view>

          <view class="size-row">
            <view
              v-for="s in currentSizes"
              :key="s"
              class="size-btn"
              :class="{ active: selectedSize === s }"
              @tap="selectedSize = s"
            >{{ s }}</view>
          </view>

          <view class="action-row">
            <Button variant="primary" @tap="generatePrompt">生成提示词</Button>
            <Button variant="secondary" @tap="copyPrompt">复制</Button>
            <Button variant="secondary" @tap="randomPick">随机搭配</Button>
            <Button variant="ghost" @tap="resetAll">重置</Button>
          </view>

          <view class="panel-section">
            <text class="panel-title">提示词预览</text>
            <view class="preview-block">
              <text class="preview-lang-label">中文</text>
              <text class="preview-copy-btn" @tap="copyText(promptCN)">复制</text>
              <view class="preview-text">{{ promptCN || '生成后显示中文提示词' }}</view>
            </view>
            <view class="preview-block">
              <text class="preview-lang-label">English</text>
              <text class="preview-copy-btn" @tap="copyText(promptEN)">复制</text>
              <view class="preview-text">{{ promptEN || 'Generate to see English prompt' }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <Footer />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'
import Button from '../components/Button.vue'
import { categories, categoryMeta, filterItems } from '../data/lexicon-data.js'
import supplementData from '../data/prompt-supplement.json'

const keyword = ref('')
const gender = ref('female')
const platform = ref('agnes')
const selectedItems = ref([])
const selectedDynasties = ref([])
const promptResult = ref(null)

const dynastyOptions = ['先秦', '汉', '魏晋', '南北朝', '隋', '唐', '宋', '明']
const platforms = [
  { key: 'agnes', label: 'Agnes AI' },
  { key: 'midjourney', label: 'Midjourney' },
  { key: 'sd', label: 'SD' }
]

const sizeMap = {
  agnes: ['768×1024', '1024×768', '1024×1024', '1920×1080'],
  midjourney: ['1:1', '3:4', '4:3', '16:9', '9:16'],
  sd: ['512×512', '768×768', '1024×1024', '512×768', '768×1024']
}

const selectedSize = ref('768×1024')
const currentSizes = computed(() => sizeMap[platform.value] || sizeMap.agnes)

// Which lexicon categories to show as prompt tag groups
const promptCategories = ['face', 'temperament', 'makeup', 'hairstyle', 'garment', 'fabric', 'color', 'pattern', 'accessory', 'footwear', 'style', 'scene']

// Build available categories with filtered items
const availableCategories = computed(() => {
  // 1. Lexicon-based categories
  const lexicon = promptCategories.map(catKey => {
    const meta = categoryMeta.find(c => c.key === catKey)
    const opts = { category: catKey }
    if (selectedDynasties.value.length) opts.dynasty = selectedDynasties.value
    const items = filterItems(opts).filter(item => {
      if (gender.value === 'all') return true
      if (!item.gender) return true
      if (item.gender === '通用') return true
      return item.gender === gender.value
    }).filter(item => {
      if (!keyword.value) return true
      const kw = keyword.value.toLowerCase()
      return item.term.includes(kw) || item.meaning.includes(kw)
    })
    const groups = []
    const subMap = {}
    items.forEach(item => {
      const sub = item.sub || ''
      if (!subMap[sub]) { subMap[sub] = { sub, items: [] }; groups.push(subMap[sub]) }
      subMap[sub].items.push(item)
    })
    return { key: catKey, icon: meta?.icon || '', label: meta?.label || catKey, groups, source: 'lexicon' }
  }).filter(cat => cat.groups.length > 0)

  // 2. Supplement categories (pose, angle, shot, lighting, etc.)
  const supplement = supplementData.categories.filter(cat => {
    if (!keyword.value) return true
    const kw = keyword.value.toLowerCase()
    return cat.items.some(i => i.term.includes(kw) || i.en.includes(kw))
  }).map(cat => ({
    key: cat.key,
    icon: cat.icon,
    label: cat.label,
    groups: [{ sub: null, items: cat.items }],
    source: 'supplement'
  }))

  return [...lexicon, ...supplement]
})

function toggleDynasty(d) {
  const i = selectedDynasties.value.indexOf(d)
  i >= 0 ? selectedDynasties.value.splice(i, 1) : selectedDynasties.value.push(d)
}

const selectedList = computed(() => selectedItems.value)

function isSelected(item) {
  return selectedItems.value.some(s => s.term === item.term)
}

// 二级分类单选：同子类下只能选一个
const singleSubs = new Set([
  'face::脸型', 'face::眼型', 'face::鼻型', 'face::唇型', 'face::肤色',
  'makeup::眉妆', 'makeup::唇妆', 'makeup::底妆', 'makeup::妆面风格',
  'temperament::女子气质', 'temperament::男子气质', 'temperament::中性仙气', 'temperament::动态气质', 'temperament::氛围气质',
  'style::朝代风格',
  'garment::袖型',
  'footwear::古鞋', 'footwear::袜'
])
const singleCats = new Set(['hairstyle', 'temperament'])
const singleSuppCats = new Set(['pose', 'angle', 'shot', 'composition', 'lens', 'atmosphere', 'render'])

function isSingleSub(item) {
  if (singleCats.has(item.category)) return true
  if (singleSuppCats.has(item.category)) return true
  if (item.sub && singleSubs.has(item.category + '::' + item.sub)) return true
  return false
}

function toggleTag(item) {
  const idx = selectedItems.value.findIndex(s => s.term === item.term)
  if (idx >= 0) {
    selectedItems.value.splice(idx, 1)
  } else {
    if (isSingleSub(item)) {
      const others = selectedItems.value.filter(s => s.category === item.category)
      others.forEach(o => {
        const oi = selectedItems.value.indexOf(o)
        if (oi >= 0) selectedItems.value.splice(oi, 1)
      })
    }
    selectedItems.value.push(item)
  }
}

function removeTag(i) { selectedItems.value.splice(i, 1) }

function pickRandom(arr) { return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null }

function pickN(arr, min, max) {
  const n = min + Math.floor(Math.random() * (max - min + 1))
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(n, shuffled.length))
}

function randomPick() {
  selectedItems.value.splice(0)
  const genderItems = filterItems({ category: 'face' })

  // Get all items for random selection, respecting current gender/dynasty filters
  function getAvailable(cat) {
    const opts = { category: cat }
    if (selectedDynasties.value.length) opts.dynasty = selectedDynasties.value
    return filterItems(opts).filter(item => {
      if (gender.value === 'all') return true
      if (!item.gender) return true
      if (item.gender === '通用') return true
      return item.gender === gender.value
    })
  }

  // -- Single-select: pick one from each sub-group --
  const pickOne = (cat, sub) => {
    const pool = getAvailable(cat).filter(i => i.sub === sub || (cat === 'hairstyle') || (cat === 'temperament'))
    const item = pickRandom(pool)
    if (item) selectedItems.value.push(item)
  }

  pickOne('face', '脸型')
  pickOne('face', '眼型')
  pickOne('face', '鼻型')
  pickOne('face', '唇型')
  pickOne('face', '肤色')

  // Makeup
  pickOne('makeup', '眉妆')
  pickOne('makeup', '唇妆')
  pickOne('makeup', '底妆')
  pickOne('makeup', '妆面风格')

  // Optional makeup extras
  const faceMarks = getAvailable('makeup').filter(i => i.sub === '面饰' || i.sub === '花钿')
  if (faceMarks.length) {
    const mark = pickRandom(pickN(faceMarks, 1, 2))
    if (mark) selectedItems.value.push(mark)
  }

  // Hairstyle
  pickOne('hairstyle', null)

  // Temperament
  pickOne('temperament', null)

  // Style (朝代风格)
  pickOne('style', '朝代风格')
  // Also maybe one aesthetic style
  const aesthetic = pickRandom(getAvailable('style').filter(i => i.sub === '美学气质'))
  if (aesthetic && Math.random() > 0.5) selectedItems.value.push(aesthetic)

  // Scene
  const scenes = pickN(getAvailable('scene'), 1, 2)
  scenes.forEach(s => selectedItems.value.push(s))

  // Garments — pick 2-4
  const garmentSubs = ['上衣', '深衣制', '袍服', '襦裙制', '下裳', '套装', '外套', '配件']
  const pickedSubs = pickN(garmentSubs, 2, 3)
  pickedSubs.forEach(sub => {
    const item = pickRandom(getAvailable('garment').filter(i => i.sub === sub))
    if (item) selectedItems.value.push(item)
  })

  // Sleeve type
  pickOne('garment', '袖型')

  // Fabrics — 1-2
  pickN(getAvailable('fabric'), 1, 2).forEach(i => selectedItems.value.push(i))

  // Colors — 1-2
  pickN(getAvailable('color'), 1, 2).forEach(i => selectedItems.value.push(i))

  // Patterns — 0-1
  pickN(getAvailable('pattern'), 0, 1).forEach(i => selectedItems.value.push(i))

  // Accessories — 1-2
  pickN(getAvailable('accessory'), 1, 2).forEach(i => selectedItems.value.push(i))

  // Footwear
  pickOne('footwear', '古鞋')

  // Supplement: pick one from each relevant category
  function pickSupp(key) {
    const pool = supplementData.categories.find(c => c.key === key)?.items || []
    const item = pickRandom(pool)
    if (item) selectedItems.value.push({ ...item, category: key })
  }

  pickSupp('pose')
  pickSupp('angle')
  pickN(supplementData.categories.find(c => c.key === 'lighting')?.items || [], 1, 2).forEach(i => selectedItems.value.push({ ...i, category: 'lighting' }))
  pickSupp('shot')
}

// Categorize selected items for structured prompt
function getTags(categoryKey) {
  return selectedItems.value.filter(i => i.category === categoryKey)
}

function generatePrompt() {
  const sel = selectedItems.value
  if (!sel.length) { return }

  const face = getTags('face')
  const temp = getTags('temperament')
  const makeup = getTags('makeup')
  const hair = getTags('hairstyle')
  const garments = getTags('garment')
  const fabrics = getTags('fabric')
  const colors = getTags('color')
  const patterns = getTags('pattern')
  const accessories = getTags('accessory')
  const footwear = getTags('footwear')
  const styles = getTags('style')
  const scenes = getTags('scene')

  // Build subject description
  const subjectParts = []
  if (temp.length) subjectParts.push('气质' + temp.map(t => t.term).join('、'))
  if (face.length) subjectParts.push('面容' + face.map(t => t.term).join('、'))
  if (makeup.length) subjectParts.push('妆容' + makeup.map(t => t.term).join('、'))
  if (hair.length) subjectParts.push('发髻' + hair.map(t => t.term).join('、'))
  const subject = subjectParts.length ? '一位年轻女子，' + subjectParts.join('，') : '一位年轻女子'

  // Build clothing description
  const clothingParts = []
  if (garments.length) clothingParts.push('身着' + garments.map(t => t.term).join('、'))
  if (fabrics.length) clothingParts.push('面料' + fabrics.map(t => t.term).join('、'))
  if (colors.length) clothingParts.push('配色' + colors.map(t => t.term).join('、'))
  if (patterns.length) clothingParts.push('花纹' + patterns.map(t => t.term).join('、'))
  if (accessories.length) clothingParts.push('配饰' + accessories.map(t => t.term).join('、'))
  if (footwear.length) clothingParts.push('足穿' + footwear.map(t => t.term).join('、'))
  const clothing = clothingParts.length ? '，' + clothingParts.join('，') : ''

  // Scene
  const scene = scenes.length ? '，位于' + scenes.map(t => t.term).join('') : ''

  // Style
  const style = styles.length ? '，' + styles.map(t => t.term).join('、') + '风格' : ''

  const quality = '，8K超清，细节丰富，画质精美，焦点清晰'
  const negative = '模糊，低质量，变形，畸形，水印，文字，多余肢体，丑陋'

  const qualityEN = ', 8K ultra detailed, high quality, masterpiece, sharp focus'
  const negativeEN = 'blurry, low quality, distorted, deformed, bad anatomy, watermark, text, extra limbs, ugly'

  function en(t) { return t.en || t.term }

  // English version
  const subjectPartsEN = []
  if (temp.length) subjectPartsEN.push(temp.map(en).join(', '))
  if (face.length) subjectPartsEN.push(face.map(en).join(', '))
  if (makeup.length) subjectPartsEN.push(makeup.map(en).join(', '))
  if (hair.length) subjectPartsEN.push(hair.map(en).join(', '))
  const subjectEN = subjectPartsEN.length ? 'A young woman, ' + subjectPartsEN.join(', ') : 'A young woman'

  const clothingPartsEN = []
  if (garments.length) clothingPartsEN.push('wearing ' + garments.map(en).join(', '))
  if (fabrics.length) clothingPartsEN.push(fabrics.map(en).join(', '))
  if (colors.length) clothingPartsEN.push('in ' + colors.map(en).join(', '))
  if (patterns.length) clothingPartsEN.push('with ' + patterns.map(en).join(', '))
  if (accessories.length) clothingPartsEN.push('with ' + accessories.map(en).join(', '))
  if (footwear.length) clothingPartsEN.push('wearing ' + footwear.map(en).join(', '))
  const clothingEN = clothingPartsEN.length ? ', ' + clothingPartsEN.join(', ') : ''

  const sceneEN = scenes.length ? ', ' + scenes.map(en).join(', ') : ''
  const styleEN = styles.length ? ', ' + styles.map(en).join(' ') + ' style' : ', hanfu traditional Chinese clothing style'

  // Supplement items (pose, angle, shot, composition, lens, lighting, quality, atmosphere, texture, render, post, modifier)
  function getSupp(key) { return selectedItems.value.filter(i => i.category === key) }

  const poses = getSupp('pose')
  const angles = getSupp('angle')
  const shots = getSupp('shot')
  const comps = getSupp('composition')
  const lenses = getSupp('lens')
  const lightings = getSupp('lighting')
  const qualities = getSupp('quality')
  const atmos = getSupp('atmosphere')
  const textures = getSupp('texture')
  const renders = getSupp('render')
  const posts = getSupp('post')
  const modifiers = getSupp('modifier')

  // Chinese supplement
  const suppPartsCN = []
  if (poses.length) suppPartsCN.push(poses.map(t => t.term).join('、'))
  if (angles.length) suppPartsCN.push(angles.map(t => t.term).join('、'))
  if (shots.length) suppPartsCN.push(shots.map(t => t.term).join('、'))
  if (comps.length) suppPartsCN.push(comps.map(t => t.term).join('、'))
  if (lenses.length) suppPartsCN.push(lenses.map(t => t.term).join('、'))
  if (lightings.length) suppPartsCN.push(lightings.map(t => t.term).join('、'))
  if (atmos.length) suppPartsCN.push(atmos.map(t => t.term).join('、'))
  if (textures.length) suppPartsCN.push(textures.map(t => t.term).join('、'))
  if (renders.length) suppPartsCN.push(renders.map(t => t.term).join('、'))
  if (posts.length) suppPartsCN.push(posts.map(t => t.term).join('、'))
  if (modifiers.length) suppPartsCN.push(modifiers.map(t => t.term).join('、'))
  if (qualities.length) suppPartsCN.push(qualities.map(t => t.term).join('、'))
  const suppCN = suppPartsCN.length ? '，' + suppPartsCN.join('，') : ''

  // English supplement
  const suppPartsEN = []
  if (poses.length) suppPartsEN.push(poses.map(en).join(', '))
  if (angles.length) suppPartsEN.push(angles.map(en).join(', '))
  if (shots.length) suppPartsEN.push(shots.map(en).join(', '))
  if (comps.length) suppPartsEN.push(comps.map(en).join(', '))
  if (lenses.length) suppPartsEN.push(lenses.map(en).join(', '))
  if (lightings.length) suppPartsEN.push(lightings.map(en).join(', '))
  if (atmos.length) suppPartsEN.push(atmos.map(en).join(', '))
  if (textures.length) suppPartsEN.push(textures.map(en).join(', '))
  if (renders.length) suppPartsEN.push(renders.map(en).join(', '))
  if (posts.length) suppPartsEN.push(posts.map(en).join(', '))
  if (modifiers.length) suppPartsEN.push(modifiers.map(en).join(', '))
  if (qualities.length) suppPartsEN.push(qualities.map(en).join(', '))
  const suppEN = suppPartsEN.length ? ', ' + suppPartsEN.join(', ') : ''

  let promptCN, promptEN, negPromptCN, negPromptEN

  const baseCN = subject + clothing + scene + style + suppCN + quality
  const baseEN = subjectEN + clothingEN + sceneEN + styleEN + suppEN + qualityEN

  switch (platform.value) {
    case 'agnes':
      promptCN = baseCN + ' --size ' + selectedSize.value
      promptEN = baseEN + ' --size ' + selectedSize.value
      break
    case 'midjourney':
      promptCN = baseCN + ' --ar ' + selectedSize.value + ' --v 6'
      promptEN = baseEN + ' --ar ' + selectedSize.value + ' --v 6'
      break
    case 'sd':
      promptCN = baseCN + ' --size ' + selectedSize.value
      promptEN = baseEN + ' --size ' + selectedSize.value
      negPromptCN = negative
      negPromptEN = negativeEN
      break
  }

  promptResult.value = { promptCN, promptEN, negPromptCN, negPromptEN }
}

const promptCN = computed(() => {
  if (!promptResult.value) return ''
  const r = promptResult.value
  if (platform.value === 'sd' && r.negPromptCN) return r.promptCN + '\n\nNegative: ' + r.negPromptCN
  return r.promptCN
})

const promptEN = computed(() => {
  if (!promptResult.value) return ''
  const r = promptResult.value
  if (platform.value === 'sd' && r.negPromptEN) return r.promptEN + '\n\nNegative: ' + r.negPromptEN
  return r.promptEN
})

function copyPrompt() {
  const txt = promptEN.value || promptCN.value
  if (!txt) return
  uni.setClipboardData({ data: txt })
}

function copyText(txt) {
  if (!txt) return
  uni.setClipboardData({ data: txt })
}

function resetAll() {
  selectedItems.value = []
  promptResult.value = null
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
  flex: 1; max-width: 360px; height: 38px; background: $theme-white; border-radius: 10px;
  padding: 0 14px; font-size: $font-size-body-sub; color: $theme-ink;
  border: 1px solid $theme-light-gray; outline: none;
  &:focus { border-color: $theme-red; }
}

.prompter-body { display: flex; gap: 32px; align-items: flex-start; }
.prompter-left { flex: 1; min-width: 0; }

.gender-tabs { display: flex; gap: 8px; margin-bottom: 24px; }

.gender-btn {
  padding: 8px 24px; border-radius: 8px; font-size: $font-size-body;
  background: $theme-white; color: $theme-gray; border: 1px solid $theme-border;
  cursor: pointer;
  &.active { background: $theme-red; color: $theme-white; border-color: $theme-red; }
}

.dynasty-row { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }

.dynasty-label { font-size: $font-size-small-sub; color: $theme-gray; white-space: nowrap; }

.dynasty-tags { display: flex; gap: 4px; flex-wrap: wrap; }

.dynasty-tag {
  padding: 6px 16px; border-radius: 6px; font-size: $font-size-body-sub; cursor: pointer;
  background: $theme-white; color: $theme-gray; border: 1px solid $theme-border;
  &.active { background: $theme-ink; color: $theme-white; border-color: $theme-ink; }
}

.cat-section { margin-bottom: 20px; }

.cat-sub {
  font-size: 11px; color: $theme-text-secondary; display: block; margin: 8px 0 4px 4px;
}

.cat-title {
  font-size: $font-size-body; font-weight: $font-weight-semibold; color: $theme-ink;
  display: block; margin-bottom: 8px; padding-bottom: 4px;
  border-bottom: 1px solid $theme-light-gray;
}

.tag-grid { display: flex; flex-wrap: wrap; gap: 6px; }

.tag-btn {
  padding: 5px 12px; border-radius: 6px; font-size: $font-size-body-sub;
  background: $theme-white; color: $theme-ink; border: 1px solid $theme-light-gray;
  cursor: pointer; transition: all 0.15s;

  &:hover { border-color: $theme-red; color: $theme-red; }
  &.selected { background: $theme-ink; color: $theme-white; border-color: $theme-ink; }
}

.prompter-right {
  width: min(420px, 35vw); flex-shrink: 0;
  position: sticky; top: clamp(16px, 3vw, 32px);
}

.panel-section {
  background: $theme-white; border-radius: 10px; padding: 14px; margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba($theme-ink, 0.04);
}

.panel-title { font-size: $font-size-body-sub; font-weight: $font-weight-semibold; color: $theme-ink; display: block; margin-bottom: 10px; }

.selected-list { display: flex; flex-wrap: wrap; gap: 6px; }

.selected-tag {
  padding: 5px 12px; background: $theme-red; color: $theme-white;
  border-radius: 6px; font-size: $font-size-small-sub; cursor: pointer;
}

.placeholder-text { font-size: $font-size-small-sub; color: $theme-placeholder; display: block; padding: 6px 0; }

.preview-lang-label { font-size: 11px; color: $theme-gray; display: block; margin-bottom: 4px; }

.preview-block { position: relative; margin-bottom: 12px; }

.preview-copy-btn {
  position: absolute; bottom: 8px; right: 8px; font-size: 11px; color: $theme-red; cursor: pointer;
  padding: 4px 10px; border-radius: 4px; z-index: 1; background: rgba($theme-input-bg, 0.85);
  &:hover { background: rgba($theme-red, 0.06); }
}

.preview-text {
  width: 100%; padding: 10px 10px 32px; border-radius: 6px; min-height: 280px;
  font-size: 12px; color: $theme-ink; line-height: 1.6;
  border: 1px solid $theme-light-gray;
  background: $theme-input-bg; box-sizing: border-box;
  white-space: pre-wrap; word-break: break-all;
}

.platform-row { display: flex; gap: 6px; margin-bottom: 8px; }

.platform-btn {
  flex: 1; padding: 8px; border-radius: 6px; font-size: 12px; cursor: pointer; text-align: center;
  background: $theme-white; color: $theme-gray; border: 1px solid $theme-border;
  &.active { background: $theme-ink; color: $theme-white; border-color: $theme-ink; }
}

.size-row { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px; }

.size-btn {
  padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;
  background: $theme-white; color: $theme-gray; border: 1px solid $theme-border;
  &.active { background: $theme-red; color: $theme-white; border-color: $theme-red; }
}

.action-row { display: flex; gap: 8px; margin-bottom: 20px; }
.action-row .btn { flex: 1; }
</style>
