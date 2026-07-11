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
              <text v-for="(item, j) in entry.items" :key="j" class="tl-item-text" :class="item.type"><text class="tl-tag" :class="item.type">{{ item.type === 'feat' ? '功能' : item.type === 'add' ? '新增' : '修复' }}</text> {{ item.text }}</text>
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
    title: '移动端适配 + 法律页面 + 收藏最终完善',
    items: [
      { type: 'add', text: '网站声明页面——免责声明/版权声明/侵权处理/素材来源说明' },
      { type: 'add', text: '隐私政策页面——信息收集/Cookie/第三方服务/数据安全/用户权利' },
      { type: 'add', text: '更新日志页面——时间线式版本历史' },
      { type: 'add', text: 'Footer 增加「网站声明·隐私政策·更新日志」链接 + 素材来源分类' },
      { type: 'fix', text: '全局移动端适配：抽屉宽 75vw、z-index 覆盖导航栏、取消顶部留白' },
      { type: 'fix', text: '移动端收藏悬浮按钮 48px→40px，列表为空时自动隐藏' },
      { type: 'fix', text: '移动端配色弹窗保持横向布局，色块/字号/按钮等比例缩小' },
      { type: 'fix', text: '移动端提示词编辑弹窗文本域溢出修复，按钮缩小' },
      { type: 'fix', text: '移动端 detail.vue 右侧面板 420px→min(420px,40vw) 防溢出' },
      { type: 'add', text: '全局 overflow-x:hidden 防止移动端水平滚动' },
      { type: 'fix', text: '移动端提示词按钮 flex:auto 按内容比例占满整行' },
      { type: 'fix', text: '收藏详情各弹窗按钮 font-size 12px 等比例调小' },
      { type: 'fix', text: '收藏详情配色卡卡片 padding 缩小、色片宽度缩小、字体缩小' },
      { type: 'fix', text: '配色弹窗去掉边框色彩' },
      { type: 'fix', text: '收藏详情「删除」改「移除收藏」' },
      { type: 'fix', text: '图片收藏星标 → 回退 → 网格文字常显 → overlay 纯色背景 → hover 缩放只作用于图片' },
      { type: 'fix', text: '收藏图片详情加复制按钮（📋）+ 点击全屏预览' },
      { type: 'fix', text: '收藏 remove 与 removeWithRefresh 函数修复 + 重复函数清理' },
      { type: 'fix', text: 'items computed 浅拷贝数组确保删除后即时更新' },
      { type: 'feat', text: '全局 favorite-changed 事件驱动悬浮按钮角标实时刷新' },
      { type: 'fix', text: '图片详情页注册 FavoriteFab 组件（之前遗漏）' },
      { type: 'fix', text: '收藏悬浮按钮改白底红星星标（背景 #fff，星标 #c41e3a）' },
      { type: 'fix', text: '打开收藏面板时自动刷新列表' },
      { type: 'fix', text: '网格图片懒加载 rootMargin 200px→800px，首屏图片立即加载' },
      { type: 'fix', text: '移除图片 z-index:1 使骨架屏背景可见 + important 确保不被覆盖' },
      { type: 'fix', text: '切换布局时不清空 visibleImgs 避免图片闪白' },
    ]
  },
  {
    date: '2026-07-10', type: 'feat',
    title: '图片收藏 + 收藏详情完善 + 重构与修复',
    items: [
      { type: 'feat', text: 'Gallery 网格视图图片收藏星标' },
      { type: 'feat', text: '详情页底部收藏按钮（胶囊形→直角红底「收藏」）' },
      { type: 'feat', text: '相册/堆叠弹窗加收藏星标' },
      { type: 'feat', text: '收藏详情·图片 左文右图布局 + 提示词复制按钮' },
      { type: 'feat', text: '收藏详情·配色卡 完整配色布局（主色+⇌箭头+搭配色）' },
      { type: 'feat', text: '收藏详情·词库 显示预览图/释义/详细/朝代/性别/拼音标签' },
      { type: 'feat', text: '词库详情左文右图 flex 布局' },
      { type: 'fix', text: '词库收藏详情独立存 imagePath/hex 字段，完整展示' },
      { type: 'fix', text: '词库详情左侧美化：衬线字体 24px + 红金装饰线 + 分色标签' },
      { type: 'feat', text: '收藏面板标题添加红金装饰线' },
      { type: 'feat', text: '配色弹窗底部加收藏星标按钮' },
      { type: 'fix', text: '配色卡收藏详情修正为左主色|主色块⇌搭配色块|搭配色' },
      { type: 'fix', text: '配色卡色块尺寸多次调整：48px→64px→90x64→180x64' },
      { type: 'fix', text: '配色卡文字字号/粗细/颜色对齐配色弹窗原风格' },
      { type: 'fix', text: '配色卡左侧文字右对齐，右侧文字左对齐' },
      { type: 'feat', text: '详情页图片点击全屏预览 + 提示词收藏星标 + 收藏 toast' },
      { type: 'fix', text: '详情页星标渲染多次修复（view包裹text→纯view渲染文本）' },
      { type: 'fix', text: '改用 ES import 替代 require 修复收藏功能' },
    ]
  },
  {
    date: '2026-07-10', type: 'feat',
    title: '词库收藏 + 导航栏色彩入口 + 提示词编辑弹窗',
    items: [
      { type: 'feat', text: '词库收藏：卡片右上角星标 + 详情抽屉星标' },
      { type: 'feat', text: '导航栏增加「色彩」入口' },
      { type: 'fix', text: '词库星标改用 view + 模板直接 favSet.has() 判断确保响应式' },
      { type: 'fix', text: '性别标签右移避开收藏星标（right:12px→36px）' },
      { type: 'feat', text: '收藏详细·词库 显示预览图 + 释义 + 详细内容' },
      { type: 'feat', text: '提示词预览双击弹出编辑弹窗（区分中/英/全部）' },
      { type: 'feat', text: '提示词弹窗中英文同时展示 + 古风主题美化 + 支持编辑保存' },
      { type: 'fix', text: '收藏按钮始终红色实心，已收藏时红字红线' },
      { type: 'fix', text: 'Toast 位置动态：弹窗内居中，页面内偏下' },
      { type: 'fix', text: '编辑弹窗内保存/复制 toast 居中' },
      { type: 'fix', text: '收藏详细弹窗图标缩小 + 标题格式统一' },
    ]
  },
  {
    date: '2026-07-10', type: 'feat',
    title: '收藏系统上线',
    items: [
      { type: 'feat', text: '收藏系统数据层 useFavorites.js（localStorage 持久化）' },
      { type: 'feat', text: 'FavoriteFab 悬浮按钮组件（6 种收藏类型：图片/色彩/提示词/配色卡/词库/纹样）' },
      { type: 'feat', text: '色彩收藏（星标即时刷新 + 无打扰 toast）' },
      { type: 'feat', text: '提示词收藏功能（内容 hash 判重）' },
      { type: 'feat', text: '收藏列表点击弹窗展示详情' },
      { type: 'feat', text: '收藏弹窗显示中文/英文 + 色彩色块 + UI 美化' },
      { type: 'feat', text: '收藏弹窗显示寓意 + 文史典故 + 推荐搭配色（带色块）' },
      { type: 'feat', text: '收藏列表显示收藏时间（刚刚/N分钟前/小时前/昨天/完整时间）' },
      { type: 'fix', text: '收藏弹窗增大字号 + 深色文字 + 高对比度 + 更大内容区' },
      { type: 'fix', text: '收藏抽屉标题加红色分割线 + 弹窗加宽到 720px' },
      { type: 'fix', text: 'FavoriteFab 从 App.vue 移到各页面模板确保可见' },
      { type: 'fix', text: '收藏抽屉宽度 33.33%，顶部避开导航栏' },
      { type: 'fix', text: '📋 复制按钮改为 24px 微圆角正方形' },
      { type: 'feat', text: 'Toast 组件多次迭代：自定义→共享→Clipboard API→墨底胭脂边框→红色边框' },
    ]
  },
  {
    date: '2026-07-10', type: 'feat',
    title: '色彩系统 + 配色弹窗 + Toast + title/meta',
    items: [
      { type: 'feat', text: '色彩数据从 103 种扩展到 628 种（含 zhongguose 525 种）' },
      { type: 'feat', text: '新增 304 种和风色独立文件（color-wairo.js）' },
      { type: 'fix', text: '分类体系从 6 类扩展到 7 类（蓝紫拆分为蓝/紫）' },
      { type: 'fix', text: '分类优先级按名称关键词优先于色值计算' },
      { type: 'fix', text: 'AI 友好标记：亮度<18%或>94%、饱和度<15%、名称含生僻字 → ai:false' },
      { type: 'feat', text: '搭配色系统：色系交叉搭配 + 同色系内每色搭配唯一' },
      { type: 'fix', text: '搭配色去掉黑白色作为主配色' },
      { type: 'fix', text: '搭配描述多轮优化：亮度对比→具体配色名→4字唯一定制（16万种组合）→48 组经典配色档案' },
      { type: 'feat', text: '配色弹窗：名称左右 + 色卡居中 + 主题色头部细线' },
      { type: 'feat', text: '配色弹窗色块连接/断开切换按钮' },
      { type: 'feat', text: '导出 PNG 匹配弹窗布局（标题居中+色卡圆角+断开状态同步+来源链接）' },
      { type: 'fix', text: '导出 PNG 多次改进：断开状态色卡特宽、箭头缩小、文字向外让位' },
      { type: 'feat', text: '所有页面对应 title + meta description/keywords' },
    ]
  },
  {
    date: '2026-07-09', type: 'feat',
    title: '手卷循环 + 图库增强 + 提示词重构',
    items: [
      { type: 'feat', text: '图库骨架屏（skeleton shimmer 动画）' },
      { type: 'feat', text: '图库懒加载（IntersectionObserver rootMargin 200px）' },
      { type: 'fix', text: '页面切换淡入动画（JS）' },
      { type: 'feat', text: '搜索框美化（古风直方风格 + 聚焦红色边框）' },
      { type: 'feat', text: '提示词页重构：筛选区 + 维度快速定位 + 词库侧栏吸顶 + 移动端适配' },
      { type: 'fix', text: '五官子类互斥、性别跟随提示词、平台切换重置尺寸' },
      { type: 'fix', text: '词库筛选器跨分类污染修复 + TopNav 搜索改用 ref' },
      { type: 'feat', text: '手卷自动循环 + 搜索防抖' },
      { type: 'fix', text: '手卷循环多轮修复：平滑回滚→无缝循环→内容克隆（数据源取src）→scrollWidth/2 分界→还原→模板双份+虚拟位置计数器' },
      { type: 'feat', text: '发髻数据 + 详情页美化' },
    ]
  },
  {
    date: '2026-07-08', type: 'feat',
    title: '层叠模式重构 + 移动端适配 + 明制图库',
    items: [
      { type: 'feat', text: '层叠模式重构' },
      { type: 'feat', text: '明制图库 20 组（含数据补全：马面裙辅色/鞋履/眼型修饰/头面）' },
      { type: 'feat', text: '图片压缩（pngquant + oxipng）' },
      { type: 'feat', text: '移动端全适配 + 提示词页面重构' },
    ]
  },
  {
    date: '2026-07-07', type: 'feat',
    title: '发髻系统 + 全局搜索 + 抽屉美化',
    items: [
      { type: 'feat', text: '全局搜索功能 + 页面生命周期修复' },
      { type: 'feat', text: '发髻数据（椎髻/堕马髻/奉圣髻/灵蛇髻/飞天髻等 60+ 条）' },
      { type: 'feat', text: '16 张发髻参考图（AI 生成，pngquant 压缩）' },
      { type: 'feat', text: '发髻详情抽屉：图片淡入过渡' },
      { type: 'feat', text: '抽屉加载骨架屏 + 淡入' },
      { type: 'feat', text: '抽屉内容入场动画（交错延迟）' },
      { type: 'fix', text: '抽屉图片 DOM 用 v-show 保活，避免重新打开时重复加载' },
      { type: 'fix', text: '抽屉过渡时间 0.5s，平滑缓动' },
      { type: 'fix', text: '关闭动画期间保持内容存活，延迟清理' },
      { type: 'fix', text: 'TopNav 路由检测 + 图片边框悬停效果' },
      { type: 'add', text: 'Footer 增加引用来源' },
    ]
  },
  {
    date: '2026-07-06', type: 'feat',
    title: '项目创建',
    items: [
      { type: 'add', text: '项目搭建（uni-app + Vue3 + Vite）' },
      { type: 'feat', text: '完整版上线：词库 / 提示词 / 图库 / 发髻 / 朝代' },
      { type: 'fix', text: 'favicon SVG XML 修复 + 居中对齐 + 引用路径修正' },
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
.tl-tag {
  display: inline-block; font-size: 10px; font-weight: 600; padding: 1px 6px;
  border-radius: 3px; margin-right: 4px; vertical-align: middle;
  &.feat { background: rgba($theme-red, 0.12); color: $theme-red; }
  &.add { background: rgba($theme-gold, 0.15); color: #8B6B2A; }
  &.fix { background: $theme-bg; color: $theme-text-secondary; }
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
