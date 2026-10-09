import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Compass } from 'lucide-react'

export const SilkRoad: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#f3ece0] text-[#3d2a1d] font-serif-cormorant relative py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Ipak yo‘li sadolari" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white border border-[#964f33]/30 text-[#964f33] hover:bg-[#964f33] hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white/95 rounded-3xl p-6 sm:p-12 border-2 border-[#964f33]/30 shadow-xl relative">
        <div className="border border-[#b87652]/30 rounded-2xl p-6 sm:p-10 relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#964f33] bg-[#fbf5ed] text-[#964f33] mb-2 shadow-sm">
              <Compass className="w-7 h-7" />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#964f33] font-sans font-bold">
              {invitation.coverTitle || 'Buyuk To‘y Tantanasi'}
            </p>
          </div>

          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#69331e] font-display-playfair break-words">
              {invitation.groomName}
            </h1>
            <p className="text-2xl sm:text-3xl text-[#b87652] italic font-script-vibes my-2">va</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#69331e] font-display-playfair break-words">
              {invitation.brideName}
            </h1>
          </div>

          <div className="text-center max-w-lg mx-auto my-8">
            <p className="text-base sm:text-xl italic text-[#4a3424] leading-relaxed">
              "{invitation.invitationMessage || 'Buyuk Ipak yo‘li an’analariga sodiq qolgan holda, oilamiz baxt to‘yiga sizdek hurmatli mehmonimizni chorlaymiz.'}"
            </p>
          </div>

          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-[#964f33]/40 bg-[#fbf5ed]"
              textClass="text-[#69331e]"
            />
          </div>

          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#964f33] font-sans font-bold block mb-3">
              To‘yga qolgan fursat
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant="light"
            />
          </div>

          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-[#3d2a1d]"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#fbf5ed] border border-[#964f33]/20">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#69331e]"
              buttonClass="bg-[#964f33] text-white hover:bg-[#783c24]"
            />
          </div>

          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-sans text-[#964f33] bg-[#fbf5ed] p-4 rounded-xl border border-[#964f33]/20">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span className="text-stone-700">{invitation.dressCode}</span>
            </div>
          )}

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-[#fbf5ed] border border-[#964f33]/20 text-[#69331e]"
            dotClass="bg-[#964f33]"
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

          <div className="text-center mt-10 pt-6 border-t border-[#964f33]/30">
            <p className="text-xs uppercase tracking-widest text-[#964f33] font-sans font-medium">
              Sizni ko‘rishdan mamnunmiz!
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
