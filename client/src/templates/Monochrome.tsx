import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Square } from 'lucide-react'

export const Monochrome: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-black text-white font-sans relative py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8 border-b border-stone-800 pb-4">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Monochrome Track" darkTheme />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-none border border-white text-white hover:bg-white hover:text-black transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto border-2 border-white p-6 sm:p-14 relative bg-stone-950">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-8 h-8 border border-white mb-3">
            <Square className="w-3.5 h-3.5 fill-white" />
          </div>
          <p className="text-xs font-mono tracking-[0.5em] text-stone-400 uppercase">
            {invitation.coverTitle || 'WEDDING EXHIBITION'}
          </p>
        </div>

        <div className="text-center my-10 space-y-4">
          <h1 className="text-5xl sm:text-7xl font-bold uppercase tracking-wider font-mono break-words">
            {invitation.groomName}
          </h1>
          <div className="text-xl font-mono tracking-widest text-stone-500">X</div>
          <h1 className="text-5xl sm:text-7xl font-bold uppercase tracking-wider font-mono break-words">
            {invitation.brideName}
          </h1>
        </div>

        <div className="text-center max-w-lg mx-auto my-8">
          <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
            "{invitation.invitationMessage || 'Biz yangi oila rishtalarini bog‘layotgan ushbu kunda sizni tantanamizning qadrli mehmoni sifatida ko‘rishdan mamnunmiz.'}"
          </p>
        </div>

        <div className="text-center my-8">
          <DateBadge
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            borderClass="border-white bg-black"
            textClass="text-white"
          />
        </div>

        <div className="my-10 text-center">
          <span className="text-[11px] uppercase tracking-[0.4em] text-stone-400 font-mono block mb-3">
            T-MINUS COUNTDOWN
          </span>
          <CountdownTimer
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            variant="dark"
          />
        </div>

        <ParentsSection
          groomParents={invitation.groomParents}
          brideParents={invitation.brideParents}
          textClass="text-stone-300"
        />

        <div className="my-10 p-6 sm:p-8 border border-stone-800 bg-stone-900">
          <VenueInfo
            venueName={invitation.venueName}
            venueAddress={invitation.venueAddress}
            mapUrl={invitation.mapUrl}
            themeClass="text-white"
            buttonClass="bg-white text-black font-mono font-bold hover:bg-stone-200"
          />
        </div>

        {invitation.dressCode && (
          <div className="my-6 text-center text-xs font-mono text-stone-300 border border-stone-800 p-4">
            <span className="font-bold uppercase tracking-wider mr-2">DRESS CODE:</span>
            <span>{invitation.dressCode}</span>
          </div>
        )}

        <ProgramTimeline
          programJson={invitation.programJson}
          cardClass="bg-stone-900 border border-stone-800 text-stone-200"
          dotClass="bg-white"
        />

        {!isPreview && (
          <div className="my-10">
            <RsvpForm
              slug={invitation.publicSlug}
              themeVariant="dark"
              onSubmitted={onRsvpSubmitted}
            />
          </div>
        )}

        <div className="text-center mt-12 pt-6 border-t border-stone-800">
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-stone-500">
            STRICT BLACK & WHITE ATTIRE
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
