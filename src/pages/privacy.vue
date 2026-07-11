<template>
  <view class="page-layout">
    <TopNav current="" />
    <view class="content">
      <view class="page-header">
        <text class="page-title">隐私政策</text>
      </view>
      <view class="page-divider"></view>

      <view class="section">
        <text class="section-title">引言</text>
        <text class="section-text">汉服图鉴（以下简称"本网站"）重视您的隐私。本隐私政策说明了本网站如何收集、使用、存储和保护您的个人信息。使用本网站即表示您同意本隐私政策的条款。</text>
      </view>

      <view class="section">
        <text class="section-title">一、信息收集</text>
        <text class="sub-title">1.1 浏览器自动收集的信息</text>
        <text class="section-text">当您访问本网站时，您的浏览器可能会自动发送以下信息：IP 地址、浏览器类型和版本、操作系统信息、访问时间、浏览的页面、来源网址等。这些信息仅用于网站运行分析、性能优化和安全性维护，不会用于识别特定个人。</text>
        <text class="sub-title">1.2 本地存储信息</text>
        <text class="section-text">本网站使用浏览器本地存储（localStorage）技术来保存您的收藏数据（包括收藏的图片、色彩、提示词、词条、配色卡等）。这些数据完全存储在您的本地设备中，不会自动上传至任何服务器。</text>
        <text class="sub-title">1.3 用户主动提交的信息</text>
        <text class="section-text">本网站不要求用户注册账号，不收集用户的姓名、邮箱、电话等个人身份信息。如果您通过联系邮箱发送侵权通知或咨询，我们仅会使用您提供的联系方式进行回复，不会用于其他目的。</text>
      </view>

      <view class="section">
        <text class="section-title">二、信息使用</text>
        <text class="section-text">本网站收集的信息仅用于以下目的：</text>
        <text class="section-text">— 优化网站内容和用户体验</text>
        <text class="section-text">— 分析网站访问流量和使用趋势</text>
        <text class="section-text">— 检测和防范安全威胁</text>
        <text class="section-text">— 回复您的咨询和处理侵权通知</text>
        <text class="section-text">本网站不会将您的信息出售、出租或分享给第三方，除非法律要求或获得您的明确同意。</text>
      </view>

      <view class="section">
        <text class="section-title">三、Cookie 使用</text>
        <text class="section-text">本网站可能会使用必要的 Cookie 技术来确保网站正常运行。我们不使用追踪型 Cookie 或第三方广告 Cookie。您可以通过浏览器设置管理或禁用 Cookie，但可能会影响部分功能的使用。</text>
      </view>

      <view class="section">
        <text class="section-title">四、第三方服务</text>
        <text class="section-text">本网站可能会引用第三方服务的内容或接口，包括但不限于：</text>
        <text class="section-text">— AI 图像生成服务（用于生成图库图片）</text>
        <text class="section-text">— CDN 内容分发网络（用于加速静态资源加载）</text>
        <text class="section-text">这些第三方服务可能有各自的隐私政策，本网站不对其数据处理行为承担责任。建议您查阅相关第三方的隐私政策。</text>
      </view>

      <view class="section">
        <text class="section-title">五、数据安全</text>
        <text class="section-text">本网站采取合理的技术措施保护您的信息安全。但请注意，互联网传输和电子存储无法保证 100% 安全。本网站不存储用户的个人身份信息，收藏数据仅保存在您的本地浏览器中，因此不存在服务器端数据泄露的风险。</text>
      </view>

      <view class="section">
        <text class="section-title">六、未成年人保护</text>
        <text class="section-text">本网站的内容适合所有年龄段的用户浏览。我们不会故意收集未成年人的个人信息。如果监护人有理由相信未成年人未经同意提供了个人信息，请联系我们进行处理。</text>
      </view>

      <view class="section">
        <text class="section-title">七、您的权利</text>
        <text class="section-text">您有权：</text>
        <text class="section-text">— 了解本网站收集了哪些信息</text>
        <text class="section-text">— 通过浏览器设置清除本地存储的收藏数据</text>
        <text class="section-text">— 通过联系邮箱要求删除您提交的任何信息</text>
        <text class="section-text">— 随时停止使用本网站</text>
      </view>

      <view class="section">
        <text class="section-title">八、隐私政策更新</text>
        <text class="section-text">本网站保留随时更新本隐私政策的权利。重大变更时，我们会通过网站公告的方式通知用户。建议用户定期查看本页面以了解最新政策。</text>
        <text class="section-text">最近更新日期：2026 年 7 月</text>
      </view>

      <view class="section">
        <text class="section-title">九、联系方式</text>
        <text class="section-text">如对本隐私政策有任何疑问或关切，请联系：privacy@aihanfu.zhangxiaocai.cn</text>
      </view>
    </view>
    <Footer />
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import TopNav from '../components/TopNav.vue'
import Footer from '../components/Footer.vue'

onLoad(() => {
  document.title = '隐私政策 | 汉服图鉴'
  let d = document.querySelector('meta[name="description"]')
  if (!d) { d = document.createElement('meta'); d.name = 'description'; document.head.appendChild(d) }
  d.content = '汉服图鉴隐私政策——了解我们如何收集、使用和保护您的个人信息。'
  let k = document.querySelector('meta[name="keywords"]')
  if (!k) { k = document.createElement('meta'); k.name = 'keywords'; document.head.appendChild(k) }
  k.content = '汉服图鉴,隐私政策,个人信息,数据安全'
})
</script>

<style lang="scss" scoped>
.page-layout { min-height: 100vh; background: $theme-bg; }
.content { padding: clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px); max-width: 800px; margin: 0 auto; }
.page-header { margin-bottom: 16px; }
.page-title { font-size: $font-size-page-title; font-weight: $font-weight-bold; color: $theme-ink; }
.page-divider { width: 60px; height: 3px; background: $theme-red; margin-bottom: 28px; border-radius: 2px; }
.section { margin-bottom: 32px; }
.section-title { font-size: 18px; font-weight: $font-weight-bold; color: $theme-ink; display: block; margin-bottom: 12px; border-left: 3px solid $theme-red; padding-left: 12px; }
.sub-title { font-size: 15px; font-weight: $font-weight-semibold; color: $theme-ink; display: block; margin-top: 16px; margin-bottom: 8px; }
.section-text { font-size: $font-size-body; color: $theme-text-body; line-height: 1.8; display: block; margin-bottom: 8px; text-align: justify; }
@media (max-width: 768px) {
  .page-layout { overflow-x: hidden; }
  .content { padding: 16px 12px; }
  .section-title { font-size: 16px; }
  .sub-title { font-size: 14px; }
  .section-text { font-size: 13px; line-height: 1.7; }
}
</style>
