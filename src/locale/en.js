export default {
  app: { name: 'Hanfu Reference', subtitle: 'Millennium Attire · Beauty of Huaxia' },
  nav: { home: 'Home', lexicon: 'Lexicon', prompter: 'Prompter', dynasty: 'Dynasty', gallery: 'Gallery' },
  home: {
    title: 'Hanfu · Chinese Attire',
    subtitle: 'From Pre-Qin to Ming, explore the beauty of millennia of clothing',
    dynasties: {
      pre_qin: 'Pre-Qin',
      han: 'Han',
      wei_jin: 'Wei-Jin',
      sui: 'Sui',
      tang: 'Tang',
      song: 'Song',
      ming: 'Ming'
    },
    start: 'Start Exploring',
    features: {
      lexicon: 'Lexicon',
      lexicon_desc: '200+ Hanfu terms with meanings and images',
      prompter: 'Prompt Generator',
      prompter_desc: 'Mix clothing elements, generate AI prompts in one click',
      dynasty: 'Dynasty Museum',
      dynasty_desc: 'Browse clothing evolution across dynasties',
      gallery: 'Inspiration Gallery',
      gallery_desc: 'Curated AI-generated Hanfu artworks'
    }
  },
  lexicon: {
    title: 'Hanfu Lexicon',
    categories: {
      temperament: 'Temperament',
      face: 'Facial Features',
      male_clothing: 'Male Attire',
      female_clothing: 'Female Attire',
      accessories: 'Accessories',
      makeup: 'Makeup & Hair',
      color: 'Colors'
    },
    search: 'Search terms...',
    color_full: 'Full Palette',
    color_ai: 'AI-Friendly'
  },
  prompter: {
    title: 'Prompt Generator',
    select_tags: 'Select Tags',
    gender: { female: 'Female', male: 'Male' },
    generate: 'Generate Prompt',
    copy: 'Copy',
    copied: 'Copied',
    reset: 'Reset',
    preview: 'Prompt Preview',
    category_placeholder: 'Click tags above to start building'
  },
  dynasty: {
    title: 'Dynasty Museum',
    dynasties: {
      pre_qin: { name: 'Pre-Qin', period: 'Ancient - 221 BC', desc: 'Origins of Hanfu, Shenyi garment system' },
      han: { name: 'Han', period: '202 BC - 220 AD', desc: 'Quju and Zhiju, Hanfu system established' },
      wei_jin: { name: 'Wei-Jin', period: '220 - 589 AD', desc: 'Loose robes, ethereal elegance' },
      sui: { name: 'Sui', period: '581 - 618 AD', desc: 'Bridging eras, official attire codified' },
      tang: { name: 'Tang', period: '618 - 907 AD', desc: 'Opulent and cosmopolitan' },
      song: { name: 'Song', period: '960 - 1279 AD', desc: 'Refined and restrained, Neo-Confucian influence' },
      ming: { name: 'Ming', period: '1368 - 1644 AD', desc: 'Han revival, horse-face skirt popular' }
    },
    features: 'Features',
    makeup: 'Makeup & Hair',
    garments: 'Typical Garments'
  },
  gallery: {
    title: 'Inspiration Gallery',
    filter: 'Filter',
    all: 'All',
    no_images: 'No images yet. Try the Prompter!'
  },
  common: { loading: 'Loading...', error: 'Something went wrong', retry: 'Retry' }
}
