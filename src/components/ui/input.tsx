import type { InputHTMLAttributes, ReactNode } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
  leadingIcon?: ReactNode
  trailingAction?: ReactNode
}

export function Input({ className = '', invalid = false, leadingIcon, trailingAction, ...props }: InputProps) {
  return (
    <div
      className={`flex h-12 items-center border bg-white transition-colors focus-within:border-brand-500 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-100 ${
        invalid ? 'border-red-400' : 'border-slate-300'
      } ${className}`}
    >
      {leadingIcon && <span className="flex shrink-0 items-center justify-center pl-3 text-slate-400">{leadingIcon}</span>}
      <input
        aria-invalid={invalid || undefined}
        className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-slate-950 outline-none placeholder:text-slate-400"
        {...props}
      />
      {trailingAction && <span className="flex shrink-0 items-center justify-center pr-2">{trailingAction}</span>}
    </div>
  )
}
