import React from 'react'
import { Link } from 'react-router-dom'
import { Template, Invitation } from '../types'
import { TemplateRenderer } from '../templates'
import { X, Sparkles, Check } from 'lucide-react'

interface PreviewModalProps {
  template: Template | null
  onClose: () => void
  onSelect?: (template: Template) => void
}

const SAMPLE_INVITATION: Invitation = {
  id: 'preview-sample',
  publicSlug: 'sample-preview',
  templateId: 'royal-gold',
  groomName: 'Azizbek',
  brideName: 'Madinabonu',
  groomParents: 'Alisher va Gulnora Qodirovlar',
  brideParents: 'Rustam va Dilrabo Karimovlar',
  weddingDate: '2026-11-20',
  weddingTime: '18:00',
  venueName: 'Registon Tantanalar Saroyi',
  venueAddress: 'Toshkent shahri, Amir Temur shoh ko‘chasi, 107',
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
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  template,
  onClose,
  onSelect,
}) => {
  if (!template) return null

  const previewInv: Invitation = {
    ...SAMPLE_INVITATION,
    templateId: template.id,
    template,
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl h-[92vh] bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="px-6 py-4 bg-stone-950/90 border-b border-stone-800 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            <h3 className="text-white font-serif-cormorant text-xl font-bold">
              {template.name}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {template.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onSelect ? (
              <button
                type="button"
                onClick={() => {
                  onSelect(template)
                  onClose()
                }}
                className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow"
              >
                <Check className="w-4 h-4" />
                <span>Tanlash</span>
              </button>
            ) : (
              <Link
                to={`/create?template=${template.id}`}
                className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Shu shablonni yaratish</span>
              </Link>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Preview Area */}
        <div className="flex-1 overflow-y-auto bg-stone-950">
          <TemplateRenderer invitation={previewInv} isPreview={true} />
        </div>
      </div>
    </div>
  )
}
