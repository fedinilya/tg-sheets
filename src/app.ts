import http from 'http'
import https from 'https'

import config from '@config'
import '@services/Telegram'

http
  .createServer()
  .listen(config.PORT, () => {
    console.log(`Bot started`)
  })
  .on('request', (req, res) => {
    res.end('')
  })

setInterval(() => {
  https.get('https://tg-sheets.herokuapp.com/')
}, 300000)
