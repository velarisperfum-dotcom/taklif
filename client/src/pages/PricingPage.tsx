import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Sparkles, Gift } from 'lucide-react'
import { RequestFreeVipModal } from '../components/RequestFreeVipModal'

export const PricingPage: React.FC = () => {
  const [freeVipOpen, setFreeVipOpen] = useState(false)

  return (
    <div className="min-h-screen bg-stone-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-700 block mb-2">
            Shaffof narxlar
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif-cormorant font-bold text-stone-900">
            Taklifnoma Narxlari va Tariflari
          </h1>
          <p className="text-sm text-stone-600 mt-3">
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
                Bepul yaratish
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
                <span className="text-4xl font-serif-cormorant font-bold text-amber-400">1,000</span>
                <span className="text-stone-400 text-sm">so‘m / bir martalik</span>
              </div>
              <p className="text-xs text-stone-400 mb-6">
                Barcha 21 ta hashamatli shablon, musiqa, jonli RSVP va maxsus effektlar.
              </p>

              {/* Payment Card Box */}
              <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
                <div className="text-amber-300 font-semibold flex items-center gap-1.5">
                  <span>💳 To‘lov kartasi (Uzcard / Humo):</span>
                </div>
                <div className="font-mono text-base tracking-wider text-white font-bold bg-stone-900/80 px-3 py-1.5 rounded-xl border border-stone-800 select-all">
                  5614 6814 2987 8998
                </div>
                <div className="text-[11px] text-stone-400">
                  Qabul qiluvchi: <span className="text-amber-200 font-medium">A. Z</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Barcha 21 ta premium va milliy shablonlar</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Fon musiqasi va maxsus audio pleyer</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Jonli RSVP hisoboti (mehmonlar soni kabinetda)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Telegram bot orqali avtomatik tasdiqlash</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Reklamasiz, toza premium havola</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 space-y-3">
              <Link
                to="/create"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center transition-all shadow-lg shadow-amber-500/20"
              >
                Premium taklifnoma yaratish (1,000 so‘m)
              </Link>

              <button
                type="button"
                onClick={() => setFreeVipOpen(true)}
                className="w-full py-3 rounded-full border border-amber-500/40 hover:bg-amber-500/10 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Gift className="w-4 h-4 text-amber-400" />
                <span>🎁 Admindan bepul VIP so‘rash</span>
              </button>
            </div>
          </div>
        </div>

        {/* Free VIP Modal */}
        <RequestFreeVipModal
          isOpen={freeVipOpen}
          onClose={() => setFreeVipOpen(false)}
        />
      </div>
    </div>
  )
}
