# 汉服图鉴网站 — v0.app 提示词全集

> 创建日期: 2026-07-05
> 工具: [v0.app](https://v0.app) (Vercel AI UI Generator)
> 框架目标: uni-app + Vue3 → H5 (静态站) + 微信小程序

---

## 目录

1. [修改记录](#修改记录)
2. [页面 1：首页 — 朝代时间轴](#页面-1首页--朝代时间轴)
3. [页面 2：词库浏览页](#页面-2词库浏览页)
4. [页面 3：提示词组合器（核心功能）](#页面-3提示词组合器核心功能)
5. [页面 4：朝代博物馆](#页面-4朝代博物馆)
6. [页面 5：图库页](#页面-5图库页)
7. [通用修改指令](#通用修改指令)

---

## 修改记录

| 日期 | 修改内容 |
|------|----------|
| 2026-07-05 | 初始版本：6 朝代（先秦/汉/唐/宋/明/清） |
| 2026-07-05 | 朝代改为 7 个：先秦/汉/魏晋/隋/唐/宋/明；魏+晋 合并为 魏晋 |

### 朝代合并说明

| 原方案 | 现方案 | 原因 |
|--------|--------|------|
| 魏 | 魏晋 (Wei-Jin) | 魏、晋服饰风格高度相似（褒衣博带、大袖宽衫），AI 出图难以区分，且服装史通常合称"魏晋" |
| 晋 | → 合并 | 小冠+笼冠、纶巾、杂裾垂髾为两朝共同特征，差异主要在贵族制度细节（图片中不可见） |

---

## 页面 1：首页 — 朝代时间轴

### Prompt（最终版）

```
Design a homepage for "Hanfu Reference" — a Chinese traditional clothing & makeup encyclopedia website. 

Style: Chinese classical aesthetic. Background: warm cream/beige parchment tone (#F5F0E8). 
Primary accent: traditional Chinese red (#C41E3A) and ink black (#2C2C2C). 
Typography: elegant serif for headings, clean sans-serif for body. 
Fully responsive (desktop + mobile).

Layout:
1. TOP BAR: Logo "汉服图鉴 | Hanfu Reference" on left. Language toggle (中文/EN) and search bar on right.
2. HERO: A DYNASTY TIMELINE.
   Desktop (>768px): horizontal layout with 7 clickable nodes in a row:
   先秦 (Pre-Qin) — 汉 (Han) — 魏晋 (Wei-Jin) — 隋 (Sui) — 唐 (Tang) — 宋 (Song) — 明 (Ming)
   Mobile (<768px): VERTICAL timeline, nodes stack in a single column, each as a full-width row with dynasty name on left and year range on right.
   Each node shows a small representative garment illustration icon. Selected dynasty glows with red accent. 
   Below the timeline, show a brief 1-sentence description of the selected dynasty.
   Note: 魏晋 combines the Wei and Jin dynasties (220–420 AD) as their clothing styles are similar.
3. MODULE GRID: 2x3 grid of cards, each linking to a main module:
   - 📖 词库浏览 (Lexicon Browser) — icon: book
   - 🔧 提示词组合器 (Prompt Generator) — icon: magic wand
   - 🏛️ 朝代博物馆 (Dynasty Museum) — icon: palace
   - 🖼️ 图库 (Gallery) — icon: image
   - 🎨 传统色彩 (Traditional Colors) — icon: paint palette
   - 📐 纹样库 (Pattern Library) — icon: pattern
   Cards have subtle traditional Chinese pattern (cloud/ruyi motif) as background watermark.
4. FOOTER: Simple copyright, data source credits (National Museum, China Silk Museum etc.), and tech stack note.
```

### 修改历史

#### v1 — 初始版（6 朝代）

朝代节点为：先秦 / 汉 / 唐 / 宋 / 明 / 清

#### v2 — 改为 7 朝代

**追加修改指令：**

```
Update the dynasty timeline in the hero section. 
Replace the current dynasty list with these 7 dynasties in this exact order:

1. 先秦 (Pre-Qin) — before 221 BC
2. 汉 (Han) — 206 BC–220 AD
3. 魏晋 (Wei-Jin) — 220–420 AD
4. 隋 (Sui) — 581–618 AD
5. 唐 (Tang) — 618–907 AD
6. 宋 (Song) — 960–1279 AD
7. 明 (Ming) — 1368–1644 AD

Keep the same layout, colors, and interactive style — just change the 6 nodes to 7 nodes, adjusting spacing so they fit evenly on the timeline.
If 7 nodes don't fit on one line, make the timeline scrollable horizontally on mobile, or reduce node size slightly.
```

---

## 页面 2：词库浏览页

### 色彩库说明

本网站有 **两个色彩库**，分工如下：

| 库 | 用途 | 范围 | 数据来源 |
|---|------|------|---------|
| **传统色彩库** (Traditional Color Library) | 词库浏览中的完整展示，含中国传统色名称/HEX/朝代 | 103 色，14 色系 | `colors.md` |
| **AI可用色彩库** (AI-Friendly Color Library) | **仅用于提示词组合器**，只保留 AI 模型能准确区分的颜色 | 精简版（约 60-80 色） | 基于 `通过词库.md` 的测试结果 |

用户浏览词库时看到**全部传统色**，但在提示词组合器中选择色彩时，只显示**AI 可用色**并标注"AI 推荐色"标识。

### Prompt

```
Design a "Lexicon Browser" page for a Hanfu reference website.

Style: Chinese classical, cream parchment background (#F5F0E8), red accent (#C41E3A), ink text (#2C2C2C).

Layout:
1. TOP SECTION: Breadcrumb "首页 > 词库浏览". Title "词库浏览 | Lexicon Browser". 
   A horizontal category pill menu: 全部 (All) | 气质 (Temperament) | 五官 (Facial) | 服饰 (Clothing) | 发髻 (Hairstyle) | 冠帽 (Headwear) | 妆容 (Makeup) | 配饰 (Accessories) | 色彩 (Colors)
   
   IMPORTANT — Color category behavior:
   When "色彩 (Colors)" pill is selected, show a sub-toggle: [🎨 全部传统色 Full Library] [🤖 AI可用色 AI-Friendly]
   - "全部传统色": shows all traditional Chinese colors (103 colors, 14 families) with hex values and dynasty origin
   - "AI可用色": shows only the subset that AI image models can reliably distinguish, marked with a small "AI ✔" badge
   Below the pills: "性别" toggle (female/male icon toggle, default: female).

2. MAIN CONTENT: 
   Left sidebar (desktop) / top filter bar (mobile):
   - Dynasty filter dropdown: 先秦/汉/魏晋/隋/唐/宋/明
   - Subcategory filter (dynamic based on main category)
   - When "色彩" is selected: color family filter (红色系/蓝色系/绿色系/黄色系/紫色系/粉色系/米色系/棕色系/橙色系/金色系/银色系/灰色系/白色系/黑色系)
   
   Right/content area: Card grid showing terms.
   For color items, cards show:
   - Color name (Chinese), English name
   - Color swatch (filled circle showing the actual hex color)
   - HEX code (e.g. #C41E3A)
   - AI-friendly badge (small "AI ✔" if usable in prompts)
   - Dynasty origin tag
   
   For non-color items, cards show:
   - Chinese term (large, serif), English term (smaller, below)
   - Brief visual description tag (e.g. "交领绕襟" for 曲裾)
   - Small reference image placeholder (rounded, with a subtle border)
   - Click to expand detail panel (slide-in from right)

3. DETAIL PANEL (slide-in, triggered by clicking a card):
   - Large term name 中/EN
   - Full description (2-3 sentences explaining visual characteristics)
   - "关联词" (Related terms) as clickable chips
   - "加入组合器" (Add to Prompt Generator) button in red
   - Image gallery (thumbnails of AI-generated examples)
   - Source/dynasty info
   - For color items: show full traditional color family tree + AI usage note

4. Empty state: "此分类暂无数据，正在补充中..." with an elegant illustration.

Responsive: On mobile (<768px), sidebar becomes a horizontal scrollable filter bar. Cards go 2-column.
```

---

## 页面 3：提示词组合器（核心功能）

### Prompt

```
Design an interactive "Prompt Generator" tool for a Hanfu reference website. 
This is the CORE feature — users select options step by step, and the system generates an AI image prompt.

Style: Chinese classical aesthetic. Background: cream (#F5F0E8). Red accent (#C41E3A). Gold accent (#D4A84B).

Layout:
1. HEADER: "提示词组合器 | Prompt Generator" subtitle "选择维度 → 自动生成优化提示词"

2. MAIN AREA: Two-column layout (desktop) or stacked (mobile).

   LEFT COLUMN (Selection Panel) — vertical step flow:
   
   Step 1 — 性别 (Gender): Two large toggle buttons [👩 女性 Female] [👨 男性 Male]
   
   Step 2 — 气质 (Temperament): Horizontal scrollable chips. e.g. 温婉/清冷/英气/妖冶/儒雅/侠气/帝王/仙气. Multi-select, max 2.
   
   Step 3 — 五官 (Facial Features): Dropdown groups:
     - 眼型: 凤眼, 桃花眼, 狐狸眼, 丹凤眼
     - 眉型: 剑眉, 远山眉, 柳叶眉, 一字眉
     - 脸型: 鹅蛋脸, 瓜子脸, 国字脸, 圆脸
     Each is a clickable chip.
   
   Step 4 — 朝代 (Dynasty): Row of dynasty buttons (先秦/汉/魏晋/隋/唐/宋/明). Selecting a dynasty filters available clothing/hairstyle options in next steps.
   
   Step 5 — 服饰 (Clothing): Dropdown with dynasty-filtered options. Sub-select: 面料 (fabric), 色彩 (color), 花纹 (pattern) as chips.
   
   Step 6 — 发髻/冠帽 (Hairstyle/Headwear): Chips filtered by dynasty + gender.
   
   Step 7 — 妆容 (Makeup): Chips filtered by dynasty (only shown for female).
   
   Step 8 — 配饰 (Accessories): Multi-select chips (云肩/披帛/步摇/团扇/宫绦/禁步).
   
   Each step has a [清空] clear button. Current selections are highlighted with red border.

   RIGHT COLUMN (Result Panel):
   
   Top: Live preview of selected options as tags (removable on click).
   
   Middle: Generated prompt text box (read-only, monospace font). Example output:
   "1位气质温婉清冷的唐代女子，凤眼远山眉，身着齐胸襦裙，披帛，梳倭堕髻，画远山黛..."
   
   Below text box: Copy button [📋 复制] + [🖼️ 生成图片] button (calls API, shows loading spinner).
   
   Bottom: "提示词优化建议" tooltip box showing automatic filter-avoidance rules applied (e.g. "已将'丰满'替换为'超丰满'").

3. Save/Load: [💾 保存组合] button saves current selection as a preset. List of saved presets below.

Responsive: On mobile, stack vertically. Step numbers become a progress indicator at top. One step visible at a time with [下一步] [上一步] navigation.
```

---

## 页面 4：朝代博物馆

### Prompt

```
Design a "Dynasty Museum" page for a Hanfu reference website.

Style: Chinese classical, immersive. Darker background (#2C1810) like a museum exhibition hall, with warm spotlight gold (#D4A84B) and cream text (#F5F0E8).

Layout:
1. HEADER: "🏛️ 朝代博物馆 | Dynasty Museum" with subtitle "穿越千年，一览华夏衣冠"
   Museum exhibition style decoration at top.

2. MAIN CONTENT: Vertical scrollable timeline sections, one per dynasty.
   Each dynasty section is a full-width card with:
   
   - LEFT side: Dynasty name in large calligraphic Chinese (e.g. "唐"), with years (618-907) and English name.
   
   - CENTER: Featured image area — a large AI-generated representative figure (male + female side by side) wearing the dynasty's typical clothing. Medium size, with a subtle frame/border.
   
   - RIGHT: Key characteristics as bullet points:
     - 典型服饰: key garments
     - 流行发髻: popular hairstyles
     - 妆容特点: makeup features
     - 代表色: representative colors (shown as small color dots)
   
   Click on the section to expand full details:
   - Full clothing list with small reference images
   - Hairstyle gallery (2-row grid of cards)
   - Makeup reconstruction images
   - Historical artifact images (from museums)
   - "查看所有图库 →" link to gallery filtered by this dynasty

3. NAVIGATION: Fixed right-side quick-jump dots (one per dynasty) that highlight on scroll.

4. COMPARE MODE: Top-right [⚖️ 对比] button opens a split-view comparing two selected dynasties.

Responsive: On mobile, each dynasty section collapses to a simple accordion card. Images stack vertically. Quick-jump nav moves to bottom.
```

---

## 页面 5：图库页

### Prompt

```
Design a "Gallery" page for a Hanfu reference website.

Style: Clean gallery layout. Background: white (#FAFAFA). Subtle traditional Chinese decorative elements.

Layout:
1. HEADER: "🖼️ 图库 | Gallery" with filter bar below:
   - Dynasty dropdown: 全部/先秦/汉/魏晋/隋/唐/宋/明
   - Category dropdown: 全部/服饰/发髻/妆容/配饰/全身像
   - Gender toggle: 全部/女/男
   - Sort: 最新/最旧/按朝代
   - View toggle: [Grid ▦] [Masonry ▣] (grid/masonry toggle)

2. MAIN CONTENT: Image grid (desktop 4-col, tablet 3-col, mobile 2-col).
   Each image card:
   - Thumbnail with aspect ratio 3:4 (portrait)
   - On hover (desktop) or tap (mobile): overlay showing:
     - Generated prompt used (truncated, 2 lines)
     - Dynasty badge (e.g. "唐")
     - Category badge
   - Lightbox on click: full image + full prompt text + parameters used (model, size, date)

3. LIGHTBOX (full-screen overlay):
   - Large image (centered, max 90vw/90vh)
   - Left/right arrows for navigation
   - Below: full prompt text (copyable)
   - Metadata: model, size, date generated
   - "重新生成" (Regenerate) button
   - "加入词库" (Add to Lexicon) button

4. STATE: Empty state when filter returns no results: "暂无匹配图片" with a brush illustration.

Responsive: Masonry layout on all devices. Filter bar collapses into a bottom sheet on mobile.
```

---

## 通用修改指令

以下指令可在任意页面生成后追加使用，无需重复整个 prompt：

### 配色调整

```
Change the color scheme to:
- Background: warm cream/beige (#F5F0E8)
- Primary/Accent: traditional Chinese red (#C41E3A)  
- Secondary: gold (#D4A84B)
- Text: ink black (#2C2C2C)
- On dark sections: background (#2C1810), text (#F5F0E8), accent gold (#D4A84B)
```

### 朝代列表（统一修改）

如需全局更新朝代列表，追加：

```
Update all dynasty-related dropdowns, filters, and references to use this exact list:
先秦, 汉, 魏晋, 隋, 唐, 宋, 明
Note: 魏晋 (220–420 AD) combines Wei and Jin.
```

### 移动端适配

```
Make this page fully responsive:
- Desktop (>1024px): full multi-column layout as designed
- Tablet (768-1024px): 2-column grid, collapsible sidebar
- Mobile (<768px): single column, bottom sheet for filters, 
  horizontal scroll for categories, stacked layout
```

### 通用迭代用语

| 你想改什么 | 在 v0.app 里输入 |
|-----------|----------------|
| 改配色 | `"Change the primary color to Chinese red #C41E3A and background to cream #F5F0E8"` |
| 改布局 | `"Make the card grid 4 columns on desktop, 2 on tablet, 1 on mobile"` |
| 微调间距 | `"Add more padding between sections, increase card border radius to 12px"` |
| 加效果 | `"Add a subtle hover scale effect on cards"` |
| 改字体 | `"Use a serif font for Chinese headings, like 'Noto Serif SC'"` |
| 不满意重来 | `"Redesign this section, keep the same content but try a different layout"` |

---

> 所有页面在 v0.app 上完成设计后，截图保存作为 uni-app 实现的视觉参考。
