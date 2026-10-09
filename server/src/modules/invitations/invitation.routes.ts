import { Router } from 'express'
import { invitationController } from './invitation.controller.js'
import { authenticate } from '../../middleware/authenticate.js'
import { authorizeOwner } from '../../middleware/authorizeOwner.js'

export const invitationRouter = Router()

invitationRouter.get('/', invitationController.getInvitations)
invitationRouter.post('/', authenticate, invitationController.createInvitation)
invitationRouter.get('/slug/:slug', invitationController.getInvitationBySlug)
invitationRouter.get('/:id', invitationController.getInvitationById)
invitationRouter.patch('/:id', authenticate, authorizeOwner, invitationController.updateInvitation)
invitationRouter.delete('/:id', authenticate, authorizeOwner, invitationController.deleteInvitation)
invitationRouter.post('/:id/duplicate', authenticate, invitationController.duplicateInvitation)
