import { Request, Response } from 'express'
import { invitationService } from './invitation.service.js'
import { createInvitationSchema, updateInvitationSchema } from './invitation.schema.js'

export const invitationController = {
  async getInvitations(req: Request, res: Response) {
    try {
      const { ownerId } = req.query
      const invitations = await invitationService.getInvitations(ownerId as string | undefined)
      res.json(invitations)
    } catch (err: any) {
      res.status(500).json({ error: 'Taklifnomalarni yuklashda xatolik yuz berdi' })
    }
  },

  async getInvitationBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params
      const invitation = await invitationService.getInvitationBySlug(slug)
      if (!invitation) {
        return res.status(404).json({ error: 'Taklifnoma topilmadi' })
      }
      res.json(invitation)
    } catch (err: any) {
      res.status(500).json({ error: 'Taklifnomani yuklashda xatolik yuz berdi' })
    }
  },

  async getInvitationById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const invitation = await invitationService.getInvitationById(id)
      if (!invitation) {
        return res.status(404).json({ error: 'Taklifnoma topilmadi' })
      }
      res.json(invitation)
    } catch (err: any) {
      res.status(500).json({ error: 'Taklifnomani yuklashda xatolik yuz berdi' })
    }
  },

  async createInvitation(req: Request, res: Response) {
    try {
      const parsed = createInvitationSchema.safeParse(req.body)
      if (!parsed.success) {
        return res.status(400).json({
          error: 'Ma’lumotlar to‘liq yoki to‘g‘ri kiritilmadi',
          details: parsed.error.format(),
        })
      }
      const invitation = await invitationService.createInvitation(parsed.data)
      res.status(201).json(invitation)
    } catch (err: any) {
      res.status(500).json({ error: 'Taklifnomani saqlashda xatolik yuz berdi' })
    }
  },

  async updateInvitation(req: Request, res: Response) {
    try {
      const { id } = req.params
      const parsed = updateInvitationSchema.safeParse(req.body)
      if (!parsed.success) {
        return res.status(400).json({
          error: 'Kiritilgan ma’lumotlar xato',
          details: parsed.error.format(),
        })
      }
      const updated = await invitationService.updateInvitation(id, parsed.data)
      res.json(updated)
    } catch (err: any) {
      res.status(500).json({ error: 'Taklifnomani yangilashda xatolik yuz berdi' })
    }
  },

  async deleteInvitation(req: Request, res: Response) {
    try {
      const { id } = req.params
      await invitationService.deleteInvitation(id)
      res.json({ message: 'Taklifnoma o‘chirildi', id })
    } catch (err: any) {
      res.status(500).json({ error: 'Taklifnomani o‘chirishda xatolik yuz berdi' })
    }
  },

  async duplicateInvitation(req: Request, res: Response) {
    try {
      const { id } = req.params
      const duplicated = await invitationService.duplicateInvitation(id)
      res.status(201).json(duplicated)
    } catch (err: any) {
      res.status(500).json({ error: 'Nusxa olishda xatolik yuz berdi' })
    }
  },
}
