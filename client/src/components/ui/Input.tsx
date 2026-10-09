import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-stone-700 mb-1.5 text-left">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 rounded-2xl border text-sm outline-none transition-colors ${
          error
            ? 'border-rose-500 bg-rose-50/50 text-rose-900'
            : 'border-stone-200 bg-stone-50 text-stone-900 focus:border-stone-900'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-[11px] text-rose-500 mt-1 block text-left">{error}</span>}
    </div>
  )
}
