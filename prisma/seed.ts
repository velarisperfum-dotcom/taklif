import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const TEMPLATES = [
  // A. Luxury Collection
  {
    id: 'royal-gold',
    name: 'Royal Gold',
    category: 'Premium',
    description: 'Ivory fon, nafis zarhal hoshiyalar, sharqona noziklik va qirollik hashamati.',
    previewImage: '/previews/royal-gold.jpg',
    priceTier: 'PREMIUM',
  },
  {
    id: 'black-tie',
    name: 'Black Tie',
    category: 'Premium',
    description: 'Chuqur qora fon, shampan-oltin yozuvlar va kinematik hashamat muhiti.',
    previewImage: '/previews/black-tie.jpg',
    priceTier: 'PREMIUM',
  },
  {
    id: 'pearl-elegance',
    name: 'Pearl Elegance',
    category: 'Klassik',
    description: 'Marvarid-oq kompozitsiya, o‘ta nozik chiziqlar va aristokratik serif shrift.',
    previewImage: '/previews/pearl-elegance.jpg',
    priceTier: 'FREE',
  },
  {
    id: 'burgundy-royale',
    name: 'Burgundy Royale',
    category: 'Premium',
    description: 'To‘q bordo qirmizi rang, sarg‘ish-qaymoqrang matn va saroy tantanasi.',
    previewImage: '/previews/burgundy-royale.jpg',
    priceTier: 'PREMIUM',
  },

  // B. Uzbek National Collection
  {
    id: 'uzbek-heritage',
    name: 'Uzbek Heritage',
    category: 'Milliy',
    description: 'An’anaviy sharqona islimiy naqshlar, xonatlas va ganchkorlik uslubidagi bezaklar.',
    previewImage: '/previews/uzbek-heritage.jpg',
    priceTier: 'FREE',
  },
  {
    id: 'suzani-romance',
    name: 'Suzani Romance',
    category: 'Milliy',
    description: 'Boy So‘zana kashtasi motivlari, anor ramzlari va qizg‘in milliy muhabbat.',
    previewImage: '/previews/suzani-romance.jpg',
    priceTier: 'PREMIUM',
  },
  {
    id: 'oriental-palace',
    name: 'Oriental Palace',
    category: 'Milliy',
    description: 'Qadimiy Samarqand va Buxoro gumbaz arkalari, feruza va oltin uyg‘unligi.',
    previewImage: '/previews/oriental-palace.jpg',
    priceTier: 'PREMIUM',
  },
  {
    id: 'silk-road',
    name: 'Silk Road',
    category: 'Milliy',
    description: 'Buyuk Ipak yo‘li afsonasi, iliq tuproq va zarrin qum ohanglaridagi joziba.',
    previewImage: '/previews/silk-road.jpg',
    priceTier: 'FREE',
  },

  // C. Modern Collection
  {
    id: 'minimal-white',
    name: 'Minimal White',
    category: 'Minimalistik',
    description: 'Sof oq fazo, lakonik arxitektura va faqat eng muhim mazmunga urg‘u.',
    previewImage: '/previews/minimal-white.jpg',
    priceTier: 'FREE',
  },
  {
    id: 'editorial-magazine',
    name: 'Editorial Magazine',
    category: 'Zamonaviy',
    description: 'Yuqori moda jurnallari uslubidagi dadil kompozitsiya va zamonaviy tipografika.',
    previewImage: '/previews/editorial-magazine.jpg',
    priceTier: 'PREMIUM',
  },
  {
    id: 'modern-beige',
    name: 'Modern Beige',
    category: 'Zamonaviy',
    description: 'Iliq bej rang, qahva tuslari, erkin asimmetriya va xotirjamlik.',
    previewImage: '/previews/modern-beige.jpg',
    priceTier: 'FREE',
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    category: 'Minimalistik',
    description: 'Qat’iy oq va qora uyg‘unligi, toza geometriya va abadiy uslub.',
    previewImage: '/previews/monochrome.jpg',
    priceTier: 'FREE',
  },

  // D. Romantic Collection
  {
    id: 'rose-garden',
    name: 'Rose Garden',
    category: 'Romantik',
    description: 'Nozik atirgul gultojibarglari, muloyim pushti tonlar va samimiy tuyg‘ular.',
    previewImage: '/previews/rose-garden.jpg',
    priceTier: 'FREE',
  },
  {
    id: 'botanical-love',
    name: 'Botanical Love',
    category: 'Romantik',
    description: 'Yashil evkalipt, zaytun novdalari va tabiat bilan hamohang musaffolik.',
    previewImage: '/previews/botanical-love.jpg',
    priceTier: 'FREE',
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    category: 'Romantik',
    description: 'Shaftoli va lavanda pastel jilolari, orombaxsh romantika va mayinlik.',
    previewImage: '/previews/pastel-dream.jpg',
    priceTier: 'PREMIUM',
  },
  {
    id: 'watercolor-romance',
    name: 'Watercolor Romance',
    category: 'Romantik',
    description: 'Rassom mo‘yqalami bilan chizilgan nafis akvarel gullar va ranglar jilosi.',
    previewImage: '/previews/watercolor-romance.jpg',
    priceTier: 'PREMIUM',
  },

  // E. Creative Collection
  {
    id: 'night-sky',
    name: 'Night Sky',
    category: 'Kreativ',
    description: 'Chuqur tungi osmon, chaqnab turgan yulduzlar va koinotdek cheksiz baxt.',
    previewImage: '/previews/night-sky.jpg',
    priceTier: 'PREMIUM',
  },
  {
    id: 'cinematic-love',
    name: 'Cinematic Love',
    category: 'Kreativ',
    description: 'Premyera film afishasidek dramatik, keng ekranli va esda qolarli muqova.',
    previewImage: '/previews/cinematic-love.jpg',
    priceTier: 'PREMIUM',
  },
  {
    id: 'glass-elegance',
    name: 'Glass Elegance',
    category: 'Zamonaviy',
    description: 'Shaffof oyna effekti (glassmorphism), yaltiroq nurlar va zamonaviy yengillik.',
    previewImage: '/previews/glass-elegance.jpg',
    priceTier: 'PREMIUM',
  },
  {
    id: 'floral-frame',
    name: 'Floral Frame',
    category: 'Gulli',
    description: 'Geometrik oltin ramka ichidagi hashamatli gullar va markaziy monoxrom gerb.',
    previewImage: '/previews/floral-frame.jpg',
    priceTier: 'FREE',
  },
]

async function main() {
  console.log('🌱 Boshlang‘ich ma’lumotlarni to‘ldirish boshlandi...')

  for (const t of TEMPLATES) {
    await prisma.template.upsert({
      where: { id: t.id },
      update: t,
      create: t,
    })
  }
  console.log(`✅ 20 ta shablon muvaffaqiyatli saqlandi!`)

  // Sample Demo Invitation
  const demo = await prisma.invitation.upsert({
    where: { publicSlug: 'aziz-madina-a8k2p' },
    update: {},
    create: {
      publicSlug: 'aziz-madina-a8k2p',
      templateId: 'royal-gold',
      groomName: 'Azizbek',
      brideName: 'Madinabonu',
      groomParents: 'Alisher va Gulnora Qodirovlar',
      brideParents: 'Rustam va Dilrabo Karimovlar',
      weddingDate: '2026-11-20',
      weddingTime: '18:00',
      venueName: 'Registon Tantanalar Saroyi',
      venueAddress: 'Toshkent shahri, Yunusobod tumani, Amir Temur shoh ko‘chasi, 107',
      mapUrl: 'https://maps.google.com/?q=Registon+Toshkent',
      invitationMessage: 'Muhtaram do‘stlar va qadrdonlar! Sizni hayotimizdagi eng baxtli va hayajonli kun — nikoh to‘yimiz munosabati bilan yoziladigan oqshom dasturxonimizga lutfan taklif etamiz.',
      musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c2957b4455.mp3',
      dressCode: 'Black Tie & Elegant Evening Dress',
      coverTitle: 'Nikoh To‘yi Tantanasi',
      programJson: JSON.stringify([
        { time: '17:30', title: 'Mehmonlar tashrifi va kutib olish' },
        { time: '18:00', title: 'Nikoh tantanasining boshlanishi' },
        { time: '19:30', title: 'Kelin-kuyov valsi va tabriklar' },
        { time: '21:00', title: 'Kelin salom va to‘y torti' }
      ]),
      status: 'PUBLISHED',
    }
  })

  // Sample RSVPs
  await prisma.rSVP.createMany({
    data: [
      {
        invitationId: demo.id,
        guestName: 'Botir Rahimov',
        attendance: 'ATTENDING',
        guestCount: 2,
        note: 'Baxtli bo‘linglar! Albatta boramiz.',
      },
      {
        invitationId: demo.id,
        guestName: 'Farhod Aliyev',
        attendance: 'NOT_ATTENDING',
        guestCount: 0,
        note: 'Safardaman, baxt tilayman!',
      }
    ]
  })

  console.log('✅ Demo taklifnoma va RSVP lari yaratildi!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
