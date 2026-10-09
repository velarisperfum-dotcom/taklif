export interface TemplateData {
  id: string
  name: string
  category: string
  description: string
  previewImage: string
  priceTier: 'FREE' | 'PREMIUM'
  active?: boolean
}

export const DEFAULT_TEMPLATES: TemplateData[] = [
  // Flagship User-Provided Design #1
  {
    id: 'palace-romance',
    name: 'Palace Romance (Bekzod & Munisa)',
    category: 'Premium',
    description: 'Ko‘l manzarali saroy balkoni, zarhal gultoj arkasi, interaktiv konvert va oqlangan kalligrafiya.',
    previewImage: '/templates/palace-terrace.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },
  // Luxury Collection
  {
    id: 'royal-gold',
    name: 'Royal Gold',
    category: 'Premium',
    description: 'Ivory fon, nafis zarhal hoshiyalar, sharqona noziklik va qirollik hashamati.',
    previewImage: '/templates/royal-gold.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },
  {
    id: 'black-tie',
    name: 'Black Tie',
    category: 'Premium',
    description: 'Chuqur qora fon, shampan-oltin yozuvlar va kinematik hashamat muhiti.',
    previewImage: '/templates/black-tie.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },
  {
    id: 'pearl-elegance',
    name: 'Pearl Elegance',
    category: 'Klassik',
    description: 'Marvarid-oq kompozitsiya, o‘ta nozik chiziqlar va aristokratik serif shrift.',
    previewImage: '/previews/pearl-elegance.jpg',
    priceTier: 'FREE',
    active: true,
  },
  {
    id: 'burgundy-royale',
    name: 'Burgundy Royale',
    category: 'Premium',
    description: 'To‘q bordo qirmizi rang, sarg‘ish-qaymoqrang matn va saroy tantanasi.',
    previewImage: '/previews/burgundy-royale.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },

  // Uzbek National Collection
  {
    id: 'uzbek-heritage',
    name: 'Uzbek Heritage',
    category: 'Milliy',
    description: 'An’anaviy sharqona islimiy naqshlar, xonatlas va ganchkorlik uslubidagi bezaklar.',
    previewImage: '/templates/uzbek-heritage.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },
  {
    id: 'suzani-romance',
    name: 'Suzani Romance',
    category: 'Milliy',
    description: 'Boy So‘zana kashtasi motivlari, anor ramzlari va qizg‘in milliy muhabbat.',
    previewImage: '/previews/suzani-romance.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },
  {
    id: 'oriental-palace',
    name: 'Oriental Palace',
    category: 'Milliy',
    description: 'Qadimiy Samarqand va Buxoro gumbaz arkalari, feruza va oltin uyg‘unligi.',
    previewImage: '/templates/uzbek-heritage.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },
  {
    id: 'silk-road',
    name: 'Silk Road',
    category: 'Milliy',
    description: 'Buyuk Ipak yo‘li afsonasi, iliq tuproq va zarrin qum ohanglaridagi joziba.',
    previewImage: '/previews/silk-road.jpg',
    priceTier: 'FREE',
    active: true,
  },

  // Modern Collection
  {
    id: 'minimal-white',
    name: 'Minimal White',
    category: 'Minimalistik',
    description: 'Sof oq fazo, lakonik arxitektura va faqat eng muhim mazmunga urg‘u.',
    previewImage: '/previews/minimal-white.jpg',
    priceTier: 'FREE',
    active: true,
  },
  {
    id: 'editorial-magazine',
    name: 'Editorial Magazine',
    category: 'Zamonaviy',
    description: 'Yuqori moda jurnallari uslubidagi dadil kompozitsiya va zamonaviy tipografika.',
    previewImage: '/previews/editorial-magazine.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },
  {
    id: 'modern-beige',
    name: 'Modern Beige',
    category: 'Zamonaviy',
    description: 'Iliq bej rang, qahva tuslari, erkin asimmetriya va xotirjamlik.',
    previewImage: '/previews/modern-beige.jpg',
    priceTier: 'FREE',
    active: true,
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    category: 'Minimalistik',
    description: 'Qat’iy oq va qora uyg‘unligi, toza geometriya va abadiy uslub.',
    previewImage: '/previews/monochrome.jpg',
    priceTier: 'FREE',
    active: true,
  },

  // Romantic Collection
  {
    id: 'rose-garden',
    name: 'Rose Garden',
    category: 'Romantik',
    description: 'Nozik atirgul gultojibarglari, muloyim pushti tonlar va samimiy tuyg‘ular.',
    previewImage: '/templates/rose-garden.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },
  {
    id: 'botanical-love',
    name: 'Botanical Love',
    category: 'Romantik',
    description: 'Yashil evkalipt, zaytun novdalari va tabiat bilan hamohang musaffolik.',
    previewImage: '/previews/botanical-love.jpg',
    priceTier: 'FREE',
    active: true,
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    category: 'Romantik',
    description: 'Shaftoli va lavanda pastel jilolari, orombaxsh romantika va mayinlik.',
    previewImage: '/previews/pastel-dream.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },
  {
    id: 'watercolor-romance',
    name: 'Watercolor Romance',
    category: 'Romantik',
    description: 'Rassom mo‘yqalami bilan chizilgan nafis akvarel gullar va ranglar jilosi.',
    previewImage: '/previews/watercolor-romance.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },

  // Creative Collection
  {
    id: 'night-sky',
    name: 'Night Sky',
    category: 'Kreativ',
    description: 'Chuqur tungi osmon, chaqnab turgan yulduzlar va koinotdek cheksiz baxt.',
    previewImage: '/previews/night-sky.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },
  {
    id: 'cinematic-love',
    name: 'Cinematic Love',
    category: 'Kreativ',
    description: 'Premyera film afishasidek dramatik, keng ekranli va esda qolarli muqova.',
    previewImage: '/previews/cinematic-love.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },
  {
    id: 'glass-elegance',
    name: 'Glass Elegance',
    category: 'Zamonaviy',
    description: 'Shaffof oyna effekti (glassmorphism), yaltiroq nurlar va zamonaviy yengillik.',
    previewImage: '/previews/glass-elegance.jpg',
    priceTier: 'PREMIUM',
    active: true,
  },
  {
    id: 'floral-frame',
    name: 'Floral Frame',
    category: 'Gulli',
    description: 'Geometrik oltin ramka ichidagi hashamatli gullar va markaziy monoxrom gerb.',
    previewImage: '/previews/floral-frame.jpg',
    priceTier: 'FREE',
    active: true,
  },
]
