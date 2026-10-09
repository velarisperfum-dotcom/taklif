import crypto from 'crypto'

export function generateSlug(groomName: string, brideName: string): string {
  const cleanGroom = groomName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 10) || 'kuyov'
  const cleanBride = brideName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 10) || 'kelin'

  const randomSuffix = crypto.randomBytes(3).toString('hex')
  return `${cleanGroom}-${cleanBride}-${randomSuffix}`
}
