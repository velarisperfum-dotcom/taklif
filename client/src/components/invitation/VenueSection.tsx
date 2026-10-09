import React from 'react'
import { MapPin, Navigation } from 'lucide-react'

interface VenueSectionProps {
  venueName: string
  venueAddress: string
  mapUrl?: string | null
  themeClass?: string
  buttonClass?: string
}

export const VenueSection: React.FC<VenueSectionProps> = ({
  venueName,
  venueAddress,
  mapUrl,
  themeClass = 'text-stone-800',
  buttonClass = 'bg-stone-900 text-white hover:bg-stone-800',
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
