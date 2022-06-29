import express from 'express'

import config from '@config'
import '@services/Telegram'

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen({port: config.PORT}, () => {
  console.log(`Bot started`)
})
