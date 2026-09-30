import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface LoadingState {
  loading: boolean
  error: boolean
  retry: () => void
}

/**
 * Simulates network latency for mock data, so skeleton and error states are part of the UX.
 * Append `?simulate=error` to any page that uses it to preview its error state.
 */
export function useSimulatedLoading(key: string, delayMs = 650): LoadingState {
  const [params] = useSearchParams()
  const forceError = params.get('simulate') === 'error'
  const [attempt, setAttempt] = useState(0)
  const [settled, setSettled] = useState<string | null>(null)
  const token = `${key}:${attempt}`

  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(token), delayMs)
    return () => window.clearTimeout(timer)
  }, [token, delayMs])

  const loading = settled !== token
  return {
    loading,
    // A retry (attempt > 0) succeeds so the error UI is demonstrable and recoverable.
    error: !loading && forceError && attempt === 0,
    retry: () => setAttempt((value) => value + 1),
  }
}
