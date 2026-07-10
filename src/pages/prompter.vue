<template>
  <view class="page-layout">
    <TopNav current="prompter" />
    <view class="content">
      <view class="page-header">
        <text class="page-title">提示词</text>
        <view class="search-wrap"><input class="search-input" placeholder="搜索标签..." v-model="keyword" /></view>
      </view>
      <view class="page-divider"></view>

      <view class="prompter-body">
          <view class="prompter-left">
            <!-- 筛选区：性别 + 朝代 + 维度快速定位 -->
            <view class="filter-area">
              <view class="gender-row">
                <text class="gender-label">性别</text>
                <view class="gender-tags">
                  <view class="gender-tag" :class="{ active: gender === 'male' }" @tap="gender = gender === 'male' ? '' : 'male'">男性</view>
                  <view class="gender-tag" :class="{ active: gender === 'female' }" @tap="gender = gender === 'female' ? '' : 'female'">女性</view>
                </view>
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

              <!-- 维度快速定位：点击跳转到对应分类区块 -->
              <view class="dimension-row">
                <text class="dimension-label">维度</text>
                <view class="dimension-tags">
                  <view
                    v-for="cat in availableCategories"
                    :key="cat.key"
                    class="dimension-tag"
                    @tap="scrollToCat(cat.key)"
                  >{{ cat.icon }} {{ cat.label }}</view>
                </view>
              </view>
            </view>

          <!-- 分类标签列表：每个分类区块绑定 id 供 scrollToCat 定位 -->
          <view class="cat-list">
            <view v-for="cat in availableCategories" :key="cat.key" :id="'cat-'+cat.key" class="cat-section">
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
            <view v-if="selectedItems.length" class="selected-list">
              <text v-for="(item, i) in selectedItems" :key="i" class="selected-tag" @tap="removeTag(i)">{{ item.term }} ×</text>
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
            <view class="fav-btn" :style="{ color: isPromptFav ? '#C41E3A' : '', borderColor: isPromptFav ? '#C41E3A' : '' }" @tap="toggleFavPrompt">★ 收藏</view>
            <Button variant="secondary" @tap="randomPick">随机搭配</Button>
            <Button variant="ghost" @tap="resetAll">重置</Button>
          </view>

          <view class="panel-section">
            <text class="panel-title" @dblclick="openPromptModal('both')">提示词预览</text>
            <view class="preview-block">
              <text class="preview-lang-label">中文</text>
              <text class="preview-copy-btn" @tap="copyText(promptCN)">复制</text>
              <view class="preview-text" @dblclick="openPromptModal('cn')">{{ promptCN || '生成后显示中文提示词' }}</view>
            </view>
            <view class="preview-block">
              <text class="preview-lang-label">English</text>
              <text class="preview-copy-btn" @tap="copyText(promptEN)">复制</text>
              <view class="preview-text" @dblclick="openPromptModal('en')">{{ promptEN || 'Generate to see English prompt' }}</view>
            </view>

            <!-- 提示词编辑弹窗 -->
            <view v-if="promptModal" class="pm-overlay" @tap="closePromptModal"></view>
            <view class="pm-modal" :class="{ open: !!promptModal }" v-if="promptModal">
              <view class="pmm-header">
                <text class="pmm-title">{{ promptModal === 'cn' ? '中文提示词' : promptModal === 'en' ? 'English Prompt' : '提示词预览（中英文）' }}</text>
                <text class="pmm-close" @tap="closePromptModal">✕</text>
              </view>
              <view class="pmm-body">
                <template v-if="promptModal === 'both' || promptModal === 'cn'">
                  <view class="pmm-section">
                    <view class="pmm-section-hd">
                      <text class="pmm-lang">中文</text>
                      <text class="pmm-copy" @tap="saveAndCopy('cn')">📋 复制</text>
                    </view>
                    <textarea class="pmm-textarea" v-model="editCN" />
                  </view>
                </template>
                <view v-if="promptModal === 'both'" class="pmm-divider"></view>
                <template v-if="promptModal === 'both' || promptModal === 'en'">
                  <view class="pmm-section">
                    <view class="pmm-section-hd">
                      <text class="pmm-lang">English</text>
                      <text class="pmm-copy" @tap="saveAndCopy('en')">📋 Copy</text>
                    </view>
                    <textarea class="pmm-textarea" v-model="editEN" />
                  </view>
                </template>
              </view>
              <view class="pmm-footer">
                <text class="pmm-btn" @tap="savePrompt">保存修改</text>
                <text class="pmm-btn pmm-btn-cancel" @tap="closePromptModal">取消</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <Footer />
    <FavoriteFab />
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'
import Button from '../components/Button.vue'
import FavoriteFab from '../components/FavoriteFab.vue'
import { categories, categoryMeta, filterItems } from '../data/lexicon-data.js'
import supplementData from '../data/prompt-supplement.json'
import { showToast } from '../utils/useToast.js'
import { addFavorite, removeFavorite, isFavorite } from '../utils/useFavorites.js'

const keyword = ref('')
const keywordDebounced = ref('')
const promptModal = ref(null)
const editCN = ref('')
const editEN = ref('')

function openPromptModal(mode) {
  editCN.value = promptCN.value || ''
  editEN.value = promptEN.value || ''
  promptModal.value = mode
}
function closePromptModal() { promptModal.value = null }
function savePrompt() {
  if (promptResult.value) {
    if (promptModal.value === 'both' || promptModal.value === 'cn') promptResult.value.promptCN = editCN.value
    if (promptModal.value === 'both' || promptModal.value === 'en') promptResult.value.promptEN = editEN.value
  }
  promptModal.value = null
  showToast('已保存')
}
function saveAndCopy(lang) {
  const txt = lang === 'cn' ? editCN.value : editEN.value
  if (!txt) return
  if (promptResult.value) {
    if (lang === 'cn') promptResult.value.promptCN = editCN.value
    else promptResult.value.promptEN = editEN.value
  }
  navigator.clipboard.writeText(txt).then(() => showToast('已复制')).catch(() => showToast('已复制'))
}
let searchTimer = null
watch(keyword, (val) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { keywordDebounced.value = val }, 300)
})

onLoad((query) => {
  document.title = '提示词组合器 | AI Prompt Generator'
  let d = document.querySelector('meta[name="description"]')
  if (!d) { d = document.createElement('meta'); d.name = 'description'; document.head.appendChild(d) }
  d.content = 'AI汉服提示词生成器——选择朝代、性别、发髻、服饰要素，一键生成AI绘画提示词，支持Agnes AI/Midjourney/SD。'
  let k = document.querySelector('meta[name="keywords"]')
  if (!k) { k = document.createElement('meta'); k.name = 'keywords'; document.head.appendChild(k) }
  k.content = '汉服提示词,AI提示词生成器,AI绘画,汉服,Midjourney,Stable Diffusion,Agnes AI'
  if (query.q) { keyword.value = query.q; keywordDebounced.value = query.q }
})
const gender = ref('')  // ''=全部展示，'male'/'female' 过滤；点击可取消
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
// 切换平台时重置尺寸到该平台的第一个选项
watch(platform, () => {
  const sizes = sizeMap[platform.value] || sizeMap.agnes
  selectedSize.value = sizes[0]
})

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
      if (!gender.value) return true
      if (!item.gender) return true
      if (item.gender === '通用') return true
      return item.gender === gender.value
    }).filter(item => {
      if (!keywordDebounced.value) return true
      const kw = keywordDebounced.value.toLowerCase()
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
    if (!keywordDebounced.value) return true
    const kw = keywordDebounced.value.toLowerCase()
    return cat.items.some(i => i.term.includes(kw) || i.en.includes(kw))
  }).map(cat => ({
    key: cat.key,
    icon: cat.icon,
    label: cat.label,
    groups: [{ sub: null, items: cat.items.map((item, i) => ({ ...item, id: 'supp_' + cat.key + '_' + i, category: cat.key })) }],
    source: 'supplement'
  }))

  return [...lexicon, ...supplement]
})

function toggleDynasty(d) {
  const i = selectedDynasties.value.indexOf(d)
  i >= 0 ? selectedDynasties.value.splice(i, 1) : selectedDynasties.value.push(d)
}

function isSelected(item) {
  return selectedItems.value.some(s => s.id === item.id)
}

// 二级分类单选：同子类下只能选一个（whole-category 单选如 hairstyle 由 singleCats 管理）
const singleSubs = new Set([
  'face::脸型', 'face::眼型', 'face::鼻型', 'face::唇型', 'face::肤色',
  'makeup::眉妆', 'makeup::唇妆', 'makeup::底妆', 'makeup::妆面风格',
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

// 点击维度标签：平滑滚动到对应分类区块
function scrollToCat(key) {
  const el = document.getElementById('cat-' + key)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function toggleTag(item) {
  const idx = selectedItems.value.findIndex(s => s.id === item.id)
  if (idx >= 0) {
    selectedItems.value.splice(idx, 1)
  } else {
    if (isSingleSub(item)) {
      if (singleCats.has(item.category) || singleSuppCats.has(item.category)) {
        // 整个分类只能选一个（如发型、姿势）
        selectedItems.value = selectedItems.value.filter(s => s.category !== item.category)
      } else {
        // 同子类下只能选一个（如五官中的脸型、眼型互斥）
        selectedItems.value = selectedItems.value.filter(s => !(s.category === item.category && s.sub === item.sub))
      }
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
  selectedItems.value = []
  const genderItems = filterItems({ category: 'face' })

  // Get all items for random selection, respecting current gender/dynasty filters
  function getAvailable(cat) {
    const opts = { category: cat }
    if (selectedDynasties.value.length) opts.dynasty = selectedDynasties.value
    return filterItems(opts).filter(item => {
      if (!gender.value) return true
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
  let suppIdx = {}
  function pickSupp(key) {
    if (!suppIdx[key]) suppIdx[key] = 0
    const pool = supplementData.categories.find(c => c.key === key)?.items || []
    const item = pickRandom(pool)
    if (item) {
      const idx = suppIdx[key]++
      selectedItems.value.push({ ...item, id: 'supp_' + key + '_' + idx, category: key })
    }
  }

  pickSupp('pose')
  pickSupp('angle')
  const lightingItems = supplementData.categories.find(c => c.key === 'lighting')?.items || []
  let li = 0
  pickN(lightingItems, 1, 2).forEach(i => selectedItems.value.push({ ...i, id: 'supp_lighting_' + (li++), category: 'lighting' }))
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

  const isMale = gender.value === 'male'
  const subjectLabel = isMale ? '一位年轻男子' : '一位年轻女子'
  const subjectLabelEN = isMale ? 'A young man' : 'A young woman'

  // Build subject description
  const subjectParts = []
  if (temp.length) subjectParts.push('气质' + temp.map(t => t.term).join('、'))
  if (face.length) subjectParts.push('面容' + face.map(t => t.term).join('、'))
  if (makeup.length) subjectParts.push('妆容' + makeup.map(t => t.term).join('、'))
  if (hair.length) subjectParts.push('发髻' + hair.map(t => t.term).join('、'))
  const subject = subjectParts.length ? subjectLabel + '，' + subjectParts.join('，') : subjectLabel

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
  const subjectEN = subjectPartsEN.length ? subjectLabelEN + ', ' + subjectPartsEN.join(', ') : subjectLabelEN

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
  navigator.clipboard.writeText(txt).then(() => showToast()).catch(() => showToast())
}

function copyText(txt) {
  if (!txt) return
  navigator.clipboard.writeText(txt).then(() => showToast()).catch(() => showToast())
}

function hashStr(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0 }
  return Math.abs(h).toString(36)
}

function resetAll() {
  selectedItems.value = []
  promptResult.value = null
}

const curFavId = computed(() => {
  const txt = promptCN.value || promptEN.value
  return txt ? 'prompt_' + hashStr(txt) : null
})

const isPromptFav = computed(() => curFavId.value ? isFavorite(curFavId.value) : false)

function toggleFavPrompt() {
  const txt = promptCN.value || promptEN.value
  if (!txt) { showToast('先生成提示词'); return }
  const id = curFavId.value
  if (isFavorite(id)) { showToast('已收藏，无需重复收藏'); return }
  addFavorite({ id, type: 'prompt', name: '提示词', sub: platform.value + ' · ' + selectedSize.value, preview: '#C41E3A', route: '/pages/prompter', contentCN: promptCN.value || '', contentEN: promptEN.value || '' })
  showToast('已收藏')
}
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
  max-width: 360px; height: 34px; flex: 1;
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

.prompter-body { display: flex; gap: 32px; align-items: flex-start; }
.prompter-left { flex: 1; min-width: 0; }

/* 性别标签：与朝代标签同款尺寸 */
.gender-row { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
.gender-label { font-size: $font-size-small-sub; color: $theme-gray; white-space: nowrap; }
.gender-tags { display: flex; gap: 4px; flex-wrap: wrap; }
.gender-tag {
  padding: 6px 16px; border-radius: 6px; font-size: $font-size-body-sub; cursor: pointer;
  background: $theme-white; color: $theme-gray; border: 1px solid $theme-border;
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

// 维度快速定位行：列出所有分类供点击跳转
.dimension-row { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.dimension-label { font-size: $font-size-small-sub; color: $theme-gray; white-space: nowrap; }
.dimension-tags { display: flex; gap: 4px; flex-wrap: wrap; }
.dimension-tag {
  padding: 5px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;
  background: $theme-white; color: $theme-gray; border: 1px solid $theme-border;
  transition: all 0.15s;
  &:hover { border-color: $theme-red; color: $theme-red; }
}

// 筛选区容器：包裹性别/朝代/维度，非吸顶
.filter-area {
  background: $theme-bg;
  padding: 6px 0 18px;
}
// scroll-margin-top 补偿固定 TopNav 高度，确保 scrollIntoView 锚点不被遮挡
.cat-section { margin-bottom: 20px; scroll-margin-top: 60px; }
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
  width: 100%; padding: 10px 10px 32px; border-radius: 6px; min-height: 160px;
  font-size: 12px; color: $theme-ink; line-height: 1.6;
  border: 1px solid $theme-light-gray;
  background: $theme-input-bg; box-sizing: border-box;
  white-space: pre-wrap; word-break: break-all;
  resize: vertical; overflow: auto;
}

/* 提示词弹窗 */
.pm-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 300; }
.pm-modal {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%) scale(0.9);
  width: min(720px, 92vw); max-height: 82vh;
  background: #faf8f4; border-radius: 14px; z-index: 301;
  display: flex; flex-direction: column; opacity: 0; transition: all 0.25s ease;
  box-shadow: 0 16px 48px rgba(0,0,0,0.2); overflow: hidden;
  border: 1px solid #e8e4dc;
}
.pm-modal.open { opacity: 1; transform: translate(-50%,-50%) scale(1); }
.pmm-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px; border-bottom: 1px solid #e0d8cc; flex-shrink: 0;
  background: #fff;
}
.pmm-title {
  font-size: 15px; font-weight: $font-weight-bold; color: $theme-ink;
  padding-left: 10px; border-left: 3px solid $theme-red;
}
.pmm-close { font-size: 22px; color: #aaa; cursor: pointer; padding: 4px; line-height: 1; &:hover { color: #333; } }
.pmm-body { padding: 20px 24px; overflow-y: auto; flex: 1; }
.pmm-section { margin-bottom: 4px; }
.pmm-section-hd {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 8px;
}
.pmm-lang { font-size: 13px; font-weight: 600; color: #555; }
.pmm-copy { font-size: 11px; color: $theme-red; cursor: pointer; padding: 2px 8px; border-radius: 4px; &:hover { background: rgba($theme-red,0.06); } }
.pmm-content {
  display: block; font-size: 13px; color: #333; line-height: 1.8;
  white-space: pre-wrap; word-break: break-word;
  background: #fff; padding: 14px 16px; border-radius: 8px;
  border: 1px solid #e8e4dc; max-height: 240px; overflow-y: auto;
}
.pmm-textarea {
  width: 100%; min-height: 160px; padding: 12px 14px; box-sizing: border-box;
  font-size: 13px; color: #333; line-height: 1.7; font-family: inherit;
  background: #fff; border: 1px solid #ddd; border-radius: 8px;
  resize: vertical; outline: none; transition: border-color 0.2s;
}
.pmm-textarea:focus { border-color: $theme-red; }
.pmm-divider { height: 1px; background: #e0d8cc; margin: 16px 0; }
.pmm-footer {
  padding: 12px 24px 16px; display: flex; justify-content: center; gap: 10px;
  border-top: 1px solid #e0d8cc; flex-shrink: 0;
}
.pmm-btn {
  padding: 9px 28px; border-radius: 6px; font-size: 13px; font-weight: 600;
  background: $theme-red; color: #fff; cursor: pointer; text-align: center;
  &:active { opacity: 0.85; }
}
.pmm-btn-cancel { background: #fff; color: #333; border: 1px solid #ddd; }

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

.action-row { display: flex; gap: 8px; margin-bottom: 12px; }
.action-row .btn, .action-row .fav-btn { flex: 1; }
.fav-btn {
  display: flex; align-items: center; justify-content: center;
  padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;
  background: $theme-white; color: $theme-gray; border: 1px solid $theme-border;
  transition: all 0.2s; white-space: nowrap;
  &.active { background: #FFF0F0; color: $theme-red; border-color: $theme-red; }
}

/* 移动端适配：仅调整间距/布局，不改字号 */
@media (max-width: 768px) {
  .page-layout { overflow-x: hidden; }                      // 防止水平溢出
  .content { padding: 16px 12px; }                          // 缩小内容边距
  .page-header { flex-wrap: wrap; gap: 10px; margin-bottom: 12px; } // 标题搜索换行
  .page-divider { margin-bottom: 16px; }
  .search-wrap { max-width: 100%; }                         // 搜索框占满行宽

  .prompter-body { flex-direction: column; gap: 16px; }
  .prompter-left { width: 100%; }
  .prompter-right { width: 100%; position: static; }        // 取消吸顶随内容滚动

  .filter-area { padding: 4px 0 10px; }                     // 缩小筛选区纵向间距
  .gender-row { margin-bottom: 8px; gap: 4px; }
  .gender-tag { padding: 4px 12px; }
  .dynasty-row { margin-bottom: 8px; gap: 4px; }
  .dynasty-tag { padding: 4px 10px; }
  .dimension-row { margin-bottom: 6px; gap: 4px; }
  .dimension-tags { overflow-x: auto; flex-wrap: nowrap; gap: 4px; padding-bottom: 4px; } // 水平滚动
  .dimension-tag { flex-shrink: 0; padding: 4px 10px; }

  .cat-section { margin-bottom: 14px; scroll-margin-top: 52px; } // 移动端 TopNav 高度对应
  .cat-sub { margin: 4px 0 2px 2px; }
  .tag-grid { gap: 4px; }
  .tag-btn { padding: 4px 10px; }

  .action-row { flex-wrap: wrap; gap: 4px; }
  .action-row .btn { flex: 1 0 calc(50% - 2px); min-width: 0; }
  .panel-section { padding: 10px; }
  .preview-text { min-height: 120px; padding: 8px 8px 28px; resize: vertical; }
}
</style>
