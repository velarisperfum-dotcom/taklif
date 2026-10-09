import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Crown, Sparkles } from 'lucide-react'

export const BurgundyRoyale: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#380912] text-[#fbf6ea] font-serif-cormorant relative py-12 px-4 sm:px-6">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c5a059]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Qirollik saroyi ohanglari" darkTheme />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-[#49111c] border border-[#c5a059]/40 text-[#dfc38a] hover:bg-[#c5a059] hover:text-stone-950 transition-all shadow cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-[#440d17]/90 backdrop-blur-md rounded-3xl p-6 sm:p-14 border-2 border-[#c5a059]/40 shadow-2xl relative">
        <div className="border border-[#c5a059]/30 rounded-2xl p-6 sm:p-10 relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#c5a059] bg-[#330810] text-[#e0c48b] mb-3 shadow-md">
              <Crown className="w-7 h-7" />
            </div>
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-[#e0c48b]">
              {invitation.coverTitle || 'Nikoh To‘yi Tantanasi'}
            </p>
          </div>

          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#fffaf0] font-display-playfair break-words">
              {invitation.groomName}
            </h1>
            <p className="text-2xl sm:text-3xl text-[#e0c48b] italic font-script-vibes my-2">va</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#fffaf0] font-display-playfair break-words">
              {invitation.brideName}
            </h1>
          </div>

          <div className="text-center max-w-lg mx-auto my-8">
            <p className="text-base sm:text-xl italic text-[#e6d8c3] leading-relaxed">
              "{invitation.invitationMessage || 'Ushbu baxtli kunimizda sizdek aziz insonlarni oqshom dasturxonimizda ko‘rish biz uchun eng oliy saodatdir.'}"
            </p>
          </div>

          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-[#c5a059]/40 bg-[#330810]"
              textClass="text-[#fbf6ea]"
            />
          </div>

          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#e0c48b] font-mono block mb-3">
              To‘yga qolgan vaqt
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
            textClass="text-[#e6d8c3]"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#330810] border border-[#c5a059]/30">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#fbf6ea]"
              buttonClass="bg-gradient-to-r from-[#d8ba7d] to-[#c5a059] text-stone-950 font-bold hover:opacity-90"
            />
          </div>

          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-mono text-[#e0c48b] bg-[#330810] p-4 rounded-xl border border-[#c5a059]/30">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span className="text-[#e6d8c3]">{invitation.dressCode}</span>
            </div>
          )}

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-[#330810] border border-[#c5a059]/30 text-[#fbf6ea]"
            dotClass="bg-[#e0c48b]"
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

          <div className="text-center mt-10 pt-6 border-t border-[#c5a059]/30">
            <p className="text-xs uppercase tracking-widest text-[#e0c48b] font-mono">
              Qadamingizga hasanot!
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
