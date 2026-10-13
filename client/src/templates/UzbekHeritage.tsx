import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection, StoryPhotoGallery } from './components/TemplateCommon'
import { FloatingParticles } from '../components/effects/FloatingParticles'
import { FloatingLoveReaction } from '../components/effects/FloatingLoveReaction'
import { InteractiveEnvelope } from '../components/effects/InteractiveEnvelope'
import { Share2, Heart } from 'lucide-react'
import confetti from 'canvas-confetti'

export const UzbekHeritage: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  const handleRsvpSuccess = () => {
    confetti({
      particleCount: 85,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#0e7c86', '#d4af37', '#ffd700', '#ffffff'],
    })
    if (onRsvpSubmitted) onRsvpSubmitted()
  }

  const galleryPhotos = [
    { url: '/templates/uzbek-heritage.jpg', caption: 'Sharqona nafislik' },
    { url: '/templates/royal-gold.jpg', caption: 'Zarhal naqshlar' },
    { url: '/templates/wedding-banquet.jpg', caption: 'To‘yona dasturxon' },
  ]

  return (
    <div className="min-h-screen bg-[#faf6ee] text-[#1e2a2d] font-serif-cormorant relative py-12 px-4 sm:px-6 overflow-hidden">
      {/* Floating Golden Particles */}
      <FloatingParticles type="gold-sparkles" count={22} />

      {/* Floating Love Reaction */}
      <FloatingLoveReaction invitationId={invitation.id || invitation.publicSlug} />

      {/* Uzbek Islimiy geometric background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#0e7c86]/15 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-gentle" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#d4af37]/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-gentle" />

      {/* Top action bar */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6 relative z-10">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Milliy to‘y taronalari" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white border border-[#0e7c86]/30 text-[#0e7c86] hover:bg-[#0e7c86] hover:text-white transition-all shadow-md cursor-pointer active:scale-95"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-12 border-2 border-[#0e7c86]/40 shadow-2xl relative z-10">
        {/* Oriental Arch outline */}
        <div className="border border-[#d4af37]/60 rounded-2xl p-6 sm:p-10 relative">
          {/* Top arch emblem */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#0e7c86] bg-gradient-to-br from-[#f0f9fa] to-[#e0f4f6] text-[#0e7c86] text-2xl font-bold shadow-md mb-2 animate-float-gentle">
              ﷽
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#0e7c86] font-sans font-bold">
              {invitation.coverTitle || 'To‘y Oqshomi'}
            </p>
          </div>

          {/* Hero Scenery Photo with Ken Burns slow zoom */}
          <div className="relative rounded-2xl overflow-hidden mb-8 h-48 sm:h-64 shadow-xl border border-[#0e7c86]/30 group">
            <div
              className="absolute inset-0 bg-cover bg-center animate-ken-burns transform scale-105"
              style={{ backgroundImage: `url('/templates/uzbek-heritage.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/25 to-transparent flex items-end justify-center p-6 text-center">
              <span className="text-white text-sm sm:text-base font-serif-cormorant italic tracking-wider drop-shadow-md">
                "An’anaviy sharqona nafosat va milliy qadriyatlar shukuhi"
              </span>
            </div>
          </div>

          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#0e3b43] font-display-playfair break-words hover:scale-105 transition-transform duration-500 animate-gold-sheen">
              {invitation.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-2 text-[#d4af37]">
              <span className="w-12 h-px bg-[#d4af37]/60" />
              <Heart className="w-5 h-5 text-[#0e7c86] fill-[#0e7c86]/20 animate-heartbeat" />
              <span className="w-12 h-px bg-[#d4af37]/60" />
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#0e3b43] font-display-playfair break-words hover:scale-105 transition-transform duration-500 animate-gold-sheen">
              {invitation.brideName}
            </h1>
          </div>

          {/* Interactive Envelope */}
          <InteractiveEnvelope
            groomName={invitation.groomName}
            brideName={invitation.brideName}
            weddingDate={invitation.weddingDate}
            invitationMessage={invitation.invitationMessage}
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            defaultOpen={true}
          />

          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-[#0e7c86]/40 bg-[#f0f9fa]"
              textClass="text-[#0e3b43]"
            />
          </div>

          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#0e7c86] font-sans font-bold block mb-3">
              To‘yga qadar qolgan vaqt
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant="emerald"
            />
          </div>

          {/* Photo Gallery */}
          <StoryPhotoGallery photos={galleryPhotos} cardClass="bg-[#f0f9fa] border-[#0e7c86]/30 text-[#0e3b43]" />

          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-[#1e2a2d]"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#f0f9fa] border border-[#0e7c86]/30 shadow-inner">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#0e3b43]"
              buttonClass="bg-gradient-to-r from-[#0e7c86] to-[#0a5860] text-white font-bold hover:brightness-105 shadow-md"
            />
          </div>

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-[#f0f9fa] border border-[#0e7c86]/30 text-[#0e3b43]"
            dotClass="bg-[#0e7c86]"
          />

          {!isPreview && (
            <div className="my-10 p-6 sm:p-8 bg-[#f0f9fa] rounded-3xl border border-[#0e7c86]/30">
              <div className="text-center mb-6">
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#0e3b43]">
                  Ishtirokni tasdiqlash
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  To‘yona dasturxonimizda kutamiz
                </p>
              </div>
              <RsvpForm
                slug={invitation.publicSlug}
                themeVariant="light"
                onSubmitted={handleRsvpSuccess}
              />
            </div>
          )}

          <div className="text-center mt-10 pt-6 border-t border-[#d4af37]/40">
            <p className="text-xs uppercase tracking-widest text-[#0e7c86] font-sans font-semibold">
              Keling, ko‘ring, to‘yimizga fayz bering!
            </p>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        url={fullUrl}
        title={`${invitation.groomName} & ${invitation.brideName}`}
      />
    </div>
  )
}
