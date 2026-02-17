import { IconBolt, IconUser } from '../shared/Icon'
import type { Candidate } from '../../types'

interface Props {
  candidate: Candidate | null
  onReset: () => void
}

export function Header({ candidate, onReset }: Props) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
      <div className="mx-auto max-w-2xl px-4 py-3.5 flex items-center justify-between">
        <Logo />
        {candidate && <CandidatePill candidate={candidate} onReset={onReset} />}
      </div>
    </header>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
        <IconBolt className="h-4 w-4 text-white" />
      </div>
      <span className="font-semibold text-slate-800 text-sm tracking-tight">
        Nimble Gravity
      </span>
    </div>
  )
}

interface CandidatePillProps {
  candidate: Candidate
  onReset: () => void
}

function CandidatePill({ candidate, onReset }: CandidatePillProps) {
  return (
    <div className="flex items-center gap-3" style={{ animation: 'fade-in 0.3s ease-out both' }}>
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 pl-2.5 pr-3 py-1.5">
        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
          <IconUser className="h-3 w-3 text-blue-600" />
        </div>
        <div className="leading-none">
          <p className="text-xs font-semibold text-slate-700">
            {candidate.firstName} {candidate.lastName}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">{candidate.email}</p>
        </div>
      </div>
      <button
        onClick={onReset}
        className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
      >
        Cambiar
      </button>
    </div>
  )
}