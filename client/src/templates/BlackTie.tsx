import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Sparkles, Gem } from 'lucide-react'

export const BlackTie: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#0d0d11] text-[#f4efe6] selection:bg-[#c9a86a]/30 font-serif-cormorant relative py-12 px-4 sm:px-6">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c9a86a]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top action bar */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Oqshom musiqasi" darkTheme />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-[#e5c17d] hover:border-[#e5c17d] transition-all shadow cursor-pointer"
          title="Ulashish"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Card Container */}
      <div className="max-w-3xl mx-auto bg-[#14141a]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-14 border border-[#e5c17d]/30 shadow-2xl relative">
        {/* Subtle geometric corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#e5c17d]/60" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#e5c17d]/60" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#e5c17d]/60" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#e5c17d]/60" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#1c1c24] border border-[#e5c17d]/40 text-[#e5c17d] mb-4">
            <Gem className="w-6 h-6" />
          </div>
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-[#c9a86a]">
            {invitation.coverTitle || 'VIP Wedding Gala'}
          </p>
        </div>

        {/* Names */}
        <div className="text-center my-8 space-y-3">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide text-white uppercase font-display-playfair break-words">
            {invitation.groomName}
          </h1>
          <p className="text-2xl sm:text-3xl text-[#e5c17d] italic font-script-vibes my-2">
            va
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide text-white uppercase font-display-playfair break-words">
            {invitation.brideName}
          </h1>
        </div>

        {/* Message */}
        <div className="text-center max-w-lg mx-auto my-10">
          <p className="text-base sm:text-lg leading-relaxed text-stone-300 italic">
            "{invitation.invitationMessage || 'Hayotimizning yangi sahifasi ochilayotgan ushbu tantanali oqshomda siz aziz mehmonimizni ko‘rishdan baxtiyor bo‘lamiz.'}"
          </p>
        </div>

        {/* Date & Time */}
        <div className="text-center my-8">
          <DateBadge
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            borderClass="border-[#e5c17d]/40 bg-[#1c1c24]"
            textClass="text-[#f4efe6]"
          />
        </div>

        {/* Countdown */}
        <div className="my-10 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c9a86a] font-mono block mb-3">
            Kutilayotgan fursat
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
          textClass="text-stone-300"
        />

        {/* Venue Info */}
        <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#1a1a22] border border-[#e5c17d]/20">
          <VenueInfo
            venueName={invitation.venueName}
            venueAddress={invitation.venueAddress}
            mapUrl={invitation.mapUrl}
            themeClass="text-[#f4efe6]"
            buttonClass="bg-gradient-to-r from-[#e5c17d] to-[#c9a86a] text-stone-950 font-semibold hover:opacity-90"
          />
        </div>

        {/* Dress code */}
        {invitation.dressCode && (
          <div className="my-6 text-center text-xs font-mono text-[#e5c17d] bg-[#1a1a22] p-4 rounded-xl border border-stone-800">
            <span className="font-bold tracking-widest uppercase block mb-1">Dress Code</span>
            <span className="text-stone-300">{invitation.dressCode}</span>
          </div>
        )}

        {/* Timeline */}
        <ProgramTimeline
          programJson={invitation.programJson}
          cardClass="bg-[#1c1c24] border border-stone-800 text-stone-200"
          dotClass="bg-[#e5c17d]"
        />

        {/* RSVP Form */}
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
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#c9a86a]">
            Black Tie Formal Attire Requested
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
