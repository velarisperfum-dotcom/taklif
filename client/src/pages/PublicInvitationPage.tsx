import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Invitation } from '../types'
import { api } from '../services/api'
import { TemplateRenderer } from '../templates'
import { Heart, AlertCircle, ArrowLeft, Printer } from 'lucide-react'
import { PrintInvitationModal } from '../components/PrintInvitationModal'

export const PublicInvitationPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [printOpen, setPrintOpen] = useState(false)

  useEffect(() => {
    async function load() {
      if (!slug) {
        setNotFound(true)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await api.getInvitationBySlug(slug)
        setInvitation(data)
        document.title = `${data.groomName} & ${data.brideName} — To‘y Taklifnomasi`
      } catch (err) {
        console.error('Failed to load invitation by slug:', err)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full bg-stone-800 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 animate-pulse">
          <Heart className="w-8 h-8 fill-amber-400/20" />
        </div>
        <p className="font-serif-cormorant text-2xl font-bold tracking-wider">
          Taklifnoma ochilmoqda...
        </p>
        <span className="text-xs text-stone-500 mt-2">Iltimos, kuting</span>
      </div>
    )
  }

  if (notFound || !invitation) {
    return (
      <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-cormorant font-bold mb-2">
          Taklifnoma topilmadi
        </h1>
        <p className="text-sm text-stone-600 max-w-md mb-6 leading-relaxed">
          Kechirasiz, siz murojaat qilgan taklifnoma havolasi mavjud emas yoki o‘chirilgan bo‘lishi mumkin.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-all shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bosh sahifaga qaytish</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Floating Print / PDF button */}
      <div className="fixed top-4 right-4 z-40 no-print flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPrintOpen(true)}
          className="px-3.5 py-2 rounded-full bg-stone-900/80 hover:bg-stone-900 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-semibold backdrop-blur-md shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          title="Qog‘ozga yoki PDF ga chop etish"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Chop etish (PDF)</span>
        </button>
      </div>

      <TemplateRenderer invitation={invitation} />

      {/* Print Modal */}
      <PrintInvitationModal
        isOpen={printOpen}
        onClose={() => setPrintOpen(false)}
        invitation={{
          groomName: invitation.groomName,
          brideName: invitation.brideName,
          groomParents: invitation.groomParents,
          brideParents: invitation.brideParents,
          weddingDate: invitation.weddingDate,
          weddingTime: invitation.weddingTime,
          venueName: invitation.venueName,
          venueAddress: invitation.venueAddress,
          invitationMessage: invitation.invitationMessage,
          coverTitle: invitation.coverTitle,
          publicSlug: invitation.publicSlug,
        }}
      />
    </div>
  )
}
