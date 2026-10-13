export interface TemplateThemeConfig {
  heroImage: string
  banquetImage: string
  galleryImages: { url: string; caption: string }[]
  particleType: 'petals' | 'gold-sparkles' | 'stars' | 'hearts' | 'bokeh'
  musicTitle: string
  accentColor: string
  bgPattern?: string
}

export const TEMPLATE_THEMES: Record<string, TemplateThemeConfig> = {
  'palace-romance': {
    heroImage: '/templates/palace-terrace.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/palace-terrace.jpg', caption: 'Baxtli lahzalarimiz' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Kutilayotgan oqshom' },
      { url: '/templates/royal-gold.jpg', caption: 'Hashamatli qasr' },
    ],
    particleType: 'gold-sparkles',
    musicTitle: 'Saroy muhabbati sadosi',
    accentColor: '#d4af37',
  },
  'bekzod-munisa': {
    heroImage: '/templates/palace-terrace.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/palace-terrace.jpg', caption: 'Baxtli lahzalarimiz' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Kutilayotgan oqshom' },
      { url: '/templates/royal-gold.jpg', caption: 'Hashamatli qasr' },
    ],
    particleType: 'gold-sparkles',
    musicTitle: 'Saroy muhabbati sadosi',
    accentColor: '#d4af37',
  },
  'royal-gold': {
    heroImage: '/templates/royal-gold.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/royal-gold.jpg', caption: 'Zarhal hashamat' },
      { url: '/templates/palace-terrace.jpg', caption: 'Oqshom shukuhi' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Qirollik ziyofati' },
    ],
    particleType: 'gold-sparkles',
    musicTitle: 'Qirollik oltin valsi',
    accentColor: '#c5a059',
  },
  'black-tie': {
    heroImage: '/templates/black-tie.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/black-tie.jpg', caption: 'VIP Evening Gala' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Kristal qadahlar' },
      { url: '/templates/palace-terrace.jpg', caption: 'Kecha sadosi' },
    ],
    particleType: 'gold-sparkles',
    musicTitle: 'VIP Oqshom Simfoniyasi',
    accentColor: '#e5c17d',
  },
  'uzbek-heritage': {
    heroImage: '/templates/uzbek-heritage.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/uzbek-heritage.jpg', caption: 'Sharqona nafislik' },
      { url: '/templates/royal-gold.jpg', caption: 'Islimiy naqshlar' },
      { url: '/templates/palace-terrace.jpg', caption: 'To‘yona oqshom' },
    ],
    particleType: 'gold-sparkles',
    musicTitle: 'Milliy to‘y taronalari',
    accentColor: '#0e7c86',
  },
  'rose-garden': {
    heroImage: '/templates/rose-garden.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/rose-garden.jpg', caption: 'Atirgullar ifori' },
      { url: '/templates/palace-terrace.jpg', caption: 'Romantik bog‘' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Muhabbat ziyofati' },
    ],
    particleType: 'petals',
    musicTitle: 'Atirgullar valsi',
    accentColor: '#f43f5e',
  },
  'oriental-palace': {
    heroImage: '/templates/palace-terrace.jpg',
    banquetImage: '/templates/uzbek-heritage.jpg',
    galleryImages: [
      { url: '/templates/palace-terrace.jpg', caption: 'Sharq gavhari' },
      { url: '/templates/uzbek-heritage.jpg', caption: 'Moviy gumbazlar' },
      { url: '/templates/royal-gold.jpg', caption: 'Oltin peshtoq' },
    ],
    particleType: 'gold-sparkles',
    musicTitle: 'Sharq saroyi sadosi',
    accentColor: '#e2b866',
  },
  'suzani-romance': {
    heroImage: '/templates/uzbek-heritage.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/uzbek-heritage.jpg', caption: 'So‘zana jilosi' },
      { url: '/templates/rose-garden.jpg', caption: 'Muhabbat gullari' },
      { url: '/templates/royal-gold.jpg', caption: 'Tantanali kun' },
    ],
    particleType: 'petals',
    musicTitle: 'Ipak yo‘li ohangi',
    accentColor: '#d97706',
  },
  'silk-road': {
    heroImage: '/templates/uzbek-heritage.jpg',
    banquetImage: '/templates/palace-terrace.jpg',
    galleryImages: [
      { url: '/templates/uzbek-heritage.jpg', caption: 'Ipak yo‘li nafasi' },
      { url: '/templates/palace-terrace.jpg', caption: 'Qadimiy qasr' },
      { url: '/templates/royal-gold.jpg', caption: 'Zarhal naqsh' },
    ],
    particleType: 'gold-sparkles',
    musicTitle: 'Buyuk Ipak Yo‘li',
    accentColor: '#d97706',
  },
  'pearl-elegance': {
    heroImage: '/templates/royal-gold.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/royal-gold.jpg', caption: 'Marvarid jilosi' },
      { url: '/templates/palace-terrace.jpg', caption: 'Oppoq libos' },
      { url: '/templates/rose-garden.jpg', caption: 'Nafis gultoj' },
    ],
    particleType: 'bokeh',
    musicTitle: 'Oq durlar valsi',
    accentColor: '#c5a880',
  },
  'burgundy-royale': {
    heroImage: '/templates/royal-gold.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/black-tie.jpg', caption: 'Bordo hashamati' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Shamlar shu’lasi' },
      { url: '/templates/rose-garden.jpg', caption: 'To‘q qizil atirgullar' },
    ],
    particleType: 'gold-sparkles',
    musicTitle: 'Burgundy Qirollik sadosi',
    accentColor: '#c5a059',
  },
  'botanical-love': {
    heroImage: '/templates/rose-garden.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/rose-garden.jpg', caption: 'Zangori bog‘' },
      { url: '/templates/palace-terrace.jpg', caption: 'Tabiat quchog‘i' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Yashil nafislik' },
    ],
    particleType: 'petals',
    musicTitle: 'Tabiat nafasi',
    accentColor: '#059669',
  },
  'pastel-dream': {
    heroImage: '/templates/rose-garden.jpg',
    banquetImage: '/templates/palace-terrace.jpg',
    galleryImages: [
      { url: '/templates/rose-garden.jpg', caption: 'Pushti orzular' },
      { url: '/templates/palace-terrace.jpg', caption: 'Moviy osmon' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Yumshoq quyosh nuri' },
    ],
    particleType: 'petals',
    musicTitle: 'Shirin orzular',
    accentColor: '#ec4899',
  },
  'watercolorRomance': {
    heroImage: '/templates/rose-garden.jpg',
    banquetImage: '/templates/palace-terrace.jpg',
    galleryImages: [
      { url: '/templates/rose-garden.jpg', caption: 'Akvarel nafasi' },
      { url: '/templates/palace-terrace.jpg', caption: 'Rangin tuyg‘ular' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Nozik chizgilar' },
    ],
    particleType: 'petals',
    musicTitle: 'Akvarel ohangi',
    accentColor: '#f43f5e',
  },
  'night-sky': {
    heroImage: '/templates/black-tie.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/black-tie.jpg', caption: 'Yulduzli tun' },
      { url: '/templates/palace-terrace.jpg', caption: 'Tungi shamlar' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Samo shu’lasi' },
    ],
    particleType: 'stars',
    musicTitle: 'Yulduzli tun taronasi',
    accentColor: '#60a5fa',
  },
  'cinematic-love': {
    heroImage: '/templates/black-tie.jpg',
    banquetImage: '/templates/palace-terrace.jpg',
    galleryImages: [
      { url: '/templates/black-tie.jpg', caption: 'Kinematik kadr' },
      { url: '/templates/palace-terrace.jpg', caption: 'Quyosh botishi' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Abadiy muhabbat' },
    ],
    particleType: 'gold-sparkles',
    musicTitle: 'Kinematik Love Story',
    accentColor: '#f59e0b',
  },
  'glass-elegance': {
    heroImage: '/templates/palace-terrace.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/palace-terrace.jpg', caption: 'Billur qasr' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Shisha qadahlar' },
      { url: '/templates/royal-gold.jpg', caption: 'Nur jilosi' },
    ],
    particleType: 'bokeh',
    musicTitle: 'Billur simfoniya',
    accentColor: '#38bdf8',
  },
  'floral-frame': {
    heroImage: '/templates/rose-garden.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/rose-garden.jpg', caption: 'Gullagan arka' },
      { url: '/templates/palace-terrace.jpg', caption: 'Bahor tarovati' },
      { url: '/templates/wedding-banquet.jpg', caption: 'To‘y dasturxoni' },
    ],
    particleType: 'petals',
    musicTitle: 'Bahor valsi',
    accentColor: '#fb7185',
  },
  'minimal-white': {
    heroImage: '/templates/palace-terrace.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/palace-terrace.jpg', caption: 'Oq nafislik' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Zamonaviy uslub' },
      { url: '/templates/royal-gold.jpg', caption: 'Sokin baxt' },
    ],
    particleType: 'bokeh',
    musicTitle: 'Sokin oqshom',
    accentColor: '#78716c',
  },
  'editorial-magazine': {
    heroImage: '/templates/black-tie.jpg',
    banquetImage: '/templates/palace-terrace.jpg',
    galleryImages: [
      { url: '/templates/black-tie.jpg', caption: 'Vogue Editorial' },
      { url: '/templates/palace-terrace.jpg', caption: 'High Fashion' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Estetika' },
    ],
    particleType: 'gold-sparkles',
    musicTitle: 'Modern Chic',
    accentColor: '#1c1917',
  },
  'modern-beige': {
    heroImage: '/templates/royal-gold.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/royal-gold.jpg', caption: 'Issiq bej' },
      { url: '/templates/palace-terrace.jpg', caption: 'Iliq quyosh' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Qulay muhit' },
    ],
    particleType: 'bokeh',
    musicTitle: 'Iliq xotiralar',
    accentColor: '#a89f91',
  },
  'monochrome': {
    heroImage: '/templates/black-tie.jpg',
    banquetImage: '/templates/wedding-banquet.jpg',
    galleryImages: [
      { url: '/templates/black-tie.jpg', caption: 'Klassik oq-qora' },
      { url: '/templates/palace-terrace.jpg', caption: 'Hissiyotlar' },
      { url: '/templates/wedding-banquet.jpg', caption: 'Abadiy lahza' },
    ],
    particleType: 'stars',
    musicTitle: 'Klassik pianino',
    accentColor: '#262626',
  },
}

export function getTemplateTheme(templateId: string): TemplateThemeConfig {
  return TEMPLATE_THEMES[templateId] || TEMPLATE_THEMES['palace-romance']
}
