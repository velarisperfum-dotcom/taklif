import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection } from './components/TemplateCommon'
import { Heart, Share2, Crown, Sparkles } from 'lucide-react'

export const RoyalGold: React.FC<TemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#2c2720] selection:bg-[#d4af37]/30 selection:text-stone-900 font-serif-cormorant relative overflow-hidden py-10 px-4 sm:px-6">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#d4af37]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#c5a059]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Music Player */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <MusicPlayer musicUrl={invitation.musicUrl} title="Qirollik kuylari" />
        <button
          onClick={() => setShareOpen(true)}
          className="p-2.5 rounded-full bg-white/80 border border-[#d4af37]/40 text-[#8c7335] hover:bg-[#d4af37] hover:text-white transition-all shadow-sm cursor-pointer"
          title="Ulashish"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Luxury Frame */}
      <div className="max-w-3xl mx-auto bg-[#ffffff]/90 backdrop-blur-md rounded-3xl p-6 sm:p-12 border-2 border-[#d4af37]/40 shadow-2xl shadow-[#c5a059]/10 relative">
        {/* Double inner gold border */}
        <div className="border border-[#d4af37]/30 rounded-2xl p-6 sm:p-10 relative">
          {/* Corner gold emblems */}
          <div className="absolute top-2 left-2 text-[#c5a059] opacity-80 text-xs">✤</div>
          <div className="absolute top-2 right-2 text-[#c5a059] opacity-80 text-xs">✤</div>
          <div className="absolute bottom-2 left-2 text-[#c5a059] opacity-80 text-xs">✤</div>
          <div className="absolute bottom-2 right-2 text-[#c5a059] opacity-80 text-xs">✤</div>

          {/* Top Royal Emblem */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#d4af37] bg-[#fbf8f2] text-[#c5a059] shadow-inner mb-3">
              <Crown className="w-7 h-7" />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c7335] font-sans font-semibold">
              {invitation.coverTitle || 'Nikoh To‘yi Tantanasi'}
            </p>
          </div>

          {/* Bride & Groom Names */}
          <div className="text-center my-6 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1c1813] break-words">
              {invitation.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-2 text-[#c5a059]">
              <span className="w-12 h-px bg-[#c5a059]/60" />
              <Heart className="w-5 h-5 fill-[#c5a059]/20" />
              <span className="w-12 h-px bg-[#c5a059]/60" />
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1c1813] break-words">
              {invitation.brideName}
            </h1>
          </div>

          {/* Invitation Message */}
          <div className="text-center max-w-xl mx-auto my-8">
            <p className="text-base sm:text-xl italic leading-relaxed text-[#4a4237]">
              "{invitation.invitationMessage || 'Sizni hayotimizdagi eng quvonchli kunimiz — nikoh to‘yimiz munosabati bilan yoziladigan dasturxonimizga lutfan taklif etamiz.'}"
            </p>
          </div>

          {/* Date & Time Badge */}
          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass="border-[#d4af37]/50 bg-[#fbf8f2]"
              textClass="text-[#2c2720]"
            />
          </div>

          {/* Countdown Timer */}
          <div className="my-10 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8c7335] font-sans font-semibold block mb-3">
              To‘y tantanasiga qadar
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant="gold"
            />
          </div>

          {/* Parents Section */}
          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass="text-[#4a4237]"
          />

          {/* Venue & Location */}
          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#fbf8f2] border border-[#d4af37]/30">
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass="text-[#2c2720]"
              buttonClass="bg-[#c5a059] text-white hover:bg-[#b08b47]"
            />
          </div>

          {/* Dress Code if provided */}
          {invitation.dressCode && (
            <div className="my-6 text-center text-xs font-sans text-[#8c7335] bg-[#fbf8f2] p-4 rounded-xl border border-[#d4af37]/30">
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span>{invitation.dressCode}</span>
            </div>
          )}

          {/* Program Timeline */}
          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass="bg-[#fbf8f2] border border-[#d4af37]/40 text-[#2c2720]"
            dotClass="bg-[#c5a059]"
          />

          {/* RSVP Form */}
          {!isPreview && (
            <div className="my-10">
              <RsvpForm
                slug={invitation.publicSlug}
                themeVariant="light"
                onSubmitted={onRsvpSubmitted}
              />
            </div>
          )}

          {/* Footer note */}
          <div className="text-center mt-10 pt-6 border-t border-[#d4af37]/30">
            <p className="text-xs uppercase tracking-widest text-[#8c7335] font-sans">
              Tashrifingiz biz uchun katta sharafdir!
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
