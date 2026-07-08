export const MIN_LEVEL = 0
export const MAX_LEVEL = 100

export type BatteryStatus = 'depleted' | 'low' | 'moderate' | 'charged' | 'full'

export interface Activity {
  id: string
  label: string
  /** Energy change applied when logged. Negative drains, positive recharges. */
  delta: number
}

/** Clamp a battery level to the valid [MIN_LEVEL, MAX_LEVEL] range. */
export function clampLevel(level: number): number {
  if (Number.isNaN(level)) return MIN_LEVEL
  return Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, Math.round(level)))
}

/** Apply an activity's energy delta to the current level, clamped to range. */
export function applyActivity(level: number, delta: number): number {
  return clampLevel(level + delta)
}

/** Human-readable status bucket for a given level. */
export function getStatus(level: number): BatteryStatus {
  const value = clampLevel(level)
  if (value <= 5) return 'depleted'
  if (value <= 30) return 'low'
  if (value <= 60) return 'moderate'
  if (value <= 90) return 'charged'
  return 'full'
}

/** Short guidance message shown alongside the status. */
export function getStatusMessage(level: number): string {
  switch (getStatus(level)) {
    case 'depleted':
      return 'Running on empty. Time to retreat and recharge.'
    case 'low':
      return 'Getting drained. Keep interactions light.'
    case 'moderate':
      return 'Balanced. You have energy for a bit more.'
    case 'charged':
      return 'Feeling social. Great time to connect.'
    case 'full':
      return 'Fully charged and ready for anything.'
  }
}

export const DEFAULT_ACTIVITIES: Activity[] = [
  { id: 'big-party', label: 'Big party', delta: -35 },
  { id: 'small-hangout', label: 'Small hangout', delta: -15 },
  { id: 'work-meeting', label: 'Work meeting', delta: -20 },
  { id: 'phone-call', label: 'Phone call', delta: -10 },
  { id: 'alone-time', label: 'Alone time', delta: 20 },
  { id: 'good-sleep', label: 'Good sleep', delta: 30 },
  { id: 'nature-walk', label: 'Nature walk', delta: 15 },
]
