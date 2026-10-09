import { Template } from '../types/template'

export const templateService = {
  async getTemplates(category?: string): Promise<Template[]> {
    const query = category && category !== 'all' && category !== 'Barchasi'
      ? `?category=${encodeURIComponent(category)}`
      : ''
    const res = await fetch(`/api/templates${query}`)
    if (!res.ok) throw new Error('Shablonlarni yuklab bo‘lmadi')
    return res.json()
  },

  async getTemplateById(id: string): Promise<Template> {
    const res = await fetch(`/api/templates/${id}`)
    if (!res.ok) throw new Error('Shablon topilmadi')
    return res.json()
  },
}
