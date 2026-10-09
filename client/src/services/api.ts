import { Invitation, Template, RSVP, CreateInvitationInput } from '../types'

const API_BASE = '/api'

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    let errorMsg = 'Xatolik yuz berdi'
    try {
      const errData = await response.json()
      errorMsg = errData.error || errData.message || errorMsg
    } catch {
      // Fallback
    }
    throw new Error(errorMsg)
  }

  return response.json()
}

export const api = {
  // Templates
  async getTemplates(category?: string): Promise<Template[]> {
    const query = category && category !== 'all' && category !== 'Barchasi' ? `?category=${encodeURIComponent(category)}` : ''
    return request<Template[]>(`/templates${query}`)
  },

  async getTemplateById(id: string): Promise<Template> {
    return request<Template>(`/templates/${id}`)
  },

  // Invitations
  async getInvitations(ownerId?: string): Promise<Invitation[]> {
    const query = ownerId ? `?ownerId=${encodeURIComponent(ownerId)}` : ''
    return request<Invitation[]>(`/invitations${query}`)
  },

  async getInvitationBySlug(slug: string): Promise<Invitation> {
    return request<Invitation>(`/invitations/slug/${slug}`)
  },

  async getInvitationById(id: string): Promise<Invitation> {
    return request<Invitation>(`/invitations/${id}`)
  },

  async createInvitation(data: CreateInvitationInput): Promise<Invitation> {
    return request<Invitation>('/invitations', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async updateInvitation(id: string, data: Partial<CreateInvitationInput>): Promise<Invitation> {
    return request<Invitation>(`/invitations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },

  async deleteInvitation(id: string): Promise<{ message: string; id: string }> {
    return request<{ message: string; id: string }>(`/invitations/${id}`, {
      method: 'DELETE',
    })
  },

  async duplicateInvitation(id: string): Promise<Invitation> {
    return request<Invitation>(`/invitations/${id}/duplicate`, {
      method: 'POST',
    })
  },

  // RSVP
  async submitRsvp(slug: string, data: { guestName: string; attendance: 'ATTENDING' | 'NOT_ATTENDING'; guestCount: number; note?: string }): Promise<{ message: string; rsvp: RSVP }> {
    return request<{ message: string; rsvp: RSVP }>(`/invitations/${slug}/rsvp`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async getInvitationRsvps(id: string): Promise<RSVP[]> {
    return request<RSVP[]>(`/invitations/${id}/rsvps`)
  },
}
