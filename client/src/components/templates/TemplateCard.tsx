import React from 'react'
import { Link } from 'react-router-dom'
import { Template } from '../../types'
import { Eye, Check, Sparkles, ArrowRight, Heart } from 'lucide-react'

interface TemplateCardProps {
  template: Template
  onPreview: (template: Template) => void
  onSelect?: (template: Template) => void
  isSelected?: boolean
}

// Visual themes & real luxury images for cards
const TEMPLATE_PREVIEWS: Record<string, { image: string; couple: string; date: string; tag: string }> = {
  'palace-romance': {
    image: '/templates/palace-terrace.jpg',
    couple: 'Bekzod & Munisa',
    date: '28.06.2026',
    tag: 'Saroy & Ko‘l',
  },
  'bekzod-munisa': {
    image: '/templates/palace-terrace.jpg',
    couple: 'Bekzod & Munisa',
    date: '28.06.2026',
    tag: 'Saroy & Ko‘l',
  },
  'royal-gold': {
    image: '/templates/royal-gold.jpg',
    couple: 'Javohir & Nilufar',
    date: '15.09.2026',
    tag: 'Zarhal Saroy',
  },
  'uzbek-heritage': {
    image: '/templates/uzbek-heritage.jpg',
    couple: 'Sardor & Kamola',
    date: '20.08.2026',
    tag: 'Registon & So‘zana',
  },
  'oriental-palace': {
    image: '/templates/uzbek-heritage.jpg',
    couple: 'Bobur & Rayhona',
    date: '05.09.2026',
    tag: 'Sharqona Qasr',
  },
  'suzani-romance': {
    image: '/templates/uzbek-heritage.jpg',
    couple: 'Otabek & Kumush',
    date: '14.08.2026',
    tag: 'Ipak So‘zana',
  },
  'silk-road': {
    image: '/templates/uzbek-heritage.jpg',
    couple: 'Sherzod & Dildora',
    date: '22.09.2026',
    tag: 'Buyuk Ipak Yo‘li',
  },
  'rose-garden': {
    image: '/templates/rose-garden.jpg',
    couple: 'Farrux & Shahzoda',
    date: '10.07.2026',
    tag: 'Pushti Bog‘',
  },
  'botanical-love': {
    image: '/templates/rose-garden.jpg',
    couple: 'Jasur & Malika',
    date: '19.06.2026',
    tag: 'Evkalipt & Yashillik',
  },
  'floral-frame': {
    image: '/templates/rose-garden.jpg',
    couple: 'Alisher & Mohira',
    date: '11.07.2026',
    tag: 'Gulli Rom',
  },
  'pastel-dream': {
    image: '/templates/rose-garden.jpg',
    couple: 'Akmal & Laylo',
    date: '25.06.2026',
    tag: 'Mayin Orzu',
  },
  'watercolor-romance': {
    image: '/templates/rose-garden.jpg',
    couple: 'Shoxrux & Ziyoda',
    date: '09.08.2026',
    tag: 'Akvarel San’ati',
  },
  'black-tie': {
    image: '/templates/black-tie.jpg',
    couple: 'Temur & Sevara',
    date: '24.10.2026',
    tag: 'Nafis Qora & Oltin',
  },
  'cinematic-love': {
    image: '/templates/black-tie.jpg',
    couple: 'Murod & Yulduz',
    date: '08.10.2026',
    tag: 'Kino Afishasi',
  },
  'night-sky': {
    image: '/templates/black-tie.jpg',
    couple: 'Rustam & Feruza',
    date: '12.09.2026',
    tag: 'Yulduzli Tun',
  },
  'monochrome': {
    image: '/templates/black-tie.jpg',
    couple: 'Elyor & Gulnoza',
    date: '17.10.2026',
    tag: 'Qora & Oq',
  },
  'burgundy-royale': {
    image: '/templates/royal-gold.jpg',
    couple: 'Ulug‘bek & Diyora',
    date: '18.11.2026',
    tag: 'Bordo & Oltin',
  },
  'pearl-elegance': {
    image: '/templates/palace-terrace.jpg',
    couple: 'Davron & Zarina',
    date: '02.08.2026',
    tag: 'Marvarid Oq',
  },
  'editorial-magazine': {
    image: '/templates/royal-gold.jpg',
    couple: 'Sanjar & Sabrina',
    date: '30.08.2026',
    tag: 'Vogue Editorial',
  },
  'modern-beige': {
    image: '/templates/palace-terrace.jpg',
    couple: 'Nodir & Aziza',
    date: '16.09.2026',
    tag: 'Iliq Bej Latte',
  },
  'minimal-white': {
    image: '/templates/rose-garden.jpg',
    couple: 'Anvar & Nozima',
    date: '04.07.2026',
    tag: 'Minimalistik Oq',
  },
  'glass-elegance': {
    image: '/templates/palace-terrace.jpg',
    couple: 'Doniyor & Lola',
    date: '21.07.2026',
    tag: 'Shaffof Shisha',
  },
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onPreview,
  onSelect,
  isSelected = false,
}) => {
  const previewData = TEMPLATE_PREVIEWS[template.id] || {
    image: '/templates/palace-terrace.jpg',
    couple: 'Bekzod & Munisa',
    date: '28.06.2026',
    tag: template.category,
  }

  const isVip = template.priceTier === 'PREMIUM' || template.id === 'palace-romance' || template.id === 'royal-gold' || template.id === 'uzbek-heritage'

  return (
    <div
      className={`group rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1.5 ${
        isSelected ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-stone-200/90'
      }`}
    >
      {/* Visual Image Preview Box */}
      <div
        onClick={() => onPreview(template)}
        className="relative h-72 sm:h-80 w-full overflow-hidden cursor-pointer select-none bg-stone-900"
      >
        {/* Background Image with smooth zoom effect */}
        <img
          src={previewData.image}
          alt={template.name}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Ambient Overlay for crystal clear typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-stone-950/40 group-hover:via-stone-950/20 transition-colors" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-sm">
            {template.category}
          </span>
          {isVip && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 flex items-center gap-1 shadow-md font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              TOP VIP
            </span>
          )}
        </div>

        {/* Center/Bottom Calligraphy Mockup Text on the card */}
        <div className="absolute inset-x-4 bottom-4 z-10 text-center space-y-1 text-white">
          <p className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-300/90 drop-shadow">
            {previewData.tag}
          </p>
          <h4 className="font-['Alex_Brush',_cursive] text-3xl sm:text-4xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight">
            {previewData.couple}
          </h4>
          <p className="text-[11px] font-mono tracking-widest text-white/80 drop-shadow">
            ✦ {previewData.date} ✦
          </p>
        </div>

        {/* Desktop Hover Quick Action Bar */}
        <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPreview(template)
            }}
            className="px-4 py-2.5 rounded-full bg-white/95 text-stone-900 text-xs font-semibold flex items-center gap-1.5 shadow-xl hover:bg-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-stone-700" />
            <span>Jonli ko‘rish</span>
          </button>
        </div>
      </div>

      {/* Card Info & Mobile Friendly Action Buttons */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-white">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif-cormorant text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
              {template.name}
            </h3>
            {isVip ? (
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
                Premium
              </span>
            ) : (
              <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                Bepul
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {template.description}
          </p>
        </div>

        {/* Mobile & Desktop Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100">
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>Ko‘rish</span>
          </button>

          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(template)}
              className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                isSelected
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isSelected ? 'Tanlandi' : 'Tanlash'}</span>
            </button>
          ) : (
            <Link
              to={`/create?template=${template.id}`}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-sm active:scale-95 group/btn"
            >
              <span>Yaratish</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
