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
import { Share2, Landmark, Heart } from 'lucide-react'
import confetti from 'canvas-confetti'

export const OrientalPalace: React.FC<TemplateProps> = ({
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
      colors: ['#e2b866', '#0ea5e9', '#ffffff', '#ffd700'],
    })
    if (onRsvpSubmitted) onRsvpSubmitted()
  }

  const galleryPhotos = [
    { url: '/templates/palace-terrace.jpg', caption: 'Sharq gavhari' },
    { url: '/templates/uzbek-heritage.jpg', caption: 'Moviy gumbazlar' },
    { url: '/templates/royal-gold.jpg', caption: 'Oltin peshtoq' },
  ]

  return (
    <div className="min-h-screen bg-[#0e1d2e] text-[#f2f7fc] font-serif-cormorant relative py-12 px-4 sm:px-6 overflow-hidden">
      {/* Floating Golden Sparkles */}
      <FloatingParticles type="gold-sparkles" count={24} />

      {/* Floating Love Reaction */}
      <FloatingLoveReaction invitationId={invitation.id || invitation.publicSlug} />

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#e2b866]/10 rounded-full blur-[140px] pointer-events-none animate-pulse-gentle" />

      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8 relative z-10">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Sharq saroyi sadosi" darkTheme />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-[#162e49] border border-[#e2b866]/40 text-[#e2b866] hover:bg-[#e2b866] hover:text-[#0e1d2e] transition-all shadow-md cursor-pointer active:scale-95"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-[#14283e]/95 backdrop-blur-md rounded-3xl p-6 sm:p-14 border-2 border-[#e2b866]/40 shadow-2xl relative z-10">
        <div className="border border-[#e2b866]/30 rounded-2xl p-6 sm:p-10 relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#e2b866] bg-[#0e1d2e] text-[#e2b866] mb-3 shadow-md animate-float-gentle">
              <Landmark className="w-8 h-8" />
            </div>
            <p className="text-xs font-mono uppercase tracking-[0.35em] text-[#e2b866] font-bold">
              {invitation.coverTitle || 'Sharqona Nikoh Tantanasi'}
            </p>
          </div>

          {/* Hero Scenery Photo with Ken Burns slow zoom */}
          <div className="relative rounded-2xl overflow-hidden mb-8 h-48 sm:h-64 shadow-2xl border border-[#e2b866]/30 group">
            <div
              className="absolute inset-0 bg-cover bg-center animate-ken-burns transform scale-105"
              style={{ backgroundImage: `url('/templates/palace-terrace.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end justify-center p-6 text-center">
              <span className="text-[#f2f7fc] text-sm sm:text-base font-serif-cormorant italic tracking-wider drop-shadow-md">
                "Moviy gumbazlar va qadimiy saroylar shukuhida"
              </span>
            </div>
          </div>

          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display-playfair break-words animate-gold-sheen">
              {invitation.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-2 text-[#e2b866]">
              <span className="w-10 h-px bg-[#e2b866]/40" />
              <Heart className="w-5 h-5 text-[#e2b866] fill-[#e2b866]/20 animate-heartbeat" />
              <span className="w-10 h-px bg-[#e2b866]/40" />
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display-playfair break-words animate-gold-sheen">
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
              borderClass="border-[#e2b866]/40 bg-[#0e1d2e]"
              textClass="text-[#f2f7fc]"
            />
          </div>

          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#e2b866] font-mono block mb-3 font-semibold">
              To‘y tantanasiga qadar
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant="gold"
            />
          </div>

          {/* Photo Gallery */}
          <StoryPhotoGallery photos={galleryPhotos} cardClass="bg-[#0e1d2e] border-[#e2b866]/30 text-sky-100" />

          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-sky-100"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#0e1d2e] border border-[#e2b866]/30 shadow-inner">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#f2f7fc]"
              buttonClass="bg-gradient-to-r from-[#e2b866] to-[#c99f52] text-[#0e1d2e] font-bold hover:brightness-105 shadow-md"
            />
          </div>

          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-mono text-[#e2b866] bg-[#0e1d2e] p-4 rounded-xl border border-sky-900">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span className="text-sky-200">{invitation.dressCode}</span>
            </div>
          )}

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-[#0e1d2e] border border-[#e2b866]/30 text-sky-100"
            dotClass="bg-[#e2b866]"
          />

          {!isPreview && (
            <div className="my-10 p-6 sm:p-8 bg-[#0e1d2e] rounded-3xl border border-[#e2b866]/30">
              <div className="text-center mb-6">
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-white">
                  Ishtirokni tasdiqlash
                </h3>
                <p className="text-xs text-sky-200 mt-1">
                  Sharqona kechamizda sizni kutamiz
                </p>
              </div>
              <RsvpForm
                slug={invitation.publicSlug}
                themeVariant="dark"
                onSubmitted={handleRsvpSuccess}
              />
            </div>
          )}

          <div className="text-center mt-12 pt-6 border-t border-[#e2b866]/30">
            <p className="text-xs uppercase tracking-widest text-[#e2b866] font-mono font-semibold">
              Sizning tashrifingiz kechamiz ko‘rkidir
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
