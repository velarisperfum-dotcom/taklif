import { z } from 'zod'

export const createInvitationSchema = z.object({
  templateId: z.string().min(1, 'Shablonni tanlash majburiy'),
  groomName: z.string().min(2, 'Kuyovning ismini kiriting (kamida 2 ta belgi)'),
  brideName: z.string().min(2, 'Kelinning ismini kiriting (kamida 2 ta belgi)'),
  weddingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'To‘y sanasi to‘g‘ri formatda bo‘lishi kerak (YYYY-MM-DD)'),
  weddingTime: z.string().min(1, 'To‘y vaqtini kiriting'),
  venueName: z.string().min(2, 'To‘yxona nomini kiriting'),
  venueAddress: z.string().min(2, 'Manzilni kiriting'),
  groomParents: z.string().optional().nullable(),
  brideParents: z.string().optional().nullable(),
  invitationMessage: z.string().optional().nullable(),
  mapUrl: z.string().optional().nullable(),
  musicUrl: z.string().optional().nullable(),
  dressCode: z.string().optional().nullable(),
  coverTitle: z.string().optional().nullable(),
  programJson: z.string().optional().nullable(),
  themeSettings: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('PUBLISHED'),
  ownerId: z.string().optional().nullable(),
})

export const updateInvitationSchema = createInvitationSchema.partial()
