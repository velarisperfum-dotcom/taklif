import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Leaf } from 'lucide-react'

export const BotanicalLove: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#f0f4ef] text-[#2c3e2e] font-serif-cormorant relative py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Tabiat va sevgi kuylari" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white border border-[#4a6b4e]/30 text-[#4a6b4e] hover:bg-[#4a6b4e] hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white/95 rounded-3xl p-6 sm:p-12 border-2 border-[#4a6b4e]/30 shadow-xl relative">
        <div className="border border-[#789a7c]/30 rounded-2xl p-6 sm:p-10 relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#4a6b4e] bg-[#eef4ee] text-[#4a6b4e] mb-2 shadow-sm">
              <Leaf className="w-6 h-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#4a6b4e] font-sans font-bold">
              {invitation.coverTitle || 'To‘y Tantanamiz'}
            </p>
          </div>

          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#1e3020] font-display-playfair break-words">
              {invitation.groomName}
            </h1>
            <p className="text-2xl sm:text-3xl text-[#5b855f] italic font-script-alex my-2">va</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#1e3020] font-display-playfair break-words">
              {invitation.brideName}
            </h1>
          </div>

          <div className="text-center max-w-lg mx-auto my-8">
            <p className="text-base sm:text-xl italic text-[#394f3b] leading-relaxed">
              "{invitation.invitationMessage || 'Tabiat uyg‘unligi va muhabbat nuri ostida birlashayotgan yangi oilamizning to‘yiga xush kelibsiz.'}"
            </p>
          </div>

          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-[#4a6b4e]/30 bg-[#eef4ee]"
              textClass="text-[#1e3020]"
            />
          </div>

          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#4a6b4e] font-sans font-bold block mb-3">
              To‘yga qolgan vaqt
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant="emerald"
            />
          </div>

          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-[#2c3e2e]"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#eef4ee] border border-[#4a6b4e]/20">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#1e3020]"
              buttonClass="bg-[#4a6b4e] text-white hover:bg-[#38533c]"
            />
          </div>

          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-sans text-[#4a6b4e] bg-[#eef4ee] p-4 rounded-xl border border-[#4a6b4e]/20">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span className="text-stone-700">{invitation.dressCode}</span>
            </div>
          )}

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-[#eef4ee] border border-[#4a6b4e]/20 text-[#1e3020]"
            dotClass="bg-[#4a6b4e]"
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

          <div className="text-center mt-10 pt-6 border-t border-[#4a6b4e]/30">
            <p className="text-xs uppercase tracking-widest text-[#4a6b4e] font-sans font-medium">
              Ehtirom ila taklif etamiz
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
