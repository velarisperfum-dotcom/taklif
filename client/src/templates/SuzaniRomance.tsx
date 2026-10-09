import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Flower2 } from 'lucide-react'

export const SuzaniRomance: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#fff9f2] text-[#4a2820] font-serif-cormorant relative py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <MusicPlayer musicUrl={invitation.musicUrl} title="So‘zana ohanglari" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white border border-[#a82b3a]/30 text-[#a82b3a] hover:bg-[#a82b3a] hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white/95 rounded-3xl p-6 sm:p-12 border-2 border-[#a82b3a]/40 shadow-xl relative">
        <div className="border border-[#d96b43]/40 rounded-2xl p-6 sm:p-10 relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#a82b3a] bg-[#fff0eb] text-[#a82b3a] mb-2 shadow-sm">
              <Flower2 className="w-7 h-7" />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#a82b3a] font-sans font-bold">
              {invitation.coverTitle || 'To‘y Bazmi'}
            </p>
          </div>

          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#801b27] font-display-playfair break-words">
              {invitation.groomName}
            </h1>
            <p className="text-2xl sm:text-3xl text-[#d96b43] italic font-script-vibes my-2">va</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#801b27] font-display-playfair break-words">
              {invitation.brideName}
            </h1>
          </div>

          <div className="text-center max-w-lg mx-auto my-8">
            <p className="text-base sm:text-xl italic text-[#57352d] leading-relaxed">
              "{invitation.invitationMessage || 'Qalbimiz quvonchi, oilamiz baxti bo‘lmish nikoh to‘yimiz munosabati bilan yoziladigan dasturxonga siz aziz mehmonimizni taklif qilamiz.'}"
            </p>
          </div>

          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-[#a82b3a]/40 bg-[#fff5f2]"
              textClass="text-[#801b27]"
            />
          </div>

          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#a82b3a] font-sans font-bold block mb-3">
              To‘yga qolgan vaqt
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant="rose"
            />
          </div>

          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-[#4a2820]"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#fff5f2] border border-[#d96b43]/30">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#801b27]"
              buttonClass="bg-[#a82b3a] text-white hover:bg-[#801b27]"
            />
          </div>

          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-sans text-[#a82b3a] bg-[#fff5f2] p-4 rounded-xl border border-[#a82b3a]/20">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span className="text-stone-700">{invitation.dressCode}</span>
            </div>
          )}

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-[#fff5f2] border border-[#a82b3a]/30 text-[#801b27]"
            dotClass="bg-[#d96b43]"
          />

          {!isPreview && (
            <div className="my-10">
              <RsvpForm
                slug={invitation.publicSlug}
                themeVariant="rose"
                onSubmitted={onRsvpSubmitted}
              />
            </div>
          )}

          <div className="text-center mt-10 pt-6 border-t border-[#a82b3a]/30">
            <p className="text-xs uppercase tracking-widest text-[#a82b3a] font-sans font-medium">
              Quvonchimizga sherik bo‘ling!
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
