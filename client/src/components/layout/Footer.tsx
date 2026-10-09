import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Send, Phone, Mail, MapPin } from 'lucide-react'


export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-800 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Heart className="w-5 h-5 fill-amber-400/20 text-amber-400" />
              </div>
              <span className="font-serif-cormorant text-2xl font-bold tracking-widest text-white uppercase">
                Taklifnoma
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              O‘zbekistondagi eng chiroyli, nafis va unutilmas raqamli to‘y taklifnomalar platformasi. Har bir juftlik uchun o‘zgacha muhabbat hikoyasi.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-500 hover:text-stone-950 flex items-center justify-center transition-colors text-stone-300"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-500 hover:text-stone-950 flex items-center justify-center transition-colors text-stone-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-amber-400 mb-4 font-mono">
              Bo‘limlar
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors">Bosh sahifa</Link>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-amber-300 transition-colors">Barcha shablonlar</a>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-amber-300 transition-colors">Qanday ishlaydi?</a>
              </li>
              <li>
                <a href="/#pricing" className="hover:text-amber-300 transition-colors">Tariflar va narxlar</a>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-amber-300 transition-colors">Shaxsiy kabinet</Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-amber-400 mb-4 font-mono">
              To‘plamlar
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="/#gallery" className="hover:text-amber-300 transition-colors">Milliy kolleksiya (Suzani, Xonatlas)</a>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-amber-300 transition-colors">Luxury & Qirollik (Royal Gold)</a>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-amber-300 transition-colors">Minimalistik & Oq-qora</a>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-amber-300 transition-colors">Romantik gullar & Akvarel</a>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-amber-300 transition-colors">Kreativ (Tungi osmon, Kinematik)</a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-amber-400 mb-4 font-mono">
              Bog‘lanish
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-stone-400">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Toshkent shahri, O‘zbekiston</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-400">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>+998 71 200 00 00</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-400">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <span>info@taklifnoma.uz</span>
            </div>
            <div className="pt-2">
              <Link
                to="/create"
                className="inline-flex w-full justify-center items-center py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-colors"
              >
                Hozir yaratish
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Taklifnoma.uz — Barcha huquqlar himoyalangan.</p>
          <p className="flex items-center gap-1">
            Muhabbat bilan yaratilgan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> O‘zbekistonda
          </p>
        </div>
      </div>
    </footer>
  )
}
