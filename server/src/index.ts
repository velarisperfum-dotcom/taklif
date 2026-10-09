import { app } from './app.js'
import { config } from './config/env.js'

app.listen(config.port, () => {
  console.log(`✨ Taklifnoma API server is running on http://localhost:${config.port}`)
})
