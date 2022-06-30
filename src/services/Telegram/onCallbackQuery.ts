import moment from 'moment'

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
      bot.sendMessage(chatId, 'Ваш ID?')

      return
    }

    if (data === '/calc_profilt:custom') {
      bot.sendMessage(chatId, 'Поки недоступно')
      bot.sendMessage(
        chatId,
        `Hello ${callbackQuery.from.first_name}`,
        MainOptions,
      )

      return
    }

    if (data === '/calc_profilt:15d') {
      const {profit, startDate, endDate} =
        await GoogleSheet.getEmployeeProfitIn15Days(fromId)

      const date = moment(callbackQuery.message.date).format('DD.MM.YYYY HH:mm')

      const lines = [
        `🧾 ПІБ: ${profit ?? ''}`,
        `🗓 Період: ${startDate ?? 'невідомо'} - ${endDate ?? 'невідомо'}`,
        `💵 Заробіток: ${profit ?? 0}`,
      ]

      bot.sendMessage(chatId, `*⌚️${date}*\n\n${lines.join('\n')}`, {
        parse_mode: 'markdown',
        ...MainOptions,
      })

      return
    }
  }
}
