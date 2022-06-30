import moment from 'moment-timezone'

import GoogleSheet from '@services/GoogleSheet'

import {MainOptions} from './options'

export function onCallbackQuery(bot) {
  return async (callbackQuery) => {
    const {data} = callbackQuery
    const fromId = callbackQuery.from.id
    const chatId = callbackQuery.message.chat.id

    console.log(callbackQuery)

    if (data === '/login') {
      GoogleSheet.pushLogins(chatId)
      bot.sendMessage(chatId, 'Введіть ID')

      return
    }

    if (data === '/calc_profilt:custom') {
      bot.sendMessage(chatId, 'Поки недоступно', MainOptions)

      return
    }

    if (data === '/calc_profilt:15d') {
      const date = moment().tz('Europe/Kiev').format('DD.MM.YYYY HH:mm')

      const profit = await GoogleSheet.getEmployeeProfitIn15Days(fromId)

      const period = `${profit?.startDate} - ${profit?.endDate}`

      const lines = [
        `*⌚️${date}*\n`,
        `*🧾 ПІБ*: ${profit?.name ?? ''}`,
        `*🗓 Період*: ${profit?.startDate && profit?.endDate ? period : ''}`,
        `*💵 Заробіток*: ${profit?.profit ?? 0}`,
      ]

      bot.sendMessage(chatId, lines.join('\n'), {
        parse_mode: 'markdown',
        ...MainOptions,
      })

      return
    }
  }
}
