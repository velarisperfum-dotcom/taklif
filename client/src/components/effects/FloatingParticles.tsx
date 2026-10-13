import React, { useMemo } from 'react'

interface FloatingParticlesProps {
  type?: 'petals' | 'gold-sparkles' | 'stars' | 'hearts' | 'bokeh'
  count?: number
}

interface Particle {
  id: number
  left: number // 0-100%
  top: number // 0-100%
  size: number // px
  duration: number // seconds
  delay: number // seconds
  opacity: number
  drift: number // px horizontal sway
  rotation: number // deg
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  type = 'gold-sparkles',
  count = 24,
}) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: type === 'petals' ? Math.floor(Math.random() * 14 + 12) : Math.floor(Math.random() * 10 + 6),
      duration: Math.random() * 8 + (type === 'petals' ? 7 : 5),
      delay: Math.random() * 6,
      opacity: Math.random() * 0.5 + 0.4,
      drift: (Math.random() - 0.5) * 80,
      rotation: Math.random() * 360,
    }))
  }, [count, type])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => {
        if (type === 'petals') {
          // Falling rose petal
          return (
            <div
              key={p.id}
              className="absolute animate-float-gentle"
              style={{
                left: `${p.left}%`,
                top: `${(p.top + (Date.now() % 1000) / 100) % 100}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `-${p.delay}s`,
                opacity: p.opacity,
                transform: `rotate(${p.rotation}deg)`,
              }}
            >
              <svg
                width={p.size}
                height={p.size * 1.3}
                viewBox="0 0 24 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-sm"
              >
                <path
                  d="M12 0C7 8 0 14 0 22C0 27.5 5.4 32 12 32C18.6 32 24 27.5 24 22C24 14 17 8 12 0Z"
                  fill="url(#petal-grad)"
                />
                <defs>
                  <linearGradient id="petal-grad" x1="0" y1="0" x2="24" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f43f5e" stopOpacity="0.85" />
                    <stop offset="0.6" stopColor="#fb7185" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#fda4af" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )
        }

        if (type === 'stars') {
          return (
            <div
              key={p.id}
              className="absolute animate-twinkle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration * 0.6}s`,
                animationDelay: `-${p.delay}s`,
                opacity: p.opacity,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-amber-200">
                <path
                  d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                  fill="currentColor"
                  opacity={p.opacity}
                />
              </svg>
            </div>
          )
        }

        if (type === 'hearts') {
          return (
            <div
              key={p.id}
              className="absolute animate-float-gentle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                fontSize: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `-${p.delay}s`,
                opacity: p.opacity * 0.7,
              }}
            >
              ❤️
            </div>
          )
        }

        if (type === 'bokeh') {
          return (
            <div
              key={p.id}
              className="absolute rounded-full bg-amber-200/40 blur-sm animate-pulse-gentle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size * 2}px`,
                height: `${p.size * 2}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `-${p.delay}s`,
                opacity: p.opacity * 0.5,
              }}
            />
          )
        }

        // Default: Golden sparkles / stardust
        return (
          <div
            key={p.id}
            className="absolute animate-twinkle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration * 0.7}s`,
              animationDelay: `-${p.delay}s`,
              opacity: p.opacity,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]">
              <path
                d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        )
      })}
    </div>
  )
}
