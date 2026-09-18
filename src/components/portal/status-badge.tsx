import type { PortalStatus } from '@/data/portal'

type StatusBadgeProps = {
  status: PortalStatus
}

const styles: Record<PortalStatus, string> = {
  'Action needed': 'bg-amber-50 text-amber-800',
  Current: 'bg-emerald-50 text-emerald-700',
  'In progress': 'bg-brand-50 text-brand-800',
  Paid: 'bg-slate-100 text-slate-700',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex w-fit items-center px-2 py-1 text-[11px] font-semibold ${styles[status]}`}>
      {status}
    </span>
  )
}
