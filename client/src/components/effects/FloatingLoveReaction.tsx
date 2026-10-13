import React, { useState, useEffect } from 'react'
import { Heart, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

interface FloatingLoveReactionProps {
  invitationId?: string
  accentColor?: string
}

interface RisingHeart {
  id: number
  emoji: string
  x: number // px offset
  sway: number
  rotation: number
}

export const FloatingLoveReaction: React.FC<FloatingLoveReactionProps> = ({
  invitationId = 'default',
  accentColor = '#f43f5e',
}) => {
  const [likes, setLikes] = useState<number>(() => {
    const saved = localStorage.getItem(`love_likes_${invitationId}`)
    return saved ? parseInt(saved, 10) : 128
  })
  const [hearts, setHearts] = useState<RisingHeart[]>([])
  const [tapStreak, setTapStreak] = useState(0)

  useEffect(() => {
    localStorage.setItem(`love_likes_${invitationId}`, String(likes))
  }, [likes, invitationId])

  const emojis = ['❤️', '💖', '✨', '💕', '💍', '🌸', '🥂', '🎉']

  const handleSendLove = () => {
    setLikes((prev) => prev + 1)
    setTapStreak((prev) => {
      const next = prev + 1
      if (next % 5 === 0) {
        // Trigger mini celebration confetti on streaks!
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.85, x: 0.9 },
          colors: ['#f43f5e', '#fb7185', '#d4af37', '#ffd700'],
        })
      }
      return next
    })

    // Spawn 2-3 rising hearts
    const newHearts: RisingHeart[] = Array.from({ length: 3 }, () => ({
      id: Date.now() + Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: (Math.random() - 0.5) * 40,
      sway: (Math.random() - 0.5) * 60,
      rotation: (Math.random() - 0.5) * 40,
    }))

    setHearts((prev) => [...prev, ...newHearts])

    // Cleanup hearts after animation finishes
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)))
    }, 2200)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none no-print">
      {/* Rising animated hearts */}
      <div className="absolute bottom-16 right-4 pointer-events-none w-16 h-48 overflow-visible">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-0 text-2xl animate-rising-heart"
            style={
              {
                left: `${heart.x}px`,
                '--sway': `${heart.sway}px`,
                '--rot': `${heart.rotation}deg`,
              } as React.CSSProperties
            }
          >
            {heart.emoji}
          </div>
        ))}
      </div>

      {/* Floating interactive reaction button */}
      <button
        onClick={handleSendLove}
        className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-xl shadow-stone-900/15 border border-stone-200/80 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        title="Baxt tilash (Yurak yuborish)"
      >
        {/* Pulsing heart icon */}
        <div className="relative flex items-center justify-center">
          <Heart
            className="w-5 h-5 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform animate-heartbeat"
          />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold text-stone-900 leading-none flex items-center gap-1">
            <span>Baxt tilash</span>
            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
          </span>
          <span className="text-[10px] text-stone-500 font-mono font-medium">
            {likes.toLocaleString()}
          </span>
        </div>
      </button>
    </div>
  )
}
