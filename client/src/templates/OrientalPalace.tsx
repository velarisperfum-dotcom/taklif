import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Landmark } from 'lucide-react'

export const OrientalPalace: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#0e1d2e] text-[#f2f7fc] font-serif-cormorant relative py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Sharq saroyi sadosi" darkTheme />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-[#162e49] border border-[#e2b866]/40 text-[#e2b866] hover:bg-[#e2b866] hover:text-[#0e1d2e] transition-all shadow cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-[#14283e]/90 backdrop-blur-md rounded-3xl p-6 sm:p-14 border-2 border-[#e2b866]/40 shadow-2xl relative">
        <div className="border border-[#e2b866]/30 rounded-2xl p-6 sm:p-10 relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#e2b866] bg-[#0e1d2e] text-[#e2b866] mb-3 shadow-md">
              <Landmark className="w-7 h-7" />
            </div>
            <p className="text-xs font-mono uppercase tracking-[0.35em] text-[#e2b866]">
              {invitation.coverTitle || 'Sharqona Nikoh Tantanasi'}
            </p>
          </div>

          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display-playfair break-words">
              {invitation.groomName}
            </h1>
            <p className="text-2xl sm:text-3xl text-[#e2b866] italic font-script-vibes my-2">va</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display-playfair break-words">
              {invitation.brideName}
            </h1>
          </div>

          <div className="text-center max-w-lg mx-auto my-8">
            <p className="text-base sm:text-xl italic text-sky-100 leading-relaxed">
              "{invitation.invitationMessage || 'Moviy gumbazlar va qadimiy obidalar shukuhida ikki yoshning baxt to‘yiga sizdek qadrli insonlarni taklif etamiz.'}"
            </p>
          </div>

          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-[#e2b866]/40 bg-[#0e1d2e]"
              textClass="text-[#f2f7fc]"
            />
          </div>

          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#e2b866] font-mono block mb-3">
              To‘y tantanasiga qadar
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant="gold"
            />
          </div>

          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-sky-100"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#0e1d2e] border border-[#e2b866]/30">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#f2f7fc]"
              buttonClass="bg-[#e2b866] text-[#0e1d2e] font-bold hover:bg-[#c99f52]"
            />
          </div>

          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-mono text-[#e2b866] bg-[#0e1d2e] p-4 rounded-xl border border-sky-900">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span className="text-sky-200">{invitation.dressCode}</span>
            </div>
          )}

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-[#0e1d2e] border border-sky-900 text-sky-100"
            dotClass="bg-[#e2b866]"
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

          <div className="text-center mt-10 pt-6 border-t border-[#e2b866]/30">
            <p className="text-xs uppercase tracking-widest text-[#e2b866] font-mono">
              Qadamlaringiz qutlug‘ bo‘lsin!
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
