import { useState } from 'react'
import Head from 'next/head'
import { Plus, Send } from 'lucide-react'

import { PortalLayout } from '@/components/portal/portal-layout'
import { StatusBadge } from '@/components/portal/status-badge'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { portalRequests, type PortalRequest } from '@/data/portal'
import { getProtectedPageProps } from '@/lib/protected-page'

export default function RequestsPage() {
  const [requests, setRequests] = useState<PortalRequest[]>(portalRequests)
  const [showForm, setShowForm] = useState(false)
  const [service, setService] = useState('')
  const [title, setTitle] = useState('')

  const createRequest = () => {
    const trimmedTitle = title.trim()
    const trimmedService = service.trim()

    if (!trimmedTitle || !trimmedService) {
      return
    }

    setRequests((current) => [
      {
        id: `req-${Date.now()}`,
        title: trimmedTitle,
        service: trimmedService,
        updatedAt: 'Just now',
        status: 'In progress',
      },
      ...current,
    ])
    setTitle('')
    setService('')
    setShowForm(false)
  }

  return (
    <>
      <Head>
        <title>Requests | Highveld Advisory</title>
      </Head>
      <PortalLayout
        actions={
          <Button
            className="h-10 px-3"
            leadingIcon={<Plus aria-hidden="true" className="size-4" strokeWidth={1.8} />}
            onClick={() => setShowForm((current) => !current)}
          >
            <span className="hidden sm:inline">New request</span>
            <span className="sm:hidden">New</span>
          </Button>
        }
        eyebrow="Collaboration"
        title="Requests"
      >
        <div className="grid gap-5">
          {showForm && (
            <section className="grid gap-5 border border-slate-200 bg-white p-4 sm:p-5">
              <div className="grid gap-1">
                <h2 className="text-base font-semibold text-slate-950">Start a request</h2>
                <p className="text-xs text-slate-500">
                  Tell your advisor what you need help with and we will pick it up from here.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField htmlFor="request-title" label="Request">
                  <Input
                    id="request-title"
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="e.g. Update company address with SARS"
                    value={title}
                  />
                </FormField>
                <FormField htmlFor="request-service" label="Service">
                  <Input
                    id="request-service"
                    onChange={(event) => setService(event.target.value)}
                    placeholder="Tax, payroll, accounting..."
                    value={service}
                  />
                </FormField>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button onClick={() => setShowForm(false)} variant="ghost">
                  Cancel
                </Button>
                <Button
                  leadingIcon={<Send aria-hidden="true" className="size-4" strokeWidth={1.8} />}
                  onClick={createRequest}
                >
                  Submit request
                </Button>
              </div>
            </section>
          )}

          <section className="grid border border-slate-200 bg-white">
            {requests.map((request) => (
              <div
                className="grid gap-4 border-b border-slate-100 p-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_180px_auto] sm:items-center sm:p-5"
                key={request.id}
              >
                <div className="grid gap-1">
                  <span className="text-sm font-semibold text-slate-900">{request.title}</span>
                  <span className="text-xs text-slate-500">Updated {request.updatedAt}</span>
                </div>
                <span className="text-xs font-medium text-slate-600">{request.service}</span>
                <StatusBadge status={request.status} />
              </div>
            ))}
          </section>
        </div>
      </PortalLayout>
    </>
  )
}

export const getServerSideProps = getProtectedPageProps
