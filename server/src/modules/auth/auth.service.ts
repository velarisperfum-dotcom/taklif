import { prisma } from '../../db.js'

export const authService = {
  async register(name: string, email: string, passwordHash?: string) {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      throw new Error('Ushbu email bilan ro‘yxatdan o‘tilgan')
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: passwordHash || 'hashed_default',
      },
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: `token_${user.id}`,
    }
  },

  async login(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new Error('Foydalanuvchi topilmadi')
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: `token_${user.id}`,
    }
  },
}
