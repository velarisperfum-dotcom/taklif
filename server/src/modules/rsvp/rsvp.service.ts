import { prisma } from '../../db.js'

export const rsvpService = {
  async submitRsvp(slug: string, data: { guestName: string; attendance: string; guestCount: number; note?: string | null }) {
    const invitation = await prisma.invitation.findUnique({
      where: { publicSlug: slug },
    })

    if (!invitation) {
      throw new Error('Taklifnoma topilmadi')
    }

    return prisma.rSVP.create({
      data: {
        invitationId: invitation.id,
        guestName: data.guestName.trim(),
        attendance: data.attendance,
        guestCount: data.attendance === 'ATTENDING' ? data.guestCount : 0,
        note: data.note?.trim() || null,
      },
    })
  },

  async getRsvpsByInvitationId(invitationId: string) {
    return prisma.rSVP.findMany({
      where: { invitationId },
      orderBy: { createdAt: 'desc' },
    })
  },
}
