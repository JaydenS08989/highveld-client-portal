import Link from 'next/link'
import { useRouter } from 'next/router'
import { useClerk, useUser } from '@clerk/nextjs'
import {
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  ReceiptText,
  Settings,
  SquareCheckBig,
} from 'lucide-react'

import { BrandMark } from '@/components/brand/brand-mark'

type PortalSidebarProps = {
  className?: string
  onNavigate?: () => void
}

const navigation = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/requests', label: 'Requests', icon: SquareCheckBig },
  { href: '/invoices', label: 'Invoices', icon: ReceiptText },
  { href: '/messages', label: 'Messages', icon: MessageSquareText },
  { href: '/account', label: 'Account', icon: Settings },
]

export function PortalSidebar({ className = '', onNavigate }: PortalSidebarProps) {
  const router = useRouter()
  const { signOut } = useClerk()
  const { user } = useUser()
  const name = user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? 'Client'

  return (
    <aside className={`h-full w-full shrink-0 flex-col border-r border-slate-200 bg-white lg:w-64 ${className}`}>
      <div className="flex h-16 items-center px-5">
        <BrandMark />
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navigation.map(({ href, icon: Icon, label }) => {
          const active = router.pathname === href

          return (
            <Link
              className={`flex h-11 items-center gap-3 px-3 text-sm font-medium transition-colors ${active ? 'bg-brand-50 text-brand-800' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}
              href={href}
              key={href}
              onClick={onNavigate}
            >
              <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="flex flex-col gap-3 border-t border-slate-200 p-4">
        <div className="flex min-w-0 flex-col px-1">
          <span className="truncate text-sm font-semibold text-slate-950">{name}</span>
          <span className="truncate text-xs text-slate-500">Highveld client</span>
        </div>
        <button
          className="flex h-10 items-center gap-3 bg-slate-100 px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
          onClick={() => void signOut({ redirectUrl: '/' })}
          type="button"
        >
          <LogOut aria-hidden="true" className="size-4" strokeWidth={1.8} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
