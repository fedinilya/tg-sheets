import dotenv from 'dotenv'
import moduleAlias from 'module-alias'

dotenv.config()
moduleAlias.addAliases({
  '@config': __dirname + '/config',
  '@services': __dirname + '/services',
  '@utils': __dirname + '/utils',
})

import './app'
