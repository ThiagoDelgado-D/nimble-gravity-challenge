export function ConfirmationView() {
  return (
    <div
      className="text-center py-16 space-y-4"
      style={{ animation: 'slide-up 0.35s ease-out both' }}
    >
      <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
        <svg className="h-7 w-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-slate-900">
        ¡Postulación enviada!
      </h2>
      <p className="text-slate-500 text-sm max-w-sm mx-auto">
        Tu repositorio fue registrado correctamente. El equipo de Nimble Gravity estará en contacto con vos pronto.
      </p>
    </div>
  )
}