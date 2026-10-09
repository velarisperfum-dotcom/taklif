import React from 'react'

export const Loader: React.FC<{ text?: string }> = ({ text = 'Yuklanmoqda...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-3 inline-block" />
      <span className="text-xs text-stone-500 font-medium">{text}</span>
    </div>
  )
}
