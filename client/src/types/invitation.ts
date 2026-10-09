import { Template } from './template'

export interface RSVP {
  id: string
  invitationId: string
  guestName: string
  attendance: 'ATTENDING' | 'NOT_ATTENDING'
  guestCount: number
  note?: string | null
  createdAt: string
}

export interface ProgramItem {
  time: string
  title: string
}

export interface ThemeSettings {
  accentColor?: string
  fontPreset?: string
  ornamentStyle?: string
  cardBg?: string
}

export interface Invitation {
  id: string
  publicSlug: string
  ownerId?: string | null
  templateId: string
  template?: Template
  groomName: string
  brideName: string
  groomParents?: string | null
  brideParents?: string | null
  weddingDate: string // YYYY-MM-DD
  weddingTime: string // HH:mm
  venueName: string
  venueAddress: string
  mapUrl?: string | null
  invitationMessage?: string | null
  musicUrl?: string | null
  dressCode?: string | null
  coverTitle?: string | null
  programJson?: string | null
  themeSettings?: string | null
  status: 'DRAFT' | 'PUBLISHED'
  createdAt: string
  updatedAt: string
  rsvps?: RSVP[]
  _count?: {
    rsvps: number
  }
}

export interface CreateInvitationInput {
  templateId: string
  groomName: string
  brideName: string
  weddingDate: string
  weddingTime: string
  venueName: string
  venueAddress: string
  groomParents?: string | null
  brideParents?: string | null
  invitationMessage?: string | null
  mapUrl?: string | null
  musicUrl?: string | null
  dressCode?: string | null
  coverTitle?: string | null
  programJson?: string | null
  themeSettings?: string | null
  status?: 'DRAFT' | 'PUBLISHED'
  ownerId?: string | null
}
