import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  fullWidth?: boolean
  loading?: boolean
  trailingIcon?: ReactNode
  variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'border-brand-500 bg-brand-400 text-slate-950 hover:bg-brand-300 focus-visible:outline-brand-500',
  secondary: 'border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline-brand-500',
}

export function Button({
  children,
  className = '',
  disabled,
  fullWidth = false,
  loading = false,
  trailingIcon,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`flex h-12 items-center justify-center gap-2 border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" strokeWidth={1.8} />}
      <span>{children}</span>
      {!loading && trailingIcon}
    </button>
  )
}
