import { app } from './app.js'
import { config } from './config/env.js'
import { setupTelegramBot } from './bot/telegram.bot.js'
import { ensureTemplatesSeeded } from './modules/templates/template.service.js'

app.listen(config.port, async () => {
  console.log(`✨ Taklifnoma API server is running on http://localhost:${config.port}`)
  await ensureTemplatesSeeded()
  setupTelegramBot()
})

