import React, { useState } from 'react'
import { TemplateProps } from './types'
import { CountdownTimer } from '../components/CountdownTimer'
import { MusicPlayer } from '../components/MusicPlayer'
import { RsvpForm } from '../components/RsvpForm'
import { ShareModal } from '../components/ShareModal'
import { VenueInfo, DateBadge, ProgramTimeline, ParentsSection, StoryPhotoGallery } from './components/TemplateCommon'
import { FloatingParticles } from '../components/effects/FloatingParticles'
import { FloatingLoveReaction } from '../components/effects/FloatingLoveReaction'
import { InteractiveEnvelope } from '../components/effects/InteractiveEnvelope'
import { getTemplateTheme } from '../utils/templateThemes'
import { Share2, Heart, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

interface UniversalAnimatedTemplateProps extends TemplateProps {
  customHeroImage?: string
  customParticleType?: 'petals' | 'gold-sparkles' | 'stars' | 'hearts' | 'bokeh'
  darkTheme?: boolean
}

export const UniversalAnimatedTemplate: React.FC<UniversalAnimatedTemplateProps> = ({
  invitation,
  isPreview = false,
  onRsvpSubmitted,
  customHeroImage,
  customParticleType,
  darkTheme = false,
}) => {
  const [shareOpen, setShareOpen] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}/t/${invitation.publicSlug}` : ''

  const themeConfig = getTemplateTheme(invitation.templateId)
  const heroImage = customHeroImage || themeConfig.heroImage
  const particleType = customParticleType || themeConfig.particleType

  const handleRsvpSuccess = () => {
    confetti({
      particleCount: 85,
      spread: 90,
      origin: { y: 0.6 },
      colors: [themeConfig.accentColor, '#ffd700', '#ffffff', '#f43f5e'],
    })
    if (onRsvpSubmitted) onRsvpSubmitted()
  }

  const isDark = darkTheme || invitation.templateId.includes('night') || invitation.templateId.includes('dark') || invitation.templateId.includes('black') || invitation.templateId.includes('oriental') || invitation.templateId.includes('burgundy')

  return (
    <div
      className={`min-h-screen font-serif-cormorant relative py-12 px-4 sm:px-6 overflow-hidden ${
        isDark ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'
      }`}
    >
      {/* Floating Animated Particles */}
      <FloatingParticles type={particleType} count={22} />

      {/* Floating Love Reaction */}
      <FloatingLoveReaction invitationId={invitation.id || invitation.publicSlug} />

      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none animate-pulse-gentle opacity-25"
        style={{ backgroundColor: themeConfig.accentColor }}
      />

      {/* Top action bar */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6 relative z-10">
        <MusicPlayer
          musicUrl={invitation.musicUrl}
          title={themeConfig.musicTitle}
          darkTheme={isDark}
        />
        <button
          onClick={() => setShareOpen(true)}
          className={`p-2.5 rounded-full border shadow-md cursor-pointer active:scale-95 transition-all ${
            isDark
              ? 'bg-stone-900 border-stone-800 text-stone-200 hover:text-white'
              : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Container Card */}
      <div
        className={`max-w-3xl mx-auto rounded-3xl p-6 sm:p-12 border-2 shadow-2xl relative z-10 backdrop-blur-xl ${
          isDark
            ? 'bg-stone-900/90 border-stone-800/80'
            : 'bg-white/95 border-amber-200/80 shadow-amber-900/5'
        }`}
      >
        <div
          className={`border rounded-2xl p-6 sm:p-10 relative ${
            isDark ? 'border-stone-800' : 'border-stone-200/60'
          }`}
        >
          {/* Header Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 mb-2 shadow-sm animate-float-gentle">
              <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <p
              className="text-xs uppercase tracking-[0.35em] font-sans font-bold"
              style={{ color: themeConfig.accentColor }}
            >
              {invitation.coverTitle || 'Nikoh To‘yi Tantanasi'}
            </p>
          </div>

          {/* Hero Scenery Photo with Ken Burns slow zoom */}
          <div className="relative rounded-2xl overflow-hidden mb-8 h-48 sm:h-64 shadow-xl border border-current/15 group">
            <div
              className="absolute inset-0 bg-cover bg-center animate-ken-burns transform scale-105"
              style={{ backgroundImage: `url('${heroImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/25 to-transparent flex items-end justify-center p-6 text-center">
              <span className="text-white text-sm sm:text-base font-serif-cormorant italic tracking-wider drop-shadow-md">
                "Ikki qalbning muqaddas visol oqshomi"
              </span>
            </div>
          </div>

          {/* Bride & Groom Names */}
          <div className="text-center my-8 space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight break-words font-display-playfair hover:scale-105 transition-transform duration-500 animate-gold-sheen">
              {invitation.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-2 opacity-80">
              <span className="w-12 h-px bg-current opacity-40" />
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500/20 animate-heartbeat" />
              <span className="w-12 h-px bg-current opacity-40" />
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight break-words font-display-playfair hover:scale-105 transition-transform duration-500 animate-gold-sheen">
              {invitation.brideName}
            </h1>
          </div>

          {/* Interactive Envelope Ceremony */}
          <InteractiveEnvelope
            groomName={invitation.groomName}
            brideName={invitation.brideName}
            weddingDate={invitation.weddingDate}
            invitationMessage={invitation.invitationMessage}
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            defaultOpen={true}
          />

          {/* Date & Time Badge */}
          <div className="text-center my-8">
            <DateBadge
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              borderClass={isDark ? 'border-stone-700 bg-stone-800/80' : 'border-amber-200 bg-amber-50/60'}
              textClass={isDark ? 'text-stone-100' : 'text-stone-900'}
            />
          </div>

          {/* Countdown Timer */}
          <div className="my-10 text-center">
            <span
              className="text-xs uppercase tracking-[0.25em] font-sans font-bold block mb-3 opacity-90"
              style={{ color: themeConfig.accentColor }}
            >
              To‘y tantanasiga qadar
            </span>
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              variant={isDark ? 'dark' : 'gold'}
            />
          </div>

          {/* Photo Gallery */}
          <StoryPhotoGallery
            photos={themeConfig.galleryImages}
            cardClass={isDark ? 'bg-stone-800/80 border-stone-700 text-stone-200' : 'bg-stone-50 border-stone-200 text-stone-800'}
          />

          {/* Parents Section */}
          <ParentsSection
            groomParents={invitation.groomParents}
            brideParents={invitation.brideParents}
            textClass={isDark ? 'text-stone-300' : 'text-stone-700'}
          />

          {/* Venue & Location with Radar Pin */}
          <div
            className={`my-10 p-6 sm:p-8 rounded-2xl border shadow-inner ${
              isDark ? 'bg-stone-800/60 border-stone-700' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <VenueInfo
              venueName={invitation.venueName}
              venueAddress={invitation.venueAddress}
              mapUrl={invitation.mapUrl}
              themeClass={isDark ? 'text-stone-100' : 'text-stone-900'}
              buttonClass="bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold hover:brightness-105 shadow-md"
            />
          </div>

          {/* Dress Code */}
          {invitation.dressCode && (
            <div
              className={`my-6 text-center text-xs font-sans p-4 rounded-xl border ${
                isDark ? 'bg-stone-800/50 border-stone-700 text-amber-300' : 'bg-stone-50 border-stone-200 text-amber-800'
              }`}
            >
              <span className="font-bold uppercase tracking-wider block mb-1">Dress Code</span>
              <span>{invitation.dressCode}</span>
            </div>
          )}

          {/* Program Timeline */}
          <ProgramTimeline
            programJson={invitation.programJson}
            cardClass={isDark ? 'bg-stone-800/80 border-stone-700 text-stone-200' : 'bg-stone-50 border-stone-200 text-stone-800'}
            dotClass="bg-amber-500"
          />

          {/* RSVP Form */}
          {!isPreview && (
            <div
              className={`my-10 p-6 sm:p-8 rounded-3xl border ${
                isDark ? 'bg-stone-800/60 border-stone-700' : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="text-center mb-6">
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold">
                  Ishtirokni tasdiqlash
                </h3>
                <p className="text-xs opacity-75 mt-1">
                  Kechamizda sizni ko‘rishdan mamnun bo‘lamiz
                </p>
              </div>
              <RsvpForm
                slug={invitation.publicSlug}
                themeVariant={isDark ? 'dark' : 'light'}
                onSubmitted={handleRsvpSuccess}
              />
            </div>
          )}

          <div className="text-center mt-10 pt-6 border-t border-current/15">
            <p className="text-xs uppercase tracking-widest font-sans font-semibold opacity-75">
              Tashrifingiz biz uchun cheksiz quvonchdir!
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
