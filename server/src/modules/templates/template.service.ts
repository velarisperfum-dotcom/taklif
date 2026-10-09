import { prisma } from '../../db.js'
import { DEFAULT_TEMPLATES } from './templates.data.js'

let isSeeding = false

export async function ensureTemplatesSeeded() {
  if (isSeeding) return
  try {
    isSeeding = true
    const count = await prisma.template.count()
    if (count < DEFAULT_TEMPLATES.length) {
      console.log(`🌱 Seeding/syncing ${DEFAULT_TEMPLATES.length} templates in database...`)
      for (const t of DEFAULT_TEMPLATES) {
        await prisma.template.upsert({
          where: { id: t.id },
          update: {
            name: t.name,
            category: t.category,
            description: t.description,
            previewImage: t.previewImage,
            priceTier: t.priceTier,
            active: t.active ?? true,
          },
          create: {
            id: t.id,
            name: t.name,
            category: t.category,
            description: t.description,
            previewImage: t.previewImage,
            priceTier: t.priceTier,
            active: t.active ?? true,
          },
        })
      }
      console.log('✅ Templates synchronized successfully!')
    }
  } catch (err) {
    console.error('⚠️ Template seeding check error:', err)
  } finally {
    isSeeding = false
  }
}

export const templateService = {
  async getTemplates(category?: string) {
    await ensureTemplatesSeeded()

    const where: any = { active: true }
    if (category && category !== 'all' && category !== 'Barchasi') {
      where.category = category
    }

    try {
      const templates = await prisma.template.findMany({
        where,
        orderBy: { createdAt: 'asc' },
      })

      if (templates && templates.length > 0) {
        return templates.sort((a, b) => {
          if (a.id === 'palace-romance') return -1
          if (b.id === 'palace-romance') return 1
          if (a.priceTier === 'PREMIUM' && b.priceTier !== 'PREMIUM') return -1
          if (b.priceTier === 'PREMIUM' && a.priceTier !== 'PREMIUM') return 1
          return 0
        })
      }
    } catch (e) {
      console.error('Failed to query templates from database, using fallback:', e)
    }

    // In-memory fallback
    if (category && category !== 'all' && category !== 'Barchasi') {
      return DEFAULT_TEMPLATES.filter((t) => t.category === category)
    }
    return DEFAULT_TEMPLATES
  },

  async getTemplateById(id: string) {
    await ensureTemplatesSeeded()

    try {
      const tmpl = await prisma.template.findUnique({
        where: { id },
      })
      if (tmpl) return tmpl
    } catch (e) {
      console.error('Database query failed for template:', e)
    }

    return DEFAULT_TEMPLATES.find((t) => t.id === id) || null
  },
}
