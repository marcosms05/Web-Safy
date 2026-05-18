import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'utility'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: ReactNode
}

// Mapbox button system:
// primary  → signal blue pill (100px radius) — sole CTA
// outline  → transparent, silver border, pill (100px radius)
// ghost    → transparent, no border, no radius
// utility  → transparent, pewter border, 6px radius (tool controls)

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-signal text-white border-transparent hover:bg-deep-signal rounded-pill',
  outline: 'bg-transparent text-white border border-silver hover:border-white rounded-pill',
  ghost:   'bg-transparent text-white border-transparent hover:text-signal rounded-none',
  utility: 'bg-transparent text-white border border-pewter hover:border-silver rounded-input',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-body-sm gap-1.5',
  md: 'px-6 py-3 text-body   gap-2',
  lg: 'px-7 py-3.5 text-body gap-2.5',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={[
        'inline-flex items-center justify-center font-sans font-medium',
        'transition-all duration-150 cursor-pointer active:scale-[0.98]',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Calculando…
        </>
      ) : (
        children
      )}
    </button>
  )
}
