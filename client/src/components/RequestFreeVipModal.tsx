import React, { useState, useEffect } from 'react'
import { X, Gift, Sparkles, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { api } from '../services/api'

interface RequestFreeVipModalProps {
  isOpen: boolean
  onClose: () => void
  currentSlug?: string
}

export const RequestFreeVipModal: React.FC<RequestFreeVipModalProps> = ({
  isOpen,
  onClose,
  currentSlug,
}) => {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [telegramId, setTelegramId] = useState<number | string | undefined>(undefined)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setSuccess(false)
      setErrorMessage(null)
      // Check if inside Telegram WebApp
      try {
        const tg = (window as any).Telegram?.WebApp
        if (tg?.initDataUnsafe?.user) {
          const u = tg.initDataUnsafe.user
          const fullName = [u.first_name, u.last_name].filter(Boolean).join(' ')
          if (fullName) setName(fullName)
          if (u.username) setContact(`@${u.username}`)
          if (u.id) setTelegramId(u.id)
        }
      } catch (e) {
        console.warn('Could not read Telegram WebApp user context:', e)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !contact.trim()) {
      setErrorMessage('Iltimos, ismingiz va telefon yoki Telegram profilingizni kiriting')
      return
    }

    try {
      setSubmitting(true)
      setErrorMessage(null)
      await api.requestFreeVip({
        name: name.trim(),
        contact: contact.trim(),
        telegramId,
        source: (window as any).Telegram?.WebApp?.initData ? 'mini_app' : 'website',
        slug: currentSlug,
      })
      setSuccess(true)
    } catch (err: any) {
      setErrorMessage(err.message || 'So‘rovni yuborishda xatolik yuz berdi. Iltimos qaytadan urinib ko‘ring.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-bold block">
                Bir martalik so‘rov
              </span>
              <h3 className="text-lg font-serif-cormorant font-bold text-stone-900">
                Admindan bepul VIP so‘rash
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                Agar siz <strong>Premium VIP</strong> tarifini (barcha 21 ta hashamatli shablonlar, fon musiqasi va cheksiz muddat) bepul sinab ko‘rmoqchi bo‘lsangiz, adminga bir martalik so‘rov yuborishingiz mumkin.
              </p>

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2 text-xs text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Ismingiz *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Davron"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Telefon raqamingiz yoki Telegram username *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: +998 90 123 45 67 yoki @foydalanuvchi"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900"
                />
                <span className="text-[11px] text-stone-400 mt-1 block">
                  Admin javob berishi bilan shu raqam yoki profilingiz orqali xabar yetkaziladi.
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Adminga so‘rov yuborish</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif-cormorant font-bold text-stone-900">
                So‘rovingiz adminga yuborildi!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                Admin Telegram botida sizning so‘rovingizni ko‘rib chiqmoqda. Admin <strong>«Ha»</strong> tugmasini bosishi bilanoq sizga xabar beriladi va barcha Premium imkoniyatlar ochiladi!
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 rounded-full bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Tushundim, yopish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
