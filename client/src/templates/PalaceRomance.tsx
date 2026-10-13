import React, { useState, useEffect } from 'react'
import { TemplateProps } from './types'
import { RsvpForm } from '../components/RsvpForm'
import { MusicPlayer } from '../components/MusicPlayer'
import { FloatingParticles } from '../components/effects/FloatingParticles'
import { FloatingLoveReaction } from '../components/effects/FloatingLoveReaction'
import { InteractiveEnvelope } from '../components/effects/InteractiveEnvelope'
import { StoryPhotoGallery } from './components/TemplateCommon'
import { MapPin, Navigation, Calendar, Clock, Heart, ChevronDown, Send, MessageSquare, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

export const PalaceRomance: React.FC<TemplateProps> = ({ invitation, onRsvpSubmitted }) => {
  const [showRsvpModal, setShowRsvpModal] = useState(false)

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

  const galleryPhotos = [
    { url: '/templates/palace-terrace.jpg', caption: 'Baxtli lahzalarimiz' },
    { url: '/templates/wedding-banquet.jpg', caption: 'Kutilayotgan tantana' },
    { url: '/templates/royal-gold.jpg', caption: 'Oqshom shukuhi' },
  ]

  const handleRsvpSuccess = () => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#d4af37', '#f43f5e', '#38bdf8', '#ffffff'],
    })
    if (onRsvpSubmitted) onRsvpSubmitted()
    setShowRsvpModal(false)
  }

  return (
    <div className="relative min-h-screen bg-stone-50 font-sans text-stone-800 antialiased selection:bg-amber-100 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-stone-200">
      {/* Floating Animated Golden Sparkles & Floating Particles */}
      <FloatingParticles type="gold-sparkles" count={22} />

      {/* Floating Love Reaction button (Yurak yuborish ❤️) */}
      <FloatingLoveReaction invitationId={invitation.id || invitation.publicSlug} />

      {/* ============================================================ */}
      {/* SCREEN 1: HERO COVER WITH KEN BURNS ANIMATION                */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-between p-6 pb-12 overflow-hidden text-center select-none">
        {/* Animated Background Image with Ken Burns slow zoom */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns transform scale-105"
          style={{
            backgroundImage: `url('/templates/palace-terrace.jpg')`,
          }}
        />

        {/* Soft atmospheric gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-stone-900/10 to-stone-900/35 pointer-events-none" />

        {/* Top Header: "Nikoh kuni" & Date */}
        <div className="relative z-10 pt-10 sm:pt-14 space-y-1 animate-float-gentle">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-stone-800 text-xs font-semibold mb-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Tantanali Taklifnoma</span>
          </div>
          <h2 className="font-['Alex_Brush',_cursive] text-4xl sm:text-5xl text-stone-800 drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] tracking-wide">
            Nikoh kuni
          </h2>
          <p className="font-['Playfair_Display',_serif] text-base sm:text-lg tracking-widest text-stone-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] font-semibold">
            {formattedDate}
          </p>
        </div>

        {/* Center: Groom & Bride Names in Luxury Calligraphy */}
        <div className="relative z-10 my-auto py-8 space-y-2">
          <h1 className="font-['Alex_Brush',_cursive] text-6xl sm:text-7xl text-stone-900 drop-shadow-[0_4px_8px_rgba(255,255,255,0.95)] leading-tight hover:scale-105 transition-transform duration-500">
            {invitation.groomName}
          </h1>

          {/* Pulsing Intertwined Beating Hearts */}
          <div className="flex items-center justify-center gap-3 my-2">
            <span className="w-10 h-0.5 bg-amber-400/80 shadow-sm" />
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-400 opacity-60 pointer-events-none" />
              <Heart className="w-7 h-7 text-amber-700 fill-amber-500/80 animate-heartbeat drop-shadow" />
            </div>
            <span className="w-10 h-0.5 bg-amber-400/80 shadow-sm" />
          </div>

          <h1 className="font-['Alex_Brush',_cursive] text-6xl sm:text-7xl text-stone-900 drop-shadow-[0_4px_8px_rgba(255,255,255,0.95)] leading-tight hover:scale-105 transition-transform duration-500">
            {invitation.brideName}
          </h1>
        </div>

        {/* Bottom Navigation Badge: "Pastga suring ↓" */}
        <div className="relative z-10 pb-4 flex flex-col items-center gap-4">
          <button
            onClick={scrollToNext}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-amber-50/90 hover:bg-amber-100 backdrop-blur-md border border-amber-300 text-stone-800 text-xs sm:text-sm font-semibold tracking-wide shadow-lg transition-all duration-300 active:scale-95 animate-bounce cursor-pointer"
          >
            <span>Pastga suring</span>
            <ChevronDown className="w-4 h-4 text-amber-700" />
          </button>
        </div>

        {/* Floating music player bottom-left button */}
        <div className="absolute bottom-6 left-6 z-20">
          <MusicPlayer musicUrl={invitation.musicUrl} title="Saroy sadosi" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SCREEN 2: TO'YIMIZ VAQTI & INTERACTIVE ENVELOPE CEREMONY      */}
      {/* ============================================================ */}
      <section className="relative py-14 px-6 bg-gradient-to-b from-sky-50/40 via-white to-amber-50/30 text-center border-t border-stone-200/50">
        {/* Title */}
        <div className="space-y-1 mb-8 animate-float-gentle">
          <h2 className="font-['Alex_Brush',_cursive] text-4xl sm:text-5xl text-stone-800">
            To‘yimiz vaqti
          </h2>
          <p className="text-xs tracking-wider text-amber-800 font-semibold">
            ✦ Ko‘rish uchun ustiga bosing ✦
          </p>
        </div>

        {/* 3 Date Cards: KUN, OY, YIL */}
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-8">
          {/* Day */}
          <div className="bg-white/80 border border-amber-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm">
            <span className="block font-['Playfair_Display',_serif] text-3xl font-bold text-stone-800 group-hover:text-amber-700 transition-colors">
              {dayStr}
            </span>
            <span className="block text-[10px] tracking-widest text-amber-700/80 font-bold mt-1">
              KUN
            </span>
          </div>

          {/* Month */}
          <div className="bg-white/80 border border-amber-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm">
            <span className="block font-['Playfair_Display',_serif] text-3xl font-bold text-stone-800 group-hover:text-amber-700 transition-colors">
              {monthStr}
            </span>
            <span className="block text-[10px] tracking-widest text-amber-700/80 font-bold mt-1">
              OY
            </span>
          </div>

          {/* Year */}
          <div className="bg-white/80 border border-amber-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm">
            <span className="block font-['Playfair_Display',_serif] text-3xl font-bold text-stone-800 group-hover:text-amber-700 transition-colors">
              {yearStr}
            </span>
            <span className="block text-[10px] tracking-widest text-amber-700/80 font-bold mt-1">
              YIL
            </span>
          </div>
        </div>

        {/* Interactive Luxury Envelope Ceremony */}
        <InteractiveEnvelope
          groomName={invitation.groomName}
          brideName={invitation.brideName}
          weddingDate={invitation.weddingDate}
          invitationMessage={invitation.invitationMessage}
          groomParents={invitation.groomParents}
          brideParents={invitation.brideParents}
          defaultOpen={true}
        />
      </section>

      {/* ============================================================ */}
      {/* SCREEN 3: COUNTDOWN ("TO'YIMIZGACHA")                         */}
      {/* ============================================================ */}
      <section className="py-14 px-6 bg-white text-center border-t border-stone-100">
        <h2 className="font-['Alex_Brush',_cursive] text-4xl sm:text-5xl text-stone-800 mb-6">
          To‘yimizgacha
        </h2>

        {/* Large Digits Display: 36 : 11 : 15 : 19 */}
        <div className="max-w-xs mx-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-3xl sm:text-4xl font-['Playfair_Display',_serif] font-bold text-stone-800 tracking-wider">
            <span className="p-3 bg-amber-50 rounded-2xl border border-amber-200/60 shadow-sm min-w-[58px]">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-amber-400 font-light animate-pulse">:</span>
            <span className="p-3 bg-amber-50 rounded-2xl border border-amber-200/60 shadow-sm min-w-[58px]">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-amber-400 font-light animate-pulse">:</span>
            <span className="p-3 bg-amber-50 rounded-2xl border border-amber-200/60 shadow-sm min-w-[58px]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-amber-400 font-light animate-pulse">:</span>
            <span className="p-3 bg-amber-50 rounded-2xl border border-amber-200/60 shadow-sm min-w-[58px]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>

          {/* Sub-labels: Kun Soat Daqiqa Soniya */}
          <div className="grid grid-cols-4 text-center mt-3 text-[10px] sm:text-xs text-amber-800/80 font-bold uppercase tracking-wide">
            <span>Kun</span>
            <span>Soat</span>
            <span>Daqiqa</span>
            <span>Soniya</span>
          </div>

          {/* Heart Beat Icon */}
          <div className="mt-8 flex justify-center">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500/20 animate-heartbeat" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SCREEN 4: PHOTO GALLERY SHOWCASE                             */}
      {/* ============================================================ */}
      <section className="py-12 px-6 bg-stone-100/60 border-t border-stone-200/60">
        <StoryPhotoGallery photos={galleryPhotos} />
      </section>

      {/* ============================================================ */}
      {/* SCREEN 5: MEHMONLAR TILAKLARI & RSVP                         */}
      {/* ============================================================ */}
      <section className="py-14 px-6 bg-white text-center border-t border-stone-100">
        {/* Banquet Candle Image Header with Hover Zoom */}
        <div className="max-w-sm mx-auto mb-6 overflow-hidden rounded-3xl shadow-lg border-2 border-amber-200 group">
          <img
            src="/templates/wedding-banquet.jpg"
            alt="Ziyofat dasturxoni"
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Heading */}
        <div className="space-y-2 mb-6">
          <h2 className="font-['Alex_Brush',_cursive] text-4xl sm:text-5xl text-stone-800">
            Mehmonlar tilaklari
          </h2>
          <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
            Samimiy tilaklaringizni bildirish va to‘yda ishtirok etishingizni tasdiqlash uchun bosing
          </p>
        </div>

        {/* "Tilak bildirish" Rounded Pill Button */}
        <button
          onClick={() => setShowRsvpModal(true)}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-sm shadow-xl shadow-amber-500/30 transition-all duration-300 active:scale-95 cursor-pointer group"
        >
          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <span>Tilak bildirish (RSVP)</span>
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
                  className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 shadow-sm text-xs space-y-1.5 transition-all hover:bg-amber-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800">{rsvp.guestName}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full font-semibold">
                      {rsvp.attendance === 'ATTENDING' ? 'Tashrif buyuradi' : 'Borolmaydi'}
                    </span>
                  </div>
                  {rsvp.note && (
                    <p className="text-stone-600 italic leading-relaxed">"{rsvp.note}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* SCREEN 6: MANZIL VA LOKATSIYA WITH RADAR PIN                 */}
      {/* ============================================================ */}
      <section className="py-14 px-6 bg-stone-50 text-center border-t border-stone-200/70 space-y-4">
        {/* Animated Radar Pin */}
        <div className="relative inline-flex items-center justify-center p-3 mb-1">
          <span className="absolute w-12 h-12 rounded-full bg-amber-400/20 animate-radar-ring pointer-events-none" />
          <span className="absolute w-8 h-8 rounded-full bg-amber-500/30 animate-ping pointer-events-none" />
          <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <MapPin className="w-6 h-6 text-stone-950 animate-bounce" />
          </div>
        </div>

        <h3 className="font-['Playfair_Display',_serif] text-2xl font-bold text-stone-800">
          {invitation.venueName}
        </h3>

        <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
          {invitation.venueAddress}
        </p>

        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-stone-700 pt-1">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>Boshlanish vaqti: {invitation.weddingTime}</span>
        </div>

        {invitation.mapUrl && (
          <div className="pt-3">
            <a
              href={invitation.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-xl active:scale-95 cursor-pointer group"
            >
              <Navigation className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
              <span>Xaritada ochish (Google / Yandex)</span>
            </a>
          </div>
        )}
      </section>

      {/* Footer watermark */}
      <footer className="py-10 bg-stone-100 text-center text-[11px] text-stone-400 border-t border-stone-200/80">
        <p className="font-['Alex_Brush',_cursive] text-3xl text-amber-800/80 mb-1">
          {invitation.groomName} & {invitation.brideName}
        </p>
        <p>Baxtimizga sherik bo‘lganingiz uchun rahmat!</p>
      </footer>

      {/* ============================================================ */}
      {/* RSVP MODAL POPUP WITH CELEBRATION CONFETTI                   */}
      {/* ============================================================ */}
      {showRsvpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-100 max-h-[90vh] overflow-y-auto">
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
              onSubmitted={handleRsvpSuccess}
            />
          </div>
        </div>
      )}
    </div>
  )
}
