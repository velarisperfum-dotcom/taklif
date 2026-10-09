import { Router, Request, Response } from 'express'
import { templateService } from './template.service.js'

export const templateRouter = Router()

templateRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query
    const templates = await templateService.getTemplates(category as string | undefined)
    res.json(templates)
  } catch (error) {
    res.status(500).json({ error: 'Shablonlarni yuklashda xatolik yuz berdi' })
  }
})

templateRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const template = await templateService.getTemplateById(id)
    if (!template) {
      return res.status(404).json({ error: 'Shablon topilmadi' })
    }
    res.json(template)
  } catch (error) {
    res.status(500).json({ error: 'Shablonni yuklashda xatolik yuz berdi' })
  }
})
