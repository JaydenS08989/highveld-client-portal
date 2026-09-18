type BrandMarkProps = {
  compact?: boolean
  inverse?: boolean
}

export function BrandMark({ compact = false, inverse = false }: BrandMarkProps) {
  const wordmarkColor = inverse ? 'text-white' : 'text-slate-950'
  const descriptorColor = inverse ? 'text-white/65' : 'text-slate-500'

  return (
    <div className="flex items-center gap-3">
      <svg
        aria-label="Highveld Advisory"
        className="size-10 shrink-0"
        viewBox="0 0 40 40"
        role="img"
      >
        <rect fill={inverse ? '#ffffff' : '#e8f6ff'} height="40" width="40" />
        <path d="M7 29V11h6v7h7v-7h6v18h-6v-6h-7v6H7Z" fill="#38aaf8" />
        <path d="m25 11 8 9-8 9v-6h-5v-5h5v-7Z" fill="#0f172a" />
      </svg>
      {!compact && (
        <div className="flex flex-col">
          <span className={`text-[13px] font-bold tracking-[0.12em] uppercase ${wordmarkColor}`}>
            Highveld
          </span>
          <span className={`text-[11px] tracking-[0.04em] ${descriptorColor}`}>
            Advisory
          </span>
        </div>
      )}
    </div>
  )
}
