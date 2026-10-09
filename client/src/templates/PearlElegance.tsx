import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, CircleDot } from 'lucide-react'

export const PearlElegance: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#2b2d42] font-serif-cormorant relative py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Nafis marvarid sadolari" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-stone-900 shadow-sm cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-14 border border-stone-200 shadow-xl relative">
        <div className="border border-stone-200/80 rounded-2xl p-6 sm:p-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-stone-300 bg-stone-50 text-stone-600 mb-2">
              <CircleDot className="w-5 h-5" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-stone-500 font-sans font-medium">
              {invitation.coverTitle || 'To‘y Taklifnomasi'}
            </p>
          </div>

          <div className="text-center my-8 space-y-3">
            <h1 className="text-4xl sm:text-6xl font-light tracking-wide text-stone-900 font-display-playfair break-words">
              {invitation.groomName}
            </h1>
            <p className="text-xl sm:text-2xl text-stone-400 font-script-alex">&</p>
            <h1 className="text-4xl sm:text-6xl font-light tracking-wide text-stone-900 font-display-playfair break-words">
              {invitation.brideName}
            </h1>
          </div>

          <div className="text-center max-w-lg mx-auto my-8">
            <p className="text-base sm:text-lg italic text-stone-600 leading-relaxed">
              "{invitation.invitationMessage || 'Ushbu qutlug‘ kunda sizdek e’zozli insonlarning samimiy tilaklari va ishtiroki baxtimizni yanada ziyoda qiladi.'}"
            </p>
          </div>

          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-stone-200 bg-stone-50"
              textClass="text-stone-800"
            />
          </div>

          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans block mb-3">
              Kutilayotgan tantana
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
            textClass="text-stone-600"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-stone-800"
              buttonClass="bg-stone-900 text-white hover:bg-stone-800"
            />
          </div>

          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-sans text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <span className="font-semibold uppercase tracking-wider block mb-1">Dress Code</span>
              <span>{invitation.dressCode}</span>
            </div>
          )}

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-stone-50 border border-stone-200 text-stone-700"
            dotClass="bg-stone-400"
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
              Biz bilan birga bo‘ling
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
