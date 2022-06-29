import TelegramBot from 'node-telegram-bot-api'

import config from '@config'
import GoogleSheet from '@services/GoogleSheet'

const bot = new TelegramBot(config.TG_BOT_TOKEN, {polling: true})

bot.setMyCommands([
  {
    command: '/start',
    description: 'Start',
  },
])

const LoginOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{text: 'Login', callback_data: '/login'}]],
  }),
}

const MenuOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {text: 'Калькулятор', callback_data: '/calc_profilt:custom'},
        {text: 'Порахувати за 🌓', callback_data: '/calc_profilt:15d'},
      ],
    ],
  }),
}

let Logins: Array<number | string> = []

async function handleMessage(message) {
  const text = message.text
  const chatId: number = message.chat.id
  const fromId = message.from.id

  console.log(message)

  if (Logins.includes(chatId)) {
    await GoogleSheet.loginEmployee(text, {tid: fromId})
    Logins = Logins.filter((id) => id !== chatId)
    const isLogin = await GoogleSheet.isLogin(fromId)

    bot.sendMessage(
      chatId,
      `Ви ${isLogin ? '' : 'не '}залогінилися ${message.from.first_name}`,
      isLogin ? MenuOptions : LoginOptions,
    )
    return
  }

  if (text === '/start') {
    const isLogin = await GoogleSheet.isLogin(fromId)

    bot.sendMessage(
      chatId,
      `Hello ${message.from.first_name}`,
      isLogin ? MenuOptions : LoginOptions,
    )
    return
  }
}

async function handleCallbackQuery(callbackQuery) {
  const {data} = callbackQuery
  const fromId = callbackQuery.from.id
  const chatId = callbackQuery.message.chat.id

  console.log(callbackQuery)

  if (data === '/login') {
    Logins.push(chatId)
    bot.sendMessage(chatId, 'Ваш ID?')

    return
  }

  if (data === '/calc_profilt:custom') {
    bot.sendMessage(chatId, 'Поки недоступно')
    bot.sendMessage(
      chatId,
      `Hello ${callbackQuery.from.first_name}`,
      MenuOptions,
    )

    return
  }

  if (data === '/calc_profilt:15d') {
    const {profit, startDate, endDate} =
      await GoogleSheet.getEmployeeProfitIn15Days(fromId)

    bot.sendMessage(
      chatId,
      `*Ваш заробіток*:\n\n*Сума*: ${profit ?? 0}\n*Період*: ${
        startDate ?? 'невідомо'
      } - ${endDate ?? 'невідомо'}`,
      {
        parse_mode: 'markdown',
        ...MenuOptions,
      },
    )

    return
  }
}

bot.on('message', handleMessage)
bot.on('callback_query', handleCallbackQuery)
