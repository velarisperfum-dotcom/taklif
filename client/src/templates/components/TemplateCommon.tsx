import React from 'react'
import { MapPin, Navigation, Calendar, Clock, Sparkles, Heart } from 'lucide-react'
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
    <div className={`text-center space-y-3 ${themeClass}`}>
      <div className="inline-flex p-3 rounded-full bg-stone-500/10 mb-1">
        <MapPin className="w-6 h-6 text-amber-500" />
      </div>
      <h3 className="text-2xl sm:text-3xl font-serif-cormorant font-bold">
        {venueName}
      </h3>
      <p className="text-xs sm:text-sm opacity-80 max-w-md mx-auto leading-relaxed">
        {venueAddress}
      </p>

      {mapUrl && (
        <div className="pt-2">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow cursor-pointer active:scale-95 ${buttonClass}`}
          >
            <Navigation className="w-4 h-4" />
            <span>Xaritada ochish (Google Maps)</span>
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
    <div className={`inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-6 py-3.5 rounded-2xl border ${borderClass} ${textClass} backdrop-blur-sm`}>
      <div className="flex items-center gap-2 font-serif-cormorant text-lg sm:text-xl font-semibold">
        <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
        <span>{formattedDate}</span>
      </div>
      <div className="hidden sm:block w-px h-5 bg-current opacity-30" />
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
  cardClass = 'bg-stone-900/50 border border-stone-800 text-stone-200',
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
    <div className="w-full max-w-lg mx-auto my-6 space-y-4">
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-widest uppercase opacity-70 block mb-1">
          Dastur
        </span>
        <h4 className="text-xl sm:text-2xl font-serif-cormorant font-bold">
          To‘y tartibi
        </h4>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all ${cardClass}`}
          >
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-stone-500/10 shrink-0">
              {item.time}
            </span>
            <div className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`} />
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
    <div className={`max-w-xl mx-auto my-6 p-6 rounded-3xl border border-current/10 text-center ${textClass}`}>
      <span className="text-xs font-semibold tracking-widest uppercase opacity-70 block mb-2">
        To‘y egalari
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
        {groomParents && (
          <div className="p-3 rounded-2xl bg-current/5">
            <span className="font-semibold block opacity-80 mb-0.5">Kuyovning ota-onasi:</span>
            <span className="font-serif-cormorant text-base sm:text-lg font-bold">{groomParents}</span>
          </div>
        )}
        {brideParents && (
          <div className="p-3 rounded-2xl bg-current/5">
            <span className="font-semibold block opacity-80 mb-0.5">Kelinning ota-onasi:</span>
            <span className="font-serif-cormorant text-base sm:text-lg font-bold">{brideParents}</span>
          </div>
        )}
      </div>
    </div>
  )
}
