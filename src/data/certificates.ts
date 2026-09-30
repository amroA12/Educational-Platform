import type { Certificate } from '@/types'

/**
 * Certificates are earned by completing every lesson of a course. The ID is derived
 * deterministically from the course and completion date so it stays stable across reloads.
 */
export const buildCertificate = (
  courseId: string,
  completedAtIso: string,
  recipient: string,
): Certificate => {
  const datePart = completedAtIso.slice(0, 10).replaceAll('-', '')
  let hash = 0
  for (const char of `${courseId}${datePart}`) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  const suffix = hash.toString(36).toUpperCase().padStart(6, '0').slice(0, 6)
  return {
    id: `LRN-${datePart.slice(0, 4)}-${suffix}`,
    courseId,
    recipient,
    issuedAt: completedAtIso,
  }
}
