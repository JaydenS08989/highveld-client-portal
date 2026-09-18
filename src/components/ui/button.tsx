import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  fullWidth?: boolean
  leadingIcon?: ReactNode
  loading?: boolean
  trailingIcon?: ReactNode
  variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand-400 text-slate-950 hover:bg-brand-300 focus-visible:outline-brand-500',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:outline-brand-500',
  danger: 'bg-red-50 text-red-700 hover:bg-red-100 focus-visible:outline-red-500',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-brand-500',
}

export function Button({
  children,
  className = '',
  disabled,
  fullWidth = false,
  leadingIcon,
  loading = false,
  trailingIcon,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`flex h-12 items-center justify-center gap-2 px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading ? (
        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" strokeWidth={1.8} />
      ) : (
        leadingIcon
      )}
      <span>{children}</span>
      {!loading && trailingIcon}
    </button>
  )
}
