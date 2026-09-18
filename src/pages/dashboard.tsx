import Head from 'next/head'
import Link from 'next/link'
import {
  ArrowUpRight,
  CalendarClock,
  FileText,
  MessageSquareText,
  ReceiptText,
  SquareCheckBig,
} from 'lucide-react'

import { PortalLayout } from '@/components/portal/portal-layout'
import { StatusBadge } from '@/components/portal/status-badge'
import { complianceItems, portalMessages, portalRequests } from '@/data/portal'
import { usePortalSummary } from '@/hooks/use-portal-summary'
import { getProtectedPageProps } from '@/lib/protected-page'

export default function DashboardPage() {
  const { data } = usePortalSummary()

  const metrics = [
    {
      label: 'Open requests',
      value: data?.openRequests ?? 3,
      icon: SquareCheckBig,
      href: '/requests',
    },
    {
      label: 'Unread messages',
      value: data?.unreadMessages ?? 2,
      icon: MessageSquareText,
      href: '/messages',
    },
    {
      label: 'Documents',
      value: data?.availableDocuments ?? 14,
      icon: FileText,
      href: '/documents',
    },
    {
      label: 'Current invoices',
      value: 1,
      icon: ReceiptText,
      href: '/invoices',
    },
  ]

  return (
    <>
      <Head>
        <title>Overview | Highveld Advisory</title>
      </Head>
      <PortalLayout eyebrow="Highveld Advisory" title="Client overview">
        <div className="grid gap-5 sm:gap-6">
          <section className="grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(({ href, icon: Icon, label, value }) => (
              <Link className="grid gap-4 bg-white p-5 transition-colors hover:bg-slate-50 sm:p-6" href={href} key={label}>
                <div className="flex items-center justify-between gap-3">
                  <div className="grid size-10 place-items-center bg-brand-50 text-brand-700">
                    <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
                  </div>
                  <ArrowUpRight aria-hidden="true" className="size-4 text-slate-400" strokeWidth={1.8} />
                </div>
                <div className="grid gap-1">
                  <span className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">{value}</span>
                  <span className="text-sm text-slate-500">{label}</span>
                </div>
              </Link>
            ))}
          </section>

          <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
            <div className="grid content-start bg-white border border-slate-200">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-4 sm:px-5">
                <div className="grid gap-1">
                  <h2 className="text-base font-semibold text-slate-950">Client requests</h2>
                  <p className="text-xs text-slate-500">Work currently moving through your advisory team.</p>
                </div>
                <Link className="text-xs font-semibold text-brand-700 hover:text-brand-800" href="/requests">
                  View all
                </Link>
              </div>
              <div className="grid">
                {portalRequests.map((request) => (
                  <div className="grid gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5" key={request.id}>
                    <div className="grid gap-1">
                      <span className="text-sm font-semibold text-slate-900">{request.title}</span>
                      <span className="text-xs text-slate-500">{request.service} · Updated {request.updatedAt}</span>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid content-start bg-white border border-slate-200">
              <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 sm:px-5">
                <CalendarClock aria-hidden="true" className="size-[18px] text-brand-700" strokeWidth={1.8} />
                <div className="grid gap-1">
                  <h2 className="text-base font-semibold text-slate-950">Compliance calendar</h2>
                  <p className="text-xs text-slate-500">Upcoming SARS and payroll obligations.</p>
                </div>
              </div>
              <div className="grid">
                {complianceItems.map((item) => (
                  <div className="grid gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:px-5" key={item.label}>
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold text-slate-900">{item.label}</span>
                      <StatusBadge status={item.status} />
                    </div>
                    <span className="text-xs text-slate-500">Due {item.due}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid content-start bg-white border border-slate-200">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-4 sm:px-5">
              <div className="grid gap-1">
                <h2 className="text-base font-semibold text-slate-950">Recent messages</h2>
                <p className="text-xs text-slate-500">Updates from your Highveld team.</p>
              </div>
              <Link className="text-xs font-semibold text-brand-700 hover:text-brand-800" href="/messages">
                Open inbox
              </Link>
            </div>
            <div className="grid">
              {portalMessages.slice(0, 2).map((message) => (
                <Link
                  className="grid gap-2 border-b border-slate-100 px-4 py-4 transition-colors last:border-b-0 hover:bg-slate-50 sm:grid-cols-[160px_minmax(0,1fr)_auto] sm:items-center sm:px-5"
                  href="/messages"
                  key={message.id}
                >
                  <span className="text-xs font-semibold text-slate-700">{message.sender}</span>
                  <div className="grid min-w-0 gap-1">
                    <span className="truncate text-sm font-semibold text-slate-900">{message.subject}</span>
                    <span className="truncate text-xs text-slate-500">{message.preview}</span>
                  </div>
                  <span className="text-xs text-slate-400">{message.receivedAt}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </PortalLayout>
    </>
  )
}

export const getServerSideProps = getProtectedPageProps
