import { Request, Response } from 'express'
import { authService } from './auth.service.js'

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body
      if (!name || !email) {
        return res.status(400).json({ error: 'Ism va email kiritilishi shart' })
      }
      const result = await authService.register(name, email, password)
      res.status(201).json(result)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email } = req.body
      if (!email) {
        return res.status(400).json({ error: 'Email kiritilishi shart' })
      }
      const result = await authService.login(email)
      res.json(result)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  },
}
