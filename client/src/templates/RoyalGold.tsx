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
import { Heart, Share2, Crown, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

export const RoyalGold: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  const handleRsvpSuccess = () => {
    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#ffd700', '#fff8dc', '#b8860b'],
    })
    if (onRsvpSubmitted) onRsvpSubmitted()
  }

  const galleryPhotos = [
    { url: '/templates/royal-gold.jpg', caption: 'Qirollik hashamati' },
    { url: '/templates/palace-terrace.jpg', caption: 'Qasr ayvoni' },
    { url: '/templates/wedding-banquet.jpg', caption: 'Zarhal dasturxon' },
  ]

  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#2c2720] selection:bg-[#d4af37]/30 selection:text-stone-900 font-serif-cormorant relative overflow-hidden py-10 px-4 sm:px-6">
      {/* Floating Golden Stardust & Sparkles */}
      <FloatingParticles type="gold-sparkles" count={24} />

      {/* Floating Live Reaction Love Button */}
      <FloatingLoveReaction invitationId={invitation.id || invitation.publicSlug} />

      {/* Background Animated Atmosphere */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-gentle" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#c5a059]/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-gentle" />

      {/* Top Header Controls */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6 relative z-10">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Qirollik oltin valsi" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white/90 border border-[#d4af37]/50 text-[#8c7335] hover:bg-[#d4af37] hover:text-white transition-all shadow-md cursor-pointer active:scale-95"
          title="Ulashish"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Luxury Frame */}
      <div className="max-w-3xl mx-auto bg-[#ffffff]/95 backdrop-blur-md rounded-3xl p-6 sm:p-12 border-2 border-[#d4af37]/50 shadow-2xl shadow-[#c5a059]/15 relative z-10">
        {/* Double inner gold border */}
        <div className="border border-[#d4af37]/40 rounded-2xl p-6 sm:p-10 relative">
          {/* Corner gold emblems */}
          <div className="absolute top-2 left-2 text-[#c5a059] opacity-80 text-sm animate-twinkle">✤</div>
          <div className="absolute top-2 right-2 text-[#c5a059] opacity-80 text-sm animate-twinkle">✤</div>
          <div className="absolute bottom-2 left-2 text-[#c5a059] opacity-80 text-sm animate-twinkle">✤</div>
          <div className="absolute bottom-2 right-2 text-[#c5a059] opacity-80 text-sm animate-twinkle">✤</div>

          {/* Top Royal Crown Emblem */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#d4af37] bg-gradient-to-b from-[#fbf8f2] to-[#f4ecd8] text-[#c5a059] shadow-md mb-3 animate-float-gentle">
              <Crown className="w-8 h-8 text-[#b8860b]" />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#8c7335] font-sans font-bold">
              {invitation.coverTitle || 'Nikoh To‘yi Tantanasi'}
            </p>
          </div>

          {/* Hero Scenery Photo with Ken Burns slow zoom */}
          <div className="relative rounded-2xl overflow-hidden mb-8 h-48 sm:h-64 shadow-xl border border-[#d4af37]/40 group">
            <div
              className="absolute inset-0 bg-cover bg-center animate-ken-burns transform scale-105"
              style={{ backgroundImage: `url('/templates/royal-gold.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex items-end justify-center p-6 text-center">
              <span className="text-white text-sm sm:text-base font-serif-cormorant italic tracking-wider drop-shadow-md">
                "Ikki qalbning muqaddas rishtasi va yangi oila poydevori"
              </span>
            </div>
          </div>

          {/* Bride & Groom Names in Golden Shimmer */}
          <div className="text-center my-6 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1c1813] break-words hover:scale-105 transition-transform duration-500 animate-gold-sheen">
              {invitation.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-2 text-[#c5a059]">
              <span className="w-12 h-px bg-[#c5a059]/60" />
              <Heart className="w-6 h-6 fill-[#c5a059]/30 text-[#b8860b] animate-heartbeat" />
              <span className="w-12 h-px bg-[#c5a059]/60" />
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1c1813] break-words hover:scale-105 transition-transform duration-500 animate-gold-sheen">
              {invitation.brideName}
            </h1>
          </div>

          {/* Interactive Envelope Ceremony */}
          <InteractiveEnvelope
            groomName={invitation.groomName}
            brideName={invitation.brideName}
            weddingDate={invitation.weddingDate}
            invitationMessage={invitation.invitationMessage}
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            defaultOpen={true}
          />

          {/* Date & Time Badge */}
          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-[#d4af37]/60 bg-[#fbf8f2]"
              textClass="text-[#2c2720]"
            />
          </div>

          {/* Countdown Timer with Glowing Cards */}
          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8c7335] font-sans font-bold block mb-3">
              To‘y tantanasiga qadar
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant="gold"
            />
          </div>

          {/* Story Photo Gallery */}
          <StoryPhotoGallery photos={galleryPhotos} />

          {/* Parents Section */}
          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-[#4a4237]"
          />

          {/* Venue & Location with Radar Pin */}
          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#fbf8f2] border border-[#d4af37]/40 shadow-inner">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#2c2720]"
              buttonClass="bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-stone-950 font-bold hover:brightness-105 shadow-md"
            />
          </div>

          {/* Dress Code if provided */}
          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-sans text-[#8c7335] bg-[#fbf8f2] p-4 rounded-xl border border-[#d4af37]/30">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span className="font-medium">{invitation.dressCode}</span>
            </div>
          )}

          {/* Program Timeline */}
          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-[#fbf8f2] border border-[#d4af37]/40 text-[#2c2720]"
            dotClass="bg-[#c5a059]"
          />

          {/* RSVP Form with Confetti Trigger */}
          {!isPreview && (
            <div className="my-10 p-6 sm:p-8 bg-[#fbf8f2] rounded-3xl border border-[#d4af37]/30">
              <div className="text-center mb-6">
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-stone-900">
                  Ishtirokni tasdiqlash
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Kechamizda ishtirok etishingizni bildiring
                </p>
              </div>
              <RsvpForm
                slug={invitation.publicSlug}
                themeVariant="light"
                onSubmitted={handleRsvpSuccess}
              />
            </div>
          )}

          {/* Footer note */}
          <div className="text-center mt-10 pt-6 border-t border-[#d4af37]/30">
            <p className="text-xs uppercase tracking-widest text-[#8c7335] font-sans font-semibold">
              Tashrifingiz biz uchun katta sharafdir!
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
