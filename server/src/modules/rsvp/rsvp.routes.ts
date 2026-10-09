import { Router, Request, Response } from 'express'
import { rsvpService } from './rsvp.service.js'

export const rsvpRouter = Router()

rsvpRouter.post('/invitations/:slug/rsvp', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const { guestName, attendance, guestCount, note } = req.body

    if (!guestName || !attendance) {
      return res.status(400).json({ error: 'Ism va ishtirok holati majburiy' })
    }

    const rsvp = await rsvpService.submitRsvp(slug, {
      guestName,
      attendance,
      guestCount: Number(guestCount) || 1,
      note,
    })

    res.status(201).json({
      message: 'Javobingiz qabul qilindi! Rahmat!',
      rsvp,
    })
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Javobni saqlashda xatolik' })
  }
})

rsvpRouter.get('/invitations/:id/rsvps', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const rsvps = await rsvpService.getRsvpsByInvitationId(id)
    res.json(rsvps)
  } catch (err: any) {
    res.status(500).json({ error: 'RSVP larni yuklashda xatolik' })
  }
})
