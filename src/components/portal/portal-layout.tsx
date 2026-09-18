import type { ReactNode } from 'react'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import { PortalSidebar } from '@/components/portal/portal-sidebar'

type PortalLayoutProps = {
  children: ReactNode
  title: string
  eyebrow?: string
  actions?: ReactNode
}

export function PortalLayout({ actions, children, eyebrow, title }: PortalLayoutProps) {
  const [navigationOpen, setNavigationOpen] = useState(false)

  return (
    <main className="flex min-h-screen bg-slate-50">
      <PortalSidebar className="hidden lg:flex" />
      {navigationOpen && (
        <div className="fixed inset-0 z-40 flex bg-slate-950/30 lg:hidden">
          <div className="flex h-full w-[min(86vw,320px)]">
            <PortalSidebar onNavigate={() => setNavigationOpen(false)} />
          </div>
          <button
            aria-label="Close navigation"
            className="flex flex-1 items-start justify-end bg-transparent p-5 text-white"
            onClick={() => setNavigationOpen(false)}
            type="button"
          >
            <X aria-hidden="true" className="size-6" strokeWidth={1.8} />
          </button>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <button
            aria-label="Open navigation"
            className="flex size-10 items-center justify-center bg-slate-100 text-slate-700 lg:hidden"
            onClick={() => setNavigationOpen(true)}
            type="button"
          >
            <Menu aria-hidden="true" className="size-5" strokeWidth={1.8} />
          </button>
          <div className="flex min-w-0 flex-1 flex-col">
            {eyebrow && <span className="text-[11px] font-semibold tracking-[0.12em] text-brand-700 uppercase">{eyebrow}</span>}
            <h1 className="truncate text-lg font-semibold tracking-[-0.02em] text-slate-950 sm:text-xl">{title}</h1>
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </header>
        <div className="flex flex-1 justify-center px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <div className="flex w-full max-w-7xl flex-col">{children}</div>
        </div>
      </div>
    </main>
  )
}
