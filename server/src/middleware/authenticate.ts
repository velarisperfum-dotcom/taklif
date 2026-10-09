import { Request, Response, NextFunction } from 'express'

export interface AuthenticatedRequest extends Request {
  userId?: string
}

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    if (token) {
      req.userId = token // Simulated/JWT token identifier
    }
  }
  next()
}
