import Head from 'next/head'
import { Download, ReceiptText } from 'lucide-react'

import { PortalLayout } from '@/components/portal/portal-layout'
import { StatusBadge } from '@/components/portal/status-badge'
import { portalInvoices } from '@/data/portal'
import { getProtectedPageProps } from '@/lib/protected-page'

export default function InvoicesPage() {
  return (
    <>
      <Head>
        <title>Invoices | Highveld Advisory</title>
      </Head>
      <PortalLayout eyebrow="Billing" title="Invoices & statements">
        <div className="grid gap-5">
          <section className="grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-3">
            <div className="grid gap-1 bg-white p-5">
              <span className="text-xs text-slate-500">Current balance</span>
              <span className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">R 4,850.00</span>
            </div>
            <div className="grid gap-1 bg-white p-5">
              <span className="text-xs text-slate-500">Next due date</span>
              <span className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">30 Sep</span>
            </div>
            <div className="grid gap-1 bg-white p-5">
              <span className="text-xs text-slate-500">Account standing</span>
              <span className="text-2xl font-semibold tracking-[-0.03em] text-emerald-700">Current</span>
            </div>
          </section>

          <section className="grid border border-slate-200 bg-white">
            {portalInvoices.map((invoice) => (
              <div
                className="grid gap-4 border-b border-slate-100 p-4 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)_120px_130px_auto_auto] sm:items-center sm:p-5"
                key={invoice.id}
              >
                <div className="grid size-10 place-items-center bg-brand-50 text-brand-700">
                  <ReceiptText aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
                </div>
                <div className="grid gap-1">
                  <span className="text-sm font-semibold text-slate-900">{invoice.reference}</span>
                  <span className="text-xs text-slate-500">Issued {invoice.issuedAt}</span>
                </div>
                <span className="text-xs text-slate-500">Due {invoice.dueAt}</span>
                <span className="text-sm font-semibold text-slate-900">{invoice.amount}</span>
                <StatusBadge status={invoice.status} />
                <button
                  aria-label={`Download invoice ${invoice.reference}`}
                  className="grid size-10 place-items-center bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-950"
                  type="button"
                >
                  <Download aria-hidden="true" className="size-4" strokeWidth={1.8} />
                </button>
              </div>
            ))}
          </section>
        </div>
      </PortalLayout>
    </>
  )
}

export const getServerSideProps = getProtectedPageProps
