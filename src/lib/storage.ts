import { createJSONStorage, type StateStorage } from 'zustand/middleware'

/**
 * Single gateway to the browser's Web Storage. Every read/write is wrapped so the app keeps
 * working when storage is unavailable (private mode, quota exceeded, blocked cookies).
 */
const PREFIX = 'learnify:'

const safe = <T>(fn: () => T, fallback: T): T => {
  try {
    return fn()
  } catch {
    return fallback
  }
}

export const storage = {
  get<T>(key: string, fallback: T): T {
    return safe(() => {
      const raw = window.localStorage.getItem(PREFIX + key)
      return raw === null ? fallback : (JSON.parse(raw) as T)
    }, fallback)
  },
  set<T>(key: string, value: T) {
    safe(() => window.localStorage.setItem(PREFIX + key, JSON.stringify(value)), undefined)
  },
  remove(key: string) {
    safe(() => window.localStorage.removeItem(PREFIX + key), undefined)
  },
  /** Removes every key written by this app. */
  clearAll() {
    safe(() => {
      Object.keys(window.localStorage)
        .filter((key) => key.startsWith(PREFIX))
        .forEach((key) => window.localStorage.removeItem(key))
      Object.keys(window.sessionStorage)
        .filter((key) => key.startsWith(PREFIX))
        .forEach((key) => window.sessionStorage.removeItem(key))
    }, undefined)
  },
}

/** Adapter so Zustand's persist middleware goes through the same guarded, namespaced storage. */
export const persistStorage: StateStorage = {
  getItem: (name) => safe(() => window.localStorage.getItem(PREFIX + name), null),
  setItem: (name, value) =>
    safe(() => window.localStorage.setItem(PREFIX + name, value), undefined),
  removeItem: (name) => safe(() => window.localStorage.removeItem(PREFIX + name), undefined),
}

/**
 * Auth storage honours "Remember me": a remembered session lives in localStorage,
 * otherwise it lives in sessionStorage and ends with the browser tab.
 */
export const sessionAwareStorage: StateStorage = {
  getItem: (name) =>
    safe(
      () =>
        window.localStorage.getItem(PREFIX + name) ?? window.sessionStorage.getItem(PREFIX + name),
      null,
    ),
  setItem: (name, value) =>
    safe(() => {
      const remember = (JSON.parse(value) as { state?: { remember?: boolean } }).state?.remember
      const [target, other] =
        remember === false
          ? [window.sessionStorage, window.localStorage]
          : [window.localStorage, window.sessionStorage]
      target.setItem(PREFIX + name, value)
      other.removeItem(PREFIX + name)
    }, undefined),
  removeItem: (name) =>
    safe(() => {
      window.localStorage.removeItem(PREFIX + name)
      window.sessionStorage.removeItem(PREFIX + name)
    }, undefined),
}

/** Ready-to-use `storage` options for Zustand's persist middleware. */
export const persistJson = createJSONStorage(() => persistStorage)
export const sessionAwareJson = createJSONStorage(() => sessionAwareStorage)
