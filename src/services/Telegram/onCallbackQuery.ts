import GoogleSheet from '@services/GoogleSheet'

import {MainOptions} from './options'

export async function onCallbackQuery(bot) {
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

      bot.sendMessage(
        chatId,
        `*Ваш заробіток*:\n\n*Сума*: ${profit ?? 0}\n*Період*: ${
          startDate ?? 'невідомо'
        } - ${endDate ?? 'невідомо'}`,
        {
          parse_mode: 'markdown',
          ...MainOptions,
        },
      )

      return
    }
  }
}
