import { useEffect } from 'react'
import { JobCardHeader } from './JobCardHeader'
import { RepoSubmitForm } from './RepoSubmitForm'
import { StatusBadge } from '../shared/StatusBadge'
import type { Job, Candidate } from '../../types'
import { useApply } from '../../hooks/use-apply'

interface Props {
  job: Job
  candidate: Candidate
  index: number
  onApplied: () => void
}

export function JobItem({ job, candidate, index, onApplied }: Props) {
  const { status, error, submit } = useApply()

  useEffect(() => {
    if (status === 'success') onApplied()
  }, [status, onApplied])

  function handleSubmit(repoUrl: string) {
    submit({
      uuid: candidate.uuid,
      candidateId: candidate.candidateId,
      applicationId: candidate.applicationId,
      jobId: job.id,
      repoUrl,
    })
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