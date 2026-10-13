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
import { Share2, Sparkles, Gem, Heart } from 'lucide-react'
import confetti from 'canvas-confetti'

export const BlackTie: React.FC<TemplateProps> = ({
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
      colors: ['#e5c17d', '#c9a86a', '#ffffff', '#ffd700'],
    })
    if (onRsvpSubmitted) onRsvpSubmitted()
  }

  const galleryPhotos = [
    { url: '/templates/black-tie.jpg', caption: 'VIP Gala Night' },
    { url: '/templates/wedding-banquet.jpg', caption: 'Kristal qadahlar' },
    { url: '/templates/palace-terrace.jpg', caption: 'Oqshom manzarasi' },
  ]

  return (
    <div className="min-h-screen bg-[#0d0d11] text-[#f4efe6] selection:bg-[#c9a86a]/30 font-serif-cormorant relative py-12 px-4 sm:px-6 overflow-hidden">
      {/* Floating Golden Stars & Sparkles */}
      <FloatingParticles type="gold-sparkles" count={22} />

      {/* Floating Love Reaction */}
      <FloatingLoveReaction invitationId={invitation.id || invitation.publicSlug} />

      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#c9a86a]/15 rounded-full blur-[140px] pointer-events-none animate-pulse-gentle" />

      {/* Top action bar */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8 relative z-10">
        <MusicPlayer musicUrl={invitation.musicUrl} title="VIP Oqshom Simfoniyasi" darkTheme />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-[#e5c17d] hover:border-[#e5c17d] transition-all shadow-md cursor-pointer active:scale-95"
          title="Ulashish"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Card Container */}
      <div className="max-w-3xl mx-auto bg-[#14141a]/95 backdrop-blur-xl rounded-3xl p-6 sm:p-14 border border-[#e5c17d]/40 shadow-2xl relative z-10">
        {/* Geometric corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#e5c17d]/60" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#e5c17d]/60" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#e5c17d]/60" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#e5c17d]/60" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3.5 rounded-full bg-[#1c1c24] border border-[#e5c17d]/50 text-[#e5c17d] mb-4 shadow-lg animate-float-gentle">
            <Gem className="w-7 h-7 text-[#e5c17d]" />
          </div>
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-[#c9a86a] font-bold">
            {invitation.coverTitle || 'VIP Wedding Gala'}
          </p>
        </div>

        {/* Hero Scenery Photo with Ken Burns slow zoom */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-48 sm:h-64 shadow-2xl border border-[#e5c17d]/30 group">
          <div
            className="absolute inset-0 bg-cover bg-center animate-ken-burns transform scale-105"
            style={{ backgroundImage: `url('/templates/black-tie.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end justify-center p-6 text-center">
            <span className="text-[#f4efe6] text-sm sm:text-base font-serif-cormorant italic tracking-wider drop-shadow-md">
              "Yuksak hashamat va kinematik oqshom shukuhi"
            </span>
          </div>
        </div>

        {/* Names */}
        <div className="text-center my-8 space-y-3">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide text-white uppercase font-display-playfair break-words animate-gold-sheen">
            {invitation.groomName}
          </h1>
          <div className="flex items-center justify-center gap-3 my-2 text-[#e5c17d]">
            <span className="w-10 h-px bg-[#e5c17d]/40" />
            <Heart className="w-5 h-5 text-[#e5c17d] fill-[#e5c17d]/30 animate-heartbeat" />
            <span className="w-10 h-px bg-[#e5c17d]/40" />
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide text-white uppercase font-display-playfair break-words animate-gold-sheen">
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

        {/* Date & Time */}
        <div className="text-center my-8">
          <DateBadge
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            borderClass="border-[#e5c17d]/50 bg-[#1c1c24]"
            textClass="text-[#f4efe6]"
          />
        </div>

        {/* Countdown */}
        <div className="my-10 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c9a86a] font-mono block mb-3 font-semibold">
            Kutilayotgan fursat
          </span>
          <CountdownTimer
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            variant="dark"
          />
        </div>

        {/* Photo Gallery */}
        <StoryPhotoGallery photos={galleryPhotos} cardClass="bg-[#1c1c24] border-[#e5c17d]/30 text-stone-200" />

        {/* Parents Section */}
        <ParentsSection
          groomParents={invitation.groomParents}
          brideParents={invitation.brideParents}
          textClass="text-stone-300"
        />

        {/* Venue Info with Radar Pin */}
        <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#1c1c24] border border-[#e5c17d]/30 shadow-inner">
          <VenueInfo
            venueName={invitation.venueName}
            venueAddress={invitation.venueAddress}
            mapUrl={invitation.mapUrl}
            themeClass="text-[#f4efe6]"
            buttonClass="bg-gradient-to-r from-[#e5c17d] to-[#c9a86a] text-stone-950 font-bold hover:brightness-105 shadow-md"
          />
        </div>

        {/* Dress Code */}
        {invitation.dressCode && (
          <div className="my-8 text-center text-xs font-mono text-[#e5c17d] bg-[#1c1c24] p-4 rounded-xl border border-[#e5c17d]/30">
            <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
            <span className="text-stone-200">{invitation.dressCode}</span>
          </div>
        )}

        {/* Program Timeline */}
        <ProgramTimeline
          programJson={invitation.programJson}
          cardClass="bg-[#1c1c24] border border-[#e5c17d]/30 text-stone-200"
          dotClass="bg-[#e5c17d]"
        />

        {/* RSVP Form */}
        {!isPreview && (
          <div className="my-10 p-6 sm:p-8 bg-[#1c1c24] rounded-3xl border border-[#e5c17d]/30">
            <div className="text-center mb-6">
              <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-white">
                Ishtirokni tasdiqlash
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Kechamizda sizni kutamiz
              </p>
            </div>
            <RsvpForm
              slug={invitation.publicSlug}
              themeVariant="dark"
              onSubmitted={handleRsvpSuccess}
            />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-6 border-t border-stone-800">
          <p className="text-xs uppercase tracking-widest text-stone-400 font-mono">
            Tashrifingiz oqshomimizga fayz bag‘ishlaydi
          </p>
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
