import dotenv from 'dotenv'

dotenv.config()

export const config = {
  port: process.env.PORT || 5001,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'taklifnoma-super-secret-key-2026',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '8832773070:AAFU9gPiKFkmpuFyWB4N-lvATwFgyl5P_9I',
  adminChatId: process.env.ADMIN_CHAT_ID || '5744542264',
  cardNumber: process.env.CARD_NUMBER || '5614 6814 2987 8998',
  cardHolder: process.env.CARD_HOLDER || 'A. Z',
  premiumPrice: Number(process.env.PREMIUM_PRICE || 1000),
  frontendUrl: process.env.FRONTEND_URL || 'https://taklif-plum.vercel.app',
}
