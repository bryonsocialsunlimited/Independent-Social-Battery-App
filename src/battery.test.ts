import { describe, it, expect } from 'vitest'
import {
  applyActivity,
  clampLevel,
  getStatus,
  getStatusMessage,
  MAX_LEVEL,
  MIN_LEVEL,
} from './battery'

describe('clampLevel', () => {
  it('keeps values inside range', () => {
    expect(clampLevel(50)).toBe(50)
  })

  it('clamps above the max', () => {
    expect(clampLevel(150)).toBe(MAX_LEVEL)
  })

  it('clamps below the min', () => {
    expect(clampLevel(-20)).toBe(MIN_LEVEL)
  })

  it('rounds fractional values', () => {
    expect(clampLevel(42.6)).toBe(43)
  })

  it('falls back to the minimum for NaN', () => {
    expect(clampLevel(Number.NaN)).toBe(MIN_LEVEL)
  })
})

describe('applyActivity', () => {
  it('drains energy for negative deltas', () => {
    expect(applyActivity(80, -35)).toBe(45)
  })

  it('recharges energy for positive deltas', () => {
    expect(applyActivity(40, 30)).toBe(70)
  })

  it('never drops below the minimum', () => {
    expect(applyActivity(10, -50)).toBe(MIN_LEVEL)
  })

  it('never exceeds the maximum', () => {
    expect(applyActivity(90, 40)).toBe(MAX_LEVEL)
  })
})

describe('getStatus', () => {
  it('maps levels to status buckets', () => {
    expect(getStatus(0)).toBe('depleted')
    expect(getStatus(20)).toBe('low')
    expect(getStatus(50)).toBe('moderate')
    expect(getStatus(80)).toBe('charged')
    expect(getStatus(100)).toBe('full')
  })
})

describe('getStatusMessage', () => {
  it('returns a non-empty message for every level', () => {
    for (const level of [0, 20, 50, 80, 100]) {
      expect(getStatusMessage(level).length).toBeGreaterThan(0)
    }
  })
})
