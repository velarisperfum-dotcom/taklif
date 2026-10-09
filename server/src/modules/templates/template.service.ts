import { prisma } from '../../db.js'

export const templateService = {
  async getTemplates(category?: string) {
    const where: any = { active: true }
    if (category && category !== 'all' && category !== 'Barchasi') {
      where.category = category
    }
    return prisma.template.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    })
  },

  async getTemplateById(id: string) {
    return prisma.template.findUnique({
      where: { id },
    })
  },
}
