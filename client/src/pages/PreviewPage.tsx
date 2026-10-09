import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Template, Invitation } from '../types'
import { api } from '../services/api'
import { TemplateRenderer } from '../templates'
import { ArrowLeft, Sparkles } from 'lucide-react'

const SAMPLE_DATA: Invitation = {
  id: 'preview-sample',
  publicSlug: 'sample',
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
  invitationMessage:
    'Muhtaram do‘stlar va qadrdonlar! Sizni hayotimizdagi eng baxtli va hayajonli kun — nikoh to‘yimiz munosabati bilan yoziladigan oqshom dasturxonimizga lutfan taklif etamiz.',
  musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c2957b4455.mp3',
  dressCode: 'Black Tie & Oqshom Liboslari',
  coverTitle: 'Nikoh To‘yi Tantanasi',
  status: 'PUBLISHED',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const PreviewPage: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>()
  const [template, setTemplate] = useState<Template | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!templateId) return
      try {
        setLoading(true)
        const tmpl = await api.getTemplateById(templateId)
        setTemplate(tmpl)
      } catch (err) {
        console.error('Failed to load template:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [templateId])

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center">
        <span className="animate-spin inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  const activeInvitation = {
    ...SAMPLE_DATA,
    templateId: templateId || 'royal-gold',
    template: template || undefined,
  }

  return (
    <div className="relative">
      {/* Floating control header */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900/90 text-white text-xs font-semibold backdrop-blur-md border border-stone-800 shadow-xl hover:bg-stone-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bosh sahifa</span>
        </Link>

        <Link
          to={`/create?template=${templateId}`}
          className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-xl transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Shu shablonni tanlash</span>
        </Link>
      </div>

      <TemplateRenderer invitation={activeInvitation} isPreview={true} />
    </div>
  )
}
