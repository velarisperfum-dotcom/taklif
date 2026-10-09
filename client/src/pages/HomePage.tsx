import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Template } from '../types'
import { api } from '../services/api'
import { TemplateCard } from '../components/TemplateCard'
import { PreviewModal } from '../components/PreviewModal'
import { TemplateRenderer } from '../templates'
import {
  Sparkles,
  Heart,
  Search,
  Filter,
  CheckCircle2,
  Share2,
  Clock,
  Music,
  MapPin,
  ChevronDown,
  ArrowRight,
  Smartphone,
  ShieldCheck,
  Send,
  Zap,
} from 'lucide-react'

const CATEGORIES = [
  'Barchasi',
  'Milliy',
  'Premium',
  'Minimalistik',
  'Romantik',
  'Zamonaviy',
  'Gulli',
  'Klassik',
]

const SAMPLE_HERO_INVITATION = {
  id: 'hero-demo',
  publicSlug: 'aziz-madina-a8k2p',
  templateId: 'royal-gold',
  groomName: 'Azizbek',
  brideName: 'Madinabonu',
  groomParents: 'Alisher va Gulnora Qodirovlar',
  brideParents: 'Rustam va Dilrabo Karimovlar',
  weddingDate: '2026-11-20',
  weddingTime: '18:00',
  venueName: 'Registon Tantanalar Saroyi',
  venueAddress: 'Toshkent sh., Amir Temur shoh ko‘chasi, 107',
  mapUrl: 'https://maps.google.com/?q=Registon+Toshkent',
  invitationMessage: 'Sizni nikoh to‘yimiz munosabati bilan yoziladigan oqshom dasturxonimizga taklif etamiz.',
  musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c2957b4455.mp3',
  dressCode: 'Black Tie & Elegant Evening Dress',
  coverTitle: 'Nikoh To‘yi Tantanasi',
  status: 'PUBLISHED' as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const HomePage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Barchasi')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'popular' | 'name'>('popular')
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await api.getTemplates()
        setTemplates(data)
      } catch (err) {
        console.error('Failed to load templates:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Filter & Search & Sort
  const filteredTemplates = useMemo(() => {
    return templates
      .filter((t) => {
        const matchesCategory =
          selectedCategory === 'Barchasi' || t.category === selectedCategory
        const matchesSearch =
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        return 0 // Default seeded order
      })
  }, [templates, selectedCategory, searchQuery, sortBy])

  const faqs = [
    {
      q: 'Raqamli taklifnoma mehmonlar telefonida qanday ochiladi?',
      a: 'Mehmonlar havola orqali ochganda, hech qanday dastur yuklab olish yoki ro‘yxatdan o‘tish talab etilmaydi. Taklifnoma har qanday smartfonda (iPhone, Android) chiroyli mini-sayt sifatida bir zumda ochiladi.',
    },
    {
      q: 'Mehmonlar to‘yga kelishini qanday tasdiqlaydi (RSVP)?',
      a: 'Har bir taklifnomada maxsus "Ishtirokni tasdiqlash" formasi mavjud. Mehmon o‘z ismi va kelishini belgilaganda, siz o‘z shaxsiy kabinetingizda barcha javoblarni to‘liq ko‘rib turasiz.',
    },
    {
      q: 'To‘y manzilini xaritada topish osonmi?',
      a: 'Ha! Taklifnomada to‘yxona nomi va Google Maps havolasi bo‘ladi. Mehmon bitta tugmani bosish orqali xaritani ochib, to‘g‘ri to‘yxonagacha marshrut chizib borishi mumkin.',
    },
    {
      q: 'Taklifnomaga musiqa qo‘shish mumkinmi?',
      a: 'Albatta! Har bir shablonga muloyim to‘y musiqasini biriktirishingiz mumkin. Mehmon sahifani ochganda musiqani o‘zi xohishiga ko‘ra yoqishi yoki o‘chirishi mumkin.',
    },
    {
      q: 'Taklifnoma qancha vaqt davomida faol bo‘ladi?',
      a: 'Siz yaratgan taklifnoma to‘y o‘tgandan keyin ham xotira sifatida faol saqlanib qoladi.',
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-amber-200">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-stone-200/80 bg-gradient-to-b from-stone-100/60 via-stone-50 to-stone-50">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-200/20 to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>O‘zbekistondagi №1 Premium Raqamli Taklifnomalar</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif-cormorant text-stone-900 tracking-tight leading-[1.08]">
                Eng baxtli kuningizga <br />
                <span className="italic font-normal text-amber-700">eng go‘zal taklifnoma</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Yaqinlaringizni hayotingizdagi eng unutilmas kun bilan o‘zgacha tarzda taklif qiling.
                Bir necha daqiqada o‘ziga xos raqamli taklifnoma yarating va Telegram, WhatsApp orqali bir zumda ulashing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-base transition-all shadow-xl shadow-stone-900/15 active:scale-95 group"
                >
                  <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
                  <span>Taklifnoma yaratish</span>
                </Link>

                <a
                  href="#gallery"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-semibold text-base transition-all shadow-sm active:scale-95"
                >
                  <span>Dizaynlarni ko‘rish</span>
                  <ArrowRight className="w-4 h-4 text-stone-500" />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-stone-200/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <div className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-stone-900">
                    20+
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">Nafis shablonlar</div>
                </div>
                <div>
                  <div className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-stone-900">
                    1 daqiqada
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">Tayyor havola</div>
                </div>
                <div>
                  <div className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-stone-900">
                    100%
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">Mobil moslik</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Mockup Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                {/* Phone Frame Mockup */}
                <div className="relative rounded-[2.5rem] bg-stone-900 p-3 shadow-2xl ring-1 ring-stone-800/80">
                  {/* Dynamic Island / Speaker */}
                  <div className="w-32 h-4 bg-stone-950 rounded-full mx-auto mb-2" />

                  {/* Screen Content */}
                  <div className="rounded-[2rem] overflow-hidden bg-white max-h-[580px] overflow-y-auto scrollbar-none border border-stone-800">
                    <TemplateRenderer
                      invitation={SAMPLE_HERO_INVITATION as any}
                      isPreview={true}
                    />
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200 shadow-xl flex items-center gap-3 animate-pulse-gentle">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-stone-900">Jonli RSVP Qabul Qilish</div>
                    <div className="text-[10px] text-stone-500">Mehmonlar javobi to‘g‘ridan-to‘g‘ri</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-stone-100/50 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-700 block mb-2">
              Oddiy va tezkor jarayon
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-cormorant font-bold text-stone-900">
              Qanday ishlaydi?
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-3">
              Atigi 3 qadamda professional raqamli to‘y taklifnomangizga ega bo‘ling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm relative group hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 mx-auto flex items-center justify-center font-serif-cormorant text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-serif-cormorant font-bold text-stone-900 mb-2">
                Dizaynni tanlang
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                20 dan ortiq hashamatli va milliy shablonlar orasidan o‘zingizga eng ma’qul kelganini tanlang va ko‘zdan kechiring.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm relative group hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 mx-auto flex items-center justify-center font-serif-cormorant text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-serif-cormorant font-bold text-stone-900 mb-2">
                To‘y ma’lumotlarini kiriting
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Kelin-kuyov ismlari, to‘y sanasi, boshlanish vaqti, to‘yxona va xarita manzilini osonlik bilan to‘ldiring.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm relative group hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 mx-auto flex items-center justify-center font-serif-cormorant text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-serif-cormorant font-bold text-stone-900 mb-2">
                Havolani yaqinlaringizga yuboring
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Yagona havola orqali taklifnomangizni Telegram, WhatsApp yoki boshqa ijtimoiy tarmoqlar orqali mehmonlarga ulashing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATE GALLERY */}
      <section id="gallery" className="py-20 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-700 block mb-2">
              Keng tanlov
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-cormorant font-bold text-stone-900">
              Barcha taklifnoma shablonlari
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-3">
              Har bir shablon o‘ziga xos kompozitsiya, milliy va zamonaviy uslubda professional yaratilgan
            </p>
          </div>

          {/* Search, Filter & Sort Controls */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/80 shadow-sm mb-10 space-y-4">
            {/* Search and Sort row */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              {/* Search input */}
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-4 top-3.5 text-stone-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Shablon nomi yoki uslubi bo‘yicha qidiring..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-stone-200 text-sm outline-none focus:border-amber-500 bg-stone-50/60"
                />
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs text-stone-500 font-medium">Saralash:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="py-2 px-3 rounded-xl border border-stone-200 text-xs text-stone-700 bg-stone-50 outline-none"
                >
                  <option value="popular">Tavsiya etilgan</option>
                  <option value="name">Nomi bo‘yicha (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-stone-100">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          {loading ? (
            <div className="text-center py-20">
              <span className="animate-spin inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mb-3" />
              <p className="text-stone-500 text-sm">Shablonlar yuklanmoqda...</p>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
              <p className="text-stone-500 text-base mb-3">
                "{searchQuery}" so‘rovi bo‘yicha shablonlar topilmadi.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('Barchasi')
                  setSearchQuery('')
                }}
                className="px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold"
              >
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onPreview={(t) => setPreviewTemplate(t)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PRICING PLANS */}
      <section id="pricing" className="py-20 bg-stone-100/50 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-700 block mb-2">
              Shaffof narxlar
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-cormorant font-bold text-stone-900">
              Qulay tarif rejalari
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-3">
              O‘zingizga mos reja bilan to‘yingizni yanada unutilmas qiling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider mb-4">
                  Bepul reja
                </div>
                <h3 className="text-3xl font-serif-cormorant font-bold text-stone-900 mb-2">
                  Boshlang‘ich
                </h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-serif-cormorant font-bold text-stone-900">0</span>
                  <span className="text-stone-500 text-sm">so‘m / cheksiz</span>
                </div>
                <p className="text-xs text-stone-500 mb-6">
                  Soddalashtirilgan shablonlar va oson ulashish imkoniyati.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Tanlangan bepul shablonlar</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>To‘liq taklifnoma havolasi</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hisoblagich (Countdown) va Google Maps</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Mobil telefonlarga to‘liq moslashuv</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/create"
                  className="w-full py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold text-xs flex items-center justify-center transition-colors"
                >
                  Bepul boshlash
                </Link>
              </div>
            </div>

            {/* Premium Tier */}
            <div className="bg-stone-950 text-white rounded-3xl p-8 border-2 border-amber-500/50 shadow-2xl relative flex flex-col justify-between">
              <div className="absolute -top-3 right-8 bg-amber-500 text-stone-950 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow">
                Eng ommabop
              </div>

              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/30">
                  Premium VIP
                </div>
                <h3 className="text-3xl font-serif-cormorant font-bold text-white mb-2">
                  Qirollik Tantanasi
                </h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-serif-cormorant font-bold text-amber-400">99,000</span>
                  <span className="text-stone-400 text-sm">so‘m / bir martalik</span>
                </div>
                <p className="text-xs text-stone-400 mb-6">
                  Barcha 20 ta hashamatli shablon, musiqa, jonli RSVP va maxsus effektlar.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Barcha 20 ta premium va milliy shablonlar</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Fon musiqasi va maxsus ovozlar</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Jonli RSVP (mehmonlar ro‘yxatini kabinetda ko‘rish)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Maxsus ranglar va tipografika sozlamalari</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Reklamasiz, toza premium havola</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/create"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center transition-all shadow-lg shadow-amber-500/20"
                >
                  Premium taklifnoma yaratish
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 border-b border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-700 block mb-2">
              Ko‘p beriladigan savollar
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-cormorant font-bold text-stone-900">
              Savol va javoblar
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = faqOpen === index
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif-cormorant text-lg sm:text-xl font-bold text-stone-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-400 transition-transform ${
                        isOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-stone-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-cormorant font-bold tracking-tight">
            Eng baxtli kuningizni go‘zal tarzda e’lon qiling
          </h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Taklifnomani bir necha daqiqada yarating va yaqinlaringizga unutilmas taassurot ulashing.
          </p>
          <div className="pt-4">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-xl shadow-amber-500/20 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Hozir taklifnoma yaratish</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      <PreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />
    </div>
  )
}
