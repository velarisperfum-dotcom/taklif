import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Share2 } from 'lucide-react'

export const ModernBeige: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#ede6dc] text-[#3d332a] font-serif-cormorant relative py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Tinchlantiruvchi kuylar" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-[#f7f2eb] border border-[#d6cbbe] text-[#3d332a] hover:bg-[#e4dbd0] transition-all shadow-sm cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-[#faf6f0] rounded-[2.5rem] p-6 sm:p-14 border border-[#d6cbbe] shadow-xl relative">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8c7b6d] font-sans font-medium">
            {invitation.coverTitle || 'To‘y Tantanamiz'}
          </p>
        </div>

        <div className="text-center my-8 space-y-3">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal text-[#2e261f] font-display-playfair break-words">
            {invitation.groomName}
          </h1>
          <p className="text-2xl sm:text-3xl text-[#a89078] italic font-script-alex my-2">va</p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal text-[#2e261f] font-display-playfair break-words">
            {invitation.brideName}
          </h1>
        </div>

        <div className="text-center max-w-lg mx-auto my-8">
          <p className="text-base sm:text-lg italic text-[#594d42] leading-relaxed">
            "{invitation.invitationMessage || 'Qalblarimiz birlashgan ushbu iliq va samimiy oqshomda siz aziz mehmonimizni ko‘rishdan behad xursand bo‘lamiz.'}"
          </p>
        </div>

        <div className="text-center my-8">
          <DateBadge
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            borderClass="border-[#d6cbbe] bg-[#f0eae1]"
            textClass="text-[#2e261f]"
          />
        </div>

        <div className="my-10 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-[#8c7b6d] font-sans block mb-3">
            Qolgan vaqt
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
          textClass="text-[#594d42]"
        />

        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-[#f0eae1] border border-[#d6cbbe]">
          <VenueInfo
            venueName={invitation.venueName}
            venueAddress={invitation.venueAddress}
            mapUrl={invitation.mapUrl}
            themeClass="text-[#2e261f]"
            buttonClass="bg-[#5c4d3e] text-white hover:bg-[#473a2d]"
          />
        </div>

        {invitation.dressCode && (
          <div className="my-6 text-center text-xs font-sans text-[#594d42] bg-[#f0eae1] p-4 rounded-2xl border border-[#d6cbbe]">
            <span className="font-semibold uppercase tracking-wider block mb-1">Dress Code</span>
            <span>{invitation.dressCode}</span>
          </div>
        )}

        <ProgramTimeline
          programJson={invitation.programJson}
          cardClass="bg-[#f0eae1] border border-[#d6cbbe] text-[#3d332a]"
          dotClass="bg-[#8c7b6d]"
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

        <div className="text-center mt-10 pt-6 border-t border-[#d6cbbe]">
          <p className="text-xs uppercase tracking-widest text-[#8c7b6d] font-sans">
            Samimiyat va baxt tilaklari ila
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
