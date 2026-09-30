/** Resolves after `ms` milliseconds. Used to simulate network latency for mock data. */
export const delay = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))
