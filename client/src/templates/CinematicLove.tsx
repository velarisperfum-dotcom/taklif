import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Clapperboard, Film } from 'lucide-react'

export const CinematicLove: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#0c1017] text-[#e8edf5] font-sans relative py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400">
          <Film className="w-4 h-4" />
          <span>A ROMANTIC PREMIERE PRODUCTION</span>
        </div>
        <div className="flex items-center gap-3">
          <MusicPlayer musicUrl={invitation.musicUrl} title="Soundtrack" darkTheme />
          <button
            onClick={() => setShareOpen(true)}
            className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-amber-400 hover:text-white cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-[#131924] rounded-3xl p-6 sm:p-14 border border-stone-800 shadow-2xl relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-3">
            <Clapperboard className="w-6 h-6" />
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.4em] text-amber-400/90">
            {invitation.coverTitle || 'A LOVE STORY PREMIERE'}
          </p>
        </div>

        <div className="text-center my-10 space-y-4">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white font-display-playfair break-words">
            {invitation.groomName}
          </h1>
          <p className="text-xl font-mono text-amber-400 tracking-[0.3em] uppercase">STARRING WITH</p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white font-display-playfair break-words">
            {invitation.brideName}
          </h1>
        </div>

        <div className="text-center max-w-lg mx-auto my-8">
          <p className="text-sm sm:text-base italic text-stone-300 leading-relaxed font-serif-cormorant text-lg">
            "{invitation.invitationMessage || 'Hayotimizning eng muhim va unutilmas epizodi — to‘y tantanamizga siz azizlarni lutfan taklif etamiz.'}"
          </p>
        </div>

        <div className="text-center my-8">
          <DateBadge
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            borderClass="border-amber-500/40 bg-stone-900"
            textClass="text-white"
          />
        </div>

        <div className="my-10 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-mono block mb-3">
            COUNTDOWN TO PREMIERE
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

        <div className="my-10 p-6 sm:p-8 rounded-2xl bg-stone-900 border border-stone-800">
          <VenueInfo
            venueName={invitation.venueName}
            venueAddress={invitation.venueAddress}
            mapUrl={invitation.mapUrl}
            themeClass="text-white"
            buttonClass="bg-amber-500 text-stone-950 font-bold hover:bg-amber-400"
          />
        </div>

        {invitation.dressCode && (
          <div className="my-6 text-center text-xs font-mono text-amber-400 bg-stone-900 p-4 rounded-xl border border-stone-800">
            <span className="font-bold uppercase tracking-wider block mb-1">RED CARPET DRESS CODE</span>
            <span className="text-stone-200">{invitation.dressCode}</span>
          </div>
        )}

        <ProgramTimeline
          programJson={invitation.programJson}
          cardClass="bg-stone-900 border border-stone-800 text-stone-200"
          dotClass="bg-amber-400"
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
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500">
            PRODUCED WITH LOVE • ALL GUESTS WELCOME
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
