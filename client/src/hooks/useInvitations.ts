import { useState, useEffect } from 'react'
import { Invitation } from '../types/invitation'
import { invitationService } from '../services/invitation.service'

export function useInvitations(ownerId?: string) {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await invitationService.getInvitations(ownerId)
      setInvitations(data)
    } catch (err: any) {
      setError(err.message || 'Xatolik')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    reload()
  }, [ownerId])

  return { invitations, loading, error, reload }
}
