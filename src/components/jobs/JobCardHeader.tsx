import { IconCheck } from '../shared/Icon'
import type { Job } from '../../types'

interface Props {
  job: Job
  isApplied: boolean
}

export function JobCardHeader({ job, isApplied }: Props) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <p className="font-mono text-[11px] text-slate-400 mb-1 tracking-wider">
          #{job.id}
        </p>
        <h3 className="text-base font-semibold text-slate-800">{job.title}</h3>
      </div>

      {isApplied && (
        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
          <IconCheck className="h-3 w-3" />
          Enviada
        </span>
      )}
    </div>
  )
}