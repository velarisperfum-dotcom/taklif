import { Request, Response, NextFunction } from 'express'

const ipRequests: Record<string, { count: number; resetTime: number }> = {}

export function rateLimit(limit: number = 60, windowMs: number = 60000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown'
    const now = Date.now()

    if (!ipRequests[ip] || now > ipRequests[ip].resetTime) {
      ipRequests[ip] = { count: 1, resetTime: now + windowMs }
      return next()
    }

    ipRequests[ip].count++
    if (ipRequests[ip].count > limit) {
      return res.status(429).json({ error: 'Juda ko‘p so‘rov yuborildi. Birozdan so‘ng qayta urinib ko‘ring.' })
    }

    next()
  }
}
