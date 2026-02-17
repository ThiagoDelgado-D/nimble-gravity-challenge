import type { ApplyStatus } from "../../types"

interface Props {
  status: ApplyStatus
  error: string | null
}

export function StatusBadge({ status, error }: Props) {
  if (status === 'success') {
    return (
      <p className="mt-3 rounded-lg px-4 py-2.5 text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 animate-[fade-in_0.25s_ease-out_both]">
        ✓ Postulación enviada correctamente
      </p>
    )
  }

  if (status === 'error') {
    return (
      <p className="mt-3 rounded-lg px-4 py-2.5 text-sm font-medium bg-red-50 text-red-700 border border-red-200 animate-[fade-in_0.25s_ease-out_both]">
        {error ?? 'Hubo un error al enviar la postulación. Intentá de nuevo.'}
      </p>
    )
  }

  return null
}