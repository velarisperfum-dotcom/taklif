import React, { useState, useEffect } from 'react'

interface CountdownProps {
  weddingDate: string // YYYY-MM-DD
  weddingTime: string // HH:mm
  variant?: 'gold' | 'dark' | 'light' | 'rose' | 'emerald' | 'minimal'
  className?: string
}

export const CountdownTimer: React.FC<CountdownProps> = ({
  weddingDate,
  weddingTime,
  variant = 'gold',
  className = '',
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
    isPast: boolean
    isToday: boolean
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
    isToday: false,
  })

  useEffect(() => {
    function calculate() {
      if (!weddingDate) return

      const timeStr = weddingTime || '18:00'
      const targetStr = `${weddingDate}T${timeStr}:00`
      const targetTime = new Date(targetStr).getTime()
      const now = new Date().getTime()
      const diff = targetTime - now

      if (isNaN(targetTime)) return

      if (diff <= 0) {
        const isToday = Math.abs(diff) < 24 * 60 * 60 * 1000
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
          isToday,
        })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds, isPast: false, isToday: false })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [weddingDate, weddingTime])

  if (timeLeft.isPast) {
    return (
      <div className={`text-center py-4 px-6 rounded-2xl ${className}`}>
        <p className="text-sm font-medium tracking-widest uppercase opacity-80">
          {timeLeft.isToday ? "Bugun bizning baxt to‘yimiz! 🎉" : "To‘y tantanasi bo‘lib o‘tdi ✨"}
        </p>
      </div>
    )
  }

  // Variant styles
  const styles = {
    gold: {
      box: 'bg-stone-900/60 border border-amber-500/30 text-amber-200 backdrop-blur-md shadow-lg shadow-amber-950/20',
      num: 'text-amber-300 font-serif-cormorant',
      label: 'text-amber-400/80',
    },
    dark: {
      box: 'bg-stone-900/80 border border-stone-700/60 text-stone-100 backdrop-blur-md shadow-xl',
      num: 'text-white font-serif-cormorant',
      label: 'text-stone-400',
    },
    light: {
      box: 'bg-white/80 border border-stone-200 text-stone-800 shadow-sm backdrop-blur-sm',
      num: 'text-stone-900 font-serif-cormorant',
      label: 'text-stone-500',
    },
    rose: {
      box: 'bg-rose-50/80 border border-rose-200/60 text-rose-900 backdrop-blur-sm shadow-sm',
      num: 'text-rose-800 font-serif-cormorant',
      label: 'text-rose-600/80',
    },
    emerald: {
      box: 'bg-emerald-950/70 border border-emerald-600/30 text-emerald-200 backdrop-blur-md',
      num: 'text-emerald-300 font-serif-cormorant',
      label: 'text-emerald-400/80',
    },
    minimal: {
      box: 'border-b border-current pb-2',
      num: 'font-mono text-current',
      label: 'text-current opacity-70',
    },
  }[variant]

  const items = [
    { value: timeLeft.days, label: 'Kun' },
    { value: timeLeft.hours, label: 'Soat' },
    { value: timeLeft.minutes, label: 'Daqiqa' },
    { value: timeLeft.seconds, label: 'Soniya' },
  ]

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center w-16 h-18 sm:w-20 sm:h-22 rounded-xl transition-all ${styles.box}`}
        >
          <span className={`text-2xl sm:text-3xl font-semibold tracking-tight ${styles.num}`}>
            {String(item.value).padStart(2, '0')}
          </span>
          <span className={`text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-1 ${styles.label}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
