import Image from 'next/image'
import { FileText, MessageSquareText, ShieldCheck } from 'lucide-react'

import { BrandMark } from '@/components/brand/brand-mark'

const highlights = [
  {
    icon: FileText,
    label: 'Documents',
    text: 'Statements, agreements, and shared files in one place.',
  },
  {
    icon: MessageSquareText,
    label: 'Requests',
    text: 'Keep service requests and client conversations organized.',
  },
  {
    icon: ShieldCheck,
    label: 'Secure access',
    text: 'Identity and session management powered by Clerk.',
  },
]

export function MarketingPanel() {
  return (
    <div className="flex w-full flex-col justify-between overflow-hidden border-b border-slate-200 bg-white lg:border-r lg:border-b-0">
      <div className="flex flex-col gap-8 px-6 pt-8 sm:px-10 lg:px-12 lg:pt-10 xl:px-16">
        <BrandMark />
        <div className="flex max-w-xl flex-col gap-4">
          <span className="text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">South African client services</span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl lg:leading-[1.08]">
            Client work, without the back-and-forth.
          </h1>
          <p className="max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
            Highveld gives clients one secure place to access documents, track requests, and stay current with your team.
          </p>
        </div>
        <div className="hidden flex-col gap-4 sm:flex lg:flex-row lg:flex-wrap">
          {highlights.map(({ icon: Icon, label, text }) => (
            <div className="flex min-w-0 flex-1 items-start gap-3 border-t border-slate-200 pt-4 lg:basis-[30%]" key={label}>
              <div className="flex size-9 shrink-0 items-center justify-center bg-brand-50 text-brand-700">
                <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-sm font-semibold text-slate-900">{label}</span>
                <span className="text-xs leading-5 text-slate-500">{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex min-h-56 flex-1 items-end px-6 pt-8 sm:px-10 lg:px-12 xl:px-16">
        <div className="relative flex h-full min-h-56 w-full items-end overflow-hidden border-x border-t border-brand-100 bg-brand-50 sm:min-h-72 lg:min-h-80">
          <Image
            alt="Abstract Highveld client portal interface illustration"
            className="object-cover object-center"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            src="/images/client-portal.svg"
          />
        </div>
      </div>
    </div>
  )
}
