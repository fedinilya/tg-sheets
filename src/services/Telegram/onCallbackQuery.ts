import moment from 'moment-timezone'

import GoogleSheet from '@services/GoogleSheet'
import {LoginStorage} from '@utils'

import {MenuButtons, CallbackButtons} from './options'

export function onCallbackQuery(bot) {
  return async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id

    console.log(callbackQuery)

    if (callbackQuery.data === '/login') {
      LoginStorage.add(chatId)
      return bot.sendMessage(chatId, 'Введіть ID')
    }

    if (callbackQuery.data.startsWith('/helpful')) {
      return helpfulHandler(bot, callbackQuery)
    }

    if (callbackQuery.data.startsWith('/calc_profilt')) {
      return calcProfiltHandler(bot, callbackQuery)
    }
  }
}

async function calcProfiltHandler(bot, callbackQuery) {
  const fromId = callbackQuery.from.id
  const chatId = callbackQuery.message.chat.id

  switch (callbackQuery.data) {
    case '/calc_profilt_custom_back': {
      return bot.editMessageText('Меню', {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id,
        parse_mode: 'markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: MenuButtons,
        }),
      })
    }

    case '/calc_profilt_15d_back': {
      return bot.editMessageText('Меню', {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id,
        parse_mode: 'markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: MenuButtons,
        }),
      })
    }

    case '/calc_profilt_custom': {
      return bot.editMessageText('Поки недоступно 🖕', {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id,
        parse_mode: 'markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: CallbackButtons[callbackQuery.data],
        }),
      })
    }

    case '/calc_profilt_15d': {
      const date = moment().tz('Europe/Kiev').format('DD.MM.YYYY HH:mm')

      const profit = await GoogleSheet.getEmployeeProfitIn15Days(fromId)

      const period = `${profit?.startDate} - ${profit?.endDate}`

      const lines = [
        `*⌚️${date}*\n`,
        `*🧾 ПІБ*: ${profit?.name ?? ''}`,
        `*🚛 Посада*: ${profit?.role ?? ''}`,
        `*📅 Період*: ${profit?.startDate && profit?.endDate ? period : ''}`,
        `*💵 Заробіток*: ${profit?.profit ?? 0}`,
      ]

      return bot.editMessageText(lines.join('\n'), {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id,
        parse_mode: 'markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: CallbackButtons[callbackQuery.data],
        }),
      })
    }

    default:
      return
  }
}

async function helpfulHandler(bot, callbackQuery) {
  const chatId = callbackQuery.message.chat.id

  switch (callbackQuery.data) {
    case '/helpful_back': {
      return bot.editMessageText('Меню', {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id,
        parse_mode: 'markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: CallbackButtons[callbackQuery.data],
        }),
      })
    }

    case '/helpful_boltcharger_back': {
      return bot.editMessageText('*Корисне*', {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id,
        parse_mode: 'markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: CallbackButtons[callbackQuery.data],
        }),
      })
    }

    case '/helpful': {
      return bot.editMessageText('*Корисне*', {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id,
        parse_mode: 'markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: CallbackButtons[callbackQuery.data],
        }),
      })
    }

    case '/helpful_boltcharger': {
      return bot.editMessageText('*Bolt Charger*', {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id,
        parse_mode: 'markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: CallbackButtons[callbackQuery.data],
        }),
      })
    }

    case '/helpful_boltcharger_ios': {
      const link = 'https://testflight.apple.com/join/Hhm685us'

      return bot.editMessageText(`[Посилання на iOS](${link})`, {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id,
        parse_mode: 'markdown',
        disable_web_page_preview: true,
        reply_markup: JSON.stringify({
          inline_keyboard: CallbackButtons['/helpful_back'],
        }),
      })
    }

    case '/helpful_boltcharger_android': {
      const link =
        'https://drive.google.com/file/d/1RQaG1g656C9eEayOP9nLJ-aFT0jD3s7p/view?usp=sharing'

      return bot.editMessageText(`[Посилання на Android](${link})`, {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id,
        parse_mode: 'markdown',
        disable_web_page_preview: true,
        reply_markup: JSON.stringify({
          inline_keyboard: CallbackButtons['/helpful_back'],
        }),
      })
    }

    case '/helpful_mapon': {
      const link = 'https://mapon.com/share?84cfb5372d1d51ab37839e98af49e8ba'

      return bot.editMessageText(`[MapOn](${link})`, {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id,
        parse_mode: 'markdown',
        disable_web_page_preview: true,
        reply_markup: JSON.stringify({
          inline_keyboard: CallbackButtons['/helpful_back'],
        }),
      })
    }

    default:
      return
  }
}
