import { useState } from 'react'
import { Header }    from './components/layout/Header'
import { Stepper }   from './components/shared/Stepper'
import { EmailForm } from './components/identify/EmailForm'
import { JobList }   from './components/jobs/JobList'
import type { Candidate, AppStep } from './types'
import { MOCK_CANDIDATE, MOCK_JOBS, delay } from './mocks'

const STEPS = [
  { label: 'Identificación' },
  { label: 'Posiciones' },
  { label: 'Confirmación' },
]

export default function App() {
  const [step, setStep]           = useState<AppStep>('identify')
  const [candidate, setCandidate] = useState<Candidate | null>(null)

  const [emailLoading, setEmailLoading] = useState(false)
  const [emailError, setEmailError]     = useState<string | null>(null)

  async function handleEmailSubmit(email: string) {
    setEmailLoading(true)
    setEmailError(null)
    try {
      await delay(1000)
      if (email !== MOCK_CANDIDATE.email) {
        throw new Error('No encontramos un candidato con ese email.')
      }
      setCandidate(MOCK_CANDIDATE)
      setStep('jobs')
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setEmailLoading(false)
    }
  }

  function handleReset() {
    setCandidate(null)
    setStep('identify')
    setEmailError(null)
  }

  const currentStepIndex = step === 'identify' ? 0 : 1

  return (
    <div className="min-h-screen bg-slate-50">
      <Header candidate={candidate} onReset={handleReset} />

      <main className="mx-auto max-w-2xl px-4 py-10">
        <div className="flex justify-center mb-10">
          <Stepper steps={STEPS} current={currentStepIndex} />
        </div>

        {step === 'identify' && (
          <EmailForm
            onSubmit={handleEmailSubmit}
            loading={emailLoading}
            error={emailError}
          />
        )}

        {step === 'jobs' && candidate && (
          <div className="animate-[slide-up_0.35s_ease-out_both]">
            <h1 className="text-2xl font-semibold text-slate-900 mb-1.5">
              Posiciones disponibles
            </h1>
            <p className="text-slate-500 text-sm mb-8">
              Pegá la URL de tu repositorio en la posición que corresponda y enviá tu postulación.
            </p>
            <JobList
              jobs={MOCK_JOBS}
              loading={false}
              error={null}
              candidate={candidate}
            />
          </div>
        )}
      </main>
    </div>
  )
}