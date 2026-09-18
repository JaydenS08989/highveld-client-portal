import { useState } from 'react'
import Head from 'next/head'
import { Send } from 'lucide-react'

import { PortalLayout } from '@/components/portal/portal-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { portalMessages } from '@/data/portal'
import { getProtectedPageProps } from '@/lib/protected-page'

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState(portalMessages[0]?.id ?? '')
  const [reply, setReply] = useState('')
  const [sentReply, setSentReply] = useState('')
  const selected = portalMessages.find((message) => message.id === selectedId) ?? portalMessages[0]

  return (
    <>
      <Head>
        <title>Messages | Highveld Advisory</title>
      </Head>
      <PortalLayout eyebrow="Communication" title="Messages">
        <div className="grid min-h-[620px] border border-slate-200 bg-white lg:grid-cols-[340px_minmax(0,1fr)]">
          <div className="grid content-start border-b border-slate-200 lg:border-r lg:border-b-0">
            {portalMessages.map((message) => (
              <button
                className={`grid gap-2 border-b border-slate-100 p-4 text-left transition-colors sm:p-5 ${selectedId === message.id ? 'bg-brand-50' : 'bg-white hover:bg-slate-50'}`}
                key={message.id}
                onClick={() => setSelectedId(message.id)}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-700">{message.sender}</span>
                  <span className="text-[11px] text-slate-400">{message.receivedAt}</span>
                </div>
                <span className="text-sm font-semibold text-slate-950">{message.subject}</span>
                <span className="line-clamp-2 text-xs leading-5 text-slate-500">{message.preview}</span>
              </button>
            ))}
          </div>

          {selected && (
            <div className="grid min-h-0 grid-rows-[auto_1fr_auto]">
              <div className="grid gap-1 border-b border-slate-200 p-4 sm:p-5">
                <span className="text-xs font-semibold text-brand-700">{selected.sender}</span>
                <h2 className="text-base font-semibold text-slate-950">{selected.subject}</h2>
              </div>
              <div className="grid content-start gap-4 p-4 sm:p-6">
                <div className="max-w-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-700">
                  {selected.preview}
                </div>
                {sentReply && (
                  <div className="ml-auto max-w-2xl bg-brand-50 p-4 text-sm leading-6 text-brand-950">
                    {sentReply}
                  </div>
                )}
              </div>
              <form
                className="grid gap-3 border-t border-slate-200 p-4 sm:grid-cols-[minmax(0,1fr)_auto]"
                onSubmit={(event) => {
                  event.preventDefault()
                  const message = reply.trim()

                  if (!message) {
                    return
                  }

                  setSentReply(message)
                  setReply('')
                }}
              >
                <Input
                  onChange={(event) => setReply(event.target.value)}
                  placeholder="Write a reply"
                  value={reply}
                />
                <Button
                  className="sm:w-28"
                  leadingIcon={<Send aria-hidden="true" className="size-4" strokeWidth={1.8} />}
                  type="submit"
                >
                  Send
                </Button>
              </form>
            </div>
          )}
        </div>
      </PortalLayout>
    </>
  )
}

export const getServerSideProps = getProtectedPageProps
