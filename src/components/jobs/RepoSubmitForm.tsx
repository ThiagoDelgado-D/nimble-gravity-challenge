import { useState } from 'react'
import { IconGithub, IconSpinner } from '../shared/Icon'

interface Props {
    jobId: string
    isLoading: boolean
    onSubmit: (repoUrl: string) => void
}

export function RepoSubmitForm({ jobId, isLoading, onSubmit }: Props) {
    const [repoUrl, setRepoUrl] = useState('');

    const trimmedRepoUrl = repoUrl.trim();

    const canSubmit = trimmedRepoUrl.length > 0 && !isLoading

    return (
        <div className="space-y-3">
      <div>
        <label
          htmlFor={`repo-${jobId}`}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5"
        >
          <IconGithub className="h-3.5 w-3.5" />
          Repositorio en GitHub
        </label>

        <input
          id={`repo-${jobId}`}
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="usuario/mi-repo"
          disabled={isLoading}
          className={[
            'w-full rounded-lg border px-3.5 py-2.5 text-sm font-mono',
            'placeholder:text-slate-300 text-slate-800',
            'outline-none transition-all',
            'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'border-slate-200 bg-slate-50',
            isLoading ? 'opacity-60 cursor-not-allowed' : '',
          ].join(' ')}
        />
      </div>

      <button
        onClick={() => onSubmit(repoUrl.trim())}
        disabled={!canSubmit}
        className={[
          'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          canSubmit
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm cursor-pointer'
            : 'bg-slate-100 text-slate-400 cursor-not-allowed',
        ].join(' ')}
      >
        {isLoading ? (
          <>
            <IconSpinner className="animate-spin h-4 w-4" />
            Enviando…
          </>
        ) : (
          'Enviar postulación'
        )}
      </button>
    </div>
    )
}