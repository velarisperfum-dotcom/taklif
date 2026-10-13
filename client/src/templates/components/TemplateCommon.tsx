import React from 'react'
import { MapPin, Navigation, Calendar, Clock, Sparkles, Heart, Camera, Image as ImageIcon } from 'lucide-react'
import { ProgramItem } from '../../types'
import { formatUzbekDate } from '../../utils/date'

interface VenueSectionProps {
  venueName: string
  venueAddress: string
  mapUrl?: string | null
  themeClass?: string
  buttonClass?: string
}

export const VenueInfo: React.FC<VenueSectionProps> = ({
  venueName,
  venueAddress,
  mapUrl,
  themeClass = 'text-stone-800',
  buttonClass = 'bg-amber-500 text-stone-950 hover:bg-amber-400',
}) => {
  return (
    <div className={`text-center space-y-4 ${themeClass}`}>
      {/* Animated Radar Location Pin */}
      <div className="relative inline-flex items-center justify-center p-3 mb-1">
        <span className="absolute w-12 h-12 rounded-full bg-amber-400/20 animate-radar-ring pointer-events-none" />
        <span className="absolute w-8 h-8 rounded-full bg-amber-500/30 animate-ping pointer-events-none" />
        <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <MapPin className="w-6 h-6 text-stone-950 animate-bounce" />
        </div>
      </div>

      <h3 className="text-2xl sm:text-3xl font-serif-cormorant font-bold tracking-tight">
        {venueName}
      </h3>
      <p className="text-xs sm:text-sm opacity-85 max-w-md mx-auto leading-relaxed">
        {venueAddress}
      </p>

      {mapUrl && (
        <div className="pt-2">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all shadow-lg hover:shadow-xl cursor-pointer active:scale-95 group ${buttonClass}`}
          >
            <Navigation className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            <span>Xaritada ochish (Google / Yandex Maps)</span>
          </a>
        </div>
      )}
    </div>
  )
}

interface DateBadgeProps {
  weddingDate: string
  weddingTime: string
  borderClass?: string
  textClass?: string
}

export const DateBadge: React.FC<DateBadgeProps> = ({
  weddingDate,
  weddingTime,
  borderClass = 'border-amber-500/40',
  textClass = 'text-stone-900',
}) => {
  const formattedDate = formatUzbekDate(weddingDate)

  return (
    <div
      className={`inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-6 py-4 rounded-2xl border ${borderClass} ${textClass} backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 group`}
    >
      <div className="flex items-center gap-2.5 font-serif-cormorant text-lg sm:text-xl font-bold">
        <Calendar className="w-5 h-5 text-amber-500 shrink-0 group-hover:rotate-12 transition-transform" />
        <span>{formattedDate}</span>
      </div>
      <div className="hidden sm:block w-px h-6 bg-current opacity-30" />
      <div className="flex items-center gap-2 font-mono text-sm sm:text-base font-semibold">
        <Clock className="w-4 h-4 text-amber-500 shrink-0" />
        <span>Soat {weddingTime}</span>
      </div>
    </div>
  )
}

interface ProgramTimelineProps {
  programJson?: string | null
  cardClass?: string
  dotClass?: string
}

export const ProgramTimeline: React.FC<ProgramTimelineProps> = ({
  programJson,
  cardClass = 'bg-stone-900/60 border border-stone-800 text-stone-200',
  dotClass = 'bg-amber-500',
}) => {
  if (!programJson) return null

  let items: ProgramItem[] = []
  try {
    items = JSON.parse(programJson)
  } catch {
    return null
  }

  if (!Array.isArray(items) || items.length === 0) return null

  return (
    <div className="w-full max-w-lg mx-auto my-8 space-y-4">
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-widest uppercase opacity-75 block mb-1">
          Dastur
        </span>
        <h4 className="text-xl sm:text-2xl font-serif-cormorant font-bold">
          To‘y tantanasi tartibi
        </h4>
      </div>

      <div className="space-y-3 relative">
        {/* Subtle connecting vertical line */}
        <div className="absolute left-[3.25rem] top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-500/40 via-amber-400/20 to-transparent pointer-events-none hidden sm:block" />

        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-md backdrop-blur-md ${cardClass}`}
          >
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              {item.time}
            </span>
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 shadow-sm animate-pulse ${dotClass}`} />
            <span className="text-xs sm:text-sm font-medium flex-1 text-left">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ParentsSectionProps {
  groomParents?: string | null
  brideParents?: string | null
  textClass?: string
}

export const ParentsSection: React.FC<ParentsSectionProps> = ({
  groomParents,
  brideParents,
  textClass = 'text-stone-300',
}) => {
  if (!groomParents && !brideParents) return null

  return (
    <div className={`max-w-xl mx-auto my-8 p-6 sm:p-8 rounded-3xl border border-current/15 text-center backdrop-blur-sm shadow-lg ${textClass}`}>
      <span className="text-xs font-semibold tracking-widest uppercase opacity-75 block mb-3">
        To‘y egalari
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
        {groomParents && (
          <div className="p-4 rounded-2xl bg-current/5 border border-current/10 transition-all hover:bg-current/10">
            <span className="font-semibold block opacity-80 mb-1">Kuyovning ota-onasi:</span>
            <span className="font-serif-cormorant text-base sm:text-lg font-bold">{groomParents}</span>
          </div>
        )}
        {brideParents && (
          <div className="p-4 rounded-2xl bg-current/5 border border-current/10 transition-all hover:bg-current/10">
            <span className="font-semibold block opacity-80 mb-1">Kelinning ota-onasi:</span>
            <span className="font-serif-cormorant text-base sm:text-lg font-bold">{brideParents}</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface StoryPhotoGalleryProps {
  photos: { url: string; caption: string }[]
  title?: string
  cardClass?: string
}

export const StoryPhotoGallery: React.FC<StoryPhotoGalleryProps> = ({
  photos,
  title = 'Bizning baxtli lahzalarimiz',
  cardClass = 'bg-white/90 border-stone-200/80 text-stone-800',
}) => {
  if (!photos || photos.length === 0) return null

  return (
    <div className="w-full max-w-xl mx-auto my-10 space-y-4">
      <div className="text-center mb-6 space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold opacity-75">
          <Camera className="w-3.5 h-3.5 text-amber-500" />
          <span>Foto Galereya</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif-cormorant font-bold">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {photos.map((item, idx) => (
          <div
            key={idx}
            className={`group rounded-2xl overflow-hidden border p-2 shadow-lg transition-all duration-500 hover:scale-105 hover:-rotate-1 ${cardClass}`}
          >
            <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-stone-900/10">
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-[11px] font-medium tracking-wide text-center py-2 truncate opacity-85">
              {item.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
