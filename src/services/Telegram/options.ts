export const LoginOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{text: 'Login', callback_data: '/login'}]],
  }),
}

export const MainOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {text: 'Калькулятор', callback_data: '/calc_profilt:custom'},
        {text: 'Порахувати за 🌓', callback_data: '/calc_profilt:15d'},
      ],
    ],
  }),
}
