import React from 'react'
import { Link } from 'react-router-dom'
import { Template } from '../../types'
import { Eye, Check, Sparkles } from 'lucide-react'


interface TemplateCardProps {
  template: Template
  onPreview: (template: Template) => void
  onSelect?: (template: Template) => void
  isSelected?: boolean
}

// Visual themes for card preview tiles
const TILE_STYLES: Record<string, { bg: string; text: string; accent: string; border: string; label: string }> = {
  'royal-gold': { bg: 'bg-[#faf7f0]', text: 'text-[#1c1813]', accent: 'text-[#c5a059]', border: 'border-[#d4af37]/40', label: 'Ivory & Gold' },
  'black-tie': { bg: 'bg-[#0d0d11]', text: 'text-white', accent: 'text-[#e5c17d]', border: 'border-[#e5c17d]/40', label: 'Black & Gold' },
  'pearl-elegance': { bg: 'bg-[#f8f9fa]', text: 'text-stone-900', accent: 'text-stone-500', border: 'border-stone-300', label: 'Pearl White' },
  'burgundy-royale': { bg: 'bg-[#380912]', text: 'text-[#fbf6ea]', accent: 'text-[#e0c48b]', border: 'border-[#c5a059]/40', label: 'Deep Burgundy' },
  'uzbek-heritage': { bg: 'bg-[#faf6ee]', text: 'text-[#0e3b43]', accent: 'text-[#0e7c86]', border: 'border-[#0e7c86]/40', label: 'Sharqona Islimiy' },
  'suzani-romance': { bg: 'bg-[#fff9f2]', text: 'text-[#801b27]', accent: 'text-[#d96b43]', border: 'border-[#a82b3a]/30', label: 'So‘zana Kashtasi' },
  'oriental-palace': { bg: 'bg-[#0e1d2e]', text: 'text-white', accent: 'text-[#e2b866]', border: 'border-[#e2b866]/40', label: 'Moviy Samarqand' },
  'silk-road': { bg: 'bg-[#f3ece0]', text: 'text-[#69331e]', accent: 'text-[#964f33]', border: 'border-[#964f33]/30', label: 'Ipak Yo‘li Zari' },
  'minimal-white': { bg: 'bg-white', text: 'text-stone-900', accent: 'text-stone-400', border: 'border-stone-200', label: 'Minimalistik Oq' },
  'editorial-magazine': { bg: 'bg-[#f7f5f0]', text: 'text-stone-950', accent: 'text-stone-700', border: 'border-stone-900', label: 'Vogue Editorial' },
  'modern-beige': { bg: 'bg-[#ede6dc]', text: 'text-[#2e261f]', accent: 'text-[#a89078]', border: 'border-[#d6cbbe]', label: 'Iliq Bej Latte' },
  'monochrome': { bg: 'bg-black', text: 'text-white', accent: 'text-stone-400', border: 'border-white', label: 'Qora & Oq' },
  'rose-garden': { bg: 'bg-[#fff4f6]', text: 'text-rose-950', accent: 'text-rose-500', border: 'border-rose-200', label: 'Pushti Atirgul' },
  'botanical-love': { bg: 'bg-[#f0f4ef]', text: 'text-[#1e3020]', accent: 'text-[#4a6b4e]', border: 'border-[#4a6b4e]/30', label: 'Evkalipt & Zaytun' },
  'pastel-dream': { bg: 'bg-[#f7f2fc]', text: 'text-[#341d4a]', accent: 'text-purple-500', border: 'border-purple-200', label: 'Mayin Pastel' },
  'watercolor-romance': { bg: 'bg-[#f9f7f4]', text: 'text-[#2a211d]', accent: 'text-rose-400', border: 'border-stone-200', label: 'Akvarel Gultoj' },
  'night-sky': { bg: 'bg-[#070b19]', text: 'text-white', accent: 'text-blue-400', border: 'border-blue-900/60', label: 'Tungi Moviy Falak' },
  'cinematic-love': { bg: 'bg-[#0c1017]', text: 'text-white', accent: 'text-amber-400', border: 'border-stone-800', label: 'Kino Afishasi' },
  'glass-elegance': { bg: 'bg-[#181a26]', text: 'text-white', accent: 'text-cyan-300', border: 'border-white/20', label: 'Shaffof Oyna' },
  'floral-frame': { bg: 'bg-[#faf6ee]', text: 'text-[#1f160f]', accent: 'text-[#c29851]', border: 'border-[#c29851]/40', label: 'Zarhal Gulchambar' },
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onPreview,
  onSelect,
  isSelected = false,
}) => {
  const style = TILE_STYLES[template.id] || {
    bg: 'bg-stone-50',
    text: 'text-stone-900',
    accent: 'text-amber-500',
    border: 'border-stone-200',
    label: 'Klassik',
  }

  return (
    <div
      className={`group rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 ${
        isSelected ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-stone-200/90'
      }`}
    >
      {/* Visual Preview Box */}
      <div
        onClick={() => onPreview(template)}
        className={`relative h-64 sm:h-72 ${style.bg} ${style.border} border-b p-6 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-transform`}
      >
        {/* Subtle decorative inner border */}
        <div className="absolute inset-4 border border-current/10 rounded-2xl pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-stone-900/80 text-white backdrop-blur-md">
            {template.category}
          </span>
          {template.priceTier === 'PREMIUM' && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-stone-950 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              VIP
            </span>
          )}
        </div>

        {/* Center Mockup Names */}
        <div className="text-center space-y-1 my-auto">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
            {style.label}
          </p>
          <h4 className={`text-2xl sm:text-3xl font-bold font-serif-cormorant ${style.text} tracking-tight`}>
            Aziz & Madina
          </h4>
          <p className={`text-xs ${style.accent} font-mono tracking-widest uppercase pt-1`}>
            12.12.2026
          </p>
        </div>

        {/* Hover overlay preview trigger */}
        <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPreview(template)
            }}
            className="px-4 py-2 rounded-full bg-white text-stone-900 text-xs font-semibold flex items-center gap-1.5 shadow-lg hover:bg-stone-100 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Katta ko‘rish</span>
          </button>
        </div>
      </div>

      {/* Info Footer */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="font-serif-cormorant text-xl font-bold text-stone-900">
              {template.name}
            </h3>
            <span className="text-xs font-semibold text-stone-500 font-mono">
              {template.priceTier === 'PREMIUM' ? 'Premium' : 'Bepul'}
            </span>
          </div>
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {template.description}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 mt-3 border-t border-stone-100 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="flex-1 py-2.5 px-3 rounded-xl border border-stone-200 hover:border-stone-400 text-stone-700 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ko‘rish</span>
          </button>

          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(template)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Tanlandi</span>
                </>
              ) : (
                <span>Tanlash</span>
              )}
            </button>
          ) : (
            <Link
              to={`/create?template=${template.id}`}
              className="flex-1 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <span>Tanlash</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
