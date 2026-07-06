export default {
  app: { name: '汉服图鉴', subtitle: '千年衣冠 · 华夏之美' },
  nav: { home: '首页', lexicon: '词库', prompter: '组合器', dynasty: '朝代', gallery: '图库' },
  home: {
    title: '汉服 · 华夏衣冠',
    subtitle: '从先秦到明末，一览千年服章之美',
    dynasties: {
      pre_qin: '先秦',
      han: '汉',
      wei_jin: '魏晋',
      sui: '隋',
      tang: '唐',
      song: '宋',
      ming: '明'
    },
    start: '开始探索',
    features: {
      lexicon: '词库浏览',
      lexicon_desc: '200+ 汉服专业词汇，含释义与配图',
      prompter: '提示词组合器',
      prompter_desc: '自由组合服饰元素，一键生成 AI 绘图提示词',
      dynasty: '朝代博物馆',
      dynasty_desc: '纵览历代服饰演变，感受时代风华',
      gallery: '灵感图库',
      gallery_desc: '精选 AI 生成汉服作品，启发创作灵感'
    }
  },
  lexicon: {
    title: '汉服词库',
    categories: {
      temperament: '气质神态',
      face: '面部特征',
      male_clothing: '男装',
      female_clothing: '女装',
      accessories: '配饰',
      makeup: '妆容发型',
      color: '传统色彩'
    },
    search: '搜索词条...',
    color_full: '全色库',
    color_ai: 'AI 友好色'
  },
  prompter: {
    title: '提示词组合器',
    select_tags: '选择标签组合',
    gender: { female: '女性', male: '男性' },
    generate: '生成提示词',
    copy: '复制',
    copied: '已复制',
    reset: '重置',
    preview: '提示词预览',
    category_placeholder: '点击上方标签开始组合'
  },
  dynasty: {
    title: '朝代博物馆',
    dynasties: {
      pre_qin: { name: '先秦', period: '远古 - 公元前221年', desc: '汉服起源，深衣制初成' },
      han: { name: '汉', period: '公元前202年 - 公元220年', desc: '曲裾直裾，奠定汉服体系' },
      wei_jin: { name: '魏晋', period: '公元220年 - 589年', desc: '褒衣博带，飘逸出尘' },
      sui: { name: '隋', period: '公元581年 - 618年', desc: '承前启后，官服制度确立' },
      tang: { name: '唐', period: '公元618年 - 907年', desc: '雍容华贵，开放多元' },
      song: { name: '宋', period: '公元960年 - 1279年', desc: '清雅内敛，理学影响深远' },
      ming: { name: '明', period: '公元1368年 - 1644年', desc: '恢复汉制，马面裙盛行' }
    },
    features: '服饰特征',
    makeup: '妆容发型',
    garments: '典型服饰'
  },
  gallery: {
    title: '灵感图库',
    filter: '筛选',
    all: '全部',
    no_images: '暂无图片，去组合器生成吧'
  },
  common: { loading: '加载中...', error: '出错了', retry: '重试' }
}
