import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Sparkles } from 'lucide-react'

export const PricingPage: React.FC = () => {
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
                <span className="text-4xl font-serif-cormorant font-bold text-amber-400">99,000</span>
                <span className="text-stone-400 text-sm">so‘m / bir martalik</span>
              </div>
              <p className="text-xs text-stone-400 mb-6">
                Barcha 20 ta hashamatli shablon, musiqa, jonli RSVP va maxsus effektlar.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Barcha 20 ta premium va milliy shablonlar</span>
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
                  <span>Maxsus ranglar va shriftlar</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Reklamasiz, toza premium havola</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                to="/create"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center transition-all shadow-lg shadow-amber-500/20"
              >
                Premium taklifnoma yaratish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
