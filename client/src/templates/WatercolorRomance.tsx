import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Palette } from 'lucide-react'

export const WatercolorRomance: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#f9f7f4] text-[#3e322d] font-serif-cormorant relative py-12 px-4 sm:px-6">
      {/* Watercolor splash background effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-rose-200/40 via-amber-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-emerald-100/40 via-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Akvarel ohanglari" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white/80 border border-stone-200 text-stone-700 hover:bg-white shadow-sm cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white/95 rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-xl relative">
        <div className="border border-stone-200/60 rounded-2xl p-6 sm:p-10 relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-400 mb-2 border border-rose-100">
              <Palette className="w-6 h-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-800/70 font-sans font-semibold">
              {invitation.coverTitle || 'Muhabbat Qasidasi'}
            </p>
          </div>

          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-[#2a211d] font-display-playfair break-words">
              {invitation.groomName}
            </h1>
            <p className="text-2xl sm:text-3xl text-rose-400 italic font-script-alex my-2">va</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-[#2a211d] font-display-playfair break-words">
              {invitation.brideName}
            </h1>
          </div>

          <div className="text-center max-w-lg mx-auto my-8">
            <p className="text-base sm:text-xl italic text-stone-600 leading-relaxed">
              "{invitation.invitationMessage || 'Mo‘yqalam bilan chizilgandek nafis va go‘zal sevgi qissamizning to‘y tantanasiga sizni taklif qilamiz.'}"
            </p>
          </div>

          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-stone-200 bg-stone-50/70"
              textClass="text-[#2a211d]"
            />
          </div>

          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-rose-800/70 font-sans font-bold block mb-3">
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
            textClass="text-[#3e322d]"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-stone-50/80 border border-stone-200">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#2a211d]"
              buttonClass="bg-stone-800 text-white hover:bg-stone-900"
            />
          </div>

          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-sans text-stone-700 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span>{invitation.dressCode}</span>
            </div>
          )}

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-stone-50/60 border border-stone-200 text-[#2a211d]"
            dotClass="bg-rose-400"
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

          <div className="text-center mt-10 pt-6 border-t border-stone-200">
            <p className="text-xs uppercase tracking-widest text-stone-400 font-sans">
              Go‘zal xotiralar birga yaraladi
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
