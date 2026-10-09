import React, { useState, useEffect } from 'react'
import { TemplateProps } from './types'
import { RsvpForm } from '../components/RsvpForm'
import { MusicPlayer } from '../components/MusicPlayer'
import { MapPin, Navigation, Calendar, Clock, Heart, ChevronDown, Send, MessageSquare } from 'lucide-react'

export const PalaceRomance: React.FC<TemplateProps> = ({ invitation, onRsvpSubmitted }) => {
  const [showRsvpModal, setShowRsvpModal] = useState(false)
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(true)

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date(`${invitation.weddingDate}T${invitation.weddingTime}:00`)
    
    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [invitation.weddingDate, invitation.weddingTime])

  // Parse Date parts
  const dateObj = new Date(invitation.weddingDate)
  const dayStr = String(dateObj.getDate() || 28).padStart(2, '0')
  const monthStr = String((dateObj.getMonth() + 1) || 6).padStart(2, '0')
  const yearStr = String(dateObj.getFullYear() || 2026)
  const formattedDate = `${dayStr}.${monthStr}.${yearStr}`

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative min-h-screen bg-stone-50 font-sans text-stone-800 antialiased selection:bg-amber-100 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-stone-200">
      
      {/* ============================================================ */}
      {/* SCREEN 1: HERO COVER (MARKER IDENTICAL TO CENTER PHONE)       */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-between p-6 pb-12 overflow-hidden text-center bg-cover bg-center select-none"
        style={{
          backgroundImage: `url('/templates/palace-terrace.jpg')`,
        }}
      >
        {/* Soft atmospheric gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/10 via-transparent to-stone-900/20 pointer-events-none" />

        {/* Top Header: "Nikoh kuni" & Date */}
        <div className="relative z-10 pt-10 sm:pt-14 space-y-1 animate-fade-in">
          <h2 className="font-['Alex_Brush',_cursive] text-4xl sm:text-5xl text-stone-800 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] tracking-wide">
            Nikoh kuni
          </h2>
          <p className="font-['Playfair_Display',_serif] text-base sm:text-lg tracking-widest text-stone-700/90 font-medium">
            {formattedDate}
          </p>
        </div>

        {/* Center: Groom & Bride Names in Luxury Calligraphy */}
        <div className="relative z-10 my-auto py-8 space-y-2">
          <h1 className="font-['Alex_Brush',_cursive] text-6xl sm:text-7xl text-stone-900 drop-shadow-[0_3px_6px_rgba(255,255,255,0.9)] leading-tight">
            {invitation.groomName}
          </h1>
          <div className="font-['Playfair_Display',_serif] italic text-3xl sm:text-4xl text-amber-900/70 font-light my-1">
            &
          </div>
          <h1 className="font-['Alex_Brush',_cursive] text-6xl sm:text-7xl text-stone-900 drop-shadow-[0_3px_6px_rgba(255,255,255,0.9)] leading-tight">
            {invitation.brideName}
          </h1>
        </div>

        {/* Bottom Navigation Badge: "Pastga suring ↓" */}
        <div className="relative z-10 pb-4">
          <button
            onClick={scrollToNext}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-amber-50/80 hover:bg-amber-100/90 backdrop-blur-md border border-amber-200/70 text-stone-700 text-xs sm:text-sm font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95 animate-bounce cursor-pointer"
          >
            <span>Pastga suring</span>
            <ChevronDown className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        {/* Floating music player bottom-right button */}
        <div className="absolute bottom-6 right-6 z-20">
          <MusicPlayer musicUrl={invitation.musicUrl} />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SCREEN 2: TO'YIMIZ VAQTI & ENVELOPE (RIGHT PHONE)            */}
      {/* ============================================================ */}
      <section className="relative py-14 px-6 bg-gradient-to-b from-sky-50/40 via-white to-sky-50/30 text-center">
        {/* Title */}
        <div className="space-y-1 mb-8">
          <h2 className="font-['Alex_Brush',_cursive] text-4xl sm:text-5xl text-stone-800">
            To‘yimiz vaqti
          </h2>
          <p className="text-xs tracking-wider text-sky-700/80 font-medium">
            ✦ Ko‘rish uchun ustiga bosing ✦
          </p>
        </div>

        {/* 3 Date Cards: KUN, OY, YIL */}
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-8">
          {/* Day */}
          <div className="bg-sky-50/80 border border-sky-100/90 rounded-2xl p-4 shadow-sm hover:shadow transition-all group">
            <span className="block font-['Playfair_Display',_serif] text-3xl font-bold text-stone-800 group-hover:scale-105 transition-transform">
              {dayStr}
            </span>
            <span className="block text-[10px] tracking-widest text-sky-600/70 font-semibold mt-1">
              KUN
            </span>
          </div>

          {/* Month */}
          <div className="bg-sky-50/80 border border-sky-100/90 rounded-2xl p-4 shadow-sm hover:shadow transition-all group">
            <span className="block font-['Playfair_Display',_serif] text-3xl font-bold text-stone-800 group-hover:scale-105 transition-transform">
              {monthStr}
            </span>
            <span className="block text-[10px] tracking-widest text-sky-600/70 font-semibold mt-1">
              OY
            </span>
          </div>

          {/* Year */}
          <div className="bg-sky-50/80 border border-sky-100/90 rounded-2xl p-4 shadow-sm hover:shadow transition-all group">
            <span className="block font-['Playfair_Display',_serif] text-3xl font-bold text-stone-800 group-hover:scale-105 transition-transform">
              {yearStr}
            </span>
            <span className="block text-[10px] tracking-widest text-sky-600/70 font-semibold mt-1">
              YIL
            </span>
          </div>
        </div>

        {/* Hand-drawn Twin Hearts */}
        <div className="flex items-center justify-center gap-1.5 text-sky-400 mb-6">
          <span className="text-2xl font-light">♡</span>
          <span className="text-xl font-light -mt-2">♡</span>
        </div>

        {/* Interactive Envelope & Letter */}
        <div 
          onClick={() => setIsEnvelopeOpen(!isEnvelopeOpen)}
          className="relative max-w-sm mx-auto bg-gradient-to-b from-sky-100/70 to-sky-200/50 p-6 pt-10 rounded-3xl border border-sky-200/60 shadow-lg cursor-pointer group transition-all duration-300 hover:shadow-xl"
        >
          {/* Envelope Flap graphic */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-t-[35px] border-t-sky-200/90" />

          {/* Inner Letter Card */}
          <div className={`bg-white rounded-2xl p-6 shadow-md border border-sky-100 transition-all duration-500 text-center space-y-4 ${
            isEnvelopeOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'
          }`}>
            <h3 className="font-['Alex_Brush',_cursive] text-3xl sm:text-4xl text-stone-800">
              Assalomu alaykum
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              {invitation.invitationMessage ||
                'Sizni hayotimizdagi eng baxtiyor kun — nikoh to‘yimizga bag‘ishlangan tantanali kechaning aziz mehmoni bo‘lishga taklif etamiz.'}
            </p>

            {/* Parents Info if available */}
            {(invitation.groomParents || invitation.brideParents) && (
              <div className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-500">
                {invitation.groomParents && (
                  <p><span className="font-semibold text-stone-700">Kuyov ota-onasi:</span> {invitation.groomParents}</p>
                )}
                {invitation.brideParents && (
                  <p><span className="font-semibold text-stone-700">Kelin ota-onasi:</span> {invitation.brideParents}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SCREEN 3: COUNTDOWN ("TO'YIMIZGACHA")                         */}
      {/* ============================================================ */}
      <section className="py-12 px-6 bg-white text-center border-t border-stone-100">
        <h2 className="font-['Alex_Brush',_cursive] text-4xl sm:text-5xl text-stone-800 mb-6">
          To‘yimizgacha
        </h2>

        {/* Large Digits Display: 36 : 11 : 15 : 19 */}
        <div className="max-w-xs mx-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-3xl sm:text-4xl font-['Playfair_Display',_serif] font-bold text-stone-800 tracking-wider">
            <span>{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-stone-400 font-light">:</span>
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-stone-400 font-light">:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-stone-400 font-light">:</span>
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>

          {/* Sub-labels: Kun Soat Daqiqa Soniya */}
          <div className="grid grid-cols-4 text-center mt-2 text-[10px] sm:text-xs text-stone-500 font-medium tracking-wide">
            <span>Kun</span>
            <span>Soat</span>
            <span>Daqiqa</span>
            <span>Soniya</span>
          </div>

          {/* Single Heart icon */}
          <div className="mt-8 text-stone-400 text-2xl font-light">
            ♡
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SCREEN 4: MEHMONLAR TILAKLARI & RSVP (LEFT PHONE)             */}
      {/* ============================================================ */}
      <section className="py-12 px-6 bg-stone-50/60 text-center border-t border-stone-100">
        {/* Banquet Candle Image Header */}
        <div className="max-w-sm mx-auto mb-6 overflow-hidden rounded-2xl shadow-md border border-stone-200/60">
          <img
            src="/templates/wedding-banquet.jpg"
            alt="Ziyofat dasturxoni"
            className="w-full h-44 object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Heading */}
        <div className="space-y-2 mb-6">
          <h2 className="font-['Alex_Brush',_cursive] text-4xl sm:text-5xl text-stone-800">
            Mehmonlar tilaklari
          </h2>
          <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
            Samimiy tilaklaringizni bildirish uchun pastdagi tugmani bosing
          </p>
        </div>

        {/* "Tilak bildirish" Rounded Pill Button */}
        <button
          onClick={() => setShowRsvpModal(true)}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-medium text-sm shadow-md shadow-sky-400/30 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Tilak bildirish</span>
        </button>

        {/* Existing Guest Wishes List */}
        {invitation.rsvps && invitation.rsvps.length > 0 && (
          <div className="mt-8 max-w-sm mx-auto space-y-3 text-left">
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider text-center mb-3">
              Yuborilgan tilaklar ({invitation.rsvps.length})
            </h4>
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {invitation.rsvps.map((rsvp) => (
                <div
                  key={rsvp.id}
                  className="bg-white p-3.5 rounded-xl border border-stone-200/70 shadow-sm text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-800">{rsvp.guestName}</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                      {rsvp.attendance === 'ATTENDING' ? 'Tashrif buyuradi' : 'Borolmaydi'}
                    </span>
                  </div>
                  {rsvp.note && (
                    <p className="text-stone-600 italic">"{rsvp.note}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* SCREEN 5: MANZIL VA LOKATSIYA                                */}
      {/* ============================================================ */}
      <section className="py-12 px-6 bg-white text-center border-t border-stone-100 space-y-4">
        <div className="inline-flex p-3 rounded-full bg-sky-50 text-sky-600">
          <MapPin className="w-6 h-6" />
        </div>

        <h3 className="font-['Playfair_Display',_serif] text-2xl font-bold text-stone-800">
          {invitation.venueName}
        </h3>

        <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
          {invitation.venueAddress}
        </p>

        <div className="flex items-center justify-center gap-2 text-xs font-medium text-stone-600 pt-1">
          <Clock className="w-4 h-4 text-sky-500" />
          <span>Boshlanish vaqti: {invitation.weddingTime}</span>
        </div>

        {invitation.mapUrl && (
          <div className="pt-3">
            <a
              href={invitation.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-all shadow active:scale-95 cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>Xaritada ochish (Google / Yandex)</span>
            </a>
          </div>
        )}
      </section>

      {/* Footer watermark */}
      <footer className="py-8 bg-stone-100 text-center text-[11px] text-stone-400 border-t border-stone-200/60">
        <p className="font-['Alex_Brush',_cursive] text-2xl text-stone-500 mb-1">
          {invitation.groomName} & {invitation.brideName}
        </p>
        <p>Baxtimizga sherik bo‘lganingiz uchun rahmat!</p>
      </footer>

      {/* ============================================================ */}
      {/* RSVP MODAL POPUP                                             */}
      {/* ============================================================ */}
      {showRsvpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-stone-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowRsvpModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center hover:bg-stone-200 transition-colors cursor-pointer text-lg"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <h3 className="font-['Alex_Brush',_cursive] text-4xl text-stone-800">
                Tilak bildirish
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Yosh oilaga samimiy tabriklaringizni yo‘llang
              </p>
            </div>
            <RsvpForm
              slug={invitation.publicSlug}
              themeVariant="light"
              onSubmitted={() => {
                if (onRsvpSubmitted) onRsvpSubmitted()
                setShowRsvpModal(false)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
