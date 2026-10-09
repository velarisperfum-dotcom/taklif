import { prisma } from '../../db.js'
import { generateSlug } from './slug.js'

export const invitationService = {
  async getInvitations(ownerId?: string) {
    const where: any = {}
    if (ownerId) where.ownerId = ownerId

    return prisma.invitation.findMany({
      where,
      include: {
        template: true,
        _count: {
          select: { rsvps: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  async getInvitationBySlug(slug: string) {
    return prisma.invitation.findUnique({
      where: { publicSlug: slug },
      include: {
        template: true,
        rsvps: {
          select: {
            id: true,
            guestName: true,
            attendance: true,
            guestCount: true,
            note: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
        _count: {
          select: { rsvps: true },
        },
      },
    })
  },

  async getInvitationById(id: string) {
    return prisma.invitation.findUnique({
      where: { id },
      include: {
        template: true,
        rsvps: true,
      },
    })
  },

  async createInvitation(data: any) {
    let slug = generateSlug(data.groomName, data.brideName)
    let collision = await prisma.invitation.findUnique({ where: { publicSlug: slug } })
    while (collision) {
      slug = generateSlug(data.groomName, data.brideName)
      collision = await prisma.invitation.findUnique({ where: { publicSlug: slug } })
    }

    const defaultMsg =
      'Hurmatli mehmonimiz! Sizni hayotimizdagi eng quvonchli va unutilmas kunimiz — nikoh to‘yimiz munosabati bilan yoziladigan dasturxonimizga taklif etamiz.'

    return prisma.invitation.create({
      data: {
        publicSlug: slug,
        templateId: data.templateId,
        groomName: data.groomName.trim(),
        brideName: data.brideName.trim(),
        groomParents: data.groomParents?.trim() || null,
        brideParents: data.brideParents?.trim() || null,
        weddingDate: data.weddingDate,
        weddingTime: data.weddingTime,
        venueName: data.venueName.trim(),
        venueAddress: data.venueAddress.trim(),
        mapUrl: data.mapUrl?.trim() || null,
        invitationMessage: data.invitationMessage?.trim() || defaultMsg,
        musicUrl: data.musicUrl || null,
        dressCode: data.dressCode || null,
        coverTitle: data.coverTitle || null,
        programJson: data.programJson || null,
        themeSettings: data.themeSettings || null,
        status: data.status || 'PUBLISHED',
        ownerId: data.ownerId || null,
      },
      include: { template: true },
    })
  },

  async updateInvitation(id: string, data: any) {
    return prisma.invitation.update({
      where: { id },
      data,
      include: { template: true },
    })
  },

  async deleteInvitation(id: string) {
    return prisma.invitation.delete({ where: { id } })
  },

  async duplicateInvitation(id: string) {
    const original = await prisma.invitation.findUnique({ where: { id } })
    if (!original) throw new Error('Taklifnoma topilmadi')

    const newSlug = generateSlug(original.groomName, original.brideName)
    return prisma.invitation.create({
      data: {
        publicSlug: newSlug,
        templateId: original.templateId,
        groomName: original.groomName,
        brideName: original.brideName,
        groomParents: original.groomParents,
        brideParents: original.brideParents,
        weddingDate: original.weddingDate,
        weddingTime: original.weddingTime,
        venueName: original.venueName,
        venueAddress: original.venueAddress,
        mapUrl: original.mapUrl,
        invitationMessage: original.invitationMessage,
        musicUrl: original.musicUrl,
        dressCode: original.dressCode,
        coverTitle: original.coverTitle ? `${original.coverTitle} (Nusxa)` : null,
        programJson: original.programJson,
        themeSettings: original.themeSettings,
        status: 'DRAFT',
        ownerId: original.ownerId,
      },
      include: { template: true },
    })
  },
}
