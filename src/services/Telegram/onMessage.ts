import GoogleSheet from '@services/GoogleSheet'

import {LoginButtons, MenuButtons} from './options'
import {LoginStorage} from '@utils'

export function onMessage(bot) {
  return async (message) => {
    const text = message.text
    const chatId: number = message.chat.id
    const fromId = message.from.id

    console.log(message)

    if (LoginStorage.has(chatId)) {
      await GoogleSheet.loginEmployee(text, {tid: fromId})

      LoginStorage.remove(chatId)

      const isAuth = await GoogleSheet.isAuth(fromId)

      return bot.sendMessage(
        chatId,
        isAuth ? 'Успішний логін' : 'Неуспішний логін',
        {
          parse_mode: 'markdown',
          reply_markup: JSON.stringify({
            inline_keyboard: isAuth ? MenuButtons : LoginButtons,
          }),
        },
      )
    }

    if (text === '/start') {
      const isAuth = await GoogleSheet.isAuth(fromId)

      return bot.sendMessage(chatId, `Привіт, ${message.from.first_name}`, {
        parse_mode: 'markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: isAuth ? MenuButtons : LoginButtons,
        }),
      })
    }
  }
}
