import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2 } from 'lucide-react'

export const UzbekHeritage: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#faf6ee] text-[#1e2a2d] font-serif-cormorant relative py-12 px-4 sm:px-6">
      {/* Uzbek Islimiy geometric background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#0e7c86]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#d4af37]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Milliy to‘y taronalari" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white border border-[#0e7c86]/30 text-[#0e7c86] hover:bg-[#0e7c86] hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-12 border-2 border-[#0e7c86]/40 shadow-2xl relative">
        {/* Oriental Arch outline */}
        <div className="border border-[#d4af37]/50 rounded-2xl p-6 sm:p-10 relative">
          {/* Top arch emblem */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#0e7c86] bg-[#f0f9fa] text-[#0e7c86] text-2xl font-bold shadow-sm mb-2">
              ﷽
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#0e7c86] font-sans font-bold">
              {invitation.coverTitle || 'To‘y Oqshomi'}
            </p>
          </div>

          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#0e3b43] font-display-playfair break-words">
              {invitation.groomName}
            </h1>
            <p className="text-2xl sm:text-3xl text-[#d4af37] italic font-script-vibes my-2">va</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#0e3b43] font-display-playfair break-words">
              {invitation.brideName}
            </h1>
          </div>

          <div className="text-center max-w-lg mx-auto my-8">
            <p className="text-base sm:text-xl italic text-[#2c3e44] leading-relaxed">
              "{invitation.invitationMessage || 'Aziz va qadrli yurtdoshlar! Ikki yoshning go‘zal nikoh to‘yi munosabati bilan yoziladigan to‘yona dasturxonimizga lutfan taklif etamiz.'}"
            </p>
          </div>

          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-[#0e7c86]/40 bg-[#f4fafb]"
              textClass="text-[#0e3b43]"
            />
          </div>

          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#0e7c86] font-sans font-bold block mb-3">
              To‘yga qolgan vaqt
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant="emerald"
            />
          </div>

          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-[#1e2a2d]"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#f4fafb] border border-[#0e7c86]/30">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#0e3b43]"
              buttonClass="bg-[#0e7c86] text-white hover:bg-[#095f66]"
            />
          </div>

          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-sans text-[#0e7c86] bg-[#f4fafb] p-4 rounded-xl border border-[#0e7c86]/30">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span className="text-stone-700">{invitation.dressCode}</span>
            </div>
          )}

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-[#f4fafb] border border-[#0e7c86]/30 text-[#0e3b43]"
            dotClass="bg-[#0e7c86]"
          />

          {!isPreview && (
            <div className="my-10">
              <RsvpForm
                slug={invitation.publicSlug}
                themeVariant="light"
                onSubmitted={onRsvpSubmitted}
              />
            </div>
          )}

          <div className="text-center mt-10 pt-6 border-t border-[#d4af37]/40">
            <p className="text-xs uppercase tracking-widest text-[#0e7c86] font-sans font-medium">
              To‘ylarimiz to‘ylarga ulansin!
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
