import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Heart } from 'lucide-react'

export const RoseGarden: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#fff4f6] text-[#4a2e35] font-serif-cormorant relative py-12 px-4 sm:px-6">
      {/* Soft rose petal ambient glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Atirgullar valsi" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 shadow-sm cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white/95 rounded-3xl p-6 sm:p-12 border-2 border-rose-200/80 shadow-xl relative">
        <div className="border border-rose-100 rounded-2xl p-6 sm:p-10 relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-500 mb-2 border border-rose-200">
              <Heart className="w-6 h-6 fill-rose-500/20" />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-600 font-sans font-semibold">
              {invitation.coverTitle || 'Muhabbat To‘yi'}
            </p>
          </div>

          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-rose-950 font-display-playfair break-words">
              {invitation.groomName}
            </h1>
            <p className="text-2xl sm:text-3xl text-rose-500 italic font-script-vibes my-2">va</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-rose-950 font-display-playfair break-words">
              {invitation.brideName}
            </h1>
          </div>

          <div className="text-center max-w-lg mx-auto my-8">
            <p className="text-base sm:text-xl italic text-rose-900/80 leading-relaxed">
              "{invitation.invitationMessage || 'Muhabbat va sadoqat bilan qurilayotgan baxt qasrimizning eng quvonchli kunida sizni ko‘rishdan mamnunmiz.'}"
            </p>
          </div>

          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-rose-200 bg-rose-50/50"
              textClass="text-rose-950"
            />
          </div>

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

          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-rose-900"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-rose-50/60 border border-rose-200">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-rose-950"
              buttonClass="bg-rose-500 text-white hover:bg-rose-600"
            />
          </div>

          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-sans text-rose-700 bg-rose-50 p-4 rounded-xl border border-rose-200">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span>{invitation.dressCode}</span>
            </div>
          )}

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-rose-50/50 border border-rose-200 text-rose-950"
            dotClass="bg-rose-500"
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

          <div className="text-center mt-10 pt-6 border-t border-rose-200">
            <p className="text-xs uppercase tracking-widest text-rose-500 font-sans">
              Cheksiz muhabbat va ehtirom ila
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
