import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { CheckCircle2, User, Users, HeartHandshake, Send, XCircle } from 'lucide-react'
import { api } from '../services/api'

interface RsvpFormProps {
  slug: string
  themeVariant?: 'gold' | 'dark' | 'light' | 'rose'
  className?: string
  onSubmitted?: () => void
}

export const RsvpForm: React.FC<RsvpFormProps> = ({
  slug,
  themeVariant = 'gold',
  className = '',
  onSubmitted,
}) => {
  const [guestName, setGuestName] = useState('')
  const [attendance, setAttendance] = useState<'ATTENDING' | 'NOT_ATTENDING'>('ATTENDING')
  const [guestCount, setGuestCount] = useState<number>(1)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName.trim()) {
      setError('Iltimos, ismingizni kiriting')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await api.submitRsvp(slug, {
        guestName: guestName.trim(),
        attendance,
        guestCount: attendance === 'ATTENDING' ? guestCount : 0,
        note: note.trim() || undefined,
      })

      setSuccess(true)
      if (attendance === 'ATTENDING') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        })
      }
      if (onSubmitted) onSubmitted()
    } catch (err: any) {
      setError(err.message || 'Javobni yuborishda xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  const isDark = themeVariant === 'dark' || themeVariant === 'gold'

  if (success) {
    return (
      <div
        className={`p-6 sm:p-8 rounded-3xl text-center backdrop-blur-md transition-all ${
          isDark
            ? 'bg-stone-900/80 border border-amber-500/30 text-amber-100'
            : 'bg-white/95 border border-stone-200 text-stone-800 shadow-xl'
        } ${className}`}
      >
        <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-xl sm:text-2xl font-serif-cormorant font-bold mb-2">
          Tashakkur, {guestName}!
        </h4>
        <p className="text-sm opacity-80 max-w-md mx-auto">
          {attendance === 'ATTENDING'
            ? 'Javobingiz qabul qilindi. To‘yimizda sizni kutib qolamiz!'
            : 'Xabaringiz qabul qilindi. E’tiboringiz va tilaklaringiz uchun rahmat!'}
        </p>
      </div>
    )
  }

  return (
    <div
      className={`p-6 sm:p-8 rounded-3xl backdrop-blur-md transition-all ${
        isDark
          ? 'bg-stone-900/70 border border-stone-700/60 text-stone-100'
          : 'bg-white/95 border border-stone-200 text-stone-800 shadow-xl'
      } ${className}`}
    >
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-widest uppercase text-amber-500/90 mb-1 block">
          Ishtirokni tasdiqlash
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif-cormorant font-bold">
          To‘yda ishtirok etasizmi?
        </h3>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Iltimos, tashrifingiz haqida oldindan ma’lum qiling
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Attendance choice */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAttendance('ATTENDING')}
            className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all border ${
              attendance === 'ATTENDING'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                : isDark
                ? 'bg-stone-800/60 border-stone-700 text-stone-400 hover:text-stone-200'
                : 'bg-stone-100 border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Albatta boraman</span>
          </button>

          <button
            type="button"
            onClick={() => setAttendance('NOT_ATTENDING')}
            className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all border ${
              attendance === 'NOT_ATTENDING'
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-sm'
                : isDark
                ? 'bg-stone-800/60 border-stone-700 text-stone-400 hover:text-stone-200'
                : 'bg-stone-100 border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Bora olmayman</span>
          </button>
        </div>

        {/* Guest Name */}
        <div>
          <label className="block text-xs font-medium text-stone-400 mb-1.5 text-left">
            Ism va familiyangiz *
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400 pointer-events-none" />
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Masalan: Dilshod Qosimov"
              className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm border transition-colors outline-none ${
                isDark
                  ? 'bg-stone-800/80 border-stone-700 text-stone-100 placeholder-stone-500 focus:border-amber-500'
                  : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-stone-500'
              }`}
            />
          </div>
        </div>

        {/* Guest count (if attending) */}
        {attendance === 'ATTENDING' && (
          <div>
            <label className="block text-xs font-medium text-stone-400 mb-1.5 text-left">
              Necha kishi bo‘lib kelasiz?
            </label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400 pointer-events-none" />
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm border transition-colors outline-none appearance-none ${
                  isDark
                    ? 'bg-stone-800/80 border-stone-700 text-stone-100 focus:border-amber-500'
                    : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-stone-500'
                }`}
              >
                <option value={1}>1 kishi (yakka o‘zim)</option>
                <option value={2}>2 kishi (turmush o‘rtog‘im bilan)</option>
                <option value={3}>3 kishi (oila bilan)</option>
                <option value={4}>4 kishi</option>
                <option value={5}>5 kishi va undan ko‘proq</option>
              </select>
            </div>
          </div>
        )}

        {/* Note / Wishes */}
        <div>
          <label className="block text-xs font-medium text-stone-400 mb-1.5 text-left">
            Kelin-kuyovga samimiy tilaklaringiz (ixtiyoriy)
          </label>
          <div className="relative">
            <HeartHandshake className="w-4 h-4 absolute left-3.5 top-3 text-stone-400 pointer-events-none" />
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ezgu tilaklaringizni yozib qoldirishingiz mumkin..."
              className={`w-full pl-10 pr-4 py-2 rounded-2xl text-sm border transition-colors outline-none resize-none ${
                isDark
                  ? 'bg-stone-800/80 border-stone-700 text-stone-100 placeholder-stone-500 focus:border-amber-500'
                  : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-stone-500'
              }`}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <span className="animate-spin inline-block w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Javobni yuborish</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
