import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2 } from 'lucide-react'

export const MinimalWhite: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans relative py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8 border-b border-stone-200 pb-4">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Musiqa" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.4em] text-stone-400 font-mono">
            {invitation.coverTitle || 'WEDDING INVITATION'}
          </p>
        </div>

        <div className="text-center my-12 space-y-4">
          <h1 className="text-5xl sm:text-7xl font-extralight tracking-tight font-serif-cormorant break-words">
            {invitation.groomName}
          </h1>
          <p className="text-sm font-mono tracking-widest text-stone-400 uppercase">AND</p>
          <h1 className="text-5xl sm:text-7xl font-extralight tracking-tight font-serif-cormorant break-words">
            {invitation.brideName}
          </h1>
        </div>

        <div className="w-12 h-px bg-stone-300 mx-auto my-8" />

        <div className="text-center max-w-md mx-auto my-8">
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
            {invitation.invitationMessage || 'Biz yangi oila rishtalarini bog‘layotgan ushbu yorug‘ kunda sizdek aziz insonlarni yonimizda ko‘rish biz uchun katta quvonchdir.'}
          </p>
        </div>

        <div className="text-center my-10">
          <DateBadge
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            borderClass="border-stone-300 bg-stone-50"
            textClass="text-stone-900"
          />
        </div>

        <div className="my-12 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-mono block mb-4">
            COUNTDOWN
          </span>
          <CountdownTimer
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            variant="minimal"
          />
        </div>

        <ParentsSection
          groomParents={invitation.groomParents}
          brideParents={invitation.brideParents}
          textClass="text-stone-700"
        />

        <div className="my-10 p-6 sm:p-8 border border-stone-200">
          <VenueInfo
            venueName={invitation.venueName}
            venueAddress={invitation.venueAddress}
            mapUrl={invitation.mapUrl}
            themeClass="text-stone-900"
            buttonClass="bg-stone-900 text-white hover:bg-stone-800"
          />
        </div>

        {invitation.dressCode && (
          <div className="my-6 text-center text-xs font-mono text-stone-600 border-b border-t border-stone-200 py-3">
            <span className="font-bold uppercase tracking-wider mr-2">Dress Code:</span>
            <span>{invitation.dressCode}</span>
          </div>
        )}

        <ProgramTimeline
          programJson={invitation.programJson}
          cardClass="bg-stone-50 border border-stone-200 text-stone-800"
          dotClass="bg-stone-900"
        />

        {!isPreview && (
          <div className="my-12">
            <RsvpForm
              slug={invitation.publicSlug}
              themeVariant="light"
              onSubmitted={onRsvpSubmitted}
            />
          </div>
        )}

        <div className="text-center mt-12 pt-8 border-t border-stone-200">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-400">
            MINIMAL WHITE COLLECTION
          </p>
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
