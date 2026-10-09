import { Invitation, CreateInvitationInput, RSVP } from '../types/invitation'

export const invitationService = {
  async getInvitations(ownerId?: string): Promise<Invitation[]> {
    const query = ownerId ? `?ownerId=${encodeURIComponent(ownerId)}` : ''
    const res = await fetch(`/api/invitations${query}`)
    if (!res.ok) throw new Error('Taklifnomalarni yuklab bo‘lmadi')
    return res.json()
  },

  async getInvitationBySlug(slug: string): Promise<Invitation> {
    const res = await fetch(`/api/invitations/slug/${slug}`)
    if (!res.ok) throw new Error('Taklifnoma topilmadi')
    return res.json()
  },

  async getInvitationById(id: string): Promise<Invitation> {
    const res = await fetch(`/api/invitations/${id}`)
    if (!res.ok) throw new Error('Taklifnoma topilmadi')
    return res.json()
  },

  async createInvitation(data: CreateInvitationInput): Promise<Invitation> {
    const res = await fetch('/api/invitations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || 'Saqlashda xatolik')
    }
    return res.json()
  },

  async updateInvitation(id: string, data: Partial<CreateInvitationInput>): Promise<Invitation> {
    const res = await fetch(`/api/invitations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Yangilashda xatolik')
    return res.json()
  },

  async deleteInvitation(id: string): Promise<void> {
    const res = await fetch(`/api/invitations/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('O‘chirishda xatolik')
  },

  async duplicateInvitation(id: string): Promise<Invitation> {
    const res = await fetch(`/api/invitations/${id}/duplicate`, { method: 'POST' })
    if (!res.ok) throw new Error('Nusxa olishda xatolik')
    return res.json()
  },

  async submitRsvp(slug: string, data: { guestName: string; attendance: 'ATTENDING' | 'NOT_ATTENDING'; guestCount: number; note?: string }): Promise<{ message: string; rsvp: RSVP }> {
    const res = await fetch(`/api/invitations/${slug}/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Javobni yuborishda xatolik')
    return res.json()
  },

  async getInvitationRsvps(id: string): Promise<RSVP[]> {
    const res = await fetch(`/api/invitations/${id}/rsvps`)
    if (!res.ok) throw new Error('RSVP larni yuklab bo‘lmadi')
    return res.json()
  },
}
