import type { Candidate, Job } from "../../types"
import { JobItem } from "./JobItem";

interface Props {
  jobs: Job[]
  loading: boolean
  error: string | null
  candidate: Candidate;
}

export function JobList({ jobs, loading, error, candidate }: Props) {
  if (loading) return <JobListSkeleton />

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 animate-[fade-in_0.25s_ease-out_both]">
        <p className="text-sm font-semibold text-red-700 mb-1">
          No se pudo cargar la lista de posiciones
        </p>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <p className="text-center text-slate-400 py-16 text-sm">
        No hay posiciones disponibles en este momento.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {jobs.map((job, i) => (
        <JobItem key={job.id} job={job} candidate={candidate} index={i} />
      ))}
    </div>
  )
}

function JobListSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse"
        >
          <div className="h-2.5 w-20 rounded bg-slate-100 mb-2.5" />
          <div className="h-4 w-44 rounded bg-slate-200 mb-6" />
          <div className="h-10 w-full rounded-lg bg-slate-100 mb-3" />
          <div className="h-9 w-36 rounded-lg bg-slate-100" />
        </div>
      ))}
    </div>
  )
}