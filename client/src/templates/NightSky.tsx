import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Moon, Star } from 'lucide-react'

export const NightSky: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#070b19] text-[#e3eaf7] font-serif-cormorant relative py-12 px-4 sm:px-6">
      {/* Celestial nebula glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Yulduzli tun sadosi" darkTheme />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-[#10172e] border border-blue-900/60 text-blue-300 hover:text-white shadow cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-[#0d1429]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-14 border border-blue-900/50 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-blue-400/40 bg-[#121c38] text-blue-300 mb-3 shadow-lg shadow-blue-500/10">
            <Moon className="w-7 h-7" />
          </div>
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-blue-300/80">
            {invitation.coverTitle || 'Yulduzlar Guvohligida'}
          </p>
        </div>

        <div className="text-center my-8 space-y-3">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display-playfair break-words">
            {invitation.groomName}
          </h1>
          <div className="flex items-center justify-center gap-3 my-2 text-blue-400/60">
            <Star className="w-3.5 h-3.5 fill-blue-300 text-blue-300" />
            <span className="w-16 h-px bg-blue-400/30" />
            <Star className="w-3.5 h-3.5 fill-blue-300 text-blue-300" />
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display-playfair break-words">
            {invitation.brideName}
          </h1>
        </div>

        <div className="text-center max-w-lg mx-auto my-8">
          <p className="text-base sm:text-xl italic text-blue-100/80 leading-relaxed">
            "{invitation.invitationMessage || 'Maftunkor yulduzli tun ostida, ikki qalbning abadiy ittifoqi nishonlanadigan to‘y oqshomimizga xush kelibsiz.'}"
          </p>
        </div>

        <div className="text-center my-8">
          <DateBadge
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            borderClass="border-blue-800/60 bg-[#121c38]"
            textClass="text-blue-100"
          />
        </div>

        <div className="my-10 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-300 font-mono block mb-3">
            Sehrli onlargacha
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
          textClass="text-blue-200"
        />

        <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#121c38] border border-blue-900/60">
          <VenueInfo
            venueName={invitation.venueName}
            venueAddress={invitation.venueAddress}
            mapUrl={invitation.mapUrl}
            themeClass="text-white"
            buttonClass="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:opacity-90"
          />
        </div>

        {invitation.dressCode && (
          <div className="my-6 text-center text-xs font-mono text-blue-300 bg-[#121c38] p-4 rounded-xl border border-blue-900/60">
            <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
            <span className="text-blue-100">{invitation.dressCode}</span>
          </div>
        )}

        <ProgramTimeline
          programJson={invitation.programJson}
          cardClass="bg-[#121c38] border border-blue-900/60 text-blue-100"
          dotClass="bg-blue-400"
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

        <div className="text-center mt-10 pt-6 border-t border-blue-900/60">
          <p className="text-xs uppercase tracking-widest text-blue-400/80 font-mono">
            Koinotdek cheksiz baxt tilaymiz
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
