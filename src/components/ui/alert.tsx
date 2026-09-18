import type { ReactNode } from 'react'
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react'

type AlertVariant = 'error' | 'info' | 'success' | 'warning'

type AlertProps = {
  children: ReactNode
  onDismiss?: () => void
  title: string
  variant?: AlertVariant
}

const variantStyles: Record<AlertVariant, { container: string; icon: typeof Info }> = {
  error: {
    container: 'border-red-200 bg-red-50 text-red-950',
    icon: CircleAlert,
  },
  info: {
    container: 'border-brand-200 bg-brand-50 text-brand-950',
    icon: Info,
  },
  success: {
    container: 'border-emerald-200 bg-emerald-50 text-emerald-950',
    icon: CircleCheck,
  },
  warning: {
    container: 'border-amber-200 bg-amber-50 text-amber-950',
    icon: TriangleAlert,
  },
}

export function Alert({ children, onDismiss, title, variant = 'info' }: AlertProps) {
  const { container, icon: Icon } = variantStyles[variant]

  return (
    <div className={`flex items-start gap-3 border px-4 py-3 ${container}`} role={variant === 'error' ? 'alert' : 'status'}>
      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.8} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-sm font-semibold">{title}</p>
        <div className="flex flex-col text-sm leading-6 opacity-90">{children}</div>
      </div>
      {onDismiss && (
        <button
          aria-label="Dismiss alert"
          className="flex size-8 shrink-0 items-center justify-center border border-current/20 transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          onClick={onDismiss}
          type="button"
        >
          <X aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </button>
      )}
    </div>
  )
}
