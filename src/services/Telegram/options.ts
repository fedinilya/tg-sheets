export const LoginButtons = [[{text: 'Login', callback_data: '/login'}]]

export const MenuButtons = [
  [
    {text: 'Калькулятор', callback_data: '/calc_profilt_custom'},
    {text: 'Порахувати за 🌓', callback_data: '/calc_profilt_15d'},
  ],
  [{text: 'Корисне', callback_data: '/helpful'}],
]

export const CallbackButtons = {
  '/calc_profilt_custom': [
    [{text: 'Назад', callback_data: '/calc_profilt_custom_back'}],
  ],
  '/calc_profilt_15d': [
    [{text: 'Назад', callback_data: '/calc_profilt_15d_back'}],
  ],

  '/helpful': [
    [
      {text: 'Bolt Charger', callback_data: '/helpful_boltcharger'},
      {text: 'MapOn', callback_data: '/helpful_mapon'},
    ],
    [{text: 'Назад', callback_data: '/helpful_back'}],
  ],
  '/helpful_boltcharger': [
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
    [
      {
        text: 'Назад',
        callback_data: '/helpful_boltcharger_back',
      },
    ],
  ],

  '/helpful_back': [
    [
      {text: 'Калькулятор', callback_data: '/calc_profilt_custom'},
      {text: 'Порахувати за 🌓', callback_data: '/calc_profilt_15d'},
    ],
    [{text: 'Корисне', callback_data: '/helpful'}],
  ],
  '/helpful_boltcharger_back': [
    [
      {text: 'Bolt Charger', callback_data: '/helpful_boltcharger'},
      {text: 'MapOn', callback_data: '/helpful_mapon'},
    ],
    [{text: 'Назад', callback_data: '/helpful_back'}],
  ],
}
