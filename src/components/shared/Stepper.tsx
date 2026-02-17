import { IconCheck } from './Icon'

interface Step {
  label: string
}

interface Props {
  steps: Step[]
  current: number 
}

export function Stepper({ steps, current }: Props) {
  return (
    <nav aria-label="Progreso" className="flex items-center">
      {steps.map((step, i) => {
        const done   = i < current
        const active = i === current

        return (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  'h-7 w-7 rounded-full flex items-center justify-center transition-all duration-300',
                  done   ? 'bg-blue-600 text-white'                    : '',
                  active ? 'border-2 border-blue-600 bg-blue-50'       : '',
                  !done && !active ? 'border-2 border-slate-200 bg-white' : '',
                ].join(' ')}
              >
                {done
                  ? <IconCheck className="h-3.5 w-3.5" />
                  : <span className={`text-xs font-semibold ${active ? 'text-blue-600' : 'text-slate-300'}`}>{i + 1}</span>
                }
              </div>
              <span className={[
                'text-[11px] font-medium whitespace-nowrap',
                active ? 'text-blue-600' : done ? 'text-slate-400' : 'text-slate-300',
              ].join(' ')}>
                {step.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div className={[
                'h-px w-16 mb-4 transition-all duration-500',
                i < current ? 'bg-blue-600' : 'bg-slate-200',
              ].join(' ')} />
            )}
          </div>
        )
      })}
    </nav>
  )
}