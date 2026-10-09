import express from 'express'
import cors from 'cors'
import { config } from './config/env.js'
import { rateLimit } from './middleware/rateLimit.js'
import { errorHandler } from './middleware/errorHandler.js'
import { authRouter } from './modules/auth/auth.routes.js'
import { templateRouter } from './modules/templates/template.routes.js'
import { invitationRouter } from './modules/invitations/invitation.routes.js'
import { rsvpRouter } from './modules/rsvp/rsvp.routes.js'

export const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({ limit: '10mb' }))
app.use(rateLimit(120, 60000))

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Taklifnoma API',
  })
})

// Module routes
app.use('/api/auth', authRouter)
app.use('/api/templates', templateRouter)
app.use('/api/invitations', invitationRouter)
app.use('/api', rsvpRouter)

// 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Endpoint topilmadi' })
})

// Global error handler
app.use(errorHandler)
