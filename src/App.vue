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
}
</script>

<style lang="scss">
page {
  background-color: $theme-bg;
  color: $theme-ink;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Serif SC', serif;
}

view, text, scroll-view {
  box-sizing: border-box;
}
</style>
