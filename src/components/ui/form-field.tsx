import type { ReactNode } from 'react'

type FormFieldProps = {
  children: ReactNode
  error?: string
  htmlFor: string
  label: string
  optional?: boolean
}

export function FormField({ children, error, htmlFor, label, optional = false }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-slate-800" htmlFor={htmlFor}>
          {label}
        </label>
        {optional && <span className="text-xs text-slate-400">Optional</span>}
      </div>
      {children}
      {error && <p className="text-xs leading-5 text-red-600">{error}</p>}
    </div>
  )
}
