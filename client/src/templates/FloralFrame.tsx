import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Flower } from 'lucide-react'

export const FloralFrame: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#faf6ee] text-[#2c221a] font-serif-cormorant relative py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Gulchambar ohanglari" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white border border-[#c29851]/40 text-[#c29851] hover:bg-[#c29851] hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white/95 rounded-3xl p-6 sm:p-14 border-4 border-[#c29851]/40 shadow-2xl relative">
        <div className="border-2 border-dashed border-[#c29851]/40 rounded-2xl p-6 sm:p-10 relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#c29851] bg-[#fbf7f0] text-[#c29851] mb-2 shadow-sm">
              <Flower className="w-7 h-7" />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#8e6b30] font-sans font-bold">
              {invitation.coverTitle || 'To‘y Tantanamiz'}
            </p>
          </div>

          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#1f160f] font-display-playfair break-words">
              {invitation.groomName}
            </h1>
            <p className="text-2xl sm:text-3xl text-[#c29851] italic font-script-alex my-2">va</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#1f160f] font-display-playfair break-words">
              {invitation.brideName}
            </h1>
          </div>

          <div className="text-center max-w-lg mx-auto my-8">
            <p className="text-base sm:text-xl italic text-[#4a392b] leading-relaxed">
              "{invitation.invitationMessage || 'Gullar ifori va quvonchli onlar bilan to‘la ushbu kunimizda siz aziz mehmonimizni ko‘rishdan behad baxtiyormiz.'}"
            </p>
          </div>

          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-[#c29851]/40 bg-[#fbf7f0]"
              textClass="text-[#1f160f]"
            />
          </div>

          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8e6b30] font-sans font-bold block mb-3">
              To‘yga qolgan vaqt
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant="gold"
            />
          </div>

          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-[#4a392b]"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#fbf7f0] border border-[#c29851]/30">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#1f160f]"
              buttonClass="bg-[#c29851] text-white hover:bg-[#a37c39]"
            />
          </div>

          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-sans text-[#8e6b30] bg-[#fbf7f0] p-4 rounded-xl border border-[#c29851]/30">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span className="text-stone-700">{invitation.dressCode}</span>
            </div>
          )}

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-[#fbf7f0] border border-[#c29851]/30 text-[#1f160f]"
            dotClass="bg-[#c29851]"
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

          <div className="text-center mt-10 pt-6 border-t border-[#c29851]/30">
            <p className="text-xs uppercase tracking-widest text-[#8e6b30] font-sans font-medium">
              Tashrifingiz qalbimizga quvonch bag‘ishlaydi
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
