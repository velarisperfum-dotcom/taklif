import React, { useState, useRef, useEffect } from 'react'
import { Music, Volume2, VolumeX, Play, Pause, Disc3, Sparkles } from 'lucide-react'

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
  const activeUrl =
    musicUrl || 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c2957b4455.mp3'

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
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
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
    <div className={`relative inline-flex items-center select-none ${className}`}>
      {/* Floating animated musical notes when playing */}
      {isPlaying && (
        <div className="absolute -top-4 left-4 pointer-events-none text-amber-500 font-bold text-xs flex gap-2">
          <span className="animate-note-float" style={{ animationDelay: '0s' }}>
            ♪
          </span>
          <span className="animate-note-float" style={{ animationDelay: '0.8s' }}>
            ♫
          </span>
          <span className="animate-note-float" style={{ animationDelay: '1.4s' }}>
            ♩
          </span>
        </div>
      )}

      <div
        className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 shadow-xl ${
          darkTheme
            ? 'bg-stone-900/90 border border-amber-500/40 text-stone-100 hover:border-amber-400'
            : 'bg-white/95 border border-amber-300/80 text-stone-800 hover:border-amber-500'
        } backdrop-blur-md cursor-pointer group active:scale-95`}
        onClick={togglePlay}
      >
        <audio
          ref={audioRef}
          src={activeUrl}
          loop
          preload="none"
          onEnded={() => setIsPlaying(false)}
        />

        {/* Rotating vinyl disk icon */}
        <div className="relative">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
              isPlaying
                ? 'bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 animate-music-spin'
                : darkTheme
                ? 'bg-stone-800 text-stone-300'
                : 'bg-stone-100 text-stone-700'
            }`}
          >
            {isPlaying ? (
              <Disc3 className="w-5 h-5 text-stone-950" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </div>

          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
          )}
        </div>

        {/* Title and Animated Equalizer */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wide font-sans">{title}</span>

            {/* 4-Bar Equalizer Waveform */}
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3.5 pb-0.5">
                <span className="w-0.5 bg-amber-500 rounded-full animate-eq-1" />
                <span className="w-0.5 bg-amber-500 rounded-full animate-eq-2" />
                <span className="w-0.5 bg-amber-500 rounded-full animate-eq-3" />
                <span className="w-0.5 bg-amber-500 rounded-full animate-eq-4" />
              </div>
            ) : (
              <Sparkles className="w-3 h-3 text-amber-500 opacity-60" />
            )}
          </div>

          <span className="text-[10px] text-amber-600/90 dark:text-amber-400/80 font-normal">
            {isPlaying ? 'Musiqa yangramoqda' : 'Musiqani yoqish uchun bosing'}
          </span>
        </div>

        {isPlaying && (
          <button
            type="button"
            onClick={toggleMute}
            className="p-1 hover:opacity-75 transition-opacity text-stone-400 hover:text-amber-500 cursor-pointer"
            title={isMuted ? 'Ovozni yoqish' : 'Ovozni o‘chirish'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-amber-500" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
