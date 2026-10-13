import React, { useState } from 'react'
import { Sparkles, Mail, Heart, ChevronDown } from 'lucide-react'
import confetti from 'canvas-confetti'

interface InteractiveEnvelopeProps {
  groomName: string
  brideName: string
  weddingDate: string
  invitationMessage?: string | null
  groomParents?: string | null
  brideParents?: string | null
  accentColor?: string
  defaultOpen?: boolean
  onToggle?: (isOpen: boolean) => void
}

export const InteractiveEnvelope: React.FC<InteractiveEnvelopeProps> = ({
  groomName,
  brideName,
  weddingDate,
  invitationMessage,
  groomParents,
  brideParents,
  accentColor = '#d4af37',
  defaultOpen = false,
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const groomInitial = (groomName || 'K')[0].toUpperCase()
  const brideInitial = (brideName || 'K')[0].toUpperCase()
  const monogram = `${groomInitial} & ${brideInitial}`

  const handleToggle = () => {
    const nextState = !isOpen
    setIsOpen(nextState)
    if (onToggle) onToggle(nextState)

    if (nextState) {
      // Fire festive sparkle confetti when opened!
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f59e0b', '#fb7185', '#ffffff'],
      })
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto my-8 select-none">
      {/* Interactive Envelope Container */}
      <div
        onClick={handleToggle}
        className="relative bg-gradient-to-b from-amber-50/90 via-stone-100 to-amber-100/70 p-4 pt-10 pb-8 rounded-3xl border-2 border-amber-300/60 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group"
      >
        {/* Envelope Top Flap Simulation */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-t-[42px] transition-all duration-700 origin-top ${
            isOpen
              ? 'border-t-amber-200/40 -translate-y-2 opacity-50'
              : 'border-t-amber-300/90 shadow-md group-hover:border-t-amber-400'
          }`}
        />

        {/* Wax Seal Badge in Center */}
        <div className="relative -top-6 flex flex-col items-center justify-center z-20">
          <div
            className={`w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 text-amber-100 flex items-center justify-center shadow-lg border-2 border-amber-200/80 transition-all duration-500 ${
              isOpen
                ? 'scale-90 opacity-70 rotate-12'
                : 'animate-pulse-gentle group-hover:scale-110 shadow-amber-500/30'
            }`}
          >
            <span className="font-serif-cormorant font-bold text-sm tracking-widest drop-shadow">
              {monogram}
            </span>
          </div>

          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 tracking-wide bg-amber-200/50 px-3 py-1 rounded-full border border-amber-300/50">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>{isOpen ? 'Maktubni yopish' : 'Taklifnomani ochish'}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </span>
          </div>
        </div>

        {/* Letter Card sliding out */}
        <div
          className={`bg-white rounded-2xl p-6 sm:p-7 shadow-lg border border-amber-100 transition-all duration-700 ease-out text-center space-y-4 ${
            isOpen
              ? 'translate-y-0 opacity-100 scale-100 shadow-2xl'
              : 'translate-y-3 opacity-95 scale-[0.98]'
          }`}
        >
          {/* Decorative Corner Ornaments */}
          <div className="text-amber-500/70 text-xs flex justify-between px-1">
            <span>✤</span>
            <span className="font-script-vibes text-lg text-amber-600">Assalomu alaykum</span>
            <span>✤</span>
          </div>

          {/* Invitation Text */}
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans font-normal italic">
            "{invitationMessage ||
              'Sizni hayotimizdagi eng baxtiyor kun — nikoh to‘yimizga bag‘ishlangan tantanali kechaning aziz mehmoni bo‘lishga taklif etamiz.'}"
          </p>

          {/* Parents information if present */}
          {(groomParents || brideParents) && (
            <div className="pt-3 border-t border-amber-100 space-y-2 text-xs text-stone-600">
              {groomParents && (
                <p>
                  <span className="font-semibold text-stone-800">Kuyov ota-onasi:</span>{' '}
                  {groomParents}
                </p>
              )}
              {brideParents && (
                <p>
                  <span className="font-semibold text-stone-800">Kelin ota-onasi:</span>{' '}
                  {brideParents}
                </p>
              )}
            </div>
          )}

          {/* Couple Signoff */}
          <div className="pt-2 text-center">
            <p className="font-script-vibes text-2xl sm:text-3xl text-amber-800">
              {groomName} & {brideName}
            </p>
            <div className="flex items-center justify-center gap-2 text-amber-400 mt-1">
              <span className="w-8 h-px bg-amber-200" />
              <Heart className="w-3.5 h-3.5 fill-amber-300 text-amber-400" />
              <span className="w-8 h-px bg-amber-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
