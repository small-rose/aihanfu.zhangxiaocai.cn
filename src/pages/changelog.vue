<template>
  <view class="page-layout">
    <TopNav current="" />
    <view class="content">
      <view class="page-header">
        <text class="page-title">更新日志</text>
      </view>
      <view class="page-divider"></view>

      <view class="timeline">
        <view v-for="(entry, i) in entries" :key="i" class="tl-item">
          <view class="tl-dot" :class="entry.type">
            <text class="tl-icon">{{ icons[entry.type] }}</text>
          </view>
          <view class="tl-line" v-if="i < entries.length - 1"></view>
          <view class="tl-card">
            <view class="tl-date">{{ entry.date }}</view>
            <text class="tl-title">{{ entry.title }}</text>
            <view class="tl-list">
              <text v-for="(item, j) in entry.items" :key="j" class="tl-item-text" :class="item.type">{{ item.type === 'add' ? '+' : item.type === 'fix' ? '!' : item.type === 'feat' ? '★' : '' }} {{ item.text }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <Footer />
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'

const icons = { add: '+', fix: '!', feat: '★' }

const entries = [
  {
    date: '2026-07-11', type: 'feat',
    title: '移动端适配完善 + 法律页面',
    items: [
      { type: 'add', text: '新增网站声明、隐私政策、更新日志三个页面' },
      { type: 'add', text: 'Footer 增加页面入口链接 + 素材来源' },
      { type: 'fix', text: '移动端收藏抽屉 z-index 覆盖导航栏，取消顶部 padding' },
      { type: 'fix', text: '移动端收藏悬浮按钮缩小到 40px，列表为空时隐藏' },
      { type: 'fix', text: '移动端提示词编辑弹窗文本域溢出修复' },
      { type: 'fix', text: '配色弹窗移动端保持横向布局，色块/字体/按钮等比例缩小' },
      { type: 'fix', text: 'FavoriteFab 各项收藏详情弹窗移动端布局适配' },
      { type: 'fix', text: 'detail.vue 右侧面板改为 min(420px,40vw) 防溢出' },
      { type: 'add', text: '全局 overflow-x:hidden 防止移动端水平滚动' },
    ]
  },
  {
    date: '2026-07-10', type: 'feat',
    title: '收藏系统完善 + 图片收藏',
    items: [
      { type: 'feat', text: 'Gallery 网格视图图片收藏星标' },
      { type: 'feat', text: '图片详情页底部收藏按钮（白底红星星标）' },
      { type: 'feat', text: '收藏详情·图片 左文右图布局 + 复制提示词' },
      { type: 'feat', text: '收藏详情·配色卡 完整配色布局（左文右色+⇌箭头）' },
      { type: 'feat', text: '收藏详情·词库 显示预览图/释义/详细/朝代标签' },
      { type: 'feat', text: '点击收藏详情图片可全屏预览' },
      { type: 'fix', text: '全局收藏变更事件（favorite-changed）驱动角标实时刷新' },
      { type: 'fix', text: 'FavoriteFab items computed 浅拷贝数组确保删除后即时更新' },
      { type: 'fix', text: '收藏按钮多次重构，最终固定为直角红底「收藏」' },
      { type: 'fix', text: '网格文字改为常显 opacity:0.85 + 纯色半透明背景' },
      { type: 'fix', text: '网格 hover 缩放只作用于图片不挤压文字' },
    ]
  },
  {
    date: '2026-07-10', type: 'feat',
    title: '色彩系统大规模升级',
    items: [
      { type: 'feat', text: '色彩数据从 103 种扩展到 628 种（含 zhongguose 525 种）' },
      { type: 'feat', text: '新增 304 种和风色独立文件' },
      { type: 'feat', text: '分类体系从 6 类扩展到 7 类（红/黄/绿/蓝/紫/褐/黑白）' },
      { type: 'fix', text: '分类优先级按名称关键词优先于色值计算' },
      { type: 'feat', text: '搭配色系统：色系交叉搭配+同色系内每色搭配唯一' },
      { type: 'fix', text: '搭配描述多轮优化：四字唯一定制→经典配色档案（48 组有据可查）' },
      { type: 'feat', text: '配色弹窗重构：名称左右+色卡居中+主题色头部细线' },
      { type: 'feat', text: '配色弹窗色块连接/断开切换按钮' },
      { type: 'feat', text: '配色弹窗导出 PNG（匹配布局+标题居中+色卡圆角+断开状态同步）' },
      { type: 'fix', text: 'AI 友好标记：低亮度/低饱和度/生僻字标记为 ai:false' },
    ]
  },
  {
    date: '2026-07-09', type: 'feat',
    title: '词库 + 收藏系统上线',
    items: [
      { type: 'feat', text: '汉服词库页面（分类侧栏+搜索+朝代/性别筛选）' },
      { type: 'feat', text: '词条详情抽屉（DetailDrawer 组件）' },
      { type: 'feat', text: '收藏系统上线：useFavorites.js + FavoriteFab 组件' },
      { type: 'feat', text: '色彩详情收藏（星标即时刷新）' },
      { type: 'feat', text: '词库卡片收藏星标（左上角）' },
      { type: 'feat', text: '提示词收藏功能 + 收藏按钮' },
      { type: 'feat', text: '配色弹窗底部收藏按钮' },
      { type: 'add', text: '导航栏增加「色彩」入口' },
      { type: 'feat', text: '自定义 Toast 组件（墨底+胭脂边框+动态定位）' },
      { type: 'feat', text: '收藏列表显示时间（刚刚/N分钟前/完整时间）' },
      { type: 'feat', text: '色彩详情展示寓意+文史典故+推荐搭配色（带色块）' },
    ]
  },
  {
    date: '2026-07-08', type: 'feat',
    title: '提示词 + 手卷 + 图库 + 发髻',
    items: [
      { type: 'feat', text: '提示词生成页面：多维度筛选+预览+编辑' },
      { type: 'feat', text: '提示词页重构：筛选区+维度快速定位+词库侧栏吸顶' },
      { type: 'feat', text: '提示词预览区可调高度（resize:vertical）' },
      { type: 'feat', text: '双击中文/英文/标题弹出编辑弹窗（支持保存修改）' },
      { type: 'feat', text: '提示词弹窗同时展示中英文+古风主题美化' },
      { type: 'feat', text: '手卷循环滚动（双份内容+scrollWidth/2 重置）' },
      { type: 'fix', text: '手卷循环多轮修复：平滑回滚→无缝循环→内容克隆→最终方案' },
      { type: 'feat', text: '图库页面四种浏览模式：手卷/册页/层叠/网格' },
      { type: 'feat', text: '发髻数据 60+ 条 + 16 张发髻参考图（AI 生成）' },
      { type: 'feat', text: '发髻详情抽屉：图片淡入+骨架屏+入场动画' },
      { type: 'feat', text: '详情抽屉统一 ds-title/ds-text 风格' },
      { type: 'add', text: '全局 title/meta 设置（所有页面）' },
    ]
  },
  {
    date: '2026-07-06~07', type: 'feat',
    title: '图库增强 + 色彩搭配弹窗',
    items: [
      { type: 'feat', text: '图库骨架屏（skeleton shimmer 动画）' },
      { type: 'feat', text: '图库懒加载（IntersectionObserver+200px→800px 预读）' },
      { type: 'feat', text: '层叠模式重构 + 明制图库 20 组' },
      { type: 'fix', text: '图片压缩（pngquant+oxipng）' },
      { type: 'fix', text: '页面切换淡入动画' },
      { type: 'feat', text: '搜索框美化（古风直方+聚焦红色边框）' },
      { type: 'feat', text: '搜索防抖 + 词库筛选器跨分类污染修复' },
      { type: 'fix', text: 'TopNav 路由检测 + 图片边框悬停效果' },
    ]
  },
  {
    date: '2026-07-05', type: 'feat',
    title: '项目创建 + 首页 + 朝代页面',
    items: [
      { type: 'add', text: '项目搭建（uni-app + Vue3 + Vite）' },
      { type: 'feat', text: '首页：品牌展示+朝代时间线+功能入口' },
      { type: 'feat', text: '朝代页面：按朝代浏览汉服发展脉络' },
      { type: 'feat', text: '搜索页面：全局搜索色彩/词条/图片/提示词' },
      { type: 'feat', text: 'TopNav 导航组件（含移动端汉堡菜单）' },
      { type: 'feat', text: 'Footer 组件（典籍文献/学术机构引用）' },
      { type: 'add', text: '色彩筛选页面（103 种传统色+分类/标签筛选）' },
      { type: 'fix', text: 'favicon SVG 修复+居中对齐' },
    ]
  }
]

onLoad(() => {
  document.title = '更新日志 | 汉服图鉴'
  let d = document.querySelector('meta[name="description"]')
  if (!d) { d = document.createElement('meta'); d.name = 'description'; document.head.appendChild(d) }
  d.content = '汉服图鉴更新日志——按时间线记录网站的功能更新、内容新增和问题修复。'
  let k = document.querySelector('meta[name="keywords"]')
  if (!k) { k = document.createElement('meta'); k.name = 'keywords'; document.head.appendChild(k) }
  k.content = '汉服图鉴,更新日志,版本历史,功能更新'
})
</script>

<style lang="scss" scoped>
.page-layout { min-height: 100vh; background: $theme-bg; }
.content { padding: clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px); }
@media (min-width: 1200px) { .content { width: 80%; max-width: 800px; margin: 0 auto; } }
.page-header { margin-bottom: 16px; }
.page-title { font-size: $font-size-page-title; font-weight: $font-weight-bold; color: $theme-ink; }
.page-divider { width: 60px; height: 3px; background: $theme-red; margin-bottom: 28px; border-radius: 2px; }

.timeline { position: relative; padding-left: 32px; }
.tl-item { position: relative; padding-bottom: 28px; }
.tl-dot {
  position: absolute; left: -32px; top: 4px;
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; z-index: 1;
  &.feat { background: $theme-red; color: #fff; }
  &.add { background: $theme-gold; color: #fff; }
  &.fix { background: $theme-ink; color: #fff; }
}
.tl-icon { font-size: 12px; }
.tl-line {
  position: absolute; left: -20px; top: 32px; bottom: 0;
  width: 2px; background: $theme-light-gray;
}
.tl-card {
  background: $theme-white; border-radius: 10px; padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.tl-date { font-size: 12px; color: $theme-placeholder; display: block; margin-bottom: 4px; font-family: monospace; }
.tl-title { font-size: 17px; font-weight: $font-weight-bold; color: $theme-ink; display: block; margin-bottom: 10px; }
.tl-list { display: flex; flex-direction: column; gap: 4px; }
.tl-item-text {
  font-size: 13px; color: $theme-text-body; line-height: 1.6; display: block;
  padding-left: 4px;
}

@media (max-width: 768px) {
  .page-layout { overflow-x: hidden; }
  .content { padding: 16px 12px; }
  .timeline { padding-left: 28px; }
  .tl-dot { left: -28px; width: 24px; height: 24px; font-size: 11px; }
  .tl-line { left: -17px; }
  .tl-card { padding: 12px 14px; }
  .tl-title { font-size: 15px; }
  .tl-item-text { font-size: 12px; }
}
</style>
