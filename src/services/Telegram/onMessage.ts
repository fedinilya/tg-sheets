import GoogleSheet from '@services/GoogleSheet'

import {MainOptions, LoginOptions} from './options'
import {LoginStorage} from '@utils'

export function onMessage(bot) {
  return async (message) => {
    const text = message.text
    const chatId: number = message.chat.id
    const fromId = message.from.id

    console.log(message)

    const member = await bot.getChatMember(chatId, fromId)

    console.log(member)

    if (LoginStorage.has(chatId)) {
      await GoogleSheet.loginEmployee(text, {tid: fromId})

      LoginStorage.remove(chatId)

      const isAuth = await GoogleSheet.isAuth(fromId)

      return bot.sendMessage(
        chatId,
        isAuth ? 'Успішний логін' : 'Неуспішний логін',
        isAuth ? MainOptions : LoginOptions,
      )
    }

    if (text === '/start') {
      const isAuth = await GoogleSheet.isAuth(fromId)

      return bot.sendMessage(
        chatId,
        `Привіт, ${message.from.first_name}`,
        isAuth ? MainOptions : LoginOptions,
      )
    }
  }
}
