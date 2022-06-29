import TelegramBot from 'node-telegram-bot-api'

import config from '@config'

import {onMessage} from './onMessage'
import {onCallbackQuery} from './onCallbackQuery'

const bot = new TelegramBot(config.TG_BOT_TOKEN, {polling: true})

bot.setMyCommands([
  {
    command: '/start',
    description: 'Start',
  },
])

bot.on('message', onMessage(bot))
bot.on('callback_query', onCallbackQuery(bot))
