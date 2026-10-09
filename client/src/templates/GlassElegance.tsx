import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Layers } from 'lucide-react'

export const GlassElegance: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#1a1c29] via-[#12131c] to-[#252238] text-white font-sans relative py-12 px-4 sm:px-6">
      {/* Iridescent light refractions */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Glass Ambient" darkTheme />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all backdrop-blur-md cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white/[0.08] backdrop-blur-2xl rounded-3xl p-6 sm:p-14 border border-white/20 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-cyan-300 mb-3 shadow-inner">
            <Layers className="w-6 h-6" />
          </div>
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/90 font-mono">
            {invitation.coverTitle || 'SHAFSHOF GO‘ZALLIK'}
          </p>
        </div>

        <div className="text-center my-8 space-y-3">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-serif-cormorant break-words">
            {invitation.groomName}
          </h1>
          <p className="text-2xl sm:text-3xl text-cyan-300 italic font-script-vibes my-2">va</p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-serif-cormorant break-words">
            {invitation.brideName}
          </h1>
        </div>

        <div className="text-center max-w-lg mx-auto my-8">
          <p className="text-base sm:text-lg italic text-stone-200 leading-relaxed font-light">
            "{invitation.invitationMessage || 'Shaffof tuyg‘ular va soflik ramzi bo‘lmish nikoh tantanamizda siz azizlarni ko‘rish biz uchun unutilmas baxtdir.'}"
          </p>
        </div>

        <div className="text-center my-8">
          <DateBadge
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            borderClass="border-white/20 bg-white/5"
            textClass="text-white"
          />
        </div>

        <div className="my-10 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-300 font-mono block mb-3">
            COUNTDOWN
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

        <div className="my-10 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md">
          <VenueInfo
            venueName={invitation.venueName}
            venueAddress={invitation.venueAddress}
            mapUrl={invitation.mapUrl}
            themeClass="text-white"
            buttonClass="bg-gradient-to-r from-cyan-400 to-blue-500 text-stone-950 font-bold hover:opacity-90"
          />
        </div>

        {invitation.dressCode && (
          <div className="my-6 text-center text-xs font-mono text-cyan-200 bg-white/5 p-4 rounded-xl border border-white/15">
            <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
            <span className="text-stone-200">{invitation.dressCode}</span>
          </div>
        )}

        <ProgramTimeline
          programJson={invitation.programJson}
          cardClass="bg-white/5 border border-white/10 text-stone-200"
          dotClass="bg-cyan-400"
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

        <div className="text-center mt-10 pt-6 border-t border-white/10">
          <p className="text-xs uppercase tracking-widest text-cyan-300/70 font-mono">
            Glass Elegance Collection
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
