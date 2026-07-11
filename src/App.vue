<template>
  <view></view>
</template>

<script>
// 捕获阶段监听 window 级 keydown：在 uni-app 处理之前拦截 Enter
// capture:true 确保在事件到达 target 之前就拦截，不依赖冒泡
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return
    const topnav = document.querySelector('.topnav')
    if (!topnav) return
    const container = topnav.querySelector('.topnav-search')
    if (!container || !container.contains(e.target)) return
    e.preventDefault()
    e.stopPropagation()
    const input = topnav.querySelector('.uni-input-input')
    const q = input ? input.value.trim() : ''
    if (q) {
      uni.navigateTo({ url: '/pages/search?q=' + encodeURIComponent(q) })
    }
  }, true)

  // 页面切换淡入
  // 根因：页面切换时整个 uni-page 被重建（新 key 销毁旧组件），新 uni-page 插入 #app
  // 旧方案观察 uni-page-body 子节点 → 但 observer 挂在已脱离 DOM 的旧元素上，永不触发
  // 方案：在稳定的 #app 上观察，检测新 uni-page 插入 → 强制 reflow 触发 opacity transition
  function fadeIn(el) {
    el.style.transition = 'opacity 400ms ease-out'
    el.style.opacity = '0'
    void el.offsetHeight  // 强制重排，确保 opacity:0 被渲染后再切到 1
    el.style.opacity = '1'
  }
  const root = document.getElementById('app') || document.body
  new MutationObserver(mutations => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1 && node.tagName === 'UNI-PAGE') { fadeIn(node); return }
      }
    }
  }).observe(root, { childList: true, subtree: true })
  window.addEventListener('popstate', () => {  // 后退/前进
    const page = document.querySelector('uni-page')
    if (page) fadeIn(page)
  })
}
</script>

<style lang="scss">
page {
  background-color: $theme-bg;
  color: $theme-ink;
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Microsoft JhengHei', 'SimHei', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
}

view, text, scroll-view {
  box-sizing: border-box;
}

</style>
