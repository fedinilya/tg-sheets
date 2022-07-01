export const LoginOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{text: 'Login', callback_data: '/login'}]],
  }),
}

export const MainOptions = {
  parse_mode: 'markdown',
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {text: 'Калькулятор', callback_data: '/calc_profilt_custom'},
        {text: 'Порахувати за 🌓', callback_data: '/calc_profilt_15d'},
      ],
      [{text: 'Корисне', callback_data: '/helpful'}],
    ],
  }),
}
