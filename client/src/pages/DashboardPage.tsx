import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Invitation, RSVP } from '../types'
import { api } from '../services/api'
import { ShareModal } from '../components/ShareModal'
import { PrintInvitationModal } from '../components/PrintInvitationModal'
import {
  Sparkles,
  Plus,
  ExternalLink,
  Edit3,
  Copy,
  Trash2,
  Users,
  Check,
  Calendar,
  Clock,
  MapPin,
  X,
  FileCheck2,
  CopyPlus,
  Printer,
} from 'lucide-react'
import { formatShortUzbekDate } from '../utils/date'

export const DashboardPage: React.FC = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [selectedRsvpInvitation, setSelectedRsvpInvitation] = useState<Invitation | null>(null)
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loadingRsvps, setLoadingRsvps] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [shareData, setShareData] = useState<{ url: string; title: string } | null>(null)
  const [printingInvitation, setPrintingInvitation] = useState<Invitation | null>(null)

  const loadInvitations = async () => {
    try {
      setLoading(true)
      const data = await api.getInvitations()
      setInvitations(data)
    } catch (err) {
      console.error('Failed to load dashboard invitations:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInvitations()
  }, [])

  const handleCopyLink = (inv: Invitation) => {
    const url = `${window.location.origin}/t/${inv.publicSlug}`
    navigator.clipboard.writeText(url)
    setCopiedId(inv.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDuplicate = async (inv: Invitation) => {
    try {
      await api.duplicateInvitation(inv.id)
      await loadInvitations()
    } catch (err: any) {
      alert(err.message || 'Nusxa olishda xatolik')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.deleteInvitation(id)
      setDeleteConfirmId(null)
      await loadInvitations()
    } catch (err: any) {
      alert(err.message || 'O‘chirishda xatolik')
    }
  }

  const openRsvps = async (inv: Invitation) => {
    setSelectedRsvpInvitation(inv)
    setLoadingRsvps(true)
    try {
      const data = await api.getInvitationRsvps(inv.id)
      setRsvps(data)
    } catch (err) {
      console.error('Failed to load RSVPs:', err)
    } finally {
      setLoadingRsvps(false)
    }
  }

  const totalGuestsAttending = rsvps
    .filter((r) => r.attendance === 'ATTENDING')
    .reduce((sum, r) => sum + r.guestCount, 0)

  return (
    <div className="min-h-screen bg-stone-100/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold block mb-1">
              Boshqaruv paneli
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif-cormorant font-bold text-stone-900">
              Mening Taklifnomalarim
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Siz yaratgan barcha taklifnomalar va mehmonlar javoblari ro‘yxati
            </p>
          </div>

          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi taklifnoma yaratish</span>
          </Link>
        </div>

        {/* Invitations List */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200">
            <span className="animate-spin inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mb-3" />
            <p className="text-stone-500 text-sm">Yuklanmoqda...</p>
          </div>
        ) : invitations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif-cormorant font-bold text-stone-900 mb-2">
              Hali taklifnoma yaratmadingiz
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-6">
              O‘zbekistondagi eng go‘zal va zamonaviy raqamli to‘y taklifnomasini bir necha daqiqada yarating.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 transition-all shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Birinchi taklifnomani yaratish</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((inv) => {
              const fullUrl = `${window.location.origin}/t/${inv.publicSlug}`
              const rsvpCount = inv._count?.rsvps || 0

              return (
                <div
                  key={inv.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="p-6">
                    {/* Header: Status and Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inv.status === 'PUBLISHED'
                            ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {inv.status === 'PUBLISHED' ? 'Faol (Chop etilgan)' : 'Qoralama'}
                      </span>
                      <span className="text-[11px] text-stone-400 font-mono">
                        {formatShortUzbekDate(inv.createdAt.split('T')[0])}
                      </span>
                    </div>

                    {/* Couple Names */}
                    <h3 className="text-2xl sm:text-3xl font-serif-cormorant font-bold text-stone-900 mb-2 break-words">
                      {inv.groomName} & {inv.brideName}
                    </h3>

                    {/* Details snippet */}
                    <div className="space-y-1.5 text-xs text-stone-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>
                          {inv.weddingDate}, {inv.weddingTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{inv.venueName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-mono text-stone-600">
                          Shablon: {inv.template?.name || inv.templateId}
                        </span>
                      </div>
                    </div>

                    {/* Public Slug preview */}
                    <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs text-stone-600 mb-4">
                      <span className="font-mono text-[11px] truncate mr-2">
                        /t/{inv.publicSlug}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(inv)}
                        className="text-stone-700 hover:text-stone-900 p-1 cursor-pointer shrink-0"
                        title="Nusxa olish"
                      >
                        {copiedId === inv.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* RSVP Trigger Button */}
                    <button
                      type="button"
                      onClick={() => openRsvps(inv)}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-900 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Users className="w-4 h-4 text-amber-700" />
                      <span>
                        Mehmonlar javoblari (RSVP): <strong>{rsvpCount} ta</strong>
                      </span>
                    </button>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
                    <a
                      href={`/t/${inv.publicSlug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
                      title="Havolani ochish"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <Link
                      to={`/edit/${inv.id}`}
                      className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
                      title="Tahrirlash"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setPrintingInvitation(inv)}
                      className="p-2 rounded-xl text-amber-700 hover:text-amber-900 hover:bg-amber-100/60 transition-colors cursor-pointer"
                      title="Qog‘ozga chop etish (PDF)"
                    >
                      <Printer className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setShareData({
                          url: fullUrl,
                          title: `${inv.groomName} & ${inv.brideName}`,
                        })
                      }
                      className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
                      title="Ulashish"
                    >
                      <Sparkles className="w-4 h-4 text-amber-600" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDuplicate(inv)}
                      className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
                      title="Nusxa olish"
                    >
                      <CopyPlus className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(inv.id)}
                      className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="O‘chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif-cormorant font-bold text-stone-900">
                Taklifnomani o‘chirasizmi?
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Bu amal qaytarilmaydi. Ushbu taklifnoma va unga tegishli barcha RSVP javoblari butunlay o‘chiriladi.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors"
                >
                  Ha, o‘chirish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RSVP Details Modal */}
        {selectedRsvpInvitation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
              <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-serif-cormorant text-2xl font-bold">
                    {selectedRsvpInvitation.groomName} & {selectedRsvpInvitation.brideName}
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Mehmonlar ishtiroki (RSVP javoblari)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRsvpInvitation(null)}
                  className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stats overview */}
              <div className="p-4 bg-stone-50 border-b border-stone-200 grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-white rounded-2xl border border-stone-200">
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                    Keluvchi mehmonlar soni
                  </span>
                  <span className="text-2xl font-serif-cormorant font-bold text-emerald-600">
                    {totalGuestsAttending} kishi
                  </span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-stone-200">
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                    Jami javoblar
                  </span>
                  <span className="text-2xl font-serif-cormorant font-bold text-stone-900">
                    {rsvps.length} ta
                  </span>
                </div>
              </div>

              {/* List */}
              <div className="p-6 overflow-y-auto flex-1 space-y-3">
                {loadingRsvps ? (
                  <div className="text-center py-12">
                    <span className="animate-spin inline-block w-6 h-6 border-2 border-stone-900 border-t-transparent rounded-full" />
                  </div>
                ) : rsvps.length === 0 ? (
                  <div className="text-center py-12 text-stone-500 text-sm">
                    Hozircha hech kim javob yubormagan.
                  </div>
                ) : (
                  rsvps.map((rsvp) => (
                    <div
                      key={rsvp.id}
                      className="p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white hover:bg-stone-50/50"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-sm">
                            {rsvp.guestName}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              rsvp.attendance === 'ATTENDING'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            {rsvp.attendance === 'ATTENDING'
                              ? `Boradi (${rsvp.guestCount} kishi)`
                              : 'Bora olmaydi'}
                          </span>
                        </div>
                        {rsvp.note && (
                          <p className="text-xs text-stone-600 mt-1 italic">
                            "{rsvp.note}"
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono shrink-0">
                        {formatShortUzbekDate(rsvp.createdAt.split('T')[0])}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {shareData && (
          <ShareModal
            isOpen={true}
            onClose={() => setShareData(null)}
            url={shareData.url}
            title={shareData.title}
          />
        )}

        {/* Print Modal */}
        {printingInvitation && (
          <PrintInvitationModal
            isOpen={true}
            onClose={() => setPrintingInvitation(null)}
            invitation={printingInvitation}
          />
        )}
      </div>
    </div>
  )
}
