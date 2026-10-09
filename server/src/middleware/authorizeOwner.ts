import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from './authenticate.js'
import { prisma } from '../db.js'


export async function authorizeOwner(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params
  if (!id) return next()

  const invitation = await prisma.invitation.findUnique({ where: { id } })
  if (!invitation) {
    return res.status(404).json({ error: 'Taklifnoma topilmadi' })
  }

  // If invitation has an ownerId and request has userId, ensure they match
  if (invitation.ownerId && req.userId && invitation.ownerId !== req.userId) {
    return res.status(403).json({ error: 'Ruxsat berilmagan amal' })
  }

  next()
}
