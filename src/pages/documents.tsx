import { useMemo, useState } from 'react'
import Head from 'next/head'
import { Download, FileText, Search } from 'lucide-react'

import { PortalLayout } from '@/components/portal/portal-layout'
import { Input } from '@/components/ui/input'
import { portalDocuments } from '@/data/portal'
import { getProtectedPageProps } from '@/lib/protected-page'

export default function DocumentsPage() {
  const [query, setQuery] = useState('')
  const documents = useMemo(
    () =>
      portalDocuments.filter((document) =>
        `${document.name} ${document.category}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )

  return (
    <>
      <Head>
        <title>Documents | Highveld Advisory</title>
      </Head>
      <PortalLayout eyebrow="Workspace" title="Documents">
        <div className="grid gap-5">
          <div className="grid gap-4 bg-white border border-slate-200 p-4 sm:grid-cols-[minmax(0,360px)_1fr] sm:items-center sm:p-5">
            <Input
              leadingIcon={<Search aria-hidden="true" className="size-4" strokeWidth={1.8} />}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search documents"
              value={query}
            />
            <p className="text-xs leading-5 text-slate-500 sm:text-right">
              Documents shared by your Highveld accounting and tax team.
            </p>
          </div>
          <div className="grid bg-white border border-slate-200">
            {documents.map((document) => (
              <div className="grid gap-4 border-b border-slate-100 p-4 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:items-center sm:p-5" key={document.id}>
                <div className="grid size-10 place-items-center bg-brand-50 text-brand-700">
                  <FileText aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
                </div>
                <div className="grid min-w-0 gap-1">
                  <span className="truncate text-sm font-semibold text-slate-900">{document.name}</span>
                  <span className="text-xs text-slate-500">{document.category} · {document.size}</span>
                </div>
                <span className="text-xs text-slate-500">{document.updatedAt}</span>
                <button
                  aria-label={`Download ${document.name}`}
                  className="grid size-10 place-items-center bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-950"
                  type="button"
                >
                  <Download aria-hidden="true" className="size-4" strokeWidth={1.8} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </PortalLayout>
    </>
  )
}

export const getServerSideProps = getProtectedPageProps
