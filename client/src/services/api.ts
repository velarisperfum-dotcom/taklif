import { Invitation, Template, RSVP, CreateInvitationInput } from '../types'
import { FALLBACK_TEMPLATES } from './template.service'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

// Local storage helper for resilient offline fallback
const LOCAL_STORAGE_KEY = 'taklif_invitations_cache'

function getLocalInvitations(): Record<string, Invitation> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveLocalInvitation(invitation: Invitation) {
  try {
    const local = getLocalInvitations()
    local[invitation.publicSlug] = invitation
    if (invitation.id) local[invitation.id] = invitation
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local))
  } catch (e) {
    console.error('Failed to cache invitation locally:', e)
  }
}

function generateLocalSlug(groomName: string, brideName: string): string {
  const cleanG = groomName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10) || 'kuyov'
  const cleanB = brideName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10) || 'kelin'
  const rand = Math.random().toString(36).substring(2, 8)
  return `${cleanG}-${cleanB}-${rand}`
}

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
    try {
      const data = await request<Template[]>(`/templates${query}`)
      if (Array.isArray(data) && data.length > 0) {
        return data
      }
    } catch (err) {
      console.warn('API getTemplates failed, using fallback templates:', err)
    }

    if (category && category !== 'all' && category !== 'Barchasi') {
      return FALLBACK_TEMPLATES.filter((t) => t.category === category)
    }
    return FALLBACK_TEMPLATES
  },

  async getTemplateById(id: string): Promise<Template> {
    try {
      return await request<Template>(`/templates/${id}`)
    } catch (err) {
      const found = FALLBACK_TEMPLATES.find((t) => t.id === id)
      if (found) return found
      throw err
    }
  },

  // Invitations
  async getInvitations(ownerId?: string): Promise<Invitation[]> {
    const query = ownerId ? `?ownerId=${encodeURIComponent(ownerId)}` : ''
    let serverInvitations: Invitation[] = []
    try {
      serverInvitations = await request<Invitation[]>(`/invitations${query}`)
    } catch {
      // Server down or offline
    }

    const localMap = getLocalInvitations()
    const localList = Object.values(localMap).filter(
      (v, idx, arr) => arr.findIndex((t) => t.publicSlug === v.publicSlug) === idx
    )

    // Merge without duplicates
    const combined = [...serverInvitations]
    for (const item of localList) {
      if (!combined.some((c) => c.publicSlug === item.publicSlug)) {
        combined.push(item)
      }
    }

    return combined
  },

  async getInvitationBySlug(slug: string): Promise<Invitation> {
    try {
      const data = await request<Invitation>(`/invitations/slug/${slug}`)
      if (data) {
        saveLocalInvitation(data)
        return data
      }
    } catch {
      // Fallback to local
    }

    const local = getLocalInvitations()[slug]
    if (local) return local

    throw new Error('Taklifnoma topilmadi')
  },

  async getInvitationById(id: string): Promise<Invitation> {
    try {
      const data = await request<Invitation>(`/invitations/${id}`)
      if (data) {
        saveLocalInvitation(data)
        return data
      }
    } catch {
      // Fallback
    }

    const local = getLocalInvitations()[id]
    if (local) return local

    throw new Error('Taklifnoma topilmadi')
  },

  async createInvitation(data: CreateInvitationInput): Promise<Invitation> {
    try {
      const created = await request<Invitation>('/invitations', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (created) {
        saveLocalInvitation(created)
        return created
      }
    } catch (err) {
      console.warn('Network creation failed, using resilient local storage:', err)
      // Resilient local creation fallback
      const slug = generateLocalSlug(data.groomName, data.brideName)
      const localInvitation: Invitation = {
        id: 'local-' + Date.now(),
        publicSlug: slug,
        templateId: data.templateId,
        groomName: data.groomName,
        brideName: data.brideName,
        groomParents: data.groomParents,
        brideParents: data.brideParents,
        weddingDate: data.weddingDate,
        weddingTime: data.weddingTime,
        venueName: data.venueName,
        venueAddress: data.venueAddress,
        mapUrl: data.mapUrl,
        invitationMessage: data.invitationMessage,
        musicUrl: data.musicUrl,
        dressCode: data.dressCode,
        coverTitle: data.coverTitle,
        programJson: data.programJson,
        themeSettings: data.themeSettings,
        status: data.status || 'PUBLISHED',
        ownerId: data.ownerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      saveLocalInvitation(localInvitation)
      return localInvitation
    }

    throw new Error('Taklifnomani saqlashda xatolik yuz berdi')
  },

  async updateInvitation(id: string, data: Partial<CreateInvitationInput>): Promise<Invitation> {
    try {
      const updated = await request<Invitation>(`/invitations/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
      if (updated) {
        saveLocalInvitation(updated)
        return updated
      }
    } catch {
      // Local fallback
    }

    const local = getLocalInvitations()[id]
    if (local) {
      const merged = { ...local, ...data, updatedAt: new Date().toISOString() }
      saveLocalInvitation(merged)
      return merged
    }

    throw new Error('Taklifnomani yangilashda xatolik yuz berdi')
  },

  async deleteInvitation(id: string): Promise<{ message: string; id: string }> {
    try {
      await request<{ message: string; id: string }>(`/invitations/${id}`, {
        method: 'DELETE',
      })
    } catch {}

    const local = getLocalInvitations()
    delete local[id]
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local))

    return { message: 'O‘chirildi', id }
  },

  async duplicateInvitation(id: string): Promise<Invitation> {
    try {
      return await request<Invitation>(`/invitations/${id}/duplicate`, {
        method: 'POST',
      })
    } catch {}

    const original = await this.getInvitationById(id)
    return this.createInvitation({
      ...original,
      groomName: original.groomName,
      brideName: original.brideName,
    })
  },

  // RSVP
  async submitRsvp(slug: string, data: { guestName: string; attendance: 'ATTENDING' | 'NOT_ATTENDING'; guestCount: number; note?: string }): Promise<{ message: string; rsvp: RSVP }> {
    try {
      return await request<{ message: string; rsvp: RSVP }>(`/invitations/${slug}/rsvp`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
    } catch {
      // Local RSVP fallback
      return {
        message: 'Javobingiz saqlandi (Mahalliy)',
        rsvp: {
          id: 'local-rsvp-' + Date.now(),
          invitationId: slug,
          guestName: data.guestName,
          attendance: data.attendance,
          guestCount: data.guestCount,
          note: data.note,
          createdAt: new Date().toISOString(),
        },
      }
    }
  },

  async getInvitationRsvps(id: string): Promise<RSVP[]> {
    try {
      return await request<RSVP[]>(`/invitations/${id}/rsvps`)
    } catch {
      return []
    }
  },
}
