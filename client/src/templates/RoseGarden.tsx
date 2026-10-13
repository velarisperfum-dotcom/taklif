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
import { Share2, Heart, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

export const RoseGarden: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  const handleRsvpSuccess = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#ffffff'],
    })
    if (onRsvpSubmitted) onRsvpSubmitted()
  }

  const galleryPhotos = [
    { url: '/templates/rose-garden.jpg', caption: 'Atirgullar ifori' },
    { url: '/templates/palace-terrace.jpg', caption: 'Romantik bog‘' },
    { url: '/templates/wedding-banquet.jpg', caption: 'Muhabbat ziyofati' },
  ]

  return (
    <div className="min-h-screen bg-[#fff4f6] text-[#4a2e35] font-serif-cormorant relative py-12 px-4 sm:px-6 overflow-hidden">
      {/* Floating Animated Falling Rose Petals */}
      <FloatingParticles type="petals" count={26} />

      {/* Floating Interactive Love Reaction */}
      <FloatingLoveReaction invitationId={invitation.id || invitation.publicSlug} />

      {/* Soft rose petal ambient glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-gentle" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-gentle" />

      {/* Top action bar */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6 relative z-10">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Atirgullar valsi" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white/90 border border-rose-200 text-rose-500 hover:bg-rose-50 shadow-md cursor-pointer active:scale-95 transition-all"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Card Container */}
      <div className="max-w-3xl mx-auto bg-white/95 rounded-3xl p-6 sm:p-12 border-2 border-rose-200/80 shadow-2xl relative z-10">
        <div className="border border-rose-100 rounded-2xl p-6 sm:p-10 relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-50 text-rose-500 mb-2 border border-rose-200 shadow-sm animate-float-gentle">
              <Heart className="w-7 h-7 fill-rose-500/20 text-rose-500 animate-heartbeat" />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-600 font-sans font-bold">
              {invitation.coverTitle || 'Muhabbat To‘yi'}
            </p>
          </div>

          {/* Hero Scenery Photo with Ken Burns slow zoom */}
          <div className="relative rounded-2xl overflow-hidden mb-8 h-48 sm:h-64 shadow-xl border border-rose-200 group">
            <div
              className="absolute inset-0 bg-cover bg-center animate-ken-burns transform scale-105"
              style={{ backgroundImage: `url('/templates/rose-garden.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex items-end justify-center p-6 text-center">
              <span className="text-white text-sm sm:text-base font-serif-cormorant italic tracking-wider drop-shadow-md">
                "Atirgullar ifori va abadiy sevgi qasri"
              </span>
            </div>
          </div>

          {/* Couple Names */}
          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-rose-950 font-display-playfair break-words hover:scale-105 transition-transform duration-500">
              {invitation.groomName}
            </h1>
            <p className="text-2xl sm:text-3xl text-rose-500 italic font-script-vibes my-2">va</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-rose-950 font-display-playfair break-words hover:scale-105 transition-transform duration-500">
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

          {/* Date and Time Badge */}
          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-rose-200 bg-rose-50/70"
              textClass="text-rose-950"
            />
          </div>

          {/* Countdown Timer */}
          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-rose-600 font-sans font-bold block mb-3">
              To‘yga qolgan vaqt
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant="rose"
            />
          </div>

          {/* Romantic Photo Gallery */}
          <StoryPhotoGallery photos={galleryPhotos} cardClass="bg-rose-50/60 border-rose-200 text-rose-950" />

          {/* Parents Section */}
          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-rose-900"
          />

          {/* Venue Info with Radar Pin */}
          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-rose-50/60 border border-rose-200 shadow-inner">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-rose-950"
              buttonClass="bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold hover:brightness-105 shadow-md"
            />
          </div>

          {/* Program Timeline */}
          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-rose-50/80 border border-rose-200 text-rose-950"
            dotClass="bg-rose-500"
          />

          {/* RSVP Form */}
          {!isPreview && (
            <div className="my-10 p-6 sm:p-8 bg-rose-50/40 rounded-3xl border border-rose-200">
              <div className="text-center mb-6">
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-rose-950">
                  Ishtirokni tasdiqlash
                </h3>
                <p className="text-xs text-rose-600 mt-1">
                  Kechamizda sizni kutamiz
                </p>
              </div>
              <RsvpForm
                slug={invitation.publicSlug}
                themeVariant="rose"
                onSubmitted={handleRsvpSuccess}
              />
            </div>
          )}

          <div className="text-center mt-10 pt-6 border-t border-rose-100">
            <p className="text-xs uppercase tracking-widest text-rose-600 font-sans font-semibold">
              Siz bilan birga ushbu kun yanada unutilmas bo‘ladi!
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
