import { useMemo, useState } from 'react'
import './App.css'
import {
  applyActivity,
  DEFAULT_ACTIVITIES,
  getStatus,
  getStatusMessage,
  type Activity,
} from './battery'

interface LogEntry {
  id: number
  label: string
  delta: number
  level: number
  at: string
}

const STARTING_LEVEL = 75

function App() {
  const [level, setLevel] = useState(STARTING_LEVEL)
  const [log, setLog] = useState<LogEntry[]>([])
  const [customLabel, setCustomLabel] = useState('')
  const [customDelta, setCustomDelta] = useState(-10)

  const status = getStatus(level)
  const message = useMemo(() => getStatusMessage(level), [level])

  function logActivity(activity: Activity) {
    setLevel((current) => {
      const next = applyActivity(current, activity.delta)
      setLog((entries) =>
        [
          {
            id: Date.now() + Math.random(),
            label: activity.label,
            delta: activity.delta,
            level: next,
            at: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
          ...entries,
        ].slice(0, 8),
      )
      return next
    })
  }

  function handleAddCustom(event: React.FormEvent) {
    event.preventDefault()
    const label = customLabel.trim()
    if (!label) return
    logActivity({ id: 'custom', label, delta: customDelta })
    setCustomLabel('')
  }

  function reset() {
    setLevel(STARTING_LEVEL)
    setLog([])
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Social Battery</h1>
        <p className="app__tagline">
          Track your social energy. Log what drains and recharges you.
        </p>
      </header>

      <main className="app__main">
        <section className={`gauge gauge--${status}`} aria-live="polite">
          <div className="battery" role="img" aria-label={`Battery at ${level} percent`}>
            <div className="battery__cap" />
            <div className="battery__body">
              <div className="battery__fill" style={{ height: `${level}%` }} />
              <span className="battery__label">{level}%</span>
            </div>
          </div>
          <div className="gauge__status">
            <span className="gauge__badge">{status}</span>
            <p className="gauge__message">{message}</p>
          </div>
        </section>

        <section className="panel">
          <h2>Log an activity</h2>
          <div className="activities">
            {DEFAULT_ACTIVITIES.map((activity) => (
              <button
                key={activity.id}
                type="button"
                className={`chip ${activity.delta < 0 ? 'chip--drain' : 'chip--charge'}`}
                onClick={() => logActivity(activity)}
              >
                <span>{activity.label}</span>
                <span className="chip__delta">
                  {activity.delta > 0 ? `+${activity.delta}` : activity.delta}
                </span>
              </button>
            ))}
          </div>

          <form className="custom" onSubmit={handleAddCustom}>
            <input
              type="text"
              placeholder="Custom activity"
              aria-label="Custom activity name"
              value={customLabel}
              onChange={(event) => setCustomLabel(event.target.value)}
            />
            <input
              type="number"
              aria-label="Energy change"
              value={customDelta}
              onChange={(event) => setCustomDelta(Number(event.target.value))}
            />
            <button type="submit" className="custom__submit">
              Log
            </button>
          </form>

          <button type="button" className="reset" onClick={reset}>
            Reset battery
          </button>
        </section>

        <section className="panel">
          <h2>Recent activity</h2>
          {log.length === 0 ? (
            <p className="empty">No activity logged yet. Tap a chip above to start.</p>
          ) : (
            <ul className="log">
              {log.map((entry) => (
                <li key={entry.id} className="log__item">
                  <span className="log__label">{entry.label}</span>
                  <span
                    className={`log__delta ${entry.delta < 0 ? 'log__delta--drain' : 'log__delta--charge'}`}
                  >
                    {entry.delta > 0 ? `+${entry.delta}` : entry.delta}
                  </span>
                  <span className="log__level">→ {entry.level}%</span>
                  <span className="log__time">{entry.at}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="app__footer">
        <p>Independent Social Battery App</p>
      </footer>
    </div>
  )
}

export default App
