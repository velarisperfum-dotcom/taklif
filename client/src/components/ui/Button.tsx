import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-semibold transition-all rounded-full cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-xs sm:text-sm',
    lg: 'px-8 py-3.5 text-sm sm:text-base',
  }[size]

  const variants = {
    primary: 'bg-stone-900 hover:bg-stone-800 text-white shadow-md shadow-stone-900/10',
    secondary: 'bg-stone-100 hover:bg-stone-200 text-stone-900',
    gold: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md shadow-amber-500/20',
    outline: 'border border-stone-300 hover:bg-stone-100 text-stone-800',
    ghost: 'hover:bg-stone-100 text-stone-700',
  }[variant]

  return (
    <button
      className={`${base} ${sizes} ${variants} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  )
}
