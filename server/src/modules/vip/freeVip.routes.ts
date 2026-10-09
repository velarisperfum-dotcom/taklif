import { Router, Request, Response } from 'express'
import { freeVipService } from './freeVip.service.js'
import { notifyAdminFreeVipRequest } from '../../bot/telegram.bot.js'

export const vipRouter = Router()

vipRouter.post('/request-free', async (req: Request, res: Response) => {
  try {
    const { name, contact, telegramId, source, slug } = req.body

    if (!name || !contact) {
      return res.status(400).json({
        error: 'Ism va telefon raqami (yoki Telegram username) kiritilishi majburiy',
      })
    }

    const vipRequest = freeVipService.createRequest({
      name,
      contact,
      telegramId,
      source: source || 'website',
      slug,
    })

    // Forward immediately to Admin Telegram Bot
    const notified = await notifyAdminFreeVipRequest(vipRequest)

    res.status(201).json({
      success: true,
      message: 'So‘rovingiz adminga muvaffaqiyatli yuborildi! Admin tasdiqlashi bilan xabar beriladi.',
      requestId: vipRequest.id,
      notified,
    })
  } catch (err: any) {
    console.error('Error in request-free VIP:', err)
    res.status(500).json({ error: 'So‘rovni yuborishda xatolik yuz berdi' })
  }
})

vipRouter.get('/status/:identifier', (req: Request, res: Response) => {
  try {
    const { identifier } = req.params
    const approved = freeVipService.isVipApproved(identifier)
    res.json({ identifier, isApproved: approved })
  } catch {
    res.json({ isApproved: false })
  }
})

vipRouter.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await freeVipService.getStats()
    res.json(stats)
  } catch {
    res.status(500).json({ error: 'Statistika yuklanmadi' })
  }
})
