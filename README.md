# 汉服图鉴 · Hanfu Reference

AI 时代的汉服知识参考与提示词工具。

## 功能

- **词库** — 12 大类 440+ 汉服词条，含形制、纹样、色彩、面料、配饰、妆容、发髻、鞋履等，中英双语，支持按朝代/性别/子类筛选
- **提示词组合器** — 可视化构建 AI 生图提示词，支持六步公式结构化输出中英文双版，适配 Agnes AI / Midjourney / SD 平台
- **朝代博物馆** — 历代服饰演变纵览
- **灵感图库** — 唐/宋 60 组 AI 生成汉服样片，含完整提示词与搭配分析
- **传统色彩** — 103 种中国传统色卡

## 技术栈

- **框架**: uni-app (Vue 3 + Vite)
- **构建工具**: Vite 5
- **CSS 预处理器**: Sass (SCSS)
- **部署**: Vercel

## 本地开发

```bash
npm install
npm run dev:h5       # 启动开发服务器（热更新）
npm run build:h5     # 构建产物到 dist/build/h5
```

## 部署

```bash
# 构建
npm run build:h5

# 部署到 Vercel
npx vercel deploy dist/build/h5 --prod --scope <team>
```

### 自定义域名

在 Vercel 控制台 → Project → Settings → Domains 中添加 `aihanfu.zhangxiaocai.cn`，并按提示配置 DNS CNAME 记录指向 `cname.vercel-dns.com`。

## 项目结构

```
src/
├── components/     # 通用组件（TopNav、Footer、Button）
├── data/           # 数据文件（词库、图库、提示词补充）
├── pages/          # 页面（扁平化）
│   ├── home.vue    # 首页
│   ├── lexicon.vue # 词库
│   ├── prompter.vue# 提示词组合器
│   ├── dynasty.vue # 朝代博物馆
│   ├── gallery.vue # 灵感图库
│   ├── detail.vue  # 图片详情
│   └── color.vue   # 传统色彩
├── static/         # 静态资源
│   ├── dynasty/    # 朝代图标
│   └── gallery/    # 图库图片
├── uni.scss        # 全局主题变量
└── pages.json      # 路由配置
```

## 数据来源

- 汉服词库数据基于传统服饰学分类体系整理
- 提示词补充词库基于 Navos AI 六步公式
- 图库图片由 Agnes AI (agnes-image-2.1-flash) 生成

## License

仅供学习参考。
