import React, { useState, useRef, useEffect } from 'react'
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react'

interface MusicPlayerProps {
  musicUrl?: string | null
  title?: string
  className?: string
  darkTheme?: boolean
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  musicUrl,
  title = "To'y musiqasi",
  className = '',
  darkTheme = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Default pleasant romantic classical background music if custom url isn't provided
  const activeUrl = musicUrl || 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c2957b4455.mp3'

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.warn('Audio playback restriction:', err)
      })
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 shadow-md ${
        darkTheme
          ? 'bg-stone-900/80 border border-stone-700/60 text-stone-200 hover:border-amber-500/50'
          : 'bg-white/90 border border-stone-200 text-stone-800 hover:border-stone-400'
      } backdrop-blur-md cursor-pointer ${className}`}
      onClick={togglePlay}
    >
      <audio
        ref={audioRef}
        src={activeUrl}
        loop
        preload="none"
        onEnded={() => setIsPlaying(false)}
      />

      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
          isPlaying ? 'scale-105 bg-amber-500 text-stone-950 shadow-sm' : darkTheme ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-700'
        }`}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </div>

      <div className="flex flex-col text-left">
        <span className="text-xs font-medium tracking-wide flex items-center gap-1.5">
          <Music className={`w-3 h-3 ${isPlaying ? 'animate-bounce text-amber-500' : 'text-stone-400'}`} />
          {title}
        </span>
        <span className="text-[10px] text-stone-400 font-normal">
          {isPlaying ? 'Musiqa yangramoqda' : 'Musiqani yoqish uchun bosing'}
        </span>
      </div>

      {isPlaying && (
        <button
          type="button"
          onClick={toggleMute}
          className="p-1 hover:opacity-75 transition-opacity text-stone-400"
          title={isMuted ? 'Ovozni yoqish' : 'Ovozni o‘chirish'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-500" />}
        </button>
      )}
    </div>
  )
}
