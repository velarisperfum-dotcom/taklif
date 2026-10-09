import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2 } from 'lucide-react'

export const EditorialMagazine: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-stone-900 font-sans relative py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8 border-b-2 border-stone-900 pb-3">
        <span className="text-xs font-mono tracking-widest font-bold uppercase">
          ISSUE VOL. XXIV — SPECIAL WEDDING EDITION
        </span>
        <div className="flex items-center gap-3">
          <MusicPlayer musicUrl={invitation.musicUrl} title="Editorial Playlist" />
          <button
            onClick={() => setShareOpen(true)}
            className="p-2 rounded-full border border-stone-900 hover:bg-stone-900 hover:text-white transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-14 border border-stone-300 shadow-xl">
        {/* Magazine Cover Header */}
        <div className="border-b-4 border-stone-900 pb-6 text-center">
          <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black font-display-playfair tracking-tighter text-stone-950 uppercase leading-none">
            UNION
          </h2>
          <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-stone-600 mt-2 px-1">
            <span>UZBEKISTAN</span>
            <span>{invitation.coverTitle || 'A LOVE CELEBRATION'}</span>
            <span>2026</span>
          </div>
        </div>

        {/* Feature Story / Names */}
        <div className="my-10 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-stone-500 mb-3">
            FEATURING THE WEDDING OF
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold font-serif-cormorant text-stone-950 tracking-tight break-words">
            {invitation.groomName}
          </h1>
          <p className="text-2xl sm:text-3xl text-amber-700 italic font-script-vibes my-1">
            &
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold font-serif-cormorant text-stone-950 tracking-tight break-words">
            {invitation.brideName}
          </h1>
        </div>

        {/* Two-column editorial excerpt */}
        <div className="my-10 p-6 bg-stone-50 border-l-4 border-stone-900 text-left">
          <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
            EDITORIAL NOTE
          </p>
          <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-serif-cormorant italic">
            "{invitation.invitationMessage || 'Ushbu unutilmas tantanada siz aziz qadrdonlarimizni qalbimiz to‘ridan o‘rin olgan eng go‘zal oqshomga lutfan taklif etamiz.'}"
          </p>
        </div>

        {/* Date & Time */}
        <div className="text-center my-8">
          <DateBadge
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            borderClass="border-stone-900 bg-white"
            textClass="text-stone-950"
          />
        </div>

        {/* Countdown */}
        <div className="my-10 text-center">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-stone-600 block mb-3">
            TIME REMAINING UNTIL EVENT
          </span>
          <CountdownTimer
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            variant="dark"
          />
        </div>

        {/* Parents */}
        <ParentsSection
          groomParents={invitation.groomParents}
          brideParents={invitation.brideParents}
          textClass="text-stone-800"
        />

        {/* Venue */}
        <div className="my-10 p-6 sm:p-8 bg-stone-900 text-white rounded-xl">
          <VenueInfo
            venueName={invitation.venueName}
            venueAddress={invitation.venueAddress}
            mapUrl={invitation.mapUrl}
            themeClass="text-white"
            buttonClass="bg-white text-stone-950 font-bold hover:bg-stone-200"
          />
        </div>

        {invitation.dressCode && (
          <div className="my-6 text-center text-xs font-mono text-stone-800 border-y border-stone-200 py-3">
            <span className="font-bold uppercase tracking-wider mr-2">DRESS CODE:</span>
            <span>{invitation.dressCode}</span>
          </div>
        )}

        <ProgramTimeline
          programJson={invitation.programJson}
          cardClass="bg-stone-50 border border-stone-200 text-stone-900"
          dotClass="bg-stone-950"
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

        <div className="border-t-2 border-stone-900 mt-12 pt-4 flex justify-between text-[11px] font-mono text-stone-500 uppercase">
          <span>PAGE 01 / INVITATION</span>
          <span>RSVP REQUESTED</span>
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
