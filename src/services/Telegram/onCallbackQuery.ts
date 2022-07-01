import moment from 'moment-timezone'

import GoogleSheet from '@services/GoogleSheet'
import {LoginStorage} from '@utils'

import {MainOptions} from './options'

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
    case '/calc_profilt_custom': {
      return bot.sendMessage(chatId, 'Поки недоступно', MainOptions)
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

      return bot.sendMessage(chatId, lines.join('\n'), MainOptions)
    }

    default:
      return
  }
}

async function helpfulHandler(bot, callbackQuery) {
  const chatId = callbackQuery.message.chat.id

  switch (callbackQuery.data) {
    case '/helpful': {
      return bot.sendMessage(chatId, '*Корисне*', {
        parse_mode: 'markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [
              {text: 'Bolt Charger', callback_data: '/helpful_boltcharger'},
              {text: 'MapOn', callback_data: '/helpful_mapon'},
            ],
          ],
        }),
      })
    }

    case '/helpful_boltcharger': {
      return bot.sendMessage(chatId, '*Bolt Charger*', {
        parse_mode: 'markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [
              {
                text: 'iOS',
                callback_data: '/helpful_boltcharger_ios',
              },
              {
                text: 'Android',
                callback_data: '/helpful_boltcharger_android',
              },
            ],
          ],
        }),
      })
    }

    case '/helpful_boltcharger_ios': {
      const link = 'https://testflight.apple.com/join/Hhm685us'

      return bot.sendMessage(chatId, `[Посилання на iOS](${link})`, {
        parse_mode: 'markdown',
        disable_web_page_preview: true,
      })
    }

    case '/helpful_boltcharger_android': {
      const link =
        'https://drive.google.com/file/d/1RQaG1g656C9eEayOP9nLJ-aFT0jD3s7p/view?usp=sharing'

      return bot.sendMessage(chatId, `[Посилання на Android](${link})`, {
        parse_mode: 'markdown',
        disable_web_page_preview: true,
      })
    }

    case '/helpful_mapon': {
      const link = 'https://mapon.com/share?84cfb5372d1d51ab37839e98af49e8ba'

      return bot.sendMessage(chatId, `[MapOn](${link})`, {
        parse_mode: 'markdown',
        disable_web_page_preview: true,
      })
    }

    default:
      return
  }
}
