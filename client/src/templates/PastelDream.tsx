import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2, Sparkles } from 'lucide-react'

export const PastelDream: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f2fc] via-[#fdf5f3] to-[#f4f7fd] text-[#3d2e4f] font-serif-cormorant relative py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Sehrli tush musiqasi" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white/80 border border-purple-200 text-purple-600 hover:bg-white shadow-sm cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-12 border border-purple-200/60 shadow-xl relative">
        <div className="border border-pink-100 rounded-2xl p-6 sm:p-10 relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 text-purple-500 mb-2 border border-purple-100">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-purple-600 font-sans font-semibold">
              {invitation.coverTitle || 'Orzularimiz To‘yi'}
            </p>
          </div>

          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#341d4a] font-display-playfair break-words">
              {invitation.groomName}
            </h1>
            <p className="text-2xl sm:text-3xl text-purple-400 italic font-script-alex my-2">va</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#341d4a] font-display-playfair break-words">
              {invitation.brideName}
            </h1>
          </div>

          <div className="text-center max-w-lg mx-auto my-8">
            <p className="text-base sm:text-xl italic text-[#57446e] leading-relaxed">
              "{invitation.invitationMessage || 'Orzularimiz ro‘yobga oshgan ushbu kunda sizdek aziz insonlarni shodligimizga sherik bo‘lishga taklif etamiz.'}"
            </p>
          </div>

          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-purple-200 bg-purple-50/50"
              textClass="text-[#341d4a]"
            />
          </div>

          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-purple-600 font-sans font-bold block mb-3">
              Kutilayotgan fursat
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant="light"
            />
          </div>

          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-[#4b3961]"
          />

          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-purple-50/40 border border-purple-100">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#341d4a]"
              buttonClass="bg-purple-600 text-white hover:bg-purple-700"
            />
          </div>

          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-sans text-purple-700 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span>{invitation.dressCode}</span>
            </div>
          )}

          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-purple-50/30 border border-purple-100 text-[#341d4a]"
            dotClass="bg-purple-500"
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

          <div className="text-center mt-10 pt-6 border-t border-purple-100">
            <p className="text-xs uppercase tracking-widest text-purple-400 font-sans">
              Orzularimizga sherik bo‘ling
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
