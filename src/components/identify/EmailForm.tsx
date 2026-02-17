import { useState } from 'react'
import { IconSpinner } from '../shared/Icon'

interface Props {
  onSubmit: (email: string) => void
  loading: boolean
  error: string | null
}

export function EmailForm({ onSubmit, loading, error }: Props) {
  const [value, setValue] = useState('')

  const canSubmit = !loading && value.trim().length > 0

  function handleFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    onSubmit(value.trim())
  }

  return (
    <div style={{ animation: 'slide-up 0.35s ease-out both' }}>
      <h1 className="text-2xl font-semibold text-slate-900 mb-1.5">
        Identificate como candidato
      </h1>
      <p className="text-slate-500 text-sm mb-8">
        Ingresá el email con el que aplicaste para ver las posiciones disponibles.
      </p>

      <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-slate-500 mb-1.5">
            Dirección de email
          </label>
          <input
            id="email"
            type="email"
            autoFocus
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="jane.doe@example.com"
            disabled={loading}
            className={[
              'w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-800',
              'placeholder:text-slate-300 outline-none transition-all',
              'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              error   ? 'border-red-300'   : 'border-slate-200',
              loading ? 'opacity-60 cursor-not-allowed' : '',
            ].join(' ')}
          />
        </div>

        {error && <ErrorBanner message={error} />}

        <SubmitButton loading={loading} disabled={!canSubmit} />
      </form>
    </div>
  )
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3"
      style={{ animation: 'fade-in 0.2s ease-out both' }}
    >
      <p className="text-sm font-medium text-red-700">{message}</p>
    </div>
  )
}

function SubmitButton({ loading, disabled }: { loading: boolean; disabled: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={[
        'flex w-full items-center justify-center gap-2',
        'rounded-lg px-5 py-3 text-sm font-semibold transition-all',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        !disabled
          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm cursor-pointer'
          : 'bg-slate-100 text-slate-400 cursor-not-allowed',
      ].join(' ')}
    >
      {loading ? (
        <>
          <IconSpinner className="animate-spin h-4 w-4" />
          Verificando…
        </>
      ) : (
        'Continuar →'
      )}
    </button>
  )
}