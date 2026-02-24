import { useState } from 'react'
import { Header } from './components/layout/Header'
import { Stepper } from './components/shared/Stepper'
import { EmailForm } from './components/identify/EmailForm'
import { JobList } from './components/jobs/JobList'
import { useCandidate } from './hooks/use-candidate'
import { useJobs } from './hooks/use-jobs'
import { ConfirmationView } from './components/confirmation/ConfirmationView'

const STEPS: { label: string }[] = [
  { label: 'Identificación' },
  { label: 'Posiciones' },
  { label: 'Confirmación' },
]

export default function App() {
  const { candidate, loading: candidateLoading, error: candidateError, fetch, reset } = useCandidate()
  const { jobs, loading: jobsLoading, error: jobsError } = useJobs(candidate !== null)
  const [applied, setApplied] = useState<boolean>(false)

  const step = candidate ? 'jobs' : 'identify'
  const currentStepIndex: number = step === 'identify' ? 0 : applied ? 2 : 1

  return (
    <div className="min-h-screen bg-slate-50">
      <Header candidate={candidate} onReset={reset} />

      <main className="mx-auto max-w-2xl px-4 py-10">
        <div className="flex justify-center mb-10">
          <Stepper steps={STEPS} current={currentStepIndex} />
        </div>

        {step === 'identify' && (
          <EmailForm
            onSubmit={fetch}
            loading={candidateLoading}
            error={candidateError}
          />
        )}

        {step === 'jobs' && candidate && !applied && (
          <div style={{ animation: 'slide-up 0.35s ease-out both' }}>
            <h1 className="text-2xl font-semibold text-slate-900 mb-1.5">
              Posiciones disponibles
            </h1>
            <p className="text-slate-500 text-sm mb-8">
              Pegá la URL de tu repositorio en la posición que corresponda y enviá tu postulación.
            </p>
            <JobList
              jobs={jobs}
              loading={jobsLoading}
              error={jobsError}
              candidate={candidate}
              onApplied={() => setApplied(true)}
            />
          </div>
        )}

        {step === 'jobs' && candidate && applied && (
          <ConfirmationView />
        )}
      </main>
    </div>
  )
}