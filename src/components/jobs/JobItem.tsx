import { useState } from 'react'
import { StatusBadge } from '../shared/StatusBadge'
import type { Job, Candidate, ApplyStatus } from '../../types'
import { delay } from '../../mocks'
import { RepoSubmitForm } from './RepoSubmitForm'
import { JobCardHeader } from './JobCardHeader'

interface Props {
  job: Job
  candidate: Candidate
  index: number
}


export function JobItem({ job, index }: Props) {
  const [status, setStatus] = useState<ApplyStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    setStatus('loading')
    setError(null)
    try {
      await delay(1200)
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      setStatus('error')
    }
  }

  return (
    <article
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      style={{ animation: `slide-up 0.35s ease-out ${index * 70}ms both` }}
    >
      <JobCardHeader job={job} isApplied={status === 'success'} />

      {status !== 'success' && (
        <RepoSubmitForm
          jobId={job.id}
          isLoading={status === 'loading'}
          onSubmit={handleSubmit}
        />
      )}

      <StatusBadge status={status} error={error} />
    </article>
  )
}