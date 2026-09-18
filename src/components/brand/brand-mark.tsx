import { Mountain } from 'lucide-react'

type BrandMarkProps = {
  compact?: boolean
  inverse?: boolean
}

export function BrandMark({ compact = false, inverse = false }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex size-10 items-center justify-center border ${
          inverse ? 'border-white/40 bg-white text-brand-700' : 'border-brand-200 bg-brand-50 text-brand-700'
        }`}
      >
        <Mountain aria-hidden="true" className="size-5" strokeWidth={1.8} />
      </div>
      {!compact && (
        <div className="flex flex-col gap-0.5">
          <span className={`text-sm font-semibold tracking-[0.16em] uppercase ${inverse ? 'text-white' : 'text-slate-950'}`}>
            Highveld
          </span>
          <span className={`text-xs ${inverse ? 'text-white/70' : 'text-slate-500'}`}>Client Portal</span>
        </div>
      )}
    </div>
  )
}
