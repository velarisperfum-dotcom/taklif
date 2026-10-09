import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useParams, Link } from 'react-router-dom'
import { Template, CreateInvitationInput } from '../types'
import { api } from '../services/api'
import { TemplateCard } from '../components/TemplateCard'
import { TemplateRenderer } from '../templates'
import { PreviewModal } from '../components/PreviewModal'
import { ShareModal } from '../components/ShareModal'
import { PrintInvitationModal } from '../components/PrintInvitationModal'
import { templateService } from '../services/template.service'
import confetti from 'canvas-confetti'
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  Clock,
  MapPin,
  Music,
  Users,
  Heart,
  Palette,
  Eye,
  Send,
  ExternalLink,
  Copy,
  Plus,
  Trash2,
  Printer,
} from 'lucide-react'

const STEP_TITLES = [
  'Shablonni tanlash',
  'To‘y ma’lumotlari',
  'Moslashtirish',
  'Jonli ko‘rish',
  'Saqlash va ulashish',
]

const ACCENT_COLORS = [
  { name: 'Oltin (Gold)', value: '#d4af37' },
  { name: 'Qirmizi (Burgundy)', value: '#9e1b32' },
  { name: 'Zumrad (Emerald)', value: '#0e7c86' },
  { name: 'Atirgul (Rose)', value: '#e17b8d' },
  { name: 'Klassik Qora (Black)', value: '#1a1a1a' },
  { name: 'Moviy Tun (Navy)', value: '#1a365d' },
]

export const CreateWizardPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { id: editId } = useParams<{ id: string }>()

  const [step, setStep] = useState<number>(1)
  const [templates, setTemplates] = useState<Template[]>([])
  const [loadingTemplates, setLoadingTemplates] = useState(true)
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('Barchasi')
  const [searchQuery, setSearchQuery] = useState('')

  // Form State
  const [formData, setFormData] = useState<CreateInvitationInput>({
    templateId: searchParams.get('template') || 'royal-gold',
    groomName: '',
    brideName: '',
    weddingDate: '2026-11-20',
    weddingTime: '18:00',
    venueName: '',
    venueAddress: '',
    groomParents: '',
    brideParents: '',
    invitationMessage:
      'Muhtaram do‘stlar va qadrdonlar! Sizni hayotimizdagi eng baxtli va hayajonli kun — nikoh to‘yimiz munosabati bilan yoziladigan oqshom dasturxonimizga lutfan taklif etamiz.',
    mapUrl: '',
    musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c2957b4455.mp3',
    dressCode: 'Bayramona va chiroyli liboslar',
    coverTitle: 'Nikoh To‘yi Tantanasi',
    programJson: JSON.stringify([
      { time: '17:30', title: 'Mehmonlar tashrifi va kutib olish' },
      { time: '18:00', title: 'Nikoh tantanasining boshlanishi' },
      { time: '19:30', title: 'Kelin-kuyov valsi va tabriklar' },
      { time: '21:00', title: 'To‘y torti va xotira rasmlari' },
    ]),
    themeSettings: JSON.stringify({
      accentColor: '#d4af37',
    }),
    status: 'PUBLISHED',
  })

  // Timeline editor state
  const [timelineItems, setTimelineItems] = useState<{ time: string; title: string }[]>([
    { time: '17:30', title: 'Mehmonlar tashrifi va kutib olish' },
    { time: '18:00', title: 'Nikoh tantanasining boshlanishi' },
    { time: '19:30', title: 'Kelin-kuyov valsi va tabriklar' },
    { time: '21:00', title: 'To‘y torti va xotira rasmlari' },
  ])

  const [saving, setSaving] = useState(false)
  const [savedSlug, setSavedSlug] = useState<string | null>(null)
  const [savedUrl, setSavedUrl] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [printModalOpen, setPrintModalOpen] = useState(false)

  // Load templates and edit data if editId
  useEffect(() => {
    async function init() {
      try {
        setLoadingTemplates(true)
        const tmpls = await templateService.getTemplates()
        setTemplates(tmpls)

        if (editId) {
          const inv = await api.getInvitationById(editId)
          setFormData({
            templateId: inv.templateId,
            groomName: inv.groomName,
            brideName: inv.brideName,
            weddingDate: inv.weddingDate,
            weddingTime: inv.weddingTime,
            venueName: inv.venueName,
            venueAddress: inv.venueAddress,
            groomParents: inv.groomParents || '',
            brideParents: inv.brideParents || '',
            invitationMessage: inv.invitationMessage || '',
            mapUrl: inv.mapUrl || '',
            musicUrl: inv.musicUrl || '',
            dressCode: inv.dressCode || '',
            coverTitle: inv.coverTitle || '',
            programJson: inv.programJson || '',
            themeSettings: inv.themeSettings || '',
            status: inv.status,
          })
          if (inv.programJson) {
            try {
              setTimelineItems(JSON.parse(inv.programJson))
            } catch {}
          }
          setStep(2) // Jump to step 2 for editing
        } else {
          const paramTmpl = searchParams.get('template')
          if (paramTmpl) {
            setFormData((prev) => ({ ...prev, templateId: paramTmpl }))
            setStep(2)
          }
        }
      } catch (err) {
        console.error('Failed to initialize wizard:', err)
      } finally {
        setLoadingTemplates(false)
      }
    }
    init()
  }, [editId, searchParams])

  // Update programJson when timeline changes
  const updateTimeline = (newItems: { time: string; title: string }[]) => {
    setTimelineItems(newItems)
    setFormData((prev) => ({
      ...prev,
      programJson: JSON.stringify(newItems),
    }))
  }

  // Validate Step 2 fields
  const validateStep2 = () => {
    const errors: Record<string, string> = {}
    if (!formData.groomName.trim()) {
      errors.groomName = 'Kuyovning ismini kiriting'
    }
    if (!formData.brideName.trim()) {
      errors.brideName = 'Kelinning ismini kiriting'
    }
    if (!formData.weddingDate) {
      errors.weddingDate = 'To‘y sanasini tanlang'
    }
    if (!formData.weddingTime) {
      errors.weddingTime = 'To‘y boshlanish vaqtini kiriting'
    }
    if (!formData.venueName.trim()) {
      errors.venueName = 'To‘yxona yoki restoran nomini kiriting'
    }
    if (!formData.venueAddress.trim()) {
      errors.venueAddress = 'Manzilni kiriting'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (step === 2) {
      if (!validateStep2()) return
    }
    setStep((prev) => Math.min(prev + 1, 5))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Save / Publish
  const handlePublish = async () => {
    if (!validateStep2()) {
      setStep(2)
      return
    }

    try {
      setSaving(true)
      let result
      if (editId) {
        result = await api.updateInvitation(editId, formData)
      } else {
        result = await api.createInvitation(formData)
      }

      setSavedSlug(result.publicSlug)
      const full = `${window.location.origin}/t/${result.publicSlug}`
      setSavedUrl(full)

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      })
    } catch (err: any) {
      alert(err.message || 'Saqlashda xatolik yuz berdi')
    } finally {
      setSaving(false)
    }
  }

  const copyUrl = () => {
    if (savedUrl) {
      navigator.clipboard.writeText(savedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Filter templates
  const filteredTemplates = templates.filter((t) => {
    const matchesCategory =
      categoryFilter === 'Barchasi' || t.category === categoryFilter
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Live preview mockup object
  const livePreviewInvitation = {
    ...formData,
    id: 'live-preview',
    publicSlug: 'preview-slug',
    groomName: formData.groomName.trim() || 'Kuyov Ismi',
    brideName: formData.brideName.trim() || 'Kelin Ismi',
    venueName: formData.venueName.trim() || 'To‘yxona Nomi',
    venueAddress: formData.venueAddress.trim() || 'To‘yxona manzili',
    status: 'PUBLISHED' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return (
    <div className="min-h-screen bg-stone-100/60 pb-24">
      {/* Top Header & Stepper */}
      <div className="bg-white border-b border-stone-200 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 font-semibold block">
                {editId ? 'Taklifnomani tahrirlash' : 'Yangi taklifnoma yaratish'}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif-cormorant font-bold text-stone-900">
                {step}-Qadam: {STEP_TITLES[step - 1]}
              </h2>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    if (s < step || (s === 2 && formData.templateId)) {
                      setStep(s)
                    }
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    s === step
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-sm ring-2 ring-amber-500/30'
                      : s < step
                      ? 'bg-stone-900 text-white cursor-pointer'
                      : 'bg-stone-200 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  {s < step ? <Check className="w-3.5 h-3.5" /> : s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* STEP 1: SELECT TEMPLATE */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {['Barchasi', 'Milliy', 'Premium', 'Minimalistik', 'Romantik', 'Zamonaviy', 'Gulli', 'Klassik'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        categoryFilter === cat
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Shablonni qidirish..."
                className="w-full md:w-72 px-4 py-2 rounded-xl border border-stone-200 text-xs outline-none bg-stone-50"
              />
            </div>

            {loadingTemplates ? (
              <div className="text-center py-20">
                <span className="animate-spin inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mb-3" />
                <p className="text-stone-500 text-sm">Shablonlar yuklanmoqda...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isSelected={formData.templateId === template.id}
                    onPreview={(t) => setPreviewTemplate(t)}
                    onSelect={(t) => {
                      setFormData((prev) => ({ ...prev, templateId: t.id }))
                      handleNext()
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 2: WEDDING INFORMATION */}
        {step === 2 && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-sm animate-in fade-in duration-200 space-y-8">
            <div className="text-center">
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-700 block mb-1">
                Asosiy ma’lumotlar
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-cormorant font-bold text-stone-900">
                To‘y tafsilotlarini kiriting
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Yulduzcha (*) bilan belgilangan maydonlarni to‘ldirish majburiydir
              </p>
            </div>

            <div className="space-y-6">
              {/* Groom and Bride */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Kuyovning ismi *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.groomName}
                    onChange={(e) =>
                      setFormData({ ...formData, groomName: e.target.value })
                    }
                    placeholder="Masalan: Azizbek"
                    className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-colors ${
                      validationErrors.groomName
                        ? 'border-rose-500 bg-rose-50/50'
                        : 'border-stone-200 bg-stone-50 focus:border-stone-900'
                    }`}
                  />
                  {validationErrors.groomName && (
                    <span className="text-[11px] text-rose-500 mt-1 block">
                      {validationErrors.groomName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Kelinning ismi *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brideName}
                    onChange={(e) =>
                      setFormData({ ...formData, brideName: e.target.value })
                    }
                    placeholder="Masalan: Madinabonu"
                    className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-colors ${
                      validationErrors.brideName
                        ? 'border-rose-500 bg-rose-50/50'
                        : 'border-stone-200 bg-stone-50 focus:border-stone-900'
                    }`}
                  />
                  {validationErrors.brideName && (
                    <span className="text-[11px] text-rose-500 mt-1 block">
                      {validationErrors.brideName}
                    </span>
                  )}
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    To‘y sanasi *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={formData.weddingDate}
                      onChange={(e) =>
                        setFormData({ ...formData, weddingDate: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    To‘y boshlanish vaqti *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.weddingTime}
                    onChange={(e) =>
                      setFormData({ ...formData, weddingTime: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Venue Name & Address */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  To‘yxona yoki restoran nomi *
                </label>
                <input
                  type="text"
                  required
                  value={formData.venueName}
                  onChange={(e) =>
                    setFormData({ ...formData, venueName: e.target.value })
                  }
                  placeholder="Masalan: Registon tantanalar saroyi"
                  className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-colors ${
                    validationErrors.venueName
                      ? 'border-rose-500 bg-rose-50/50'
                      : 'border-stone-200 bg-stone-50 focus:border-stone-900'
                  }`}
                />
                {validationErrors.venueName && (
                  <span className="text-[11px] text-rose-500 mt-1 block">
                    {validationErrors.venueName}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  To‘yxona manzili *
                </label>
                <input
                  type="text"
                  required
                  value={formData.venueAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, venueAddress: e.target.value })
                  }
                  placeholder="Masalan: Toshkent sh., Amir Temur shoh ko‘chasi, 107"
                  className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-colors ${
                    validationErrors.venueAddress
                      ? 'border-rose-500 bg-rose-50/50'
                      : 'border-stone-200 bg-stone-50 focus:border-stone-900'
                  }`}
                />
                {validationErrors.venueAddress && (
                  <span className="text-[11px] text-rose-500 mt-1 block">
                    {validationErrors.venueAddress}
                  </span>
                )}
              </div>

              {/* Google Maps link */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Google Maps xarita havolasi (ixtiyoriy)
                </label>
                <input
                  type="url"
                  value={formData.mapUrl || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, mapUrl: e.target.value })
                  }
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900"
                />
              </div>

              {/* Parents Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Kuyovning ota-onasi ismlari (ixtiyoriy)
                  </label>
                  <input
                    type="text"
                    value={formData.groomParents || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, groomParents: e.target.value })
                    }
                    placeholder="Masalan: Alisher va Gulnora Qodirovlar"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Kelinning ota-onasi ismlari (ixtiyoriy)
                  </label>
                  <input
                    type="text"
                    value={formData.brideParents || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, brideParents: e.target.value })
                    }
                    placeholder="Masalan: Rustam va Dilrabo Karimovlar"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Invitation message */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Taklifnoma matni
                </label>
                <textarea
                  rows={3}
                  value={formData.invitationMessage || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      invitationMessage: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900 leading-relaxed"
                />
              </div>

              {/* Dress Code & Music */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Dress Code (ixtiyoriy)
                  </label>
                  <input
                    type="text"
                    value={formData.dressCode || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, dressCode: e.target.value })
                    }
                    placeholder="Masalan: Black Tie & Oqshom liboslari"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Fon musiqasi havolasi (MP3)
                  </label>
                  <input
                    type="text"
                    value={formData.musicUrl || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, musicUrl: e.target.value })
                    }
                    placeholder="https://... audio fayl havolasi"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Timeline Items */}
              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-stone-700">
                    To‘y dasturi (Rejasi)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      updateTimeline([
                        ...timelineItems,
                        { time: '20:00', title: 'Yangi voqea' },
                      ])
                    }
                    className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Qator qo‘shish</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {timelineItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => {
                          const updated = [...timelineItems]
                          updated[index].time = e.target.value
                          updateTimeline(updated)
                        }}
                        placeholder="Vaqt"
                        className="w-24 px-3 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50"
                      />
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...timelineItems]
                          updated[index].title = e.target.value
                          updateTimeline(updated)
                        }}
                        placeholder="Voqea nomi"
                        className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = timelineItems.filter(
                            (_, i) => i !== index
                          )
                          updateTimeline(updated)
                        }}
                        className="p-2 text-stone-400 hover:text-rose-500 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CUSTOMIZATION */}
        {step === 3 && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-sm animate-in fade-in duration-200 space-y-8">
            <div className="text-center">
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-700 block mb-1">
                Shaxsiylashtirish
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-cormorant font-bold text-stone-900">
                Dizayn va ranglarni moslang
              </h3>
            </div>

            <div className="space-y-6">
              {/* Cover Title */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Muqova sarlavhasi
                </label>
                <input
                  type="text"
                  value={formData.coverTitle || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, coverTitle: e.target.value })
                  }
                  placeholder="Masalan: Nikoh To‘yi Tantanasi"
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900"
                />
              </div>

              {/* Accent Color Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Urg‘u beruvchi rang (Accent Color)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ACCENT_COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          themeSettings: JSON.stringify({ accentColor: c.value }),
                        })
                      }}
                      className="p-3 rounded-2xl border border-stone-200 hover:border-stone-400 flex items-center gap-2.5 transition-all cursor-pointer"
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/10 shrink-0 shadow-sm"
                        style={{ backgroundColor: c.value }}
                      />
                      <span className="text-xs font-medium text-stone-800">
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected template reminder */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-900 block">
                    Tanlangan shablon:
                  </span>
                  <span className="text-sm font-bold font-serif-cormorant text-stone-900">
                    {templates.find((t) => t.id === formData.templateId)?.name ||
                      formData.templateId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-amber-800 hover:underline cursor-pointer"
                >
                  Shablonni o‘zgartirish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: LIVE PREVIEW */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-serif-cormorant text-xl font-bold text-stone-900">
                  Jonli ko‘rinish
                </h3>
                <p className="text-xs text-stone-500">
                  Siz kiritgan ma’lumotlar bilan taklifnoma aynan shunday ko‘rinadi
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPrintModalOpen(true)}
                  className="px-4 py-2.5 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-800 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-700" />
                  <span className="hidden sm:inline">Qog‘ozga chop etish</span>
                  <span className="sm:hidden">Chop etish</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow cursor-pointer"
                >
                  <span>Chop etishga o‘tish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
              <TemplateRenderer
                invitation={livePreviewInvitation as any}
                isPreview={true}
              />
            </div>
          </div>
        )}

        {/* STEP 5: SAVE & PUBLISH */}
        {step === 5 && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-xl text-center space-y-6 animate-in fade-in duration-200">
            {!savedSlug ? (
              <>
                <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center">
                  <Sparkles className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-serif-cormorant font-bold text-stone-900">
                  Taklifnomani chop etishga tayyormisiz?
                </h3>
                <p className="text-sm text-stone-500 max-w-md mx-auto">
                  Quyidagi tugmani bosing va taklifnomangiz darhol chop etilib (nashr qilinib), yaqinlaringizga yuborish uchun unikal havola yaratiladi. Shuningdek qog‘ozda chop etish ham mumkin.
                </p>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Kelin va kuyov:</span>
                    <span className="font-bold text-stone-900">
                      {formData.groomName} & {formData.brideName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">To‘y sanasi:</span>
                    <span className="font-bold text-stone-900">
                      {formData.weddingDate}, {formData.weddingTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">To‘yxona:</span>
                    <span className="font-bold text-stone-900">
                      {formData.venueName}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={saving}
                    className="flex-1 py-4 px-6 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm transition-all shadow-xl shadow-stone-900/20 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Taklifnomani chop etish (Nashr qilish)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPrintModalOpen(true)}
                    className="py-4 px-6 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <Printer className="w-4 h-4 text-amber-700" />
                    <span>Qog‘ozga chop etish (PDF)</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-serif-cormorant font-bold text-stone-900">
                  Tabriklaymiz! Taklifnomangiz muvaffaqiyatli chop etildi!
                </h3>
                <p className="text-sm text-stone-500 max-w-md mx-auto">
                  Sizning unikal taklifnoma havolangiz yaratildi. Uni yaqinlaringizga yuborishingiz yoki A5 formatda qog‘ozga chop etishingiz mumkin.
                </p>

                {/* Public Link Box */}
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl flex items-center gap-2 text-left">
                  <input
                    type="text"
                    readOnly
                    value={savedUrl || ''}
                    className="flex-1 bg-transparent text-xs text-stone-700 px-2 outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={copyUrl}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Nusxalandi!' : 'Nusxa olish'}</span>
                  </button>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <a
                    href={`/t/${savedSlug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-4 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Taklifnomani ochish</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setPrintModalOpen(true)}
                    className="py-3 px-4 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Qog‘ozga chop etish</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShareOpen(true)}
                    className="py-3 px-4 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Yaqinlarga ulashish</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-xs">
                  <Link
                    to="/dashboard"
                    className="text-stone-500 hover:text-stone-900 font-medium"
                  >
                    Boshqaruv kabinetiga o‘tish
                  </Link>
                  <Link
                    to="/"
                    className="text-stone-500 hover:text-stone-900 font-medium"
                  >
                    Bosh sahifaga qaytish
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Navigation Buttons (Steps 1-4) */}
        {step < 5 && (
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="px-6 py-3 rounded-full border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Orqaga</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>{step === 4 ? 'Chop etishga o‘tish' : 'Keyingisi'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Preview Modal if inspecting from Step 1 */}
      <PreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onSelect={(t) => {
          setFormData((prev) => ({ ...prev, templateId: t.id }))
          setPreviewTemplate(null)
          setStep(2)
        }}
      />

      {/* Share Modal */}
      {savedUrl && (
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          url={savedUrl}
          title={`${formData.groomName} & ${formData.brideName}`}
        />
      )}

      {/* Print Invitation Modal */}
      <PrintInvitationModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        invitation={{
          groomName: formData.groomName.trim() || 'Kuyov Ismi',
          brideName: formData.brideName.trim() || 'Kelin Ismi',
          groomParents: formData.groomParents,
          brideParents: formData.brideParents,
          weddingDate: formData.weddingDate,
          weddingTime: formData.weddingTime,
          venueName: formData.venueName.trim() || 'To‘yxona Nomi',
          venueAddress: formData.venueAddress.trim() || 'To‘yxona Manzili',
          invitationMessage: formData.invitationMessage,
          coverTitle: formData.coverTitle,
          publicSlug: savedSlug || undefined,
        }}
      />
    </div>
  )
}

