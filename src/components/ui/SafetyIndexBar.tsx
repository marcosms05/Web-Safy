import { getSafetyLevel, SAFETY_COLORS, SAFETY_LABELS } from '../../types'

interface SafetyIndexBarProps {
  index: number
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export default function SafetyIndexBar({ index, showLabel = true, size = 'md' }: SafetyIndexBarProps) {
  const level  = getSafetyLevel(index)
  const color  = SAFETY_COLORS[level]
  const label  = SAFETY_LABELS[level]
  const clamped = Math.min(100, Math.max(0, index))

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-3">
          {/* Mapbox eyebrow style */}
          <span className="eyebrow">Índice de Seguridad</span>
          <div className="flex items-center gap-2">
            <span
              className={`font-bold text-white ${size === 'sm' ? 'text-heading-sm' : 'text-heading'}`}
            >
              {clamped}
            </span>
            {/* Badge — 4px radius per Mapbox spec */}
            <span
              className="text-caption font-bold text-white uppercase tracking-[1px] px-2 py-1 rounded-badge"
              style={{ backgroundColor: color }}
            >
              {label}
            </span>
          </div>
        </div>
      )}

      {/* Track — gunmetal */}
      <div className="h-1.5 w-full rounded-full bg-gunmetal overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${clamped}%`, backgroundColor: color }}
        />
      </div>

      {!showLabel && (
        <div className="flex justify-between mt-1.5">
          <span className="text-caption text-slate">0</span>
          <span className="text-caption font-bold uppercase tracking-[1px]" style={{ color }}>
            {clamped} / 100 — {label}
          </span>
        </div>
      )}
    </div>
  )
}
