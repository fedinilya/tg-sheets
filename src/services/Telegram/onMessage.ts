import GoogleSheet from '@services/GoogleSheet'

import {MainOptions, LoginOptions} from './options'

export function onMessage(bot) {
  return async (message) => {
    const text = message.text
    const chatId: number = message.chat.id
    const fromId = message.from.id

    console.log(message)

    if (GoogleSheet.hasLogin(chatId)) {
      await GoogleSheet.loginEmployee(text, {tid: fromId})

      GoogleSheet.cleanLogin(chatId)

      const isLogin = await GoogleSheet.isLogin(fromId)

      bot.sendMessage(
        chatId,
        `Ви ${isLogin ? '' : 'не '}залогінилися`,
        isLogin ? MainOptions : LoginOptions,
      )
      return
    }

    if (text === '/start') {
      const isLogin = await GoogleSheet.isLogin(fromId)

      bot.sendMessage(
        chatId,
        `Привіт, ${message.from.first_name}${isLogin ? ' залогінься' : ''}`,
        isLogin ? MainOptions : LoginOptions,
      )
      return
    }
  }
}
