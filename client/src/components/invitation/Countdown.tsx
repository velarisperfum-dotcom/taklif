import React from 'react'
import { CountdownTimer } from '../CountdownTimer'

interface CountdownProps {
  weddingDate: string
  weddingTime: string
  variant?: 'gold' | 'dark' | 'light' | 'rose' | 'emerald' | 'minimal'
  className?: string
}

export const Countdown: React.FC<CountdownProps> = (props) => {
  return <CountdownTimer {...props} />
}
