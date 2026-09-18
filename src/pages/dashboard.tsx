import { UserButton } from '@clerk/nextjs'
import { buildClerkProps, getAuth } from '@clerk/nextjs/server'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { FileText, MessageSquareText, RefreshCw } from 'lucide-react'

import { Alert } from '@/components/ui/alert'
import { BrandMark } from '@/components/brand/brand-mark'
import { usePortalSummary } from '@/hooks/use-portal-summary'

export default function DashboardPage() {
  const { data, error, status } = usePortalSummary()

  return (
    <>
      <Head>
        <title>Dashboard | Highveld Client Portal</title>
      </Head>
      <main className="flex min-h-screen flex-col bg-white">
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 sm:px-10">
          <BrandMark />
          <UserButton />
        </header>
        <section className="flex w-full flex-1 justify-center px-6 py-10 sm:px-10">
          <div className="flex w-full max-w-5xl flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">Client dashboard</span>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                {data ? `Welcome, ${data.clientName}` : 'Your client portal'}
              </h1>
            </div>
            {status === 'loading' && (
              <div className="flex items-center gap-3 border border-slate-200 px-4 py-4 text-sm text-slate-500">
                <RefreshCw aria-hidden="true" className="size-4 animate-spin" strokeWidth={1.8} />
                Loading your portal summary
              </div>
            )}
            {error && (
              <Alert title="Portal data unavailable" variant="error">
                {error}
              </Alert>
            )}
            {data && (
              <div className="flex flex-col border border-slate-200 sm:flex-row">
                <div className="flex flex-1 flex-col gap-2 border-b border-slate-200 p-6 sm:border-r sm:border-b-0">
                  <MessageSquareText aria-hidden="true" className="size-5 text-brand-700" strokeWidth={1.8} />
                  <span className="text-3xl font-semibold text-slate-950">{data.openRequests}</span>
                  <span className="text-sm text-slate-500">Open requests</span>
                </div>
                <div className="flex flex-1 flex-col gap-2 border-b border-slate-200 p-6 sm:border-r sm:border-b-0">
                  <MessageSquareText aria-hidden="true" className="size-5 text-brand-700" strokeWidth={1.8} />
                  <span className="text-3xl font-semibold text-slate-950">{data.unreadMessages}</span>
                  <span className="text-sm text-slate-500">Unread messages</span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <FileText aria-hidden="true" className="size-5 text-brand-700" strokeWidth={1.8} />
                  <span className="text-3xl font-semibold text-slate-950">{data.availableDocuments}</span>
                  <span className="text-sm text-slate-500">Available documents</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated } = getAuth(context.req)

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      ...buildClerkProps(context.req),
    },
  }
}
