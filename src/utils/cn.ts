type ClassValue = string | false | null | undefined

/** Joins truthy class names. Tiny replacement for clsx, since we only need conditional strings. */
export const cn = (...values: ClassValue[]) => values.filter(Boolean).join(' ')
